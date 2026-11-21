// Demo dashboard guard: only shows after the sample login (test or balaji). Not real security.
let ok = false;
try { ok = sessionStorage.getItem('bs-demo-auth') === '1'; } catch { /* ignore */ }
if (!ok) { location.replace('/login/'); }
else {
  try { const n = sessionStorage.getItem('bs-demo-name'); if (n) document.getElementById('dash-name').textContent = n; } catch { /* ignore */ }
  document.getElementById('dash-wait')?.setAttribute('hidden', '');
  document.getElementById('dash')?.removeAttribute('hidden');
  document.getElementById('logout')?.addEventListener('click', () => { try { sessionStorage.removeItem('bs-demo-auth'); sessionStorage.removeItem('bs-demo-name'); } catch { /* ignore */ } location.href = '/login/'; });
}
