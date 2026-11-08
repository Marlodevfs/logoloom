'use client';

import React, { useState, useEffect } from 'react';
import { BrandKit, DocumentLang, RoadmapCustomContent, RoadmapPhaseCustom } from '@/types';
import { DOCUMENT_TRANSLATIONS } from '@/lib/i18n/documents';
import { MINIMAL_ROADMAP_LABELS } from '@/lib/i18n/minimal-labels';
import { generateQRCodeDataURL } from '@/lib/qr-engine';
import { getDefaultRoadmapContent } from '@/lib/use-brand-kit';

interface MinimalRoadmapTemplateProps {
  brandKit: BrandKit;
  onUpdate?: (updates: Partial<BrandKit>) => void;
}

export const MinimalRoadmapTemplate: React.FC<MinimalRoadmapTemplateProps> = ({
  brandKit,
  onUpdate,
}) => {
  const docLang: DocumentLang = brandKit.documentLang || 'en';
  const t = (DOCUMENT_TRANSLATIONS[docLang] || DOCUMENT_TRANSLATIONS.en).roadmap90;
  const content: RoadmapCustomContent = brandKit.roadmapContent || getDefaultRoadmapContent(docLang);

  const [userQrDataUrl, setUserQrDataUrl] = useState<string>('');
  const [loomQrDataUrl, setLoomQrDataUrl] = useState<string>('');
  const [editingField, setEditingField] = useState<string | null>(null);

  const updateRoadmapContent = (updates: Partial<RoadmapCustomContent>) => {
    if (!onUpdate) return;
    onUpdate({
      roadmapContent: { ...content, ...updates },
    });
  };

  useEffect(() => {
    let isMounted = true;
    if (brandKit.qrUrl && brandKit.qrUrl.trim().length > 0 && brandKit.qrUrl !== 'https://logoloom.app') {
      generateQRCodeDataURL(brandKit.qrUrl, {
        width: 160,
        margin: 2,
        color: { dark: '#0F172A', light: '#FFFFFF' },
      }).then((url) => {
        if (isMounted) setUserQrDataUrl(url);
      });
    } else {
      setUserQrDataUrl('');
    }

    generateQRCodeDataURL('https://logoloom.app', {
      width: 120,
      margin: 2,
      color: { dark: '#475569', light: '#FFFFFF' },
    }).then((url) => {
      if (isMounted) setLoomQrDataUrl(url);
    });

    return () => {
      isMounted = false;
    };
  }, [brandKit.qrUrl]);

  const isA4 = brandKit.paperSize === 'a4';
  const frameWidth = isA4 ? '794px' : '816px';
  const frameHeight = isA4 ? '1123px' : '1056px';

  const l = MINIMAL_ROADMAP_LABELS[docLang] || MINIMAL_ROADMAP_LABELS.en;
  const qrDisplayLabel = brandKit.qrLabel || l.defaultQr;
  const projectLabel = l.project;
  const horizonLabel = l.horizon;
  const milestoneLabel = l.milestone;
  const clientSignLabel = l.clientSign;
  const advisorSignLabel = l.advisorSign;
  const pageLabel = l.page;

  const hasUserQR = Boolean(brandKit.qrUrl && brandKit.qrUrl.trim().length > 0 && userQrDataUrl);

  const phases: RoadmapPhaseCustom[] = content.phases || [
    { title: t.phase1.title, daysLabel: t.phase1.range, deliverables: t.phase1.deliverables, kpi: t.phase1.kpiValue },
    { title: t.phase2.title, daysLabel: t.phase2.range, deliverables: t.phase2.deliverables, kpi: t.phase2.kpiValue },
    { title: t.phase3.title, daysLabel: t.phase3.range, deliverables: t.phase3.deliverables, kpi: t.phase3.kpiValue },
  ];

  return (
    <div
      id="logoloom-pdf-target"
      className="bg-white text-slate-900 mx-auto select-none overflow-hidden flex flex-col justify-between font-sans shadow-2xl relative"
      style={{
        width: frameWidth,
        minHeight: frameHeight,
        height: frameHeight,
        padding: '36px 42px',
        boxSizing: 'border-box',
      }}
    >
      {/* Top Hairline Accent Line (0.75 pt) */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px]"
        style={{ backgroundColor: brandKit.brandColor || '#4F46E5' }}
      />

      {/* Header Section */}
      <header className="border-b border-slate-200 pb-3 mb-2 shrink-0">
        <div className="flex items-start justify-between">
          {/* Brand Left */}
          <div className="flex items-center space-x-3">
            {brandKit.logoUrl && (
              <div className="h-8 max-w-[120px] flex items-center justify-center shrink-0">
                <img
                  src={brandKit.logoUrl}
                  alt={brandKit.companyName || 'Logo'}
                  className="max-h-8 max-w-[120px] w-auto h-auto object-contain"
                />
              </div>
            )}
            <div>
              <h2 className="text-sm font-bold tracking-tight text-slate-900">
                {brandKit.companyName || (
                  <span className="text-slate-300 font-normal italic">
                    {l.companyPlaceholder}
                  </span>
                )}
              </h2>
              {brandKit.tagline ? (
                <p className="text-[11px] text-slate-500 mt-0.5">{brandKit.tagline}</p>
              ) : null}
            </div>
          </div>

          {/* Contact QR (>= 18 mm) */}
          {hasUserQR && (
            <div className="flex items-center space-x-2 pl-3 border-l border-slate-200">
              <img
                src={userQrDataUrl}
                alt="Contact QR"
                className="w-12 h-12 object-contain rounded border border-slate-200 p-0.5"
              />
              <div className="text-right max-w-[120px]">
                <p className="text-[10px] font-bold text-slate-900 leading-tight">
                  {qrDisplayLabel}
                </p>
                <p className="text-[9px] text-slate-400 font-mono truncate mt-0.5">
                  {brandKit.qrUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Title & Metadata Row */}
        <div className="flex items-end justify-between mt-3 pt-2">
          <div className="max-w-md">
            {editingField === 'title' ? (
              <input
                type="text"
                value={content.title}
                autoFocus
                onBlur={() => setEditingField(null)}
                onChange={(e) => updateRoadmapContent({ title: e.target.value })}
                className="text-xl font-extrabold tracking-tight text-slate-900 border-b-2 border-indigo-500 outline-none w-full bg-indigo-50/40 px-1 py-0.5 rounded"
              />
            ) : (
              <h1
                onClick={() => setEditingField('title')}
                title="Click to edit title"
                className="text-xl font-bold tracking-tight text-slate-900 hover:text-indigo-600 transition-colors cursor-pointer"
              >
                {content.title || t.title}
              </h1>
            )}
            {content.subtitle && (
              <p className="text-[11px] text-slate-500 mt-0.5">{content.subtitle}</p>
            )}
          </div>

          <div className="flex items-end space-x-5 text-xs text-slate-600">
            <div className="flex items-baseline space-x-1.5">
              <span className="font-bold text-slate-500 text-[11px]">{projectLabel}</span>
              <span className="border-b border-slate-300 min-w-[100px] text-slate-800 font-medium pb-0.5">
                {content.mission || (brandKit.clientName || '__________________')}
              </span>
            </div>
            <div className="flex items-baseline space-x-1.5">
              <span className="font-bold text-slate-500 text-[11px]">{horizonLabel}</span>
              <span className="border-b border-slate-300 min-w-[90px] text-slate-800 font-medium pb-0.5">
                {content.horizon || '90 Business Days'}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Body: 3 Horizontal Bands */}
      <main className="flex-1 flex flex-col justify-between py-1">
        {phases.map((phase, idx) => (
          <div
            key={idx}
            className="py-2.5 border-b border-slate-200/90 last:border-b-0 flex flex-col justify-between flex-1"
          >
            {/* Phase Header */}
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center space-x-2">
                <span
                  className="text-xs font-extrabold tracking-wider"
                  style={{ color: brandKit.brandColor || '#4F46E5' }}
                >
                  {`0${idx + 1} —`}
                </span>
                <h3 className="text-sm font-bold text-slate-900">{phase.title}</h3>
              </div>
              <span className="text-[11px] font-bold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded font-mono">
                {phase.daysLabel}
              </span>
            </div>

            {/* Deliverables Checklist (Handwriting lines & 5.0 mm checkboxes) */}
            <div className="space-y-1.5 my-1">
              {phase.deliverables.map((item, dIdx) => (
                <div
                  key={dIdx}
                  className="flex items-center space-x-2.5 min-h-[22px] border-b border-slate-100 pb-1"
                >
                  <div className="w-[15px] h-[15px] rounded border border-slate-400 bg-white shrink-0" />
                  <span className="text-xs text-slate-800 font-medium flex-1 leading-snug">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Key Milestone / Goal */}
            {phase.kpi && (
              <div className="flex items-center space-x-2 pt-1 border-t border-slate-100 mt-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                  {milestoneLabel}
                </span>
                <span className="text-xs font-semibold text-slate-800">{phase.kpi}</span>
              </div>
            )}
          </div>
        ))}
      </main>

      {/* Optional Signature Block */}
      {content.showSignatureBlock !== false && (
        <section className="border-t border-slate-200 pt-3 pb-1 mt-1 shrink-0">
          <div className="flex items-end justify-between">
            <div className="flex items-end space-x-2 w-[46%]">
              <span className="text-[11px] font-bold text-slate-600 shrink-0">{clientSignLabel}</span>
              <div className="border-b border-slate-300 flex-1 h-5" />
              <span className="text-[10px] text-slate-400 font-mono shrink-0">Date: ____/____/____</span>
            </div>
            <div className="flex items-end space-x-2 w-[46%]">
              <span className="text-[11px] font-bold text-slate-600 shrink-0">{advisorSignLabel}</span>
              <div className="border-b border-slate-300 flex-1 h-5" />
              <span className="text-[10px] text-slate-400 font-mono shrink-0">Date: ____/____/____</span>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-200 pt-2 mt-1 flex items-center justify-between text-xs text-slate-500 shrink-0">
        <div className="flex items-center space-x-2">
          {brandKit.companyName ? (
            <>
              <span className="font-semibold text-slate-700">{brandKit.companyName}</span>
              <span className="text-slate-300">•</span>
            </>
          ) : null}
          <span>{pageLabel}</span>
        </div>

        {brandKit.removeWatermark ? (
          <span className="text-[10px] font-mono font-bold text-emerald-600 tracking-wider">
            VERIFIED PRINT DOCUMENT
          </span>
        ) : (
          <div className="flex items-center space-x-2">
            {loomQrDataUrl && (
              <img
                src={loomQrDataUrl}
                alt="LogoLoom QR"
                className="w-8 h-8 object-contain"
              />
            )}
            <div className="text-right">
              <p className="text-[9px] text-slate-400 leading-tight">Made with</p>
              <p className="text-[10px] font-bold text-slate-800 font-mono leading-tight">
                logoloom.app
              </p>
            </div>
          </div>
        )}
      </footer>
    </div>
  );
};
