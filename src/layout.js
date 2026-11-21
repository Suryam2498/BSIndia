import { icon } from './icons.js';

export const SITE = {
  name: 'BSIndia Bank',
  url: process.env.SITE_URL || 'https://bsindia-bank.netlify.app',
  tel: '1800-123-1234',
  email: 'customercare@bsindia.example',
  year: new Date().getFullYear(),
};

export const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* ------------------------------ Navigation ------------------------------ */
export function buildNav(products) {
  const by = (section, group) =>
    products.filter((p) => p.section === section && p.group === group).map((p) => [p.title, p.path]);
  return [
    {
      label: 'Personal', i18n: 'nav.personal', wide: true, href: '/personal/',
      cols: [
        { h: 'Accounts', links: by('personal', 'Accounts') },
        { h: 'Deposits', links: by('personal', 'Deposits') },
        { h: 'Loans', links: by('personal', 'Loans') },
        { h: 'Cards, Invest & Insure', links: by('personal', 'Cards & Wealth') },
      ],
      cta: ['New to BSIndia? Open a Savings Account with Aadhaar eKYC or Video KYC (V-CIP).', 'Open Account', '/open-account/'],
    },
    { label: 'NRI Banking', i18n: 'nav.nri', href: '/nri/' },
    {
      label: 'Business', i18n: 'nav.business', href: '/business/',
      cols: [
        { h: 'Accounts & Services', links: [['Business Banking', '/business/business-banking/'], ['Current Account', '/business/current-account/']] },
        { h: 'Credit', links: [['MSME Loans (MUDRA / CGTMSE)', '/business/msme-loans/']] },
      ],
    },
    { label: 'Digital Banking', i18n: 'nav.digital', href: '/personal/digital-banking/' },
    {
      label: 'Tools & Rates', i18n: 'nav.tools',
      cols: [{ h: 'Tools', links: [['Calculators', '/calculators/'], ['Interest Rates & Charges', '/rates-and-charges/'], ['Branch / ATM Locator & IFSC', '/locate-us/']] }],
    },
    {
      label: 'Support', i18n: 'nav.support',
      cols: [{ h: 'Help', links: [['Customer Care', '/customer-care/'], ['Grievance Redressal', '/customer-care/grievance-redressal/'], ['Customer Rights', '/customer-care/customer-rights/'], ['Security Centre', '/security-centre/']] }],
    },
  ];
}

function navHtml(nav) {
  return nav.map((n, i) => {
    if (!n.cols) return `<li class="nav__item"><a class="nav__link" href="${n.href}" data-i18n="${n.i18n}">${n.label}</a></li>`;
    const cols = n.cols.map((c) =>
      `<div><h3>${c.h}</h3><ul>${c.links.map(([t, h]) => `<li><a href="${h}">${esc(t)}</a></li>`).join('')}</ul></div>`).join('');
    const cta = n.cta ? `<div class="mega__cta"><p class="small mb-0">${n.cta[0]}</p><a class="btn btn--primary btn--sm mt-2" href="${n.cta[2]}">${n.cta[1]}</a></div>` : '';
    const all = n.href ? `<div><h3>Overview</h3><ul><li><a href="${n.href}">All ${n.label} products</a></li></ul></div>` : '';
    return `<li class="nav__item"><button class="nav__btn" type="button" aria-expanded="false" aria-controls="mega-${i}"><span data-i18n="${n.i18n}">${n.label}</span>${icon('down')}</button>
<div class="mega${n.wide ? ' mega--wide' : ''}" id="mega-${i}">${cols}${cta ? '' : all}${cta}</div></li>`;
  }).join('\n');
}

