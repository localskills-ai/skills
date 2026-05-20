# Changelog

## [1.0.0] — 2026-05-20

### Added
- Initial release.
- Reads bank exports (CSV/OFX/QIF), invoices issued and received (PDF or pasted text), and receipts.
- Classifies transactions as standard-rated (15%) / zero-rated / exempt / out-of-scope.
- Computes Box 5, 6, 8, 11, 12, 13 of the IRD GST101A form.
- Flags transactions it can't classify confidently for human review.
- Supports invoice / payments / hybrid filing basis.
- Refuses to optimise, give tax advice, or file the return.
- Zero network permissions — never contacts IRD or any bank.
