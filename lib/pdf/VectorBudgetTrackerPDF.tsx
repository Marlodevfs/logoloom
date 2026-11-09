import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { BrandKit, DocumentLang, BudgetTrackerCustomContent } from '@/types';
import { MinimalPDFDocFrame } from './minimal/MinimalPDFDocFrame';
import { getDefaultBudgetTrackerContent } from '@/lib/use-brand-kit';
import { formatCurrencyAmount } from '@/lib/i18n/intl-helpers';
import { CATALOG_LABELS } from '@/lib/i18n/catalog-labels';

interface VectorBudgetTrackerPDFProps {
  brandKit: BrandKit;
}

export const VectorBudgetTrackerPDF: React.FC<VectorBudgetTrackerPDFProps> = ({ brandKit }) => {
  const docLang: DocumentLang = brandKit.documentLang || 'en';
  const labels = (CATALOG_LABELS[docLang] || CATALOG_LABELS.en).budgetTracker;
  const currency = brandKit.currency || '€';
  const content: BudgetTrackerCustomContent =
    brandKit.budgetTrackerContent || getDefaultBudgetTrackerContent(docLang);

  const totalIncomePlanned = content.income.reduce((acc, item) => acc + (item.planned || 0), 0);
  const totalIncomeActual = content.income.reduce((acc, item) => acc + (item.actual || 0), 0);

  const totalFixedPlanned = content.fixedExpenses.reduce((acc, item) => acc + (item.planned || 0), 0);
  const totalFixedActual = content.fixedExpenses.reduce((acc, item) => acc + (item.actual || 0), 0);

  const totalVarPlanned = content.variableExpenses.reduce((acc, item) => acc + (item.planned || 0), 0);
  const totalVarActual = content.variableExpenses.reduce((acc, item) => acc + (item.actual || 0), 0);

  const totalExpensesActual = totalFixedActual + totalVarActual;
  const netBalanceActual = totalIncomeActual - totalExpensesActual;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      paddingVertical: 4,
    },
    metadataRight: {
      flexDirection: 'row',
      gap: 6,
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
      fontWeight: 'bold',
    },
    incomeCard: {
      borderWidth: 0.5,
      borderColor: '#CBD5E1',
      borderRadius: 4,
      overflow: 'hidden',
      marginBottom: 6,
    },
    cardHeader: {
      backgroundColor: '#F8FAFC',
      borderBottomWidth: 0.5,
      borderBottomColor: '#CBD5E1',
      paddingVertical: 3,
      paddingHorizontal: 6,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    cardTitle: {
      fontFamily: 'Roboto',
      fontSize: 8,
      fontWeight: 'bold',
      color: brandKit.brandColor,
      textTransform: 'uppercase',
    },
    headerCols: {
      flexDirection: 'row',
      gap: 16,
    },
    colHeader: {
      fontFamily: 'Roboto',
      fontSize: 7,
      color: '#64748B',
      width: 45,
      textAlign: 'right',
    },
    rowItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 3,
      paddingHorizontal: 6,
      borderBottomWidth: 0.5,
      borderBottomColor: '#F1F5F9',
    },
    rowLabel: {
      fontFamily: 'Roboto',
      fontSize: 7.5,
      color: '#1E293B',
      flex: 1,
    },
    rowAmounts: {
      flexDirection: 'row',
      gap: 16,
    },
    amountText: {
      fontFamily: 'Roboto',
      fontSize: 7.5,
      color: '#475569',
      width: 45,
      textAlign: 'right',
    },
    amountBold: {
      fontFamily: 'Roboto',
      fontSize: 7.5,
      fontWeight: 'bold',
      color: '#0F172A',
      width: 45,
      textAlign: 'right',
    },
    expensesRow: {
      flexDirection: 'row',
      gap: 6,
      flex: 1,
      marginBottom: 6,
    },
    expenseCol: {
      flex: 1,
      borderWidth: 0.5,
      borderColor: '#CBD5E1',
      borderRadius: 4,
      overflow: 'hidden',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    totalRow: {
      backgroundColor: '#F8FAFC',
      borderTopWidth: 0.5,
      borderTopColor: '#CBD5E1',
      paddingVertical: 3,
      paddingHorizontal: 6,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    totalLabel: {
      fontFamily: 'Roboto',
      fontSize: 7.5,
      fontWeight: 'bold',
      color: '#0F172A',
    },
    summaryStrip: {
      borderWidth: 0.5,
      borderColor: brandKit.brandColor,
      backgroundColor: '#F8FAFC',
      borderRadius: 4,
      padding: 6,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    summaryItem: {
      flexDirection: 'column',
    },
    summaryLabel: {
      fontFamily: 'Roboto',
      fontSize: 6.5,
      fontWeight: 'bold',
      color: '#64748B',
      textTransform: 'uppercase',
    },
    summaryValue: {
      fontFamily: 'Roboto',
      fontSize: 8.5,
      fontWeight: 'bold',
      color: '#0F172A',
      marginTop: 1,
    },
  });

  return (
    <MinimalPDFDocFrame
      brandKit={brandKit}
      title={content.title}
      footerCategoryText={labels.footerCategory}
      metadataRight={
        <View style={styles.metadataRight}>
          <Text style={styles.metaLabel}>{labels.monthLabel}</Text>
          <Text style={styles.metaLine}>{content.period}</Text>
        </View>
      }
    >
      <View style={styles.container}>
        {/* Income Card */}
        <View style={styles.incomeCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{labels.incomeTitle}</Text>
            <View style={styles.headerCols}>
              <Text style={styles.colHeader}>Prévu</Text>
              <Text style={styles.colHeader}>Réel</Text>
            </View>
          </View>
          {content.income.map((item, idx) => (
            <View key={idx} style={styles.rowItem}>
              <Text style={styles.rowLabel}>{item.description}</Text>
              <View style={styles.rowAmounts}>
                <Text style={styles.amountText}>{formatCurrencyAmount(item.planned, currency, docLang)}</Text>
                <Text style={styles.amountBold}>{formatCurrencyAmount(item.actual, currency, docLang)}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Expenses: Fixed + Variable */}
        <View style={styles.expensesRow}>
          {/* Fixed */}
          <View style={styles.expenseCol}>
            <View>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{labels.fixedExpensesTitle}</Text>
                <View style={styles.headerCols}>
                  <Text style={styles.colHeader}>Prévu</Text>
                  <Text style={styles.colHeader}>Réel</Text>
                </View>
              </View>
              {content.fixedExpenses.map((item, idx) => (
                <View key={idx} style={styles.rowItem}>
                  <Text style={styles.rowLabel}>{item.description}</Text>
                  <View style={styles.rowAmounts}>
                    <Text style={styles.amountText}>{formatCurrencyAmount(item.planned, currency, docLang)}</Text>
                    <Text style={styles.amountBold}>{formatCurrencyAmount(item.actual, currency, docLang)}</Text>
                  </View>
                </View>
              ))}
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>{labels.totalFixedLabel}</Text>
              <View style={styles.rowAmounts}>
                <Text style={styles.amountText}>{formatCurrencyAmount(totalFixedPlanned, currency, docLang)}</Text>
                <Text style={styles.amountBold}>{formatCurrencyAmount(totalFixedActual, currency, docLang)}</Text>
              </View>
            </View>
          </View>

          {/* Variable */}
          <View style={styles.expenseCol}>
            <View>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{labels.variableExpensesTitle}</Text>
                <View style={styles.headerCols}>
                  <Text style={styles.colHeader}>Prévu</Text>
                  <Text style={styles.colHeader}>Réel</Text>
                </View>
              </View>
              {content.variableExpenses.map((item, idx) => (
                <View key={idx} style={styles.rowItem}>
                  <Text style={styles.rowLabel}>{item.description}</Text>
                  <View style={styles.rowAmounts}>
                    <Text style={styles.amountText}>{formatCurrencyAmount(item.planned, currency, docLang)}</Text>
                    <Text style={styles.amountBold}>{formatCurrencyAmount(item.actual, currency, docLang)}</Text>
                  </View>
                </View>
              ))}
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>{labels.totalVariableLabel}</Text>
              <View style={styles.rowAmounts}>
                <Text style={styles.amountText}>{formatCurrencyAmount(totalVarPlanned, currency, docLang)}</Text>
                <Text style={styles.amountBold}>{formatCurrencyAmount(totalVarActual, currency, docLang)}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Summary Strip */}
        <View style={styles.summaryStrip}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>{labels.totalIncomeLabel}</Text>
            <Text style={styles.summaryValue}>{formatCurrencyAmount(totalIncomeActual, currency, docLang)}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>{labels.totalFixedLabel}</Text>
            <Text style={styles.summaryValue}>{formatCurrencyAmount(totalExpensesActual, currency, docLang)}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>{labels.savingsGoalLabel}</Text>
            <Text style={styles.summaryValue}>{formatCurrencyAmount(content.savingsGoal, currency, docLang)}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>{labels.netBalanceLabel}</Text>
            <Text style={[styles.summaryValue, { color: '#047857' }]}>
              {formatCurrencyAmount(netBalanceActual, currency, docLang)}
            </Text>
          </View>
        </View>
      </View>
    </MinimalPDFDocFrame>
  );
};
