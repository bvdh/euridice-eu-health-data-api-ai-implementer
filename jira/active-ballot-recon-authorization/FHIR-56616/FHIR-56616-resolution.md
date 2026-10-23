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

**Ticket-linked implementation evidence:** The supplied ticket file contains no comments, PR links, commit hashes, or related implementation links. The authorization branch has an open, branch-wide implementation PR (#99), but neither the ticket file nor the PR body explicitly links FHIR-56616. Local commit `06f6360` contains the CORS removal but is not in the live PR head. These are implementation evidence only, not evidence that Jira has formally applied or resolved the ticket.

## Ballot Branch Source Evidence
**Logical branch:** `ballot-recon-authorization` (`eu-health-data-api-ballot-recon-auth`)

**Inspected source snapshot:** `06f63608d7f01f5e96dc33835308f0567755f24b`, dated 2026-10-22. This is the authorization-fork HEAD and includes commit `06f6360` removing the IG-authored CORS requirements. The worktree has unrelated modifications in `FHIR-eu-health-data-api.xml`, `input/includes/auth-todo.md`, and `input/includes/proposed-ticket-resolutions.md`, and untracked local memory documentation; these are outside this ticket's authorization source changes.

- [Authorization source](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/authorization.md) selects one authorization profile per concrete endpoint, does not claim same-endpoint IUA/SMART dual support, and treats SMART Backend Services as a separate pre-authorized server-to-server flow. It now states that IUA MHD transaction scopes apply only to supported ITI-65 through ITI-68 transactions whose MHD actors are grouped with IUA. It states that core IUA defines no API-specific scope vocabulary. The former IG-authored browser-IUA CORS requirement and SMART CORS narrative have been removed.
- [Actors page source](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/actors.md) distinguishes the generic Health Data API Authorization Client from protocol-specific roles. Composite clients select the IUA Authorization Client, SMART App, or SMART Backend Service according to environment and use case; the Authorization Server remains an independent participant. Provider actors use the selected IUA or SMART resource-server role.
- [ActorDefinition source](../../../eu-health-data-api-ballot-recon-auth/input/fsh/Actors.fsh) defines a protocol-neutral Health Data API Authorization Client that expressly does not claim IUA or SMART conformance, and a separate IHE IUA Authorization Client whose description says it implements applicable IUA transactions. SMART App, SMART Backend Service, and SMART server actors are separate. There is no separate browser-IUA ActorDefinition; the IG-authored browser CORS SHALL that prompted this concern has been removed.
- A separate source consistency issue remains: `actors.md` lists SMART App as a Document Publisher option, while the FSH Document Publisher description names the IUA Authorization Client or SMART Backend Service and omits SMART App. This is not evidence of additional requirements imposed on the IUA Authorization Client and is outside the specific actor concern.

**PR state verified 2026-10-22 with `gh`:** [PR #99 — Eu health data api ballot recon authorization](https://github.com/euridice-org/eu-health-data-api/pull/99) remains **Open**, not merged or closed. Its head remains `c0e4af73c30331136bf3df722e988cfd3cc48d38`. Local HEAD is three commits ahead of that PR head, including `06f6360` (the CORS-removal commit); therefore the CORS removal is present in the local branch but is **not yet in the live PR**. The PR body describes authorization-related IG changes generally and does not name FHIR-56616. PR comments were checked; none provides a ticket-specific resolution or links FHIR-56616. The PR head is an ancestor of the current local HEAD. Do not represent PR #99 as containing the latest CORS-removal commit or as formal Jira resolution evidence.
`gh pr checks 99` reported no checks for the branch at verification time.

## Current Build References
- [Authorization — IHE IUA](https://build.fhir.org/ig/euridice-org/eu-health-data-api/branches/eu-health-data-api-ballot-recon-auth/en/authorization.html#ihe-iua) — PR-branch build preview; relevant to the IUA actor, applicable transactions, and distinction between core IUA and IG integration.
- [Authorization — Environment-Specific Requirements](https://build.fhir.org/ig/euridice-org/eu-health-data-api/branches/eu-health-data-api-ballot-recon-auth/en/authorization.html#environment-specific-requirements) — PR-branch build preview; relevant to the selection of one profile per endpoint and conditional IUA/MHD transaction-scope integration. This live preview follows PR #99's older head and does not show the unpushed CORS-removal commit.
- [Actors — Authentication And Authorization Groupings](https://build.fhir.org/ig/euridice-org/eu-health-data-api/branches/eu-health-data-api-ballot-recon-auth/en/actors.html#authentication-and-authorization-groupings) — PR-branch build preview; relevant to the generic client role and protocol-specific actor groupings.

The preview is tied to the open PR branch and does not include the three local commits after its head. The disposition analysis is based on the dated local source snapshot and verified PR state, not on a claim that this preview is merged or reflects the latest local source. The local IG build completed on 2026-10-22 with SUSHI 0 errors/0 warnings and Publisher QA 0 errors/12 warnings/45 info/0 broken links; HTML validation reported 2,314 pages, 0 invalid XHTML pages, and 64,219 links with 0 broken links. The Publisher emitted a nonfatal combined-package diagnostic and duplicate-artifact-name warning, then completed the final ZIP and QA generation.

## Related Tickets
No related ticket keys are provided in the source ticket.

## Disposition Analysis
The ticket remains **Pending**: Jira is Waiting for Input and Unresolved, and the supplied ticket record has no comments or direct PR/commit link. PR #99 is open and contains earlier authorization/actor changes, but it does not include local commit `06f6360`; neither the PR nor the local commit establishes formal Jira resolution.

The current source distinguishes the generic Health Data API Authorization Client from the IHE IUA Authorization Client and separate SMART actors. SMART Backend Services requirements are assigned to their separate role and flow, not to the IUA role. The only identified IG-authored browser-IUA CORS SHALL has now been removed. Remaining IUA MHD transaction-scope guidance is conditional on supported MHD transactions and grouped actors; it is integration-specific, not a blanket change to the IHE IUA Authorization Client definition. The source therefore no longer identifies a browser-specific extra conformance obligation that would require a new actor.

The most supportable workgroup response is to accept the concern with a modification: remove the extra IG-authored browser CORS requirement and retain the generic Health Data API role separately from the standard IHE IUA Authorization Client. The ticket does not identify another specific requirement that exceeds the IUA actor definition. If the workgroup identifies one, it should assess that requirement independently and define a distinct actor only if it is genuinely actor-level. The broader open PR and local source commit are implementation evidence only; FHIR-56616 remains unresolved in Jira.

## Proposed Dispositions
### Disposition A: Accept As Requested
#### Proposal
Define an IG-specific IUA Authorization Client actor based on the IHE role, with explicit conditional obligations for the IUA/MHD integration, and group that actor with the applicable publisher/consumer roles. Keep SMART Backend Services separate.

#### Justification
This is the direct response if the workgroup concludes the conditional MHD scope requirements constitute extra actor-level constraints beyond the standard IUA Authorization Client definition. It would make that scope of conformance explicit, but risks creating a new actor for conditions already defined by the IUA/MHD integration. It is not recommended absent an identified remaining actor-level requirement after CORS removal.

### Disposition B: Alternative Approach
#### Proposal
Remove the IG-authored browser-IUA CORS requirement rather than creating a new IUA-derived actor solely to carry it. Retain the generic Health Data API Authorization Client separately from the standard IHE IUA Authorization Client and SMART actors. Keep IUA MHD transaction scopes conditional on supported transactions whose MHD actors are grouped with IUA. Define an additional actor only if the workgroup identifies a distinct, remaining actor-level obligation beyond the applicable IUA and integration requirements.

#### Justification
This matches the current source after the CORS removal: the generic role is distinct from protocol roles, SMART Backend Services remains separate, and MHD transaction scopes apply only to corresponding supported integrations. It addresses the identified source of ambiguity without creating an actor that has no remaining, defined extra conformance scope. Option A remains available if the workgroup identifies another specific actor-level obligation.

### Disposition C: Decline
#### Proposal
Make no further actor-model or explanatory change. Retain the current actor definitions and authorization text without adopting the proposed explanatory resolution of the ticket concern.

#### Justification
The current source separates the generic client, IHE IUA client, and SMART roles, and the identified browser-IUA CORS SHALL has been removed. Declining would avoid further change, but would not record why that additional requirement was removed in response to the concern or provide the workgroup an explicit disposition for the conditional request.

### Recommendation
**Recommended disposition:** B

The current local source supports B because it removes the identified IG-authored browser CORS SHALL, keeps the generic API client distinct from the IHE IUA actor, and limits MHD transaction scopes to supported grouped MHD/IUA transactions. This resolves the identified ambiguity without inventing a new actor whose remaining conformance scope is unspecified. A should be selected if the workgroup identifies another concrete actor-level requirement beyond the applicable IUA and integration rules; C would leave the ticket's concern without an explicit explanation. This recommendation is based on local source snapshot `06f6360` and the verified open PR state; the PR head predates the CORS-removal commit, and Jira remains unresolved.

## Next Steps
- Workgroup to confirm the modified resolution: remove the identified IG-authored browser CORS obligation and retain the standard IHE IUA actor with conditional MHD integration scope guidance.
- If the workgroup identifies another specific actor-level constraint beyond applicable IUA and integration requirements, assess it independently and define a distinct actor only if needed to express that additional conformance target.
- Reconcile the Document Publisher actor options between `actors.md` and `Actors.fsh`.
- Push/refresh PR #99 with local commit `06f6360` if that is intended to be included in the authorization PR; do not treat the current PR head as containing the CORS removal.
- Record relevant PR/commit evidence in the Jira ticket if the workgroup accepts the implementation; do not treat the open PR or local commit as formal Jira resolution.

## Verification Checklist
- [x] Ticket metadata, description, and all available ticket content reviewed; no comments or implementation links are present in the supplied file.
- [x] Relevant source files, current source revision, local source status, and PR head relationship are recorded; the CORS-removal commit is explicitly identified as local-only relative to PR #99.
- [x] Current PR state and checks were verified with `gh`; the open PR is not represented as merged or ticket-linked.
- [x] Current-build references are included and distinguished from ballot-branch evidence.
- [x] Source distinguishes the generic client, IUA actor, and SMART actors; conditional MHD transaction integration is separately identified.
- [x] The identified IG-authored browser-IUA CORS requirement is verified removed from current input source.
- [x] Jira remains Waiting for Input and Unresolved; local implementation and PR status are not represented as a formal ticket resolution.
- [x] The remaining Document Publisher actor-description mismatch is recorded.
- [x] Dispositions A/B/C are concrete and meaningfully distinct.
- [x] Recommendation is explicit and justified against the alternatives.