---
description: "Workspace layout, build entry point, and AI/automation pipeline for the EU Health Data API AI-implementer repo. Apply when working on root-level automation, jira artifacts, or .github configuration. Do NOT apply when editing files inside eu-health-data-api/ — that subtree has its own instruction file."
applyTo: "{jira/**,.github/**}"
---

# Repo Layout

This repository separates AI/automation tooling from the IG source.

```
/                              ← automation root (this instruction applies here)
├── jira/                      ← local Jira ticket markdown (open/, closed/, pr/, history/) + sync scripts
├── .github/
│   ├── instructions/          ← Copilot instruction files (applyTo-scoped)
│   ├── skills/                ← Copilot skill files (build-ig, jira-sync, ticket-*, etc.)
│   └── agents/                ← Copilot agent files
└── eu-health-data-api/        ← FHIR IG content (separate instruction file applies here)
```

`eu-health-data-api/` is a **plain fork copy** of the upstream IG repository
(`euridice-org/eu-health-data-api`). There is no git subtree or submodule; upstream sync is done
manually. The outer repository is `bvdh/euridice-eu-health-data-api-ai-implementer` and stays on
`main`.

---

# Building the IG

Always `cd` into `eu-health-data-api/` before running any build command.

```sh
cd eu-health-data-api
./_build.sh build    # standard build
./_build.sh notx     # offline (no terminology server)
```

Never run build scripts from the repo root. Use the `build-ig` skill for the full build lifecycle,
QA validation, and failure triage.

---

# Jira Automation

- Ticket markdown lives under `jira/{open,closed,active-<branch>}/FHIR-XXXXX/`.
- `jira/sync-jira-tickets.mjs` and `jira/sync-jira-from-url.mjs` (plus `package.json`) drive the
  `jira-sync` skill; run `npm install` in `jira/` once to install `cheerio` and `xlsx`.
- The Jira scope is `project = FHIR AND Specification = "EU Health Data API (R4) (FHIR) [FHIR-eu-health-data-api]"`.

---

# Conventions

- Build scripts live inside `eu-health-data-api/`; automation lives in `.github/` and `jira/`.
- When adding a new instruction file, place it in `.github/instructions/` and set a precise
  `applyTo` glob so it does not conflict with this file or the `eu-health-data-api/` instruction file.
- Branch context (logical branch → fork worktree) is resolved by the `branch-context-management` skill.
