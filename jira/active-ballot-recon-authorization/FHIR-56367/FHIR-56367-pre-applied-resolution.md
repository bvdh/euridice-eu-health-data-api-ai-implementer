# Pre-applied Resolution for [FHIR-56367](https://jira.hl7.org/browse/FHIR-56367)

> **Resolution — Addressed**
>
> This ticket is addressed by the authorization clarifications in [PR #99](https://github.com/euridice-org/eu-health-data-api/pull/99). The Authorization section explains that, where the selected environment requires support for eIDAS-recognized electronic identification, the Authorization Server SHALL support user authentication using those means, directly or through an identity provider. This applies to interactive SMART or IUA authorization-code flows, not pre-authorized SMART Backend Services using `client_credentials`. It also clarifies that a Wallet may be used where applicable, without requiring every deployment to use one or defining a Wallet integration profile.
>
> The requirement is expressed at the Authorization Server and environment level rather than as a universal obligation on Access Providers. The Access Provider descriptions identify the applicable IUA or SMART Resource Server role and point to the environment-specific authorization requirements. This addresses the ticket’s intent while avoiding an overbroad eIDAS or Wallet requirement for deployments outside the EHDS access-service scope.
