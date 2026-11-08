import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { BrandKit } from '@/types';
import { DOCUMENT_TRANSLATIONS } from '@/lib/i18n/documents';
import { PDFTemplateFrame } from './PDFTemplateFrame';
import { VectorQR } from './VectorQR';

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
    alignItems: 'flex-start',
    paddingBottom: 6,
    borderBottomWidth: 0.75,
    borderBottomColor: '#E2E8F0',
    marginBottom: 6,
  },
  heroLeft: {
    flex: 1,
    paddingRight: 12,
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
    borderRadius: 2.5,
  },
  heroCategory: {
    fontSize: 7.5,
    fontWeight: 'bold',
    color: '#64748B',
    letterSpacing: 0.5,
  },
  heroTitle: {
    fontFamily: 'Georgia',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0F172A',
    letterSpacing: -0.2,
  },
  heroSubtitle: {
    fontSize: 8,
    color: '#64748B',
    marginTop: 1.5,
    lineHeight: 1.25,
  },
  heroMetaBlock: {
    width: 260,
    backgroundColor: '#F8FAFC',
    borderWidth: 0.75,
    borderColor: '#E2E8F0',
    borderRadius: 4,
    padding: 6,
    flexDirection: 'column',
    gap: 3.5,
  },
  metaField: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 7.5,
  },
  metaLabel: {
    fontWeight: 'bold',
    color: '#475569',
    width: 75,
  },
  metaValue: {
    color: '#0F172A',
    fontWeight: 'medium',
    flex: 1,
  },
  metaLine: {
    color: '#94A3B8',
    letterSpacing: 1,
  },
  tableContainer: {
    borderWidth: 0.75,
    borderColor: '#CBD5E1',
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    marginBottom: 6,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderBottomWidth: 0.75,
    borderBottomColor: '#CBD5E1',
    alignItems: 'center',
    height: 18,
  },
  headerHabitLabel: {
    width: 175,
    paddingHorizontal: 8,
    fontSize: 7.5,
    fontWeight: 'bold',
    color: '#1E293B',
    letterSpacing: 0.3,
  },
  headerDayCell: {
    width: 18,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 0.5,
    borderLeftColor: '#CBD5E1',
  },
  headerDayText: {
    fontSize: 7,
    fontWeight: 'bold',
    color: '#475569',
  },
  headerScoreLabel: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 0.75,
    borderLeftColor: '#CBD5E1',
  },
  headerScoreText: {
    fontSize: 7,
    fontWeight: 'bold',
    color: '#1E293B',
    letterSpacing: 0.3,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#E2E8F0',
    alignItems: 'center',
    minHeight: 28,
  },
  habitCell: {
    width: 175,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRightWidth: 0.75,
    borderRightColor: '#CBD5E1',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  habitNumberBadge: {
    width: 14,
    height: 14,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  habitNumberText: {
    fontSize: 7.5,
    fontWeight: 'bold',
  },
  habitTextContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  habitTitle: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#0F172A',
    lineHeight: 1.15,
  },
  habitSubtitle: {
    fontSize: 7,
    color: '#64748B',
    marginTop: 1,
    lineHeight: 1.1,
  },
  dayCell: {
    width: 18,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 0.5,
    borderLeftColor: '#E2E8F0',
  },
  checkbox: {
    width: 13,
    height: 13,
    borderRadius: 2,
    borderWidth: 0.75,
    borderColor: '#94A3B8',
    backgroundColor: '#FFFFFF',
  },
  scoreCell: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 0.75,
    borderLeftColor: '#CBD5E1',
    backgroundColor: '#FAFAFA',
  },
  scoreText: {
    fontSize: 7.5,
    color: '#94A3B8',
    fontWeight: 'medium',
  },
  milestonesBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 3.5,
    backgroundColor: '#F8FAFC',
    borderTopWidth: 0.75,
    borderTopColor: '#CBD5E1',
  },
  milestoneItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  milestoneDot: {
    width: 4.5,
    height: 4.5,
    borderRadius: 2.25,
  },
  milestoneText: {
    fontSize: 7,
    color: '#475569',
  },
  reflectionsSection: {
    flexDirection: 'column',
    marginBottom: 6,
  },
  reflectionsHeader: {
    fontSize: 7.5,
    fontWeight: 'bold',
    color: '#475569',
    letterSpacing: 0.4,
    marginBottom: 3.5,
  },
  reflectionsGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  reflectionCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 0.75,
    borderColor: '#CBD5E1',
    borderRadius: 4,
    padding: 6,
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: 68,
  },
  reflectionCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  reflectionCardTitle: {
    fontSize: 7.5,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  reflectionPrompt: {
    fontSize: 7,
    color: '#475569',
    lineHeight: 1.15,
    marginBottom: 4,
  },
  handwritingLines: {
    flexDirection: 'column',
    gap: 10,
    paddingTop: 2,
  },
  dottedLine: {
    borderBottomWidth: 0.75,
    borderBottomColor: '#CBD5E1',
    borderBottomStyle: 'dashed',
    height: 1,
  },
  bottomSection: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'stretch',
  },
  coachAdviceBox: {
    flex: 1,
    borderWidth: 0.75,
    borderRadius: 4,
    padding: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  coachStarBadge: {
    width: 22,
    height: 22,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coachStarText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  coachAdviceContent: {
    flex: 1,
    flexDirection: 'column',
  },
  coachAdviceTitle: {
    fontSize: 7.5,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 1,
  },
  coachAdviceText: {
    fontSize: 7.5,
    color: '#475569',
    fontStyle: 'italic',
    lineHeight: 1.2,
  },
  coachSignLine: {
    fontSize: 7,
    color: '#64748B',
    marginTop: 2,
  },
  qrActionCard: {
    width: 175,
    backgroundColor: '#F8FAFC',
    borderWidth: 0.75,
    borderColor: '#CBD5E1',
    borderRadius: 4,
    padding: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  qrActionTextCol: {
    flex: 1,
    flexDirection: 'column',
  },
  qrActionTitle: {
    fontSize: 7.5,
    fontWeight: 'bold',
    color: '#0F172A',
    lineHeight: 1.2,
  },
  qrActionUrl: {
    fontSize: 6.5,
    color: '#475569',
    marginTop: 2,
  },
});

export const VectorHabitTrackerPDF: React.FC<VectorHabitTrackerPDFProps> = ({ brandKit }) => {
  const docLang = brandKit.documentLang || 'en';
  const t = (DOCUMENT_TRANSLATIONS[docLang] || DOCUMENT_TRANSLATIONS.en).habitTracker;
  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  const habits = t.habitsList && t.habitsList.length >= 4 ? t.habitsList : [
    { title: t.categories.movement, subtitle: '2L water & daily physical vitality' },
    { title: t.categories.mindset, subtitle: '90 min deep work without distraction' },
    { title: t.categories.nutrition, subtitle: 'Balanced nutrition & restorative sleep' },
    { title: t.categories.productivity, subtitle: 'Evening reflection & next day priorities' },
    { title: 'Personalized Excellence Ritual', subtitle: 'Priority habit agreed with your coach' },
  ];

  const hasUserQR = Boolean(brandKit.qrUrl && brandKit.qrUrl.trim().length > 0);

  return (
    <PDFTemplateFrame
      brandKit={brandKit}
      orientation="landscape"
      subtitleRight={t.headerSubtitleRight}
    >
      <View style={styles.container}>
        {/* Document Hero */}
        <View style={styles.hero}>
          <View style={styles.heroLeft}>
            <View style={styles.heroBadge}>
              <View
                style={[
                  styles.heroDot,
                  { backgroundColor: brandKit.brandColor || '#4F46E5' },
                ]}
              />
              <Text style={styles.heroCategory}>{t.headerCategory}</Text>
            </View>
            <Text style={styles.heroTitle}>{t.title}</Text>
            <Text style={styles.heroSubtitle}>{t.subtitle}</Text>
          </View>

          {/* Client & Period Handwriting Metadata Block */}
          <View style={styles.heroMetaBlock}>
            <View style={styles.metaField}>
              <Text style={styles.metaLabel}>{t.clientPrompt}</Text>
              <Text style={styles.metaValue}>
                {brandKit.clientName || '________________________________'}
              </Text>
            </View>
            <View style={styles.metaField}>
              <Text style={styles.metaLabel}>{t.periodPrompt}</Text>
              <Text style={styles.metaValue}>{t.periodPlaceholder}</Text>
            </View>
            <View style={styles.metaField}>
              <Text style={styles.metaLabel}>{t.goalPrompt}</Text>
              <Text style={[styles.metaValue, { fontSize: 7, color: '#64748B' }]}>
                {t.goalPlaceholder}
              </Text>
            </View>
          </View>
        </View>

        {/* 30-Day Grid Table (Full Width, Printable Checkboxes) */}
        <View style={styles.tableContainer}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={styles.headerHabitLabel}>{t.habitsHeader}</Text>
            {days.map((day) => {
              const isMilestone = [7, 14, 21, 30].includes(day);
              return (
                <View
                  key={day}
                  style={[
                    styles.headerDayCell,
                    isMilestone
                      ? {
                          backgroundColor: brandKit.brandColor || '#4F46E5',
                          borderLeftColor: brandKit.brandColor || '#4F46E5',
                        }
                      : {},
                  ]}
                >
                  <Text
                    style={[
                      styles.headerDayText,
                      isMilestone ? { color: '#FFFFFF' } : {},
                    ]}
                  >
                    {day}
                  </Text>
                </View>
              );
            })}
            <View style={styles.headerScoreLabel}>
              <Text style={styles.headerScoreText}>{t.scoreHeader}</Text>
            </View>
          </View>

          {/* Habit Rows */}
          {habits.slice(0, 5).map((habit, idx) => (
            <View key={idx} style={styles.tableRow}>
              {/* Habit Column: generous 175 pt, zero truncation */}
              <View style={styles.habitCell}>
                <View
                  style={[
                    styles.habitNumberBadge,
                    { backgroundColor: `${brandKit.brandColor || '#4F46E5'}18` },
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
                <View style={styles.habitTextContainer}>
                  <Text style={styles.habitTitle}>{habit.title}</Text>
                  <Text style={styles.habitSubtitle}>{habit.subtitle}</Text>
                </View>
              </View>

              {/* 30 Day Checkbox Cells: 18 pt wide each */}
              {days.map((day) => {
                const isMilestone = [7, 14, 21, 30].includes(day);
                return (
                  <View
                    key={day}
                    style={[
                      styles.dayCell,
                      isMilestone
                        ? {
                            backgroundColor: `${brandKit.brandColor || '#4F46E5'}0A`,
                          }
                        : {},
                    ]}
                  >
                    <View
                      style={[
                        styles.checkbox,
                        isMilestone
                          ? { borderColor: brandKit.brandColor || '#4F46E5' }
                          : {},
                      ]}
                    />
                  </View>
                );
              })}

              {/* Score /30 Cell */}
              <View style={styles.scoreCell}>
                <Text style={styles.scoreText}>___ / 30</Text>
              </View>
            </View>
          ))}

          {/* Milestones Bar */}
          <View style={styles.milestonesBar}>
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

        {/* Weekly Reflection Cards (Real Handwriting Space) */}
        <View style={styles.reflectionsSection}>
          <Text style={styles.reflectionsHeader}>
            {t.weeklyReflectionTitle}
          </Text>
          <View style={styles.reflectionsGrid}>
            {t.reflectionPrompts.map((prompt, idx) => (
              <View key={idx} style={styles.reflectionCard}>
                <View style={styles.reflectionCardHeader}>
                  <View
                    style={[
                      styles.milestoneDot,
                      { backgroundColor: brandKit.brandColor || '#4F46E5' },
                    ]}
                  />
                  <Text style={styles.reflectionCardTitle}>
                    {t.weekNames?.[idx] || `SEMAINE 0${idx + 1}`}
                  </Text>
                </View>
                <Text style={styles.reflectionPrompt}>{prompt}</Text>
                {/* 3 Full Handwriting Lines */}
                <View style={styles.handwritingLines}>
                  <View style={styles.dottedLine} />
                  <View style={styles.dottedLine} />
                  <View style={styles.dottedLine} />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Bottom Section: Coach Advice + 18mm User QR Code */}
        <View style={styles.bottomSection}>
          <View
            style={[
              styles.coachAdviceBox,
              {
                backgroundColor: `${brandKit.brandColor || '#4F46E5'}08`,
                borderColor: `${brandKit.brandColor || '#4F46E5'}30`,
              },
            ]}
          >
            <View
              style={[
                styles.coachStarBadge,
                { backgroundColor: brandKit.brandColor || '#4F46E5' },
              ]}
            >
              <Text
                style={[
                  styles.coachStarText,
                  { color: brandKit.contrastText || '#FFFFFF' },
                ]}
              >
                ✦
              </Text>
            </View>
            <View style={styles.coachAdviceContent}>
              <Text style={styles.coachAdviceTitle}>{t.coachNoteTitle}</Text>
              <Text style={styles.coachAdviceText}>
                &ldquo;{t.coachNoteDefault}&rdquo;
              </Text>
              <Text style={styles.coachSignLine}>
                {t.coachPrompt} {brandKit.coachName || 'Alexandre Martin'} —{' '}
                {brandKit.companyName || 'LogoLoom Studio'}
              </Text>
            </View>
          </View>

          {/* User QR Code Card (18 mm = 52 pt) - Only rendered when qrUrl is present */}
          {hasUserQR ? (
            <View style={styles.qrActionCard}>
              <VectorQR
                text={brandKit.qrUrl}
                size={52} // 18 mm physical print size
                darkColor="#0F172A"
                lightColor="#FFFFFF"
              />
              <View style={styles.qrActionTextCol}>
                <Text style={styles.qrActionTitle}>{t.scanToBookTitle}</Text>
                <Text style={styles.qrActionUrl}>
                  {brandKit.qrUrl?.replace(/^https?:\/\//, '').slice(0, 26)}
                </Text>
              </View>
            </View>
          ) : null}
        </View>
      </View>
    </PDFTemplateFrame>
  );
};
