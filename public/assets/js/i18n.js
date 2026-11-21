// Lightweight UI language switch (English / Hindi / Telugu) for key labels. Extend as content is translated.
const T = {
  hi: { 'nav.personal': 'व्यक्तिगत', 'nav.nri': 'एनआरआई बैंकिंग', 'nav.business': 'व्यवसाय', 'nav.digital': 'डिजिटल बैंकिंग', 'nav.tools': 'टूल्स और दरें', 'nav.support': 'सहायता',
    'seg.personal': 'व्यक्तिगत', 'seg.nri': 'एनआरआई', 'seg.business': 'व्यवसाय', 'seg.msme': 'एमएसएमई', 'tb.locate': 'हमें खोजें', 'tb.care': 'ग्राहक सेवा', 'btn.login': 'लॉगिन', 'btn.open': 'खाता खोलें' },
  te: { 'nav.personal': 'వ్యక్తిగత', 'nav.nri': 'ఎన్ఆర్ఐ బ్యాంకింగ్', 'nav.business': 'వ్యాపారం', 'nav.digital': 'డిజిటల్ బ్యాంకింగ్', 'nav.tools': 'టూల్స్ & రేట్లు', 'nav.support': 'సహాయం',
    'seg.personal': 'వ్యక్తిగత', 'seg.nri': 'ఎన్ఆర్ఐ', 'seg.business': 'వ్యాపారం', 'seg.msme': 'ఎంఎస్ఎంఈ', 'tb.locate': 'మమ్మల్ని కనుగొనండి', 'tb.care': 'కస్టమర్ కేర్', 'btn.login': 'లాగిన్', 'btn.open': 'ఖాతా తెరవండి' },
};
export function applyLang(lang) {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    if (!el.dataset.en) el.dataset.en = el.textContent;
    el.textContent = (T[lang] && T[lang][el.dataset.i18n]) || el.dataset.en;
  });
}
