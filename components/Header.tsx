'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Globe, Moon, Sun, Sparkles, ChevronDown } from 'lucide-react';
import { InterfaceLang } from '@/types';
import { UI_TRANSLATIONS } from '@/lib/i18n/interface';
import { LogoMark } from '@/components/LogoMark';

interface HeaderProps {
  interfaceLang: InterfaceLang;
  onLanguageChange: (lang: InterfaceLang) => void;
  onOpenProModal?: () => void;
}

const NAV: Record<InterfaceLang, { cv: string; tools: string }> = {
  fr: { cv: 'Créer un CV', tools: 'Autres outils' },
  en: { cv: 'Create a CV', tools: 'Other tools' },
  de: { cv: 'Lebenslauf erstellen', tools: 'Weitere Tools' },
  es: { cv: 'Crear un CV', tools: 'Otras herramientas' },
  it: { cv: 'Crea un CV', tools: 'Altri strumenti' },
  pt: { cv: 'Criar um CV', tools: 'Outras ferramentas' },
};

export const Header: React.FC<HeaderProps> = ({
  interfaceLang,
  onLanguageChange,
  onOpenProModal,
}) => {
  const t = UI_TRANSLATIONS[interfaceLang] || UI_TRANSLATIONS.en;
  const [isDark, setIsDark] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isDarkMode =
        document.documentElement.classList.contains('dark') ||
        window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(isDarkMode);
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      }
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDarkMode = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const languages: { code: InterfaceLang; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'pt', label: 'Português', flag: '🇵🇹' },
    { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  ];

  const currentLang = languages.find((l) => l.code === interfaceLang) || languages[0];
  const pathname = usePathname() || '/';

  // Keep the visitor on the same page when switching language
  // (e.g. /fr/checklist -> /de/checklist instead of always going back home).
  const localizedHref = (code: InterfaceLang) => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length > 0 && languages.some((l) => l.code === segments[0])) {
      segments[0] = code;
    } else {
      segments.unshift(code);
    }
    // CV examples by job exist in French (/exemples) and English (/examples) only:
    // switch to the other hub, or land on the editor for the other languages.
    if (segments[2] === 'exemples' && code !== 'fr') return code === 'en' ? '/en/cv/examples' : `/${code}/cv`;
    if (segments[2] === 'examples' && code !== 'en') return code === 'fr' ? '/fr/cv/exemples' : `/${code}/cv`;
    return '/' + segments.join('/');
  };

  return (
    <header className="w-full border-b border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-50 transition-colors overflow-visible">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 py-2 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href={`/${interfaceLang}`} className="flex items-center space-x-3 group">
          <LogoMark className="w-9 h-9 shrink-0 group-hover:scale-105 transition-transform duration-200" />

          <div>
            <div className="flex items-center space-x-2">
              <span className="font-display font-semibold text-lg text-slate-900 dark:text-white">
                LogoLoom
              </span>
            </div>
            <p className="text-[11px] leading-tight text-slate-500 dark:text-slate-400 max-w-[42vw] sm:max-w-none truncate">
              {t.appTagline}
            </p>
          </div>
        </Link>

        {/* Center: the product first, the rest second */}
        <nav aria-label="Sections" className="hidden md:flex items-center gap-1 text-[15px]">
          <Link
            href={`/${interfaceLang}/cv`}
            className="px-3 py-1.5 rounded-md font-bold text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-800 transition-colors"
          >
            {NAV[interfaceLang]?.cv || NAV.en.cv}
          </Link>
          <Link
            href={`/${interfaceLang}#tools`}
            className="px-3 py-1.5 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800 transition-colors"
          >
            {NAV[interfaceLang]?.tools || NAV.en.tools}
          </Link>
        </nav>

        {/* Actions Right: Language Switcher, Dark Mode, Pro Button */}
        <div className="flex items-center space-x-2.5">
          {/* Crawlable Language Switcher Dropdown */}
          <div className="relative" ref={langMenuRef}>
            <button
              type="button"
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200/70 dark:bg-slate-800 dark:hover:bg-slate-700/70 rounded-lg px-2.5 py-1.5 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors"
              aria-label="Change language"
              aria-expanded={isLangOpen}
            >
              <Globe className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              <span aria-hidden="true">{currentLang.flag}</span>
              <span className="sm:hidden uppercase">{currentLang.code}</span>
              <span className="hidden sm:inline">{currentLang.label}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-1.5 w-40 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                {languages.map((l) => (
                  <Link
                    key={l.code}
                    href={localizedHref(l.code)}
                    hrefLang={l.code}
                    onClick={(e) => {
                      setIsLangOpen(false);
                      onLanguageChange(l.code);
                    }}
                    className={`flex items-center space-x-2.5 px-3 py-2 text-xs font-medium transition-colors ${
                      l.code === interfaceLang
                        ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 font-bold'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                    }`}
                  >
                    <span>{l.flag}</span>
                    <span>{l.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Dark / Light Toggle */}
          <button
            type="button"
            onClick={toggleDarkMode}
            className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={t.toggleTheme}
            aria-label={t.toggleTheme}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Pro Button */}
          {onOpenProModal && process.env.NEXT_PUBLIC_PRO_ENABLED === '1' && (
            <button
              type="button"
              onClick={onOpenProModal}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border border-amber-300/80 dark:border-amber-700/60 hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-colors shadow-2xs"
            >
              <Sparkles className="w-3 h-3 text-amber-600 dark:text-amber-400" />
              <span>{t.proBadge}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
