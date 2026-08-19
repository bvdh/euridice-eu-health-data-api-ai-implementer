#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
resolver="$script_dir/resolve-branch-context.sh"

context="$(bash "$resolver" "$@")"
branch="$(echo "$context" | sed -n 's/^BRANCH=//p')"
outer_git_branch="$(echo "$context" | sed -n 's/^OUTER_GIT_BRANCH=//p')"
fork_root="$(echo "$context" | sed -n 's/^FORK_ROOT=//p')"
fork_exists="$(echo "$context" | sed -n 's/^FORK_EXISTS=//p')"
fork_git_branch="$(echo "$context" | sed -n 's/^FORK_GIT_BRANCH=//p')"

if [[ -z "$outer_git_branch" ]]; then
  echo "ERROR: outer git branch is empty (detached HEAD or not a git checkout)." >&2
  exit 1
fi

if [[ "$outer_git_branch" != "main" ]]; then
  echo "ERROR: Outer repository must be on main. outer=$outer_git_branch" >&2
  exit 1
fi

if [[ "$fork_exists" != "true" ]]; then
  echo "ERROR: Fork worktree is missing for branch '$branch'. expected_path=$fork_root" >&2
  exit 1
fi

if [[ -z "$fork_git_branch" ]]; then
  echo "ERROR: Fork git branch is empty at $fork_root (detached HEAD or invalid repo)." >&2
  exit 1
fi

if [[ "$fork_git_branch" != "$branch" ]]; then
  echo "ERROR: Fork branch mismatch: current-branch.md/default=$branch fork=$fork_git_branch path=$fork_root" >&2
  exit 1
fi

echo "Branch context is valid: outer=main fork=$branch path=$fork_root"
