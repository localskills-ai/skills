# Changelog

## [1.0.0] — 2026-05-20

### Added
- Initial release.
- Parses NZ power bills (PDF, pasted text) — extracts retailer, plan, tariff, daily fixed charge, kWh usage, lines company.
- Compares against static snapshot of major-retailer residential plans.
- Outputs ranked annualised-cost comparison with switch-friction notes.
- Always advises verifying on Powerswitch.org.nz before switching.
- Refuses commercial accounts, solar / EV / three-phase / dual-tariff setups.
- Zero network permissions.
