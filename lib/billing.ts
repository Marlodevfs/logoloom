import type { LineItemCustom } from '@/types';

export interface BillingTotals {
  subtotal: number;
  taxAmount: number;
  total: number;
}

const round2 = (n: number) => Math.round(n * 100) / 100;

/** Totals for a quote/invoice. VAT-exempt documents carry no VAT at all. */
export function computeTotals(items: LineItemCustom[], taxRate: number, vatExempt?: boolean): BillingTotals {
  const subtotal = round2(
    items.reduce((acc, it) => acc + (Number(it.quantity) || 0) * (Number(it.unitPrice) || 0), 0)
  );
  const rate = vatExempt ? 0 : Number(taxRate) || 0;
  const taxAmount = round2((subtotal * rate) / 100);
  return { subtotal, taxAmount, total: round2(subtotal + taxAmount) };
}

/** Max line items that still fit on one page. */
export const MAX_LINE_ITEMS = 10;
