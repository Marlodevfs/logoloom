'use client';

import React, { useState } from 'react';
import {
  Building2,
  User,
  Link as LinkIcon,
  Mail,
  Globe,
  FileText,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { BrandKit, DocumentLang, InterfaceLang, PaperSize } from '@/types';
import { UI_TRANSLATIONS } from '@/lib/i18n/interface';

interface YourDetailsStepProps {
  brandKit: BrandKit;
  onUpdate: (updates: Partial<BrandKit>) => void;
  interfaceLang: InterfaceLang;
  onReset?: () => void;
}

const DOC_LANGUAGES: { code: DocumentLang; label: string; flag: string }[] = [
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'pt', label: 'Português', flag: '🇵🇹' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
];

export const YourDetailsStep: React.FC<YourDetailsStepProps> = ({
  brandKit,
  onUpdate,
  interfaceLang,
  onReset,
}) => {
  const isFrench = interfaceLang === 'fr';

  const [urlTouched, setUrlTouched] = useState(false);

  // Normalize URL to https://
  const handleUrlBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setUrlTouched(true);
    let val = e.target.value.trim();
    if (!val) {
      onUpdate({ qrUrl: '' });
      return;
    }
    if (!/^https?:\/\//i.test(val)) {
      val = `https://${val}`;
    }
    onUpdate({ qrUrl: val });
  };

  const hasLink = Boolean(brandKit.qrUrl && brandKit.qrUrl.trim().length > 0);

  const defaultQrLabel = isFrench ? 'Scannez pour réserver' : 'Scan to book a session';

  return (
    <div className="space-y-3.5">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
            {isFrench ? '4. Vos coordonnées' : '4. Your Details'}
          </span>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-950/50 px-1.5 py-0.5 rounded">
            {isFrench ? 'Toujours visible' : 'Visible on print'}
          </span>
        </div>
        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="text-[11px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center space-x-1 transition-colors"
            title={isFrench ? 'Effacer vos coordonnées' : 'Reset details'}
          >
            <RotateCcw className="w-3 h-3" />
            <span>{isFrench ? 'Effacer' : 'Clear'}</span>
          </button>
        )}
      </div>

      <div className="space-y-2.5 text-xs">
        {/* Business / Studio Name */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label
              htmlFor="field-company-name"
              className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 flex items-center space-x-1.5"
            >
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              <span>{isFrench ? 'Nom du cabinet / studio' : 'Business / Studio Name'}</span>
            </label>
            <span
              className={`text-[10px] font-mono ${
                (brandKit.companyName?.length || 0) > 35
                  ? 'text-amber-500 font-bold'
                  : 'text-slate-400'
              }`}
            >
              {brandKit.companyName?.length || 0}/40
            </span>
          </div>
          <input
            id="field-company-name"
            type="text"
            maxLength={40}
            value={brandKit.companyName || ''}
            onChange={(e) => onUpdate({ companyName: e.target.value })}
            placeholder={isFrench ? 'Ex. Studio Équilibre & Santé' : 'e.g. Apex Studio & Coaching'}
            className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
          />
        </div>

        {/* Tagline / Subtitle */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label
              htmlFor="field-tagline"
              className="text-[11px] font-medium text-slate-600 dark:text-slate-400 flex items-center space-x-1.5"
            >
              <Sparkles className="w-3 h-3 text-slate-400" />
              <span>{isFrench ? 'Slogan ou sous-titre (facultatif)' : 'Tagline or subtitle (optional)'}</span>
            </label>
            <span
              className={`text-[10px] font-mono ${
                (brandKit.tagline?.length || 0) > 50
                  ? 'text-amber-500 font-bold'
                  : 'text-slate-400'
              }`}
            >
              {brandKit.tagline?.length || 0}/60
            </span>
          </div>
          <input
            id="field-tagline"
            type="text"
            maxLength={60}
            value={brandKit.tagline || ''}
            onChange={(e) => onUpdate({ tagline: e.target.value })}
            placeholder={isFrench ? 'Ex. Accompagnement santé & performance' : 'e.g. High-Impact Consulting & Strategic Performance'}
            className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
          />
        </div>

        {/* Your Name / Coach Title */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label
              htmlFor="field-coach-name"
              className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 flex items-center space-x-1.5"
            >
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>{isFrench ? 'Votre nom / Référent' : 'Your Name / Practitioner'}</span>
            </label>
            <span
              className={`text-[10px] font-mono ${
                (brandKit.coachName?.length || 0) > 32
                  ? 'text-amber-500 font-bold'
                  : 'text-slate-400'
              }`}
            >
              {brandKit.coachName?.length || 0}/40
            </span>
          </div>
          <input
            id="field-coach-name"
            type="text"
            maxLength={40}
            value={brandKit.coachName || ''}
            onChange={(e) => onUpdate({ coachName: e.target.value })}
            placeholder={isFrench ? 'Ex. Alexandre Martin' : 'e.g. Sarah Jenkins, M.Sc.'}
            className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
          />
        </div>

        {/* Website or Booking Link (with QR Helper) */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-700/80 p-2.5 bg-slate-50/70 dark:bg-slate-800/40 space-y-2">
          <div className="flex justify-between items-center">
            <label
              htmlFor="field-qr-url"
              className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 flex items-center space-x-1.5"
            >
              <LinkIcon className="w-3.5 h-3.5 text-indigo-500" />
              <span>{isFrench ? 'Lien de réservation ou site web' : 'Booking link or website'}</span>
            </label>
            {hasLink && (
              <span className="inline-flex items-center space-x-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                <CheckCircle2 className="w-3 h-3" />
                <span>{isFrench ? 'QR code actif (≥18 mm)' : 'QR active (≥18 mm)'}</span>
              </span>
            )}
          </div>

          <input
            id="field-qr-url"
            type="url"
            value={brandKit.qrUrl || ''}
            onChange={(e) => onUpdate({ qrUrl: e.target.value })}
            onBlur={handleUrlBlur}
            placeholder={isFrench ? 'https://calendly.com/votre-nom' : 'https://calendly.com/your-name'}
            className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all font-mono text-[11px]"
          />

          <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
            {isFrench
              ? 'Ajoute un QR code scannable haute fidélité (≥18 mm) sur votre document imprimé.'
              : 'Adds a scannable high-res QR code (≥18 mm) to your printed document.'}
          </p>

          {/* Editable QR Label when Link is present */}
          {hasLink && (
            <div className="pt-1.5 border-t border-slate-200/60 dark:border-slate-700/60">
              <div className="flex justify-between items-center mb-1">
                <label
                  htmlFor="field-qr-label"
                  className="text-[10.5px] font-medium text-slate-600 dark:text-slate-400"
                >
                  {isFrench ? 'Libellé sous le QR code' : 'Label below QR code'}
                </label>
                <span className="text-[9.5px] font-mono text-slate-400">
                  {(brandKit.qrLabel || defaultQrLabel).length}/35
                </span>
              </div>
              <input
                id="field-qr-label"
                type="text"
                maxLength={35}
                value={brandKit.qrLabel ?? ''}
                onChange={(e) => onUpdate({ qrLabel: e.target.value })}
                placeholder={defaultQrLabel}
                className="w-full px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-[11px] text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          )}
        </div>

        {/* Contact Email & Client Name */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label
              htmlFor="field-contact-email"
              className="text-[10.5px] font-medium text-slate-600 dark:text-slate-400 block mb-1 truncate"
            >
              {isFrench ? 'E-mail de contact' : 'Contact email'}
            </label>
            <input
              id="field-contact-email"
              type="email"
              maxLength={45}
              value={brandKit.contactEmail || ''}
              onChange={(e) => onUpdate({ contactEmail: e.target.value })}
              placeholder="contact@studio.com"
              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-[11px] text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="field-client-name"
              className="text-[10.5px] font-medium text-slate-600 dark:text-slate-400 block mb-1 truncate"
            >
              {isFrench ? 'Nom du client (optionnel)' : 'Client name (optional)'}
            </label>
            <input
              id="field-client-name"
              type="text"
              maxLength={35}
              value={brandKit.clientName || ''}
              onChange={(e) => onUpdate({ clientName: e.target.value })}
              placeholder={isFrench ? 'Ex. Thomas D.' : 'e.g. Sarah Jenkins'}
              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-[11px] text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Paper Size & Document Language in Step 4 */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
          {/* Document Content Language */}
          <div>
            <label className="text-[10.5px] font-semibold text-slate-600 dark:text-slate-400 flex items-center justify-between mb-1">
              <span className="flex items-center space-x-1">
                <Globe className="w-3 h-3 text-slate-400" />
                <span>{isFrench ? 'Langue du document PDF' : 'Document PDF Language'}</span>
              </span>
              <span className="text-[9.5px] text-slate-400 font-normal">
                {isFrench ? '100% vectoriel traduit' : 'Fully translated'}
              </span>
            </label>
            <select
              value={brandKit.documentLang}
              onChange={(e) => onUpdate({ documentLang: e.target.value as DocumentLang })}
              className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              {DOC_LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.flag} {l.label}
                </option>
              ))}
            </select>
          </div>

          {/* Paper Size */}
          <div>
            <label className="text-[10.5px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
              {isFrench ? 'Format du papier' : 'Paper size'}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onUpdate({ paperSize: 'a4' })}
                className={`py-1.5 px-2 rounded-lg border text-center text-[11px] transition-all ${
                  brandKit.paperSize === 'a4'
                    ? 'border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-bold'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                }`}
              >
                A4 (210×297 mm)
              </button>
              <button
                type="button"
                onClick={() => onUpdate({ paperSize: 'letter' })}
                className={`py-1.5 px-2 rounded-lg border text-center text-[11px] transition-all ${
                  brandKit.paperSize === 'letter'
                    ? 'border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-bold'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                }`}
              >
                US Letter (8.5×11")
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
