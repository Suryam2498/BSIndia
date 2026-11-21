import { icon } from './icons.js';
import { esc, faqHtml, checklist, table, calc, SITE } from './layout.js';
import { PRODUCTS, BY_SLUG } from './products.js';

const strip = (s) => s.replace(/<[^>]+>/g, '');
const link = (href, text, cls = 'link-arrow') => `<a class="${cls}" href="${href}">${text}${cls === 'link-arrow' ? icon('arrow') : ''}</a>`;
const DISC = 'Rates, fees and charges marked * are indicative and subject to change, to RBI guidelines and to the Bank’s Schedule of Charges. Terms and conditions apply. BSIndia Bank is a demo brand; no real banking services are offered.';

const productCard = (p) => `<a class="card" href="${p.path}"><span class="card__ico">${icon(p.icon)}</span><h3>${esc(p.title)}</h3><p>${esc(p.tagline)}</p><span class="link-arrow">Know more${icon('arrow')}</span></a>`;

/* ---------------------------- Product page body --------------------------- */
function fdRates() {
  return `<section id="rates"><h2>Interest rates*</h2>${table('Fixed Deposit rates (₹ less than ₹3 crore) – indicative, % p.a.', ['Tenure', 'General', 'Senior Citizens'], [
    ['7 – 14 days', '3.00%', '3.50%'], ['15 – 45 days', '3.50%', '4.00%'], ['46 – 90 days', '4.50%', '5.00%'], ['91 – 180 days', '5.25%', '5.75%'], ['181 days – less than 1 year', '6.00%', '6.50%'], ['1 year to less than 2 years', '6.75%', '7.25%'], ['2 years to less than 3 years', '6.60%', '7.10%'], ['3 years to 10 years', '6.50%', '7.00%'], ['Tax Saver FD (5 years)', '6.50%', '7.00%']], [1, 2])}
<p class="mt-2">${link('/calculators/#fd', 'Calculate FD maturity')}</p></section>`;
}
function cardTable() {
  return `<section id="cards"><h2>Choose your card*</h2>${table('BSIndia Credit Card variants (illustrative)', ['Card', 'Joining / annual fee', 'Rewards', 'Key benefit'], [
    ['<strong>BSIndia Green</strong> (RuPay)', '₹0 (lifetime free)', '1 point per ₹100', 'UPI-linked, fuel surcharge waiver'],
    ['<strong>BSIndia Everyday</strong> (Visa)', '₹499 + GST', '2× on dining & groceries', 'Fee waiver on annual spend of ₹1.5 lakh'],
    ['<strong>BSIndia Signature</strong> (Mastercard)', '₹2,999 + GST', '4 points per ₹150', '8 domestic airport lounge visits per year']])}</section>`;
}

export function productPage(p) {
  const stats = `<div class="rate-hero">${p.stats.map(([a, b]) => `<div><strong>${esc(a)}</strong><span>${esc(b)}</span></div>`).join('')}</div>`;
  const feats = `<section id="features"><h2>Features &amp; benefits</h2><div class="grid grid--2">${p.features.map(([t, d]) => `<div class="card card--feature"><h3>${esc(t)}</h3><p>${d}</p></div>`).join('')}</div></section>`;
  const extra = p.extra === 'fd-rates' ? fdRates() : p.extra === 'card-table' ? cardTable() : '';
  const calcSec = p.calc ? `<section id="calculator"><h2>${p.calc === 'sip' ? 'SIP calculator' : 'EMI calculator'}</h2>${calc(p.calc, 'p')}</section>` : '';
  const elig = `<section id="eligibility"><h2>Eligibility</h2>${checklist(p.eligibility)}</section>`;
  const docs = `<section id="documents"><h2>Documents required (KYC)</h2>${checklist(p.docs)}<p class="small muted">KYC is carried out as per the RBI Master Direction on Know Your Customer (KYC), 2016, as amended. The Bank may seek additional documents.</p></section>`;
  const fees = `<section id="fees"><h2>Fees &amp; charges*</h2>${table('Indicative fees and charges', ['Item', 'Charges'], p.fees.map(([a, b]) => [esc(a), b]))}<p class="small muted mt-2">Please refer to the Schedule of Charges for the complete list. ${p.group === 'Loans' ? 'The Key Fact Statement (KFS) will be shared before sanction.' : ''}</p></section>`;
  const faq = `<section id="faqs"><h2>Frequently asked questions</h2>${faqHtml(p.faqs)}</section>`;
  const related = (p.related || []).map((s) => BY_SLUG[s]).filter(Boolean);
  const cta = p.group === 'Loans' ? ['Apply Now', '/open-account/?product=' + p.slug] : ['Open / Apply Now', '/open-account/?product=' + p.slug];
  const aside = `<aside class="aside" aria-label="Apply and related products">
<div class="card"><h3>Interested in ${esc(p.title.split(' (')[0])}?</h3><p>Share your details and our team will call you back. Never share OTP, PIN, CVV or password.</p><a class="btn btn--primary btn--block" href="${cta[1]}">${cta[0]}</a><a class="btn btn--outline btn--block" href="/locate-us/">Visit a branch</a></div>
<div class="card"><h3>Need help?</h3><p class="mb-0">Call ${SITE.tel}<br>Mon–Sat, 9 am – 6 pm</p></div>
${related.length ? `<div class="card"><h3>Related products</h3><ul class="checklist">${related.map((r) => `<li>${icon('arrow')}<a href="${r.path}">${esc(r.title)}</a></li>`).join('')}</ul></div>` : ''}
<nav class="card" aria-label="On this page"><h3>On this page</h3><ul class="checklist"><li>${icon('arrow')}<a href="#features">Features</a></li><li>${icon('arrow')}<a href="#eligibility">Eligibility</a></li><li>${icon('arrow')}<a href="#documents">Documents</a></li><li>${icon('arrow')}<a href="#fees">Fees &amp; charges</a></li><li>${icon('arrow')}<a href="#faqs">FAQs</a></li></ul></nav></aside>`;
  const body = `<div class="section"><div class="container product"><div class="product__main">${stats}${feats}${extra}${calcSec}${elig}${docs}${fees}${faq}<p class="disclaimer">${DISC}${p.slug === 'investments' ? ' Mutual Fund investments are subject to market risks. Read all scheme related documents carefully.' : ''}${p.slug === 'insurance' ? ' Insurance is the subject matter of solicitation.' : ''}</p></div>${aside}</div></div>`;
  const hub = p.section === 'personal' ? ['Personal', '/personal/'] : p.section === 'business' ? ['Business', '/business/'] : null;
  return {
    path: p.path, title: p.title, description: `${p.tagline} Know features, eligibility, documents, fees and apply online.`,
    hero: { title: p.title, lead: p.tagline, crumbs: [['Home', '/'], ...(hub ? [hub] : []), [p.title]], actions: `<a class="btn btn--gold" href="${cta[1]}">${cta[0]}</a>${p.calc ? '<a class="btn btn--ghost-light" href="#calculator">Calculate</a>' : ''}` },
    body, scripts: p.calc ? ['/assets/js/calculators.js'] : [],
    schema: { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: p.faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: strip(a) } })) },
  };
}

