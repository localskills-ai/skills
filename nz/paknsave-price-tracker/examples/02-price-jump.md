# Example 2 — Price jump caught, next-shop advisory

## Input

> Shop done. Blue milk $4.50 (was $4.20 last time), Vogel's $6.40, eggs $7.99 on special this week. Receipt at ~/Downloads/2026-06-01-paknsave.jpg.

## Output

```
Update: 2026-06-01, PAK'nSAVE Lincoln Rd
3 items tracked, 2 changes:

  Anchor blue milk 2L     $4.50  (last $4.20, +7.1%)  ↑ flagged
  Vogel's original 750g   $6.40  (last $6.40, no change)
  Pams free-range eggs 12pk  $7.99  (last $9.50, −15.9%, ON SPECIAL)  ↓

Median of last 6 shops:
  Anchor blue milk 2L     $4.20  (cheapest: $3.90, dearest: $4.50)
  Vogel's original 750g   $6.40
  Pams free-range eggs 12pk  $9.20  (cheapest: $7.99, dearest: $9.50)

Heads up for your next shop:
  - Eggs are at their cheapest in 6 shops. Stock up if you can use them.
  - Anchor milk is at the top of its range. Pams blue milk is the
    house-brand substitute if you don't strongly prefer Anchor.
```
