'use client';

import { useState, useEffect, useCallback } from 'react';
import { BrandKit, DocumentLang, InterfaceLang, PaperSize, TemplateId } from '@/types';
import { extractDominantColorFromImage, ensureAccessibleOnWhite, getOptimalTextColor } from './color-engine';

const STORAGE_KEY = 'logoloom_brand_kit_v1';
const TEMPLATE_KEY = 'logoloom_template_id_v1';
const INTERFACE_LANG_KEY = 'logoloom_ui_lang_v1';

// Elegant default sample logo (Vector SVG Data URL) so new users immediately see a gorgeous branded preview
export const DEFAULT_SAMPLE_LOGO = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="160" height="160">
  <defs>
    <linearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4F46E5" />
      <stop offset="100%" stop-color="#7C3AED" />
    </linearGradient>
  </defs>
  <rect width="160" height="160" rx="36" fill="url(#brandGrad)" />
  <path d="M44 48 L80 112 L116 48" fill="none" stroke="#FFFFFF" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" />
  <circle cx="80" cy="52" r="8" fill="#FFFFFF" />
</svg>
`)}`;

export const DEFAULT_BRAND_KIT: BrandKit = {
  logoUrl: DEFAULT_SAMPLE_LOGO,
  brandColor: '#4F46E5', // Royal Indigo
  contrastText: '#FFFFFF',
  companyName: 'Apex Studio & Coaching',
  tagline: 'High-Impact Consulting & Strategic Performance',
  coachName: 'Alexandre Martin',
  clientName: '',
  contactEmail: 'hello@apexstudio.io',
  qrUrl: 'https://logoloom.app',
  paperSize: 'a4',
  documentLang: 'en',
  isPro: false,
  removeWatermark: false,
};

export function useBrandKit() {
  const [brandKit, setBrandKit] = useState<BrandKit>(DEFAULT_BRAND_KIT);
  const [activeTemplate, setActiveTemplate] = useState<TemplateId>('habit-tracker');
  const [interfaceLang, setInterfaceLang] = useState<InterfaceLang>('en');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isExtractingColor, setIsExtractingColor] = useState(false);
  const [extractedColorSuggestion, setExtractedColorSuggestion] = useState<string | null>(null);

  // Initialize from LocalStorage and browser language
  useEffect(() => {
    try {
      // 1. Detect browser language
      if (typeof window !== 'undefined') {
        const browserLang = navigator.language?.split('-')[0]?.toLowerCase();
        const supportedLangs: InterfaceLang[] = ['en', 'fr', 'es', 'de', 'pt', 'it'];
        const initialLang: InterfaceLang = supportedLangs.includes(browserLang as InterfaceLang)
          ? (browserLang as InterfaceLang)
          : 'en';
        
        const savedUiLang = localStorage.getItem(INTERFACE_LANG_KEY) as InterfaceLang;
        if (savedUiLang && supportedLangs.includes(savedUiLang)) {
          setInterfaceLang(savedUiLang);
        } else {
          setInterfaceLang(initialLang);
        }

        // 2. Saved template
        const savedTemplate = localStorage.getItem(TEMPLATE_KEY) as TemplateId;
        if (savedTemplate && ['habit-tracker', 'roadmap-90', 'welcome-packet'].includes(savedTemplate)) {
          setActiveTemplate(savedTemplate);
        }

        // Check if query params contain ?pro=true (e.g. from checkout return)
        const urlParams = new URLSearchParams(window.location.search);
        const proQuery = urlParams.get('pro');
        const isProFromQuery = proQuery === 'true' || proQuery === 'activated';

        // 3. Saved Brand Kit
        const savedBrand = localStorage.getItem(STORAGE_KEY);
        if (savedBrand) {
          const parsed = JSON.parse(savedBrand);
          setBrandKit(prev => ({
            ...prev,
            ...parsed,
            isPro: isProFromQuery || parsed.isPro || false,
            removeWatermark: isProFromQuery || parsed.removeWatermark || false,
            // Ensure fallback documentLang defaults to matching interface language if not set
            documentLang: parsed.documentLang || (initialLang === 'fr' ? 'fr' : 'en'),
          }));
        } else {
          // If first visit in French, default document language to French
          setBrandKit(prev => ({
            ...prev,
            isPro: isProFromQuery,
            removeWatermark: isProFromQuery,
            documentLang: initialLang === 'fr' ? 'fr' : 'en',
          }));
        }
      }
    } catch (e) {
      console.warn('LocalStorage access restricted', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to LocalStorage on change
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(brandKit));
      localStorage.setItem(TEMPLATE_KEY, activeTemplate);
      localStorage.setItem(INTERFACE_LANG_KEY, interfaceLang);
    } catch (e) {
      console.warn('Failed to save to localStorage', e);
    }
  }, [brandKit, activeTemplate, interfaceLang, isLoaded]);

  // Update specific field in brand kit
  const updateBrandKit = useCallback((updates: Partial<BrandKit>) => {
    setBrandKit(prev => {
      const next = { ...prev, ...updates };
      // If brand color changed, recompute contrastText
      if (updates.brandColor && updates.brandColor !== prev.brandColor) {
        next.contrastText = getOptimalTextColor(updates.brandColor);
      }
      return next;
    });
  }, []);

  // Process and apply uploaded logo
  const setUploadedLogo = useCallback(async (logoDataUrl: string) => {
    setIsExtractingColor(true);
    try {
      const analysis = await extractDominantColorFromImage(logoDataUrl);
      setExtractedColorSuggestion(analysis.dominantHex);

      const accessibleColor = analysis.isAccessibleOnWhite
        ? analysis.dominantHex
        : analysis.suggestedHex;

      updateBrandKit({
        logoUrl: logoDataUrl,
        brandColor: accessibleColor,
        contrastText: getOptimalTextColor(accessibleColor),
      });
    } catch (err) {
      console.error('Error extracting color from logo', err);
      updateBrandKit({ logoUrl: logoDataUrl });
    } finally {
      setIsExtractingColor(false);
    }
  }, [updateBrandKit]);

  // Remove logo and restore sample
  const resetLogo = useCallback(() => {
    updateBrandKit({
      logoUrl: null,
      brandColor: '#4F46E5',
    });
    setExtractedColorSuggestion(null);
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
  };
}
