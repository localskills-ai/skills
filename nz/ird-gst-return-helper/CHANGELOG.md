# Changelog

## [1.0.1] — 2026-05-21

### Fixed
- **Box mapping corrected to match the actual GST101A form.** Box 6 is *zero-rated supplies included in Box 5* (not GST on sales). GST on sales is Box 8 = Box 7 × 3/23. Net GST payable is **Box 15** (not Box 13). Added the intermediate boxes (7, 9, 10, 13, 14) that myIR auto-calculates so the working is verifiable. The earlier draft would have produced a return that doesn't match the IRD form.

## [1.0.0] — 2026-05-20

### Added
- Initial release.
- Reads bank exports (CSV/OFX/QIF), invoices issued and received (PDF or pasted text), and receipts.
- Classifies transactions as standard-rated (15%) / zero-rated / exempt / out-of-scope.
- Computes the GST101A figures (Boxes 5/6/7/8/9/10/11/12/13/14/15).
- Flags transactions it can't classify confidently for human review.
- Supports invoice / payments / hybrid filing basis.
- Refuses to optimise, give tax advice, or file the return.
- Zero network permissions — never contacts IRD or any bank.
