'use client';

import React, { useState } from 'react';
import { Sliders, X } from 'lucide-react';
import { useBrandKit } from '@/lib/use-brand-kit';
import { UI_TRANSLATIONS } from '@/lib/i18n/interface';
import { InterfaceLang } from '@/types';
import { Header } from './Header';
import { LogoUploader } from './LogoUploader';
import { ColorPicker } from './ColorPicker';
import { TemplateSelector } from './TemplateSelector';
import { MoreOptions } from './MoreOptions';
import { LivePreview } from './LivePreview';
import { DownloadButton } from './DownloadButton';
import { ProModal } from './ProModal';
import { LandingSections } from './LandingSections';

export const Studio: React.FC = () => {
  const {
    brandKit,
    updateBrandKit,
    activeTemplate,
    setActiveTemplate,
    interfaceLang,
    setInterfaceLang,
    isLoaded,
    isExtractingColor,
    extractedColorSuggestion,
    setUploadedLogo,
    resetLogo,
  } = useBrandKit();

  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false);
  const [isProModalOpen, setIsProModalOpen] = useState(false);

  const t = UI_TRANSLATIONS[interfaceLang] || UI_TRANSLATIONS.en;

  const handleLanguageChange = (lang: InterfaceLang) => {
    setInterfaceLang(lang);
    updateBrandKit({ documentLang: lang });
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-10 h-10 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-semibold text-slate-500">Loading LogoLoom Studio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      {/* Top Application Header */}
      <Header
        interfaceLang={interfaceLang}
        onLanguageChange={handleLanguageChange}
        onOpenProModal={() => setIsProModalOpen(true)}
      />

      {/* Hero Section: Live Studio Above the Fold */}
      <div className="max-w-7xl w-full mx-auto p-3 sm:p-5 lg:p-6 flex flex-col lg:flex-row gap-5 overflow-hidden">
        {/* Left Panel: Core Controls (Desktop: Fixed 390px) */}
        <div className="hidden lg:flex flex-col w-[390px] shrink-0 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs p-5 space-y-4 h-[calc(100vh-6rem)] overflow-y-auto">
          {/* 1. Drag-and-drop logo upload */}
          <LogoUploader
            logoUrl={brandKit.logoUrl}
            onLogoUpload={setUploadedLogo}
            onLogoReset={resetLogo}
            isExtractingColor={isExtractingColor}
            interfaceLang={interfaceLang}
          />

          <div className="border-t border-slate-100 dark:border-slate-800/80" />

          {/* 2. Color choice */}
          <ColorPicker
            currentColor={brandKit.brandColor}
            extractedColor={extractedColorSuggestion}
            onColorSelect={(brandColor) => updateBrandKit({ brandColor })}
            interfaceLang={interfaceLang}
          />

          <div className="border-t border-slate-100 dark:border-slate-800/80" />

          {/* 3. Document type selector */}
          <TemplateSelector
            activeTemplate={activeTemplate}
            onSelect={setActiveTemplate}
            brandColor={brandKit.brandColor}
            interfaceLang={interfaceLang}
          />

          <div className="border-t border-slate-100 dark:border-slate-800/80" />

          {/* 4. Collapsed "More options" */}
          <MoreOptions
            brandKit={brandKit}
            onUpdate={updateBrandKit}
            interfaceLang={interfaceLang}
            onOpenProModal={() => setIsProModalOpen(true)}
          />

          <div className="flex-1" />

          {/* 5. Prominent Download PDF button */}
          <div className="pt-2 sticky bottom-0 bg-white dark:bg-slate-900 pb-1">
            <DownloadButton
              brandKit={brandKit}
              activeTemplate={activeTemplate}
              interfaceLang={interfaceLang}
            />
          </div>
        </div>

        {/* Right Panel: Large Live Preview */}
        <div className="flex-1 flex flex-col h-[calc(100vh-6rem)] min-h-[500px]">
          <LivePreview
            brandKit={brandKit}
            activeTemplate={activeTemplate}
            interfaceLang={interfaceLang}
          />
        </div>

        {/* Mobile Sticky Action Bar */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 p-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 z-30 flex items-center space-x-3">
          <button
            type="button"
            onClick={() => setIsMobileSheetOpen(true)}
            className="flex-1 py-3 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-center space-x-1.5"
          >
            <Sliders className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>{t.mobileEditButton}</span>
          </button>

          <div className="flex-1">
            <DownloadButton
              brandKit={brandKit}
              activeTemplate={activeTemplate}
              interfaceLang={interfaceLang}
            />
          </div>
        </div>

        {/* Mobile Slide-Up Controls Sheet */}
        {isMobileSheetOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end bg-slate-900/60 backdrop-blur-xs">
            <div className="bg-white dark:bg-slate-900 rounded-t-2xl max-h-[85vh] overflow-y-auto p-5 space-y-4 border-t border-slate-200 dark:border-slate-800 animate-in slide-in-from-bottom duration-200 shadow-2xl">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center space-x-2">
                  <Sliders className="w-4 h-4 text-indigo-600" />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Customize Document
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileSheetOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile controls list */}
              <LogoUploader
                logoUrl={brandKit.logoUrl}
                onLogoUpload={setUploadedLogo}
                onLogoReset={resetLogo}
                isExtractingColor={isExtractingColor}
                interfaceLang={interfaceLang}
              />

              <ColorPicker
                currentColor={brandKit.brandColor}
                extractedColor={extractedColorSuggestion}
                onColorSelect={(brandColor) => updateBrandKit({ brandColor })}
                interfaceLang={interfaceLang}
              />

              <TemplateSelector
                activeTemplate={activeTemplate}
                onSelect={setActiveTemplate}
                brandColor={brandKit.brandColor}
                interfaceLang={interfaceLang}
              />

              <MoreOptions
                brandKit={brandKit}
                onUpdate={updateBrandKit}
                interfaceLang={interfaceLang}
                onOpenProModal={() => setIsProModalOpen(true)}
              />

              <button
                type="button"
                onClick={() => setIsMobileSheetOpen(false)}
                className="w-full py-3 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs"
              >
                {t.mobileCloseButton}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Landing Page Content: How it works, templates showcase, privacy, pricing, footer */}
      <LandingSections
        interfaceLang={interfaceLang}
        onSelectTemplate={setActiveTemplate}
        onOpenProModal={() => setIsProModalOpen(true)}
      />

      {/* Pro Modal */}
      <ProModal
        isOpen={isProModalOpen}
        onClose={() => setIsProModalOpen(false)}
        onActivateProMock={() => {
          updateBrandKit({ isPro: true, removeWatermark: true });
        }}
        interfaceLang={interfaceLang}
      />
    </div>
  );
};
