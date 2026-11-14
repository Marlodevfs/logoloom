import type { BrandKit, CoverLetterContent, CvCustomContent } from '@/types';

/** A minimal brand kit that renders one CV (server-safe, serializable). */
export function cvKit(cv: CvCustomContent, color: string, lang: 'fr' | 'en' = 'fr'): BrandKit {
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
    documentLang: lang,
    designStyle: 'minimal',
    isPro: false,
    removeWatermark: false,
    selectedTemplate: 'cv',
    cvContent: cv,
  } as BrandKit;
}

/** Brand kit for a cover letter preview: the CV gives the sender block. */
export function letterKit(cv: CvCustomContent, letter: CoverLetterContent, color: string): BrandKit {
  return { ...cvKit(cv, color, 'fr'), letterContent: letter } as BrandKit;
}

/** Sender used when a letter example has no matching CV example. */
export const PLACEHOLDER_CV_FR: CvCustomContent = {
  layout: 'sidebar',
  fullName: '[Prénom Nom]',
  jobTitle: '[Votre métier]',
  email: '[email]',
  phone: '[téléphone]',
  city: '[Ville]',
  link: '',
  photoUrl: null,
  summary: '',
  experiences: [],
  education: [],
  skills: [],
  languages: [],
  interests: '',
};
