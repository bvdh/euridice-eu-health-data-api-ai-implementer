# Proposed Resolution for [FHIR-57498](https://jira.hl7.org/browse/FHIR-57498)

## Ticket Summary
| Field | Value |
|-------|-------|
| Key | [FHIR-57498](https://jira.hl7.org/browse/FHIR-57498) |
| Issue Type | Change Request |
| Status | Triaged |
| Resolution | Unresolved |
| Reporter | [JohanEltes](https://jira.hl7.org/secure/ViewProfile.jspa?name=johan%40eltes.se) |
| Assignee | Unassigned |
| Created | 2026-06-02 |
| Grouping | Not specified |

## Description
The ticket asks whether the EU Health Data API should define an EHDS-specific IUA claim for the home Member State of the foreign NCP, or require the existing optional IUA `home_community_id` claim to convey the Member State of origin.

## Implementation Status
**Current disposition state: Pending.** The ticket remains Triaged / Unresolved. The current authorization narrative recommends IUA in applicable environments but does not define a home-Member-State claim or a mapping from `home_community_id` to a Member State.

The current local auth fork is `eu-health-data-api-ballot-recon-auth` at `1638e75b81a8c43126ab44eb2f3bba92b15190b2`, two commits ahead of the submitted PR head. Its authorization page is unchanged from the PR head and has no `home_community_id` or home-Member-State claim. The local fork's additional cross-border NCP clarification says MyHealth@EU authorization remains outside this IG and that this use case does not select an IUA transaction or flow; it does not add the requested claim.

PR [euridice-org/eu-health-data-api#99](https://github.com/euridice-org/eu-health-data-api/pull/99) is **Open**, based on `main`, with head `c0e4af73c30331136bf3df722e988cfd3cc48d38` (verified 2026-10-22). It is not merged. Its authorization content does not define the requested claim or mapping, so the PR is not evidence that this ticket has been implemented.

## Related Tickets
No related ticket keys are recorded in the local ticket record.

## Current Build References
- [Authorization — National Interoperability Infrastructure](https://build.fhir.org/ig/euridice-org/eu-health-data-api/branches/eu-health-data-api-ballot-recon-auth/en/authorization.html#national-interoperability-infrastructure) — describes where IUA may be used and is the relevant authorization context; it does not define this claim.
- [Cross-Border Exchange via NCP — Authorization](https://build.fhir.org/ig/euridice-org/eu-health-data-api/branches/eu-health-data-api-ballot-recon-auth/en/usecase-cross-border-ncp.html#authorization) — distinguishes the out-of-scope MyHealth@EU authorization from authorization at the EHR-facing API boundary.

## Disposition Analysis
The requested information could be useful to a Resource Access Provider, but the ticket presents two materially different implementation options without defining what “home Member State” means for the originating request, the identifier representation, who is trusted to assert it, or what conformance is expected. The optional IUA `home_community_id` is described as an identifier for the originating home community; equating that concept with a Member State needs an agreed mapping. The current source and open PR do not make that choice. Since the local NCP clarification further states that MyHealth@EU authorization is outside this IG's scope, the IG should not imply that it governs NCP-to-NCP authorization.

## Proposed Dispositions
### Disposition A: Accept As Requested
#### Proposal
Require the existing IUA `home_community_id` claim to identify the originating Member State in the applicable EU Health Data API authorization context.
#### Justification
This reuses an existing IUA claim and could avoid defining a new claim. However, the ticket does not establish that a home community is equivalent to a Member State, how the value is encoded, or which authority may assert it. Adopting this option without those decisions could produce incompatible interpretations.

### Disposition B: Alternative Approach
#### Proposal
Defer a claim requirement until the workgroup agrees on the origin information to be conveyed, its identifier format and trusted issuer, validation responsibilities, applicable API boundary, and whether support is optional, recommended, or required. Then decide whether to define an EHDS-specific claim or an explicit, interoperable mapping to `home_community_id`. Do not extend the IG's scope to MyHealth@EU NCP-to-NCP authorization through this resolution.
#### Justification
This preserves the interoperability concern while avoiding an unsupported semantic mapping or an underspecified normative requirement. It aligns with the current source, which does not define the claim, and with the cross-border NCP clarification that MyHealth@EU authorization is outside this IG. It leaves a concrete policy decision for the workgroup rather than implying that the open PR implemented one.

### Disposition C: Decline
#### Proposal
Decline the requested claim or mapping for this release and make no change to the authorization content.
#### Justification
This avoids introducing an underspecified requirement and is consistent with the current implementation. It is less responsive than deferring a decision because it does not preserve a defined path to address the stated information need if the workgroup confirms it.

### Recommendation
**Recommended disposition:** B

Defer the claim choice until its semantics, identifier, issuer, validation, scope, and conformance strength are agreed. This is preferable to accepting either an undefined new claim or a potentially incorrect equivalence between `home_community_id` and Member State. The current authorization source, local NCP clarification, and live PR #99 provide no evidence that this decision has already been made or implemented.

## Next Steps
- Ask the workgroup to agree whether the relevant origin is the NCP's Member State, the originating authorization domain, or another defined concept.
- If the need is confirmed, specify a stable identifier and trusted assertion/validation model, then select the claim mechanism and conformance strength.
- Keep MyHealth@EU NCP-to-NCP authorization out of this IG's requirements unless scope is separately changed.

## Verification Checklist
- [x] Ticket metadata and request reviewed from the active ticket record.
- [x] Current authorization and cross-border NCP source reviewed in the specified auth fork.
- [x] Current PR state, URL, and head verified with `gh`.
- [x] Current build references included for relevant sections.
- [x] Dispositions are specific and meaningfully distinct.
- [x] Recommendation is explicit and justified against the other options.
