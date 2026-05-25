# Skill Creator

The meta-skill. Hand this to Claude Desktop (or any agent with Computer Use), then ask it to help you build a new Localskills.ai skill. You and Claude do the target task together once — either you dictate the steps and Claude executes them, or Claude attempts the task autonomously and you correct it as it goes — and Claude drafts the entire skill folder from the workflow it just ran first-hand.

## Why this exists

The fastest path from "I have a regional task I do all the time" to "I have a published Localskills skill" is **supervised execution with Computer Use**: do the task once with Claude as your co-pilot — open the target service on one side of your screen, Claude on the other — and have Claude produce the SKILL.md from the workflow it just ran for real.

This skill packages that path. You install it, ask Claude to help, and follow the prompts. ~30 minutes from task to first-draft skill folder, validated and ready to PR.

## What it produces

A complete skill folder you can drop into the `skills/<region>/<your-slug>/` directory and submit:

```
your-slug/
  skill.json        # manifest, generated with sensible permissions + executionModel
  SKILL.md          # runbook extracted from your demonstration
  README.md         # human-facing docs in the localskills voice
  LICENSE           # MIT by default (you can swap)
  CHANGELOG.md      # initial 1.0.0 entry
  examples/
    01-<scenario>.md
    02-<scenario>.md
```

The output is validated against the Localskills schema before being handed back. If it doesn't pass, the skill fixes the issues and re-validates.

## What you need

- **Claude Desktop with Computer Use enabled** (recommended) — Claude can drive the target service while you supervise. Two-pane setup works well: target service on one side, Claude on the other.
- **OR any agent that can run Localskills skills** — Skill Creator can still help via a structured interview, but the resulting SKILL.md is thinner because Claude hasn't actually done the task.
- **A specific task you want to automate.** Not "help with my taxes" — "file my IRD GST return" or "look up a NZ company on the Companies Register".
- **About 30 minutes.**

## How it works (the four phases)

### Phase 1 — Scope

The skill asks:

- What's the one specific task you want to automate?
- What region (country code) does it apply to? (Or `global` if it's not region-specific.)
- Which category fits — finance, retail, government, transport, property, health, legal, business, lifestyle, developer, agents, or utilities?
- What's the target interface — a chatbot, a web portal, a desktop app, an email flow? *(Skill Creator uses this to set the right tone — "Olive playbook" vs "myIR navigation" vs "form draft".)*

### Phase 2 — Supervised execution

If you have Computer Use, pick one of two modes:

- **Dictation mode** — You tell Claude what to do, step by step: "Open the Woolworths app", "Click the chat icon", "Tell Olive my order number is CD1234567". Claude executes each step via Computer Use. You correct it when it goes wrong; you explain the reasoning when it's not obvious. Best when the workflow has non-obvious decision points you want to teach explicitly.
- **Autopilot mode** — You tell Claude the goal ("Get a refund for the spoiled strawberries"). Claude attempts the task autonomously: figures out which app to open, how to navigate, what to type. You watch and correct: "No, don't click that — use the chat icon instead". Best when you want to see what Claude would do unsupervised, and refine from there.

Either way, by the end Claude has actually completed the task and can draft the SKILL.md from first-hand knowledge, not abstract description. After the task ends, Claude asks ~3–5 clarifying questions to capture anything that didn't come up naturally during execution.

If you don't have Computer Use:

- The skill walks you through a structured interview instead: target steps, inputs, outputs, refusal cases, edge cases. Thinner draft; rerun with Computer Use enabled if the result is missing detail.

### Phase 3 — Drafting

The skill drafts each file. It follows the [Localskills authoring conventions](https://localskills.ai/docs/create-a-skill):

- **SKILL.md** with operating rules, inputs, output format, refusal cases, edge cases, tone, self-check.
- **skill.json** with narrowly-scoped permissions inferred from what was observed (or asked), correct `executionModel` based on whether the task needs UI driving, plausible tags and categories.
- **README.md** in the Localskills voice — specific, regional, no marketing fluff.
- **CHANGELOG.md** with an initial `1.0.0` entry.
- **2+ worked examples** — at least one happy path and one refusal case.

### Phase 4 — Validation + handoff

The skill checks that:

- All required files exist.
- skill.json passes the schema (slug format, semver version, valid region code, 1–3 categories, 3–10 tags, declared permissions match what's actually used in SKILL.md).
- SKILL.md doesn't contain prompt-injection patterns, hardcoded credentials, or paths that traverse outside the skill folder.
- The README's voice matches the Localskills tone guide.

If anything fails, the skill fixes it and re-checks. When it passes, you get a folder you can:

```sh
# Copy into the skills monorepo and validate locally
cp -r <output> ~/path/to/localskills-skills/<region>/<your-slug>
cd ~/path/to/localskills-skills
node scripts/validate.mjs <region>/<your-slug>
# Then open a PR
```

## Permissions

- `fileSystem.read:downloads` — to read any receipts / sample files you're working with.
- `fileSystem.read:documents` — alt location.
- `fileSystem.write:outputs` — to save the generated skill folder where you can find it.
- No network. Skill Creator doesn't fetch templates or examples from the internet — everything it generates is local to the conversation.
- No shell.

## What this skill won't do

- **Publish your skill for you.** You still review, validate locally, and open the PR yourself. The skill produces a draft; you decide whether it's worth shipping.
- **Author skills that touch money, government services, or personal data without explicit refusal cases.** If you ask for a "send money for me" skill, Skill Creator refuses and explains why.
- **Author skills that bypass another tool's terms of service.** If your demonstration shows scraping a service that prohibits it, Skill Creator stops and tells you.
- **Author skills it can't validate.** If the output doesn't pass the Localskills schema and the skill can't fix it after one attempt, it hands you the draft and the validation errors and asks you to fix manually.

## Author

Maintained by Localskills. This is one of the few skills marked `verified: true` because it's distributed by the platform itself rather than a community contributor.
