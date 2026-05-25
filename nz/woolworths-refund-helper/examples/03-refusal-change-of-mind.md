# Example 3 — Refusal case (change of mind)

## Input

> Order CD5550123, delivered yesterday. I bought a pack of those new oat-milk yoghurts but I don't actually like them — they're fine, just not for me. Can you draft a refund request?

## Output

The skill refuses, briefly, and explains why. It does NOT produce a draft. It does NOT shame the user. It points them at the right resource.

```
Sorry — this skill doesn't draft change-of-mind refund requests.

The Consumer Guarantees Act 1993 covers products that are faulty, unsafe,
or don't match what was described. "I tried them and didn't like them" sits
outside that — the yoghurts aren't defective, you just prefer something else.

You can still ask Woolworths nicely; their customer service team sometimes
extends goodwill on opened-but-untouched items, especially for first-time
trials. That's a goodwill request, not a statutory one — phrase it as such
and don't mention the CGA.

If you'd like, paste your request as you'd like to phrase it and I can help
make it concise. Otherwise, no draft from me on this one.
```
