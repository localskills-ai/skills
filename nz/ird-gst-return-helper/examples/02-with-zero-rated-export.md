# Example 2 — Company with overseas customers (zero-rated sales)

## Input

> Limited company, two-monthly Apr–May 2026, invoice basis. I sold $40k to NZ customers and $15k to an Australian client (B2B). Plus $3k of bank-fee deductions, $2,500 in NZ supplier invoices.

## Output

```
DRAFT GST return — review before filing
---------------------------------------
Registered: <COMPANY NAME>
IRD #: <XXX-XXX-XXX>
Period: 2026-04-01 → 2026-05-31  (2 months)
Basis: invoice

Box 5  — Total sales and income (GST-inclusive):     $55,000.00
Box 6  — Zero-rated supplies included in Box 5:      $15,000.00
Box 7  — Box 5 minus Box 6 (standard-rated, GST-inc): $40,000.00
Box 8  — GST on sales (Box 7 × 3/23):                $ 5,217.39
Box 9  — Adjustments to GST on sales:                $     0.00
Box 10 — Total GST on sales (Box 8 + Box 9):         $ 5,217.39
Box 11 — Total purchases and expenses (GST-inc):     $ 2,500.00
Box 12 — GST on purchases (Box 11 × 3/23):           $   326.09
Box 13 — Credit adjustments:                         $     0.00
Box 14 — Total GST credit (Box 12 + Box 13):         $   326.09
Box 15 — Net GST payable (Box 10 − Box 14):          $ 4,891.30

Working:
  Standard sales (NZ):  $40,000.00
  Zero-rated (AU B2B):  $15,000.00
  Exempt income:        $     0.00
  Standard purchases:   $ 2,500.00
  Out-of-scope:         $ 3,000.00  (bank fees — exempt financial services)

Notes:
  - The $15k Australian invoice is zero-rated under s 11A(1)(k) GST Act
    (services supplied to a non-resident outside NZ). The customer must
    not be in NZ when the service is performed. Confirm the customer
    was offshore for the duration.
  - Bank fees on a business account are exempt financial services and
    excluded from Box 11. NOT zero-rated.
```

```
What to do next
---------------
1. Sign in to myIR.
2. File GST for the period.
3. Enter:
   Box 5:  55000.00
   Box 6:  15000.00  (zero-rated supplies INCLUDED in Box 5)
   Box 11:  2500.00
   (Boxes 7, 8, 10, 14, 15 calculate automatically in myIR.)
4. Pay $4,891.30 by 28 June 2026.
```
