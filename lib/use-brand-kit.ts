'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  BrandKit,
  DesignStyle,
  DocumentLang,
  HabitPackId,
  HabitTrackerCustomContent,
  GoalPlannerCustomContent,
  WeeklyPlannerCustomContent,
  MonthlyCalendarCustomContent,
  DailyPrioritiesCustomContent,
  MealPlannerCustomContent,
  BudgetTrackerCustomContent,
  ChecklistCustomContent,
  CvCustomContent,
  InterfaceLang,
  TemplateId,
} from '@/types';
import { extractDominantColorFromImage, ensureAccessibleOnWhite, getOptimalTextColor } from './color-engine';
import { HABIT_PACKS } from './i18n/habit-packs';
import { trackEvent } from './analytics';
import { DOCUMENT_TRANSLATIONS } from './i18n/documents';
import {
  DEFAULT_GOAL_PLANNER,
  DEFAULT_WEEKLY_PLANNER,
  DEFAULT_MONTHLY_CALENDAR,
  DEFAULT_DAILY_PRIORITIES,
  DEFAULT_MEAL_PLANNER,
  DEFAULT_BUDGET_TRACKER,
  DEFAULT_CHECKLIST,
} from './i18n/catalog-data';
import { DEFAULT_CV } from './i18n/cv-data';
import { getDefaultLetterContent } from './i18n/letter-data';

const STORAGE_KEY = 'logoloom_brand_kit_v3';
const TEMPLATE_KEY = 'logoloom_template_id_v3';
const INTERFACE_LANG_KEY = 'logoloom_ui_lang_v3';
const STYLE_KEY = 'logoloom_design_style_v2';
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

export function getDefaultGoalPlannerContent(lang: DocumentLang): GoalPlannerCustomContent {
  return DEFAULT_GOAL_PLANNER[lang] || DEFAULT_GOAL_PLANNER.en;
}

export function getDefaultWeeklyPlannerContent(lang: DocumentLang): WeeklyPlannerCustomContent {
  return DEFAULT_WEEKLY_PLANNER[lang] || DEFAULT_WEEKLY_PLANNER.en;
}

export function getDefaultMonthlyCalendarContent(lang: DocumentLang): MonthlyCalendarCustomContent {
  return DEFAULT_MONTHLY_CALENDAR[lang] || DEFAULT_MONTHLY_CALENDAR.en;
}

export function getDefaultDailyPrioritiesContent(lang: DocumentLang): DailyPrioritiesCustomContent {
  return DEFAULT_DAILY_PRIORITIES[lang] || DEFAULT_DAILY_PRIORITIES.en;
}

export function getDefaultMealPlannerContent(lang: DocumentLang): MealPlannerCustomContent {
  return DEFAULT_MEAL_PLANNER[lang] || DEFAULT_MEAL_PLANNER.en;
}

export function getDefaultBudgetTrackerContent(lang: DocumentLang): BudgetTrackerCustomContent {
  return DEFAULT_BUDGET_TRACKER[lang] || DEFAULT_BUDGET_TRACKER.en;
}





export function getDefaultChecklistContent(lang: DocumentLang): ChecklistCustomContent {
  return DEFAULT_CHECKLIST[lang] || DEFAULT_CHECKLIST.en;
}

export function getDefaultCvContent(lang: DocumentLang): CvCustomContent {
  return DEFAULT_CV[lang] || DEFAULT_CV.en;
}


type LocalizedContentKey =
  | 'goalPlannerContent'
  | 'weeklyPlannerContent'
  | 'monthlyCalendarContent'
  | 'dailyPrioritiesContent'
  | 'mealPlannerContent'
  | 'budgetTrackerContent'
  | 'checklistContent'
  | 'cvContent'
  | 'letterContent';

const LOCALIZED_DEFAULTS: Record<LocalizedContentKey, (lang: DocumentLang) => unknown> = {
  goalPlannerContent: getDefaultGoalPlannerContent,
  weeklyPlannerContent: getDefaultWeeklyPlannerContent,
  monthlyCalendarContent: getDefaultMonthlyCalendarContent,
  dailyPrioritiesContent: getDefaultDailyPrioritiesContent,
  mealPlannerContent: getDefaultMealPlannerContent,
  budgetTrackerContent: getDefaultBudgetTrackerContent,
  checklistContent: getDefaultChecklistContent,
  cvContent: getDefaultCvContent,
  letterContent: getDefaultLetterContent,
};

const sameContent = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);

/**
 * Switches template contents to another language WITHOUT destroying user edits:
 * a section is replaced by the new language defaults only if it is missing or
 * still identical to the defaults of the previous language.
 */
