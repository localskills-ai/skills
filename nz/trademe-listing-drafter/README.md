# Trade Me Listing Drafter

You've got a thing to sell. This skill drafts the listing — title, category, condition wording, description, postage notes — from your photos and a one-line brief. NZ tone, no fluff.

## What it does

[Trade Me](https://www.trademe.co.nz/) listings live or die on three things: the title (search), the photos (you handle those), and the description (you've been putting that off).

This skill produces:

1. **Title** — under Trade Me's 80-character limit, with the keywords buyers actually search for. No SHOUTY CAPS, no clickbait.
2. **Category suggestion** — Trade Me has a deep category tree; the skill suggests the best leaf node based on your photos and brief.
3. **Condition wording** — "Used — like new", "Used — good", "Used — for parts" etc., matched to what the photos show.
4. **Key specs as bullet points** — extracted from photos when possible (visible measurements, model numbers on labels, sizes).
5. **Description body** — short paragraph + bullets, NZ-spelt, factual.
6. **Postage note** — suggests whether to offer pickup-only, NZ-wide shipping (your call which courier), or both.
7. **Pricing guidance** — if you ask, but defaults to "you decide; here are recent comparable Trade Me searches you could check" rather than inventing a price.

It does NOT post the listing. Trade Me Buyer Protection requires you list yourself through your verified account.

## Inputs

- 1–20 photos of the item (Trade Me allows up to 20 per Marketplace listing).
- One-line brief: `"selling my old Specialized Sirrus bike, has some scratches on the frame, includes lights"`.
- Optionally: a Trade Me category if you already know it, your preferred postage option, a reserve price.

## Outputs

```
Title (78/80 chars)
-------------------
Specialized Sirrus Hybrid Bike — Medium, Black, Lights Included

Category
--------
Sports → Cycling → Bikes & frames → Hybrid bikes

Condition: Used — good
(some frame scratches visible in photo 3, otherwise mechanically sound)

Description
-----------
Specialized Sirrus hybrid in medium (frame ~17"). Used commuter — fine on
mechanically, frame has a couple of scratches near the bottom bracket
(see photo 3). Comes with the lights pictured (front + rear, USB
rechargeable, batteries in good condition).

Key details:
- Frame: aluminium, medium (~17")
- Wheels: 700c
- Gears: 24-speed (3 x 8)
- Brakes: rim, both work fine
- Tyres: ~70% remaining
- Lights: included

Pickup or NZ courier (you pay the courier ticket — quoted at checkout).
No reserve. Happy to answer questions.

Postage suggestion
------------------
Offer both: "Pick up only OR NZ-wide courier at buyer cost".
Bikes are expensive to ship — most Trade Me buyers will collect.
```

## Permissions

- `fileSystem.read:photos` — to read the photos of the item.
- `fileSystem.read:downloads` — alt location for photos.
- `fileSystem.write:outputs` — to save the drafted listing.
- No network. The skill doesn't read Trade Me or any other site.
- No shell.

## What it won't do

- Set a price. Pricing is your call (and varies wildly by item). The skill produces the listing, not the valuation.
- Auto-list. Trade Me requires identity-verified accounts and 2FA — that's by design and we don't bypass it.
- Write hype. "WOW! UNBELIEVABLE! GENUINE BARGAIN!" doesn't pass moderation here.
- Misrepresent condition. If the photos show damage, the listing says "damaged" in the spot Trade Me expects.

## Trade Me-specific niceties

- **Buyer Protection** applies when the buyer pays via Ping or Afterpay — covers them up to $5,000 if the item doesn't arrive, isn't as described, or arrives broken. Keep payment in-app to stay covered.
- **Reserve auctions vs Buy Now** — the skill suggests but doesn't decide. For unique items reserve is fine; for commodities Buy Now sells faster.
- **Ping** — Trade Me's in-app card payment system (a virtual wallet). Mentioned in the listing if it's available for your category.
- **Selling fees** — from 10 March 2026 Trade Me dropped the 7.9% success fee for casual sellers on Marketplace (general items list for free; buyers pay a small service fee instead). In-trade sellers still pay success fees. You can mention "GST receipt available" if you're a GST-registered seller; otherwise leave it out.

## Tone

NZ-direct. The Trade Me readership rewards honest descriptions. "I drove this for 4 years, has a dent" gets more views and better bidders than "MINT BARGAIN PRICED TO SELL". The skill writes accordingly.

## Author

Paul Grey ([@paulgrey](https://x.com/paulgrey)).
