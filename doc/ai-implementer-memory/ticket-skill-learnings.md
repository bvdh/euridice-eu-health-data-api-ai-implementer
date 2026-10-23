# Reusable Ticket Workflow Learnings

## Resolution analysis

- Verify Jira status, local source state, and live PR state independently; distinguish uncommitted worktree edits from commits included in a PR.
- For regulatory requests, state what the source supports and what remains undecided; do not turn informative clarification into a claim of legal compliance.
- Make disposition options concrete and meaningfully distinct, and tie the recommendation to evidence and trade-offs.
- Treat current-build pages as locators unless the published content is verified to match the branch under review.
- When current-build links are unavailable, record the failed check and use resolving versioned pages only as labeled context; do not present them as the current branch build.
- For IHE security requests, distinguish a TLS requirement from ATNA transaction/grouping and audit-event requirements; verify both prose and diagram source labels.
- For identity-and-audit tickets, distinguish person authentication, API authorization, optional token context, and audit-event ownership; do not infer a universal user claim or cross-system log correlation requirement.
- When a challenged actor-level norm is removed, reassess remaining profile/integration conditions separately and explain whether they still constrain the actor; do not carry stale ambiguity into the updated recommendation.
- Separate ticket-linked PR evidence from broader open PRs and local-only commits, and state clearly whether the proposed resolution is already present in the branch or merely planned.
- For authorization tickets, distinguish server-published discovery metadata from client-supplied token-request scopes; a historical ticket-specific commit on another branch is not evidence of current-branch implementation.
- Explain source-side API request/release events separately from later access at a receiving system; avoid implying that this distinction requires shared logs or interoperability.
- When a composition IG recommends a supporting profile, preserve stronger obligations inherited from its selected specifications; deleting local actor artifacts does not waive those obligations.
- Scope optional audit transactions to the IG's own requirements rather than declaring them universally optional under separately adopted profiles.

## Planning and execution

- Map each implementation task to its owning source file and a specific source/rendered validation step.
- Preserve unrelated worktree changes and report blockers or non-fatal build diagnostics explicitly.
- After an IG narrative change, verify both the Publisher QA result and the affected rendered page.
- For informative architecture clarifications, preserve existing normative workflows, identify the primary page to change, and make secondary-page edits conditional on an agreed concrete use case.
- During drift checks, separate consolidated-report edits from specification-source work; record user-confirmed exclusions instead of silently expanding plan scope.
