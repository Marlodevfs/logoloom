'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Check, Sparkles, ArrowLeft, HelpCircle, Clock, Loader2 } from 'lucide-react';
import { InterfaceLang } from '@/types';
import { PRO_ENABLED, PRO_I18N, PRO_PRICE_LABEL, FREE_PRICE_LABEL } from '@/lib/i18n/pro';
import { trackEvent } from '@/lib/analytics';
import { SiteFooter } from '@/components/SiteFooter';

const SUPPORTED: InterfaceLang[] = ['en', 'fr', 'es', 'de', 'pt', 'it'];

export default function PricingPage() {
  const params = useParams<{ locale: string }>();
  const lang: InterfaceLang = SUPPORTED.includes(params?.locale as InterfaceLang)
    ? (params.locale as InterfaceLang)
    : 'en';
  const p = PRO_I18N[lang];
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    trackEvent('pro_upgrade_click', { from: 'pricing' });
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ returnUrl: `${window.location.origin}/${lang}` }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      setError(p.checkoutError);
    } catch {
      setError(p.networkError);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      <header className="border-b border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link
            href={`/${lang}`}
            className="flex items-center space-x-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{p.backToStudio}</span>
          </Link>
          <Link href={`/${lang}`} className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
            LogoLoom
          </Link>
          <div className="w-16" />
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-12 sm:py-20 space-y-16">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            {p.eyebrow}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{p.pageTitle}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">{p.pageSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Free */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-6 shadow-xs">
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-bold">{p.freeName}</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">{p.freeFor}</p>
              </div>
              <div className="flex items-baseline space-x-1">
                <span className="text-4xl font-extrabold">{FREE_PRICE_LABEL[lang]}</span>
                <span className="text-xs text-slate-500">{p.forever}</span>
              </div>
              <ul className="space-y-3 text-sm pt-4 border-t border-slate-100 dark:border-slate-800">
                {p.freeFeatures.map((f) => (
                  <li key={f} className="flex items-start space-x-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
                <li className="flex items-start space-x-2 text-slate-500 text-xs">
                  <span aria-hidden="true">•</span>
                  <span>{p.freeCredit}</span>
                </li>
              </ul>
            </div>
            <Link
              href={`/${lang}`}
              className="w-full py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors block"
            >
              {p.startFree}
            </Link>
          </div>

          {/* Pro */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border-2 border-indigo-600 relative flex flex-col justify-between space-y-6 shadow-xl">
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-bold">{p.proName}</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">{p.proFor}</p>
              </div>
              <div className="flex items-baseline space-x-1">
                <span className="text-4xl font-extrabold">{PRO_PRICE_LABEL[lang]}</span>
                <span className="text-xs text-slate-500">{p.perMonth}</span>
              </div>
              <ul className="space-y-3 text-sm pt-4 border-t border-slate-200 dark:border-slate-700">
                {p.proFeatures.map((f, i) => (
                  <li
                    key={f}
                    className={`flex items-start space-x-2 ${i === 1 ? 'font-bold text-indigo-600 dark:text-indigo-400' : ''}`}
                  >
                    <Check className={`w-4 h-4 shrink-0 mt-0.5 ${i === 1 ? '' : 'text-emerald-500'}`} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {PRO_ENABLED ? (
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-600/25 transition-all flex items-center justify-center space-x-2 disabled:opacity-75"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  <span>{loading ? p.connectingStripe : p.upgradePage}</span>
                </button>
                {error && (
                  <p role="alert" className="text-xs text-center text-rose-600">{error}</p>
                )}
                <p className="text-[11px] text-center text-slate-500">{p.secureNotice}</p>
              </div>
            ) : (
              <div className="space-y-2">
                <button
                  type="button"
                  disabled
                  className="w-full py-3 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-bold text-sm flex items-center justify-center space-x-2 cursor-not-allowed"
                >
                  <Clock className="w-4 h-4" />
                  <span>{p.comingSoon}</span>
                </button>
                <p className="text-[11px] text-center text-slate-500">{p.comingSoonNote}</p>
              </div>
            )}
          </div>
        </div>

        <section className="pt-12 space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-xl font-bold">{p.faqTitle}</h2>
            <p className="text-xs text-slate-500">{p.faqSubtitle}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {p.faqs.map((faq) => (
              <div key={faq.q} className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-1.5 shadow-2xs">
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-start space-x-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-1" />
                  <span>{faq.q}</span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pl-5">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter lang={lang} />
    </div>
  );
}
