'use client';

import React, { useState, useEffect } from 'react';
import { BrandKit, DocumentLang, HabitItem, HabitTrackerCustomContent } from '@/types';
import { DOCUMENT_TRANSLATIONS } from '@/lib/i18n/documents';
import { HABIT_PACKS } from '@/lib/i18n/habit-packs';
import { MINIMAL_HABIT_LABELS } from '@/lib/i18n/minimal-labels';
import { generateQRCodeDataURL } from '@/lib/qr-engine';
import { getDefaultHabitTrackerContent } from '@/lib/use-brand-kit';

interface MinimalHabitTrackerTemplateProps {
  brandKit: BrandKit;
  onUpdate?: (updates: Partial<BrandKit>) => void;
}

export const MinimalHabitTrackerTemplate: React.FC<MinimalHabitTrackerTemplateProps> = ({
  brandKit,
  onUpdate,
}) => {
  const docLang: DocumentLang = brandKit.documentLang || 'en';
  const t = (DOCUMENT_TRANSLATIONS[docLang] || DOCUMENT_TRANSLATIONS.en).habitTracker;
  const l = MINIMAL_HABIT_LABELS[docLang] || MINIMAL_HABIT_LABELS.en;

  const [userQrDataUrl, setUserQrDataUrl] = useState<string>('');
  const [loomQrDataUrl, setLoomQrDataUrl] = useState<string>('');
  const [editingField, setEditingField] = useState<string | null>(null);

  const habitContent: HabitTrackerCustomContent =
    brandKit.habitTrackerContent || getDefaultHabitTrackerContent(docLang, 'wellbeing');

  const updateHabitContent = (updates: Partial<HabitTrackerCustomContent>) => {
    if (!onUpdate) return;
    onUpdate({
      habitTrackerContent: { ...habitContent, ...updates },
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

  const defaultHabitsForLang = (HABIT_PACKS[docLang]?.wellbeing?.habits || HABIT_PACKS.en.wellbeing.habits).map((h, i) => ({
    id: `habit-${i + 1}`,
    title: h.title,
    subtitle: h.subtitle,
  }));

  const habits: HabitItem[] = habitContent.habits && habitContent.habits.length > 0
    ? habitContent.habits.slice(0, 7) // 3 to 7 habits in minimal style
    : defaultHabitsForLang.slice(0, 5);

  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  const isA4 = brandKit.paperSize === 'a4';
  const frameWidth = isA4 ? '794px' : '816px';
  const frameHeight = isA4 ? '1123px' : '1056px';

  const defaultQrLabel = l.defaultQr;
  const qrDisplayLabel = brandKit.qrLabel || defaultQrLabel;

  const hasUserQR = Boolean(brandKit.qrUrl && brandKit.qrUrl.trim().length > 0 && userQrDataUrl);

  const showNotes = Boolean(habitContent.showNotesColumn);
  const showScore = Boolean(habitContent.showScoreRow);

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

          {/* Title & Handwriting Lines */}
          <div className="mt-3.5 flex items-end justify-between">
            <div className="flex-1 pr-4">
              {editingField === 'title' && onUpdate ? (
                <input
                  type="text"
                  autoFocus
                  maxLength={45}
                  value={habitContent.title}
                  onChange={(e) => updateHabitContent({ title: e.target.value })}
                  onBlur={() => setEditingField(null)}
                  onKeyDown={(e) => e.key === 'Enter' && setEditingField(null)}
                  className="text-2xl font-bold text-slate-900 tracking-tight leading-tight w-full bg-indigo-50/50 border border-indigo-400 rounded px-1.5 py-0.5 outline-none"
                />
              ) : (
                <div
                  role="heading"
                  aria-level={2}
                  onClick={() => onUpdate && setEditingField('title')}
                  title={onUpdate ? 'Cliquez pour modifier le titre' : undefined}
                  className={`text-2xl font-bold tracking-tight text-slate-900 ${
                    onUpdate ? 'cursor-pointer hover:bg-slate-100/70 rounded px-1 -mx-1 transition-colors' : ''
                  }`}
                  style={{ color: brandKit.brandColor }}
                >
                  {habitContent.title || l.defaultTitle}
                </div>
              )}
            </div>

            {/* Handwriting Blank Lines: Name and Start Date */}
            <div className="flex items-center space-x-4 text-[10.5px] text-slate-600 shrink-0">
              <div className="flex items-center space-x-1.5">
                <span className="font-semibold text-slate-700">{l.name}</span>
                <span className={`min-w-[130px] border-b border-slate-400 pb-0.5 ${brandKit.clientName ? 'font-medium text-slate-900' : 'text-slate-400'}`}>
                  {brandKit.clientName || '____________________'}
                </span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="font-semibold text-slate-700">{l.date}</span>
                <span className="min-w-[90px] border-b border-slate-400 pb-0.5 text-slate-400">
                  ____ / ____ / 20___
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Minimal Grid: Days 1 to 30 as ROWS, Habits as COLUMNS */}
        <main className="flex-1 my-2 flex flex-col justify-start">
          <table className="w-full border-collapse table-fixed">
            <thead>
              <tr className="border-b border-slate-300 text-slate-800 text-[10px]">
                {/* Left Day column header */}
                <th className="w-[48px] py-1 text-left font-bold uppercase tracking-wider text-slate-500 pl-1">
                  {l.day}
                </th>

                {/* Habit columns headers (wrap cleanly to two lines, never truncated) */}
                {habits.map((habit, idx) => (
                  <th
                    key={habit.id || idx}
                    className="py-1 px-1.5 text-center font-bold text-slate-800 border-l border-slate-200"
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] font-bold leading-tight text-slate-900 line-clamp-2">
                        {habit.title}
                      </span>
                      {habit.subtitle && (
                        <span className="text-[8.5px] text-slate-500 font-normal leading-tight mt-0.5 line-clamp-1">
                          {habit.subtitle}
                        </span>
                      )}
                    </div>
                  </th>
                ))}

                {/* Optional Notes column */}
                {showNotes && (
                  <th className="w-[85px] py-1 text-center font-bold text-slate-600 border-l border-slate-200 uppercase tracking-wider text-[9.5px]">
                    {l.notes}
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {days.map((day) => {
                const isMilestone = [7, 14, 21, 30].includes(day);
                return (
                  <tr
                    key={day}
                    className={`border-b transition-colors ${
                      isMilestone
                        ? 'border-slate-400 font-bold'
                        : 'border-slate-200'
                    }`}
                    style={{
                      backgroundColor: isMilestone ? `${brandKit.brandColor}0A` : undefined,
                      height: isA4 ? '20px' : '18.5px',
                    }}
                  >
                    {/* Day number cell */}
                    <td
                      className={`pl-1 text-left text-[9.5px] ${
                        isMilestone ? 'font-extrabold' : 'font-medium text-slate-600'
                      }`}
                      style={{
                        color: isMilestone ? brandKit.brandColor : undefined,
                      }}
                    >
                      {String(day).padStart(2, '0')}
                    </td>

                    {/* Habit checkboxes */}
                    {habits.map((habit, hIdx) => (
                      <td
                        key={hIdx}
                        className="text-center p-0 border-l border-slate-200"
                      >
                        <div
                          className="w-[14px] h-[14px] mx-auto rounded-xs border bg-white"
                          style={{
                            borderColor: isMilestone ? brandKit.brandColor : '#94A3B8',
                            borderWidth: isMilestone ? '1px' : '0.75px',
                          }}
                        />
                      </td>
                    ))}

                    {/* Optional Notes cell */}
                    {showNotes && (
                      <td className="border-l border-slate-200 px-1 py-0.5 text-[8.5px] text-slate-400">
                        <div className="border-b border-dotted border-slate-300 w-full h-3" />
                      </td>
                    )}
                  </tr>
                );
              })}

              {/* Optional Score Row */}
              {showScore && (
                <tr className="border-t-2 border-slate-400 bg-slate-50/80 font-bold text-[9.5px]">
                  <td className="pl-1 py-1 text-slate-800 uppercase tracking-wider">
                    {l.score}
                  </td>
                  {habits.map((_, hIdx) => (
                    <td key={hIdx} className="text-center py-1 border-l border-slate-200 text-slate-500">
                      ___ / 30
                    </td>
                  ))}
                  {showNotes && <td className="border-l border-slate-200" />}
                </tr>
              )}
            </tbody>
          </table>
        </main>

        {/* Minimal Footer: Hairline + Discreet LogoLoom Badge (Free) or Clean (Pro) */}
        <footer className="pt-2 border-t border-slate-200 flex items-center justify-between text-[9.5px] text-slate-500">
          <div className="flex items-center space-x-2">
            {brandKit.companyName && (
              <>
                <span className="font-semibold text-slate-700">{brandKit.companyName}</span>
                <span>•</span>
              </>
            )}
            <span>{l.footerPage}</span>
          </div>

          <div>
            {brandKit.removeWatermark ? (
              <span className="text-[9px] text-slate-400 font-medium tracking-wider uppercase">
                {l.verified}
              </span>
            ) : (
              <div className="flex items-center space-x-1.5 opacity-80">
                {loomQrDataUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={loomQrDataUrl}
                    alt="LogoLoom QR"
                    className="w-5 h-5 rounded-xs border border-slate-200"
                  />
                )}
                <span className="text-[8.5px] text-slate-500">
                  {l.madeWith}{' '}
                  <span className="font-semibold text-indigo-600">logoloom.app</span>
                </span>
              </div>
            )}
          </div>
        </footer>
      </div>
    </div>
  );
};
