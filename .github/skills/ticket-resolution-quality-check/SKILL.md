---
name: ticket-resolution-quality-check
description: 'Review and strengthen a Jira ticket resolution proposal file (FHIR-XXXXX-resolution.md). Use for evidence completeness checks, disposition A/B/C quality review, recommendation clarity checks, and pre-workgroup quality gating.'
argument-hint: 'FHIR-XXXXX (for example: FHIR-56763)'
user-invocable: true
---

# Ticket Resolution Quality Check

Validate and improve the quality of a proposed resolution for one Jira ticket.

This companion skill is intended to run after `ticket-propose-resolution`.
It is the required quality gate called by Step 7 in `ticket-propose-resolution`.
If a `FHIR-XXXXX-resolution.md` file was manually edited, run this skill before `ticket-implementation-plan`.

## When To Use

- A `FHIR-XXXXX-resolution.md` file exists and needs quality review.
- You want to catch weak recommendations before workgroup discussion.
- You want a consistent quality gate for all ticket resolution proposals.

## Inputs

- Ticket key: `FHIR-XXXXX`
- Resolution file:
  - `jira/open/FHIR-XXXXX/FHIR-XXXXX-resolution.md`
  - `jira/active-<branch>/FHIR-XXXXX/FHIR-XXXXX-resolution.md`
  - `jira/closed/FHIR-XXXXX/FHIR-XXXXX-resolution.md`
- Optional source ticket for evidence cross-check:
  - `jira/*/FHIR-XXXXX/FHIR-XXXXX.md`

## Output

- Updated `FHIR-XXXXX-resolution.md` with improved quality, plus a concise check summary.

## Memory Artifact

- Repository memory file: `/memories/repo/ticket-skill-learnings.md`
- Purpose: retain recurring quality findings, strong recommendation patterns, and reusable review heuristics.

## Workflow

### Step 0: Load Ticket Learnings Memory

1. Read `/memories/repo/ticket-skill-learnings.md` if present.
2. Reuse relevant prior quality heuristics and known pitfalls.
3. If missing, continue and create/update it at the end of the run.

### Step 0.1: Enforce Active Ticket Location

1. Resolve branch context using:
  ```bash
  eval "$(bash .github/skills/branch-context-management/scripts/resolve-branch-context.sh | sed 's/^/export /')"
  ```
2. Confirm the ticket exists at `jira/active-<branch>/FHIR-XXXXX/FHIR-XXXXX.md`.
3. If missing from the branch-scoped active directory, ask the user to move the ticket there first.
2. If the ticket is only in `jira/open/` or `jira/closed/`:
  - Stop and ask the user whether to move it to `jira/active-<branch>/` first.
  - Do not continue quality checking until the location is confirmed or user explicitly overrides.

### Step 1: Locate Resolution Artifact

1. Find `FHIR-XXXXX-resolution.md` in `jira/open`, `jira/active-<branch>` (or legacy `jira/active`), or `jira/closed`.
2. If missing, stop and request running `ticket-propose-resolution` first.

### Step 2: Validate Required Structure

Confirm the file includes:

- `Ticket Summary`
- `Description`
- `Implementation Status`
- `Disposition Analysis`
- `Proposed Dispositions`
  - `Disposition A`
  - `Disposition B`
  - `Disposition C`
- `Recommendation`
- `Next Steps`
- `Verification Checklist`

If sections are missing, add them using the established template style.

### Step 3: Evidence Quality Checks

Check each evidence claim for traceability:

1. Claims tied to ticket metadata/status are consistent with `FHIR-XXXXX.md`.
2. Implementation claims reference concrete evidence (PR URL, commit hash, or comment note).
3. Ambiguous or missing evidence is explicitly called out instead of inferred.

If weak, rewrite only the affected statements.

### Step 4: Disposition Quality Checks

For each of A/B/C:

1. `Proposal` is concrete (specific action, not vague intent).
2. `Justification` explains trade-offs and rationale.
3. A/B/C are meaningfully distinct from each other.

If not distinct or too vague, refine wording to make options decision-ready.

### Step 5: Recommendation Quality Checks

Ensure recommendation quality:

1. `Recommended disposition` is exactly one of `A`, `B`, or `C`.
2. Rationale explains why this is better than the other options.
3. Rationale references available evidence and implementation impact.

### Step 6: Checklist and Consistency

1. Align checklist items with actual content (do not check boxes without support).
2. Remove contradictions between sections (for example, `Pending` status with definitive implementation claim).
3. Keep edits minimal and scoped to quality improvements.

### Step 7: Persist Reusable Learnings to Memory (Required)

Append concise bullets to `/memories/repo/ticket-skill-learnings.md` with:

1. Common quality failures observed.
2. Preferred fixes that consistently improved resolution quality.
3. Recommendation phrasing patterns that improved workgroup readability.

Keep entries short, de-duplicated, and reusable across tickets.

## Quality Gate Result

After review, report one status:

- `PASS`: resolution is workgroup-ready.
- `PASS-WITH-NOTES`: usable, but minor improvements recommended.
- `FAIL`: not ready; significant missing evidence/clarity.

## Important Rules

- Do not modify specification source files.
- Do not invent PRs, commits, or implementation evidence.
- Do not change ticket intent; only improve quality and clarity.
- Preserve existing repository formatting conventions in ticket artifacts.
- Update memory with generalized learnings only; avoid ticket-specific sensitive detail.
- Ensure the corresponding ticket is in `jira/active-<branch>/`; if not, ask to move it before proceeding.

## Suggested Prompts

- `Run ticket-resolution-quality-check for FHIR-56763.`
- `Review and improve FHIR-56574-resolution.md for workgroup readiness.`
- `Quality-gate this resolution and return PASS/PASS-WITH-NOTES/FAIL for FHIR-56768.`