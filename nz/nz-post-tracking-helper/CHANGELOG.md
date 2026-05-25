# Changelog

## [1.0.2] — 2026-05-25

### Fixed
- **Dead claims URL replaced.** SKILL.md and README.md linked to `nzpost.co.nz/help-support/claim-a-refund-or-loss`, which now returns 404. Updated to NZ Post's current parcel enquiry form at `nzpost.co.nz/contact-support/parcel-enquiry` (the live "report a delayed / missing / damaged parcel" flow, which requires a tracking number), and updated the step wording to match the current form's options.
- **Service-tier names aligned to NZ Post's current personal lineup.** Replaced the non-current "ParcelPost Tracked" tier and the "CourierPost Overnight" label with NZ Post's actual personal sending services: Courier (next working day), Economy / Courier Economy (up to 3 working days), Express (oversize same-day), and Pace (urgent same-day point-to-point). Updated the flag thresholds and accepted-tier list to match.
- **Corrected the Economy delivery window in example 01** from "2–7 working days" to NZ Post's actual target of up to 3 working days (flag at day 5), removing an internal contradiction with the operating rules.
- **CGA citation corrected** for return-postage costs: faulty-goods return costs are recoverable as a foreseeable loss under s 18(4), not s 18(2) (which covers having a remediable failure fixed). Updated in SKILL.md and example 02.
- **Corrected Mighty Ape support contact** in example 02 from `support@mightyape.co.nz` to the actual `help@mightyape.co.nz` / Help Centre (help.mightyape.co.nz).

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
