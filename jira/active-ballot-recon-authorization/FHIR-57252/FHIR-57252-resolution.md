# Proposed Resolution for [FHIR-57252](https://jira.hl7.org/browse/FHIR-57252)

## Ticket Summary

| Field | Value |
|-------|-------|
| Key | [FHIR-57252](https://jira.hl7.org/browse/FHIR-57252) |
| Issue Type | Change Request |
| Summary | Include FAST Security as an optional Authorization Framework |
| Status | Triaged |
| Resolution | Unresolved |
| Reporter | [David Pyke](https://jira.hl7.org/secure/ViewProfile.jspa?name=david.pyke) |
| Assignee | Unassigned |
| Created | 2026-05-16 |
| Updated | 2026-07-16 |
| Related Page | Authorization |
| Parent / Grouping | Not recorded in the local ticket |

## Description

The ticket asks the IG to include the FAST Security Implementation Guide as an
optional authorization framework. It describes FAST Security as a trust
framework using X.509 certificates to represent membership and as a way to
automate registration and OAuth authentication and authorization. It contrasts
this with the existing use of SMART on FHIR and IHE IUA.

The sole recorded comment, by Andries Hamster on 2026-05-27, recommends not
including FAST at this point, stating that the foundational search and retrieval
work should be settled first and that the security-framework discussion is not
yet stable. The local ticket remains Triaged with an Unresolved resolution; this
proposal does not change Jira status.

## Implementation Status

**Coverage: FAST Security is not included in the current authorization source or
the open PR.** The local authorization page selects SMART App Launch 2.2 and
IHE IUA Revision 2.5 according to environment and describes possible hybrid
rules as future work. The page does not define FAST Security support, certificate
trust, membership, or registration behavior.

Reviewed on 2026-10-22 against the explicitly requested
`eu-health-data-api-ballot-recon-auth` worktree. Its branch is
`eu-health-data-api-ballot-recon-auth`, at `1638e75`; it is two commits ahead of
its upstream-tracking ref, the PR head `c0e4af73c30331136bf3df722e988cfd3cc48d38`.
Those additional commits do not change `input/pagecontent/authorization.md`.
The worktree also has existing modifications to `input/includes/auth-todo.md`
and `input/includes/proposed-ticket-resolutions.md`; neither was changed for
this proposal.

GitHub verification with `gh` found [PR #99 — Eu health data api ballot recon authorization](https://github.com/euridice-org/eu-health-data-api/pull/99)
in **Open** state, targeting `main`, with current head
`c0e4af73c30331136bf3df722e988cfd3cc48d38` and last updated 2026-10-21.
The PR changes `input/pagecontent/authorization.md`; its current authorization
text aligns with the local page and does not add FAST Security. The PR is not
merged, and its state does not change the ticket's formal Jira status.

The existing analysis for [FHIR-56852](https://jira.hl7.org/browse/FHIR-56852)
also lists FHIR-57252 as a separate FAST Security proposal not implemented by
that ticket's authorization correction. This is an analytical cross-reference,
not a formal Jira relationship recorded in FHIR-57252.

## Related Tickets

- [FHIR-56852](https://jira.hl7.org/browse/FHIR-56852): its local resolution
  analysis treats the FAST Security request as a separate proposal; no formal
  relationship is recorded in FHIR-57252.

## Current Build References

- [Authorization](https://hl7.eu/fhir/health-data-api/current-build/en/authorization.html)
  is the relevant published page for the ticket's requested authorization
  framework. This link locates the section; it is not evidence that the
  published build contains the current local branch or open PR changes.

## Disposition Analysis

The source and PR evidence do not show FAST Security being applied. The ticket
comment explicitly favors waiting until the base framework is in place and the
security-framework discussion is more stable. The authorization page currently
selects SMART or IUA by environment and does not include FAST/UDAP behavior.
These facts support deferring FAST for this release while stating that the
workgroup is open to considering a future extension. This is not a commitment
to adopt FAST or a finding that it is technically incompatible. A future
proposal should assess its trust, membership, registration, certificate, and
OAuth responsibilities against the IG's scope.

## Proposed Dispositions

### Disposition A: Accept As Requested

#### Proposal

Add FAST Security as an optional authorization framework and describe when an
implementation may use it alongside or instead of the currently selected SMART
or IUA approach.

#### Justification

This would address the request to recognize an existing trust-framework
approach and could support automated registration. However, the ticket and
current source do not define how FAST membership, certificates, trust
establishment, registration, and OAuth authorization relate to this IG's
environment-specific conformance targets.

### Disposition B: Alternative Approach

#### Proposal

Focus this version on establishing the base authorization framework. State
that the workgroup is open to considering FAST/UDAP extensions in a future
version, when the foundational framework and applicable responsibilities can
be assessed.

#### Justification

This directly addresses the timing concern in the recorded comment while
preserving a path for future consideration. It does not add FAST-specific
conformance requirements to the current version or promise future adoption.

### Disposition C: Decline

#### Proposal

Decline the request without stating an intention to consider FAST/UDAP in a
future version. Keep the authorization guidance scoped to the
environment-specific SMART and IUA selections.

#### Justification

This avoids introducing unreviewed trust or conformance behavior. However, it
does not capture the requested openness to future consideration as clearly as
deferral and could be read as a final rejection.

### Recommendation

**Recommended disposition:** B

Recommend deferring FAST/UDAP for this version while stating that the workgroup
is open to considering an extension in a future version. This follows the
recorded comment's call to establish the basics first, accurately reflects
that FAST is absent from the current source and open PR, and avoids treating
future consideration as either present support or a commitment to adoption.
Option A would add behavior before the integration responsibilities are
defined; Option C would not preserve the stated future path.

## Next Steps

- Ask the workgroup to confirm the proposed deferral and future-consideration
  wording; the ticket remains Triaged and Unresolved until Jira is updated
  through its normal process.
- Focus this version on agreeing and documenting the base authorization
  framework. If FAST/UDAP is considered for a future version, assess its trust,
  certificate, membership, registration, and authorization responsibilities
  and specify how it relates to the selected SMART/IUA flows before adding
  conformance statements.
- Recheck the PR state and source if this analysis is used after 2026-10-22.

## Verification Checklist

- [x] Ticket metadata, description, and all recorded comments reviewed
- [x] Current source and the current GitHub PR head/state checked
- [x] Local commits beyond the PR head identified and checked for changes to the authorization page
- [x] Current build reference included for the relevant page
- [x] Dispositions are specific and distinct
- [x] Recommendation is justified against the ticket and implementation evidence
