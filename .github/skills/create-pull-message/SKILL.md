---
name: create-pull-message
description: 'Generate a pull-request description for the current logical ticket branch resolved by branch-context-management and implemented in the branch-specific fork worktree. Use when preparing a PR message, drafting release notes for a ticket branch, or verifying that a branch is PR-ready. Validates the build, reconciles branch tickets against active tickets (prompting to stop/fix/continue on discrepancy), confirms each active ticket is implemented in the branch with proof, checks the resolution is present in the compiled IG, then writes jira/pr/pr-<branch>.md with a jira link and one-line change summary per ticket.'
argument-hint: '(optional) base ref to diff against, e.g. main or origin/main'
---

# Create Pull Message

**Purpose**: Produce a review-ready pull-request description for the current logical branch,
implemented in the branch-specific fork worktree, gated by build, ticket
reconciliation, per-ticket implementation proof, and compiled-IG verification. The final
description is written to `jira/pr/pr-<branch>.md`.

**Inputs**:
- Current logical branch (resolved in order: explicit branch context, root
   `current-branch.md`, then resolver fallback).
- Fork worktree path resolved by `branch-context-management` (`FORK_ROOT`).
- Optional base ref to diff against (default: `main`; fall back to the repo's default branch
   if `main` is absent) in the fork repo.
- Active tickets: the set of `jira/active-<branch>/FHIR-XXXXX/` directories resolved from
   `branch-context-management`.
- Per-ticket proof artifacts under `jira/active-<branch>/FHIR-XXXXX/`:
  `FHIR-XXXXX-resolution.md`, `FHIR-XXXXX-execution-summary.md`,
  `FHIR-XXXXX-commit-outer.md`, `FHIR-XXXXX-commit-fork.md`.
- Compiled IG output: `$FORK_ROOT/output/`.

**Outputs**:
- `jira/pr/pr-<branch>.md` — the suggested PR description, with one jira link and a one-line
  change summary per ticket.
- An on-screen validation report (build result, ticket reconciliation, per-ticket proof,
  compiled-IG verification).

## When To Use

- You are about to open a pull request from a ticket branch and need a description.
- You want to confirm a branch is PR-ready (builds, tickets reconciled, proof present).
- You want a consistent, verifiable PR artifact stored in-repo before pushing.

## Jira Link Convention

- Ticket URL: `https://jira.hl7.org/browse/FHIR-XXXXX`.

## Workflow

### Step 0: Resolve Branch and Base

1. From the outer repo root, resolve logical branch context:
   ```bash
   eval "$(bash .github/skills/branch-context-management/scripts/resolve-branch-context.sh | sed 's/^/export /')"
   BRANCH="$BRANCH"
   ```
   Store as `BRANCH`. If empty (detached HEAD and no valid `current-branch.md`), stop and ask
   the user to check out a branch or set `current-branch.md`.
2. Set `ACTIVE_DIR` to the resolved `ACTIVE_TICKETS_DIR` relative path.
3. Validate topology before continuing (outer repo on `main`, fork worktree exists, fork
   branch equals logical `BRANCH`):
   ```bash
   bash .github/skills/branch-context-management/scripts/check-branch-match.sh
   ```
4. Determine the base ref in the fork repository (argument, else `main`, else the default branch):
   ```bash
   git -C "$FORK_ROOT" rev-parse --verify --quiet main || git -C "$FORK_ROOT" symbolic-ref --short refs/remotes/origin/HEAD
   ```
   Store as `BASE`.

### Step 1: Build Check (mandatory)

Confirm the project builds before drafting a PR message. Run the full build and QA
flow from the fork subfolder:

```bash
cd "$FORK_ROOT" && ./_build.sh build
```

- If the build **fails**, stop. Report the failure and do not draft the PR message.
- If the build **succeeds**, record the result and continue. This step also refreshes the
  compiled IG output used by Step 4, so the compiled-IG check reflects the current branch.

### Step 2: Reconcile Branch Tickets Against Active Tickets

1. Collect the **branch ticket set** — every `FHIR-XXXXX` referenced by commits unique to the
   branch and by changed files:
   ```bash
   git -C "$FORK_ROOT" log --format='%H %s' "$BASE..HEAD" | grep -oiE 'FHIR-[0-9]+' | sort -u
   git -C "$FORK_ROOT" diff --name-only "$BASE..HEAD" -- input/ | grep -oiE 'FHIR-[0-9]+' | sort -u
   ```
2. Collect the **active ticket set**:
   ```bash
   find "$ACTIVE_TICKETS_DIR" -mindepth 1 -maxdepth 1 -type d -name 'FHIR-*' -printf '%f\n' | sort -u
   ```
3. Compute discrepancies:
   - **In branch but not active** — implemented on the branch yet missing from
      `jira/active-<branch>/`.
   - **Active but not in branch** — present in the active directory yet not implemented on this branch.
4. **If any discrepancy exists**, describe each discrepancy precisely (which tickets, which
   direction) and use `vscode_askQuestions` to ask the user to choose:
   - **Stop** — abort the skill without writing a PR message.
      - **Fix** — adjust the active set by adding or removing a ticket directory under
         `jira/active-<branch>/`, then re-run this step to
       reconcile.
   - **Continue** — proceed with the reconciled set as-is, recording the accepted
     discrepancies in the PR message under an "Open items" note.
