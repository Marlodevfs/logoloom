export const DESIGN_TOKENS = {
  colors: {
    hairline: '#E2E8F0',
    border: '#CBD5E1',
    textMain: '#0F172A',
    textMuted: '#64748B',
    textLight: '#94A3B8',
    bgWhite: '#FFFFFF',
    bgTint: '#F8FAFC',
  },
  typography: {
    fontFamily: 'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    titleSizePt: 18,
    headingSizePt: 12,
    subheadingSizePt: 10,
    bodySizePt: 8.5,
    minSizePt: 7.5,
  },
  lineWidths: {
    hairlinePt: 0.5,
    rulePt: 0.75,
    accentBarPt: 2.5,
  },
  pageDimensions: {
    a4: {
      webWidth: 794,
      webHeight: 1123,
      pdfWidth: 595.28,
      pdfHeight: 841.89,
    },
    letter: {
      webWidth: 816,
      webHeight: 1056,
      pdfWidth: 612,
      pdfHeight: 792,
    },
  },
  spacing: {
    webPadding: '36px 42px',
    pdfPaddingHorizontal: 36,
    pdfPaddingVertical: 32,
  },
} as const;
