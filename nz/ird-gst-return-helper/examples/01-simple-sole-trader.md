# Example 1 — Sole trader, two-monthly, invoice basis

## Input

> Two-monthly GST return for April–May 2026. I'm a sole trader doing consulting. Invoice basis. Bank export at `~/Downloads/2026-04-05-bnz.csv`. Three invoices I issued at `~/Documents/invoices-issued/`. Receipts in `~/Downloads/receipts-april-may/`. IRD #: 123-456-789.

## Skill response

The skill reads the CSV (24 transactions), parses 3 issued invoices ($23,000 in fees, all NZ clients, standard-rated), and identifies 18 standard-rated business purchases ($4,200 GST-inclusive) from the receipts. 6 transactions are out-of-scope (personal Netflix, groceries, etc.) and excluded.

## Output

```
DRAFT GST return — review before filing
---------------------------------------
Registered: Paul Grey (sole trader)
IRD #: 123-456-789
Period: 2026-04-01 → 2026-05-31  (2 months)
Basis: invoice

Box 5  — Total sales and income (GST-inclusive):     $23,000.00
Box 6  — Zero-rated supplies included in Box 5:      $     0.00
Box 7  — Box 5 minus Box 6:                          $23,000.00
Box 8  — GST on sales (Box 7 × 3/23):                $ 3,000.00
Box 9  — Adjustments to GST on sales:                $     0.00
Box 10 — Total GST on sales (Box 8 + Box 9):         $ 3,000.00
Box 11 — Total purchases and expenses (GST-inc):     $ 4,200.00
Box 12 — GST on purchases (Box 11 × 3/23):           $   547.83
Box 13 — Credit adjustments:                         $     0.00
Box 14 — Total GST credit (Box 12 + Box 13):         $   547.83
Box 15 — Net GST payable (Box 10 − Box 14):          $ 2,452.17

Working:
  Standard sales:       $23,000.00
  Zero-rated sales:     $     0.00
  Exempt income:        $     0.00
  Standard purchases:   $ 4,200.00
  Out-of-scope:         $   910.00  (6 personal items, excluded)

Flagged for your review:
  - 2026-04-22 — $89 to "AWS NZD"  — GST on AWS invoice? AWS NZ
    issues GST-inclusive tax invoices for the Sydney region.
    Check the invoice PDF; if GST line is shown, include in Box 11.
```

```
What to do next
---------------
1. Sign in to myIR at https://myir.ird.govt.nz/
2. Returns and transactions → GST → File return → period 2026-04-01 → 2026-05-31
3. Enter:
   Box 5:  23000.00
   Box 6:      0.00
   Box 11:  4200.00
   (Boxes 7, 8, 10, 14, 15 calculate automatically in myIR.)
4. Resolve the AWS line before submitting.
5. Pay $2,452.17 by 28 June 2026.
```