export function relocalizeContents(
  kit: Partial<BrandKit>,
  fromLang: DocumentLang | undefined,
  toLang: DocumentLang
): Partial<BrandKit> {
  const out: Partial<BrandKit> = {};

  const habit = kit.habitTrackerContent;
  const packId = habit?.packId || 'wellbeing';
  const habitUntouched =
    !habit || !fromLang || sameContent(habit, getDefaultHabitTrackerContent(fromLang, packId));
  out.habitTrackerContent = habitUntouched ? getDefaultHabitTrackerContent(toLang, packId) : habit;

  for (const key of Object.keys(LOCALIZED_DEFAULTS) as LocalizedContentKey[]) {
    const current = kit[key];
    const getDefault = LOCALIZED_DEFAULTS[key];
    const untouched = !current || !fromLang || sameContent(current, getDefault(fromLang));
    (out as any)[key] = untouched ? getDefault(toLang) : current;
  }
  return out;
}

export const DEFAULT_BRAND_KIT: BrandKit = {
  logoUrl: DEFAULT_SAMPLE_LOGO,
  brandColor: '#2340A8', // Ink
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
  weekStart: 'monday',
  currency: '€',
};

const VALID_TEMPLATES: TemplateId[] = [
  'habit-tracker',
  'goal-planner-90',
  'weekly-planner',
  'monthly-calendar',
  'daily-priorities',
  'meal-planner',
  'budget-tracker',
  'checklist',
  'cv',
];