/* --------------------------------- Hubs ----------------------------------- */
function hub(section, title, lead, groups) {
  const body = `<div class="section"><div class="container">${groups.map((g) => {
    const items = PRODUCTS.filter((p) => p.section === section && (!g || p.group === g));
    if (!items.length) return '';
    return `<div class="section__head">${g ? `<h2>${g}</h2>` : ''}</div><div class="grid grid--3">${items.map(productCard).join('')}</div>`;
  }).join('<div class="mt-3"></div>')}</div></div>`;
  return { path: `/${section}/`, title, description: lead, hero: { title, lead, crumbs: [['Home', '/'], [title]] }, body };
}

/* ---------------------------------- Home ---------------------------------- */
function art() {
  return `<svg class="hero__art" viewBox="0 0 400 340" aria-hidden="true" focusable="false"><circle cx="200" cy="170" r="150" fill="rgba(255,255,255,.07)"/><circle cx="200" cy="170" r="105" fill="rgba(255,255,255,.08)"/><path d="M200 50c45 17 80 20 80 20v70c0 55-35 95-80 112-45-17-80-57-80-112V70s35-3 80-20z" fill="#fff"/><path d="M200 50c45 17 80 20 80 20v70c0 55-35 95-80 112z" fill="#E4F5EC"/><g fill="none" stroke="#11694A" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"><path d="M160 105v62M160 105h20a15 15 0 010 31h-20M160 136h24a16 16 0 010 31h-24"/><path d="M243 112c0-12-28-14-28 5 0 17 28 12 28 30 0 19-30 17-30 5"/></g><path d="M158 218l32-17 20 11 38-30" fill="none" stroke="#E3A72F" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M225 182h23v23" fill="none" stroke="#E3A72F" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/><circle cx="82" cy="90" r="14" fill="#E3A72F"/><circle cx="330" cy="260" r="10" fill="#22A06B"/><circle cx="320" cy="75" r="7" fill="#E3A72F" opacity=".7"/></svg>`;
}
function home() {
  const slides = [
    ['Savings Account', 'Open a BSIndia Savings Account in minutes', 'Instant account opening with Aadhaar eKYC or Video KYC (V-CIP). Interest on daily balance, RuPay debit card and 24x7 Net & Mobile Banking.', '/open-account/?product=savings-account', 'Open Account', '/personal/savings-account/', 'Know more', 'Interest rates indicative; AMB and T&C apply.'],
    ['Home Loan', 'Home loans from 8.50% p.a.*', 'Repo-linked rate, up to 30 years’ tenure and no pre-payment charges on floating-rate loans. A Key Fact Statement (KFS) is shared before sanction.', '/calculators/#emi', 'Check EMI', '/personal/home-loan/', 'Know more', '*Rate is indicative and linked to RLLR. Subject to credit appraisal. T&C apply.'],
    ['Fixed Deposit', 'Fixed Deposits up to 7.25% p.a.*', 'Choose from 7 days to 10 years. Senior Citizens earn an extra 0.50% p.a. Deposits are insured by DICGC up to ₹5,00,000 per depositor.', '/calculators/#fd', 'Calculate maturity', '/personal/fixed-deposit/', 'View rates', '*Indicative rates for Senior Citizens on 1–2 year tenure. TDS as applicable.'],
  ];
  const hero = `<section class="hero" aria-roledescription="carousel" aria-label="Featured offers"><div class="hero__track">${slides.map((s, i) => `<div class="hero__slide${i === 0 ? ' is-active' : ''}" role="group" aria-roledescription="slide" aria-label="${i + 1} of ${slides.length}"><div class="container"><div><span class="hero__tag">${s[0]}</span><${i === 0 ? 'h1' : 'h2'}>${s[1]}</${i === 0 ? 'h1' : 'h2'}><p>${s[2]}</p><div class="hero__cta"><a class="btn btn--gold" href="${s[3]}">${s[4]}</a><a class="btn btn--ghost-light" href="${s[5]}">${s[6]}</a></div><p class="hero__fine">${s[7]}</p></div>${art()}</div></div>`).join('')}</div>
<div class="hero__ctrl"><div class="container"><button class="hero__arrow" type="button" data-hero="prev" aria-label="Previous slide">${icon('prev')}</button>${slides.map((_, i) => `<button class="hero__dot" type="button" data-hero-dot="${i}" aria-label="Go to slide ${i + 1}" ${i === 0 ? 'aria-current="true"' : ''}></button>`).join('')}<button class="hero__arrow" type="button" data-hero="next" aria-label="Next slide">${icon('next')}</button></div></div></section>`;

  const tiles = [['account', 'Open Account', '/open-account/'], ['home', 'Apply Loan', '/personal/'], ['bill', 'Pay Bills (BBPS)', '/personal/digital-banking/'], ['card', 'Credit Card', '/personal/credit-cards/'], ['rupee', 'Fixed Deposit', '/personal/fixed-deposit/'], ['pin', 'Locate Branch / ATM', '/locate-us/'], ['calc', 'IFSC Finder', '/locate-us/#ifsc'], ['lock', 'Report Lost Card', '/security-centre/#lost-card']];
  const quick = `<section class="quick" aria-label="Quick access"><div class="container"><div class="quick__grid">${tiles.map(([i, t, h]) => `<a class="tile" href="${h}"><span class="tile__ico">${icon(i)}</span>${t}</a>`).join('')}</div></div></section>`;

  const groups = ['Accounts', 'Deposits', 'Loans', 'Cards & Wealth'];
  const tabs = `<section class="section"><div class="container"><div class="section__head"><span class="eyebrow">Our products</span><h2>Everything you need to bank, borrow and grow</h2><p>From everyday accounts to home loans and investments, explore products designed around you.</p></div>
<div class="tabs" data-tabs><div class="tabs__list" role="tablist" aria-label="Product categories">${groups.map((g, i) => `<button class="tabs__tab" role="tab" id="tab-${i}" aria-controls="panel-${i}" aria-selected="${i === 0}" type="button">${g}</button>`).join('')}</div>
${groups.map((g, i) => `<div class="tabs__panel" role="tabpanel" id="panel-${i}" aria-labelledby="tab-${i}" ${i ? 'hidden' : ''}><div class="grid grid--3">${PRODUCTS.filter((p) => p.section === 'personal' && p.group === g).map(productCard).join('')}</div></div>`).join('')}</div></div></section>`;

  const emi = `<section class="section section--tint" id="emi"><div class="container"><div class="section__head"><span class="eyebrow">Plan smarter</span><h2>Know your EMI before you apply</h2><p>Adjust the amount, rate and tenure to see your monthly instalment. ${link('/calculators/', 'More calculators')}</p></div>${calc('emi', 'h')}</div></section>`;

  const rates = `<section class="section"><div class="container"><div class="section__head"><span class="eyebrow">Indicative rates</span><h2>Today’s highlights*</h2></div><div class="grid grid--4">
<div class="card"><span class="badge">Savings</span><h3>2.75% – 3.50% p.a.</h3><p>On daily balance, credited quarterly.</p>${link('/personal/savings-account/', 'Details')}</div>
<div class="card"><span class="badge">Fixed Deposit</span><h3>Up to 7.25% p.a.</h3><p>Senior Citizens, 1 to 2 years.</p>${link('/personal/fixed-deposit/#rates', 'All rates')}</div>
<div class="card"><span class="badge">Home Loan</span><h3>From 8.50% p.a.</h3><p>RLLR-linked, floating rate.</p>${link('/personal/home-loan/', 'Details')}</div>
<div class="card"><span class="badge">Personal Loan</span><h3>From 10.99% p.a.</h3><p>Collateral-free, up to ₹25 lakh.</p>${link('/personal/personal-loan/', 'Details')}</div></div>
<p class="disclaimer">${DISC} ${link('/rates-and-charges/', 'View full interest rates &amp; Schedule of Charges')}</p></div></section>`;

  const why = `<section class="section section--dark"><div class="container"><div class="section__head"><span class="eyebrow">Why BSIndia</span><h2>A bank you can trust, built for how India banks today</h2></div><div class="stats">
<div class="stat"><strong>DICGC insured</strong><span>Deposits covered up to ₹5,00,000 per depositor per bank.</span></div>
<div class="stat"><strong>V-CIP ready</strong><span>Open accounts with Aadhaar eKYC or Video KYC, as per RBI norms.</span></div>
<div class="stat"><strong>24x7 payments</strong><span>UPI, IMPS, NEFT and RTGS around the clock.</span></div>
<div class="stat"><strong>Fair practices</strong><span>Key Fact Statement, MITC and transparent charges, always.</span></div></div></div></section>`;

  const app = `<section class="section"><div class="container"><div class="app-banner"><div><span class="eyebrow">BSIndia Mobile Banking</span><h2>Your bank in your pocket</h2><p>Pay with UPI, transfer funds, manage cards and apply for loans, secured with two-factor authentication.</p>${checklist(['Set card and transaction limits in seconds', 'Pay bills through BBPS and recharge FASTag', 'Instant service requests and statements'])}<div class="store-badges"><span>${icon('phone')} App Store (demo)</span><span>${icon('phone')} Google Play (demo)</span></div></div><svg viewBox="0 0 220 260" role="img" aria-label="Illustration of a phone showing BSIndia mobile banking" class="mt-0"><rect x="50" y="10" width="120" height="240" rx="18" fill="#0B3D2E"/><rect x="58" y="30" width="104" height="200" rx="8" fill="#F3FAF6"/><rect x="68" y="42" width="84" height="40" rx="8" fill="#11694A"/><rect x="76" y="52" width="40" height="6" rx="3" fill="#fff"/><rect x="76" y="64" width="60" height="10" rx="3" fill="#E3A72F"/><g fill="#22A06B"><circle cx="82" cy="108" r="12"/><circle cx="110" cy="108" r="12"/><circle cx="138" cy="108" r="12"/></g><rect x="68" y="136" width="84" height="12" rx="6" fill="#DCE6E0"/><rect x="68" y="156" width="84" height="12" rx="6" fill="#DCE6E0"/><rect x="68" y="176" width="52" height="12" rx="6" fill="#DCE6E0"/></svg></div></div></section>`;

  const sec = `<section class="section section--tint"><div class="container"><div class="section__head"><span class="eyebrow">Safe banking</span><h2>Stay one step ahead of fraudsters</h2></div><div class="grid grid--4">
<div class="card"><span class="card__ico">${icon('lock')}</span><h3>Guard your credentials</h3><p>OTP, PIN, CVV and passwords are for you alone. We never ask for them.</p></div>
<div class="card"><span class="card__ico">${icon('alert')}</span><h3>Spot phishing</h3><p>Do not click unknown links in SMS, email or WhatsApp messages.</p></div>
<div class="card"><span class="card__ico">${icon('phone')}</span><h3>Verify before you pay</h3><p>Check UPI ID and name. “Collect” requests never need a PIN to receive money.</p></div>
<div class="card"><span class="card__ico">${icon('headset')}</span><h3>Report quickly</h3><p>Call 1930 (National Cyber Crime Helpline) and inform the Bank immediately.</p></div></div><p class="mt-3">${link('/security-centre/', 'Visit Security Centre')}</p></div></section>`;

  const news = `<section class="section"><div class="container"><div class="section__head"><span class="eyebrow">Updates</span><h2>News &amp; offers</h2></div><div class="grid grid--3">
<a class="card" href="/legal/disclaimer/"><span class="badge badge--gold">Offer · 21 Nov 2026</span><h3>Festive home loan offer*</h3><p>Reduced processing fee for applications sanctioned this season. T&amp;C apply.</p></a>
<a class="card" href="/personal/savings-account/"><span class="badge">Service · 15 Nov 2026</span><h3>Re-KYC made easy</h3><p>Update your KYC online using Aadhaar OTP or Video KYC, with no branch visit needed.</p></a>
<a class="card" href="/security-centre/"><span class="badge badge--gold">Awareness · 10 Nov 2026</span><h3>Don’t fall for “KYC expired” messages</h3><p>The Bank never sends links asking you to update KYC through SMS or WhatsApp.</p></a></div></div></section>`;

  const commit = `<section class="section section--tint"><div class="container"><div class="grid grid--2"><div><span class="eyebrow">Our commitment</span><h2>Fair, transparent and accountable</h2><p>We follow the principles of the Code of Bank’s Commitments to Customers and RBI’s fair practices.</p>${link('/customer-care/customer-rights/', 'Read your rights')}</div>${checklist(['Clear disclosure of interest rates, fees and charges before you sign', 'Key Fact Statement (KFS) on every retail loan', 'Complaints acknowledged promptly and resolved within RBI timelines', 'Right to approach the RBI Ombudsman under the RB-IOS, 2021', 'Your personal data protected as per the DPDP Act, 2023'])}</div></div></section>`;

  return {
    path: '/', title: 'Home', description: 'BSIndia Bank (demo): savings accounts, fixed deposits, home loans, credit cards, NRI and business banking with 24x7 digital services.',
    body: hero + quick + tabs + emi + rates + why + app + sec + news + commit, scripts: ['/assets/js/calculators.js'],
    schema: { '@context': 'https://schema.org', '@type': 'BankOrCreditUnion', name: SITE.name, url: SITE.url, logo: SITE.url + '/assets/logo/bsindia-logo.png', description: 'Demo bank website. Not an actual bank.' },
  };
}

