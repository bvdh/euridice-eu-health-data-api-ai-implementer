# Proposed Resolution for [FHIR-56699](https://jira.hl7.org/browse/FHIR-56699)

## Ticket Summary
| Field | Value |
|-------|-------|
| Key | [FHIR-56699](https://jira.hl7.org/browse/FHIR-56699) |
| Issue Type | Change Request |
| Status | Waiting for Input |
| Resolution | Unresolved |
| Reporter | [RaikKuhlisch](https://jira.hl7.org/secure/ViewProfile.jspa?name=raik.kuhlisch%40gematik.de) |
| Assignee | [Bas van den Heuvel](https://jira.hl7.org/secure/ViewProfile.jspa?name=bvdh) |
| Created | 2026-04-30 |
| Grouping | Not recorded in the local ticket record |

## Description

The ticket requests that the foundational IHE Consistent Time (CT) profile be a recommendation because Germany's national infrastructure time service requires NTP version 4 while the IHE CT profile requires version 3. It also asks to clarify that citing IHE ATNA for secure transport may imply the Authenticate Node [ITI-19] transaction, and suggests noting that Record Audit Event [ITI-20] is optional.

## Implementation Status

**Current state: Pending (partially addressed in the current local source; Jira remains Waiting for Input / Unresolved).**

Evidence refreshed on **2026-10-23**, against the explicit implementation worktree `eu-health-data-api-ballot-recon-auth`, branch `eu-health-data-api-ballot-recon-auth`.

| Request | Current source evidence | Assessment |
|---------|-------------------------|------------|
| CT as a recommendation | [Authorization: SMART Server Time Synchronization](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/authorization.md#smart-server-time-synchronization) recommends (`SHOULD`) CT Time Client grouping for SMART Authorization Server and SMART FHIR Resource Server roles, for interactive and Backend Services modes; client roles are excluded. The actors page, both SMART server ActorDefinitions, and three provider CapabilityStatements link to this rule. | Implemented locally for SMART; not a universal downgrade of CT. |
| National NTPv4 concern | The same section explains that CT references NTPv3 and cites RFC 5905 for NTPv4 backward compatibility, while recommending deployment interoperability checks. | Clarification implemented locally; compatibility alone does not establish full CT conformance or verify the German service. |
| IUA conformance | The IUA section explicitly retains required CT Time Client grouping for IUA Authorization Server and Resource Server roles, citing IUA Revision 2.5 section 34.3. | Intentional qualification of the ticket request. |
| ATNA / ITI-19 scope | [Actors](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/actors.md) references ATNA for TLS; Authorization requires TLS 1.2 or later. [Regulatory Anchors](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/regulatoryAnchors.md) describes ATNA grouping as recommended rather than required. The [document](../../../eu-health-data-api-ballot-recon-auth/input/images-source/document-transactions-sequence.plantuml) and [resource](../../../eu-health-data-api-ballot-recon-auth/input/images-source/resource-transactions-sequence.plantuml) sequence sources still label TLS as `ITI-19 ATNA Authenticate Node (TLS)`. | Remaining ambiguity: prose and diagrams need alignment. |
| ITI-20 optionality | [Logging and Audit Considerations](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/logging-audit-considerations.md) is informative and does not mandate a logging technology, profile, audit-event content, or cross-system exchange. It does not explicitly name ITI-20. | Requested explicit clarification remains missing. |

PR [euridice-org/eu-health-data-api#99](https://github.com/euridice-org/eu-health-data-api/pull/99) remains **OPEN**, not merged, verified with `gh pr view` on 2026-10-23. Its head is `c0e4af73c30331136bf3df722e988cfd3cc48d38`; GitHub returned an empty check rollup. The local worktree HEAD is `06f63608d7f01f5e96dc33835308f0567755f24b`, five commits ahead of that PR head. The CT changes described above are uncommitted worktree edits, not evidence of implementation in the PR. The committed removal of CORS guidance is unrelated to this ticket.

The completed local IG build on 2026-10-23 reported SUSHI 0 errors / 0 warnings and Publisher 0 errors / 12 warnings / 45 information messages / 0 broken links. The generated SMART CT section and actor/CapabilityStatement cross-links were inspected. This validates local rendering, not completion of the outstanding ATNA requests or publication/merge.

The local ticket record remains Waiting for Input / Unresolved and contains no comments or ticket-linked PR. The PR was verified independently for the supplied implementation branch; no live Jira status change is asserted.

## Related Tickets

No related ticket keys are recorded in the local ticket record.

## Current Build References

- [Actors](https://hl7.eu/fhir/health-data-api/current-build/en/actors.html) — foundational CT and ATNA guidance.
- [SMART Server Time Synchronization](https://hl7.eu/fhir/health-data-api/current-build/en/authorization.html#smart-server-time-synchronization) and [Transport Security](https://hl7.eu/fhir/health-data-api/current-build/en/authorization.html#transport-security) — CT strength and TLS requirements.
- [Regulatory Anchors](https://hl7.eu/fhir/health-data-api/current-build/en/regulatoryAnchors.html) and [Logging and Audit Considerations](https://hl7.eu/fhir/health-data-api/current-build/en/logging-audit-considerations.html) — audit scope.
- [Document Exchange](https://hl7.eu/fhir/health-data-api/current-build/en/document-exchange.html) and [Resource Access](https://hl7.eu/fhir/health-data-api/current-build/en/resource-access.html) — transaction diagrams.
- **Current-build mapping gap:** All six page URLs above returned HTTP 404 on 2026-10-23. They are intended locators, not verified published implementation evidence. The [ballot actors page](https://hl7.eu/fhir/health-data-api/1.0.0-ballot/en/actors.html) is the ticket's historical reference, not a representation of the current branch.
- Local rendered evidence: [Authorization](../../../eu-health-data-api-ballot-recon-auth/output/en/authorization.html#smart-server-time-synchronization), [Actors](../../../eu-health-data-api-ballot-recon-auth/output/en/actors.html), and [QA summary](../../../eu-health-data-api-ballot-recon-auth/output/qa.json).

## Disposition Analysis

The CT portion is now partially implemented, but accepting an unconditional CT downgrade would conflict with [IUA Revision 2.5 section 34.3](https://profiles.ihe.net/ITI/IUA/index.html#343-iua-required-actor-groupings), whose required-grouping table lists CT / Time Client for Authorization Server and Resource Server, and no required grouping for Authorization Client. This official table was rechecked on 2026-10-23.

[IHE CT](https://profiles.ihe.net/ITI/TF/Volume1/ch-7.html) references RFC 1305. [RFC 5905 section 1](https://www.rfc-editor.org/rfc/rfc5905#section-1) describes NTPv4 as backward compatible with NTPv3. That supports compatibility guidance, not a blanket exemption from CT requirements or an assertion that the national service has been tested.

Deleting local SMART/IUA ActorDefinitions would not remove inherited requirements while the IG continues to select those specifications. Dropping the authorization specifications themselves would be a separate scope change, not an appropriate substitute for resolving this ticket.

The remaining implementation gap is ATNA: TLS requirements, ITI-19 labels, and the intended absence of an IG-level ITI-20 mandate need explicit alignment. Any optionality statement must be scoped to this IG; it must not waive obligations arising from separately claimed ATNA conformance, other adopted profiles, law, or deployment policy.

## Proposed Dispositions

### Disposition A: Accept As Requested
#### Proposal

Make CT a recommendation for all deployments without preserving a stronger IUA-specific requirement; allow national NTPv4 time services and explicitly mark ITI-20 optional.

#### Justification

This is the broadest reading of the ticket's requested CT recommendation. However, an unconditional downgrade is incompatible with retaining IUA Revision 2.5 conformance. It would require a separate change to the authorization conformance target and is not recommended. An unqualified ITI-20 optionality statement could also misrepresent separately adopted ATNA requirements.

### Disposition B: Alternative Approach
#### Proposal

Retain SMART/IUA roles and the locally implemented SMART server CT `SHOULD`. Preserve IUA's mandatory CT grouping for its Authorization Server and Resource Server roles. Explain NTPv4/NTPv3 compatibility without asserting automatic CT conformance. Preserve TLS 1.2 or later as the IG transport floor, clarify that this alone does not claim full ATNA or ITI-19 conformance, and remove unconditional ITI-19 labels from the generic exchange diagrams unless the depicted exchange explicitly selects that transaction. State that this IG does not require ITI-20, without relaxing obligations from separately adopted specifications or applicable policy.

#### Justification

This addresses the practical CT/NTP and ATNA concerns while retaining the selected authorization specifications. It acknowledges the portion already implemented and makes the remaining source changes explicit. The qualification is necessary because this IG cannot weaken IUA-required grouping while still claiming IUA conformance.

### Disposition C: Decline
#### Proposal

Make no further changes for this ticket, retaining the locally added CT clarification and existing ATNA wording and diagram labels.

#### Justification

This avoids further editing but leaves the documented ITI-19 ambiguity and missing explicit ITI-20 clarification. It does not adequately resolve the entire ticket.

### Recommendation
**Recommended disposition:** B

**Proposed workgroup disposition: Persuasive with Modification.**

B addresses the intent without introducing A's IUA conformance conflict or leaving C's ATNA ambiguity. It retains the protocol-specific roles; their removal is neither necessary nor sufficient. The following is proposed resolution text, not a claim that the remaining changes have been applied:

> Clarify the applicability of Consistent Time and ATNA. Recommend grouping SMART Authorization Server and SMART FHIR Resource Server roles with the IHE CT Time Client for both interactive SMART and Backend Services; this recommendation does not apply solely by virtue of a SMART client role. Retain the CT grouping required for IUA Authorization Server and Resource Server roles by IUA Revision 2.5. Explain that NTPv4 is backward compatible with NTPv3, with deployment interoperability and applicable CT requirements still to be verified. Retain the TLS 1.2-or-later transport requirement without implying that TLS alone establishes ATNA conformance. Align the Actors guidance and exchange diagrams so that ITI-19 denotes an explicitly selected ATNA transaction rather than all TLS exchanges. Explicitly state that this IG does not require ITI-20 Record Audit Event or cross-system audit-log exchange; requirements from separately adopted profiles, applicable law, and deployment policy remain unaffected.

**Proposed change category: Clarification.** The proposal makes the intended scope and profile-specific obligations explicit; it does not replace the authorization protocols or add an audit exchange.

**Proposed change impact: Compatible, substantive.** The CT recommendation and clarification of conformance boundaries affect implementer guidance and merit substantive review, while preserving existing mandatory transport and IUA requirements. This classification is proposed for workgroup confirmation.

## Next Steps

1. Obtain user/workgroup approval for B's remaining ATNA clarification before editing IG source. Specifically confirm the generic-diagram treatment of ITI-19 and the IG-scoped ITI-20 statement.
2. If approved, align Actors, Regulatory Anchors, logging guidance, and the two exchange diagrams, checking separately adopted profile requirements rather than asserting universal ITI-20 optionality.
3. Verify national time-service interoperability separately; no national implementation test evidence is available in the ticket record.
4. Build and inspect the affected prose and regenerated diagrams after implementation.
5. Refresh this analysis and the earlier difference inventory after those changes. Verify PR inclusion and merge state separately from Jira status. Do not create a pre-applied-resolution artifact while the material ATNA gap remains.

## Verification Checklist
- [x] Evidence reviewed
- [x] Current build references included for impacted/relevant sections
- [x] Dispositions are specific
- [x] Recommendation is justified
- [x] Current branch, live PR state, and local-only changes distinguished
- [x] Resolution quality gate: PASS-WITH-NOTES; proposal ready for discussion, not fully implemented
- [ ] Remaining ATNA clarification approved and implemented
- [ ] Full proposed resolution verified in PR / merged source
