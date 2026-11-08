import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { BrandKit, DocumentLang } from '@/types';
import { DOCUMENT_TRANSLATIONS } from '@/lib/i18n/documents';
import { MINIMAL_WELCOME_LABELS } from '@/lib/i18n/minimal-labels';
import { PDFTemplateFrame } from './PDFTemplateFrame';
import { VectorQR } from './VectorQR';

interface VectorWelcomePacketPDFProps {
  brandKit: BrandKit;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  hero: {
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    marginBottom: 6,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  heroDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
  },
  heroCategory: {
    fontSize: 7.5,
    fontWeight: 'bold',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  heroTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  heroSubtitle: {
    fontSize: 8,
    color: '#64748B',
    marginTop: 1,
  },
  welcomeBanner: {
    borderRadius: 6,
    borderWidth: 1,
    padding: 8,
    marginBottom: 6,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  welcomeIconBox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 1,
  },
  welcomeIconText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  welcomeContent: {
    flex: 1,
    flexDirection: 'column',
  },
  welcomeHeader: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  welcomeBody: {
    fontSize: 7.5,
    color: '#475569',
    marginTop: 2,
    lineHeight: 1.3,
  },
  columnsGrid: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
    marginVertical: 2,
  },
  columnCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 6,
    padding: 8,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    marginBottom: 4,
  },
  cardAccentPill: {
    width: 3,
    height: 10,
    borderRadius: 2,
  },
  cardTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  cardSubtitle: {
    fontSize: 7,
    color: '#64748B',
    marginBottom: 5,
  },
  commList: {
    flexDirection: 'column',
    gap: 4,
  },
  commBox: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    borderRadius: 4,
    padding: 4,
  },
  commBoxLabel: {
    fontSize: 6.5,
    fontWeight: 'bold',
    color: '#475569',
    textTransform: 'uppercase',
  },
  commBoxText: {
    fontSize: 7.5,
    fontWeight: 'medium',
    color: '#1E293B',
    marginTop: 1,
  },
  contactMeta: {
    marginTop: 6,
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    fontSize: 7,
    color: '#64748B',
  },
  contactEmail: {
    fontWeight: 'bold',
    color: '#0F172A',
  },
  agreementsList: {
    flexDirection: 'column',
    gap: 5,
  },
  agreementItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 5,
  },
  checkBadge: {
    width: 10,
    height: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 1,
  },
  checkBadgeText: {
    fontSize: 7,
    fontWeight: 'bold',
  },
  agreementContent: {
    flex: 1,
    flexDirection: 'column',
  },
  agreementTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  agreementDesc: {
    fontSize: 6.8,
    color: '#64748B',
    lineHeight: 1.25,
    marginTop: 1,
  },
  firstStepsBox: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 4,
    padding: 5,
    marginTop: 6,
  },
  firstStepsHeader: {
    fontSize: 6.5,
    fontWeight: 'bold',
    color: '#475569',
    textTransform: 'uppercase',
    marginBottom: 3,
  },
  firstStepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 4,
    marginBottom: 2,
  },
  firstStepBullet: {
    fontSize: 7,
    color: '#94A3B8',
    fontWeight: 'bold',
  },
  firstStepText: {
    fontSize: 6.8,
    color: '#475569',
    flex: 1,
  },
  kickoffBanner: {
    backgroundColor: '#0F172A',
    borderRadius: 6,
    padding: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  kickoffLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  kickoffIconBox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  kickoffIconText: {
    fontSize: 10,
  },
  kickoffTitle: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  kickoffSubtitle: {
    fontSize: 7,
    color: '#94A3B8',
  },
  kickoffCoachHighlight: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  kickoffBadge: {
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  kickoffBadgeText: {
    fontSize: 7,
    fontWeight: 'bold',
    color: '#E2E8F0',
    letterSpacing: 0.5,
  },
});

