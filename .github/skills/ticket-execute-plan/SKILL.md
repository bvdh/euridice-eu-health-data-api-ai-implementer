---
name: ticket-execute-plan
description: 'Execute a Jira ticket implementation plan, apply repository changes, validate with the IG build (build-ig), and iterate fixes until the build passes or blockers are documented.'
argument-hint: 'FHIR-XXXXX (for example: FHIR-56763)'
---

# Ticket Execute Plan

Execute an existing Jira implementation plan and drive it to a validated result.

This skill turns a plan into implementation by:
- Applying plan tasks as concrete file edits.
- Running the repository build through the `build-ig` skill.
- Fixing failures and re-running checks until clean or blocked.

## Pre-requisites

- A Jira ticket with an existing implementation plan: `jira/FHIR-XXXXX/FHIR-XXXXX-implementation-plan.md`.
- The IG build passes, which can be run from the fork subfolder with:
  ```bash
  cd "$FORK_ROOT" && ./_build.sh build
  ```

## Confirmed Execution Policies

- Pass policy: allow `passed-with-unrelated-blocker` when failures are proven pre-existing and unrelated to the ticket edits.
- Retry policy: perform up to 3 fix-check rounds, then escalate unresolved blockers.
- Scope policy: if a potential fix extends beyond the implementation plan scope, stop and request confirmation before editing out-of-scope files.

## When To Use

- A ticket already has `jira/FHIR-XXXXX/FHIR-XXXXX-implementation-plan.md`.
- You want implementation plus build validation in one guided loop.
- You need a reproducible execution record for review.

## Inputs

- Ticket key: `FHIR-XXXXX`
- Branch context (explicit if provided by caller; otherwise root `current-branch.md`, then resolver fallback)
- Fork worktree path from branch context resolver: `FORK_ROOT`
- Plan file: `jira/FHIR-XXXXX/FHIR-XXXXX-implementation-plan.md`
- Optional ticket metadata file: `jira/FHIR-XXXXX/FHIR-XXXXX.md`
- Active ticket directory: `jira/active-<branch>/FHIR-XXXXX/`
- Repository source trees and generated trees under:
   - `$FORK_ROOT/input/`
   - `$FORK_ROOT/output/`

## Memory Artifact

- Repository memory file: `/memories/repo/ticket-skill-learnings.md`
- Purpose: store recurring execution/debug patterns, preferred fix strategies, and validation best practices.

## Outputs

- **Execution Summary**: `jira/FHIR-XXXXX/FHIR-XXXXX-execution-summary.md`
  - Complete record of implementation tasks, file changes, build validation results, and acceptance criteria verification
  - Automatically generated at the end of each successful or documented-blocked execution
  - Used for code review, audit trails, and governance records

## Workflow

### Step 0: Load Ticket Learnings Memory

1. Read `/memories/repo/ticket-skill-learnings.md` if present.
2. Reuse relevant prior execution heuristics (for example, frequent failure triage patterns and successful fix loops).
3. If missing, continue and create/update it at the end of execution.

### Step 0.1: Enforce Active Ticket Location

1. Resolve branch context in order: explicit branch input, root `current-branch.md`, then
   resolver fallback, using:
   ```bash
   eval "$(bash .github/skills/branch-context-management/scripts/resolve-branch-context.sh | sed 's/^/export /')"
   ```
2. Use the resolved `ACTIVE_TICKETS_DIR` as the primary active-ticket location.
3. Validate branch topology before continuing:
   ```bash
   bash .github/skills/branch-context-management/scripts/check-branch-match.sh
   ```
4. Confirm the ticket exists at `jira/active-<branch>/FHIR-XXXXX/FHIR-XXXXX.md`.
5. If missing from `jira/active-<branch>/FHIR-XXXXX/FHIR-XXXXX.md`, ask the user to move it there before proceeding.
6. If the ticket is only in `jira/open/` or `jira/closed/`:
   - Stop and ask the user whether to move it to `jira/active-<branch>/` first.
   - Do not continue execution until the location is confirmed or user explicitly overrides.

