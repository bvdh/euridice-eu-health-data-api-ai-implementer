# Proposed Resolution for [FHIR-56660](https://jira.hl7.org/browse/FHIR-56660)

## Ticket Summary
| Field | Value |
|-------|-------|
| Key | [FHIR-56660](https://jira.hl7.org/browse/FHIR-56660) |
| Issue Type | Change Request |
| Status | Triaged |
| Resolution | Unresolved |
| Reporter | [JoshPriebe](https://jira.hl7.org/secure/ViewProfile.jspa?name=jpriebe%40epic.com) (reported on behalf of Epic; description names Isaac Vetter) |
| Assignee | Unassigned |
| Created | 2026-04-29 |
| Grouping | Not provided |

## Description
The ticket says the Health Data Access Service (HDAS) use case describes a broker model in which the patient authenticates to the service and the service accesses provider systems. It asks the IG to acknowledge direct patient authentication to an EHR using SMART/IPA as a deployed alternative, without replacing the broker model, and to note implications for patient consent preferences. It also asks for the Health Professional Access Service (HPAS) page to be updated where applicable.

The claim that this is the production model today, and that providers typically enforce consent preferences by avoiding system-to-system authorization, is reported in the ticket; the local branch sources do not independently establish either generalization.

## Implementation Status
**Current ticket disposition: Pending.** Jira lists the issue as `Triaged` with `Resolution: Unresolved`. The local ticket record contains no ticket-specific PR, commit, or implementation comment.

**Current PR state (checked 2026-10-22):** [PR #99 — Eu health data api ballot recon authorization](https://github.com/euridice-org/eu-health-data-api/pull/99) is **Open** with GitHub merge state `DIRTY`. Its head is `c0e4af73c30331136bf3df722e988cfd3cc48d38` on `eu-health-data-api-ballot-recon-auth`. The PR body describes authorization-ticket changes generally and does not identify FHIR-56660. The PR does make shared authorization changes: it distinguishes the generic Health Data API Authorization Client from protocol-specific IHE IUA and SMART actors, and selects the applicable protocol profile for an endpoint. Its authorization overview also says IUA supports direct access and access through intermediaries. In that context, “direct access” describes an IUA authorization/access mode; it does not specify the direct patient-to-EHR portal login and existing-record retrieval architecture requested by FHIR-56660. The local branch is two commits ahead of that PR head; its current HEAD is `1638e75b81a8c43126ab44eb2f3bba92b15190b2` (2026-10-21). The PR therefore does not contain the current local source snapshot.

**Current local source snapshot:** The relevant page sources at local HEAD are unchanged in the worktree; unrelated local modifications remain in `input/includes/auth-todo.md` and `input/includes/proposed-ticket-resolutions.md`. The commit identifies the inspected source snapshot, not ticket-specific implementation evidence.

**Exact requested pattern: not explicitly implemented in either the current PR or local branch.** At the PR head, the HDAS page describes patient authentication and consent at the access service, with SMART App Launch where a patient or clinician must authorize an EHR-facing request at runtime. The current local page expands the environment-specific roles and flows but retains that access-service model. Neither snapshot explicitly presents a patient's direct login to a provider EHR as an alternative for retrieving existing clinical data. The PR's protocol actor clarifications, endpoint profile selection, and IUA “direct access” wording address authorization roles and access modes, not the patient-facing architecture or comparative consent implications in this ticket. The HPAS page remains about professional authentication and clinician access. SMART Patient Access and the patient-launched Wellness flow are relevant adjacent patterns, but the latter concerns a wellness application and patient-provided data rather than this direct retrieval pattern.

Related content is not the same pattern:
- The Wellness authorization requirements include patient-launched SMART Patient Access with the EHR as FHIR server, but the stated purpose is uploading information to the EHR. The Wellness use case also names a direct EHR wellness integration, where a wellness application exchanges data under a deployment-accepted authorization model. Neither explicitly describes a patient's direct login to an EHR portal to retrieve existing clinical records as the HDAS alternative.
- The generic SMART Patient Access capability sets and the IG's IPA-aligned resource-access patterns do not by themselves establish that this specific HDAS architecture is implemented.
- The HPAS page describes professional authentication and interactive clinician authorization, not patient direct-to-EHR access. No patient-flow change to HPAS is evidenced as applicable.

The branch therefore supports a candidate informative alternative, not a claim that this exact HDAS flow is already specified. The PR's shared authorization clarifications are relevant context but do not implement FHIR-56660: “direct access” in the IUA discussion must not be conflated with a patient's direct EHR login, and protocol selection does not describe the requested alternative architecture. If acknowledged, the text should keep consent separate from authentication and token issuance: an interactive SMART flow or access token does not itself establish consent or determine who enforces patient preferences. The applicable EHR/Authorization Server and Member State or access-service policy boundary must be stated without asserting that avoiding Backend Services necessarily guarantees consent enforcement.

## Related Tickets
No related ticket keys are recorded in the local FHIR-56660 ticket. The branch's Wellness and SMART Patient Access material is discussed above as adjacent specification context, not as ticket-linked implementation evidence.

## Current Build References
- [Health Data Access Service](https://hl7.eu/fhir/health-data-api/current-build/en/usecase-health-data-portal.html) — relevant page; published rendering is context only and is not evidence of the inspected local branch.
- [Health Professional Access Service](https://hl7.eu/fhir/health-data-api/current-build/en/usecase-health-professional-portal.html) — secondary page named by the ticket; published rendering is context only.
- [Wellness Applications authorization](https://hl7.eu/fhir/health-data-api/current-build/en/authorization.html#wellness-applications) and [Wellness App use case](https://hl7.eu/fhir/health-data-api/current-build/en/usecase-wellness-app.html) — adjacent patient-launch/direct-wellness material; published renderings are context only.

**Local branch mapping and evidence** (source links below refer to local HEAD `1638e75b81a8c43126ab44eb2f3bba92b15190b2`, dated 2026-10-21; the PR source is at `c0e4af73c30331136bf3df722e988cfd3cc48d38`):
- [HDAS use case source](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/usecase-health-data-portal.md) — defines the broker workflow, access-service consent responsibility, and environment-specific EHR-facing authorization.
- [HPAS use case source](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/usecase-health-professional-portal.md) — describes clinician authentication and clinician/API authorization; it does not define the requested patient direct-login pattern.
- [Authorization source](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/authorization.md) — specifies environment selection and SMART patient/clinician flows, and states that token validity does not itself establish consent or access entitlement.
- [Wellness App source](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/usecase-wellness-app.md) — describes the EHR-backed patient-launched upload pattern and direct wellness integration, which are adjacent but not equivalent to direct patient retrieval of existing EHR data.
- [Actors source](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/actors.md) and [Resource Access source](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/resource-access.md) — establish generic selected authorization-client/resource-server roles and IPA-aligned resource access, not a particular patient-to-EHR login deployment.

**Mapping note:** The ticket's supplied 1.0.0-ballot URL maps to the HDAS page. Neither the open PR head nor current local HEAD has a dedicated section for the requested direct patient-to-EHR retrieval pattern. Both describe interactive patient SMART access at an API boundary, but not the direct EHR-login architecture the ticket asks to acknowledge. Wellness patient launch is adjacent but concerns a wellness application and patient-provided data; it must not be cited as implementation of the distinct retrieval pattern. Published pages above are navigation/context references only.

## Disposition Analysis
The requested acknowledgement is compatible with retaining the broker model, but the exact direct patient-to-EHR retrieval flow is not explicit in either the open PR or current local branch. Both contain interactive SMART Patient Access context; local HEAD further clarifies environment-specific roles and flows. Neither describes direct EHR login as an alternative HDAS architecture or implements the requested comparative consent note. The sources assign consent preferences to access-service or Member State policy and state that token validity alone does not establish consent or entitlement. They do not support a blanket claim that direct EHR login is universally deployed or that system-to-system authorization is incompatible with consent enforcement. The workgroup may accept an informative acknowledgement, but the ticket is not yet supported as pre-applied work.

## Proposed Dispositions
### Disposition A: Accept As Requested
#### Proposal
Add an informative paragraph to the HDAS page acknowledging direct patient-to-provider-EHR SMART Patient Access as a possible Member State deployment alongside the broker model. Identify it as a candidate alternative, distinguish it from the currently described broker workflow, and state that patient authentication, authorization, consent capture, consent enforcement, and API token issuance are distinct responsibilities. Retain all existing normative flow selection. Update the HPAS page only if the workgroup identifies a concrete patient-facing HPAS applicability; otherwise leave it unchanged.
#### Justification
This meets the ticket's acknowledgement goal while preserving the IG's architecture-neutral scope and existing environment-specific requirements. The branch's SMART Patient Access and IPA-aligned resource-access content provide relevant standards context, but the ticket's production claim remains ticket-reported rather than independently verified by this branch. Consent wording must not imply that direct login guarantees consent enforcement or that Backend Services inherently bypasses it.

### Disposition B: Alternative Approach
#### Proposal
Do not add a separate direct-login workflow to the HDAS page in this ballot. Instead, clarify that the page describes the broker pattern and cross-reference the existing Wellness patient-launch material as an adjacent SMART Patient Access example, explicitly noting that it concerns uploading patient-provided data and does not define direct retrieval of existing EHR records. Revisit a distinct HDAS alternative when deployment evidence and the consent-policy boundary are available.
#### Justification
This avoids duplicating or overstating the existing Wellness requirements while the precise direct retrieval flow and evidence remain unspecified. It provides navigation to related SMART Patient Access content but only partially satisfies the requested acknowledgement.

### Disposition C: Decline
#### Proposal
Make no change. Retain the HDAS broker description and leave direct patient-to-EHR authentication outside this IG.
#### Justification
The HDAS service's internal identity, consent, and routing requirements are outside the IG's API scope, and the branch does not define the requested flow. However, declining leaves the ticket's clarity concern unaddressed despite the possibility of a carefully bounded informative note.

### Recommendation
**Recommended disposition:** A

Accept the acknowledgement with the qualifications in Disposition A. This best matches the ticket's explicit goal of recognizing alternative Member State architectures without preferring one or replacing the broker model. Keep the note informative and non-normative: current branch evidence establishes adjacent SMART patient-launch and Wellness patterns, not the exact direct patient-to-EHR retrieval flow or the ticket's production generalization. State that consent policy/enforcement remains deployment-specific and is not proven by authentication method or token type. Do not alter the normative authorization workflow without workgroup approval.

## Next Steps
- Confirm with the workgroup whether it wants the direct patient-to-EHR retrieval pattern acknowledged as an informative Member State option and whether the ticket's production claim can be supported with deployment evidence.
- If accepted, add a concise informative HDAS note that describes the candidate pattern and consent boundary while preserving the broker workflow and all authorization requirements. Do not change the normative authorization selection without explicit approval.
- Decide whether HPAS has any applicable patient-facing direct-auth scenario; the current HPAS use case concerns health-professional access, so no parallel edit is presently supported.
- Keep the ticket `Triaged` / `Unresolved` until the workgroup disposition is recorded and any agreed change is evidenced.

## Verification Checklist
- [x] Ticket metadata, description, and local comments/evidence reviewed; no ticket-specific PR or commit evidence is recorded, and PR #99 is not identified as implementing this ticket.
- [x] PR #99 state and head verified with `gh`; its open head is distinguished from the newer local branch HEAD.
- [x] Local branch sources inspected at current HEAD; the interactive SMART material is distinguished from the requested direct EHR-login retrieval pattern.
- [x] Current build references included and clearly labeled as published context only.
- [x] Mapping gap stated; generic SMART Patient Access and Wellness upload are not misidentified as the exact HDAS retrieval pattern.
- [x] Dispositions A/B/C are concrete and distinct.
- [x] Recommendation is explicit, justified, and preserves the normative workflow pending approval.