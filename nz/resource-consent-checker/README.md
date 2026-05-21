# Resource Consent Checker

You describe the work you want to do at your property. The skill tells you whether it's likely to need a **building consent** (under the Building Act 2004), a **resource consent** (under the RMA and your district plan), both, or neither. Advisory only.

## Why this is useful

NZ has two parallel consent systems people regularly confuse:

- **Building consent** — issued by your local council under the [Building Act 2004](https://www.legislation.govt.nz/act/public/2004/0072/latest/DLM306036.html). About structural / safety / energy / sanitary compliance. [Schedule 1 of the Act](https://www.legislation.govt.nz/act/public/2004/0072/latest/DLM306902.html) lists work that's **exempt** from building consent.
- **Resource consent** — issued by your local council under the [Resource Management Act 1991](https://www.legislation.govt.nz/act/public/1991/0069/latest/DLM230264.html) (currently being phased out — the Natural and Built Environment Act and Spatial Planning Act are taking over). About land use, heritage, neighbour effects, district-plan zoning rules.

A simple deck might be exempt under both. A small dwelling might need both. A retaining wall over 1.5m needs a building consent but might also need resource consent if it changes site stormwater. The rules are real and councils enforce them.

## What this skill does

You tell it:

- What council area you're in.
- What you want to build (in words).
- Approximate dimensions.
- Whether it touches a boundary, public reserve, heritage building, sloping site, flood-prone area, or coastal zone.

It tells you:

- Whether the work is likely exempt under Schedule 1.
- Whether it likely needs a resource consent (best-effort against common council rules — councils vary).
- Which boxes you definitely need to check on the council's site before you start.
- The closest exempt categories so you can adjust your plans if you want to stay under the limit.

It's **advisory**. The skill will tell you "you should ring the council's duty planner" for anything ambiguous, and recommends doing so for anything you'd rather not redo if it's been built non-compliantly.

## What it explicitly is NOT

- A pre-application. Councils have free / low-cost pre-application meetings — do those.
- Legal advice. RMA / district plan / Building Act questions can get expensive. For anything contentious, talk to a planner or a lawyer.
- A guarantee that anything is exempt — the skill summarises the rules; council officers apply them.

## Inputs

- Council area or address (suburb is fine — full street address is not stored).
- Description of the work, including:
  - Type (deck, fence, sleepout, retaining wall, alteration, new dwelling, etc.).
  - Size (length × width × height, m²).
  - Materials (timber, brick, concrete, kit-set).
  - Location on the property (boundary distance, on a slope, near a stream).
- Any known property constraints (heritage zone, character overlay, flood overlay, geotechnical issues, special amenity area).

## Outputs

```
Your proposal
-------------
A 12 m² wooden deck, attached to the rear of the house, 600mm off
the ground at the high end, 2.4m from the rear boundary, on a flat
section in Auckland Council's Mixed Housing Suburban zone.

Building consent
----------------
LIKELY EXEMPT under Schedule 1, clause 1(a) — single-storey decks
not more than 1.5m above the supporting ground, with no specified
construction prerequisites for clause 1(a).

Still need to:
  - Comply with Building Code regardless of consent exemption.
  - Use a licensed building practitioner (LBP) only if required
    for the specific work — generally not for a deck under 1m.

Resource consent
----------------
LIKELY NOT REQUIRED under Auckland Unitary Plan Mixed Housing
Suburban zone for a deck that:
  - Doesn't exceed permitted building coverage (40% in MHS).
  - Sits inside the height-in-relation-to-boundary envelope (you
    haven't said how tall — confirm).
  - Doesn't impede a stormwater overland flow path or stream margin.

You should still:
  - Check your LIM for any property-specific overlays (heritage,
    flood, character).
  - Confirm the deck doesn't push your site over the coverage limit.

Call council if
---------------
  - You're near a heritage building, in a character zone, or in a
    Special Character Area.
  - Stormwater drains via the deck location.
  - Any neighbour might reasonably object — talking to neighbours
    early prevents expensive surprises.

Recommendation
--------------
Likely safe to proceed without consents, BUT pull a LIM for your
property (~$58 at Auckland Council) and check for overlays before
starting. If anything on the LIM is unfamiliar, ring the duty
planner — free, 09 301 0101.

(Advisory only — confirm with Auckland Council before building.)
```

## Permissions

- `fileSystem.read:documents` — to read a LIM PDF, site plan, or property file you've already downloaded.
- `fileSystem.read:downloads` — alt location.
- `fileSystem.write:outputs` — to save the assessment.
- No network. The skill doesn't fetch district plans or council records online.
- No shell.

## Councils with stronger plan-rule coverage

The skill has best-effort knowledge of these district plans:

- Auckland Council (Auckland Unitary Plan)
- Wellington City Council
- Christchurch City Council
- Hamilton City Council
- Tauranga City Council
- Dunedin City Council
- Hutt City Council
- Porirua City Council
- Selwyn District Council

For other councils, the skill still applies Schedule 1 (which is national), but treats district-plan questions as "ring the duty planner" rather than guessing.

## Author

Paul Grey at [Second Brain NZ](https://secondbrain.nz). The intent is to keep simple work simple — most decks, fences, and small structures are exempt. Hard cases go to the council.
