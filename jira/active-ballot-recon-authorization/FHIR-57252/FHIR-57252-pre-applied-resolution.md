# Pre-applied Resolution for [FHIR-57252](https://jira.hl7.org/browse/FHIR-57252)

## Evidence and PR State

- Ticket analysis: [FHIR-57252-resolution.md](./FHIR-57252-resolution.md) (refreshed against current source and PR state on 2026-10-22; quality gate: PASS-WITH-NOTES)
- PR: [PR #99 — Eu health data api ballot recon authorization](https://github.com/euridice-org/eu-health-data-api/pull/99) — Open; GitHub reports head `c0e4af73c30331136bf3df722e988cfd3cc48d38`, targeting `main`, last updated 2026-10-21. For this proposed resolution, the PR changes are treated as applied. Its authorization-page changes do not add FAST Security support. The local branch is two commits ahead of the PR head; those commits do not change the authorization page.

## Proposed Disposition

**Not Persuasive with Modification**

**Rationale:** The ticket's recorded comment recommends not including FAST Security until the foundational framework is in place and the security-framework discussion is more stable. Modify the requested action from inclusion in this release to deferral: the group is open to considering FAST/UDAP extensions in a future version. This does not imply current support, promise future adoption, or conclude that FAST is technically incompatible.

## Proposed Resolution Text

For this version, the group will focus on establishing the base authorization framework. The group is open to considering FAST/UDAP extensions in a future version of this specification. FAST/UDAP is not included in the current authorization guidance, and this deferral does not indicate that the approach is technically incompatible or permanently excluded. [PR #99 — Eu health data api ballot recon authorization](https://github.com/euridice-org/eu-health-data-api/pull/99) revises the authorization guidance around environment-specific SMART App Launch 2.2 and IHE IUA Revision 2.5 selections, but does not add FAST/UDAP support. Any future proposal should define its scope and how it relates to the selected authorization approaches before adding conformance requirements.

## Proposed Change Category

**Category:** No current IG change; the disposition is deferral.

**Rationale:** This proposed resolution records the group's future openness and current focus; it does not add FAST/UDAP content or behavior. No controlled category is assigned to this deferral.

## Proposed Change Impact

**Impact:** No current conformance impact; future impact remains to be assessed.

**Rationale:** The deferral does not change the current SMART/IUA guidance or create FAST-related conformance requirements. Conformance and interoperability impacts would need assessment if a future version adopts a defined FAST/UDAP extension.
