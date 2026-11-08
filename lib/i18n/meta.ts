import { InterfaceLang } from '@/types';
import { siteConfig } from '@/config/site';

export interface LocaleMeta {
  title: string;
  description: string;
  ogLocale: string;
  langName: string;
  flag: string;
}

export const LOCALES_METADATA: Record<InterfaceLang, LocaleMeta> = {
  en: {
    title: 'LogoLoom — Brand Client Documents in 2 Minutes (Zero Friction)',
    description:
      'Turn generic client documents into branded, print-ready PDFs in under 2 minutes. Drop your logo, pick your brand color, and download instant PDFs with zero account or signup.',
    ogLocale: 'en_US',
    langName: 'English',
    flag: '🇺🇸',
  },
  fr: {
    title: 'LogoLoom — Personnalisez vos documents clients en 2 minutes (Gratuit & Privé)',
    description:
      'Transformez vos modèles en PDF prêts à imprimer avec votre logo, vos couleurs et un QR code vectoriel. 100% privé, sans compte ni inscription.',
    ogLocale: 'fr_FR',
    langName: 'Français',
    flag: '🇫🇷',
  },
  es: {
    title: 'LogoLoom — Personaliza documentos para clientes en 2 minutos (Sin registro)',
    description:
      'Convierte documentos en PDFs profesionales con tu logotipo, color de marca y código QR vectorial en minutos. 100% privado y gratuito.',
    ogLocale: 'es_ES',
    langName: 'Español',
    flag: '🇪🇸',
  },
  de: {
    title: 'LogoLoom — Kundendokumente in 2 Minuten branden (100% lokal & privat)',
    description:
      'Erstellen Sie druckfertige Vektor-PDFs mit Ihrem Logo, Ihrer Markenfarbe und individuellem QR-Code. Ohne Konto, ohne Registrierung, sofort einsatzbereit.',
    ogLocale: 'de_DE',
    langName: 'Deutsch',
    flag: '🇩🇪',
  },
  pt: {
    title: 'LogoLoom — Personalize documentos de clientes em 2 minutos (Sem cadastro)',
    description:
      'Gere PDFs vetoriais prontos para impressão com seu logotipo, paleta de cores e QR code integrado. Gratuito, sem criação de conta e 100% privado.',
    ogLocale: 'pt_PT',
    langName: 'Português',
    flag: '🇵🇹',
  },
  it: {
    title: 'LogoLoom — Personalizza i documenti dei tuoi clienti in 2 minuti (Senza registrazione)',
    description:
      'Crea PDF vettoriali stampabili con il tuo logo, colore del brand e QR code personalizzato in meno di 2 minuti. Gratuito e 100% nel tuo browser.',
    ogLocale: 'it_IT',
    langName: 'Italiano',
    flag: '🇮🇹',
  },
};

export function getHreflangAlternates() {
  const languages: Record<string, string> = {};
  for (const lang of siteConfig.locales) {
    languages[lang] = `${siteConfig.url}/${lang}`;
  }
  languages['x-default'] = siteConfig.url;
  return languages;
}
