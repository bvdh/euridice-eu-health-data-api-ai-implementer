---
name: ig-qa-check
description: 'Build the EU Health Data API IG when needed and run a quality-assurance pass: spelling, grammar, absence of broken links, profile-name integrity in text and images, and applicability of profile description sections against the profile content. Use for pre-ballot/pre-PR documentation QA and IG health review.'
argument-hint: '[--no-build | --force-build]'
---

# IG QA Check

Run a documentation-quality pass over the EU Health Data API IG. A helper script gathers all
deterministic evidence and builds the IG when the generated output is stale; the agent then
completes the semantic checks (spelling, grammar, description applicability) using that evidence.

## When To Use
- Before a ballot submission or pull request, to validate documentation quality.
- After editing narrative pages, includes, figures, or profile descriptions.
- When asked to check spelling/grammar, broken links, or profile-name consistency in the IG.

## Checks Performed
1. **Build when needed** — rebuild only if the generated `qa.html` is missing or older than any `input/` file.
2. **Broken links** — read the publisher broken-link count from `qa.html`.
3. **Spelling** — narrative pages and profile descriptions.
4. **Grammar / readability** — narrative pages and profile descriptions.
5. **Profile-name integrity** — every profile referenced in text and image sources must correspond to a profile that exists in the generated IG.
6. **Description applicability** — each profile's Description must accurately describe that profile's actual content (constrained elements, must-support, bindings, slices), not be generic, stale, or copied from another profile.

## Procedure

### Step 1 — Collect evidence and build if stale
Run from the workspace root:

```bash
bash ./.github/skills/ig-qa-check/scripts/ig-qa-check.sh
```

Options:
- `--no-build` — never build; report freshness only (use when outputs are known fresh; the full build is expensive).
- `--force-build` — always rebuild first.

The script resolves the IG root via branch context (`FORK_ROOT`, then the base
`eu-health-data-api/` folder) and writes a report to `build-logs/ig-qa-check-<timestamp>.md`.
Read that report.

The report contains:
- **Section 1** — build status and QA/broken-link counts (deterministic PASS/REVIEW).
- **Section 2** — profile references classified as BROKEN (deterministic).
- **Section 3** — full profile inventory with Title/Name.
- **Section 4** — every profile Description and constrained field/slice, for applicability review.

### Step 2 — Broken links (deterministic)
- Report **PASS** if `qa.html` shows `broken links = 0`.
- Otherwise open `output/qa.html`, list the broken links, and propose fixes. The publisher validates internal cross-references.

### Step 3 — Profile-name integrity (agent + report)
- Treat every entry in **Section 2a (BROKEN)** as a failure: the referenced `StructureDefinition-<Id>` was not generated in this IG. Fix the reference or the profile id.
- Using **Section 3**, review narrative pages and figures for profile **names/titles** written as prose (not as `StructureDefinition-<Id>` links). Each must match a real Title/Name in the inventory.
- Inspect key figures (rendered from `input/images-source/*.plantuml`) for profile names; the script already scans the PlantUML sources, but confirm the rendered figures visually when a figure is central to a page.

### Step 4 — Description applicability (agent)
For each profile in **Section 4**, compare the Description against the profile's actual content
(open the rendered `StructureDefinition-<Id>.html`, or the source FSH). Flag a Description when it:
- describes elements the profile does not constrain, or omits the profile's defining constraints;
- is generic boilerplate or clearly copied from another profile;
- is stale relative to the current element set, bindings, or slices;
- claims a scope the profile does not implement.
Propose a corrected Description in the source FSH for each flagged profile.

### Step 5 — Spelling & grammar (agent)
Review narrative pages under `input/pagecontent` and `input/includes`, plus the Description
sections in Section 4. Report misspellings and grammar/readability issues with file and line
references and concrete corrections. Keep IG/FHIR domain terms, profile ids, and code system
tokens out of scope (they are not spelling errors).

## Decision Rules
- Do not edit generated output under `output/`; fix the source under `input/` (the single source of truth), then rebuild.
- If the build step fails, resolve the build first (see `build-ig`) before trusting counts and inventory.
- Prefer minimal, source-scoped fixes; do not rewrite prose beyond the reported issues.

## Output Format
Report in this order:
1. **Verdict**: `PASS` or `FAIL` (FAIL if any broken link, BROKEN profile reference, or build failure).
2. **Broken links**: count + list if any.
3. **Profile-name integrity**: BROKEN references, prose/figure mismatches.
4. **Description applicability**: flagged profiles with proposed corrections.
5. **Spelling & grammar**: findings with file/line and corrections.
6. **Recheck plan**: exact command to rerun (`bash ./.github/skills/ig-qa-check/scripts/ig-qa-check.sh`).

## Related Skills
- `build-ig` — full build lifecycle and error triage.
- `ig-check-jeckyll-links` — Jekyll alias/link rendering checks.
