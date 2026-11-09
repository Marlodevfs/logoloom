import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { BrandKit, DocumentLang, PriceListCustomContent } from '@/types';
import { MinimalPDFDocFrame } from './minimal/MinimalPDFDocFrame';
import { getDefaultPriceListContent } from '@/lib/use-brand-kit';
import { formatCurrencyAmount } from '@/lib/i18n/intl-helpers';
import { CATALOG_LABELS } from '@/lib/i18n/catalog-labels';

interface VectorPriceListPDFProps {
  brandKit: BrandKit;
}

export const VectorPriceListPDF: React.FC<VectorPriceListPDFProps> = ({ brandKit }) => {
  const docLang: DocumentLang = brandKit.documentLang || 'en';
  const labels = (CATALOG_LABELS[docLang] || CATALOG_LABELS.en).priceList;
  const currency = brandKit.currency || '€';
  const content: PriceListCustomContent =
    brandKit.priceListContent || getDefaultPriceListContent(docLang);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      paddingVertical: 4,
    },
    metadataRight: {
      flexDirection: 'row',
      gap: 4,
      alignItems: 'flex-end',
    },
    metaLabel: {
      fontFamily: 'Roboto',
      fontSize: 7.5,
      fontWeight: 'bold',
      color: '#475569',
    },
    metaValue: {
      fontFamily: 'Roboto',
      fontSize: 7.5,
      color: '#0F172A',
    },
    categoriesCol: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      gap: 6,
      marginBottom: 6,
    },
    categoryCard: {
      borderWidth: 0.5,
      borderColor: '#CBD5E1',
      borderRadius: 4,
      padding: 6,
      backgroundColor: '#FFFFFF',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
    categoryHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 0.5,
      borderBottomColor: '#E2E8F0',
      paddingBottom: 3,
      marginBottom: 5,
    },
    categoryTitle: {
      fontFamily: 'Roboto',
      fontSize: 8.5,
      fontWeight: 'bold',
      color: brandKit.brandColor,
      textTransform: 'uppercase',
    },
    categoryBadge: {
      fontFamily: 'Roboto',
      fontSize: 6.5,
      color: '#94A3B8',
    },
    itemsContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-around',
    },
    itemRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: 8,
      marginVertical: 2,
    },
    itemLeft: {
      flex: 1,
      flexDirection: 'column',
    },
    itemName: {
      fontFamily: 'Roboto',
      fontSize: 8,
      fontWeight: 'bold',
      color: '#0F172A',
    },
    itemDesc: {
      fontFamily: 'Roboto',
      fontSize: 7,
      color: '#64748B',
      marginTop: 1,
      lineHeight: 1.2,
    },
    itemPrice: {
      fontFamily: 'Roboto',
      fontSize: 8.5,
      fontWeight: 'bold',
      color: '#0F172A',
      textAlign: 'right',
    },
    bottomStrip: {
      borderWidth: 0.5,
      borderColor: '#CBD5E1',
      borderRadius: 4,
      padding: 5,
      backgroundColor: '#F8FAFC',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    notesText: {
      fontFamily: 'Roboto',
      fontSize: 7,
      fontStyle: 'italic',
      color: '#64748B',
    },
  });

  return (
    <MinimalPDFDocFrame
      brandKit={brandKit}
      title={content.title}
      footerCategoryText={labels.footerCategory}
      metadataRight={
        <View style={styles.metadataRight}>
          <Text style={styles.metaLabel}>{labels.lastUpdatedLabel}</Text>
          <Text style={styles.metaValue}>2026 / 2027</Text>
        </View>
      }
    >
      <View style={styles.container}>
        {/* Categories */}
        <View style={styles.categoriesCol}>
          {content.categories.map((cat, cIdx) => (
            <View key={cIdx} style={styles.categoryCard}>
              <View style={styles.categoryHeader}>
                <Text style={styles.categoryTitle}>{cat.category}</Text>
                <Text style={styles.categoryBadge}>Catégorie {cIdx + 1}</Text>
              </View>
              <View style={styles.itemsContainer}>
                {cat.items.map((item, iIdx) => (
                  <View key={iIdx} style={styles.itemRow}>
                    <View style={styles.itemLeft}>
                      <Text style={styles.itemName}>{item.name}</Text>
                      <Text style={styles.itemDesc}>{item.description}</Text>
                    </View>
                    <Text style={styles.itemPrice}>
                      {formatCurrencyAmount(item.price, currency, docLang)}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* Bottom Terms */}
        <View style={styles.bottomStrip}>
          <Text style={styles.notesText}>{content.notes}</Text>
        </View>
      </View>
    </MinimalPDFDocFrame>
  );
};
