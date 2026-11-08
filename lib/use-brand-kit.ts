'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  BrandKit,
  DesignStyle,
  DocumentLang,
  HabitPackId,
  HabitTrackerCustomContent,
  RoadmapCustomContent,
  WelcomePacketCustomContent,
  InterfaceLang,
  TemplateId,
} from '@/types';
import { extractDominantColorFromImage, ensureAccessibleOnWhite, getOptimalTextColor } from './color-engine';
import { HABIT_PACKS } from './i18n/habit-packs';
import { DOCUMENT_TRANSLATIONS } from './i18n/documents';

const STORAGE_KEY = 'logoloom_brand_kit_v2';
const TEMPLATE_KEY = 'logoloom_template_id_v2';
const INTERFACE_LANG_KEY = 'logoloom_ui_lang_v2';
const STYLE_KEY = 'logoloom_design_style_v1';
const PRO_TOKEN_KEY = 'logoloom_pro_token_v1';

// Elegant default sample logo (Vector SVG Data URL base64) so new users immediately see a gorgeous branded preview
const SAMPLE_SVG_RAW = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="160" height="160">
  <rect width="160" height="160" rx="36" fill="#4F46E5" />
  <path d="M44 48 L80 112 L116 48" fill="none" stroke="#FFFFFF" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" />
  <circle cx="80" cy="52" r="8" fill="#FFFFFF" />
