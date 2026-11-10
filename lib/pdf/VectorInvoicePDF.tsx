import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { BrandKit, DocumentLang, InvoiceCustomContent } from '@/types';
import { MinimalPDFDocFrame } from './minimal/MinimalPDFDocFrame';
import { getDefaultInvoiceContent } from '@/lib/use-brand-kit';
import { formatCurrencyAmount } from '@/lib/i18n/intl-helpers';
import { CATALOG_LABELS } from '@/lib/i18n/catalog-labels';
import { getPartyPlaceholders } from '@/lib/i18n/party-placeholders';
import { computeTotals } from '@/lib/billing';

interface VectorInvoicePDFProps {
  brandKit: BrandKit;
}

export const VectorInvoicePDF: React.FC<VectorInvoicePDFProps> = ({ brandKit }) => {
  const docLang: DocumentLang = brandKit.documentLang || 'en';
  const labels = (CATALOG_LABELS[docLang] || CATALOG_LABELS.en).invoice;
  const currency = brandKit.currency || '€';
  const content: InvoiceCustomContent =
    brandKit.invoiceContent || getDefaultInvoiceContent(docLang);

  const { subtotal, taxAmount, total } = computeTotals(content.items, content.taxRate, content.vatExempt);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      paddingVertical: 4,
    },
    metadataRight: {
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: 1,
    },
    metaRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 3,
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
    addressesRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 16,
      borderBottomWidth: 0.5,
      borderBottomColor: '#CBD5E1',
      paddingBottom: 8,
      marginBottom: 8,
    },
    addressCol: {
      flex: 1,
      flexDirection: 'column',
    },
    clientCard: {
      flex: 1,
      backgroundColor: '#F8FAFC',
      borderWidth: 0.5,
      borderColor: '#CBD5E1',
      borderRadius: 4,
      padding: 6,
      flexDirection: 'column',
    },
    addressTag: {
      fontFamily: 'Roboto',
      fontSize: 7,
      fontWeight: 'bold',
      color: '#64748B',
      textTransform: 'uppercase',
      marginBottom: 2,
    },
    addressName: {
      fontFamily: 'Roboto',
      fontSize: 8.5,
      fontWeight: 'bold',
      color: '#0F172A',
      marginBottom: 2,
    },
    addressText: {
      fontFamily: 'Roboto',
      fontSize: 7.5,
      color: '#475569',
      lineHeight: 1.25,
    },
    tableContainer: {
      flex: 1,
      flexDirection: 'column',
      marginBottom: 8,
    },
    tableHeader: {
      flexDirection: 'row',
      backgroundColor: '#F8FAFC',
      borderBottomWidth: 0.75,
      borderBottomColor: '#CBD5E1',
      paddingVertical: 4,
      paddingHorizontal: 4,
    },
    thDesc: {
      flex: 1,
      fontFamily: 'Roboto',
      fontSize: 7.5,
      fontWeight: 'bold',
      color: '#475569',
      textTransform: 'uppercase',
    },
    thQty: {
      width: 40,
      textAlign: 'center',
      fontFamily: 'Roboto',
      fontSize: 7.5,
      fontWeight: 'bold',
      color: '#475569',
      textTransform: 'uppercase',
    },
    thPrice: {
      width: 65,
      textAlign: 'right',
      fontFamily: 'Roboto',
      fontSize: 7.5,
      fontWeight: 'bold',
      color: '#475569',
      textTransform: 'uppercase',
    },
    thTotal: {
      width: 65,
      textAlign: 'right',
      fontFamily: 'Roboto',
      fontSize: 7.5,
      fontWeight: 'bold',
      color: '#475569',
      textTransform: 'uppercase',
    },
    tableRow: {
      flexDirection: 'row',
      borderBottomWidth: 0.5,
      borderBottomColor: '#E2E8F0',
      paddingVertical: 5,
      paddingHorizontal: 4,
      alignItems: 'center',
    },
    tdDesc: {
      flex: 1,
      fontFamily: 'Roboto',
      fontSize: 8,
      color: '#0F172A',
    },
    tdQty: {
      width: 40,
      textAlign: 'center',
      fontFamily: 'Roboto',
      fontSize: 8,
      color: '#475569',
    },
    tdPrice: {
      width: 65,
      textAlign: 'right',
      fontFamily: 'Roboto',
      fontSize: 8,
      color: '#475569',
    },
    tdTotal: {
      width: 65,
      textAlign: 'right',
      fontFamily: 'Roboto',
      fontSize: 8,
      fontWeight: 'bold',
      color: '#0F172A',
    },
    bottomGrid: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 16,
      borderTopWidth: 0.5,
      borderTopColor: '#CBD5E1',
      paddingTop: 8,
    },
    bankCol: {
      flex: 1,
      backgroundColor: '#F8FAFC',
      borderWidth: 0.5,
      borderColor: '#CBD5E1',
      borderRadius: 4,
      padding: 6,
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    bankTitle: {
      fontFamily: 'Roboto',
      fontSize: 7,
      fontWeight: 'bold',
      color: '#475569',
      textTransform: 'uppercase',
      marginBottom: 3,
    },
    bankText: {
      fontFamily: 'Roboto',
      fontSize: 7,
      color: '#334155',
      lineHeight: 1.25,
    },
    notesText: {
      fontFamily: 'Roboto',
      fontSize: 6.5,
      fontStyle: 'italic',
      color: '#64748B',
      marginTop: 4,
      borderTopWidth: 0.5,
      borderTopColor: '#E2E8F0',
      paddingTop: 2,
    },
    totalsCol: {
      width: 170,
      flexDirection: 'column',
      gap: 3,
    },
    calcRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 1,
    },
    calcLabel: {
      fontFamily: 'Roboto',
      fontSize: 7.5,
      color: '#64748B',
    },
    calcVal: {
      fontFamily: 'Roboto',
      fontSize: 7.5,
      color: '#0F172A',
    },
    grandTotalRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderTopWidth: 1.5,
      borderTopColor: brandKit.brandColor,
      paddingTop: 4,
      marginTop: 3,
    },
    grandTotalLabel: {
      fontFamily: 'Roboto',
      fontSize: 8.5,
      fontWeight: 'bold',
      color: brandKit.brandColor,
    },
    legalLine: {
      fontFamily: 'Roboto',
      fontSize: 7.5,
      fontWeight: 'bold',
      color: '#334155',
      marginBottom: 1,
    },
    clientIdLine: {
      fontFamily: 'Roboto',
      fontSize: 7.5,
      color: '#475569',
      marginBottom: 1,
    },
    termsSmall: {
      fontFamily: 'Roboto',
      fontSize: 6.3,
      color: '#64748B',
      marginTop: 3,
      lineHeight: 1.3,
    },
    exemptNote: {
      fontFamily: 'Roboto',
      fontSize: 7,
      color: '#475569',
      textAlign: 'right',
      marginTop: 2,
    },
    grandTotalVal: {
      fontFamily: 'Roboto',
      fontSize: 9,
      fontWeight: 'bold',
      color: brandKit.brandColor,
    },
  });

  return (
    <MinimalPDFDocFrame
      brandKit={brandKit}
      title={content.title}
      footerCategoryText={labels.footerCategory}
      metadataRight={
        <View style={styles.metadataRight}>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>{labels.invoiceNumberLabel}</Text>
            <Text style={styles.metaValue}>{content.invoiceNumber}</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>{labels.dateLabel}</Text>
            <Text style={styles.metaValue}>{content.date}</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>{labels.dueDateLabel}</Text>
            <Text style={styles.metaValue}>{content.dueDate}</Text>
          </View>
          {content.serviceDate ? (
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>{labels.serviceDateLabel}</Text>
              <Text style={styles.metaValue}>{content.serviceDate}</Text>
            </View>
          ) : null}
        </View>
      }
    >
      <View style={styles.container}>
        {/* Addresses */}
        <View style={styles.addressesRow}>
          <View style={styles.addressCol}>
            <Text style={styles.addressTag}>{labels.fromLabel}</Text>
            <Text style={styles.addressName}>{brandKit.companyName || getPartyPlaceholders(brandKit.documentLang).company}</Text>
            {content.legalId ? <Text style={styles.legalLine}>{content.legalId}</Text> : null}
            <Text style={styles.addressText}>{content.senderAddress}</Text>
          </View>
          <View style={styles.clientCard}>
            <Text style={styles.addressTag}>{labels.toLabel}</Text>
            <Text style={styles.addressName}>{brandKit.clientName || getPartyPlaceholders(brandKit.documentLang).client}</Text>
            {content.clientId ? <Text style={styles.clientIdLine}>{content.clientId}</Text> : null}
            <Text style={styles.addressText}>{content.clientAddress}</Text>
          </View>
        </View>

        {/* Line Items */}
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.thDesc}>{labels.colDesc}</Text>
            <Text style={styles.thQty}>{labels.colQty}</Text>
            <Text style={styles.thPrice}>{labels.colUnitPrice}</Text>
            <Text style={styles.thTotal}>{labels.colTotal}</Text>
          </View>
          {content.items.map((item, idx) => (
            <View key={idx} style={styles.tableRow}>
              <Text style={styles.tdDesc}>{item.description}</Text>
              <Text style={styles.tdQty}>{item.quantity}</Text>
              <Text style={styles.tdPrice}>{formatCurrencyAmount(item.unitPrice, currency, docLang)}</Text>
              <Text style={styles.tdTotal}>
                {formatCurrencyAmount(item.quantity * item.unitPrice, currency, docLang)}
              </Text>
            </View>
          ))}
        </View>

        {/* Bottom Payment info & Totals */}
        <View style={styles.bottomGrid}>
          <View style={styles.bankCol}>
            <View>
              <Text style={styles.bankTitle}>{labels.paymentDetailsTitle}</Text>
              <Text style={styles.bankText}>{content.paymentDetails}</Text>
            </View>
            <View>
              <Text style={styles.notesText}>{content.notes}</Text>
              {content.latePaymentTerms ? <Text style={styles.termsSmall}>{content.latePaymentTerms}</Text> : null}
            </View>
          </View>

          <View style={styles.totalsCol}>
            {!content.vatExempt ? (
              <View style={styles.calcRow}>
                <Text style={styles.calcLabel}>{labels.subtotalLabel}</Text>
                <Text style={styles.calcVal}>{formatCurrencyAmount(subtotal, currency, docLang)}</Text>
              </View>
            ) : null}
            {!content.vatExempt ? (
              <View style={styles.calcRow}>
                <Text style={styles.calcLabel}>{labels.taxLabel.replace(/\s*:\s*$/, '')} ({content.taxRate}%) :</Text>
                <Text style={styles.calcVal}>{formatCurrencyAmount(taxAmount, currency, docLang)}</Text>
              </View>
            ) : null}
            <View style={styles.grandTotalRow}>
              <Text style={styles.grandTotalLabel}>{content.vatExempt ? labels.totalDueLabel : labels.totalLabel}</Text>
              <Text style={styles.grandTotalVal}>{formatCurrencyAmount(total, currency, docLang)}</Text>
            </View>
            {content.vatExempt && content.vatExemptNote ? (
              <Text style={styles.exemptNote}>{content.vatExemptNote}</Text>
            ) : null}
          </View>
        </View>
      </View>
    </MinimalPDFDocFrame>
  );
};
