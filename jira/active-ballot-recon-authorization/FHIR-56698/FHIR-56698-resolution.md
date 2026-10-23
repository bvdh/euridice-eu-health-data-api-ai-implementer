# Proposed Resolution for [FHIR-56698](https://jira.hl7.org/browse/FHIR-56698)

## Ticket Summary
| Field | Value |
|-------|-------|
| Key | [FHIR-56698](https://jira.hl7.org/browse/FHIR-56698) |
| Issue Type | Change Request |
| Status | Waiting for Input |
| Resolution | Unresolved |
| Reporter | [RaikKuhlisch](https://jira.hl7.org/secure/ViewProfile.jspa?name=raik.kuhlisch%40gematik.de) |
| Assignee | [Bas van den Heuvel](https://jira.hl7.org/secure/ViewProfile.jspa?name=bvdh) |
| Created | 2026-04-30 |
| Grouping | Not specified in the local ticket record |

## Description
The ticket asks why SMART Backend Services is adopted for authorization and why it is bound to an IUA Authorization Server. It also questions SMART resource-based scopes, proposing that national infrastructure regulatory groupings may be coarser-grained. Its suggested resolution is to reference general OAuth specifications such as RFC 6749 and RFC 8414.

The local ticket record contains no comment history or PR link. It identifies the Authorization page as the related page and records the ticket as Waiting for Input / Unresolved.

## Implementation Status
The current authorization source in the specified `eu-health-data-api-ballot-recon-auth` worktree contains clarifications distinguishing SMART App Launch, SMART Backend Services, and IHE IUA, with conditional recommendations for national system-to-system endpoints and distinct scope models.

PR [#99 — Eu health data api ballot recon authorization](https://github.com/euridice-org/eu-health-data-api/pull/99) is **OPEN**, targeting `main`; it has not been merged. GitHub reports head `c0e4af73c30331136bf3df722e988cfd3cc48d38` as of 2026-10-22. The `input/pagecontent/authorization.md` blob at the local worktree HEAD matches the tracked branch/PR-head version. The worktree has two commits ahead of its remote branch, but neither changes this authorization page. No PR was found that mentions FHIR-56698; PR #99 is linked here because it is the current PR for the explicitly specified implementation branch, not because the ticket record links it.

The current source recommends IHE IUA for preconfigured national system-to-system endpoints where national policy requires IUA transaction integration or its JWT Token Option. It permits SMART Backend Services instead when all applicability conditions are met, and selects one profile per Resource Server endpoint. Interactive Wellness Application access uses SMART App Launch. IUA MHD transaction scopes apply only to supported ITI-65 through ITI-68 transactions with the relevant grouped actors; SMART endpoints use applicable SMART FHIR resource scopes. The source does not replace SMART scopes with a nationally defined coarse-grained scope vocabulary, nor does it reduce the authorization model to generic OAuth RFC references.

## Related Tickets
No related ticket is identified in the local ticket record.

## Current Build References
- [Authorization — IHE IUA and SMART App Launch](https://hl7.eu/fhir/health-data-api/current-build/en/authorization.html#ihe-iua-and-smart-app-launch) — compares the protocols, their respective scopes, and the per-endpoint profile approach.
- [Authorization — National Interoperability Infrastructure](https://hl7.eu/fhir/health-data-api/current-build/en/authorization.html#national-interoperability-infrastructure) — contains the conditional IUA recommendation, SMART Backend Services alternative, and applicable scope guidance.

## Disposition Analysis
**Current state:** Pending. The Jira record remains Waiting for Input / Unresolved. Although the implementation branch contains relevant authorization changes, PR #99 is open and the Jira record does not establish formal acceptance.

The changes address the request for a clearer rationale by distinguishing where SMART and IUA fit, and they narrow the IUA recommendation to certain preconfigured system-to-system endpoints. They also clarify that the IUA binding is not a blanket requirement and that SMART resource scopes and IUA MHD transaction scopes apply to different endpoint profiles. However, the ticket's preference for regulatory groupings instead of SMART resource scopes is not adopted as a general replacement, and its proposal to rely on generic OAuth references is not the approach taken. Disposition should therefore distinguish the useful clarification from those unadopted elements.

## Proposed Dispositions
### Disposition A: Accept As Requested
#### Proposal
Accept the ticket as written, replacing the SMART Backend Services/IUA approach with general OAuth references and using nationally defined, coarser-grained regulatory scope groupings in place of SMART resource scopes.
#### Justification
This would align with the ticket's proposed resolution and its concern that SMART resource scopes may be too granular for some national infrastructures. The current source, however, does not implement this model or define a national scope vocabulary, so accepting it as written would not accurately describe the branch changes and would require additional design and implementation work.

### Disposition B: Alternative Approach
#### Proposal
Retain the protocol-specific authorization guidance, while clarifying its rationale and limits: recommend IUA only for preconfigured system-to-system endpoints where national policy requires its transaction integration or JWT Token Option; allow SMART Backend Services where its applicability conditions are met; require SMART App Launch for the specified interactive Wellness Application access; and apply the relevant protocol-specific scopes to their corresponding endpoint profiles. Do not make generic OAuth references a substitute for those profiles or define a universal national coarse-grained scope model in this resolution.
#### Justification
This matches the current source and explains that IUA is not required for every national endpoint or bound to every SMART deployment. It separates SMART FHIR resource scopes from the limited IUA/MHD transaction scopes and leaves national access policy to deployment context without inventing a scope vocabulary. It addresses the rationale and binding questions while preserving an explicit boundary: the requested general replacement of SMART scopes is not adopted. PR #99 remains open, so this describes proposed branch content, not merged or formally accepted work.

### Disposition C: Decline
#### Proposal
Decline the requested change and retain the existing authorization guidance without adopting the proposed clarifications.
#### Justification
This avoids making further authorization-profile decisions in the IG. It is less suitable than the alternative because the current branch already contains targeted clarifications that answer the rationale and IUA-binding questions while keeping the scope models distinct.

### Recommendation
**Recommended disposition:** B

Recommend the alternative approach. It reflects the current source and directly addresses the confusion about why SMART Backend Services and IUA appear together while making clear that they are selected per endpoint, not combined on one endpoint. It does not claim that the ticket's preference for coarser regulatory groupings has been implemented. Any future nationally defined scope model would need explicit vocabulary, applicability, and interoperability rules before it could replace the applicable SMART scope requirements. As PR #99 is open, the proposal remains subject to review and workgroup decision.

## Next Steps
- Obtain workgroup input on whether the existing protocol-specific scope treatment is sufficient or whether a separately specified national scope model is desired.
- Confirm the proposed alternative and its boundaries before recording a Jira disposition.
- Recheck PR #99 before treating the branch changes as merged or applied.

## Verification Checklist
- [x] Evidence reviewed from the local ticket record, current source, and GitHub PR state.
- [x] Current build references included for the impacted Authorization sections.
- [x] Dispositions are specific.
- [x] Recommendation is justified and distinguishes current source coverage from formal Jira status.
