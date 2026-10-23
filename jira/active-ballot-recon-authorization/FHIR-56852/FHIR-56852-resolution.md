# Proposed Resolution for [FHIR-56852](https://jira.hl7.org/browse/FHIR-56852)

## Ticket Summary

| Field | Value |
|-------|-------|
| Key | [FHIR-56852](https://jira.hl7.org/browse/FHIR-56852) |
| Summary | Systems SHOULD support SMART Backend Services |
| Issue Type | Technical Correction; the reporter's comment calls it a change request |
| Status | Waiting for Input |
| Resolution | Unresolved |
| Reporter | [Giorgio Cangioli](https://jira.hl7.org/secure/ViewProfile.jspa?name=giorgio) |
| Assignee | [Bas van den Heuvel](https://jira.hl7.org/secure/ViewProfile.jspa?name=bvdh) |
| Created | 2026-05-05 |
| Updated | 2026-06-10 |
| Related Page | Artifacts Summary |
| Parent / Grouping | Not recorded in the local ticket |
| Current disposition state | Pending formal disposition; core request addressed in the local authorization reconciliation worktree |

## Description

The ticket objects to:

> Systems SHALL support SMART Backend Services authorization for all transactions.

It proposes lowering SHALL to SHOULD, with optional wording allowing other
mechanisms that comply with applicable EU regulations and trust frameworks.
Its underlying concern is a universal Backend Services requirement, not the
removal of authorization from protected transactions.

The sole recorded comment, from Giorgio Cangioli on 2026-05-05, is:

> It is a change request

The local ticket record contains no implementation PR, commit reference, vote,
or adopted resolution. This proposal does not change its status or resolution.

## Implementation Status

**Coverage: Addressed in the local authorization reconciliation worktree.**
**Formal disposition: Pending. Public CI publication of this fix: not verified.**

Reviewed on 2026-10-22 against
`eu-health-data-api-ballot-recon-auth`, whose HEAD is `1638e75`.
The worktree is two commits ahead of the current PR head. Comparing the
ticket-relevant Authorization, Functional, and CapabilityStatement source paths
against that PR head found no source differences.

The logical ticket branch resolves to `ballot-recon-authorization`, and this
proposal is stored in its active ticket directory. The branch resolver's default
fork is the primary checkout on `main`; implementation evidence here instead
comes explicitly from the authorization reconciliation worktree used for the
preceding report. No branch configuration or specification source was changed.

Verified local evidence:

1. [Functional source](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/functional.md)
   describes authorization as "Authorization using SMART or IHE IUA, with the
   applicable flow" and uses the same distinction in the common-flow list.
2. [Authorization source](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/authorization.md)
   selects profiles by environment and flow, distinguishes interactive SMART from
   pre-authorized Backend Services, and does not impose Backend Services on all
   transactions.
3. The six main abstract
   [CapabilityStatement sources](../../../eu-health-data-api-ballot-recon-auth/input/fsh/capabilitystatements/)
   distinguish IUA, SMART Backend Services, and interactive SMART modes. They
   omit a fixed security-service coding where alternatives apply and require
   concrete deployments to declare their selected service.
4. The
   [Document Consumer statement](../../../eu-health-data-api-ballot-recon-auth/input/fsh/capabilitystatements/CapabilityStatementDocumentConsumer.fsh)
   makes Backend Services grant, client-authentication, and scope requirements
   conditional on a pre-authorized system-to-system use case; interactive SMART
   is a separate mode.
5. The corresponding local rendered Functional, Authorization, and Document
   Consumer pages contain those distinctions. The preceding full worktree build
   completed on 2026-10-21 with 0 errors, 12 warnings, 45 informational findings,
   and 0 broken links. No new build was needed for this proposal-only change.

**Current branch PR state (verified with `gh` on 2026-10-22):** [PR #99 — Eu
health data api ballot recon authorization](https://github.com/euridice-org/eu-health-data-api/pull/99)
is **Open**, targets `main`, and has head
`c0e4af73c30331136bf3df722e988cfd3cc48d38`. Its file list includes
`input/pagecontent/authorization.md`, `input/pagecontent/functional.md`, and
the relevant abstract CapabilityStatement sources, including
`CapabilityStatementDocumentConsumer.fsh`. The local source used for this
analysis is unchanged on these ticket-relevant paths since the PR head.
`mergeStateStatus` is `DIRTY`; the PR is not merged. The ticket itself does not
cite this PR, so it is branch-level implementation evidence, not a Jira-linked
implementation reference.

This is narrower than a claim that every authorization issue is resolved.
Environment-level SHOULD/SHALL consistency remains separately identified in the
consolidated report and does not reinstate a universal Backend Services mandate.

## Related Tickets

- [FHIR-56848](https://jira.hl7.org/browse/FHIR-56848): the overlapping objection
  to mandatory Backend Services in CapabilityStatements.
- [FHIR-56838](https://jira.hl7.org/browse/FHIR-56838): broader terminology,
  obligation-strength, regulatory-baseline, and alternative-mechanism concerns.
- [FHIR-56388](https://jira.hl7.org/browse/FHIR-56388): the separate mTLS and
  certificate-bound-token proposal, not implemented by this fix.
- [FHIR-57252](https://jira.hl7.org/browse/FHIR-57252): the separate proposal
  to add FAST Security, not implemented by this fix.

These are analytical cross-references from the consolidated review, not formal
Jira relationships recorded in this ticket.

## Current Build References

- [Public CI Authorization](https://build.fhir.org/ig/euridice-org/eu-health-data-api/en/authorization.html)
  is the relevant upstream page. Fetched on 2026-10-22: it still describes
  system-to-system-only authorization and SMART precedence over IUA, so it
  must not be cited as proof that the local correction is already published.
- [Local Authorization](../../../eu-health-data-api-ballot-recon-auth/output/en/authorization.html#environment-specific-requirements)
  shows environment-specific selection; its SMART section distinguishes
  interactive access from Backend Services.
- [Local Functional overview](../../../eu-health-data-api-ballot-recon-auth/output/en/functional.html#authorization)
  shows the corrected overview wording.
- [Local Document Consumer CapabilityStatement](../../../eu-health-data-api-ballot-recon-auth/output/en/CapabilityStatement-document-consumer-eu-api.html)
  illustrates abstract requirements with conditional protocol/mode requirements.
- [Consolidated ticket analysis](../../../eu-health-data-api-ballot-recon-auth/output/en/authorization-ticket-resolutions.html)
  records current coverage and remaining cross-ticket decisions.

**Publication mapping gap:** the template's
`https://hl7.eu/fhir/health-data-api/current-build/en/authorization.html`
returned HTTP 404 on 2026-10-22. The working public CI URL above is provided
instead. Local generated pages are evidence for the reconciliation worktree,
not a claim of upstream deployment or an authorized publication.

## Disposition Analysis

The core request has been addressed by removing the blanket requirement, not by
replacing one all-transactions Backend Services statement with another.
Authorization remains required, while the applicable profile and SMART mode
depend on the environment and use case.

This implements the requested flexibility within the IG's current SMART/IUA
scope. It does not authorize arbitrary additional mechanisms, require both
profiles on one endpoint, or weaken obligations inherited by a selected mode.

The ticket's optional wider-mechanism sentence needs no silent adoption to
resolve the core concern. mTLS and FAST remain separate decisions.

## Proposed Dispositions

### Disposition A: Accept As Requested

#### Proposal

Replace the blanket SHALL with "Systems SHOULD support SMART Backend Services
authorization for all transactions." Consider the optional wider-mechanism
sentence only through an explicit scope decision.

#### Justification

This follows the ticket's suggested replacement literally and removes a universal
SHALL. However, it still recommends Backend Services for interactive transactions,
where a different SMART mode applies, and is less precise than the implemented
conditional model.

### Disposition B: Alternative Approach

#### Proposal

Accept the concern as addressed through the existing environment- and
flow-specific authorization model, rather than introducing a blanket SHOULD.
Use the following proposed resolution text:

> The concern has been addressed in the authorization reconciliation worktree.
> The blanket requirement that all systems support SMART Backend Services for
> all transactions has been removed. Authorization is selected according to the
> environment and use case: the abstract CapabilityStatements describe applicable
> IHE IUA and SMART alternatives, and distinguish interactive SMART App Launch
> from pre-authorized SMART Backend Services. The Functional overview uses the
> same distinction. Backend Services requirements apply only when that mode is
> selected; they are not universal requirements for every actor or transaction.
> Requirements inherited from the selected authorization specification remain
> applicable. This resolution does not introduce additional authorization
> frameworks or same-endpoint dual conformance.
>
> No additional specification change is proposed for this ticket. Formal
> disposition and publication of the reconciled content remain subject to
> workgroup approval and integration.

#### Justification

This meets the ticket's underlying concern and matches the verified local
implementation. It avoids applying a server-to-server profile to interactive
flows, preserves mandatory requirements within a selected profile, and does not
claim that unresolved wider-framework requests have been implemented.

### Disposition C: Decline

#### Proposal

Reject the request to relax the blanket Backend Services requirement and retain
or restore universal Backend Services support for all transactions.

#### Justification

One universally required mode could simplify a strictly pre-authorized
system-to-system specification. However, it conflicts with the current
reconciliation model's interactive and IUA alternatives and would reintroduce
the ambiguity the ticket identifies. This option is not recommended.

### Recommendation

**Recommended disposition:** B

Use the ready-to-paste resolution above: **addressed locally through the existing
conditional model; no further specification edit proposed for this ticket**.
B is preferable to A because a universal SHOULD still conflates Backend Services
and interactive access, and preferable to C because the current source already
supports selected alternatives. This recommendation is not evidence of an
adopted Jira disposition or upstream publication.

## Next Steps

1. Present disposition B and its resolution text to the workgroup.
2. Confirm acceptance of the current selected-profile model rather than the
   literal all-transactions SHOULD wording.
3. Complete review and integration of the open branch PR, then verify the public
   Authorization, Functional, and affected CapabilityStatement pages.
4. Update Jira only after the formal decision. The source record remains
   Waiting for Input / Unresolved.
5. Parent/grouping metadata and ticket-specific PR/commit attribution are absent
   from the ticket; do not present the branch-level PR as a Jira-linked reference.

## Verification Checklist

- [x] Complete local ticket metadata, description, and comment reviewed.
- [x] Active ticket location confirmed for the resolved logical branch.
- [x] Owning source and representative rendered implementation evidence reviewed.
- [x] Current build references included; public/local evidence and mapping gap distinguished.
- [x] Dispositions A/B/C are concrete and meaningfully distinct.
- [x] Recommendation is explicit and supported by the implementation evidence.
- [x] No specification source, Jira status, or unrelated ticket artifact changed.
- [ ] Workgroup disposition adopted and recorded.
- [ ] Reconciled content verified on the public build after integration.
