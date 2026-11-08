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
}> = {
  fr: {
    stepTitle: '4. Vos coordonnées',
    visibleOnPrint: 'Toujours visible',
    clear: 'Effacer',
    businessName: 'Nom du cabinet / studio',
    businessPlaceholder: 'Ex. Studio Équilibre & Santé',
    tagline: 'Slogan ou sous-titre (facultatif)',
    taglinePlaceholder: 'Ex. Accompagnement santé & performance',
    practitionerName: 'Votre nom / Référent',
    practitionerPlaceholder: 'Ex. Camille Laurent, Coach Certifié',
    bookingLink: 'Lien de réservation ou site web',
    qrActive: 'QR code actif (≥18 mm)',
    qrHelper: 'Ajoute un QR code scannable haute fidélité (≥18 mm) sur votre document imprimé.',
    qrLabel: 'Libellé sous le QR code',
    defaultQrLabel: 'Scannez pour réserver',
    contactEmail: 'E-mail de contact',
    clientName: 'Nom du client',
    clientPlaceholder: 'Ex. Marie Dupont',
    paperFormat: 'Format papier',
    documentLanguage: 'Langue du document',
  },
  en: {
    stepTitle: '4. Your Details',
    visibleOnPrint: 'Visible on print',
    clear: 'Clear',
    businessName: 'Business / Studio Name',
    businessPlaceholder: 'e.g. Balance & Wellness Studio',
    tagline: 'Tagline or focus (optional)',
    taglinePlaceholder: 'e.g. Health, Leadership & Performance',
    practitionerName: 'Your Name / Practitioner',
    practitionerPlaceholder: 'e.g. Sarah Jenkins, M.Sc.',
    bookingLink: 'Booking link or website',
    qrActive: 'QR active (≥18 mm)',
    qrHelper: 'Adds a scannable high-res QR code (≥18 mm) to your printed document.',
    qrLabel: 'Label below QR code',
    defaultQrLabel: 'Scan to book a session',
    contactEmail: 'Contact email',
    clientName: 'Client name',
    clientPlaceholder: 'e.g. John Doe',
    paperFormat: 'Paper size',
    documentLanguage: 'Document language',
  },
  de: {
    stepTitle: '4. Ihre Angaben',
    visibleOnPrint: 'Auf Druck sichtbar',
    clear: 'Löschen',
    businessName: 'Praxis- / Studioname',
    businessPlaceholder: 'z.B. Balance & Vitalitäts-Studio',
    tagline: 'Slogan oder Schwerpunkt (optional)',
    taglinePlaceholder: 'z.B. Gesundheit, Führung & Performance',
    practitionerName: 'Ihr Name / Ansprechpartner',
    practitionerPlaceholder: 'z.B. Dr. Julia Schmidt',
    bookingLink: 'Buchungslink oder Website',
    qrActive: 'QR aktiv (≥18 mm)',
    qrHelper: 'Fügt Ihrem gedruckten Dokument einen hochauflösenden QR-Code (≥18 mm) hinzu.',
    qrLabel: 'Beschriftung unter dem QR-Code',
    defaultQrLabel: 'Scannen für Terminbuchung',
    contactEmail: 'Kontakt-E-Mail',
    clientName: 'Kundenname',
    clientPlaceholder: 'z.B. Max Mustermann',
    paperFormat: 'Papierformat',
    documentLanguage: 'Dokumentsprache',
  },
  es: {
    stepTitle: '4. Sus datos de contacto',
    visibleOnPrint: 'Visible al imprimir',
    clear: 'Borrar',
    businessName: 'Nombre del estudio / consulta',
    businessPlaceholder: 'Ej. Estudio Equilibrio & Salud',
    tagline: 'Lema o enfoque (opcional)',
    taglinePlaceholder: 'Ej. Salud, Liderazgo y Rendimiento',
    practitionerName: 'Su nombre / Especialista',
    practitionerPlaceholder: 'Ej. Carlos Méndez, Coach',
    bookingLink: 'Enlace de reserva o sitio web',
    qrActive: 'QR activo (≥18 mm)',
    qrHelper: 'Añade un código QR escaneable de alta resolución (≥18 mm) a su documento.',
    qrLabel: 'Etiqueta debajo del código QR',
    defaultQrLabel: 'Escanear para reservar cita',
    contactEmail: 'Correo de contacto',
    clientName: 'Nombre del cliente',
    clientPlaceholder: 'Ej. María García',
    paperFormat: 'Formato de papel',
    documentLanguage: 'Idioma del documento',
  },
  it: {
    stepTitle: '4. I tuoi recapiti',
    visibleOnPrint: 'Visibile in stampa',
    clear: 'Cancella',
    businessName: 'Nome dello studio / attività',
    businessPlaceholder: 'Es. Studio Equilibrio & Salute',
    tagline: 'Slogan o sottotitolo (opzionale)',
    taglinePlaceholder: 'Es. Salute, Leadership e Performance',
    practitionerName: 'Tuo nome / Professionista',
    practitionerPlaceholder: 'Es. Dott. Marco Rossi',
    bookingLink: 'Link di prenotazione o sito web',
    qrActive: 'QR attivo (≥18 mm)',
    qrHelper: 'Aggiunge un codice QR scansionabile ad alta risoluzione (≥18 mm) al documento.',
    qrLabel: 'Dicitura sotto il codice QR',
    defaultQrLabel: 'Scansiona per prenotare',
    contactEmail: 'Email di contatto',
    clientName: 'Nome del cliente',
    clientPlaceholder: 'Es. Giulia Bianchi',
    paperFormat: 'Formato carta',
    documentLanguage: 'Lingua del documento',
  },
  pt: {
    stepTitle: '4. Seus dados de contato',
    visibleOnPrint: 'Visível na impressão',
    clear: 'Limpar',
    businessName: 'Nome do consultório / estúdio',
    businessPlaceholder: 'Ex. Estúdio Equilíbrio & Saúde',
    tagline: 'Slogan ou foco (opcional)',
    taglinePlaceholder: 'Ex. Saúde, Liderança e Performance',
    practitionerName: 'Seu nome / Profissional',
    practitionerPlaceholder: 'Ex. Ana Souza, Coach',
    bookingLink: 'Link de agendamento ou site',
    qrActive: 'QR ativo (≥18 mm)',
    qrHelper: 'Adiciona um código QR legível de alta resolução (≥18 mm) ao seu documento.',
    qrLabel: 'Legenda sob o código QR',
    defaultQrLabel: 'Escanear para agendar',
    contactEmail: 'E-mail de contato',
    clientName: 'Nome do cliente',
    clientPlaceholder: 'Ex. João Silva',
    paperFormat: 'Formato do papel',
    documentLanguage: 'Idioma do documento',
  },
};

