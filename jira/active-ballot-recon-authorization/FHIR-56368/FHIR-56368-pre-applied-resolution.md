# Pre-applied Resolution for [FHIR-56368](https://jira.hl7.org/browse/FHIR-56368)

## Evidence and PR State
- Ticket analysis: [FHIR-56368-resolution.md](./FHIR-56368-resolution.md) (verified against current source and PR state on 2026-10-22)
- PR: [PR #99 — Eu health data api ballot recon authorization](https://github.com/euridice-org/eu-health-data-api/pull/99) — Open; head `c0e4af73c30331136bf3df722e988cfd3cc48d38` (`eu-health-data-api-ballot-recon-auth`). For this proposed resolution, the PR changes are treated as applied. The head source files for Authorization and the EHDS summary match the supplied fork worktree. The relevant commit is [83b4a01e](https://github.com/euridice-org/eu-health-data-api/commit/83b4a01e5c09e40ad68b11e8779fb3d781a5d65e). The local ticket snapshot has no PR link; live Jira status/comments could not be checked because the Jira REST endpoint returned HTTP 403.

## Proposed Disposition
**Persuasive with Modification**

**Rationale:** PR #99's Authorization text responds to the request for regulatory clarification by distinguishing end-user authentication from SMART/IUA API authorization and describing a possible Wallet role. It retains environment-specific scope and does not claim a universal SMART-to-eIDAS assurance mapping, a selected Wallet integration profile, or a detailed GDPR analysis. Those items remain undecided rather than being presented as existing obligations. This modified approach is supported by the current PR source; the local Jira snapshot remains Triaged / Unresolved.

## Proposed Resolution Text
The Authorization changes in [PR #99](https://github.com/euridice-org/eu-health-data-api/pull/99) clarify that, where a selected environment requires eIDAS-recognized electronic identification, the Authorization Server supports that identification for interactive SMART or IUA authorization-code flows, while pre-authorized SMART Backend Services using client credentials are treated separately. The text describes the European Digital Identity Wallet as one possible upstream source of user authentication and keeps Wallet presentations distinct from OAuth grants, access tokens, and API authorization. It does not assign a universal eIDAS assurance level to SMART flows, select a Wallet-to-Authorization-Server profile, or provide a detailed GDPR analysis. These details remain open for separate technical, legal, or workgroup decisions.

## Proposed Change Category
**Category:** Clarification

**Rationale:** The ticket does not record a Change Category. Clarification is proposed because the source explains the relationship among EHDS/eIDAS identification, Wallet-based authentication, and SMART/IUA authorization without replacing the selected authorization flows. Clarification is an established category in the local Jira ticket set.

## Proposed Change Impact
**Impact:** Compatible, substantive

**Rationale:** The ticket does not record a Change Impact. The proposed text preserves the environment-specific SMART/IUA flows, but introduces a conditional SHALL for eIDAS-recognized identification in environments where it is required; this can affect conformance and is therefore substantive. It is characterized as compatible because the source does not replace SMART/IUA grants, scopes, or API tokens.
