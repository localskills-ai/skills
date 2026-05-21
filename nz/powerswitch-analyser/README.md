# Powerswitch Analyser

Reads your NZ power bill, works out your usage profile, and tells you which retailers would likely be cheaper — using the same logic [Powerswitch](https://www.powerswitch.org.nz/) (Consumer NZ's free comparison tool) uses, but offline against your actual bill.

## What it does

NZ has ~20+ active electricity retailers and lines are bundled into your retailer bill in opaque ways. Powerswitch is great but you have to:

1. Type your usage in by hand from your bill.
2. Pick fuel types and meter types from drop-downs you might not understand.
3. Re-check periodically as plans change.

This skill skips the typing. Hand it your power bill (PDF, screenshot, or pasted text); it parses your daily fixed charge, kWh usage by tariff (anytime / day / night / controlled), the lines company implied by your address, and a couple of plan flags (low-user vs standard, prompt-payment discount).

Then it compares to a **snapshot** of retailer pricing and produces a ranked list of "you'd save / break even / pay more" vs each retailer.

## Important caveats

- The plan snapshot is **as of the date in the file**. NZ power plans change quarterly-ish. **Always verify on Powerswitch.org.nz before switching** — the skill says this loudly in every output.
- The skill works for **standard residential connections**. Solar, battery, EV, commercial accounts, three-phase, controlled hot-water dual-meter setups → flagged for human attention.
- Lines charges vary by your specific lines company (Vector, Wellington Electricity, Orion, Aurora, Powerco, Counties, etc.). The skill identifies the lines company from your address or bill but doesn't compute lines costs in isolation — they're baked into the retailer plans we compare.

## When to use it

- Your bill came in higher than usual and you want a sanity check.
- You haven't switched in 2+ years (NZ retailers tend to drift up after the welcome discount expires).
- You moved house and need to pick a retailer fresh.
- You're considering moving from low-user to standard tariff (or vice versa).

## When NOT to use it

- For commercial accounts. Out of scope.
- For solar/battery analysis. Out of scope (see Powerswitch's solar-specific calculator).
- For predicting your future bills if usage changes significantly.
- For deciding between gas + electric vs all-electric whole-home. Different question.

## Inputs

- Your most recent power bill (PDF / screenshot / pasted text) — the skill needs roughly 30 days of usage data minimum, 12 months ideal.
- Your address (so the skill knows your lines company). The skill stores **only the suburb + region** in its working file — not the full street address.
- Optional: your current retailer + plan name, your "low user" / "standard" status.

## Outputs

```
Your profile
------------
Region: Wellington
Lines company: Wellington Electricity
Tariff: Standard (anytime)
Daily fixed charge: $1.85/day
Average usage: 13.2 kWh/day
Annualised total (extrapolated from 11 months): ~$2,840/yr inc GST

Comparison vs your current plan
-------------------------------
Plan                              Annualised  vs you     Friction
Electric Kiwi MoveMaster          $2,510      −$330      No exit fee, switch in app
Flick Off-peak Saver              $2,580      −$260      Variable rates; requires smart meter
Genesis Standard                  $2,790      −$50       (your current — no switch needed)
Mercury GoodNights                $2,830      +£10       —
Contact Basic                     $2,930      +$90       —

Top recommendation
------------------
Electric Kiwi MoveMaster looks ~$330/yr cheaper for your usage. Verify
on Powerswitch.org.nz with this exact bill, then switch via the
Electric Kiwi website (~5 min, no exit fee from current retailer).

Watch out for:
  - Welcome credits expire after 12 months; build a reminder to re-run
    this skill next year.
  - If you have a hot-water cylinder on a "controlled" circuit, your
    real savings could differ. This skill assumes anytime tariff only.
```

## Permissions

- `fileSystem.read:downloads` — to read PDF bills.
- `fileSystem.read:documents` — alt location.
- `fileSystem.write:outputs` — to save the profile + recommendation.
- No network. The skill doesn't contact Powerswitch, retailers, or anywhere else.
- No shell.

## Plan snapshot

The skill ships with a static `plans.json` (in `assets/`) — a curated snapshot of major-retailer residential pricing. It is **not authoritative** and goes stale fast. Always verify before switching.

## Author

Paul Grey at [Second Brain NZ](https://secondbrain.nz). NZ power-bill comparison should not require a spreadsheet.