/* -------------------------------- Header -------------------------------- */
export function header(nav, path) {
  return `<a class="skip-link" href="#main">Skip to main content</a>
<div class="alertbar" role="region" aria-label="Fraud alert"><div class="container">${icon('alert')}<span><strong>Beware of fraud.</strong> Never share your OTP, PIN, CVV or password with anyone. BSIndia Bank will never ask for these. <a href="/security-centre/">Know more</a></span></div></div>
<div class="topbar"><div class="container">
<ul class="topbar__seg" aria-label="Customer segment">
<li><a href="/personal/" ${path.startsWith('/personal') || path === '/' ? 'aria-current="true"' : ''} data-i18n="seg.personal">Personal</a></li>
<li><a href="/nri/" ${path.startsWith('/nri') ? 'aria-current="true"' : ''} data-i18n="seg.nri">NRI</a></li>
<li><a href="/business/" ${path.startsWith('/business') ? 'aria-current="true"' : ''} data-i18n="seg.business">Business</a></li>
<li><a href="/business/msme-loans/" data-i18n="seg.msme">MSME</a></li></ul>
<ul class="topbar__tools">
<li><a href="/locate-us/" data-i18n="tb.locate">Locate Us</a></li>
<li><a href="/customer-care/" data-i18n="tb.care">Customer Care</a><span class="tb-contact"> · ${SITE.tel}</span></li>
<li><label class="sr-only" for="lang">Language</label><select id="lang" aria-label="Language"><option value="en">English</option><option value="hi">हिन्दी</option><option value="te">తెలుగు</option></select></li>
<li class="fs-ctrl" role="group" aria-label="Text size"><button type="button" data-fs="sm" aria-label="Decrease text size">A−</button><button type="button" data-fs="md" aria-label="Default text size">A</button><button type="button" data-fs="lg" aria-label="Increase text size">A+</button></li>
<li><button type="button" id="hc-toggle" aria-pressed="false">High contrast</button></li></ul>
</div></div>
<header class="site-header"><div class="container">
<a class="brand" href="/" aria-label="BSIndia Bank – Home"><img src="/assets/logo/bsindia-logo.svg" width="180" height="46" alt="BSIndia Bank"></a>
<nav class="nav" id="site-nav" aria-label="Main navigation">
<button class="nav__close" type="button" aria-label="Close menu">${icon('close')}</button>
<ul class="nav__list">${navHtml(nav)}<li class="nav__item nav__login"><a class="nav__link" href="/login/">Login</a></li></ul></nav>
<div class="header-actions">
<a class="btn btn--outline btn--sm" href="/login/"><span data-i18n="btn.login">Login</span></a>
<a class="btn btn--gold btn--sm" href="/open-account/"><span data-i18n="btn.open">Open Account</span></a>
<button class="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="site-nav">${icon('menu')}</button></div>
</div></header><div class="nav-backdrop"></div>`;
}

