# Proposed Resolution for [FHIR-56368](https://jira.hl7.org/browse/FHIR-56368)

## Ticket Summary

| Field | Value |
| --- | --- |
| Key | [FHIR-56368](https://jira.hl7.org/browse/FHIR-56368) |
| Issue Type | Change Request |
| Status | Triaged |
| Resolution | Unresolved |
| Reporter | [Giorgio Cangioli](https://jira.hl7.org/secure/ViewProfile.jspa?name=giorgio) |
| Assignee | Unassigned |
| Created | 2026-04-16 |
| Priority | Medium |
| Specification | EU Health Data API (R4) (FHIR) |
| Related Page(s) | Authorization |
| Grouping | Not recorded in the ticket source |

## Description

The ticket questions whether the IG's SMART-on-FHIR approach aligns with eIDAS, EU Digital Identity Wallet requirements, and GDPR-related constraints. It requests a clarification section and suggests mapping SMART authentication flows to eIDAS assurance levels and explaining Wallet integration. See the [ticket description](FHIR-56368.md#L5), [requested clarification](FHIR-56368.md#L13), [assurance mapping request](FHIR-56368.md#L15), and [Wallet integration suggestion](FHIR-56368.md#L17).

## Implementation Status

**Branch implementation snapshot (separate from ticket-linked evidence).** The authoritative `ballot-recon-authorization` baseline is commit `019276d397944036d1e502a2acddb3d5e56e158c`, dated 2026-10-08; that worktree was clean when checked. At this snapshot, the branch implements the following:

- The authorization page states that, where the selected environment requires electronic identification under the EHDS, the Authorization Server SHALL use an eIDAS-recognized identification means before its authorization decision. It applies this to interactive SMART or IUA authorization-code flows, not pre-authorized SMART Backend Services using `client_credentials`; validation, session establishment, policy application, and issuance are described there. See [eIDAS user authorization](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/authorization.md#L38).
- It describes the European Digital Identity Wallet as a possible source of that identification result and permits OpenID4VP as an option. The implementer notes address Wallet Relying Party registration, user choice, and presentation context. However, the branch selects no presentation format, credential schema, or Wallet-to-Authorization-Server profile; it treats the validated result as upstream authentication, not as a SMART grant or token. See [Wallet integration and boundaries](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/authorization.md#L48) and [Wallet implementer notes](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/authorization.md#L56).
- The branch keeps applicable eIDAS assurance, health-professional status, and local authorization policy separate from OAuth grants and scopes. It does **not** map SMART flows to eIDAS assurance levels; its note that Level of Assurance High applies to PID and not all attestations is not such a mapping. The [EHDS requirements summary](../../../eu-health-data-api-ballot-recon-auth/doc/ehds-auth-summary.md#L7) covers identification and authentication, and says detailed Wallet alignment remains subject to implementing acts [there](../../../eu-health-data-api-ballot-recon-auth/doc/ehds-auth-summary.md#L13).
- The authorization text distinguishes consent, patient matching, audit, and other responsibilities from token issuance, and states that consent and audit remain separate responsibilities. This is not a detailed GDPR analysis: the branch does not define one here. See [EHDS and authorization boundaries](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/authorization.md#L8) and [consent and audit distinction](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/authorization.md#L200).

**Ticket-linked implementation evidence and Jira status.** The source ticket has no comments, PR links, commit hashes, or other ticket-linked implementation evidence. The branch snapshot above establishes what the specified baseline contains; it does not establish that the changes were made to resolve this ticket. Jira remains **Triaged / Unresolved**, so implementation status for this ticket is **Pending**. The assurance-level mapping, detailed GDPR analysis, and selected Wallet profile remain unaddressed by the branch and are not existing IG requirements.

## Related Tickets

No related tickets are recorded in the source ticket.

## Current Build References

- [Authorization](https://hl7.eu/fhir/health-data-api/current-build/en/authorization.html) — published current-build context for the EHDS/eIDAS overview, Wallet discussion, and environment-specific SMART/IUA selection; not evidence of a ticket-linked PR, commit, or resolution.

**Mapping note:** A page-level current-build reference is provided. A stable subsection anchor for the eIDAS discussion could not be verified in the locally available rendered output, so no unverified fragment is asserted. The local authorization worktree's output does not establish that this ticket's requested details have been released.

## Disposition Analysis

The broad request for regulatory clarification is substantially reflected in the current authorization text, but the ticket remains unresolved and has no ticket-linked implementation evidence. The page describes the EHDS/eIDAS basis and a possible Wallet role in interactive authorization. It does not claim that the EHDS establishes a separate Wallet authorization protocol, and it leaves the presentation format, credential schema, and Wallet-to-Authorization-Server profile unselected. The maintained EHDS summary states that exact Wallet alignment is subject to implementing acts.

The requested additions are distinct decisions: an assurance mapping would relate identity-assurance results to authorization flows; Wallet profile details would select a technical integration; and detailed GDPR analysis is a separate legal and policy task. These are potential additions or open decisions, not current normative requirements. Any follow-up should preserve the existing environment-specific authorization selection and should not turn a possible Wallet authentication input into a new SMART grant, token type, or universal protocol mandate.

## Proposed Dispositions

### Disposition A: Accept As Requested

#### Proposal

Add a normative SMART/eIDAS mapping assigning eIDAS assurance levels to applicable interactive SMART flows, specify a Wallet-to-Authorization-Server integration profile, and add GDPR-specific authentication and authorization requirements.

#### Justification

This most directly follows the suggested additions and could give implementers a prescriptive target. However, the ticket supplies no assurance mapping, Wallet profile, or GDPR analysis to adopt. The current EHDS evidence does not establish these as a standardized SMART mapping or Wallet authorization protocol. Selecting them now would require an additional authoritative technical and legal basis and workgroup decisions, and risks adding unsupported or environment-wide obligations.

### Disposition B: Alternative Approach

#### Proposal

Recognize the current EHDS/eIDAS and Wallet discussion as the requested high-level clarification. Keep the assurance mapping, detailed GDPR analysis, and Wallet profile selection as explicit open decisions for separately scoped future work. Make no new normative requirement from these suggestions in this resolution.

#### Justification

The authorization page describes eIDAS-recognized identification before interactive authorization, identifies the Wallet as a possible upstream source of that result, and states that the IG has not selected a Wallet-to-Authorization-Server profile. The EHDS summary identifies future implementing acts as the source of further alignment detail. This acknowledges the existing explanation without presenting unselected mappings as requirements, while preserving a path for future work if an applicable legal or technical basis is agreed. It leaves the environment-specific SMART/IUA choices intact.

### Disposition C: Decline

#### Proposal

Decline additional work under this ticket because the authorization page already contains a regulatory overview and the remaining subjects are outside the IG's current authorization scope.

#### Justification

The current page distinguishes identity authentication from OAuth authorization and includes EHDS/eIDAS and Wallet context. Declining would avoid unsupported requirements and legal overreach. Compared with Disposition B, however, it would close the question without retaining the assurance, GDPR, and Wallet-profile gaps as explicit future decisions, despite the ticket raising those topics.

### Recommendation

**Recommended disposition:** B

Treat the ticket as substantially addressed at the level of general clarification, but keep its implementation state Pending until the workgroup resolves the Jira item; current text alone is not ticket-linked implementation evidence. Disposition B best balances the request and evidence: it acknowledges the existing high-level explanation, avoids claiming that SMART establishes EU identity assurance or that the EHDS defines a Wallet authorization protocol, and preserves the requested details as possible future additions. Disposition A would introduce specific obligations without an agreed mapping or profile, while C would discard useful open questions. No change to the IG's environment-specific SMART/IUA scope is recommended.

## Next Steps

- The workgroup should decide whether the existing high-level text is sufficient for this ticket and update Jira only through the normal governance process.
- If further work is desired, scope separate decisions for an assurance mapping and its basis, the intended Wallet integration profile and applicable implementing acts, and the level and owner of GDPR analysis.
- Do not describe these possible additions as current requirements or change SMART/IUA selection without an explicit decision.

## Verification Checklist

- [x] Evidence reviewed against the ticket description and metadata; no comments or linked implementation evidence are present.
- [x] Pinned branch commit/date and implementation snapshot are distinguished from absent ticket-linked evidence and unresolved Jira status.
- [x] Published current-build page is identified as context only, not proof of ticket implementation.
- [x] Dispositions A/B/C are specific and meaningfully distinct.
- [x] Recommendation is explicit, justified, and preserves environment-specific scope.
- [x] Assurance mapping, detailed GDPR analysis, and Wallet profile are identified as possible additions, not existing requirements.