### Step 1: Validate Prerequisites

1. Confirm plan file exists.
2. Confirm plan is implementation-required (not a no-op disposition).
3. Extract from the plan:
   - Implementation tasks
   - Candidate files
   - Acceptance criteria
   - Validation expectations
4. If the plan is missing, first run `ticket-implementation-plan`.
### Step 2: Build an Execution Checklist

Create a task checklist from the plan with one row per task:
- Task title
- Target file(s)
- Intended edit
- Acceptance condition
- Status: `not-started`, `in-progress`, `done`, `blocked`

Do not start edits until each task maps to real repository files.

### Step 3: Implement Planned Changes

1. Apply edits only in files justified by the plan scope.
2. Keep changes atomic and traceable to specific plan tasks.
3. Preserve existing style and repository conventions.
4. After each task, self-check acceptance criteria before marking `done`.

If a planned file path does not exist:
- Search for the correct existing equivalent.
- Update task mapping and continue.
- If no equivalent exists, mark `blocked` and record why.

### Step 4: Run Build Verification

Run the IG build from the fork subfolder (see the `build-ig` skill):

```bash
cd "$FORK_ROOT" && ./_build.sh build
```

Use offline mode when terminology connectivity is unstable:

```bash
cd "$FORK_ROOT" && ./_build.sh notx
```

Collect from output:
- Failed step names
- Error lines
- QA artifact status (`output/qa.json`)
- Proposed fixes from the build triage

### Step 5: Failure Triage and Fix Loop

If the build check fails:

1. Classify each failure as one of:
   - Regression introduced by current ticket edits
   - Pre-existing unrelated failure
   - Environment/tooling/transient issue
2. For ticket-caused regressions:
   - Patch source changes.
   - Re-run build check.
3. For pre-existing unrelated failures:
   - Keep ticket changes isolated.
   - Document the unrelated blocker with evidence.
4. For environment/tooling issues:
   - Apply safe local fix (for example, missing executable bit, missing script prerequisite) when in scope.
   - Re-run build check.

Repeat until one outcome is reached:
- Build passes for required scope.
- Remaining failure is clearly unrelated and documented as blocker.

Recommended cap: 3 fix-check rounds before escalating unresolved blockers.

### Step 6: Completion and Evidence

Finish with a concise execution summary containing:
- Implemented tasks and touched files
- Deferred or blocked items with reason
- Final build-check status
- Remaining risk notes

### Step 7: Store Execution Summary and Prepare Commit Messages

#### Substep 7a: Create Execution Summary

**Automatic**: A markdown execution summary is generated and stored in the ticket directory:
- **File**: `jira/FHIR-XXXXX/FHIR-XXXXX-execution-summary.md`
- **Content**: Complete record of implementation details, build verification results, acceptance criteria verification, and final status
- **Purpose**: Provides reproducible evidence for ticket review, governance, and audit trails

The execution summary includes:
- Ticket metadata (key, issue type, disposition)
- Summary of all changes applied with file references
- Build verification results
- Rendered output verification
- Acceptance criteria checklist
- Quality assessment and risk analysis
- Final completion status (PASSED, PASSED-WITH-UNRELATED-BLOCKER, or BLOCKED)

#### Substep 7b: Generate Commit Messages Using ticket-create-commit-messages Skill

Call the **ticket-create-commit-messages** skill to generate ready-to-use commit messages:

```
Use ticket-create-commit-messages skill with input: FHIR-XXXXX
```

This skill:
1. Analyzes staged changes in both repositories (top-level and branch-specific fork worktree)
2. Generates **`jira/FHIR-XXXXX/FHIR-XXXXX-commit-outer.md`** — Full-structured commit message for top-level (bvdh) repository ticket artifacts
3. Generates **`jira/FHIR-XXXXX/FHIR-XXXXX-commit-fork.md`** — Concise commit message for nested IG repository source changes (if applicable)

