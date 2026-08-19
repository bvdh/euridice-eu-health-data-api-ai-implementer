---
name: jira-sync
description: 'Synchronize Jira ticket markdown subdirectories for the EU Health Data API spec. Prefers the newest Excel export in jira/ when it is newer than the last sync; otherwise fetches the live Jira full-content URL. Updates existing ticket docs and creates or refreshes branch-scoped active ticket directories, and moves ticket folders between open/ and closed/ to match status. Use to refresh local Jira ticket markdown from either an Excel export or the live Jira query.'
argument-hint: '[--force] use Excel even if not newer; [--full-refresh] force full URL refresh (disable incremental updated filter); [--url <url>] override Jira URL used for URL fallback'

# Jira Sync

Synchronize Jira ticket markdown files for the EU Health Data API (R4) specification.

The skill selects its data source automatically:

1. **Excel (preferred)** — if a `*.xlsx` export exists in `jira/` and it is newer than the most recently synced ticket markdown (or `--force` is passed), the newest Excel file is used.
2. **Live Jira URL (fallback)** — otherwise the skill fetches the Jira full-content HTML export and parses it directly. URL fallback runs in incremental mode by default.

Either source generates or updates ticket markdown files under status-based directories:
- `jira/open/`
- `jira/closed/`
- `jira/active-<branch>/` (authoritative active-ticket membership for each logical branch)

Each ticket is written to a subdirectory named after its key:
- `jira/<state>/FHIR-XXXXX/FHIR-XXXXX.md`

Ticket folders are moved between `jira/open/` and `jira/closed/` when a ticket's status changes, preserving any extra per-ticket files (resolution proposals, plans, commit messages).

## When To Use
- After downloading a new Jira Excel export into `jira/`.
- To pull the latest ticket state directly from Jira when no fresh Excel export is available.
- To keep local ticket files organized by status (open, closed) and active focus list.

## Procedure
1. From the repository root, run:

```bash
bash ./.github/skills/jira-sync/scripts/sync-if-newer.sh
```

2. The script will:
  - Resolve the active branch through `branch-context-management` (root `current-branch.md` by default)
   - Locate the newest `*.xlsx` file in `jira/` (warning if multiple are present)
   - Compare the Excel mtime against the most recently generated `jira/{open,closed,active}/**/FHIR-*.md`
   - **If the Excel is newer** (or no markdown exists yet, or `--force`): run
     `node jira/sync-jira-tickets.mjs --excel <file> --out jira --prune`
   - **Otherwise**: fetch the live Jira URL and run
     `node jira/sync-jira-from-url.mjs --incremental --out jira --save jira/jira-export.html`
   - Incremental URL mode uses `jira/.jira-last-sync`, subtracts one day, and appends `AND updated >= "YYYY-MM-DD HH:mm"` (UTC) to the URL's `jqlQuery`
   - If `jira/.jira-last-sync` is missing or invalid, URL fallback automatically uses a full refresh query

3. Optional flags:

```bash
# Force using the newest Excel export even if it is not newer than the last sync
bash ./.github/skills/jira-sync/scripts/sync-if-newer.sh --force

# Force a full URL refresh (equivalent to previous URL behavior)
bash ./.github/skills/jira-sync/scripts/sync-if-newer.sh --full-refresh

# Override the Jira URL used for the fallback (temp SearchRequest URLs can expire)
bash ./.github/skills/jira-sync/scripts/sync-if-newer.sh --url "https://jira.hl7.org/sr/jira.issueviews:searchrequest-fullcontent/temp/SearchRequest.html?jqlQuery=...&tempMax=1000"

# Combine custom URL with full URL refresh
bash ./.github/skills/jira-sync/scripts/sync-if-newer.sh --full-refresh --url "https://jira.hl7.org/sr/jira.issueviews:searchrequest-fullcontent/temp/SearchRequest.html?jqlQuery=...&tempMax=1000"
```

4. If you are already in `jira/`, the same helper can be run as:

```bash
bash ../.github/skills/jira-sync/scripts/sync-if-newer.sh
```

## Data Source Details

### Excel
Uses `jira/sync-jira-tickets.mjs` against the newest `*.xlsx` export. Requires the `xlsx` dependency installed under `jira/`.

### Live Jira URL
Uses `jira/sync-jira-from-url.mjs`, which fetches the Jira full-content export (a browser-like `User-Agent` is required, otherwise Jira returns HTTP 403), parses it with `cheerio`, and renders expanded ticket markdown including description, metadata, resolution, related, and comments. The default query covers `EU Health Data API (R4) (FHIR)`.

URL mode behavior:
- Default: incremental (`--incremental`) using `jira/.jira-last-sync` cutoff minus one day
- Incremental safety: pruning is disabled in incremental mode, so tickets omitted from a partial export are retained locally
- Override: full refresh (`--full-refresh`) without adding an `updated` clause
- Full refresh cleanup: pruning is enabled for full refresh runs
- First run or invalid marker: automatically falls back to full refresh query

The fetched HTML is cached to `jira/jira-export.html`; the parser can also be re-run offline against that file with `--html jira/jira-export.html`.

## Classification Rules

### Closed
A ticket is written to `jira/closed/` when its Jira **Status** is one of:
- Applied
- Duplicate
- Resolved - No Change
- Resolved - change required
- Deferred

### Open
Any ticket whose Jira **Status** is not in the closed set above is written to `jira/open/`.

### Active
Any ticket directory under `jira/active-<branch>/` is refreshed when its key exists in the current source.
Each ticket key must appear in only one branch-scoped active set at a time (no duplicates across `jira/active-<branch>/` directories).

## Output Format
Each `FHIR-XXXXX.md` file includes:
- Ticket heading with key and summary
- Description section
- Metadata section (issue type, status, priority, specification, versions, work group, reporter, assignee, related URL/page/section/artifact, created/updated/resolved dates, change category/impact, applied-for version)
- Resolution section (status, resolution, vote, vote date, resolution description)
- Optional related ticket section (parent, grouping)
- Comments section (from the URL source)

## Notes
- Requires Node.js 18+.
- Requires the `xlsx` and `cheerio` dependencies installed under `jira/` (`npm install` in `jira/`).
- `cheerio` is pinned to `1.0.0-rc.12` for Node 18 compatibility (later 1.x releases pull in `undici`, which needs the Node 20 `File` global).
- `jira/.jira-last-sync` is updated after successful sync runs and is used by URL incremental filtering.
- `--prune` removes ticket directories not present in the current source during full-dataset syncs (Excel or URL full refresh); incremental URL sync does not prune.
- The selected `jira/active-<branch>/` directory is pruned only against its existing directory membership, and extra per-ticket files are preserved.
- Cross-branch uniqueness rule: a ticket key can belong to only one `jira/active-<branch>/` set; when branch ownership changes, remove it from the previous set.
- Active membership is defined only by branch-scoped directories; do not use legacy `jira/active/`.
- Temporary Jira `SearchRequest.html` URLs are session-scoped and may expire; pass a fresh URL with `--url` if the fallback fetch fails.
