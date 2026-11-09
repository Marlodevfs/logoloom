'use client';

import React, { useState } from 'react';
import { Download, Loader2, CheckCircle, Sparkles } from 'lucide-react';
import { BrandKit, TemplateId, InterfaceLang } from '@/types';
import { trackEvent } from '@/lib/analytics';
import { UI_TRANSLATIONS } from '@/lib/i18n/interface';

interface DownloadButtonProps {
  brandKit: BrandKit;
  activeTemplate: TemplateId;
  interfaceLang: InterfaceLang;
  /** Hide the reassurance caption (used in the mobile sticky bar) */
  compact?: boolean;
}

// The PDF engine (@react-pdf + fonts) is heavy: load it only when needed.
let pdfModulePromise: Promise<typeof import('@/lib/pdf-generator')> | null = null;
function loadPdfEngine() {
  if (!pdfModulePromise) {
    pdfModulePromise = import('@/lib/pdf-generator').catch((err) => {
      pdfModulePromise = null; // allow retry after a network error
      throw err;
    });
  }
  return pdfModulePromise;
}

const DOWNLOAD_I18N: Record<InterfaceLang, {
  printQualityNotice: string;
  errorAlert: string;
}> = {
  fr: {
    printQualityNotice: 'PDF vectoriel, prêt à imprimer',
    errorAlert: 'La génération du PDF a échoué. Veuillez réessayer.',
  },
  en: {
    printQualityNotice: 'Vector PDF, print-ready',
    errorAlert: 'PDF generation encountered an error. Please retry.',
  },
  de: {
    printQualityNotice: 'Vektor-PDF, druckfertig',
    errorAlert: 'PDF-Erstellung fehlgeschlagen. Bitte versuchen Sie es erneut.',
  },
  es: {
    printQualityNotice: 'PDF vectorial, listo para imprimir',
    errorAlert: 'La generación del PDF falló. Inténtelo de nuevo.',
  },
  it: {
    printQualityNotice: 'PDF vettoriale, pronto per la stampa',
    errorAlert: 'La generazione del PDF non è riuscita. Riprova.',
  },
  pt: {
    printQualityNotice: 'PDF vetorial, pronto para impressão',
    errorAlert: 'A geração do PDF falhou. Tente novamente.',
  },
};

export const DownloadButton: React.FC<DownloadButtonProps> = ({
  brandKit,
  activeTemplate,
  interfaceLang,
  compact = false,
}) => {
  const t = UI_TRANSLATIONS[interfaceLang] || UI_TRANSLATIONS.en;
  const dI18n = DOWNLOAD_I18N[interfaceLang] || DOWNLOAD_I18N.en;
  const [isExporting, setIsExporting] = useState(false);
  const [hasExported, setHasExported] = useState(false);

  const handleDownload = async () => {
    setIsExporting(true);
    setHasExported(false);

    try {
      const { exportToPDF } = await loadPdfEngine();
      await exportToPDF({
        paperSize: brandKit.paperSize,
        brandKit,
        templateId: activeTemplate,
      });

      trackEvent('pdf_download', { template: activeTemplate, paper: brandKit.paperSize });
      setHasExported(true);
      setTimeout(() => setHasExported(false), 3000);
    } catch (err) {
      console.error('Failed to export PDF', err);
      alert(dI18n.errorAlert);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className={compact ? '' : 'space-y-1.5'}>
      <button
        type="button"
        onClick={handleDownload}
        onMouseEnter={() => { loadPdfEngine().catch(() => {}); }}
        onFocus={() => { loadPdfEngine().catch(() => {}); }}
        onTouchStart={() => { loadPdfEngine().catch(() => {}); }}
        disabled={isExporting}
        aria-busy={isExporting}
        className="w-full relative group overflow-hidden h-12 px-4 rounded-xl font-bold text-sm whitespace-nowrap text-white shadow-lg shadow-indigo-500/25 transition-all transform active:scale-[0.98] disabled:opacity-80 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        style={{
          backgroundColor: brandKit.brandColor,
        }}
      >
        {/* Subtle shine hover effect */}
        <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-700 pointer-events-none" />

        {isExporting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>{t.generatingPdf}</span>
          </>
        ) : hasExported ? (
          <>
            <CheckCircle className="w-4 h-4 text-white" />
            <span>{t.downloadSuccess}</span>
          </>
        ) : (
          <>
            <Download className="w-4 h-4 text-white" />
            <span>{t.downloadPdf}</span>
          </>
        )}
      </button>

      {/* Trust reassurance pill */}
      {!compact && (
      <p className="text-[10px] text-center text-slate-400 dark:text-slate-500 flex items-center justify-center space-x-1 font-medium">
        <span>🔒</span>
        <span>{t.privacyBadge}</span>
        <span>•</span>
        <span>{dI18n.printQualityNotice}</span>
      </p>
      )}
    </div>
  );
};
