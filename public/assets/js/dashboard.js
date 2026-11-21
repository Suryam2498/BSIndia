// Demo dashboard guard: only shows after the sample login (test / test123). Not real security.
let ok = false;
try { ok = sessionStorage.getItem('bs-demo-auth') === '1'; } catch { /* ignore */ }
if (!ok) { location.replace('/login/'); }
else {
  document.getElementById('dash-wait')?.setAttribute('hidden', '');
  document.getElementById('dash')?.removeAttribute('hidden');
  document.getElementById('logout')?.addEventListener('click', () => { try { sessionStorage.removeItem('bs-demo-auth'); } catch { /* ignore */ } location.href = '/login/'; });
}
