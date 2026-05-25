# Changelog

## [1.0.1] — 2026-05-25

### Fixed
- **Corrected the Foodstuffs house-brand spelling from "PAMS" to "Pams".** The brand is officially styled "Pams" (no apostrophe, not all-caps). Updated the slug-normalisation example in SKILL.md and the "Pams free-range eggs" lines in both examples.
- **Stopped treating "Pams" as a strippable noise word in slug normalisation.** Pams is PAK'nSAVE's house brand and a genuine differentiator — the slug example already keeps it — so it must stay in the slug. Reworded the rule to strip pack-noise tokens instead and to keep the brand.

## [1.0.0] — 2026-05-20

### Added
- Initial release.
- Reads app exports, receipt photos, shelf-tag photos, and typed prices.
- Maintains a per-item JSON history with per-store breakdown.
- Per-unit normalisation across changing pack sizes.
- Flags price changes outside user-defined threshold (default 5%).
- "Next shop" advisory highlighting stock-up and substitute opportunities.
- Zero network permissions — never contacts PAK'nSAVE.
