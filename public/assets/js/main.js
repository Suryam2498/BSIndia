import { applyLang } from './i18n.js';
const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch { /* ignore */ } },
};
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const root = document.documentElement;

/* Preferences: text size, contrast, language */
const applyFs = (v) => { root.classList.remove('fs-sm', 'fs-lg'); if (v === 'sm') root.classList.add('fs-sm'); if (v === 'lg') root.classList.add('fs-lg'); };
applyFs(store.get('bs-fs'));
$$('[data-fs]').forEach((b) => b.addEventListener('click', () => { applyFs(b.dataset.fs); store.set('bs-fs', b.dataset.fs); }));
const hc = $('#hc-toggle');
const setHc = (on) => { root.classList.toggle('hc', on); hc?.setAttribute('aria-pressed', String(on)); store.set('bs-hc', on ? '1' : '0'); };
if (store.get('bs-hc') === '1') setHc(true);
hc?.addEventListener('click', () => setHc(!root.classList.contains('hc')));
const lang = $('#lang');
if (lang) {
  const saved = store.get('bs-lang') || 'en'; lang.value = saved; if (saved !== 'en') applyLang(saved);
  lang.addEventListener('change', () => { store.set('bs-lang', lang.value); applyLang(lang.value); });
}

/* Navigation */
const body = document.body;
const toggle = $('.nav-toggle');
const setNav = (open) => { body.classList.toggle('nav-open', open); toggle?.setAttribute('aria-expanded', String(open)); };
toggle?.addEventListener('click', () => setNav(!body.classList.contains('nav-open')));
$('.nav__close')?.addEventListener('click', () => setNav(false));
$('.nav-backdrop')?.addEventListener('click', () => setNav(false));
const closeMegas = (except) => $$('.nav__btn').forEach((b) => { if (b !== except) { b.setAttribute('aria-expanded', 'false'); $('#' + b.getAttribute('aria-controls'))?.classList.remove('open'); } });
$$('.nav__btn').forEach((b) => b.addEventListener('click', () => {
  const open = b.getAttribute('aria-expanded') !== 'true';
  closeMegas(b); b.setAttribute('aria-expanded', String(open)); $('#' + b.getAttribute('aria-controls'))?.classList.toggle('open', open);
}));
document.addEventListener('click', (e) => { if (!e.target.closest('.nav__item')) closeMegas(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeMegas(); setNav(false); } });

/* Hero carousel */
const hero = $('.hero');
if (hero) {
  const slides = $$('.hero__slide', hero), dots = $$('.hero__dot', hero);
  let i = 0, timer;
  const show = (n) => { i = (n + slides.length) % slides.length; slides.forEach((s, k) => s.classList.toggle('is-active', k === i)); dots.forEach((d, k) => d.setAttribute('aria-current', String(k === i))); };
  const play = () => { if (matchMedia('(prefers-reduced-motion: reduce)').matches) return; stop(); timer = setInterval(() => show(i + 1), 6500); };
  const stop = () => clearInterval(timer);
  $$('[data-hero]', hero).forEach((b) => b.addEventListener('click', () => show(i + (b.dataset.hero === 'next' ? 1 : -1))));
  dots.forEach((d, k) => d.addEventListener('click', () => show(k)));
  hero.addEventListener('mouseenter', stop); hero.addEventListener('mouseleave', play); hero.addEventListener('focusin', stop); hero.addEventListener('focusout', play);
  play();
}

/* Tabs */
$$('[data-tabs]').forEach((t) => {
  const tabs = $$('[role=tab]', t), panels = $$('[role=tabpanel]', t);
  const select = (k, focus) => { tabs.forEach((x, n) => { x.setAttribute('aria-selected', String(n === k)); x.tabIndex = n === k ? 0 : -1; panels[n].hidden = n !== k; }); if (focus) tabs[k].focus(); };
  tabs.forEach((x, k) => {
    x.addEventListener('click', () => select(k));
    x.addEventListener('keydown', (e) => { if (e.key === 'ArrowRight') select((k + 1) % tabs.length, true); if (e.key === 'ArrowLeft') select((k - 1 + tabs.length) % tabs.length, true); });
  });
  select(0);
});

/* Cookie consent */
const cookie = $('#cookie');
if (cookie && !store.get('bs-consent')) cookie.classList.add('show');
$$('[data-cookie]', cookie || document).forEach((b) => b.addEventListener('click', () => { store.set('bs-consent', b.dataset.cookie); cookie.classList.remove('show'); }));
