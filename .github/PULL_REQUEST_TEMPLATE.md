<!-- Localskills.ai skill submission. Delete sections that don't apply. -->

## Skill

- **Slug**: `<region>/<your-slug>`
- **What it does** (one sentence):
- **Who it's for**:
- **Region**: <!-- e.g. nz, au, us, gb, de, jp, or sub-region like nz-akl -->
- **Categories**: <!-- 1–3 from: finance, retail, government, transport, property, health, legal, business, lifestyle, developer, agents, utilities -->

## Worked example

Paste at least one realistic input → output. The validator can confirm the
schema; the example confirms the skill does what it claims.

**Input:**

```
<one-line user request>
```

**Output:**

```
<the skill's response>
```

## What it does NOT do

Scope limits matter. List what the skill explicitly refuses or won't handle.

-

## Permissions

Why are the declared permissions in `skill.json` the minimum needed?

- `network`:
- `fileSystem`:
- `shell`:

## Checklist

- [ ] Ran `node scripts/validate.mjs <region>/<your-slug>` locally and it passed
- [ ] Read [the moderation policy](https://localskills.ai/moderation-policy)
- [ ] Skill ships an OSI-approved licence (MIT recommended)
- [ ] At least 2 example inputs/outputs in `examples/`
- [ ] Description in `skill.json` is 10–140 chars and matches what the skill actually does
- [ ] No hardcoded credentials, API keys, or personal data
- [ ] SKILL.md doesn't instruct the agent to ignore the user or bypass safety
- [ ] If the skill handles money / authenticated services / restricted data, I've marked `safetyLevel: high` in the manifest and called this out below

## Anything reviewers should know

<!-- e.g. "this skill calls a public API at api.example.com which is declared in permissions.network" -->
