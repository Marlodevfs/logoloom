'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { BrandKit, TemplateId, InterfaceLang } from '@/types';
import { UI_TRANSLATIONS } from '@/lib/i18n/interface';
import { HabitTrackerTemplate } from './templates/HabitTrackerTemplate';
import { MinimalHabitTrackerTemplate } from './templates/MinimalHabitTrackerTemplate';
import { GoalPlannerTemplate } from './templates/GoalPlannerTemplate';
import { WeeklyPlannerTemplate } from './templates/WeeklyPlannerTemplate';
import { MonthlyCalendarTemplate } from './templates/MonthlyCalendarTemplate';
import { DailyPrioritiesTemplate } from './templates/DailyPrioritiesTemplate';
import { MealPlannerTemplate } from './templates/MealPlannerTemplate';
import { BudgetTrackerTemplate } from './templates/BudgetTrackerTemplate';
import { PriceListTemplate } from './templates/PriceListTemplate';
import { ClientTrackerTemplate } from './templates/ClientTrackerTemplate';
import { ChecklistTemplate } from './templates/ChecklistTemplate';

interface LivePreviewProps {
  brandKit: BrandKit;
  activeTemplate: TemplateId;
  interfaceLang: InterfaceLang;
  onUpdate?: (updates: Partial<BrandKit>) => void;
}

const PREVIEW_I18N: Record<InterfaceLang, {
  clickToEdit: string;
  width: string;
  landscapeSuffix: string;
  fitToWidthTooltip: string;
  zoomOutTooltip: string;
  zoomInTooltip: string;
}> = {
  fr: {
    clickToEdit: 'Édition directe en cliquant sur le texte',
    width: 'Largeur',
    landscapeSuffix: 'Paysage',
    fitToWidthTooltip: 'Ajuster à la largeur',
    zoomOutTooltip: 'Zoom arrière',
    zoomInTooltip: 'Zoom avant',
  },
  en: {
    clickToEdit: 'Click text to edit directly',
    width: 'Width',
    landscapeSuffix: 'Landscape',
    fitToWidthTooltip: 'Fit to width',
    zoomOutTooltip: 'Zoom out',
    zoomInTooltip: 'Zoom in',
  },
  de: {
    clickToEdit: 'Text direkt anklicken zum Bearbeiten',
    width: 'Breite',
    landscapeSuffix: 'Querformat',
    fitToWidthTooltip: 'An Breite anpassen',
    zoomOutTooltip: 'Verkleinern',
    zoomInTooltip: 'Vergrößern',
  },
  es: {
    clickToEdit: 'Clic en el texto para editar directamente',
    width: 'Ancho',
    landscapeSuffix: 'Apaisado',
    fitToWidthTooltip: 'Ajustar al ancho',
    zoomOutTooltip: 'Alejar',
    zoomInTooltip: 'Acercar',
  },
  it: {
    clickToEdit: 'Clicca sul testo per modificare direttamente',
    width: 'Larghezza',
    landscapeSuffix: 'Orizzontale',
    fitToWidthTooltip: 'Adatta alla larghezza',
    zoomOutTooltip: 'Rimpicciolisci',
    zoomInTooltip: 'Ingrandisci',
  },
  pt: {
    clickToEdit: 'Clique no texto para editar diretamente',
    width: 'Largura',
    landscapeSuffix: 'Paisagem',
    fitToWidthTooltip: 'Ajustar à largura',
    zoomOutTooltip: 'Diminuir zoom',
    zoomInTooltip: 'Aumentar zoom',
  },
};

