# Pre-applied Resolution for [FHIR-56369](https://jira.hl7.org/browse/FHIR-56369)

## Evidence and PR State
- Ticket analysis: [FHIR-56369-resolution.md](./FHIR-56369-resolution.md) (verified against current source and PR state on 2026-10-22)
- PR: [PR #99](https://github.com/euridice-org/eu-health-data-api/pull/99) — Open; targets `main`; current head `c0e4af73c30331136bf3df722e988cfd3cc48d38`. For this proposed resolution, the PR changes are treated as applied. The PR changes the generic and IHE IUA actor definitions and the authorization/actor guidance. The local ticket remains Triaged with Jira resolution Unresolved.

## Proposed Disposition
**Persuasive**

**Rationale:** [PR #99](https://github.com/euridice-org/eu-health-data-api/pull/99) addresses the requested actor clarification by defining IHE IUA and SMART as separate protocol-specific actors, distinct from the generic Health Data API Authorization Client. The authorization guidance selects one profile for each Resource Server endpoint. Because an endpoint conforms to the selected IUA or SMART profile rather than both at once, the two protocols' requirements do not conflict at that endpoint and no cross-protocol precedence rule is needed. The IUA actor's “least-privilege scopes” description applies to that separate IUA role; it does not make the SMART actor an IUA actor or combine their conformance requirements.

## Proposed Resolution Text
This ticket is addressed by the actor and authorization clarifications in [PR #99](https://github.com/euridice-org/eu-health-data-api/pull/99). The changes distinguish the generic Health Data API Authorization Client from the separate protocol-specific IHE IUA Authorization Client and SMART actors. For each Resource Server endpoint, the applicable environment selects one protocol profile. Accordingly, IUA and SMART requirements are not combined on the same endpoint and cannot conflict there; the ticket's concern about which actor definition governs in a conflict is addressed by selecting the applicable protocol-specific actor. The generic role does not itself claim conformance to either protocol, and the Authorization guidance distinguishes core IUA requirements from applicable MHD integration and additional recommendations.

No third derived IUA actor or universal SMART-over-IUA precedence rule is needed: the generic role and the protocol actors are distinct, and each endpoint selects its protocol. The Jira issue remains Triaged/Unresolved pending formal workgroup disposition.

## Proposed Change Category
**Category:** Clarification

**Rationale:** The ticket-specific change clarifies the distinction between the generic Health Data API authorization role and the inherited protocol actors, and explains protocol selection by environment. The proposed resolution adds no new transaction.

## Proposed Change Impact
**Impact:** Non-substantive

**Rationale:** For this ticket's actor-identity concern, the proposal clarifies conformance boundaries and terminology without adding a new data element or transaction requirement. This classification is limited to the ticket-specific clarification; the broader authorization changes in PR #99 may require separate impact assessment.
