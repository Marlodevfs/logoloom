import type { BusinessCardContent } from '@/types';
import { CARD_SIZES, MM, cardContactLines, cardInitials, cardQrTarget, qrOnBack } from '@/lib/i18n/card-data';
import { ensureAccessibleOnWhite, getOptimalTextColor } from '@/lib/color-engine';

/**
 * One layout engine for the business card, in PDF points. The HTML preview
 * (components/card/CardFace.tsx) and the PDF (lib/pdf/VectorBusinessCardPDF.tsx)
 * both draw these elements, so what you see is exactly what prints.
 */
export type CardEl =
  | { kind: 'rect'; x: number; y: number; w: number; h: number; fill: string; radius?: number }
  | {
      kind: 'text';
      x: number;
      y: number;
      w: number;
      text: string;
      size: number;
      weight: 'bold' | 'medium' | 'normal';
      color: string;
      align: 'left' | 'center';
      spacing?: number;
    }
  | { kind: 'logo'; x: number; y: number; w: number; h: number; align: 'left' | 'center' }
  | { kind: 'initials'; x: number; y: number; size: number; text: string; color: string; bg: string | null }
  | { kind: 'qr'; x: number; y: number; size: number; text: string }
  | { kind: 'line'; x: number; y: number; w: number; color: string };

export interface CardDrawing {
  /** Outer size, bleed included. */
  W: number;
  H: number;
  els: CardEl[];
}

export interface CardStyle {
  accent: string;
  logoUrl: string | null;
}

const INK = '#0F172A';
const MUTED = '#475569';
const LH = 1.25;

/** Whether this card has a back side to print. */
export function cardHasBack(c: BusinessCardContent): boolean {
  return Boolean(c.backSide || (c.showQr && qrOnBack(c) && cardQrTarget(c)));
}

