# Pre-applied Resolution for [FHIR-56581](https://jira.hl7.org/browse/FHIR-56581)

## Evidence and PR State
- Ticket analysis: [FHIR-56581-resolution.md](./FHIR-56581-resolution.md) (verified against current source and PR state on 2026-10-22)
- PR: [PR #99 — Eu health data api ballot recon authorization](https://github.com/euridice-org/eu-health-data-api/pull/99) — **Open**; targets `main`, head `c0e4af73c30331136bf3df722e988cfd3cc48d38`. For this proposed resolution, the PR changes are treated as applied. The PR changes `input/pagecontent/authorization.md`. GitHub reports no review decision or status checks. The PR description refers generally to authorization-related tickets and does not name FHIR-56581.

## Proposed Disposition
**Persuasive**

**Rationale:** The current authorization page provides a five-aspect IUA/SMART comparison and detailed sections covering client authentication, discovery, token handling, and CORS, as well as environment-specific profile selection. This substantially answers the request to add relevant differences beyond one example. The table remains a summary, but the relevant details are covered elsewhere on the same page. Neither the PR description nor the local ticket record establishes ticket-specific attribution or formal Jira acceptance.

## Proposed Resolution Text
The Authorization page has been expanded to compare IHE IUA and SMART App Launch across [discovery, scope model, context, interactive use, and system-to-system use](https://github.com/euridice-org/eu-health-data-api/blob/c0e4af73c30331136bf3df722e988cfd3cc48d38/input/pagecontent/authorization.md#ihe-iua-and-smart-app-launch). Its detailed protocol sections also describe client authentication, discovery metadata, access-token handling, and CORS, and clarify how deployments select the applicable profile per endpoint and environment. These changes are present in [PR #99 — Eu health data api ballot recon authorization](https://github.com/euridice-org/eu-health-data-api/pull/99). The work group is asked to accept the request as Persuasive. The Jira record remains Waiting for Input and Unresolved pending formal work-group disposition.

## Proposed Change Category
**Category:** Clarification (proposed; the local ticket record does not provide the controlled Jira category value).

**Rationale:** The changes clarify and compare the existing IUA and SMART authorization approaches and specify their environment-specific application rather than introducing a new protocol.

## Proposed Change Impact
**Impact:** Substantive conformance clarification (proposed; the local ticket record does not provide the controlled Jira impact value).

**Rationale:** The additional client-authentication, token, CORS, and endpoint-profile guidance informs authorization implementation and conformance choices. The impact is therefore more than editorial, even though the page compares existing profiles rather than defining a new authorization protocol.
