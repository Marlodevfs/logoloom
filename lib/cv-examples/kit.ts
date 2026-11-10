import type { BrandKit, CvCustomContent } from '@/types';

/** A minimal brand kit that renders one CV (server-safe, serializable). */
export function cvKit(cv: CvCustomContent, color: string): BrandKit {
  return {
    logoUrl: null,
    brandColor: color,
    contrastText: '#FFFFFF',
    companyName: '',
    tagline: '',
    coachName: '',
    clientName: '',
    contactEmail: '',
    qrUrl: '',
    paperSize: 'a4',
    documentLang: 'fr',
    designStyle: 'minimal',
    isPro: false,
    removeWatermark: false,
    selectedTemplate: 'cv',
    cvContent: cv,
  } as BrandKit;
}