export const YourDetailsStep: React.FC<YourDetailsStepProps> = ({
  brandKit,
  onUpdate,
  interfaceLang,
  onReset,
}) => {
  const l = LABELS[interfaceLang] || LABELS.en;
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
  const defaultQrLabel = l.defaultQrLabel;

  return (
    <div className="space-y-3.5">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
            {l.stepTitle}
          </span>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-950/50 px-1.5 py-0.5 rounded">
            {l.visibleOnPrint}
          </span>
        </div>
        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="text-[11px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center space-x-1 transition-colors"
            title={l.clear}
          >
            <RotateCcw className="w-3 h-3" />
            <span>{l.clear}</span>
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
              <span>{l.businessName}</span>
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
            placeholder={l.businessPlaceholder}
            className="w-full px-3 py-2.5 sm:py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-base sm:text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
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
              <span>{l.tagline}</span>
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
            placeholder={l.taglinePlaceholder}
            className="w-full px-3 py-2.5 sm:py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-base sm:text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
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
              <span>{l.practitionerName}</span>
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
            placeholder={l.practitionerPlaceholder}
            className="w-full px-3 py-2.5 sm:py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-base sm:text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
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
              <span>{l.bookingLink}</span>
            </label>
            {hasLink && (
              <span className="inline-flex items-center space-x-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
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
            className="w-full px-3 py-2.5 sm:py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-base sm:text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all font-mono"
          />

          <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
            {l.qrHelper}
          </p>

          {/* Editable QR Label when Link is present */}
          {hasLink && (
            <div className="pt-1.5 border-t border-slate-200/60 dark:border-slate-700/60">
              <div className="flex justify-between items-center mb-1">
                <label
                  htmlFor="field-qr-label"
                  className="text-[10.5px] font-medium text-slate-600 dark:text-slate-400"
                >
                  {l.qrLabel}
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
                className="w-full px-3 py-2 sm:py-1 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-base sm:text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          )}
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
              className="w-full px-3 py-2.5 sm:py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-base sm:text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
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
              maxLength={35}
              value={brandKit.clientName || ''}
              onChange={(e) => onUpdate({ clientName: e.target.value })}
              placeholder={l.clientPlaceholder}
              className="w-full px-3 py-2.5 sm:py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-base sm:text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
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
                <span>{l.documentLanguage}</span>
              </span>
            </label>
            <select
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

          {/* Paper Size */}
          <div>
            <label className="text-[10.5px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
              {l.paperFormat}
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
