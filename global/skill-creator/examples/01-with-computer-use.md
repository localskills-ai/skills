# Example 1 — Authoring with Computer Use (Claude Desktop)

## Setup

User has installed Skill Creator into Claude Desktop, which has Computer Use enabled. They want to build a skill for filing their council rates query with Wellington City Council.

## Conversation (abridged)

> **User:** I want to build a skill that helps me query my rates bill with WCC.
>
> **Claude (via Skill Creator):** Good. One task per skill — by "query" do you mean: (a) check what's owed, (b) request a payment plan, (c) dispute a rate, or (d) something else?
>
> **User:** (c) dispute a rate.
>
> **Claude:** Phase 1 scope:
>   - Region: nz (or nz-wgn for Wellington-specific?)
>   - Categories: government, property
>   - Target interface: council web portal — let's confirm in Phase 2.
>   - Slug suggestion: `wellington-rates-dispute`. OK?
>
> **User:** Yes, nz-wgn, slug looks good.
>
> **Claude:** Phase 2. I'm going to watch you do the task once. Don't ask for my help — just do it. Talk out loud at decision points. I'll ask clarifying questions at the end.
>
> *(User navigates to wellington.govt.nz → rates → online services → dispute a rate. Fills out the form. Talks out loud at three decision points: "I'm using my property valuation code because that's what they need to find me in their system"; "I'm uploading the QV report PDF because that's the source of my disagreement"; "I'm picking 'request a revaluation' rather than 'request a write-off' because I think the valuation is wrong, not the calculation".)*
>
> **Claude:** Five clarifying questions:
>   1. The form had an optional "additional comments" field. You left it blank. Should the skill always leave it blank, or fill it when the user has specific extra context?
>   2. You uploaded the QV report. If the user doesn't have one, what's the next-best evidence?
>   3. You spent ~2 minutes finding your valuation code. Where's that on the rates bill?
>   4. The form asked for "preferred method of contact" — you picked email. Is that always right, or would phone make sense for some users?
>   5. After you submitted, the page said "we'll respond within 20 working days". If 20 working days passes with no response, what's the next step?
>
> *(User answers each, including the escalation path: follow up via the council's contact form referencing the original case number, then if still no resolution, take it to the Local Government Ombudsman.)*
>
> **Claude:** Phase 3 — drafting. I'll generate the folder now.

## What gets written to disk

```
~/Documents/skill-creator-output/wellington-rates-dispute/
  skill.json            # nz-wgn region, government+property categories,
                        # executionModel: computer-use-recommended,
                        # safetyLevel: medium (touches council records)
  SKILL.md              # operating rules, WCC portal navigation,
                        # inputs (property valuation code, QV report,
                        # specific point of disagreement), refusal cases
                        # (can't dispute someone else's rates, can't
                        # bypass the formal process for "the council
                        # is wrong" generally — has to be a specific
                        # valuation or calculation challenge)
  README.md             # WCC-rates-dispute scenario, specific cost
                        # context (rates are typically $2-4k/yr in WGN
                        # central), the 20-working-day timeline
  LICENSE               # MIT
  CHANGELOG.md          # 1.0.0 initial release
  examples/
    01-valuation-challenge.md
    02-refusal-someone-elses-rates.md
```

## Phase 4 — validation

Skill Creator runs the checklist. Everything passes. It hands back:

> Your skill folder is at ~/Documents/skill-creator-output/wellington-rates-dispute/.
> Five required files + 2 examples generated. Validation passed (no errors, no warnings).
>
> To finish: clone the Localskills skills repo, copy the folder to skills/nz-wgn/wellington-rates-dispute/, run `node scripts/validate.mjs nz-wgn/wellington-rates-dispute`, then open a PR.

Total time: ~25 minutes from "I want to build a skill" to validated draft.
