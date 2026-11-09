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
    title: 'LogoLoom – Free Printable Planners & Business Templates',
    description:
      'Print and customize free PDF planners and business templates in seconds. 100% private in your browser, custom colors, optional logo.',
    ogLocale: 'en_US',
    langName: 'English',
    flag: '🇬🇧',
  },
  fr: {
    title: 'LogoLoom – Planners et Modèles Gratuits à Imprimer PDF',
    description:
      'Personnalisez et imprimez vos plannings et documents professionnels en PDF. 100% gratuit et privé dans le navigateur, logo optionnel.',
    ogLocale: 'fr_FR',
    langName: 'Français',
    flag: '🇫🇷',
  },
  es: {
    title: 'LogoLoom – Planificadores y Plantillas Gratis Imprimibles',
    description:
      'Personaliza e imprime planificadores y documentos en PDF al instante. 100% privado en tu navegador, colores a medida y sin registro.',
    ogLocale: 'es_ES',
    langName: 'Español',
    flag: '🇪🇸',
  },
  de: {
    title: 'LogoLoom – Kostenlose Druckbare Planer & Vorlagen PDF',
    description:
      'Erstellen Sie druckfertige Planer und Vorlagen als PDF in Sekunden. 100% privat im Browser, individuelle Farben, ohne Anmeldung.',
    ogLocale: 'de_DE',
    langName: 'Deutsch',
    flag: '🇩🇪',
  },
  pt: {
    title: 'LogoLoom – Planejadores e Modelos Imprimíveis Gratuitos',
    description:
      'Personalize e imprima planejadores e documentos em PDF em segundos. 100% privado no navegador, cores à escolha e sem cadastro.',
    ogLocale: 'pt_PT',
    langName: 'Português',
    flag: '🇵🇹',
  },
  it: {
    title: 'LogoLoom – Planner e Modelli Stampabili Gratuiti PDF',
    description:
      'Personalizza e stampa planner e documenti professionali in PDF in pochi secondi. 100% privato nel browser, colori su misura e senza login.',
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
