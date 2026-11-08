import React from 'react';
import { Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { BrandKit } from '@/types';
import { DOCUMENT_TRANSLATIONS } from '@/lib/i18n/documents';
import { VectorQR } from './VectorQR';

interface PDFTemplateFrameProps {
  brandKit: BrandKit;
  children: React.ReactNode;
  subtitleRight?: string;
  orientation?: 'portrait' | 'landscape';
  pageNumber?: number;
  totalPages?: number;
}

function normalizeLogoUrl(url: string | null | undefined): string | null {
  if (!url || typeof url !== 'string' || url.trim() === '') return null;
  const trimmed = url.trim();
  if (trimmed.startsWith('data:image/svg+xml;utf8,') || trimmed.startsWith('data:image/svg+xml,')) {
    const rawSvg = decodeURIComponent(trimmed.replace(/^data:image\/svg\+xml(;utf8)?,/, ''));
    const b64 = typeof btoa !== 'undefined' ? btoa(rawSvg) : Buffer.from(rawSvg).toString('base64');
    return `data:image/svg+xml;base64,${b64}`;
  }
  return trimmed;
}

const styles = StyleSheet.create({
  pagePortrait: {
    fontFamily: 'Roboto',
    backgroundColor: '#FFFFFF',
    color: '#0F172A',
    paddingTop: 36,
    paddingBottom: 28,
    paddingHorizontal: 42, // ~15 mm margins
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative',
  },
  pageLandscape: {
    fontFamily: 'Roboto',
    backgroundColor: '#FFFFFF',
    color: '#0F172A',
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 36, // ~13 mm margins
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative',
  },
  accentBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3.5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 6,
    borderBottomWidth: 0.75,
    borderBottomColor: '#CBD5E1',
    marginBottom: 6,
  },
  headerBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoContainer: {
    height: 28,
    maxWidth: 130,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  logoImage: {
    height: '100%',
    maxWidth: 130,
    objectFit: 'contain',
  },
  wordmarkContainer: {
    flexDirection: 'column',
  },
  wordmarkName: {
    fontFamily: 'Georgia',
    fontSize: 13,
    fontWeight: 'bold',
    color: '#0F172A',
    letterSpacing: -0.2,
  },
  tagline: {
    fontFamily: 'Roboto',
    fontSize: 8,
    color: '#64748B',
    marginTop: 1,
  },
  headerMeta: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 3,
  },
  clientBadge: {
    backgroundColor: '#F8FAFC',
    borderWidth: 0.75,
    borderColor: '#CBD5E1',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  clientText: {
    fontFamily: 'Roboto',
    fontSize: 8,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  subtitleRight: {
    fontFamily: 'Roboto',
    fontSize: 8,
    fontWeight: 'bold',
    color: '#64748B',
    letterSpacing: 0.4,
  },
  main: {
    flexGrow: 1,
    flexDirection: 'column',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 5,
    borderTopWidth: 0.75,
    borderTopColor: '#CBD5E1',
    marginTop: 4,
  },
  footerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  footerCompany: {
    fontFamily: 'Roboto',
    fontSize: 8,
    fontWeight: 'bold',
    color: '#334155',
  },
  footerDot: {
    fontFamily: 'Roboto',
    fontSize: 8,
    color: '#CBD5E1',
  },
  footerPage: {
    fontFamily: 'Roboto',
    fontSize: 8,
    fontWeight: 'medium',
    color: '#64748B',
  },
  watermarkBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  watermarkTextCol: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  watermarkText: {
    fontFamily: 'Roboto',
    fontSize: 8,
    color: '#64748B',
  },
  watermarkDomain: {
    fontFamily: 'Roboto',
    fontSize: 8,
    fontWeight: 'bold',
    color: '#4F46E5',
  },
  proVerified: {
    fontFamily: 'Roboto',
    fontSize: 8,
    fontWeight: 'bold',
    color: '#94A3B8',
    letterSpacing: 0.5,
  },
});

export const PDFTemplateFrame: React.FC<PDFTemplateFrameProps> = ({
  brandKit,
  children,
  subtitleRight,
  orientation = 'portrait',
  pageNumber,
  totalPages,
}) => {
  const isA4 = brandKit.paperSize === 'a4';
  const docLang = brandKit.documentLang || 'en';
  const t = DOCUMENT_TRANSLATIONS[docLang] || DOCUMENT_TRANSLATIONS.en;
  const isLandscape = orientation === 'landscape';

  const normalizedLogo = normalizeLogoUrl(brandKit.logoUrl);

  const pageString = pageNumber && totalPages
    ? `${t.footer.page.replace(/1/g, '').replace(/of/g, '').replace(/sur/g, '').trim()} ${pageNumber} / ${totalPages}`
    : t.footer.page;

  return (
    <Page
      size={isA4 ? 'A4' : 'LETTER'}
      orientation={orientation}
      style={isLandscape ? styles.pageLandscape : styles.pagePortrait}
    >
      {/* Top Accent Color Line */}
      <View
        style={[
          styles.accentBar,
          { backgroundColor: brandKit.brandColor || '#4F46E5' },
        ]}
      />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerBrand}>
          {normalizedLogo ? (
            <View style={styles.logoContainer}>
              <Image
                src={normalizedLogo}
                style={styles.logoImage}
              />
            </View>
          ) : null}

          {brandKit.companyName ? (
            <View style={styles.wordmarkContainer}>
              <Text
                style={[
                  styles.wordmarkName,
                  normalizedLogo ? { fontSize: 11 } : { fontSize: 13 },
                ]}
              >
                {brandKit.companyName}
              </Text>
              {brandKit.tagline ? (
                <Text style={styles.tagline}>{brandKit.tagline}</Text>
              ) : null}
            </View>
          ) : null}
        </View>

        <View style={styles.headerMeta}>
          {brandKit.clientName ? (
            <View style={styles.clientBadge}>
              <Text style={styles.clientText}>
                {brandKit.clientName}
              </Text>
            </View>
          ) : null}
          {subtitleRight ? (
            <Text style={styles.subtitleRight}>{subtitleRight}</Text>
          ) : null}
        </View>
      </View>

      {/* Main Content Area */}
      <View style={styles.main}>{children}</View>

      {/* Editorial Print-Ready Footer */}
      <View style={styles.footer}>
        {/* Left: Professional metadata */}
        <View style={styles.footerLeft}>
          {brandKit.companyName ? (
            <>
              <Text style={styles.footerCompany}>
                {brandKit.companyName}
              </Text>
              <Text style={styles.footerDot}>•</Text>
            </>
          ) : null}
          <Text style={styles.footerPage}>{pageString}</Text>
        </View>

        {/* Right: Free LogoLoom Watermark (12 mm vector QR) or Clean Pro */}
        <View>
          {brandKit.removeWatermark ? (
            <Text style={styles.proVerified}>VERIFIED PRINT DOCUMENT</Text>
          ) : (
            <View style={styles.watermarkBadge}>
              <VectorQR
                text="https://logoloom.app"
                size={35} // ~12.3 mm (at least 12 mm with quiet zone)
                darkColor="#475569"
                lightColor="#FFFFFF"
              />
              <View style={styles.watermarkTextCol}>
                <Text style={styles.watermarkText}>{t.footer.madeWith}</Text>
                <Text style={styles.watermarkDomain}>logoloom.app</Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </Page>
  );
};
