# Changelog

## [1.0.1] — 2026-05-21

### Fixed
- **Lines-company mapping expanded and corrected.** Auckland is split (Vector vs Counties Energy in the south). WEL Networks (not Powerco) is Hamilton + most of Waikato District. Powerco covers eastern Waikato, Tauranga, Taranaki, much of Manawatū-Whanganui, Wairarapa. Added pointer to the ENA full directory.
- **LFC regulation phase-out detail.** Quoted the actual regulations (Electricity (Low Fixed Charge Tariff Option for Domestic Consumers) Regulations 2004), the schedule (cap up 30c/day each April from 2022, $1.80/day for 2026–27, removed entirely 1 April 2027), and the implication (low-user becomes voluntary, not regulated).
- **Low-user thresholds spelled out by region.** North Island + Upper South Island = 8,000 kWh/year; Lower South Island = 9,000 kWh/year.

## [1.0.0] — 2026-05-20

### Added
- Initial release.
- Parses NZ power bills (PDF, pasted text) — extracts retailer, plan, tariff, daily fixed charge, kWh usage, lines company.
- Compares against static snapshot of major-retailer residential plans.
- Outputs ranked annualised-cost comparison with switch-friction notes.
- Always advises verifying on Powerswitch.org.nz before switching.
- Refuses commercial accounts, solar / EV / three-phase / dual-tariff setups.
- Zero network permissions.
