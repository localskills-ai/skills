# Changelog

## [1.0.1] — 2026-05-21

### Fixed
- **Service-tier names corrected.** NZ Post's actual tiers are: NZ Post Courier (≤3kg next working day), CourierPost (large parcels next working day), NZ Post Economy / Courier Economy (up to 3 working days), ParcelPost Tracked (2–5 working days), and Pace (same-day metro pairs). The earlier draft used "Economy / Tracked" as one bucket and "CourierPost Overnight" / "CourierPost National 3–4 day" labels that don't match NZ Post's current product names.
- **Flag thresholds tuned** to the new SLAs (Economy: flag at day 5; CourierPost: day 3; ParcelPost: day 7).
- **Working-day footnote** clarifies day-zero counting and that Saturdays/Sundays/public holidays don't count unless the service explicitly includes them.

## [1.0.0] — 2026-05-20

### Added
- Initial release.
- Status-board view of in-flight parcels with per-service realistic delivery windows.
- Drafts NZ Post claims-portal inquiries and CGA-aware returns messages.
- Zero network permissions — never contacts NZ Post.
