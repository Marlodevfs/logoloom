'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { BrandKit, TemplateId, InterfaceLang } from '@/types';
import { UI_TRANSLATIONS } from '@/lib/i18n/interface';
import { HabitTrackerTemplate } from './templates/HabitTrackerTemplate';
import { MinimalHabitTrackerTemplate } from './templates/MinimalHabitTrackerTemplate';
import { Roadmap90Template } from './templates/Roadmap90Template';
import { WelcomePacketTemplate } from './templates/WelcomePacketTemplate';

interface LivePreviewProps {
  brandKit: BrandKit;
  activeTemplate: TemplateId;
  interfaceLang: InterfaceLang;
  onUpdate?: (updates: Partial<BrandKit>) => void;
}

export const LivePreview: React.FC<LivePreviewProps> = ({
  brandKit,
  activeTemplate,
  interfaceLang,
  onUpdate,
}) => {
  const t = UI_TRANSLATIONS[interfaceLang] || UI_TRANSLATIONS.en;
  const isMinimal = (brandKit.designStyle || 'minimal') === 'minimal';
  const isLandscape = activeTemplate === 'habit-tracker' && !isMinimal;
  const isA4 = brandKit.paperSize === 'a4';

  const baseWidth = isLandscape ? (isA4 ? 1123 : 1056) : (isA4 ? 794 : 816);
  const baseHeight = isLandscape ? (isA4 ? 794 : 816) : (isA4 ? 1123 : 1056);

  const containerRef = useRef<HTMLDivElement>(null);

  const calculateFitScale = useCallback(() => {
    if (typeof window === 'undefined') return 0.50;
    if (containerRef.current) {
      const availableWidth = containerRef.current.clientWidth - 40; // 20px padding on each side
      const availableHeight = containerRef.current.clientHeight - 40;
      if (availableWidth > 100 && availableHeight > 100) {
        const scaleX = availableWidth / baseWidth;
        const scaleY = availableHeight / baseHeight;
        const fit = Math.min(scaleX, scaleY, 0.95);
        return Math.max(0.20, Number(fit.toFixed(2)));
      }
    }
    // Fallback based on window innerWidth
    const width = window.innerWidth;
    if (width < 640) return isLandscape ? 0.28 : 0.38;
    if (width < 1024) return isLandscape ? 0.38 : 0.48;
    if (width < 1360) return isLandscape ? 0.46 : 0.58;
    return isLandscape ? 0.52 : 0.65;
  }, [baseWidth, baseHeight, isLandscape]);

  const [zoomScale, setZoomScale] = useState<number>(0.50);

  // Auto-fit on mount, when activeTemplate changes, or on paperSize toggle
  useEffect(() => {
    const handleResize = () => {
      setZoomScale(calculateFitScale());
    };

    // Calculate immediately and also after mount layout pass
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
      case 'roadmap-90':
        return <Roadmap90Template brandKit={brandKit} />;
      case 'welcome-packet':
        return <WelcomePacketTemplate brandKit={brandKit} />;
      default:
        return isMinimal ? (
          <MinimalHabitTrackerTemplate brandKit={brandKit} onUpdate={onUpdate} />
        ) : (
          <HabitTrackerTemplate brandKit={brandKit} onUpdate={onUpdate} />
        );
    }
  };

  const resetToFit = () => {
    setZoomScale(calculateFitScale());
  };

  const scaledWidth = Math.round(baseWidth * zoomScale);
  const scaledHeight = Math.round(baseHeight * zoomScale);

  return (
    <div className="flex-1 min-w-0 flex flex-col h-full bg-slate-100/90 dark:bg-slate-950 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 overflow-hidden relative shadow-inner">
      {/* Top Floating Control Bar */}
      <div className="px-3 sm:px-4 py-2.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/70 dark:border-slate-800 flex items-center justify-between z-10 min-w-0">
        <div className="flex items-center space-x-2 min-w-0 truncate">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <span className="text-xs font-bold text-slate-700 dark:text-slate-200 shrink-0">
            {t.livePreview}
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-medium shrink-0">
            {isLandscape ? (isA4 ? 'A4 Paysage (297×210mm)' : 'US Letter Landscape') : (isA4 ? 'A4 (210×297mm)' : 'US Letter (8.5×11")')}
          </span>
          <span className="hidden xl:inline-block text-[10px] text-slate-400 italic truncate">
            • {interfaceLang === 'fr' ? 'Édition directe en cliquant sur le texte' : 'Click text to edit directly'}
          </span>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800/80 p-0.5 rounded-lg border border-slate-200/70 dark:border-slate-700 shrink-0 ml-2">
          <button
            type="button"
            onClick={() => setZoomScale((prev) => Math.max(0.20, Number((prev - 0.05).toFixed(2))))}
            className="p-1 text-slate-500 hover:text-slate-800 dark:hover:text-white rounded hover:bg-white dark:hover:bg-slate-700 transition-colors"
            title="Zoom out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[10.5px] font-mono font-semibold px-1 text-slate-600 dark:text-slate-300 w-11 text-center">
            {Math.round(zoomScale * 100)}%
          </span>
          <button
            type="button"
            onClick={() => setZoomScale((prev) => Math.min(1.0, Number((prev + 0.05).toFixed(2))))}
            className="p-1 text-slate-500 hover:text-slate-800 dark:hover:text-white rounded hover:bg-white dark:hover:bg-slate-700 transition-colors"
            title="Zoom in"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={resetToFit}
            className="p-1 text-slate-500 hover:text-slate-800 dark:hover:text-white rounded hover:bg-white dark:hover:bg-slate-700 transition-colors border-l border-slate-200 dark:border-slate-700 pl-1.5 ml-0.5"
            title={t.zoomFit}
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Viewport Canvas: Auto-centers, never clips */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto p-3 sm:p-5 flex items-center justify-center min-w-0"
      >
        {/* Geometry Box: gives exact scaled width & height to the browser layout engine */}
        <div
          className="relative transition-all duration-150 ease-out shadow-2xl rounded-xs shrink-0"
          style={{
            width: `${scaledWidth}px`,
            height: `${scaledHeight}px`,
            maxWidth: '100%',
          }}
        >
          {/* Inner Document: Rendered at 1:1 physical resolution, scaled via CSS transform */}
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
