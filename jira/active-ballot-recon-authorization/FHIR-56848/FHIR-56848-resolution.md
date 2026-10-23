# Proposed Resolution for [FHIR-56848](https://jira.hl7.org/browse/FHIR-56848)

## Ticket Summary
| Field | Value |
|-------|-------|
| Key | [FHIR-56848](https://jira.hl7.org/browse/FHIR-56848) |
| Issue Type | Technical Correction |
| Status | Waiting for Input |
| Resolution | Unresolved |
| Reporter | Giorgio Cangioli |
| Assignee | Bas van den Heuvel |
| Created | 2026-05-05 |
| Grouping | Not recorded |

## Description
The ticket objects to making SMART Backend Services a mandatory authorization mechanism across six CapabilityStatements. It asks for SMART to be one possible or preferred approach, recognizes that cross-border authorization may rely on other trust frameworks, and proposes allowing other mechanisms that comply with the guide and applicable EU regulations. It also suggests keeping SMART preference in narrative rather than expressing it as a SHALL requirement.

## Implementation Status
**Applied in the authorization branch; not merged and not reflected in Jira status.** The current source describes environment-specific authorization and makes SMART Backend Services conditional on a pre-authorized system-to-system use case. The abstract CapabilityStatements describe IUA and SMART alternatives and defer the concrete security-service declaration to a deployment. The live [PR #99](https://github.com/euridice-org/eu-health-data-api/pull/99) is open, targets `main`, and currently has head `c0e4af73c30331136bf3df722e988cfd3cc48d38` (checked 2026-10-22). No PR checks were reported by GitHub at the time checked.

The authorization source reviewed in the named worktree was `input/pagecontent/authorization.md` and the six related CapabilityStatement FSH files listed below. The preceding worktree status check on 2026-10-22 showed local HEAD `1638e75`, two commits ahead of the remote PR branch; those commits changed example/use-case content rather than the authorization policy. The live PR head was rechecked on 2026-10-22 and remained unchanged. The local authorization source itself was read during this refresh.

The source does not grant an unrestricted option to use any other authorization framework. It names IHE IUA and SMART as the mechanisms addressed by this guide, and some cross-border contexts (including MyHealth@EU) are outside this guide's authorization scope.

## Related Tickets
No related ticket keys are recorded in the local ticket record.

## Current Build References
- [Authorization — Environment-specific requirements](https://hl7.eu/fhir/health-data-api/current-build/en/authorization.html#environment-specific-requirements) — identifies environment-specific protocol selection, IUA recommendations, and when SMART Backend Services may be used.
- [EEHRxF Document Access Provider CapabilityStatement](https://hl7.eu/fhir/health-data-api/current-build/en/CapabilityStatement-document-access-provider-eu-api.html) — describes IUA, conditional SMART Backend Services, and interactive SMART behavior for the provider.
- [EEHRxF Document Consumer CapabilityStatement](https://hl7.eu/fhir/health-data-api/current-build/en/CapabilityStatement-document-consumer-eu-api.html) — describes the consumer's environment-selected authorization role and conditional backend flow.
- [EEHRxF Document Publisher CapabilityStatement](https://hl7.eu/fhir/health-data-api/current-build/en/CapabilityStatement-document-publisher-eu-api.html) — describes selected authorization roles for document publication and conditional backend flows.
- [EEHRxF Grouped Document Publisher/Access Provider CapabilityStatement](https://hl7.eu/fhir/health-data-api/current-build/en/CapabilityStatement-document-publisher-access-provider-eu-api.html) — applies protocol selection to the protected external endpoint.
- [EEHRxF Resource Access Provider CapabilityStatement](https://hl7.eu/fhir/health-data-api/current-build/en/CapabilityStatement-resource-access-provider-eu-api.html) — describes provider authorization and scope behavior for IUA, backend, and interactive SMART.
- [EEHRxF Resource Consumer CapabilityStatement](https://hl7.eu/fhir/health-data-api/current-build/en/CapabilityStatement-resource-consumer-eu-api.html) — describes environment-selected client roles and conditional backend and interactive flows.

## Disposition Analysis
The current branch addresses the central concern that SMART Backend Services should not be a universal authorization requirement. The authorization narrative makes the choice depend on environment and use case. For preconfigured system-to-system endpoints in National Interoperability Infrastructure, it recommends IUA where national policy requires IUA integration or its JWT Token Option, and says a system-to-system endpoint MAY instead use SMART Backend Services when its applicability conditions are met. Each deployment selects one profile per Resource Server endpoint; the guide does not define dual conformance on one endpoint.

The six abstract CapabilityStatements likewise describe IUA and SMART roles separately, state that they do not advertise a fixed security service, and require a concrete deployment to declare one selected security-service coding. Their SMART Backend Services grant, client-authentication, and scope details apply to the pre-authorized system-to-system use case, not to every environment or interaction.

This is a modified rather than complete acceptance of the ticket's wording. The current IG does not authorize arbitrary other mechanisms merely because they comply with applicable regulations; the IG's authorization content is limited to IHE IUA and SMART. Thus, the proposal should accept the removal of a universal SMART Backend Services requirement while clarifying that a deployment must select an IG-defined profile and satisfy that profile's requirements. The local ticket remains Waiting for Input / Unresolved; an open PR is implementation evidence, not formal Jira disposition.

## Proposed Dispositions
### Disposition A: Accept As Requested
#### Proposal
Make SMART Backend Services optional and allow any other authorization mechanism that complies with the guide and applicable EU regulations.
#### Justification
This follows the broadest reading of the ticket and maximizes architectural flexibility. However, the current guide defines authorization behavior around IHE IUA and SMART and does not specify conformance requirements for arbitrary frameworks. Adopting this wording without defining those requirements would leave implementers without a clear, testable profile.

### Disposition B: Alternative Approach
#### Proposal
Accept that SMART Backend Services is not universally required. Keep authorization profile selection environment- and use-case-specific: use the guide's IUA or SMART profile as applicable, and apply SMART Backend Services requirements only to a selected pre-authorized system-to-system flow. Do not state that unspecified authorization frameworks are permitted by this guide.
#### Justification
This matches the current authorization narrative and the six abstract CapabilityStatements. It responds to the concern about mandatory Backend Services while preserving explicit, interoperable requirements for each supported profile. It also accurately limits the guide's scope rather than implying conformance rules for mechanisms it does not define.

### Disposition C: Decline
#### Proposal
Decline the requested change and retain a universal SMART Backend Services requirement across the affected CapabilityStatements.
#### Justification
This could provide one uniform backend authorization profile, but it would conflict with the current source's environment-specific selection and its explicit IUA path. It would also fail to address the ticket's concern about treating Backend Services as mandatory.

### Recommendation
**Recommended disposition:** B

Recommend the alternative approach. The current branch source already makes SMART Backend Services conditional and documents IUA alternatives in the relevant environments, which addresses the central request. A broad permission for unspecified mechanisms is not supported by the guide's stated scope and should not be implied. The implementation evidence is in open PR #99; it has not been merged, and the ticket remains formally unresolved.

## Next Steps
- Confirm the proposed modified disposition through the workgroup.
- If the workgroup intends to allow mechanisms beyond IUA and SMART, define the necessary profile, conformance, and security-declaration requirements separately.
- Keep the Jira issue unresolved until the workgroup records its decision; PR #99 being open does not itself resolve the ticket.

## Verification Checklist
- [x] Evidence reviewed
- [x] Current build references included for impacted/relevant sections
- [x] Dispositions are specific
- [x] Recommendation is justified
