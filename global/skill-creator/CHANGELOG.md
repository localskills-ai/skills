# Changelog

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