/* ------------------------------ Forms / other ----------------------------- */
const formNote = '<div class="form-note" role="note"><strong>Important:</strong> Do not enter OTP, PIN, CVV, password, card number or Aadhaar / PAN number in this form. We will never ask for them. This is a demo form.</div>';
function netlifyForm(name, fields, btn = 'Submit') {
  return `<form class="form" name="${name}" method="POST" action="/thank-you/" data-netlify="true" netlify-honeypot="bot-field" data-validate>
<input type="hidden" name="form-name" value="${name}"><p class="honeypot" aria-hidden="true"><label>Do not fill this out: <input name="bot-field" tabindex="-1" autocomplete="off"></label></p>
${formNote}<div class="form-grid">${fields}</div>
<div class="field field--check"><input type="checkbox" id="${name}-consent" name="consent" required><label for="${name}-consent">I consent to BSIndia Bank contacting me about my request and processing my personal data for this purpose, as per the <a href="/legal/privacy-policy/">Privacy Policy</a>.</label></div>
<button class="btn btn--primary" type="submit">${btn}</button></form>`;
}
const fld = (id, label, type = 'text', extra = '') => `<div class="field"><label for="${id}">${label}</label><input id="${id}" name="${id}" type="${type}" ${extra}></div>`;
const sel = (id, label, opts) => `<div class="field"><label for="${id}">${label}</label><select id="${id}" name="${id}">${opts.map((o) => `<option value="${esc(o[0] ?? o)}">${esc(o[1] ?? o)}</option>`).join('')}</select></div>`;

