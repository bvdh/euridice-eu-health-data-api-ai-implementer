---
name: pr-message-quality-check
description: 'Review and strengthen a generated pull-request description file (jira/pr/pr-<branch>.md) before pushing or opening a PR. Use for PR-message quality gating, checking that every branch ticket has a jira link and a traceable one-line summary, that the build/reconciliation/proof/compiled-IG validation lines are accurate, and that open items are surfaced. Companion quality gate for create-pull-message.'
argument-hint: '(optional) branch name; defaults to root current-branch.md, then current outer-repo branch'
---

# PR Message Quality Check

Validate and improve the quality of a pull-request description produced by
`create-pull-message` before it is used to open a PR.

This is the required quality gate for `jira/pr/pr-<branch>.md`. Run it after
`create-pull-message` and before `push-branch-and-open-pr`.

## When To Use

- A `jira/pr/pr-<branch>.md` file exists and needs review before pushing.
- You want to catch missing ticket links, untraceable summaries, or stale validation lines.
- You want a consistent quality gate for all PR-message artifacts.

## Inputs

- Branch name (argument, else root `current-branch.md`, else resolver fallback).
- PR message file: `jira/pr/pr-<branch>.md`.
- Cross-check sources:
   - Active tickets: `jira/active-<branch>/FHIR-XXXXX/`, resolved through `branch-context-management`.
  - Per-ticket proof: `FHIR-XXXXX-execution-summary.md`, `FHIR-XXXXX-resolution.md`.
   - Compiled IG output: `$FORK_ROOT/output/`.

## Output

- Updated `jira/pr/pr-<branch>.md` with quality fixes, plus a concise check summary and a
  gate result: `PASS`, `PASS-WITH-NOTES`, or `FAIL`.

## Jira Link Convention

- Ticket URL: `https://jira.hl7.org/browse/FHIR-XXXXX`.

## Workflow

### Step 1: Locate the PR Message

1. Resolve `BRANCH` through the centralized resolver:
   ```bash
   eval "$(bash .github/skills/branch-context-management/scripts/resolve-branch-context.sh | sed 's/^/export /')"
   ```
2. Use `ACTIVE_TICKETS_DIR` from the resolver output as the branch-scoped active directory.
3. Validate topology (outer repo on `main`, fork worktree exists, fork branch equals
   logical `BRANCH`):
   ```bash
   bash .github/skills/branch-context-management/scripts/check-branch-match.sh
   ```
4. Find `jira/pr/pr-<branch>.md`. If missing, stop and request running
   `create-pull-message` first.

### Step 2: Validate Required Structure

Confirm the file includes these sections:

- `# Pull Request: <BRANCH>`
- `## Summary`
- `## Validation` (Build, Ticket reconciliation, Implementation proof, Compiled-IG verification)
- `## Tickets`
- `## Open items` (present when there are open items; may be omitted only if truly none)

If sections are missing, add them using the `create-pull-message` template style.

### Step 3: Ticket Coverage and Link Checks

1. Every `FHIR-XXXXX` referenced by branch commits/changed files appears as a `## Tickets`
   line (no branch ticket is silently dropped).
2. Each ticket line is a valid markdown link to `https://jira.hl7.org/browse/FHIR-XXXXX`.
3. No ticket appears twice; ordering is stable (e.g., ascending ticket number).
4. Any ticket listed but not actually implemented on the branch is moved to `## Open items`,
   not presented as a completed change.

### Step 4: Summary Traceability Checks

For each ticket line's one-line summary:

1. The summary is traceable to that ticket's `FHIR-XXXXX-execution-summary.md` or
   `FHIR-XXXXX-resolution.md` — not invented.
2. It is a single, specific line (what changed), not vague ("various fixes") and not a
   multi-sentence paragraph.
3. It does not overstate status (no "done" claims for tickets flagged in Open items).

Rewrite only the affected summaries; keep traceable ones unchanged.

### Step 5: Validation-Line Accuracy Checks

1. `Build` line reflects a real, recent `_build.sh build` result (PASS/FAIL). If the
   build state is unknown or stale, flag it rather than asserting PASS.
2. `Ticket reconciliation` line matches the actual branch-vs-active comparison.
3. `Implementation proof` count matches the number of tickets with present, complete proof.
4. `Compiled-IG verification` count matches tickets whose resolution is actually found in the
   compiled output.
5. Any mismatch between a validation count and the `## Tickets` / `## Open items` content is
   corrected or flagged.

### Step 6: Open-Items and Consistency

1. Every accepted discrepancy, missing-proof, or not-found-in-IG ticket from
   `create-pull-message` appears under `## Open items`.
2. Remove contradictions (e.g., a ticket listed both as a completed change and an open item).
3. Keep edits minimal and scoped to quality improvements; do not change PR intent.

## Quality Gate Result

Report exactly one status:

- `PASS`: PR message is push-ready.
- `PASS-WITH-NOTES`: usable, minor improvements recommended.
- `FAIL`: not ready; missing tickets, untraceable summaries, or inaccurate validation lines.

## Important Rules

- Do not modify specification source files, ticket artifacts, or compiled IG output.
- Do not invent ticket summaries, jira links, or build results.
- Do not change which tickets belong to the branch; only improve how they are presented.
- Preserve the `create-pull-message` formatting conventions.

## Suggested Prompts

- `Run pr-message-quality-check for the current branch.`
- `Quality-gate jira/pr/pr-<branch>.md and return PASS/PASS-WITH-NOTES/FAIL.`
- `Review the PR message and fix any untraceable ticket summaries.`
