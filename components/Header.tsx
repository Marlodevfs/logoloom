'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { Globe, Moon, Sun, Sparkles, ShieldCheck, ChevronDown } from 'lucide-react';
import { InterfaceLang } from '@/types';
import { UI_TRANSLATIONS } from '@/lib/i18n/interface';

interface HeaderProps {
  interfaceLang: InterfaceLang;
  onLanguageChange: (lang: InterfaceLang) => void;
  onOpenProModal?: () => void;
}

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

  return (
    <header className="w-full border-b border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md sticky top-0 z-40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-15 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href={`/${interfaceLang}`} className="flex items-center space-x-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
                LogoLoom
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold border border-indigo-200/60 dark:border-indigo-800/40">
                app
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
              {t.appTagline}
            </p>
          </div>
        </Link>

        {/* Center: Zero Friction & Privacy Badge */}
        <div className="hidden md:flex items-center space-x-2 bg-slate-50 dark:bg-slate-800/80 px-3 py-1 rounded-full border border-slate-200/80 dark:border-slate-700/80 text-xs text-slate-600 dark:text-slate-300">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span className="font-medium text-[11px]">{t.privacyBadge}</span>
          <span className="text-slate-300 dark:text-slate-600">•</span>
          <span className="text-[11px] text-slate-400">Zero Signup</span>
        </div>

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
              <span>{currentLang.flag}</span>
              <span className="hidden sm:inline">{currentLang.label}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-1.5 w-40 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                {languages.map((l) => (
                  <Link
                    key={l.code}
                    href={`/${l.code}`}
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
          {onOpenProModal && (
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
