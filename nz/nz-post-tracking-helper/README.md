# NZ Post Tracking & Returns Helper

You feed the skill tracking numbers and screenshots of confirmation emails. It produces a clean parcel status board and drafts the messages you need when something goes wrong.

## What it does

- Takes tracking numbers (NZ Post / CourierPost / Pace) and pasted status screenshots and keeps a tidy "what's in transit" view.
- Drafts the wording for a **missing-parcel claim** through NZ Post's online claim form when something hasn't moved in too long.
- Drafts the wording for a **returns shipment** to the original sender — including consumer-rights references where relevant.
- Calculates the realistic delivery window for a given service tier (Economy vs Tracked vs CourierPost overnight).

It does NOT scrape NZ Post's tracking page. You give it the status text or screenshot; the skill structures it.

## Why this is useful

NZ Post's tracking emails are good. The website is fine. What's painful is:

- Tracking 6 parcels at once from different retailers (e.g. before Christmas).
- Knowing when "your parcel is at the depot" has crossed from normal to "I should ask".
- Writing the missing-parcel email so it doesn't disappear into a queue.
- Drafting a returns label / message under the [Consumer Guarantees Act](https://www.legislation.govt.nz/act/public/1993/0091/latest/DLM311053.html) when the item isn't fit for purpose.

## Inputs

- Tracking numbers (any format: `NZ`-prefix, `CP` for CourierPost, etc.).
- Screenshots or pasted text of the carrier's status page.
- The retailer (helps the skill know which return policy to reference).
- Order date and expected delivery date if you have them.

## Outputs

A status board:

```
Active parcels (3)
------------------
NZ123456789NZ  Mighty Ape    Out for delivery     2026-05-18
CP987654321    Allbirds      Awaiting collection  Auckland depot
NZ555444333NZ  Trade Me      Delayed (5 days)     ⚠ flagged

Flagged for action:
  - NZ555444333NZ has been "delayed" for 5 days. Realistic for Economy
    is up to 7 working days; this is at day 5. Wait 2 more, then file.
```

A drafted message when needed:

```
DRAFT — Missing parcel inquiry, NZ Post claims form
---------------------------------------------------
Tracking: NZ555444333NZ
Sent: 2026-05-08 from <SENDER>
Service: Economy Tracked
Last status: "In transit" (2026-05-11)

The parcel hasn't moved in 7 working days. Could you confirm its
current location and expected delivery date? If it's been lost in
transit, please open a claim under your missing-parcel process.

<NAME>
<DAYTIME PHONE>
```

## Permissions

- `fileSystem.read:downloads` — for screenshots and PDFs you've saved.
- `fileSystem.write:outputs` — to save the tracking history JSON.
- No network. The skill never contacts NZ Post.
- No shell.

## Tone

Polite. Factual. NZ-direct. The skill writes claims that customer service can act on — no threats, no escalation, no "what's the point of paying for tracked if…".

## What it won't do

- Auto-poll NZ Post's tracking page. NZ Post's terms forbid scraping; we comply.
- Generate a label. NZ Post labels require account integration and prepaid postage.
- File a claim on your behalf. You submit through the [NZ Post claims portal](https://www.nzpost.co.nz/help-support/claim-a-refund-or-loss).
- Determine whether something is genuinely lost. The skill flags items that look stuck; the carrier decides.

## Author

Paul Grey at [Second Brain NZ](https://secondbrain.nz).

## Version

`1.0.0` — initial release.