function openAccount() {
  const prods = PRODUCTS.filter((p) => p.section !== 'nri' || true).map((p) => [p.slug, p.title]);
  const body = `<div class="section"><div class="container grid grid--2"><div><h2>Tell us about your requirement</h2>${netlifyForm('open-account', fld('full-name', 'Full name (as per OVD)', 'text', 'required autocomplete="name"') + fld('mobile', 'Mobile number', 'tel', 'required pattern="[6-9][0-9]{9}" inputmode="numeric" maxlength="10" autocomplete="tel-national"') + fld('email', 'Email ID', 'email', 'autocomplete="email"') + fld('city', 'City / PIN code', 'text', 'required') + sel('product', 'Product of interest', prods) + sel('mode', 'Preferred mode', [['video-kyc', 'Video KYC (V-CIP)'], ['aadhaar-ekyc', 'Aadhaar eKYC'], ['branch', 'Visit a branch']]), 'Request a call back')}</div>
<div><h2>How it works</h2><ol class="steps"><li><div><strong>Submit your request</strong><br><span class="muted">Share basic details. No sensitive data needed.</span></div></li><li><div><strong>Verify identity</strong><br><span class="muted">Complete Aadhaar eKYC / Video KYC (V-CIP) or visit a branch with your OVD and PAN / Form 60.</span></div></li><li><div><strong>Account activated</strong><br><span class="muted">Receive your account number, IFSC, debit card and Net Banking access.</span></div></li></ol>
<div class="notice mt-3">${icon('shield')} Deposits are insured by DICGC up to ₹5,00,000 per depositor per bank. ${link('/personal/', 'Explore all products')}</div></div></div></div>`;
  return { path: '/open-account/', title: 'Open Account / Apply Online', description: 'Open a BSIndia savings account or apply for loans and cards. Aadhaar eKYC and Video KYC (V-CIP) supported.', hero: { title: 'Open an Account / Apply Online', lead: 'Start in two minutes. Complete KYC from home with Aadhaar eKYC or Video KYC (V-CIP).', crumbs: [['Home', '/'], ['Open Account']] }, body, scripts: ['/assets/js/forms.js'] };
}

function calculators() {
  const tabs = [['emi', 'Loan EMI'], ['elig', 'Home loan eligibility'], ['fd', 'FD maturity'], ['rd', 'RD maturity'], ['sip', 'SIP'], ['ppf', 'PPF'], ['tax', 'Income tax']];
  const titles = { emi: 'Loan EMI calculator', elig: 'Home loan eligibility calculator', fd: 'Fixed Deposit maturity calculator', rd: 'Recurring Deposit maturity calculator', sip: 'SIP (Mutual Fund) calculator', ppf: 'PPF calculator', tax: 'Income tax calculator (new regime)' };
  const body = `<div class="section"><div class="container"><div class="calc-tabs" role="navigation" aria-label="Calculators">${tabs.map(([k, t]) => `<a href="#${k}">${t}</a>`).join('')}</div>${tabs.map(([k]) => `<section id="${k}" class="mb-0"><h2>${titles[k]}</h2>${calc(k, k)}<div class="mt-3"></div></section>`).join('')}<p class="disclaimer">Calculators provide indicative results for planning only and do not constitute an offer, sanction or tax advice. Mutual Fund investments are subject to market risks.</p></div></div>`;
  return { path: '/calculators/', title: 'Financial Calculators', description: 'EMI, FD, RD, SIP, PPF, home loan eligibility and income tax calculators from BSIndia Bank.', hero: { title: 'Financial Calculators', lead: 'Plan your loans, deposits and investments with simple, transparent calculators.', crumbs: [['Home', '/'], ['Calculators']] }, body, scripts: ['/assets/js/calculators.js'] };
}

function rates() {
  const body = `<div class="section"><div class="container"><div class="notice mb-0">${icon('alert')} ${DISC}</div><div class="mt-3"></div>
${table('Savings Account – interest rate (% p.a.)', ['Balance slab', 'Rate'], [['Up to ₹1 lakh', '2.75%'], ['Above ₹1 lakh up to ₹10 lakh', '3.00%'], ['Above ₹10 lakh', '3.50%']], [1])}<div class="mt-3"></div>
${fdRates().replace('<section id="rates"><h2>Interest rates*</h2>', '<section id="fd">').replace(/<p class="mt-2">.*?<\/p>/, '')}<div class="mt-3"></div>
${table('Lending rates (% p.a.) – floating, linked to RLLR (illustrative)', ['Product', 'Rate from', 'Benchmark / spread'], [['Home Loan', '8.50%', 'RLLR + spread as per credit score'], ['Car Loan', '8.75%', 'RLLR + spread'], ['Education Loan', '9.25%', 'RLLR + spread'], ['Gold Loan', '8.90%', 'Fixed / floating as sanctioned'], ['Personal Loan', '10.99% – 16.50%', 'Fixed, risk-based pricing'], ['MSME Loans', '9.50%', 'RLLR + spread'], ['Credit Card finance charges', 'Up to 3.49% per month', 'As per MITC']], [1])}
<p class="small muted mt-2">RLLR (Repo-Linked Lending Rate) is the Bank’s external benchmark-based lending rate, linked to the RBI repo rate. Current RLLR: [Repo rate + spread – placeholder, updated on change].</p><div class="mt-3"></div>
<section id="charges">${table('Schedule of Charges (extract) – indicative', ['Service', 'Charges'], [['Cash withdrawal at other banks’ ATMs', 'Free as per RBI-prescribed monthly limits; thereafter per-transaction charge + GST'], ['NEFT / RTGS (outward, digital)', '₹2 – ₹15 / ₹15 – ₹30 + GST (slab based)*'], ['IMPS (digital)', '₹2.50 – ₹15 + GST (slab based)*'], ['UPI (P2P / P2M)', 'Nil'], ['Cheque return (insufficient funds)', '₹300 + GST*'], ['Duplicate statement', '₹100 per statement*'], ['Stop payment instruction', '₹150 per instrument*'], ['Demand Draft issuance', '₹5 per ₹1,000 (min ₹50, max ₹10,000)*'], ['Locker (small, annual)', '₹2,000 + GST*']])}</section>
<p class="disclaimer">The Bank reserves the right to change rates and charges with prior notice as per RBI guidelines. The Schedule of Charges is also displayed at branches.</p></div></div>`;
  return { path: '/rates-and-charges/', title: 'Interest Rates & Charges', description: 'Indicative savings, FD, RD and loan interest rates (RLLR-linked) and Schedule of Charges for BSIndia Bank.', hero: { title: 'Interest Rates & Charges', lead: 'Transparent pricing. See indicative deposit rates, lending rates and service charges.', crumbs: [['Home', '/'], ['Rates & Charges']] }, body };
}

