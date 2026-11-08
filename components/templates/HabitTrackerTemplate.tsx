'use client';

import React, { useState, useEffect } from 'react';
import { BrandKit } from '@/types';
import { DOCUMENT_TRANSLATIONS } from '@/lib/i18n/documents';
import { generateQRCodeDataURL } from '@/lib/qr-engine';
import { TemplateFrame } from './TemplateFrame';

interface HabitTrackerTemplateProps {
  brandKit: BrandKit;
}

export const HabitTrackerTemplate: React.FC<HabitTrackerTemplateProps> = ({ brandKit }) => {
  const docLang = brandKit.documentLang || 'en';
  const t = (DOCUMENT_TRANSLATIONS[docLang] || DOCUMENT_TRANSLATIONS.en).habitTracker;
  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  const [userQrDataUrl, setUserQrDataUrl] = useState<string>('');

  useEffect(() => {
    let isMounted = true;
    if (brandKit.qrUrl && brandKit.qrUrl.trim().length > 0) {
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

  const habits = t.habitsList && t.habitsList.length >= 4 ? t.habitsList : [
    { title: t.categories.movement, subtitle: '2L water & daily physical vitality' },
    { title: t.categories.mindset, subtitle: '90 min deep work without distraction' },
    { title: t.categories.nutrition, subtitle: 'Balanced nutrition & restorative sleep' },
    { title: t.categories.productivity, subtitle: 'Evening reflection & next day priorities' },
    { title: 'Personalized Excellence Ritual', subtitle: 'Priority habit agreed with your coach' },
  ];

  const hasUserQR = Boolean(brandKit.qrUrl && brandKit.qrUrl.trim().length > 0 && userQrDataUrl);

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
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: brandKit.brandColor }}
              />
              <span className="text-[10px] font-bold tracking-wider uppercase text-slate-500 font-sans">
                {t.headerCategory}
              </span>
            </div>
            <h1 className="text-xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
              {t.title}
            </h1>
            <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
              {t.subtitle}
            </p>
          </div>

          {/* Client & Period Handwriting Metadata Block */}
          <div className="w-[310px] bg-slate-50/90 rounded border border-slate-200/90 p-2.5 flex flex-col space-y-1.5 text-[10px]">
            <div className="flex items-center">
              <span className="font-bold text-slate-600 w-24 shrink-0">{t.clientPrompt}</span>
              <span className="text-slate-900 font-medium truncate flex-1">
                {brandKit.clientName || '________________________________'}
              </span>
            </div>
            <div className="flex items-center">
              <span className="font-bold text-slate-600 w-24 shrink-0">{t.periodPrompt}</span>
              <span className="text-slate-800 font-medium flex-1">{t.periodPlaceholder}</span>
            </div>
            <div className="flex items-center">
              <span className="font-bold text-slate-600 w-24 shrink-0">{t.goalPrompt}</span>
              <span className="text-slate-500 text-[9.5px] italic truncate flex-1">{t.goalPlaceholder}</span>
            </div>
          </div>
        </div>

        {/* 30-Day Grid Table (Generous Landscape Dimensions) */}
        <div className="bg-white rounded border border-slate-300 overflow-hidden shadow-xs flex flex-col justify-between">
          <table className="w-full border-collapse table-fixed">
            <thead>
              <tr className="bg-slate-100/90 border-b border-slate-300 text-[10px]">
                <th className="py-1.5 px-3 font-bold text-slate-800 w-[240px] uppercase tracking-wider text-left">
                  {t.habitsHeader}
                </th>
                {days.map((day) => {
                  const isMilestone = [7, 14, 21, 30].includes(day);
                  return (
                    <th
                      key={day}
                      className={`text-center py-1.5 text-[9.5px] font-bold border-l border-slate-200 ${
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
                <th className="w-[62px] text-center py-1.5 text-[9.5px] font-bold text-slate-800 border-l border-slate-300 uppercase tracking-wider">
                  {t.scoreHeader}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {habits.slice(0, 5).map((habit, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50">
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
                      <div className="min-w-0 pr-1">
                        <p className="text-[11px] font-bold text-slate-900 leading-tight">
                          {habit.title}
                        </p>
                        <p className="text-[9.5px] text-slate-500 leading-tight mt-0.5">
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
                  <td className="text-center py-1 border-l border-slate-300 bg-slate-50/50 text-[10px] text-slate-400 font-medium">
                    ___ / 30
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Milestones Bar */}
          <div className="bg-slate-50 border-t border-slate-300 px-3 py-1 flex items-center justify-between text-[10px] text-slate-600 font-medium">
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

        {/* Weekly Reflection Cards (Real Handwriting Space) */}
        <div>
          <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
            {t.weeklyReflectionTitle}
          </h3>
          <div className="grid grid-cols-4 gap-2.5">
            {t.reflectionPrompts.map((prompt, idx) => (
              <div
                key={idx}
                className="bg-white rounded border border-slate-300 p-2.5 flex flex-col justify-between min-h-[92px]"
              >
                <div>
                  <div className="flex items-center space-x-1.5 mb-1">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: brandKit.brandColor }}
                    />
                    <span className="text-[10px] font-bold text-slate-900 tracking-tight">
                      {t.weekNames?.[idx] || `SEMAINE 0${idx + 1}`}
                    </span>
                  </div>
                  <p className="text-[9.5px] text-slate-600 leading-snug">
                    {prompt}
                  </p>
                </div>
                {/* 3 Physical Handwriting Lines */}
                <div className="space-y-2 mt-2 pt-1">
                  <div className="border-b border-dashed border-slate-300 w-full" />
                  <div className="border-b border-dashed border-slate-300 w-full" />
                  <div className="border-b border-dashed border-slate-300 w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section: Coach Advice + 18mm User QR Code */}
        <div className="flex items-stretch space-x-3">
          <div
            className="flex-1 rounded border p-2.5 flex items-center space-x-3"
            style={{
              backgroundColor: `${brandKit.brandColor}08`,
              borderColor: `${brandKit.brandColor}30`,
            }}
          >
            <div
              className="w-8 h-8 rounded flex items-center justify-center font-bold text-sm shrink-0"
              style={{
                backgroundColor: brandKit.brandColor,
                color: brandKit.contrastText,
              }}
            >
              ✦
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10.5px] font-bold text-slate-900">
                {t.coachNoteTitle}
              </p>
              <p className="text-[10px] text-slate-600 italic leading-snug mt-0.5">
                &ldquo;{t.coachNoteDefault}&rdquo;
              </p>
              <p className="text-[9.5px] text-slate-500 mt-1 font-medium">
                {t.coachPrompt} {brandKit.coachName || 'Alexandre Martin'} — {brandKit.companyName || 'LogoLoom Studio'}
              </p>
            </div>
          </div>

          {/* User QR Code Card (18 mm physical print size) */}
          {hasUserQR ? (
            <div className="w-[240px] bg-slate-50 rounded border border-slate-300 p-2 flex items-center space-x-2.5 shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={userQrDataUrl}
                alt="Booking QR Code"
                className="w-14 h-14 rounded border border-slate-200 bg-white p-0.5 shrink-0"
              />
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-bold text-slate-900 leading-tight">
                  {t.scanToBookTitle}
                </span>
                <span className="text-[9px] text-slate-500 truncate mt-1">
                  {brandKit.qrUrl?.replace(/^https?:\/\//, '')}
                </span>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </TemplateFrame>
  );
};
