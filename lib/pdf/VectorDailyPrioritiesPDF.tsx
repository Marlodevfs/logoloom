import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { BrandKit, DocumentLang, DailyPrioritiesCustomContent } from '@/types';
import { MinimalPDFDocFrame } from './minimal/MinimalPDFDocFrame';
import { getDefaultDailyPrioritiesContent } from '@/lib/use-brand-kit';
import { CATALOG_LABELS } from '@/lib/i18n/catalog-labels';

interface VectorDailyPrioritiesPDFProps {
  brandKit: BrandKit;
}

export const VectorDailyPrioritiesPDF: React.FC<VectorDailyPrioritiesPDFProps> = ({ brandKit }) => {
  const docLang: DocumentLang = brandKit.documentLang || 'en';
  const labels = (CATALOG_LABELS[docLang] || CATALOG_LABELS.en).dailyPriorities;
  const content: DailyPrioritiesCustomContent =
    brandKit.dailyPrioritiesContent || getDefaultDailyPrioritiesContent(docLang);

  const hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

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
    priorityRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      backgroundColor: '#FFFFFF',
      borderWidth: 0.5,
      borderColor: '#E2E8F0',
      borderRadius: 3,
      padding: 3,
      marginBottom: 3,
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
      fontSize: 8,
      color: '#0F172A',
      flex: 1,
    },
    checkSquare: {
      width: 8,
      height: 8,
      borderWidth: 0.5,
      borderColor: '#94A3B8',
      borderRadius: 1.5,
    },
    columnsRow: {
      flexDirection: 'row',
      gap: 8,
      flex: 1,
      marginBottom: 6,
    },
    scheduleCol: {
      flex: 1,
      borderWidth: 0.5,
      borderColor: '#CBD5E1',
      borderRadius: 4,
      padding: 6,
      backgroundColor: '#FFFFFF',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    tasksCol: {
      flex: 1,
      borderWidth: 0.5,
      borderColor: '#CBD5E1',
      borderRadius: 4,
      padding: 6,
      backgroundColor: '#FFFFFF',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    columnTitle: {
      fontFamily: 'Roboto',
      fontSize: 8,
      fontWeight: 'bold',
      color: brandKit.brandColor,
      textTransform: 'uppercase',
      borderBottomWidth: 0.5,
      borderBottomColor: '#E2E8F0',
      paddingBottom: 3,
      marginBottom: 5,
    },
    hourRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      marginBottom: 6,
    },
    hourText: {
      fontFamily: 'Roboto',
      fontSize: 7,
      color: '#64748B',
      width: 24,
    },
    hourLine: {
      flex: 1,
      borderBottomWidth: 0.5,
      borderBottomColor: '#E2E8F0',
      height: 1,
    },
    taskRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      marginBottom: 7,
    },
    taskText: {
      fontFamily: 'Roboto',
      fontSize: 7.5,
      color: '#1E293B',
      flex: 1,
    },
    taskLine: {
      flex: 1,
      borderBottomWidth: 0.5,
      borderBottomColor: '#F1F5F9',
      height: 1,
    },
    bottomCard: {
      borderWidth: 0.5,
      borderColor: '#CBD5E1',
      borderRadius: 4,
      padding: 5,
      backgroundColor: '#F8FAFC',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    bottomLabel: {
      fontFamily: 'Roboto',
      fontSize: 7.5,
      fontWeight: 'bold',
      color: '#475569',
    },
    bottomText: {
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
          <Text style={styles.metaLabel}>{labels.dateLabel}</Text>
          <Text style={styles.metaLine}>____ / ____ / 20___</Text>
        </View>
      }
    >
      <View style={styles.container}>
        {/* Top 3 Priorities */}
        <View style={styles.prioritiesCard}>
          <Text style={styles.prioritiesTitle}>{labels.top3Title}</Text>
          {content.priorities.map((p, idx) => (
            <View key={idx} style={styles.priorityRow}>
              <View style={styles.priorityBadge}>
                <Text style={styles.priorityBadgeText}>{idx + 1}</Text>
              </View>
              <Text style={styles.priorityText}>{p}</Text>
              <View style={styles.checkSquare} />
            </View>
          ))}
        </View>

        {/* 2 Columns: Schedule + To-Do */}
        <View style={styles.columnsRow}>
          {/* Schedule */}
          <View style={styles.scheduleCol}>
            <Text style={styles.columnTitle}>{labels.scheduleTitle}</Text>
            {hours.map((hr, idx) => (
              <View key={idx} style={styles.hourRow}>
                <Text style={styles.hourText}>{hr}</Text>
                <View style={styles.hourLine} />
              </View>
            ))}
          </View>

          {/* Tasks */}
          <View style={styles.tasksCol}>
            <Text style={styles.columnTitle}>{labels.todoTitle}</Text>
            {content.tasks.map((task, idx) => (
              <View key={idx} style={styles.taskRow}>
                <View style={styles.checkSquare} />
                <Text style={styles.taskText}>{task.text}</Text>
              </View>
            ))}
            {Array.from({ length: 4 }, (_, i) => (
              <View key={i} style={styles.taskRow}>
                <View style={styles.checkSquare} />
                <View style={styles.taskLine} />
              </View>
            ))}
          </View>
        </View>

        {/* Bottom Gratitude */}
        <View style={styles.bottomCard}>
          <Text style={styles.bottomLabel}>{labels.gratitudeLabel}</Text>
          <Text style={styles.bottomText}>{content.gratitude}</Text>
        </View>
      </View>
    </MinimalPDFDocFrame>
  );
};
