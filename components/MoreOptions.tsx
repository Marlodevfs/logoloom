'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Sliders, Globe, QrCode, Building, User, Lock, Sparkles } from 'lucide-react';
import { BrandKit, DocumentLang, InterfaceLang, PaperSize } from '@/types';
import { UI_TRANSLATIONS } from '@/lib/i18n/interface';

interface MoreOptionsProps {
  brandKit: BrandKit;
  onUpdate: (updates: Partial<BrandKit>) => void;
  interfaceLang: InterfaceLang;
  onOpenProModal?: () => void;
}

export const MoreOptions: React.FC<MoreOptionsProps> = ({
  brandKit,
  onUpdate,
  interfaceLang,
  onOpenProModal,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = UI_TRANSLATIONS[interfaceLang] || UI_TRANSLATIONS.en;

  const docLanguages: { code: DocumentLang; label: string }[] = [
    { code: 'en', label: 'English (US/UK)' },
    { code: 'fr', label: 'Français' },
    { code: 'es', label: 'Español' },
    { code: 'de', label: 'Deutsch' },
    { code: 'pt', label: 'Português' },
    { code: 'it', label: 'Italiano' },
  ];

  return (
    <div className="border border-slate-200/90 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900/60 transition-all">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
      >
        <div className="flex items-center space-x-2">
          <Sliders className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            {isOpen ? t.hideOptions : t.moreOptions}
          </span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-slate-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-400" />
        )}
      </button>

      {isOpen && (
        <div className="p-3.5 pt-1 space-y-3.5 border-t border-slate-100 dark:border-slate-800/80 text-xs">
          {/* Paper Format (A4 vs US Letter) */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block">
              {t.paperFormat}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onUpdate({ paperSize: 'a4' })}
                className={`py-1.5 px-2 rounded-lg border text-center font-medium transition-all ${
                  brandKit.paperSize === 'a4'
                    ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-bold'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                }`}
              >
                {t.formatA4}
              </button>
              <button
                type="button"
                onClick={() => onUpdate({ paperSize: 'letter' })}
                className={`py-1.5 px-2 rounded-lg border text-center font-medium transition-all ${
                  brandKit.paperSize === 'letter'
                    ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-bold'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                }`}
              >
                {t.formatLetter}
              </button>
            </div>
          </div>

          {/* Document Content Language */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 flex items-center space-x-1">
              <Globe className="w-3 h-3 text-slate-400" />
              <span>{t.documentLanguage}</span>
            </label>
            <select
              value={brandKit.documentLang}
              onChange={(e) => onUpdate({ documentLang: e.target.value as DocumentLang })}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              {docLanguages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>

          {/* Brand Name & Coach Name */}
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 flex items-center space-x-1">
                <Building className="w-3 h-3 text-slate-400" />
                <span>{t.companyNameLabel}</span>
              </label>
              <input
                type="text"
                value={brandKit.companyName}
                onChange={(e) => onUpdate({ companyName: e.target.value })}
                placeholder={t.companyNamePlaceholder}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 flex items-center space-x-1">
                <User className="w-3 h-3 text-slate-400" />
                <span>{t.coachNameLabel}</span>
              </label>
              <input
                type="text"
                value={brandKit.coachName}
                onChange={(e) => onUpdate({ coachName: e.target.value })}
                placeholder={t.coachNamePlaceholder}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Optional Client Name */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
              {t.clientNameLabel}
            </label>
            <input
              type="text"
              value={brandKit.clientName}
              onChange={(e) => onUpdate({ clientName: e.target.value })}
              placeholder={t.clientNamePlaceholder}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Custom QR URL */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 flex items-center space-x-1">
              <QrCode className="w-3 h-3 text-slate-400" />
              <span>{t.qrCodeLabel}</span>
            </label>
            <input
              type="url"
              value={brandKit.qrUrl}
              onChange={(e) => onUpdate({ qrUrl: e.target.value })}
              placeholder={t.qrCodePlaceholder}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-tight">
              {t.qrCodeHint}
            </p>
          </div>

          {/* White-Label Pro Toggle */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
                PRO
              </span>
              <span className="text-[11px] text-slate-700 dark:text-slate-300 font-medium">
                {t.removeFooterWatermark}
              </span>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={brandKit.removeWatermark}
                onChange={(e) => {
                  if (!brandKit.isPro && e.target.checked && onOpenProModal) {
                    onOpenProModal();
                  } else {
                    onUpdate({ removeWatermark: e.target.checked });
                  }
                }}
                className="sr-only peer"
              />
              <div className="w-8 h-4 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};
