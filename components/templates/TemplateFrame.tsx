'use client';

import React, { useEffect, useState } from 'react';
import { BrandKit } from '@/types';
import { DOCUMENT_TRANSLATIONS } from '@/lib/i18n/documents';
import { generateQRCodeDataURL } from '@/lib/qr-engine';

interface TemplateFrameProps {
  brandKit: BrandKit;
  children: React.ReactNode;
  subtitleRight?: string;
}

export const TemplateFrame: React.FC<TemplateFrameProps> = ({
  brandKit,
  children,
  subtitleRight,
}) => {
  const [customQrDataUrl, setCustomQrDataUrl] = useState<string>('');
  const [logoLoomQrDataUrl, setLogoLoomQrDataUrl] = useState<string>('');

  const docLang = brandKit.documentLang || 'en';
  const docText = DOCUMENT_TRANSLATIONS[docLang] || DOCUMENT_TRANSLATIONS.en;

  // Generate QR codes
  useEffect(() => {
    let isMounted = true;
    const fetchQRs = async () => {
      // User's custom QR (or fallback to their brand/booking link)
      const userQr = await generateQRCodeDataURL(brandKit.qrUrl || 'https://logoloom.app', {
        width: 140,
        margin: 1,
        color: { dark: '#0F172A', light: '#FFFFFF' },
      });
      // LogoLoom discreet free tier QR
      const loomQr = await generateQRCodeDataURL('https://logoloom.app', {
        width: 90,
        margin: 1,
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

  return (
    <div
      id="logoloom-pdf-target"
      className="bg-white text-slate-900 mx-auto select-none overflow-hidden flex flex-col justify-between font-sans shadow-2xl relative"
      style={{
        width: isA4 ? '794px' : '816px', // Standard pixel width at 96 DPI (scaled up 3x during print export)
        minHeight: isA4 ? '1123px' : '1056px',
        height: isA4 ? '1123px' : '1056px',
        padding: '36px 44px',
        boxSizing: 'border-box',
      }}
    >
      {/* Top Accent Gradient Bar */}
      <div
        className="absolute top-0 left-0 right-0 h-2"
        style={{ backgroundColor: brandKit.brandColor }}
      />

      {/* Header Section */}
      <header className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center space-x-3.5">
          {brandKit.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={brandKit.logoUrl}
              alt="Brand Logo"
              className="h-12 w-auto max-w-[140px] object-contain rounded-md"
            />
          ) : (
            <div
              className="h-11 w-11 rounded-lg flex items-center justify-center font-bold text-lg shadow-sm"
              style={{
                backgroundColor: brandKit.brandColor,
                color: brandKit.contrastText,
              }}
            >
              {(brandKit.companyName || 'L').charAt(0).toUpperCase()}
            </div>
          )}

          <div>
            <h2 className="text-base font-bold tracking-tight text-slate-900 leading-tight">
              {brandKit.companyName || 'Your Brand Name'}
            </h2>
            {brandKit.tagline && (
              <p className="text-xs text-slate-500 font-medium">{brandKit.tagline}</p>
            )}
          </div>
        </div>

        {/* Header Right Details */}
        <div className="text-right">
          {brandKit.clientName && (
            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 mb-0.5">
              {brandKit.clientName}
            </div>
          )}
          {subtitleRight && (
            <p className="text-[11px] text-slate-400 font-mono tracking-wide">{subtitleRight}</p>
          )}
        </div>
      </header>

      {/* Main Dynamic Content */}
      <main className="flex-1 py-3 flex flex-col justify-start overflow-hidden">
        {children}
      </main>

      {/* Elegant Print-Ready Footer */}
      <footer className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
        {/* Left: Metadata */}
        <div className="flex flex-col space-y-0.5">
          <span className="font-semibold text-slate-700 tracking-wide">
            {brandKit.companyName || 'LogoLoom Document'}
          </span>
          <span className="text-slate-400">
            {docText.footer.confidential} • {docText.footer.page}
          </span>
        </div>

        {/* Center: Client Custom Booking/Portal QR */}
        {brandKit.qrUrl && customQrDataUrl && (
          <div className="flex items-center space-x-2 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={customQrDataUrl}
              alt="Scan QR"
              className="w-8 h-8 rounded border border-white shadow-xs"
            />
            <div className="flex flex-col text-left">
              <span className="font-semibold text-[9px] text-slate-800 leading-tight">
                {docText.footer.scanToBook}
              </span>
              <span className="text-[8px] text-slate-400 truncate max-w-[150px]">
                {brandKit.qrUrl.replace(/^https?:\/\//, '')}
              </span>
            </div>
          </div>
        )}

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
