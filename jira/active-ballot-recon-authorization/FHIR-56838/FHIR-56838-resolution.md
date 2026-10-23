# Proposed Resolution for [FHIR-56838](https://jira.hl7.org/browse/FHIR-56838)

## Ticket Summary

| Field | Value |
|-------|-------|
| Key | [FHIR-56838](https://jira.hl7.org/browse/FHIR-56838) |
| Summary | Revise authorization page |
| Issue Type | Technical Correction; the reporter's comment calls it a change request |
| Status | Waiting for Input |
| Resolution | Unresolved |
| Reporter | [Giorgio Cangioli](https://jira.hl7.org/secure/ViewProfile.jspa?name=giorgio) |
| Assignee | [Bas van den Heuvel](https://jira.hl7.org/secure/ViewProfile.jspa?name=bvdh) |
| Created | 2026-05-05 |
| Updated | 2026-06-10 |
| Related Page | Authorization |
| Parent / Grouping | Not recorded in the local ticket |
| Current disposition state | Pending formal disposition; authorization content is partially addressed in the implementation worktree |

## Description

The ticket asks that the Authorization page name SMART where SMART is the
mechanism being profiled or recommended, and make clear when IUA is used as a
reference framework rather than the active mechanism. It also asks the guide
to distinguish preferred approaches from requirements, and gives example
wording allowing other approaches that satisfy the guide and applicable
regulatory and trust-framework requirements.

The comment from Giorgio Cangioli on 2026-05-05 adds that the page should state
the baseline obligation to comply with the applicable eIDAS 2 framework and
related EU requirements. Another comment on that date says, "It is a change
request". The ticket contains no adopted disposition.

## Implementation Status

**Coverage: Partially addressed in the authorization reconciliation worktree.**
**Formal disposition: Pending. PR state: Open; not merged.**

Verified on 2026-10-22 against the explicitly selected worktree
`eu-health-data-api-ballot-recon-auth`, branch
`eu-health-data-api-ballot-recon-auth`, at local HEAD
`1638e75b81a8c43126ab44eb2f3bba92b15190b2`. The local branch is two commits
ahead of `origin/eu-health-data-api-ballot-recon-auth`, whose HEAD is
`c0e4af73c30331136bf3df722e988cfd3cc48d38`. The Authorization page has no
content diff against that PR head. PR #99 includes
`input/pagecontent/authorization.md`; relative to its base it changes that file
by 296 insertions and 165 deletions. The live
[PR #99 — Eu health data api ballot
recon authorization](https://github.com/euridice-org/eu-health-data-api/pull/99)
is Open, targets `main`, and has head `c0e4af73c30331136bf3df722e988cfd3cc48d38`;
it is not merged. The PR was found by the implementation branch, not by a
ticket-key search, and the local ticket snapshot contains no PR link.

The inspected worktree has unrelated local edits in `input/includes/auth-todo.md`
and `input/includes/proposed-ticket-resolutions.md`; neither the Authorization
page nor its content differs from the PR head. No conclusion about Jira status
or live Jira comments beyond the local ticket snapshot is implied.

Verified source evidence:

1. [Authorization source](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/authorization.md)
   identifies SMART App Launch and IHE IUA by name, compares their roles, and
   selects profiles by environment and flow. It does not describe IUA as merely
   background: IUA remains an applicable profile for specified deployments.
2. The source provides a legal context in **EHDS Requirements** and a
   conditional eIDAS-recognized identification requirement in **Using eIDAS for
   User Authentication**. It does not impose a universal Wallet duty or
   select a universal Wallet integration profile.
3. The environment overview and detailed flow sections distinguish
   recommendations from requirements, but their strength is not fully
   consistent. For example, the National Interoperability Infrastructure
   section says interactive Wellness Application access SHALL use SMART, while
   the Wellness Applications guidance describes SMART support as SHOULD or
   RECOMMENDED.
4. The source allows SMART Backend Services for certain pre-authorized or
   system-to-system flows, and keeps IUA as a selected option in particular
   environments. It does not permit any alternative authorization framework
   solely because it satisfies a general regulatory and trust-framework
   condition.
5. The current local
   [authorization-ticket-resolutions summary](../../../eu-health-data-api-ballot-recon-auth/input/includes/proposed-ticket-resolutions.md)
   likewise records this ticket as partially addressed, identifying the
   remaining obligation-strength and broader-framework decisions.

The PR and branch demonstrate implementation work, not ticket acceptance. The
ticket remains Waiting for Input / Unresolved in the local record.

## Related Tickets

- [FHIR-56848](https://jira.hl7.org/browse/FHIR-56848) addresses avoiding a
  universal SMART Backend Services requirement in CapabilityStatements.
- [FHIR-56852](https://jira.hl7.org/browse/FHIR-56852) addresses the strength
  of the SMART Backend Services requirement and alternative mechanisms.

These are related authorization questions, not evidence that FHIR-56838 has
been formally resolved.

## Current Build References

- [Authorization — EHDS Requirements](https://hl7.eu/fhir/health-data-api/current-build/en/authorization.html#ehds-requirements)
  — relevant to the ticket's request to state the regulatory baseline.
- [Authorization — IHE IUA and SMART App Launch](https://hl7.eu/fhir/health-data-api/current-build/en/authorization.html#ihe-iua-and-smart-app-launch)
  — relevant to protocol terminology and the relationship between SMART and IUA.
- [Authorization — Using eIDAS for User Authentication](https://hl7.eu/fhir/health-data-api/current-build/en/authorization.html#using-eidas-for-user-authentication)
  — relevant to the ticket comment about eIDAS 2 and EU requirements.
- [Authorization — Environment-Specific Requirements](https://hl7.eu/fhir/health-data-api/current-build/en/authorization.html#environment-specific-requirements)
  — relevant to recommendations, obligations, and permitted flows by environment.

## Disposition Analysis

The current source responds to the terminology concern by naming SMART and IUA
separately and selecting them for particular environments and flows. It also
uses qualified recommendations and requirements rather than treating SMART
Backend Services as universally mandatory. Its EHDS discussion cites relevant
EU provisions, and its eIDAS section describes a conditional requirement for
recognized electronic identification where the selected environment requires
it.

This is not a complete acceptance of the request. IUA is an active option, not
only background; the source does not establish SMART as the globally preferred
approach or allow unspecified alternative frameworks. The strength of some
environment-specific statements remains inconsistent, and the general
regulatory-baseline wording requested in the ticket comment is not stated as a
single, explicit baseline. Expanding allowed mechanisms or imposing new
eIDAS/Wallet obligations would require a deliberate scope decision and must not
be inferred from this partial implementation.

The evidence supports a modified resolution that accepts the environment- and
flow-specific terminology and regulatory context, while requiring the
remaining requirement-strength and alternative-framework questions to be
clarified before claiming full resolution. PR #99 is Open and unmerged; Jira
remains Waiting for Input / Unresolved in the local snapshot.

## Proposed Dispositions

### Disposition A: Accept As Requested

#### Proposal

Accept the request in full: make SMART the consistently named preferred
approach wherever it is used, describe IUA only as a reference where
appropriate, state the eIDAS 2 and related EU regulatory baseline, and permit
other authorization approaches when they satisfy the guide and applicable
regulatory and trust-framework requirements.

#### Justification

This most directly adopts the requested flexibility and addresses all three
parts of the request, including the added comment. However, it would broaden
the currently selected conformance scope and could imply that any otherwise
compliant framework is permitted without defining how it meets this IG's
discovery, token, scope, and enforcement requirements. The source also uses
IUA as an active profile in selected environments, so describing it only as
background would be inaccurate without a separate scope decision.

### Disposition B: Alternative Approach

#### Proposal

Accept the protocol-specific terminology and the existing EHDS/eIDAS context,
but retain the selected SMART and IUA profiles by environment and flow. Reconcile
the inconsistent SHOULD/SHALL wording and clarify the regulatory baseline
without assigning a universal Wallet duty. Defer permission for additional
authorization frameworks until the workgroup defines how they satisfy this
guide's conformance requirements.

#### Justification

This matches the partially implemented source while avoiding a claim that
SMART is universally mandatory or that IUA is merely background. It preserves
the documented EHDS/eIDAS obligations without extending them to every
environment or imposing an unselected Wallet integration. It also makes the
remaining scope decisions explicit instead of converting the ticket's example
wording into a new general conformance rule.

### Disposition C: Decline

#### Proposal

Decline changes in response to this ticket and retain the current
environment-specific profile model, obligation language, and regulatory
references.

#### Justification

The current page already distinguishes SMART and IUA and includes EHDS/eIDAS
material. Declining would avoid broadening conformance without a defined
alternative profile, but it would leave the identified strength inconsistencies
and the explicit regulatory-baseline clarification request unresolved.

### Recommendation

**Recommended disposition:** B

Recommend the alternative approach. It reflects what the current authorization
source actually implements and addresses the central clarity concerns, while
the report and source still identify unresolved normative-strength wording
and broader-framework scope. Disposition A would grant an undefined expansion
of permitted mechanisms; disposition C would leave concrete clarity issues
unaddressed. PR #99 remains Open and unmerged, so this recommendation is not
evidence of formal acceptance or completion.

## Next Steps

1. Confirm the workgroup's intended distinction between recommendation and
   obligation for each affected environment and flow, then reconcile the
   overview and detailed SHALL/SHOULD/RECOMMENDED statements.
2. Confirm whether the regulatory baseline should be stated as a general
   obligation or only as the currently scoped EHDS/eIDAS requirements; avoid
   implying a universal Wallet or assurance-level mandate.
3. Decide whether additional authorization frameworks may conform and, if so,
   specify the applicable discovery, token, scope, trust, and enforcement
   criteria before adding a general MAY.
4. Verify PR #99's source and status again before any later pre-applied
   resolution or Jira update.

## Verification Checklist

- [x] Evidence reviewed against the local ticket, current authorization source, and live PR state
- [x] Current build references included for impacted/relevant sections
- [x] Dispositions are specific and meaningfully distinct
- [x] Recommendation is justified against the source and alternatives
- [x] Formal Jira status is distinguished from implementation and PR status
