---
name: push-branch-and-open-pr
description: 'Push the current logical branch in the branch-specific fork worktree and open a pull request using the description in jira/pr/pr-<branch>.md. Use when a branch is validated and PR-ready. Requires a passing PR message (from create-pull-message + pr-message-quality-check), confirms a clean/known git state, pushes with upstream tracking after user confirmation, and opens the PR via gh (or prints a compare URL when gh is unavailable). Never force-pushes.'
argument-hint: '(optional) base branch for the PR, e.g. main'
---

# Push Branch and Open PR

Publish a validated ticket branch: push it to the remote and open a pull request whose body
is the already-reviewed `jira/pr/pr-<branch>.md`.

This is the final step after `create-pull-message` and `pr-message-quality-check`. It performs
network-affecting, hard-to-reverse actions and therefore always confirms with the user before
pushing and before opening the PR.

## When To Use

- A branch is validated and its PR message is push-ready (quality gate passed).
- You want to push and open the PR in one guided, confirmation-gated step.

## Inputs

- Current logical branch context (root `current-branch.md` when no explicit branch is supplied).
- Fork worktree path resolved as `FORK_ROOT` (default: `eu-health-data-api-<safe-branch>`, falling back to the base `eu-health-data-api/` folder).
- Base branch for the PR (argument, else `main`).
- PR message file: `jira/pr/pr-<branch>.md` (title = first `# ` heading; body = file contents).

## Output

- The branch pushed to the remote with upstream tracking.
- An opened pull request (via `gh`), or a printed compare URL if `gh` is unavailable.

## Preconditions (all required)

1. Outer repository is on `main`, fork worktree exists, and fork branch matches logical
  `BRANCH` (validated by `check-branch-match.sh`).
2. Fork worktree is not on the base branch and not in detached HEAD.
3. `jira/pr/pr-<branch>.md` exists. If missing, stop and request `create-pull-message`.
4. The PR message passed `pr-message-quality-check` (ask the user to confirm if unknown).
5. Working tree in the fork repo is committed for intended changes (`git -C "$FORK_ROOT" status --porcelain` reviewed with the
   user); do not push unrelated uncommitted work.

## Workflow

### Step 1: Resolve Branch, Base, and PR Message

```bash
eval "$(bash .github/skills/branch-context-management/scripts/resolve-branch-context.sh | sed 's/^/export /')"
BASE=${1:-main}
test -f "jira/pr/pr-${BRANCH}.md" || { echo "Missing jira/pr/pr-${BRANCH}.md"; exit 1; }
bash .github/skills/branch-context-management/scripts/check-branch-match.sh
```

- If `BRANCH` is empty, stop and explain.
- If `git -C "$FORK_ROOT" branch --show-current` equals `BASE`, stop and explain.

### Step 2: Confirm Git State

```bash
git -C "$FORK_ROOT" status --porcelain
git -C "$FORK_ROOT" log --oneline "$BASE..HEAD"
```

- Show the user the commits that will be included and any uncommitted changes.
- If uncommitted changes are unrelated to the PR, stop and let the user commit or stash them.
  Do not auto-commit.

### Step 3: Confirm Before Pushing (mandatory)

Summarize what will happen (branch, remote, base, PR title) and ask the user to confirm via
`vscode_askQuestions`: **Push and open PR / Push only / Cancel**.

- Only proceed on explicit confirmation.

### Step 4: Push the Branch

```bash
git -C "$FORK_ROOT" push -u origin "$BRANCH"
```

- Never use `--force` or `--force-with-lease`. If the push is rejected (diverged remote), stop
  and report; let the user reconcile manually.

### Step 5: Open the Pull Request

If `gh` is available and the user chose "Push and open PR":

```bash
cd "$FORK_ROOT"
gh pr create --base "$BASE" --head "$BRANCH" \
  --title "$(sed -n 's/^# //p' "../jira/pr/pr-${BRANCH}.md" | head -1)" \
  --body-file "../jira/pr/pr-${BRANCH}.md"
cd - >/dev/null
```

- If `gh` is not installed or not authenticated, print the compare URL for the user to open
  the PR manually and paste the body from `jira/pr/pr-<branch>.md`:

```bash
git -C "$FORK_ROOT" remote get-url origin
# e.g. https://github.com/<owner>/<repo>/compare/<BASE>...<BRANCH>?expand=1
```

### Step 6: Report

Report the pushed branch, the PR URL (or compare URL), and the PR title. Note any open items
carried over from the PR message that still need reviewer attention.

## Decision Rules

- Fork detached HEAD or on base branch: stop.
- Missing or unvalidated PR message: stop and route to `create-pull-message` /
  `pr-message-quality-check`.
- No explicit user confirmation: do not push.
- Push rejected due to divergence: stop and report; never force-push.
- `gh` unavailable: degrade gracefully to a compare URL; do not fail the whole flow.

## Important Rules

- This skill performs remote, hard-to-reverse actions — always confirm before pushing and
  before opening the PR.
- Never force-push, never rewrite published history, never bypass hooks (`--no-verify`).
- Do not edit specification source files, ticket artifacts, or the PR message body here; the
  body is authored by `create-pull-message` and gated by `pr-message-quality-check`.

## Suggested Prompts

- `Push this branch and open a PR using the generated PR message.`
- `Push the current fork branch and open PR against main.`
- `Push only (no PR) using jira/pr/pr-<branch>.md as the record.`
