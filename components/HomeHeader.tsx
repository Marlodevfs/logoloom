'use client';

import { Header } from '@/components/Header';
import type { InterfaceLang } from '@/types';

/**
 * Header for pages without the editor (the homepage). Language links in the
 * header are real URLs, so no state needs to change when switching.
 */
export function HomeHeader({ lang }: { lang: InterfaceLang }) {
  return <Header interfaceLang={lang} onLanguageChange={() => {}} />;
}
