---
name: compare-ig-branches
description: 'Create a static WebsiteComparer comparison of two EU Health Data API IG branches and save it in eu-health-data-api-gh-pages/comparison/<branch-name>/ for GitHub Pages. Use for branch comparison, static IG diff, WebComparer export, or publishing a local branch review website. Defaults to master versus the current logical branch, resolving master to main when master does not exist. Includes fresh local builds, uncommitted edits, and source assets.'
argument-hint: '[comparison-branch] | [baseline-branch] [comparison-branch]'
---

# Compare IG Branches

Create a publishable static comparison from two freshly built local IG branches.
This skill generates files locally; it does not enable Pages, commit, push, or
change the active logical branch.

## Inputs and Defaults

| Arguments | Left side (baseline) | Right side (comparison) |
| --- | --- | --- |
| None | `master` | Current logical IG branch |
| One branch | `master` | Supplied branch |
| Two branches | First branch | Second branch |

- Resolve omitted branch context using [branch-context-management](../branch-context-management/SKILL.md).
  Never interpret the outer repository's `main` or the publishing checkout's
  `gh-pages` as the current logical IG branch.
- Resolve the default baseline `master` in the IG repository. If neither local
  nor remote `master` exists, use `main` and state that substitution. An
  explicitly supplied branch must exist; do not substitute for explicit input.
- More than two arguments, an unresolved branch, or identical resolved branches
  are errors. Explain the problem and ask for corrected input.
- Accept branch names, not arbitrary shell expressions. Quote every branch and
  filesystem argument; validate branches with Git before using them.
- Fresh builds include existing uncommitted source edits. Report dirty inputs;
  do not stash, discard, commit, or silently replace them with remote versions.

## Output

The second branch determines the directory, even when two branches are supplied:

```text
eu-health-data-api-gh-pages/
  .nojekyll
  comparison/
    <safe-comparison-branch>/
      index.html
      assets/
      data/
      sources/
        left/    (complete baseline IG output)
        right/   (complete comparison IG output)
```

Use the branch-context convention of replacing `/` with `-` for the directory
name, for example `feature/auth` becomes `feature-auth`. Reject unsafe path
segments such as `.` or `..`, and ensure the resolved destination is strictly
below the publishing checkout's `comparison/` directory. Ask before proceeding
if different branches map to the same directory name.

The normal public URL is:

```text
https://euridice-org.github.io/eu-health-data-api/comparison/<safe-comparison-branch>/
```

Use singular `comparison/`, not `comparisons/`.

## Procedure

### 1. Check Repositories and Resolve Inputs

1. Locate the outer workspace, base IG checkout `eu-health-data-api/`, publishing
   checkout `eu-health-data-api-gh-pages/`, and sibling `../WebsiteComparer/`.
   The comparer is called **WebsiteComparer**, not `WebComparere`.
2. Inspect applicable repository instructions, Git status, and existing worktrees.
   Keep the outer repository on `main`.
3. Resolve both branch names and their source checkouts. Reuse
   branch-context-management for logical-branch-to-directory mapping, but verify
   the actual Git branch: its fallback directory is not proof of a match.
   Check both the base IG checkout and branch-specific checkouts, which may be
   independent clones rather than registered worktrees.
4. If a branch has no matching checkout, create a separate worktree from its
   validated local or remote ref. Do not switch an existing checkout away from
   its branch. Do not merge or reset source branches.
5. Verify the publishing checkout belongs to `euridice-org/eu-health-data-api` and
   is on `gh-pages`. If missing, create it from the existing `gh-pages` ref.
   If that branch does not exist, ask before creating a new publishing branch.
6. Inspect existing destination content. Do not overwrite unrelated or
   uncommitted files. Ask before replacing an existing comparison; leave all
   other comparisons and publishing-root content intact.
7. Resolve the Pages site URL using repository configuration where available;
   otherwise use the normal project URL above and explicitly report that it is
   the expected URL, not verified live hosting. Account for a configured custom
   domain before deriving asset paths.

### 1a. Mandatory Origin Freshness Gate

Complete this gate before building or generating a comparison.

1. Verify `origin` identifies the intended IG repository in each source clone
   and the publishing checkout. Fetch `origin` in each independent clone
   (once per shared Git repository for linked worktrees). Check the current
   remote heads, not just previously cached remote-tracking refs. If fetching
   fails, stop: freshness is unknown, not a passing check.
2. For both source branches and `gh-pages`, resolve the exact matching
   `origin/<branch>` ref and compare commit histories:

   ```bash
   git -C "$CHECKOUT" rev-list --left-right --count \
     "HEAD...refs/remotes/origin/$BRANCH"
   ```

   The first count is local-only commits (ahead); the second is remote-only
   commits (behind). Verify the remote branch still exists; a stale tracking
   ref is not evidence of that. If a branch tracks a differently named remote
   branch, show the mapping and ask which remote ref is authoritative.
