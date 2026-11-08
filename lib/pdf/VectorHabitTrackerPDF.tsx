import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { BrandKit } from '@/types';
import { DOCUMENT_TRANSLATIONS } from '@/lib/i18n/documents';
import { PDFTemplateFrame } from './PDFTemplateFrame';

interface VectorHabitTrackerPDFProps {
  brandKit: BrandKit;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  hero: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    marginBottom: 6,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  heroDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
  },
  heroCategory: {
    fontSize: 7.5,
    fontWeight: 'bold',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  heroTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  heroSubtitle: {
    fontSize: 8,
    color: '#64748B',
    marginTop: 1,
    maxWidth: 380,
  },
  coachBadge: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  coachLabel: {
    fontSize: 6.5,
    color: '#94A3B8',
    textTransform: 'uppercase',
  },
  coachName: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    marginBottom: 6,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    alignItems: 'center',
  },
  headerCellLabel: {
    width: 135,
    paddingHorizontal: 6,
    paddingVertical: 4,
    fontSize: 7.5,
    fontWeight: 'bold',
    color: '#334155',
    textTransform: 'uppercase',
  },
  headerCellDay: {
    flex: 1,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderLeftColor: '#E2E8F0',
  },
  headerCellDayText: {
    fontSize: 6.5,
    fontWeight: 'bold',
    color: '#64748B',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    alignItems: 'center',
    height: 32,
  },
  habitCell: {
    width: 135,
    paddingHorizontal: 6,
    borderRightWidth: 1,
    borderRightColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  habitNumber: {
    width: 11,
    height: 11,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  habitNumberText: {
    fontSize: 6.5,
    fontWeight: 'bold',
  },
  habitTitle: {
    fontSize: 7.5,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  habitSubtitle: {
    fontSize: 6,
    color: '#94A3B8',
  },
  checkCell: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderLeftColor: '#F1F5F9',
  },
  checkbox: {
    width: 8,
    height: 8,
    borderRadius: 1.5,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  milestoneBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 3,
    backgroundColor: '#F8FAFC',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  milestoneItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  milestoneDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  milestoneText: {
    fontSize: 6.5,
    color: '#64748B',
  },
  reflectionsGrid: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 6,
  },
  reflectionCard: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 6,
    padding: 6,
    height: 52,
    justifyContent: 'space-between',
  },
  reflectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  reflectionTitle: {
    fontSize: 7,
    fontWeight: 'bold',
    color: '#1E293B',
    textTransform: 'uppercase',
  },
  reflectionPrompt: {
    fontSize: 6.5,
    color: '#475569',
    lineHeight: 1.2,
  },
  reflectionLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#CBD5E1',
    borderStyle: 'dashed',
    marginTop: 2,
  },
  coachCallout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 6,
    borderRadius: 6,
    borderWidth: 1,
  },
  calloutLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  calloutStar: {
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calloutStarText: {
    fontSize: 8,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  calloutTitle: {
    fontSize: 7.5,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  calloutQuote: {
    fontSize: 6.5,
    color: '#64748B',
    fontStyle: 'italic',
  },
  calloutRight: {
    alignItems: 'flex-end',
  },
  calloutMeta: {
    fontSize: 6,
    color: '#94A3B8',
  },
  calloutCompany: {
    fontSize: 7,
    fontWeight: 'bold',
    color: '#334155',
  },
});

export const VectorHabitTrackerPDF: React.FC<VectorHabitTrackerPDFProps> = ({ brandKit }) => {
  const docLang = brandKit.documentLang || 'en';
  const t = (DOCUMENT_TRANSLATIONS[docLang] || DOCUMENT_TRANSLATIONS.en).habitTracker;
  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  const defaultHabits = [
    { id: '1', title: t.categories.movement, subtitle: 'Daily movement & physical vitality' },
    { id: '2', title: t.categories.mindset, subtitle: 'Deep strategic focus & uninterrupted work' },
    { id: '3', title: t.categories.nutrition, subtitle: 'Whole nutrition, hydration & recovery' },
    { id: '4', title: t.categories.productivity, subtitle: 'Evening reflection & next day clarity' },
  ];

  return (
    <PDFTemplateFrame
      brandKit={brandKit}
      subtitleRight="HABIT MATRIX • 30-DAY SPRINT"
    >
      <View style={styles.container}>
        {/* Document Hero */}
        <View style={styles.hero}>
          <View>
            <View style={styles.heroBadge}>
              <View
                style={[
                  styles.heroDot,
                  { backgroundColor: brandKit.brandColor || '#4F46E5' },
                ]}
              />
              <Text style={styles.heroCategory}>
                Performance Coaching Protocol
              </Text>
            </View>
            <Text style={styles.heroTitle}>{t.title}</Text>
            <Text style={styles.heroSubtitle}>{t.subtitle}</Text>
          </View>

          <View style={styles.coachBadge}>
            <Text style={styles.coachLabel}>{t.coachPrompt}</Text>
            <Text style={styles.coachName}>
              {brandKit.coachName || 'Alexandre Martin'}
            </Text>
          </View>
        </View>

        {/* 30-Day Grid Table */}
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerCellLabel}>Core Habit Focus</Text>
            {days.map((day) => {
              const isMilestone = [7, 14, 21, 30].includes(day);
              return (
                <View
                  key={day}
                  style={[
                    styles.headerCellDay,
                    isMilestone
                      ? { backgroundColor: brandKit.brandColor || '#4F46E5' }
                      : {},
                  ]}
                >
                  <Text
                    style={[
                      styles.headerCellDayText,
                      isMilestone ? { color: '#FFFFFF' } : {},
                    ]}
                  >
                    {day}
                  </Text>
                </View>
              );
            })}
          </View>

          {defaultHabits.map((habit, idx) => (
            <View key={habit.id} style={styles.tableRow}>
              <View style={styles.habitCell}>
                <View
                  style={[
                    styles.habitNumber,
                    { backgroundColor: `${brandKit.brandColor}18` },
                  ]}
                >
                  <Text
                    style={[
                      styles.habitNumberText,
                      { color: brandKit.brandColor || '#4F46E5' },
                    ]}
                  >
                    {idx + 1}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.habitTitle}>{habit.title}</Text>
                  <Text style={styles.habitSubtitle}>{habit.subtitle}</Text>
                </View>
              </View>

              {days.map((day) => {
                const isMilestone = [7, 14, 21, 30].includes(day);
                return (
                  <View
                    key={day}
                    style={[
                      styles.checkCell,
                      isMilestone
                        ? { backgroundColor: `${brandKit.brandColor}08` }
                        : {},
                    ]}
                  >
                    <View style={styles.checkbox} />
                  </View>
                );
              })}
            </View>
          ))}

          {/* Milestones bar */}
          <View style={styles.milestoneBar}>
            <View style={styles.milestoneItem}>
              <View
                style={[
                  styles.milestoneDot,
                  { backgroundColor: brandKit.brandColor || '#4F46E5' },
                ]}
              />
              <Text style={styles.milestoneText}>{t.milestones.day7}</Text>
            </View>
            <View style={styles.milestoneItem}>
              <View
                style={[
                  styles.milestoneDot,
                  { backgroundColor: brandKit.brandColor || '#4F46E5' },
                ]}
              />
              <Text style={styles.milestoneText}>{t.milestones.day14}</Text>
            </View>
            <View style={styles.milestoneItem}>
              <View
                style={[
                  styles.milestoneDot,
                  { backgroundColor: brandKit.brandColor || '#4F46E5' },
                ]}
              />
              <Text style={styles.milestoneText}>{t.milestones.day21}</Text>
            </View>
            <View style={styles.milestoneItem}>
              <View
                style={[
                  styles.milestoneDot,
                  { backgroundColor: brandKit.brandColor || '#4F46E5' },
                ]}
              />
              <Text style={[styles.milestoneText, { fontWeight: 'bold' }]}>
                {t.milestones.day30}
              </Text>
            </View>
          </View>
        </View>

        {/* Weekly Reflection Cards */}
        <View style={styles.reflectionsGrid}>
          {t.reflectionPrompts.map((prompt, idx) => (
            <View key={idx} style={styles.reflectionCard}>
              <View style={styles.reflectionHeader}>
                <View
                  style={[
                    styles.milestoneDot,
                    { backgroundColor: brandKit.brandColor || '#4F46E5' },
                  ]}
                />
                <Text style={styles.reflectionTitle}>Week {idx + 1}</Text>
              </View>
              <Text style={styles.reflectionPrompt}>{prompt}</Text>
              <View style={styles.reflectionLine} />
            </View>
          ))}
        </View>

        {/* Coach Callout */}
        <View
          style={[
            styles.coachCallout,
            {
              backgroundColor: `${brandKit.brandColor}08`,
              borderColor: `${brandKit.brandColor}25`,
            },
          ]}
        >
          <View style={styles.calloutLeft}>
            <View
              style={[
                styles.calloutStar,
                { backgroundColor: brandKit.brandColor || '#4F46E5' },
              ]}
            >
              <Text style={styles.calloutStarText}>★</Text>
            </View>
            <View>
              <Text style={styles.calloutTitle}>{t.coachNoteTitle}</Text>
              <Text style={styles.calloutQuote}>
                &ldquo;{t.coachNotePlaceholder}&rdquo;
              </Text>
            </View>
          </View>
          <View style={styles.calloutRight}>
            <Text style={styles.calloutMeta}>CONFIDENTIAL CLIENT PLAN</Text>
            <Text style={styles.calloutCompany}>{brandKit.companyName}</Text>
          </View>
        </View>
      </View>
    </PDFTemplateFrame>
  );
};
