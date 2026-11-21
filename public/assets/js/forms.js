const toast = (msg) => { const t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); t.textContent = msg; document.body.append(t); setTimeout(() => t.remove(), 3500); };
// Pre-select product from ?product=
const p = new URLSearchParams(location.search).get('product'); const sel = document.getElementById('product');
if (p && sel && [...sel.options].some((o) => o.value === p)) sel.value = p;
// Netlify forms: block bot-field submissions, show friendly validation
document.querySelectorAll('form[data-validate]').forEach((f) => f.addEventListener('submit', (e) => {
  if (f.querySelector('[name=bot-field]')?.value) { e.preventDefault(); return; }
  if (!f.checkValidity()) { e.preventDefault(); f.reportValidity(); }
}));
// Demo login: front-end only. Sample credentials below. NOT real authentication.
const USERS = { test: { pw: 'test123', name: 'Test Customer' }, balaji: { pw: 'test123', name: 'Balaji' } };
const demo = document.querySelector('[data-demo-login]');
if (demo) {
  const msg = document.getElementById('lg-msg');
  demo.addEventListener('submit', (e) => {
    e.preventDefault();
    const u = document.getElementById('lg-user').value.trim(), pw = document.getElementById('lg-pass').value;
    const user = USERS[u.toLowerCase()];
    if (user && pw === user.pw) {
      try { sessionStorage.setItem('bs-demo-auth', '1'); sessionStorage.setItem('bs-demo-name', user.name); } catch { /* ignore */ }
      location.href = '/dashboard/';
    } else { msg.textContent = 'Invalid Customer ID or password. For this demo use test / test123 or balaji / test123.'; }
  });
  demo.querySelectorAll('[data-ct]').forEach((b) => b.addEventListener('click', () => demo.querySelectorAll('[data-ct]').forEach((x) => { const on = x === b; x.setAttribute('aria-selected', String(on)); x.setAttribute('aria-pressed', String(on)); })));
}
