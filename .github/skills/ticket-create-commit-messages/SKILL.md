---
name: ticket-create-commit-messages
description: 'Generate scoped, context-aware commit messages for FHIR ticket implementations across the nested git repository structure. Use after ticket execution to prepare commit-outer.md and commit-fork.md files before committing.'
argument-hint: 'FHIR-XXXXX (for example: FHIR-56763)'
---

# Skill: Ticket Create Commit Messages

**Purpose**: Generate scoped, context-aware commit messages for FHIR ticket implementations across the nested git repository structure.

**Inputs**:
- `FHIR_TICKET_ID`: FHIR ticket identifier (e.g., `FHIR-56614`)

**Outputs**:
- `jira/FHIR-XXXXX/FHIR-XXXXX-commit-outer.md` — Commit message for top-level (bvdh) repository artifacts
- `jira/FHIR-XXXXX/FHIR-XXXXX-commit-fork.md` — Commit message for branch-specific fork worktree IG repository source changes

## Workflow

### Step 1: Verify Ticket Location

Resolve branch context via `branch-context-management`, then confirm the ticket exists in
`jira/active-<branch>/FHIR-XXXXX/`:

```bash
eval "$(bash .github/skills/branch-context-management/scripts/resolve-branch-context.sh | sed 's/^/export /')"
ls -d "$ACTIVE_TICKETS_DIR/FHIR-XXXXX/"
```

If not found, fail with a message requesting the user move the ticket to `jira/active-<branch>/` before proceeding.

### Step 2: Analyze Staged Changes in Top-Level Repository

Check what files are staged in the top-level (bvdh) repository:

```bash
cd /path/to/euridice-eu-health-data-api-ai-implementer
git diff --cached --name-status
git diff --cached --numstat
```

Filter for files under `jira/FHIR-XXXXX/`:
- Collect all staged artifact files (typically `FHIR-XXXXX-implementation-plan.md`, `FHIR-XXXXX-execution-summary.md`, and any other ticket artifacts).
- Note additions (A) vs. modifications (M).

### Step 3: Analyze Staged Changes in Nested Repository

Check what files are staged in the nested IG repository:

```bash
cd /path/to/euridice-eu-health-data-api-ai-implementer
eval "$(bash .github/skills/branch-context-management/scripts/resolve-branch-context.sh | sed 's/^/export /')"
git -C "$FORK_ROOT" diff --cached --name-status
git -C "$FORK_ROOT" diff --cached --numstat
```

**Filter and collect source-only changes** (exclude generated output):
- **Include**: Files under `input/` (FHIR Shorthand source, templates, configs)
- **Exclude**: Files under `output/` (generated build artifacts — these are not manually committed)
- Categorize by type:
  - Additions (A): new files created (e.g., new FSH profiles, new scripts)
  - Modifications (M): existing files changed (e.g., capability statements, profiles)
  - Deletions (D): files removed (e.g., deprecated operation definitions, obsolete profiles)

### Step 4: Generate Commit Message for Top-Level Repository

Create `jira/FHIR-XXXXX/FHIR-XXXXX-commit-outer.md` with:

**Format**:
```
FHIR-XXXXX: [concise action title]

[1-2 sentence summary of what ticket artifacts were created/updated]

Changes:
- [artifact1]: [description of content/purpose]
- [artifact2]: [description of content/purpose]
...

[If applicable, add section for related impact, such as:]
Related artifacts: [references to -implementation-plan.md, -execution-summary.md, etc.]
This commit covers ticket artifacts only. IG source changes are committed 
separately to euridice-org/eu-health-data-api repository (see FHIR-XXXXX-commit-fork.md).

Related: FHIR-XXXXX
```

**Guidelines**:
- Title should be concise (max 60 chars) and action-oriented.
- Summarize what was added (new plan? execution evidence?) and why (completion record? approval documentation?).
- For each artifact, include its path and a brief description of its content.
- If both top-level and nested changes exist, clarify that nested changes are in a separate commit.
- Always end with `Related: FHIR-XXXXX` for traceability.

### Step 5: Generate Commit Message for Nested Repository

Create `jira/FHIR-XXXXX/FHIR-XXXXX-commit-fork.md` with:

**Format**:
```
FHIR-XXXXX: [concise action title matching outer message]

Summary:
- [Key reason/objective for ticket implementation]

Changes:
- [file1] (modification type): [brief description of what changed]
- [file2] (modification type): [brief description of what changed]
...

[If applicable, add breaking change warning:]
Breaking changes:
- [description of breaking change impact, if any]
```

**Guidelines**:
- Title should match the outer commit message (same action/objective).
- Keep changes list simple: just filename, type (Added/Modified/Deleted), and one-line description.
- List breaking changes explicitly if the ticket removes or restructures published artifacts.
- Do not include a "Related:" footer in fork messages (they are scoped to source changes only).

### Step 6: Handle Missing Repository Changes

**If nested repository has no staged source changes** (or only `output/**` generated artifacts):
- Create `FHIR-XXXXX-commit-fork.md` with a note: "No source changes in IG repository for this ticket."
- Do not include `Related: FHIR-XXXXX` (fork messages are source-scoped and do not use this footer).
- Note: Generated artifacts under `output/` (build outputs) are excluded from commit tracking.

**If top-level repository has no staged changes**:
- Create `FHIR-XXXXX-commit-outer.md` with a note: "No artifact changes in top-level repository for this ticket."
- Still include `Related: FHIR-XXXXX` for consistency (outer messages always use this footer).

### Step 7: Verify and Report

Confirm both files were created:

```bash
ls -la jira/FHIR-XXXXX/FHIR-XXXXX-commit-*.md
```

Report to user:
- Files created successfully
- Summary of outer message (artifact list)
- Summary of fork message (source change list)
- Suggestion to review and edit messages if needed before committing

## Decision Rules

- If ticket is not in `jira/active-<branch>/`, ask user to move it before proceeding.
- If staged changes are empty in both repos, report and ask for clarification.
- Titles and objectives are inferred from ticket ID and diff context; if ambiguous, ask for user clarification.
- Breaking change warnings are added automatically if deletions are detected; ask user to confirm if accurate.

## Quality Criteria

Skill is complete only if all are true:

1. Ticket exists in `jira/active-<branch>/FHIR-XXXXX/`.
2. Both `FHIR-XXXXX-commit-outer.md` and `FHIR-XXXXX-commit-fork.md` files are created.
3. Outer message includes full artifact list with descriptions and ends with `Related: FHIR-XXXXX`.
4. Fork message lists all staged **source-only** changes (from `input/`; `output/` artifacts excluded) with no `Related:` footer.
5. Breaking changes (if any) are documented in fork message.
6. User confirmation and optional edits are solicited before considering complete.

## Integration with ticket-execute-plan

This skill is invoked **after Step 7** of ticket-execute-plan (after execution summary is created and staged changes are prepared). The ticket-execute-plan skill should:

1. Call this skill with the FHIR ticket ID.
2. Wait for commit message files to be generated.
3. Include the generated file paths in its status report to the user.
4. Ask user to review and optionally edit the messages before proceeding to commit.

## Suggested Prompts

- `Generate commit messages for FHIR-56614`
- `Create FHIR-56614-commit-outer.md and FHIR-56614-commit-fork.md`
- `ticket-create-commit-messages FHIR-56614`

## Related Skills

- **ticket-execute-plan**: Coordinates full ticket execution workflow; calls this skill to generate commit messages after implementation.
- **ticket-implementation-plan**: Generates implementation plan from ticket resolution; execution of that plan triggers this skill.
