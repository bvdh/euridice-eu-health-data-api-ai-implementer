# Proposed Resolution for [FHIR-56369](https://jira.hl7.org/browse/FHIR-56369)

## Ticket Summary

| Field | Value |
| --- | --- |
| Key | [FHIR-56369](https://jira.hl7.org/browse/FHIR-56369) |
| Issue Type | Change Request |
| Status | Triaged |
| Resolution | Unresolved |
| Reporter | [Giorgio Cangioli](https://jira.hl7.org/secure/ViewProfile.jspa?name=giorgio) |
| Assignee | Unassigned |
| Created | 2026-04-16 |
| Updated | 2026-07-16 |
| Priority | Medium |
| Specification | EU Health Data API (R4) (FHIR) |
| Raised in Version | 1.0.0-ballot |
| Work Group | HL7 Europe |
| Related Page(s) | Authorization |
| Parent | Not stated in the ticket |
| Grouping | Not stated in the ticket |

## Description

The ticket asks whether additional requirements placed on an actor labeled as an
IHE IUA Authorization Client still conform to the standard actor definition, and
requests clarification through a separate, explicitly named ad hoc or derived
actor if needed. It also says SMART is the reference when conflicts arise.

The ticket record contains no comments or linked PR, commit, or related
implementation evidence. Its status is Triaged and its Jira resolution is
Unresolved.

## Implementation Status

**Ticket status: Pending.** The local ticket record remains Triaged with an
Unresolved Jira resolution. It contains no ticket-linked PR, commit, or comment
documenting adoption of this request. GitHub PR
[#99](https://github.com/euridice-org/eu-health-data-api/pull/99) is open,
targets `main`, and currently has head
[`c0e4af73c30331136bf3df722e988cfd3cc48d38`](https://github.com/euridice-org/eu-health-data-api/commit/c0e4af73c30331136bf3df722e988cfd3cc48d38).
The PR changes the actor and authorization pages relevant to this ticket. It
is unmerged branch evidence, not proof of a formal Jira resolution.

The previously analyzed source at commit
`019276d397944036d1e502a2acddb3d5e56e158c` is superseded for this analysis.
Evidence below is pinned to the current PR head:

<!-- markdownlint-disable MD013 -->
- [`Actors.fsh` — generic Health Data API Authorization Client](https://github.com/euridice-org/eu-health-data-api/blob/c0e4af73c30331136bf3df722e988cfd3cc48d38/input/fsh/Actors.fsh#L27-L38): a separately named generic role obtains and presents a token and explicitly does not itself claim IHE IUA or SMART conformance.
- [`Actors.fsh` — IHE IUA Authorization Client](https://github.com/euridice-org/eu-health-data-api/blob/c0e4af73c30331136bf3df722e988cfd3cc48d38/input/fsh/Actors.fsh#L231-L244): a separate protocol-specific ActorDefinition links to the formal IHE actor; its description says it requests least-privilege scopes and implements applicable IUA transactions.
- [`authorization.md` — environment selection and IUA requirements](https://github.com/euridice-org/eu-health-data-api/blob/c0e4af73c30331136bf3df722e988cfd3cc48d38/input/pagecontent/authorization.md#L4-L6): SMART App Launch 2.2 and IHE IUA Revision 2.5 are selected per environment. The IUA section separates core IUA requirements from MHD integration and additional recommendations, but leaves the status of the least-privilege wording unclassified ([IUA section](https://github.com/euridice-org/eu-health-data-api/blob/c0e4af73c30331136bf3df722e988cfd3cc48d38/input/pagecontent/authorization.md#ihe-iua)).
- [`actors.md` — composite actor groupings](https://github.com/euridice-org/eu-health-data-api/blob/c0e4af73c30331136bf3df722e988cfd3cc48d38/input/pagecontent/actors.md#L22-L30): generic Health Data API roles are distinct from selected IUA or SMART protocol actors.
- [IHE IUA Revision 2.5 — Authorization Client](https://profiles.ihe.net/ITI/IUA/index.html#34111-authorization-client): defines the client as obtaining and attaching an access token; the inspected actor definition does not state a least-privilege-scope SHALL.
<!-- markdownlint-enable MD013 -->

The PR therefore separates the generic EU authorization role from the
protocol-specific IHE IUA actor and identifies protocol selection as
environment-specific. It does not define a third derived IUA actor. The
official IHE IUA Revision 2.5 Authorization Client description says the client
obtains and attaches an access token; the inspected actor section does not
establish “least-privilege scopes” as an IUA SHALL. The IG source also leaves
that phrase's status unclassified. This is a limited residual clarification
point, not evidence that the whole request remains unaddressed.

## Related Tickets

The local ticket does not identify a related ticket. The consolidated
proposed-resolution analysis separately lists
[FHIR-56616](https://jira.hl7.org/browse/FHIR-56616) as a similar question
about defining a distinct actor when the IG adds requirements beyond the IUA
Authorization Client. This is secondary context only; no formal relationship
is recorded in this ticket.

## Current Build References

<!-- markdownlint-disable MD013 -->
- [Authorization — IHE IUA](https://hl7.eu/fhir/health-data-api/authorization.html#ihe-iua) — relevant to the distinction between IUA requirements, environment selection, and IG/MHD integration.
- [Actors and Transactions](https://hl7.eu/fhir/health-data-api/actors.html) — relevant to generic and protocol-specific actor groupings.
- [IHE IUA Authorization Client](https://hl7.eu/fhir/health-data-api/ActorDefinition-iua-authorization-client-eu-api.html) — relevant to the named protocol-specific actor.
<!-- markdownlint-enable MD013 -->

These mutable published pages provide current-build context only, not proof
that PR #99 has been merged or that the ticket has been resolved. The
implementation assessment is grounded in the PR-head source links above. The
published site identifies the current EU Health Data API ballot build; its
rendered authorization details were not independently compared with the
unmerged PR.

## Disposition Analysis

The open PR's current source substantially addresses the request by defining
the generic Health Data API Authorization Client separately from the formal
IHE IUA Authorization Client, and by selecting authorization protocol by
environment. The Authorization page also distinguishes core IUA requirements
from conditional MHD integration and recommendations. Keeping the formal IUA
actor separate from the generic IG role avoids presenting the latter as IHE
conformant without requiring a third derived actor.

The remaining point is that “least-privilege scopes” appears in the IUA actor
description but is not classified as inherited IUA behavior, a recommendation,
or an additional IG constraint. The inspected IHE IUA Revision 2.5 actor
description states that the client obtains and attaches an access token
without that phrase. The workgroup should clarify its status before using it
as a conformance criterion. Environment-specific protocol selection also
does not define universal precedence for a dual-conformance endpoint.

## Proposed Dispositions

### Disposition A: Accept As Requested

#### Proposal (A)

Adopt the generic Health Data API Authorization Client and separate
protocol-specific IHE IUA Authorization Client definitions already present
in PR #99. Clarify whether “least-privilege scopes” describes applicable
standard guidance or adds an IG-level requirement, and label any additional
mandatory constraint explicitly rather than attributing it to IHE IUA.

#### Justification (A)

This directly addresses the request's actor-identity concern while preserving
the formal IHE actor name. It also closes the remaining scope-language
ambiguity. It does not require a third derived actor unless the workgroup
decides additional mandatory behavior must be conformed to as a distinct
profile.

### Disposition B: Alternative Approach

#### Proposal (B)

Accept the PR #99 separation and environment-specific protocol selection as
the response to the ticket, without creating a third derived actor. Record
that unresolved requirement-strength questions, including the
least-privilege-scope phrase, require explicit clarification; do not infer a
universal SMART-over-IUA precedence rule.

#### Justification (B)

This tracks the implementation actually proposed in the PR and resolves the
misidentification of the generic EU role as the IHE actor. It is more
proportionate than adding a third actor when the PR says the selected IHE or
SMART profile supplies the protocol conformance target. The trade-off is that
the exact conformance status of “least-privilege scopes” remains open.

### Disposition C: Decline

#### Proposal (C)

Make no changes to the request, relying on the existing PR text and leaving
the least-privilege wording unclassified.

#### Justification (C)

The PR already distinguishes the generic authorization role from the IHE IUA
role and makes protocol choice environment-specific. Declining avoids further
text changes, but leaves the conformance strength and source of the
least-privilege wording unclear, preserving the specific ambiguity raised by
the ticket.

### Recommendation

Recommended disposition: B

Disposition B best matches the current PR source: it separates the generic
Health Data API role from named protocol roles and selects IUA or SMART by
environment. It answers the ticket's concern without claiming that PR #99 is
merged or that a third actor has been defined. The workgroup should still
classify the least-privilege phrase; if it intends additional mandatory
behavior beyond the selected standard, it should state that delta and decide
whether a derived actor is warranted.

## Next Steps

1. Ask the workgroup to classify “least-privilege scopes” as inherited
   standard guidance, an IG recommendation, or an additional IG requirement.
2. If additional mandatory constraints are intended, enumerate the delta and
   decide whether a separately named derived actor is needed.
3. Do not infer universal SMART/IUA precedence from environment-specific
   protocol selection.
4. Keep Jira Triaged/Unresolved unless and until the workgroup records a
   formal disposition; PR #99 remains open.

## Verification Checklist

- [x] Ticket metadata, description, and available local comment/evidence content reviewed.
- [x] PR #99 state and head verified with `gh`; the PR is open and its head is
  identified by commit.
- [x] Authorization and actor claims are linked to PR-head source; the
  consolidated entry is secondary context only.
- [x] Current build references are included and distinguished from
  unmerged-PR implementation evidence.
- [x] Dispositions A, B, and C are concrete and distinct.
- [x] Recommendation is explicit and explains trade-offs against the alternatives.
- [x] Missing evidence and open decisions recorded; no conformance inferred.
