# Proposed Resolution for [FHIR-56368](https://jira.hl7.org/browse/FHIR-56368)

## Ticket Summary

| Field | Value |
| --- | --- |
| Key | [FHIR-56368](https://jira.hl7.org/browse/FHIR-56368) |
| Issue Type | Change Request |
| Status | Triaged (ticket-file snapshot; updated 2026-07-16) |
| Resolution | Unresolved (ticket-file snapshot; live Jira status could not be checked) |
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

**Current implementation and PR evidence (verified 2026-10-22).** The supplied `eu-health-data-api-ballot-recon-auth` worktree is on branch `eu-health-data-api-ballot-recon-auth`; its `input/pagecontent/authorization.md` and `doc/ehds-auth-summary.md` match PR #99's head `c0e4af73c30331136bf3df722e988cfd3cc48d38`. Those source files are clean in that worktree. PR #99 is **OPEN** and unmerged, based on `main` at `4dfaccefd7095d81aa4a986cd5a7c300f42765b8`; the relevant commit is [`83b4a01e`](https://github.com/euridice-org/eu-health-data-api/commit/83b4a01e5c09e40ad68b11e8779fb3d781a5d65e), “Clarify Wallet compatibility with SMART and environment-required eIDAS support.”

- The Authorization page says that where the selected environment requires eIDAS-recognized identification, the Authorization Server SHALL support it for interactive SMART or IUA authorization-code flows, but not pre-authorized SMART Backend Services using `client_credentials`. It distinguishes authentication from local authorization policy, token issuance, and API access. See [eIDAS user authentication](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/authorization.md#L95) and the [conditional requirement](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/authorization.md#L99).
- The page permits OpenID4VP as one possible way to obtain a Wallet presentation but selects no presentation format, credential schema, or Wallet-to-Authorization-Server profile. A presentation is not an OAuth grant or API access token. See [Wallet integration boundaries](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/authorization.md#L107) and [Wallet authorization boundaries](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/authorization.md#L155).
- The page keeps eIDAS assurance, professional status, local authorization policy, grants, and scopes separate; it assigns no universal eIDAS assurance level to API access. See [assurance-level discussion](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/authorization.md#L111) and the [EHDS requirements summary](../../../eu-health-data-api-ballot-recon-auth/doc/ehds-auth-summary.md#L13).
- Consent, patient matching, audit, and identity proofing are described as distinct responsibilities. The page does not provide the detailed GDPR analysis raised as a possible addition. See [separate authorization responsibilities](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/authorization.md#L20).

**Ticket linkage and Jira status.** The local ticket markdown contains no comments, PR URL, or commit reference; its metadata snapshot says **Triaged / Unresolved** and was updated 2026-07-16. A live Jira REST request returned HTTP 403, so current Jira status and comments could not be independently verified. PR #99 and its source are relevant implementation evidence, but the PR title/body and local ticket snapshot do not explicitly link the PR to this Jira key. The implementation is present in the open PR, not merged; the assurance-level mapping, detailed GDPR analysis, and selected Wallet profile are not specified by this source.

## Related Tickets

No related tickets are recorded in the source ticket.

## Current Build References

- [Authorization](https://hl7.eu/fhir/health-data-api/1.0.0-ballot/en/authorization.html) — current published v1.0.0-ballot page for the Authorization section; it is separate from PR #99's open source and does not evidence that the PR has been merged or Jira resolved.

**Mapping note:** The current published Authorization page is available, but it does not establish that PR #99's proposed eIDAS/Wallet changes have been released. A stable eIDAS subsection anchor for that published version could not be verified, so no fragment is asserted.

## Disposition Analysis

The broad request for regulatory clarification is substantially reflected in the current source of open PR #99. The Authorization page describes the EHDS/eIDAS basis and a possible Wallet role in interactive authorization. It does not claim that the EHDS establishes a separate Wallet authorization protocol, and it leaves the presentation format, credential schema, and Wallet-to-Authorization-Server profile unselected. The maintained EHDS summary states that detailed Wallet alignment remains subject to implementing acts. The PR is relevant implementation evidence but is still open and is not explicitly linked from the local Jira ticket snapshot.

The requested additions are distinct decisions: an assurance mapping would relate identity-assurance results to authorization flows; Wallet profile details would select a technical integration; and detailed GDPR analysis is a separate legal and policy task. These are potential additions or open decisions, not current normative requirements. Any follow-up should preserve the existing environment-specific authorization selection and should not turn a possible Wallet authentication input into a new SMART grant, token type, or universal protocol mandate.

## Proposed Dispositions

### Disposition A: Accept As Requested

#### Proposal

Add a normative SMART/eIDAS mapping assigning eIDAS assurance levels to applicable interactive SMART flows, specify a Wallet-to-Authorization-Server integration profile, and add GDPR-specific authentication and authorization requirements.

#### Justification

This most directly follows the suggested additions and could give implementers a prescriptive target. However, the ticket supplies no assurance mapping, Wallet profile, or GDPR analysis to adopt. The current source in PR #99 does not establish these as a standardized SMART mapping or Wallet authorization protocol. Selecting them now would require an additional authoritative technical and legal basis and workgroup decisions, and risks adding unsupported or environment-wide obligations.

### Disposition B: Alternative Approach

#### Proposal

Recognize the current EHDS/eIDAS and Wallet discussion as the requested high-level clarification. Keep the assurance mapping, detailed GDPR analysis, and Wallet profile selection as explicit open decisions for separately scoped future work. Make no new normative requirement from these suggestions in this resolution.

#### Justification

The current Authorization page in PR #99 describes eIDAS-recognized identification before interactive authorization, identifies the Wallet as a possible upstream source of that result, and states that the IG has not selected a Wallet-to-Authorization-Server profile. The EHDS summary identifies future implementing acts as the source of further alignment detail. This acknowledges the implemented high-level explanation without presenting unselected mappings as requirements, while preserving a path for future work if an applicable legal or technical basis is agreed. It leaves the environment-specific SMART/IUA choices intact.

### Disposition C: Decline

#### Proposal

Decline additional work under this ticket because the authorization page already contains a regulatory overview and the remaining subjects are outside the IG's current authorization scope.

#### Justification

The current page distinguishes identity authentication from OAuth authorization and includes EHDS/eIDAS and Wallet context. Declining would avoid unsupported requirements and legal overreach. Compared with Disposition B, however, it would close the question without retaining the assurance, GDPR, and Wallet-profile gaps as explicit future decisions, despite the ticket raising those topics.

### Recommendation

**Recommended disposition:** B

Disposition B best balances the ticket's general clarification request with the current source evidence: PR #99 explains the conditional eIDAS authentication requirement and Wallet role, while deliberately avoiding unsupported universal assurance mappings or an unselected Wallet profile. It also leaves detailed GDPR analysis as a separate decision. This recognizes that relevant work is in the branch without claiming the open PR is merged or Jira resolved. Disposition A would introduce specific obligations without an agreed mapping or profile, while C would decline useful clarification already present in the PR. No change to the IG's environment-specific SMART/IUA scope is recommended.

## Next Steps

- The workgroup should decide whether the existing high-level text is sufficient for this ticket and update Jira only through the normal governance process.
- If further work is desired, scope separate decisions for an assurance mapping and its basis, the intended Wallet integration profile and applicable implementing acts, and the level and owner of GDPR analysis.
- Do not describe these possible additions as current requirements or change SMART/IUA selection without an explicit decision.

## Verification Checklist

- [x] Ticket description and local metadata reviewed; no comments or PR reference are present in the local ticket snapshot. Live Jira status/comments could not be checked (HTTP 403).
- [x] PR #99 current state, head, relevant commit, and source files were checked; PR is open and unmerged.
- [x] Current PR source coverage is distinguished from ticket linkage, merge state, and Jira resolution.
- [x] Published current-build page is identified as context only, not proof that the open PR is merged or Jira is resolved.
- [x] Dispositions A/B/C are specific and meaningfully distinct.
- [x] Recommendation is explicit, justified, and preserves environment-specific scope.
- [x] Assurance mapping, detailed GDPR analysis, and Wallet profile are identified as possible additions, not existing requirements.
