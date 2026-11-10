'use client';

import React, { useState } from 'react';
import { Download, Loader2, CheckCircle, Sparkles } from 'lucide-react';
import { BrandKit, TemplateId, InterfaceLang } from '@/types';
import { trackEvent } from '@/lib/analytics';
import { BMC_URL, getBmcLabels } from '@/components/BuyMeACoffee';
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
  // After a first successful download, gently suggest a coffee (desktop panel only)
  const [showSupport, setShowSupport] = useState(false);

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
      setShowSupport(true);
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
        className="w-full h-12 px-4 rounded-lg font-bold text-sm whitespace-nowrap text-white transition-[filter] hover:brightness-110 active:brightness-95 disabled:opacity-80 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        style={{
          backgroundColor: brandKit.brandColor,
        }}
      >
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

      {/* After a download: discreet Buy Me a Coffee link. Otherwise: trust pill */}
      {!compact && showSupport && (
        <a
          href={BMC_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('bmc_click', { from: 'download' })}
          className="block text-[11px] text-center text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white font-medium"
        >
          <span aria-hidden="true">☕ </span>
          {getBmcLabels(interfaceLang).button}
        </a>
      )}
      {!compact && !showSupport && (
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
