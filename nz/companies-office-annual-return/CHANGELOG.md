# Changelog

## [1.0.1] — 2026-05-21

### Fixed
- **Removed fabricated form codes (DI-1, SH-1, RO-1, UHC-1, CL-1, DI-3).** The NZ Companies Register doesn't use those codes — actions are performed directly through the register dashboard (Maintain directors / Update shareholding / Update registered office / etc.). Examples and SKILL.md updated.
- **Filing fee corrected: $49.74 + GST** (was incorrectly stated as "free" or "no fee"). README, SKILL.md, and both examples updated.
- **s 207I clarification.** Section 207I/207J applies to companies with 10+ shareholders or "large" companies opting out of audit — not a generic small-company exemption. The default shareholders' resolution now describes the actual rule for typical small private companies: they aren't required to have financial statements audited at all; no specific section needs to be invoked.

## [1.0.0] — 2026-05-20

### Added
- Initial release.
- Reads last year's annual return and AGM minutes; walks through each confirmation field.
- Drafts shareholders' resolution in lieu of AGM for small companies (s 122 Companies Act).
- Refuses to misrepresent the register, file backdated returns, or paper over missing financial statements.
- Zero network permissions.
