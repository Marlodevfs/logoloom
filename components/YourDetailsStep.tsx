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
  Calendar,
  Coins,
} from 'lucide-react';
import { BrandKit, DocumentLang, InterfaceLang, PaperSize, TemplateId, WeekStartDay } from '@/types';
import { UI_TRANSLATIONS } from '@/lib/i18n/interface';

interface YourDetailsStepProps {
  brandKit: BrandKit;
  onUpdate: (updates: Partial<BrandKit>) => void;
  interfaceLang: InterfaceLang;
  activeTemplate?: TemplateId;
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

const CURRENCY_OPTIONS = ['€', '$', '£', 'CHF', '¥', 'CAD', 'AUD'];

const LABELS: Record<InterfaceLang, {
  stepTitle: string;
  visibleOnPrint: string;
  clear: string;
  businessName: string;
  businessPlaceholder: string;
  tagline: string;
  taglinePlaceholder: string;
  practitionerName: string;
  practitionerPlaceholder: string;
  bookingLink: string;
  qrActive: string;
  qrHelper: string;
  qrLabel: string;
  defaultQrLabel: string;
  contactEmail: string;
  clientName: string;
  clientPlaceholder: string;
  paperFormat: string;
  documentLanguage: string;
  weekStart: string;
  monday: string;
  sunday: string;
  currency: string;
}> = {
  fr: {
    stepTitle: '4. Vos coordonnées & Paramètres',
    visibleOnPrint: 'Toujours visible',
    clear: 'Effacer',
    businessName: 'Nom de l’entreprise / studio',
    businessPlaceholder: 'Ex. Studio Équilibre & Conseil',
    tagline: 'Slogan ou sous-titre (facultatif)',
    taglinePlaceholder: 'Ex. Conseil stratégique & performance',
    practitionerName: 'Votre nom / Référent',
    practitionerPlaceholder: 'Ex. Camille Laurent',
    bookingLink: 'Lien de réservation ou site web',
    qrActive: 'QR code actif (≥18 mm)',
    qrHelper: 'Ajoute un QR code scannable haute fidélité (≥18 mm) sur votre document imprimé.',
    qrLabel: 'Libellé sous le QR code',
    defaultQrLabel: 'Scannez pour réserver',
    contactEmail: 'E-mail de contact',
    clientName: 'Nom du client / Destinataire',
    clientPlaceholder: 'Ex. Société Dupont SARL',
    paperFormat: 'Format papier',
    documentLanguage: 'Langue du document',
    weekStart: 'Début de la semaine',
    monday: 'Lundi',
    sunday: 'Dimanche',
    currency: 'Devise / Symbole monétaire',
  },
  en: {
    stepTitle: '4. Your Details & Settings',
    visibleOnPrint: 'Visible on print',
    clear: 'Clear',
    businessName: 'Business / Studio Name',
    businessPlaceholder: 'e.g. Apex Strategic Advisory',
    tagline: 'Tagline or focus (optional)',
    taglinePlaceholder: 'e.g. Performance, Strategy & Health',
    practitionerName: 'Your Name / Practitioner',
    practitionerPlaceholder: 'e.g. Sarah Jenkins',
    bookingLink: 'Booking link or website',
    qrActive: 'QR active (≥18 mm)',
    qrHelper: 'Adds a scannable high-res QR code (≥18 mm) to your printed document.',
    qrLabel: 'Label below QR code',
    defaultQrLabel: 'Scan to book a session',
    contactEmail: 'Contact email',
    clientName: 'Client / Recipient name',
    clientPlaceholder: 'e.g. Acme Corp Ltd',
    paperFormat: 'Paper size',
    documentLanguage: 'Document language',
    weekStart: 'Week start day',
    monday: 'Monday',
    sunday: 'Sunday',
    currency: 'Currency symbol',
  },
  de: {
    stepTitle: '4. Ihre Angaben & Optionen',
    visibleOnPrint: 'Auf Druck sichtbar',
    clear: 'Löschen',
    businessName: 'Praxis- / Unternehmensname',
    businessPlaceholder: 'z.B. Schmidt Beratung & Studio',
    tagline: 'Slogan oder Schwerpunkt (optional)',
    taglinePlaceholder: 'z.B. Strategie, Führung & Gesundheit',
    practitionerName: 'Ihr Name / Ansprechpartner',
    practitionerPlaceholder: 'z.B. Dr. Julia Schmidt',
    bookingLink: 'Buchungslink oder Website',
    qrActive: 'QR aktiv (≥18 mm)',
    qrHelper: 'Fügt Ihrem gedruckten Dokument einen hochauflösenden QR-Code (≥18 mm) hinzu.',
    qrLabel: 'Beschriftung unter dem QR-Code',
    defaultQrLabel: 'Scannen für Terminbuchung',
    contactEmail: 'Kontakt-E-Mail',
    clientName: 'Kundenname / Empfänger',
    clientPlaceholder: 'z.B. Musterfirma GmbH',
    paperFormat: 'Papierformat',
    documentLanguage: 'Dokumentsprache',
    weekStart: 'Wochenbeginn',
    monday: 'Montag',
    sunday: 'Sonntag',
    currency: 'Währungssymbol',
  },
  es: {
    stepTitle: '4. Sus datos y configuración',
    visibleOnPrint: 'Visible en impresión',
    clear: 'Borrar',
    businessName: 'Nombre de empresa / estudio',
    businessPlaceholder: 'Ej. Estudio Equilibrio & Salud',
    tagline: 'Eslogan o subtítulo (opcional)',
    taglinePlaceholder: 'Ej. Consultoría estratégica y bienestar',
    practitionerName: 'Su nombre / Profesional',
    practitionerPlaceholder: 'Ej. Dr. Carlos Mendoza',
    bookingLink: 'Enlace de reservas o web',
    qrActive: 'QR activo (≥18 mm)',
    qrHelper: 'Añade un código QR escaneable en alta definición (≥18 mm) al documento impreso.',
    qrLabel: 'Texto bajo el código QR',
    defaultQrLabel: 'Escanear para reservar',
    contactEmail: 'Correo de contacto',
    clientName: 'Nombre del cliente / Destinatario',
    clientPlaceholder: 'Ej. Empresa Ejemplo S.L.',
    paperFormat: 'Formato de papel',
    documentLanguage: 'Idioma del documento',
    weekStart: 'Inicio de la semana',
    monday: 'Lunes',
    sunday: 'Domingo',
    currency: 'Moneda / Símbolo',
  },
  it: {
    stepTitle: '4. I tuoi dati e opzioni',
    visibleOnPrint: 'Visibile su stampa',
    clear: 'Cancella',
    businessName: 'Nome azienda / studio',
    businessPlaceholder: 'Es. Studio Armonia & Salute',
    tagline: 'Slogan o sottotitolo (opzionale)',
    taglinePlaceholder: 'Es. Consulenza e crescita personale',
    practitionerName: 'Il tuo nome / Professionista',
    practitionerPlaceholder: 'Es. Dott. Marco Rossi',
    bookingLink: 'Link di prenotazione o sito',
    qrActive: 'QR attivo (≥18 mm)',
    qrHelper: 'Aggiunge un codice QR ad alta risoluzione (≥18 mm) al documento stampato.',
    qrLabel: 'Dicitura sotto il QR',
    defaultQrLabel: 'Scansiona per prenotare',
    contactEmail: 'Email di contatto',
    clientName: 'Nome cliente / Destinatario',
    clientPlaceholder: 'Es. Azienda Esempio S.r.l.',
    paperFormat: 'Formato carta',
    documentLanguage: 'Lingua del documento',
    weekStart: 'Inizio della settimana',
    monday: 'Lunedì',
    sunday: 'Domenica',
    currency: 'Valuta / Simbolo',
  },
  pt: {
    stepTitle: '4. Seus dados e configurações',
    visibleOnPrint: 'Visível na impressão',
    clear: 'Limpar',
    businessName: 'Nome da empresa / estúdio',
    businessPlaceholder: 'Ex. Estúdio Equilíbrio & Foco',
    tagline: 'Slogan ou subtítulo (opcional)',
    taglinePlaceholder: 'Ex. Consultoria e estratégia',
    practitionerName: 'Seu nome / Responsável',
    practitionerPlaceholder: 'Ex. Dra. Ana Silva',
    bookingLink: 'Link de agendamento ou site',
    qrActive: 'QR ativo (≥18 mm)',
    qrHelper: 'Adiciona um código QR em alta definição (≥18 mm) ao documento impresso.',
    qrLabel: 'Texto sob o QR code',
    defaultQrLabel: 'Escanear para agendar',
    contactEmail: 'E-mail de contato',
    clientName: 'Nome do cliente / Destinatário',
    clientPlaceholder: 'Ex. Empresa Exemplo Lda',
    paperFormat: 'Formato do papel',
    documentLanguage: 'Idioma do documento',
    weekStart: 'Início da semana',
    monday: 'Segunda-feira',
    sunday: 'Domingo',
    currency: 'Moeda / Símbolo',
  },
};

export const YourDetailsStep: React.FC<YourDetailsStepProps> = ({
  brandKit,
  onUpdate,
  interfaceLang,
  activeTemplate = 'habit-tracker',
  onReset,
}) => {
  const l = LABELS[interfaceLang] || LABELS.en;
  const hasLink = Boolean(brandKit.qrUrl && brandKit.qrUrl.trim().length > 0);
  const defaultQrLabel = l.defaultQrLabel;

  const isCalendarBased = ['weekly-planner', 'monthly-calendar', 'meal-planner'].includes(activeTemplate);
  const isFinancial = ['budget-tracker', 'price-list'].includes(activeTemplate);

  const handleUrlBlur = () => {
    if (brandKit.qrUrl && brandKit.qrUrl.trim().length > 0) {
      let cleaned = brandKit.qrUrl.trim();
      if (!/^https?:\/\//i.test(cleaned)) {
        cleaned = `https://${cleaned}`;
        onUpdate({ qrUrl: cleaned });
      }
    }
  };

  return (
    <div className="space-y-3">
      {/* Step Header */}
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center space-x-1.5">
          <span>{l.stepTitle}</span>
        </label>
        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="text-[10px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 flex items-center space-x-1 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{l.clear}</span>
          </button>
        )}
      </div>

