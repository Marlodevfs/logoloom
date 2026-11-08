'use client';

import React from 'react';
import { BrandKit } from '@/types';
import { DOCUMENT_TRANSLATIONS } from '@/lib/i18n/documents';
import { TemplateFrame } from './TemplateFrame';

interface HabitTrackerTemplateProps {
  brandKit: BrandKit;
}

export const HabitTrackerTemplate: React.FC<HabitTrackerTemplateProps> = ({ brandKit }) => {
  const docLang = brandKit.documentLang || 'en';
  const t = (DOCUMENT_TRANSLATIONS[docLang] || DOCUMENT_TRANSLATIONS.en).habitTracker;

  // Days 1 through 30
  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  // 4 Default Categories tailored for coaches & consultants
  const defaultHabits = [
    { id: '1', title: t.categories.movement, subtitle: 'Morning mobility, workout or 8,000 steps' },
    { id: '2', title: t.categories.mindset, subtitle: '90-min uninterrupted deep strategic focus' },
    { id: '3', title: t.categories.nutrition, subtitle: 'Hydration goal (2.5L) & whole food nutrition' },
    { id: '4', title: t.categories.productivity, subtitle: 'Evening reflection, wins & shutdown ritual' },
  ];

  return (
    <TemplateFrame
      brandKit={brandKit}
      subtitleRight="HABIT MATRIX • 30-DAY SPRINT"
    >
      <div className="flex flex-col h-full justify-between space-y-4">
        {/* Document Hero */}
        <div className="flex items-end justify-between border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center space-x-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: brandKit.brandColor }}
              />
              <span className="text-xs font-semibold tracking-wider uppercase text-slate-500">
                Performance Coaching Protocol
              </span>
            </div>
            <h1 className="text-xl font-extrabold text-slate-900 mt-0.5 tracking-tight">
              {t.title}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5 max-w-xl">
              {t.subtitle}
            </p>
          </div>

          <div className="flex items-center space-x-3 text-xs text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-medium">{t.coachPrompt}</span>
              <span className="font-semibold text-slate-800">{brandKit.coachName || 'Alexandre Martin'}</span>
            </div>
          </div>
        </div>

        {/* 30-Day Grid Table */}
        <div className="flex-1 bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between">
          <table className="w-full h-full border-collapse text-left">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200">
                <th className="py-2.5 px-3 text-[11px] font-bold text-slate-700 w-56 uppercase tracking-wider">
                  Core Habit Focus
                </th>
                {days.map((day) => {
                  const isMilestone = [7, 14, 21, 30].includes(day);
                  return (
                    <th
                      key={day}
                      className={`text-center py-2 text-[10px] font-bold border-l border-slate-200 ${
                        isMilestone
                          ? 'text-white font-extrabold'
                          : 'text-slate-600'
                      }`}
                      style={{
                        backgroundColor: isMilestone ? brandKit.brandColor : undefined,
                      }}
                    >
                      {day}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {defaultHabits.map((habit, idx) => (
                <tr key={habit.id} className="hover:bg-slate-50/40">
                  <td className="py-2.5 px-3 border-r border-slate-200">
                    <div className="flex items-start space-x-2">
                      <span
                        className="w-4 h-4 rounded text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5"
                        style={{
                          backgroundColor: `${brandKit.brandColor}15`,
                          color: brandKit.brandColor,
                        }}
                      >
                        {idx + 1}
                      </span>
                      <div>
                        <p className="text-[11.5px] font-bold text-slate-800 leading-tight">
                          {habit.title}
                        </p>
                        <p className="text-[9.5px] text-slate-400 font-medium">
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
                          isMilestone ? 'bg-indigo-50/30' : ''
                        }`}
                      >
                        <div
                          className={`w-4 h-4 mx-auto rounded-sm border border-slate-300 flex items-center justify-center ${
                            isMilestone ? 'border-dashed border-indigo-400' : ''
                          }`}
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Milestones bar */}
          <div className="bg-slate-50/60 border-t border-slate-200 px-3 py-1.5 flex items-center justify-between text-[9.5px] text-slate-500 font-medium">
            <span className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: brandKit.brandColor }} />
              <span>{t.milestones.day7}</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: brandKit.brandColor }} />
              <span>{t.milestones.day14}</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: brandKit.brandColor }} />
              <span>{t.milestones.day21}</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: brandKit.brandColor }} />
              <span className="font-bold text-slate-700">{t.milestones.day30}</span>
            </span>
          </div>
        </div>

        {/* Weekly Reflection & Accountability Section */}
        <div className="grid grid-cols-4 gap-3">
          {t.reflectionPrompts.map((prompt, idx) => (
            <div
              key={idx}
              className="bg-slate-50/90 rounded-lg p-2.5 border border-slate-200 flex flex-col justify-between h-24"
            >
              <div className="flex items-center space-x-1.5">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: brandKit.brandColor }}
                />
                <span className="text-[10px] font-bold text-slate-800 uppercase tracking-tight">
                  Week {idx + 1} Check-in
                </span>
              </div>
              <p className="text-[9.5px] text-slate-600 font-medium leading-snug">
                {prompt}
              </p>
              <div className="border-b border-dashed border-slate-300 w-full mb-1" />
            </div>
          ))}
        </div>

        {/* Coach Note & Accountability Footer Callout */}
        <div
          className="rounded-lg p-3 flex items-center justify-between border"
          style={{
            backgroundColor: `${brandKit.brandColor}08`,
            borderColor: `${brandKit.brandColor}25`,
          }}
        >
          <div className="flex items-center space-x-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs"
              style={{
                backgroundColor: brandKit.brandColor,
                color: brandKit.contrastText,
              }}
            >
              ★
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-800">
                {t.coachNoteTitle}
              </p>
              <p className="text-[10px] text-slate-500 italic">
                &ldquo;{t.coachNotePlaceholder}&rdquo;
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[9px] text-slate-400 block font-mono">CONFIDENTIAL CLIENT PLAN</span>
            <span className="text-[10px] font-semibold text-slate-700">{brandKit.companyName}</span>
          </div>
        </div>
      </div>
    </TemplateFrame>
  );
};
