# PAK'nSAVE Price Tracker

Keeps a running record of what you pay for the groceries you actually buy at PAK'nSAVE NZ, and tells you when something has jumped.

## What it does

PAK'nSAVE (part of [Foodstuffs](https://www.foodstuffs.co.nz/)) markets itself on lowest grocery prices in NZ. That positioning makes per-item price drift easy to miss — the overall basket "feels" fine, but the staples have crept up 8% over six months.

This skill keeps a per-item history of what you've paid:

1. **You maintain a list of staples** — milk, bread, eggs, mince, oats, the specific cat food, whatever.
2. **After each shop**, you give the skill a price screenshot, the in-app order summary, or just typed prices.
3. **It updates the history**, tracks the per-unit price (so it normalises across pack sizes when possible), and flags items that have moved more than your threshold.
4. **At the start of each shop** it tells you which items are at a higher price than you've usually paid, and which are on special this week.

It does NOT scrape PAK'nSAVE. You feed it the prices.

## Why this is useful

Two reasons:

- **Catch shrinkflation and creeping price rises** the chain doesn't loudly advertise.
- **Decide when to bulk-buy.** If the 1kg block of butter is normally $9.50 and it's $7.50 this week, the skill knows that's a real deal and tells you. If "20% off" is on a price already 15% above the 6-month median, the skill calls it out.

## When NOT to use it

- For comparing PAK'nSAVE vs Woolworths NZ vs New World prices in real time — that's what [Grocer](https://grocer.nz/) does (and they do it well).
- For chasing in-store promotions you don't actually want — this is a "you already buy these" tracker, not a deal-discovery tool.

## Inputs

Any combination of:

- **In-app order summary** — easiest. PAK'nSAVE's app exports a clean per-item list. PDF or pasted text.
- **Email order confirmation** for click-and-collect.
- **Receipt photo** — the skill OCRs it.
- **Shelf-tag photo** — for an item you didn't buy but want to track.
- **Typed prices** — `"2L blue milk $4.20"`. Works.

## Outputs

A summary on each update:

```
Update: 2026-05-18, PAK'nSAVE Lincoln Rd
3 items tracked, 2 changes:

  Anchor blue milk 2L   $4.20  (last shop $3.90, +7.7%)  ↑ flagged
  Vogel's 750g          $6.40  (last shop $6.40, no change)
  Free-range eggs 12pk  $8.99  (last shop $9.50, −5.4%, ON SPECIAL)

Median of last 6 shops:
  Anchor blue milk 2L   $3.94 (cheapest: $3.60, dearest: $4.20)
  Vogel's 750g          $6.30
  Free-range eggs 12pk  $9.40
```

And a "next shop" advisory:

```
Heads up for your next shop:
  - Free-range eggs are 6% below median — stock up if you can store them.
  - Anchor blue milk is at the top of its 6-month range — substitute Pams
    house brand if you don't strongly prefer Anchor.
```

## Permissions

- `fileSystem.read:downloads` — to read the app's PDF/CSV exports.
- `fileSystem.read:photos` — to read receipt or shelf-tag photos.
- `fileSystem.write:outputs` — to save the running history (JSON file in the user's chosen location).
- No network. The skill doesn't contact PAK'nSAVE or anyone else.
- No shell.

## Storage

The skill keeps a single JSON file (default: `~/Documents/paknsave-prices.json`). Schema:

```json
{
  "items": {
    "anchor-blue-milk-2l": {
      "displayName": "Anchor blue milk 2L",
      "unit": "L",
      "history": [
        { "date": "2026-04-02", "price": 3.60, "store": "Lincoln Rd" },
        { "date": "2026-05-18", "price": 4.20, "store": "Lincoln Rd" }
      ]
    }
  },
  "threshold_pct": 5
}
```

You can edit it directly if you want.

## Author

Paul Grey at [Second Brain NZ](https://secondbrain.nz). NZ-style cost-of-living useful, not a money-saving evangelist.

## Version

`1.0.0` — initial release.
