# Proposed Resolution for [FHIR-56639](https://jira.hl7.org/browse/FHIR-56639)

## Ticket Summary
| Field | Value |
|-------|-------|
| Key | [FHIR-56639](https://jira.hl7.org/browse/FHIR-56639) |
| Issue Type | Change Request |
| Summary | Add explanantions to the scopes section |
| Status | Triaged |
| Resolution | Unresolved |
| Reporter | [Giorgio Cangioli](https://jira.hl7.org/secure/ViewProfile.jspa?name=giorgio) |
| Assignee | Unassigned |
| Created | 2026-04-29 |
| Updated | 2026-07-16 |
| Priority | Medium |
| Specification / Raised In | EU Health Data API (R4) (FHIR) / 1.0.0-ballot |
| Work Group | HL7 Europe |
| Parent Key | Not provided |
| Related Page | Resource Access |
| Grouping | Not provided |

## Description
The ticket says the Resource Access Scopes section is unclear because it lists scopes such as `system/AllergyIntolerance.rs` and `system/Condition.rs` without sufficient explanation.

## Implementation Status
**Pending.** The local ticket is Triaged and Unresolved. Its record contains no comments or linked PR, commit, or related issue establishing implementation. The designated ballot-reconciliation branch source contains relevant scope and support explanations, but that source context is not ticket-linked implementation evidence. The Resource Access page classifies its list as SMART Backend Services scopes and distinguishes them from IUA scopes, but it does not explain the `.rs` suffix beside the list.

## Related Tickets
No related ticket keys are identified in the local ticket record.

## Current Build References
**Authoritative local implementation snapshot:** logical branch `ballot-recon-authorization`, using the designated `eu-health-data-api-ballot-recon-auth` worktree at commit `019276d397944036d1e502a2acddb3d5e56e158c` (2026-10-08). The worktree is clean and its `HEAD` matches that commit. The ticket's local record has no comments, PR, commit, or related-issue evidence linking this implementation to FHIR-56639.

- [Resource Access source](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/resource-access.md) — the Scopes section calls the entries SMART App Launch 2.2 FHIR Resource Scopes for the separately classified SMART Backend Services/direct-system use case; it says interactive uses select `patient/` or `user/` scopes and these are not IUA transaction scopes. Its nine listed values are `system/AllergyIntolerance.rs`, `system/Condition.rs`, `system/Observation.rs`, `system/DiagnosticReport.rs`, `system/MedicationRequest.rs`, `system/MedicationDispense.rs`, `system/MedicationStatement.rs`, `system/Immunization.rs`, and `system/Encounter.rs`. This adjacent text does not spell out what `.rs` means.
- [Authorization source](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/authorization.md) — gives `patient/Observation.rs` as a scope example and describes the general SMART v2 form as `<patient|user|system>/<ResourceType>.<cruds>`. It does not expand `r` and `s` in that passage; therefore it supplies the syntax context, not the missing inline explanation beside the Resource Access list.
- [Resource Access Provider CapabilityStatement source](../../../eu-health-data-api-ballot-recon-auth/input/fsh/capabilitystatements/CapabilityStatementResourceAccessProvider.fsh) — says providers MAY support a subset and declare supported resources; for SMART Backend Services they SHALL accept scopes for resources they support. It labels `system/Patient.rs` “REQUIRED - read + search Patient” and makes the other listed resource scopes conditional on provider support; Practitioner and Organization use `.r`.
- [Resource Consumer CapabilityStatement source](../../../eu-health-data-api-ballot-recon-auth/input/fsh/capabilitystatements/CapabilityStatementResourceConsumer.fsh) — says clients MAY choose resources based on their needs and server capabilities, with Patient lookup required and other resources requested as needed. For Backend Services clients SHALL request scopes for resources they need; it likewise labels `system/Patient.rs` “REQUIRED - read + search Patient” and conditions other scopes on need.

**Published page context only (not evidence of the pinned branch or ticket-linked implementation):** [Resource Access — Scopes](https://hl7.eu/fhir/health-data-api/current-build/en/resource-access.html#scopes), [Authorization](https://hl7.eu/fhir/health-data-api/current-build/en/authorization.html#tokens-scopes-enforcement-and-errors), [Resource Access Provider CapabilityStatement](https://hl7.eu/fhir/health-data-api/current-build/en/CapabilityStatement-resource-access-provider-eu-api.html), and [Resource Consumer CapabilityStatement](https://hl7.eu/fhir/health-data-api/current-build/en/CapabilityStatement-resource-consumer-eu-api.html).

## Disposition Analysis
The pinned branch has already classified the Resource Access entries as SMART App Launch 2.2 FHIR Resource Scopes for its separately identified Backend Services/direct-system use case, distinguished them from IUA transaction scopes, and directed interactive use to `patient/` or `user/` scopes. Its adjacent scope list, however, does not explain that `.rs` represents read and search. Authorization supplies the general `<cruds>` syntax but does not expand those letters there; both CapabilityStatements explicitly gloss `system/Patient.rs` as read + search. The concrete gap is therefore local and narrow: explain the suffix beside the Resource Access examples, while preserving the existing scope-family and use-case distinctions.

The branch also makes support conditional. Resource Access says providers are not required to support all clinical resources and declare supported resources in their CapabilityStatement. The provider CapabilityStatement says a provider SHALL accept scopes for resources it supports, with the non-Patient clinical resources conditional on support; the consumer CapabilityStatement says clients request scopes for resources they need, informed by server capabilities. Patient lookup is treated separately as required, and the CapabilityStatements label `system/Patient.rs` read + search. Clarification should not imply that every listed clinical resource is required in every deployment.

This describes current content at the pinned local branch commit, not ticket-linked implementation evidence. The ticket record itself provides no comment or linked PR/commit proving that the requested change has been implemented for this ticket. SMART FHIR resource scopes remain distinct from IUA/MHD transaction identifiers; transaction identifiers are not SMART scope values.

## Proposed Dispositions
### Disposition A: Accept As Requested
#### Proposal
Add a concise explanation immediately beside the existing list: each `system/<ResourceType>.rs` value is a SMART FHIR resource scope for the named resource, and `.rs` means read and search. State that a clinical-resource scope is relevant when the provider supports that resource and the consumer needs it; the provider declares support in its CapabilityStatement. Preserve the existing distinction from IUA transaction scopes and the separate interactive `patient/` and `user/` scope forms. Do not make every listed clinical resource a universal deployment requirement.
#### Justification
This directly resolves the remaining ambiguity at the point of use. It reuses the `.rs` meaning explicitly glossed for Patient in both CapabilityStatements and the conditional provider/consumer model already stated across the branch sources. It avoids duplicating the resource inventory or suggesting that the SMART list is an IUA/MHD transaction-scope list.

### Disposition B: Alternative Approach
#### Proposal
Replace the code block with a table giving each scope, its plain-language action, and its support condition (provider-supported and consumer-needed); retain the SMART-versus-IUA and interactive-scope distinctions in a note.
#### Justification
The table makes per-resource actions and conditions explicit, but duplicates information that can be stated once for the shared `.rs` suffix and risks drifting from the CapabilityStatements. It is more change than needed for the precise gap.

### Disposition C: Decline
#### Proposal
Make no change to Resource Access; rely on its SMART/IUA classification, Authorization's generic scope grammar, and the CapabilityStatements' Patient `rs` gloss and conditional resource rules.
#### Justification
The surrounding branch sources provide substantial context, including the `Patient.rs` read + search gloss in both CapabilityStatements. But the list itself still leaves `.rs` unexplained and requires readers to navigate elsewhere; declining would leave that specific usability gap unresolved.

### Recommendation
**Recommended disposition:** A

Accept with a concise explanation beside the existing list. The branch has already supplied the scope-family distinctions and capability-dependent support model; the remaining gap is the meaning of `.rs` at the list itself. A single inline gloss and a brief support-condition sentence address that gap without duplicating all entries as B would or leaving readers to infer the suffix as C would. Keep Patient lookup's separate required treatment distinct from the optional clinical-resource set.

## Next Steps
- Add the `.rs` read-and-search gloss beside the Resource Access scope list and retain the existing examples.
- State that clinical-resource availability depends on provider support and consumer need; keep Patient lookup's separate treatment clear.
- Preserve the distinction between SMART FHIR resource scopes, interactive `patient/`/`user/` scopes, and IUA transaction scopes.
- Verify consistency with the pinned provider and consumer CapabilityStatements.

## Verification Checklist
- [x] Ticket metadata and available implementation evidence reviewed
- [x] Pinned local branch sources and commit/date recorded; published pages labeled context only
- [x] Current branch scope syntax, `.rs` gap, conditionality, and provider/consumer support stated accurately
- [x] Ticket-linked implementation evidence distinguished from current branch source evidence
- [x] Dispositions A, B, and C are specific and meaningfully distinct
- [x] Recommendation is explicit and justified
- [x] SMART `.rs` meaning, deployment optionality, CapabilityStatement relationship, and transaction distinction are addressed