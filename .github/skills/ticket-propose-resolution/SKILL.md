---
name: ticket-propose-resolution
description: 'Generate a proposed resolution for an indicated Jira ticket (FHIR-XXXXX) using local ticket markdown evidence. Use for workgroup-ready disposition options, recommendation drafting, and creation of jira/FHIR-XXXXX/FHIR-XXXXX-resolution.md.'
argument-hint: 'FHIR-XXXXX (for example: FHIR-56763)'
user-invocable: true
---

# Ticket Propose Resolution

Create an evidence-based proposed resolution document for one Jira ticket.

This skill analyzes ticket metadata, description, comments, and linked implementation evidence, then writes a structured proposal file:

- `jira/FHIR-XXXXX/FHIR-XXXXX-resolution.md`

## When To Use

- You have a specific ticket key and need a clear proposal for workgroup discussion.
- A ticket needs explicit disposition options (A/B/C) with recommendation.
- You want consistent resolution artifacts before implementation planning.

## Inputs

- Ticket key: `FHIR-XXXXX`
- Branch context (explicit if provided by caller; otherwise resolved by
   `branch-context-management` scripts)
- Ticket markdown (one of):
  - `jira/open/FHIR-XXXXX/FHIR-XXXXX.md`
   - `jira/active-<branch>/FHIR-XXXXX/FHIR-XXXXX.md`
  - `jira/closed/FHIR-XXXXX/FHIR-XXXXX.md`

## Output

- `jira/FHIR-XXXXX/FHIR-XXXXX-resolution.md` (in the same ticket directory as the source ticket file)

## Memory Artifact

- Outer repository memory file: `doc/ai-implementer-memory/ticket-skill-learnings.md`
- Purpose: store reusable patterns, preferred solution approaches, and best practices discovered while resolving tickets.
- Read and update this file relative to the outer AI-implementer repository root, regardless of the selected IG fork worktree.

## Workflow

### Step 0: Load Ticket Learnings Memory

1. Read `doc/ai-implementer-memory/ticket-skill-learnings.md` from the outer repository root if it exists.
2. Reuse relevant prior patterns (for example, common disposition rationale, evidence phrasing, and known decision heuristics).
3. If the file does not exist, create it under the outer repository's `doc/ai-implementer-memory/` directory at the end of execution.

### Step 0.1: Enforce Active Ticket Location

1. Resolve branch context using:
   ```bash
   eval "$(bash .github/skills/branch-context-management/scripts/resolve-branch-context.sh | sed 's/^/export /')"
   ```
2. Confirm the ticket exists at `jira/active-<branch>/FHIR-XXXXX/FHIR-XXXXX.md`.
3. During migration, if missing in branch-scoped active but present in
   ask the user to move it into `jira/active-<branch>/` first.
2. If the ticket is only in `jira/open/` or `jira/closed/`:
   - Stop and ask the user whether to move it to `jira/active-<branch>/` first.
   - Do not continue proposal generation until the location is confirmed or user explicitly overrides.

### Step 1: Locate and Load Ticket

1. Resolve `FHIR-XXXXX` under `jira/open`, `jira/active-<branch>` (or legacy `jira/active`), or `jira/closed`.
2. Read the ticket markdown file.
3. Extract metadata:
   - Key, Issue Type, Status, Resolution
   - Reporter, Assignee, Created
   - Parent key, Grouping, Related Sections/Artifacts (when present)

### Step 2: Extract Evidence

1. Capture the ticket description and all comment content.
2. Identify implementation evidence from comments:
   - PR links
   - Commit hashes/links
   - Related issue links
3. Record evidence exactly as found; do not infer missing implementation details.

### Step 2.1: Collect Current Build References (Required)

1. From ticket metadata and description, identify impacted/relevant sections and artifacts.
2. Add references to current build pages/anchors for those sections.
3. Prefer exact section anchors when available; otherwise link to the nearest relevant current build page.
4. If no reliable section can be mapped, record a short mapping-gap note under this section.

### Step 3: Determine Current Disposition State

Classify current state from status/resolution/evidence:

- `Applied`
- `Declined`
- `Alternative`
- `Pending`
- `Duplicate`

If evidence is ambiguous, classify as `Pending` and state what is missing.

