#!/usr/bin/env python3
"""Compare this AI-implementer's customization assets against sibling reference repos.

Report-only: enumerates skills, agents, and instruction files in each configured reference
repo and classifies every asset relative to this repo as one of:

  MISSING-HERE  reusable asset present in a reference repo but absent here
  DIVERGED      present in both, but the (path-normalized) content differs
  EXTRA-HERE    present here but in none of the reference repos
  EXCLUDED      reference asset intentionally not mirrored (domain-specific / multi-version)

The script never edits files. It prints a markdown report and, with --diff, the unified
diff for each DIVERGED asset so the agent can propose targeted updates for user approval.
"""

import argparse
import difflib
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
REPO_ROOT = os.path.abspath(os.path.join(HERE, "..", "..", "..", ".."))
CONFIG_PATH = os.path.join(HERE, "..", "config.json")


def load_config():
    with open(CONFIG_PATH, encoding="utf-8") as fh:
        return json.load(fh)


def is_excluded(name, excludes):
    return any(name == e or name.startswith(e) for e in excludes)


def list_assets(base, compare_dirs):
    """Return {dir: {asset_name: abspath}} for skill/agent/instruction assets under base."""
    result = {}
    for d in compare_dirs:
        dpath = os.path.join(base, d)
        assets = {}
        if os.path.isdir(dpath):
            for entry in sorted(os.listdir(dpath)):
                full = os.path.join(dpath, entry)
                # Skills are directories (compared via their SKILL.md); agents/instructions are files.
                if os.path.isdir(full):
                    skill_md = os.path.join(full, "SKILL.md")
                    if os.path.isfile(skill_md):
                        assets[entry] = skill_md
                elif entry.endswith((".md",)):
                    assets[entry] = full
        result[d] = assets
    return result


def normalized(path, tokens):
    try:
        text = open(path, encoding="utf-8", errors="replace").read()
    except Exception:
        return ""
    for src, dst in tokens.items():
        text = text.replace(src, dst)
    return text


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--diff", action="store_true", help="Include unified diffs for DIVERGED assets.")
    ap.add_argument("--out", default="", help="Write the report to this file instead of stdout.")
    args = ap.parse_args()

    cfg = load_config()
    compare_dirs = cfg["compare_dirs"]
    excludes = cfg.get("exclude_names", [])
    tokens = cfg.get("normalize_tokens", {})

    here = list_assets(REPO_ROOT, compare_dirs)

    refs = {}
    for rel in cfg["reference_repos"]:
        base = os.path.abspath(os.path.join(REPO_ROOT, rel))
        refs[rel] = {"base": base, "exists": os.path.isdir(base), "assets": list_assets(base, compare_dirs)}

    lines = []
    lines.append("# sync-ai-implementers report")
    lines.append("")
    lines.append(f"- This repo: `{REPO_ROOT}`")
    for rel, info in refs.items():
        status = "found" if info["exists"] else "MISSING (path not found)"
        lines.append(f"- Reference `{rel}` → `{info['base']}` ({status})")
    lines.append("")

    # Union of reference asset names per dir → where they occur.
    missing, diverged, excluded = [], [], []
    for d in compare_dirs:
        ref_names = {}
        for rel, info in refs.items():
            for name, path in info["assets"].get(d, {}).items():
                ref_names.setdefault(name, []).append((rel, path))

        for name, occurrences in sorted(ref_names.items()):
            if is_excluded(name, excludes):
                excluded.append((d, name, [o[0] for o in occurrences]))
                continue
            local_path = here.get(d, {}).get(name)
            if not local_path:
                missing.append((d, name, [o[0] for o in occurrences]))
                continue
            # Present in both: compare normalized content against the first reference occurrence.
            ref_rel, ref_path = occurrences[0]
            if normalized(ref_path, tokens).strip() != normalized(local_path, tokens).strip():
                diverged.append((d, name, ref_rel, ref_path, local_path))

    # Assets here but in no reference repo.
    extra = []
    for d in compare_dirs:
        all_ref = set()
        for info in refs.values():
            all_ref |= set(info["assets"].get(d, {}))
        for name in sorted(here.get(d, {})):
            if name not in all_ref:
                extra.append((d, name))

    def section(title, rows, fmt):
        lines.append(f"## {title} ({len(rows)})")
        lines.append("")
        if not rows:
            lines.append("_None._")
        else:
            for r in rows:
                lines.append(fmt(r))
        lines.append("")

    section("MISSING-HERE — reusable assets to consider adding", missing,
            lambda r: f"- `{r[0]}/{r[1]}` — in {', '.join(r[2])}")
    section("DIVERGED — present in both, content differs (path-normalized)", diverged,
            lambda r: f"- `{r[0]}/{r[1]}` — differs from {r[2]}")
    section("EXTRA-HERE — local assets not in any reference repo", extra,
            lambda r: f"- `{r[0]}/{r[1]}`")
    section("EXCLUDED — domain-specific / multi-version, intentionally not mirrored", excluded,
            lambda r: f"- `{r[0]}/{r[1]}` — in {', '.join(r[2])}")

    if args.diff and diverged:
        lines.append("## Unified diffs for DIVERGED assets (reference → local, path-normalized)")
        lines.append("")
        for d, name, ref_rel, ref_path, local_path in diverged:
            lines.append(f"### `{d}/{name}` (vs {ref_rel})")
            lines.append("")
            lines.append("```diff")
            a = normalized(ref_path, tokens).splitlines()
            b = normalized(local_path, tokens).splitlines()
            for dl in difflib.unified_diff(a, b, fromfile=f"ref:{name}", tofile=f"local:{name}", lineterm=""):
                lines.append(dl)
            lines.append("```")
            lines.append("")

    lines.append("---")
    lines.append(f"Summary: {len(missing)} missing, {len(diverged)} diverged, "
                 f"{len(extra)} extra, {len(excluded)} excluded.")
    lines.append("")
    lines.append("This report is advisory only; no files were changed. "
                 "Apply any updates only after user approval.")

    report = "\n".join(lines)
    if args.out:
        with open(args.out, "w", encoding="utf-8") as fh:
            fh.write(report + "\n")
        print(f"Report written to: {args.out}")
    else:
        print(report)


if __name__ == "__main__":
    sys.exit(main())