export const LivePreview: React.FC<LivePreviewProps> = ({
  brandKit,
  activeTemplate,
  interfaceLang,
  onUpdate,
}) => {
  const t = UI_TRANSLATIONS[interfaceLang] || UI_TRANSLATIONS.en;
  const pI18n = PREVIEW_I18N[interfaceLang] || PREVIEW_I18N.en;
  const isMinimal = (brandKit.designStyle || 'minimal') === 'minimal';
  const isLandscape = activeTemplate === 'habit-tracker' && !isMinimal;
  const isA4 = brandKit.paperSize === 'a4';

  const baseWidth = isLandscape ? (isA4 ? 1123 : 1056) : (isA4 ? 794 : 816);
  const baseHeight = isLandscape ? (isA4 ? 794 : 816) : (isA4 ? 1123 : 1056);

  const containerRef = useRef<HTMLDivElement>(null);

  const calculateFitScale = useCallback(() => {
    if (typeof window === 'undefined') return 0.70;
    if (containerRef.current) {
      const availableWidth = containerRef.current.clientWidth - 32;
      if (availableWidth > 100) {
        // Fit cleanly to panel width so text is immediately sharp and readable
        const scaleX = availableWidth / baseWidth;
        const fit = Math.min(1.0, Math.max(0.30, Number(scaleX.toFixed(2))));
        return fit;
      }
    }
    const width = window.innerWidth;
    if (width < 640) return isLandscape ? 0.32 : 0.42;
    if (width < 1024) return isLandscape ? 0.45 : 0.60;
    if (width < 1360) return isLandscape ? 0.55 : 0.72;
    return isLandscape ? 0.65 : 0.85;
  }, [baseWidth, isLandscape]);

  const [zoomScale, setZoomScale] = useState<number>(0.70);

  useEffect(() => {
    const handleResize = () => {
      setZoomScale(calculateFitScale());
    };

    handleResize();
    const timer = setTimeout(handleResize, 60);

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [calculateFitScale, activeTemplate, brandKit.paperSize, brandKit.designStyle]);

  const renderActiveTemplate = () => {
    switch (activeTemplate) {
      case 'habit-tracker':
        return isMinimal ? (
          <MinimalHabitTrackerTemplate brandKit={brandKit} onUpdate={onUpdate} />
        ) : (
          <HabitTrackerTemplate brandKit={brandKit} onUpdate={onUpdate} />
        );
      case 'goal-planner-90':
        return <GoalPlannerTemplate brandKit={brandKit} onUpdate={onUpdate} />;
      case 'weekly-planner':
        return <WeeklyPlannerTemplate brandKit={brandKit} onUpdate={onUpdate} />;
      case 'monthly-calendar':
        return <MonthlyCalendarTemplate brandKit={brandKit} onUpdate={onUpdate} />;
      case 'daily-priorities':
        return <DailyPrioritiesTemplate brandKit={brandKit} onUpdate={onUpdate} />;
      case 'meal-planner':
        return <MealPlannerTemplate brandKit={brandKit} onUpdate={onUpdate} />;
      case 'budget-tracker':
        return <BudgetTrackerTemplate brandKit={brandKit} onUpdate={onUpdate} />;
      case 'price-list':
        return <PriceListTemplate brandKit={brandKit} onUpdate={onUpdate} />;
      case 'client-tracker':
        return <ClientTrackerTemplate brandKit={brandKit} onUpdate={onUpdate} />;
      case 'checklist':
        return <ChecklistTemplate brandKit={brandKit} onUpdate={onUpdate} />;
      default:
        return <MinimalHabitTrackerTemplate brandKit={brandKit} onUpdate={onUpdate} />;
    }
  };

  const resetToFit = () => {
    setZoomScale(calculateFitScale());
  };

  const fitToWidth = () => {
    if (typeof window === 'undefined') return;
    const availableWidth = containerRef.current ? containerRef.current.clientWidth - 20 : window.innerWidth - 30;
    const scale = availableWidth / baseWidth;
    setZoomScale(Math.max(0.20, Number(scale.toFixed(2))));
  };

  const scaledWidth = Math.round(baseWidth * zoomScale);
  const scaledHeight = Math.round(baseHeight * zoomScale);

  return (
    <div className="flex-1 min-w-0 flex flex-col h-full bg-slate-100/90 dark:bg-slate-950 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 overflow-hidden relative shadow-inner">
      {/* Top Floating Control Bar */}
      <div className="px-3 sm:px-4 py-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/70 dark:border-slate-800 flex items-center justify-between z-10 min-w-0">
        <div className="flex items-center space-x-2 min-w-0 truncate">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <span className="text-xs font-bold text-slate-700 dark:text-slate-200 shrink-0">
            {t.livePreview}
          </span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-medium shrink-0">
            {isLandscape ? (isA4 ? `A4 ${pI18n.landscapeSuffix}` : `Letter ${pI18n.landscapeSuffix}`) : (isA4 ? 'A4' : 'US Letter')}
          </span>
          <span className="hidden xl:inline-block text-[10px] text-slate-400 italic truncate">
            • {pI18n.clickToEdit}
          </span>
        </div>

        {/* Zoom & Viewport Controls */}
        <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800/80 p-0.5 rounded-lg border border-slate-200/70 dark:border-slate-700 shrink-0 ml-2">
          <button
            type="button"
            onClick={fitToWidth}
            className="px-2 py-1 text-[10px] font-bold text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 rounded transition-colors hidden sm:block"
            title={pI18n.fitToWidthTooltip}
            aria-label={pI18n.fitToWidthTooltip}
          >
            {pI18n.width}
          </button>
          <button
            type="button"
            onClick={() => setZoomScale((prev) => Math.max(0.20, Number((prev - 0.05).toFixed(2))))}
            className="p-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-white rounded hover:bg-white dark:hover:bg-slate-700 transition-colors"
            title={pI18n.zoomOutTooltip}
            aria-label={pI18n.zoomOutTooltip}
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[10.5px] font-mono font-semibold px-1 text-slate-600 dark:text-slate-300 w-11 text-center">
            {Math.round(zoomScale * 100)}%
          </span>
          <button
            type="button"
            onClick={() => setZoomScale((prev) => Math.min(1.0, Number((prev + 0.05).toFixed(2))))}
            className="p-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-white rounded hover:bg-white dark:hover:bg-slate-700 transition-colors"
            title={pI18n.zoomInTooltip}
            aria-label={pI18n.zoomInTooltip}
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={resetToFit}
            className="p-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-white rounded hover:bg-white dark:hover:bg-slate-700 transition-colors border-l border-slate-200 dark:border-slate-700 pl-1.5 ml-0.5"
            title={t.zoomFit}
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Viewport Canvas: Starts at the top, perfectly centered horizontally, never clipped */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto p-3 sm:p-5 flex items-start justify-center min-w-0 pt-2 sm:pt-4 pb-16"
      >
        <div
          className="relative transition-all duration-150 ease-out shadow-2xl rounded-xs shrink-0"
          style={{
            width: `${scaledWidth}px`,
            height: `${scaledHeight}px`,
            maxWidth: '100%',
          }}
        >
          <div
            style={{
              width: `${baseWidth}px`,
              height: `${baseHeight}px`,
              transform: `scale(${zoomScale})`,
              transformOrigin: 'top left',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          >
            {renderActiveTemplate()}
          </div>
        </div>
      </div>
    </div>
  );
};
