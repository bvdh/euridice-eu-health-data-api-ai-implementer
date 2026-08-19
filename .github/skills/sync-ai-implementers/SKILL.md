---
name: sync-ai-implementers
description: 'Compare this repository''s Copilot skills, agents, and instructions against sibling AI-implementer repositories and suggest changes and updates. Use to keep generic build/QA/Jira/ticket tooling in sync across the ai-implementer repos, to find newly added reusable skills, or to detect divergence in shared skills. Report-only: proposes a diff-backed change list and applies updates only after explicit user approval.'
argument-hint: '(optional) --diff to include unified diffs for diverged assets'
---

# Sync AI Implementers

Keep this repository's customization assets aligned with the sibling AI-implementer repos while
respecting that this is a composition/transport IG (domain-specific imaging/DICOM/MADO and
multi-version R4/R5 assets are intentionally excluded).

This skill is **report-only**. It classifies every skill, agent, and instruction found in the
reference repos and proposes a change list. It never edits files on its own — updates are applied
only after you approve them.

## Configuration

`config.json` (next to this skill) controls the comparison:
- `reference_repos` — sibling ai-implementer repos to compare against (default:
  `../hl7eu-imaging-ai-implementer`, `../hl7eu-imaging-manifest-ai-implementer`).
- `compare_dirs` — `.github/skills`, `.github/agents`, `.github/instructions`.
- `exclude_names` — domain-specific / multi-version assets that must NOT be mirrored here (reported
  as EXCLUDED, not MISSING).
- `normalize_tokens` — fork-name/layout tokens rewritten before diffing so that expected path
  differences (e.g. `imaging-manifest-fork` → `eu-health-data-api`) are not flagged as divergence.

Update `config.json` when a new reusable skill should be tracked, or when a genuinely
domain-specific asset should be excluded.

## Procedure

### Step 1 — Generate the comparison report

Run from the repository root:

```bash
python3 ./.github/skills/sync-ai-implementers/scripts/sync-ai-implementers.py --diff
```

- Omit `--diff` for a shorter summary without unified diffs.
- Use `--out <file>` to write the report to a file instead of stdout.

The report classifies each asset as:
- **MISSING-HERE** — a reusable skill/agent/instruction present in a reference repo but absent here.
- **DIVERGED** — present in both, but the path-normalized content differs (unified diff shown with `--diff`).
- **EXTRA-HERE** — present here but in no reference repo (e.g. this skill and IG-specific additions).
- **EXCLUDED** — domain-specific or multi-version asset intentionally not mirrored.

### Step 2 — Review and decide

Present the classified results to the user. For each **MISSING-HERE** and **DIVERGED** entry, decide
whether it is genuinely relevant to the EU Health Data API IG:
- If clearly domain-specific, propose adding it to `exclude_names` in `config.json` instead of importing it.
- If reusable, propose the concrete change (add the asset, or update the diverged one).

Use `vscode_askQuestions` to let the user choose which proposed changes to apply.

### Step 3 — Apply only after approval

For each approved change:
- **MISSING-HERE**: copy the asset from the reference repo, then adapt it to this repo's layout
  (single-version `input/`/`output/`, `cd eu-health-data-api && ./_build.sh build`, `main` branch,
  the EU Health Data API Jira JQL, and the `eu-health-data-api` fork name).
- **DIVERGED**: apply only the intended portions of the diff; do not overwrite deliberate local
  adaptations (the report already normalizes fork-name/layout tokens, so remaining differences are real).

After applying, re-run Step 1 to confirm the change list shrank as expected.

## Guardrails

- Never apply changes without explicit user approval.
- Never import EXCLUDED (domain-specific / multi-version) assets.
- Preserve local adaptations when reconciling DIVERGED assets.
- Keep `config.json` as the single source of truth for reference repos and exclusions.

## Output Format

Report in this order:
1. Reference repos checked (and whether each path was found).
2. MISSING-HERE, DIVERGED, EXTRA-HERE, EXCLUDED lists with counts.
3. Recommended actions per relevant asset (import / update / exclude).
4. The exact command to re-run the comparison.
