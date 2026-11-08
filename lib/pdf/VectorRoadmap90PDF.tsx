import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { BrandKit } from '@/types';
import { DOCUMENT_TRANSLATIONS } from '@/lib/i18n/documents';
import { PDFTemplateFrame } from './PDFTemplateFrame';

interface VectorRoadmap90PDFProps {
  brandKit: BrandKit;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  hero: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    marginBottom: 6,
  },
  heroLeft: {
    flex: 1,
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
    maxWidth: 320,
  },
  heroRight: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 8,
  },
  heroMetaBlock: {
    flexDirection: 'column',
  },
  heroMetaLabel: {
    fontSize: 6,
    color: '#94A3B8',
    textTransform: 'uppercase',
    fontWeight: 'medium',
  },
  heroMetaValue: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  heroDivider: {
    width: 1,
    height: 16,
    backgroundColor: '#E2E8F0',
  },
  phasesGrid: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
    marginVertical: 4,
  },
  phaseCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 6,
    flexDirection: 'column',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  phaseHeader: {
    padding: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  phaseHeaderLeft: {
    flexDirection: 'column',
    flex: 1,
  },
  phaseNumber: {
    fontSize: 7,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  phaseTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#0F172A',
    marginTop: 1,
  },
  phaseRange: {
    fontSize: 6.5,
    fontWeight: 'bold',
    color: '#475569',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 3,
  },
  deliverablesList: {
    padding: 6,
    flex: 1,
    flexDirection: 'column',
    gap: 5,
  },
  deliverablesSectionTitle: {
    fontSize: 6.5,
    fontWeight: 'bold',
    color: '#94A3B8',
    textTransform: 'uppercase',
    marginBottom: 1,
  },
  deliverableItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 4,
  },
  deliverableBadge: {
    width: 10,
    height: 10,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 1,
  },
  deliverableIndex: {
    fontSize: 6,
    fontWeight: 'bold',
  },
  deliverableText: {
    fontSize: 7.5,
    color: '#334155',
    flex: 1,
    lineHeight: 1.25,
  },
  kpiBox: {
    padding: 5,
    backgroundColor: '#F8FAFC',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  kpiLabel: {
    fontSize: 6,
    fontWeight: 'bold',
    color: '#64748B',
    textTransform: 'uppercase',
  },
  kpiValue: {
    fontSize: 7.5,
    fontWeight: 'bold',
    color: '#0F172A',
    marginTop: 1,
  },
  signoffContainer: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 6,
    padding: 6,
    marginTop: 4,
  },
  signoffHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    marginBottom: 4,
  },
  signoffTitle: {
    fontSize: 7.5,
    fontWeight: 'bold',
    color: '#1E293B',
    textTransform: 'uppercase',
  },
  signoffNotice: {
    fontSize: 6,
    color: '#94A3B8',
  },
  signoffGrid: {
    flexDirection: 'row',
    gap: 16,
    paddingTop: 2,
  },
  signoffCol: {
    flex: 1,
    flexDirection: 'column',
    gap: 2,
  },
  signoffLabel: {
    fontSize: 7,
    fontWeight: 'medium',
    color: '#475569',
  },
  signoffName: {
    fontWeight: 'bold',
    color: '#0F172A',
  },
  signoffLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#CBD5E1',
    borderBottomStyle: 'dashed',
    height: 10,
    marginBottom: 2,
  },
  signoffMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 6,
    color: '#94A3B8',
  },
});

