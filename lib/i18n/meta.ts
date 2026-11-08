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
    title: 'LogoLoom — Brand Client Documents in 2 Minutes',
    description:
      'Turn generic client documents into branded, print-ready PDFs in 2 minutes. Add your logo, pick colors, and download vector PDFs with zero signup.',
    ogLocale: 'en_US',
    langName: 'English',
    flag: '🇺🇸',
  },
  fr: {
    title: 'LogoLoom — Documents clients personnalisés en 2 minutes',
    description:
      'Transformez vos modèles en PDF prêts à imprimer avec votre logo et vos couleurs. Export vectoriel haute résolution, 100% privé et sans inscription.',
    ogLocale: 'fr_FR',
    langName: 'Français',
    flag: '🇫🇷',
  },
  es: {
    title: 'LogoLoom — Documentos para clientes en 2 minutos',
    description:
      'Convierte documentos en PDFs profesionales con tu logotipo, color de marca y código QR vectorial en minutos. 100% privado y gratuito.',
    ogLocale: 'es_ES',
    langName: 'Español',
    flag: '🇪🇸',
  },
  de: {
    title: 'LogoLoom — Kundendokumente in 2 Minuten erstellen',
    description:
      'Erstellen Sie druckfertige Vektor-PDFs mit Ihrem Logo und Ihrer Markenfarbe in 2 Minuten. 100% lokal und privat, ohne Registrierung.',
    ogLocale: 'de_DE',
    langName: 'Deutsch',
    flag: '🇩🇪',
  },
  pt: {
    title: 'LogoLoom — Documentos para clientes em 2 minutos',
    description:
      'Gere PDFs vetoriais para impressão com seu logotipo e cores de marca em 2 minutos. Rápido, 100% privado e sem necessidade de cadastro.',
    ogLocale: 'pt_PT',
    langName: 'Português',
    flag: '🇵🇹',
  },
  it: {
    title: 'LogoLoom — Documenti cliente pronti in 2 minuti',
    description:
      'Crea PDF vettoriali per la stampa con il tuo logo e i tuoi colori in meno di 2 minuti. Gratuito, 100% privato e senza registrazione.',
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