/* -------------------------------- Footer -------------------------------- */
export function footer(products) {
  const list = (section, group) =>
    products.filter((p) => p.section === section && (!group || p.group === group)).slice(0, 7)
      .map((p) => `<li><a href="${p.path}">${esc(p.title)}</a></li>`).join('');
  return `<footer class="footer">
<div class="container footer__grid">
<div class="footer__brand"><img src="/assets/logo/logo-white.svg" width="180" height="46" alt="BSIndia Bank"><p>Banking that grows with you. Savings, loans, cards and digital banking for every Indian.</p><p class="small">Customer Care: ${SITE.tel}<br>${SITE.email}</p></div>
<div><h4>Personal</h4><ul>${list('personal')}</ul></div>
<div><h4>NRI &amp; Business</h4><ul><li><a href="/nri/">NRI Banking (NRE / NRO / FCNR-B)</a></li>${list('business')}</ul></div>
<div><h4>Support</h4><ul><li><a href="/customer-care/">Customer Care</a></li><li><a href="/customer-care/grievance-redressal/">Grievance Redressal</a></li><li><a href="/customer-care/customer-rights/">Customer Rights</a></li><li><a href="/security-centre/">Security Centre</a></li><li><a href="/locate-us/">Locate Branch / ATM</a></li><li><a href="/calculators/">Calculators</a></li><li><a href="/rates-and-charges/">Rates &amp; Charges</a></li></ul></div>
<div><h4>About BSIndia</h4><ul><li><a href="/about-us/">About Us</a></li><li><a href="/about-us/investor-relations/">Investor Relations</a></li><li><a href="/about-us/careers/">Careers</a></li><li><a href="/sitemap/">Sitemap</a></li></ul>
<h4 class="mt-2">RBI resources</h4><ul><li><a href="https://cms.rbi.org.in" target="_blank" rel="noopener noreferrer">RBI Complaint Management System (RB-IOS)</a></li><li><a href="https://sachet.rbi.org.in" target="_blank" rel="noopener noreferrer">RBI Sachet</a></li><li><a href="https://rbikehtahai.rbi.org.in" target="_blank" rel="noopener noreferrer">RBI Kehta Hai</a></li></ul></div>
</div>
<div class="footer__reg"><div class="container">
<p><strong>Demo website.</strong> BSIndia Bank is a fictional brand created for demonstration. Not an actual bank. No real banking services are offered. Registered Office: [Registered Office Address – placeholder]. CIN: [placeholder]. RBI Licence No.: [placeholder].</p>
<p>Deposits are insured by the Deposit Insurance and Credit Guarantee Corporation (DICGC) up to ₹5,00,000 per depositor per bank. Interest rates and charges shown are indicative, subject to change and to RBI guidelines. Terms and conditions apply.</p>
<p>Mutual Fund investments are subject to market risks. Read all scheme related documents carefully. Insurance is the subject matter of solicitation. Third-party products are not obligations of the Bank.</p>
</div></div>
<div class="footer__bar"><div class="container"><span>© ${SITE.year} BSIndia Bank (demo). All rights reserved.</span>
<span class="footer__links"><a href="/legal/privacy-policy/">Privacy Policy</a><a href="/legal/terms-of-use/">Terms of Use</a><a href="/legal/cookie-policy/">Cookie Policy</a><a href="/legal/disclaimer/">Disclaimer</a><a href="/legal/accessibility/">Accessibility</a></span></div></div>
</footer>
<div class="cookie" id="cookie" role="dialog" aria-label="Cookie consent"><p>We use essential cookies to run this site. With your consent we may also use analytics cookies, as described in our <a href="/legal/cookie-policy/">Cookie Policy</a> and in line with the Digital Personal Data Protection Act, 2023.</p><div class="cookie__btns"><button class="btn btn--outline btn--sm" data-cookie="decline" type="button">Essential only</button><button class="btn btn--primary btn--sm" data-cookie="accept" type="button">Accept all</button></div></div>`;
}

