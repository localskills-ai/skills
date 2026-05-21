# Example 1 — Supervised execution with Computer Use (dictation mode)

## Setup

User has installed Skill Creator into Claude Desktop, which has Computer Use enabled. They have a two-pane screen setup: the Wellington City Council rates portal on the right, Claude on the left. They want to build a skill for disputing their rates bill.

## Conversation (abridged)

> **User:** I want to build a skill that helps me dispute my rates with Wellington City Council.
>
> **Claude (via Skill Creator):** Good. One task per skill — by "dispute" do you mean (a) request a revaluation, (b) request a write-off, (c) request a payment plan, or (d) something else?
>
> **User:** (a) request a revaluation.
>
> **Claude:** Phase 1 scope:
>   - Region: nz-wgn (Wellington-specific)
>   - Categories: government, property
>   - Target interface: WCC web portal
>   - Slug: `wellington-rates-revaluation-request`. OK?
>
> **User:** Yes.
>
> **Claude:** Phase 2. I see you have wellington.govt.nz open on the right. Pick a mode:
>   - **Dictation:** you tell me each step, I'll execute via Computer Use.
>   - **Autopilot:** you give me the goal, I attempt the task, you correct me when I go wrong.
>
> **User:** Dictation. I know exactly what to do.
>
> *(User dictates: "Click 'Online services'. Click 'Rates'. Click 'Request a revaluation'. Fill in the property valuation code — I'll dictate it: 12345678. Upload my QV report from ~/Downloads/qv-report.pdf. Pick 'request a revaluation' not 'request a write-off'. Pick 'email' as preferred contact method. Submit." Claude executes each step via Computer Use, taking screenshots between actions.)*
>
> *(After submission, the page shows "Reference number REV-2026-04578. Response within 20 working days.")*
>
> **Claude:** I noticed you specifically picked 'request a revaluation' over 'request a write-off'. Five clarifying questions:
>   1. When should the skill pick 'write-off' instead?
>   2. The QV report was the evidence here. If a user doesn't have one, what's next-best?
>   3. The valuation code field was the slow part — where do users typically find it on their rates bill?
>   4. You picked email contact. Always email, or are there cases for phone?
>   5. If 20 working days passes with no response, what's the escalation path?
>
> *(User answers each, including the final escalation: follow up via the council contact form with the reference number, then if still no resolution, take it to the Local Government Ombudsman.)*
>
> **Claude:** Phase 3 — drafting. I'll generate the folder now using the workflow I just executed.

## What gets written to disk

```
~/Documents/skill-creator-output/wellington-rates-revaluation-request/
  skill.json            # nz-wgn region, government+property categories,
                        # executionModel: computer-use-recommended,
                        # safetyLevel: medium (touches council records).
                        # permissions.fileSystem includes read:documents
                        # because the task involves uploading a QV PDF.
  SKILL.md              # operating rules, WCC portal navigation captured
                        # from the actual execution (screenshots
                        # referenced), inputs (valuation code, QV report
                        # or equivalent), refusal cases (can't dispute
                        # someone else's rates, can't bypass formal
                        # process, must have specific valuation or
                        # calculation challenge), edge cases (no QV
                        # report, expired valuation period).
  README.md             # WCC rates dispute scenario, ~$2-4k/yr rates
                        # context for WGN central, 20-working-day SLA.
  LICENSE               # MIT
  CHANGELOG.md          # 1.0.0 initial release; notes the skill was
                        # authored via dictation-mode supervised execution.
  examples/
    01-valuation-challenge.md      # the actual run we just did
    02-refusal-someone-elses-rates.md
```

## Phase 4 — validation

Skill Creator runs the checklist. Everything passes. It hands back:

> Your skill folder is at ~/Documents/skill-creator-output/wellington-rates-revaluation-request/. Five required files + 2 examples generated. Validation passed (no errors, no warnings).
>
> To finish: clone the Localskills skills repo, copy the folder to skills/nz-wgn/wellington-rates-revaluation-request/, run `node scripts/validate.mjs nz-wgn/wellington-rates-revaluation-request`, then open a PR.

Total time: ~25 minutes from "I want to build a skill" to validated draft.

## Notes — autopilot mode looks like this

Same setup. User picks autopilot instead:

> **Claude:** Goal: file a revaluation request with WCC. I see the site on your right. I'll attempt it now — correct me when I go wrong.
> *(Claude clicks around, finds the rates section, opens the form, asks for the valuation code, uploads the file the user points to.)*
> **User:** Wait — pick "revaluation" not "write-off". *(Claude switches.)*
> **User:** That's the wrong dropdown for contact — use email, the second option. *(Claude corrects.)*
> *(Continues until submission. Same drafting / validation phases follow.)*

Both modes produce equivalent quality drafts because Claude executed the task and saw the actual UI in both cases. Pick whichever feels more natural.