**Content Characteristics**:
- **Outer message**: Detailed title, artifact summary with descriptions, impact notes, breaking changes (if any)
- **Fork message**: Title matching outer, simple source file change list with modification types, breaking change warnings

**Purpose**:
- Ready-to-use commit messages tailored to actual staged changes
- Supports consistent documentation of implementation across repositories
- Enables quick review and optional user editing before committing

These artifacts are essential for:
- Code review and change tracking
- Governance record keeping
- Troubleshooting failed executions
- Replaying the ticket resolution for consistency checks
- Quick reference when committing staged changes

**Skill Workflow**: See `.github/skills/ticket-create-commit-messages/SKILL.md` for full details on message generation logic, decision rules, and quality criteria.

### Step 8: Stage Scope-Limited Changes and Ask for Commit

After successful execution (or documented unrelated blocker), always prepare a clean commit set:

1. Stage only files that are in the ticket implementation scope:
   - Source files changed for the ticket
   - Ticket artifacts under `jira/FHIR-XXXXX/` created/updated by this execution
2. Do **not** stage unrelated workspace changes.
3. Show staged file list and a concise staged diff summary.
4. Propose a commit message tailored to the ticket.
5. Explicitly ask the user whether to create the commit now.

If the user confirms:
- Create the commit using the proposed (or user-edited) message.

If the user declines:
- Leave staged changes intact and report how to commit later.

### Step 9: Persist Reusable Learnings to Memory (Required)

Append concise bullets to `/memories/repo/ticket-skill-learnings.md` with:

1. Common build/regression failure patterns and successful remediations.
2. Preferred execution ordering and validation techniques.
3. Reusable blocker-handling approaches.

Keep entries short, de-duplicated, and generally reusable.

## Quality Criteria

Execution is complete only if all are true:

1. Every implemented edit maps to a plan task.
2. No out-of-scope refactors were introduced.
3. `build-ig` was run at least once after edits.
4. If failures occurred, at least one fix-check iteration was performed unless blocked by unrelated issues.
5. Final status is explicit: `passed`, `passed-with-unrelated-blocker`, or `blocked`.
6. Evidence is recorded (key error lines or summary path).
7. A scope-limited staging set is prepared and commit confirmation is requested.
8. Reusable execution learnings are persisted to `/memories/repo/ticket-skill-learnings.md`.

## Decision Rules

- If plan and ticket conflict, prioritize the implementation plan.
- If plan is ambiguous, stop and raise focused clarification questions.
- If build fails only due to unrelated pre-existing issues, do not roll back valid ticket changes.
- If a fix would expand beyond ticket scope, request user confirmation before any out-of-scope edit.

## Important Rules

- Do not invent requirements beyond the implementation plan.
- Do not silently skip failed validation steps.
- Do not claim success without running build verification.
- Do not rewrite unrelated files to force a passing result.
- Do not auto-commit without explicit user confirmation.
- Do stage only ticket-scoped files before requesting commit confirmation.
- Ensure the corresponding ticket is in `jira/active-<branch>/`; if not, ask to move it before proceeding.

## Suggested Prompts

- `Execute FHIR-56763 implementation plan and validate the build.`
- `Implement jira/FHIR-56763/FHIR-56763-implementation-plan.md and run build-ig.`
- `Apply the plan for FHIR-XXXXX, run up to 3 fix-check rounds, and report status as passed, passed-with-unrelated-blocker, or blocked.`

## Related Skills

- **ticket-create-commit-messages**: Called in Step 7 to generate `FHIR-XXXXX-commit-outer.md` and `FHIR-XXXXX-commit-fork.md` files based on staged changes in both repositories.
- **ticket-implementation-plan**: Generates scoped implementation plan from ticket resolution; this skill executes that plan.
- **ticket-propose-resolution**: Creates ticket resolution proposal (FHIR-XXXXX-resolution.md) that feeds into implementation planning.
- **build-ig**: Used in Step 4 to validate builds after source changes; referenced for failure triage in Step 5.
