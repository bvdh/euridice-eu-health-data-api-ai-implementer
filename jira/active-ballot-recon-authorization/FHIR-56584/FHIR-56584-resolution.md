# Proposed Resolution for [FHIR-56584](https://jira.hl7.org/browse/FHIR-56584)

## Ticket Summary
| Field | Value |
|-------|-------|
| Key | [FHIR-56584](https://jira.hl7.org/browse/FHIR-56584) |
| Issue Type | Change Request |
| Summary | Authorization & User Level |
| Status | Waiting for Input |
| Resolution | Unresolved |
| Priority | Medium |
| Reporter | [Reinhard Egelkraut](https://jira.hl7.org/secure/ViewProfile.jspa?name=Egelkraut) |
| Assignee | [Bas van den Heuvel](https://jira.hl7.org/secure/ViewProfile.jspa?name=bvdh) |
| Created | 2026-04-28 |
| Updated | 2026-05-27 |
| Work Group | HL7 Europe |
| Specification | EU Health Data API (R4) (FHIR) |
| Raised in Version | 1.0.0-ballot |
| Parent / Grouping | Not specified in the local ticket record |

## Description
The ticket questions the statement that user-level authentication and authorization are outside the scope of sections 3.2.2 and 3.2.9, noting that user information may be present in a token and may be relevant to audit messages. The comments refine the question: distinguish a person's login to an access service from authorization of that service's API request, clarify what user context an API token represents, and explain how end-user access events relate to API-level events and audit records.

## Implementation Status
**Pending as a ticket; partially addressed in the specified branch snapshot.** Jira remains Waiting for Input / Unresolved. The implementation assessment below is based on the source in the `ballot-recon-authorization` worktree at commit `019276d397944036d1e502a2acddb3d5e56e158c`, reported clean on 2026-10-08. The branch-context resolver maps this logical branch to the active ticket directory; the checked-out Git ref in the source worktree is `eu-health-data-api-ballot-recon-auth`.

In this snapshot, authorization is environment- and flow-specific, not a universal system-to-system-only model. The authorization page specifies eIDAS-recognized authentication before authorization decisions for applicable interactive SMART/IUA flows, describes SMART interactive clinician access as well as pre-authorized SMART Backend Services, and describes optional IUA user/patient token claims. It cautions that a valid token does not itself establish consent, treatment relationship, patient identity, or entitlement. Consent, patient matching, audit, identity proofing, and policy administration remain distinct responsibilities.

The Health Professional Access Service page places professional authentication, patient selection, and routing at the access-service / Member State layer, while identifying the access service and protected EHR endpoint as API authorization actors. It also allows an interactive SMART Clinician Access flow where the API request requires runtime clinician authorization. The Health Data Access Service page separately places patient authentication and consent management at the service layer and describes the EHR-facing authorization exchange. The Actors page keeps authorization client, authorization server, and resource server roles distinct.

Logging remains the material explanatory gap. `regulatoryAnchors.md` states that this IG does not specify logging format or interoperability of EHR logs; the authorization page says consent and audit are separate responsibilities. Neither page in this snapshot explains the difference between an EHR's API release/request event and a receiving system's later end-user access event. The current source does not establish a requirement for a user claim in every token, a common audit format, or cross-system audit correlation.

### Current Branch Snapshot
- Logical branch: `ballot-recon-authorization`; source worktree: `eu-health-data-api-ballot-recon-auth`.
- Commit: `019276d397944036d1e502a2acddb3d5e56e158c` (2026-10-08); worktree clean at inspection.
- [Authorization source](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/authorization.md) — selected SMART/IUA flows, eIDAS authentication, token scope/context, and separation of consent and audit.
- [Actors source](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/actors.md) — authorization-client, authorization-server, and resource-server roles.
- [Health Professional Access Service source](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/usecase-health-professional-portal.md) — service-level identity/patient selection and EHR-facing API authorization.
- [Health Data Access Service source](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/usecase-health-data-portal.md) — patient authentication, consent management, and EHR-facing exchange.
- [Regulatory Anchors source](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/regulatoryAnchors.md) — local logging scope and lack of specified log interoperability.

## Related Tickets
No related ticket keys are identified in the local ticket record. The May 20 comment links [PR #84](https://github.com/euridice-org/eu-health-data-api/pull/84) as a proposed resolution. Its merge commit (`92889ff`, 2026-07-28) is in the specified branch's history. Historically, that PR clarified the access-service scope and workflow on the health-professional and health-data pages; it did not modify `authorization.md`, and its `regulatoryAnchors.md` changes did not add an API-versus-end-user audit-event distinction. The relevant access-service separation remains in the current branch pages, but those pages have since evolved: in particular, the current health-professional page allows interactive SMART Clinician Access where runtime user authorization is needed, rather than describing every API caller as system-to-system. PR #84's merge is historical ticket evidence, not proof that FHIR-56584 is resolved.

## Publication Context (Not Branch Implementation Evidence)
The following generated-build links are retained as publication context only; they are not the basis for the implementation assessment above and may represent a different published branch or revision from commit `019276d397944036d1e502a2acddb3d5e56e158c`. Where published wording differs from the source links above, this resolution assesses only the named ballot worktree snapshot.

- [Authorization](https://build.fhir.org/ig/euridice-org/eu-health-data-api/en/authorization.html) — publication context for authorization scope and future-work wording.
- [Health Professional Access Service](https://build.fhir.org/ig/euridice-org/eu-health-data-api/en/usecase-health-professional-portal.html) — publication context for service scope and authorization.
- [Health Data Access Service](https://build.fhir.org/ig/euridice-org/eu-health-data-api/en/usecase-health-data-portal.html) — publication context for service scope, authentication, consent, and authorization.
- [Actors](https://build.fhir.org/ig/euridice-org/eu-health-data-api/en/actors.html) — publication context for API actor groupings.
- [Regulatory Anchors](https://build.fhir.org/ig/euridice-org/eu-health-data-api/en/regulatoryAnchors.html#scope-of-this-ig) — publication context for logging scope.

## Disposition Analysis
The ticket raises a valid clarity concern but brings together distinct responsibilities. In the current branch, authentication of a person at an access service is distinct from the Authorization Server's user authentication and authorization decision for applicable interactive flows; both are distinct from authorization of an API request by the selected client/resource-server flow. That flow can be interactive SMART Clinician Access or a separately pre-authorized backend flow, depending on environment and use case. Consent and patient matching remain separate access-service or deployment responsibilities. Optional token claims provide context but do not, by themselves, establish identity, consent, patient match, or entitlement.

The remaining gap is explanatory rather than a demonstrated missing normative API-authentication requirement: the branch's logging-scope text excludes a specified log format and interoperability, but does not illustrate how an EHR's API release/request event differs from later end-user access events at the receiving system. The ticket comments ask about those events and whether logs need interoperability; they do not establish an agreed requirement for cross-system correlation. PR #84's access-service clarifications are present, but the authorization and use-case text has since evolved, and its merge did not add the missing audit example. A resolution should explain the distinction without implying a new logging, token-claim, or audit-interoperability obligation.

## Proposed Dispositions
### Disposition A: Accept As Requested
#### Proposal
Bring user-level authentication and authorization into this IG's API conformance requirements; require the authenticated user's context in API access tokens; and require audit records for API and end-user events to be linked across participating systems.
#### Justification
This directly addresses the concern that user identity and access events matter for accountability. It would, however, expand the API profile beyond its current system-to-system scope, conflate token claims with identity or consent evidence, and impose audit linkage/interoperability requirements that the current build and ticket evidence do not establish.

### Disposition B: Alternative Approach
#### Proposal
Retain the branch's existing environment- and flow-specific authentication and API-authorization requirements. Add a concise explanatory example distinguishing (1) the source EHR's API request/release event from (2) later end-user access to received data at the consuming system. Keep person authentication, API authorization, consent/patient matching, optional token context, and audit responsibilities explicit and separate. State that the example does not add a user claim to every token, new local logging duties, a shared log format, or cross-system audit correlation/interoperability requirements.
#### Justification
This addresses the remaining event-level question without reopening authorization scope already described by the current branch's selected SMART/IUA flows and access-service pages. It avoids turning optional user/patient context into a universal claim requirement or inferring log interoperability from local audit duties. It also leaves any proposed normative expansion for a separately identified legal or adopted-profile requirement and an explicit workgroup scope decision.

### Disposition C: Decline
#### Proposal
Make no further changes; rely on the current authorization and access-service pages and retain the existing logging-component scope without adding an API-versus-end-user event example.
#### Justification
The current branch already explains several authentication and API-authorization boundaries, and declining avoids expanding the IG or interpreting unsettled logging provisions. However, the source does not explain the distinct API and end-user audit events raised in the ticket comments, so this leaves that clarity issue unresolved.

### Recommendation
**Recommended disposition:** B

Clarify the remaining audit-event distinction while retaining the current branch's environment-specific interactive and backend authorization flows. This is narrower than A: the branch already specifies applicable interactive user authentication and API authorization behavior, but does not support universal token-claim or cross-system audit requirements. It is preferable to C because the event distinction remains absent from the source despite the access-service clarifications that PR #84 introduced and that remain in the current use-case pages. Any new normative claim should depend on a separately identified regulation or adopted-profile requirement and an explicit workgroup scope decision.

## Next Steps
1. Ask the workgroup whether it wants an informative example distinguishing a source EHR's API release/request event from subsequent user-access events recorded by the receiving system.
2. If accepted, add that example in an appropriate narrative location while preserving the current flow-specific SMART/IUA and access-service requirements; state that it does not define shared log format, interoperability, or correlation.
3. Require a separately identified regulatory or adopted-profile basis and explicit scope decision before adding universal user-token claims, new API authorization requirements, or cross-system audit exchange.
4. Revisit the ticket status after the workgroup clarification and any scope decision.

## Verification Checklist
- [x] Ticket metadata, description, and all local comments reviewed.
- [x] Specified ballot worktree, commit, clean status, and inspection date recorded.
- [x] Authorization, actors, health-professional access, health-data access, and logging/audit source pages reviewed directly in that worktree.
- [x] PR #84 merge commit and relevant historical diff checked; current source contents assessed separately and no claim that PR merge resolves the ticket.
- [x] Published-build links labeled as context only, not evidence for the ballot branch snapshot.
- [x] Logging/event distinction gap stated without inferring a cross-system correlation requirement.
- [x] Dispositions A, B, and C are concrete and materially distinct.
- [x] Recommendation is explicit and justified against the alternatives.
- [x] Authentication, API authorization, consent/patient matching, optional token context, audit, and branch ticket status are kept distinct.