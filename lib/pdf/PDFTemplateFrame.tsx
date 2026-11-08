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
    paddingTop: 30,
    paddingBottom: 22,
    paddingHorizontal: 42, // ~15 mm margins
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
    paddingBottom: 8,
    borderBottomWidth: 0.75,
    borderBottomColor: '#E2E8F0',
    marginBottom: 8,
  },
  headerBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoImage: {
    maxHeight: 28,
    maxWidth: 120,
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
    fontSize: 7.5,
    color: '#64748B',
    marginTop: 1,
  },
  headerMeta: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 2,
  },
  clientBadge: {
    backgroundColor: '#F8FAFC',
    borderWidth: 0.75,
    borderColor: '#E2E8F0',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  clientText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  subtitleRight: {
    fontSize: 7.5,
    fontWeight: 'medium',
    color: '#64748B',
    letterSpacing: 0.4,
  },
  main: {
    flex: 1,
    flexDirection: 'column',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 6,
    borderTopWidth: 0.75,
    borderTopColor: '#E2E8F0',
    marginTop: 6,
  },
  footerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  footerCompany: {
    fontSize: 7.5,
    fontWeight: 'bold',
    color: '#334155',
  },
  footerDot: {
    fontSize: 7,
    color: '#CBD5E1',
  },
  footerNotice: {
    fontSize: 7,
    color: '#64748B',
  },
  footerPage: {
    fontSize: 7,
    fontWeight: 'medium',
    color: '#94A3B8',
  },
  watermarkBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  watermarkTextCol: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  watermarkText: {
    fontSize: 6.5,
    color: '#64748B',
  },
  watermarkDomain: {
    fontSize: 6.5,
    fontWeight: 'bold',
    color: '#4F46E5',
  },
  proVerified: {
    fontSize: 7,
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
          {brandKit.logoUrl ? (
            <Image
              src={brandKit.logoUrl}
              style={styles.logoImage}
            />
          ) : (
            <View style={styles.wordmarkContainer}>
              <Text style={styles.wordmarkName}>
                {brandKit.companyName || 'LogoLoom Studio'}
              </Text>
              {brandKit.tagline ? (
                <Text style={styles.tagline}>{brandKit.tagline}</Text>
              ) : null}
            </View>
          )}

          {brandKit.logoUrl && brandKit.companyName && (
            <View style={styles.wordmarkContainer}>
              <Text style={[styles.wordmarkName, { fontSize: 11 }]}>
                {brandKit.companyName}
              </Text>
              {brandKit.tagline ? (
                <Text style={styles.tagline}>{brandKit.tagline}</Text>
              ) : null}
            </View>
          )}
        </View>

        <View style={styles.headerMeta}>
          {brandKit.clientName ? (
            <View style={styles.clientBadge}>
              <Text style={styles.clientText}>
                {brandKit.clientName}
              </Text>
            </View>
          ) : null}
          {subtitleRight && (
            <Text style={styles.subtitleRight}>{subtitleRight}</Text>
          )}
        </View>
      </View>

      {/* Main Content Area */}
      <View style={styles.main}>{children}</View>

      {/* Editorial Print-Ready Footer */}
      <View style={styles.footer}>
        {/* Left: Professional metadata */}
        <View style={styles.footerLeft}>
          <Text style={styles.footerCompany}>
            {brandKit.companyName || 'LogoLoom Document'}
          </Text>
          <Text style={styles.footerDot}>•</Text>
          <Text style={styles.footerNotice}>{t.footer.confidential}</Text>
          <Text style={styles.footerDot}>•</Text>
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
                size={34} // 12 mm
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
