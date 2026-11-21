const $ = (s) => document.querySelector(s);
const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };
const res = $('#loc-results'), count = $('#loc-count'), city = $('#loc-city'), type = $('#loc-type'), q = $('#loc-q');
let data = [];
function card(b) {
  const a = el('article', 'branch'); a.append(el('span', 'badge' + (b.type === 'ATM' ? ' badge--gold' : ''), b.type), el('h3', null, b.name));
  const dl = el('dl'); [['City', `${b.city}, ${b.state} – ${b.pin}`], ['IFSC', b.ifsc], ['MICR', b.micr || '—'], ['Hours', b.hours]].forEach(([k, v]) => { dl.append(el('dt', null, k), el('dd', null, v)); });
  a.append(dl, el('p', 'small muted mb-0', '[Street address – placeholder]')); return a;
}
function filter() {
  const t = q.value.trim().toLowerCase();
  const list = data.filter((b) => (!city.value || b.city === city.value) && (!type.value || b.type === type.value) && (!t || [b.name, b.ifsc, b.pin, b.city].join(' ').toLowerCase().includes(t)));
  res.replaceChildren(...list.map(card)); count.textContent = `${list.length} location${list.length === 1 ? '' : 's'} found`;
}
fetch('/data/branches.json').then((r) => r.json()).then((d) => {
  data = d; [...new Set(d.map((b) => b.city))].sort().forEach((c) => { const o = el('option', null, c); o.value = c; city.append(o); });
  filter(); [city, type].forEach((e) => e.addEventListener('change', filter)); q.addEventListener('input', filter); $('#locator-form').addEventListener('submit', (e) => e.preventDefault());
  const ifsc = $('#ifsc-q'), out = $('#ifsc-out');
  ifsc.addEventListener('input', () => {
    const v = ifsc.value.trim().toUpperCase(); if (v.length < 11) { out.textContent = v ? 'Enter all 11 characters.' : ''; return; }
    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(v)) { out.textContent = 'Invalid IFSC format. It should be 4 letters, then 0, then 6 characters.'; return; }
    const b = d.find((x) => x.ifsc === v && x.type === 'Branch'); out.textContent = b ? `${b.name} · ${b.city}, ${b.state} – ${b.pin} · MICR ${b.micr}` : 'No BSIndia branch found for this IFSC.';
  });
}).catch(() => { count.textContent = 'Unable to load locations. Please try again.'; });
