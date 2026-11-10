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
    title: 'LogoLoom – Free CV Maker and Printable Planners',
    description:
      'Create a CV, planners, meal plans, a budget or checklists and download a clean PDF. Free, no account, nothing leaves your browser.',
    ogLocale: 'en_US',
    langName: 'English',
    flag: '🇬🇧',
  },
  fr: {
    title: 'LogoLoom – CV gratuit et plannings à imprimer',
    description:
      'Créez votre CV, vos plannings, menus, budget ou checklists et téléchargez un PDF propre. Gratuit, sans compte, rien ne quitte votre navigateur.',
    ogLocale: 'fr_FR',
    langName: 'Français',
    flag: '🇫🇷',
  },
  es: {
    title: 'LogoLoom – CV gratis y planificadores para imprimir',
    description:
      'Crea tu CV, planificadores, menús, presupuesto o checklists y descarga un PDF limpio. Gratis, sin cuenta, nada sale de tu navegador.',
    ogLocale: 'es_ES',
    langName: 'Español',
    flag: '🇪🇸',
  },
  de: {
    title: 'LogoLoom – Lebenslauf und Planer kostenlos als PDF',
    description:
      'Erstellen Sie Lebenslauf, Planer, Essenspläne, Budget oder Checklisten als sauberes PDF. Kostenlos, ohne Konto, nichts verlässt Ihren Browser.',
    ogLocale: 'de_DE',
    langName: 'Deutsch',
    flag: '🇩🇪',
  },
  pt: {
    title: 'LogoLoom – CV grátis e planeadores para imprimir',
    description:
      'Crie o seu CV, planeadores, ementas, orçamento ou checklists e descarregue um PDF limpo. Grátis, sem conta, nada sai do seu navegador.',
    ogLocale: 'pt_PT',
    langName: 'Português',
    flag: '🇵🇹',
  },
  it: {
    title: 'LogoLoom – CV gratis e planner da stampare',
    description:
      'Crea il tuo CV, planner, menù, budget o checklist e scarica un PDF pulito. Gratis, senza account, nulla lascia il browser.',
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
