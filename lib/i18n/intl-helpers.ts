import { DocumentLang, WeekStartDay } from '@/types';

const LOCALE_MAP: Record<DocumentLang, string> = {
  en: 'en-US',
  fr: 'fr-FR',
  de: 'de-DE',
  es: 'es-ES',
  it: 'it-IT',
  pt: 'pt-PT',
};

/**
 * Returns localized weekday names starting on Monday or Sunday
 */
export function getLocalizedWeekdays(
  lang: DocumentLang = 'en',
  weekStart: WeekStartDay = 'monday',
  format: 'narrow' | 'short' | 'long' = 'short'
): string[] {
  const locale = LOCALE_MAP[lang] || 'en-US';
  const formatter = new Intl.DateTimeFormat(locale, { weekday: format });

  // 2026-01-04 is a Sunday, 2026-01-05 is a Monday
  const startDayIndex = weekStart === 'sunday' ? 4 : 5;
  const days: string[] = [];

  for (let i = 0; i < 7; i++) {
    const d = new Date(Date.UTC(2026, 0, startDayIndex + i));
    days.push(formatter.format(d));
  }

  return days;
}

/**
 * Returns localized month names (12 months)
 */
export function getLocalizedMonths(
  lang: DocumentLang = 'en',
  format: 'short' | 'long' = 'long'
): string[] {
  const locale = LOCALE_MAP[lang] || 'en-US';
  const formatter = new Intl.DateTimeFormat(locale, { month: format });

  const months: string[] = [];
  for (let i = 0; i < 12; i++) {
    const d = new Date(Date.UTC(2026, i, 15));
    months.push(formatter.format(d));
  }

  return months;
}

/**
 * Formats a currency amount with the user-selected currency or symbol
 */
export function formatCurrencyAmount(
  amount: number,
  currency: string = '€',
  lang: DocumentLang = 'en'
): string {
  const locale = LOCALE_MAP[lang] || 'en-US';
  const numFormatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  // Common ISO code vs symbol placement
  if (currency === '€' || currency === 'EUR') {
    return lang === 'en' ? `€${numFormatted}` : `${numFormatted} €`;
  }
  if (currency === '$' || currency === 'USD') {
    return `$${numFormatted}`;
  }
  if (currency === '£' || currency === 'GBP') {
    return `£${numFormatted}`;
  }
  if (currency === 'CHF') {
    return `CHF ${numFormatted}`;
  }
  return `${currency} ${numFormatted}`;
}

/**
 * Formats a date using Intl.DateTimeFormat
 */
export function formatLocalizedDate(
  date: Date = new Date(),
  lang: DocumentLang = 'en',
  options?: Intl.DateTimeFormatOptions
): string {
  const locale = LOCALE_MAP[lang] || 'en-US';
  const opts: Intl.DateTimeFormatOptions = options || {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  return new Intl.DateTimeFormat(locale, opts).format(date);
}
