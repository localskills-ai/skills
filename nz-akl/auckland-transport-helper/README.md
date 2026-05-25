# Auckland Transport Helper

Auckland Transport's services are mostly fine. The forms, fare disputes, AT HOP balance issues, and lost-card replacements are not. This skill drafts the messages, decodes the journey planner when it's confusing, and points you at the right concession.

## What it does

- **AT HOP balance / load issues** — drafts the message to send when a top-up didn't apply or a tagged-on journey wasn't charged correctly.
- **Fare disputes** — drafts the AT customer-service message when you've been overcharged (wrong concession, two-tap penalty fare, ghost ride after a tag-off failure).
- **Concession check** — works out whether you should be on Adult, Tertiary, Child, SuperGold, or Community Services Card concession, and how to register it on your HOP.
- **Lost card replacement** — drafts the lost-card form and reminds you to transfer the balance.
- **No-show complaints** — drafts a complaint when a scheduled bus / train / ferry didn't show, including the right route number, scheduled time, and tag-on timestamp.
- **Journey plan decoder** — when AT Mobile suggests a strange-looking plan (e.g. "walk 800m to a different stop") it explains why.

It does NOT plan journeys for you — [AT Mobile](https://at.govt.nz/bus-train-ferry/journey-planner) does that better and uses live data.

## What it's good for

The friction in Auckland public transport isn't usually the trip itself — it's the admin around the trip. Working out why $4.20 came off your HOP for a 1-zone ride, registering Community Services Card concession when AT's form doesn't recognise your card, getting a refund for a no-show bus where the driver tagged through without you. The skill writes the message AT can act on.

## What it can't fix

- Live disruptions. Check AT Mobile or @AucklandTransport on X.
- Wrong driver behaviour requiring formal complaint to Auckland Council — that's a different process; the skill points you there.
- Fare zone definitions. Those are AT's, not the skill's; if you disagree about whether your trip is 1 zone or 2, the skill notes that and recommends checking AT's [zone map](https://at.govt.nz/bus-train-ferry/fares-and-discounts/fare-zones-and-calculating-how-much-you-pay).

## Inputs

- Your AT HOP card number (last 4 digits is enough — full number doesn't help).
- Transaction screenshot or AT Mobile receipt PDF.
- Route number(s), date, scheduled time.
- A one-line description of what went wrong.
- Your status (Adult, Tertiary, Child, SuperGold, CSC).

## Outputs

A message you submit via [AT's contact us page](https://at.govt.nz/about-us/contact-us) (online form / phone), plus what to do next.

```
DRAFT — AT Customer Service inquiry
-----------------------------------
AT HOP card ending: 4521
Date of issue: 2026-05-15

Tagged on at Britomart 16:42 to NX1 (Northern Express) heading to
Albany. The bus terminated at Constellation Drive (driver
announcement: mechanical fault). I tagged off at Constellation
Drive 17:08 and walked to Albany.

I was charged a 3-zone fare ($6.20). I had completed only a 2-zone
trip (Britomart → Constellation Drive). Please refund the
difference.

Receipt screenshot attached.

<NAME>
<DAYTIME PHONE>
```

```
What to do next
---------------
1. AT contact us page: https://at.govt.nz/about-us/contact-us
2. Use the AT HOP / fare enquiry option (online form or phone).
3. Paste the message and attach the screenshot.
4. Refunds usually credit to the card within 5 working days.
```

## Permissions

- `fileSystem.read:downloads` — for receipt PDFs / screenshots.
- `fileSystem.write:outputs` — to save the drafts.
- No network. The skill doesn't connect to AT's APIs (they're internal).
- No shell.

## Concession quick reference

| Concession | Discount | When | How to register |
|------------|----------|------|-----------------|
| Adult | None (baseline) | Always | Default on new HOP cards |
| Child (5–15) | 40% off Adult; free weekends + public holidays | Always | Apply with proof of age |
| Secondary (16–19) | 40% off Adult | Always | Apply via [AT website](https://at.govt.nz/bus-train-ferry/fares-and-discounts/discounted-fares) with school confirmation |
| Tertiary | 40% off Adult (doubled from 20% on 14 December 2025) | Always | Apply via your MyAT account with student ID |
| SuperGold (65+) | Free | After 9am weekdays + all day weekends/public holidays | Register SuperGold to AT HOP |
| SuperGold (65+) | Adult fare | Before 9am weekdays | (i.e. peak fare applies) |
| Community Services Card (Community Connect) | 50% off Adult | Always | Apply via AT Community Connect form |
| Total Mobility / Free Travel Passes | Separate scheme | Separate eligibility | Separate forms |

The exact dollar fares move; concession **percentages and time restrictions** are stable. If the user asks for a current fare, point them at AT's fare zone map.

## Tone

Specific. Factual. NZ-direct. AT's customer-service team handles thousands of queries — concrete dates, card-ending, and route numbers help them help you.

## Author

Paul Grey ([@paulgrey](https://x.com/paulgrey)). Auckland-resident pain validated.