function locate() {
  const body = `<div class="section"><div class="container"><div class="locator">
<form class="locator__filters card" id="locator-form" role="search" aria-label="Branch and ATM locator"><h2>Find a Branch / ATM</h2>
<div class="field"><label for="loc-city">City</label><select id="loc-city"><option value="">All cities</option></select></div>
<div class="field"><label for="loc-type">Type</label><select id="loc-type"><option value="">Branch and ATM</option><option value="Branch">Branch</option><option value="ATM">ATM</option></select></div>
<div class="field"><label for="loc-q">Search by name / IFSC / PIN</label><input id="loc-q" type="search" placeholder="e.g. Kakinada or BSIN0000004"></div></form>
<div><p id="loc-count" class="muted" aria-live="polite"></p><div class="results" id="loc-results"></div></div></div>
<section id="ifsc" class="mt-3"><h2>IFSC &amp; MICR finder</h2><p class="muted">IFSC is an 11-character code: first four letters identify the bank (BSIN), the fifth is zero, and the last six identify the branch. Sample data for demonstration.</p>
<div class="card"><div class="field"><label for="ifsc-q">Enter IFSC code</label><input id="ifsc-q" type="text" maxlength="11" autocomplete="off" placeholder="BSIN0000001"></div><p id="ifsc-out" class="mt-2 mb-0" aria-live="polite"></p></div></section>
<p class="disclaimer">Branch and ATM details are fictional placeholders for this demo.</p></div></div>`;
  return { path: '/locate-us/', title: 'Locate Branch / ATM & IFSC', description: 'Find BSIndia branches and ATMs and look up IFSC and MICR codes.', hero: { title: 'Locate Us', lead: 'Find the nearest branch or ATM and look up IFSC codes.', crumbs: [['Home', '/'], ['Locate Us']] }, body, scripts: ['/assets/js/locator.js'] };
}

function security() {
  const body = `<div class="section"><div class="container"><div class="notice notice--warn">${icon('alert')} <strong>BSIndia Bank will never ask for your OTP, PIN, CVV, password or card number</strong> over a call, SMS, email, WhatsApp or social media. Do not install remote-access apps (AnyDesk, TeamViewer, etc.) at anyone’s request.</div>
<div class="section__head mt-3"><h2>Safe banking checklist</h2></div><div class="grid grid--2">
<div class="card">${checklist(['Use only the official BSIndia website and app', 'Enable transaction alerts via SMS and email', 'Set transaction limits on cards and UPI', 'Change passwords regularly; do not reuse them', 'Keep your mobile number and email updated with the Bank'])}</div>
<div class="card">${checklist(['Do not click on links in unsolicited messages', 'Do not share screens or OTPs with “bank executives”', 'Check the UPI ID / beneficiary name before paying', 'Never enter PIN to receive money on UPI', 'Cover the keypad while entering PIN at ATMs'])}</div></div>
<section id="lost-card" class="mt-3"><h2>Report a lost card or unauthorised transaction</h2><ol class="steps"><li><div><strong>Block immediately.</strong> Use the mobile app, Net Banking, or call ${SITE.tel} (24x7).</div></li><li><div><strong>Report the fraud</strong> to the National Cyber Crime Helpline <strong>1930</strong> and at <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer">cybercrime.gov.in</a>.</div></li><li><div><strong>Notify the Bank in writing</strong> and request a complaint reference number.</div></li><li><div><strong>Track resolution.</strong> If unresolved, escalate as per the <a href="/customer-care/grievance-redressal/">grievance matrix</a>.</div></li></ol></section>
<section class="mt-3"><h2>Your liability for unauthorised electronic transactions</h2>${table('As per RBI’s customer protection framework (summary)', ['Situation', 'Customer liability'], [['Fraud due to Bank / system deficiency, regardless of whether you reported', 'Zero'], ['Third-party breach; you report within 3 working days of receiving the alert', 'Zero'], ['Third-party breach; reported within 4–7 working days', 'Limited, as per the Bank’s board-approved policy and RBI prescribed caps'], ['Reported after 7 working days', 'As per the Bank’s board-approved policy'], ['Negligence by customer (e.g. sharing credentials)', 'Full loss until reported to the Bank']])}<p class="small muted mt-2">Refer to RBI’s circular on customer protection and our Customer Protection Policy for details.</p></section></div></div>`;
  return { path: '/security-centre/', title: 'Security Centre', description: 'Learn how to bank safely, spot phishing, and report fraud. Never share OTP, PIN, CVV or password.', hero: { title: 'Security Centre', lead: 'Your security is a shared responsibility. Learn to protect your money and your data.', crumbs: [['Home', '/'], ['Security Centre']] }, body };
}

function care() {
  const body = `<div class="section"><div class="container grid grid--2"><div><h2>Contact us</h2>${table('Customer care (placeholders)', ['Channel', 'Details'], [['Toll-free (24x7)', SITE.tel], ['Email', SITE.email], ['Lost card helpline (24x7)', '1800-123-1234'], ['NRI helpline', '+91-XX-XXXX-XXXX'], ['Registered office', '[Registered Office Address – placeholder]']])}<p class="mt-2">Need to complain? ${link('/customer-care/grievance-redressal/', 'Grievance Redressal')}</p></div>
<div><h2>Service request</h2>${netlifyForm('service-request', fld('sr-name', 'Name', 'text', 'required autocomplete="name"') + fld('sr-mobile', 'Registered mobile number', 'tel', 'required pattern="[6-9][0-9]{9}" maxlength="10" inputmode="numeric"') + sel('sr-type', 'Request type', ['Update KYC / Re-KYC', 'Update mobile / email', 'Block / reissue card', 'Statement / certificate', 'Nomination', 'Other']) + `<div class="field" ><label for="sr-msg">Message</label><textarea id="sr-msg" name="message" maxlength="500"></textarea></div>`, 'Submit request')}</div></div></div>`;
  return { path: '/customer-care/', title: 'Customer Care', description: 'Contact BSIndia Bank customer care, raise service requests and know how to escalate complaints.', hero: { title: 'Customer Care', lead: 'We are here to help, 24x7 for card blocking and fraud reporting.', crumbs: [['Home', '/'], ['Customer Care']] }, body, scripts: ['/assets/js/forms.js'] };
}

