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
The explicit implementation worktree is `eu-health-data-api-ballot-recon-auth`, on branch `eu-health-data-api-ballot-recon-auth`, currently at local commit `1638e75b81a8c43126ab44eb2f3bba92b15190b2` (2026-10-21). The worktree has uncommitted modifications in two unrelated include files and three relevant narrative pages: `authorization.md`, `usecase-health-data-portal.md`, and `actors.md`. These pages now add concise, informative GDPR boundaries: technical authentication/API authorization do not determine the Article 6 lawful basis or Article 9(2) condition; service preferences are separate from the legal basis, which this IG does not define; and the actor narrative says its technical roles are not intended to determine GDPR controller/processor status. These working-tree edits are not included in PR #99's current head `c0e4af73c30331136bf3df722e988cfd3cc48d38`. The EHDS summary, computable actor definitions, and Resource Access Provider CapabilityStatement remain unchanged from that PR head.

The matching upstream PR is [PR #99 — Eu health data api ballot recon authorization](https://github.com/euridice-org/eu-health-data-api/pull/99). It is **OPEN**, not merged, and its base is `main`; the latest GitHub state checked on 2026-10-22 reports no checks. Its description says it relates to authorization-related tickets but does not identify FHIR-56615 specifically. Relevant source changes include [authorization.md](../../../eu-health-data-api-ballot-recon-auth/input/pagecontent/authorization.md), [ehds-auth-summary.md](../../../eu-health-data-api-ballot-recon-auth/doc/ehds-auth-summary.md), [Actors.fsh](../../../eu-health-data-api-ballot-recon-auth/input/fsh/Actors.fsh), and [CapabilityStatementResourceAccessProvider.fsh](../../../eu-health-data-api-ballot-recon-auth/input/fsh/capabilitystatements/CapabilityStatementResourceAccessProvider.fsh). Thus it is relevant implementation evidence, not proof of a ticket-specific Jira disposition.

## Implementation Status
**Current disposition state: Pending.** The local ticket record says `Waiting for Input` and `Unresolved`; it contains no comments, PR links, commit hashes, or other ticket-linked implementation evidence. PR #99 is relevant to the ticket's subject but does not specifically identify this ticket. Do not infer a formal Jira resolution or ticket-specific acceptance from the branch or PR.

The current authorization page states that the IG applies SMART App Launch and IHE IUA as selected for each environment, and explicitly says its choices are environment-specific rather than an EHDS-wide requirement to use SMART. MyHealth@EU is outside this IG's authorization scope, with IUA alignment recommended. For selected preconfigured National Interoperability Infrastructure endpoints, IUA is recommended conditionally and SMART Backend Services may be used if its applicability conditions are met; the page does not require IUA on every endpoint. For interactive Wellness Application access to an HDAS or HPAS, the page specifies SMART App Launch; it also retains distinct SMART recommendations and requirements for other Wellness and Healthcare Provider scenarios. It does not make SMART universal.

The actor and CapabilityStatement clarifications reinforce that protocol selection. The generic Health Data API Authorization Client is a protocol-neutral role and does not itself claim IHE IUA or SMART conformance; separate IHE IUA Authorization Client, SMART App, and SMART Backend Service roles provide protocol-specific conformance. The generic Health Data API Resource Server is likewise distinguished from the selected IUA or SMART Resource Server role. The Resource Access Provider CapabilityStatement requires a concrete deployment to declare exactly one authorization security-service coding and says it must not advertise both unless a future profile defines dual conformance. The authorization page similarly selects one profile per Resource Server endpoint while allowing different endpoints to select different profiles. These clarifications avoid implying that IUA and SMART requirements are simultaneously imposed on the same endpoint; they do not remove the explicitly selected SMART requirements for particular environments and flows.

The EHDS/eIDAS discussion covers electronic identification and authentication, proxy/representation, security, logging, and Wallet implementer considerations. It explains that eIDAS-recognised authentication may be used in interactive SMART or IUA authorization-code flows where required by the selected environment, while excluding pre-authorized SMART Backend Services `client_credentials`. It allows OpenID for Verifiable Presentations but does not select a presentation format, credential schema, or Wallet-to-Authorization-Server profile. It explains that an eIDAS assurance level does not itself authorize API access and that EHDS does not select a universal assurance level. The current worktree also makes three informative GDPR distinctions: technical authorization does not determine the lawful basis or Article 9(2) condition; HDAS preferences are separate from the legal basis itself; and the actor narrative says technical roles are not intended to determine GDPR roles. These statements do not select a lawful basis, condition, controller/processor allocation, or detailed GDPR adaptation. They remain uncommitted and are not part of PR #99's current head.

## Related Tickets
No related ticket keys or parent ticket are recorded in the local ticket metadata.

## Current Build References
- [Authorization](https://hl7.eu/fhir/health-data-api/current-build/en/authorization.html) — relevant page locator only; it is not evidence that the current branch or PR text has been published.
- **Mapping gap:** no verified section-anchor mapping establishes that this current-build page contains the examined branch's environment-specific SMART/IUA choices, eIDAS/Wallet discussion, or implementation notes. The authoritative evidence for this analysis is the checked-out branch source and PR head identified above.

## Disposition Analysis
The request not to treat SMART as mandatory everywhere is reflected in the source's environment-specific approach, which recommends IUA for some contexts and identifies scenarios in which SMART is selected. The protocol-neutral generic client role, separate IUA and SMART actors, and one-security-service-per-endpoint constraint further clarify that protocol-specific requirements are selected for an endpoint rather than combined by default. That does not remove all SMART `SHALL` or `SHOULD` statements within the named environments and flows. The current worktree's three informative GDPR statements clarify boundaries between technical authorization, service preferences, GDPR legal bases/conditions, and legal roles; they do not set deployment policy or provide detailed GDPR adaptations. The source also leaves the assurance-level mapping and a selected Wallet integration profile unresolved. Therefore the source supports the preference against a universal SMART requirement and now addresses limited GDPR boundary points, but does not fully answer all regulatory clarification questions.

The earlier authorization changes are part of open PR #99, but the three new GDPR narrative edits remain uncommitted in the local worktree and are not in the PR's current head. PR #99 is not merged, and its description does not link this work specifically to FHIR-56615. The local ticket remains `Waiting for Input` / `Unresolved`. Any workgroup proposal should distinguish current working-tree content, the PR's state, ticket-linked evidence, and formal Jira status.

## Proposed Dispositions
### Disposition A: Accept As Requested
#### Proposal
Accept the full request for additional clarification: document SMART's non-universal role; add eIDAS assurance-to-flow and Wallet integration detail only where applicable requirements can be verified; and specify GDPR constraints or adaptations only where supported by authoritative requirements. If the evidence does not establish a point, leave it explicitly unresolved rather than inferring it.

#### Justification
This option would address all three regulatory topics more fully than the current wording and the limited local GDPR clarifications. It requires further evidence and source work: the current materials do not establish a specific EHDS assurance level or a selected Wallet profile, and the local GDPR statements do not define deployment-specific adaptations.

### Disposition B: Alternative Approach
#### Proposal
Accept the principle that SMART is not mandatory across all environments, with modification: retain the source's protocol-neutral generic actors, distinct protocol-specific IUA and SMART roles, and one selected security profile per endpoint; retain its explicit environment- and flow-specific SMART `SHALL`/`SHOULD` requirements and conditional IUA recommendations; include the three current informative GDPR boundary clarifications without adding protocol requirements; and identify eIDAS assurance mapping, a selected Wallet integration profile, and detailed GDPR adaptations as unresolved rather than adding unsupported requirements.

#### Justification
This reflects the existing source more precisely than a broad preference statement: the generic authorization role alone does not imply SMART conformance, endpoint deployments select one protocol profile, and the IG still selects SMART for particular interactive use cases. It also preserves the source's factual regulatory and Wallet guidance without suggesting that it defines an assurance mapping, a Wallet protocol profile, or GDPR compliance criteria that are not present.

### Disposition C: Decline
#### Proposal
Decline the requested clarification and make no further statement about SMART's scope or the remaining eIDAS, Wallet, and GDPR questions.

#### Justification
The source already describes environment-specific protocol choices and relevant regulatory context. However, declining without explicitly distinguishing those choices from a universal SMART mandate could leave the ticket's concern unclear and would not acknowledge that the assurance mapping, Wallet integration profile, and detailed GDPR treatment remain open.

### Recommendation
**Recommended disposition:** B

The alternative approach best captures the actual source: SMART is not an EHDS-wide or universal IG requirement, the generic client actor does not imply SMART conformance, and each endpoint selects its protocol profile; SMART nevertheless remains specified for particular environments and flows. It includes the three informative GDPR boundary clarifications in the local worktree, while acknowledging that they do not establish a legal basis, an Article 9 condition, party roles, or detailed GDPR adaptations. The eIDAS assurance mapping and selected Wallet profile also remain unresolved. Option A risks implying that the existing material fully satisfies the request; option C would leave the non-universal scope and unresolved gaps less clear. PR #99 is open and relevant to the broader authorization source but does not include the current uncommitted clarifications or specifically identify this ticket; Jira remains `Waiting for Input` / `Unresolved`.

## Next Steps
- Confirm that the environment- and flow-specific SMART/IUA selections are the intended workgroup disposition; any change to their normative strength requires an explicit decision.
- Decide whether to include the current uncommitted GDPR narrative clarifications in PR #99 or another implementation PR.
- Decide whether to scope additional work for eIDAS assurance-level mapping, a Wallet integration profile, or detailed GDPR analysis/adaptations, and identify the applicable authoritative requirements first.
- Record a ticket-specific PR, commit, comment, or Jira status update if one becomes available; do not treat PR #99 or its open status as proof that FHIR-56615 is formally resolved.
- Update publication context only after verifying that the examined authorization content appears in the current build.

## Verification Checklist
- [x] Local ticket metadata and description reviewed; no comments or implementation links are recorded in the local ticket file.
- [x] Relevant source reviewed at the current local branch commit and compared with PR #99's current head; current uncommitted narrative changes are distinguished from the PR.
- [x] PR #99 state, URL, base, head and check status verified through `gh`; it is open and not merged.
- [x] Environment-specific SMART/IUA choices and EHDS/eIDAS/Wallet content summarized; limited informative GDPR clarifications, unresolved assurance mapping, Wallet profile, and detailed GDPR adaptations stated.
- [x] Current-build publication is identified as context only, with the source-to-publication mapping gap stated.
- [x] Dispositions A, B, and C are specific and meaningfully distinct; recommendation is explicit and distinguishes source/PR evidence from Jira status.