export const VectorWelcomePacketPDF: React.FC<VectorWelcomePacketPDFProps> = ({ brandKit }) => {
  const docLang = brandKit.documentLang || 'en';
  const t = (DOCUMENT_TRANSLATIONS[docLang] || DOCUMENT_TRANSLATIONS.en).welcomePacket;

  const subtitleRight = docLang === 'fr'
    ? 'PACK D’ACCUEIL CLIENT • GUIDE & PROTOCOLES'
    : docLang === 'de'
    ? 'WILLKOMMENSPAKET • LEITFADEN & PROTOKOLLE'
    : docLang === 'es'
    ? 'PAQUETE DE BIENVENIDA • GUÍA Y PROTOCOLOS'
    : docLang === 'it'
    ? 'PACCHETTO DI BENVENUTO • GUIDA E PROTOCOLLI'
    : docLang === 'pt'
    ? 'PACOTE DE BOAS-VINDAS • GUIA E PROTOCOLOS'
    : 'CLIENT ONBOARDING • GUIDE & PROTOCOLS';

  const heroCategory = docLang === 'fr'
    ? 'Accueil & Modalités de Collaboration'
    : docLang === 'de'
    ? 'Willkommen & Zusammenarbeitsstandards'
    : docLang === 'es'
    ? 'Bienvenida y Estándares de Trabajo'
    : docLang === 'it'
    ? 'Benvenuto e Standard di Collaborazione'
    : docLang === 'pt'
    ? 'Boas-vindas e Padrões de Colaboração'
    : 'Welcome & Partnership Standards';

  const contactPrompt = docLang === 'fr'
    ? 'Votre interlocuteur principal est'
    : docLang === 'de'
    ? 'Ihr Hauptansprechpartner ist'
    : docLang === 'es'
    ? 'Su punto de contacto principal es'
    : docLang === 'it'
    ? 'Il vostro punto di contatto principale è'
    : docLang === 'pt'
    ? 'Seu principal ponto de contato é'
    : 'Your primary point of contact is';

  const kickoffBadge = docLang === 'fr'
    ? 'SESSION DE CADRAGE 01'
    : docLang === 'de'
    ? 'KICKOFF-SITZUNG 01'
    : docLang === 'es'
    ? 'SESIÓN DE INICIO 01'
    : docLang === 'it'
    ? 'SESSIONE DI AVVIO 01'
    : docLang === 'pt'
    ? 'SESSÃO INICIAL 01'
    : 'KICKOFF SESSION 01';

  const hasUserQR = Boolean(
    brandKit.qrUrl &&
    brandKit.qrUrl.trim().length > 0 &&
    brandKit.qrUrl !== 'https://logoloom.app'
  );

  return (
    <PDFTemplateFrame
      brandKit={brandKit}
      subtitleRight={subtitleRight}
    >
      <View style={styles.container}>
        {/* Hero Section */}
        <View style={styles.hero}>
          <View style={styles.heroBadge}>
            <View
              style={[
                styles.heroDot,
                { backgroundColor: brandKit.brandColor || '#4F46E5' },
              ]}
            />
            <Text style={styles.heroCategory}>{heroCategory}</Text>
          </View>
          <Text style={styles.heroTitle}>{t.title}</Text>
          <Text style={styles.heroSubtitle}>{t.subtitle}</Text>
        </View>

        {/* Welcome Statement Banner */}
        <View
          style={[
            styles.welcomeBanner,
            {
              backgroundColor: `${brandKit.brandColor || '#4F46E5'}0A`,
              borderColor: `${brandKit.brandColor || '#4F46E5'}30`,
            },
          ]}
        >
          <View
            style={[
              styles.welcomeIconBox,
              { backgroundColor: brandKit.brandColor || '#4F46E5' },
            ]}
          >
            <Text
              style={[
                styles.welcomeIconText,
                { color: brandKit.contrastText || '#FFFFFF' },
              ]}
            >
              ✦
            </Text>
          </View>
          <View style={styles.welcomeContent}>
            <Text style={styles.welcomeHeader}>{t.welcomeHeader}</Text>
            <Text style={styles.welcomeBody}>{t.welcomeBody}</Text>
          </View>
        </View>

        {/* Middle Two-Column Grid */}
        <View style={styles.columnsGrid}>
          {/* Left Column: Communication Rules & Channels */}
          <View style={styles.columnCard}>
            <View>
              <View style={styles.cardHeader}>
                <View
                  style={[
                    styles.cardAccentPill,
                    { backgroundColor: brandKit.brandColor || '#4F46E5' },
                  ]}
                />
                <Text style={styles.cardTitle}>{t.commHeader}</Text>
              </View>
              <Text style={styles.cardSubtitle}>{t.commSub}</Text>

              <View style={styles.commList}>
                {t.commItems.map((item, idx) => (
                  <View key={idx} style={styles.commBox}>
                    <Text style={styles.commBoxLabel}>{item.label}</Text>
                    <Text style={styles.commBoxText}>{item.text}</Text>
                  </View>
                ))}
              </View>
            </View>

            {brandKit.contactEmail ? (
              <Text style={styles.contactMeta}>
                Contact:{' '}
                <Text style={styles.contactEmail}>
                  {brandKit.contactEmail}
                </Text>
              </Text>
            ) : null}
          </View>

          {/* Right Column: Working Agreements & First Steps */}
          <View style={styles.columnCard}>
            <View>
              <View style={styles.cardHeader}>
                <View
                  style={[
                    styles.cardAccentPill,
                    { backgroundColor: brandKit.brandColor || '#4F46E5' },
                  ]}
                />
                <Text style={styles.cardTitle}>{t.agreementsHeader}</Text>
              </View>

              <View style={styles.agreementsList}>
                {t.agreements.map((agreement, idx) => (
                  <View key={idx} style={styles.agreementItem}>
                    <View
                      style={[
                        styles.checkBadge,
                        { backgroundColor: `${brandKit.brandColor || '#4F46E5'}18` },
                      ]}
                    >
                      <Text
                        style={[
                          styles.checkBadgeText,
                          { color: brandKit.brandColor || '#4F46E5' },
                        ]}
                      >
                        ✓
                      </Text>
                    </View>
                    <View style={styles.agreementContent}>
                      <Text style={styles.agreementTitle}>{agreement.title}</Text>
                      <Text style={styles.agreementDesc}>{agreement.desc}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            {/* Client First Steps */}
            <View style={styles.firstStepsBox}>
              <Text style={styles.firstStepsHeader}>{t.firstStepsHeader}</Text>
              {t.firstSteps.map((step, sIdx) => (
                <View key={sIdx} style={styles.firstStepItem}>
                  <Text style={styles.firstStepBullet}>•</Text>
                  <Text style={styles.firstStepText}>{step}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Kickoff CTA Banner */}
        <View style={styles.kickoffBanner}>
          <View style={styles.kickoffLeft}>
            <View
              style={[
                styles.kickoffIconBox,
                { backgroundColor: brandKit.brandColor || '#4F46E5' },
              ]}
            >
              <Text
                style={[
                  styles.kickoffIconText,
                  { color: brandKit.contrastText || '#FFFFFF' },
                ]}
              >
                ★
              </Text>
            </View>
            <View>
              <Text style={styles.kickoffTitle}>{t.schedulePrompt}</Text>
              <Text style={styles.kickoffSubtitle}>
                {contactPrompt}{' '}
                <Text style={styles.kickoffCoachHighlight}>
                  {brandKit.coachName || (brandKit.companyName ? brandKit.companyName : ((MINIMAL_WELCOME_LABELS[docLang as DocumentLang] || MINIMAL_WELCOME_LABELS.en).practitionerPlaceholder))}
                </Text>
              </Text>
            </View>
          </View>

          {hasUserQR ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <VectorQR
                text={brandKit.qrUrl}
                size={40} // ~14 mm
                darkColor="#0F172A"
                lightColor="#FFFFFF"
              />
              <View style={styles.kickoffBadge}>
                <Text style={styles.kickoffBadgeText}>{kickoffBadge}</Text>
              </View>
            </View>
          ) : (
            <View style={styles.kickoffBadge}>
              <Text style={styles.kickoffBadgeText}>{kickoffBadge}</Text>
            </View>
          )}
        </View>
      </View>
    </PDFTemplateFrame>
  );
};
