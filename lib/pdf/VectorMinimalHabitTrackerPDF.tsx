import React from 'react';
import { Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { BrandKit, DocumentLang, HabitItem, HabitTrackerCustomContent } from '@/types';
import { DOCUMENT_TRANSLATIONS } from '@/lib/i18n/documents';
import { HABIT_PACKS } from '@/lib/i18n/habit-packs';
import { MINIMAL_HABIT_LABELS } from '@/lib/i18n/minimal-labels';
import { getDefaultHabitTrackerContent } from '@/lib/use-brand-kit';
import { VectorQR } from './VectorQR';

interface VectorMinimalHabitTrackerPDFProps {
  brandKit: BrandKit;
}

function normalizeLogoUrl(url: string | null | undefined): string | null {
  if (!url || typeof url !== 'string' || url.trim() === '') return null;
  const trimmed = url.trim();
  if (trimmed.startsWith('data:image/svg+xml;utf8,') || trimmed.startsWith('data:image/svg+xml,')) {
    const rawSvg = decodeURIComponent(trimmed.replace(/^data:image\/svg\+xml(;utf8)?,/, ''));
    const b64 = typeof btoa !== 'undefined' ? btoa(rawSvg) : Buffer.from(rawSvg).toString('base64');
    return `data:image/svg+xml;base64,${b64}`;
  }
  return trimmed;
}

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Roboto',
    backgroundColor: '#FFFFFF',
    color: '#0F172A',
    paddingHorizontal: 38,
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative',
  },
  accentLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
  },
  header: {
    flexDirection: 'column',
    borderBottomWidth: 0.5,
    borderBottomColor: '#CBD5E1',
    paddingBottom: 6,
    marginBottom: 6,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  brandLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoContainer: {
    height: 26,
    maxWidth: 110,
    justifyContent: 'center',
  },
  logoImage: {
    height: '100%',
    maxWidth: 110,
    objectFit: 'contain',
  },
  brandTextCol: {
    flexDirection: 'column',
  },
  companyName: {
    fontFamily: 'Roboto',
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  tagline: {
    fontFamily: 'Roboto',
    fontSize: 8,
    color: '#64748B',
    marginTop: 1,
  },
  contactQRCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingLeft: 8,
    borderLeftWidth: 0.5,
    borderLeftColor: '#CBD5E1',
  },
  contactQRTextCol: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    maxWidth: 110,
  },
  contactQRLabel: {
    fontFamily: 'Roboto',
    fontSize: 8,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  contactQRUrl: {
    fontFamily: 'Roboto',
    fontSize: 7.5,
    color: '#64748B',
    marginTop: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 6,
  },
  title: {
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: -0.2,
  },
  writingLinesBlock: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-end',
  },
  writingField: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 3,
  },
  writingLabel: {
    fontFamily: 'Roboto',
    fontSize: 8,
    fontWeight: 'bold',
    color: '#475569',
  },
  writingLine: {
    fontFamily: 'Roboto',
    fontSize: 8,
    color: '#0F172A',
    borderBottomWidth: 0.5,
    borderBottomColor: '#94A3B8',
    paddingBottom: 1,
  },
  table: {
    flexDirection: 'column',
    width: '100%',
    flexGrow: 1,
  },
  tableHeaderRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.75,
    borderBottomColor: '#64748B',
    paddingBottom: 2,
    alignItems: 'flex-end',
  },
  dayHeaderCell: {
    width: 32,
    paddingLeft: 2,
  },
  dayHeaderText: {
    fontFamily: 'Roboto',
    fontSize: 8,
    fontWeight: 'bold',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  habitHeaderCell: {
    flex: 1,
    paddingHorizontal: 4,
    borderLeftWidth: 0.5,
    borderLeftColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  habitHeaderTitle: {
    fontFamily: 'Roboto',
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#0F172A',
    textAlign: 'center',
    lineHeight: 1.15,
  },
  habitHeaderSubtitle: {
    fontFamily: 'Roboto',
    fontSize: 7.5,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 1,
  },
  notesHeaderCell: {
    width: 65,
    paddingHorizontal: 4,
    borderLeftWidth: 0.5,
    borderLeftColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  notesHeaderText: {
    fontFamily: 'Roboto',
    fontSize: 8,
    fontWeight: 'bold',
    color: '#64748B',
    textTransform: 'uppercase',
  },
  dayRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#E2E8F0',
    alignItems: 'center',
  },
  dayMilestoneRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#64748B',
    alignItems: 'center',
  },
  dayNumberCell: {
    width: 32,
    paddingLeft: 2,
    justifyContent: 'center',
  },
  dayNumberText: {
    fontFamily: 'Roboto',
    fontSize: 8,
    color: '#64748B',
  },
  dayMilestoneText: {
    fontFamily: 'Roboto',
    fontSize: 8.5,
    fontWeight: 'bold',
  },
  checkboxCell: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 0.5,
    borderLeftColor: '#E2E8F0',
  },
  checkbox: {
    width: 14.5, // 5.1 mm physical checkbox (>= 5.0 mm)
    height: 14.5,
    borderRadius: 2,
    borderWidth: 0.6,
    borderColor: '#94A3B8',
    backgroundColor: '#FFFFFF',
  },
  notesCell: {
    width: 65,
    height: '100%',
    borderLeftWidth: 0.5,
    borderLeftColor: '#E2E8F0',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  notesWritingLine: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#CBD5E1',
    borderBottomStyle: 'dotted',
    height: 1,
  },
  scoreRow: {
    flexDirection: 'row',
    borderTopWidth: 1.5,
    borderTopColor: '#64748B',
    borderBottomWidth: 0.5,
    borderBottomColor: '#CBD5E1',
    alignItems: 'center',
    height: 18,
    backgroundColor: '#F8FAFC',
  },
  scoreLabelCell: {
    width: 32,
    paddingLeft: 2,
  },
  scoreLabelText: {
    fontFamily: 'Roboto',
    fontSize: 8,
    fontWeight: 'bold',
    color: '#0F172A',
    textTransform: 'uppercase',
  },
  scoreValueCell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 0.5,
    borderLeftColor: '#E2E8F0',
  },
  scoreValueText: {
    fontFamily: 'Roboto',
    fontSize: 8,
    color: '#64748B',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 5,
    borderTopWidth: 0.5,
    borderTopColor: '#CBD5E1',
    marginTop: 4,
  },
  footerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  footerCompany: {
    fontFamily: 'Roboto',
    fontSize: 8,
    fontWeight: 'bold',
    color: '#334155',
  },
  footerDot: {
    fontFamily: 'Roboto',
    fontSize: 8,
    color: '#CBD5E1',
  },
  footerPage: {
    fontFamily: 'Roboto',
    fontSize: 8,
    color: '#64748B',
  },
  watermarkBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  watermarkTextCol: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  watermarkText: {
    fontFamily: 'Roboto',
    fontSize: 7.5,
    color: '#64748B',
  },
  watermarkDomain: {
    fontFamily: 'Roboto',
    fontSize: 7.5,
    fontWeight: 'bold',
    color: '#4F46E5',
  },
  proVerified: {
    fontFamily: 'Roboto',
    fontSize: 7.5,
    color: '#94A3B8',
    letterSpacing: 0.4,
  },
});

