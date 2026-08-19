---
name: ticket-commit
description: 'Commit ticket-related changes to both repositories (top-level and nested IG fork) with pre-commit validation of builds, file alignment, and proposed corrections for any mismatches between commit messages and actual staged changes.'
argument-hint: 'FHIR-XXXXX (for example: FHIR-56763)'
---

# Skill: Ticket Commit

**Purpose**: Commit ticket-related changes to both repositories (top-level and nested IG fork) with pre-commit validation of builds, file alignment, and proposed corrections for any mismatches between commit messages and actual staged changes.

**Inputs**:
- `FHIR_TICKET_ID`: FHIR ticket identifier (e.g., `FHIR-56614`)

**Fork commit versioning**: A ticket may require more than one fork commit (for example, an initial implementation followed by a later refinement round). Each fork commit keeps its own retained message file, version-postfixed:
- `FHIR-XXXXX-commit-fork.md` — first fork commit
- `FHIR-XXXXX-commit-fork-2.md` — second fork commit
- `FHIR-XXXXX-commit-fork-N.md` — Nth fork commit

Earlier fork message files are **never overwritten**; each remains the record of its commit. The **active** fork message is the highest-numbered file whose `input/` changes have not yet been committed. The top-level (outer) commit remains a single message file (`FHIR-XXXXX-commit-outer.md`) that references all fork message versions.

**Outputs**:
- One top-level (outer) commit plus one or more nested (fork) commits, each with its own retained, version-postfixed message
- Verification report confirming build validation and alignment
- Proposed corrections to execution summary and commit messages if file mismatches detected
- Success/failure status with diagnostics if validation fails

## Workflow

### Step 1: Verify Ticket and Commit Messages Exist

Resolve branch context via `branch-context-management`, then confirm the ticket is in
`jira/active-<branch>/` and that commit message files have been prepared:

```bash
eval "$(bash .github/skills/branch-context-management/scripts/resolve-branch-context.sh | sed 's/^/export /')"
ACTIVE_TICKETS_DIR_REL="${ACTIVE_TICKETS_DIR#$REPO_ROOT/}"
ls -d "$ACTIVE_TICKETS_DIR/FHIR-XXXXX/"
ls "$ACTIVE_TICKETS_DIR/FHIR-XXXXX/FHIR-XXXXX-commit-outer.md"
# List every fork commit message, version-ordered (commit-fork.md, commit-fork-2.md, ...)
ls -v "$ACTIVE_TICKETS_DIR/FHIR-XXXXX/"FHIR-XXXXX-commit-fork*.md
```

At least one `FHIR-XXXXX-commit-fork*.md` must exist. If branch-scoped files are missing, fail with a message requesting the user run ticket-create-commit-messages skill first.

**Resolve the active fork message** (`ACTIVE_FORK_MSG`) — the fork commit message for the currently uncommitted `input/` changes:
- If only `FHIR-XXXXX-commit-fork.md` exists and no fork commit has been made yet, it is the active message.
- If earlier versions are already committed (their content matches existing fork commits in `git -C "$FORK_ROOT" log`), the active message is the highest-numbered `FHIR-XXXXX-commit-fork-N.md` not yet committed.
- If all existing fork messages are already committed but new `input/` changes are present, a new version file (`FHIR-XXXXX-commit-fork-<next>.md`) is required — instruct the user to run ticket-create-commit-messages to generate the next version, then rerun. Never overwrite a committed message file.

### Step 2: Read Commit Messages and Execution Summary

Read all three documentation files:

```bash
cat "$ACTIVE_TICKETS_DIR/FHIR-XXXXX/FHIR-XXXXX-commit-outer.md"
cat "$ACTIVE_TICKETS_DIR/FHIR-XXXXX/FHIR-XXXXX-commit-fork.md"
cat "$ACTIVE_TICKETS_DIR/FHIR-XXXXX/FHIR-XXXXX-execution-summary.md"
```

Extract and store:
- Outer message: expected artifact files and their descriptions
- Fork message: expected source files (input/ only) and modification types
- Execution summary: documented changes and status

### Step 3: Validate Execution Summary Exists and Documents Changes

Verify the ticket execution summary exists and is complete:

```bash
cat "$ACTIVE_TICKETS_DIR/FHIR-XXXXX/FHIR-XXXXX-execution-summary.md"
```

