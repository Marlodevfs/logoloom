import { DocumentLang } from '@/types';

/**
 * Fallback names shown on business documents when the user hasn't filled in
 * their business or client name yet. Localized per document language.
 */
export const PARTY_PLACEHOLDERS: Record<DocumentLang, { company: string; client: string }> = {
  en: { company: 'Your Business', client: 'Client / Company' },
  fr: { company: 'Votre Entreprise', client: 'Client / Société' },
  de: { company: 'Ihr Unternehmen', client: 'Kunde / Firma' },
  es: { company: 'Su Empresa', client: 'Cliente / Empresa' },
  it: { company: 'La Tua Azienda', client: 'Cliente / Azienda' },
  pt: { company: 'A Sua Empresa', client: 'Cliente / Empresa' },
};

export function getPartyPlaceholders(lang: DocumentLang | undefined) {
  return PARTY_PLACEHOLDERS[lang || 'en'] || PARTY_PLACEHOLDERS.en;
}