export const VectorRoadmap90PDF: React.FC<VectorRoadmap90PDFProps> = ({ brandKit }) => {
  const docLang = brandKit.documentLang || 'en';
  const t = (DOCUMENT_TRANSLATIONS[docLang] || DOCUMENT_TRANSLATIONS.en).roadmap90;
  const phases = [t.phase1, t.phase2, t.phase3];

  const subtitleRight = docLang === 'fr'
    ? 'FEUILLE DE ROUTE STRATÉGIQUE • PLAN 90 JOURS'
    : docLang === 'de'
    ? 'STRATEGISCHE ROADMAP • 90-TAGE PLAN'
    : docLang === 'es'
    ? 'HOJA DE RUTA ESTRATÉGICA • PLAN DE 90 DÍAS'
    : docLang === 'it'
    ? 'TABELLA DI MARCIA STRATEGICA • PIANO A 90 GIORNI'
    : docLang === 'pt'
    ? 'ROTEIRO ESTRATÉGICO • PLANO DE 90 DIAS'
    : 'STRATEGIC ROADMAP • 90-DAY EXECUTION';

  const heroCategory = docLang === 'fr'
    ? 'Plan d’action stratégique'
    : docLang === 'de'
    ? 'Strategischer Aktionsplan'
    : docLang === 'es'
    ? 'Plan de acción estratégico'
    : docLang === 'it'
    ? 'Piano d’azione strategico'
    : docLang === 'pt'
    ? 'Plano de ação estratégico'
    : 'Strategic Execution Framework';

  const deliverablesTitle = docLang === 'fr'
    ? 'Livrables & Jalons Clés'
    : docLang === 'de'
    ? 'Wichtigste Meilensteine'
    : docLang === 'es'
    ? 'Hitos y Entregables Clave'
    : docLang === 'it'
    ? 'Traguardi e Risultati Chiave'
    : docLang === 'pt'
    ? 'Marcos e Entregáveis Principais'
    : 'Key Milestones & Deliverables';

  const signoffNotice = docLang === 'fr'
    ? 'Validation pour exécution bilatérale'
    : docLang === 'de'
    ? 'Gültig zur Ausführung nach beiderseitiger Unterzeichnung'
    : docLang === 'es'
    ? 'Válido para ejecución tras firma bilateral'
    : docLang === 'it'
    ? 'Valido per l’esecuzione previa firma bilaterale'
    : docLang === 'pt'
    ? 'Válido para execução mediante assinatura bilateral'
    : 'Valid for execution upon bilateral sign-off';

  const signLabel = docLang === 'fr'
    ? 'Signature'
    : docLang === 'de'
    ? 'Unterschrift'
    : docLang === 'es' || docLang === 'it'
    ? 'Firma'
    : docLang === 'pt'
    ? 'Assinatura'
    : 'Signature';

  const goalText = docLang === 'fr' ? 'Définir l’objectif clé' : 'Define primary goal';
  const horizonText = docLang === 'fr' ? '90 jours ouvrés' : '90 Business Days';

  return (
    <PDFTemplateFrame
      brandKit={brandKit}
      subtitleRight={subtitleRight}
    >
      <View style={styles.container}>
        {/* Hero Section */}
        <View style={styles.hero}>
          <View style={styles.heroLeft}>
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

          <View style={styles.heroRight}>
            <View style={styles.heroMetaBlock}>
              <Text style={styles.heroMetaLabel}>{t.initiativePrompt}</Text>
              <Text style={styles.heroMetaValue}>{goalText}</Text>
            </View>
            <View style={styles.heroDivider} />
            <View style={styles.heroMetaBlock}>
              <Text style={styles.heroMetaLabel}>{t.timelinePrompt}</Text>
              <Text style={styles.heroMetaValue}>{horizonText}</Text>
            </View>
          </View>
        </View>

        {/* 3 Phases Grid */}
        <View style={styles.phasesGrid}>
          {phases.map((phase, idx) => (
            <View key={idx} style={styles.phaseCard}>
              {/* Card Header */}
              <View
                style={[
                  styles.phaseHeader,
                  { backgroundColor: `${brandKit.brandColor || '#4F46E5'}0A` },
                ]}
              >
                <View style={styles.phaseHeaderLeft}>
                  <Text
                    style={[
                      styles.phaseNumber,
                      { color: brandKit.brandColor || '#4F46E5' },
                    ]}
                  >
                    {phase.number}
                  </Text>
                  <Text style={styles.phaseTitle}>{phase.title}</Text>
                </View>
                <Text style={styles.phaseRange}>{phase.range}</Text>
              </View>

              {/* Deliverables Checklist */}
              <View style={styles.deliverablesList}>
                <Text style={styles.deliverablesSectionTitle}>
                  {deliverablesTitle}
                </Text>
                {phase.deliverables.map((item, dIdx) => (
                  <View key={dIdx} style={styles.deliverableItem}>
                    <View
                      style={[
                        styles.deliverableBadge,
                        { backgroundColor: `${brandKit.brandColor || '#4F46E5'}10` },
                      ]}
                    >
                      <Text
                        style={[
                          styles.deliverableIndex,
                          { color: brandKit.brandColor || '#4F46E5' },
                        ]}
                      >
                        {dIdx + 1}
                      </Text>
                    </View>
                    <Text style={styles.deliverableText}>{item}</Text>
                  </View>
                ))}
              </View>

              {/* KPI Box */}
              <View style={styles.kpiBox}>
                <Text style={styles.kpiLabel}>{phase.kpiLabel}</Text>
                <Text style={styles.kpiValue}>{phase.kpiValue}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Bilateral Milestone Sign-off Block */}
        {brandKit.roadmapContent?.showSignatureBlock !== false ? (
          <View style={styles.signoffContainer}>
            <View style={styles.signoffHeader}>
              <Text style={styles.signoffTitle}>{t.signoffTitle}</Text>
              <Text style={styles.signoffNotice}>
                {signoffNotice}
              </Text>
            </View>

            <View style={styles.signoffGrid}>
              <View style={styles.signoffCol}>
                <Text style={styles.signoffLabel}>
                  {t.clientSign}:{' '}
                  <Text style={styles.signoffName}>
                    {brandKit.clientName || '__________________________'}
                  </Text>
                </Text>
                <View style={styles.signoffLine} />
                <View style={styles.signoffMeta}>
                  <Text>Date: ____ / ____ / ________</Text>
                  <Text>{signLabel}</Text>
                </View>
              </View>

              <View style={styles.signoffCol}>
                <Text style={styles.signoffLabel}>
                  {t.leadSign}:{' '}
                  <Text style={styles.signoffName}>
                    {brandKit.coachName || '__________________________'}
                  </Text>
                </Text>
                <View style={styles.signoffLine} />
                <View style={styles.signoffMeta}>
                  <Text>Date: ____ / ____ / ________</Text>
                  <Text>{signLabel}</Text>
                </View>
              </View>
            </View>
          </View>
        ) : null}
      </View>
    </PDFTemplateFrame>
  );
};
