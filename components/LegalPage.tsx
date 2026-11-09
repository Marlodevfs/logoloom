import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { SiteFooter } from '@/components/SiteFooter';
import { getSiteChrome } from '@/lib/i18n/site-chrome';

export interface LegalSection {
  title: string;
  body: (string | null | undefined)[];
}

/** Simple, readable layout shared by the legal notice and privacy policy pages. */
export function LegalPage({
  lang,
  title,
  updated,
  sections,
  backLabel,
}: {
  lang: string;
  title: string;
  updated: string;
  sections: LegalSection[];
  backLabel: string;
}) {
  const c = getSiteChrome(lang);
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      <header className="border-b border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link href={`/${lang}`} className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">
            <ArrowLeft className="w-4 h-4" />
            <span>{backLabel}</span>
          </Link>
          <Link href={`/${lang}`} className="font-extrabold tracking-tight">LogoLoom</Link>
        </div>
      </header>
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{title}</h1>
        <p className="text-xs text-slate-500 mt-2">{updated}</p>
        <div className="mt-8 space-y-8">
          {sections.map((s) => {
            const lines = s.body.filter(Boolean) as string[];
            if (lines.length === 0) return null;
            return (
              <section key={s.title} className="space-y-2">
                <h2 className="text-base font-bold">{s.title}</h2>
                {lines.map((line, i) => (
                  <p key={i} className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{line}</p>
                ))}
              </section>
            );
          })}
        </div>
        <p className="sr-only">{c.footer.legal}</p>
      </main>
      <SiteFooter lang={lang} />
    </div>
  );
}
