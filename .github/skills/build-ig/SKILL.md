---
name: build-ig
description: 'Run the full FHIR IG Publisher build lifecycle for the EU Health Data API IG: preflight, publisher update, Sushi generation, IG publish, QA validation, and failure triage. Use for build, rebuild, offline build, no-sushi build, and Docker-based publisher runs.'
argument-hint: 'Goal: build | update | notx | nosushi | docker | clean'
---

# Build IG

## What This Skill Produces
- A completed FHIR IG build using the repository-supported scripts.
- A concise build result report with:
  - selected execution mode
  - command path used
  - QA artifact status
  - first blocker and recommended next action (if failed)

## When To Use
- Build or rebuild the EU Health Data API Implementation Guide.
- Update publisher and regenerate output.
- Run in offline mode (`-tx n/a`) when terminology services are unavailable.
- Build in Docker to avoid host Java/tooling differences.

## FHIR IG Build Lifecycle
1. Preflight
- Confirm the IG working directory is the `eu-health-data-api/` fork subfolder (all build scripts live there).
- Confirm configuration files are present (`ig.ini`, `sushi-config.yaml`).

2. Publisher readiness
- Ensure `publisher.jar` is available in `input-cache/` or parent directory.
- Update publisher when requested or missing.

3. Build execution
- Run default build, offline build, no-sushi build, or Docker mode.

4. QA verification
- Validate build artifacts and QA outputs in `output/`.

5. Failure triage
- Identify first blocking error and map to fix category.
- Inspect HL7 IG Publisher source when error semantics are unclear.

## Decision Logic
1. If user asks for Docker, use Docker entrypoint.
2. Otherwise use local script entrypoints.
3. If terminology connectivity is unstable or user explicitly requests offline, use `notx`.
4. If user requests no FSH regeneration, use `nosushi`.
5. If publisher is missing or user asks to refresh it, run update first.

## Repository Commands
All commands run from the `eu-health-data-api/` fork subfolder:
```bash
cd eu-health-data-api
```

1. Publisher update
```bash
./_build.sh update
```

2. Default local IG build
```bash
./_build.sh build
```

3. Offline IG build (no terminology server)
```bash
./_build.sh notx
```

4. Build without Sushi
```bash
./_build.sh nosushi
```

5. Clean generated artifacts
```bash
./_build.sh clean
```

6. Docker publisher execution
```bash
./startDockerPublisher.sh
```

## Procedure
1. Preflight checks
- Confirm working directory is the `eu-health-data-api/` fork subfolder.
- Confirm required tools are available for chosen path:
  - local mode: `java`
  - docker mode: `docker`
- Confirm `ig.ini` and `sushi-config.yaml` are present.

2. Select execution mode
- default: `./_build.sh build`
- offline terminology: `./_build.sh notx`
- skip Sushi: `./_build.sh nosushi`
- containerized build: `./startDockerPublisher.sh`

3. Execute and collect evidence
- Record command used and mode selected.
- Capture first fatal error line if command fails.

4. Validate generated outputs
- Confirm these artifacts exist after run:
  - `output/qa.json`
  - `output/qa-time-report.json`
  - `output/qa-time-report.tsv`

5. Triage on failure
- Classify blocker as one of:
  - publisher missing/outdated
  - Java or Docker runtime/tooling
  - Sushi/FSH authoring issue
  - terminology server/connectivity
  - profile/invariant/content validation
- For parser/validator/publisher exceptions, inspect publisher source for root cause:
  - repository: `https://github.com/HL7/fhir-ig-publisher`
  - search by exact error text and related class/enum names seen in logs
  - record code location and expected allowed values/types from source
- Apply smallest targeted fix and rerun same mode.

## Publisher Source Root-Cause Workflow
1. Capture the first blocking error text exactly from build output.
2. Search `HL7/fhir-ig-publisher` for that exact text.
3. If not found, search for nearby class names, enum names, or method names in the stack trace/log context.
4. Determine authoritative behavior from source (allowed codes, expected type, or decision logic).
5. Map that behavior back to IG input (FSH/JSON/config) and apply the smallest fix.
6. Rebuild in the same mode and report source evidence used.

## Completion Checks
- Build command exits successfully.
- `output/qa.json` exists and was updated in current run.
- `output/qa-time-report.json` exists.
- Summary includes mode, command, status, and next action.

## Guardrails
- Prefer existing repo scripts over ad-hoc command variants.
- Do not delete generated folders unless user requested cleanup.
- For connectivity failures, switch to `notx` instead of retry loops.
