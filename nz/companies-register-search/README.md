# NZ Companies Register Search

Looks up NZ companies on the [Companies Register](https://companies-register.companiesoffice.govt.nz/). Walks you through the right search, explains the results so you don't miss the obvious red flags, and produces a clean due-diligence summary you can paste into your notes (or hand to your lawyer / accountant).

## Why this is useful

You're about to:
- Sign a contract with a NZ company.
- Pay a supplier their first invoice.
- Take on a contract role.
- Lend or invest money.
- Hire a contractor whose company is the legal counterparty.

The NZ Companies Register is **free and authoritative**. Anyone can search by company name, NZBN, or director — and the data tells you:

- Whether the company actually exists (not just a website with a logo).
- When it was incorporated.
- Whether it's currently in **liquidation, receivership, voluntary administration, or struck-off** status.
- Who the directors are and their residential city (full address held privately).
- Who the shareholders are and what they each hold.
- Whether the registered office matches the addresses they're putting on invoices.
- Whether annual returns are up to date — companies that stop filing get a "notice of intention to remove" attached to their record, which is a real red flag.

It's a 60-second check. The skill makes sure you do it properly.

## What it does

1. **Identifies what you actually have** — a trading name, a logo on an invoice, a director's name, an NZBN, or just a hunch. Tells you which search to run.
2. **Walks you through the search** on [companies-register.companiesoffice.govt.nz](https://companies-register.companiesoffice.govt.nz/) — exact field, exact filters.
3. **Reads the result page** (you paste the company-detail screen or PDF) and structures it into a due-diligence summary.
4. **Flags red flags** — current liquidation/receivership status, notice of intention to remove, overseas-only directors with no NZ resident director, very recent incorporation paired with large transactions, register name very different from the trading name, share transfers immediately before a contract date, etc.
5. **Does not draft demand letters or legal complaints** — that's a different skill (or, more accurately, a different person — a lawyer).

It does NOT contact the Companies Office API. The user does the lookup on the site themselves; the skill reads what they paste.

## What you give it

Any combination of:

- **A trading name or company name** ("Acme Painters", "Beta Holdings Limited").
- **An NZBN** (13-digit New Zealand Business Number).
- **A director's name.**
- **The company-detail screen or PDF** from the register (after you've searched).

If you only have a logo on an invoice, paste any text from the invoice — the skill will tell you which field on the register to search.

## What you get back

A summary like:

```
Due-diligence summary — Acme Painters Limited
=============================================

Identity
  Registered name: Acme Painters Limited
  NZBN:            9429012345678
  Company number:  3456789
  Status:          Registered (active)
  Incorporated:    2019-04-12 (~7 years)
  Type:            NZ limited company

Directors (2)
  - John Smith   (Wellington, NZ resident — YES)
  - Mary Jones   (Wellington, NZ resident — YES)

Shareholders (1)
  - John Smith   100 shares (100%)

Registered office:     Level 2, 100 Cuba St, Wellington 6011
Address for service:   Same as registered office
Ultimate holding co:   None

Annual returns:        Up to date. Last filed 2025-05-04.

Red flags
  None obvious.

Yellow flags
  - One-shareholder + one-director-as-sole-shareholder structure is
    extremely common for owner-operated trades businesses; not a flag
    in itself, but means there's no independent director oversight.
    Worth checking insurance and references regardless.

What this doesn't tell you
  - Outstanding debts, court judgments, or unpaid IRD obligations
    (not on this register — separate searches at the District Court
    and IRD's defaulters list).
  - Personal credit of the directors (not your business unless you're
    extending credit; can be obtained from Centrix / Equifax with consent).
  - Quality of work (ask for references).
```

If something concerning shows up, the skill flags it specifically and points to the next-step source (e.g. "this company entered liquidation 2024-11-08; the liquidator's contact details are on the company-detail page under 'Documents'").

## Permissions

- `fileSystem.read:downloads` — to read company-detail PDFs you've downloaded from the register.
- `fileSystem.write:outputs` — to save the due-diligence summary.
- No network. The skill never queries the Companies Office API.
- No shell.

## Cost

Searching the register is **free**. There is no charge for viewing company details, downloading the company extract PDF, or running director / shareholder searches.

## What this skill explicitly will not do

- **Make legal judgements.** "Should I work with them?" is your call. The skill surfaces facts; you decide.
- **Order a credit check** or pull data from non-public sources.
- **Search the Personal Property Securities Register (PPSR)** — that's a different system for security interests against personal property. Worth doing for asset-secured transactions; not handled here.
- **Bypass the register**. It's free; use it directly. The skill helps you read what you find.
- **Investigate individuals.** This is a company-focused tool. Director names are public *because* they're on the register — the skill doesn't dig into people beyond what's already on the company record.

## When NOT to use it

- For overseas companies. The skill is NZ-specific. (Australian companies are on ASIC; UK on Companies House; both are similar but different.)
- For trusts. NZ doesn't have a public trust register the way it has a company register. Trust due diligence is harder and usually requires a lawyer.
- For sole traders. Sole traders aren't on the Companies Register (no entity to register). Check the IRD GST register and the NZBN register instead — and if it's a high-value engagement, ask for references.

## Author

Paul Grey ([@paulgrey](https://x.com/paulgrey)). A 60-second due-diligence habit that's saved enough disputes to be worth automating.
