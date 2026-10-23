# Pre-applied Resolution for [FHIR-56713](https://jira.hl7.org/browse/FHIR-56713)

## Evidence and PR State
- Ticket analysis: [FHIR-56713-resolution.md](./FHIR-56713-resolution.md) (verified against current source and PR state on 2026-10-22)
- PR: [PR #99 — Eu health data api ballot recon authorization](https://github.com/euridice-org/eu-health-data-api/pull/99) — Open; targets `main`; current PR head is `c0e4af73c30331136bf3df722e988cfd3cc48d38`. For this proposed resolution, the PR changes are treated as applied. Its merge state is `DIRTY`, and `gh pr checks` reported no checks. The local implementation branch is two commits ahead, but the Authorization page content is unchanged between the PR head and local branch head.

## Proposed Disposition
**Persuasive**

**Rationale:** The Authorization page removes the prior blanket statement that SMART Backend Services is authoritative over grouped IUA requirements when they differ. It instead distinguishes SMART App Launch, SMART Backend Services, and IHE IUA; selects profiles by environment and flow; and explicitly says the interactive SMART choice is not an EHDS-wide requirement. IUA remains an active option for the environments described, rather than being inaccurately reduced to background material. The ticket's requested clarification is therefore addressed by the source at the PR head.

## Proposed Resolution Text
This ticket is addressed by the Authorization page changes in [PR #99 — Eu health data api ballot recon authorization](https://github.com/euridice-org/eu-health-data-api/pull/99). The page distinguishes SMART App Launch and SMART Backend Services from IHE IUA, describes their respective roles, and selects the applicable profile by environment and flow rather than stating that SMART universally takes precedence over IUA. It clarifies that the environment-specific SMART choice is not an EHDS-wide requirement to use SMART, while retaining IUA as an active option for the stated MyHealth@EU alignment and qualifying national-infrastructure endpoints. The revised page also includes flow-specific recommendations and requirements, whose conformance impact should be considered as part of the workgroup's disposition. The ticket's current Triaged / Unresolved Jira status is unchanged by this proposal.

## Proposed Change Category
**Category:** Clarification

**Rationale:** The ticket does not record a Change Category. Clarification is proposed because the change removes an ambiguous cross-protocol precedence statement and explains the distinct roles and environment-specific applicability of SMART and IUA. This category is used in related local authorization ticket drafts.

## Proposed Change Impact
**Impact:** Substantive (proposed; compatibility is not determined by the ticket record).

**Rationale:** The ticket does not record a Change Impact. Although the request is framed as terminology clarification, the revised page replaces the former precedence statement with environment- and flow-specific guidance, including normative `SHOULD` and `SHALL` language that may affect conformance expectations for applicable interactive and system-to-system flows. A substantive impact is therefore proposed; whether the overall change is compatible with prior implementations requires workgroup assessment.
