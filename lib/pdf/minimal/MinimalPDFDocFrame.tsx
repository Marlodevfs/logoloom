import React from 'react';
import { Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { BrandKit, DocumentLang } from '@/types';
import { MINIMAL_HABIT_LABELS } from '@/lib/i18n/minimal-labels';
import { VectorQR } from '../VectorQR';

interface MinimalPDFDocFrameProps {
  brandKit: BrandKit;
  title: string;
  metadataRight?: React.ReactNode;
  children: React.ReactNode;
  footerCategoryText?: string;
}

export const MinimalPDFDocFrame: React.FC<MinimalPDFDocFrameProps> = ({
  brandKit,
  title,
  metadataRight,
  children,
  footerCategoryText,
}) => {
  const isA4 = brandKit.paperSize === 'a4';
  const docLang: DocumentLang = brandKit.documentLang || 'en';
  const l = MINIMAL_HABIT_LABELS[docLang] || MINIMAL_HABIT_LABELS.en;
  const isProMode = Boolean(brandKit.isPro || brandKit.removeWatermark);
  const hasUserQR = Boolean(brandKit.qrUrl && brandKit.qrUrl.trim().length > 0 && brandKit.qrUrl !== 'https://logoloom.app');

  const defaultQrLabel = l.defaultQr;
  const qrDisplayLabel = brandKit.qrLabel || defaultQrLabel;
  const qrUrlDomain = (brandKit.qrUrl || '').replace(/^https?:\/\//, '');

  const styles = StyleSheet.create({
    page: {
      backgroundColor: '#FFFFFF',
      fontFamily: 'Roboto',
      paddingHorizontal: 36,
      paddingVertical: 32,
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
    },
    topAccentBar: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 3,
      backgroundColor: brandKit.brandColor,
    },
    header: {
      borderBottomWidth: 0.5,
      borderBottomColor: '#CBD5E1',
      paddingBottom: 8,
      marginBottom: 6,
    },
    headerTopRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    brandBlock: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    logo: {
      height: 24,
      maxWidth: 90,
      objectFit: 'contain',
    },
    brandTextCol: {
      flexDirection: 'column',
    },
    companyName: {
      fontFamily: 'Roboto',
      fontSize: 10,
      fontWeight: 'bold',
      color: brandKit.companyName ? '#0F172A' : '#94A3B8',
    },
    tagline: {
      fontFamily: 'Roboto',
      fontSize: 7.5,
      color: '#64748B',
      marginTop: 1,
    },
    contactQRCard: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingLeft: 8,
      borderLeftWidth: 0.5,
      borderLeftColor: '#CBD5E1',
    },
    contactQRTextCol: {
      flexDirection: 'column',
      alignItems: 'flex-end',
      maxWidth: 110,
    },
    contactQRLabel: {
      fontFamily: 'Roboto',
      fontSize: 8,
      fontWeight: 'bold',
      color: '#0F172A',
    },
    contactQRUrl: {
      fontFamily: 'Roboto',
      fontSize: 7.5,
      color: '#64748B',
      marginTop: 1,
    },
    titleRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      marginTop: 6,
    },
    title: {
      fontFamily: 'Roboto',
      fontSize: 17,
      fontWeight: 'bold',
      letterSpacing: -0.2,
      color: brandKit.brandColor,
    },
    bodyContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
    footer: {
      borderTopWidth: 0.5,
      borderTopColor: '#CBD5E1',
      paddingTop: 6,
      marginTop: 6,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    footerLeftText: {
      fontFamily: 'Roboto',
      fontSize: 7.5,
      color: '#64748B',
    },
    footerRightGroup: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    footerRightText: {
      fontFamily: 'Roboto',
      fontSize: 7.5,
      color: '#64748B',
    },
  });

  return (
    <Page size={isA4 ? 'A4' : 'LETTER'} style={styles.page}>
      {/* Top Hairline Accent Line */}
      <View style={styles.topAccentBar} />

      {/* Header Block */}
      <View style={styles.header}>
        <View style={styles.headerTopRow}>
          {/* Logo & Company Wordmark */}
          <View style={styles.brandBlock}>
            {brandKit.logoUrl ? (
              <Image src={brandKit.logoUrl} style={styles.logo} />
            ) : null}
            <View style={styles.brandTextCol}>
              <Text style={styles.companyName}>
                {brandKit.companyName || l.companyPlaceholder}
              </Text>
              {brandKit.tagline ? (
                <Text style={styles.tagline}>{brandKit.tagline}</Text>
              ) : null}
            </View>
          </View>

          {/* Contact QR Code */}
          {hasUserQR ? (
            <View style={styles.contactQRCard}>
              <VectorQR text={brandKit.qrUrl} size={36} darkColor="#0F172A" />
              <View style={styles.contactQRTextCol}>
                <Text style={styles.contactQRLabel}>{qrDisplayLabel}</Text>
                <Text style={styles.contactQRUrl}>{qrUrlDomain}</Text>
              </View>
            </View>
          ) : null}
        </View>

        {/* Title & Metadata Line */}
        <View style={styles.titleRow}>
          <Text style={styles.title}>{title || l.defaultTitle}</Text>
          {metadataRight}
        </View>
      </View>

      {/* Body Slot */}
      <View style={styles.bodyContainer}>{children}</View>

      {/* Footer Block */}
      <View style={styles.footer}>
        <Text style={styles.footerLeftText}>
          {footerCategoryText
            ? `${footerCategoryText} • ${l.footerPage.split('•')[1]?.trim() || 'Page 1 of 1'}`
            : (isProMode ? `${l.verified} • ${l.footerPage.split('•')[1]?.trim() || 'Page 1 of 1'}` : l.footerPage)}
        </Text>

        {!isProMode ? (
          <View style={styles.footerRightGroup}>
            <Text style={styles.footerRightText}>{l.madeWith} logoloom.app</Text>
            <VectorQR text="https://logoloom.app" size={14} darkColor="#64748B" />
          </View>
        ) : (
          <View />
        )}
      </View>
    </Page>
  );
};
