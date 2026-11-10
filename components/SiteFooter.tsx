import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { getSiteChrome } from '@/lib/i18n/site-chrome';
import { CATALOG, CATEGORY_COPY, CATEGORY_ORDER } from '@/lib/catalog';
import type { InterfaceLang } from '@/types';
import { BuyMeACoffeeButton } from '@/components/BuyMeACoffee';
import { CookieSettingsLink } from '@/components/CookieConsent';

/** Site-wide footer: product links, legal pages and contact. Server component. */
export function SiteFooter({ lang, withStickyBar = false }: { lang: string; withStickyBar?: boolean }) {
  const c = getSiteChrome(lang);
  const year = new Date().getFullYear();
  const cats = CATEGORY_COPY[lang as InterfaceLang] || CATEGORY_COPY.en;

  return (
    <footer className={`border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 ${withStickyBar ? 'pb-24 lg:pb-0' : ''}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-2 sm:grid-cols-4 gap-8 text-xs">
        <div className="col-span-2 sm:col-span-1 space-y-2">
          <p className="font-extrabold text-sm text-slate-900 dark:text-white">{siteConfig.name}</p>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{c.slogan}</p>
          <div className="pt-2">
            <BuyMeACoffeeButton lang={lang} withHint />
          </div>
        </div>

        <nav aria-label={c.footer.templates} className="space-y-2">
          <p className="font-bold text-slate-800 dark:text-slate-200">{c.footer.templates}</p>
          {CATEGORY_ORDER.map((cat) => (
            <div key={cat} className="space-y-1">
              <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 pt-1">{cats[cat].name}</p>
              <ul className="space-y-1">
                {CATALOG.filter((t) => t.category === cat).map((t) => (
                  <li key={t.slug}>
                    <Link href={`/${lang}/${t.slug}`} className="text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">
                      {c.templateNames[t.id]}
                    </Link>
                  </li>
                ))}
                {cat === 'career' && lang === 'fr' && (
                  <li>
                    <Link href="/fr/cv/exemples" className="text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">
                      Exemples de CV par métier
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          ))}
        </nav>

        <nav aria-label={c.footer.product} className="space-y-2">
          <p className="font-bold text-slate-800 dark:text-slate-200">{c.footer.product}</p>
          <ul className="space-y-1.5">
            <li>
              <Link href={`/${lang}`} className="text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">
                {c.viewAll}
              </Link>
            </li>
            <li>
              <Link href={`/${lang}/pricing`} className="text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">
                {c.footer.pricing}
              </Link>
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
          <ul className="space-y-1.5">
            <li>
              <Link href={`/${lang}/legal`} className="text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">
                {c.footer.legalNotice}
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
