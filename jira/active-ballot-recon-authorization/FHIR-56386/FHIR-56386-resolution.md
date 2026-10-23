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
**Source work applied locally; ticket unresolved.** The ticket remains Waiting for Input / Unresolved and has no comments or ticket-linked PR/commit references. The current implementation worktree contains HPAS authorization text addressing the request conditionally by environment and API boundary. `gh` verified on 2026-10-22 that GitHub PR [#99](https://github.com/euridice-org/eu-health-data-api/pull/99) is Open at head `c0e4af73c30331136bf3df722e988cfd3cc48d38`, but its current head does not include the worktree's latest two commits, including the latest HPAS-flow clarification. Therefore the local source demonstrates implementation-state coverage, but the PR must not be described as containing that latest clarification until its head is updated. Neither branch content nor an open PR changes the formal Jira status.

## Current Branch Implementation Snapshot
Inspected the explicitly selected `eu-health-data-api-ballot-recon-auth` worktree on branch `eu-health-data-api-ballot-recon-auth`, at commit `1638e75b81a8c43126ab44eb2f3bba92b15190b2` (2026-10-21). The worktree has pre-existing modifications to `input/includes/auth-todo.md` and `input/includes/proposed-ticket-resolutions.md`; neither was changed for this analysis. The local branch is two commits ahead of the PR #99 head, `c0e4af73c30331136bf3df722e988cfd3cc48d38`.

- **Health Professional Access Service:** [usecase-health-professional-portal.md](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/usecase-health-professional-portal.md) says EHR queries may be direct, through national infrastructure, or both. The authorization text now distinguishes each EHR-facing API boundary and maps interactive clinician access in a Healthcare Provider hop to SMART App Launch, including the applicable Clinician Access capability set and SMART actors. It describes SMART Backend Services only for pre-authorized server-side requests using asymmetric confidential-client authentication with no runtime end-user authorization. For a National Interoperability Infrastructure hop, it points to the environment-specific IUA conditions and names the IUA Authorization Client, Resource Server, and Authorization Server roles. Environment and flow selection remain deployment-dependent.
- **Protocol selection:** [authorization.md](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/authorization.md#national-interoperability-infrastructure) recommends IUA for preconfigured system-to-system endpoints where national policy requires IUA transaction integration or its JWT Token Option. The recommendation is limited to those endpoints; an eligible endpoint may instead use SMART Backend Services. The source selects one profile per Resource Server endpoint and does not define dual conformance on one endpoint. Under [Healthcare Provider](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/authorization.md#healthcare-provider), SMART App Launch SHOULD be supported where third-party interactive access is offered; this is not stated as a universal EHDS requirement.
- **Actor model:** [actors.md](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/actors.md) identifies HPAS as a Document Consumer and/or Resource Consumer. Their definitions in [Actors.fsh](../../../eu-health-data-api-ballot-recon-auth/input/fsh/Actors.fsh) distinguish the generic Health Data API authorization roles from protocol-specific IUA and SMART actors. The HPAS narrative maps to these protocol-specific roles according to the selected environment and flow.

These source changes cover the request in the current local worktree without imposing IUA universally or combining IUA and SMART on one endpoint. `gh` verified PR #99 state and head on 2026-10-22. The latest HPAS-flow clarification is not in the current PR #99 head: at that head, the HPAS page still has the earlier generic SMART guidance and does not map the national-infrastructure hop to IUA actors. PR #99 is Open and includes related environment-specific authorization content, but is not evidence that the latest local HPAS clarification has been merged or even pushed. The ticket's ballot Related URL records the request, not a ticket-linked implementation reference.

## Related Tickets
No related ticket keys or links are recorded in the ticket data.

## Current Build References
The following upstream current-build pages are retained as published context only. They are not the authority for the branch snapshot above and do not establish ticket-linked implementation evidence.
- [Health Professional Access Service: Workflow](https://hl7.eu/fhir/health-data-api/current-build/en/usecase-health-professional-portal.html#workflow)
- [Health Professional Access Service: Authorization](https://hl7.eu/fhir/health-data-api/current-build/en/usecase-health-professional-portal.html#authorization)
- [Authorization: National Interoperability Infrastructure](https://hl7.eu/fhir/health-data-api/current-build/en/authorization.html#national-interoperability-infrastructure) and [Healthcare Provider](https://hl7.eu/fhir/health-data-api/current-build/en/authorization.html#healthcare-provider)
- [Actors: Document Consumer](https://hl7.eu/fhir/health-data-api/current-build/en/actors.html#document-consumer) and [Resource Consumer](https://hl7.eu/fhir/health-data-api/current-build/en/actors.html#resource-consumer)

**Mapping note:** The ticket points to ballot-era section 4.2.4 "Technical Flow." In the current worktree the HPAS use case is organized into Workflow and Authorization sections rather than a section with that title. Its Authorization subsection now directly identifies the protocol-specific roles for Healthcare Provider and National Interoperability Infrastructure hops and links to the applicable environment-specific authorization rules. This is the closest current mapping; it does not make IUA a universal requirement.

## Disposition Analysis
The ticket asks to include IHE IUA alongside SMART in the HPAS Technical Flow. The current worktree now identifies both profiles where applicable, but selects them by the environment and individual API boundary: SMART App Launch for an interactive clinician flow in a Healthcare Provider hop, qualifying SMART Backend Services for pre-authorized server-to-server access, and IUA for qualifying National Interoperability Infrastructure endpoints. The Healthcare Provider guidance is a conditional SHOULD, not a universal SHALL. IUA is not required for every HPAS flow, and the source does not require IUA and SMART together on one endpoint. An HPAS workflow routed through national infrastructure does not by itself establish which authorization profile applies to each downstream boundary.

Ticket-traceable evidence is limited to the description, current unresolved status, and ballot Related URL. The current source evidence is documented in the [authorization source](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/authorization.md), [HPAS use case](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/usecase-health-professional-portal.md), and [actor definitions](../../../eu-health-data-api-ballot-recon-auth/input/fsh/Actors.fsh). PR #99 is Open, but its head does not contain the current HPAS-flow clarification; the local branch is ahead by two commits. The analysis therefore supports that the request is addressed in local source, not that the exact change is present in the PR or merged.

## Proposed Dispositions
### Disposition A: Accept As Requested
#### Proposal
Add IHE IUA beside SMART in the HPAS Technical Flow as an authorization protocol for the flow, without conditioning the statement on which environment or route is selected.

#### Justification
This most directly follows the ticket's request to include IUA alongside the existing SMART mention. However, an unqualified addition could imply that IUA is required alongside SMART for every HPAS flow, which would conflict with the current per-environment selection and introduce an unsupported dual-protocol requirement.

### Disposition B: Alternative Approach
#### Proposal
Clarify the HPAS flow using the existing environment- and endpoint-specific rules: identify SMART App Launch for interactive clinician access in a Healthcare Provider hop, and limit SMART Backend Services to its qualifying pre-authorized server-to-server flow. For a qualifying National Interoperability Infrastructure endpoint, identify the IHE IUA Authorization Client, Resource Server, and Authorization Server roles and refer to that environment's IUA recommendation. Make clear that the deployment selects one profile per Resource Server endpoint, rather than requiring IUA and SMART together on one endpoint. The current worktree's HPAS Authorization subsection already makes these distinctions and links to the environment-specific requirements.

#### Justification
This addresses the request to make IUA visible in the HPAS flow without implying it applies to every route. The source describes SMART App Launch as a **SHOULD** where third-party interactive access is offered in Healthcare Provider deployments, and IUA as **RECOMMENDED** for qualifying preconfigured National Interoperability Infrastructure endpoints. It follows the use case's statement that national infrastructure is one possible route, and does not create a universal IUA mandate or dual conformance on one endpoint.

### Disposition C: Decline
#### Proposal
Decline the requested IUA addition to the HPAS use-case authorization text, retaining the general environment-specific authorization guidance but removing the HPAS-specific mapping of National Interoperability Infrastructure hops to IUA actors.

#### Justification
Declining avoids repeating protocol roles in a use-case page and leaves the general Authorization page as the sole place describing IUA. The trade-off is that readers following the HPAS workflow's national-infrastructure route would have less direct guidance about which protocol-specific actors apply at that API boundary.

### Recommendation
**Recommended disposition:** B

Adopt the environment-conditioned alternative. It meets the ticket's intent by explicitly naming IUA actors for qualifying National Interoperability Infrastructure hops while preserving SMART for applicable Healthcare Provider flows and avoiding dual-profile requirements on one endpoint. This recommendation is supported by the current local source at commit `1638e75b81a8c43126ab44eb2f3bba92b15190b2`; PR #99 remains Open at head `c0e4af73c30331136bf3df722e988cfd3cc48d38` and does not yet include the latest HPAS clarification. The ticket remains formally unresolved. Treat PR inclusion and formal Jira disposition as outstanding.

## Next Steps
- Confirm with the workgroup that the environment-conditioned mapping reflects the intended HPAS flows, distinguishing the HPAS service from each downstream protected API boundary.
- Confirm that the two local commits ahead of PR #99, including the latest HPAS-flow clarification, are intended to be pushed/included before describing the PR as carrying this exact change.
- Record any workgroup decision about deployment classification or whether a particular flow crosses into the National Interoperability Infrastructure; do not infer it from the phrase "through national infrastructure" alone.
- Update the formal Jira status only through the normal workgroup process; current source and PR state do not change the ticket's Waiting for Input / Unresolved status.

## Verification Checklist
- [x] Ticket metadata, description, status, and available implementation evidence reviewed.
- [x] Dated branch snapshot identifies the branch and commit, links local authorization/use-case/actor sources, and distinguishes local branch changes from PR contents and ticket-linked evidence.
- [x] Upstream current-build references are explicitly labeled published context only; the ballot-era section mapping is explained.
- [x] Dispositions A, B, and C are specific and distinct.
- [x] Recommendation is explicit and justified against the ticket and current environment-specific requirements.
- [x] HPAS source links to environment-specific requirements and does not impose a universal IUA requirement or dual conformance.