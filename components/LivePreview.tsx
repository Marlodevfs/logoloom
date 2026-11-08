'use client';

import React, { useState, useEffect } from 'react';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { BrandKit, TemplateId, InterfaceLang } from '@/types';
import { UI_TRANSLATIONS } from '@/lib/i18n/interface';
import { HabitTrackerTemplate } from './templates/HabitTrackerTemplate';
import { Roadmap90Template } from './templates/Roadmap90Template';
import { WelcomePacketTemplate } from './templates/WelcomePacketTemplate';

interface LivePreviewProps {
  brandKit: BrandKit;
  activeTemplate: TemplateId;
  interfaceLang: InterfaceLang;
}

export const LivePreview: React.FC<LivePreviewProps> = ({
  brandKit,
  activeTemplate,
  interfaceLang,
}) => {
  const t = UI_TRANSLATIONS[interfaceLang] || UI_TRANSLATIONS.en;
  const [zoomScale, setZoomScale] = useState<number>(0.68);

  // Auto-adjust scale on mount based on screen width
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width < 640) {
        setZoomScale(0.42); // Fits 390px iPhone perfectly
      } else if (width < 1024) {
        setZoomScale(0.55); // Fits iPad/tablets
      } else {
        setZoomScale(0.68); // Fits desktop split panel
      }
    }
  }, []);

  const renderActiveTemplate = () => {
    switch (activeTemplate) {
      case 'habit-tracker':
        return <HabitTrackerTemplate brandKit={brandKit} />;
      case 'roadmap-90':
        return <Roadmap90Template brandKit={brandKit} />;
      case 'welcome-packet':
        return <WelcomePacketTemplate brandKit={brandKit} />;
      default:
        return <HabitTrackerTemplate brandKit={brandKit} />;
    }
  };

  const isA4 = brandKit.paperSize === 'a4';

  const resetToFit = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width < 640) setZoomScale(0.42);
      else if (width < 1024) setZoomScale(0.55);
      else setZoomScale(0.68);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-100/90 dark:bg-slate-950 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 overflow-hidden relative shadow-inner">
      {/* Top Floating Control Bar */}
      <div className="px-4 py-2.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/70 dark:border-slate-800 flex items-center justify-between z-10">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
            {t.livePreview}
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-medium">
            {isA4 ? 'A4 (210×297mm)' : 'US Letter (8.5×11")'}
          </span>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800/80 p-0.5 rounded-lg border border-slate-200/70 dark:border-slate-700">
          <button
            type="button"
            onClick={() => setZoomScale(Math.max(0.35, zoomScale - 0.08))}
            className="p-1 text-slate-500 hover:text-slate-800 dark:hover:text-white rounded hover:bg-white dark:hover:bg-slate-700 transition-colors"
            title="Zoom out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[10.5px] font-mono font-semibold px-1.5 text-slate-600 dark:text-slate-300 w-11 text-center">
            {Math.round(zoomScale * 100)}%
          </span>
          <button
            type="button"
            onClick={() => setZoomScale(Math.min(1.0, zoomScale + 0.08))}
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

      {/* Viewport Canvas with Smooth Scroll & Scaling */}
      <div className="flex-1 overflow-auto p-2 sm:p-4 md:p-8 flex items-start justify-center pb-24 lg:pb-8">
        <div
          className="transition-transform duration-150 ease-out origin-top shrink-0"
          style={{
            transform: `scale(${zoomScale})`,
            marginBottom: '40px',
          }}
        >
          {renderActiveTemplate()}
        </div>
      </div>
    </div>
  );
};
