# Changelog

## [1.0.2] — 2026-05-25

### Fixed

- Updated the Woolworths order-number example from `WW1234567` to `CD1234567` (SKILL.md and README) so the walkthrough matches the corrected Woolworths Refund Helper — Woolworths NZ order numbers keep the legacy Countdown `CD` prefix.

## [1.0.1] — 2026-05-21

### Changed

- **Corrected the Computer Use framing.** Computer Use is not a passive screen-recorder — Claude can't sit and watch the user work. Phase 2 rewritten around supervised execution: either **dictation mode** (user tells Claude each step, Claude executes via Computer Use) or **autopilot mode** (Claude attempts the task, user corrects). Both produce real-experience SKILL.md because Claude actually performs the task. Structured interview remains the fallback for agents without Computer Use.
- README, examples, and description updated to match.
- `description` rewritten to lead with "co-pilots a real task with you".

## [1.0.0] — 2026-05-21

### Added
- Initial release.
- Four-phase authoring flow: Scope → Demonstration → Drafting → Validation.
- Computer Use harvesting as the primary path; structured interview as fallback for agents without Computer Use.
- Generates a complete skill folder: skill.json, SKILL.md, README.md, LICENSE (MIT), CHANGELOG.md, plus 2+ worked examples.
- executionModel decision tree: draft-only / computer-use-recommended / computer-use-required based on observed workflow.
- safetyLevel decision tree based on what the skill touches.
- Validates the generated folder against the Localskills schema before handoff.
- Refuses to author policy-violating skills (auto-payment without per-action consent, ToS-violating scraping, impersonation, etc.).
- Marked `verified: true` — this is a platform-distributed skill rather than community-contributed.
