# Companies Office Annual Return

Prepares your NZ Companies Office annual return. Mandatory, due in a specific month each year, and a real headache to forget — directors can be personally fined for late filing. The annual return has a filing fee of **$49.74 + GST**. The skill produces a checklist of what to confirm, what to update, and what to do before you press submit on the [Companies Office](https://www.companiesoffice.govt.nz/) site.

## What it does

Every NZ company files an annual return once a year. It is **not** a tax return — no financials. It confirms the public register is accurate:

- Registered office address.
- Address for service.
- Directors (names, residential addresses, dates of birth held privately, NZ-resident director if applicable).
- Shareholders and shareholdings.
- Ultimate holding company (if any).
- AML status (yes/no — for reporting entities under the AML/CFT Act).
- Confirmation that the company has prepared (or, for very small companies, isn't required to prepare) financial statements.

The annual return month is set when you incorporate — it doesn't shift. You can file the return any time within that month. Filing fee is $49.74 + GST.

## Why this matters

- Filing late or missing the return can lead to the Registrar issuing a notice of intention to remove the company from the register. If the registrar acts on it, the company is dissolved. Reinstating costs money and time.
- Directors who fail to ensure annual returns are filed can be personally liable for fines.
- The Companies Office writes to the registered office in advance — but if the registered office address is out of date (because you moved), the reminder never reaches you.

## What this skill does

1. **Reads your last annual return** (PDF from your Companies Office account) and/or your most recent AGM minutes / shareholder register.
2. **Walks through each field** of the new return, comparing to last year.
3. **Flags anything that's likely changed but you haven't notified separately** (director's home address, new shareholder, etc.).
4. **Tells you what to file SEPARATELY** before the annual return — director changes, shareholding changes, and registered office changes are filed as their own actions, not buried inside the annual return.
5. **Drafts the AGM minutes** (or the equivalent shareholders' resolution if you don't hold a physical AGM — very common for one-shareholder companies).
6. **Produces the checklist** you take to the Companies Office login.

It does NOT file. The Companies Office requires login via [RealMe](https://www.realme.govt.nz/) — that's a personal-identity step we don't bypass.

## What it explicitly will not do

- Help you backdate, omit, or misrepresent any required information.
- Decide whether you're a reporting entity under the AML/CFT Act (separate analysis; conservative default is "no" but consult an accountant).
- Prepare financial statements. Filing accounts is a separate thing — only some companies (large, FMC reporting, etc.) actually need to file financials with the Companies Office.
- File the return. RealMe login required; user submits.

## Inputs

- Last year's annual return (PDF from Companies Office) — useful but optional.
- Last year's AGM minutes / shareholders' resolution.
- Anything that has changed: new director appointed, shareholder bought out, registered office moved, ultimate holding company changed.
- Company name and NZBN (or company number).

## Outputs

Two blocks:

1. **Pre-flight checklist** — what to update separately before opening the annual return form.
2. **Draft confirmation answers** — what to tick / fill on the annual return itself.

Plus a draft AGM minutes / shareholders' resolution if you don't have one.

## Permissions

- `fileSystem.read:documents` — for last year's PDFs, AGM minutes.
- `fileSystem.read:downloads` — alt location.
- `fileSystem.write:outputs` — to save the checklist and draft minutes.
- No network. The skill doesn't contact the Companies Office or any other agency.
- No shell.

## Author

Paul Grey ([@paulgrey](https://x.com/paulgrey)). Designed for solo / micro-company directors who fly close to the deadline.
