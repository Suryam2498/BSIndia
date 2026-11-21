# CLAUDE.md — BSIndia Bank Website

Project guidance for Claude. Read fully before making any change.

## 1. Project Overview

- **Project:** Public-facing website for **BSIndia Bank** (fictional/demo scheduled commercial bank).
- **Goal:** Rich, trustworthy, modern retail + corporate banking website with a **green theme**, in the style of leading Indian private-sector bank sites (layout patterns only — never copy ICICI's logo, wording, assets or trademarks).
- **Hosting:** Netlify (static site, deploy from Git or drag-and-drop `dist/`).
- **Audience:** Retail customers, NRIs, MSMEs, corporates, senior citizens, investors.
- **Disclaimer:** BSIndia is a demo brand. Footer must carry: "Demo website. Not an actual bank. No real banking services are offered." Do not use real DICGC/RBI registration numbers; use clearly marked placeholders.

## 2. Language & Terminology Rules (MANDATORY)

Follow **RBI norms and Indian banking terminology** everywhere (copy, labels, alt text, forms, FAQs).

Preferred terms:
| Use | Avoid |
|---|---|
| Savings Account, Current Account, Salary Account, Basic Savings Bank Deposit Account (BSBDA) | "Checking account" |
| Fixed Deposit (FD), Recurring Deposit (RD), Tax Saver FD | "CD", "Term deposit" only |
| IFSC, MICR, Branch Code, CIF Number | "Routing number", "Sort code" |
| NEFT, RTGS, IMPS, UPI, BBPS, NACH, e-Mandate | "Wire transfer" |
| KYC, Re-KYC, Video KYC (V-CIP), CKYC, Aadhaar eKYC, PAN, Form 60 | "ID verification" only |
| Home Loan, Personal Loan, Auto/Car Loan, Education Loan, Loan Against Property (LAP), Gold Loan | "Mortgage" |
| EMI, Repo-linked Lending Rate (RLLR), MCLR, Processing Fee, Pre-closure charges | "Monthly installment" |
| Net Banking / Internet Banking, Mobile Banking, Debit Card, Credit Card, Rupay | "Online banking" only |
| Nominee, Joint Holder, Mandate Holder, Minor Account with Guardian | "Beneficiary" for deposit nominee |
| Customer Grievance Redressal, Nodal Officer, Principal Nodal Officer, Banking Ombudsman → **RBI Integrated Ombudsman Scheme (RB-IOS), 2021** | "Complaint box" |
| Demat Account, Trading Account, Mutual Funds (SIP/Lumpsum), PPF, NPS, Sukanya Samriddhi, SGB | — |
| CRR, SLR, Repo Rate, Reverse Repo, MSF, NPA, CRAR, Priority Sector Lending | — |
| Foreign Exchange: NRE, NRO, FCNR(B) accounts, LRS, FEMA, Remittance | "Overseas account" |
| Currency: ₹ with Indian digit grouping (₹12,34,567.00) | $, 1,234,567 |
| Dates: DD-MM-YYYY or DD MMM YYYY | MM/DD/YYYY |

Compliance content that must appear on the site:
- **Fraud-awareness banner:** "Never share OTP, PIN, CVV or password. BSIndia will never ask for these."
- **Key Fact Statement (KFS)** link on loan pages (RBI KFS directive for retail loans).
- **Deposit insurance:** "Deposits insured up to ₹5,00,000 per depositor per bank by DICGC" (generic text, no fake registration numbers).
- **Customer Rights** (BCSBI-style Code of Bank's Commitment to Customers), **Grievance Redressal** page, **RBI Sachet / Ombudsman** link.
- **Interest rate and charges** disclosure: always "Rates are indicative, subject to change, T&C apply."
- Mutual funds / insurance disclaimers: "Mutual Fund investments are subject to market risks. Read all scheme related documents carefully." / "Insurance is the subject matter of solicitation. Third-party product."
- Standard lines: "Terms and conditions apply." "Subject to RBI guidelines."
- Never promise guaranteed returns, never use misleading "free"/"zero-cost" claims.

## 3. Brand & Logo

- **Name:** BSIndia Bank (short: BSIndia). Tagline suggestion: "Banking that grows with you." (placeholder, editable).
- **Logo:** Create an **original SVG** (`/assets/logo/bsindia-logo.svg`, plus `logo-mono.svg`, `logo-white.svg`, `favicon.svg`):
  - Concept: stylised "BS" monogram inside a rounded shield/leaf mark, with a subtle upward growth arrow; wordmark "BSIndia" + small "BANK".
  - Must be vector, scalable, readable at 24 px height, works on light and dark green backgrounds.
  - No resemblance to any existing bank logo (avoid ICICI's "i" with swirl, SBI keyhole, HDFC boxes, etc.).
  - Provide favicon (SVG + 32x32 PNG), `apple-touch-icon` 180x180, and OG image 1200x630.

## 4. Design System

### Colors (CSS variables in `:root`)
```
--bs-green-900: #0B3D2E;   /* deep brand, footers, headings on light */
--bs-green-700: #11694A;   /* primary */
--bs-green-600: #178A5F;   /* primary hover */
--bs-green-500: #22A06B;   /* accents, icons */
--bs-green-100: #E4F5EC;   /* tints, section backgrounds */
--bs-green-50:  #F3FAF6;
--bs-gold-500:  #E3A72F;   /* secondary accent, CTAs, highlights (sparingly) */
--bs-ink-900:   #12211B;   /* body text */
--bs-ink-600:   #4A5A52;   /* secondary text */
--bs-line:      #DCE6E0;   /* borders */
--bs-white:     #FFFFFF;
--bs-danger:    #C0392B;   /* errors, fraud alerts */
--bs-warning:   #B7791F;
--bs-info:      #1F6FB2;
```
- Contrast must meet **WCAG 2.1 AA** (4.5:1 body text). White text only on green-700 or darker.
- Gold is accent only (≤10% of any screen).

### Typography
- Headings: `Poppins` or `Montserrat` (600/700). Body: `Inter` or `Noto Sans` (400/500).
- Self-host fonts (woff2) or use `font-display: swap`. Support Devanagari fallback (`Noto Sans Devanagari`) for Hindi toggle.
- Scale: 14/16/18/24/32/44/56 px; line-height 1.5 body.

### Layout & Components
- 12-column grid, max width 1200–1280 px, mobile-first breakpoints: 480 / 768 / 1024 / 1280.
- Radius 12 px cards, soft shadows, 8-pt spacing scale.
- Reusable components: top utility bar (Personal / NRI / Corporate / MSME toggle, Login, Language, Locate Branch), sticky mega-menu, hero carousel, quick-access tiles, product cards, rate tables, EMI calculator, accordion FAQ, testimonial slider, branch/ATM locator, footer with regulatory links, cookie/consent banner, toast, modal.
- Icons: inline SVG (Lucide/Feather or custom). No emoji in UI.
- Motion: subtle (200–300 ms), respect `prefers-reduced-motion`.

## 5. Site Map (pages to build)

1. **Home** — hero offers, quick links (Open Account, Apply Loan, Pay Bills, Credit Card), calculators teaser, security tips, app download, news/offers.
2. **Personal Banking**
   - Accounts: Savings, Salary, Basic Savings (BSBDA), Senior Citizen, Minor, Women's, Current (under business)
   - Deposits: FD, RD, Tax Saver FD, Rates table
   - Cards: Debit, Credit (Rupay/Visa/Mastercard), Prepaid/Forex card
   - Loans: Home, Personal, Auto, Education, Gold, LAP
   - Investments & Insurance: Mutual Funds, PPF, NPS, SGB, Life/Health/General insurance
   - Digital: Net Banking, Mobile Banking, UPI, BBPS, FASTag
3. **NRI Banking** — NRE/NRO/FCNR(B), remittance, FEMA info
4. **Business / Corporate / MSME** — Current accounts, trade finance, cash management, working capital, MUDRA, CGTMSE-backed loans, GST payments
5. **Calculators** — EMI, FD/RD maturity, SIP, PPF, Home-loan eligibility, Income tax (new vs old regime, current FY)
6. **Rates & Charges** — Interest rates, Service charges, Schedule of Charges, MCLR/RLLR, Forex card rates
7. **Locate Us** — Branch & ATM locator (static JSON data + map embed), IFSC/MICR finder
8. **Security Centre** — Fraud awareness, phishing tips, report lost card, safe-banking checklist
9. **Customer Care** — Contact, Grievance Redressal (3-tier matrix with Nodal Officer & Principal Nodal Officer placeholders), RB-IOS link, Customer Rights, Service request forms
10. **About Us** — Vision, Board of Directors (placeholder), Investor Relations (results, shareholding, policies), Careers, CSR, Press
11. **Legal** — Terms of Use, Privacy Policy (aligned to DPDP Act, 2023), Cookie Policy, Disclaimer, Sitemap, Accessibility Statement
12. **Login page (demo UI only)** — Retail / Corporate toggle; no real authentication.
13. **404** and **Maintenance** pages.

## 6. Tech Stack & Project Structure

- **Default stack:** Static site — HTML5 + modern CSS (custom properties) + vanilla JS (ES modules). Optional: Vite for bundling. No heavy frameworks unless asked (Astro/Next static export acceptable if user requests).
- Keep it Netlify-friendly: output to `dist/` (or root if no build).

```
bsindia-bank/
├── CLAUDE.md
├── README.md
├── netlify.toml
├── package.json            # only if using Vite/build tooling
├── public/ (or root)
│   ├── index.html
│   ├── pages/              # personal/, nri/, business/, about/, legal/ ...
│   ├── assets/
│   │   ├── css/ (tokens.css, base.css, components.css, pages.css)
│   │   ├── js/  (nav.js, calculators.js, carousel.js, locator.js, forms.js)
│   │   ├── img/ (webp/avif, optimised)
│   │   ├── logo/
│   │   └── fonts/
│   ├── data/               # branches.json, rates.json, faqs.json
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── _redirects          # or in netlify.toml
│   └── 404.html
```

## 7. Netlify Deployment

- `netlify.toml` must include: `publish`, optional `command`, redirects (`/net-banking` → `/pages/digital/net-banking.html`, 404 fallback), and **security headers**:
  - `Content-Security-Policy` (self + fonts/maps origins only), `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`, `Strict-Transport-Security`.
  - Long-cache for `/assets/*` (immutable, 1 year); no-cache for HTML.
- Forms (Contact, Grievance, Callback): use **Netlify Forms** (`data-netlify="true"`, honeypot field + reCAPTCHA optional). **Never collect real PAN/Aadhaar/account numbers/OTP/passwords** in demo forms.
- Provide README steps: connect Git repo → Netlify → build settings → custom domain → HTTPS.

## 8. Quality Standards

- **Accessibility:** WCAG 2.1 AA, semantic landmarks, skip-to-content, keyboard-navigable mega-menu, visible focus, aria labels, alt text on all images, form labels/errors. Font-size controls (A− A A+) and high-contrast toggle.
- **Performance:** Lighthouse ≥ 90 on all four categories. Images in WebP/AVIF with `width/height`, lazy-loading below the fold, minimal JS, critical CSS inlined if needed.
- **SEO:** unique `<title>` and meta description per page, canonical URL, Open Graph/Twitter tags, JSON-LD (`BankOrCreditUnion`/`FinancialService`, `FAQPage`, `BreadcrumbList`), sitemap.xml, robots.txt.
- **Responsive:** test at 360, 768, 1024, 1440 px. Touch targets ≥ 44 px.
- **i18n-ready:** English default; structure for Hindi and Telugu toggle (`lang` attribute, text in data files where practical).
- **Browser support:** last 2 versions of Chrome, Edge, Firefox, Safari; Android WebView.

## 9. Security & Privacy Guidelines

- Static demo only: no real login, no backend that handles credentials or financial data.
- No secrets, API keys or tokens in the repo. Use Netlify environment variables if any are needed.
- Sanitise any rendered user input; avoid `innerHTML` with dynamic data.
- Privacy Policy and Cookie banner aligned to DPDP Act, 2023; analytics only after consent.
- Use only royalty-free/own-generated imagery (Unsplash/Pexels licence or custom SVG illustrations). Do not use photos of real identifiable people without licence; no other bank's trademarks.

## 10. Content Style

- Tone: clear, reassuring, professional; short sentences; plain English (Grade 8 level).
- CTA labels: "Open Account", "Apply Now", "Check Eligibility", "Calculate EMI", "Know More", "Download KFS".
- Numbers: Indian grouping, "p.a." for annual rates, "% p.a.", tenure in months/years.
- Sample interest rates are **illustrative** (e.g., Savings 2.75–3.00% p.a., FD 6.50–7.25% p.a., Senior citizen +0.50%) and must be labelled "indicative".
- Every product page ends with: Features → Eligibility → Documents Required (KYC) → Fees & Charges → FAQs → Apply CTA → Disclaimer.

## 11. Working Agreements for Claude

1. **Plan first:** list files to create; build in stages (design tokens → components → Home → inner pages → calculators → legal → Netlify config).
2. Follow section 2 terminology strictly; if unsure of a term, prefer the RBI/Indian usage.
3. Keep code clean, commented where non-obvious, no unused dependencies, consistent naming (BEM-style classes prefixed `bs-`).
4. After each stage, run a local preview and check: console errors, broken links, responsive layout, contrast.
5. Do not invent real regulatory numbers, licences, helplines or addresses; use clearly marked placeholders like `1800-XXX-XXXX` and `[Registered Office Address]`.
6. Don't overwrite existing files without reason; summarise changes after each task.
7. Ask the user before: adding a backend, changing brand colours, adding third-party scripts/trackers, or switching frameworks.

## 12. Definition of Done

- All pages in the site map render without errors, links resolve, 404 works.
- Logo and favicon set integrated; green theme consistent site-wide.
- Calculators produce correct results (verify with sample values).
- Compliance blocks and disclaimers present on relevant pages.
- Lighthouse and accessibility checks pass; `netlify.toml` validated; README has deploy steps.
- Site deployed to a Netlify preview URL and shared with the user.
