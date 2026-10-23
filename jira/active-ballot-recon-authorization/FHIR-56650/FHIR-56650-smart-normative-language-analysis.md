# SMART Normative-Language Cross-Check for [FHIR-56650](https://jira.hl7.org/browse/FHIR-56650)

Checked 2026-10-22.

## Scope

This note compares the uppercase normative language in the published EU Health
Data API 1.0.0-ballot [Authorization Flow](https://hl7.eu/fhir/health-data-api/1.0.0-ballot/en/authorization.html#authorization-flow)
with the cited [SMART App Launch 2.2.0](https://hl7.org/fhir/smart-app-launch/STU2.2/)
Backend Services and Client Confidential Asymmetric requirements. It records
the user's direction that the IG will not be updated with the proposed
refinements. It does not change the ticket's resolution status.

## Cross-Check

- **System-to-system-only scope and authorization for all API transactions:**
  The ballot IG explicitly narrows its own scope to system-to-system
  authorization and states that authorization is required for all API
  transactions. SMART Backend Services is intended for pre-authorized access
  without runtime user authorization, but SMART also defines interactive SMART
  App Launch. The all-transactions statement and system-to-system-only boundary
  are local IG constraints, not general requirements imposed by SMART.
- **`client_credentials` and asymmetric client authentication:** The ballot's
  client-credentials flow using `private_key_jwt`, registered public keys, and
  validation of the signed client assertion aligns with SMART Backend
  Services and Client Confidential Asymmetric. Choosing this profile for the
  IG narrows the supported authorization approach compared with SMART as a
  whole, but is not a stricter requirement within that selected profile.
- **Discovery:** SMART requires an authorized FHIR endpoint to expose
  `/.well-known/smart-configuration`. The ballot's SHALL to publish discovery
  is consistent with SMART. Its conditional SHOULDs for advertising
  `token_endpoint_auth_methods_supported` and
  `token_endpoint_auth_signing_alg_values_supported` are not more restrictive
  than SMART's asymmetric-client discovery description, which identifies
  these metadata properties and their values when advertising
  `client-confidential-asymmetric`. The ballot also has an incomplete heading,
  “Resource Servers SHOULD advertise:”, with no item directly under it; the
  subsequent conditional SHOULDs are the only explicit metadata SHOULDs in
  that passage. They should not be interpreted as permission to omit metadata
  required by the underlying SMART profile, which the ballot says still
  applies.
- **Token presentation and scope enforcement:** Requiring a client to present
  an access token to protected resources and a Resource Server to enforce
  expiry and scope is consistent with the SMART Backend Services access flow.
  The ballot's specific scope lists are profile-level selections for this IG.
- **No user-level authorization in the selected flow:** Excluding user-level
  authorization from this ballot flow is narrower than SMART Backend Services
  overall, which allows `user/` or `patient/` scopes when context is
  established out of band. This is a local profile boundary, not a general
  SMART prohibition.

## Conclusion

The list is **not uniformly more restrictive** than the SMART base
specification. The ballot selects a narrower system-to-system profile and
imposes local scope boundaries. Its main flow requirements otherwise align
with SMART Backend Services. The discovery SHALL is consistent with SMART;
the ballot's conditional discovery SHOULDs are not stricter than the cited
asymmetric-client discovery guidance and do not replace underlying SMART
conformance requirements.

No IG amendment is planned for these refinements, per the user's direction.
This cross-check does not establish that the requested FHIR-56650 Consumer
wording was implemented or accepted; the ticket's parameter reference remains
underspecified.

## References

- [FHIR-56650](https://jira.hl7.org/browse/FHIR-56650)
- [EU Health Data API 1.0.0-ballot — Authorization Flow](https://hl7.eu/fhir/health-data-api/1.0.0-ballot/en/authorization.html#authorization-flow)
- [SMART App Launch 2.2.0 — Backend Services](https://hl7.org/fhir/smart-app-launch/STU2.2/backend-services.html)
- [SMART App Launch 2.2.0 — Conformance and discovery](https://hl7.org/fhir/smart-app-launch/STU2.2/conformance.html#using-well-known)
- [SMART App Launch 2.2.0 — Client Confidential Asymmetric](https://hl7.org/fhir/smart-app-launch/STU2.2/client-confidential-asymmetric.html#discovery-requirements)
