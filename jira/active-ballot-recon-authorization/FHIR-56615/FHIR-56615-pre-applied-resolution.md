# Pre-applied Resolution for [FHIR-56615](https://jira.hl7.org/browse/FHIR-56615)

## Evidence and PR State
- Ticket analysis: `FHIR-56615-resolution.md` (refreshed against current source and PR state on 2026-10-22; quality gate: PASS-WITH-NOTES).
- PR: [PR #99 — Eu health data api ballot recon authorization](https://github.com/euridice-org/eu-health-data-api/pull/99) — **OPEN**, base `main`, head `c0e4af73c30331136bf3df722e988cfd3cc48d38`. Verified with `gh` on 2026-10-22; no checks reported. PR #99 contains related authorization work but does not specifically identify FHIR-56615 and does not include the three current uncommitted narrative clarifications described below.
- Current working-tree source: concise GDPR clarifications are present in `authorization.md`, `usecase-health-data-portal.md`, and `actors.md`; they are not committed or included in PR #99's current head.

## Proposed Disposition
**Persuasive with Modification**

**Rationale:** The authorization source reflects the request not to make SMART universal: protocol selection is environment- and flow-specific, and IHE IUA is recommended for certain environments. SMART remains specified for particular flows, including interactive Wellness Application access to an HDAS or HPAS. The current worktree adds three concise, informative GDPR clarifications: technical authentication/API authorization do not determine the GDPR Article 6 lawful basis or Article 9(2) condition; HDAS service preferences are separate from the processing legal basis, which this IG does not define; and technical actor roles are not intended to determine GDPR controller/processor status. These statements do not assign a legal basis, condition, or role, and do not add protocol requirements; they are not yet included in PR #99. The supplied assurance-level analysis finds that eIDAS Article 8(3) and Implementing Regulation (EU) 2015/1502 define criteria for identification schemes but do not themselves assign a level to an EHDS service or data type, and its EHDS-specific review is provisional. Accordingly, this proposal makes no assurance-level assignment and selects no Wallet integration profile. The disposition retains the source's specific SMART/IUA conformance choices and treats the detailed regulatory questions as unresolved. The PR is not ticket-specific evidence of a Jira disposition; the local ticket remains `Waiting for Input` / `Unresolved`.

## Proposed Resolution Text
The request is persuasive with modification. The EU Health Data API does not require SMART for every environment: the authorization approach selects SMART App Launch or IHE IUA according to the environment and flow. This does not remove the existing SMART requirements and recommendations for the specific use cases identified in the authorization page, including interactive Wellness Application access to an HDAS or HPAS. The related authorization changes are in [PR #99 — Eu health data api ballot recon authorization](https://github.com/euridice-org/eu-health-data-api/pull/99), which is open and has not been merged. The current local source wording also clarifies that technical authorization does not determine the GDPR legal basis or Article 9(2) condition, that service preferences are separate from that legal basis, and that technical actor roles are not intended to determine GDPR roles; these uncommitted additions are not in PR #99's current head.

### eIDAS assurance-level mapping
The authorization page describes eIDAS-recognised authentication in relevant interactive flows and references eIDAS Article 8 and Implementing Regulation (EU) 2015/1502. Those provisions define assurance-level criteria for electronic identification schemes; the supplied EHDS analysis does not establish which level, if any, applies to a particular EHDS service, data type, or SMART flow, and identifies its EHDS review as provisional. This resolution therefore assigns and recommends no assurance level. A level should not be stated until the applicable EHDS, other EU, and national requirements have been verified.

### European Digital Identity Wallet integration
The authorization page says a Wallet may be used as an authentication means and that OpenID for Verifiable Presentations may be used, but the IG selects no presentation format, credential schema, or Wallet-to-Authorization-Server profile. This resolution records that Wallet use is possible within the described authentication context, without selecting or implying a standardized Wallet integration.

### GDPR constraints and adaptations
The current working-tree source distinguishes technical authentication/API authorization from the GDPR legal basis and Article 9(2) condition, states that HDAS service preferences are separate from the processing legal basis and that the IG does not define it, and says technical actor roles are not intended to determine GDPR controller/processor status. These concise statements are informative: they do not set a lawful basis, condition, party-role allocation, consent workflow, or SMART protocol requirement. They are uncommitted and are not included in PR #99's current head. The IG still does not provide detailed GDPR-specific constraints or adaptations for SMART; further guidance should be separately scoped and supported by applicable authority.

## Proposed Change Category
**Category:** Clarification (proposed; no controlled category value is recorded in the local ticket).

**Rationale:** The proposal clarifies that the IG's protocol choices are environment- and flow-specific and adds informative boundaries for GDPR lawfulness, service preferences, and technical roles without changing protocol requirements. It expressly makes no assurance-level assignment while the applicable EHDS requirements have not been fully verified, does not add a Wallet integration profile, and leaves detailed GDPR adaptations unresolved.

## Proposed Change Impact
**Impact:** Substantive (proposed; no controlled impact value is recorded in the local ticket).

**Rationale:** Although the clarification does not make SMART universal or remove its use in identified scenarios, describing the applicable protocol choices affects implementers' understanding of conformance for particular environments and flows. The existing SMART `SHALL`/`SHOULD` statements remain in force as written.
