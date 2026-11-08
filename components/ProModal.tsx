'use client';

import React from 'react';
import { X, Check, Sparkles, ShieldCheck } from 'lucide-react';
import { InterfaceLang } from '@/types';
import { UI_TRANSLATIONS } from '@/lib/i18n/interface';

interface ProModalProps {
  isOpen: boolean;
  onClose: () => void;
  onActivateProMock: () => void;
  interfaceLang: InterfaceLang;
}

export const ProModal: React.FC<ProModalProps> = ({
  isOpen,
  onClose,
  onActivateProMock,
  interfaceLang,
}) => {
  if (!isOpen) return null;

  const t = UI_TRANSLATIONS[interfaceLang] || UI_TRANSLATIONS.en;

  const benefits = [
    { title: 'Full White-Label Branding', desc: '100% remove the LogoLoom footer and QR watermark on all documents.' },
    { title: 'Ultra-HD Lossless Export', desc: 'True print-grade vector logo injection and sharpest resolution.' },
    { title: 'Custom HEX Brand Colors', desc: 'Unlock any specific brand color hex code without restrictions.' },
    { title: 'Early Access to New Templates', desc: 'Access upcoming client agreements, intake audits, and invoice templates.' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl p-6 relative overflow-hidden">
        {/* Glow Header */}
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
          Clean, unobtrusive branding for serious coaches and independent consultants.
        </p>

        {/* Price Card */}
        <div className="my-5 p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700 flex items-center justify-between">
          <div>
            <span className="text-2xl font-black text-slate-900 dark:text-white">$9</span>
            <span className="text-xs text-slate-500 font-medium"> / month</span>
            <p className="text-[10px] text-slate-400">Cancel anytime with 1-click. No contract.</p>
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

        {/* Action Button */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => {
              onActivateProMock();
              onClose();
            }}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/25 transition-all flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Enable Pro White-Label (Instant)</span>
          </button>

          <p className="text-[10px] text-center text-slate-400 flex items-center justify-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Secured via Stripe • 14-day money back guarantee</span>
          </p>
        </div>
      </div>
    </div>
  );
};
