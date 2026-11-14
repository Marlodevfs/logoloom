'use client';

import React, { useState } from 'react';
import type { BrandKit, CoverLetterContent, InterfaceLang } from '@/types';
import {
  countLetterPlaceholders,
  getDefaultLetterContent,
  LETTER_STUDIO_COPY,
} from '@/lib/i18n/letter-data';

const INPUT =
  'mt-1.5 w-full h-11 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-[15px] font-normal text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-ink-600 focus:ring-2 focus:ring-ink-100 dark:focus:ring-ink-900';
const AREA = INPUT + ' h-auto py-2.5 leading-relaxed resize-y';
const LABEL = 'block text-sm font-bold text-slate-700 dark:text-slate-200';
const HINT = 'block mt-1 text-sm font-normal text-slate-500 dark:text-slate-400';

export function LetterEditor({
  brandKit,
  onUpdate,
  interfaceLang,
  onEditCv,
}: {
  brandKit: BrandKit;
  onUpdate: (patch: Partial<BrandKit>) => void;
  interfaceLang: InterfaceLang;
  onEditCv: () => void;
}) {
  const c = LETTER_STUDIO_COPY[interfaceLang] || LETTER_STUDIO_COPY.en;
  const lang = brandKit.documentLang || 'en';
  const letter = brandKit.letterContent || getDefaultLetterContent(lang);
  const [confirmReset, setConfirmReset] = useState(false);

  const update = (patch: Partial<CoverLetterContent>) => onUpdate({ letterContent: { ...letter, ...patch } });
  const left = countLetterPlaceholders(letter);

  const text = (key: keyof CoverLetterContent, label: string, hint?: string, autoComplete?: string) => (
    <label className={LABEL}>
      {label}
      {hint && <span className={HINT}>{hint}</span>}
      <input
        type="text"
        autoComplete={autoComplete}
        value={letter[key]}
        onChange={(e) => update({ [key]: e.target.value } as Partial<CoverLetterContent>)}
        className={INPUT}
      />
    </label>
  );
  const area = (key: keyof CoverLetterContent, label: string, rows: number, hint?: string, autoComplete?: string) => (
    <label className={LABEL}>
      {label}
      {hint && <span className={HINT}>{hint}</span>}
      <textarea
        rows={rows}
        autoComplete={autoComplete}
        value={letter[key]}
        onChange={(e) => update({ [key]: e.target.value } as Partial<CoverLetterContent>)}
        className={AREA}
      />
    </label>
  );

  return (
    <div className="space-y-8">
      <p className="text-sm text-slate-600 dark:text-slate-300">
        {c.fromCv}{' '}
        <button
          type="button"
          onClick={onEditCv}
          className="font-bold text-ink-700 dark:text-ink-300 underline underline-offset-4 decoration-ink-200 hover:decoration-ink-600"
        >
          {c.editCv}
        </button>
      </p>

      <div className="space-y-4">
        {area('senderAddress', c.senderAddress, 2, c.senderAddressHint, 'street-address')}
        {area('recipient', c.recipient, 4)}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
          {text('place', c.place, c.placeHint, 'address-level2')}
          {text('date', c.date, c.dateHint)}
        </div>
      </div>

      <div className="space-y-4">
        {text('subject', c.subject)}
        {text('salutation', c.salutation)}
        {area('body', c.body, 14, c.bodyHint)}
        {area('closing', c.closing, 2)}
      </div>

      <p
        role="status"
        className={`text-sm rounded-lg px-4 py-3 ${
          left > 0
            ? 'bg-amber-50 text-amber-900 border border-amber-200 dark:bg-amber-950 dark:text-amber-100 dark:border-amber-800'
            : 'bg-emerald-50 text-emerald-900 border border-emerald-200 dark:bg-emerald-950 dark:text-emerald-100 dark:border-emerald-800'
        }`}
      >
        {left > 0 ? c.placeholdersLeft(left) : c.allFilled}
      </p>

      <div className="text-sm">
        {confirmReset ? (
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-slate-700 dark:text-slate-200 font-bold">{c.resetConfirm}</span>
            <button
              type="button"
              onClick={() => {
                onUpdate({ letterContent: getDefaultLetterContent(lang) });
                setConfirmReset(false);
              }}
              className="h-9 px-3 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold"
            >
              {c.reset}
            </button>
            <button
              type="button"
              onClick={() => setConfirmReset(false)}
              className="h-9 px-3 rounded-lg text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold"
            >
              {c.cancel}
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setConfirmReset(true)}
            className="text-slate-600 dark:text-slate-300 underline underline-offset-4 decoration-slate-300 hover:decoration-slate-600"
          >
            {c.reset}
          </button>
        )}
      </div>
    </div>
  );
}
