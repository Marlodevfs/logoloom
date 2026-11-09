'use client';

import React from 'react';
import { Sparkles, Check, ShieldCheck } from 'lucide-react';
import { CURATED_PALETTES, getContrastRatio } from '@/lib/color-engine';
import { UI_TRANSLATIONS } from '@/lib/i18n/interface';
import { InterfaceLang } from '@/types';

interface ColorPickerProps {
  currentColor: string;
  extractedColor: string | null;
  onColorSelect: (hex: string) => void;
  interfaceLang: InterfaceLang;
}

const COLOR_I18N: Record<InterfaceLang, { apply: string; contrast: string }> = {
  fr: { apply: 'Appliquer', contrast: 'contraste' },
  en: { apply: 'Apply', contrast: 'contrast' },
  de: { apply: 'Übernehmen', contrast: 'Kontrast' },
  es: { apply: 'Aplicar', contrast: 'contraste' },
  it: { apply: 'Applica', contrast: 'contrasto' },
  pt: { apply: 'Aplicar', contrast: 'contraste' },
};

export const ColorPicker: React.FC<ColorPickerProps> = ({
  currentColor,
  extractedColor,
  onColorSelect,
  interfaceLang,
}) => {
  const t = UI_TRANSLATIONS[interfaceLang] || UI_TRANSLATIONS.en;
  const cI18n = COLOR_I18N[interfaceLang] || COLOR_I18N.en;
  const contrastRatio = getContrastRatio(currentColor, '#FFFFFF');
  const isAccessible = contrastRatio >= 4.5;

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-slate-800 dark:text-slate-100">
          {t.stepColor}
        </label>
        <span className="flex items-center space-x-1 text-[10px] text-slate-500 font-medium">
          <ShieldCheck className={`w-3.5 h-3.5 ${isAccessible ? 'text-emerald-500' : 'text-amber-500'}`} />
          <span>{contrastRatio.toFixed(1)}:1 {cI18n.contrast}</span>
        </span>
      </div>

      {/* Extracted Color from Logo (if present) */}
      {extractedColor && (
        <div className="flex items-center justify-between p-2 rounded-lg bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60">
          <div className="flex items-center space-x-2">
            <span
              className="w-5 h-5 rounded-md shadow-2xs border border-white/50 shrink-0 flex items-center justify-center text-white text-[10px]"
              style={{ backgroundColor: extractedColor }}
            >
              {currentColor.toLowerCase() === extractedColor.toLowerCase() && '✓'}
            </span>
            <div className="flex items-center space-x-1.5">
              <Sparkles className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
              <span className="text-[11px] font-semibold text-indigo-950 dark:text-indigo-200">
                {t.extractedFromLogo}
              </span>
              <span className="text-[10px] font-mono text-indigo-700 dark:text-indigo-400">
                {extractedColor.toUpperCase()}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onColorSelect(extractedColor)}
            className="text-[10.5px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline px-2 py-1"
          >
            {cI18n.apply}
          </button>
        </div>
      )}

      {/* Curated Color Swatches: 2 cols on mobile, 4 cols on desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {CURATED_PALETTES.map((palette) => {
          const isSelected = currentColor.toLowerCase() === palette.hex.toLowerCase();
          return (
            <button
              key={palette.hex}
              type="button"
              onClick={() => onColorSelect(palette.hex)}
              title={palette.fullName}
              className={`group flex items-center space-x-1.5 p-2 sm:p-1.5 rounded-lg border text-left transition-all min-h-[38px] sm:min-h-0 ${
                isSelected
                  ? 'border-slate-800 dark:border-slate-100 ring-2 ring-slate-800/20 dark:ring-slate-100/20 bg-slate-50 dark:bg-slate-800'
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <span
                className="w-4 h-4 rounded-md shadow-2xs shrink-0 flex items-center justify-center text-white text-[9px]"
                style={{ backgroundColor: palette.hex }}
              >
                {isSelected && <Check className="w-2.5 h-2.5" />}
              </span>
              <span className="text-[11px] sm:text-[10px] font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap">
                {palette.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Custom HEX input */}
      <div className="flex items-center space-x-2 pt-1">
        <label className="text-[11px] font-medium text-slate-500 shrink-0">
          {t.customHex}:
        </label>
        <div className="flex items-center space-x-1.5 flex-1 bg-slate-50 dark:bg-slate-800/80 rounded-lg px-2.5 py-1.5 sm:py-1 border border-slate-200 dark:border-slate-700">
          <input
            type="color"
            value={currentColor.startsWith('#') ? currentColor : '#4F46E5'}
            onChange={(e) => onColorSelect(e.target.value)}
            className="w-6 h-6 sm:w-5 sm:h-5 rounded cursor-pointer border-0 p-0 bg-transparent shrink-0"
          />
          <input
            type="text"
            value={currentColor}
            onChange={(e) => onColorSelect(e.target.value)}
            placeholder="#4F46E5"
            maxLength={7}
            className="w-full text-base sm:text-xs font-mono font-bold bg-transparent text-slate-800 dark:text-slate-100 focus:outline-none uppercase"
          />
        </div>
      </div>
    </div>
  );
};
