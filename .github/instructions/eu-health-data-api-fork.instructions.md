---
description: "Repo layout, build commands, and authoring conventions for the eu-health-data-api FHIR IG subtree. Apply when editing any file under eu-health-data-api/."
applyTo: "eu-health-data-api/**"
---

# eu-health-data-api Fork

`eu-health-data-api/` is a plain fork copy of `euridice-org/eu-health-data-api` — the HL7 Europe /
IHE Europe **EU Health Data API** Implementation Guide. It has its own git repository; there is no
submodule or subtree link to the outer AI-implementer repo.

## IG Identity

- Package id: `hl7.fhir.eu.health-data-api`
- Canonical: `http://hl7.eu/fhir/health-data-api`
- Name: `EuHealthDataApi` — Title: `EU Health Data API`
- FHIR version: R4 (4.0.1)
- Domain: a composition/transport IG for EHDS Article 15 — it references separate HL7 Europe content
  IGs and composes IHE MHD (document exchange), IHE PDQm (patient matching), HL7 SMART/IHE IUA
  (authorization), and HL7 IPA (resource access). It does not define clinical data models.

## Directory Layout

```
eu-health-data-api/
├── input/
│   ├── fsh/                 ← FHIR Shorthand source (Actors, capabilitystatements/, examples/, mhd/, rulesets/)
│   ├── pagecontent/         ← narrative markdown pages
│   ├── includes/            ← include snippets
│   ├── images/ images-source/
│   └── ignoreWarnings.txt
├── ig-template/            ← custom IG Publisher template
├── sushi-config.yaml       ← SUSHI config (id, canonical, dependencies, pages)
├── ig.ini                  ← IG Publisher config
├── _build.sh               ← build entry point
└── output/                 ← generated (do not hand-edit)
```

## Build Commands

Run from inside `eu-health-data-api/`:

```sh
./_build.sh update   # refresh publisher.jar when missing/outdated
./_build.sh build    # SUSHI + IG Publisher
./_build.sh notx     # offline build (no terminology server)
./_build.sh nosushi  # skip SUSHI, use pre-generated resources
./_build.sh clean    # remove generated artifacts
./startDockerPublisher.sh  # containerized build
```

## Authoring Rules

- Treat `input/fsh/**` files as FHIR Shorthand.
- Treat everything under `output/` as generated and read-only unless the user explicitly asks otherwise.
- Keep changes minimal and scoped; prefer editing source under `input/` and rebuilding.
- Dependencies are declared in `sushi-config.yaml` (e.g. `hl7.fhir.eu.base`, `ihe.iti.mhd`,
  `ihe.iti.pdqm`, `hl7.fhir.uv.ipa`); confirm versions there before adding cross-references.
