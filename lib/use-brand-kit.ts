'use client';

import { useState, useEffect, useCallback } from 'react';
import { BrandKit, DocumentLang, InterfaceLang, PaperSize, TemplateId } from '@/types';
import { extractDominantColorFromImage, ensureAccessibleOnWhite, getOptimalTextColor } from './color-engine';

const STORAGE_KEY = 'logoloom_brand_kit_v1';
const TEMPLATE_KEY = 'logoloom_template_id_v1';
const INTERFACE_LANG_KEY = 'logoloom_ui_lang_v1';
const PRO_TOKEN_KEY = 'logoloom_pro_token_v1';

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

export function useBrandKit(initialLang?: InterfaceLang) {
  const [brandKit, setBrandKit] = useState<BrandKit>(() => ({
    ...DEFAULT_BRAND_KIT,
    documentLang: initialLang || 'en',
  }));
  const [activeTemplate, setActiveTemplate] = useState<TemplateId>('habit-tracker');
  const [interfaceLang, setInterfaceLang] = useState<InterfaceLang>(initialLang || 'en');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isExtractingColor, setIsExtractingColor] = useState(false);
  const [extractedColorSuggestion, setExtractedColorSuggestion] = useState<string | null>(null);

  // Initialize from LocalStorage and browser language
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const supportedLangs: InterfaceLang[] = ['en', 'fr', 'es', 'de', 'pt', 'it'];

        // 1. Language determination
        if (initialLang && supportedLangs.includes(initialLang)) {
          setInterfaceLang(initialLang);
        } else {
          const savedUiLang = localStorage.getItem(INTERFACE_LANG_KEY) as InterfaceLang;
          if (savedUiLang && supportedLangs.includes(savedUiLang)) {
            setInterfaceLang(savedUiLang);
          }
        }

        // 2. Saved template
        const savedTemplate = localStorage.getItem(TEMPLATE_KEY) as TemplateId;
        if (savedTemplate && ['habit-tracker', 'roadmap-90', 'welcome-packet'].includes(savedTemplate)) {
          setActiveTemplate(savedTemplate);
        }

        // 3. Saved Brand Kit
        const savedBrand = localStorage.getItem(STORAGE_KEY);
        if (savedBrand) {
          const parsed = JSON.parse(savedBrand);
          setBrandKit((prev) => ({
            ...prev,
            ...parsed,
            // Pro status cannot be set by unverified raw localStorage or URL query
            isPro: false,
            removeWatermark: false,
            documentLang: parsed.documentLang || (initialLang === 'fr' ? 'fr' : 'en'),
          }));
        }

        // 4. Server-Side Pro Subscription Entitlement Verification
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
                // Clean URL query params if returning from checkout
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

      return next;
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

  // Method for subscriber to restore access
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
    restoreProSubscription,
  };
}
