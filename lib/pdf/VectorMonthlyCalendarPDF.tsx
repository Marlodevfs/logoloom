import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { BrandKit, DocumentLang, MonthlyCalendarCustomContent } from '@/types';
import { MinimalPDFDocFrame } from './minimal/MinimalPDFDocFrame';
import { getDefaultMonthlyCalendarContent } from '@/lib/use-brand-kit';
import { getLocalizedWeekdays } from '@/lib/i18n/intl-helpers';
import { CATALOG_LABELS } from '@/lib/i18n/catalog-labels';

interface VectorMonthlyCalendarPDFProps {
  brandKit: BrandKit;
}

export const VectorMonthlyCalendarPDF: React.FC<VectorMonthlyCalendarPDFProps> = ({ brandKit }) => {
  const docLang: DocumentLang = brandKit.documentLang || 'en';
  const labels = (CATALOG_LABELS[docLang] || CATALOG_LABELS.en).monthlyCalendar;
  const content: MonthlyCalendarCustomContent =
    brandKit.monthlyCalendarContent || getDefaultMonthlyCalendarContent(docLang);

  const weekdays = getLocalizedWeekdays(docLang, brandKit.weekStart || 'monday', 'short');

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      gap: 8,
      paddingVertical: 4,
    },
    metadataRight: {
      flexDirection: 'row',
      gap: 6,
      alignItems: 'flex-end',
    },
    monthNameText: {
      fontFamily: 'Roboto',
      fontSize: 9,
      fontWeight: 'bold',
      color: '#0F172A',
    },
    yearText: {
      fontFamily: 'Roboto',
      fontSize: 9,
      fontWeight: 'bold',
      color: '#64748B',
    },
    gridCol: {
      flex: 1,
      borderWidth: 0.5,
      borderColor: '#CBD5E1',
      borderRadius: 4,
      flexDirection: 'column',
      overflow: 'hidden',
    },
    weekdayHeaderRow: {
      flexDirection: 'row',
      backgroundColor: '#F8FAFC',
      borderBottomWidth: 0.5,
      borderBottomColor: '#CBD5E1',
      paddingVertical: 4,
    },
    weekdayHeaderCell: {
      flex: 1,
      textAlign: 'center',
      fontFamily: 'Roboto',
      fontSize: 7.5,
      fontWeight: 'bold',
      color: '#475569',
      textTransform: 'uppercase',
    },
    calendarRow: {
      flexDirection: 'row',
      flex: 1,
      borderBottomWidth: 0.5,
      borderBottomColor: '#E2E8F0',
    },
    calendarCell: {
      flex: 1,
      borderRightWidth: 0.5,
      borderRightColor: '#E2E8F0',
      padding: 3,
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    cellDayNum: {
      fontFamily: 'Roboto',
      fontSize: 7.5,
      fontWeight: 'bold',
      color: '#0F172A',
    },
    cellLine: {
      borderBottomWidth: 0.5,
      borderBottomColor: '#F1F5F9',
      height: 1,
      marginTop: 4,
    },
    sidebarCol: {
      width: 140,
      borderWidth: 0.5,
      borderColor: '#CBD5E1',
      borderRadius: 4,
      padding: 6,
      backgroundColor: '#F8FAFC',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    sidebarSectionTitle: {
      fontFamily: 'Roboto',
      fontSize: 8,
      fontWeight: 'bold',
      color: brandKit.brandColor,
      textTransform: 'uppercase',
      marginBottom: 4,
      borderBottomWidth: 0.5,
      borderBottomColor: '#CBD5E1',
      paddingBottom: 2,
    },
    goalItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 4,
      marginBottom: 5,
    },
    checkbox: {
      width: 8,
      height: 8,
      borderWidth: 0.5,
      borderColor: '#94A3B8',
      borderRadius: 1.5,
      marginTop: 1,
    },
    goalText: {
      fontFamily: 'Roboto',
      fontSize: 7.5,
      color: '#1E293B',
      flex: 1,
    },
    datesSection: {
      marginTop: 8,
      borderTopWidth: 0.5,
      borderTopColor: '#E2E8F0',
      paddingTop: 6,
    },
    datesTitle: {
      fontFamily: 'Roboto',
      fontSize: 7.5,
      fontWeight: 'bold',
      color: '#475569',
      textTransform: 'uppercase',
      marginBottom: 4,
    },
    dateLineItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 3,
      marginBottom: 4,
    },
    datePrefix: {
      fontFamily: 'Roboto',
      fontSize: 7,
      color: '#94A3B8',
      width: 16,
    },
    dateLine: {
      flex: 1,
      borderBottomWidth: 0.5,
      borderBottomColor: '#E2E8F0',
      height: 1,
    },
    notesSection: {
      marginTop: 8,
      borderTopWidth: 0.5,
      borderTopColor: '#E2E8F0',
      paddingTop: 4,
    },
    notesTitle: {
      fontFamily: 'Roboto',
      fontSize: 7.5,
      fontWeight: 'bold',
      color: '#475569',
      textTransform: 'uppercase',
      marginBottom: 2,
    },
    notesText: {
      fontFamily: 'Roboto',
      fontSize: 7,
      color: '#64748B',
      lineHeight: 1.2,
    },
  });

  // 5 rows of 7 days
  const rows = [
    [1, 2, 3, 4, 5, 6, 7],
    [8, 9, 10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19, 20, 21],
    [22, 23, 24, 25, 26, 27, 28],
    [29, 30, 31, 0, 0, 0, 0],
  ];

  return (
    <MinimalPDFDocFrame
      brandKit={brandKit}
      title={content.title}
      footerCategoryText={labels.footerCategory}
      metadataRight={
        <View style={styles.metadataRight}>
          <Text style={styles.monthNameText}>{content.monthName}</Text>
          <Text style={styles.yearText}>{content.year}</Text>
        </View>
      }
    >
      <View style={styles.container}>
        {/* Calendar Grid */}
        <View style={styles.gridCol}>
          <View style={styles.weekdayHeaderRow}>
            {weekdays.map((day, idx) => (
              <Text key={idx} style={styles.weekdayHeaderCell}>
                {day}
              </Text>
            ))}
          </View>
          {rows.map((row, rIdx) => (
            <View key={rIdx} style={styles.calendarRow}>
              {row.map((dayNum, cIdx) => (
                <View key={cIdx} style={styles.calendarCell}>
                  <Text
                    style={[
                      styles.cellDayNum,
                      dayNum === 1 ? { color: brandKit.brandColor } : {},
                    ]}
                  >
                    {dayNum > 0 ? String(dayNum).padStart(2, '0') : ''}
                  </Text>
                  {dayNum > 0 ? (
                    <View>
                      <View style={styles.cellLine} />
                      <View style={styles.cellLine} />
                    </View>
                  ) : null}
                </View>
              ))}
            </View>
          ))}
        </View>

        {/* Sidebar */}
        <View style={styles.sidebarCol}>
          <View>
            <Text style={styles.sidebarSectionTitle}>{labels.goalsTitle}</Text>
            {content.goals.map((g, idx) => (
              <View key={idx} style={styles.goalItem}>
                <View style={styles.checkbox} />
                <Text style={styles.goalText}>{g}</Text>
              </View>
            ))}

            <View style={styles.datesSection}>
              <Text style={styles.datesTitle}>{labels.notesTitle}</Text>
              {Array.from({ length: 4 }, (_, i) => (
                <View key={i} style={styles.dateLineItem}>
                  <Text style={styles.datePrefix}>__/</Text>
                  <View style={styles.dateLine} />
                </View>
              ))}
            </View>
          </View>

          <View style={styles.notesSection}>
            <Text style={styles.notesTitle}>{labels.notesTitle}</Text>
            <Text style={styles.notesText}>{content.notes}</Text>
          </View>
        </View>
      </View>
    </MinimalPDFDocFrame>
  );
};
