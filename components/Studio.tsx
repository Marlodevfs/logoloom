'use client';

import React, { useState } from 'react';
import { Sliders, Eye } from 'lucide-react';
import { useBrandKit } from '@/lib/use-brand-kit';
import { UI_TRANSLATIONS } from '@/lib/i18n/interface';
import { LOCALES_METADATA } from '@/lib/i18n/meta';
import { InterfaceLang } from '@/types';
import { Header } from './Header';
import { LogoUploader } from './LogoUploader';
import { ColorPicker } from './ColorPicker';
import { TemplateSelector } from './TemplateSelector';
import { YourDetailsStep } from './YourDetailsStep';
import { ContentEditorStep } from './ContentEditorStep';
import { LivePreview } from './LivePreview';
import { DownloadButton } from './DownloadButton';
import { ProModal } from './ProModal';
import { LandingSections } from './LandingSections';

interface StudioProps {
  initialLang?: InterfaceLang;
}

const STUDIO_I18N: Record<InterfaceLang, {
  tabEditor: string;
  tabPreview: string;
  viewPreview: string;
  editOptions: string;
}> = {
  fr: {
    tabEditor: '1. Personnaliser',
    tabPreview: '2. Aperçu du document',
    viewPreview: 'Voir l’aperçu',
    editOptions: 'Modifier les options',
  },
  en: {
    tabEditor: '1. Customize',
    tabPreview: '2. Live Document',
    viewPreview: 'View Preview',
    editOptions: 'Edit Options',
  },
  de: {
    tabEditor: '1. Anpassen',
    tabPreview: '2. Dokumentenvorschau',
    viewPreview: 'Vorschau anzeigen',
    editOptions: 'Optionen bearbeiten',
  },
  es: {
    tabEditor: '1. Personalizar',
    tabPreview: '2. Vista previa',
    viewPreview: 'Ver vista previa',
    editOptions: 'Editar opciones',
  },
  it: {
    tabEditor: '1. Personalizza',
    tabPreview: '2. Anteprima documento',
    viewPreview: 'Vedi anteprima',
    editOptions: 'Modifica opzioni',
  },
  pt: {
    tabEditor: '1. Personalizar',
    tabPreview: '2. Pré-visualização',
    viewPreview: 'Ver prévia',
    editOptions: 'Editar opções',
  },
};

