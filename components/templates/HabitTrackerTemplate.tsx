'use client';

import React, { useState, useEffect } from 'react';
import { BrandKit, DocumentLang, HabitItem, HabitTrackerCustomContent } from '@/types';
import { DOCUMENT_TRANSLATIONS } from '@/lib/i18n/documents';
import { generateQRCodeDataURL } from '@/lib/qr-engine';
import { getDefaultHabitTrackerContent } from '@/lib/use-brand-kit';
import { TemplateFrame } from './TemplateFrame';

interface HabitTrackerTemplateProps {
  brandKit: BrandKit;
  onUpdate?: (updates: Partial<BrandKit>) => void;
}

export const HabitTrackerTemplate: React.FC<HabitTrackerTemplateProps> = ({
  brandKit,
  onUpdate,
}) => {
  const docLang = brandKit.documentLang || 'en';
  const t = (DOCUMENT_TRANSLATIONS[docLang] || DOCUMENT_TRANSLATIONS.en).habitTracker;
  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  const [userQrDataUrl, setUserQrDataUrl] = useState<string>('');
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
    return () => {
      isMounted = false;
    };
  }, [brandKit.qrUrl]);

  const habits: HabitItem[] = habitContent.habits && habitContent.habits.length > 0
    ? habitContent.habits
    : [
        { id: '1', title: 'Hydratation & Vitalité', subtitle: 'Boire 1,5L à 2L d’eau' },
        { id: '2', title: 'Marche quotidienne', subtitle: '20 à 30 min de marche' },
        { id: '3', title: 'Pause calme & respiration', subtitle: '5 à 10 min de méditation' },
        { id: '4', title: 'Déconnexion du soir', subtitle: 'Éteindre les écrans avant de dormir' },
        { id: '5', title: 'Gratitude du jour', subtitle: 'Noter un moment positif' },
      ];

  // User contact QR renders ONLY if user entered their own link
  const hasUserQR = Boolean(
    brandKit.qrUrl &&
    brandKit.qrUrl.trim().length > 0 &&
    brandKit.qrUrl !== 'https://logoloom.app' &&
    userQrDataUrl
  );

  const isA4 = brandKit.paperSize === 'a4';

  const defaultQrLabel = docLang === 'fr' ? 'Scannez pour réserver' : 'Scan to book a session';
  const qrDisplayLabel = brandKit.qrLabel || defaultQrLabel;

  return (
    <TemplateFrame
      brandKit={brandKit}
      orientation="landscape"
      subtitleRight={t.headerSubtitleRight}
    >
      <div className="flex flex-col h-full justify-between space-y-2.5">
        {/* Document Hero */}
        <div className="flex items-start justify-between border-b border-slate-200/80 pb-2">
          <div className="max-w-xl">
            <div className="flex items-center space-x-1.5 mb-0.5">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: brandKit.brandColor }}
              />
              <span className="text-[10px] font-bold tracking-wider uppercase text-slate-500 font-sans">
                {t.headerCategory}
              </span>
            </div>

            {/* Editable Title */}
            {editingField === 'title' && onUpdate ? (
              <input
                type="text"
                autoFocus
                maxLength={45}
                value={habitContent.title}
                onChange={(e) => updateHabitContent({ title: e.target.value })}
                onBlur={() => setEditingField(null)}
                onKeyDown={(e) => e.key === 'Enter' && setEditingField(null)}
                className="text-xl font-serif font-bold text-slate-900 tracking-tight leading-tight w-full bg-indigo-50/50 border border-indigo-400 rounded px-1.5 py-0.5 outline-none"
              />
            ) : (
              <h1
                onClick={() => onUpdate && setEditingField('title')}
                title={onUpdate ? 'Cliquez pour modifier le titre' : undefined}
                className={`text-xl font-serif font-bold text-slate-900 tracking-tight leading-tight ${
                  onUpdate ? 'cursor-pointer hover:bg-slate-100/70 rounded px-1 -mx-1 transition-colors' : ''
                }`}
              >
                {habitContent.title || t.title}
              </h1>
            )}

            {/* Editable Subtitle */}
            {editingField === 'subtitle' && onUpdate ? (
              <input
                type="text"
                autoFocus
                maxLength={90}
                value={habitContent.subtitle}
                onChange={(e) => updateHabitContent({ subtitle: e.target.value })}
                onBlur={() => setEditingField(null)}
                onKeyDown={(e) => e.key === 'Enter' && setEditingField(null)}
                className="text-[11px] text-slate-600 mt-0.5 leading-snug w-full bg-indigo-50/50 border border-indigo-400 rounded px-1.5 py-0.5 outline-none"
              />
            ) : (
              <p
                onClick={() => onUpdate && setEditingField('subtitle')}
                title={onUpdate ? 'Cliquez pour modifier le sous-titre' : undefined}
                className={`text-[11px] text-slate-600 mt-0.5 leading-snug ${
                  onUpdate ? 'cursor-pointer hover:bg-slate-100/70 rounded px-1 -mx-1 transition-colors' : ''
                }`}
              >
                {habitContent.subtitle || t.subtitle}
              </p>
            )}
          </div>

          {/* Client & Period Handwriting Metadata Block */}
          <div className="w-[280px] bg-slate-50/90 rounded border border-slate-200/90 p-2.5 flex flex-col space-y-1.5 text-[10px] shrink-0">
            <div className="flex items-center">
              <span className="font-bold text-slate-600 w-20 shrink-0">{t.clientPrompt}</span>
              <span className={`flex-1 truncate ${brandKit.clientName ? 'text-slate-900 font-medium' : 'text-slate-400'}`}>
                {brandKit.clientName || '__________________________'}
              </span>
            </div>
            <div className="flex items-center">
              <span className="font-bold text-slate-600 w-20 shrink-0">{t.periodPrompt}</span>
              <span className="text-slate-700 font-medium flex-1">{t.periodPlaceholder}</span>
            </div>
            <div className="flex items-center">
              <span className="font-bold text-slate-600 w-20 shrink-0">{t.goalPrompt}</span>
              <span className="text-slate-400 text-[9.5px] italic truncate flex-1">{t.goalPlaceholder}</span>
            </div>
          </div>
        </div>

        {/* 30-Day Grid Table (Generous Landscape Dimensions, Zero Truncation) */}
        <div className="bg-white rounded border border-slate-300 overflow-hidden shadow-xs flex flex-col justify-between">
          <table className="w-full border-collapse table-fixed">
            <thead>
              <tr className="bg-slate-100/90 border-b border-slate-300 text-[10px]">
                <th className={`py-1.5 px-3 font-bold text-slate-800 ${isA4 ? 'w-[210px]' : 'w-[195px]'} uppercase tracking-wider text-left`}>
                  {t.habitsHeader}
                </th>
                {days.map((day) => {
                  const isMilestone = [7, 14, 21, 30].includes(day);
                  return (
                    <th
                      key={day}
                      className={`text-center py-1 text-[9.5px] font-bold border-l border-slate-200 ${
                        isMilestone ? 'text-white font-extrabold' : 'text-slate-600'
                      }`}
                      style={{
                        backgroundColor: isMilestone ? brandKit.brandColor : undefined,
                        borderColor: isMilestone ? brandKit.brandColor : undefined,
                      }}
                    >
                      {day}
                    </th>
                  );
                })}
                {habitContent.showScoreColumn && (
                  <th className="w-[52px] text-center py-1 text-[9.5px] font-bold text-slate-800 border-l border-slate-300 uppercase tracking-wider">
                    {t.scoreHeader}
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {habits.slice(0, 8).map((habit, idx) => (
                <tr key={habit.id || idx} className="hover:bg-slate-50/50">
                  <td className="py-1.5 px-2.5 border-r border-slate-300">
                    <div className="flex items-center space-x-2">
                      <span
                        className="w-4 h-4 rounded text-[9px] font-bold flex items-center justify-center shrink-0"
                        style={{
                          backgroundColor: `${brandKit.brandColor}18`,
                          color: brandKit.brandColor,
                        }}
                      >
                        {idx + 1}
                      </span>
                      <div className="min-w-0 pr-1 flex-1">
                        <p className="text-[10.5px] font-bold text-slate-900 leading-tight">
                          {habit.title}
                        </p>
                        <p className="text-[9px] text-slate-500 leading-tight mt-0.5 truncate">
                          {habit.subtitle}
                        </p>
                      </div>
                    </div>
                  </td>
                  {days.map((day) => {
                    const isMilestone = [7, 14, 21, 30].includes(day);
                    return (
                      <td
                        key={day}
                        className={`text-center p-0.5 border-l border-slate-200 ${
                          isMilestone ? 'bg-slate-50/80' : ''
                        }`}
                      >
                        <div
                          className="w-[16px] h-[16px] mx-auto rounded-xs border border-slate-400 bg-white"
                          style={{
                            borderColor: isMilestone ? brandKit.brandColor : '#94A3B8',
                          }}
                        />
                      </td>
                    );
                  })}
                  {habitContent.showScoreColumn && (
                    <td className="text-center py-1 border-l border-slate-300 bg-slate-50/50 text-[9.5px] text-slate-400 font-medium">
                      ___ / 30
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Milestones Bar */}
          <div className="bg-slate-50 border-t border-slate-300 px-3 py-1 flex items-center justify-between text-[9.5px] text-slate-600 font-medium">
            <span className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: brandKit.brandColor }} />
              <span>{t.milestones.day7}</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: brandKit.brandColor }} />
              <span>{t.milestones.day14}</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: brandKit.brandColor }} />
              <span>{t.milestones.day21}</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: brandKit.brandColor }} />
              <span className="font-bold text-slate-800">{t.milestones.day30}</span>
            </span>
          </div>
        </div>

        {/* Weekly Reflection Cards (Generous Physical Handwriting Space) */}
        {habitContent.showWeeklyCheckins && (
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              {t.weeklyReflectionTitle}
            </h3>
            <div className="grid grid-cols-4 gap-2.5">
              {habitContent.weeklyQuestions.map((prompt, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded border border-slate-300 p-2.5 flex flex-col justify-between min-h-[96px]"
                >
                  <div>
                    <div className="flex items-center space-x-1.5 mb-1">
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: brandKit.brandColor }}
                      />
                      <span className="text-[10px] font-bold text-slate-900 tracking-tight">
                        {t.weekNames?.[idx] || (docLang === 'fr' ? `Semaine ${idx + 1}` : `Week ${idx + 1}`)}
                      </span>
                    </div>
                    <p className="text-[9.5px] text-slate-600 leading-snug">
                      {prompt}
                    </p>
                  </div>
                  {/* 3 Physical Handwriting Lines spaced 7mm (20pt) apart */}
                  <div className="space-y-4 mt-3 pt-1">
                    <div className="border-b border-dashed border-slate-300 w-full" />
                    <div className="border-b border-dashed border-slate-300 w-full" />
                    <div className="border-b border-dashed border-slate-300 w-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Section: Coach Advice + Optional User QR Code */}
        <div className="flex items-stretch space-x-3">
          {habitContent.showCoachNote && (
            <div
              className="flex-1 rounded border p-2.5 flex items-center space-x-3"
              style={{
                backgroundColor: `${brandKit.brandColor}08`,
                borderColor: `${brandKit.brandColor}30`,
              }}
            >
              <div
                className="w-7 h-7 rounded flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: brandKit.brandColor,
                  color: brandKit.contrastText,
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10.5px] font-bold text-slate-900 leading-tight">
                  {t.coachNoteTitle}
                </p>
                <p className="text-[9.5px] text-slate-600 italic leading-snug mt-0.5">
                  &ldquo;{habitContent.coachNote || t.coachNoteDefault}&rdquo;
                </p>
                <p className="text-[9px] text-slate-500 font-medium mt-1">
                  {t.coachPrompt}{' '}
                  {brandKit.coachName ? (
                    <span className="text-slate-800 font-semibold">{brandKit.coachName}</span>
                  ) : (
                    <span className="text-slate-400 italic">
                      {docLang === 'fr' ? 'Votre Référent' : 'Your Practitioner'}
                    </span>
                  )}
                  {brandKit.companyName ? ` — ${brandKit.companyName}` : ''}
                </p>
              </div>
            </div>
          )}

          {/* User Contact QR Action Card (>= 18 mm) - ONLY rendered when user provided link */}
          {hasUserQR && (
            <div className="w-[200px] bg-slate-50/90 rounded border border-slate-300 p-2 flex items-center space-x-2.5 shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={userQrDataUrl}
                alt="Contact QR"
                className="w-12 h-12 rounded-xs border border-slate-200 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold text-slate-900 leading-tight">
                  {qrDisplayLabel}
                </p>
                <p className="text-[9px] text-slate-500 font-mono truncate mt-0.5">
                  {brandKit.qrUrl.replace(/^https?:\/\//, '')}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </TemplateFrame>
  );
};
