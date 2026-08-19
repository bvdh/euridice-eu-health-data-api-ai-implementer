---
name: ticket-table
description: 'Build reproducible Jira ticket tables from local markdown or tracker data. Use for open-ticket lists, branch or block-vote ticket tables, creator and creator-date filtering, Jira query preparation, and Markdown table exports.'
argument-hint: '[scope/filter] [--include-creator|--exclude-creator] [--include-creator-date|--exclude-creator-date] [--output PATH]'
---

# Jira Ticket Table

Create a focused, reproducible Markdown table of Jira tickets from local repository data. The skill is intended for governance lists and follow-up analysis, not for changing Jira or resolving tickets.

## When To Use

- List open tickets or tickets in a branch/block-vote scope.
- Build a table filtered by creation date, keyword, section, or ticket key.
- Produce a Markdown table for review.
- Prepare Jira JQL for the selected ticket set.

## Inputs

Accept the narrowest scope supplied by the user. Supported sources and selectors are:

- Source ticket markdown under `jira/open/`, `jira/closed/`, and `jira/active-*/`.
- Existing tracker data when its ordering or selected rows are part of the request.
- Status: `open`, `closed`, `active`, or a named branch such as `block-vote-8`.
- Date cutoff or range using the ticket `Created` value.
- Optional creator fields: `creator` from `Reporter`, and `creatorDate` from `Created`.
- Ticket key, related section/artifact, or summary keyword.

When a named branch is supplied, resolve it with `branch-context-management` and prefer `jira/active-<branch>/`. Do not silently substitute `jira/open/` when the requested branch scope is empty or missing; report the scope gap.

## Output Contract

Default output is a Markdown table under `jira/` unless the user requests another path:

- Preserve one row per unique Jira key.
- Use the requested column order exactly. The default columns are `Ticket`, `Creator`, `Creator date`, and `Summary`.
- `Creator` is the ticket `Reporter`; `Creator date` is the ticket `Created` date.
- Support `--include-creator` / `--exclude-creator` and `--include-creator-date` / `--exclude-creator-date`. Include both by default for governance tables unless the user specifies otherwise.
- Derive every field from the primary `FHIR-XXXXX.md` ticket file only. Never read `FHIR-XXXXX-resolution.md` or any other proposal artifact.
- Every ticket key must link to `https://jira.hl7.org/browse/<KEY>`.
- Do not add inferred fields to an existing tracker without stating the rule used.
- The `Summary` cell must contain exactly two labeled paragraphs: 
  - `Requested: <single-sentence-summary-of-request>` from the ticket description or summary, and
  - `Proposed: <single-sentence-summary-of-proposed-resolution>`.from 

Canonical Markdown shape:

```markdown
| Ticket | Creator | Creator date | Summary |
|---|---|---|---|
| [FHIR-56591](https://jira.hl7.org/browse/FHIR-56591) | Giorgio Cangioli | 2026-04-28 | <p>Requested: Revise the AdverseEvent profile.</p><p>Proposed: Remove or formally distinguish the redundant allergy slice and retarget compatible references to EU Core profiles.</p> |
```

## Procedure

### 1. Establish scope

1. Restate the selected source and filters in the report metadata or response.
2. Resolve branch context when a branch or block-vote name is given.
3. Select the authoritative source for each field:
   - Ticket metadata and description come from the ticket markdown.
   - Existing ticket ordering or selected rows come from the supplied tracker data.
   - Do not replace source values with guessed values.
4. If the user requests open tickets, include only the selected open scope and exclude closed tickets unless explicitly requested.

### 2. Discover and parse tickets

1. Discover `FHIR-*.md` ticket files in the selected directories.
2. Exclude generated proposal files such as `*-resolution.md`.
3. Parse `Key`, `Summary`, `Status`, `Created`, `Issue Type`, `Related section`, related artifact fields, and the ticket's own `Description` and `Resolution` sections when present.
4. Normalize dates to ISO `YYYY-MM-DD` for comparison and output where possible.
5. Deduplicate by Jira key. Prefer the file in the explicitly requested branch scope, then active scope, then open/closed according to the requested status.
6. Record missing or unparseable fields as data-quality notes instead of silently dropping rows.

### 3. Apply filters

1. Apply scope filters before keyword or date filters.
2. Apply the date cutoff inclusively unless the user says otherwise.
3. Match ticket keys exactly and summary/section filters case-insensitively.
4. Apply creator options after parsing metadata:
   - Include `Creator` when `--include-creator` is present or no creator option is supplied.
   - Omit `Creator` when `--exclude-creator` is supplied.
   - Include `Creator date` when `--include-creator-date` is present or no creator-date option is supplied.
   - Omit `Creator date` when `--exclude-creator-date` is supplied.
   - Treat conflicting include/exclude flags as an error and ask the user to choose one.
5. If the user asks for a Jira query, generate a query from the final deduplicated key set or the explicit field filters. Escape quotes and state whether the query is exact-key or field-based.

### 4. Render the table

1. Sort deterministically using the user’s requested order; otherwise sort by creator date ascending, then Jira key ascending.
2. Render a Markdown table with a header row, separator row, and Jira hyperlinks for every ticket key.
3. Put `Requested:` and `Proposed:` in the same Summary cell as separate `<p>` paragraphs. Each value must be one sentence.
4. Take the `Requested:` sentence from the primary ticket's Description or Summary and the `Proposed:` sentence from its own Resolution section. Do not use proposal artifacts or infer a proposal from a separate file.
5. Include a short metadata block for generated reports: source, filters, creator-field options, generated date, included count, excluded count, and data-quality notes.
6. Do not include a bare Jira key in the accompanying chat response; hyperlink every key mentioned in the response.

### 5. Verify the result

Run all applicable checks:

- Every output row has the expected number of Markdown cells after rendering.
- Header and row column order match the requested schema and creator options.
- Each included Jira key is unique and resolves to a local source ticket unless the user explicitly supplied an external tracker.
- The reported total equals the number of data rows.
- Date-filtered rows satisfy the cutoff/range.
- Markdown contains a Jira hyperlink for every key.
- Every Summary cell contains exactly one Requested paragraph and one Proposed paragraph.
- Every field and paragraph is traceable to the matching primary `FHIR-XXXXX.md` ticket file.
- No `FHIR-XXXXX-resolution.md` or other proposal artifact was read or used.
- Any excluded rows are listed with the reason.

## Decision Points

### Local tickets or existing tracker?

Use local ticket markdown for current metadata and status. Use an existing tracker for user-maintained ordering or selected rows unless the user explicitly asks to regenerate those fields.

### Open tickets or branch tickets?

Treat a named branch/block-vote scope as authoritative. Treat `open` as a status filter across the normal Jira ticket directories. If both are supplied, intersect them.

### Markdown output

Always use Markdown for this skill. If the requested output path ends in `.csv`, change it to `.md` or ask before overwriting a CSV.

### Creator fields

Use `Reporter` as `Creator` and `Created` as `Creator date`. Include both by default. Respect explicit include/exclude options and show the selected schema in the metadata block.

## Completion Report

Report:

- Output path and format.
- Source scope and filters.
- Selected creator fields.
- Included row count.
- Excluded or missing rows.
- Jira query, when requested.

Mention the generated file with a workspace-relative Markdown link. Hyperlink every Jira key mentioned in the response.

## Suggested Prompts

- "List all open tickets as a Markdown table with creator and creator date."
- "Create a Markdown table of the tickets in `block-vote-8`, excluding creator date."
- "Create a Jira query for the selected tickets."
- "Store the selected tickets in `jira/block-vote-8-tickets.md`."