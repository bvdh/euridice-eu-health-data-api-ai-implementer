# EU Wallet Expert Research Memory

Purpose: Keep concise, reusable findings from substantial EUDI Wallet research so
the agent can build on verified prior analysis instead of repeating it. This
file is a research index, not an authoritative source.

## Revalidation Rules

- Check `https://eudi.dev/latest/` before relying on technical-release details;
  capture the exact version/status and date checked.
- Recheck legal claims against applicable EUR-Lex texts and implementing acts.
- Update or mark an entry stale when its controlling source changes. Do not
  preserve unsupported conclusions as facts.
- Record public technical findings only; do not save full chat transcripts,
  personal data, or secrets.

## Research Entries

### OAuth 2.0 and Wallet Flows

- **Checked:** 2026-10-08
- **Question/scope:** What ARF v3.0.0 says about integrating the EUDI Wallet
  into OAuth 2.0 flows.
- **Reusable findings:** ARF v3.0.0 (latest release, dated 2026-07-21)
  explicitly describes PID/EAA issuance through OpenID4VCI as based on OAuth
  2.0. The Wallet Unit is the client; the issuer-side Authorization Server
  handles client authentication; authorization codes and access tokens are
  used. HAIP profiles OpenID4VCI for interoperability; TS3 and ETSI TS 119
  472-3 add EUDI-specific mechanisms. Remote presentation is a distinct
  OpenID4VP flow, with redirect/custom-URI or W3C Digital Credentials API
  transport; do not treat its credential response as a generic OAuth API
  access token. ARF section 3.11.1 allows a Relying Party to use the Wallet
  for user authentication only at the User's voluntary request and with
  minimum necessary data. ARF v3.0.0 does not specify a general pattern where
  a Wallet replaces an application's OAuth Authorization Server or acts as a
  generic OAuth identity provider. Keep that conclusion scoped to this ARF
  release and check other applicable profiles for a concrete deployment.
- **Sources:** ARF v3.0.0, sections 3.11.1, 4.3.3, 4.4.3, 5.7, and 5.8;
  Technical Specification 3.
  <https://eudi.dev/3.0.0/>
  <https://eudi.dev/3.0.0/main/03-roles-within-the-eudi-wallet-ecosystem/>
  <https://eudi.dev/3.0.0/main/04-high-level-architecture/>
  <https://eudi.dev/3.0.0/main/05-data-model-and-data-exchange-protocols/>
  <https://eudi.dev/3.0.0/technical-specifications/ts3-wallet-unit-attestation/>
- **Assumptions and limits:** This is an ARF-scope statement, not a claim
  that OAuth/OIDC integrations with Wallets are impossible or prohibited.
  OpenID4VCI and OpenID4VP standards and applicable implementing acts provide
  additional protocol details.
- **Revalidate when:** A newer ARF release or relevant implementing act/profile
  changes the issuance, presentation, or relying-party authentication model.

### EUDI Wallet Authentication with SMART App Launch

- **Checked:** 2026-10-08
- **Question/scope:** Whether EUDI Wallet identity checking can participate in
  a SMART OAuth 2.0 authorization flow.
- **Reusable findings:** This is architecturally composable, but these
  documents define no standardized EUDI-to-SMART integration profile. SMART
  App Launch 2.2 says the Authorization Server mediates access under local
  rules, may request end-user authorization, and does not dictate
  institutional policy; end-user authentication is outside SMART's scope.
  SMART's `openid` and `fhirUser` scopes can request an OIDC identity
  assertion, but do not specify EUDI Wallet authentication. A deployment can
  make its SMART Authorization Server (or upstream identity provider) an
  EUDI Relying Party, conduct an OpenID4VP wallet presentation during login,
  validate the response, bind the verified identity to its local user/account,
  then continue the normal SMART authorization-code + PKCE flow. That
  identity binding and resulting access decision are local policy, not
  supplied by the wallet presentation or SMART. Do not imply a wallet PID
  directly determines an EHR patient identifier or SMART permissions.
- **Sources:** SMART App Launch 2.2, App Launch and Authorization
  §§2.1.1, 2.1.3, 2.1.9; SMART scopes and launch context; ARF v3.0.0
  §§3.11.1, 5.7.4.
  <https://hl7.org/fhir/smart-app-launch/STU2.2/app-launch.html>
  <https://hl7.org/fhir/smart-app-launch/STU2.2/scopes-and-launch-context.html>
  <https://eudi.dev/3.0.0/main/03-roles-within-the-eudi-wallet-ecosystem/#3111-relying-parties>
  <https://eudi.dev/3.0.0/main/05-data-model-and-data-exchange-protocols/#574-remote-attestation-presentation-using-openid4vp-and-haip>
- **Assumptions and limits:** This describes a deployment composition, not
  conformance to a standard EUDI-SMART profile. Wallet authentication requires
  voluntary user action and minimum necessary data under ARF §3.11.1.
  Account linking, identity proofing, patient matching, authorization, and
  consent remain distinct deployment concerns.
- **Revalidate when:** SMART App Launch, the ARF, OpenID4VP/HAIP, or applicable
  EUDI implementing acts define a direct wallet-to-SMART profile or change
  authentication semantics.

Use this format for each substantial topic:

### <Topic>

- **Checked:** YYYY-MM-DD
- **Question/scope:**
- **Reusable findings:**
- **Sources:** Exact document versions/statuses, direct links, and sections.
- **Assumptions and limits:**
- **Revalidate when:**
