# Proposed Resolution for [FHIR-56705](https://jira.hl7.org/browse/FHIR-56705)

## Ticket Summary
| Field | Value |
|-------|-------|
| Key | [FHIR-56705](https://jira.hl7.org/browse/FHIR-56705) |
| Issue Type | Change Request |
| Status | Waiting for Input |
| Resolution | Unresolved |
| Reporter | Giorgio Cangioli |
| Assignee | Bas van den Heuvel |
| Created | 2026-04-30 |
| Grouping | Not recorded in the local ticket file |

## Description
The ticket asks to revise Section 4.1.5.2, Step 2, because its SMART Backend Services token-request example could be read as mandatory. It proposes saying that SMART Backend Services is one possible token mechanism and that other authorization approaches may be supported if they comply with the guide and applicable regulations.

The local ticket record does not contain a comments section, PR link, or additional implementation evidence. Its recorded status is Waiting for Input and its resolution is Unresolved.

## Implementation Status
**Partially addressed in the explicit local authorization worktree; not present in the current PR head and not formally resolved.**

In the local `eu-health-data-api-ballot-recon-auth` worktree, commit `1638e75b81a8c43126ab44eb2f3bba92b15190b2` revises `input/pagecontent/example-patient-summary.md`. It states that the token-request details illustrate SMART Backend Services and that an IUA deployment uses its selected IUA actors and flow. The prerequisites require selecting one applicable profile according to environment-specific requirements, and the note says the example does not define dual conformance. The surrounding Authorization source recommends IUA in specified national-infrastructure circumstances and permits SMART Backend Services when its applicability conditions are met.

The live PR [#99](https://github.com/euridice-org/eu-health-data-api/pull/99) is Open and targets `main`. GitHub reports head `c0e4af73c30331136bf3df722e988cfd3cc48d38`; it has not merged. The local implementation branch is at `1638e75b81a8c43126ab44eb2f3bba92b15190b2`, two commits ahead of its remote tracking branch. At the PR head, the patient-summary example describes SMART Backend Services for Step 2 and does not include the local branch's explicit IUA alternative and endpoint-selection clarifications. Accordingly, this source change is not yet evidenced as part of PR #99.

The Jira snapshot remains Waiting for Input / Unresolved. No PR or commit link is recorded in that ticket file. A local branch change or open PR does not establish formal Jira acceptance.

## Related Tickets
No related ticket is recorded in the local ticket file.

## Current Build References
- [Example Patient Summary — Step 2: Obtain Access Token](https://build.fhir.org/ig/euridice-org/eu-health-data-api/en/example-patient-summary.html#step-2-obtain-access-token) — the section that gives the SMART Backend Services token-request example and is clarified by the local branch source.
- [Authorization](https://build.fhir.org/ig/euridice-org/eu-health-data-api/en/authorization.html) — relevant authorization guidance for comparing the environment-specific recommendations and profile choices.

These continuous-build pages are navigational references only; they do not represent the unpushed local branch source or the current PR head.

## Disposition Analysis
**Current state: Pending.** The Jira snapshot is unresolved, the implementation is in the specified local branch but not in the current PR head, and no formal Jira disposition is recorded. The source change addresses the ambiguity by identifying an IUA alternative and making the example's SMART token request explicit, but it does not adopt the ticket's broad wording that any other authorization approach may be supported. Instead, profile selection remains constrained by this guide's environment-specific requirements and one-profile-per-endpoint approach.

## Proposed Dispositions
### Disposition A: Accept As Requested
#### Proposal
Add the ticket's proposed sentence to the example or authorization guidance, stating that SMART Backend Services is one possible mechanism and that other approaches may be supported when compliant with the guide and applicable regulations.
#### Justification
This directly addresses the concern that readers could mistake the SMART token-request example for a universal requirement. However, the generic wording could be read to permit authorization approaches beyond the profiles and environment-specific choices defined by this guide.

### Disposition B: Alternative Approach
#### Proposal
Accept the request's clarification goal with modification: retain the SMART Backend Services token-request sequence as an example, explicitly identify the applicable IUA flow as an alternative where selected by the environment-specific requirements, and state that one applicable profile is selected for each protected endpoint.
#### Justification
The local branch source makes these distinctions and links to the relevant IUA actors and guidance. This resolves the ambiguity without implying that any authorization mechanism is permitted or that SMART and IUA are dual-conformant on one endpoint. The change is committed locally but remains absent from the live PR #99 head; it should not be described as merged or formally accepted.

### Disposition C: Decline
#### Proposal
Make no change and retain the SMART Backend Services token-request example without further clarification.
#### Justification
The detailed request example is specifically a SMART flow, but leaving it without an explicit alternative may continue to invite the interpretation identified by the ticket.

### Recommendation
**Recommended disposition:** B

Recommend the alternative approach, corresponding to **Persuasive with Modification** in the workgroup disposition vocabulary. The underlying concern is supported: the SMART request sequence should be distinguished from the complete set of applicable authorization choices. The local branch does so by identifying IUA as an alternative and tying profile selection to environment-specific requirements. The requested generic permission for other approaches is not adopted because it could overstate the guide's defined choices. The relevant source is ahead of PR #99 and not in its current open head, so this recommendation concerns the branch implementation and is not a claim of merge or Jira resolution.

## Proposed Change Category
**Category:** Clarification.

**Rationale:** The local ticket record does not provide a Change Category. Clarification is proposed because the change explains how the SMART-specific token-request example relates to the applicable IUA alternative without introducing a new authorization protocol.

## Proposed Change Impact
**Impact:** Compatible clarification of authorization-profile selection.

**Rationale:** The source makes the example's scope and the profile-selection boundary clearer while retaining the SMART and IUA flows described by the guide. It does not introduce unrestricted support for other authorization mechanisms or claim dual conformance on one endpoint. The ticket record does not provide a controlled Change Impact value.

## Next Steps
- Confirm the proposed modified disposition with the workgroup.
- Include the local source change in a future PR update before attributing it to PR #99; verify the PR head again at that time.
- Update the Jira ticket through the normal process only after the workgroup decision.

## Verification Checklist
- [x] Evidence reviewed against the local ticket record, auth fork source, and live PR state.
- [x] Current build references included for impacted and relevant sections.
- [x] Dispositions are specific and distinct.
- [x] Recommendation is justified and distinguishes local branch source from PR source.
