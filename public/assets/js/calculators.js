const inr = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 });
const rs = (n) => '₹' + inr.format(Math.round(n));
const pct = (n) => n.toFixed(2) + '%';
const C = 2 * Math.PI * 60;

const annuity = (p, r, n) => (r === 0 ? p / n : (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));

function taxNew(income) {
  const taxable = Math.max(0, income - 75000);
  const slabs = [[400000, 0], [800000, 0.05], [1200000, 0.1], [1600000, 0.15], [2000000, 0.2], [2400000, 0.25], [Infinity, 0.3]];
  let tax = 0, prev = 0;
  for (const [cap, rate] of slabs) { if (taxable > prev) tax += (Math.min(taxable, cap) - prev) * rate; prev = cap; }
  if (taxable <= 1200000) tax = 0; else tax = Math.min(tax, taxable - 1200000); // 87A rebate + marginal relief
  return { taxable, tax, cess: tax * 0.04 };
}

const calcs = {
  emi: (v) => { const n = v.years * 12, e = annuity(v.amount, v.rate / 1200, n), t = e * n;
    return { big: ['Monthly EMI', rs(e)], rows: [['Principal amount', rs(v.amount)], ['Total interest', rs(t - v.amount)], ['Total payable', rs(t)]], parts: [v.amount, t - v.amount], legend: ['Principal', 'Interest'] }; },
  fd: (v) => { const m = v.amount * Math.pow(1 + v.rate / 400, 4 * v.years);
    return { big: ['Maturity amount', rs(m)], rows: [['Amount invested', rs(v.amount)], ['Interest earned', rs(m - v.amount)], ['Effective yield', pct((Math.pow(m / v.amount, 1 / v.years) - 1) * 100) + ' p.a.']], parts: [v.amount, m - v.amount], legend: ['Invested', 'Interest'] }; },
  rd: (v) => { const i = v.rate / 400, n = 4 * v.years, m = (v.amount * (Math.pow(1 + i, n) - 1)) / (1 - Math.pow(1 + i, -1 / 3)), inv = v.amount * 12 * v.years;
    return { big: ['Maturity amount', rs(m)], rows: [['Total deposited', rs(inv)], ['Interest earned', rs(m - inv)]], parts: [inv, m - inv], legend: ['Deposited', 'Interest'] }; },
  sip: (v) => { const i = v.rate / 1200, n = v.years * 12, fv = v.amount * ((Math.pow(1 + i, n) - 1) / i) * (1 + i), inv = v.amount * n;
    return { big: ['Expected value', rs(fv)], rows: [['Amount invested', rs(inv)], ['Estimated gains', rs(fv - inv)]], parts: [inv, fv - inv], legend: ['Invested', 'Gains'] }; },
  ppf: (v) => { const r = v.rate / 100, fv = v.amount * ((Math.pow(1 + r, v.years) - 1) / r) * (1 + r), inv = v.amount * v.years;
    return { big: ['Maturity value', rs(fv)], rows: [['Total deposited', rs(inv)], ['Interest earned', rs(fv - inv)]], parts: [inv, fv - inv], legend: ['Deposited', 'Interest'] }; },
  elig: (v) => { const emi = Math.max(0, v.income * 0.5 - v.obligations), r = v.rate / 1200, n = v.years * 12, loan = r === 0 ? emi * n : (emi * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n));
    return { big: ['Indicative eligible loan', rs(loan)], rows: [['Maximum affordable EMI', rs(emi)], ['Tenure', v.years + ' years'], ['Total interest (approx.)', rs(Math.max(0, emi * n - loan))]], parts: [loan, Math.max(0, emi * n - loan)], legend: ['Principal', 'Interest'] }; },
  tax: (v) => { const { taxable, tax, cess } = taxNew(v.income), total = tax + cess;
    return { big: ['Estimated tax payable', rs(total)], rows: [['Taxable income (after ₹75,000 std. deduction)', rs(taxable)], ['Tax before cess', rs(tax)], ['Health & education cess (4%)', rs(cess)], ['Effective rate', pct(v.income ? (total / v.income) * 100 : 0)]], parts: [Math.max(0, v.income - total), total], legend: ['Income after tax', 'Tax'] }; },
};

const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };
const svg = (tag, attrs) => { const e = document.createElementNS('http://www.w3.org/2000/svg', tag); for (const k in attrs) e.setAttribute(k, attrs[k]); return e; };

function render(out, res) {
  out.replaceChildren();
  const big = el('div'); big.append(el('div', 'small muted', res.big[0]), el('div', 'calc__big', res.big[1])); out.append(big);
  const [a, b] = res.parts, tot = a + b || 1;
  const d = svg('svg', { class: 'donut', viewBox: '0 0 150 150', role: 'img', 'aria-label': `${res.legend[0]} ${Math.round((a / tot) * 100)} percent, ${res.legend[1]} ${Math.round((b / tot) * 100)} percent` });
  d.append(svg('circle', { class: 'd-bg', cx: 75, cy: 75, r: 60 }), svg('circle', { class: 'd-fg', cx: 75, cy: 75, r: 60, 'stroke-dasharray': `${(a / tot) * C} ${C}` }));
  out.append(d);
  const lg = el('div', 'legend'); [['l1', res.legend[0]], ['l2', res.legend[1]]].forEach(([c, t]) => { const s = el('span', c); s.append(document.createElement('i'), t); lg.append(s); }); out.append(lg);
  res.rows.forEach(([k, v]) => { const r = el('div', 'calc__kv'); r.append(el('span', null, k), el('strong', null, v)); out.append(r); });
}

document.querySelectorAll('[data-calc]').forEach((box) => {
  const type = box.dataset.calc, out = box.querySelector('.calc__out');
  const nums = Object.fromEntries([...box.querySelectorAll('[data-num]')].map((n) => [n.dataset.num, n]));
  const rngs = Object.fromEntries([...box.querySelectorAll('[data-range]')].map((n) => [n.dataset.range, n]));
  const read = () => Object.fromEntries(Object.entries(nums).map(([k, n]) => { const min = +n.min, max = +n.max; let v = parseFloat(n.value); if (!isFinite(v)) v = min; return [k, Math.min(max, Math.max(min, v))]; }));
  const update = () => render(out, calcs[type](read()));
  for (const k in nums) {
    rngs[k].addEventListener('input', () => { nums[k].value = rngs[k].value; update(); });
    nums[k].addEventListener('input', () => { if (isFinite(parseFloat(nums[k].value))) { rngs[k].value = nums[k].value; update(); } });
    nums[k].addEventListener('change', () => { const v = read()[k]; nums[k].value = v; rngs[k].value = v; update(); });
  }
  update();
});
