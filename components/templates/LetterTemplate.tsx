'use client';

import React, { useEffect, useRef, useState } from 'react';
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

/** Shows [placeholders] highlighted so the user sees what is left to replace. */
function Marked({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]\n]{1,80}\])/g);
  return (
    <>
      {parts.map((p, i) =>
        /^\[[^\]\n]{1,80}\]$/.test(p) ? (
          <mark key={i} style={{ background: '#FEF3C7', color: '#92400E', borderRadius: '2pt', padding: '0 1pt' }}>
            {p}
          </mark>
        ) : (
          <React.Fragment key={i}>{p}</React.Fragment>
        )
      )}
    </>
  );
}

const lines = (text: string) => text.split('\n').map((l) => l.trim()).filter(Boolean);

/**
 * Live preview of the cover letter, in pt so it matches lib/pdf/VectorLetterPDF.tsx.
 * Sender name, title and contact come from the CV, so both documents look like a pair.
 */
export const LetterTemplate: React.FC<{ brandKit: BrandKit }> = ({ brandKit }) => {
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

  return (
    <div
      style={{
        width: isA4 ? '595pt' : '612pt',
        minHeight: isA4 ? '842pt' : '792pt',
        padding: '46pt 56pt 46pt',
        boxSizing: 'border-box',
        background: '#FFFFFF',
        color: INK,
        fontFamily: 'Roboto, Arial, sans-serif',
        fontSize: '10.5pt',
        lineHeight: 1.45,
      }}
    >
      <div style={{ paddingBottom: '12pt', borderBottom: `1.5pt solid ${accent}` }}>
        <div style={{ fontSize: '20pt', fontWeight: 700, lineHeight: 1.1 }}>
          <Marked text={cv.fullName} />
        </div>
        {cv.jobTitle && (
          <div style={{ fontSize: '11pt', color: accent, marginTop: '3pt', fontWeight: 500 }}>
            <Marked text={cv.jobTitle} />
          </div>
        )}
        {contact.length > 0 && (
          <div style={{ fontSize: '9.2pt', color: MUTED, marginTop: '6pt' }}>
            <Marked text={contact.join('  ·  ')} />
          </div>
        )}
      </div>

      <div style={{ marginTop: '26pt', marginLeft: '55%' }}>
        {lines(l.recipient).map((line, i) => (
          <div key={i} style={{ fontWeight: i === 0 ? 700 : 400 }}>
            <Marked text={line} />
          </div>
        ))}
      </div>

      <div style={{ marginTop: '18pt', marginLeft: '55%', color: MUTED }}>
        <Marked text={letterDateLine(lang, l.place || cv.city || '', l.date)} />
      </div>

      {l.subject.trim() && (
        <div style={{ marginTop: '22pt', fontWeight: 700 }}>
          {LETTER_SUBJECT_PREFIX[lang]}
          <Marked text={l.subject} />
        </div>
      )}

      {l.salutation.trim() && (
        <div style={{ marginTop: '16pt' }}>
          <Marked text={l.salutation} />
        </div>
      )}

      {letterParagraphs(l.body).map((p, i) => (
        <p key={i} style={{ margin: '9pt 0 0', textAlign: 'justify', whiteSpace: 'pre-line' }}>
          <Marked text={p} />
        </p>
      ))}

      {l.closing.trim() && (
        <p style={{ margin: '12pt 0 0', whiteSpace: 'pre-line' }}>
          <Marked text={l.closing} />
        </p>
      )}

      <div style={{ marginTop: '22pt', fontWeight: 700, textAlign: signRight ? 'right' : 'left' }}>
        <Marked text={cv.fullName} />
      </div>
    </div>
  );
};

/** Scaled sheet for the studio preview (same behaviour as CvSheet). */
export function LetterSheet({ kit }: { kit: BrandKit }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);
  const isA4 = kit.paperSize !== 'letter';
  const W = isA4 ? 793 : 816;
  const H = isA4 ? 1123 : 1056;

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / W);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [W]);

  return (
    <div ref={boxRef} className="relative w-full overflow-hidden" style={{ height: H * scale }}>
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 origin-top-left pointer-events-none select-none"
        style={{ transform: `scale(${scale})`, width: W }}
      >
        <LetterTemplate brandKit={kit} />
      </div>
    </div>
  );
}
