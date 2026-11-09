import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { BrandKit, DocumentLang, WeeklyPlannerCustomContent } from '@/types';
import { MinimalPDFDocFrame } from './minimal/MinimalPDFDocFrame';
import { getDefaultWeeklyPlannerContent } from '@/lib/use-brand-kit';
import { getLocalizedWeekdays } from '@/lib/i18n/intl-helpers';
import { CATALOG_LABELS } from '@/lib/i18n/catalog-labels';

interface VectorWeeklyPlannerPDFProps {
  brandKit: BrandKit;
}

export const VectorWeeklyPlannerPDF: React.FC<VectorWeeklyPlannerPDFProps> = ({ brandKit }) => {
  const docLang: DocumentLang = brandKit.documentLang || 'en';
  const labels = (CATALOG_LABELS[docLang] || CATALOG_LABELS.en).weeklyPlanner;
  const content: WeeklyPlannerCustomContent =
    brandKit.weeklyPlannerContent || getDefaultWeeklyPlannerContent(docLang);

  const weekdays = getLocalizedWeekdays(docLang, brandKit.weekStart || 'monday', 'short');

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
      minWidth: 80,
    },
    prioritiesCard: {
      borderWidth: 0.5,
      borderColor: '#CBD5E1',
      borderRadius: 4,
      padding: 6,
      backgroundColor: '#F8FAFC',
      marginBottom: 6,
    },
    prioritiesTitle: {
      fontFamily: 'Roboto',
      fontSize: 8,
      fontWeight: 'bold',
      color: '#334155',
      textTransform: 'uppercase',
      marginBottom: 4,
    },
    prioritiesGrid: {
      flexDirection: 'row',
      gap: 6,
    },
    priorityItem: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      backgroundColor: '#FFFFFF',
      borderWidth: 0.5,
      borderColor: '#E2E8F0',
      borderRadius: 3,
      padding: 4,
    },
    priorityBadge: {
      width: 11,
      height: 11,
      borderWidth: 0.5,
      borderColor: brandKit.brandColor,
      borderRadius: 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    priorityBadgeText: {
      fontFamily: 'Roboto',
      fontSize: 7,
      fontWeight: 'bold',
      color: brandKit.brandColor,
    },
    priorityText: {
      fontFamily: 'Roboto',
      fontSize: 7.5,
      color: '#0F172A',
      flex: 1,
    },
    daysGrid: {
      flexDirection: 'row',
      gap: 4,
      flex: 1,
      marginBottom: 6,
    },
    dayCol: {
      flex: 1,
      borderWidth: 0.5,
      borderColor: '#CBD5E1',
      borderRadius: 4,
      padding: 5,
      backgroundColor: '#FFFFFF',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    dayHeader: {
      borderBottomWidth: 0.5,
      borderBottomColor: '#E2E8F0',
      paddingBottom: 3,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    dayName: {
      fontFamily: 'Roboto',
      fontSize: 8.5,
      fontWeight: 'bold',
      color: brandKit.brandColor,
      textTransform: 'capitalize',
    },
    checkSquare: {
      width: 8,
      height: 8,
      borderWidth: 0.5,
      borderColor: '#94A3B8',
      borderRadius: 1.5,
    },
    linesCol: {
      marginTop: 6,
      flexDirection: 'column',
      gap: 12,
    },
    writingLine: {
      borderBottomWidth: 0.5,
      borderBottomColor: '#E2E8F0',
      height: 1,
    },
    dayFooter: {
      borderTopWidth: 0.5,
      borderTopColor: '#F1F5F9',
      paddingTop: 3,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    dayFooterText: {
      fontFamily: 'Roboto',
      fontSize: 6.5,
      color: '#94A3B8',
    },
    bottomSection: {
      borderWidth: 0.5,
      borderColor: '#CBD5E1',
      borderRadius: 4,
      padding: 5,
      backgroundColor: '#F8FAFC',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    notesLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      flex: 1,
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
          <Text style={styles.metaLabel}>{labels.weekOfLabel}</Text>
          <Text style={styles.metaLine}>____ / ____ / 20___</Text>
        </View>
      }
    >
      <View style={styles.container}>
        {/* Top 3 Priorities */}
        <View style={styles.prioritiesCard}>
          <Text style={styles.prioritiesTitle}>{labels.prioritiesTitle}</Text>
          <View style={styles.prioritiesGrid}>
            {content.priorities.map((p, idx) => (
              <View key={idx} style={styles.priorityItem}>
                <View style={styles.priorityBadge}>
                  <Text style={styles.priorityBadgeText}>{idx + 1}</Text>
                </View>
                <Text style={styles.priorityText}>{p}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 7 Days Columns */}
        <View style={styles.daysGrid}>
          {weekdays.map((dayName, idx) => (
            <View key={idx} style={styles.dayCol}>
              <View>
                <View style={styles.dayHeader}>
                  <Text style={styles.dayName}>{dayName}</Text>
                  <View style={styles.checkSquare} />
                </View>
                <View style={styles.linesCol}>
                  {Array.from({ length: 9 }, (_, i) => (
                    <View key={i} style={styles.writingLine} />
                  ))}
                </View>
              </View>
              <View style={styles.dayFooter}>
                <Text style={styles.dayFooterText}>{labels.dayNotesLabel}</Text>
                <Text style={styles.dayFooterText}>✓</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Bottom Notes */}
        <View style={styles.bottomSection}>
          <View style={styles.notesLeft}>
            <Text style={styles.notesLabel}>{labels.reviewNotesLabel}</Text>
            <Text style={styles.notesText}>{content.notes}</Text>
          </View>
        </View>
      </View>
    </MinimalPDFDocFrame>
  );
};
