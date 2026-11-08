import React from 'react';
import { View, Text, StyleSheet, Svg, Path } from '@react-pdf/renderer';
import { BrandKit } from '@/types';
import { DOCUMENT_TRANSLATIONS } from '@/lib/i18n/documents';
import { PDFTemplateFrame } from './PDFTemplateFrame';
import { VectorQR } from './VectorQR';

interface VectorHabitTrackerPDFProps {
  brandKit: BrandKit;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  hero: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: 4,
    borderBottomWidth: 0.75,
    borderBottomColor: '#CBD5E1',
    marginBottom: 4,
  },
  heroLeft: {
    flex: 1,
    paddingRight: 14,
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
    fontFamily: 'Roboto',
    fontSize: 8,
    fontWeight: 'bold',
    color: '#64748B',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  heroTitle: {
    fontFamily: 'Georgia',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0F172A',
    letterSpacing: -0.2,
  },
  heroSubtitle: {
    fontFamily: 'Roboto',
    fontSize: 8.5,
    color: '#64748B',
    marginTop: 1,
    lineHeight: 1.25,
  },
  heroMetaBlock: {
    width: 250,
    backgroundColor: '#F8FAFC',
    borderWidth: 0.75,
    borderColor: '#CBD5E1',
    borderRadius: 4,
    padding: 5,
    flexDirection: 'column',
    gap: 3.5,
  },
  metaField: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaLabel: {
    fontFamily: 'Roboto',
    fontSize: 8,
    fontWeight: 'bold',
    color: '#475569',
    width: 72,
  },
  metaValue: {
    fontFamily: 'Roboto',
    fontSize: 8,
    color: '#0F172A',
    fontWeight: 'medium',
    flex: 1,
  },
  metaBlankLine: {
    fontFamily: 'Roboto',
    fontSize: 8,
    color: '#94A3B8',
    letterSpacing: 1,
  },
  tableContainer: {
    borderWidth: 0.75,
    borderColor: '#CBD5E1',
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    marginBottom: 4,
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
    fontFamily: 'Roboto',
    width: 175,
    paddingHorizontal: 8,
    fontSize: 8,
    fontWeight: 'bold',
    color: '#1E293B',
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  headerDayCell: {
    width: 18.5,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 0.5,
    borderLeftColor: '#CBD5E1',
  },
  headerDayText: {
    fontFamily: 'Roboto',
    fontSize: 8,
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
    fontFamily: 'Roboto',
    fontSize: 8,
    fontWeight: 'bold',
    color: '#1E293B',
    letterSpacing: 0.3,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#E2E8F0',
    alignItems: 'center',
    minHeight: 25,
  },
  habitCell: {
    width: 175,
    paddingHorizontal: 8,
    paddingVertical: 2,
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
    fontFamily: 'Roboto',
    fontSize: 8,
    fontWeight: 'bold',
  },
  habitTextContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  habitTitle: {
    fontFamily: 'Roboto',
    fontSize: 9,
    fontWeight: 'bold',
    color: '#0F172A',
    lineHeight: 1.15,
  },
  habitSubtitle: {
    fontFamily: 'Roboto',
    fontSize: 8,
    color: '#64748B',
    marginTop: 0.5,
    lineHeight: 1.1,
  },
  dayCell: {
    width: 18.5,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 0.5,
    borderLeftColor: '#E2E8F0',
  },
  checkbox: {
    width: 16, // 5.64 mm physical printable box (>= 5.5 mm)
    height: 16,
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
    fontFamily: 'Roboto',
    fontSize: 8,
    color: '#94A3B8',
    fontWeight: 'medium',
  },
  milestonesBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 3,
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
    fontFamily: 'Roboto',
    fontSize: 8,
    color: '#475569',
  },
  reflectionsSection: {
    flexDirection: 'column',
    marginBottom: 4,
  },
  reflectionsHeader: {
    fontFamily: 'Roboto',
    fontSize: 8,
    fontWeight: 'bold',
    color: '#475569',
    letterSpacing: 0.4,
    marginBottom: 3,
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
    padding: 5,
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: 74, // Accommodate 3 lines spaced 7mm (20pt) apart
  },
  reflectionCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  reflectionCardTitle: {
    fontFamily: 'Roboto',
    fontSize: 8,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  reflectionPrompt: {
    fontFamily: 'Roboto',
    fontSize: 8,
    color: '#475569',
    lineHeight: 1.15,
    marginBottom: 3,
  },
  handwritingLines: {
    flexDirection: 'column',
    gap: 17, // ~6 mm to 7 mm physical spacing between writing lines
    paddingTop: 6,
    paddingBottom: 2,
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
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  coachStarBadge: {
    width: 24,
    height: 24,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coachAdviceContent: {
    flex: 1,
    flexDirection: 'column',
  },
  coachAdviceTitle: {
    fontFamily: 'Roboto',
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 1,
  },
  coachAdviceText: {
    fontFamily: 'Roboto',
    fontSize: 8,
    color: '#475569',
    fontStyle: 'italic',
    lineHeight: 1.2,
  },
  coachSignLine: {
    fontFamily: 'Roboto',
    fontSize: 8,
    color: '#64748B',
    marginTop: 2,
  },
  qrActionCard: {
    width: 180,
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
    fontFamily: 'Roboto',
    fontSize: 8,
    fontWeight: 'bold',
    color: '#0F172A',
    lineHeight: 1.2,
  },
  qrActionUrl: {
    fontFamily: 'Roboto',
    fontSize: 8,
    color: '#475569',
    marginTop: 2,
  },
});

export const VectorHabitTrackerPDF: React.FC<VectorHabitTrackerPDFProps> = ({ brandKit }) => {
  const docLang = brandKit.documentLang || 'en';
  const t = (DOCUMENT_TRANSLATIONS[docLang] || DOCUMENT_TRANSLATIONS.en).habitTracker;
  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  const habits = t.habitsList && t.habitsList.length >= 4 ? t.habitsList : [
    { title: t.categories.movement, subtitle: 'Water upon waking, daily movement' },
    { title: t.categories.mindset, subtitle: '90 min deep work without distraction' },
    { title: t.categories.nutrition, subtitle: 'Balanced meals & restful sleep' },
    { title: t.categories.productivity, subtitle: 'Daily reflection & next day focus' },
    { title: 'Personal habit of choice', subtitle: 'Action agreed with your coach' },
  ];

  // Contact QR renders ONLY if user provided their link (never defaults to logoloom.app)
  const hasUserQR = Boolean(brandKit.qrUrl && brandKit.qrUrl.trim().length > 0 && brandKit.qrUrl !== 'https://logoloom.app');

  // Blank handwriting line format for physical print
  const blankPeriodLine = docLang === 'fr'
    ? 'Du : ______________ au : ______________'
    : docLang === 'de'
    ? 'Vom: ______________ bis: ______________'
    : docLang === 'es'
    ? 'Del: ______________ al: ______________'
    : docLang === 'pt'
    ? 'De: ______________ até: ______________'
    : docLang === 'it'
    ? 'Dal: ______________ al: ______________'
    : 'From: ______________ to: ______________';

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
                {brandKit.clientName || '________________________'}
              </Text>
            </View>
            <View style={styles.metaField}>
              <Text style={styles.metaLabel}>{t.periodPrompt}</Text>
              <Text style={styles.metaValue}>{blankPeriodLine}</Text>
            </View>
            <View style={styles.metaField}>
              <Text style={styles.metaLabel}>{t.goalPrompt}</Text>
              <Text style={styles.metaValue}>
                _____________________________________________
              </Text>
            </View>
          </View>
        </View>

        {/* 30-Day Grid Table (5.64 mm printable checkboxes) */}
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

              {/* 30 Day Checkbox Cells: 18.5 pt wide each with 16 pt (5.64 mm) checkboxes */}
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

          {/* Milestones Bar (encouraging neutral milestones) */}
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

        {/* Weekly Reflection Cards (Spaced 7mm / 20pt for physical handwriting) */}
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
                    {t.weekNames?.[idx] || `Semaine ${idx + 1}`}
                  </Text>
                </View>
                <Text style={styles.reflectionPrompt}>{prompt}</Text>
                {/* 3 Full Handwriting Lines spaced >= 7 mm (20 pt) */}
                <View style={styles.handwritingLines}>
                  <View style={styles.dottedLine} />
                  <View style={styles.dottedLine} />
                  <View style={styles.dottedLine} />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Bottom Section: Coach Advice + Optional User QR Code */}
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
            {/* Pure SVG Vector Star Icon (zero font glyphs or emojis) */}
            <View
              style={[
                styles.coachStarBadge,
                { backgroundColor: brandKit.brandColor || '#4F46E5' },
              ]}
            >
              <Svg width={12} height={12} viewBox="0 0 24 24">
                <Path
                  fill={brandKit.contrastText || '#FFFFFF'}
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                />
              </Svg>
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

          {/* User QR Code Card (>= 18 mm = 54 pt) - ONLY rendered when user provided link */}
          {hasUserQR ? (
            <View style={styles.qrActionCard}>
              <VectorQR
                text={brandKit.qrUrl}
                size={54} // ~19 mm physical print size (at least 18 mm)
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
