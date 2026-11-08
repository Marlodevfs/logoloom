'use client';

import React, { useState } from 'react';
import { Download, Loader2, CheckCircle, Sparkles } from 'lucide-react';
import { BrandKit, TemplateId, InterfaceLang } from '@/types';
import { exportToPDF } from '@/lib/pdf-generator';
import { UI_TRANSLATIONS } from '@/lib/i18n/interface';

interface DownloadButtonProps {
  brandKit: BrandKit;
  activeTemplate: TemplateId;
  interfaceLang: InterfaceLang;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({
  brandKit,
  activeTemplate,
  interfaceLang,
}) => {
  const t = UI_TRANSLATIONS[interfaceLang] || UI_TRANSLATIONS.en;
  const [isExporting, setIsExporting] = useState(false);
  const [hasExported, setHasExported] = useState(false);

  const handleDownload = async () => {
    setIsExporting(true);
    setHasExported(false);

    try {
      await exportToPDF({
        paperSize: brandKit.paperSize,
        brandKit,
        templateId: activeTemplate,
      });

      setHasExported(true);
      setTimeout(() => setHasExported(false), 3000);
    } catch (err) {
      console.error('Failed to export PDF', err);
      alert(interfaceLang === 'fr' ? 'La génération du PDF a échoué. Veuillez réessayer.' : 'PDF generation encountered an error. Please retry.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-1.5">
      <button
        type="button"
        onClick={handleDownload}
        disabled={isExporting}
        className="w-full relative group overflow-hidden py-3 px-4 rounded-xl font-bold text-sm text-white shadow-lg shadow-indigo-500/25 transition-all transform active:scale-[0.98] disabled:opacity-80 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
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
      <p className="text-[10px] text-center text-slate-400 dark:text-slate-500 flex items-center justify-center space-x-1 font-medium">
        <span>🔒</span>
        <span>{t.privacyBadge}</span>
        <span>•</span>
        <span>300 DPI Print Quality</span>
      </p>
    </div>
  );
};
