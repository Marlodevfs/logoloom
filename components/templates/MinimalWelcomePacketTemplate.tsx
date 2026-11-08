'use client';

import React, { useState, useEffect } from 'react';
import { BrandKit, DocumentLang, WelcomePacketCustomContent } from '@/types';
import { DOCUMENT_TRANSLATIONS } from '@/lib/i18n/documents';
import { MINIMAL_WELCOME_LABELS } from '@/lib/i18n/minimal-labels';
import { generateQRCodeDataURL } from '@/lib/qr-engine';
import { getDefaultWelcomePacketContent } from '@/lib/use-brand-kit';

interface MinimalWelcomePacketTemplateProps {
  brandKit: BrandKit;
  onUpdate?: (updates: Partial<BrandKit>) => void;
}

export const MinimalWelcomePacketTemplate: React.FC<MinimalWelcomePacketTemplateProps> = ({
  brandKit,
  onUpdate,
}) => {
  const docLang: DocumentLang = brandKit.documentLang || 'en';
  const t = (DOCUMENT_TRANSLATIONS[docLang] || DOCUMENT_TRANSLATIONS.en).welcomePacket;
  const content: WelcomePacketCustomContent = brandKit.welcomePacketContent || getDefaultWelcomePacketContent(docLang);

  const [userQrDataUrl, setUserQrDataUrl] = useState<string>('');
  const [loomQrDataUrl, setLoomQrDataUrl] = useState<string>('');
  const [editingField, setEditingField] = useState<string | null>(null);

  const updateWelcomeContent = (updates: Partial<WelcomePacketCustomContent>) => {
    if (!onUpdate) return;
    onUpdate({
      welcomePacketContent: { ...content, ...updates },
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

  const l = MINIMAL_WELCOME_LABELS[docLang] || MINIMAL_WELCOME_LABELS.en;
  const qrDisplayLabel = brandKit.qrLabel || l.defaultQr;
  const pageLabel = l.page;

  const hasUserQR = Boolean(brandKit.qrUrl && brandKit.qrUrl.trim().length > 0 && userQrDataUrl);

  const commItems = [
    { label: t.commItems[0]?.label || 'Primary Channel', text: content.channels || t.commItems[0]?.text },
    { label: t.commItems[1]?.label || 'Response SLA', text: content.turnaroundTime || t.commItems[1]?.text },
    { label: t.commItems[2]?.label || 'Meetings', text: content.meetingRhythm || t.commItems[2]?.text },
    { label: t.commItems[3]?.label || 'Urgent Escalation', text: content.urgentProcedure || t.commItems[3]?.text },
  ];

  const agreements = content.workingAgreements && content.workingAgreements.length > 0
    ? content.workingAgreements
    : t.agreements.map((a) => ({ title: a.title, description: a.desc }));

  const checklist = content.checklist72h && content.checklist72h.length > 0
    ? content.checklist72h
    : t.firstSteps;

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

        {/* Title & Subtitle */}
        <div className="mt-3 pt-2">
          {editingField === 'title' ? (
            <input
              type="text"
              value={content.title}
              autoFocus
              onBlur={() => setEditingField(null)}
              onChange={(e) => updateWelcomeContent({ title: e.target.value })}
              className="text-xl font-extrabold tracking-tight text-slate-900 border-b-2 border-indigo-500 outline-none w-full bg-indigo-50/40 px-1 py-0.5 rounded"
            />
          ) : (
            <div
              role="heading"
              aria-level={2}
              onClick={() => setEditingField('title')}
              title="Click to edit title"
              className="text-xl font-bold tracking-tight text-slate-900 hover:text-indigo-600 transition-colors cursor-pointer"
            >
              {content.title || t.title}
            </div>
          )}
          {content.subtitle && (
            <p className="text-[11px] text-slate-500 mt-0.5">{content.subtitle}</p>
          )}
        </div>
      </header>

      {/* Body: 4 Clean Minimal Sections */}
      <section className="flex-1 flex flex-col justify-between py-1">
        {/* 1. Welcome Message */}
        <section className="py-2 border-b border-slate-100">
          <div className="flex items-center space-x-2 mb-1.5">
            <div
              className="w-1 h-3 rounded-full"
              style={{ backgroundColor: brandKit.brandColor || '#4F46E5' }}
            />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              {t.welcomeHeader}
            </h3>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed max-w-2xl">
            {content.welcomeMessage || t.welcomeBody}
          </p>
        </section>

        {/* 2. Communication Standards & SLAs */}
        <section className="py-2 border-b border-slate-100">
          <div className="flex items-center space-x-2 mb-2">
            <div
              className="w-1 h-3 rounded-full"
              style={{ backgroundColor: brandKit.brandColor || '#4F46E5' }}
            />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              {t.commHeader}
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {commItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200/80 rounded-lg p-2.5"
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                  {item.label}
                </span>
                <p className="text-xs font-medium text-slate-800 leading-snug">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Working Agreements */}
        <section className="py-2 border-b border-slate-100">
          <div className="flex items-center space-x-2 mb-2">
            <div
              className="w-1 h-3 rounded-full"
              style={{ backgroundColor: brandKit.brandColor || '#4F46E5' }}
            />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              {t.agreementsHeader}
            </h3>
          </div>
          <div className="space-y-2">
            {agreements.map((agreement, idx) => (
              <div key={idx} className="flex items-start space-x-2.5">
                <span
                  className="text-xs font-bold mt-0.5 shrink-0"
                  style={{ color: brandKit.brandColor || '#4F46E5' }}
                >
                  {`0${idx + 1}.`}
                </span>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{agreement.title}</h4>
                  <p className="text-[11px] text-slate-600 leading-normal mt-0.5">
                    {agreement.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. First 72 Hours Checklist */}
        <section className="py-2">
          <div className="flex items-center space-x-2 mb-2">
            <div
              className="w-1 h-3 rounded-full"
              style={{ backgroundColor: brandKit.brandColor || '#4F46E5' }}
            />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              {t.firstStepsHeader}
            </h3>
          </div>
          <div className="space-y-1.5">
            {checklist.map((step, idx) => (
              <div
                key={idx}
                className="flex items-center space-x-2.5 min-h-[22px] border-b border-slate-100 pb-1"
              >
                <div className="w-[15px] h-[15px] rounded border border-slate-400 bg-white shrink-0" />
                <span className="text-xs text-slate-800 font-medium flex-1 leading-snug">
                  {step}
                </span>
              </div>
            ))}
          </div>
        </section>
      </section>

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
