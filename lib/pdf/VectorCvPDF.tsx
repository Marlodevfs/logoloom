import React from 'react';
import { Page, View, Text, Image, StyleSheet, Link } from '@react-pdf/renderer';
import { BrandKit, CvCustomContent, DocumentLang } from '@/types';
import { getDefaultCvContent } from '@/lib/use-brand-kit';
import { CV_SECTION_LABELS, cvLines, cvPeriod } from '@/lib/i18n/cv-data';

interface VectorCvPDFProps {
  brandKit: BrandKit;
}

const INK = '#0F172A';
const MUTED = '#475569';
const SOFT = '#64748B';

const linkHref = (raw: string) => (/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);

/**
 * CV as a real text PDF (selectable, readable by applicant tracking systems).
 * No LogoLoom credit or QR: a CV is sent to employers, it must carry nothing but the candidate.
 * Long CVs flow onto extra pages; the sidebar background is repeated with `fixed`.
 */
export const VectorCvPDF: React.FC<VectorCvPDFProps> = ({ brandKit }) => {
  const lang: DocumentLang = brandKit.documentLang || 'en';
  const cv: CvCustomContent = brandKit.cvContent || getDefaultCvContent(lang);
  const t = CV_SECTION_LABELS[lang] || CV_SECTION_LABELS.en;
  const accent = brandKit.brandColor || '#1E293B';
  const onAccent = brandKit.contrastText || '#FFFFFF';
  const isA4 = brandKit.paperSize !== 'letter';
  const sidebar = cv.layout !== 'classic';
  const SIDEBAR_W = 178;

  const s = StyleSheet.create({
    page: {
      fontFamily: 'Roboto',
      fontSize: 9.8,
      color: INK,
      paddingTop: 36,
      paddingBottom: 36,
      paddingLeft: sidebar ? SIDEBAR_W + 26 : 44,
      paddingRight: sidebar ? 32 : 44,
      lineHeight: 1.35,
    },
    sidebarBg: { position: 'absolute', top: 0, left: 0, bottom: 0, width: SIDEBAR_W, backgroundColor: accent },
    sidebarCol: { position: 'absolute', top: 36, left: 20, width: SIDEBAR_W - 40, color: onAccent },
    photo: { width: 92, height: 92, borderRadius: 46, marginBottom: 14, alignSelf: 'center', objectFit: 'cover' },
    photoClassic: { width: 72, height: 72, borderRadius: 36, objectFit: 'cover' },
    sideTitle: {
      fontSize: 8.8,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      letterSpacing: 1,
      marginTop: 14,
      marginBottom: 5,
      paddingBottom: 3,
      borderBottomWidth: 0.6,
      borderBottomColor: onAccent,
      color: onAccent,
    },
    sideText: { fontSize: 9.2, marginBottom: 3, color: onAccent },
    sideSmall: { fontSize: 8.2, marginBottom: 4, color: onAccent, opacity: 0.85 },
    name: { fontSize: sidebar ? 24 : 26, fontWeight: 'bold', color: INK, lineHeight: 1.1 },
    jobTitle: { fontSize: 12.5, color: accent, marginTop: 4, fontWeight: 'medium' },
    contactLine: { fontSize: 9.2, color: MUTED, marginTop: 6 },
    headerClassic: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 12, borderBottomWidth: 1.5, borderBottomColor: accent },
    sectionTitle: {
      fontSize: 10.3,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      letterSpacing: 1,
      color: accent,
      marginTop: 16,
      marginBottom: 6,
      paddingBottom: 3,
      borderBottomWidth: 0.6,
      borderBottomColor: '#CBD5E1',
    },
    summary: { fontSize: 9.8, color: MUTED },
    item: { marginBottom: 9 },
    itemHead: { flexDirection: 'row', justifyContent: 'space-between' },
    itemTitle: { fontSize: 10.8, fontWeight: 'bold', color: INK, flex: 1, paddingRight: 8 },
    itemPeriod: { fontSize: 9.2, color: SOFT },
    itemSub: { fontSize: 9.2, color: MUTED, marginTop: 1 },
    bulletRow: { flexDirection: 'row', marginTop: 2, paddingLeft: 2 },
    bulletDot: { width: 8, fontSize: 9, color: accent },
    bulletText: { flex: 1, fontSize: 9.6, color: INK },
    twoCols: { flexDirection: 'row', gap: 24 },
    col: { flex: 1 },
    chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 4 },
    chip: { fontSize: 9, color: INK, backgroundColor: '#F1F5F9', paddingVertical: 2, paddingHorizontal: 6, borderRadius: 3 },
    text: { fontSize: 9.8, color: INK },
  });

  const contactParts = [cv.email, cv.phone, cv.city, cv.link].filter((x) => x && x.trim());
  const experiences = cv.experiences.filter((e) => e.role || e.company);
  const education = cv.education.filter((e) => e.degree || e.school);
  const languages = cv.languages.filter((x) => x.name);

  const experienceBlock = experiences.length > 0 && (
    <View>
      <Text style={s.sectionTitle}>{t.experience}</Text>
      {experiences.map((e, i) => (
        <View key={i} style={s.item} wrap={false}>
          <View style={s.itemHead}>
            <Text style={s.itemTitle}>{e.role}</Text>
            <Text style={s.itemPeriod}>{cvPeriod(e.start, e.end)}</Text>
          </View>
          {(e.company || e.location) && (
            <Text style={s.itemSub}>{[e.company, e.location].filter(Boolean).join(' · ')}</Text>
          )}
          {cvLines(e.details).map((line, j) => (
            <View key={j} style={s.bulletRow}>
              <Text style={s.bulletDot}>•</Text>
              <Text style={s.bulletText}>{line}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );

  const educationBlock = education.length > 0 && (
    <View>
      <Text style={s.sectionTitle}>{t.education}</Text>
      {education.map((e, i) => (
        <View key={i} style={s.item} wrap={false}>
          <View style={s.itemHead}>
            <Text style={s.itemTitle}>{e.degree}</Text>
            <Text style={s.itemPeriod}>{cvPeriod(e.start, e.end)}</Text>
          </View>
          {e.school ? <Text style={s.itemSub}>{e.school}</Text> : null}
          {e.details ? <Text style={[s.itemSub, { color: INK }]}>{e.details}</Text> : null}
        </View>
      ))}
    </View>
  );

  const summaryBlock = cv.summary?.trim() ? (
    <View>
      <Text style={s.sectionTitle}>{t.profile}</Text>
      <Text style={s.summary}>{cv.summary.trim()}</Text>
    </View>
  ) : null;

  if (sidebar) {
    return (
      <Page size={isA4 ? 'A4' : 'LETTER'} style={s.page}>
        <View style={s.sidebarBg} fixed />
        <View style={s.sidebarCol}>
          {cv.photoUrl ? <Image src={cv.photoUrl} style={s.photo} /> : null}
          {contactParts.length > 0 && (
            <View>
              <Text style={[s.sideTitle, { marginTop: 0 }]}>{t.contact}</Text>
              {cv.email ? <Text style={s.sideText}>{cv.email}</Text> : null}
              {cv.phone ? <Text style={s.sideText}>{cv.phone}</Text> : null}
              {cv.city ? <Text style={s.sideText}>{cv.city}</Text> : null}
              {cv.link ? (
                <Link src={linkHref(cv.link)} style={[s.sideText, { textDecoration: 'none' }]}>
                  {cv.link}
                </Link>
              ) : null}
            </View>
          )}
          {cv.skills.length > 0 && (
            <View>
              <Text style={s.sideTitle}>{t.skills}</Text>
              {cv.skills.map((sk, i) => (
                <Text key={i} style={s.sideText}>• {sk}</Text>
              ))}
            </View>
          )}
          {languages.length > 0 && (
            <View>
              <Text style={s.sideTitle}>{t.languages}</Text>
              {languages.map((lg, i) => (
                <View key={i}>
                  <Text style={[s.sideText, { marginBottom: 0, fontWeight: 'bold' }]}>{lg.name}</Text>
                  {lg.level ? <Text style={s.sideSmall}>{lg.level}</Text> : null}
                </View>
              ))}
            </View>
          )}
          {cv.interests?.trim() ? (
            <View>
              <Text style={s.sideTitle}>{t.interests}</Text>
              <Text style={s.sideText}>{cv.interests.trim()}</Text>
            </View>
          ) : null}
        </View>

        <View>
          <Text style={s.name}>{cv.fullName}</Text>
          {cv.jobTitle ? <Text style={s.jobTitle}>{cv.jobTitle}</Text> : null}
          {summaryBlock}
          {experienceBlock}
          {educationBlock}
        </View>
      </Page>
    );
  }

  return (
    <Page size={isA4 ? 'A4' : 'LETTER'} style={s.page}>
      <View style={s.headerClassic}>
        <View style={{ flex: 1, paddingRight: 12 }}>
          <Text style={s.name}>{cv.fullName}</Text>
          {cv.jobTitle ? <Text style={s.jobTitle}>{cv.jobTitle}</Text> : null}
          {contactParts.length > 0 ? <Text style={s.contactLine}>{contactParts.join('  ·  ')}</Text> : null}
        </View>
        {cv.photoUrl ? <Image src={cv.photoUrl} style={s.photoClassic} /> : null}
      </View>
      {summaryBlock}
      {experienceBlock}
      {educationBlock}
      {(cv.skills.length > 0 || languages.length > 0) && (
        <View style={s.twoCols} wrap={false}>
          {cv.skills.length > 0 && (
            <View style={s.col}>
              <Text style={s.sectionTitle}>{t.skills}</Text>
              <View style={s.chipRow}>
                {cv.skills.map((sk, i) => (
                  <Text key={i} style={s.chip}>{sk}</Text>
                ))}
              </View>
            </View>
          )}
          {languages.length > 0 && (
            <View style={s.col}>
              <Text style={s.sectionTitle}>{t.languages}</Text>
              {languages.map((lg, i) => (
                <Text key={i} style={s.text}>
                  {lg.name}
                  {lg.level ? <Text style={{ color: MUTED }}> — {lg.level}</Text> : null}
                </Text>
              ))}
            </View>
          )}
        </View>
      )}
      {cv.interests?.trim() ? (
        <View wrap={false}>
          <Text style={s.sectionTitle}>{t.interests}</Text>
          <Text style={s.text}>{cv.interests.trim()}</Text>
        </View>
      ) : null}
    </Page>
  );
};