/* ------------------------------ Page wrapper ----------------------------- */
export function page({ path, title, description, body, hero, products, nav, schema, noindex, scripts = [] }) {
  const full = path === '/' ? `${SITE.name} – Savings, Loans, Cards & Digital Banking` : `${title} | ${SITE.name}`;
  const url = SITE.url + path;
  const crumbs = hero?.crumbs
    ? `<nav class="crumbs" aria-label="Breadcrumb"><ol>${hero.crumbs.map(([t, h], i, a) => `<li>${h && i < a.length - 1 ? `<a href="${h}">${esc(t)}</a>` : `<span aria-current="page">${esc(t)}</span>`}</li>`).join('')}</ol></nav>` : '';
  const heroHtml = hero ? `<section class="page-hero"><div class="container">${crumbs}<h1>${esc(hero.title)}</h1>${hero.lead ? `<p>${esc(hero.lead)}</p>` : ''}${hero.actions ? `<div class="page-hero__row">${hero.actions}</div>` : ''}</div></section>` : '';
  const ld = schema ? `<script type="application/ld+json">${JSON.stringify(schema)}</script>` : '';
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(full)}</title>
<meta name="description" content="${esc(description)}">
<meta name="theme-color" content="#11694A">
${noindex ? '<meta name="robots" content="noindex">' : ''}
<link rel="canonical" href="${url}">
<meta property="og:type" content="website"><meta property="og:site_name" content="${SITE.name}">
<meta property="og:title" content="${esc(full)}"><meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}"><meta property="og:image" content="${SITE.url}/assets/logo/og-image.png">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/assets/logo/favicon.svg" type="image/svg+xml"><link rel="icon" href="/assets/logo/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/assets/logo/apple-touch-icon.png">
<link rel="preload" href="/assets/fonts/poppins-latin-600-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/inter-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/tokens.css"><link rel="stylesheet" href="/assets/css/base.css"><link rel="stylesheet" href="/assets/css/components.css"><link rel="stylesheet" href="/assets/css/pages.css">
${ld}
</head>
<body>
${header(nav, path)}
<main id="main">
${heroHtml}
${body}
</main>
${footer(products)}
<script type="module" src="/assets/js/main.js"></script>
${scripts.map((s) => `<script type="module" src="${s}"></script>`).join('\n')}
</body>
</html>
`;
}

/* ------------------------------ UI helpers ------------------------------ */
export const faqHtml = (faqs) =>
  `<div class="faq">${faqs.map(([q, a]) => `<details><summary>${esc(q)}</summary><div><p>${a}</p></div></details>`).join('')}</div>`;

export const checklist = (items) =>
  `<ul class="checklist">${items.map((i) => `<li>${icon('check')}<span>${i}</span></li>`).join('')}</ul>`;

export const table = (caption, head, rows, numCols = []) =>
  `<div class="table-wrap"><table><caption>${esc(caption)}</caption><thead><tr>${head.map((h, i) => `<th scope="col"${numCols.includes(i) ? ' class="num"' : ''}>${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c, i) => `<td${numCols.includes(i) ? ' class="num"' : ''}>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;

const FIELDS = {
  emi: [['amount', 'Loan amount (₹)', 100000, 20000000, 50000, 2500000], ['rate', 'Interest rate (% p.a.)', 6, 20, 0.05, 8.5], ['years', 'Tenure (years)', 1, 30, 1, 20]],
  fd: [['amount', 'Deposit amount (₹)', 10000, 10000000, 5000, 500000], ['rate', 'Interest rate (% p.a.)', 3, 9, 0.05, 7], ['years', 'Tenure (years)', 1, 10, 1, 3]],
  rd: [['amount', 'Monthly instalment (₹)', 500, 100000, 500, 5000], ['rate', 'Interest rate (% p.a.)', 3, 9, 0.05, 6.75], ['years', 'Tenure (years)', 1, 10, 1, 5]],
  sip: [['amount', 'Monthly SIP (₹)', 500, 100000, 500, 10000], ['rate', 'Expected return (% p.a.)', 1, 30, 0.5, 12], ['years', 'Period (years)', 1, 40, 1, 15]],
  ppf: [['amount', 'Yearly deposit (₹)', 500, 150000, 500, 150000], ['rate', 'Interest rate (% p.a.)', 4, 10, 0.1, 7.1], ['years', 'Period (years)', 15, 50, 5, 15]],
  elig: [['income', 'Net monthly income (₹)', 15000, 1000000, 5000, 100000], ['obligations', 'Existing EMIs per month (₹)', 0, 500000, 1000, 10000], ['rate', 'Interest rate (% p.a.)', 6, 20, 0.05, 8.5], ['years', 'Tenure (years)', 1, 30, 1, 20]],
  tax: [['income', 'Annual salary income (₹)', 300000, 10000000, 25000, 1500000]],
};
const NOTES = {
  emi: 'EMI = P × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), r = monthly rate. Indicative only; actual EMI depends on sanctioned rate, processing fee and the Key Fact Statement (KFS).',
  fd: 'Interest compounded quarterly. Indicative; TDS may apply as per Income-tax law.',
  rd: 'Interest compounded quarterly on monthly instalments. Indicative only.',
  sip: 'Mutual Fund investments are subject to market risks. Returns are not guaranteed; this is an illustration, not a projection.',
  ppf: 'PPF rate is notified by the Government of India every quarter. Maximum deposit ₹1,50,000 per financial year. Indicative.',
  elig: 'Assumes total fixed obligations up to 50% of net monthly income. Final eligibility is subject to credit appraisal, CIBIL score and policy.',
  tax: 'Illustrative estimate under the new tax regime (standard deduction ₹75,000, 87A rebate and 4% cess). Slabs change with each Union Budget – verify with the Income Tax Department.',
};
export function calc(type, id = type) {
  const rows = FIELDS[type].map(([n, l, min, max, step, val]) =>
    `<div class="calc__row"><label for="${id}-${n}-n">${l}<input type="number" id="${id}-${n}-n" data-num="${n}" min="${min}" max="${max}" step="${step}" value="${val}" inputmode="decimal"></label>
<input type="range" data-range="${n}" min="${min}" max="${max}" step="${step}" value="${val}" aria-label="${l}"></div>`).join('');
  return `<div class="calc" data-calc="${type}"><div class="calc__in">${rows}<p class="calc-note">${NOTES[type]}</p></div><div class="calc__out" aria-live="polite"></div></div>`;
}
