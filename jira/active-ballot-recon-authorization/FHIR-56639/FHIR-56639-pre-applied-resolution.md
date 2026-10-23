# Pre-applied Resolution for [FHIR-56639](https://jira.hl7.org/browse/FHIR-56639)

## Evidence and PR State
- Ticket analysis: [FHIR-56639-resolution.md](./FHIR-56639-resolution.md) (verified against current source and PR state on 2026-10-22)
- PR: [PR #99 — Eu health data api ballot recon authorization](https://github.com/euridice-org/eu-health-data-api/pull/99) — Open, unmerged; remote head `c0e4af73c30331136bf3df722e988cfd3cc48d38`. It is not the change that removed the Scopes list. Its Resource Access change adds flow-specific guidance for `patient/`, `user/`, and `system/` SMART resource scopes and distinguishes them from IUA transaction scopes. The current source file in the supplied worktree matches the PR-head file. The source comment records the FHIR-56639 resolution as removing the Scopes section because applicable resources are listed above.

## Proposed Disposition
**Persuasive**

**Rationale:** The requested resolution is to remove the standalone Scopes section because its applicable resources are already listed in the Resource Access content. The source comment explicitly records this as the FHIR-56639 resolution, and the current page reflects that removal. The additional scope-family paragraph is useful context but is not needed to establish the disposition. The local Jira record still shows Triaged / Unresolved; this draft proposes Jira resolution wording and does not claim Jira has already been updated.

## Proposed Resolution Text
This ticket is addressed by removing the standalone Scopes section from Resource Access, since the applicable resources are already listed in the page. The source also provides contextual guidance distinguishing SMART resource scopes by authorization flow from IUA transaction scopes. This resolution avoids maintaining a duplicate resource list as scope strings. The removal is already present in the current source; it predates open [PR #99 — Eu health data api ballot recon authorization](https://github.com/euridice-org/eu-health-data-api/pull/99), which adds the supplementary flow-specific scope guidance but is not the change that removed the list. Jira remains Triaged / Unresolved in the local ticket record pending formal update.

## Proposed Change Category
**Category:** Clarification

**Rationale:** Clarification is an established category in the local ticket set. Removing the redundant Scopes section leaves the applicable resource inventory in its resource and priority-category sections, addressing the confusing duplicate presentation without changing authorization behavior.

## Proposed Change Impact
**Impact:** Non-substantive

**Rationale:** The resolution removes a redundant informational list while retaining the applicable resource content elsewhere on the page. It does not change grants, scope requirements, or resource-support obligations.
