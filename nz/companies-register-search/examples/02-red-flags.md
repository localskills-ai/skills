# Example 2 — Red flags found

## Input

> Going to lend $50k to a new company a friend started — "Beta Holdings Limited". They want a personal guarantee. Let me run a check before I commit.

## Output

After the register lookup is pasted:

```
Due-diligence summary — Beta Holdings Limited
=============================================

Identity
  Registered name: Beta Holdings Limited
  NZBN:            9429099887766
  Company number:  8765432
  Status:          Registered (active)
  Incorporated:    2026-03-08 (~2 months)  ← very recent
  Type:            NZ limited company

Directors (1)
  - James Wilson  (London, UK — NZ/AU resident: NO)

Shareholders (1)
  - James Wilson  1,000 shares (100%)

Registered office:     Suite 412, 1 Queen St, Auckland 1010
                       (matches a known registered-office service provider)
Address for service:   Same as registered office
Ultimate holding co:   None

Annual returns:        Not yet due (first one will be 2027-03).

Red flags
  - No NZ-resident or Australian-resident director. Companies Act 1993
    s 10 requires at least one. The Registrar can take action — and
    practically, it makes recovery against the company very hard if
    things go wrong.
  - Company is 2 months old and is being offered as the legal counterparty
    for a $50k loan. Very thin track record.
  - Director-as-sole-shareholder of a brand-new company is a normal
    structure for a startup, but combined with the above is worth
    pausing on.

Yellow flags
  - Registered office is a known "company service provider" address.
    Legal, common, but means there's no separate physical presence to
    visit.

What this doesn't tell you
  - James Wilson's UK credit / financial position. The register only
    lists his role. For a personal guarantee at this size you'd want
    a separate credit / identity verification step.
  - Whether the $50k will actually be used in the business or pass
    through to the director.
```

```
Next steps
----------
1. DO NOT lend $50k against this company in its current state without
   resolving the s 10 issue first. Ask the director to either appoint
   a NZ/AU-resident co-director or take the loan personally (which
   changes who you're really lending to).
2. If you take a personal guarantee from James Wilson, you're really
   lending to him personally. Treat it as a personal loan — get his
   independent legal advice clause in writing, and consider whether
   you actually want to lend to him at all.
3. Talk to a lawyer BEFORE signing anything at this loan size and
   complexity. The fee will be a fraction of the $50k at risk.

For anything material, talk to a lawyer or accountant before signing.
```
