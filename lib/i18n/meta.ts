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
    title: 'LogoLoom – Free CV Maker, PDF Download, No Subscription',
    description:
      'Create a clean CV in ten minutes and download it as a PDF that recruiting software can read. Free, no account, no subscription.',
    ogLocale: 'en_US',
    langName: 'English',
    flag: '🇬🇧',
  },
  fr: {
    title: 'LogoLoom – CV gratuit en PDF, sans abonnement',
    description:
      'Créez un CV propre en dix minutes et téléchargez-le en PDF lisible par les recruteurs. Gratuit, sans compte, sans abonnement.',
    ogLocale: 'fr_FR',
    langName: 'Français',
    flag: '🇫🇷',
  },
  es: {
    title: 'LogoLoom – Crear CV gratis en PDF, sin suscripción',
    description:
      'Crea un CV limpio en diez minutos y descárgalo en PDF legible por reclutadores. Gratis, sin cuenta, sin suscripción.',
    ogLocale: 'es_ES',
    langName: 'Español',
    flag: '🇪🇸',
  },
  de: {
    title: 'LogoLoom – Lebenslauf kostenlos als PDF, ohne Abo',
    description:
      'Erstellen Sie in zehn Minuten einen sauberen Lebenslauf als PDF, lesbar für Bewerbungssoftware. Kostenlos, ohne Konto, ohne Abo.',
    ogLocale: 'de_DE',
    langName: 'Deutsch',
    flag: '🇩🇪',
  },
  pt: {
    title: 'LogoLoom – Criar CV grátis em PDF, sem assinatura',
    description:
      'Crie um CV limpo em dez minutos e descarregue-o em PDF legível por recrutadores. Grátis, sem conta, sem assinatura.',
    ogLocale: 'pt_PT',
    langName: 'Português',
    flag: '🇵🇹',
  },
  it: {
    title: 'LogoLoom – CV gratis in PDF, senza abbonamento',
    description:
      'Crea un CV pulito in dieci minuti e scaricalo in PDF leggibile dai selezionatori. Gratis, senza account, senza abbonamento.',
    ogLocale: 'it_IT',
    langName: 'Italiano',
    flag: '🇮🇹',
  },
};

export function getHreflangAlternates(pathSuffix = '') {
  const languages: Record<string, string> = {};
  for (const lang of siteConfig.locales) {
    languages[lang] = `${siteConfig.url}/${lang}${pathSuffix ? `/${pathSuffix}` : ''}`;
  }
  // x-default points to default language page or root
  languages['x-default'] = pathSuffix ? `${siteConfig.url}/en/${pathSuffix}` : `${siteConfig.url}/en`;
  return languages;
}
