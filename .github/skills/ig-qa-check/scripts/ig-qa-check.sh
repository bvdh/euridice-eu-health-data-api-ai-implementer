#!/usr/bin/env bash
# IG QA Check — build-when-needed + deterministic quality evidence collector.
#
# Collects the deterministic evidence the ig-qa-check skill needs:
#   - Build freshness detection (and optional build when outputs are stale/missing)
#   - QA error/warning/broken-link counts from the publisher qa.html
#   - Valid profile inventory (from generated StructureDefinition-*.json)
#   - Profile references found in narrative text and PlantUML image sources, classified
#     as OK / BROKEN against the profile inventory
#   - Description sections of all profiles, dumped for applicability review
#
# Spelling, grammar, and description-applicability judgements are performed by the
# agent using the report produced here (see SKILL.md).
#
# Usage:
#   ig-qa-check.sh [--no-build] [--force-build]
#     (default)      build only when outputs are missing or stale
#     --no-build     never build; report freshness only
#     --force-build  always rebuild before checking

set -u

BUILD_MODE="auto"
for arg in "$@"; do
  case "$arg" in
    --no-build)    BUILD_MODE="none" ;;
    --force-build) BUILD_MODE="force" ;;
    -h|--help)
      grep -E '^#( |$)' "$0" | sed 's/^# \{0,1\}//'
      exit 0
      ;;
    *)
      echo "Unknown argument: $arg" >&2
      exit 2
      ;;
  esac
done

# --- Resolve IG root (same precedence as sibling skills) ---
script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
workspace_root="$(cd "$script_dir/../../../.." && pwd)"
resolver="$workspace_root/.github/skills/branch-context-management/scripts/resolve-branch-context.sh"
resolved_fork_root=""
if [[ -f "$resolver" ]]; then
  resolver_output="$(bash "$resolver" 2>/dev/null || true)"
  resolved_fork_root="$(echo "$resolver_output" | sed -n 's/^FORK_ROOT=//p')"
fi

if [[ -d "$workspace_root/input" && -f "$workspace_root/_build.sh" ]]; then
  IG_ROOT="$workspace_root"
elif [[ -n "$resolved_fork_root" && -d "$resolved_fork_root/input" && -f "$resolved_fork_root/_build.sh" ]]; then
  IG_ROOT="$resolved_fork_root"
elif [[ -d "$workspace_root/eu-health-data-api/input" && -f "$workspace_root/eu-health-data-api/_build.sh" ]]; then
  IG_ROOT="$workspace_root/eu-health-data-api"
else
  echo "ERROR: Could not locate IG root (need input/ and _build.sh)." >&2
  exit 1
fi

cd "$IG_ROOT" || exit 1

timestamp="$(date +%Y%m%d-%H%M%S)"
log_dir="$IG_ROOT/build-logs"
mkdir -p "$log_dir"
REPORT="$log_dir/ig-qa-check-$timestamp.md"

OUT="$IG_ROOT/output"

# --- Build freshness detection ---
is_stale() {
  local out_qa="$OUT/qa.html"
  [[ ! -f "$out_qa" ]] && return 0
  # Any tracked source file newer than the QA artifact means the build is stale.
  if find "$IG_ROOT/input" -type f -newer "$out_qa" -print -quit 2>/dev/null | grep -q .; then
    return 0
  fi
  return 1
}

build_needed="no"
if is_stale; then
  build_needed="yes"
fi

did_build="no"
build_status="skipped"
if [[ "$BUILD_MODE" == "force" || ( "$BUILD_MODE" == "auto" && "$build_needed" == "yes" ) ]]; then
  echo "Building IG (mode=$BUILD_MODE, stale=$build_needed) ..."
  build_log="$log_dir/ig-qa-check-build-$timestamp.log"
  if bash "$IG_ROOT/_build.sh" build > "$build_log" 2>&1; then
    build_status="ok"
  else
    build_status="failed (see $build_log)"
  fi
  did_build="yes"
fi

# --- Parse QA counts from publisher qa.html comment line ---
qa_counts() {
  local qa="$OUT/qa.html"
  if [[ ! -f "$qa" ]]; then
    echo "missing"
    return
  fi
  # Comment line looks like: <!-- ... broken links = 0, errors = 1, warn = 27, info = 78-->
  local line
  line="$(grep -oiE 'broken links = [0-9]+, errors = [0-9]+, warn = [0-9]+, info = [0-9]+' "$qa" | head -1)"
  if [[ -z "$line" ]]; then
    # Fallback to qa.txt header (err = X, warn = Y, info = Z)
    local hdr
    hdr="$(grep -m1 -E '^err = ' "$OUT/qa.txt" 2>/dev/null || true)"
    echo "${hdr:-unparsed}"
    return
  fi
  echo "$line"
}

QA="$(qa_counts)"
broken_of() { echo "$1" | grep -oiE 'broken links = [0-9]+' | grep -oE '[0-9]+' | head -1; }
BROKEN="$(broken_of "$QA")"

