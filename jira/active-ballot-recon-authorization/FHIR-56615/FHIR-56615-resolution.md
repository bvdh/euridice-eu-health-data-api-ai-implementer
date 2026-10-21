# Proposed Resolution for [FHIR-56615](https://jira.hl7.org/browse/FHIR-56615)

## Ticket Summary
| Field | Value |
|-------|-------|
| Key | [FHIR-56615](https://jira.hl7.org/browse/FHIR-56615) |
| Issue Type | Change Request |
| Summary | SMART should be preferred not mandatory |
| Status | Waiting for Input |
| Resolution | Unresolved |
| Priority | Medium |
| Reporter | [Giorgio Cangioli](https://jira.hl7.org/secure/ViewProfile.jspa?name=giorgio) |
| Assignee | [Bas van den Heuvel](https://jira.hl7.org/secure/ViewProfile.jspa?name=bvdh) |
| Created | 2026-04-29 |
| Updated | 2026-06-10 |
| Specification | EU Health Data API (R4) (FHIR) |
| Raised in Version | 1.0.0-ballot |
| Work Group | HL7 Europe |
| Related Page(s) | Authorization |
| Grouping | Not recorded in the local ticket |

## Description
The ticket questions whether the proposed SMART-on-FHIR authorization approach is sufficiently clarified against eIDAS, European Digital Identity Wallet, and GDPR-related concerns. It asks for possible clarification of eIDAS assurance-level mapping, Wallet integration, and GDPR adaptations, and asks the workgroup to consider that SMART not be mandatory. The complete local description is in [FHIR-56615.md](FHIR-56615.md).

## Current Source Baseline
The requested ballot-reconciliation source is the `ballot-recon-authorization` logical worktree, clean at commit `019276d397944036d1e502a2acddb3d5e56e158c` dated 2026-10-08. The relevant current sources are [authorization.md](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/authorization.md) and [ehds-auth-summary.md](../../../eu-health-data-api-ballot-recon-auth/doc/ehds-auth-summary.md). The commit identifies the snapshot examined; it is not ticket-linked implementation evidence.

## Implementation Status
**Current disposition state: Pending.** The ticket metadata says `Waiting for Input` and `Unresolved`. The local source ticket contains no comments, PR links, commit hashes, or other implementation evidence; no ticket-linked implementation evidence was found elsewhere in the local workspace. Do not infer formal implementation from the current branch text.

The identified branch snapshot does contain relevant current authorization and regulatory content, described below. This establishes what is present in that source snapshot only; it does not establish that this ticket caused, adopted, or completed that work. Jira remains `Waiting for Input` / `Unresolved` absent ticket-linked evidence or a Jira status change.

## Related Tickets
No related ticket keys or parent ticket are recorded in the local ticket metadata.

## Current Build References
- [Authorization](https://hl7.eu/fhir/health-data-api/current-build/en/authorization.html) — public current-build publication context and a page-level locator for the ticket's related page only. It is not evidence that the commit-pinned ballot-reconciliation text is included in that publication or that this ticket is implemented.
- **Mapping gap:** no verified section-anchor mapping establishes that the current-build page contains the examined branch snapshot's EHDS identification, Wallet implementer notes, or environment-specific SMART/IUA selections. The authoritative evidence for this analysis is the commit-pinned local source above.

## Disposition Analysis
The ticket asks for EU-regulatory clarification and suggests SMART should not be mandatory. The examined authorization page already selects a protocol by environment rather than making SMART universal: it says authorization for MyHealth@EU is outside this IG's scope and recommends IHE IUA alignment; recommends IHE IUA for the National Interoperability Infrastructure where preconfigured participants need user or patient claims; requires SMART App Launch for Wellness Applications; and requires SMART for Healthcare Provider deployments. Within those latter environments, it specifies interactive SMART flows and capability sets, and distinguishes pre-authorized SMART Backend Services. IUA claims are explicitly distinguished from OAuth scopes. These are the snapshot's actual choices and must not be silently weakened by a general “SMART preferred” statement.

The branch's EHDS discussion covers electronic identification and authentication, proxy and representation, security, and logging. The maintained [EHDS authorization summary](../../../eu-health-data-api-ballot-recon-auth/doc/ehds-auth-summary.md) identifies [EHDS Articles 12](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=OJ:L_202500327#art_12) and [16](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=OJ:L_202500327#art_16), [eIDAS Article 6](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32014R0910#art_6), and [Annex II section 3.1](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=OJ:L_202500327#anx_2) for identification; [Recital 7](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=OJ:L_202500327#rct_7) for alignment with Wallet technical specifications; [Article 4(2)-(3)](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=OJ:L_202500327#art_4) and [Recital 21](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=OJ:L_202500327#rct_21) for proxy and representation; [Articles 30](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=OJ:L_202500327#art_30), [36](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=OJ:L_202500327#art_36), and [73](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=OJ:L_202500327#art_73), [Recital 112](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=OJ:L_202500327#rct_112), and [Annex II section 3](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=OJ:L_202500327#anx_2) for security and logging. It characterizes itself as a factual summary, not legal advice, and notes implementing-act dependencies.

The page further says that, where the environment requires EHDS electronic identification, the Authorization Server SHALL authenticate interactive SMART or IUA authorization-code users using an eIDAS-recognized means before authorization; this does not apply to pre-authorized SMART Backend Services using `client_credentials`. A Wallet may provide the identification result, and OpenID for Verifiable Presentations 1.0 MAY be used, but the IG selects no presentation format, credential schema, or Wallet-to-Authorization-Server profile. Its implementer notes distinguish binding eIDAS rules from the informative ARF, record voluntary/minimum-data conditions, describe when an Authorization Server is a Wallet Relying Party, and say High assurance applies to PID rather than every attestation. They do not map eIDAS assurance levels to SMART flows. The page also explicitly says no Wallet-to-SMART profile exists.

Neither named source contains a detailed GDPR analysis or GDPR-specific adaptations; the page only keeps consent, audit, identity, policy, and authorization distinct and states that a token does not itself establish consent or lawful basis. Thus the ticket's “SMART not mandatory” concern is substantially reflected in the current environment-specific source, but the requested eIDAS assurance mapping, selected Wallet integration profile, and detailed GDPR treatment remain open. Source presence is not ticket closure or proof of ticket-linked implementation.

## Proposed Dispositions
### Disposition A: Accept As Requested
#### Proposal
Clarify that SMART is not a universal requirement across all environments, while retaining the existing SMART `SHALL` requirements for Wellness Applications and Healthcare Provider deployments and the current IUA recommendations for other environments. Do not add detailed eIDAS assurance, Wallet-to-SMART, or GDPR guidance under this disposition.

#### Justification
This accepts the ticket's request to avoid presenting SMART as mandatory everywhere without changing the current environment-specific conformance targets. It is a narrow editorial resolution; it leaves the ticket's regulatory clarification questions for later work. Any change to the named environment requirements would require a separate explicit workgroup decision.

### Disposition B: Alternative Approach
#### Proposal
Recognize that the current source already selects SMART or IHE IUA by environment and does not make SMART universally mandatory. Retain SMART `SHALL` for Wellness Applications and Healthcare Provider deployments, IHE IUA recommendations for MyHealth@EU and the National Interoperability Infrastructure under the stated conditions, and the stated SMART interactive and Backend Services flows. Keep the EHDS/eIDAS account factual and preserve the separation of identification, authorization decisions, claims/scopes, consent, audit, and legal basis. Record eIDAS assurance-level mapping, a selected Wallet integration profile, and detailed GDPR analysis/adaptations as unresolved; pursue them only with a concrete requirement and supporting authority.

#### Justification
This addresses the ticket's preference without obscuring the current conformance direction or claiming that EHDS mandates a particular OAuth profile. The source already describes the relevant EHDS identification, proxy, security, and logging provisions, and includes Wallet implementer notes, but deliberately leaves the exact assurance mapping and Wallet-to-Authorization-Server profile unselected. It does not provide detailed GDPR analysis. Treating these as gaps is more accurate than implying that SMART/IUA choice resolves them. Any change to an environment's normative selection remains a separate workgroup decision.

### Disposition C: Decline
#### Proposal
Decline this change request and make no further clarification to the authorization page or environment-specific protocol selections.

#### Justification
The current draft already distinguishes environments and includes factual discussion of eIDAS and the Wallet, so the workgroup could consider the request sufficiently addressed. However, the ticket specifically asks for regulatory clarity, and the existing material does not settle assurance-level mapping, a Wallet-to-SMART profile, or GDPR-specific adaptations. Declining without recording these limits risks readers treating open questions as resolved.

### Recommendation
**Recommended disposition:** B

Record the source's existing environment-specific selection as the proposed direction, rather than changing it under a universal “preferred” formulation: SMART is required for Wellness Applications and Healthcare Provider deployments; IHE IUA is recommended for MyHealth@EU and conditionally for the National Interoperability Infrastructure. This is preferable to A because the ticket also asks regulatory questions that the current source only partially answers; B retains those gaps for explicit workgroup disposition. It is preferable to C because the remaining assurance, Wallet-profile, and GDPR questions are not resolved by the existing text. Jira remains `Waiting for Input` / `Unresolved`, and no ticket-linked PR, commit, or comment evidence was found, so this recommendation does not assert the request has been formally applied.

## Next Steps
- Confirm in the workgroup that the source's environment-specific conformance direction is the intended disposition; any change to the SMART `SHALL` requirements requires explicit approval.
- Decide whether to scope additional work for eIDAS assurance-level mapping, a selected Wallet integration profile, or detailed GDPR analysis/adaptations; identify authoritative requirements before drafting normative changes.
- If the branch text is published, update the publication-context mapping with verified anchors. Do not use the public current-build page as proof of this source snapshot or of ticket implementation.
- Record ticket-linked PR, commit, or comment evidence if it becomes available; do not change the Jira implementation state based solely on the branch snapshot.

## Verification Checklist
- [x] Ticket metadata and description reviewed; the local ticket contains no comments.
- [x] Current authorization and EHDS summary reviewed at the stated clean commit and date; no ticket-linked PR or commit evidence found.
- [x] Environment-specific protocol choices and EHDS/eIDAS/Wallet content summarized with local source links; absent assurance mapping, selected Wallet profile, and detailed GDPR treatment stated.
- [x] Public current-build page identified as publication context only; branch-to-publication anchor mapping gap explicitly noted.
- [x] Dispositions A, B, and C are specific and meaningfully distinct.
- [x] Recommendation is explicit and distinguishes branch-source content from Jira status and ticket-linked evidence.
- [x] Unresolved regulatory questions are identified without treating source presence as ticket completion or inferring requirements from EHDS.