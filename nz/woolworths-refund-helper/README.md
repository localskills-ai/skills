# Woolworths Refund Helper

Draft a clean, [Consumer Guarantees Act](https://www.legislation.govt.nz/act/public/1993/0091/latest/DLM311053.html)-compliant refund request for a Woolworths NZ online delivery, in the time it takes to make a coffee.

## What it does

You've had a poor Woolworths NZ delivery. Mince that smells off. Strawberries with mould. A pack of yoghurts that arrived past its use-by date. The bag of spinach that's slimy. The pack of chicken that's leaking.

This skill helps you:

1. **Identify the problem items** from your receipt and (optionally) photos you've already taken.
2. **Quote the right Consumer Guarantees Act section** — usually s6 (acceptable quality) or s7 (fitness for purpose) — so your message lands as a clear statutory request, not a vibes-based complaint.
3. **Draft the message** in a polite, factual tone that Woolworths' customer service can act on without back-and-forth.
4. **Tell you exactly what to do next** — paste into the Woolworths app, the [contact form](https://www.woolworths.co.nz/info/contact-us), or 0800 40 40 40.

It does **not** submit anything itself. The skill produces the draft. You send it.

## What it does NOT do

- It doesn't sign in to your Woolworths account.
- It doesn't access your stored payment methods.
- It doesn't contact Woolworths on your behalf.
- It doesn't make legal threats. The CGA is your protection — quoting the right section is enough.

## When to use it

Use it for:

- Quality issues with delivered groceries (perishables that arrived spoiled, items short-dated past acceptable, packaging integrity failures).
- Missing items from a delivery (paid for, not delivered).
- Substitutions you didn't ask for and don't want (where the substitution policy you agreed to allows refusal).
- Damaged items (broken eggs, crushed produce, leaking packaging).

Don't use it for:

- Buyer's remorse ("I changed my mind about these biscuits"). The CGA does **not** cover change of mind.
- Manufacturing recalls (Woolworths handles those proactively).
- In-store purchases (the workflow is different — go in or call the store directly).
- Disputes over the substitution **policy itself** (that's a complaint, not a refund request).

## Inputs

The skill works with whatever you have:

- **Order number** (e.g. `WW1234567`) — most useful, gives Woolworths an exact reference.
- **Order date** and **delivery date** — fine as fallback.
- **Receipt / order summary** — paste it or point to a PDF in your downloads. The skill can read both.
- **Photos of the problem** — optional but enormously helpful, especially for produce/packaging issues. Point to a folder or attach.
- **A short description of what's wrong** — one line is enough.

## Outputs

A drafted message (English NZ spelling, polite, factual), with:

- Your order reference.
- The affected items with item codes if available.
- The Consumer Guarantees Act section that applies.
- The remedy you're requesting (refund, replacement, or repair).
- A photo checklist if you should add visuals before sending.

Plus a one-line "what to do next" — where to paste it.

## Permissions

- `fileSystem.read:downloads` — to read a receipt PDF you've already downloaded.
- `fileSystem.read:photos` — to read photos you've taken of the problem items.
- `fileSystem.write:outputs` — to save the drafted message somewhere you can grab it.
- No network access. The skill never contacts Woolworths.
- No shell access.

## Example

> **You:** "Order WW1234567 arrived 2026-05-18, the punnet of strawberries had mould, and the pack of mince smelled off — both perishables, I refrigerated them within 10 minutes of delivery. Photos in `~/Downloads/ww-issue/`."

The skill drafts a message you paste into the Woolworths app, quotes s6 of the CGA (acceptable quality — perishables not safe to eat), references your order number, lists both items, requests a refund, and reminds you to attach the two photos.

See [`examples/`](./examples) for three worked examples.

## Why CGA, not just "complain"?

The Consumer Guarantees Act 1993 is the statute that protects consumers in NZ. When you buy food from a retailer (online or in store), there's a **guarantee of acceptable quality** under s6 — the food has to be fit for its ordinary purpose (in this case: to be eaten). When that guarantee is breached, you have a statutory right to a refund, replacement, or repair, and the retailer doesn't get to talk you out of it.

Phrasing your message as a request under the CGA — not a complaint — makes it process faster and makes the refusal much rarer. Woolworths' customer service team has had this conversation a thousand times. Speaking their language helps them help you.

## Tone

Polite. Factual. Specific. No threats, no escalation, no Karen energy. The CGA does the talking; you just provide the facts.

## Author

Built by [Paul Grey](https://secondbrain.nz) at Second Brain NZ. Tested on real Woolworths refund cases — works.

## Licence

MIT. See [LICENSE](./LICENSE).

## Version

`1.0.0` — initial release. See [CHANGELOG.md](./CHANGELOG.md).
