# IRD GST Return Helper

Drafts your NZ GST return from receipts, invoices, and bank statements. Computes the box-by-box figures for the IRD's GST101A form so you can paste them straight into [myIR](https://myir.ird.govt.nz/).

## What it does

GST returns are mostly arithmetic. You add up all GST you collected (output tax), subtract all GST you paid (input tax), and pay or claim the difference. The IRD's GST101A form has a fixed set of boxes — Box 5 is total sales including GST, Box 11 is total purchases including GST, Box 15 is the resulting GST payable or refund.

This skill takes the receipts, invoices, and bank exports you've already got and:

1. **Classifies each transaction** as standard-rated (15%), zero-rated (0% — exports, going-concern sales, financial services to non-residents), exempt (residential rent, some financial supplies), or out-of-scope (private spending, salary, dividends).
2. **Computes the per-box totals** for the GST101A.
3. **Flags anything it can't classify confidently** so you can decide.
4. **Produces a one-page summary** you can copy into myIR or hand to your accountant for review.

It does NOT:

- File the return. You paste the numbers into myIR yourself.
- Decide whether something is deductible if it isn't already clearly GST-bearing.
- Recommend whether you should use invoice basis vs payments basis vs hybrid.
- Give tax advice. Edge cases go to a CA, not to this skill.

## When to use it

- You're a sole trader or small company registered for GST.
- You file two-monthly or six-monthly (most NZ SMEs).
- You're on **invoice basis** (the skill works for payments basis too but defaults to invoice; the SKILL.md explains how to switch).
- Your bookkeeping is in receipts/PDFs/bank exports rather than already-tidy accounting software output.

If you're already in Xero or MYOB and they've drafted the return for you, you don't need this — just review their draft.

## Inputs

Any combination of:

- **Bank/credit-card exports** (`.csv`, `.ofx`, `.qif`) for the GST period.
- **Invoices issued** (PDFs, scans, or pasted text) — sales.
- **Invoices received** (PDFs of supplier bills) — purchases.
- **Receipts** (photos or PDFs) — small purchases.
- **A list of zero-rated or exempt items** you know about (e.g. "rent received from tenant is residential — exempt").
- The GST period start and end (e.g. `2026-04-01 → 2026-05-31`).
- Your **filing basis** (invoice / payments / hybrid). Default: invoice.

The more it has, the less it asks.

## Outputs

A summary like:

```
GST return — Paul Grey, 2026-04-01 → 2026-05-31
Filing basis: invoice
GST registered name: Paul Grey
IRD number: 123-456-789

Box 5  — Total sales and income (GST-inclusive):    $36,500.00
Box 6  — Zero-rated supplies included in Box 5:     $ 2,000.00
Box 7  — Box 5 minus Box 6:                         $34,500.00
Box 8  — GST on sales (Box 7 × 3/23):               $ 4,500.00
Box 9  — Adjustments to GST on sales:               $     0.00
Box 10 — Total GST on sales (Box 8 + Box 9):        $ 4,500.00
Box 11 — Total purchases (GST-inclusive):           $12,650.00
Box 12 — GST on purchases (Box 11 × 3/23):          $ 1,650.00
Box 13 — Credit adjustments:                        $     0.00
Box 14 — Total GST credit (Box 12 + Box 13):        $ 1,650.00
Box 15 — Net GST payable (Box 10 − Box 14):         $ 2,850.00

Flagged for your review (could not auto-classify):
- $1,250 payment to "JBHF*EFTPOS-XX" on 2026-04-12 — unclear if business spend
- $480 invoice from "Stripe Inc" on 2026-05-02 — payment processing fees,
  but the invoice doesn't break out GST. NZ-issued Stripe charges are
  GST-inclusive at 15%; foreign Stripe charges are zero-rated.
```

Plus a paste-into-myIR snippet you can reference while filing.

## Permissions

- `fileSystem.read:downloads` — to read bank exports and downloaded invoices.
- `fileSystem.read:documents` — to read invoice PDFs you keep in Documents.
- `fileSystem.write:outputs` — to save the GST summary.
- No network. The skill never contacts IRD, your bank, or anywhere else.
- No shell.

## Why no IRD integration?

Two reasons. First, IRD's myIR doesn't have a public submission API — they have an Open Banking-style data-sharing API for accredited requestors only, which doesn't fit a community marketplace. Second, this skill is deliberately *advisory*: the moment you give a skill the ability to file your tax return, you've given it the ability to file your tax return incorrectly. The pattern we want is "skill drafts, human reviews, human submits" — same as the Woolworths Refund Helper.

## What it WILL refuse to do

- Estimate provisional tax. That's a separate calculation and a separate filing.
- Decide whether you should register for GST (the $60k threshold question — talk to an accountant).
- Optimise your GST position ("how do I pay less?"). The skill is descriptive of what your records say, not prescriptive about strategy.
- Process a return for a complex entity (trust, look-through company, group registration) without the user confirming the structure. For trusts and LTCs the skill flags it and asks you to confirm the filing approach.

## A note on the Holidays Act and PAYE

This skill does **GST only**. Payroll (PAYE/KiwiSaver/ACC levies) is a separate problem — the [Holidays Act 2003](https://www.legislation.govt.nz/act/public/2003/0129/latest/DLM236387.html) is famously hard to comply with correctly, and several payroll providers have settled with employees over miscalculations. We're not touching that with a community-marketplace skill.

## Disclaimer

This skill produces a *draft*. It is not tax advice. It does not constitute professional accounting services. Mistakes in your GST return are your responsibility. If your return is complex, run it past a [chartered accountant](https://www.charteredaccountantsanz.com/) before filing.

## Author

Paul Grey ([@paulgrey](https://x.com/paulgrey)). Validated against my own GST returns.
