# Copilot Instructions For EU Health Data API IG AI Tooling

Use these instructions when working in this repository.

## Repository Scope

- This repository is the AI tooling and orchestration workspace for the HL7 Europe / IHE Europe **EU Health Data API** IG.
- The IG content and build scripts are in the `eu-health-data-api/` fork subfolder (a plain fork copy of `euridice-org/eu-health-data-api`).
- Treat `eu-health-data-api/input/` as the single source of truth.
- Do not manually edit generated IG output under `eu-health-data-api/output/` unless the user explicitly asks.
- The two repositories are independent: the outer/orchestration repo is `bvdh/euridice-eu-health-data-api-ai-implementer`; the fork is `euridice-org/eu-health-data-api`.

## Start Here

- Use the most specific skill in `.github/skills/*/SKILL.md` for the requested task.
- Check available agents in `.github/agents/*` before orchestrating multi-step work.
- For IG structure and authoring context, reference `eu-health-data-api/README.md` and `eu-health-data-api/scope.md`.

## Canonical IG Command Order

Run all build commands from the `eu-health-data-api/` fork subfolder:

```bash
cd eu-health-data-api
./_build.sh update   # refresh publisher.jar when missing/outdated
./_build.sh build    # standard SUSHI + IG Publisher build
./_build.sh notx     # offline build (no terminology server)
```

Use `build-ig` for the full build lifecycle, QA validation, and failure triage.
Never run build scripts from the outer repo root.

## Common Task Mapping

- Build / rebuild / QA triage: `.github/skills/build-ig/SKILL.md`
- Documentation QA pass (spelling, links, profile-name integrity): `.github/skills/ig-qa-check/SKILL.md`
- Jekyll alias/link rendering checks: `.github/skills/ig-check-jeckyll-links/SKILL.md`
- Commit across outer + fork repos: `.github/skills/commit-in-both-repos/SKILL.md`
- Jira ticket sync: `.github/skills/jira-sync/SKILL.md`
- Jira ticket planning/execution: `.github/skills/ticket-implementation-plan/SKILL.md` and `.github/skills/ticket-execute-plan/SKILL.md`
- Propose a ticket resolution: `.github/agents/propose-ticket-resolution.agent.md`
- Compare/refresh skills against sibling ai-implementer repos: `.github/skills/sync-ai-implementers/SKILL.md`

## Branch Model

- The outer repository stays on `main`.
- Logical (ticket) branches are resolved by `branch-context-management`, which maps a branch to a fork worktree `eu-health-data-api-<safe-branch>` and falls back to the base `eu-health-data-api/` folder.

## Working Rules

- Keep changes minimal and scoped to the user's request or ticket.
- Prefer links to existing project docs over duplicating documentation text.
- When a skill defines required verification, run it and report pass/fail clearly.
- If verification cannot run, state exactly what is missing and why.

## Question Style

- Use `vscode_askQuestions` for constrained choices and decision points.
- Prefer click-based options over freeform prompts when possible.

## Jira Ticket References

- Always present a Jira ticket number in chat as a hyperlink to `https://jira.hl7.org/browse/<KEY>`.
- Example: `[FHIR-56785](https://jira.hl7.org/browse/FHIR-56785)`.
- Applies to single mentions, lists, and tables; never show a bare `FHIR-XXXXX` key in chat output.
- The Jira scope for this IG is: `project = FHIR AND Specification = "EU Health Data API (R4) (FHIR) [FHIR-eu-health-data-api]"`.
