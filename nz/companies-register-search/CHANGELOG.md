# Changelog

## [1.0.0] — 2026-05-21

### Added
- Initial release.
- Walks the user through the right Companies Register search (by company name, NZBN, director).
- Reads the company-detail page or PDF the user pastes; structures it into a due-diligence summary.
- Flags red flags (non-active status, removal notice, no NZ-resident director, overdue annual returns, very recent incorporation + large payment, etc.) and yellow flags (sole-director structure, overseas UHC, recent share transfers).
- Tells the user what the register doesn't show (court judgments, debt, credit history).
- Refuses to make commercial / legal judgements, refuses to look up residential addresses, refuses bulk-extract requests.
- Zero network permissions — never contacts the Companies Office.
