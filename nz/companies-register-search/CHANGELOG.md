# Changelog

## [1.0.1] — 2026-05-25

### Fixed
- **Companies Office complaints URL corrected.** The old `companiesoffice.govt.nz/help-and-support/contact-us/` path now returns 404; updated the "file a complaint against a director" pointer to the current `companiesoffice.govt.nz/about-us/our-enforcement-approach/make-a-complaint/` page.

## [1.0.0] — 2026-05-21

### Added
- Initial release.
- Walks the user through the right Companies Register search (by company name, NZBN, director).
- Reads the company-detail page or PDF the user pastes; structures it into a due-diligence summary.
- Flags red flags (non-active status, removal notice, no NZ-resident director, overdue annual returns, very recent incorporation + large payment, etc.) and yellow flags (sole-director structure, overseas UHC, recent share transfers).
- Tells the user what the register doesn't show (court judgments, debt, credit history).
- Refuses to make commercial / legal judgements, refuses to look up residential addresses, refuses bulk-extract requests.
- Zero network permissions — never contacts the Companies Office.
