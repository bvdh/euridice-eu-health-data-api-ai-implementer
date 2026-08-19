#!/usr/bin/env bash
set -euo pipefail

branch_arg=""
repo_root_arg=""
fork_root_arg=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --branch)
      branch_arg="${2:-}"
      shift 2
      ;;
    --repo-root)
      repo_root_arg="${2:-}"
      shift 2
      ;;
    --fork-root)
      fork_root_arg="${2:-}"
      shift 2
      ;;
    *)
      echo "Unknown argument: $1" >&2
      exit 2
      ;;
  esac
done

if [[ -n "$repo_root_arg" ]]; then
  repo_root="$repo_root_arg"
else
  repo_root="$(git rev-parse --show-toplevel 2>/dev/null || true)"
fi

if [[ -z "${repo_root:-}" || ! -d "$repo_root" ]]; then
  echo "ERROR: Could not resolve repository root. Run from a git repository or pass --repo-root." >&2
  exit 1
fi

current_branch_file="$repo_root/current-branch.md"

read_branch_from_file() {
  local file_path="$1"
  local line=""

  [[ -f "$file_path" ]] || return 0

  line="$(grep -v '^[[:space:]]*$' "$file_path" | grep -v '^[[:space:]]*#' | head -n1 || true)"
  line="${line%$'\r'}"
  line="$(echo "$line" | sed -E 's/^[[:space:]]+|[[:space:]]+$//g')"

  if [[ -z "$line" ]]; then
    return 0
  fi

  if [[ "$line" =~ ^[Bb]ranch:[[:space:]]*(.+)$ ]]; then
    echo "${BASH_REMATCH[1]}"
  else
    echo "${line%%[[:space:]]*}"
  fi
}

branch_file_value="$(read_branch_from_file "$current_branch_file")"
outer_git_branch="$(git -C "$repo_root" branch --show-current 2>/dev/null || true)"

if [[ -n "$branch_arg" ]]; then
  branch="$branch_arg"
elif [[ -n "$branch_file_value" ]]; then
  branch="$branch_file_value"
elif [[ -n "$outer_git_branch" ]]; then
  branch="$outer_git_branch"
else
  echo "ERROR: Could not resolve branch from --branch, current-branch.md, or git." >&2
  exit 1
fi

safe_branch="${branch//\//-}"

if [[ -n "$fork_root_arg" ]]; then
  fork_root="$fork_root_arg"
elif [[ -d "$repo_root/eu-health-data-api-$safe_branch" ]]; then
  fork_root="$repo_root/eu-health-data-api-$safe_branch"
else
  fork_root="$repo_root/eu-health-data-api"
fi

fork_exists="false"
fork_git_branch=""
if git -C "$fork_root" rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  fork_exists="true"
  fork_git_branch="$(git -C "$fork_root" branch --show-current 2>/dev/null || true)"
fi

cat <<EOF
BRANCH=$branch
SAFE_BRANCH=$safe_branch
REPO_ROOT=$repo_root
CURRENT_BRANCH_FILE=$current_branch_file
GIT_BRANCH=$outer_git_branch
OUTER_GIT_BRANCH=$outer_git_branch
FORK_ROOT=$fork_root
FORK_EXISTS=$fork_exists
FORK_GIT_BRANCH=$fork_git_branch
ACTIVE_TICKETS_DIR=$repo_root/jira/active-$safe_branch
LEGACY_ACTIVE_TICKETS_DIR=$repo_root/jira/active
PR_MESSAGE_FILE=$repo_root/jira/pr/pr-$branch.md
EOF