function grievance() {
  const body = `<div class="section"><div class="container"><div class="legal"><p>BSIndia Bank is committed to resolving your complaints promptly and fairly. Our Grievance Redressal Policy follows RBI directions. We acknowledge complaints within 3 working days* and aim to resolve them within 30 days of receipt.</p>
<h2>Escalation matrix</h2>${table('Three-tier grievance redressal', ['Level', 'Contact', 'Timeline'], [['<strong>Level 1</strong> – Branch / Customer Care', `Your home branch, or call ${SITE.tel}, or email ${SITE.email}`, 'Acknowledgement within 3 working days; resolution within 30 days'], ['<strong>Level 2</strong> – Nodal Officer', '[Name, designation, address, phone, email – placeholder]', 'If not resolved in 30 days, or you are dissatisfied'], ['<strong>Level 3</strong> – Principal Nodal Officer', '[Name, designation, address, phone, email – placeholder]', 'If unresolved within the stipulated period of escalation']])}
<h2>Approach the RBI Ombudsman</h2><p>If your complaint is not resolved within 30 days, or you are not satisfied with the reply, you may file a complaint with the Reserve Bank – Integrated Ombudsman under the <strong>RBI Integrated Ombudsman Scheme, 2021 (RB-IOS)</strong> at <a href="https://cms.rbi.org.in" target="_blank" rel="noopener noreferrer">cms.rbi.org.in</a>. You can also write to the Centralised Receipt and Processing Centre (CRPC) of RBI at Chandigarh.</p>
<h2>Compensation framework</h2><p>As per RBI’s harmonised Turnaround Time (TAT) framework, a failed transaction where your account is debited must be auto-reversed within the stipulated time, failing which compensation is payable per day of delay (for example, ₹100 per day for ATM / UPI failures beyond the prescribed timeline).</p>
<h2>Raise a complaint</h2>${netlifyForm('grievance', fld('g-name', 'Name', 'text', 'required autocomplete="name"') + fld('g-mobile', 'Registered mobile number', 'tel', 'required pattern="[6-9][0-9]{9}" maxlength="10" inputmode="numeric"') + fld('g-ref', 'Account / reference (last 4 digits only)', 'text', 'maxlength="4"') + sel('g-cat', 'Category', ['Account / deposits', 'Loan', 'Card', 'Digital / UPI / Net Banking', 'ATM', 'Charges', 'Service / staff', 'Other']) + '<div class="field"><label for="g-msg">Describe your complaint</label><textarea id="g-msg" name="message" required maxlength="1000"></textarea></div>', 'Submit complaint')}</div></div></div>`;
  return { path: '/customer-care/grievance-redressal/', title: 'Grievance Redressal', description: 'BSIndia Bank grievance redressal matrix, Nodal Officer and RBI Integrated Ombudsman Scheme (RB-IOS) details.', hero: { title: 'Grievance Redressal', lead: 'Know how to raise and escalate a complaint, including the RBI Ombudsman.', crumbs: [['Home', '/'], ['Customer Care', '/customer-care/'], ['Grievance Redressal']] }, body, scripts: ['/assets/js/forms.js'] };
}

function rights() {
  const body = `<div class="section"><div class="container legal"><p>BSIndia Bank adopts the Code of Bank’s Commitments to Customers (BCSBI) and RBI’s Charter of Customer Rights. These are your five basic rights:</p><ol>
<li><strong>Right to Fair Treatment.</strong> No discrimination on grounds of gender, age, religion, caste or physical ability.</li>
<li><strong>Right to Transparency, Fairness and Honesty.</strong> Clear disclosure of terms, interest rates, fees and penalties, including a Key Fact Statement for loans.</li>
<li><strong>Right to Suitability.</strong> Products and services appropriate to your needs and financial position.</li>
<li><strong>Right to Privacy.</strong> Your personal information is kept confidential and used only with your consent, as per the DPDP Act, 2023.</li>
<li><strong>Right to Grievance Redressal and Compensation.</strong> Timely resolution, access to the RBI Ombudsman and compensation where applicable.</li></ol>
<h2>Our commitments</h2>${checklist(['Provide a copy of the account-opening form and Most Important Terms and Conditions', 'Give 30 days’ prior notice of changes in fees, charges and terms', 'Settle deceased-depositor claims promptly, as per RBI timelines', 'Not recover loans using coercive or abusive practices; follow RBI’s Fair Practices Code', 'Provide statements, passbooks and balance alerts free of cost as per norms'])}<p class="mt-3">${link('/customer-care/grievance-redressal/', 'Raise a complaint')}</p></div></div>`;
  return { path: '/customer-care/customer-rights/', title: 'Customer Rights', description: 'Your rights as a BSIndia Bank customer, as per RBI’s Charter of Customer Rights and BCSBI code.', hero: { title: 'Customer Rights', lead: 'Banking with dignity, fairness and transparency.', crumbs: [['Home', '/'], ['Customer Care', '/customer-care/'], ['Customer Rights']] }, body };
}

function about() {
  const body = `<div class="section"><div class="container"><div class="grid grid--2"><div><h2>Who we are</h2><p>BSIndia Bank is a demonstration brand created to showcase a modern, trustworthy and accessible banking website. In this fictional setting, BSIndia serves retail customers, NRIs, MSMEs and corporates with a full suite of banking products.</p><p><strong>Vision:</strong> Banking that grows with you.<br><strong>Mission:</strong> To make banking simple, safe and inclusive for every Indian.</p></div>
<div class="card"><h3>Our values</h3>${checklist(['Customer first, always', 'Integrity and transparency', 'Financial inclusion', 'Technology with security', 'Responsible banking'])}</div></div>
<section class="mt-3"><h2>Leadership</h2><p class="muted">Board of Directors and senior management details: [placeholder].</p></section>
<section class="mt-3"><h2>Corporate Social Responsibility</h2><p>CSR focus areas (illustrative): financial literacy camps, scholarship for rural students, tree plantation drives and cyber-safety awareness.</p></section>
<p class="mt-3">${link('/about-us/investor-relations/', 'Investor Relations')} &nbsp; ${link('/about-us/careers/', 'Careers')}</p></div></div>`;
  return { path: '/about-us/', title: 'About Us', description: 'About BSIndia Bank: vision, mission, values, leadership and CSR (demo).', hero: { title: 'About BSIndia Bank', lead: 'Banking that grows with you.', crumbs: [['Home', '/'], ['About Us']] }, body };
}
function ir() {
  const body = `<div class="section"><div class="container legal"><h2>Financial results</h2><p class="muted">Quarterly and annual results: [placeholder – to be published].</p><h2>Policies &amp; disclosures</h2>${table('Board-approved policies (placeholder links)', ['Policy', 'Status'], [['Fair Practices Code for Lenders', 'Available on request'], ['Customer Protection Policy (unauthorised electronic transactions)', 'Available on request'], ['Grievance Redressal Policy', '<a href="/customer-care/grievance-redressal/">View</a>'], ['KYC / AML / CFT Policy', 'Available on request'], ['Interest Rate Policy / Loan Pricing', 'Available on request'], ['Whistle-blower Policy', 'Available on request'], ['Pillar 3 / Basel III disclosures', '[placeholder]']])}<p class="small muted mt-2">Statutory disclosures such as CRAR, Gross NPA and Net NPA will be published here in line with RBI norms for a regulated bank.</p></div></div>`;
  return { path: '/about-us/investor-relations/', title: 'Investor Relations', description: 'BSIndia Bank investor information, policies and disclosures (demo).', hero: { title: 'Investor Relations', lead: 'Policies, results and disclosures.', crumbs: [['Home', '/'], ['About Us', '/about-us/'], ['Investor Relations']] }, body };
}
function careers() {
  const body = `<div class="section"><div class="container legal"><p>This is a demo site, so there are no real openings. In a live deployment, this page would list vacancies, recruitment process and Equal Opportunity statement.</p><ul><li>Relationship Manager – Retail Liabilities</li><li>Credit Analyst – MSME</li><li>Digital Banking Product Manager</li></ul><p class="small muted">Sample roles for illustration only. BSIndia Bank never charges fees for recruitment.</p></div></div>`;
  return { path: '/about-us/careers/', title: 'Careers', description: 'Careers at BSIndia Bank (demo).', hero: { title: 'Careers', lead: 'Build the future of banking with us.', crumbs: [['Home', '/'], ['About Us', '/about-us/'], ['Careers']] }, body };
}