</svg>`;

export const DEFAULT_SAMPLE_LOGO = `data:image/svg+xml;base64,${typeof btoa !== 'undefined' ? btoa(SAMPLE_SVG_RAW) : Buffer.from(SAMPLE_SVG_RAW).toString('base64')}`;

export function getDefaultHabitTrackerContent(
  lang: DocumentLang,
  packId: HabitPackId = 'wellbeing'
): HabitTrackerCustomContent {
  const pack = (HABIT_PACKS[lang] && HABIT_PACKS[lang][packId]) || HABIT_PACKS.en.wellbeing;
  const docText = (DOCUMENT_TRANSLATIONS[lang] || DOCUMENT_TRANSLATIONS.en).habitTracker;

  return {
    packId,
    title: docText.title,
    subtitle: docText.subtitle,
    habits: pack.habits.map((h, i) => ({
      id: `habit-${i + 1}`,
      title: h.title,
      subtitle: h.subtitle,
    })),
    weeklyQuestions: [
      docText.reflectionPrompts[0] || 'What brought the most positive momentum?',
      docText.reflectionPrompts[1] || 'Where did friction appear and how to resolve it?',
      docText.reflectionPrompts[2] || 'Which habit is beginning to feel natural?',
      docText.reflectionPrompts[3] || 'Key wins and next month priorities?',
    ],
    coachNote: docText.coachNoteDefault || 'Consistency creates lasting results. Celebrate each day completed.',
    showScoreColumn: true,
    showWeeklyCheckins: true,
    showCoachNote: true,
    showNotesColumn: false,
    showScoreRow: false,
  };
}

export function getDefaultRoadmapContent(lang: DocumentLang): RoadmapCustomContent {
  const t = (DOCUMENT_TRANSLATIONS[lang] || DOCUMENT_TRANSLATIONS.en).roadmap90;
  const missions: Record<DocumentLang, string> = {
    fr: 'Optimisation opérationnelle & Accélération',
    en: 'Operational Excellence & Growth',
    de: 'Operative Exzellenz & Skalierung',
    es: 'Excelencia Operativa & Crecimiento',
    it: 'Eccellenza Operativa & Crescita',
    pt: 'Excelência Operacional & Crescimento',
  };
  const horizons: Record<DocumentLang, string> = {
    fr: '90 jours ouvrés',
    en: '90 Business Days',
    de: '90 Arbeitstage',
    es: '90 días laborables',
    it: '90 giorni lavorativi',
    pt: '90 dias úteis',
  };

  return {
    title: t.title,
    subtitle: t.subtitle,
    mission: missions[lang] || missions.en,
    horizon: horizons[lang] || horizons.en,
    phases: [
      {
        title: t.phase1.title,
        daysLabel: t.phase1.range,
        deliverables: [...t.phase1.deliverables],
        kpi: t.phase1.kpiValue,
      },
      {
        title: t.phase2.title,
        daysLabel: t.phase2.range,
        deliverables: [...t.phase2.deliverables],
        kpi: t.phase2.kpiValue,
      },
      {
        title: t.phase3.title,
        daysLabel: t.phase3.range,
        deliverables: [...t.phase3.deliverables],
        kpi: t.phase3.kpiValue,
      },
    ],
    showSignatureBlock: true,
  };
}

export function getDefaultWelcomePacketContent(lang: DocumentLang): WelcomePacketCustomContent {
  const t = (DOCUMENT_TRANSLATIONS[lang] || DOCUMENT_TRANSLATIONS.en).welcomePacket;
  return {
    title: t.title,
    subtitle: t.subtitle,
    welcomeMessage: t.welcomeBody,
    channels: t.commItems[0]?.text || '',
    turnaroundTime: t.commItems[1]?.text || '',
    meetingRhythm: t.commItems[2]?.text || '',
    urgentProcedure: t.commItems[3]?.text || '',
    workingAgreements: t.agreements.map((a) => ({ title: a.title, description: a.desc })),
    checklist72h: [...t.firstSteps],
  };
}

export const DEFAULT_BRAND_KIT: BrandKit = {
  logoUrl: DEFAULT_SAMPLE_LOGO,
  brandColor: '#4F46E5', // Royal Indigo
  contrastText: '#FFFFFF',
  companyName: '', // Empty: preview shows placeholder suggestion; export omits cleanly
  tagline: '',
  coachName: '',
  clientName: '',
  contactEmail: '',
  qrUrl: '', // Contact QR renders only when user enters a custom link
  qrLabel: '',
  paperSize: 'a4',
  documentLang: 'en',
  designStyle: 'minimal', // Minimal is the DEFAULT design style
  isPro: false,
  removeWatermark: false,
};

export function useBrandKit(initialLang?: InterfaceLang) {
  const initialDocLang: DocumentLang = initialLang || 'en';

  const [brandKit, setBrandKit] = useState<BrandKit>(() => ({
    ...DEFAULT_BRAND_KIT,
    documentLang: initialDocLang,
    habitTrackerContent: getDefaultHabitTrackerContent(initialDocLang, 'wellbeing'),
    roadmapContent: getDefaultRoadmapContent(initialDocLang),
    welcomePacketContent: getDefaultWelcomePacketContent(initialDocLang),
  }));

  const [activeTemplate, setActiveTemplate] = useState<TemplateId>('habit-tracker');
  const [interfaceLang, setInterfaceLangState] = useState<InterfaceLang>(initialLang || 'en');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isExtractingColor, setIsExtractingColor] = useState(false);
  const [extractedColorSuggestion, setExtractedColorSuggestion] = useState<string | null>(null);

  // Initialize from LocalStorage and browser language
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const supportedLangs: InterfaceLang[] = ['en', 'fr', 'es', 'de', 'pt', 'it'];

        let resolvedUiLang: InterfaceLang = initialLang || 'en';
        if (initialLang && supportedLangs.includes(initialLang)) {
          resolvedUiLang = initialLang;
        } else {
          const savedUiLang = localStorage.getItem(INTERFACE_LANG_KEY) as InterfaceLang;
          if (savedUiLang && supportedLangs.includes(savedUiLang)) {
            resolvedUiLang = savedUiLang;
          }
        }
        setInterfaceLangState(resolvedUiLang);

        const savedTemplate = localStorage.getItem(TEMPLATE_KEY) as TemplateId;
        if (savedTemplate && ['habit-tracker', 'roadmap-90', 'welcome-packet'].includes(savedTemplate)) {
          setActiveTemplate(savedTemplate);
        }

        const savedStyle = localStorage.getItem(STYLE_KEY) as DesignStyle;
        const initialStyle: DesignStyle = (savedStyle === 'minimal' || savedStyle === 'complete') ? savedStyle : 'minimal';

        const savedBrand = localStorage.getItem(STORAGE_KEY);
        if (savedBrand) {
          const parsed = JSON.parse(savedBrand);
          const isUrlLocaleSpecified = Boolean(initialLang && supportedLangs.includes(initialLang));
          const docLang: DocumentLang = isUrlLocaleSpecified
            ? (initialLang as DocumentLang)
            : (parsed.documentLang || (resolvedUiLang as DocumentLang));
          const shouldRefreshLanguageContent = isUrlLocaleSpecified && parsed.documentLang !== initialLang;

          const isStaleCrossLanguage = (content: any, type: 'habitTracker' | 'roadmap90' | 'welcomePacket') => {
            if (!content || !content.title) return false;
            return Object.entries(DOCUMENT_TRANSLATIONS).some(
              ([lCode, tDoc]) => lCode !== docLang && tDoc[type]?.title === content.title
            );
          };

          const staleHabits = isStaleCrossLanguage(parsed.habitTrackerContent, 'habitTracker');
          const staleRoadmap = isStaleCrossLanguage(parsed.roadmapContent, 'roadmap90');
          const staleWelcome = isStaleCrossLanguage(parsed.welcomePacketContent, 'welcomePacket');

          setBrandKit((prev) => ({
            ...prev,
            ...parsed,
            designStyle: parsed.designStyle || initialStyle,
            documentLang: docLang,
            habitTrackerContent: shouldRefreshLanguageContent || staleHabits || !parsed.habitTrackerContent
              ? getDefaultHabitTrackerContent(docLang, parsed.habitTrackerContent?.packId || 'wellbeing')
              : parsed.habitTrackerContent,
            roadmapContent: shouldRefreshLanguageContent || staleRoadmap || !parsed.roadmapContent
              ? getDefaultRoadmapContent(docLang)
              : parsed.roadmapContent,
            welcomePacketContent: shouldRefreshLanguageContent || staleWelcome || !parsed.welcomePacketContent
              ? getDefaultWelcomePacketContent(docLang)
              : parsed.welcomePacketContent,
            isPro: false,
            removeWatermark: false,
          }));
        } else {
          setBrandKit((prev) => ({
            ...prev,
            designStyle: initialStyle,
            documentLang: resolvedUiLang as DocumentLang,
            habitTrackerContent: getDefaultHabitTrackerContent(resolvedUiLang as DocumentLang, 'wellbeing'),
            roadmapContent: getDefaultRoadmapContent(resolvedUiLang as DocumentLang),
            welcomePacketContent: getDefaultWelcomePacketContent(resolvedUiLang as DocumentLang),
          }));
        }

        // Server-Side Pro Subscription Entitlement Verification
        const urlParams = new URLSearchParams(window.location.search);
        const sessionId = urlParams.get('session_id');
        const storedToken = localStorage.getItem(PRO_TOKEN_KEY);

        if (sessionId || storedToken) {
          fetch('/api/subscription/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sessionId, token: storedToken }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.verified && data.token) {
                localStorage.setItem(PRO_TOKEN_KEY, data.token);
                setBrandKit((prev) => ({
                  ...prev,
                  isPro: true,
                  removeWatermark: true,
                }));
                if (sessionId) {
                  const cleanUrl = window.location.pathname;
                  window.history.replaceState({}, '', cleanUrl);
                }
              } else {
                localStorage.removeItem(PRO_TOKEN_KEY);
                setBrandKit((prev) => ({
                  ...prev,
                  isPro: false,
                  removeWatermark: false,
                }));
              }
            })
            .catch((err) => {
              console.warn('Subscription verification check failed', err);
            });
        }
      }
    } catch (e) {
      console.warn('LocalStorage access restricted', e);
    } finally {
      setIsLoaded(true);
    }
  }, [initialLang]);

  // Save to LocalStorage on change
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(brandKit));
      localStorage.setItem(TEMPLATE_KEY, activeTemplate);
      localStorage.setItem(INTERFACE_LANG_KEY, interfaceLang);
      localStorage.setItem(STYLE_KEY, brandKit.designStyle);
    } catch (e) {
      console.warn('Failed to save to localStorage', e);
    }
  }, [brandKit, activeTemplate, interfaceLang, isLoaded]);

  const updateBrandKit = useCallback((updates: Partial<BrandKit>) => {
    setBrandKit((prev) => {
      const next = { ...prev, ...updates };

      if (updates.brandColor && updates.brandColor !== prev.brandColor) {
        const accessibleColor = ensureAccessibleOnWhite(updates.brandColor);
        next.brandColor = accessibleColor;
        next.contrastText = getOptimalTextColor(accessibleColor);
      }

      // When document language changes in Step 4, synchronize content defaults
      if (updates.documentLang && updates.documentLang !== prev.documentLang) {
        const dLang = updates.documentLang;
        next.documentLang = dLang;
        next.habitTrackerContent = getDefaultHabitTrackerContent(dLang, prev.habitTrackerContent?.packId || 'wellbeing');
        next.roadmapContent = getDefaultRoadmapContent(dLang);
        next.welcomePacketContent = getDefaultWelcomePacketContent(dLang);
      }

      return next;
    });
  }, []);

  const setInterfaceLang = useCallback((lang: InterfaceLang) => {
    setInterfaceLangState(lang);
    setBrandKit((prev) => {
      const dLang = lang as DocumentLang;
      return {
        ...prev,
        documentLang: dLang,
        habitTrackerContent: getDefaultHabitTrackerContent(dLang, prev.habitTrackerContent?.packId || 'wellbeing'),
        roadmapContent: getDefaultRoadmapContent(dLang),
        welcomePacketContent: getDefaultWelcomePacketContent(dLang),
      };
    });
  }, []);

  const setUploadedLogo = useCallback(
    async (dataUrl: string) => {
      setIsExtractingColor(true);
      try {
        updateBrandKit({ logoUrl: dataUrl });

        const extracted = await extractDominantColorFromImage(dataUrl);
        if (extracted && extracted.dominantHex) {
          setExtractedColorSuggestion(extracted.dominantHex);
          updateBrandKit({ brandColor: extracted.dominantHex });
        }
      } catch (err) {
        console.error('Failed to process uploaded logo', err);
      } finally {
        setIsExtractingColor(false);
      }
    },
    [updateBrandKit]
  );

  const resetLogo = useCallback(() => {
    updateBrandKit({
      logoUrl: null,
      brandColor: '#4F46E5',
      contrastText: '#FFFFFF',
    });
    setExtractedColorSuggestion(null);
  }, [updateBrandKit]);

  const resetSection = useCallback(
    (section: 'details' | 'habitTracker' | 'roadmap' | 'welcomePacket' | 'all') => {
      if (section === 'details') {
        updateBrandKit({
          companyName: '',
          tagline: '',
          coachName: '',
          clientName: '',
          contactEmail: '',
          qrUrl: '',
          qrLabel: '',
        });
      } else if (section === 'habitTracker') {
        updateBrandKit({
          habitTrackerContent: getDefaultHabitTrackerContent(brandKit.documentLang, 'wellbeing'),
        });
      } else if (section === 'roadmap') {
        updateBrandKit({
          roadmapContent: getDefaultRoadmapContent(brandKit.documentLang),
        });
      } else if (section === 'welcomePacket') {
        updateBrandKit({
          welcomePacketContent: getDefaultWelcomePacketContent(brandKit.documentLang),
        });
      } else if (section === 'all') {
        updateBrandKit({
          ...DEFAULT_BRAND_KIT,
          documentLang: brandKit.documentLang,
          habitTrackerContent: getDefaultHabitTrackerContent(brandKit.documentLang, 'wellbeing'),
          roadmapContent: getDefaultRoadmapContent(brandKit.documentLang),
          welcomePacketContent: getDefaultWelcomePacketContent(brandKit.documentLang),
        });
      }
    },
    [brandKit.documentLang, updateBrandKit]
  );

  const restoreProSubscription = useCallback(async (email: string) => {
    try {
      const res = await fetch('/api/subscription/restore', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success && data.token) {
        localStorage.setItem(PRO_TOKEN_KEY, data.token);
        updateBrandKit({ isPro: true, removeWatermark: true });
        return { success: true, message: data.message };
      }
      return { success: false, error: data.error || 'No active subscription found.' };
    } catch (err: any) {
      return { success: false, error: err.message || 'Restoration request failed.' };
    }
  }, [updateBrandKit]);

  return {
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
  };
}
