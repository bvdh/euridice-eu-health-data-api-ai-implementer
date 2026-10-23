# Pre-applied Resolution for [FHIR-56705](https://jira.hl7.org/browse/FHIR-56705)

## Evidence and PR State
- Ticket analysis: [FHIR-56705-resolution.md](./FHIR-56705-resolution.md) (verified against current auth fork source and PR state on 2026-10-22)
- PR: [PR #99 — Eu health data api ballot recon authorization](https://github.com/euridice-org/eu-health-data-api/pull/99) — **Open**, targeting `main`; GitHub reports head `c0e4af73c30331136bf3df722e988cfd3cc48d38`. For this proposed resolution, PR-contained changes are treated as applied. The relevant ticket-specific clarification is committed locally at `1638e75b81a8c43126ab44eb2f3bba92b15190b2`, two commits ahead of the PR head, and is not included in PR #99.

## Proposed Disposition
**Persuasive with Modification**

**Rationale:** The local auth branch addresses the concern that the SMART Backend Services token-request example might be mistaken for the only authorization choice: it identifies IUA as an alternative and directs implementers to select one applicable profile according to the environment-specific requirements. The ticket's broader proposal that other authorization approaches may be supported is not adopted; the guide's specified profiles and selection constraints remain in force. This ticket-specific clarification is committed in the local branch but is not included in PR #99. The Jira record remains Waiting for Input / Unresolved.

## Proposed Resolution Text
The SMART Backend Services token-request sequence in the Patient Summary example is an illustration of that authorization flow, not a statement that it is the only flow available under this guide. The example now explains that an IUA deployment uses its selected IUA actors and flow, and that one applicable profile is selected for each protected endpoint according to the environment-specific requirements. This accepts the request to clarify the example with modification: it identifies the guide's applicable IUA alternative without suggesting that any authorization approach outside the guide's defined choices may be used. The clarification is committed in the local authorization branch but is not included in [PR #99 — Eu health data api ballot recon authorization](https://github.com/euridice-org/eu-health-data-api/pull/99).

## Proposed Change Category
**Category:** Clarification.

**Rationale:** The ticket record does not provide a Change Category. Clarification is proposed because the example distinguishes its SMART-specific token request from the applicable IUA alternative without introducing a new authorization protocol.

## Proposed Change Impact
**Impact:** Compatible clarification of authorization-profile selection.

**Rationale:** The change makes the example's scope and profile-selection boundary explicit while retaining the guide's SMART and IUA flows. It does not redefine either protocol's behavior, add unrestricted authorization options, or claim dual conformance on one endpoint. The ticket record does not provide a controlled Change Impact value.