3. Classify each checkout explicitly:
   - **Equal (0/0):** origin freshness passes.
   - **Ahead only:** includes all origin commits, but is an unpublished local
     snapshot. Report the count and ask for approval to compare that snapshot.
   - **Behind only:** stop and ask before updating. Offer a fast-forward-only
     update when safe; never silently pull over uncommitted edits.
   - **Diverged:** stop and ask the user to reconcile the histories.
   - **No corresponding origin branch:** identify it as local-only and ask
     whether to use it; never claim it is synchronized.
4. Treat dirty files independently from commit freshness. Preserve and include
   them as specified above, recording that origin equality covers commits
   only. Do not stash, reset, force-push, or automatically merge to pass this gate.
5. Record fetched remote SHAs, local SHAs, ahead/behind counts, check time,
   dirty status, and any explicitly approved exception. Repeat the history
   checks after an approved update before continuing. Apply the publishing
   checkout gate before replacing any existing comparison as well.

### 2. Build Both IGs

1. Load and follow [build-ig](../build-ig/SKILL.md) for each resolved source
   checkout, passing the checkout explicitly so building the baseline does not
   accidentally build the active branch twice.
2. Build from each IG checkout, never the outer workspace. Use the full build
   lifecycle and its QA criteria. Do not reuse stale output merely because an
   `output/` directory exists. Stop on build failure.
3. Record each branch, checkout, commit SHA, dirty-input status, and build result
   for the final report. The comparison is a snapshot of those local builds,
   not necessarily the corresponding published FHIR CI content.
4. Before each build, capture a content fingerprint of all build inputs:
   tracked authoring/configuration/build files and relevant untracked source
   files, including `input/`, `ig.ini`, `sushi-config.yaml`, and any source files
   consumed from outside those paths. Include file paths and content hashes
   so additions and deletions are detected. Exclude generated outputs, caches,
   and logs. A commit SHA, clean Git status, or newest-file timestamp alone
   does not prove that a build reflects local edits.
5. Record build start/end times and check newly produced build/QA artifacts
   and expected HTML, not stale success logs from an earlier run. Recompute
   the input fingerprint and HEAD after building and again after copying the
   output snapshots. They must match the pre-build inputs. If build tooling
   changes a genuine input, inspect the change and rebuild from the resulting
   stable input state; never bless a mismatch as fresh.
6. If source inputs or HEAD change during building or snapshot capture, stop
   generation and rebuild the affected side. Never compare output whose source
   version cannot be established. Fresh builds remain mandatory; existing
   output is not reused merely because its timestamp appears recent.
7. Preserve this provenance with the staged comparison in a small
   `comparison-provenance.json`: resolved branches, local and fetched origin
   SHAs, ahead/behind counts, dirty status, approved exceptions, source
   fingerprints, build start/end times, and snapshot capture times. Include no
   credentials or sensitive machine-specific data.

### 3. Stage Complete Source Snapshots

1. Use a dedicated temporary staging directory outside source `input/` and
   outside the existing published comparison. Do not generate directly over a
   previous comparison: the comparer build empties its output directory.
2. Copy the complete contents of each successful `output/` into separate
   temporary source snapshots. Preserve relative paths, including all styles,
   images, fonts, and the `en/` subtree when present.
3. Serve the snapshots on two distinct, available loopback ports using
   WebsiteComparer's `serve:static` command. Check its current CLI before use.
   Start attached background processes, record their IDs, and verify both
   servers with HTTP requests. Do not kill existing servers or assume a port
   is unused.
4. Prefer `/en/` as a side's base URL when its snapshot contains
   `en/index.html`; otherwise use `/` after verifying it is actual IG content.
   The multilingual root may contain only a JavaScript language redirect:
   WebsiteComparer removes upstream scripts, so that root is not a suitable
   comparison starting page.

### 4. Generate with WebsiteComparer

1. Read the comparer's current static-generation instructions and package engine
   requirement. Use its supported Node runtime and existing dependencies.
   Install dependencies only if the chosen command fails because they are
   missing, using the existing lockfile.
2. Generate the static viewer into an empty temporary output directory. For
   example, with the variables resolved above:

   ```bash
   cd "$COMPARER_ROOT"
   npm run build:static -- \
     "$LEFT_LOCAL_BASE" "$RIGHT_LOCAL_BASE" "$STAGED_COMPARISON" \
     --base "$PAGES_COMPARISON_PATH" \
     --max-pages "$PAGE_LIMIT"
   ```

   `PAGES_COMPARISON_PATH` is the path component of the final comparison URL,
   with a trailing slash, normally:
   `/eu-health-data-api/comparison/<safe-comparison-branch>/`.
   Neither local source URL is the final public source URL.