export function useBrandKit(initialLang?: InterfaceLang, initialTemplate?: TemplateId) {
  const initialDocLang: DocumentLang = initialLang || 'en';
  const resolvedTemplate: TemplateId = (initialTemplate && VALID_TEMPLATES.includes(initialTemplate)) ? initialTemplate : 'habit-tracker';

  const [brandKit, setBrandKit] = useState<BrandKit>(() => ({
    ...DEFAULT_BRAND_KIT,
    documentLang: initialDocLang,
    habitTrackerContent: getDefaultHabitTrackerContent(initialDocLang, 'wellbeing'),
    goalPlannerContent: getDefaultGoalPlannerContent(initialDocLang),
    weeklyPlannerContent: getDefaultWeeklyPlannerContent(initialDocLang),
    monthlyCalendarContent: getDefaultMonthlyCalendarContent(initialDocLang),
    dailyPrioritiesContent: getDefaultDailyPrioritiesContent(initialDocLang),
    mealPlannerContent: getDefaultMealPlannerContent(initialDocLang),
    budgetTrackerContent: getDefaultBudgetTrackerContent(initialDocLang),
    checklistContent: getDefaultChecklistContent(initialDocLang),
    cvContent: getDefaultCvContent(initialDocLang),
    letterContent: getDefaultLetterContent(initialDocLang),
  }));

  const [activeTemplate, setActiveTemplate] = useState<TemplateId>(resolvedTemplate);
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

        if (initialTemplate && VALID_TEMPLATES.includes(initialTemplate)) {
          setActiveTemplate(initialTemplate);
        } else {
          const savedTemplate = localStorage.getItem(TEMPLATE_KEY) as TemplateId;
          if (savedTemplate && VALID_TEMPLATES.includes(savedTemplate)) {
            setActiveTemplate(savedTemplate);
          }
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

          const langChanged = Boolean(isUrlLocaleSpecified && parsed.documentLang && parsed.documentLang !== initialLang);

          setBrandKit((prev) => ({
            ...prev,
            ...parsed,
            designStyle: parsed.designStyle || initialStyle,
            documentLang: docLang,
            weekStart: parsed.weekStart || 'monday',
            currency: parsed.currency || '€',
            ...(langChanged
              ? relocalizeContents(parsed, parsed.documentLang, docLang)
              : relocalizeContents(parsed, docLang, docLang)),
            isPro: false,
            removeWatermark: false,
          }));
        } else {
          setBrandKit((prev) => ({
            ...prev,
            designStyle: initialStyle,
            documentLang: resolvedUiLang as DocumentLang,
            habitTrackerContent: getDefaultHabitTrackerContent(resolvedUiLang as DocumentLang, 'wellbeing'),
            goalPlannerContent: getDefaultGoalPlannerContent(resolvedUiLang as DocumentLang),
            weeklyPlannerContent: getDefaultWeeklyPlannerContent(resolvedUiLang as DocumentLang),
            monthlyCalendarContent: getDefaultMonthlyCalendarContent(resolvedUiLang as DocumentLang),
            dailyPrioritiesContent: getDefaultDailyPrioritiesContent(resolvedUiLang as DocumentLang),
            mealPlannerContent: getDefaultMealPlannerContent(resolvedUiLang as DocumentLang),
            budgetTrackerContent: getDefaultBudgetTrackerContent(resolvedUiLang as DocumentLang),
            checklistContent: getDefaultChecklistContent(resolvedUiLang as DocumentLang),
            cvContent: getDefaultCvContent(resolvedUiLang as DocumentLang),
            letterContent: getDefaultLetterContent(resolvedUiLang as DocumentLang),
          }));
        }

        // Server-Side Pro Subscription Entitlement Verification
        const urlParams = new URLSearchParams(window.location.search);
        const sessionId = urlParams.get('transaction_id') || urlParams.get('session_id');
        const storedToken = localStorage.getItem(PRO_TOKEN_KEY);

        if (sessionId || storedToken) {
          fetch('/api/subscription/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ transactionId: sessionId, token: storedToken }),
          })
            .then(async (res) => ({ status: res.status, data: await res.json().catch(() => ({})) }))
            .then(({ status, data }) => {
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
              } else if (status === 401) {
                // Only drop the token when the server explicitly rejects it,
                // not on a transient 5xx / network error.
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

  // Save to LocalStorage on change, debounced: the brand kit can contain a
  // multi-MB base64 logo, and serializing it on every keystroke made typing laggy
  // on phones. Pending changes are flushed when the tab is hidden/closed.
  useEffect(() => {
    if (!isLoaded) return;
    const save = () => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(brandKit));
        localStorage.setItem(TEMPLATE_KEY, activeTemplate);
        localStorage.setItem(INTERFACE_LANG_KEY, interfaceLang);
        localStorage.setItem(STYLE_KEY, brandKit.designStyle);
      } catch (e) {
        console.warn('Failed to save to localStorage', e);
      }
    };
    const timer = setTimeout(save, 400);
    const flush = () => {
      if (document.visibilityState === 'hidden') save();
    };
    document.addEventListener('visibilitychange', flush);
    window.addEventListener('pagehide', save);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('visibilitychange', flush);
      window.removeEventListener('pagehide', save);
    };
  }, [brandKit, activeTemplate, interfaceLang, isLoaded]);

  const updateBrandKit = useCallback((updates: Partial<BrandKit>) => {
    setBrandKit((prev) => {
      const next = { ...prev, ...updates };

      if (updates.brandColor && updates.brandColor !== prev.brandColor) {
        const accessibleColor = ensureAccessibleOnWhite(updates.brandColor);
        next.brandColor = accessibleColor;
        next.contrastText = getOptimalTextColor(accessibleColor);
      }

      // When document language changes, synchronize content defaults
      if (updates.documentLang && updates.documentLang !== prev.documentLang) {
        const dLang = updates.documentLang;
        next.documentLang = dLang;
        Object.assign(next, relocalizeContents(prev, prev.documentLang, dLang));
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
        ...relocalizeContents(prev, prev.documentLang, dLang),
      };
    });
  }, []);

  const setUploadedLogo = useCallback(
    async (dataUrl: string) => {
      setIsExtractingColor(true);
      trackEvent('logo_upload');
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
      brandColor: '#2340A8',
      contrastText: '#FFFFFF',
    });
    setExtractedColorSuggestion(null);
  }, [updateBrandKit]);

  const resetSection = useCallback(
    (section: 'details' | TemplateId | 'all') => {
      const lang = brandKit.documentLang;
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
      } else if (section === 'habit-tracker') {
        updateBrandKit({ habitTrackerContent: getDefaultHabitTrackerContent(lang, 'wellbeing') });
      } else if (section === 'goal-planner-90') {
        updateBrandKit({ goalPlannerContent: getDefaultGoalPlannerContent(lang) });
      } else if (section === 'weekly-planner') {
        updateBrandKit({ weeklyPlannerContent: getDefaultWeeklyPlannerContent(lang) });
      } else if (section === 'monthly-calendar') {
        updateBrandKit({ monthlyCalendarContent: getDefaultMonthlyCalendarContent(lang) });
      } else if (section === 'daily-priorities') {
        updateBrandKit({ dailyPrioritiesContent: getDefaultDailyPrioritiesContent(lang) });
      } else if (section === 'meal-planner') {
        updateBrandKit({ mealPlannerContent: getDefaultMealPlannerContent(lang) });
      } else if (section === 'budget-tracker') {
        updateBrandKit({ budgetTrackerContent: getDefaultBudgetTrackerContent(lang) });
      } else if (section === 'checklist') {
        updateBrandKit({ checklistContent: getDefaultChecklistContent(lang) });
      } else if (section === 'cv') {
        updateBrandKit({ cvContent: getDefaultCvContent(lang) });
      } else if (section === 'all') {
        updateBrandKit({
          ...DEFAULT_BRAND_KIT,
          documentLang: lang,
          habitTrackerContent: getDefaultHabitTrackerContent(lang, 'wellbeing'),
          goalPlannerContent: getDefaultGoalPlannerContent(lang),
          weeklyPlannerContent: getDefaultWeeklyPlannerContent(lang),
          monthlyCalendarContent: getDefaultMonthlyCalendarContent(lang),
          dailyPrioritiesContent: getDefaultDailyPrioritiesContent(lang),
          mealPlannerContent: getDefaultMealPlannerContent(lang),
          budgetTrackerContent: getDefaultBudgetTrackerContent(lang),
          checklistContent: getDefaultChecklistContent(lang),
          cvContent: getDefaultCvContent(lang),
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