Check that the execution summary:
- Documents the ticket key, status, and resolution basis
- Lists all implemented changes with file references
- Confirms build validation results
- Provides final status (PASSED, PASSED-WITH-UNRELATED-BLOCKER, or BLOCKED)

If execution summary is missing or incomplete:
- Fail with message: "Execution summary not found or incomplete. Run ticket-execute-plan first."

### Step 4: Validate Top-Level Staged Changes Match Outer Message



Check what is staged in the top-level repository under jira/FHIR-XXXXX/:

```bash
git diff --cached --name-status -- jira/FHIR-XXXXX/
```

Extract file list from outer commit message.

**Validation**: Confirm that all files listed in the outer message are staged:
- For each artifact file mentioned in the message, verify it has status A (added) or M (modified)
- If a file mentioned in the message is not staged, record mismatch
- If unexpected files are staged (not mentioned), record mismatch

**On mismatch detected**, propose updates:
1. Generate corrected outer commit message reflecting actual staged files
2. Update `jira/FHIR-XXXXX/FHIR-XXXXX-commit-outer.md` with corrected message
3. Report to user what changed and request confirmation to proceed

### Step 5: Validate Nested Staged Changes Match Fork Message

Check what is staged in the branch-specific fork worktree under `input/`:

```bash
git -C "$FORK_ROOT" diff --cached --name-status -- input/
```

Extract the file list from the **active** fork commit message (`ACTIVE_FORK_MSG`, resolved in Step 1; source-only, excludes igs/).

**Validation**: Confirm that all files listed in the fork message are staged:
- For each source file mentioned in the message, verify its modification type (A/M/D) matches the message
- If a file mentioned in the message is not staged, record mismatch
- If unexpected files are staged (not mentioned), record mismatch

### Step 6: Handle File Mismatches and Propose Corrections

If Step 4 or Step 5 detected file mismatches:

1. **Compile mismatch report**:
   - List files in commit messages but not staged
   - List files staged but not in commit messages
   - Show modification types for each file

2. **Propose corrected messages**:
   - Regenerate execution summary (`FHIR-XXXXX-execution-summary.md`) with accurate "Implemented Changes" section reflecting actual staged files
   - Regenerate outer commit message (`FHIR-XXXXX-commit-outer.md`) reflecting actual top-level artifacts
   - Regenerate fork commit message (`FHIR-XXXXX-commit-fork.md`) reflecting actual source files

3. **Request user confirmation**:
   ```
   ⚠️ File Mismatch Detected
   
   Expected vs. Actual:
   - [mismatch details]
   
   Proposed Updates:
   - FHIR-56614-execution-summary.md
   - FHIR-56614-commit-outer.md
   - FHIR-56614-commit-fork.md
   
   Proceed with updated messages? (yes/no)
   ```

4. **If user confirms**, update all three files and proceed to Step 7
5. **If user declines**, stop and ask user to manually adjust staged files or messages, then rerun skill

### Step 7: Rebuild IGs to Validate Current Build State

Ensure the IGs are freshly built from current source:

```bash
cd "$FORK_ROOT"
./_build.sh build
```

Wait for completion. If build fails:
- Capture error output
- Fail with diagnostic: "IG build validation failed. Resolve build errors before committing."
- Do not proceed to commit.

If build succeeds:
- Document that the build completed successfully
- Proceed to Step 8

### Step 8: Commit to Top-Level Repository

Create commit in the top-level (bvdh) repository:

```bash
git add "$ACTIVE_TICKETS_DIR/FHIR-XXXXX/FHIR-XXXXX-commit-outer.md"
# Stage every fork commit message version so the outer artifact commit records them all
git add "$ACTIVE_TICKETS_DIR/FHIR-XXXXX/"FHIR-XXXXX-commit-fork*.md
git commit -F "$ACTIVE_TICKETS_DIR/FHIR-XXXXX/FHIR-XXXXX-commit-outer.md"
```

If commit fails:
- Capture error and report to user
- Do not attempt commit to nested repo

If commit succeeds:
- Record commit hash
- Proceed to Step 9

### Step 9: Commit to Nested Repository

Create commit in the branch-specific fork worktree repository:

