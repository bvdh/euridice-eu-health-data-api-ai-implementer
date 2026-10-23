---
name: ticket-create-pre-applied-resolution
description: "Create a pre-applied Jira resolution artifact for a FHIR ticket from an up-to-date ticket analysis and current PR state. Use when drafting or saving a proposed disposition, resolution text, change category, and change impact."
argument-hint: "FHIR-XXXXX [optional PR URL or disposition]"
user-invocable: true
---

# Ticket Create Pre-applied Resolution

Create a structured, evidence-based pre-applied resolution proposal for work already applied in the relevant implementation branch. The artifact is proposed text for the user to copy into Jira; this skill does not update Jira or change the ticket's status.

## When to Use

- The user asks to draft or store the resolution of pre-applied work for a ticket.
- The user gives a Jira key such as `FHIR-56367`, with or without a PR link.
- The user asks to express a ticket as addressed, persuasive, or otherwise resolved by existing branch work.

## Inputs

- Required: Jira key in the form `FHIR-XXXXX`.
- Optional: PR URL, desired disposition wording, or target branch/worktree.
- By default, use the active ticket directory under `jira/active-<branch>/` and its matching implementation worktree. Resolve branch context with `branch-context-management`; do not silently use an unrelated fork.

## Procedure

1. **Resolve the ticket and target branch**
   - Locate the ticket markdown, its required resolution analysis, and the corresponding implementation worktree.
   - Confirm the target worktree and inspect its Git status. Preserve all existing changes.
   - If branch context is ambiguous or the ticket is not in the applicable active directory, follow `branch-context-management` and stop for clarification rather than choosing a different branch.

2. **Read evidence**
   - Read the ticket description, metadata, comments, and local resolution/status completely.
   - Require the corresponding `FHIR-XXXXX-resolution.md` analysis in the ticket directory. Read it and verify that it reflects the current implementation source and current PR state, including PR URL, status (open, merged, closed, or unavailable), and relevant head/source evidence.
   - Verify the PR with `gh` when a PR is known or discoverable. Record its current state; do not infer that a PR is merged from a local branch, commit, or prior analysis.
   - If the analysis is missing, stale, or inconsistent with the current PR/source state, stop before creating the pre-applied artifact. Refresh the ticket analysis using `ticket-propose-resolution` and its quality gate, then resume this workflow against the updated analysis.
   - Distinguish current source coverage from ticket-linked evidence and formal Jira status. A branch change or PR does not itself resolve or close a Jira issue.
   - Do not claim the whole ticket is addressed if the current analysis identifies material unimplemented requests. In that case, propose the appropriate disposition and clearly delimit the addressed work and remaining items.

3. **Draft the Jira-ready text**
   - Link the ticket key to its Jira URL in the title and include a link to the verified PR.
   - Propose exactly one applicable disposition using the workgroup vocabulary:
     - `Persuasive`
     - `Not Persuasive`
     - `Persuasive with Modification`
     - `Not Persuasive with Modification`
   - Include a rationale for the selected disposition grounded in the up-to-date ticket analysis and current PR/source evidence. Do not choose `Persuasive` merely because some related work exists.
   - Include the proposed Jira resolution text as ordinary prose under its own `## Proposed Resolution Text` section. Do not quote or blockquote this section.
   - When a verified PR supports the proposed change, include its Markdown link inline in the `Proposed Resolution Text` itself, not only in `Evidence and PR State`. Preserve accurate PR status wording and do not imply that an open PR has merged. Do not mention in the `Proposed Resolution Text` whether the work is committed, pushed, or merged; the PR link and its status convey that. Such local-state details belong only in `Evidence and PR State` or the chat report.
   - Include a proposed **Change Category** and **Change Impact**, each with a rationale for the selected value. Use the ticket's existing Jira values or repository's established vocabulary when known; if the appropriate value is uncertain, state the proposed value and uncertainty rather than inventing a controlled term. When the disposition is not persuasive and no change is proposed, say so and explain whether the category/impact are not applicable or are still being proposed for the already-applied change.
   - Describe concrete implemented behavior, the scope of its applicability, and any material request elements not implemented or left undecided.
   - Avoid overstating legal, standards, interoperability, implementation, or merge claims. Do not turn informative guidance into a normative obligation.
   - Use Markdown suitable for pasting into Jira; do not include repository-internal relative links that will not resolve in Jira.

4. **Save the artifact**
   - Create `jira/active-<branch>/FHIR-XXXXX/FHIR-XXXXX-pre-applied-resolution.md` beside the ticket's other artifacts.
   - Use the following structure. Keep the proposed resolution prose unquoted:

     ```markdown
     # Pre-applied Resolution for [FHIR-XXXXX](https://jira.hl7.org/browse/FHIR-XXXXX)

     ## Evidence and PR State
     - Ticket analysis: [FHIR-XXXXX-resolution.md](./FHIR-XXXXX-resolution.md) (verified against current source and PR state on YYYY-MM-DD)
     - PR: [PR #N — title](https://github.com/owner/repo/pull/N) — Open|Merged|Closed; relevant head/status evidence

     ## Proposed Disposition
     **[Select exactly one: Persuasive | Not Persuasive | Persuasive with Modification | Not Persuasive with Modification]**

     **Rationale:** ...

     ## Proposed Resolution Text
     This ticket is addressed by the changes in [PR #N — title](https://github.com/owner/repo/pull/N), which ...

     ## Proposed Change Category
     **Category:** ...

     **Rationale:** ...

     ## Proposed Change Impact
     **Impact:** ...

     **Rationale:** ...
     ```

   - Do not edit the ticket markdown, existing resolution proposal, consolidated ticket report, implementation source, or Jira itself unless separately requested.

5. **Validate and report**
   - Read back the created file and run `git diff --check` (or the equivalent whitespace check) for that file in the outer repository.
   - Report the exact file path, proposed disposition, proposed change category and impact, PR link/state included, and validation result.

## Guardrails

- Treat the source ticket as authoritative for its request and local status; do not infer acceptance from `Triaged`, comments, or a proposed resolution.
- The current `FHIR-XXXXX-resolution.md` analysis is a mandatory prerequisite and must be reconciled against the current PR state before writing the pre-applied resolution.
- Keep the text aligned with the target branch's verified source. Do not claim changes were merged unless verified.
- Preserve user changes and unrelated worktree state; never overwrite an existing artifact without explicit permission.
- This skill creates a local draft only. Do not commit, push, post Jira comments, or close/update issues.
- Follow repository instructions for Jira links and use fully qualified repository names for PR references outside the current repository.
