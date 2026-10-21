---
name: auth-update-from-master
description: 'Update the EU Health Data API authorization ballot branch from the upstream base branch, then reapply purple text and left-bar markers to changed authorization prose. Use when refreshing ballot-recon-auth from master/main, reapplying auth-purple-text markers after an upstream merge, or preparing the branch to merge back into the base branch.'
argument-hint: '[--source-ref <remote-branch>]'
---

# Update Authorization From Master

Refresh the authorization ballot branch from its agreed upstream source, then mark only the authorization prose that differs from that source. The intended target worktree is `eu-health-data-api-ballot-recon-auth/`; its current Git branch is `eu-health-data-api-ballot-recon-auth`. In this checkout, the default source is `origin/main`. Use `--source-ref origin/master` when a distinct master ref is intended.

## Safety Rules

- Do not overwrite or discard user changes. Require a clean nested IG worktree before merging; if it is dirty, report the paths and stop for the user to commit, save, or otherwise resolve them.
- Confirm the target worktree and branch before any merge. Do not switch branches automatically.
- Fetch and merge the explicit source ref. Do not silently substitute a different branch when the user explicitly names one.
- In the current checkout, `origin` publishes `main` but not `master`; default to `origin/main`. If the user explicitly requests `master` and that ref is missing, stop and ask whether to use another branch or remote.
- If the merge conflicts, preserve the in-progress merge and report the conflicted files. Do not choose `ours` or `theirs` wholesale, abort, or make normative authorization decisions without direction.
- Never edit generated `output/` files. Do not merge the ballot branch back into the source branch, push, or create a separate commit for the marker edits unless explicitly requested. The upstream merge itself may create its normal merge commit.

## Procedure

1. Confirm the workspace root and nested repositories. Work only in `eu-health-data-api-ballot-recon-auth/`; confirm its current branch is `eu-health-data-api-ballot-recon-auth` and that the outer orchestration repository remains untouched.
2. Check `git status --short` in the nested worktree. Stop if it is not clean; do not hide or stash edits automatically.
3. Resolve the source ref from `--source-ref`, otherwise use `origin/main`. Confirm that the remote and ref exist. If the selected ref is absent, ask which source branch or remote to use before proceeding.
4. Fetch the selected source ref, inspect the ahead/behind state and merge base, then merge it into the target branch with a normal merge. Preserve the merge result. If there are conflicts, stop and request resolution; after they are resolved, continue from the resulting clean or known worktree state.
5. Build a source-diff inventory against the fetched source, for example `git diff <source-ref>...HEAD`. Restrict annotation candidates to added or materially revised, human-readable authorization prose. Inspect hunk context rather than marking every authorization mention in a changed file. Include Markdown narratives and prose rendered from FHIR descriptions; exclude unchanged background, computable FSH rules, diagram labels, and maintenance-only documents not published in the IG.
6. Reconcile prior markers against the new diff. Keep markers on branch-specific authorization prose that remains changed, add them to new/updated prose, and remove stale markers where the content is now identical to the source. Keep the work-in-progress note on the index page accurate for the current branch and merge state.
7. Use the established marker conventions in `ig-template/content/assets/css/hl7eu.css`:
   - In page Markdown, use `<div class="auth-change" markdown="1">` around changed paragraphs or a changed block. For an individual changed list item, use `<span class="auth-change">` around that item only.
   - FHIR-generated narrative descriptions are not authored page Markdown. Avoid raw HTML spans in FSH because the FHIR validator reports embedded-HTML warnings, and do not use fenced-div syntax because this Publisher renders it literally. Instead add narrowly scoped CSS selectors keyed to the generated resource anchor and verified rendered block; retain ordinary Markdown in FSH.
   - Keep the existing class behavior: purple text, purple links, and a vertical purple left border. Do not broaden selectors to unchanged paragraphs or whole pages.
8. Check the complete source diff for all changed authorization prose and stale marker instances. Confirm no generated output was edited and no experimental FSH wrappers remain.
9. Run `git diff --check`, then run `./_build.sh build` from the nested ballot IG worktree. Inspect the rendered index worknote and representative marked Markdown, ActorDefinition, and CapabilityStatement pages. Confirm the purple text/bar appears on marked content and does not leak into adjacent unchanged prose. Report SUSHI results, Publisher/QA counts, broken links, and any merge or validation blockers.

## Completion Report

Report the selected source ref and merge result, target branch, changed prose surfaces marked, stale markers removed, validation evidence, and remaining unmarked content types or unresolved conflicts. State explicitly that the branch is prepared for a later merge into the source branch; do not perform that merge as part of this skill.