```bash
cd "$FORK_ROOT"
# Commit using the ACTIVE fork message resolved in Step 1 (e.g., FHIR-XXXXX-commit-fork-2.md for the second fork commit)
git commit -F "../$ACTIVE_TICKETS_DIR_REL/FHIR-XXXXX/${ACTIVE_FORK_MSG}"
cd ..
```

Only the changes for the active fork commit are committed here; previously committed fork rounds are left untouched and their message files retained. If several new fork rounds are pending (multiple uncommitted version files), commit them in ascending version order, each with its own message.

If commit fails:
- Report failure with error output
- Note that top-level commit was already created; user may need to rollback top-level commit manually if needed

If commit succeeds:
- Record commit hash
- Proceed to Step 10

### Step 9: Generate Verification Report

Report to user:

```
✅ Ticket Commit Verification Complete

Ticket: FHIR-XXXXX
Final Status: SUCCESS (or specific blocker if applicable)

Pre-Commit Validation:
- ✅ Commit message files exist and readable
- ✅ IG build succeeded
- ✅ Execution summary exists and documents changes
- ✅ Top-level staged changes match outer message
- ✅ Nested staged changes match fork message

Commits Created:
1. Top-level (bvdh/euridice-eu-health-data-api-ai-implementer):
   - Commit: [hash]
   - Message: FHIR-XXXXX: [title from outer message]
   
2. Nested (euridice-org/eu-health-data-api):
   - Commit: [hash]
   - Message: FHIR-XXXXX: [title from fork message]

Next Steps:
- Push commits to upstream repositories when ready
- Verify commits appear in branch history
```

## Decision Rules

- If ticket not in `jira/active-<branch>/`, fail immediately
- If commit messages not found, fail with suggestion to run ticket-create-commit-messages
- If file mismatch detected in Step 5 or 6, propose corrections to execution summary and commit messages; allow user to confirm updates
- If user rejects proposed corrections, stop and ask user to manually adjust staged files or messages
- If IG build fails, stop and do not commit (build validation is mandatory)
- If execution summary missing, fail (it is the source of truth for what changed)
- If all validations pass (or user confirms corrected messages), proceed to create commits
- Commits are created sequentially (top-level first, then nested) to allow independent recovery if one fails
- A ticket may have multiple fork commits; each uses its own version-postfixed message file (`FHIR-XXXXX-commit-fork.md`, `FHIR-XXXXX-commit-fork-2.md`, ...). Use the active (highest-numbered uncommitted) message for the current fork commit
- Never overwrite a fork message file whose commit already exists in `git log`; if a new fork round is needed, require a new version-postfixed message (via ticket-create-commit-messages)

## Quality Criteria

Skill is complete only if all are true:

1. Ticket exists in `jira/active-<branch>/FHIR-XXXXX/`
2. Commit message files exist and are readable
3. Execution summary exists and documents the ticket changes
4. File mismatch check completes (may propose corrections)
5. If mismatches detected, user confirms or declines proposed corrections
6. If corrections accepted, execution summary and commit messages are updated
7. IG build completes successfully (_build.sh for nested repo)
8. Top-level staged changes match execution summary and outer commit message
9. Nested staged changes match execution summary and the active fork commit message
10. Commit to top-level repository succeeds
11. Commit to nested repository succeeds using the active version-postfixed fork message; earlier fork message files remain retained and unmodified
12. Verification report is generated with commit hashes

## Integration with ticket-execute-plan

This skill is invoked **after Step 8** of ticket-execute-plan (after staged changes are prepared and commit messages are reviewed). The ticket-execute-plan skill should:

1. Ask user to review commit messages before proceeding
2. Call this skill with the FHIR ticket ID
3. Wait for commits to complete
4. Report success or failure back to user

## Suggested Prompts

- `Commit FHIR-56614`
- `ticket-commit FHIR-56614`
- `Create commits for FHIR-56614 with validation`

## Related Skills

- **ticket-create-commit-messages**: Generates commit message files that this skill consumes. For a new fork round on a ticket that already has committed fork message(s), it creates the next version-postfixed file (`FHIR-XXXXX-commit-fork-N.md`) rather than overwriting an existing one.
- **ticket-execute-plan**: Coordinates full ticket workflow; calls this skill after execution summary and commit messages are prepared
- **build-ig**: Referenced for understanding IG build validation; ticket-commit uses `_build.sh build` for validation