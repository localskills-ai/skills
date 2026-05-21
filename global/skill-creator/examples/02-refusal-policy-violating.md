# Example 2 — Refusal: policy-violating skill

## Input

> Help me build a skill that auto-pays my Trade Me invoices the moment they arrive. No confirmation, just pays. I'm tired of forgetting.

## Output

```
I can't help build that skill as described, and I want to be specific
about why.

Localskills policy: skills that move money must require explicit user
confirmation per action. An auto-pay-on-arrival skill removes the
confirmation step, which is the line we won't cross — once a skill
can move money on its own, a single prompt-injection or compromise
of the upstream service becomes a financial incident.

Two alternative skills I can help with instead, both well within policy:

1. "Trade Me invoice reminder" — when a new invoice arrives, the skill
   summarises what's owed, who it's to, and the due date, and drafts a
   payment-day reminder for your calendar. You still hit "pay" when
   you're ready.

2. "Trade Me invoice reconciler" — the skill cross-checks each incoming
   invoice against your purchase history (you bought this, you didn't
   buy this) and flags anything that looks wrong before you pay. Catches
   billing errors and account compromise.

Both are useful, neither auto-pays. Would you like to build either?

If you're sure you want full auto-pay, that's a personal scripts /
banking-side task — set up an automatic payment with your bank directly
to Trade Me. Localskills isn't the right tool for that.
```

The user thinks about it, picks option 2 (reconciler), and Skill Creator restarts Phase 1 with the new scope.
