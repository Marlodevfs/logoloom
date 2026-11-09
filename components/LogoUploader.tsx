'use client';

import React, { useRef, useState } from 'react';
import { Upload, Image as ImageIcon, X, Sparkles, Check } from 'lucide-react';
import { UI_TRANSLATIONS } from '@/lib/i18n/interface';
import { InterfaceLang } from '@/types';

interface LogoUploaderProps {
  logoUrl: string | null;
  onLogoUpload: (dataUrl: string) => void;
  onLogoReset: () => void;
  isExtractingColor: boolean;
  interfaceLang: InterfaceLang;
}

const MAX_LOGO_BYTES = 2 * 1024 * 1024;

const LOGO_I18N: Record<InterfaceLang, {
  logoActive: string;
  ready: string;
  replace: string;
  analyzingColors: string;
  invalidFormatAlert: string;
  fileTooLargeAlert: string;
}> = {
  fr: {
    logoActive: 'Logo actif',
    ready: 'Prêt',
    replace: 'Remplacer',
    analyzingColors: 'Analyse des couleurs...',
    invalidFormatAlert: 'Veuillez téléverser une image valide au format PNG, JPG ou SVG.',
    fileTooLargeAlert: 'Le logo est trop lourd (max 2 Mo). Veuillez utiliser une image plus légère.',
  },
  en: {
    logoActive: 'Logo Active',
    ready: 'Ready',
    replace: 'Replace',
    analyzingColors: 'Analyzing colors...',
    invalidFormatAlert: 'Please upload a valid PNG, JPG, or SVG image.',
    fileTooLargeAlert: 'Logo file is too large (max 2 MB). Please use a smaller image.',
  },
  de: {
    logoActive: 'Logo aktiv',
    ready: 'Bereit',
    replace: 'Ersetzen',
    analyzingColors: 'Farben werden analysiert...',
    invalidFormatAlert: 'Bitte laden Sie ein gültiges PNG-, JPG- oder SVG-Bild hoch.',
    fileTooLargeAlert: 'Die Logo-Datei ist zu groß (max. 2 MB). Bitte verwenden Sie ein kleineres Bild.',
  },
  es: {
    logoActive: 'Logo activo',
    ready: 'Listo',
    replace: 'Reemplazar',
    analyzingColors: 'Analizando colores...',
    invalidFormatAlert: 'Por favor, suba una imagen válida en formato PNG, JPG o SVG.',
    fileTooLargeAlert: 'El logo es demasiado pesado (máx. 2 MB). Utilice una imagen más ligera.',
  },
  it: {
    logoActive: 'Logo attivo',
    ready: 'Pronto',
    replace: 'Sostituisci',
    analyzingColors: 'Analisi dei colori...',
    invalidFormatAlert: 'Carica un’immagine valida in formato PNG, JPG o SVG.',
    fileTooLargeAlert: 'Il file del logo è troppo grande (max 2 MB). Usa un’immagine più leggera.',
  },
  pt: {
    logoActive: 'Logo ativo',
    ready: 'Pronto',
    replace: 'Substituir',
    analyzingColors: 'A analisar cores...',
    invalidFormatAlert: 'Por favor, carregue uma imagem válida em formato PNG, JPG ou SVG.',
    fileTooLargeAlert: 'O ficheiro do logo é demasiado grande (máx. 2 MB). Use uma imagem mais leve.',
  },
};

export const LogoUploader: React.FC<LogoUploaderProps> = ({
  logoUrl,
  onLogoUpload,
  onLogoReset,
  isExtractingColor,
  interfaceLang,
}) => {
  const t = UI_TRANSLATIONS[interfaceLang] || UI_TRANSLATIONS.en;
  const l = LOGO_I18N[interfaceLang] || LOGO_I18N.en;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const processFile = (file: File) => {
    if (!file) return;
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      alert(l.invalidFormatAlert);
      return;
    }
    // Logos are kept as base64 in localStorage (~5 MB quota). Oversized files would
    // silently break saving of the whole brand kit, so cap them.
    if (file.size > MAX_LOGO_BYTES) {
      alert(l.fileTooLargeAlert);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        onLogoUpload(dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
    // Reset so re-selecting the same file (e.g. after "reset logo") fires onChange again
    e.target.value = '';
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center space-x-1.5">
          <span>{t.stepLogo}</span>
        </label>
        {isExtractingColor && (
          <span className="inline-flex items-center space-x-1 text-[11px] text-indigo-600 dark:text-indigo-400 font-medium animate-pulse">
            <Sparkles className="w-3 h-3" />
            <span>{l.analyzingColors}</span>
          </span>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/svg+xml"
        className="hidden"
        onChange={handleFileChange}
      />

      {logoUrl ? (
        <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/90 dark:border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-lg p-1.5 flex items-center justify-center border border-slate-200/80 dark:border-slate-700 shadow-2xs">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logoUrl}
                alt="Brand Logo"
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  {l.logoActive}
                </span>
                <span className="inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-medium bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                  <Check className="w-2.5 h-2.5 mr-0.5" /> {l.ready}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 dark:text-slate-400">
                {t.colorExtracted}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1.5">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-[11px] font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 transition-colors"
            >
              {l.replace}
            </button>
            <button
              type="button"
              onClick={onLogoReset}
              className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
              title={t.removeLogo}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`cursor-pointer border-2 border-dashed rounded-xl p-4 text-center transition-all ${
            isDragging
              ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30'
              : 'border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 bg-slate-50/50 dark:bg-slate-800/40'
          }`}
        >
          <div className="flex flex-col items-center justify-center space-y-1.5">
            <div className="w-9 h-9 rounded-full bg-indigo-50 dark:bg-slate-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Upload className="w-4 h-4" />
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
              {t.dragDropLogo}{' '}
              <span className="text-indigo-600 dark:text-indigo-400 font-bold underline underline-offset-2">
                {t.clickToUpload}
              </span>
            </p>
            <p className="text-[10.5px] text-slate-400 dark:text-slate-500">
              {t.supportedFormats}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
