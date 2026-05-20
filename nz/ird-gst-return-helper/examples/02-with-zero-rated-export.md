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

Box 5  — Total sales and income (GST-inclusive):    $55,000.00
Box 6  — GST included in Box 5 (× 3/23):            $ 5,217.39
Box 8  — Zero-rated supplies (subset of Box 5):     $15,000.00
Box 11 — Total purchases (GST-inclusive):           $ 2,500.00
Box 12 — GST on purchases (× 3/23):                 $   326.09
Box 13 — GST to pay:                                $ 4,891.30

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
   Box 8:  15000.00  (this is the bit a lot of people miss — zero-rated
                       sales ARE included in Box 5 AND separately in Box 8)
   Box 11:  2500.00
4. Pay $4,891.30 by 28 June 2026.
```