# --- Profile inventory + reference/description analysis (python) ---
PY_OUT="$(IG_ROOT="$IG_ROOT" python3 - <<'PY'
import os, re, glob, json

ig_root = os.environ["IG_ROOT"]
out_dir = os.path.join(ig_root, "output")

def inventory():
    inv = {}
    for path in glob.glob(os.path.join(out_dir, "StructureDefinition-*.json")):
        try:
            with open(path, encoding="utf-8") as fh:
                data = json.load(fh)
        except Exception:
            continue
        if data.get("resourceType") != "StructureDefinition":
            continue
        sid = data.get("id") or os.path.basename(path)[len("StructureDefinition-"):-len(".json")]
        inv[sid] = {
            "name": data.get("name", ""),
            "title": data.get("title", ""),
            "derivation": data.get("derivation", ""),
            "kind": data.get("kind", ""),
        }
    return inv

inv = inventory()
all_ids = sorted(inv)

# Valid LOCAL reference targets = every StructureDefinition-*.html page actually
# generated (this includes derived views such as -definitions, and excludes
# external-package models, which are linked by absolute URL).
def html_targets():
    targets = set()
    for path in glob.glob(os.path.join(out_dir, "StructureDefinition-*.html")):
        base = os.path.basename(path)[len("StructureDefinition-"):-len(".html")]
        targets.add(base)
    return targets

html_ids = html_targets()

# --- Scan narrative + image sources for profile references ---
scan_dirs = [
    os.path.join(ig_root, "input", "pagecontent"),
    os.path.join(ig_root, "input", "includes"),
    os.path.join(ig_root, "input", "images-source"),
]
ref_re = re.compile(r"StructureDefinition-([A-Za-z0-9_-]+?)(?=\.html|\.json|[^A-Za-z0-9_-]|$)")
_boundary = set('("\'[ \t>=)')

def is_external(line, start):
    """True if this match belongs to an absolute (http/https) URL, not a local link."""
    pre = line[:start]
    cut = 0
    for i in range(len(pre) - 1, -1, -1):
        if pre[i] in _boundary:
            cut = i + 1
            break
    return "://" in pre[cut:]

refs = {}  # id -> list of "relpath:line"
for d in scan_dirs:
    for root, _, files in os.walk(d):
        for fn in files:
            if not fn.lower().endswith((".md", ".plantuml", ".puml", ".html", ".xml")):
                continue
            fp = os.path.join(root, fn)
            try:
                with open(fp, encoding="utf-8", errors="replace") as fh:
                    for i, line in enumerate(fh, 1):
                        for m in ref_re.finditer(line):
                            if is_external(line, m.start()):
                                continue  # external-package StructureDefinition, not a local profile
                            sid = m.group(1)
                            rel = os.path.relpath(fp, ig_root)
                            refs.setdefault(sid, []).append(f"{rel}:{i}")
            except Exception:
                continue

def classify(sid):
    return "OK" if sid in html_ids else "BROKEN"

broken = []
for sid in sorted(refs):
    if classify(sid) == "BROKEN":
        broken.append((sid, refs[sid]))

# --- Description review data: profile, field, and slice descriptions ---
# Field/slice descriptions are read from the generated StructureDefinition
# differential (resolved element paths + slice names). The source FSH file is
# mapped by profile name so the agent knows where to edit.
name_to_fsh = {}
for fp in glob.glob(os.path.join(ig_root, "input", "fsh", "**", "*.fsh"), recursive=True):
    try:
        text = open(fp, encoding="utf-8", errors="replace").read()
    except Exception:
        continue
    for m in re.finditer(r"(?m)^Profile:\s*(\S+)", text):
        name_to_fsh.setdefault(m.group(1), os.path.relpath(fp, ig_root))

def load_sd(sid):
    """Load the full StructureDefinition JSON."""
    p = os.path.join(out_dir, f"StructureDefinition-{sid}.json")
    if os.path.exists(p):
        try:
            return json.load(open(p, encoding="utf-8"))
        except Exception:
            return None
    return None

def collect_descriptions():
    entries = []
    for sid in all_ids:
        sd = load_sd(sid)
        if sd is None:
            continue
        elements = []
        for el in sd.get("differential", {}).get("element", []):
            short = el.get("short", "")
            definition = el.get("definition", "")
            comment = el.get("comment", "")
            slice_name = el.get("sliceName", "")
            # Keep elements that carry a description or that define a slice.
            if not (short or definition or comment or slice_name):
                continue
            elements.append({
                "path": el.get("id") or el.get("path", ""),
                "slice": slice_name,
                "short": short,
                "definition": definition,
                "comment": comment,
            })
        entries.append({
            "name": sd.get("name", sid),
            "id": sid,
            "title": sd.get("title", ""),
            "desc": sd.get("description", ""),
            "file": name_to_fsh.get(sd.get("name", ""), ""),
            "elements": elements,
        })
    return entries

