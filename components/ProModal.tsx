'use client';

import React, { useState } from 'react';
import { X, Check, Sparkles, ShieldCheck, Loader2, ArrowRight, KeyRound } from 'lucide-react';
import { InterfaceLang } from '@/types';
import { UI_TRANSLATIONS } from '@/lib/i18n/interface';

interface ProModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRestoreSubscription?: (email: string) => Promise<{ success: boolean; message?: string; error?: string }>;
  interfaceLang: InterfaceLang;
}

export const ProModal: React.FC<ProModalProps> = ({
  isOpen,
  onClose,
  onRestoreSubscription,
  interfaceLang,
}) => {
  const [isLoadingCheckout, setIsLoadingCheckout] = useState(false);
  const [showRestore, setShowRestore] = useState(false);
  const [restoreEmail, setRestoreEmail] = useState('');
  const [restoreStatus, setRestoreStatus] = useState<{ loading: boolean; error?: string; success?: string }>({
    loading: false,
  });

  if (!isOpen) return null;

  const t = UI_TRANSLATIONS[interfaceLang] || UI_TRANSLATIONS.en;

  const benefits = [
    {
      title: 'Full White-Label Branding',
      desc: '100% remove the LogoLoom footer and QR watermark on all documents.',
    },
    {
      title: 'Ultra-HD Vector Export',
      desc: 'Embedded Unicode fonts and pure vector SVG QR codes with crisp 300 DPI print quality.',
    },
    {
      title: 'Custom Brand Colors',
      desc: 'Unlock any specific brand color hex code without restrictions.',
    },
    {
      title: 'Commercial Client Distribution',
      desc: 'Deliver fully unbranded documents to corporate and private clients legally.',
    },
  ];

  const handleStartCheckout = async () => {
    setIsLoadingCheckout(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          returnUrl: `${window.location.origin}${window.location.pathname}`,
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || 'Unable to start checkout session. Please try again.');
      }
    } catch (err: any) {
      alert(err.message || 'Network error during checkout.');
    } finally {
      setIsLoadingCheckout(false);
    }
  };

  const handleRestoreSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!restoreEmail || !restoreEmail.includes('@') || !onRestoreSubscription) return;

    setRestoreStatus({ loading: true });
    const result = await onRestoreSubscription(restoreEmail);

    if (result.success) {
      setRestoreStatus({ loading: false, success: result.message || 'Subscription restored!' });
      setTimeout(() => {
        onClose();
      }, 1500);
    } else {
      setRestoreStatus({ loading: false, error: result.error || 'No active subscription found.' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl p-6 relative overflow-hidden">
        {/* Glow Header Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-indigo-500 to-violet-600" />

        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
          <Sparkles className="w-4 h-4" />
          <span>LogoLoom Pro</span>
        </div>

        <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Give your clients a 100% white-label experience
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Clean, unobtrusive branding for professional coaches, consultants and agencies.
        </p>

        {/* Price Card */}
        <div className="my-5 p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700 flex items-center justify-between">
          <div>
            <span className="text-2xl font-black text-slate-900 dark:text-white">$9</span>
            <span className="text-xs text-slate-500 font-medium"> / month</span>
            <p className="text-[10px] text-slate-400">Cancel anytime with 1-click. No long-term contract.</p>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300">
            Unlimited PDFs
          </span>
        </div>

        {/* Benefits List */}
        <div className="space-y-2.5 mb-6">
          {benefits.map((b, idx) => (
            <div key={idx} className="flex items-start space-x-2.5">
              <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-2.5 h-2.5" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200">{b.title}</h5>
                <p className="text-[10.5px] text-slate-500 dark:text-slate-400 leading-tight">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button: Real Stripe Checkout */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={handleStartCheckout}
            disabled={isLoadingCheckout}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/25 transition-all flex items-center justify-center space-x-2 disabled:opacity-75"
          >
            {isLoadingCheckout ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Connecting to Stripe...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Upgrade to Pro — $9/mo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>

          {/* Restore Access Link */}
          <div className="text-center pt-1 border-t border-slate-100 dark:border-slate-800/80">
            {!showRestore ? (
              <button
                type="button"
                onClick={() => setShowRestore(true)}
                className="text-[11px] text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center justify-center space-x-1 mx-auto font-medium"
              >
                <KeyRound className="w-3 h-3" />
                <span>Already subscribed? Restore access</span>
              </button>
            ) : (
              <form onSubmit={handleRestoreSubmit} className="space-y-2 mt-2 text-left">
                <label className="text-[10px] font-bold text-slate-600 dark:text-slate-300 block uppercase tracking-wider">
                  Restore Pro via Billing Email
                </label>
                <div className="flex space-x-1.5">
                  <input
                    type="email"
                    required
                    value={restoreEmail}
                    onChange={(e) => setRestoreEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                  <button
                    type="submit"
                    disabled={restoreStatus.loading}
                    className="px-3 py-1.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold rounded-lg disabled:opacity-50"
                  >
                    {restoreStatus.loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Restore'}
                  </button>
                </div>
                {restoreStatus.error && (
                  <p className="text-[10.5px] text-rose-500 font-medium">{restoreStatus.error}</p>
                )}
                {restoreStatus.success && (
                  <p className="text-[10.5px] text-emerald-600 font-bold">{restoreStatus.success}</p>
                )}
              </form>
            )}
          </div>

          <p className="text-[10px] text-center text-slate-400 flex items-center justify-center space-x-1 pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Secure 256-bit encrypted Stripe billing • Cancel anytime</span>
          </p>
        </div>
      </div>
    </div>
  );
};
