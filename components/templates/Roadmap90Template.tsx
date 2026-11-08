'use client';

import React from 'react';
import { BrandKit } from '@/types';
import { DOCUMENT_TRANSLATIONS } from '@/lib/i18n/documents';
import { TemplateFrame } from './TemplateFrame';

interface Roadmap90TemplateProps {
  brandKit: BrandKit;
}

export const Roadmap90Template: React.FC<Roadmap90TemplateProps> = ({ brandKit }) => {
  const docLang = brandKit.documentLang || 'en';
  const t = (DOCUMENT_TRANSLATIONS[docLang] || DOCUMENT_TRANSLATIONS.en).roadmap90;

  const phases = [t.phase1, t.phase2, t.phase3];

  return (
    <TemplateFrame
      brandKit={brandKit}
      subtitleRight="STRATEGIC ROADMAP • 90-DAY EXECUTION"
    >
      <div className="flex flex-col h-full justify-between space-y-4">
        {/* Document Header Info */}
        <div className="border-b border-slate-100 pb-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: brandKit.brandColor }}
                />
                <span className="text-xs font-semibold tracking-wider uppercase text-slate-500">
                  Strategic Execution Framework
                </span>
              </div>
              <h1 className="text-xl font-extrabold text-slate-900 mt-0.5 tracking-tight">
                {t.title}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5 max-w-xl">
                {t.subtitle}
              </p>
            </div>

            {/* Strategic Overview Meta */}
            <div className="flex items-center space-x-3 bg-slate-50 border border-slate-200/80 rounded-lg p-2 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-medium">{t.initiativePrompt}</span>
                <span className="font-bold text-slate-800">Q1 Growth & Scale</span>
              </div>
              <div className="w-px h-6 bg-slate-200" />
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-medium">{t.timelinePrompt}</span>
                <span className="font-bold text-slate-800">90 Business Days</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Horizontal / Vertical Phases */}
        <div className="grid grid-cols-3 gap-3.5 flex-1">
          {phases.map((phase, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-slate-200 flex flex-col justify-between overflow-hidden shadow-xs hover:border-slate-300 transition-colors"
            >
              {/* Phase Header */}
              <div
                className="p-3 border-b border-slate-100 flex items-center justify-between"
                style={{
                  backgroundColor: `${brandKit.brandColor}06`,
                }}
              >
                <div>
                  <span
                    className="text-[10px] font-extrabold tracking-wider uppercase block"
                    style={{ color: brandKit.brandColor }}
                  >
                    {phase.number}
                  </span>
                  <h3 className="text-xs font-bold text-slate-900 mt-0.5 leading-snug">
                    {phase.title}
                  </h3>
                </div>
                <span className="text-[10px] font-mono font-semibold bg-white border border-slate-200 text-slate-600 px-1.5 py-0.5 rounded shadow-2xs">
                  {phase.range}
                </span>
              </div>

              {/* Deliverables Checklist */}
              <div className="p-3 flex-1 flex flex-col justify-start space-y-2.5">
                <span className="text-[9.5px] uppercase tracking-wider font-bold text-slate-400">
                  Key Milestones & Deliverables
                </span>
                <ul className="space-y-2">
                  {phase.deliverables.map((item, dIdx) => (
                    <li key={dIdx} className="flex items-start space-x-2 text-[10.5px] text-slate-700 leading-tight">
                      <div
                        className="w-3.5 h-3.5 rounded border border-slate-300 shrink-0 mt-0.5 flex items-center justify-center"
                        style={{
                          backgroundColor: `${brandKit.brandColor}08`,
                        }}
                      >
                        <span className="text-[8px] font-bold" style={{ color: brandKit.brandColor }}>
                          {dIdx + 1}
                        </span>
                      </div>
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Phase KPI Target */}
              <div className="p-2.5 bg-slate-50 border-t border-slate-100">
                <span className="text-[9px] font-bold text-slate-500 uppercase block">
                  {phase.kpiLabel}
                </span>
                <p className="text-[10px] font-semibold text-slate-800 mt-0.5 leading-snug">
                  {phase.kpiValue}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Milestone Sign-off Block */}
        <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
          <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-slate-200/80">
            <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wide">
              {t.signoffTitle}
            </span>
            <span className="text-[10px] text-slate-400">
              Valid for execution upon bilateral sign-off
            </span>
          </div>

          <div className="grid grid-cols-2 gap-8 pt-1">
            <div className="flex flex-col space-y-3">
              <span className="text-[10px] font-semibold text-slate-600">
                {t.clientSign}: <span className="font-normal text-slate-400">{brandKit.clientName || 'Authorized Representative'}</span>
              </span>
              <div className="border-b border-slate-300 border-dashed h-4" />
              <div className="flex justify-between text-[9px] text-slate-400">
                <span>Date: ____ / ____ / 2026</span>
                <span>Signature</span>
              </div>
            </div>

            <div className="flex flex-col space-y-3">
              <span className="text-[10px] font-semibold text-slate-600">
                {t.leadSign}: <span className="font-bold text-slate-800">{brandKit.coachName || 'Alexandre Martin'}</span>
              </span>
              <div className="border-b border-slate-300 border-dashed h-4" />
              <div className="flex justify-between text-[9px] text-slate-400">
                <span>Date: ____ / ____ / 2026</span>
                <span>Signature</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TemplateFrame>
  );
};
