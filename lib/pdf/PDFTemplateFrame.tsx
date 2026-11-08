import React from 'react';
import { Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { BrandKit } from '@/types';
import { DOCUMENT_TRANSLATIONS } from '@/lib/i18n/documents';
import { VectorQR } from './VectorQR';

interface PDFTemplateFrameProps {
  brandKit: BrandKit;
  children: React.ReactNode;
  subtitleRight?: string;
}

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Roboto',
    backgroundColor: '#FFFFFF',
    color: '#0F172A',
    paddingTop: 28,
    paddingBottom: 24,
    paddingHorizontal: 32,
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative',
  },
  accentBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    marginBottom: 8,
  },
  headerBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoImage: {
    height: 32,
    maxWidth: 110,
    objectFit: 'contain',
  },
  monogram: {
    width: 32,
    height: 32,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  monogramText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  brandTextContainer: {
    flexDirection: 'column',
  },
  companyName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  tagline: {
    fontSize: 8,
    color: '#64748B',
    marginTop: 1,
  },
  headerMeta: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  clientBadge: {
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginBottom: 2,
  },
  clientText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#334155',
  },
  subtitleRight: {
    fontSize: 7.5,
    color: '#94A3B8',
    letterSpacing: 0.5,
  },
  main: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingVertical: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    marginTop: 6,
  },
  footerMeta: {
    flexDirection: 'column',
  },
  footerCompany: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#334155',
  },
  footerNotice: {
    fontSize: 6.5,
    color: '#94A3B8',
    marginTop: 1,
  },
  footerQRContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  footerQRText: {
    flexDirection: 'column',
  },
  footerQRTitle: {
    fontSize: 7,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  footerQRUrl: {
    fontSize: 6,
    color: '#64748B',
    maxWidth: 120,
  },
  footerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  watermarkText: {
    fontSize: 6.5,
    color: '#64748B',
    textAlign: 'right',
  },
  watermarkDomain: {
    fontSize: 6,
    fontWeight: 'bold',
    color: '#4F46E5',
    textAlign: 'right',
  },
  proVerified: {
    fontSize: 7,
    fontWeight: 'medium',
    color: '#94A3B8',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});

export const PDFTemplateFrame: React.FC<PDFTemplateFrameProps> = ({
  brandKit,
  children,
  subtitleRight,
}) => {
  const isA4 = brandKit.paperSize === 'a4';
  const docLang = brandKit.documentLang || 'en';
  const t = DOCUMENT_TRANSLATIONS[docLang] || DOCUMENT_TRANSLATIONS.en;

  return (
    <Page
      size={isA4 ? 'A4' : 'LETTER'}
      style={styles.page}
    >
      {/* Top Accent Vector Color Bar */}
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
            <View
              style={[
                styles.monogram,
                { backgroundColor: brandKit.brandColor || '#4F46E5' },
              ]}
            >
              <Text
                style={[
                  styles.monogramText,
                  { color: brandKit.contrastText || '#FFFFFF' },
                ]}
              >
                {(brandKit.companyName || 'L').charAt(0).toUpperCase()}
              </Text>
            </View>
          )}

          <View style={styles.brandTextContainer}>
            <Text style={styles.companyName}>
              {brandKit.companyName || 'Your Brand Name'}
            </Text>
            {brandKit.tagline && (
              <Text style={styles.tagline}>{brandKit.tagline}</Text>
            )}
          </View>
        </View>

        <View style={styles.headerMeta}>
          {brandKit.clientName ? (
            <View style={styles.clientBadge}>
              <Text style={styles.clientText}>{brandKit.clientName}</Text>
            </View>
          ) : null}
          {subtitleRight && (
            <Text style={styles.subtitleRight}>{subtitleRight}</Text>
          )}
        </View>
      </View>

      {/* Main Vector Content */}
      <View style={styles.main}>{children}</View>

      {/* Print-Ready Vector Footer */}
      <View style={styles.footer}>
        {/* Left: Metadata */}
        <View style={styles.footerMeta}>
          <Text style={styles.footerCompany}>
            {brandKit.companyName || 'LogoLoom Document'}
          </Text>
          <Text style={styles.footerNotice}>
            {t.footer.confidential} • {t.footer.page}
          </Text>
        </View>

        {/* Center: Custom QR Code */}
        {brandKit.qrUrl && (
          <View style={styles.footerQRContainer}>
            <VectorQR
              text={brandKit.qrUrl}
              size={24}
              darkColor="#0F172A"
              lightColor="#FFFFFF"
            />
            <View style={styles.footerQRText}>
              <Text style={styles.footerQRTitle}>{t.footer.scanToBook}</Text>
              <Text style={styles.footerQRUrl}>
                {brandKit.qrUrl.replace(/^https?:\/\//, '').slice(0, 30)}
              </Text>
            </View>
          </View>
        )}

        {/* Right: Free vs Pro Watermark */}
        <View>
          {brandKit.removeWatermark ? (
            <Text style={styles.proVerified}>Verified Client Document</Text>
          ) : (
            <View style={styles.footerRight}>
              <VectorQR
                text="https://logoloom.app"
                size={18}
                darkColor="#475569"
                lightColor="#FFFFFF"
              />
              <View style={{ flexDirection: 'column' }}>
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
