'use client';

import React, { useEffect, useState } from 'react';
import { BrandKit } from '@/types';
import { DOCUMENT_TRANSLATIONS } from '@/lib/i18n/documents';
import { generateQRCodeDataURL } from '@/lib/qr-engine';

interface TemplateFrameProps {
  brandKit: BrandKit;
  children: React.ReactNode;
  subtitleRight?: string;
  orientation?: 'portrait' | 'landscape';
}

export const TemplateFrame: React.FC<TemplateFrameProps> = ({
  brandKit,
  children,
  subtitleRight,
  orientation = 'portrait',
}) => {
  const [customQrDataUrl, setCustomQrDataUrl] = useState<string>('');
  const [logoLoomQrDataUrl, setLogoLoomQrDataUrl] = useState<string>('');

  const docLang = brandKit.documentLang || 'en';
  const docText = DOCUMENT_TRANSLATIONS[docLang] || DOCUMENT_TRANSLATIONS.en;

  // Generate QR codes
  useEffect(() => {
    let isMounted = true;
    const fetchQRs = async () => {
      // User's custom QR: only if user provided a link and not default
      let userQr = '';
      if (brandKit.qrUrl && brandKit.qrUrl.trim() !== '' && brandKit.qrUrl !== 'https://logoloom.app') {
        userQr = await generateQRCodeDataURL(brandKit.qrUrl, {
          width: 160,
          margin: 2,
          color: { dark: '#0F172A', light: '#FFFFFF' },
        });
      }
      // LogoLoom discreet free tier QR (at least 12 mm print equivalent)
      const loomQr = await generateQRCodeDataURL('https://logoloom.app', {
        width: 120,
        margin: 2,
        color: { dark: '#475569', light: '#FFFFFF' },
      });

      if (isMounted) {
        setCustomQrDataUrl(userQr);
        setLogoLoomQrDataUrl(loomQr);
      }
    };

    fetchQRs();
    return () => {
      isMounted = false;
    };
  }, [brandKit.qrUrl]);

  const isA4 = brandKit.paperSize === 'a4';
  const isLandscape = orientation === 'landscape';
  const frameWidth = isLandscape ? (isA4 ? '1123px' : '1056px') : (isA4 ? '794px' : '816px');
  const frameHeight = isLandscape ? (isA4 ? '794px' : '816px') : (isA4 ? '1123px' : '1056px');
  const framePadding = isLandscape ? '24px 38px' : '36px 44px';

  return (
    <div
      id="logoloom-pdf-target"
      className="bg-white text-slate-900 mx-auto select-none overflow-hidden flex flex-col justify-between font-sans shadow-2xl relative"
      style={{
        width: frameWidth,
        minHeight: frameHeight,
        height: frameHeight,
        padding: framePadding,
        boxSizing: 'border-box',
      }}
    >
      {/* Top Accent Gradient Bar */}
      <div
        className="absolute top-0 left-0 right-0 h-1.5"
        style={{ backgroundColor: brandKit.brandColor }}
      />

      {/* Header Section */}
      <header className="flex items-center justify-between pb-3 border-b border-slate-200/80">
        <div className="flex items-center space-x-3.5">
          {brandKit.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={brandKit.logoUrl}
              alt="Brand Logo"
              className="h-10 w-auto max-w-[150px] object-contain"
            />
          ) : (
            <div className="flex flex-col">
              <span className="font-serif font-bold text-lg text-slate-900 tracking-tight leading-tight">
                {brandKit.companyName || 'Apex Studio & Coaching'}
              </span>
              {brandKit.tagline && (
                <span className="text-[11px] text-slate-500 font-sans mt-0.5">{brandKit.tagline}</span>
              )}
            </div>
          )}

          {brandKit.logoUrl && (
            <div>
              <h2 className="text-sm font-bold tracking-tight text-slate-900 leading-tight">
                {brandKit.companyName || 'Apex Studio & Coaching'}
              </h2>
              {brandKit.tagline && (
                <p className="text-[11px] text-slate-500 font-medium">{brandKit.tagline}</p>
              )}
            </div>
          )}
        </div>

        {/* Header Right Details */}
        <div className="text-right">
          {brandKit.clientName && (
            <div className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700 mb-0.5">
              {brandKit.clientName}
            </div>
          )}
          {subtitleRight && (
            <p className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">{subtitleRight}</p>
          )}
        </div>
      </header>

      {/* Main Dynamic Content */}
      <main className="flex-1 py-2 flex flex-col justify-start overflow-hidden">
        {children}
      </main>

      {/* Elegant Print-Ready Footer */}
      <footer className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[10px] text-slate-500">
        {/* Left: Metadata */}
        <div className="flex flex-col space-y-0.5">
          <span className="font-semibold text-slate-700 tracking-wide text-[10px]">
            {brandKit.companyName || 'LogoLoom Document'}
          </span>
          <span className="text-slate-400 text-[9px]">
            {docText.footer.confidential} • {docText.footer.page}
          </span>
        </div>

        {/* Right: Free vs Pro Watermark */}
        <div>
          {brandKit.removeWatermark ? (
            <span className="text-[9px] text-slate-400 tracking-wider uppercase font-medium">
              Verified Client Document
            </span>
          ) : (
            <div className="flex items-center space-x-1.5 opacity-85 hover:opacity-100 transition-opacity">
              {logoLoomQrDataUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={logoLoomQrDataUrl}
                  alt="LogoLoom QR"
                  className="w-6 h-6 rounded-xs border border-slate-200"
                />
              )}
              <div className="flex flex-col text-right">
                <span className="text-[8.5px] font-medium text-slate-500">
                  {docText.footer.madeWith}
                </span>
                <span className="text-[7.5px] text-indigo-600 font-semibold">
                  logoloom.app
                </span>
              </div>
            </div>
          )}
        </div>
      </footer>
    </div>
  );
};
