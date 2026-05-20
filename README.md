# Localskills.ai skills

This is the monorepo for every skill listed on [Localskills.ai](https://localskills.ai). Skills here are open-source, regionally-scoped, and run inside AI coding assistants (Claude Code, Cursor, Codex, Copilot, Windsurf).

**Platform is global. Skills can target any country.** New Zealand is the seed region — Paul Grey lives in NZ and built the launch skills there — but submissions for any region are welcome from day one and go through the same review pipeline.

## Repository layout

```
skills/
  scripts/
    validate.mjs                       # validation pipeline
  <region-code>/                       # ISO 3166-1 alpha-2 (or "global")
    <skill-slug>/
      skill.json                       # manifest — required
      README.md                        # human-facing docs — required
      SKILL.md                         # LLM-facing instructions — required
      LICENSE                          # OSI-approved licence — required
      CHANGELOG.md                     # version history — required
      examples/                        # input/output examples — strongly recommended
      tests/                           # required for skills that execute code
      assets/                          # icons, screenshots — optional
```

For sub-region scope (state, province, city) use the ISO 3166-2 directory naming:

```
skills/
  us-ca/<skill-slug>/
  au-nsw/<skill-slug>/
  nz-akl/<skill-slug>/
```

## How to submit a skill

1. **Fork this repo.**
2. **Add your skill** under `<region>/<your-slug>/` with all five required files. Use kebab-case for the slug.
3. **Run the validator** locally:
   ```sh
   npm run validate -- <region>/<your-slug>
   ```
4. **Open a PR.** Title format: `add: <region>/<slug> — <one-line description>`. Body should explain who it's for, what it does, and include at least one worked example.

Reviewer turnaround targets:

| Safety level | Target |
|--------------|--------|
| `low` (AI score ≥8) | 24 hours |
| `medium` | 72 hours |
| `high` | 7 days, includes sandbox test |
| `restricted` | Manual deep review; may be rejected |

Read [`/moderation-policy`](https://localskills.ai/moderation-policy) on the site for full criteria.

## Skill manifest (skill.json)

Every skill needs a `skill.json` matching the [skill schema](https://localskills.ai/docs/schema). Minimum viable example:

```json
{
  "name": "example-skill",
  "displayName": "Example Skill",
  "version": "1.0.0",
  "description": "One-line description, 10–140 chars.",
  "creator": {
    "username": "yourname",
    "displayName": "Your Name",
    "url": "https://example.com"
  },
  "license": "MIT",
  "regions": ["nz"],
  "categories": ["retail"],
  "tags": ["tag1", "tag2", "tag3"],
  "compatibility": { "claude-code": ">=1.0.0" },
  "permissions": {
    "fileSystem": [],
    "network": [],
    "shell": false
  },
  "pricing": { "model": "free", "price": 0 },
  "safetyLevel": "low"
}
```

### Region codes

Use lowercase ISO 3166-1 alpha-2 codes (`nz`, `au`, `us`, `uk`, `de`, `jp`, …). Use `["global"]` for non-regional skills. Use ISO 3166-2 for sub-region scope (`us-ca`, `nz-akl`, `au-nsw`).

The validator accepts the alias `uk` for `gb`; we canonicalise to `gb` on the site.

### Permissions

Be precise. Over-declaring permissions gets you bounced for revisions:

- **`network`** — bare hostnames the skill actually contacts. `["api.example.com"]`, not `["*"]`, not `["https://api.example.com/path"]`.
- **`fileSystem`** — scopes like `read:downloads`, `write:outputs`. Be specific about which directory and which operation.
- **`shell`** — `false` if not needed (strongly preferred). Otherwise an array of allowed commands; `true` (unrestricted) will be reviewed as `restricted`-tier.

## Validation pipeline

The validator runs on every PR. It checks:

1. **Required files** present (`skill.json`, `README.md`, `SKILL.md`, `LICENSE`, `CHANGELOG.md`).
2. **Manifest schema** — every field present, well-typed, slug-formatted, OSI licence, valid region/category codes.
3. **Permissions scope** — flags unrestricted shell, wildcard hosts, suspicious URL formats.
4. **Prompt-injection patterns** — checks SKILL.md for "ignore previous instructions", authority claims, hidden zero-width payloads, exfiltration patterns.
5. **Malicious code patterns** — hardcoded API keys, AWS keys, private-key blocks, URL shorteners, `eval()`, path traversal.
6. **Undeclared network access** — flags URLs in code blocks that aren't in `permissions.network`.

Run locally:

```sh
# single skill
node scripts/validate.mjs nz/woolworths-refund-helper

# everything
node scripts/validate.mjs --all
```

Exit code 0 if everything passes; 1 if any skill has errors. Warnings don't fail the build but are surfaced to moderators.

## What gets rejected fast

- Undisclosed third-party network calls.
- Hardcoded API keys or credentials in committed files.
- A SKILL.md that tells the agent to ignore or override the user.
- Permissions wider than the skill needs.
- A description that doesn't match the implementation.
- Scraping services where the ToS prohibits it.
- Anything that touches money or signs legal documents without explicit user confirmation per action.

See [`/moderation-policy`](https://localskills.ai/moderation-policy) for the full banned-content list.

## Trust levels

- **New** — first submission; full review every time.
- **Trusted** — 3+ approved skills, no violations in 90 days; faster review.
- **Verified** — identity verified, organisation account; priority review + badge.
- **Featured** — invited only, hand-curated by Localskills team.

## Licence

This repo's structure, validation scripts, and documentation are MIT-licensed. Each skill ships its own licence (in its `LICENSE` file).
