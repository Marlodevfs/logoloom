'use client';

import React from 'react';
import { BrandKit, CvCustomContent, DocumentLang } from '@/types';
import { getDefaultCvContent } from '@/lib/use-brand-kit';
import { CV_SECTION_LABELS, cvLines, cvPeriod } from '@/lib/i18n/cv-data';

interface CvTemplateProps {
  brandKit: BrandKit;
}

const INK = '#0F172A';
const MUTED = '#475569';
const SOFT = '#64748B';

/**
 * Live preview of the CV. Sizes are in pt so it matches lib/pdf/VectorCvPDF.tsx 1:1.
 * Editing happens in the side form (CvEditor), not inline.
 */
export const CvTemplate: React.FC<CvTemplateProps> = ({ brandKit }) => {
  const lang: DocumentLang = brandKit.documentLang || 'en';
  const cv: CvCustomContent = brandKit.cvContent || getDefaultCvContent(lang);
  const t = CV_SECTION_LABELS[lang] || CV_SECTION_LABELS.en;
  const accent = brandKit.brandColor || '#1E293B';
  const onAccent = brandKit.contrastText || '#FFFFFF';
  const isA4 = brandKit.paperSize !== 'letter';
  const sidebar = cv.layout !== 'classic';
  const SIDEBAR_W = 178;

  const contactParts = [cv.email, cv.phone, cv.city, cv.link].filter((x) => x && x.trim());
  const experiences = cv.experiences.filter((e) => e.role || e.company);
  const education = cv.education.filter((e) => e.degree || e.school);
  const languages = cv.languages.filter((x) => x.name);

  const sectionTitle: React.CSSProperties = {
    fontSize: '10.3pt',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '1pt',
    color: accent,
    marginTop: '16pt',
    marginBottom: '6pt',
    paddingBottom: '3pt',
    borderBottom: '0.6pt solid #CBD5E1',
  };
  const sideTitle: React.CSSProperties = {
    fontSize: '8.8pt',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '1pt',
    marginTop: '14pt',
    marginBottom: '5pt',
    paddingBottom: '3pt',
    borderBottom: `0.6pt solid ${onAccent}`,
  };

  const itemHead = (title: string, period: string) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8pt' }}>
      <span style={{ fontSize: '10.8pt', fontWeight: 700, color: INK }}>{title}</span>
      <span style={{ fontSize: '9.2pt', color: SOFT, whiteSpace: 'nowrap' }}>{period}</span>
    </div>
  );

  const summaryBlock = cv.summary?.trim() ? (
    <section>
      <div style={sectionTitle}>{t.profile}</div>
      <p style={{ fontSize: '9.8pt', color: MUTED, margin: 0 }}>{cv.summary.trim()}</p>
    </section>
  ) : null;

  const experienceBlock =
    experiences.length > 0 ? (
      <section>
        <div style={sectionTitle}>{t.experience}</div>
        {experiences.map((e, i) => (
          <div key={i} style={{ marginBottom: '9pt' }}>
            {itemHead(e.role, cvPeriod(e.start, e.end))}
            {(e.company || e.location) && (
              <div style={{ fontSize: '9.2pt', color: MUTED, marginTop: '1pt' }}>
                {[e.company, e.location].filter(Boolean).join(' · ')}
              </div>
            )}
            {cvLines(e.details).map((line, j) => (
              <div key={j} style={{ display: 'flex', marginTop: '2pt', paddingLeft: '2pt' }}>
                <span style={{ width: '8pt', color: accent }}>•</span>
                <span style={{ flex: 1, fontSize: '9.6pt', color: INK }}>{line}</span>
              </div>
            ))}
          </div>
        ))}
      </section>
    ) : null;

  const educationBlock =
    education.length > 0 ? (
      <section>
        <div style={sectionTitle}>{t.education}</div>
        {education.map((e, i) => (
          <div key={i} style={{ marginBottom: '9pt' }}>
            {itemHead(e.degree, cvPeriod(e.start, e.end))}
            {e.school && <div style={{ fontSize: '9.2pt', color: MUTED, marginTop: '1pt' }}>{e.school}</div>}
            {e.details && <div style={{ fontSize: '9.2pt', color: INK, marginTop: '1pt' }}>{e.details}</div>}
          </div>
        ))}
      </section>
    ) : null;

  const page: React.CSSProperties = {
    position: 'relative',
    width: isA4 ? '595pt' : '612pt',
    minHeight: isA4 ? '842pt' : '792pt',
    padding: sidebar ? `36pt 32pt 36pt ${SIDEBAR_W + 26}pt` : '36pt 44pt',
    boxSizing: 'border-box',
    background: '#FFFFFF',
    color: INK,
    fontFamily: 'Roboto, Inter, system-ui, sans-serif',
    fontSize: '9.8pt',
    lineHeight: 1.35,
  };

  const photo = (size: number) =>
    cv.photoUrl ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={cv.photoUrl}
        alt=""
        style={{ width: `${size}pt`, height: `${size}pt`, borderRadius: '50%', objectFit: 'cover', display: 'block' }}
      />
    ) : null;

  if (sidebar) {
    return (
      <div id="logoloom-pdf-target" className="mx-auto shadow-2xl" style={page}>
        <aside
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            width: `${SIDEBAR_W}pt`,
            background: accent,
            color: onAccent,
            padding: '36pt 20pt',
            boxSizing: 'border-box',
            fontSize: '9.2pt',
          }}
        >
          {cv.photoUrl && <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '14pt' }}>{photo(92)}</div>}
          {contactParts.length > 0 && (
            <div>
              <div style={{ ...sideTitle, marginTop: 0 }}>{t.contact}</div>
              {contactParts.map((c, i) => (
                <div key={i} style={{ marginBottom: '3pt', wordBreak: 'break-word' }}>{c}</div>
              ))}
            </div>
          )}
          {cv.skills.length > 0 && (
            <div>
              <div style={sideTitle}>{t.skills}</div>
              {cv.skills.map((sk, i) => (
                <div key={i} style={{ marginBottom: '3pt' }}>• {sk}</div>
              ))}
            </div>
          )}
          {languages.length > 0 && (
            <div>
              <div style={sideTitle}>{t.languages}</div>
              {languages.map((lg, i) => (
                <div key={i} style={{ marginBottom: '4pt' }}>
                  <div style={{ fontWeight: 700 }}>{lg.name}</div>
                  {lg.level && <div style={{ fontSize: '8.2pt', opacity: 0.85 }}>{lg.level}</div>}
                </div>
              ))}
            </div>
          )}
          {cv.interests?.trim() && (
            <div>
              <div style={sideTitle}>{t.interests}</div>
              <div>{cv.interests.trim()}</div>
            </div>
          )}
        </aside>

        <main>
          <div style={{ fontSize: '24pt', fontWeight: 700, lineHeight: 1.1 }}>{cv.fullName}</div>
          {cv.jobTitle && <div style={{ fontSize: '12.5pt', color: accent, marginTop: '4pt', fontWeight: 500 }}>{cv.jobTitle}</div>}
          {summaryBlock}
          {experienceBlock}
          {educationBlock}
        </main>
      </div>
    );
  }

  return (
    <div id="logoloom-pdf-target" className="mx-auto shadow-2xl" style={page}>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: '12pt',
          borderBottom: `1.5pt solid ${accent}`,
        }}
      >
        <div style={{ flex: 1, paddingRight: '12pt' }}>
          <div style={{ fontSize: '26pt', fontWeight: 700, lineHeight: 1.1 }}>{cv.fullName}</div>
          {cv.jobTitle && <div style={{ fontSize: '12.5pt', color: accent, marginTop: '4pt', fontWeight: 500 }}>{cv.jobTitle}</div>}
          {contactParts.length > 0 && (
            <div style={{ fontSize: '9.2pt', color: MUTED, marginTop: '6pt' }}>{contactParts.join('  ·  ')}</div>
          )}
        </div>
        {photo(72)}
      </header>
      {summaryBlock}
      {experienceBlock}
      {educationBlock}
      {(cv.skills.length > 0 || languages.length > 0) && (
        <div style={{ display: 'flex', gap: '24pt' }}>
          {cv.skills.length > 0 && (
            <section style={{ flex: 1 }}>
              <div style={sectionTitle}>{t.skills}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4pt' }}>
                {cv.skills.map((sk, i) => (
                  <span key={i} style={{ fontSize: '9pt', background: '#F1F5F9', padding: '2pt 6pt', borderRadius: '3pt' }}>
                    {sk}
                  </span>
                ))}
              </div>
            </section>
          )}
          {languages.length > 0 && (
            <section style={{ flex: 1 }}>
              <div style={sectionTitle}>{t.languages}</div>
              {languages.map((lg, i) => (
                <div key={i}>
                  {lg.name}
                  {lg.level && <span style={{ color: MUTED }}> — {lg.level}</span>}
                </div>
              ))}
            </section>
          )}
        </div>
      )}
      {cv.interests?.trim() && (
        <section>
          <div style={sectionTitle}>{t.interests}</div>
          <div>{cv.interests.trim()}</div>
        </section>
      )}
    </div>
  );
};
