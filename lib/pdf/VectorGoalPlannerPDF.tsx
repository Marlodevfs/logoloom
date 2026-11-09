import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { BrandKit, DocumentLang, GoalPlannerCustomContent } from '@/types';
import { MinimalPDFDocFrame } from './minimal/MinimalPDFDocFrame';
import { getDefaultGoalPlannerContent } from '@/lib/use-brand-kit';
import { CATALOG_LABELS } from '@/lib/i18n/catalog-labels';

interface VectorGoalPlannerPDFProps {
  brandKit: BrandKit;
}

export const VectorGoalPlannerPDF: React.FC<VectorGoalPlannerPDFProps> = ({ brandKit }) => {
  const docLang: DocumentLang = brandKit.documentLang || 'en';
  const labels = (CATALOG_LABELS[docLang] || CATALOG_LABELS.en).goalPlanner;
  const content: GoalPlannerCustomContent =
    brandKit.goalPlannerContent || getDefaultGoalPlannerContent(docLang);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      paddingVertical: 4,
    },
    metadataRight: {
      flexDirection: 'row',
      gap: 12,
      alignItems: 'flex-end',
    },
    metaItem: {
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
      minWidth: 70,
    },
    goalsCard: {
      borderWidth: 0.5,
      borderColor: '#CBD5E1',
      borderRadius: 4,
      padding: 8,
      backgroundColor: '#F8FAFC',
      marginBottom: 6,
    },
    goalsHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 4,
    },
    goalsTitle: {
      fontFamily: 'Roboto',
      fontSize: 8.5,
      fontWeight: 'bold',
      color: '#334155',
      textTransform: 'uppercase',
      letterSpacing: 0.3,
    },
    goalRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      marginBottom: 3,
    },
    goalBadge: {
      width: 13,
      height: 13,
      borderWidth: 0.5,
      borderColor: brandKit.brandColor,
      borderRadius: 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    goalBadgeText: {
      fontFamily: 'Roboto',
      fontSize: 7.5,
      fontWeight: 'bold',
      color: brandKit.brandColor,
    },
    goalText: {
      fontFamily: 'Roboto',
      fontSize: 8.5,
      color: '#0F172A',
      flex: 1,
      borderBottomWidth: 0.5,
      borderBottomColor: '#E2E8F0',
      paddingBottom: 1,
    },
    whyRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      marginTop: 4,
      paddingTop: 3,
      borderTopWidth: 0.5,
      borderTopColor: '#E2E8F0',
    },
    whyLabel: {
      fontFamily: 'Roboto',
      fontSize: 8,
      fontWeight: 'bold',
      color: '#475569',
    },
    whyText: {
      fontFamily: 'Roboto',
      fontSize: 8,
      fontStyle: 'italic',
      color: '#334155',
      flex: 1,
    },
    phasesGrid: {
      flexDirection: 'row',
      gap: 6,
      flex: 1,
      marginBottom: 6,
    },
    phaseCol: {
      flex: 1,
      borderWidth: 0.5,
      borderColor: '#CBD5E1',
      borderRadius: 4,
      padding: 8,
      backgroundColor: '#FFFFFF',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    phaseHeader: {
      borderBottomWidth: 0.5,
      borderBottomColor: '#E2E8F0',
      paddingBottom: 4,
      marginBottom: 6,
    },
    phaseTitle: {
      fontFamily: 'Roboto',
      fontSize: 9,
      fontWeight: 'bold',
      color: brandKit.brandColor,
    },
    phaseFocus: {
      fontFamily: 'Roboto',
      fontSize: 7.5,
      color: '#64748B',
      marginTop: 2,
    },
    milestoneRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 5,
      marginBottom: 5,
    },
    checkbox: {
      width: 10,
      height: 10,
      borderWidth: 0.5,
      borderColor: '#94A3B8',
      borderRadius: 2,
      marginTop: 1,
    },
    milestoneText: {
      fontFamily: 'Roboto',
      fontSize: 8,
      color: '#1E293B',
      flex: 1,
      lineHeight: 1.2,
    },
    progressSection: {
      borderTopWidth: 0.5,
      borderTopColor: '#E2E8F0',
      paddingTop: 4,
      marginTop: 4,
    },
    progressHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 3,
    },
    progressTitle: {
      fontFamily: 'Roboto',
      fontSize: 7.5,
      fontWeight: 'bold',
      color: '#64748B',
      textTransform: 'uppercase',
    },
    progressKpi: {
      fontFamily: 'Roboto',
      fontSize: 7.5,
      color: '#475569',
    },
    progressBoxes: {
      flexDirection: 'row',
      gap: 2,
    },
    progressBox: {
      flex: 1,
      height: 11,
      borderWidth: 0.5,
      borderColor: '#CBD5E1',
      borderRadius: 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    progressBoxText: {
      fontFamily: 'Roboto',
      fontSize: 6.5,
      fontWeight: 'bold',
      color: '#64748B',
    },
    weeklySection: {
      borderWidth: 0.5,
      borderColor: '#CBD5E1',
      borderRadius: 4,
      padding: 6,
      backgroundColor: '#F8FAFC',
      marginBottom: 6,
    },
    weeklyHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 3,
    },
    weeklyTitle: {
      fontFamily: 'Roboto',
      fontSize: 8,
      fontWeight: 'bold',
      color: '#334155',
      textTransform: 'uppercase',
    },
    weeklyGrid: {
      flexDirection: 'row',
      gap: 3,
    },
    weekBox: {
      flex: 1,
      borderWidth: 0.5,
      borderColor: '#CBD5E1',
      backgroundColor: '#FFFFFF',
      borderRadius: 2,
      padding: 3,
      alignItems: 'center',
    },
    weekLabel: {
      fontFamily: 'Roboto',
      fontSize: 7,
      fontWeight: 'bold',
      color: '#64748B',
    },
    weekCheck: {
      width: 9,
      height: 9,
      borderWidth: 0.5,
      borderColor: '#94A3B8',
      borderRadius: 1.5,
      marginTop: 2,
    },
    notesRow: {
      borderTopWidth: 0.5,
      borderTopColor: '#CBD5E1',
      paddingTop: 4,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    notesLabel: {
      fontFamily: 'Roboto',
      fontSize: 7.5,
      fontWeight: 'bold',
      color: '#475569',
    },
    notesText: {
      fontFamily: 'Roboto',
      fontSize: 7.5,
      fontStyle: 'italic',
      color: '#64748B',
      flex: 1,
    },
  });

  return (
    <MinimalPDFDocFrame
      brandKit={brandKit}
      title={content.title}
      footerCategoryText={labels.footerCategory}
      metadataRight={
        <View style={styles.metadataRight}>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>{labels.nameLabel}</Text>
            <Text style={styles.metaLine}>{brandKit.clientName || '____________________'}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>{labels.horizonLabel}</Text>
            <Text style={styles.metaLine}>{labels.horizonValue}</Text>
          </View>
        </View>
      }
    >
      <View style={styles.container}>
        {/* Top 3 Goals */}
        <View style={styles.goalsCard}>
          <View style={styles.goalsHeader}>
            <Text style={styles.goalsTitle}>{labels.goalsTitle}</Text>
          </View>
          {content.goals.map((goal, idx) => (
            <View key={idx} style={styles.goalRow}>
              <View style={styles.goalBadge}>
                <Text style={styles.goalBadgeText}>{idx + 1}</Text>
              </View>
              <Text style={styles.goalText}>{goal}</Text>
            </View>
          ))}
          <View style={styles.whyRow}>
            <Text style={styles.whyLabel}>{labels.whyLabel}</Text>
            <Text style={styles.whyText}>{content.whyItMatters}</Text>
          </View>
        </View>

        {/* 3 Monthly Blocks */}
        <View style={styles.phasesGrid}>
          {content.phases.map((phase, pIdx) => (
            <View key={pIdx} style={styles.phaseCol}>
              <View>
                <View style={styles.phaseHeader}>
                  <Text style={styles.phaseTitle}>{phase.title}</Text>
                  <Text style={styles.phaseFocus}>{phase.focus}</Text>
                </View>
                {phase.milestones.map((m, mIdx) => (
                  <View key={mIdx} style={styles.milestoneRow}>
                    <View style={styles.checkbox} />
                    <Text style={styles.milestoneText}>{m}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.progressSection}>
                <View style={styles.progressHeader}>
                  <Text style={styles.progressTitle}>{labels.progressTitle}</Text>
                  <Text style={styles.progressKpi}>{phase.kpi}</Text>
                </View>
                <View style={styles.progressBoxes}>
                  {[20, 40, 60, 80, 100].map((pct) => (
                    <View key={pct} style={styles.progressBox}>
                      <Text style={styles.progressBoxText}>{pct}%</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Weekly Check-in Strip */}
        <View style={styles.weeklySection}>
          <View style={styles.weeklyHeader}>
            <Text style={styles.weeklyTitle}>{labels.weeklyTitle}</Text>
          </View>
          <View style={styles.weeklyGrid}>
            {Array.from({ length: 12 }, (_, i) => (
              <View key={i} style={styles.weekBox}>
                <Text style={styles.weekLabel}>{labels.weekPrefix}{i + 1}</Text>
                <View style={styles.weekCheck} />
              </View>
            ))}
          </View>
        </View>

        {/* Bottom Notes */}
        <View style={styles.notesRow}>
          <Text style={styles.notesLabel}>{labels.quarterNotesLabel}</Text>
          <Text style={styles.notesText}>{content.notes}</Text>
        </View>
      </View>
    </MinimalPDFDocFrame>
  );
};
