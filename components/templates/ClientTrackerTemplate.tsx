'use client';

import React from 'react';
import { BrandKit, DocumentLang, ClientTrackerCustomContent } from '@/types';
import { MinimalDocFrame } from './minimal/MinimalDocFrame';
import { getDefaultClientTrackerContent } from '@/lib/use-brand-kit';
import { CATALOG_LABELS } from '@/lib/i18n/catalog-labels';

interface ClientTrackerTemplateProps {
  brandKit: BrandKit;
  onUpdate?: (updates: Partial<BrandKit>) => void;
}

export const ClientTrackerTemplate: React.FC<ClientTrackerTemplateProps> = ({
  brandKit,
  onUpdate,
}) => {
  const docLang: DocumentLang = brandKit.documentLang || 'en';
  const labels = (CATALOG_LABELS[docLang] || CATALOG_LABELS.en).clientTracker;
  const content: ClientTrackerCustomContent =
    brandKit.clientTrackerContent || getDefaultClientTrackerContent(docLang);

  const updateContent = (updates: Partial<ClientTrackerCustomContent>) => {
    if (!onUpdate) return;
    onUpdate({
      clientTrackerContent: { ...content, ...updates },
    });
  };

  const totalSessions = content.sessions.length;

  return (
    <MinimalDocFrame
      brandKit={brandKit}
      title={content.title}
      onUpdateTitle={(title) => updateContent({ title })}
      metadataRight={
        <div className="flex items-center space-x-3 text-[10.5px] text-slate-600 shrink-0">
          <span className="font-semibold text-slate-700">Période :</span>
          <span className="font-mono text-slate-900 border-b border-slate-300 pb-0.5 min-w-[70px] text-center">
            En cours
          </span>
        </div>
      }
      footerCategoryText={labels.footerCategory}
    >
      <div className="flex flex-col h-full justify-between gap-2.5 py-1">
        {/* Main Session Log Table */}
        <section className="flex-1 flex flex-col justify-start border border-slate-300 rounded-lg overflow-hidden bg-white shadow-2xs">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-300 text-[9px] font-bold text-slate-700 uppercase tracking-wider bg-slate-100">
                <th className="py-1.5 px-2 text-left w-14">{labels.colDate}</th>
                <th className="py-1.5 px-2 text-left w-36">{labels.colClient}</th>
                <th className="py-1.5 px-2 text-left">{labels.colService}</th>
                <th className="py-1.5 px-2 text-center w-16">{labels.colDuration}</th>
                <th className="py-1.5 px-2 text-center w-20">{labels.colStatus}</th>
                <th className="py-1.5 px-2 text-left w-44">{labels.colNotes}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[9px]">
              {content.sessions.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50">
                  <td className="py-1.5 px-2 font-mono font-medium text-slate-700">{item.date}</td>
                  <td className="py-1.5 px-2 font-bold text-slate-900 truncate">{item.client}</td>
                  <td className="py-1.5 px-2 text-slate-800">{item.service}</td>
                  <td className="py-1.5 px-2 text-center font-mono text-slate-600">{item.duration}</td>
                  <td className="py-1.5 px-2 text-center">
                    <span
                      className={`inline-block px-1.5 py-0.5 rounded text-[8px] font-bold ${
                        item.status === 'Terminé' || item.status === 'Completed' || item.status === 'Erledigt'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-1.5 px-2 text-slate-500 italic text-[8.5px] truncate">{item.notes}</td>
                </tr>
              ))}
              {/* Additional handwriting blank rows */}
              {Array.from({ length: 8 }, (_, i) => (
                <tr key={`blank-${i}`} className="h-6">
                  <td className="py-1.5 px-2 border-b border-slate-100 font-mono text-slate-300">__/</td>
                  <td className="py-1.5 px-2 border-b border-slate-100" />
                  <td className="py-1.5 px-2 border-b border-slate-100" />
                  <td className="py-1.5 px-2 border-b border-slate-100 text-center font-mono text-slate-300">__m</td>
                  <td className="py-1.5 px-2 border-b border-slate-100" />
                  <td className="py-1.5 px-2 border-b border-slate-100" />
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Bottom Summary Strip */}
        <section className="border border-slate-200 rounded-lg p-2 bg-slate-50/70 flex items-center justify-between text-[9px] text-slate-600">
          <div className="flex items-center space-x-6">
            <div>
              <span className="font-bold text-slate-700">Séances enregistrées : </span>
              <span className="font-mono font-bold text-slate-900">{totalSessions}</span>
            </div>
            <div>
              <span className="font-bold text-slate-700">Suivi d’activité : </span>
              <span className="italic text-slate-500">100% à jour</span>
            </div>
          </div>
          <div className="italic text-slate-500 text-[8.5px]">
            {content.notes}
          </div>
        </section>
      </div>
    </MinimalDocFrame>
  );
};
