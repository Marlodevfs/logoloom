// LogoLoom Color & Contrast Engine

export interface ColorAnalysisResult {
  dominantHex: string;
  isAccessibleOnWhite: boolean;
  contrastRatio: number; // Ratio against #FFFFFF
  suggestedHex: string; // Adjusted if contrast is < 4.5:1
  contrastTextColor: '#FFFFFF' | '#000000'; // For text on top of this color
}

export const CURATED_PALETTES = [
  { name: 'Royal Indigo', hex: '#4F46E5' },
  { name: 'Deep Emerald', hex: '#059669' },
  { name: 'Warm Terracotta', hex: '#EA580C' },
  { name: 'Midnight Navy', hex: '#1E293B' },
  { name: 'Rosewood', hex: '#E11D48' },
  { name: 'Nordic Teal', hex: '#0D9488' },
  { name: 'Imperial Violet', hex: '#7C3AED' },
  { name: 'Raw Umber', hex: '#78350F' },
];

/**
 * Convert RGB to Hex string
 */
export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

/**
 * Convert Hex string to RGB
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  let clean = hex.replace('#', '');
  if (clean.length === 3) {
    clean = clean.split('').map(c => c + c).join('');
  }
  const num = parseInt(clean, 16);
  if (isNaN(num)) return { r: 79, g: 70, b: 229 }; // fallback indigo
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

/**
 * Relative luminance formula as defined by WCAG 2.1
 */
export function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(v => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Contrast ratio between two hex colors (1:1 to 21:1)
 */
export function getContrastRatio(hex1: string, hex2: string): number {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

/**
 * Optimal text color (black or white) to render directly on top of given background
 */
export function getOptimalTextColor(backgroundHex: string): '#FFFFFF' | '#000000' {
  const ratioWhite = getContrastRatio(backgroundHex, '#FFFFFF');
  const ratioBlack = getContrastRatio(backgroundHex, '#000000');
  return ratioWhite >= ratioBlack ? '#FFFFFF' : '#000000';
}

/**
 * Darkens a color progressively until it reaches >= 4.5:1 contrast against white (#FFFFFF)
 */
export function ensureAccessibleOnWhite(hex: string): string {
  const rgb = hexToRgb(hex);
  let ratio = getContrastRatio(hex, '#FFFFFF');
  if (ratio >= 4.5) return hex;

  let { r, g, b } = rgb;
  // Reduce RGB iteratively to increase contrast against white
  for (let i = 0; i < 40; i++) {
    r = Math.max(0, Math.floor(r * 0.92));
    g = Math.max(0, Math.floor(g * 0.92));
    b = Math.max(0, Math.floor(b * 0.92));
    const currentHex = rgbToHex(r, g, b);
    ratio = getContrastRatio(currentHex, '#FFFFFF');
    if (ratio >= 4.5) return currentHex;
  }
  return '#1E293B'; // Fallback to safe dark slate
}

/**
 * Extract dominant color from image data or image element using HTML5 Canvas
 */
export async function extractDominantColorFromImage(imageSrc: string): Promise<ColorAnalysisResult> {
  return new Promise((resolve) => {
    // If running in SSR or window not defined
    if (typeof window === 'undefined') {
      resolve({
        dominantHex: '#4F46E5',
        isAccessibleOnWhite: true,
        contrastRatio: 6.2,
        suggestedHex: '#4F46E5',
        contrastTextColor: '#FFFFFF',
      });
      return;
    }

    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Canvas context unavailable');

        // Scale down to sample colors efficiently
        const size = 64;
        canvas.width = size;
        canvas.height = size;
        ctx.drawImage(img, 0, 0, size, size);

        const imgData = ctx.getImageData(0, 0, size, size).data;
        const colorBuckets: { [key: string]: { r: number; g: number; b: number; count: number; score: number } } = {};

        for (let i = 0; i < imgData.length; i += 4) {
          const r = imgData[i];
          const g = imgData[i + 1];
          const b = imgData[i + 2];
          const a = imgData[i + 3];

          // Ignore transparent or translucent pixels
          if (a < 180) continue;

          // Ignore extreme near-white (backgrounds) or extreme near-black
          const isNearWhite = r > 240 && g > 240 && b > 240;
          const isNearBlack = r < 20 && g < 20 && b < 20;

          // Quantize color to 16-step bins
          const qr = Math.round(r / 16) * 16;
          const qg = Math.round(g / 16) * 16;
          const qb = Math.round(b / 16) * 16;
          const key = `${qr},${qg},${qb}`;

          // Calculate saturation to prefer vibrant brand colors over dull grays
          const max = Math.max(r, g, b);
          const min = Math.min(r, g, b);
          const saturation = max === 0 ? 0 : (max - min) / max;

          // Weight score: boost saturated chromatic colors
          let weight = 1 + saturation * 2.5;
          if (isNearWhite || isNearBlack) {
            weight *= 0.1;
          }

          if (!colorBuckets[key]) {
            colorBuckets[key] = { r, g, b, count: 0, score: 0 };
          }
          colorBuckets[key].count += 1;
          colorBuckets[key].score += weight;
        }

        // Find bucket with highest score
        let bestKey: string | null = null;
        let maxScore = -1;
        for (const key in colorBuckets) {
          if (colorBuckets[key].score > maxScore) {
            maxScore = colorBuckets[key].score;
            bestKey = key;
          }
        }

        let dominantHex = '#4F46E5';
        if (bestKey && colorBuckets[bestKey]) {
          const bucket = colorBuckets[bestKey];
          dominantHex = rgbToHex(bucket.r, bucket.g, bucket.b);
        }

        const contrastRatio = Number(getContrastRatio(dominantHex, '#FFFFFF').toFixed(2));
        const isAccessibleOnWhite = contrastRatio >= 4.5;
        const suggestedHex = isAccessibleOnWhite ? dominantHex : ensureAccessibleOnWhite(dominantHex);
        const contrastTextColor = getOptimalTextColor(dominantHex);

        resolve({
          dominantHex,
          isAccessibleOnWhite,
          contrastRatio,
          suggestedHex,
          contrastTextColor,
        });
      } catch (err) {
        console.warn('Color extraction failed, using default', err);
        resolve({
          dominantHex: '#4F46E5',
          isAccessibleOnWhite: true,
          contrastRatio: 6.2,
          suggestedHex: '#4F46E5',
          contrastTextColor: '#FFFFFF',
        });
      }
    };

    img.onerror = () => {
      resolve({
        dominantHex: '#4F46E5',
        isAccessibleOnWhite: true,
        contrastRatio: 6.2,
        suggestedHex: '#4F46E5',
        contrastTextColor: '#FFFFFF',
      });
    };

    img.src = imageSrc;
  });
}
