# Changelog

All notable changes to the Woolworths Refund Helper will be documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this skill adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.2] — 2026-05-21

### Changed

- **The real value of this skill is helping you navigate Olive — Woolworths NZ's chatbot.** Olive is the first-line customer service in the app and on the website; without specific, CGA-grounded wording Olive loops back to template questions. README, SKILL.md, and both examples rewritten around Olive as the target interface.
- **Output is now "DRAFT — paste into the Olive chat"** plus an **Olive playbook** with the actual chat-navigation steps, including the documented escape hatch (`"Can I speak to a real person?"`) and a caution that Olive has a known hallucination tendency (early 2026 incidents).
- **`executionModel: "computer-use-recommended"`** — when run inside a Computer Use-enabled agent (Claude Desktop etc.), the agent can drive the Olive chat directly after the user authorises it. Draft-only mode still works for everyone else.
- Tagged `"olive"`. Updated `description` to lead with the Olive-navigation framing.

## [1.0.1] — 2026-05-21

### Fixed

- **CGA section numbers corrected.** Cite **s 6** (the guarantee of acceptable quality) for remedy requests; **s 7** is the section that *defines* what "acceptable quality" means and isn't what you cite when asking for a refund. Fitness for a particular purpose is **s 8** (not s 7). The earlier draft had s 6/s 7 conflated.

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