      <div className="space-y-2.5">
        {/* Business / Company Name */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label
              htmlFor="field-business-name"
              className="text-[10.5px] font-medium text-slate-600 dark:text-slate-400 flex items-center space-x-1"
            >
              <Building2 className="w-3 h-3 text-slate-400" />
              <span>{l.businessName}</span>
            </label>
            <span className="text-[9.5px] font-mono text-slate-400">
              {(brandKit.companyName || '').length}/40
            </span>
          </div>
          <input
            id="field-business-name"
            type="text"
            maxLength={40}
            value={brandKit.companyName || ''}
            onChange={(e) => onUpdate({ companyName: e.target.value })}
            placeholder={l.businessPlaceholder}
            className="w-full px-3 py-2 sm:py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        {/* Tagline */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label
              htmlFor="field-tagline"
              className="text-[10.5px] font-medium text-slate-600 dark:text-slate-400 flex items-center space-x-1"
            >
              <Sparkles className="w-3 h-3 text-slate-400" />
              <span>{l.tagline}</span>
            </label>
            <span className="text-[9.5px] font-mono text-slate-400">
              {(brandKit.tagline || '').length}/60
            </span>
          </div>
          <input
            id="field-tagline"
            type="text"
            maxLength={60}
            value={brandKit.tagline || ''}
            onChange={(e) => onUpdate({ tagline: e.target.value })}
            placeholder={l.taglinePlaceholder}
            className="w-full px-3 py-2 sm:py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        {/* Contact Email & Client Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label
              htmlFor="field-contact-email"
              className="text-[10.5px] font-medium text-slate-600 dark:text-slate-400 block mb-1 truncate"
            >
              {l.contactEmail}
            </label>
            <input
              id="field-contact-email"
              type="email"
              maxLength={45}
              value={brandKit.contactEmail || ''}
              onChange={(e) => onUpdate({ contactEmail: e.target.value })}
              placeholder="contact@studio.com"
              className="w-full px-3 py-2 sm:py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="field-client-name"
              className="text-[10.5px] font-medium text-slate-600 dark:text-slate-400 block mb-1 truncate"
            >
              {l.clientName}
            </label>
            <input
              id="field-client-name"
              type="text"
              maxLength={40}
              value={brandKit.clientName || ''}
              onChange={(e) => onUpdate({ clientName: e.target.value })}
              placeholder={l.clientPlaceholder}
              className="w-full px-3 py-2 sm:py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Booking Link / Contact QR (optional) */}
        <div className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/40 space-y-2">
          <div className="flex justify-between items-center">
            <label
              htmlFor="field-qr-url"
              className="text-[10.5px] font-semibold text-slate-700 dark:text-slate-300 flex items-center space-x-1"
            >
              <LinkIcon className="w-3 h-3 text-slate-400" />
              <span>{l.bookingLink}</span>
            </label>
            {hasLink && (
              <span className="text-[9.5px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center space-x-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>{l.qrActive}</span>
              </span>
            )}
          </div>

          <input
            id="field-qr-url"
            type="url"
            value={brandKit.qrUrl || ''}
            onChange={(e) => onUpdate({ qrUrl: e.target.value })}
            onBlur={handleUrlBlur}
            placeholder="https://calendly.com/your-name"
            className="w-full px-3 py-2 sm:py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
          />

          {hasLink && (
            <div className="pt-1.5 border-t border-slate-200/60 dark:border-slate-700/60">
              <input
                type="text"
                maxLength={35}
                value={brandKit.qrLabel ?? ''}
                onChange={(e) => onUpdate({ qrLabel: e.target.value })}
                placeholder={defaultQrLabel}
                className="w-full px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          )}
        </div>

        {/* Dynamic Context Controls */}
        {/* 1. Week start toggle for calendar-based documents */}
        {isCalendarBased && (
          <div className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/40">
            <label className="text-[10.5px] font-semibold text-slate-700 dark:text-slate-300 flex items-center space-x-1 mb-1.5">
              <Calendar className="w-3 h-3 text-slate-400" />
              <span>{l.weekStart}</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onUpdate({ weekStart: 'monday' })}
                className={`py-1.5 px-2 rounded-lg border text-center text-xs font-semibold transition-all ${
                  (brandKit.weekStart || 'monday') === 'monday'
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                {l.monday}
              </button>
              <button
                type="button"
                onClick={() => onUpdate({ weekStart: 'sunday' })}
                className={`py-1.5 px-2 rounded-lg border text-center text-xs font-semibold transition-all ${
                  brandKit.weekStart === 'sunday'
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                {l.sunday}
              </button>
            </div>
          </div>
        )}

        {/* 2. Currency Selector for financial templates */}
        {isFinancial && (
          <div className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/40">
            <label className="text-[10.5px] font-semibold text-slate-700 dark:text-slate-300 flex items-center space-x-1 mb-1.5">
              <Coins className="w-3 h-3 text-slate-400" />
              <span>{l.currency}</span>
            </label>
            <div className="flex items-center space-x-1.5 flex-wrap gap-y-1.5">
              {CURRENCY_OPTIONS.map((sym) => (
                <button
                  key={sym}
                  type="button"
                  onClick={() => onUpdate({ currency: sym })}
                  className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold border transition-all ${
                    (brandKit.currency || '€') === sym
                      ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 shadow-2xs'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                  }`}
                >
                  {sym}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Paper Size & Document Language */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
          {/* Document Content Language */}
          <div>
            <label htmlFor="field-document-lang" className="text-[10.5px] font-semibold text-slate-600 dark:text-slate-400 flex items-center justify-between mb-1">
              <span className="flex items-center space-x-1">
                <Globe className="w-3 h-3 text-slate-400" />
                <span>{l.documentLanguage}</span>
              </span>
            </label>
            <select
              id="field-document-lang"
              value={brandKit.documentLang}
              onChange={(e) => onUpdate({ documentLang: e.target.value as DocumentLang })}
              className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              {DOC_LANGUAGES.map((langItem) => (
                <option key={langItem.code} value={langItem.code}>
                  {langItem.flag} {langItem.label}
                </option>
              ))}
            </select>
          </div>

          {/* Paper Size Selector */}
          <div>
            <label className="text-[10.5px] font-semibold text-slate-600 dark:text-slate-400 flex items-center space-x-1 mb-1.5">
              <FileText className="w-3 h-3 text-slate-400" />
              <span>{l.paperFormat}</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onUpdate({ paperSize: 'a4' })}
                className={`py-2 px-2.5 rounded-lg border text-center text-xs font-semibold transition-all ${
                  brandKit.paperSize === 'a4'
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 shadow-2xs'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                }`}
              >
                A4 (210×297 mm)
              </button>
              <button
                type="button"
                onClick={() => onUpdate({ paperSize: 'letter' })}
                className={`py-2 px-2.5 rounded-lg border text-center text-xs font-semibold transition-all ${
                  brandKit.paperSize === 'letter'
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 shadow-2xs'
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
