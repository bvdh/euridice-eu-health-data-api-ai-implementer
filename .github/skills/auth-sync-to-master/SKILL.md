---
name: auth-sync-to-master
description: 'Merge the local EU Health Data API authorization ballot fork into the local main fork. Use when syncing eu-health-data-api-ballot-recon-auth to eu-health-data-api/main, merging the current local ballot-recon-auth state into main, or integrating the purple-marked authorization work.'
argument-hint: '[--source-repo <path>] [--target-repo <path>]'
---

# Sync Authorization Fork to Main

Merge the current local authorization ballot fork into the local main fork, then validate the merged IG. The default source repository is `eu-health-data-api-ballot-recon-auth/` on branch `eu-health-data-api-ballot-recon-auth`. The default destination is the sibling `eu-health-data-api/` on branch `main`, which tracks `origin/main`.

This is a local cross-repository integration workflow. It does not update the auth branch from main (use `update-auth-from-master` for that), and it does not push or open a pull request.

## Safety Rules

- Verify both repository paths and branch names before acting. Do not switch branches or worktrees automatically.
- Require clean source and target worktrees. If either has tracked or untracked changes, report the paths and stop; do not stash, reset, clean, or overwrite them.
- Update the destination only by fast-forwarding `main` to `origin/main`. If it cannot fast-forward, stop and report the divergence.
- Fetch the source branch from the local auth repository so its current local commit is merged, including commits not yet pushed to origin.
- Require a common merge base. Do not force unrelated histories together.
- If the merge conflicts, preserve the in-progress merge and report the conflict list. Do not resolve authorization-policy conflicts by choosing one side wholesale or inventing normative decisions.
- Never edit generated `output/` files. Do not push either repository or open a PR unless separately requested.

## Procedure

1. Resolve the two sibling paths from the workspace root:
   - Source: `eu-health-data-api-ballot-recon-auth/`
   - Target: `eu-health-data-api/`
   Accept explicit path overrides only after confirming they are Git repositories for this same IG.
2. Inspect `git status --short --branch` in both repositories. Confirm the source is on `eu-health-data-api-ballot-recon-auth` and the target is on `main`. Stop if either repository is dirty or on another branch. Preserve user changes for the user to commit or otherwise resolve.
3. In the target repository, fetch `origin`, confirm `origin/main` exists, then fast-forward local `main` with `git merge --ff-only origin/main`. If the target is ahead or has diverged, stop rather than rewriting it.
4. In the target repository, fetch the source branch from the local source repository into a temporary remote-tracking ref:

   ```bash
   git fetch ../eu-health-data-api-ballot-recon-auth \
     refs/heads/eu-health-data-api-ballot-recon-auth:refs/remotes/auth-local/eu-health-data-api-ballot-recon-auth
   ```

   Confirm the fetched ref resolves to the source repository's current `HEAD`. Check that it shares a merge base with target `main`.
5. Review the source-vs-target diff before merging. Confirm it contains the intended authorization work and existing purple-marker changes, and identify unrelated changes or generated files. If the source branch contains unexpected unrelated changes, stop and report them.
6. Start a reviewable merge in the target repository:

   ```bash
   git merge --no-ff --no-commit refs/remotes/auth-local/eu-health-data-api-ballot-recon-auth
   ```

   If Git reports conflicts, do not abort or resolve them silently. Report the conflict paths and ask for resolution. After conflicts are resolved, continue with validation.
7. Inspect the staged merge diff. Confirm authorization prose, `.auth-change` markup, and the associated CSS selectors are present; ensure no generated output files are staged. Check that no unrelated source changes are being imported.
8. Run `git diff --check`, then build from the target repository with `./_build.sh build`. Confirm SUSHI results, Publisher completion, `output/qa.json`, invalid XHTML count, QA counts, and broken links. Compare against known baseline findings; do not attribute pre-existing QA errors to this merge without evidence.
9. If the build succeeds and the staged diff is correct, complete the local merge commit with the repository-generated merge message. If validation fails, leave the merge in progress and report the failure; do not create a merge commit until the user decides how to proceed.
10. Confirm target branch `main`, completed merge status, and clean worktree. Do not push or alter the source branch.

## Completion Report

Report source and target repositories/branches, source commit merged, whether target `main` was fast-forwarded from `origin/main`, changed-file summary, build and QA results, unresolved conflicts, and whether a local merge commit was created. State that no push was performed.