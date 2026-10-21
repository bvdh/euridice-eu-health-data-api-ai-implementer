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

**Ticket disposition: Pending.** The local ticket record remains Triaged with
an Unresolved Jira resolution. It contains no ticket-linked PR, commit, or
comment documenting adoption of this request. The implementation snapshot
below is evidence of branch content only; it does not establish that this
ticket was implemented or resolved.

**Implementation snapshot:** The inspected source is branch
`eu-health-data-api-ballot-recon-auth` (logical branch
`ballot-recon-authorization`) at commit
[`019276d397944036d1e502a2acddb3d5e56e158c`](https://github.com/euridice-org/eu-health-data-api/commit/019276d397944036d1e502a2acddb3d5e56e158c),
dated 2026-10-08. The branch worktree was clean at that snapshot. Source links
below are pinned to that commit:

<!-- markdownlint-disable MD013 -->
- [`Actors.fsh` — generic EU Authorization Client](https://github.com/euridice-org/eu-health-data-api/blob/019276d397944036d1e502a2acddb3d5e56e158c/input/fsh/Actors.fsh#L27): the generic role obtains and presents a token; its description says it does not by itself claim IHE IUA or SMART conformance.
- [`Actors.fsh` — IHE IUA Authorization Client](https://github.com/euridice-org/eu-health-data-api/blob/019276d397944036d1e502a2acddb3d5e56e158c/input/fsh/Actors.fsh#L206): a separate protocol-specific ActorDefinition says the client authenticates to the Authorization Server, requests least-privilege scopes, presents the bearer token, and implements applicable IUA transactions.
- [`actors.md`](https://github.com/euridice-org/eu-health-data-api/blob/019276d397944036d1e502a2acddb3d5e56e158c/input/pagecontent/actors.md#L41): composite actors use the IUA Authorization Client, SMART App, or SMART Backend Service selected for the environment and use case. The page does not define a third, derived EU IUA client actor.
- [`authorization.md` — IUA requirements and integration](https://github.com/euridice-org/eu-health-data-api/blob/019276d397944036d1e502a2acddb3d5e56e158c/input/pagecontent/authorization.md#L185): it distinguishes core IUA requirements from this IG's MHD transaction integration and additional recommendations. Core IUA defines no scopes; MHD integration uses `ITI-65` through `ITI-68` transaction scopes only for supported transactions, and `ITI-105` has no IUA-defined transaction scope ([scope model](https://github.com/euridice-org/eu-health-data-api/blob/019276d397944036d1e502a2acddb3d5e56e158c/input/pagecontent/authorization.md#L27), [transaction limits](https://github.com/euridice-org/eu-health-data-api/blob/019276d397944036d1e502a2acddb3d5e56e158c/input/pagecontent/authorization.md#L198)). The page also identifies browser-client CORS policy as an explicit IG requirement rather than a universal IUA requirement ([CORS](https://github.com/euridice-org/eu-health-data-api/blob/019276d397944036d1e502a2acddb3d5e56e158c/input/pagecontent/authorization.md#L189)).
<!-- markdownlint-enable MD013 -->

This snapshot therefore contains a generic EU client role and a separate
IHE-IUA-specific client role, but no separately named IG-derived IUA client.
The Authorization page separates core IUA from conditional MHD integration and
additional IG recommendations/requirements. The remaining ambiguity is the
provenance of the IUA ActorDefinition's “least-privilege scopes” wording: the
same Authorization page says core IUA has no scopes, but does not explicitly
classify that client-description phrase as inherited IUA behavior or an
IG/MHD-level requirement. Whether any additional mandatory constraints warrant
a derived actor remains a workgroup decision; this branch snapshot does not
make the derived-actor change requested as an example in the ticket.

## Related Tickets

The local ticket does not identify a related ticket. The consolidated
proposed-resolution analysis separately lists
[FHIR-56616](https://jira.hl7.org/browse/FHIR-56616) as a similar question
about defining a distinct actor when the IG adds requirements beyond the IUA
Authorization Client. This is secondary context only; no formal relationship
is recorded in this ticket.

## Published Build Context (Not Implementation Evidence)

<!-- markdownlint-disable MD013 -->
- [Authorization — IHE IUA](https://hl7.eu/fhir/health-data-api/current-build/en/authorization.html#ihe-iua) — published-build context for the separation of IUA and IG/MHD requirements.
- [Actors and Transactions](https://hl7.eu/fhir/health-data-api/current-build/en/actors.html) — published-build context for composite actor selection.
- [IHE IUA Authorization Client](https://hl7.eu/fhir/health-data-api/current-build/en/ActorDefinition-iua-authorization-client-eu-api.html) — published-build context for the protocol-specific actor.
<!-- markdownlint-enable MD013 -->

These mutable published pages are context only, not evidence for the
implementation-status assessment. That assessment is grounded in the pinned
branch/commit source links above. The ticket identifies Authorization as its
related page; actor references are included because the request concerns the
IUA Authorization Client definition and its distinction from the generic EU
role. Published-page availability and rendering were not independently
verified for this proposal.

## Disposition Analysis

The pinned 2026-10-08 branch snapshot already distinguishes the generic EU
Authorization Client from the IHE IUA Authorization Client and states that
core IUA, MHD integration, and additional IG recommendations are separate. It
does not define a derived client actor or explicitly classify the IUA
ActorDefinition's least-privilege wording by requirement source. MHD
transaction scopes are explicitly limited to supported transactions;
ITI-105 has no IUA-defined transaction scope.

The environment-specific selection of IUA or SMART does not establish a
blanket SMART-over-IUA precedence rule. SMART applies in the environments and
flows selected by the IG; it does not redefine the IUA actor where IUA is
selected. Any overlapping dual-conformance or precedence rule would require an
explicit workgroup decision.

## Proposed Dispositions

### Disposition A: Accept As Requested

#### Proposal (A)

Define a separately named EU IG IUA Authorization Client profile derived from
the formal IHE IUA Authorization Client if the workgroup confirms additional
mandatory client constraints. Keep the formal IHE actor unchanged, enumerate
each added constraint as an explicit profile delta, and identify whether it
applies generally or only to a selected MHD transaction/use case. State that
SMART requirements apply to SMART-selected environments and flows; do not make
SMART a universal override of IUA absent an explicitly selected
dual-conformance case.

#### Justification (A)

This directly addresses the concern that an actor with additional constraints
could be mistaken for the standard IUA actor. It gives implementers a clear
conformance target if the workgroup intends a stronger profile. Its cost is
introducing and maintaining an additional profile and normative boundary that
the pinned branch snapshot does not yet define; that decision cannot be
inferred from the ticket or the pinned ActorDefinition descriptions.

### Disposition B: Alternative Approach

#### Proposal (B)

Retain the generic EU Authorization Client and protocol-specific IHE IUA
Authorization Client actors present in the pinned branch snapshot. Clarify its
IUA actor description and Authorization-page explanation to classify
requirements as: (1) formal
IUA actor/transaction requirements, (2) conditional MHD integration
requirements for supported transactions, or (3) additional IG recommendations
or requirements. Clarify that MHD transaction scopes are not universal IUA
scopes, that ITI-105 has no IUA-defined transaction scope, and that any
additional mandatory profile requirement or cross-protocol precedence rule
requires a separate workgroup decision. Do not introduce a new actor unless the
workgroup adopts such additional normative constraints.

#### Justification (B)

This resolves the ambiguity at its source while preserving the current
separation of generic EU and protocol-specific roles. It avoids suggesting
that the IUA actor itself has been replaced or that every client must meet
MHD-specific requirements. It also reflects the current environment-specific
choice between SMART and IUA without asserting an unimplemented global
precedence rule. A separately named profile remains available if the workgroup
later adopts additional constraints.

### Disposition C: Decline

#### Proposal (C)

Make no changes and rely on the generic/protocol-specific actor
distinction and the Authorization page's statement that core IUA requirements
are separate from MHD integration and IG recommendations.

#### Justification (C)

The pinned branch snapshot already contains the principal distinctions and
limits MHD scopes to supported transactions. Declining avoids duplicating requirements
across pages or creating an unnecessary actor. The drawback is that the IUA
ActorDefinition does not itself identify whether its least-privilege wording is
formal IUA behavior, an IG expectation, or conditional on integration, leaving
room for the exact confusion raised by the ticket.

### Recommendation

Recommended disposition: B

The pinned branch snapshot already has generic and IUA-specific client actors
and distinguishes core IUA from MHD integration and IG additions, but it has
not defined a derived IUA actor or classified every client constraint by
source. Disposition B addresses that narrow gap without claiming the ticket
has been implemented. If the workgroup confirms additional mandatory
constraints beyond the selected IUA/MHD requirements, it should state the
profile delta explicitly and decide whether a separately named derived actor
is warranted. No universal SMART precedence should be inferred from the
environment-specific protocol selection.

## Next Steps

1. Classify least-privilege wording as an IG requirement, recommendation, or
description of selected IUA/MHD behavior.
2. Select MHD transactions and scopes per client; ITI-105 has no IUA scope.
3. Adopt any added mandatory constraints and define a derived-profile delta.
4. Set SMART/IUA precedence only if dual conformance is explicitly adopted.
5. Leave the ticket unresolved; do not change ticket or specification sources.

## Verification Checklist

- [x] Ticket metadata, description, and available comment/evidence content reviewed.
- [x] Authorization and actor sources reviewed; the consolidated entry is
secondary context only.
- [x] Published pages are context only; claims cite the pinned commit.
- [x] Dispositions A, B, and C are concrete and distinct.
- [x] Recommendation is explicit and explains trade-offs against the alternatives.
- [x] Missing evidence and open decisions recorded; no conformance inferred.
