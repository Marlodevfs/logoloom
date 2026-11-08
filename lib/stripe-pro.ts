/**
 * LogoLoom Pro Module
 * Isolated subscription management & price configuration
 */

export const PRO_CONFIG = {
  priceMonthlyUsd: 9,
  priceMonthlyEur: 9,
  priceLabelUsd: '$9',
  priceLabelEur: '9 €',
  interval: 'month' as const,
  stripePriceId: process.env.STRIPE_PRICE_ID_MONTHLY || '',
};

export interface ProStatus {
  isPro: boolean;
  proSince?: string;
  source?: 'stripe' | 'test_mode';
}

const PRO_STORAGE_KEY = 'logoloom_pro_status_v1';

export function getLocalProStatus(): ProStatus {
  if (typeof window === 'undefined') return { isPro: false };
  try {
    const raw = localStorage.getItem(PRO_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    // ignore
  }
  return { isPro: false };
}

export function setLocalProStatus(status: ProStatus): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PRO_STORAGE_KEY, JSON.stringify(status));
  } catch (e) {
    // ignore
  }
}