function login() {
  const body = `<div class="section"><div class="container"><div class="notice notice--warn mb-0">${icon('alert')} <strong>Demo only.</strong> Use the sample credentials shown below. This page has no real authentication. Do not enter real credentials, OTP or card details.</div><div class="mt-3"></div><div class="login">
<div class="login__box"><h2>Net Banking login</h2><form class="form" data-demo-login novalidate><div class="field"><div class="tabs__list" role="group" aria-label="Customer type"><button class="tabs__tab" type="button" aria-pressed="true" data-ct="Retail" aria-selected="true">Retail</button><button class="tabs__tab" type="button" data-ct="Corporate" aria-selected="false">Corporate</button></div></div>
<div class="field"><label for="lg-user">Customer ID</label><input id="lg-user" autocomplete="off" placeholder="test" autocapitalize="off" spellcheck="false"></div><div class="field"><label for="lg-pass">Password</label><input id="lg-pass" type="password" autocomplete="off" placeholder="test123"></div><p class="form-error" id="lg-msg" role="alert"></p><div class="form-note" role="note"><strong>Demo credentials:</strong> <code>test</code> / <code>test123</code> &nbsp;or&nbsp; <code>balaji</code> / <code>test123</code></div><button class="btn btn--primary btn--block" type="submit">Login (demo)</button></form></div>
<div><h2>Stay safe while banking online</h2>${checklist(['Check the URL starts with https:// and shows the correct domain', 'Never share OTP / PIN / password', 'Log out after every session', 'Avoid public Wi-Fi for banking', 'Bookmark the official website'])}<p class="mt-3">${link('/security-centre/', 'Security Centre')}</p></div></div></div></div>`;
  return { path: '/login/', title: 'Login (Demo)', description: 'Demo login page for BSIndia Net Banking. No real authentication.', hero: { title: 'Login', lead: 'Retail and Corporate Net Banking (demo interface).', crumbs: [['Home', '/'], ['Login']] }, body, noindex: true, scripts: ['/assets/js/forms.js'] };
}


function dashboard() {
  const body = `<div class="section"><div class="container"><div id="dash-wait" class="muted">Checking session…</div><div id="dash" hidden>
<div class="dash-head"><div><p class="eyebrow mb-0">Demo session</p><h2 class="mb-0">Welcome, <span id="dash-name">Test Customer</span></h2><p class="small muted mb-0">Last login: 21 Nov 2026, 01:05 PM IST (sample)</p></div><button class="btn btn--outline btn--sm" type="button" id="logout">Logout</button></div>
<div class="notice mt-2">${icon('alert')} This is a demo dashboard with sample data. No real account is connected.</div>
<div class="grid grid--3 mt-3">
<div class="card card--feature"><span class="badge">Savings Account</span><h3>A/c XXXXXXXX1234</h3><p class="calc__big">₹1,25,430.50</p><p class="small">Available balance · IFSC BSIN0000004</p></div>
<div class="card card--feature"><span class="badge badge--gold">Fixed Deposit</span><h3>FD XXXX5678</h3><p class="calc__big">₹5,00,000.00</p><p class="small">6.75% p.a.* · Matures 14 Aug 2028</p></div>
<div class="card card--feature"><span class="badge">Home Loan</span><h3>Loan XXXX9012</h3><p class="calc__big">₹18,42,310.00</p><p class="small">Outstanding principal · EMI ₹21,696 due 05 Dec 2026</p></div></div>
<h2 class="mt-3">Recent transactions</h2>${table('Last 5 transactions (sample)', ['Date', 'Description', 'Mode', 'Debit (₹)', 'Credit (₹)'], [['20-11-2026', 'Salary credit – ABC Technologies', 'NEFT', '—', '85,000.00'], ['19-11-2026', 'Electricity bill – BBPS', 'Net Banking', '2,140.00', '—'], ['18-11-2026', 'Grocery – UPI/PhonePe', 'UPI', '1,860.50', '—'], ['15-11-2026', 'Rent – Mr. Ramesh', 'IMPS', '18,000.00', '—'], ['05-11-2026', 'Home Loan EMI', 'NACH', '21,696.00', '—']], [3, 4])}
<h2 class="mt-3">Quick actions</h2><div class="grid grid--4"><a class="tile" href="/calculators/"><span class="tile__ico">${icon('calc')}</span>EMI Calculator</a><a class="tile" href="/personal/fixed-deposit/"><span class="tile__ico">${icon('rupee')}</span>Open FD</a><a class="tile" href="/security-centre/#lost-card"><span class="tile__ico">${icon('lock')}</span>Block Card</a><a class="tile" href="/customer-care/"><span class="tile__ico">${icon('headset')}</span>Service Request</a></div>
<p class="disclaimer">Sample data for demonstration only. Rates marked * are indicative.</p></div></div></div>`;
  return { path: '/dashboard/', title: 'My Dashboard (Demo)', description: 'Demo customer dashboard.', hero: { title: 'My Dashboard', lead: 'Retail Net Banking (demo interface).', crumbs: [['Home', '/'], ['Login', '/login/'], ['Dashboard']] }, body, noindex: true, scripts: ['/assets/js/dashboard.js'] };
}

const legalPage = (path, title, desc, html) => ({ path, title, description: desc, hero: { title, lead: desc, crumbs: [['Home', '/'], [title]] }, body: `<div class="section"><div class="container legal">${html}<p class="disclaimer">Last updated: 21 November 2026. This is a template for a demo website and not legal advice. A live bank must obtain review by its legal and compliance teams.</p></div></div>` });

