# Proposed Resolution for [FHIR-56616](https://jira.hl7.org/browse/FHIR-56616)

## Ticket Summary
| Field | Value |
|-------|-------|
| Key | [FHIR-56616](https://jira.hl7.org/browse/FHIR-56616) |
| Issue Type | Change Request |
| Summary | Revise the IUA Authorization Client actor |
| Status | Waiting for Input |
| Resolution | Unresolved |
| Priority | Medium |
| Specification | EU Health Data API (R4) (FHIR) |
| Raised in Version | 1.0.0-ballot |
| Work Group | HL7 Europe |
| Reporter | [Giorgio Cangioli](https://jira.hl7.org/secure/ViewProfile.jspa?name=giorgio) |
| Assignee | [Bas van den Heuvel](https://jira.hl7.org/secure/ViewProfile.jspa?name=bvdh) |
| Created | 2026-04-29 |
| Updated | 2026-06-10 |
| Parent key | Not provided |
| Grouping | Not provided |
| Related Page(s) | Authorization |
| Related Artifacts | Not provided |

## Description
The ticket says that the guide appears to add requirements to the actor labeled IHE IUA Authorization Client and asks whether that constrained actor remains conformant to the standard IUA definition. It requests a distinct actor if requirements beyond the IUA definition are imposed, to make conformance unambiguous.

## Implementation Status
**Ticket state:** Waiting for Input; resolution is Unresolved.

**Ticket-linked implementation evidence:** The supplied ticket file contains no comments, PR links, commit hashes, or related implementation links. The snapshot commit recorded below identifies the source inspected for this proposal; it is not evidence that a ticket-linked implementation or deployment exists.

## Ballot Branch Source Evidence
**Logical branch:** `ballot-recon-authorization` (`eu-health-data-api-ballot-recon-auth`)

**Inspected source snapshot:** `019276d397944036d1e502a2acddb3d5e56e158c`, dated 2026-10-08; the ballot worktree was clean.

- [Authorization source](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/authorization.md) selects IUA or SMART by environment and use case. It states that SMART Backend Services requirements apply to that separate pre-authorized server-to-server flow; the IUA section instead points to applicable IUA requirements and separates core IUA from MHD integration and additional recommendations. Browser-based IUA deployments have an explicit IG CORS-policy requirement, and applicable IUA transaction scopes are conditional on supported transactions. These are scoped IG/deployment requirements, not SMART Backend Services requirements imposed on the IUA role.
- [Actors page source](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/actors.md) groups Document Publisher, Document Consumer, and Resource Consumer with the selected IUA Authorization Client, SMART App, or SMART Backend Service. Provider actors use the selected IUA or SMART resource-server role; the Authorization Server is independent.
- [ActorDefinition source](../../../eu-health-data-api-ballot-recon-auth/input/fsh/Actors.fsh) defines separate IUA Authorization Client, Authorization Server, and Resource Server actors; separate SMART App and SMART Backend Service actors; generic EU authorization roles that do not themselves claim either protocol; and the Document Publisher, Document Access Provider, Document Consumer, Grouped Document Publisher/Access Provider, Resource Access Provider, and Resource Consumer composites. It does not define a SMART-constrained IUA Authorization Client ActorDefinition. The separately defined SMART Backend Service is not an IUA profile. One narrow grouping difference remains: `actors.md` lists SMART App as a Document Publisher option, while the FSH Document Publisher description names the IUA Authorization Client or SMART Backend Service but omits SMART App; this does not establish a SMART overlay on IUA.

The public current-build pages cited in earlier drafts are publication context only. They are not used as evidence for this commit-pinned ballot snapshot.

## Related Tickets
No related ticket keys are provided in the source ticket.

## Disposition Analysis
The ticket is **Pending** because it remains Waiting for Input and Unresolved, with no ticket comments or linked implementation evidence.

The commit-pinned ballot source does **not** impose SMART Backend Services requirements on the IUA Authorization Client. It selects protocol roles by environment/use case, defines the IUA and SMART roles separately, and gives SMART Backend Services its own actor and flow. The ticket's premise is therefore **not confirmed on the basis used in the prior resolution**.

The source does contain IG-level conditions associated with IUA deployments, including CORS policy for browser-based IUA clients and transaction-specific MHD scopes. The inspected files do not establish that these conditions redefine the IUA Authorization Client beyond its standard role; they are described as deployment/integration requirements or as separate from core IUA. A workgroup decision should identify any exact requirement alleged to exceed IUA before applying the ticket's conditional SHALL. No ticket-linked PR or commit evidence is recorded, and the Jira item remains unresolved.

## Proposed Dispositions
### Disposition A: Accept As Requested
#### Proposal
Define a distinct EU IG-profiled IUA Authorization Client actor only if the workgroup identifies normative requirements that exceed the IUA Authorization Client role and apply to that client as an actor. Name those requirements and distinguish them from environment-specific SMART flows, browser CORS policy, and MHD transaction integration. Do not characterize this as a SMART Backend Services profile.

#### Justification
This satisfies the ticket's conditional SHALL if additional actor-level IUA constraints are demonstrated. The current source does not establish that condition from SMART Backend Services; adding an actor without identifying the specific extra IUA requirements risks encoding a distinction the source does not make.

### Disposition B: Alternative Approach
#### Proposal
Do not add another IUA client ActorDefinition on the evidence currently available. Preserve the separate IUA and SMART actor definitions and clarify that selected SMART Backend Services requirements do not apply to IUA mode. Identify deployment-scoped IUA-related requirements (including browser CORS and applicable transaction integration) as such, and state that any proposal to create a constrained IUA actor must cite the specific requirement that exceeds the IUA role.

#### Justification
This matches the ballot source's separation of IUA and SMART roles and resolves the apparent SMART conflation with a precise scope statement. It avoids an unsupported new actor while leaving the workgroup able to adopt A if it identifies a concrete IUA-specific overconstraint.

### Disposition C: Decline
#### Proposal
Make no actor-model or explanatory change. Retain the ballot source's current separation of IUA and SMART roles and its environment-specific selection of authorization flows.

#### Justification
The branch already defines a distinct IUA Authorization Client and separate SMART actors, and does not apply SMART Backend Services requirements to IUA mode. Declining may be reasonable if the workgroup finds the existing scope distinctions sufficient, but it leaves the ticket's concern about possible additional IUA constraints without an explicit determination.

### Recommendation
**Recommended disposition:** B

The ballot snapshot does not support the former rationale for A: SMART Backend Services is a separate role and selected flow, not an override of the IUA Authorization Client. B best fits the evidence by retaining distinct IUA and SMART actors while requiring any claimed IUA overconstraint to be named and assessed. A remains appropriate only if the workgroup identifies a normative IUA-client requirement beyond the standard role; C is less useful because it would leave that question unexamined. This recommendation is based on the cited authoring snapshot, not on public current-build pages or ticket-linked implementation evidence.

## Next Steps
- Workgroup to identify the exact normative provision alleged to exceed the standard IUA Authorization Client role and determine whether it constrains the actor or only a selected deployment/transaction.
- If such an actor-level IUA constraint is confirmed, adopt A and define the distinct actor with that bounded conformance scope; do not use SMART Backend Services requirements as its rationale.
- Record any implementing PR or commit in the Jira ticket before classifying this item as implemented; the inspected ballot snapshot commit is source-baseline identification only.

## Verification Checklist
- [x] Ticket metadata, description, and all available ticket content reviewed; no comments or implementation links are present in the supplied file.
- [x] Only the three named files in the ballot worktree were inspected as specification source.
- [x] Commit, snapshot date, clean worktree, and local links to the inspected branch sources are recorded.
- [x] Ballot source separates IUA roles from SMART Backend Services and identifies the actual generic and composite actor groupings.
- [x] Snapshot commit is distinguished from ticket-linked implementation evidence; Jira remains Waiting for Input and Unresolved.
- [x] Public current-build pages are treated as publication context only, not evidence for the ballot snapshot.
- [x] Deployment-scoped IUA-related conditions are distinguished from SMART Backend Services requirements.
- [x] Dispositions A/B/C are concrete and meaningfully distinct.
- [x] Recommendation is explicit and justified against the alternatives.