# Minimum viable skill

This folder is **not** a real skill on Localskills.ai — it's a reference for contributors. It shows the absolute floor of what a submission can look like and still get reviewed quickly.

If you're contributing your first skill, copy this folder, rename it to your slug, and edit the files. You don't need to match the depth of `nz/woolworths-refund-helper` (the flagship). You just need to do one thing well.

## What's in this folder

```
minimal-skill/
  skill.json       # 19 lines
  SKILL.md         # 28 lines
  README.md        # this file
  LICENSE          # MIT (3 KB)
  CHANGELOG.md     # 6 lines
```

That's it. No examples folder (it would help but isn't required for trivial skills). No tests folder (only needed if your skill executes code).

## What makes a minimum viable skill

1. **One specific job.** "Calculate NZD↔USD with current Reserve Bank rates" is a skill. "Help with finance" isn't.
2. **A real region.** Pick the country (and sub-region if relevant) where it actually applies. Use `["global"]` only if it genuinely is.
3. **Permissions matching the job.** If you don't need shell access, declare `"shell": false`. If you don't fetch anything, declare `"network": []`. The validator flags over-declared permissions.
4. **One worked example in your description.** A reviewer reading your skill in 30 seconds should be able to picture exactly when they'd invoke it.
5. **An honest description.** 10–140 chars. No marketing fluff. State what it does and what it doesn't.

## Floor vs ceiling

| | Minimum viable | Flagship (Woolworths) |
|---|---|---|
| `description` length | 10–140 chars | 138 chars |
| `SKILL.md` length | ~30 lines | ~140 lines |
| `README.md` length | ~30 lines | ~140 lines |
| `examples/` | optional | 3 worked examples |
| Refusal rules in SKILL.md | optional but recommended | extensive |
| Cited statutes / policies | only if the skill makes legal claims | extensive |

The flagship is the ceiling, not the bar. Ship the floor and iterate.

## Submission

```sh
# From the skills repo root, after copying this folder to <region>/<your-slug>/:
node scripts/validate.mjs <region>/<your-slug>
```

If validation passes, open a PR. See the [main README](../../README.md) for the full submission flow.
