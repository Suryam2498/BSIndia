const toast = (msg) => { const t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); t.textContent = msg; document.body.append(t); setTimeout(() => t.remove(), 3500); };
// Pre-select product from ?product=
const p = new URLSearchParams(location.search).get('product'); const sel = document.getElementById('product');
if (p && sel && [...sel.options].some((o) => o.value === p)) sel.value = p;
// Netlify forms: block bot-field submissions, show friendly validation
document.querySelectorAll('form[data-validate]').forEach((f) => f.addEventListener('submit', (e) => {
  if (f.querySelector('[name=bot-field]')?.value) { e.preventDefault(); return; }
  if (!f.checkValidity()) { e.preventDefault(); f.reportValidity(); }
}));
// Demo login: front-end only. Sample credentials: test / test123. NOT real authentication.
const demo = document.querySelector('[data-demo-login]');
if (demo) {
  const msg = document.getElementById('lg-msg');
  demo.addEventListener('submit', (e) => {
    e.preventDefault();
    const u = document.getElementById('lg-user').value.trim(), pw = document.getElementById('lg-pass').value;
    if (u === 'test' && pw === 'test123') {
      try { sessionStorage.setItem('bs-demo-auth', '1'); } catch { /* ignore */ }
      location.href = '/dashboard/';
    } else { msg.textContent = 'Invalid Customer ID or password. For this demo use test / test123.'; }
  });
  demo.querySelectorAll('[data-ct]').forEach((b) => b.addEventListener('click', () => demo.querySelectorAll('[data-ct]').forEach((x) => { const on = x === b; x.setAttribute('aria-selected', String(on)); x.setAttribute('aria-pressed', String(on)); })));
}