function legal() {
  return [
    legalPage('/legal/privacy-policy/', 'Privacy Policy', 'How BSIndia Bank collects and protects personal data under the Digital Personal Data Protection Act, 2023.', `<p>BSIndia Bank (“Bank”, a demo brand) acts as a <strong>Data Fiduciary</strong> under the Digital Personal Data Protection Act, 2023 (DPDP Act) and follows applicable RBI directions on data protection and security.</p>
<h2>Personal data we collect</h2><ul><li>Identity and contact details (name, mobile, email, address)</li><li>KYC data as required by RBI regulations</li><li>Account, transaction and credit information</li><li>Device and usage data on our website (only with your consent for analytics)</li></ul>
<h2>Purposes</h2><ul><li>Providing banking products and services, and responding to your requests</li><li>Compliance with law, KYC / AML / CFT obligations and regulatory reporting</li><li>Fraud prevention and security</li><li>Service improvement and, with consent, marketing communications</li></ul>
<h2>Your rights</h2><ul><li>Access a summary of your personal data and processing activities</li><li>Correct, complete, update or erase data where permitted by law</li><li>Withdraw consent at any time (without affecting prior lawful processing)</li><li>Nominate another person to exercise rights in case of death or incapacity</li><li>Grievance redressal and, if unresolved, approach the Data Protection Board of India</li></ul>
<h2>Retention and security</h2><p>We retain data for the periods required by law (for example, KYC records for at least five years after the end of the relationship) and use encryption, access controls and monitoring to protect it.</p>
<h2>Contact</h2><p>Data Protection / Grievance Officer: [Name – placeholder], ${SITE.email}.</p>`),
    legalPage('/legal/terms-of-use/', 'Terms of Use', 'Terms governing use of the BSIndia Bank demo website.', `<ol><li><strong>Demo website.</strong> BSIndia Bank is a fictional brand. Nothing on this website constitutes an offer, a banking service or financial advice.</li><li><strong>Information.</strong> Rates, fees, eligibility and features are indicative and subject to change without notice.</li><li><strong>Acceptable use.</strong> You must not attempt to gain unauthorised access, introduce malicious code or misuse the forms.</li><li><strong>Intellectual property.</strong> The logo, design and content belong to the project owner and may not be reproduced without permission.</li><li><strong>Third-party links.</strong> We are not responsible for external websites such as those of RBI.</li><li><strong>Limitation of liability.</strong> To the extent permitted by law, the site is provided “as is”.</li><li><strong>Governing law.</strong> Laws of India; courts at [jurisdiction – placeholder] have jurisdiction.</li></ol>`),
    legalPage('/legal/cookie-policy/', 'Cookie Policy', 'How this website uses cookies and similar technologies.', `<p>We use <strong>essential</strong> cookies / local storage to remember your text-size, contrast and consent choices. With your consent, we may use <strong>analytics</strong> cookies to understand how the site is used. You can change your choice any time by clearing site data in your browser. Currently, this demo site does not load any third-party analytics or advertising trackers.</p>${table('Cookies / storage used', ['Name', 'Purpose', 'Type'], [['bs-consent', 'Stores your cookie choice', 'Essential'], ['bs-fs / bs-hc', 'Text size and high-contrast preferences', 'Essential'], ['bs-lang', 'Language preference', 'Essential']])}`),
    legalPage('/legal/disclaimer/', 'Disclaimer', 'Important disclaimers and regulatory notices.', `<ul><li><strong>Demo brand.</strong> BSIndia Bank does not exist. Do not rely on any content as a real banking offer.</li><li>Interest rates, charges and offers marked * are indicative and subject to RBI guidelines and the Schedule of Charges.</li><li>Deposits are insured by DICGC up to ₹5,00,000 per depositor per bank, as per the DICGC Act.</li><li>Mutual Fund investments are subject to market risks. Read all scheme related documents carefully.</li><li>Insurance is the subject matter of solicitation. Third-party products are not obligations of the Bank.</li><li>Calculators are for illustration only.</li><li>Always call the number printed on the official card or passbook; never trust numbers from search results or messages.</li></ul>`),
    legalPage('/legal/accessibility/', 'Accessibility Statement', 'Our commitment to an accessible website (WCAG 2.1 AA).', `<p>We aim to meet <strong>WCAG 2.1 Level AA</strong>. Features include skip-to-content, keyboard-accessible navigation, visible focus, text-size controls (A− / A / A+), high-contrast mode, descriptive labels and support for reduced motion.</p><p>If you face difficulty using this site, please write to ${SITE.email} or call ${SITE.tel}.</p>`),
  ];
}

function thanks() {
  return { path: '/thank-you/', title: 'Thank you', description: 'Thank you for contacting BSIndia Bank.', noindex: true, hero: { title: 'Thank you', lead: 'We have received your request.', crumbs: [['Home', '/'], ['Thank you']] }, body: `<div class="section"><div class="container center"><p>Our team will get back to you shortly. Remember: BSIndia Bank will never ask for your OTP, PIN, CVV or password.</p><a class="btn btn--primary" href="/">Back to Home</a></div></div>` };
}
function notFound() {
  return { path: '/404.html', file: '404.html', title: 'Page not found', description: 'Page not found.', noindex: true, body: `<div class="container nf"><strong>404</strong><h1>Page not found</h1><p class="muted">The page you are looking for may have moved. Try one of these:</p><p><a class="btn btn--primary" href="/">Home</a> <a class="btn btn--outline" href="/personal/">Products</a> <a class="btn btn--outline" href="/customer-care/">Customer Care</a></p></div>` };
}
function sitemapPage(all) {
  const groups = { Personal: all.filter((p) => p.path.startsWith('/personal/')), 'NRI & Business': all.filter((p) => p.path.startsWith('/nri') || p.path.startsWith('/business')), Support: all.filter((p) => p.path.startsWith('/customer-care') || p.path.startsWith('/security') || p.path.startsWith('/locate') || p.path.startsWith('/calculators') || p.path.startsWith('/rates')), 'About & Legal': all.filter((p) => p.path.startsWith('/about') || p.path.startsWith('/legal')) };
  return { path: '/sitemap/', title: 'Sitemap', description: 'All pages of BSIndia Bank website.', hero: { title: 'Sitemap', crumbs: [['Home', '/'], ['Sitemap']] }, body: `<div class="section"><div class="container sitemap">${Object.entries(groups).map(([g, items]) => `<h2>${g}</h2><ul>${items.map((p) => `<li><a href="${p.path}">${esc(p.title)}</a></li>`).join('')}</ul>`).join('')}</div></div>` };
}

export function allPages() {
  const base = [
    home(),
    hub('personal', 'Personal Banking', 'Accounts, deposits, loans, cards, investments and digital banking for individuals and families.', ['Accounts', 'Deposits', 'Loans', 'Cards & Wealth']),
    hub('business', 'Business Banking', 'Current accounts, MSME loans, cash management and trade finance for growing businesses.', [null]),
    ...PRODUCTS.map(productPage),
    openAccount(), calculators(), rates(), locate(), security(), care(), grievance(), rights(), about(), ir(), careers(), login(), dashboard(), ...legal(), thanks(),
  ];
  const sm = sitemapPage(base.filter((p) => p.path !== '/'));
  return [...base, sm, notFound()];
}