3. Crawl the union of both sites, not just the starting page. Do not pass
   `--path` unless the user explicitly requests a page-limited comparison:
   explicit paths replace crawling. Choose a sufficient page limit and
   increase it if the crawl reaches that limit; do not silently truncate.
4. Inspect generation logs and `data/index.json`. A successful process exit is
   insufficient: stop on unexpected fetch/render failures, an empty page list,
   or pages missing from both sides. Distinguish genuine branch-only pages
   from failed rendering.

### 5. Make the Export Publishable

WebsiteComparer saves comparison HTML, but retains source URLs in injected
`<base>` tags and the page index. Copying only its generated output is therefore
**not sufficient** when generating from localhost.

1. Copy the complete temporary source snapshots into the generated site's
   `sources/left/` and `sources/right/`, after the comparer build has finished.
2. Derive these public snapshot prefixes from the final comparison URL:

   ```text
   <comparison-url>sources/left/
   <comparison-url>sources/right/
   ```

3. Rebase every generated reference to either local source server to its
   corresponding public snapshot prefix, preserving the suffix path. Map the
   entire local origin, not only `/en/`, so fallback-resolved URLs outside
   `/en/` still work. For example:

   ```text
   http://127.0.0.1:3001/en/authorization.html
     -> https://euridice-org.github.io/eu-health-data-api/comparison/<safe>/sources/left/en/authorization.html
   ```

   Apply this exact URL-prefix transformation to generated comparison HTML and
   `data/index.json`, including base URLs used by navigation. Use structured
   JSON updates where appropriate. Inspect the current comparer output for any
   additional source-URL configuration rather than assuming only one field.
   Preserve relative static bridge-script URLs and viewer asset paths.
4. Check the copied source snapshots for absolute references to the temporary
   servers and rebase any such references too. Do not modify binary assets or
   replace arbitrary words/port numbers. Leave unrelated third-party URLs alone.
5. Verify no temporary origin remains in runtime HTML, CSS, JavaScript, or JSON.
   The result must not require the generator, proxy, or source snapshot servers.
   External specification links may remain external; do not describe the site
   as fully offline.
6. Ensure an empty `.nojekyll` exists at the publishing checkout root without
   replacing an existing file's contents. Do not change Pages settings or add
   an Actions deployment workflow.

### 6. Validate and Install

1. Serve the staged site and both snapshots under their expected URL paths.
   For pre-publication testing, use a disposable preview copy with the final
   Pages origin mapped back to the preview origin, preserving all paths. Never
   change the publishable copy back to localhost.
2. Open the comparison in a browser. Verify:
   - Both home pages contain actual IG content, not language redirects.
   - At least one changed content page shows the two versions and differences.
   - Both sides load their CSS and a representative image from the snapshots.
   - Internal navigation, relative paths, and static bridge scripts work.
   - A genuine branch-only page is handled correctly, if one exists.
3. Check the crawl did not lose pages and inspect
   `data/index.json` for unexpected unavailable pages. Report pre-existing
   comparer limitations rather than hiding them or changing the comparer
   outside this task.
4. Only after validation, move the complete staged result to
   `eu-health-data-api-gh-pages/comparison/<safe-comparison-branch>/`.
   For an approved replacement, preserve the previous directory until the new
   one is successfully installed and verified. Never recursively delete the
   publishing checkout, its `comparison/` root, or another comparison.
5. Verify the installed viewer, index, and both source snapshots exist, rerun
   the temporary-origin check, and inspect publishing-checkout Git status.
   Verify the installed `comparison-provenance.json` matches the validated
   source snapshots. Recheck source HEADs and fingerprints before completion;
   if they have changed, explicitly mark the export stale and rebuild the
   affected comparison before reporting it as current.
6. Stop only the temporary servers started by this invocation and remove only
   known temporary paths created by this invocation. Do not remove source
   checkouts or worktrees containing edits.

## Completion Report

Report:
- Resolved left and right branches, including any `master` to `main` fallback.
- Source commit SHAs and whether uncommitted edits were included.
- Origin freshness for both sources and `gh-pages`, with ahead/behind counts,
  fetched origin SHAs, and any approved local-only/ahead exceptions.
- Build-input fingerprint checks and the saved provenance file proving which
  source state produced the comparison.
- Build/QA results, generated page count, and browser validation results.
- Local comparison directory and expected public URL.
- Any missing pages, limitations, or blockers.
- That output is local and uncommitted, and publishing requires committing and
  pushing `gh-pages` with GitHub Pages configured to serve that branch.

Do not claim the public URL is live without checking the deployed site. Do not
commit or push unless separately requested.
