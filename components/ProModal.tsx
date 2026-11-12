'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { X, Check, Sparkles, ShieldCheck, Loader2, ArrowRight, KeyRound, Clock } from 'lucide-react';
import { InterfaceLang } from '@/types';
import { PRO_ENABLED, PRO_I18N, PRO_PRICE_LABEL, PRO_YEARLY_PRICE_LABEL } from '@/lib/i18n/pro';
import { openProCheckout, PRO_YEARLY_AVAILABLE, type ProInterval } from '@/lib/paddle-checkout';
import { trackEvent } from '@/lib/analytics';

interface ProModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRestoreSubscription?: (email: string) => Promise<{ success: boolean; message?: string; error?: string }>;
  interfaceLang: InterfaceLang;
}

const CLOSE_LABEL: Record<InterfaceLang, string> = {
  en: 'Close',
  fr: 'Fermer',
  de: 'Schließen',
  es: 'Cerrar',
  it: 'Chiudi',
  pt: 'Fechar',
};

export const ProModal: React.FC<ProModalProps> = ({
  isOpen,
  onClose,
  onRestoreSubscription,
  interfaceLang,
}) => {
  const [isLoadingCheckout, setIsLoadingCheckout] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [showRestore, setShowRestore] = useState(false);
  const [restoreEmail, setRestoreEmail] = useState('');
  const [restoreStatus, setRestoreStatus] = useState<{ loading: boolean; error?: string; success?: string }>({
    loading: false,
  });

  // Close with Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const p = PRO_I18N[interfaceLang] || PRO_I18N.en;
  const price = PRO_PRICE_LABEL[interfaceLang] || PRO_PRICE_LABEL.en;

  const yearlyPrice = PRO_YEARLY_PRICE_LABEL[interfaceLang] || PRO_YEARLY_PRICE_LABEL.en;

  const handleStartCheckout = async (interval: ProInterval = 'month') => {
    trackEvent('pro_upgrade_click', { interval });
    setIsLoadingCheckout(true);
    setCheckoutError(null);
    try {
      await openProCheckout({
        interval,
        returnUrl: `${window.location.origin}${window.location.pathname}`,
        locale: interfaceLang,
      });
    } catch {
      setCheckoutError(p.checkoutError);
    }
    // The overlay sits on top of the page: re-enable the buttons behind it
    setIsLoadingCheckout(false);
  };

  const handleRestoreSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!restoreEmail || !restoreEmail.includes('@') || !onRestoreSubscription) return;

    setRestoreStatus({ loading: true });
    const result = await onRestoreSubscription(restoreEmail);

    if (result.success) {
      setRestoreStatus({ loading: false, success: p.subRestored });
      setTimeout(() => {
        onClose();
      }, 1500);
    } else {
      setRestoreStatus({ loading: false, error: p.subNotFound });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="pro-modal-title"
        className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full max-h-[calc(100vh-2rem)] overflow-y-auto border border-slate-200 dark:border-slate-800 shadow-2xl p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-indigo-500 to-violet-600" />

        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label={CLOSE_LABEL[interfaceLang] || CLOSE_LABEL.en}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
          <Sparkles className="w-4 h-4" />
          <span>LogoLoom Pro</span>
        </div>

        <h2 id="pro-modal-title" className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight pr-8">
          {p.modalTitle}
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{p.modalSubtitle}</p>

        {/* Price */}
        <div className="my-5 p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700">
          <span className="text-2xl font-black text-slate-900 dark:text-white">{price}</span>
          <span className="text-xs text-slate-500 font-medium"> {p.perMonth}</span>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">{p.noCommitment}</p>
        </div>

        {/* Benefits */}
        <ul className="space-y-2.5 mb-6">
          {p.benefits.map((b, idx) => (
            <li key={idx} className="flex items-start space-x-2.5">
              <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-2.5 h-2.5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200">{b.title}</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">{b.desc}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="space-y-3">
          {PRO_ENABLED ? (
            <>
              <button
                type="button"
                onClick={() => handleStartCheckout('month')}
                disabled={isLoadingCheckout}
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/25 transition-all flex items-center justify-center space-x-2 disabled:opacity-75"
              >
                {isLoadingCheckout ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{p.connectingStripe}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>{p.upgradeBtn(price)}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
              {PRO_YEARLY_AVAILABLE && (
                <button
                  type="button"
                  onClick={() => handleStartCheckout('year')}
                  disabled={isLoadingCheckout}
                  className="w-full py-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline disabled:opacity-60"
                >
                  {p.orYearly(yearlyPrice)}
                </button>
              )}
              {checkoutError && (
                <p role="alert" className="text-[11px] text-center text-rose-600 font-medium">
                  {checkoutError}
                </p>
              )}

              {/* Restore Access */}
              <div className="text-center pt-1 border-t border-slate-100 dark:border-slate-800/80">
                {!showRestore ? (
                  <button
                    type="button"
                    onClick={() => setShowRestore(true)}
                    className="text-[11px] text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center justify-center space-x-1 mx-auto font-medium pt-2"
                  >
                    <KeyRound className="w-3 h-3" />
                    <span>{p.restorePrompt}</span>
                  </button>
                ) : (
                  <form onSubmit={handleRestoreSubmit} className="space-y-2 mt-2 text-left">
                    <label htmlFor="pro-restore-email" className="text-[11px] font-bold text-slate-600 dark:text-slate-300 block">
                      {p.restoreTitle}
                    </label>
                    <div className="flex space-x-1.5">
                      <input
                        id="pro-restore-email"
                        type="email"
                        required
                        autoComplete="email"
                        value={restoreEmail}
                        onChange={(e) => setRestoreEmail(e.target.value)}
                        placeholder={p.restorePlaceholder}
                        className="flex-1 min-w-0 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-base sm:text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                      <button
                        type="submit"
                        disabled={restoreStatus.loading}
                        className="px-3 py-1.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold rounded-lg disabled:opacity-50"
                      >
                        {restoreStatus.loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : p.restoreBtn}
                      </button>
                    </div>
                    {restoreStatus.error && (
                      <p role="alert" className="text-[11px] text-rose-600 font-medium">{restoreStatus.error}</p>
                    )}
                    {restoreStatus.success && (
                      <p className="text-[11px] text-emerald-600 font-bold">{restoreStatus.success}</p>
                    )}
                  </form>
                )}
              </div>

              <p className="text-[11px] text-center text-slate-400 flex items-center justify-center space-x-1 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>{p.secureNotice}</span>
              </p>
            </>
          ) : (
            <>
              <button
                type="button"
                disabled
                className="w-full py-3 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-bold text-xs flex items-center justify-center space-x-2 cursor-not-allowed"
              >
                <Clock className="w-4 h-4" />
                <span>{p.comingSoon}</span>
              </button>
              <p className="text-[11px] text-center text-slate-500 dark:text-slate-400">{p.comingSoonNote}</p>
            </>
          )}

          {PRO_ENABLED && (
            <Link
              href={`/${interfaceLang}/pricing`}
              onClick={onClose}
              className="block text-center text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              {p.seePricing}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
