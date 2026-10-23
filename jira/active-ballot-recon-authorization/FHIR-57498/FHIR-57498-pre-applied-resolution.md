# Pre-applied Resolution for [FHIR-57498](https://jira.hl7.org/browse/FHIR-57498)

## Evidence and PR State
- Ticket analysis: [FHIR-57498-resolution.md](./FHIR-57498-resolution.md) (verified against the current auth fork source and live PR state on 2026-10-22)
- Local implementation: `eu-health-data-api-ballot-recon-auth` at `1638e75b81a8c43126ab44eb2f3bba92b15190b2`. The cross-border NCP page clarifies that NCP-to-NCP authorization is governed outside this IG, and does not select an IUA transaction or flow.
- PR: [PR #99 — Eu health data api ballot recon authorization](https://github.com/euridice-org/eu-health-data-api/pull/99) — Open; head `c0e4af73c30331136bf3df722e988cfd3cc48d38`. For this proposed resolution, the PR changes are treated as applied. The local fork is two commits ahead; this local NCP clarification remains outside the PR head.

## Proposed Disposition
**Not Persuasive with Modification**

**Rationale:** The proposed home-Member-State claim or mapping is not defined in the current authorization content, and its semantics, identifier, issuer, validation, and conformance strength remain undecided. The local source instead clarifies that NCP-to-NCP authorization is outside this IG's scope and does not prescribe an IUA flow for the cross-border use case. This modifies the scope framing without claiming that the information need has been resolved: any claim or mapping remains undecided, including for applicable EHR-facing deployments.

## Proposed Resolution Text
The proposed requirement to add a home-Member-State claim or require `home_community_id` to represent a Member State is not adopted as stated. The local cross-border NCP use-case text clarifies that NCP-to-NCP authorization is governed by MyHealth@EU and Member State infrastructure, outside this Implementation Guide; the use case does not select an IUA transaction or authorization flow. Related authorization changes are in [PR #99](https://github.com/euridice-org/eu-health-data-api/pull/99), while the local NCP clarification described here remains outside that PR's head. The need for an origin claim at an EHR-facing API boundary, and any claim semantics, identifier, issuer, validation, or conformance requirement, remain undecided and require separate agreement.

## Proposed Change Category
**Category:** Documentation clarification (proposed; the ticket record does not identify a controlled change-category value).

**Rationale:** The applied text clarifies which authorization scope the IG does and does not govern; it does not add a claim or change authorization behavior.

## Proposed Change Impact
**Impact:** Scope clarification without a new authorization requirement (proposed; the ticket record does not identify a controlled impact value).

**Rationale:** The local source distinguishes MyHealth@EU NCP-to-NCP authorization from the EHR-facing API boundary. It does not prescribe how the originating Member State is conveyed or resolve that need for deployments.
