import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { BrandKit, DocumentLang, MealPlannerCustomContent } from '@/types';
import { MinimalPDFDocFrame } from './minimal/MinimalPDFDocFrame';
import { getDefaultMealPlannerContent } from '@/lib/use-brand-kit';
import { getLocalizedWeekdays } from '@/lib/i18n/intl-helpers';
import { CATALOG_LABELS } from '@/lib/i18n/catalog-labels';
import { MINIMAL_HABIT_LABELS } from '@/lib/i18n/minimal-labels';

interface VectorMealPlannerPDFProps {
  brandKit: BrandKit;
}

export const VectorMealPlannerPDF: React.FC<VectorMealPlannerPDFProps> = ({ brandKit }) => {
  const docLang: DocumentLang = brandKit.documentLang || 'en';
  const labels = (CATALOG_LABELS[docLang] || CATALOG_LABELS.en).mealPlanner;
  const habitLabels = MINIMAL_HABIT_LABELS[docLang] || MINIMAL_HABIT_LABELS.en;
  const content: MealPlannerCustomContent =
    brandKit.mealPlannerContent || getDefaultMealPlannerContent(docLang);

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
    tableCol: {
      flex: 1,
      borderWidth: 0.5,
      borderColor: '#CBD5E1',
      borderRadius: 4,
      flexDirection: 'column',
      overflow: 'hidden',
    },
    headerRow: {
      flexDirection: 'row',
      backgroundColor: '#F8FAFC',
      borderBottomWidth: 0.5,
      borderBottomColor: '#CBD5E1',
      paddingVertical: 4,
    },
    dayHeaderCell: {
      width: 48,
      paddingLeft: 4,
      fontFamily: 'Roboto',
      fontSize: 7.5,
      fontWeight: 'bold',
      color: '#475569',
      textTransform: 'uppercase',
    },
    mealHeaderCell: {
      flex: 1,
      textAlign: 'center',
      fontFamily: 'Roboto',
      fontSize: 7.5,
      fontWeight: 'bold',
      color: '#475569',
      textTransform: 'uppercase',
    },
    dayRow: {
      flexDirection: 'row',
      flex: 1,
      borderBottomWidth: 0.5,
      borderBottomColor: '#E2E8F0',
      alignItems: 'center',
    },
    dayNameCell: {
      width: 48,
      paddingLeft: 4,
      fontFamily: 'Roboto',
      fontSize: 7.5,
      fontWeight: 'bold',
      color: '#0F172A',
      borderRightWidth: 0.5,
      borderRightColor: '#E2E8F0',
      height: '100%',
      justifyContent: 'center',
    },
    mealCell: {
      flex: 1,
      padding: 3,
      borderRightWidth: 0.5,
      borderRightColor: '#E2E8F0',
      height: '100%',
      justifyContent: 'center',
    },
    snackCell: {
      flex: 1,
      padding: 3,
      height: '100%',
      justifyContent: 'center',
    },
    mealText: {
      fontFamily: 'Roboto',
      fontSize: 7,
      color: '#334155',
      lineHeight: 1.15,
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
    sidebarTitle: {
      fontFamily: 'Roboto',
      fontSize: 8,
      fontWeight: 'bold',
      color: brandKit.brandColor,
      textTransform: 'uppercase',
      borderBottomWidth: 0.5,
      borderBottomColor: '#CBD5E1',
      paddingBottom: 2,
      marginBottom: 5,
    },
    shoppingItemRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 4,
      marginBottom: 6,
    },
    checkSquare: {
      width: 8,
      height: 8,
      borderWidth: 0.5,
      borderColor: '#94A3B8',
      borderRadius: 1.5,
      marginTop: 1,
    },
    shoppingText: {
      fontFamily: 'Roboto',
      fontSize: 7.5,
      color: '#1E293B',
      flex: 1,
    },
    blankShoppingLine: {
      flex: 1,
      borderBottomWidth: 0.5,
      borderBottomColor: '#E2E8F0',
      height: 1,
      marginTop: 4,
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
        {/* Table of 7 Days */}
        <View style={styles.tableCol}>
          <View style={styles.headerRow}>
            <Text style={styles.dayHeaderCell}>{habitLabels.day}</Text>
            <Text style={styles.mealHeaderCell}>{labels.breakfast}</Text>
            <Text style={styles.mealHeaderCell}>{labels.lunch}</Text>
            <Text style={styles.mealHeaderCell}>{labels.dinner}</Text>
            <Text style={styles.mealHeaderCell}>{labels.snack}</Text>
          </View>
          {weekdays.map((dayName, idx) => {
            const dayMeals = content.days[idx] || { breakfast: '', lunch: '', dinner: '', snack: '' };
            return (
              <View key={idx} style={styles.dayRow}>
                <View style={styles.dayNameCell}>
                  <Text>{dayName}</Text>
                </View>
                <View style={styles.mealCell}>
                  <Text style={styles.mealText}>{dayMeals.breakfast}</Text>
                </View>
                <View style={styles.mealCell}>
                  <Text style={styles.mealText}>{dayMeals.lunch}</Text>
                </View>
                <View style={styles.mealCell}>
                  <Text style={styles.mealText}>{dayMeals.dinner}</Text>
                </View>
                <View style={styles.snackCell}>
                  <Text style={styles.mealText}>{dayMeals.snack}</Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* Shopping list sidebar */}
        <View style={styles.sidebarCol}>
          <View>
            <Text style={styles.sidebarTitle}>{labels.shoppingListTitle}</Text>
            {content.shoppingItems.map((item, idx) => (
              <View key={idx} style={styles.shoppingItemRow}>
                <View style={styles.checkSquare} />
                <Text style={styles.shoppingText}>{item}</Text>
              </View>
            ))}
            {Array.from({ length: 5 }, (_, i) => (
              <View key={i} style={styles.shoppingItemRow}>
                <View style={styles.checkSquare} />
                <View style={styles.blankShoppingLine} />
              </View>
            ))}
          </View>
        </View>
      </View>
    </MinimalPDFDocFrame>
  );
};
