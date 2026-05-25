# Changelog

## [1.0.2] — 2026-05-25

### Fixed
- **AT contact URL corrected.** The old `at.govt.nz/contact/contact-us` path now returns 404; updated to the current `at.govt.nz/about-us/contact-us` in README and the overcharge example.
- **Removed invented support email.** `customerservice@at.govt.nz` is not published by AT; README now points to AT's contact us page (online form / phone) instead.
- **Fare and concession URLs updated.** AT moved its fares section; the zone map link now points to `fares-and-discounts/fare-zones-and-calculating-how-much-you-pay` and concessions to `fares-and-discounts/discounted-fares` (old `fares-discounts/...` paths 404).
- **Tertiary concession history corrected.** The tertiary discount was **doubled from 20% to 40% on 14 December 2025** (previously stated "raised from 25% in late 2025"). Registration is via the MyAT account. SKILL.md and README updated.
- **Lost-card flow updated to current process.** Reporting is via the MyAT account ("Cancel AT HOP card") or the AT HOP centre on 09 366 4467; AT protects the balance within 24 hours. Lost-card example updated.

## [1.0.1] — 2026-05-21

### Fixed
- **Concession quick reference updated to current AT rules.** Tertiary discount is **40% off Adult** (was incorrectly listed as 25%; AT raised tertiary to match Child/Secondary in late 2025). Community Services Card (Community Connect) is **50% off Adult at all times** (was incorrectly limited to "weekdays after 9am + weekends"). SuperGold has **no 3pm cap** — free after 9am weekdays, all day weekends and public holidays. Added Child weekend/public-holiday free travel and Secondary (16–19) tier.

## [1.0.0] — 2026-05-20

### Added
- Initial release.
- AT HOP balance / top-up / concession / lost-card support.
- Fare dispute drafts (overcharge, two-tap penalty, ghost rides).
- No-show service complaints.
- Sub-region scope: nz-akl (Auckland).
- Never stores full HOP card numbers — last 4 digits only.
- Zero network permissions.
