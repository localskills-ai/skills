# Example 1 — Clean supplier check

## Input

> About to sign a $30k consulting contract with "Acme Painters Limited". They've sent me an invoice with NZBN 9429012345678. Can you do a quick check?

## Skill response

The skill confirms NZBN is the right identifier and tells the user to search at https://companies-register.companiesoffice.govt.nz/ by NZBN. The user pastes the company-detail page text.

## Output

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
    and IRD defaulters list).
  - Personal credit of the directors (not your business unless you're
    extending credit; can be obtained from Centrix / Equifax with
    consent).
  - Quality of work (ask for references).
```

```
Next steps
----------
1. Register check clean — keep going with normal commercial diligence.
2. Ask for two recent client references and confirm proof of insurance
   before signing.
3. For $30k+ work, include a milestone payment schedule in the contract
   rather than full upfront.

For anything material, talk to a lawyer or accountant before signing.
```