5. Do not proceed to Step 3 until the sets reconcile or the user explicitly chooses Continue.

### Step 3: Verify Each Active Ticket Is Implemented With Proof

For every ticket in the (reconciled) active set, confirm it is implemented **in the branch**
and that proof is present:

1. **Proof artifacts exist** under `jira/active-<branch>/FHIR-XXXXX/`:
   - `FHIR-XXXXX-execution-summary.md` documenting implemented changes and a final status of
     `PASSED` (or `PASSED-WITH-UNRELATED-BLOCKER`).
   - `FHIR-XXXXX-resolution.md` describing the intended change.
2. **Branch contains the implementation** — the branch changed the files the execution
   summary claims (source under `$FORK_ROOT/input/`, and/or ticket artifacts):
   ```bash
   git -C "$FORK_ROOT" diff --name-only "$BASE..HEAD" -- input/
   ```
   Cross-check the changed files against the execution summary's file list.
3. Classify each ticket:
   - **Implemented + proven** — proof artifacts present and branch changes match.
   - **Missing proof** — implemented on the branch but execution summary absent/incomplete.
   - **Not implemented** — active but no matching branch changes.
4. If any ticket is **Missing proof** or **Not implemented**, report it and ask the user
   (via `vscode_askQuestions`) whether to Stop, Fix, or Continue (recording it as an open
   item). Only proven tickets contribute a normal PR line; unresolved ones are flagged.

### Step 4: Verify Resolution Is Present in the Compiled IG

For each implemented ticket, confirm the resolution actually appears in the **compiled**
outer IG output (not just the source):

1. Derive the expected rendered evidence from `FHIR-XXXXX-resolution.md` /
   `FHIR-XXXXX-execution-summary.md` (e.g., changed page text, added/removed menu entry,
   renamed link, new/removed artifact).
2. Search the compiled output for that evidence:
   ```bash
   grep -rniE '<expected-evidence>' \
       "$FORK_ROOT/output"
   ```
   Prefer confirming both presence of the new state and absence of the old state where the
   change is a replacement/removal.
3. Classify each ticket as **Confirmed in compiled IG** or **Not found in compiled IG**.
   If not found, report it; if the build in Step 1 was skipped or stale, re-run the build
   first. Ask Stop/Fix/Continue on unresolved cases.

### Step 5: Write the Pull Message

1. Ensure the output directory exists:
   ```bash
   mkdir -p jira/pr
   ```
2. Write `jira/pr/pr-<branch>.md` using the structure below. Include **one jira link and one
   one-line change summary per ticket**, derived from each ticket's execution summary /
   resolution (not invented). Flag any ticket that failed Step 3 or Step 4.

```markdown
# Pull Request: <BRANCH>

## Summary
One short paragraph describing the overall intent of the branch.

## Validation
- Build: PASS (`_build.sh build`, <timestamp>)
- Ticket reconciliation: <clean | discrepancies accepted, see Open items>
- Implementation proof: <N/N tickets proven>
- Compiled-IG verification: <N/N tickets confirmed>

## Tickets
- [FHIR-XXXXX](https://jira.hl7.org/browse/FHIR-XXXXX) — <one-line summary of the change made for this ticket>
- [FHIR-YYYYY](https://jira.hl7.org/browse/FHIR-YYYYY) — <one-line summary>

## Open items
- <Any accepted discrepancies, missing proof, or unconfirmed-in-IG tickets; omit section if none>
```

3. Report the file path and a concise validation summary to the user.

### Step 6: Run the PR Message Quality Gate (recommended)

After writing `jira/pr/pr-<branch>.md`, invoke the companion skill `pr-message-quality-check`
for the same branch and apply any fixes it identifies. When the PR is ready to publish, hand
off to `push-branch-and-open-pr`, which pushes the branch and opens the PR using this file as
the body.

## Decision Rules

- Detached HEAD (no branch): stop and ask the user to check out a branch.
- Build fails in Step 1: stop; do not draft a PR message.
- Ticket-set discrepancy (Step 2): describe it and ask Stop / Fix / Continue; never silently
   proceed. "Fix" means add or remove a ticket directory from `jira/active-<branch>/`.
- Missing implementation proof (Step 3) or resolution not found in compiled IG (Step 4):
  report and ask Stop / Fix / Continue; if Continue, record under "Open items".
- One-line ticket summaries must be traceable to the ticket's execution summary or resolution;
  do not invent change descriptions.
- Do not modify specification source files or ticket artifacts as a side effect (Step 2 "Fix"
  active-set edits are the only allowed change, and only with user confirmation).

## Quality Criteria

The skill is complete only if all are true:

1. `BRANCH` resolved from branch context and topology-validated against `FORK_ROOT`.
2. Build check ran and passed (or the user was stopped on failure).
3. Branch ticket set reconciled against the active ticket set (or the user chose Continue with
   discrepancies recorded).
4. Each active ticket classified for implementation + proof presence.
5. Each implemented ticket checked for presence of its resolution in the compiled IG output.
6. `jira/pr/pr-<branch>.md` written with a jira link and a one-line change summary per ticket.
7. Any unresolved discrepancies/proof gaps are surfaced in the PR message "Open items".

## Suggested Prompts

- `Create a pull message for the current branch.`
- `Generate jira/pr/pr-<branch>.md and reconcile branch tickets against active.`
- `Draft the PR description; diff against origin/main.`