export const VectorMinimalHabitTrackerPDF: React.FC<VectorMinimalHabitTrackerPDFProps> = ({
  brandKit,
}) => {
  const isA4 = brandKit.paperSize === 'a4';
  const docLang: DocumentLang = brandKit.documentLang || 'en';
  const l = MINIMAL_HABIT_LABELS[docLang] || MINIMAL_HABIT_LABELS.en;
  const t = DOCUMENT_TRANSLATIONS[docLang] || DOCUMENT_TRANSLATIONS.en;

  const habitContent: HabitTrackerCustomContent =
    brandKit.habitTrackerContent || getDefaultHabitTrackerContent(docLang, 'wellbeing');

  const defaultHabitsForLang = (HABIT_PACKS[docLang]?.wellbeing?.habits || HABIT_PACKS.en.wellbeing.habits).map((h, i) => ({
    id: `habit-${i + 1}`,
    title: h.title,
    subtitle: h.subtitle,
  }));

  const habits: HabitItem[] = habitContent.habits && habitContent.habits.length > 0
    ? habitContent.habits.slice(0, 7) // 3 to 7 habits in minimal style
    : defaultHabitsForLang.slice(0, 5);

  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  const hasUserQR = Boolean(
    brandKit.qrUrl &&
    brandKit.qrUrl.trim().length > 0 &&
    brandKit.qrUrl !== 'https://logoloom.app'
  );

  const defaultQrLabel = l.defaultQr;
  const qrDisplayLabel = brandKit.qrLabel || defaultQrLabel;

  const normalizedLogo = normalizeLogoUrl(brandKit.logoUrl);

  const showNotes = Boolean(habitContent.showNotesColumn);
  const showScore = Boolean(habitContent.showScoreRow);

  // Row height: 18.5 pt on A4 (~6.5 mm), 17 pt on Letter (~6.0 mm)
  const rowHeight = isA4 ? 18.2 : 16.8;

  const pagePaddingTop = isA4 ? 32 : 26;
  const pagePaddingBottom = isA4 ? 26 : 20;

  return (
    <Page
      size={isA4 ? 'A4' : 'LETTER'}
      orientation="portrait"
      style={[
        styles.page,
        { paddingTop: pagePaddingTop, paddingBottom: pagePaddingBottom },
      ]}
    >
      {/* Top Hairline Accent Line (0.75 pt) */}
      <View
        style={[
          styles.accentLine,
          { backgroundColor: brandKit.brandColor || '#4F46E5' },
        ]}
      />

      {/* Header Section */}
      <View style={styles.header}>
        {/* Top row: Brand & optional Contact QR */}
        <View style={styles.headerTopRow}>
          <View style={styles.brandLeft}>
            {normalizedLogo ? (
              <View style={styles.logoContainer}>
                <Image src={normalizedLogo} style={styles.logoImage} />
              </View>
            ) : null}

            {brandKit.companyName ? (
              <View style={styles.brandTextCol}>
                <Text style={styles.companyName}>{brandKit.companyName}</Text>
                {brandKit.tagline ? (
                  <Text style={styles.tagline}>{brandKit.tagline}</Text>
                ) : null}
              </View>
            ) : null}
          </View>

          {/* Contact QR Code (>= 18 mm = 52 pt) */}
          {hasUserQR ? (
            <View style={styles.contactQRCard}>
              <VectorQR
                text={brandKit.qrUrl}
                size={52} // ~18.3 mm
                darkColor="#0F172A"
                lightColor="#FFFFFF"
              />
              <View style={styles.contactQRTextCol}>
                <Text style={styles.contactQRLabel}>{qrDisplayLabel}</Text>
                <Text style={styles.contactQRUrl}>
                  {brandKit.qrUrl.replace(/^https?:\/\//, '').slice(0, 24)}
                </Text>
              </View>
            </View>
          ) : null}
        </View>

        {/* Title & Writing Lines */}
        <View style={styles.titleRow}>
          <Text
            style={[
              styles.title,
              { color: brandKit.brandColor || '#0F172A' },
            ]}
          >
            {habitContent.title || l.defaultTitle}
          </Text>

          {/* Name & Start Date lines */}
          <View style={styles.writingLinesBlock}>
            <View style={styles.writingField}>
              <Text style={styles.writingLabel}>{l.name}</Text>
              <Text style={styles.writingLine}>
                {brandKit.clientName || '________________________'}
              </Text>
            </View>
            <View style={styles.writingField}>
              <Text style={styles.writingLabel}>{l.date}</Text>
              <Text style={styles.writingLine}>____ / ____ / 20___</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Grid: Days 1 to 30 as ROWS, Habits as COLUMNS */}
      <View style={styles.table}>
        {/* Table Header Row */}
        <View style={styles.tableHeaderRow}>
          <View style={styles.dayHeaderCell}>
            <Text style={styles.dayHeaderText}>{l.day}</Text>
          </View>

          {habits.map((habit, idx) => (
            <View key={idx} style={styles.habitHeaderCell}>
              <Text style={styles.habitHeaderTitle}>{habit.title}</Text>
              {habit.subtitle ? (
                <Text style={styles.habitHeaderSubtitle}>{habit.subtitle}</Text>
              ) : null}
            </View>
          ))}

          {showNotes ? (
            <View style={styles.notesHeaderCell}>
              <Text style={styles.notesHeaderText}>{l.notes}</Text>
            </View>
          ) : null}
        </View>

        {/* 30 Day Rows */}
        {days.map((day) => {
          const isMilestone = [7, 14, 21, 30].includes(day);
          return (
            <View
              key={day}
              style={[
                isMilestone ? styles.dayMilestoneRow : styles.dayRow,
                {
                  height: rowHeight,
                  backgroundColor: isMilestone ? `${brandKit.brandColor || '#4F46E5'}0A` : '#FFFFFF',
                },
              ]}
            >
              {/* Day Number */}
              <View style={styles.dayNumberCell}>
                <Text
                  style={[
                    isMilestone ? styles.dayMilestoneText : styles.dayNumberText,
                    isMilestone ? { color: brandKit.brandColor || '#0F172A' } : {},
                  ]}
                >
                  {String(day).padStart(2, '0')}
                </Text>
              </View>

              {/* Habit Checkboxes (5.1 mm) */}
              {habits.map((_, hIdx) => (
                <View key={hIdx} style={styles.checkboxCell}>
                  <View
                    style={[
                      styles.checkbox,
                      isMilestone
                        ? {
                            borderColor: brandKit.brandColor || '#0F172A',
                            borderWidth: 0.9,
                          }
                        : {},
                    ]}
                  />
                </View>
              ))}

              {/* Optional Notes Cell */}
              {showNotes ? (
                <View style={styles.notesCell}>
                  <View style={styles.notesWritingLine} />
                </View>
              ) : null}
            </View>
          );
        })}

        {/* Optional Total Score Row */}
        {showScore ? (
          <View style={styles.scoreRow}>
            <View style={styles.scoreLabelCell}>
              <Text style={styles.scoreLabelText}>{l.score}</Text>
            </View>
            {habits.map((_, hIdx) => (
              <View key={hIdx} style={styles.scoreValueCell}>
                <Text style={styles.scoreValueText}>___ / 30</Text>
              </View>
            ))}
            {showNotes ? <View style={styles.notesCell} /> : null}
          </View>
        ) : null}
      </View>

      {/* Minimal Footer */}
      <View style={styles.footer}>
        <View style={styles.footerLeft}>
          {brandKit.companyName ? (
            <>
              <Text style={styles.footerCompany}>{brandKit.companyName}</Text>
              <Text style={styles.footerDot}>•</Text>
            </>
          ) : null}
          <Text style={styles.footerPage}>{l.footerPage}</Text>
        </View>

        {/* Watermark / LogoLoom Badge (Free) or Verified (Pro) */}
        <View>
          {brandKit.removeWatermark ? (
            <Text style={styles.proVerified}>{l.verified.toUpperCase()}</Text>
          ) : (
            <View style={styles.watermarkBadge}>
              <VectorQR
                text="https://logoloom.app"
                size={34} // ~12 mm
                darkColor="#475569"
                lightColor="#FFFFFF"
              />
              <View style={styles.watermarkTextCol}>
                <Text style={styles.watermarkText}>{l.madeWith}</Text>
                <Text style={styles.watermarkDomain}>logoloom.app</Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </Page>
  );
};
