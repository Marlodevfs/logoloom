'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

const CONSENT_KEY = 'logoloom_cookie_consent'; // 'granted' | 'denied'
const OPEN_EVENT = 'logoloom:open-cookie-settings';

const T: Record<string, { text: string; accept: string; refuse: string; more: string; manage: string }> = {
  en: { text: 'We use Google cookies to measure how the site is used and improve it. Your documents never leave your browser.', accept: 'Accept', refuse: 'Refuse', more: 'Learn more', manage: 'Cookies' },
  fr: { text: 'Nous utilisons des cookies Google pour mesurer l’utilisation du site et l’améliorer. Vos documents ne quittent jamais votre navigateur.', accept: 'Accepter', refuse: 'Refuser', more: 'En savoir plus', manage: 'Cookies' },
  de: { text: 'Wir verwenden Google-Cookies, um die Nutzung der Website zu messen und sie zu verbessern. Ihre Dokumente verlassen nie Ihren Browser.', accept: 'Akzeptieren', refuse: 'Ablehnen', more: 'Mehr erfahren', manage: 'Cookies' },
  es: { text: 'Usamos cookies de Google para medir el uso del sitio y mejorarlo. Tus documentos nunca salen de tu navegador.', accept: 'Aceptar', refuse: 'Rechazar', more: 'Más información', manage: 'Cookies' },
  it: { text: 'Usiamo cookie di Google per misurare l’uso del sito e migliorarlo. I tuoi documenti non lasciano mai il tuo browser.', accept: 'Accetta', refuse: 'Rifiuta', more: 'Scopri di più', manage: 'Cookie' },
  pt: { text: 'Usamos cookies da Google para medir a utilização do site e melhorá-lo. Os seus documentos nunca saem do seu navegador.', accept: 'Aceitar', refuse: 'Recusar', more: 'Saber mais', manage: 'Cookies' },
};

function readConsent(): string | null {
  try {
    return localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
}

let gtmLoaded = false;
/** Official Google Tag Manager bootstrap, injected only after consent. */
function loadGTM() {
  if (gtmLoaded || !siteConfig.gtmId) return;
  gtmLoaded = true;
  const w = window as any;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(siteConfig.gtmId)}`;
  document.head.appendChild(s);
}

/** Cookie banner (GDPR / Swiss nLPD): Google Tag Manager only loads after "Accept". */
export function CookieConsent({ lang }: { lang: string }) {
  const t = T[lang] || T.en;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = readConsent();
    if (consent === 'granted') loadGTM();
    else if (consent !== 'denied') setVisible(true);

    const reopen = () => setVisible(true);
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  const choose = (value: 'granted' | 'denied') => {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch {
      // storage unavailable: choice applies to this page view only
    }
    setVisible(false);
    if (value === 'granted') {
      loadGTM();
    } else if (gtmLoaded) {
      // Consent withdrawn after GTM was loaded: reload so Google scripts stop running
      window.location.reload();
    }
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookies"
      className="fixed z-40 left-3 right-3 bottom-[92px] lg:bottom-4 lg:left-4 lg:right-auto lg:max-w-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl p-4 space-y-3"
    >
      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
        {t.text}{' '}
        <Link href={`/${lang}/privacy`} className="font-semibold text-indigo-600 dark:text-indigo-400 underline">
          {t.more}
        </Link>
      </p>
      <div className="flex gap-2">
        {/* Same weight for both buttons: refusing must be as easy as accepting */}
        <button
          type="button"
          onClick={() => choose('denied')}
          className="flex-1 h-9 rounded-lg border border-slate-300 dark:border-slate-600 text-xs font-bold text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800"
        >
          {t.refuse}
        </button>
        <button
          type="button"
          onClick={() => choose('granted')}
          className="flex-1 h-9 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold"
        >
          {t.accept}
        </button>
      </div>
    </div>
  );
}

/** Footer link to reopen the cookie choice. */
export function CookieSettingsLink({ lang, className }: { lang: string; className?: string }) {
  const t = T[lang] || T.en;
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
      className={className}
    >
      {t.manage}
    </button>
  );
}