descs = collect_descriptions()

print("<<<INVENTORY>>>")
for sid in all_ids:
    meta = inv.get(sid, {})
    print(json.dumps({
        "id": sid,
        "title": meta.get("title", ""),
        "name": meta.get("name", ""),
    }))
print("<<<REFCOUNT>>>")
print(json.dumps({"referenced": len(refs), "broken": len(broken)}))
print("<<<BROKEN>>>")
for sid, locs in broken:
    print(json.dumps({"id": sid, "locations": locs[:20]}))
print("<<<DESCRIPTIONS>>>")
for e in descs:
    print(json.dumps(e))
print("<<<END>>>")
PY
)"

# --- Assemble markdown report ---
section() { awk -v s="<<<$1>>>" -v e="<<<$2>>>" '$0==s{f=1;next} $0==e{f=0} f' <<<"$PY_OUT"; }

{
  echo "# IG QA Check Report"
  echo
  echo "- Generated: $(date -Iseconds)"
  echo "- IG root: \`$IG_ROOT\`"
  echo "- Build mode: \`$BUILD_MODE\`  |  Stale before run: \`$build_needed\`  |  Built this run: \`$did_build\`  |  Build status: \`$build_status\`"
  echo
  echo "## 1. Build & QA Summary"
  echo
  echo "| QA counts (from qa.html) | Broken links |"
  echo "|---|---|"
  echo "| ${QA} | ${BROKEN:-?} |"
  echo
  if [[ "${BROKEN:-1}" == "0" ]]; then
    echo "Broken-link check: **PASS** (0 broken links)."
  else
    echo "Broken-link check: **REVIEW** — non-zero or unparsed broken-link count; inspect \`output/qa.html\`."
  fi
  echo

  echo "## 2. Profile Reference Integrity"
  echo
  echo "Profile ids referenced as \`StructureDefinition-<Id>\` in narrative text and PlantUML sources,"
  echo "checked against the generated profile inventory."
  echo
  refcount="$(section REFCOUNT BROKEN | head -1)"
  echo "Reference summary: \`$refcount\`"
  echo
  echo "### 2a. BROKEN references (id not generated in this IG)"
  broken_lines="$(section BROKEN DESCRIPTIONS)"
  if [[ -z "$broken_lines" ]]; then
    echo "None. **PASS**"
  else
    echo "$broken_lines" | while IFS= read -r l; do
      [[ -z "$l" ]] && continue
      id="$(echo "$l" | python3 -c 'import sys,json;print(json.load(sys.stdin)["id"])')"
      locs="$(echo "$l" | python3 -c 'import sys,json;print(", ".join(json.load(sys.stdin)["locations"]))')"
      echo "- \`$id\` — $locs"
    done
  fi
  echo

  echo "## 3. Profile Inventory (for prose-name review)"
  echo
  echo "Use this table to verify that human-readable profile names used in prose match a real profile."
  echo
  echo "| Id | Title | Name |"
  echo "|---|---|---|"
  section INVENTORY REFCOUNT | while IFS= read -r l; do
    [[ -z "$l" ]] && continue
    echo "$l" | python3 -c 'import sys,json
d=json.load(sys.stdin)
print("| `%s` | %s | %s |" % (d["id"], d["title"], d["name"]))'
  done
  echo

  echo "## 4. Profile, Field & Slice Descriptions (for applicability review)"
  echo
  echo "For each profile, confirm the Description accurately describes the profile's actual content."
  echo "Then, for every constrained field and slice, confirm its short/definition/comment corresponds"
  echo "to that element's purpose in this IG. Flag descriptions that are generic, stale, copied from"
  echo "another element/profile, contradict the cardinality/binding, or do not match the element's role."
  echo
  section DESCRIPTIONS END | while IFS= read -r l; do
    [[ -z "$l" ]] && continue
    echo "$l" | python3 -c 'import sys,json
d=json.load(sys.stdin)
print("### %s (`%s`)" % (d.get("title") or d["name"], d["id"] or "no-id"))
print()
print("- Source: `%s`" % (d["file"] or "(unmapped)"))
print("- Name: `%s`" % d["name"])
print()
print("**Profile description:**")
print()
print("> " + (d.get("desc") or "(none)").replace("\n", "\n> "))
print()
els = d.get("elements", [])
if els:
    print("**Constrained fields / slices:**")
    print()
    for el in els:
        label = el["path"] + (" [slice: %s]" % el["slice"] if el["slice"] else "")
        print("- `%s`" % label)
        if el["short"]:
            print("  - short: %s" % el["short"])
        if el["definition"]:
            print("  - definition: %s" % el["definition"])
        if el["comment"]:
            print("  - comment: %s" % el["comment"])
    print()
'
  done
} > "$REPORT"

echo "Report written to: $REPORT"
