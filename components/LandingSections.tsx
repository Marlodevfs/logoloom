'use client';

import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Download, Zap, Eye, Check, Lock, ChevronRight, FileText } from 'lucide-react';
import { InterfaceLang, TemplateId } from '@/types';
import { UI_TRANSLATIONS } from '@/lib/i18n/interface';

interface LandingSectionsProps {
  interfaceLang: InterfaceLang;
  onSelectTemplate: (id: TemplateId) => void;
  onOpenProModal: () => void;
}

export const LandingSections: React.FC<LandingSectionsProps> = ({
  interfaceLang,
  onSelectTemplate,
  onOpenProModal,
}) => {
  const t = UI_TRANSLATIONS[interfaceLang] || UI_TRANSLATIONS.en;
  const [activeLegalModal, setActiveLegalModal] = useState<'privacy' | 'terms' | null>(null);

  const scrollToStudio = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-20 sm:space-y-28">
        {/* SECTION 1: How It Works in 3 Steps */}
        <section className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              Effortless Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t.howItWorksTitle}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {t.howItWorksSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-base shadow-2xs">
                1
              </div>
              <div className="space-y-1.5 flex-1">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {t.step1Title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {t.step1Desc}
                </p>
              </div>
              <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 flex items-center space-x-1">
                <span>Color detection in &lt;100ms</span>
              </span>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-base shadow-2xs">
                2
              </div>
              <div className="space-y-1.5 flex-1">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {t.step2Title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {t.step2Desc}
                </p>
              </div>
              <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 flex items-center space-x-1">
                <span>Instant WYSIWYG updates</span>
              </span>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-base shadow-2xs">
                3
              </div>
              <div className="space-y-1.5 flex-1">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {t.step3Title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {t.step3Desc}
                </p>
              </div>
              <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Zero signup or credit card</span>
              </span>
            </div>
          </div>
        </section>

        {/* SECTION 2: Handcrafted Templates Showcase */}
        <section className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              Print-Ready Excellence
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t.showcaseTitle}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {t.showcaseSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 flex flex-col justify-between space-y-4 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors bg-white dark:bg-slate-900 shadow-xs">
              <div className="space-y-2">
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                  Fitness & Executive Coaches
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {t.templateHabitTitle}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {t.templateHabitDesc}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  onSelectTemplate('habit-tracker');
                  scrollToStudio();
                }}
                className="w-full py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center justify-center space-x-1 transition-colors"
              >
                <span>Edit this template</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 flex flex-col justify-between space-y-4 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors bg-white dark:bg-slate-900 shadow-xs">
              <div className="space-y-2">
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                  Consultants & Advisors
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {t.templateRoadmapTitle}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {t.templateRoadmapDesc}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  onSelectTemplate('roadmap-90');
                  scrollToStudio();
                }}
                className="w-full py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center justify-center space-x-1 transition-colors"
              >
                <span>Edit this template</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 3 */}
            <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 flex flex-col justify-between space-y-4 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors bg-white dark:bg-slate-900 shadow-xs">
              <div className="space-y-2">
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                  Freelancers & Agencies
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {t.templateWelcomeTitle}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {t.templateWelcomeDesc}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  onSelectTemplate('welcome-packet');
                  scrollToStudio();
                }}
                className="w-full py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center justify-center space-x-1 transition-colors"
              >
                <span>Edit this template</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 3: Privacy by Design */}
        <section className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-2xl space-y-4 relative z-10">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs text-emerald-400 font-semibold">
              <Lock className="w-3.5 h-3.5" />
              <span>{t.privacyTitle}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {t.privacyDesc}
            </h2>
            <div className="space-y-3 pt-2 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </div>
                <span>{t.privacyPoint1}</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </div>
                <span>{t.privacyPoint2}</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </div>
                <span>{t.privacyPoint3}</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Simple Pricing */}
        <section className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              Transparent Pricing
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t.pricingTitle}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {t.pricingSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Tier */}
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-6 shadow-xs">
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {t.freeTierTitle}
                </h3>
                <div className="flex items-baseline space-x-1">
                  <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
                    {t.freeTierPrice}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">/ forever</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {t.freeTierDesc}
                </p>

                <ul className="space-y-2.5 pt-4 text-xs text-slate-700 dark:text-slate-300">
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>All 3 print-ready templates</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Instant 300 DPI PDF download</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Auto color extraction from your logo</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Custom booking & portal QR code</span>
                  </li>
                  <li className="flex items-center space-x-2 text-slate-400">
                    <span>• Includes discreet "Made with LogoLoom" footer</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={scrollToStudio}
                className="w-full py-3 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-xs text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Use Free Now (No Signup)
              </button>
            </div>

            {/* Pro Tier */}
            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border-2 border-indigo-500 relative flex flex-col justify-between space-y-6 shadow-xl">
              <div className="absolute -top-3.5 right-6 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-extrabold text-[10px] tracking-wider uppercase px-3 py-1 rounded-full shadow-md">
                White-Label
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {t.proTierTitle}
                </h3>
                <div className="flex items-baseline space-x-1">
                  <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
                    {t.proTierPrice}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {t.proTierDesc}
                </p>

                <ul className="space-y-2.5 pt-4 text-xs text-slate-700 dark:text-slate-300">
                  <li className="flex items-center space-x-2 font-bold text-indigo-600 dark:text-indigo-400">
                    <Check className="w-4 h-4 shrink-0" />
                    <span>100% remove LogoLoom footer & watermark</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Ultra-HD lossless vector rendering</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Any custom HEX color code unlocked</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Priority early access to all new templates</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={onOpenProModal}
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 font-bold text-xs text-white shadow-md shadow-indigo-500/25 transition-all flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Upgrade to Pro White-Label</span>
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 5: Footer */}
        <footer className="pt-8 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <span className="font-extrabold text-slate-700 dark:text-slate-300">LogoLoom</span>
            <span>•</span>
            <span>{t.footerRights}</span>
          </div>

          <div className="flex items-center space-x-6">
            <button
              type="button"
              onClick={() => setActiveLegalModal('privacy')}
              className="hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              {t.footerPrivacy}
            </button>
            <button
              type="button"
              onClick={() => setActiveLegalModal('terms')}
              className="hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              {t.footerTerms}
            </button>
          </div>
        </footer>
      </div>

      {/* Minimal Privacy & Terms Modal */}
      {activeLegalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl relative space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {activeLegalModal === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
            </h3>
            <div className="text-xs text-slate-600 dark:text-slate-300 space-y-2 max-h-60 overflow-y-auto leading-relaxed">
              {activeLegalModal === 'privacy' ? (
                <>
                  <p><strong>1. Zero Data Collection:</strong> LogoLoom is architected as a client-side web utility. Your uploaded images, logos, client names, and generated PDF documents are processed entirely in your browser memory.</p>
                  <p><strong>2. No Server Storage:</strong> We do not store or transmit your documents to external servers or cloud databases.</p>
                  <p><strong>3. Local Preferences:</strong> Settings such as your selected color and paper size are saved strictly within your browser&apos;s localStorage for your personal convenience.</p>
                </>
              ) : (
                <>
                  <p><strong>1. Usage Rights:</strong> You own 100% of the documents you generate using LogoLoom. You may distribute, print, sell, and share them freely with your clients.</p>
                  <p><strong>2. Pro Subscription:</strong> The Pro plan enables watermark-free white-label export. Subscriptions may be cancelled at any time with immediate effect.</p>
                  <p><strong>3. Warranty:</strong> LogoLoom is provided as-is to deliver high-quality, print-ready documents efficiently.</p>
                </>
              )}
            </div>
            <button
              type="button"
              onClick={() => setActiveLegalModal(null)}
              className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
