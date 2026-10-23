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
**Pending as a ticket; partially addressed in the current branch source.** The local ticket record shows `Waiting for Input` / `Unresolved`. Its May 20 comment links [PR #84](https://github.com/euridice-org/eu-health-data-api/pull/84) as a proposed resolution. That PR is **MERGED** (2026-07-28). Its deployment/use-case work is present in the current branch, but the merge does not itself establish that the ticket is resolved.

The explicit implementation worktree is `eu-health-data-api-ballot-recon-auth`, on branch `eu-health-data-api-ballot-recon-auth`, at local commit `61abb39` ("FHIR-56584: Explain informative logging considerations"), on top of `fef5d8b` (FHIR-56615) and `1638e75`. The branch-context resolver maps the active ticket directory to logical branch `ballot-recon-authorization`, whose expected fork worktree is missing; the user explicitly authorized using this auth worktree despite that branch-name mismatch. The branch is four commits ahead of the PR head `c0e4af7` and none of these are pushed. The ticket-specific logging page, regulatory-anchor link, and SUSHI registration are committed and clean. The worktree has unrelated uncommitted authorization CORS edits, capability-statement/example edits, generated XML, and include/report edits; the reviewed CORS diff does not alter the user-context or logging statements summarized here (refreshed 2026-10-22). The current live authorization PR, [PR #99](https://github.com/euridice-org/eu-health-data-api/pull/99), is **OPEN**, not merged, against `main`, at head `c0e4af73c30331136bf3df722e988cfd3cc48d38` (checked with `gh` on 2026-10-22). No checks are reported. The PR description says it concerns authorization changes but does not identify FHIR-56584. The local commits after `c0e4af7`, including the logging page in `61abb39`, are not in PR #99's current head; do not attribute them to that PR.

The current source distinguishes authentication to an access service from authorization of a downstream API request. The Health Professional Access Service page says professional authentication, patient selection, and query routing are governed by Member State requirements and are outside this IG's API scope. The Health Data Access Service page similarly places patient authentication and consent management at the service layer. Both pages identify the service as the generic Health Data API Authorization Client and the protected EHR as the API Resource Server; they state that portal sign-in alone does not authorize a downstream FHIR request. For interactive access, an Authentication Service authenticates the user directly or through an upstream identity service; it may be grouped with the Authorization Server or deployed separately. The Authorization Server applies policy and issues the API access token, and the Resource Server enforces granted authorization. This does not add runtime user authentication to a pre-authorized SMART Backend Service.

Authorization is environment- and flow-specific. The current authorization page allows interactive SMART and IUA authorization-code flows, and treats pre-authorized SMART Backend Services as a separate system-to-system flow. It distinguishes token claims and scopes and states that neither alone establishes consent or entitlement. The ticket comments do not establish a universal user claim requirement.

The current local source now provides the requested event-level example. The new informative Implementation page `logging-audit-considerations.md` ("Logging and Audit Considerations (Informative)", commit `61abb39`) distinguishes the source EHR's API request/release event from later end-user access at the receiving system, separates authentication/authorization from logging, and notes that deployments may use syslog, IHE ATNA, or IHE BALP without mandating any. It adds no conformance requirement, log format, transport, cross-system correlation, or universal user claim. `regulatoryAnchors.md` links to it and still states that this IG does not specify the logging component format or interoperability of EHR logs. No material requested content remains missing; remaining questions are workgroup acceptance and the Jira status. Known unrelated wording issue (not changed): `regulatoryAnchors.md` describes ATNA and BALP as FHIR AuditEvent-based, whereas traditional ATNA reporting uses syslog and only RESTful ATNA adds AuditEvent.

### Current Branch Evidence
- [Authorization](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/authorization.md) — distinguishes Authentication Service, Authorization Server, and Resource Server responsibilities; describes interactive and pre-authorized flows, token context, and separation of consent/audit.
- [Actors](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/actors.md) — describes the generic authorization roles, their logical nature, optional groupings, and protocol-specific conformance.
- [Health Professional Access Service](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/usecase-health-professional-portal.md) — distinguishes professional login at the service from downstream API authorization; maps each EHR-facing hop to its environment and flow.
- [Health Data Access Service](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/usecase-health-data-portal.md) — places patient identity and consent at the access service and distinguishes portal sign-in from API authorization.
- [Regulatory Anchors](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/regulatoryAnchors.md) — states the IG does not specify EHR logging format or log interoperability; links to the logging page.
- [Logging and Audit Considerations](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/logging-audit-considerations.md) — informative page (local commit `61abb39`, not in PR #99): API event versus later user access, authentication/authorization versus logging, and syslog/ATNA/BALP as optional infrastructure.

## Related Tickets and PR Evidence
The local ticket contains no related ticket keys. Its May 20 comment links PR #84 as proposed resolution evidence. PR #84 is merged; its scope covered deployment and access-service pages. It is historical ticket-linked evidence, not proof of formal Jira resolution.

PR #99 is the current authorization-focused PR for the named branch. Its current state is **OPEN** and it does not specifically identify this ticket. The local branch has four commits beyond its current PR head; source changes in local commits `1638e75`, `fef5d8b`, and `61abb39` (including the logging page) therefore describe the current implementation worktree, not the contents of PR #99 as presently posted.

## Current Build References
- [Authorization](https://build.fhir.org/ig/euridice-org/eu-health-data-api/en/authorization.html#authentication-and-api-authorization) — publication locator for the authentication/API authorization boundary; not evidence that the current local branch text has been published.
- [Health Professional Access Service](https://build.fhir.org/ig/euridice-org/eu-health-data-api/en/usecase-health-professional-portal.html#authorization) — publication locator for service-level and downstream authorization roles.
- [Health Data Access Service](https://build.fhir.org/ig/euridice-org/eu-health-data-api/en/usecase-health-data-portal.html#authorization) — publication locator for patient sign-in and downstream API authorization.
- [Regulatory Anchors](https://build.fhir.org/ig/euridice-org/eu-health-data-api/en/regulatoryAnchors.html#scope-of-this-ig) — publication locator for logging scope and interoperability.
- **Publication mapping caveat:** these generated current-build pages may reflect a different revision. The analysis is based on the named local source and verified PR states, not on an assumption that this branch snapshot has been published.

## Disposition Analysis
The ticket raises a valid clarity concern but brings together distinct responsibilities. In the current source, authentication of a person at an access service is distinct from the Authentication Service's role in an applicable interactive API authorization flow, and both are distinct from the Authorization Server's decision and the Resource Server's enforcement of a downstream API request. The applicable flow may be interactive SMART/IUA or pre-authorized backend access, depending on environment and use case. Consent and patient matching remain separate service or deployment responsibilities. Optional token claims provide context but do not, by themselves, establish identity, consent, patient match, or entitlement.

The source now explains that a service user's sign-in does not by itself authorize a downstream request, and identifies a separate Authentication Service for interactive access. The event-level distinction between the source EHR's API release/request event and later end-user access events at the receiving system is now illustrated in the local informative logging page (not yet in PR #99). Neither source establishes a shared log format, interoperability, correlation, or a universal user claim. PR #84 is merged and ticket-linked in a comment; PR #99 is open and broadly relevant but not ticket-specific. The local ticket record shows `Waiting for Input` / `Unresolved`.

## Proposed Dispositions
### Disposition A: Accept As Requested
#### Proposal
Require user-level authentication for all API requests, require authenticated user context in every API access token, and require audit records for API and end-user events to be linked across participating systems.

#### Justification
This would directly address the view that user identity and access events are important for accountability. It would, however, expand the API profile beyond the source's flow-specific design and impose universal token-claim and audit-correlation/interoperability requirements that neither the local ticket comments nor current source establish.

### Disposition B: Alternative Approach
#### Proposal
Retain the current environment- and flow-specific authentication and API-authorization requirements. Add an informative example distinguishing (1) the source EHR's API request/release event from (2) later end-user access to received data at the consuming system. Keep person authentication, API authorization, consent/patient matching, optional token context, and audit responsibilities explicit and separate. State that the example does not add a user claim to every token, new local logging duties, a shared log format, or cross-system audit correlation/interoperability requirements.

#### Justification
This addresses the remaining event-level question without reopening authentication and API-authorization boundaries now described in the current branch source. It avoids turning optional user/patient context into a universal claim requirement or inferring log interoperability from local audit duties. Any normative expansion should require a separately identified legal or adopted-profile basis and an explicit workgroup scope decision.

### Disposition C: Decline
#### Proposal
Make no further changes; rely on the current authorization and access-service pages and retain the existing logging-component scope without adding an API-versus-end-user event example.

#### Justification
The source already distinguishes service sign-in from downstream API authorization and describes separate service roles. Declining avoids expanding the IG or interpreting unsettled logging provisions. However, without the new informative logging page the source would not explain the separate API and end-user audit events raised in the ticket comments.

### Recommendation
**Recommended disposition:** B

Clarify the remaining audit-event distinction while retaining the current source's environment-specific interactive and backend authorization flows. This is narrower than A: the source does not support universal token claims or cross-system audit requirements. The current worktree already implements this informative clarification in the new logging page, so the recommendation reflects applied local work rather than a pending addition; it is preferable to C because that event distinction is a response to the ticket's comments. PR #84 is merged and was linked in a ticket comment; PR #99 is open, is not ticket-specific, and does not yet include the logging page or later local commits (head `c0e4af7`). Any new normative requirement should depend on an identified regulation or adopted-profile requirement and an explicit workgroup scope decision.

## Next Steps
1. Push the local commits (or include them in the PR) so the logging page is part of the PR under review, and ask the workgroup to confirm the informative example distinguishing a source EHR's API release/request event from subsequent user-access events.
2. Preserve current flow-specific SMART/IUA and access-service requirements; the page already states it does not define shared log format, interoperability, or correlation.
3. Require a separately identified regulatory or adopted-profile basis and explicit scope decision before adding universal user-token claims, new API authorization requirements, or cross-system audit exchange.
4. Revisit the ticket status after the workgroup clarification and any scope decision.

## Verification Checklist
- [x] Ticket metadata, description, and all local comments reviewed.
- [x] Current authorization worktree, branch, commit, local status, and relevant source pages reviewed.
- [x] Live PR #84 state verified as merged; live PR #99 state, head, base, and checks verified with `gh`.
- [x] Current local commits (including logging page `61abb39`) distinguished from the current PR #99 head `c0e4af7` (re-verified with `gh` on 2026-10-22).
- [x] Authorization, actor, access-service, and logging scope evidence summarized; event-level audit gap retained.
- [x] Current-build links included as publication locators with a revision caveat.
- [x] Dispositions A, B, and C are concrete and materially distinct.
- [x] Recommendation is explicit and distinguishes source coverage, PR state, and Jira status.
