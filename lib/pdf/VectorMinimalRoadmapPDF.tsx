import React from 'react';
import { Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { BrandKit, DocumentLang, RoadmapCustomContent, RoadmapPhaseCustom } from '@/types';
import { DOCUMENT_TRANSLATIONS } from '@/lib/i18n/documents';
import { getDefaultRoadmapContent } from '@/lib/use-brand-kit';
import { VectorQR } from './VectorQR';

interface VectorMinimalRoadmapPDFProps {
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 6,
  },
  titleCol: {
    flexDirection: 'column',
    maxWidth: 320,
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
    fontSize: 8,
    color: '#64748B',
    marginTop: 1,
  },
  metaFields: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-end',
  },
  metaField: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 3,
  },
  metaLabel: {
    fontFamily: 'Roboto',
    fontSize: 8,
    fontWeight: 'bold',
    color: '#475569',
  },
  metaLine: {
    fontFamily: 'Roboto',
    fontSize: 8,
    color: '#0F172A',
    borderBottomWidth: 0.5,
    borderBottomColor: '#94A3B8',
    paddingBottom: 1,
    minWidth: 90,
  },
  body: {
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  phaseBand: {
    flexDirection: 'column',
    paddingVertical: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: '#CBD5E1',
  },
  phaseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  phaseTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  phaseNumber: {
    fontFamily: 'Roboto',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  phaseTitle: {
    fontFamily: 'Roboto',
    fontSize: 10,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  phaseRangeBadge: {
    fontFamily: 'Roboto',
    fontSize: 8,
    fontWeight: 'bold',
    color: '#475569',
    backgroundColor: '#F8FAFC',
    borderWidth: 0.5,
    borderColor: '#CBD5E1',
    paddingHorizontal: 6,
    paddingVertical: 1.5,
    borderRadius: 3,
  },
  deliverablesList: {
    flexDirection: 'column',
    gap: 3,
  },
  deliverableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 18,
    borderBottomWidth: 0.5,
    borderBottomColor: '#F1F5F9',
    paddingVertical: 2,
    gap: 7,
  },
  checkbox: {
    width: 14.2, // 5.0 mm
    height: 14.2, // 5.0 mm
    borderWidth: 0.8,
    borderColor: '#94A3B8',
    borderRadius: 2.5,
    backgroundColor: '#FFFFFF',
  },
  deliverableText: {
    fontFamily: 'Roboto',
    fontSize: 8.5,
    color: '#1E293B',
    flex: 1,
  },
  milestoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
    paddingTop: 3,
    borderTopWidth: 0.5,
    borderTopColor: '#E2E8F0',
  },
  milestoneLabel: {
    fontFamily: 'Roboto',
    fontSize: 7.8,
    fontWeight: 'bold',
    color: '#475569',
    textTransform: 'uppercase',
  },
  milestoneText: {
    fontFamily: 'Roboto',
    fontSize: 8,
    color: '#0F172A',
    fontWeight: 'medium',
    flex: 1,
  },
  signatureSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingBottom: 4,
    borderTopWidth: 0.5,
    borderTopColor: '#CBD5E1',
    marginTop: 4,
  },
  signBlock: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 6,
    width: '46%',
  },
  signLabel: {
    fontFamily: 'Roboto',
    fontSize: 7.8,
    fontWeight: 'bold',
    color: '#475569',
    minWidth: 70,
  },
  signLine: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#94A3B8',
    flex: 1,
    height: 14,
  },
  signDate: {
    fontFamily: 'Roboto',
    fontSize: 7.8,
    color: '#64748B',
    minWidth: 80,
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

export const VectorMinimalRoadmapPDF: React.FC<VectorMinimalRoadmapPDFProps> = ({ brandKit }) => {
  const docLang: DocumentLang = brandKit.documentLang || 'en';
  const t = (DOCUMENT_TRANSLATIONS[docLang] || DOCUMENT_TRANSLATIONS.en).roadmap90;
  const content: RoadmapCustomContent = brandKit.roadmapContent || getDefaultRoadmapContent(docLang);

  const isA4 = brandKit.paperSize === 'a4';
  const pagePaddingTop = isA4 ? 30 : 24;
  const pagePaddingBottom = isA4 ? 22 : 18;

  const normalizedLogo = normalizeLogoUrl(brandKit.logoUrl);
  const hasUserQR = Boolean(brandKit.qrUrl && brandKit.qrUrl.trim().length > 0 && brandKit.qrUrl !== 'https://logoloom.app');

  const defaultQrLabel = docLang === 'fr'
    ? 'Scannez pour réserver'
    : docLang === 'de'
    ? 'Scannen zum Buchen'
    : docLang === 'es'
    ? 'Escanear para reservar'
    : docLang === 'it'
    ? 'Scansiona per prenotare'
    : docLang === 'pt'
    ? 'Digitalize para agendar'
    : 'Scan to book a session';
  const qrDisplayLabel = brandKit.qrLabel || defaultQrLabel;

  const projectLabel = docLang === 'fr'
    ? 'Projet / Client :'
    : docLang === 'de'
    ? 'Projekt / Kunde:'
    : docLang === 'es'
    ? 'Proyecto / Cliente:'
    : docLang === 'it'
    ? 'Progetto / Cliente:'
    : docLang === 'pt'
    ? 'Projeto / Cliente:'
    : 'Project / Client:';

  const horizonLabel = docLang === 'fr'
    ? 'Horizon cible :'
    : docLang === 'de'
    ? 'Zielhorizont:'
    : docLang === 'es'
    ? 'Horizonte objetivo:'
    : docLang === 'it'
    ? 'Orizzonte obiettivo:'
    : docLang === 'pt'
    ? 'Horizonte alvo:'
    : 'Target Horizon:';

  const milestoneLabel = docLang === 'fr'
    ? 'Jalon clé :'
    : docLang === 'de'
    ? 'Hauptmeilenstein:'
    : docLang === 'es'
    ? 'Hito clave:'
    : docLang === 'it'
    ? 'Traguardo chiave:'
    : docLang === 'pt'
    ? 'Marco principal:'
    : 'Key Milestone:';

  const clientSignLabel = docLang === 'fr'
    ? 'Validation client :'
    : docLang === 'de'
    ? 'Kundenfreigabe:'
    : docLang === 'es'
    ? 'Firma del cliente:'
    : docLang === 'it'
    ? 'Firma del cliente:'
    : docLang === 'pt'
    ? 'Assinatura do cliente:'
    : 'Client Sign-off:';

  const advisorSignLabel = docLang === 'fr'
    ? 'Signature conseil :'
    : docLang === 'de'
    ? 'Berater-Freigabe:'
    : docLang === 'es'
    ? 'Firma del asesor:'
    : docLang === 'it'
    ? 'Firma del consulente:'
    : docLang === 'pt'
    ? 'Assinatura do consultor:'
    : 'Advisor Sign-off:';

  const pageLabel = docLang === 'fr'
    ? 'Feuille de route stratégique • Page 1 sur 1'
    : docLang === 'de'
    ? 'Strategische Roadmap • Seite 1 von 1'
    : docLang === 'es'
    ? 'Hoja de ruta estratégica • Página 1 de 1'
    : docLang === 'it'
    ? 'Tabella di marcia strategica • Pagina 1 di 1'
    : docLang === 'pt'
    ? 'Roteiro estratégico • Página 1 de 1'
    : 'Strategic Roadmap • Page 1 of 1';

  const phases: RoadmapPhaseCustom[] = content.phases || [
    { title: t.phase1.title, daysLabel: t.phase1.range, deliverables: t.phase1.deliverables, kpi: t.phase1.kpiValue },
    { title: t.phase2.title, daysLabel: t.phase2.range, deliverables: t.phase2.deliverables, kpi: t.phase2.kpiValue },
    { title: t.phase3.title, daysLabel: t.phase3.range, deliverables: t.phase3.deliverables, kpi: t.phase3.kpiValue },
  ];

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

        {/* Title & Metadata Row */}
        <View style={styles.titleRow}>
          <View style={styles.titleCol}>
            <Text style={styles.title}>{content.title || t.title}</Text>
            {content.subtitle ? (
              <Text style={styles.subtitle}>{content.subtitle}</Text>
            ) : null}
          </View>

          <View style={styles.metaFields}>
            <View style={styles.metaField}>
              <Text style={styles.metaLabel}>{projectLabel}</Text>
              <Text style={styles.metaLine}>
                {content.mission || (brandKit.clientName || '____________________')}
              </Text>
            </View>
            <View style={styles.metaField}>
              <Text style={styles.metaLabel}>{horizonLabel}</Text>
              <Text style={styles.metaLine}>
                {content.horizon || '90 Business Days'}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Body: 3 Horizontal Bands */}
      <View style={styles.body}>
        {phases.map((phase, idx) => (
          <View key={idx} style={styles.phaseBand}>
            {/* Phase Header */}
            <View style={styles.phaseHeader}>
              <View style={styles.phaseTitleGroup}>
                <Text style={[styles.phaseNumber, { color: brandKit.brandColor || '#4F46E5' }]}>
                  {`0${idx + 1} —`}
                </Text>
                <Text style={styles.phaseTitle}>{phase.title}</Text>
              </View>
              <Text style={styles.phaseRangeBadge}>{phase.daysLabel}</Text>
            </View>

            {/* Deliverables with Checkboxes (5.0 mm) */}
            <View style={styles.deliverablesList}>
              {phase.deliverables.map((item, dIdx) => (
                <View key={dIdx} style={styles.deliverableRow}>
                  <View style={styles.checkbox} />
                  <Text style={styles.deliverableText}>{item}</Text>
                </View>
              ))}
            </View>

            {/* Key Milestone / Goal */}
            {phase.kpi ? (
              <View style={styles.milestoneRow}>
                <Text style={styles.milestoneLabel}>{milestoneLabel}</Text>
                <Text style={styles.milestoneText}>{phase.kpi}</Text>
              </View>
            ) : null}
          </View>
        ))}
      </View>

      {/* Optional Signature Block */}
      {content.showSignatureBlock !== false ? (
        <View style={styles.signatureSection}>
          <View style={styles.signBlock}>
            <Text style={styles.signLabel}>{clientSignLabel}</Text>
            <View style={styles.signLine} />
            <Text style={styles.signDate}>Date: ____/____/____</Text>
          </View>
          <View style={styles.signBlock}>
            <Text style={styles.signLabel}>{advisorSignLabel}</Text>
            <View style={styles.signLine} />
            <Text style={styles.signDate}>Date: ____/____/____</Text>
          </View>
        </View>
      ) : null}

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
