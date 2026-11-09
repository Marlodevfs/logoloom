'use client';

import React, { useState, useEffect } from 'react';
import { BrandKit, DocumentLang } from '@/types';
import { MINIMAL_HABIT_LABELS } from '@/lib/i18n/minimal-labels';
import { generateQRCodeDataURL } from '@/lib/qr-engine';

interface MinimalDocFrameProps {
  brandKit: BrandKit;
  title: string;
  onUpdateTitle?: (newTitle: string) => void;
  metadataRight?: React.ReactNode;
  children: React.ReactNode;
  footerCategoryText?: string;
}

export const MinimalDocFrame: React.FC<MinimalDocFrameProps> = ({
  brandKit,
  title,
  onUpdateTitle,
  metadataRight,
  children,
  footerCategoryText,
}) => {
  const docLang: DocumentLang = brandKit.documentLang || 'en';
  const l = MINIMAL_HABIT_LABELS[docLang] || MINIMAL_HABIT_LABELS.en;

  const [userQrDataUrl, setUserQrDataUrl] = useState<string>('');
  const [loomQrDataUrl, setLoomQrDataUrl] = useState<string>('');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleInput, setTitleInput] = useState(title);

  useEffect(() => {
    setTitleInput(title);
  }, [title]);

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

  const hasUserQR = Boolean(brandKit.qrUrl && brandKit.qrUrl.trim().length > 0 && userQrDataUrl);
  const isProMode = Boolean(brandKit.isPro || brandKit.removeWatermark);
  const defaultQrLabel = l.defaultQr;
  const qrDisplayLabel = brandKit.qrLabel || defaultQrLabel;

  const handleTitleSubmit = () => {
    setIsEditingTitle(false);
    if (onUpdateTitle && titleInput.trim()) {
      onUpdateTitle(titleInput.trim());
    }
  };

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
        className="absolute top-0 left-0 right-0 h-1"
        style={{ backgroundColor: brandKit.brandColor }}
      />

      <div className="flex flex-col h-full justify-between">
        {/* Header Section: Logo + Wordmark + Optional Contact QR */}
        <header className="pb-3 border-b border-slate-200">
          <div className="flex items-start justify-between">
            {/* Left: Discreet Logo & Brand Title */}
            <div className="flex items-center space-x-3">
              {brandKit.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={brandKit.logoUrl}
                  alt="Brand Logo"
                  className="h-8 w-auto max-w-[120px] object-contain"
                />
              ) : null}

              <div className="flex flex-col">
                <span
                  className={`text-sm font-bold tracking-tight ${
                    brandKit.companyName ? 'text-slate-900' : 'text-slate-400 italic'
                  }`}
                >
                  {brandKit.companyName || l.companyPlaceholder}
                </span>
                {brandKit.tagline && (
                  <span className="text-[10px] text-slate-500 font-normal mt-0.5">{brandKit.tagline}</span>
                )}
              </div>
            </div>

            {/* Right: Contact QR (Rendered ONLY if user entered link) */}
            {hasUserQR ? (
              <div className="flex items-center space-x-2 pl-3 border-l border-slate-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={userQrDataUrl}
                  alt="Contact QR"
                  className="w-11 h-11 rounded-xs border border-slate-200 shrink-0"
                />
                <div className="flex flex-col text-right max-w-[130px]">
                  <span className="text-[9.5px] font-bold text-slate-900 leading-tight">
                    {qrDisplayLabel}
                  </span>
                  <span className="text-[8.5px] text-slate-500 font-mono truncate mt-0.5">
                    {brandKit.qrUrl.replace(/^https?:\/\//, '')}
                  </span>
                </div>
              </div>
            ) : null}
          </div>

          {/* Title & Metadata row */}
          <div className="mt-3.5 flex items-end justify-between">
            <div className="flex-1 pr-4">
              {isEditingTitle && onUpdateTitle ? (
                <input aria-label="Document title"
                  type="text"
                  autoFocus
                  maxLength={55}
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                  onBlur={handleTitleSubmit}
                  onKeyDown={(e) => e.key === 'Enter' && handleTitleSubmit()}
                  className="text-2xl font-bold tracking-tight leading-tight w-full bg-indigo-50/50 border border-indigo-400 rounded px-1.5 py-0.5 outline-none"
                  style={{ color: brandKit.brandColor }}
                />
              ) : (
                <div
                  role="heading"
                  aria-level={2}
                  onClick={() => onUpdateTitle && setIsEditingTitle(true)}
                  title={onUpdateTitle ? l.clickToEditTitle : undefined}
                  className={`text-2xl font-bold tracking-tight ${
                    onUpdateTitle ? 'cursor-pointer hover:bg-slate-100/70 rounded px-1 -mx-1 transition-colors' : ''
                  }`}
                  style={{ color: brandKit.brandColor }}
                >
                  {title || l.defaultTitle}
                </div>
              )}
            </div>

            {/* Right Metadata / Writing Lines */}
            {metadataRight}
          </div>
        </header>

        {/* Content Body Slot */}
        <main className="flex-1 my-2 flex flex-col justify-start overflow-hidden">
          {children}
        </main>

        {/* Footer: Standardized across catalog */}
        <footer className="pt-2 border-t border-slate-200 flex items-center justify-between text-[8.5px] text-slate-500">
          <div>
            <span>
              {footerCategoryText
                ? `${footerCategoryText} • ${l.footerPage.split('•')[1]?.trim() || 'Page 1 of 1'}`
                : (isProMode ? `${l.verified} • ${l.footerPage.split('•')[1]?.trim() || 'Page 1 of 1'}` : l.footerPage)}
            </span>
          </div>

          {/* Free watermark: Made with logoloom.app + QR */}
          {!isProMode && loomQrDataUrl && (
            <div className="flex items-center space-x-1.5">
              <span>{l.madeWith} <strong className="font-semibold text-slate-700">logoloom.app</strong></span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={loomQrDataUrl}
                alt="LogoLoom"
                className="w-3.5 h-3.5 object-contain"
              />
            </div>
          )}
        </footer>
      </div>
    </div>
  );
};
