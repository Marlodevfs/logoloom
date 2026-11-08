import React from 'react';
import { Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { BrandKit, DocumentLang, WelcomePacketCustomContent } from '@/types';
import { DOCUMENT_TRANSLATIONS } from '@/lib/i18n/documents';
import { getDefaultWelcomePacketContent } from '@/lib/use-brand-kit';
import { VectorQR } from './VectorQR';

interface VectorMinimalWelcomePacketPDFProps {
  brandKit: BrandKit;
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
  page: {
    fontFamily: 'Roboto',
    backgroundColor: '#FFFFFF',
    color: '#0F172A',
    paddingHorizontal: 38,
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative',
  },
  accentLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
  },
  header: {
    flexDirection: 'column',
    borderBottomWidth: 0.5,
    borderBottomColor: '#CBD5E1',
    paddingBottom: 6,
    marginBottom: 8,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  brandLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoContainer: {
    height: 26,
    maxWidth: 110,
    justifyContent: 'center',
  },
  logoImage: {
    height: '100%',
    maxWidth: 110,
    objectFit: 'contain',
  },
  brandTextCol: {
    flexDirection: 'column',
  },
  companyName: {
    fontFamily: 'Roboto',
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  tagline: {
    fontFamily: 'Roboto',
    fontSize: 8,
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
    flexDirection: 'column',
    marginTop: 6,
  },
  title: {
    fontFamily: 'Roboto',
    fontSize: 17,
    fontWeight: 'bold',
    color: '#0F172A',
    letterSpacing: -0.2,
  },
  subtitle: {
    fontFamily: 'Roboto',
    fontSize: 8.5,
    color: '#64748B',
    marginTop: 1.5,
  },
  body: {
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  section: {
    flexDirection: 'column',
    paddingVertical: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E2E8F0',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 4,
  },
  sectionBar: {
    width: 3,
    height: 10,
    borderRadius: 1,
  },
  sectionTitle: {
    fontFamily: 'Roboto',
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#0F172A',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  welcomeMessage: {
    fontFamily: 'Roboto',
    fontSize: 9,
    color: '#334155',
    lineHeight: 1.45,
  },
  commGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  commCard: {
    width: '48.5%',
    backgroundColor: '#F8FAFC',
    borderWidth: 0.5,
    borderColor: '#E2E8F0',
    borderRadius: 4,
    padding: 5,
  },
  commLabel: {
    fontFamily: 'Roboto',
    fontSize: 7.8,
    fontWeight: 'bold',
    color: '#475569',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
    marginBottom: 2,
  },
  commText: {
    fontFamily: 'Roboto',
    fontSize: 8.5,
    color: '#0F172A',
    lineHeight: 1.25,
  },
  agreementsList: {
    flexDirection: 'column',
    gap: 4,
  },
  agreementRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 5,
  },
  agreementIndex: {
    fontFamily: 'Roboto',
    fontSize: 8,
    fontWeight: 'bold',
    minWidth: 14,
  },
  agreementContent: {
    flexDirection: 'column',
    flex: 1,
  },
  agreementTitle: {
    fontFamily: 'Roboto',
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  agreementDesc: {
    fontFamily: 'Roboto',
    fontSize: 8,
    color: '#475569',
    lineHeight: 1.25,
    marginTop: 0.5,
  },
  checklist: {
    flexDirection: 'column',
    gap: 3,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingVertical: 2,
    borderBottomWidth: 0.5,
    borderBottomColor: '#F1F5F9',
  },
  checkbox: {
    width: 14.2, // 5.0 mm
    height: 14.2, // 5.0 mm
    borderWidth: 0.8,
    borderColor: '#94A3B8',
    borderRadius: 2.5,
    backgroundColor: '#FFFFFF',
  },
  checklistText: {
    fontFamily: 'Roboto',
    fontSize: 8.5,
    color: '#1E293B',
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderTopColor: '#CBD5E1',
    paddingTop: 5,
    marginTop: 4,
  },
  footerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  footerCompany: {
    fontFamily: 'Roboto',
    fontSize: 7.8,
    fontWeight: 'bold',
    color: '#475569',
  },
  footerDot: {
    fontFamily: 'Roboto',
    fontSize: 7.8,
    color: '#94A3B8',
  },
  footerPage: {
    fontFamily: 'Roboto',
    fontSize: 7.8,
    color: '#64748B',
  },
  proVerified: {
    fontFamily: 'Roboto',
    fontSize: 7.5,
    fontWeight: 'bold',
    color: '#059669',
    letterSpacing: 0.5,
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
    fontFamily: 'Roboto',
    fontSize: 7.5,
    color: '#64748B',
  },
  watermarkDomain: {
    fontFamily: 'Roboto',
    fontSize: 7.5,
    fontWeight: 'bold',
    color: '#0F172A',
  },
});

export const VectorMinimalWelcomePacketPDF: React.FC<VectorMinimalWelcomePacketPDFProps> = ({ brandKit }) => {
  const docLang: DocumentLang = brandKit.documentLang || 'en';
  const t = (DOCUMENT_TRANSLATIONS[docLang] || DOCUMENT_TRANSLATIONS.en).welcomePacket;
  const content: WelcomePacketCustomContent = brandKit.welcomePacketContent || getDefaultWelcomePacketContent(docLang);

  const isA4 = brandKit.paperSize === 'a4';
  const pagePaddingTop = isA4 ? 30 : 24;
  const pagePaddingBottom = isA4 ? 22 : 18;

  const normalizedLogo = normalizeLogoUrl(brandKit.logoUrl);
  const hasUserQR = Boolean(brandKit.qrUrl && brandKit.qrUrl.trim().length > 0 && brandKit.qrUrl !== 'https://logoloom.app');

  const defaultQrLabel = docLang === 'fr'
    ? 'Scannez pour planifier'
    : docLang === 'de'
    ? 'Scannen zum Planen'
    : docLang === 'es'
    ? 'Escanear para planificar'
    : docLang === 'it'
    ? 'Scansiona per pianificare'
    : docLang === 'pt'
    ? 'Digitalize para agendar'
    : 'Scan to book onboarding';
  const qrDisplayLabel = brandKit.qrLabel || defaultQrLabel;

  const pageLabel = docLang === 'fr'
    ? 'Guide de bienvenue • Page 1 sur 1'
    : docLang === 'de'
    ? 'Willkommensleitfaden • Seite 1 von 1'
    : docLang === 'es'
    ? 'Guía de bienvenida • Página 1 de 1'
    : docLang === 'it'
    ? 'Guida di benvenuto • Pagina 1 di 1'
    : docLang === 'pt'
    ? 'Guia de boas-vindas • Página 1 de 1'
    : 'Welcome Guide • Page 1 of 1';

  const commItems = [
    { label: t.commItems[0]?.label || 'Primary Channel', text: content.channels || t.commItems[0]?.text },
    { label: t.commItems[1]?.label || 'Response SLA', text: content.turnaroundTime || t.commItems[1]?.text },
    { label: t.commItems[2]?.label || 'Meetings', text: content.meetingRhythm || t.commItems[2]?.text },
    { label: t.commItems[3]?.label || 'Urgent Escalation', text: content.urgentProcedure || t.commItems[3]?.text },
  ];

  const agreements = content.workingAgreements && content.workingAgreements.length > 0
    ? content.workingAgreements
    : t.agreements.map((a) => ({ title: a.title, description: a.desc }));

  const checklist = content.checklist72h && content.checklist72h.length > 0
    ? content.checklist72h
    : t.firstSteps;

  return (
    <Page
      size={isA4 ? 'A4' : 'LETTER'}
      orientation="portrait"
      style={[
        styles.page,
        { paddingTop: pagePaddingTop, paddingBottom: pagePaddingBottom },
      ]}
    >
      {/* Top Hairline Accent Line (0.75 pt) */}
      <View
        style={[
          styles.accentLine,
          { backgroundColor: brandKit.brandColor || '#4F46E5' },
        ]}
      />

      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerTopRow}>
          <View style={styles.brandLeft}>
            {normalizedLogo ? (
              <View style={styles.logoContainer}>
                <Image src={normalizedLogo} style={styles.logoImage} />
              </View>
            ) : null}

            {brandKit.companyName ? (
              <View style={styles.brandTextCol}>
                <Text style={styles.companyName}>{brandKit.companyName}</Text>
                {brandKit.tagline ? (
                  <Text style={styles.tagline}>{brandKit.tagline}</Text>
                ) : null}
              </View>
            ) : null}
          </View>

          {/* Contact QR Code (>= 18 mm = 52 pt) */}
          {hasUserQR ? (
            <View style={styles.contactQRCard}>
              <VectorQR
                text={brandKit.qrUrl}
                size={52} // ~18.3 mm
                darkColor="#0F172A"
                lightColor="#FFFFFF"
              />
              <View style={styles.contactQRTextCol}>
                <Text style={styles.contactQRLabel}>{qrDisplayLabel}</Text>
                <Text style={styles.contactQRUrl}>
                  {brandKit.qrUrl.replace(/^https?:\/\//, '').replace(/\/$/, '').slice(0, 24)}
                </Text>
              </View>
            </View>
          ) : null}
        </View>

        {/* Title & Subtitle */}
        <View style={styles.titleRow}>
          <Text style={styles.title}>{content.title || t.title}</Text>
          {content.subtitle ? (
            <Text style={styles.subtitle}>{content.subtitle}</Text>
          ) : null}
        </View>
      </View>

      {/* Body: 4 Clean Minimal Sections */}
      <View style={styles.body}>
        {/* 1. Welcome Message */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={[styles.sectionBar, { backgroundColor: brandKit.brandColor || '#4F46E5' }]} />
            <Text style={styles.sectionTitle}>{t.welcomeHeader}</Text>
          </View>
          <Text style={styles.welcomeMessage}>
            {content.welcomeMessage || t.welcomeBody}
          </Text>
        </View>

        {/* 2. Communication Standards & SLAs */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={[styles.sectionBar, { backgroundColor: brandKit.brandColor || '#4F46E5' }]} />
            <Text style={styles.sectionTitle}>{t.commHeader}</Text>
          </View>
          <View style={styles.commGrid}>
            {commItems.map((item, idx) => (
              <View key={idx} style={styles.commCard}>
                <Text style={styles.commLabel}>{item.label}</Text>
                <Text style={styles.commText}>{item.text}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 3. Working Agreements */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={[styles.sectionBar, { backgroundColor: brandKit.brandColor || '#4F46E5' }]} />
            <Text style={styles.sectionTitle}>{t.agreementsHeader}</Text>
          </View>
          <View style={styles.agreementsList}>
            {agreements.map((agreement, idx) => (
              <View key={idx} style={styles.agreementRow}>
                <Text style={[styles.agreementIndex, { color: brandKit.brandColor || '#4F46E5' }]}>
                  {`0${idx + 1}.`}
                </Text>
                <View style={styles.agreementContent}>
                  <Text style={styles.agreementTitle}>{agreement.title}</Text>
                  <Text style={styles.agreementDesc}>{agreement.description}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* 4. First 72 Hours Checklist */}
        <View style={[styles.section, { borderBottomWidth: 0 }]}>
          <View style={styles.sectionHeader}>
            <View style={[styles.sectionBar, { backgroundColor: brandKit.brandColor || '#4F46E5' }]} />
            <Text style={styles.sectionTitle}>{t.firstStepsHeader}</Text>
          </View>
          <View style={styles.checklist}>
            {checklist.map((step, idx) => (
              <View key={idx} style={styles.checklistItem}>
                <View style={styles.checkbox} />
                <Text style={styles.checklistText}>{step}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Minimal Footer */}
      <View style={styles.footer}>
        <View style={styles.footerLeft}>
          {brandKit.companyName ? (
            <>
              <Text style={styles.footerCompany}>{brandKit.companyName}</Text>
              <Text style={styles.footerDot}>•</Text>
            </>
          ) : null}
          <Text style={styles.footerPage}>{pageLabel}</Text>
        </View>

        {/* Watermark / LogoLoom Badge (Free) or Verified (Pro) */}
        <View>
          {brandKit.removeWatermark ? (
            <Text style={styles.proVerified}>VERIFIED PRINT DOCUMENT</Text>
          ) : (
            <View style={styles.watermarkBadge}>
              <VectorQR
                text="https://logoloom.app"
                size={34} // ~12 mm
                darkColor="#475569"
                lightColor="#FFFFFF"
              />
              <View style={styles.watermarkTextCol}>
                <Text style={styles.watermarkText}>Made with</Text>
                <Text style={styles.watermarkDomain}>logoloom.app</Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </Page>
  );
};
