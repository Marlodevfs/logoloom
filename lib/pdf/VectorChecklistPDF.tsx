import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { BrandKit, DocumentLang, ChecklistCustomContent } from '@/types';
import { MinimalPDFDocFrame } from './minimal/MinimalPDFDocFrame';
import { getDefaultChecklistContent } from '@/lib/use-brand-kit';
import { CATALOG_LABELS } from '@/lib/i18n/catalog-labels';

interface VectorChecklistPDFProps {
  brandKit: BrandKit;
}

export const VectorChecklistPDF: React.FC<VectorChecklistPDFProps> = ({ brandKit }) => {
  const docLang: DocumentLang = brandKit.documentLang || 'en';
  const labels = (CATALOG_LABELS[docLang] || CATALOG_LABELS.en).checklist;
  const content: ChecklistCustomContent =
    brandKit.checklistContent || getDefaultChecklistContent(docLang);

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
    groupsCol: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      gap: 6,
      marginBottom: 6,
    },
    groupCard: {
      borderWidth: 0.5,
      borderColor: '#CBD5E1',
      borderRadius: 4,
      padding: 6,
      backgroundColor: '#FFFFFF',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
    groupHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 0.5,
      borderBottomColor: '#E2E8F0',
      paddingBottom: 3,
      marginBottom: 5,
    },
    groupTitle: {
      fontFamily: 'Roboto',
      fontSize: 8.5,
      fontWeight: 'bold',
      color: brandKit.brandColor,
      textTransform: 'uppercase',
    },
    groupBadge: {
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
      alignItems: 'flex-start',
      gap: 5,
      marginVertical: 2,
    },
    checkbox: {
      width: 9,
      height: 9,
      borderWidth: 0.5,
      borderColor: '#94A3B8',
      borderRadius: 1.5,
      marginTop: 1,
    },
    itemText: {
      fontFamily: 'Roboto',
      fontSize: 8,
      color: '#1E293B',
      flex: 1,
      lineHeight: 1.2,
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
    notesLeft: {
      flex: 1,
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
      fontSize: 7,
      fontStyle: 'italic',
      color: '#64748B',
      flex: 1,
    },
    signBlock: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      borderLeftWidth: 0.5,
      borderLeftColor: '#CBD5E1',
      paddingLeft: 8,
    },
    signLabel: {
      fontFamily: 'Roboto',
      fontSize: 7,
      fontWeight: 'bold',
      color: '#64748B',
    },
    signLine: {
      width: 50,
      borderBottomWidth: 0.5,
      borderBottomColor: '#94A3B8',
      height: 1,
    },
  });

  return (
    <MinimalPDFDocFrame
      brandKit={brandKit}
      title={content.title}
      footerCategoryText={labels.footerCategory}
      metadataRight={
        <View style={styles.metadataRight}>
          <Text style={styles.metaLabel}>{labels.targetDateLabel}</Text>
          <Text style={styles.metaValue}>____ / ____ / 20___</Text>
        </View>
      }
    >
      <View style={styles.container}>
        {/* Groups */}
        <View style={styles.groupsCol}>
          {content.groups.map((group, gIdx) => (
            <View key={gIdx} style={styles.groupCard}>
              <View style={styles.groupHeader}>
                <Text style={styles.groupTitle}>{group.groupName}</Text>
                <Text style={styles.groupBadge}>
                  {group.items.filter((i) => i.done).length} / {group.items.length} validés
                </Text>
              </View>
              <View style={styles.itemsContainer}>
                {group.items.map((item, iIdx) => (
                  <View key={iIdx} style={styles.itemRow}>
                    <View style={styles.checkbox} />
                    <Text style={styles.itemText}>{item.text}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* Bottom notes & sign-off */}
        <View style={styles.bottomStrip}>
          <View style={styles.notesLeft}>
            <Text style={styles.notesLabel}>Remarques :</Text>
            <Text style={styles.notesText}>{content.notes}</Text>
          </View>
          <View style={styles.signBlock}>
            <Text style={styles.signLabel}>Validation :</Text>
            <View style={styles.signLine} />
          </View>
        </View>
      </View>
    </MinimalPDFDocFrame>
  );
};
