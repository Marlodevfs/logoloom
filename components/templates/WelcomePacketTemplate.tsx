'use client';

import React from 'react';
import { BrandKit } from '@/types';
import { DOCUMENT_TRANSLATIONS } from '@/lib/i18n/documents';
import { TemplateFrame } from './TemplateFrame';

interface WelcomePacketTemplateProps {
  brandKit: BrandKit;
}

export const WelcomePacketTemplate: React.FC<WelcomePacketTemplateProps> = ({ brandKit }) => {
  const docLang = brandKit.documentLang || 'en';
  const t = (DOCUMENT_TRANSLATIONS[docLang] || DOCUMENT_TRANSLATIONS.en).welcomePacket;

  return (
    <TemplateFrame
      brandKit={brandKit}
      subtitleRight="CLIENT ONBOARDING • GUIDE & PROTOCOLS"
    >
      <div className="flex flex-col h-full justify-between space-y-4">
        {/* Document Header Info */}
        <div className="border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: brandKit.brandColor }}
            />
            <span className="text-xs font-semibold tracking-wider uppercase text-slate-500">
              Welcome & Partnership Standards
            </span>
          </div>
          <h1 className="text-xl font-extrabold text-slate-900 mt-0.5 tracking-tight">
            {t.title}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5 max-w-xl">
            {t.subtitle}
          </p>
        </div>

        {/* Welcome Statement Banner */}
        <div
          className="rounded-xl p-3.5 border relative overflow-hidden"
          style={{
            backgroundColor: `${brandKit.brandColor}08`,
            borderColor: `${brandKit.brandColor}20`,
          }}
        >
          <div className="flex items-start space-x-3">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 mt-0.5"
              style={{
                backgroundColor: brandKit.brandColor,
                color: brandKit.contrastText,
              }}
            >
              ✦
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 leading-snug">
                {t.welcomeHeader}
              </h3>
              <p className="text-[10.5px] text-slate-600 mt-1 leading-relaxed">
                {t.welcomeBody}
              </p>
            </div>
          </div>
        </div>

        {/* Middle Two-Column Grid: Communication & Working Agreements */}
        <div className="grid grid-cols-2 gap-3.5 flex-1">
          {/* Left Column: Communication Rules & Channels */}
          <div className="bg-white rounded-xl border border-slate-200 p-3.5 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center space-x-2 border-b border-slate-100 pb-2 mb-2.5">
                <span
                  className="w-1.5 h-3 rounded-full"
                  style={{ backgroundColor: brandKit.brandColor }}
                />
                <h4 className="text-xs font-bold text-slate-900">
                  {t.commHeader}
                </h4>
              </div>
              <p className="text-[10px] text-slate-500 mb-2.5">
                {t.commSub}
              </p>

              <div className="space-y-2">
                {t.commItems.map((item, idx) => (
                  <div key={idx} className="bg-slate-50/80 rounded-lg p-2 border border-slate-100">
                    <span className="text-[9.5px] font-bold text-slate-700 block uppercase tracking-tight">
                      {item.label}
                    </span>
                    <span className="text-[10.5px] font-medium text-slate-600 leading-snug block mt-0.5">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-2 text-[9.5px] text-slate-400 border-t border-slate-100 pt-1.5">
              Contact: <span className="font-semibold text-slate-700">{brandKit.contactEmail || 'team@studio.io'}</span>
            </div>
          </div>

          {/* Right Column: Working Agreements */}
          <div className="bg-white rounded-xl border border-slate-200 p-3.5 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center space-x-2 border-b border-slate-100 pb-2 mb-2.5">
                <span
                  className="w-1.5 h-3 rounded-full"
                  style={{ backgroundColor: brandKit.brandColor }}
                />
                <h4 className="text-xs font-bold text-slate-900">
                  {t.agreementsHeader}
                </h4>
              </div>

              <div className="space-y-2.5">
                {t.agreements.map((agreement, idx) => (
                  <div key={idx} className="flex items-start space-x-2">
                    <div
                      className="w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5"
                      style={{
                        backgroundColor: `${brandKit.brandColor}15`,
                        color: brandKit.brandColor,
                      }}
                    >
                      ✓
                    </div>
                    <div>
                      <h5 className="text-[11px] font-bold text-slate-800">
                        {agreement.title}
                      </h5>
                      <p className="text-[10px] text-slate-600 leading-snug mt-0.5">
                        {agreement.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Client Preparation Checklist */}
            <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-200/80 mt-2">
              <span className="text-[9.5px] font-bold text-slate-700 uppercase tracking-tight block mb-1">
                {t.firstStepsHeader}
              </span>
              <ul className="space-y-1">
                {t.firstSteps.map((step, sIdx) => (
                  <li key={sIdx} className="text-[9.5px] text-slate-600 flex items-start space-x-1.5">
                    <span className="text-slate-400 font-bold">•</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Kickoff CTA & Appointment Confirmation */}
        <div className="bg-slate-900 text-white rounded-xl p-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm"
              style={{
                backgroundColor: brandKit.brandColor,
                color: brandKit.contrastText,
              }}
            >
              📅
            </div>
            <div>
              <p className="text-xs font-bold text-white">
                {t.schedulePrompt}
              </p>
              <p className="text-[10px] text-slate-400">
                Your primary point of contact is <span className="text-white font-medium">{brandKit.coachName || 'Alexandre Martin'}</span>
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-mono text-slate-300 bg-slate-800 px-2.5 py-1 rounded border border-slate-700">
              KICKOFF SESSION 01
            </span>
          </div>
        </div>
      </div>
    </TemplateFrame>
  );
};
