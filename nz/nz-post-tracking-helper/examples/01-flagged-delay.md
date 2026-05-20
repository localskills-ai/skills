# Example 1 — Economy parcel flagged for delay

## Input
> Tracking NZ555444333NZ from Trade Me, Economy Tracked, sent 2026-05-08. Last status "In transit" on 2026-05-11. Today is 2026-05-19.

## Output
```
Active parcels (1)
------------------
NZ555444333NZ  Trade Me  Delayed  In transit since 2026-05-11

Flagged for action:
  - NZ555444333NZ has been "In transit" for 8 working days. Economy
    Tracked typical window is 2–7 working days. Time to inquire.
```

```
DRAFT — Missing parcel inquiry, NZ Post claims form
---------------------------------------------------
Tracking: NZ555444333NZ
Sent: 2026-05-08 from Trade Me
Service: Economy Tracked
Last status: "In transit" (2026-05-11)

The parcel hasn't moved in 8 working days, past the typical delivery
window for this service. Could you confirm its current location and
expected delivery date? If it's been lost in transit, please open a
claim under your missing-parcel process and let me know what's needed
from my end.

<NAME>
<DAYTIME PHONE>
```
