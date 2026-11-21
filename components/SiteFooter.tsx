import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { getSiteChrome } from '@/lib/i18n/site-chrome';
import { CATALOG, CATEGORY_COPY, CATEGORY_ORDER } from '@/lib/catalog';
import type { InterfaceLang } from '@/types';
import { BuyMeACoffeeButton } from '@/components/BuyMeACoffee';
import { CookieSettingsLink } from '@/components/CookieConsent';
import { PRO_ENABLED } from '@/lib/i18n/pro';

/** Sister site, linked from the footer with a descriptive anchor in each language. */
const CONVERSAPDF: Record<InterfaceLang, { href: string; label: string }> = {
  en: { href: 'https://conversapdf.com/en', label: 'WhatsApp chat to PDF' },
  fr: { href: 'https://conversapdf.com/fr', label: 'Conversation WhatsApp en PDF' },
  es: { href: 'https://conversapdf.com/es', label: 'Chat de WhatsApp a PDF' },
  de: { href: 'https://conversapdf.com/en', label: 'WhatsApp-Chat als PDF' },
  pt: { href: 'https://conversapdf.com/pt', label: 'Conversa do WhatsApp em PDF' },
  it: { href: 'https://conversapdf.com/it', label: 'Chat WhatsApp in PDF' },
};

/** Footer call to action: the main tool, reachable from every page. */
const CREATE_CV: Record<InterfaceLang, string> = {
  fr: 'Créer mon CV gratuit',
  en: 'Create my free CV',
  de: 'Kostenlosen Lebenslauf erstellen',
  es: 'Crear mi CV gratis',
  it: 'Crea il mio CV gratis',
  pt: 'Criar meu CV grátis',
};

/** Site-wide footer: product links, legal pages and contact. Server component. */
export function SiteFooter({ lang, withStickyBar = false }: { lang: string; withStickyBar?: boolean }) {
  const c = getSiteChrome(lang);
  const year = new Date().getFullYear();
  const cats = CATEGORY_COPY[lang as InterfaceLang] || CATEGORY_COPY.en;

  return (
    <footer className={`border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 ${withStickyBar ? 'pb-24 lg:pb-0' : ''}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-2 sm:grid-cols-4 gap-8 text-xs [&_li>a]:inline-block [&_li>a]:py-2.5 lg:[&_li>a]:py-0 [&_li>button]:py-2.5 lg:[&_li>button]:py-0">
        <div className="col-span-2 sm:col-span-1 space-y-2">
          <p className="font-extrabold text-sm text-slate-900 dark:text-white">{siteConfig.name}</p>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{c.slogan}</p>
          <div className="pt-1 flex flex-col items-start gap-2">
            <Link
              href={`/${lang}/cv`}
              className="inline-flex items-center h-10 px-4 rounded-lg bg-ink-600 hover:bg-ink-700 text-white text-sm font-bold transition-colors"
            >
              {CREATE_CV[lang as InterfaceLang] || CREATE_CV.en}
            </Link>
            <Link href={`/${lang}#tools`} className="text-sm font-semibold text-slate-700 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400">
              {c.viewAll}
            </Link>
          </div>
          <div className="pt-2">
            <BuyMeACoffeeButton lang={lang} withHint />
          </div>
        </div>

        <nav aria-label={c.footer.templates} className="space-y-2">
          <p className="font-bold text-slate-800 dark:text-slate-200">{c.footer.templates}</p>
          {CATEGORY_ORDER.map((cat) => (
            <div key={cat} className="space-y-1">
              <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 pt-1">{cats[cat].name}</p>
              <ul className="space-y-0 lg:space-y-1">
                {CATALOG.filter((t) => t.category === cat).map((t) => (
                  <li key={t.slug}>
                    <Link href={`/${lang}/${t.slug}`} className="text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">
                      {c.templateNames[t.id]}
                    </Link>
                  </li>
                ))}
                {cat === 'career' && lang === 'en' && (
                  <li>
                    <Link href="/en/cv/examples" className="text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">
                      CV examples by job
                    </Link>
                  </li>
                )}
                {cat === 'career' && lang === 'fr' && (
                  <li>
                    <Link href="/fr/cv/exemples" className="text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">
                      Exemples de CV par métier
                    </Link>
                  </li>
                )}
                {cat === 'career' && lang === 'fr' && (
                  <li>
                    <Link href="/fr/cv/lettre-de-motivation" className="text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">
                      Lettre de motivation gratuite
                    </Link>
                  </li>
                )}
                {cat === 'career' && lang === 'fr' && (
                  <li>
                    <Link href="/fr/cv/conseils" className="text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">
                      Conseils pour faire un CV
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          ))}
        </nav>

        <nav aria-label={c.footer.product} className="space-y-2">
          <p className="font-bold text-slate-800 dark:text-slate-200">{c.footer.product}</p>
          <ul className="space-y-0 lg:space-y-1.5">
            <li>
              <Link href={`/${lang}`} className="text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">
                {c.viewAll}
              </Link>
            </li>
            {/* Pricing stays hidden until Pro sales are open (PRO_ENABLED, set at build time). */}
            {PRO_ENABLED && (
              <li>
                <Link href={`/${lang}/pricing`} className="text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">
                  {c.footer.pricing}
                </Link>
              </li>
            )}
            <li>
              <a
                href={(CONVERSAPDF[lang as InterfaceLang] || CONVERSAPDF.en).href}
                className="text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
              >
                {(CONVERSAPDF[lang as InterfaceLang] || CONVERSAPDF.en).label}
              </a>
            </li>
            <li>
              <a href={`mailto:${siteConfig.contact.email}`} className="text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">
                {c.footer.contact}
              </a>
            </li>
          </ul>
        </nav>

        <nav aria-label={c.footer.legal} className="space-y-2">
          <p className="font-bold text-slate-800 dark:text-slate-200">{c.footer.legal}</p>
          <ul className="space-y-0 lg:space-y-1.5">
            <li>
              <Link href={`/${lang}/legal`} className="text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">
                {c.footer.legalNotice}
              </Link>
            </li>
            <li>
              <Link href={`/${lang}/terms`} className="text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">
                {c.footer.terms}
              </Link>
            </li>
            <li>
              <Link href={`/${lang}/refund`} className="text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">
                {c.footer.refund}
              </Link>
            </li>
            <li>
              <Link href={`/${lang}/privacy`} className="text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">
                {c.footer.privacy}
              </Link>
            </li>
            <li>
              <CookieSettingsLink
                lang={lang}
                className="text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
              />
            </li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-slate-100 dark:border-slate-800 py-4 text-center text-[11px] text-slate-400">
        © {year} {siteConfig.name}. {c.footer.rights}
      </div>
    </footer>
  );
}
