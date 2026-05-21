# Skill Creator

The meta-skill. Hand this to Claude Desktop (or any agent with Computer Use), then ask it to help you build a new Localskills.ai skill. The skill walks you through demonstrating the task once, watches what you do, then drafts the entire skill folder.

## Why this exists

The fastest path from "I have a regional task I do all the time" to "I have a published Localskills skill" is **Path A** in the [Create a Skill guide](https://localskills.ai/docs/create-a-skill): demonstrate the task once with Claude watching via Computer Use, then have Claude draft the SKILL.md from the observed workflow.

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

- **Claude Desktop with Computer Use enabled** (recommended) — Claude can watch you do the task.
- **OR any agent that can run Localskills skills** — Skill Creator can still help, but it works from your description rather than direct observation.
- **A specific task you want to automate.** Not "help with my taxes" — "file my IRD GST return" or "look up a NZ company on the Companies Register".
- **About 30 minutes.**

## How it works (the four phases)

### Phase 1 — Scope

The skill asks:

- What's the one specific task you want to automate?
- What region (country code) does it apply to? (Or `global` if it's not region-specific.)
- Which category fits — finance, retail, government, transport, property, health, legal, business, lifestyle, developer, agents, or utilities?
- What's the target interface — a chatbot, a web portal, a desktop app, an email flow? *(Skill Creator uses this to set the right tone — "Olive playbook" vs "myIR navigation" vs "form draft".)*

### Phase 2 — Demonstration

If you have Computer Use:

- The skill tells you: "Now do the task once at your normal pace. I'll watch. Don't ask for my help. When you do something that has reasoning behind it, talk out loud — I'll catch it."
- You navigate to the target service and complete the task.
- Claude observes, takes screenshots, and asks ~3–5 clarifying questions ("Why did you pick this dropdown option?", "What would you have done differently if X had been true?").

If you don't have Computer Use:

- The skill walks you through a structured interview instead: target steps, inputs, outputs, refusal cases, edge cases.

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

## Version

`1.0.0` — initial release. See [CHANGELOG.md](./CHANGELOG.md).
