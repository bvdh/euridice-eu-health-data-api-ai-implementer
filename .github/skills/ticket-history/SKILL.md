---
name: ticket-history
description: 'Generate a weekly stacked bar chart of Jira ticket lifecycle progress (total, submitted, triaged, under-vote, to-be-applied, done) from local jira/ ticket markdown. Use for ballot burn-down reporting, governance/workgroup status slides, ticket velocity questions, and any request for ticket history, ticket progress over time, or weekly ticket statistics.'
argument-hint: '[--cutoff YYYY-MM-DD] [--output-md jira/history/ticket-history.md]'
---

# Ticket History Chart

Produce a weekly, cumulative stacked bar chart of Jira ticket lifecycle state from the local ticket markdown under `jira/`.

The generated report must start with a **Current Status** matrix table:
- Rows: Jira `Resolution` values.
- Columns: Jira `Status` values.
- Final column and final row: totals.
- Totals are clickable Jira links:
   - Row totals filter by `resolution = "<row>"`.
   - Column totals filter by `status = "<column>"`.
   - Bottom-right grand total filters to the full EU Health Data API scope.

Outputs (all written to `jira/history/` by default):

| File | Content |
|---|---|
| `jira/history/ticket-history.csv` | Weekly counts: `week, week_start, total, Submitted, Triaged, UnderVote, ToBeApplied, Done` |
| `jira/history/ticket-history.svg` | Stacked bar chart, one bar per ISO week |
| `jira/history/ticket-history.md` | Report: Current Status matrix, embedded chart, generated summary, weekly table, methodology |

## When To Use

- "Show ticket progress over time" / "ticket history" / "weekly ticket chart".
- Preparing ballot reconciliation or workgroup status material.
- Checking how many tickets are still submitted/triaged versus done.

## Procedure

1. **Refresh ticket data first (recommended).** If the local tickets may be stale, run the `jira-sync` skill so `jira/open` and `jira/closed` reflect current Jira status.
2. **Run the generator** from the workspace root:

   ```bash
   node .github/skills/ticket-history/scripts/generate-ticket-history.js
   ```

   Optional arguments:
   - `--cutoff YYYY-MM-DD` — ignore tickets created before this date.
   - `--output-csv PATH`, `--output-svg PATH`, `--output-md PATH` — override output locations.

3. **Verify the run.** The script prints the ticket count and week count and fails with a non-zero exit if no ticket has a parseable `Created` date. Confirm:
   - Ticket count is close to the number of `jira/{open,closed}/FHIR-*` directories.
   - `jira/history/ticket-history.md` starts with `## Current Status`.
   - The Current Status table has `Resolution \ Status` as the first header cell and a `Total` row and column.
   - The Current Status total cells are hyperlinks to Jira issue views (`https://jira.hl7.org/issues/?jql=...`).
   - The bottom-right grand total link points to the full EU Health Data API Jira scope.
   - The last row of the CSV has `total` equal to the sum of the five stage columns.
   - Any tickets listed as excluded in the report are genuinely missing a `Created` date (fix the ticket markdown rather than the script).

4. **Report to the user**: latest-week totals per stage, the trend since the previous week, and links to the three generated files. Render every Jira ticket key mentioned in chat as a hyperlink to `https://jira.hl7.org/browse/<KEY>`.

## Stage Model

Each ticket occupies exactly one stage per week, so the stack height is the cumulative total of tickets submitted so far.

| Stage | Ticket `Status` values | Definition |
|---|---|---|
| Submitted | Submitted | Ticket raised but not yet reviewed |
| Triaged | Triaged, Waiting for Input, Deferred | Ticket reviewed; awaiting additional context or external dependencies |
| UnderVote | Resolved, without a later recorded lifecycle transition | Ticket marked resolved by Jira but awaiting workgroup vote; it spans Resolved to Vote Date, or remains open-ended when Vote Date is absent |
| ToBeApplied | Resolved - change required | Ticket has a vote requiring a specification change that is not yet applied |
| Done | Resolved - No Change, Duplicate, Applied | Resolution applied or closure is final (no change required) |

## Methodology and Limitations

- Transition dates are **approximated**: the exported ticket markdown carries `Created`, `Resolved`, `Updated`, and `Vote Date`, not a per-status transition log.
  - `Submitted` starts at `Created`.
  - `Triaged` starts at `Resolved` (falling back to `Updated`, then `Created`).
   - `UnderVote` starts at `Resolved`; it ends at a later `Vote Date`. If Vote Date is absent, the ticket remains UnderVote until a later lifecycle stage is recorded.
  - `ToBeApplied` starts at `Vote Date` (falling back to `Resolved`, `Updated`, then `Created`) — once voted.
  - `Done` starts at `Updated` (falling back to `Resolved`, then `Created`).
  - **Vote Date Rationale**: The `Vote Date` field captures when the workgroup actually voted on a ticket requiring changes, better representing the decision point than the system-generated `Resolved` date. `UnderVote` shows the window between Jira marking a ticket resolved and the actual vote happening.
  - Dates are forced non-decreasing per ticket.
- State this approximation whenever the chart is used in external or governance material.
- Weeks are ISO weeks (Monday start), from the earliest `Created` to the current week.
- Tickets are deduplicated by `Key` across `jira/open`, `jira/closed`, and `jira/active*`.

## Adding a New Status

If Jira introduces a status not in the table above, add it to `STATUS_STAGE` in `scripts/generate-ticket-history.js` and update the Stage Model table here. Unmapped statuses silently fall back to `Submitted`, which understates progress.