export function drawCard(c: BusinessCardContent, side: 'front' | 'back', style: CardStyle, bleedMm = 0): CardDrawing {
  const size = CARD_SIZES[c.cardSize] || CARD_SIZES.eu;
  const b = bleedMm * MM;
  const w = size.w * MM;
  const h = size.h * MM;
  const W = w + 2 * b;
  const H = h + 2 * b;
  const P = 5 * MM; // safe margin inside the trim
  const accent = style.accent || '#1F5C4A';
  const onAccent = getOptimalTextColor(accent);
  const accentText = ensureAccessibleOnWhite(accent);
  const qr = c.showQr ? cardQrTarget(c) : '';
  const initials = cardInitials(c.fullName) || '•';
  const els: CardEl[] = [];

  // Trim box origin: everything below is placed relative to (b, b).
  const X = (x: number) => b + x;
  const Y = (y: number) => b + y;

  const text = (x: number, y: number, width: number, value: string, sz: number, weight: 'bold' | 'medium' | 'normal', color: string, align: 'left' | 'center' = 'left', spacing?: number) => {
    if (!value?.trim()) return 0;
    els.push({ kind: 'text', x: X(x), y: Y(y), w: width, text: value.trim(), size: sz, weight, color, align, spacing });
    return sz * LH;
  };

  if (side === 'back') {
    els.push({ kind: 'rect', x: 0, y: 0, w: W, h: H, fill: accent });
    const qrBack = c.showQr && qrOnBack(c) && qr ? qr : '';
    const markH = style.logoUrl ? 34 : 30;
    const textH = c.backText?.trim() ? 7.8 * LH + 6 : 0;
    const qrSize = 15 * MM;
    const qrH = qrBack ? qrSize + 8 + 8 : 0;
    let y = (h - (markH + textH + qrH)) / 2;
    if (style.logoUrl) {
      const box = 34;
      els.push({ kind: 'rect', x: X((w - 70) / 2), y: Y(y), w: 70, h: box, fill: '#FFFFFF', radius: 4 });
      els.push({ kind: 'logo', x: X((w - 62) / 2), y: Y(y + 4), w: 62, h: box - 8, align: 'center' });
    } else {
      els.push({ kind: 'initials', x: X((w - 30) / 2), y: Y(y), size: 30, text: initials, color: onAccent, bg: null });
    }
    y += markH;
    if (textH) {
      y += 6;
      text(P, y, w - 2 * P, c.backText, 7.8, 'medium', onAccent, 'center');
      y += 7.8 * LH;
    }
    if (qrBack) {
      y += 8;
      els.push({ kind: 'rect', x: X((w - qrSize - 8) / 2), y: Y(y), w: qrSize + 8, h: qrSize + 8, fill: '#FFFFFF', radius: 3 });
      els.push({ kind: 'qr', x: X((w - qrSize) / 2), y: Y(y + 4), size: qrSize, text: qrBack });
    }
    return { W, H, els };
  }

  // Front
  els.push({ kind: 'rect', x: 0, y: 0, w: W, h: H, fill: '#FFFFFF' });
  const contacts = cardContactLines(c);
  const contactSize = 6.6;
  const contactStep = 9.4;

  if (c.layout === 'band') {
    const panel = Math.round(w * 0.32);
    els.push({ kind: 'rect', x: 0, y: 0, w: b + panel, h: H, fill: accent });
    if (style.logoUrl) {
      const box = panel - 18;
      els.push({ kind: 'rect', x: X(9), y: Y((h - box) / 2), w: box, h: box, fill: '#FFFFFF', radius: 4 });
      els.push({ kind: 'logo', x: X(13), y: Y((h - box) / 2 + 4), w: box - 8, h: box - 8, align: 'center' });
    } else {
      els.push({ kind: 'initials', x: X((panel - 34) / 2), y: Y((h - 34) / 2), size: 34, text: initials, color: onAccent, bg: null });
    }
    const x = panel + 4 * MM;
    const right = w - P;
    const qrSize = 13 * MM;
    let y = P;
    y += text(x, y, right - x, c.fullName, 11, 'bold', INK);
    y += 1;
    y += text(x, y, right - x, c.jobTitle, 7.4, 'medium', accentText);
    text(x, y, right - x, c.company, 7.2, 'normal', MUTED);
    const textRight = qr ? right - qrSize - 5 : right;
    contacts.forEach((line, i) => {
      text(x, h - P - (contacts.length - i) * contactStep + 1, textRight - x, line, contactSize, 'normal', MUTED);
    });
    if (qr) els.push({ kind: 'qr', x: X(right - qrSize), y: Y(h - P - qrSize), size: qrSize, text: qr });
    return { W, H, els };
  }

  if (c.layout === 'centered') {
    let y = P + 1;
    if (style.logoUrl) {
      els.push({ kind: 'logo', x: X((w - 80) / 2), y: Y(y), w: 80, h: 22, align: 'center' });
    } else {
      els.push({ kind: 'initials', x: X((w - 24) / 2), y: Y(y), size: 24, text: initials, color: '#FFFFFF', bg: accent });
    }
    y += 29;
    y += text(P, y, w - 2 * P, c.fullName, 11, 'bold', INK, 'center');
    y += 1;
    y += text(P, y, w - 2 * P, [c.jobTitle, c.company].filter((s) => s?.trim()).join(' · '), 7.4, 'medium', accentText, 'center');
    els.push({ kind: 'line', x: X((w - 22) / 2), y: Y(y + 4), w: 22, color: accent });
    contacts.forEach((line, i) => {
      text(P, h - P - (contacts.length - i) * contactStep + 1, w - 2 * P, line, contactSize, 'normal', MUTED, 'center');
    });
    return { W, H, els };
  }

  // classic
  const bar = 2 * MM;
  els.push({ kind: 'rect', x: 0, y: 0, w: b + bar, h: H, fill: accent });
  const x = bar + 4 * MM;
  const right = w - P;
  const qrSize = 15 * MM;
  let y = P;
  if (style.logoUrl) {
    els.push({ kind: 'logo', x: X(x), y: Y(y), w: 70, h: 20, align: 'left' });
  } else {
    els.push({ kind: 'initials', x: X(x), y: Y(y), size: 22, text: initials, color: '#FFFFFF', bg: accent });
  }
  y += 27;
  y += text(x, y, right - x, c.fullName, 11.5, 'bold', INK);
  y += 1;
  y += text(x, y, right - x, c.jobTitle, 7.6, 'medium', accentText);
  text(x, y, right - x, c.company, 7.4, 'normal', MUTED);
  const textRight = qr ? right - qrSize - 6 : right;
  contacts.forEach((line, i) => {
    text(x, h - P - (contacts.length - i) * contactStep + 1, textRight - x, line, contactSize, 'normal', MUTED);
  });
  if (qr) els.push({ kind: 'qr', x: X(right - qrSize), y: Y(h - P - qrSize), size: qrSize, text: qr });
  return { W, H, els };
}
