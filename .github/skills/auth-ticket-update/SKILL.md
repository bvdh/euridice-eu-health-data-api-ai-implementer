---
name: auth-ticket-update
description: "Analyze and update the consolidated proposed resolutions for EU Health Data API authorization ballot tickets. Use when refreshing authorization ticket coverage, comparing ballot requests with the authorization worktree, or updating input/includes/proposed-ticket-resolutions.md."
argument-hint: "[ticket keys | --all]"
user-invocable: true
---

# Authorization Ticket Update

Maintain the consolidated authorization ballot ticket analysis using ticket-level isolated reviews, direct source verification, and one final consistency pass.

## Scope

- Default ballot ticket directory: `jira/active-ballot-recon-authorization/`.
- Default IG worktree: `eu-health-data-api-ballot-recon-auth/`.
- Report source: `eu-health-data-api-ballot-recon-auth/input/includes/proposed-ticket-resolutions.md`.
- Published page wrapper: `eu-health-data-api-ballot-recon-auth/input/pagecontent/authorization-ticket-resolutions.md`.
- Worknote reference: `eu-health-data-api-ballot-recon-auth/input/includes/auth-todo.md`.

Accept explicit ticket keys or `--all`. For another ballot branch, use the user-specified ticket directory and matching IG worktree, and keep the consolidated report under that worktree's `input/includes/` directory. Do not silently switch to the outer `eu-health-data-api/` fork.

## Required Context

1. Read `.github/instructions/authorization-requirements.instructions.md` before making authorization-related claims. Treat it as the current requirements and scope source; do not change normative requirements as part of ticket reporting.
2. Read the selected ticket markdown files completely, including description, comments, metadata, local status, and resolution.
3. Establish the current target worktree and inspect its source content and Git status. If there is no diff, describe findings as comparisons against the current worktree snapshot; do not claim passages were introduced by a branch or commit.
4. Use the current `auth-todo.md` ticket checklist as a cross-check for the ballot scope, but use each Jira ticket record as the authority for the request and local status.

## Analysis Workflow

### 1. Inventory

- Resolve the exact ticket set from the requested keys or the current ballot checklist/directory.
- Confirm every key has a local ticket record. Report missing ticket records rather than inventing their request or status.
- Preserve ticket statuses as written locally. A status such as `Triaged` is not proof that the request was implemented or accepted.

### 2. Analyze Independently

- Run one separate, read-only analysis context per ticket. Use one isolated agent/session call per ticket when that capability is available; do not batch several ticket analyses into one context.
- Give each analysis the exact key, ticket path, target IG worktree, and this result schema:
  - Key, title, and local status/resolution
  - Concise statement of the actual request
  - Concrete current-source evidence with path and heading/artifact
  - Coverage: `Addressed`, `Partially addressed`, or `Not addressed`
  - Proposed resolution direction that distinguishes existing work from remaining work
  - Outstanding question or decision, if any
- Instruct each analysis not to edit files, infer missing evidence, attribute content to a commit without proof, or assume a suggested disposition was adopted.
- If isolated analysis contexts are unavailable, say so and keep each ticket's source review logically independent; never claim separate sessions were used when they were not.

### 3. Verify and Reconcile

- Re-read the original ticket description/comments and verify important implementation claims directly in the target worktree before including them in the report.
- Prefer the owning source: `input/pagecontent/authorization.md`, `actors.md`, `resource-access.md`, applicable use-case pages, `input/fsh/Actors.fsh`, CapabilityStatement FSH, and relevant maintained documents under `doc/`.
- Use released SMART/IHE specifications and enacted regulatory text for normative claims. Do not cite mutable CI builds as conformance authority.
- Reconcile overlapping tickets across SMART/IUA selection, eIDAS/Wallet boundaries, actors, scopes, client authentication, direct-EHR patterns, and future frameworks. Preserve genuine policy conflicts as open decisions instead of choosing new normative meaning.
- Coverage describes what is in the current source, not whether the local Jira ticket is closed. Do not label a request addressed merely because the status is Triaged or a comment suggests a resolution.

### 4. Update the Consolidated Report

Update `input/includes/proposed-ticket-resolutions.md` in place. Keep a concise summary table at the beginning with one row per analyzed ticket and these columns:

| Ticket | Request summary | Addressed? | Resolution direction |
|---|---|---|---|

Use the Jira ticket URL for each key. Follow the table with scope/evidence caveats and a detailed section per ticket covering local status, request, current-content evidence, and proposed resolution. Maintain matching status/coverage counts in the ending summary. Keep report links valid from its published page context; link to generated IG pages rather than source paths that are not published.

Do not create per-ticket resolution files, edit Jira ticket records, or change IG authorization content unless the user separately asks for those actions. The report is a proposed workgroup artifact, not a Jira status update.

### 5. Keep the Report Linked in the IG

- Ensure `auth-todo.md` links its authorization-ticket-resolution worknote item to `proposed-ticket-resolutions.html`.
- The report in `input/includes/` is not itself a registered page. Ensure `input/pagecontent/authorization-ticket-resolutions.md` includes it with `{% include proposed-ticket-resolutions.md %}` and that `sushi-config.yaml` registers the wrapper beneath the Authorization page. Give the wrapper a distinct basename from the include file to avoid Publisher's duplicate generated-include path. Do not link the worknote directly to the include source file.
- Preserve unrelated checklist items and page configuration.

### 6. Validate

- Confirm the summary table has exactly one row for each analyzed key; the detailed sections have the same unique key set; no unrelated or omitted tickets are presented as part of the requested scope.
- Cross-check local status values and each factual coverage claim against source files.
- Check report links in the generated page context, frontmatter-free Markdown/Jekyll include rendering, and `git diff --check` in both the outer and IG worktree repositories.
- Build the target IG using its local supported entry point (`./_build.sh build` from the target IG worktree). Confirm the build completes and inspect the generated Authorization page and `authorization-ticket-resolutions.html` to ensure the worknote link resolves and the included report renders.
- Report the ticket count, coverage totals, changed files, build outcome, and any unresolved decisions. If the build is unavailable or fails for unrelated reasons, state that precisely; do not claim the link was rendered successfully.

## Guardrails

- Preserve user changes and unrelated worktree state.
- Never edit generated `output/` files manually.
- Keep `input/includes/auth-todo.md` as a checklist; the proposed resolution report does not add conformance requirements.
- Do not broaden this IG's authorization scope beyond SMART and IHE IUA without explicit approval.
- Distinguish client authentication, user authentication, access-token issuance, authorization decisions, consent, patient matching, audit, and local policy.
- Do not equate `home_community_id` with a Member State identifier without an agreed mapping.
- Keep regulatory eIDAS obligations scoped to the relevant service/deployment; do not imply every API provider operates the Wallet or performs end-user identity proofing.