export const Studio: React.FC<StudioProps> = ({ initialLang }) => {
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
    resetSection,
    restoreProSubscription,
  } = useBrandKit(initialLang);

  const [mobileTab, setMobileTab] = useState<'editor' | 'preview'>('editor');
  const [isProModalOpen, setIsProModalOpen] = useState(false);

  const t = UI_TRANSLATIONS[interfaceLang] || UI_TRANSLATIONS.en;
  const sI18n = STUDIO_I18N[interfaceLang] || STUDIO_I18N.en;

  const handleLanguageChange = (lang: InterfaceLang) => {
    setInterfaceLang(lang);
  };

  const renderCustomizer = () => (
    <>
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

      {/* 3. Document template selector */}
      <TemplateSelector
        activeTemplate={activeTemplate}
        onSelect={setActiveTemplate}
        brandColor={brandKit.brandColor}
        designStyle={brandKit.designStyle}
        onStyleChange={(designStyle) => updateBrandKit({ designStyle })}
        interfaceLang={interfaceLang}
      />

      <div className="border-t border-slate-100 dark:border-slate-800/80" />

      {/* 4. Step 4: Your Details (Always visible, compact) */}
      <YourDetailsStep
        brandKit={brandKit}
        onUpdate={updateBrandKit}
        interfaceLang={interfaceLang}
        activeTemplate={activeTemplate}
        onReset={() => resetSection('details')}
      />

      <div className="border-t border-slate-100 dark:border-slate-800/80" />

      {/* 5. Step 5: Customize Content (Accordion, collapsed by default) */}
      <ContentEditorStep
        brandKit={brandKit}
        onUpdate={updateBrandKit}
        activeTemplate={activeTemplate}
        interfaceLang={interfaceLang}
        onResetSection={(templateId) => resetSection(templateId)}
      />
    </>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      {/* Top Application Header */}
      <Header
        interfaceLang={interfaceLang}
        onLanguageChange={handleLanguageChange}
        onOpenProModal={() => setIsProModalOpen(true)}
      />

      <main className="flex-1 w-full flex flex-col">
        {/* Semantic SEO Page Heading & Intro Paragraph */}
        <header className="sr-only">
          <h1>{LOCALES_METADATA[interfaceLang]?.title || 'LogoLoom — Brand Client Documents in 2 Minutes'}</h1>
          <p>
            {LOCALES_METADATA[interfaceLang]?.description ||
              'Turn generic client documents into branded, print-ready PDFs in 2 minutes. Add your logo, choose colors, and download vector PDFs with zero signup.'}
          </p>
        </header>

        {/* Hero Section: Live Studio Above the Fold */}
        <div className="max-w-7xl w-full mx-auto p-3 sm:p-5 lg:p-6 flex flex-col lg:flex-row gap-5">
        {/* Mobile View Mode Switcher: [ ✏️ 1. Personnaliser | 👁️ 2. Aperçu direct ] */}
        <div className="lg:hidden flex items-center p-1 bg-slate-200/90 dark:bg-slate-800/90 rounded-2xl mb-1 shadow-inner border border-slate-200 dark:border-slate-700/80 shrink-0">
          <button
            type="button"
            onClick={() => setMobileTab('editor')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
              mobileTab === 'editor'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sliders className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>{sI18n.tabEditor}</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileTab('preview')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
              mobileTab === 'preview'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Eye className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>{sI18n.tabPreview}</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ml-0.5" />
          </button>
        </div>

        {/* Desktop Left Panel: Calm 5-Step Progressive Disclosure (Fixed 410px) */}
        <div className="hidden lg:flex flex-col w-[410px] shrink-0 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs p-5 space-y-4 h-[calc(100vh-6rem)] overflow-y-auto">
          {renderCustomizer()}
          <div className="flex-1" />
          <div className="pt-2 sticky bottom-0 bg-white dark:bg-slate-900 pb-1">
            <DownloadButton
              brandKit={brandKit}
              activeTemplate={activeTemplate}
              interfaceLang={interfaceLang}
            />
          </div>
        </div>

        {/* Mobile Editor View (When mobileTab === 'editor') */}
        <div
          className={`lg:hidden flex flex-col w-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs p-4 sm:p-5 space-y-4 pb-28 ${
            mobileTab === 'editor' ? 'flex' : 'hidden'
          }`}
        >
          {renderCustomizer()}
        </div>

        {/* Desktop & Mobile Live Preview */}
        <div
          className={`flex-1 min-w-0 flex-col ${
            mobileTab === 'preview' ? 'flex h-[calc(100vh-10.5rem)] min-h-[460px] pb-24' : 'hidden'
          } lg:flex lg:h-[calc(100vh-6rem)] lg:min-h-[500px] lg:pb-0`}
        >
          <LivePreview
            brandKit={brandKit}
            activeTemplate={activeTemplate}
            interfaceLang={interfaceLang}
            onUpdate={updateBrandKit}
          />
        </div>

        {/* Mobile Floating Sticky Action Bar */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 p-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 z-30 flex items-center space-x-2.5 shadow-xl">
          {mobileTab === 'editor' ? (
            <button
              type="button"
              onClick={() => setMobileTab('preview')}
              className="flex-1 py-3 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-center space-x-1.5 shadow-2xs hover:bg-slate-100"
            >
              <Eye className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>{sI18n.viewPreview}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-0.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setMobileTab('editor')}
              className="flex-1 py-3 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-center space-x-1.5 shadow-2xs hover:bg-slate-100"
            >
              <Sliders className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>{sI18n.editOptions}</span>
            </button>
          )}

          <div className="flex-1">
            <DownloadButton
              brandKit={brandKit}
              activeTemplate={activeTemplate}
              interfaceLang={interfaceLang}
            />
          </div>
        </div>
      </div>

      {/* Landing Page Content: How it works, templates showcase, privacy, pricing, footer */}
      <LandingSections
        interfaceLang={interfaceLang}
        onSelectTemplate={setActiveTemplate}
        onOpenProModal={() => setIsProModalOpen(true)}
      />
      </main>

      {/* Pro Modal */}
      <ProModal
        isOpen={isProModalOpen}
        onClose={() => setIsProModalOpen(false)}
        onRestoreSubscription={restoreProSubscription}
        interfaceLang={interfaceLang}
      />
    </div>
  );
};
