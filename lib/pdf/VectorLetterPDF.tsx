import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import type { BrandKit, DocumentLang } from '@/types';
import { getDefaultCvContent } from '@/lib/use-brand-kit';
import {
  getDefaultLetterContent,
  letterDateLine,
  letterParagraphs,
  LETTER_SUBJECT_PREFIX,
} from '@/lib/i18n/letter-data';

const INK = '#0F172A';
const MUTED = '#475569';

const lines = (text: string) => text.split('\n').map((l) => l.trim()).filter(Boolean);

/**
 * Cover letter as a real text PDF, matching components/templates/LetterTemplate.tsx.
 * Like the CV, it carries nothing but the candidate: no LogoLoom credit, no QR.
 */
export const VectorLetterPDF: React.FC<{ brandKit: BrandKit }> = ({ brandKit }) => {
  const lang: DocumentLang = brandKit.documentLang || 'en';
  const cv = brandKit.cvContent || getDefaultCvContent(lang);
  const l = brandKit.letterContent || getDefaultLetterContent(lang);
  const accent = brandKit.brandColor || '#1E293B';
  const isA4 = brandKit.paperSize !== 'letter';
  const signRight = lang !== 'en' && lang !== 'de';

  const address = lines(l.senderAddress);
  const contact = [...(address.length ? address : cv.city ? [cv.city] : []), cv.phone, cv.email, cv.link].filter(
    (x) => x && x.trim()
  );

  const s = StyleSheet.create({
    page: { fontFamily: 'Roboto', fontSize: 10.5, color: INK, lineHeight: 1.45, paddingTop: 46, paddingBottom: 46, paddingHorizontal: 56 },
    header: { paddingBottom: 12, borderBottomWidth: 1.5, borderBottomColor: accent },
    name: { fontSize: 20, fontWeight: 'bold', lineHeight: 1.1 },
    jobTitle: { fontSize: 11, color: accent, marginTop: 3, fontWeight: 'medium' },
    contact: { fontSize: 9.2, color: MUTED, marginTop: 6 },
    recipient: { marginTop: 26, marginLeft: '55%' },
    date: { marginTop: 18, marginLeft: '55%', color: MUTED },
    subject: { marginTop: 22, fontWeight: 'bold' },
    salutation: { marginTop: 16 },
    paragraph: { marginTop: 9, textAlign: 'justify' },
    closing: { marginTop: 12 },
    signature: { marginTop: 22, fontWeight: 'bold', textAlign: signRight ? 'right' : 'left' },
  });

  return (
    <Page size={isA4 ? 'A4' : 'LETTER'} style={s.page}>
      <View style={s.header}>
        <Text style={s.name}>{cv.fullName}</Text>
        {cv.jobTitle ? <Text style={s.jobTitle}>{cv.jobTitle}</Text> : null}
        {contact.length > 0 ? <Text style={s.contact}>{contact.join('  ·  ')}</Text> : null}
      </View>

      <View style={s.recipient}>
        {lines(l.recipient).map((line, i) => (
          <Text key={i} style={i === 0 ? { fontWeight: 'bold' } : undefined}>
            {line}
          </Text>
        ))}
      </View>

      <Text style={s.date}>{letterDateLine(lang, l.place || cv.city || '', l.date)}</Text>

      {l.subject.trim() ? <Text style={s.subject}>{LETTER_SUBJECT_PREFIX[lang] + l.subject.trim()}</Text> : null}
      {l.salutation.trim() ? <Text style={s.salutation}>{l.salutation.trim()}</Text> : null}

      {letterParagraphs(l.body).map((p, i) => (
        <Text key={i} style={s.paragraph}>
          {p}
        </Text>
      ))}

      {l.closing.trim() ? <Text style={s.closing}>{l.closing.trim()}</Text> : null}
      <Text style={s.signature} wrap={false}>
        {cv.fullName}
      </Text>
    </Page>
  );
};
