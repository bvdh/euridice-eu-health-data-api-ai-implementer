#!/usr/bin/env bash
set -euo pipefail

branch_arg=""
repo_root_arg=""

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
    *)
      echo "Unknown argument: $1" >&2
      exit 2
      ;;
  esac
done

if [[ -z "$branch_arg" ]]; then
  echo "ERROR: --branch is required" >&2
  exit 1
fi

if [[ -n "$repo_root_arg" ]]; then
  repo_root="$repo_root_arg"
else
  repo_root="$(git rev-parse --show-toplevel 2>/dev/null || true)"
fi

if [[ -z "${repo_root:-}" || ! -d "$repo_root" ]]; then
  echo "ERROR: Could not resolve repository root." >&2
  exit 1
fi

if [[ "$branch_arg" =~ [[:space:]] ]]; then
  echo "ERROR: Branch name must not contain whitespace." >&2
  exit 1
fi

current_branch_file="$repo_root/current-branch.md"

cat > "$current_branch_file" <<EOF
# Current Branch

branch: $branch_arg
EOF

echo "Updated $current_branch_file"
