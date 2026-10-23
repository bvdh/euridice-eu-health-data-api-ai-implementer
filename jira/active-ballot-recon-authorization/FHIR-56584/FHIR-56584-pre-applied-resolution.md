# Pre-applied Resolution for [FHIR-56584](https://jira.hl7.org/browse/FHIR-56584)

## Evidence and PR State
- Ticket analysis: [FHIR-56584-resolution.md](./FHIR-56584-resolution.md) (refreshed and checked against current source and PR state on 2026-10-22, including the logging page).
- PR: [PR #99 — Eu health data api ballot recon authorization](https://github.com/euridice-org/eu-health-data-api/pull/99) — **Open**, targeting `main`, head `c0e4af73c30331136bf3df722e988cfd3cc48d38`; verified with `gh` on 2026-10-22. For this proposed resolution, the PR changes are treated as applied; no checks are reported.
- Source boundary: the local implementation branch is at `61abb39`, four commits ahead of the PR head and not pushed. The new informative logging page (`61abb39`) and later portal-page clarifications are local source only and are not in PR #99 as currently posted.
- Ticket status: the local record lists Waiting for Input / Unresolved; branch work and an open PR do not change Jira status.

## Proposed Disposition
**Persuasive with Modification**

**Rationale:** The concern that user authentication and user context can matter to authorization and audit is valid. Current authorization guidance distinguishes authentication from downstream API authorization, and describes user context according to the selected protocol and flow. It does not support a universal user-claim requirement. The audit-event question in the ticket is now answered by an informative logging page that distinguishes an EHR's API request or release event from later end-user access at the receiving system. The modification is that the IG adds no universal token claim, log format, or cross-system audit correlation requirement.

## Proposed Resolution Text
The concern is persuasive with modification. The authorization guidance in [PR #99 — Eu health data api ballot recon authorization](https://github.com/euridice-org/eu-health-data-api/pull/99) distinguishes the Authentication Service, Authorization Server, and Resource Server, and describes user authentication and user or clinical token context as dependent on the selected environment, protocol, and flow. It does not require a user claim in every API access token, and token validity alone does not establish consent, patient identity, or entitlement. In response to the audit question, the implementation branch adds an informative page, "Logging and Audit Considerations", under Implementation. It explains that an API request or release at the source EHR and a later user's access at the receiving system are different events that may occur in different systems, and that authentication and authorization are distinct from logging. It notes that deployments may use syslog, IHE ATNA, or IHE BALP as appropriate to their logging needs, without mandating any. It is informative and does not establish a shared log format, audit transport, log interoperability, cross-system audit correlation, or a universal token-claim requirement. The local ticket record remains Waiting for Input / Unresolved.

## Proposed Change Category
**Category:** Clarification (proposed; the local ticket record does not provide a controlled category value).

**Rationale:** The relevant work clarifies authentication, API authorization, and protocol-specific user context, rather than adding a new actor or audit exchange. “Clarification” is also used in related branch resolution artifacts.

## Proposed Change Impact
**Impact:** Substantive clarification (proposed; the local ticket record does not provide a controlled impact value).

**Rationale:** The authorization guidance differentiates interactive and pre-authorized flows and identifies endpoint-specific conformance choices, which can affect implementer conformance. The logging page is informative only and introduces no logging format, transport, or interoperability requirement.
