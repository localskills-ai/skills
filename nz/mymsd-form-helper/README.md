# MyMSD Form Helper

Helps you fill in NZ [Work and Income](https://www.workandincome.govt.nz/) (MSD) forms — Jobseeker Support, Sole Parent Support, Accommodation Supplement, Special Needs Grants, reviews, and reapplications. Translates the bureaucratic language to plain English, lists the evidence you need, and produces a draft you paste into MyMSD.

## What it does

MSD's forms are written in a particular register that's not always easy to parse, especially in stressful situations. This skill:

1. **Asks plain-English questions** that map to the form's required fields.
2. **Tells you which documents you need** before you start (so you don't get stuck mid-form chasing payslips).
3. **Drafts answers** for the long-form questions ("Why are you applying?", "What support are you seeking?", "Tell us about your circumstances") in a tone that fits MSD's expectations — factual, specific, undramatic.
4. **Helps with reviews / re-applications** — the trickier path where MSD has previously declined or paused a benefit.

It does NOT log into MyMSD. It does NOT submit. It does NOT advise you whether you're eligible — that's MSD's decision.

## Why this matters

MSD interactions can feel high-stakes. The system rewards clear, specific, evidence-backed answers and penalises vague ones (often by requesting "more information" which restarts the clock). A helper that gets the wording right and lists the evidence up front shortens the loop.

## Forms covered

- **Jobseeker Support application** (the main unemployment benefit).
- **Sole Parent Support application.**
- **Supported Living Payment** (for those with a long-term health condition or disability).
- **Accommodation Supplement** (a top-up for rent / board / mortgage).
- **Special Needs Grant** (one-off, non-recoverable — for food, urgent bills).
- **Recoverable Assistance Programme** loans (food, urgent dental, white goods).
- **Review / re-application** after a decline or pause.
- **Change-of-circumstances** notifications (income change, address change, partner status).

NOT covered:

- NZ Superannuation. Different form, different rules — talk to MSD directly.
- Working for Families (administered by IRD, not MSD).
- ACC claims (separate agency — see `acc-claim-helper` if it exists yet).
- Anything immigration-related (MBIE / Immigration NZ, not MSD).

## Inputs

The skill works with whatever you can give it:

- **Your situation** in a sentence or two.
- **Payslips, bank statements, or income records** — for income-tested benefits.
- **Tenancy agreement / mortgage statement** — for Accommodation Supplement.
- **Medical certificate** — for Supported Living Payment or Jobseeker (Health Condition).
- **Custody/care arrangements** — for Sole Parent Support.
- **Previous MSD correspondence** — letters, MyMSD messages — especially for reviews.

If you don't have something, the skill tells you what to gather and which sources accept what.

## Outputs

Two blocks:

1. **What to gather** — a checklist of documents tailored to your form and circumstances.
2. **Draft answers** — for each of the form's open-text fields, a draft you can copy.

Plus a short "what to do next" with the MyMSD navigation path.

## A note on tone

MSD case managers see a lot of forms. The ones that get processed quickly are:

- **Specific.** Dates, dollar amounts, hours per week. Not "a while ago" or "not much".
- **Factual.** "I was made redundant on 6 May 2026" — not "things have been really hard lately".
- **Evidence-backed.** Mention what evidence supports each claim and that it's attached.
- **Not over-explained.** One paragraph per open question; not five.

The skill writes in this register by default.

## Permissions

- `fileSystem.read:documents` — to read tenancy agreements, medical certificates, payslips.
- `fileSystem.read:downloads` — alt location for PDFs.
- `fileSystem.write:outputs` — to save the draft.
- No network. The skill never contacts MSD, MyMSD, or any agency.
- No shell.

## What it explicitly will not do

- Tell you whether you're eligible. MSD decides that.
- Help you misrepresent your circumstances. Refused at all costs.
- Help you "appeal" a decision — appeals go to the [Social Security Appeal Authority](https://www.msd.govt.nz/about-msd-and-our-work/about-msd/our-structure/decision-making/appeals.html); the skill can help draft, but always recommends talking to a budgeting service or [Community Law](https://communitylaw.org.nz/) first.
- Provide legal advice. Welfare law is genuinely complex.
- Suggest claiming for someone else without their knowledge or consent.

## Safety level: medium

Marked `medium` because the skill touches benefits applications. Wrong information on a benefit form can be a serious matter. The skill is deliberately conservative — refuses anything that looks like misrepresentation, repeats "this is a draft, you check it before submitting" loudly.

## Author

Paul Grey at [Second Brain NZ](https://secondbrain.nz). Designed with respect for users navigating MSD's processes.

## Version

`1.0.0` — initial release.
