# Changelog

All notable changes to the Woolworths Refund Helper will be documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this skill adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] — 2026-05-20

### Added

- Initial release.
- Drafts CGA s6 / s7 refund requests for Woolworths NZ deliveries.
- Handles spoiled / damaged / missing / unwanted-substitution cases.
- Reads order receipts (PDF or pasted text) from the user's downloads.
- Reads photos of problem items when provided.
- Outputs a plain-text draft and a "what to do next" checklist.
- Refuses change-of-mind cases and any request that looks like phishing.
- Zero network permissions — never contacts Woolworths directly.

### Notes

- Validated by Paul Grey on real refund cases.
