---
name: branch-context-management
description: 'Resolve, validate, and persist active branch context for branch-aware ticket and PR workflows. Use when branch is omitted, when syncing current-branch.md, or when checking branch mismatches across outer and nested repositories.'
argument-hint: '(optional) --branch <name> | --set <name> | --check-matches-git'
---

# Branch Context Management

Centralized branch management for this repository.

Use this skill as the single source of truth for:
- Resolving branch context when no explicit branch argument is provided.
- Persisting the default branch in `current-branch.md`.
- Validating topology before destructive actions (outer on `main`, fork worktree on logical branch).

## Branch Resolution Order

1. Explicit `--branch` argument
2. Root `current-branch.md`
3. `git branch --show-current`

## Scripts

- `scripts/resolve-branch-context.sh`
  - Resolves and prints normalized branch context variables.
- `scripts/set-current-branch.sh`
  - Validates and writes `current-branch.md`.
- `scripts/check-branch-match.sh`
  - Fails unless outer repo is on `main` and the branch-specific fork worktree is on the logical branch.

## Standard Outputs

`resolve-branch-context.sh` prints:
- `BRANCH`
- `SAFE_BRANCH`
- `REPO_ROOT`
- `CURRENT_BRANCH_FILE`
- `GIT_BRANCH`
- `OUTER_GIT_BRANCH`
- `FORK_ROOT`
- `FORK_EXISTS`
- `FORK_GIT_BRANCH`
- `ACTIVE_TICKETS_DIR`
- `LEGACY_ACTIVE_TICKETS_DIR`
- `PR_MESSAGE_FILE`

## Usage Examples

```bash
# Resolve using default precedence
bash .github/skills/branch-context-management/scripts/resolve-branch-context.sh

# Resolve with an explicit branch override
bash .github/skills/branch-context-management/scripts/resolve-branch-context.sh --branch feature/FHIR-12345

# Resolve with explicit fork worktree override
bash .github/skills/branch-context-management/scripts/resolve-branch-context.sh --branch feature/FHIR-12345 --fork-root /path/to/eu-health-data-api-feature-FHIR-12345

# Persist branch as default
bash .github/skills/branch-context-management/scripts/set-current-branch.sh --branch feature/FHIR-12345

# Ensure outer/fork topology is valid for current logical branch
bash .github/skills/branch-context-management/scripts/check-branch-match.sh
```

## Decision Rules

- If branch cannot be resolved by any source, stop and ask for explicit branch.
- Outer repository must remain on `main` for push/commit actions; if not, stop and ask user to reconcile.
- Logical branch is selected by `--branch` or `current-branch.md` and mapped to fork worktree path `eu-health-data-api-<safe-branch>` (falling back to the base `eu-health-data-api/` folder when no branch worktree exists).
- If the fork worktree for the logical branch is missing or checked out on the wrong branch, stop and ask user to reconcile.
- Active ticket uniqueness is mandatory: a ticket key may exist in only one `jira/active-<branch>/` set at a time.
- When moving ticket focus across branches, remove the ticket from the previous `jira/active-<branch>/` set before adding it to the new one.
- `current-branch.md` must remain machine-parseable:
  - first non-comment branch line in format `branch: <name>`.

## Quality Criteria

This skill is complete only if all are true:
1. Branch context can be resolved without inline ad-hoc parsing in other skills.
2. `current-branch.md` updates are validated and deterministic.
3. Topology checks are reusable by push/commit workflows.
4. Existing callers can migrate without breaking (compat wrappers allowed).
5. No ticket key is duplicated across multiple `jira/active-<branch>/` directories.
6. Outer `main` + fork-branch parity is enforced before destructive actions.