### Step 4: Draft Proposed Dispositions

Produce three options:

1. **Disposition A: Accept as requested**
2. **Disposition B: Alternative approach**
3. **Disposition C: Decline**

Each option must contain:

- **Proposal**: specific action
- **Justification**: why it is reasonable

### Step 5: Select Recommendation

1. Choose `A`, `B`, or `C`.
2. Provide a direct rationale with trade-offs.
3. Reference concrete ticket evidence when available.

### Step 6: Write Resolution File

Write `jira/FHIR-XXXXX/FHIR-XXXXX-resolution.md` using this structure:

Notes:
- In the title, hyperlink the ticket key to Jira (`https://jira.hl7.org/browse/FHIR-XXXXX`).
- In `Ticket Summary`, the `Key` value must use the same Jira hyperlink.

```markdown
# Proposed Resolution for [FHIR-XXXXX](https://jira.hl7.org/browse/FHIR-XXXXX)

## Ticket Summary
| Field | Value |
|-------|-------|
| Key | [FHIR-XXXXX](https://jira.hl7.org/browse/FHIR-XXXXX) |
| Issue Type | ... |
| Status | ... |
| Resolution | ... |
| Reporter | ... |
| Assignee | ... |
| Created | ... |
| Grouping | ... |

## Description
...

## Implementation Status
...

## Related Tickets
...

## Current Build References
- [Section/Page title](https://hl7.eu/fhir/health-data-api/current-build/en/<page>.html#<anchor>) — why relevant
- [Section/Page title](https://hl7.eu/fhir/health-data-api/current-build/en/<page>.html#<anchor>) — why impacted

## Disposition Analysis
...

## Proposed Dispositions
### Disposition A: Accept As Requested
#### Proposal
...
#### Justification
...

### Disposition B: Alternative Approach
#### Proposal
...
#### Justification
...

### Disposition C: Decline
#### Proposal
...
#### Justification
...

### Recommendation
**Recommended disposition:** A|B|C

...

## Next Steps
...

## Verification Checklist
- [ ] Evidence reviewed
- [ ] Current build references included for impacted/relevant sections
- [ ] Dispositions are specific
- [ ] Recommendation is justified
```

### Step 7: Run Resolution Quality Gate (Required)

After writing `FHIR-XXXXX-resolution.md`, invoke the companion skill:

- `ticket-resolution-quality-check`

Use the same ticket key (`FHIR-XXXXX`) and apply any quality fixes it identifies.
The proposal is not complete until this quality gate is run.

### Step 8: Persist Reusable Learnings to Memory (Required)

Append concise bullets to `doc/ai-implementer-memory/ticket-skill-learnings.md` covering:

1. Repeated ticket patterns discovered.
2. Preferred solution/disposition approaches that worked well.
3. Best-practice wording or evidence conventions that improved quality.
4. Pitfalls to avoid next time.

Keep entries short, de-duplicated, and generic (no sensitive details).

## Quality Criteria

The proposal is complete only if all are true:

1. Ticket key resolves to a real local ticket file.
2. Proposal file path is correct and written in the ticket directory.
3. Disposition options A/B/C are all present and concrete.
4. Recommendation is explicit and justified.
5. Evidence claims are traceable to ticket content.
6. `ticket-resolution-quality-check` has been run and its findings are addressed.
7. Reusable learnings have been persisted to `doc/ai-implementer-memory/ticket-skill-learnings.md`.
8. `Current Build References` section exists and contains links for impacted/relevant sections (or an explicit mapping-gap note).

## Important Rules

- Do not edit specification source files while generating proposals.
- Do not invent evidence that is not present in ticket data.
- Do not overwrite unrelated ticket artifacts.
- If required fields are missing, record gaps under `Next Steps`.
- Ensure the ticket is in `jira/active-<branch>/`; if not, ask to move it before proceeding.

## Suggested Prompts

- `Create a proposed resolution for FHIR-56763.`
- `Generate disposition options and recommendation for FHIR-56574.`
- `Draft jira/FHIR-XXXXX/FHIR-XXXXX-resolution.md from ticket evidence.`
- `Create a proposed resolution for FHIR-56763, then run ticket-resolution-quality-check.`