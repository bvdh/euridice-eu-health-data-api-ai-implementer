# Proposed Resolution for [FHIR-56386](https://jira.hl7.org/browse/FHIR-56386)

## Ticket Summary
| Field | Value |
|-------|-------|
| Key | [FHIR-56386](https://jira.hl7.org/browse/FHIR-56386) |
| Issue Type | Change Request |
| Status | Waiting for Input |
| Resolution | Unresolved |
| Priority | Medium |
| Reporter | [Reinhard Egelkraut](https://jira.hl7.org/secure/ViewProfile.jspa?name=Egelkraut) |
| Assignee | [Bas van den Heuvel](https://jira.hl7.org/secure/ViewProfile.jspa?name=bvdh) |
| Created | 2026-04-17 |
| Raised in Version | 1.0.0-ballot |
| Work Group | HL7 Europe |
| Parent Key | Not stated in the ticket |
| Grouping | Not stated in the ticket |

## Description
The ticket observes that the authorization portion of section 4.2.4, "Technical Flow," mentions SMART as a requirement and asks that IHE IUA also be included, on the basis that IUA underlies authorization in the EU Health Data API. The ticket identifies the Health Professional Access Service use case and links to its ballot-era Technical Flow section.

## Implementation Status
**Pending.** The ticket is Waiting for Input and has no comments, pull requests, commit references, or other ticket-linked implementation evidence. The branch snapshot below contains source text relevant to the request, but branch content alone does not establish that this ticket was implemented.

## Current Branch Implementation Snapshot
Inspected `eu-health-data-api-ballot-recon-auth` on branch `ballot-recon-authorization`, commit `019276d397944036d1e502a2acddb3d5e56e158c` (2026-10-08); the worktree was clean at inspection.

- **Health Professional Access Service:** [usecase-health-professional-portal.md](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/usecase-health-professional-portal.md) says EHR queries may be direct, through national infrastructure, or both. At the Interoperability Component API surface, the access service is the EU Authorization Client and the protected EHR endpoint the EU Authorization Resource Server; the Authorization Server is separate. [authorization.md](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/authorization.md#healthcare-provider) says Healthcare Provider deployments SHALL use SMART App Launch. SMART Backend Services is recommended for server-side access only when the client is pre-authorized, uses asymmetric confidential-client authentication, and has no runtime end-user authorization; otherwise interactive clinician authorization uses the applicable SMART Clinician Access flow. The HPAS authorization text does not assign IUA to this API surface or require SMART and IUA together.
- **National Interoperability Infrastructure:** [authorization.md](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/authorization.md#national-interoperability-infrastructure) recommends IHE IUA when the established national environment has preconfigured participants and needs user or patient claims. These are token claims, not OAuth scopes; applicable actors, transaction scopes, and metadata depend on the deployed MHD transactions.
- **Actor model:** [actors.md](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/actors.md) identifies HPAS as a Document Consumer and/or Resource Consumer. Their definitions in [Actors.fsh](../../../eu-health-data-api-ballot-recon-auth/input/fsh/Actors.fsh) use the authorization-client role selected by environment and use case; protected provider actors use the selected IUA Resource Server or SMART FHIR Resource Server. A workflow route through national infrastructure therefore does not, by itself, select IUA for the separate HPAS-to-EHR API surface.

This branch content is implementation-state evidence for the cited commit, not evidence linked from the ticket that FHIR-56386 was resolved or merged. The ticket's ballot Related URL records the request, not a pull request or implementation reference.

## Related Tickets
No related ticket keys or links are recorded in the ticket data.

## Published Reference Context
The following upstream current-build pages are retained as published context only. They are not the authority for the branch snapshot above and do not establish ticket-linked implementation evidence.
- [Health Professional Access Service: Workflow](https://hl7.eu/fhir/health-data-api/current-build/en/usecase-health-professional-portal.html#workflow)
- [Health Professional Access Service: Authorization](https://hl7.eu/fhir/health-data-api/current-build/en/usecase-health-professional-portal.html#authorization)
- [Authorization: National Interoperability Infrastructure](https://hl7.eu/fhir/health-data-api/current-build/en/authorization.html#national-interoperability-infrastructure) and [Healthcare Provider](https://hl7.eu/fhir/health-data-api/current-build/en/authorization.html#healthcare-provider)
- [Actors: Document Consumer](https://hl7.eu/fhir/health-data-api/current-build/en/actors.html#document-consumer) and [Resource Consumer](https://hl7.eu/fhir/health-data-api/current-build/en/actors.html#resource-consumer)

**Mapping gap:** The ticket points to ballot-era section 4.2.4 "Technical Flow." In the inspected branch, [the HPAS use case](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/usecase-health-professional-portal.md) is organized into Workflow and Authorization sections rather than a section with that title. Those sections, read with the branch's [environment-specific authorization requirements](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/authorization.md#environment-specific-requirements), are the closest mapping. The Workflow mentions the national-infrastructure route but does not directly cross-reference the National Interoperability Infrastructure authorization subsection. That missing flow cross-reference is a candidate clarification, not evidence for a new universal IUA requirement.

## Disposition Analysis
The ticket asks to mention IUA as well as SMART in the HPAS flow, but the inspected branch selects protocols by environment and API surface. IUA is **recommended** for National Interoperability Infrastructure where its preconfigured-participant model and user/patient claims are needed. By contrast, the HPAS use-case authorization text identifies the Interoperability Component API surface as a Healthcare Provider deployment and the authorization page says Healthcare Provider deployments **SHALL** use SMART. EHR queries may separately be routed through national infrastructure; that route does not make the HPAS-to-EHR API itself an IUA endpoint or require both protocols on every HPAS flow.

Ticket-traceable evidence is limited to the description, current unresolved status, and ballot Related URL. The branch-specific implementation context is documented in the [authorization source](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/authorization.md), [HPAS use case](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/usecase-health-professional-portal.md), and [actor definitions](../../../eu-health-data-api-ballot-recon-auth/input/fsh/Actors.fsh). No ticket comments or ticket-linked PR/commit references establish a completed implementation.

## Proposed Dispositions
### Disposition A: Accept As Requested
#### Proposal
Add IHE IUA beside SMART in the HPAS Technical Flow as an authorization protocol for the flow, without conditioning the statement on which environment or route is selected.

#### Justification
This most directly follows the ticket's request to include IUA alongside the existing SMART mention. However, an unqualified addition could imply that IUA is required alongside SMART for every HPAS flow, which would conflict with the current per-environment selection and introduce an unsupported dual-protocol requirement.

### Disposition B: Alternative Approach
#### Proposal
Clarify the HPAS flow using the existing environment-specific rules: retain SMART as required for the Healthcare Provider deployment and its access to EHR APIs. If a deployment includes a National Interoperability Infrastructure component, refer to that environment's IUA recommendation where user or patient claims are needed and identify which component and API hop it applies to. Do not assign IUA to the HPAS-to-EHR interface merely because a query is routed through national infrastructure, and do not require IUA and SMART together for every HPAS flow. Add a direct cross-reference from the national-infrastructure route in the use-case Workflow to the corresponding Authorization subsection if the workgroup agrees the navigation gap should be closed.

#### Justification
This acknowledges IUA where the specification selects it while preserving the distinction between a **SHALL** requirement for SMART in Healthcare Provider deployments and a **SHOULD** recommendation for IUA in the National Interoperability Infrastructure. It also follows the use case's statement that national infrastructure is one possible route, rather than assuming it is used in all deployments. The cross-reference is editorial/navigation clarification; it does not create a new universal normative protocol requirement or claim dual conformance.

### Disposition C: Decline
#### Proposal
Make no change to the HPAS use-case authorization text; rely on its existing link to the Authorization page and the environment-specific requirements there.

#### Justification
The branch Authorization page already specifies SMART for Healthcare Provider deployments and recommends IUA for the National Interoperability Infrastructure. Declining avoids duplicating policy in the use-case page. The trade-off is that the workflow's national-infrastructure route has no direct cross-reference to the IUA subsection, so readers may not readily connect that route to the applicable recommendation.

### Recommendation
**Recommended disposition:** B

Adopt the environment-conditioned alternative. It meets the ticket's intent to make IUA discoverable where applicable without changing the branch's Healthcare Provider SMART requirement or implying that both protocols apply to every HPAS flow. The ticket's ballot link establishes the request; the cited branch sources at commit `019276d397944036d1e502a2acddb3d5e56e158c` establish the current scope. Treat a direct workflow cross-reference as a candidate clarification for the workgroup; do not make it a universal normative IUA requirement.

## Next Steps
- Confirm with the workgroup that the requested flow is the Healthcare Provider HPAS-to-EHR path and whether the flow's national-infrastructure route needs a direct cross-reference.
- If accepted, update only the relevant use-case narrative to point to the existing environment-specific Authorization requirements. Preserve SMART as SHALL for Healthcare Provider deployments and IUA as a national-infrastructure recommendation where applicable.
- Record any decision about deployment classification or whether a particular flow crosses into the National Interoperability Infrastructure; do not infer it from the phrase "through national infrastructure" alone.

## Verification Checklist
- [x] Ticket metadata, description, status, and available implementation evidence reviewed.
- [x] Dated branch snapshot identifies the branch and commit, links local authorization/use-case/actor sources, and distinguishes branch state from ticket-linked evidence.
- [x] Upstream current-build references are explicitly labeled published context only; mapping gap stated.
- [x] Dispositions A, B, and C are specific and distinct.
- [x] Recommendation is explicit and justified against the ticket and current environment-specific requirements.
- [x] Missing flow cross-reference is identified as a candidate clarification, not a new universal protocol requirement.