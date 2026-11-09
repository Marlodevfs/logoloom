import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { BrandKit, DocumentLang, ClientTrackerCustomContent } from '@/types';
import { MinimalPDFDocFrame } from './minimal/MinimalPDFDocFrame';
import { getDefaultClientTrackerContent } from '@/lib/use-brand-kit';
import { CATALOG_LABELS } from '@/lib/i18n/catalog-labels';

interface VectorClientTrackerPDFProps {
  brandKit: BrandKit;
}

export const VectorClientTrackerPDF: React.FC<VectorClientTrackerPDFProps> = ({ brandKit }) => {
  const docLang: DocumentLang = brandKit.documentLang || 'en';
  const labels = (CATALOG_LABELS[docLang] || CATALOG_LABELS.en).clientTracker;
  const content: ClientTrackerCustomContent =
    brandKit.clientTrackerContent || getDefaultClientTrackerContent(docLang);

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
    tableContainer: {
      flex: 1,
      borderWidth: 0.5,
      borderColor: '#CBD5E1',
      borderRadius: 4,
      overflow: 'hidden',
      flexDirection: 'column',
      marginBottom: 6,
    },
    tableHeader: {
      flexDirection: 'row',
      backgroundColor: '#F8FAFC',
      borderBottomWidth: 0.75,
      borderBottomColor: '#CBD5E1',
      paddingVertical: 4,
      paddingHorizontal: 4,
    },
    thDate: {
      width: 35,
      fontFamily: 'Roboto',
      fontSize: 7,
      fontWeight: 'bold',
      color: '#475569',
      textTransform: 'uppercase',
    },
    thClient: {
      width: 90,
      fontFamily: 'Roboto',
      fontSize: 7,
      fontWeight: 'bold',
      color: '#475569',
      textTransform: 'uppercase',
    },
    thService: {
      flex: 1,
      fontFamily: 'Roboto',
      fontSize: 7,
      fontWeight: 'bold',
      color: '#475569',
      textTransform: 'uppercase',
    },
    thDuration: {
      width: 35,
      textAlign: 'center',
      fontFamily: 'Roboto',
      fontSize: 7,
      fontWeight: 'bold',
      color: '#475569',
      textTransform: 'uppercase',
    },
    thStatus: {
      width: 45,
      textAlign: 'center',
      fontFamily: 'Roboto',
      fontSize: 7,
      fontWeight: 'bold',
      color: '#475569',
      textTransform: 'uppercase',
    },
    thNotes: {
      width: 100,
      fontFamily: 'Roboto',
      fontSize: 7,
      fontWeight: 'bold',
      color: '#475569',
      textTransform: 'uppercase',
    },
    tableRow: {
      flexDirection: 'row',
      borderBottomWidth: 0.5,
      borderBottomColor: '#F1F5F9',
      paddingVertical: 3.5,
      paddingHorizontal: 4,
      alignItems: 'center',
    },
    tdDate: {
      width: 35,
      fontFamily: 'Roboto',
      fontSize: 7.5,
      color: '#475569',
    },
    tdClient: {
      width: 90,
      fontFamily: 'Roboto',
      fontSize: 7.5,
      fontWeight: 'bold',
      color: '#0F172A',
    },
    tdService: {
      flex: 1,
      fontFamily: 'Roboto',
      fontSize: 7.5,
      color: '#334155',
    },
    tdDuration: {
      width: 35,
      textAlign: 'center',
      fontFamily: 'Roboto',
      fontSize: 7,
      color: '#475569',
    },
    tdStatus: {
      width: 45,
      textAlign: 'center',
      fontFamily: 'Roboto',
      fontSize: 7,
      color: '#475569',
    },
    tdNotes: {
      width: 100,
      fontFamily: 'Roboto',
      fontSize: 7,
      fontStyle: 'italic',
      color: '#64748B',
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
    bottomLeft: {
      fontFamily: 'Roboto',
      fontSize: 7.5,
      fontWeight: 'bold',
      color: '#334155',
    },
    bottomRight: {
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
          <Text style={styles.metaLabel}>Période :</Text>
          <Text style={styles.metaValue}>En cours</Text>
        </View>
      }
    >
      <View style={styles.container}>
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.thDate}>{labels.colDate}</Text>
            <Text style={styles.thClient}>{labels.colClient}</Text>
            <Text style={styles.thService}>{labels.colService}</Text>
            <Text style={styles.thDuration}>{labels.colDuration}</Text>
            <Text style={styles.thStatus}>{labels.colStatus}</Text>
            <Text style={styles.thNotes}>{labels.colNotes}</Text>
          </View>
          {content.sessions.map((item, idx) => (
            <View key={idx} style={styles.tableRow}>
              <Text style={styles.tdDate}>{item.date}</Text>
              <Text style={styles.tdClient}>{item.client}</Text>
              <Text style={styles.tdService}>{item.service}</Text>
              <Text style={styles.tdDuration}>{item.duration}</Text>
              <Text style={styles.tdStatus}>{item.status}</Text>
              <Text style={styles.tdNotes}>{item.notes}</Text>
            </View>
          ))}
          {Array.from({ length: 8 }, (_, i) => (
            <View key={`b-${i}`} style={styles.tableRow}>
              <Text style={[styles.tdDate, { color: '#CBD5E1' }]}>__/</Text>
              <Text style={styles.tdClient} />
              <Text style={styles.tdService} />
              <Text style={[styles.tdDuration, { color: '#CBD5E1' }]}>__m</Text>
              <Text style={styles.tdStatus} />
              <Text style={styles.tdNotes} />
            </View>
          ))}
        </View>

        <View style={styles.bottomStrip}>
          <Text style={styles.bottomLeft}>
            Séances enregistrées : {content.sessions.length}
          </Text>
          <Text style={styles.bottomRight}>{content.notes}</Text>
        </View>
      </View>
    </MinimalPDFDocFrame>
  );
};
