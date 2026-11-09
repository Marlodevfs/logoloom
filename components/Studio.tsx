'use client';

import React, { useState } from 'react';
import { Sliders, Eye } from 'lucide-react';
import { useBrandKit } from '@/lib/use-brand-kit';
import { UI_TRANSLATIONS } from '@/lib/i18n/interface';
import { trackEvent } from '@/lib/analytics';
import { LOCALES_METADATA } from '@/lib/i18n/meta';
import { InterfaceLang, TemplateId } from '@/types';
import { Header } from './Header';
import { LogoUploader } from './LogoUploader';
import { ColorPicker } from './ColorPicker';
import { TemplateSelector } from './TemplateSelector';
import { YourDetailsStep } from './YourDetailsStep';
import { ContentEditorStep } from './ContentEditorStep';
import { LivePreview } from './LivePreview';
import { DownloadButton } from './DownloadButton';
import { ProModal } from './ProModal';

interface StudioProps {
  initialLang?: InterfaceLang;
  initialTemplate?: TemplateId;
  /** Page intro (H1, breadcrumb…) rendered right below the app header */
  intro?: React.ReactNode;
}

const STUDIO_I18N: Record<InterfaceLang, {
  tabEditor: string;
  tabPreview: string;
  viewPreview: string;
  editOptions: string;
  previewShort: string;
  editShort: string;
}> = {
  fr: {
    tabEditor: '1. Personnaliser',
    tabPreview: '2. Aperçu',
    viewPreview: 'Voir l’aperçu',
    editOptions: 'Modifier les options',
    previewShort: 'Aperçu',
    editShort: 'Éditer',
  },
  en: {
    tabEditor: '1. Customize',
    tabPreview: '2. Preview',
    viewPreview: 'View Preview',
    editOptions: 'Edit Options',
    previewShort: 'Preview',
    editShort: 'Edit',
  },
  de: {
    tabEditor: '1. Anpassen',
    tabPreview: '2. Vorschau',
    viewPreview: 'Vorschau anzeigen',
    editOptions: 'Optionen bearbeiten',
    previewShort: 'Vorschau',
    editShort: 'Bearbeiten',
  },
  es: {
    tabEditor: '1. Personalizar',
    tabPreview: '2. Vista previa',
    viewPreview: 'Ver vista previa',
    editOptions: 'Editar opciones',
    previewShort: 'Vista',
    editShort: 'Editar',
  },
  it: {
    tabEditor: '1. Personalizza',
    tabPreview: '2. Anteprima',
    viewPreview: 'Vedi anteprima',
    editOptions: 'Modifica opzioni',
    previewShort: 'Anteprima',
    editShort: 'Modifica',
  },
  pt: {
    tabEditor: '1. Personalizar',
    tabPreview: '2. Prévia',
    viewPreview: 'Ver prévia',
    editOptions: 'Editar opções',
    previewShort: 'Prévia',
    editShort: 'Editar',
  },
};

export const Studio: React.FC<StudioProps> = ({
  initialLang,
  initialTemplate,
  intro,
}) => {
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
  } = useBrandKit(initialLang, initialTemplate);

  const handleOpenProModal = () => {
    trackEvent('pro_modal_open');
    setIsProModalOpen(true);
  };

  const handleTemplateSelect = (id: TemplateId) => {
    trackEvent('template_select', { template: id });
    setActiveTemplate(id);
  };

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
        onSelect={handleTemplateSelect}
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
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      {/* Top Application Header (always first on the page) */}
      <Header
        interfaceLang={interfaceLang}
        onLanguageChange={handleLanguageChange}
        onOpenProModal={handleOpenProModal}
      />

      {intro}

      <main className="flex-1 w-full flex flex-col">
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

        {/* Editor panel: rendered ONCE (fixed 410px column on desktop, full-width tab on mobile) */}
        <div
          className={`${mobileTab === 'editor' ? 'flex' : 'hidden'} lg:flex flex-col w-full lg:w-[410px] shrink-0 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs lg:h-[calc(100vh-6rem)] lg:overflow-hidden`}
        >
          <div className="lg:flex-1 lg:overflow-y-auto p-4 sm:p-5 space-y-4">
            {renderCustomizer()}
          </div>
          <div className="hidden lg:block p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800/80 shrink-0">
            <DownloadButton
              brandKit={brandKit}
              activeTemplate={activeTemplate}
              interfaceLang={interfaceLang}
            />
          </div>
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

        {/* Mobile Sticky Action Bar: one toggle + one main action */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 z-30 flex items-center gap-2.5 shadow-xl">
          <button
            type="button"
            onClick={() => setMobileTab(mobileTab === 'editor' ? 'preview' : 'editor')}
            className="shrink-0 h-12 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-center gap-1.5 shadow-2xs hover:bg-slate-100"
            aria-label={mobileTab === 'editor' ? sI18n.viewPreview : sI18n.editOptions}
          >
            {mobileTab === 'editor' ? (
              <Eye className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            ) : (
              <Sliders className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            )}
            <span>{mobileTab === 'editor' ? sI18n.previewShort : sI18n.editShort}</span>
          </button>

          <div className="flex-1 min-w-0">
            <DownloadButton
              brandKit={brandKit}
              activeTemplate={activeTemplate}
              interfaceLang={interfaceLang}
              compact
            />
          </div>
        </div>
      </div>

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
