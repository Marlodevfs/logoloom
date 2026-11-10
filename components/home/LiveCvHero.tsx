'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { CvTemplate } from '@/components/templates/CvTemplate';
import { getDefaultCvContent } from '@/lib/use-brand-kit';
import type { BrandKit, CvLayout, DocumentLang } from '@/types';

/** Minimal brand kit to render a CV sheet outside the editor. */
export function sampleCvKit(lang: DocumentLang, layout: CvLayout, fullName?: string, color = '#2340A8'): BrandKit {
  const base = getDefaultCvContent(lang);
  return {
    logoUrl: null,
    brandColor: color,
    contrastText: '#FFFFFF',
    companyName: '',
    tagline: '',
    coachName: '',
    clientName: '',
    contactEmail: '',
    qrUrl: '',
    paperSize: 'a4',
    documentLang: lang,
    designStyle: 'minimal',
    isPro: false,
    removeWatermark: false,
    selectedTemplate: 'cv',
    cvContent: { ...base, layout, fullName: fullName?.trim() || base.fullName },
  } as BrandKit;
}

/**
 * A real A4 CV sheet (the same component as the editor), scaled to its box.
 * The sheet is 595pt wide; we measure the box and scale to fit.
 */
export function CvSheet({ kit, className = '' }: { kit: BrandKit; className?: string }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);
  const SHEET_W = 793; // 595pt in CSS px
  const SHEET_H = 1123; // 842pt

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / SHEET_W);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={boxRef} className={`relative w-full ${className}`} style={{ height: SHEET_H * scale }}>
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 origin-top-left pointer-events-none select-none"
        style={{ transform: `scale(${scale})`, width: SHEET_W }}
      >
        <CvTemplate brandKit={kit} decorative />
      </div>
    </div>
  );
}

export interface LiveCvHeroCopy {
  h1: string;
  lead: string;
  nameLabel: string;
  namePlaceholder: string;
  cta: string;
  facts: string[];
  sheetCaption: string;
}

export function LiveCvHero({ lang, copy }: { lang: DocumentLang; copy: LiveCvHeroCopy }) {
  const [name, setName] = useState('');
  const href = `/${lang}/cv${name.trim() ? `?name=${encodeURIComponent(name.trim())}` : ''}`;

  return (
    <section className="max-w-6xl mx-auto px-5 sm:px-8 pt-10 sm:pt-16 pb-14 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-start">
      <div className="lg:pt-10">
        <h1 className="font-display text-[2.6rem] leading-[1.05] sm:text-6xl font-semibold text-slate-900 dark:text-white">
          {copy.h1}
        </h1>
        <p className="mt-5 text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-[34ch]">{copy.lead}</p>

        <form
          className="mt-8 max-w-md"
          onSubmit={(e) => {
            e.preventDefault();
            window.location.href = href;
          }}
        >
          <label htmlFor="hero-name" className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">
            {copy.nameLabel}
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              id="hero-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={copy.namePlaceholder}
              autoComplete="name"
              maxLength={60}
              className="w-full sm:flex-1 h-12 shrink-0 px-4 rounded-lg border border-slate-300 bg-white text-base text-slate-900 placeholder:text-slate-400 dark:bg-slate-900 dark:border-slate-700 dark:text-white"
            />
            <Link
              href={href}
              className="h-12 px-6 inline-flex items-center justify-center rounded-lg bg-ink-600 hover:bg-ink-700 text-white font-bold text-base transition-colors"
            >
              {copy.cta}
            </Link>
          </div>
        </form>

        <ul className="mt-6 space-y-1.5 text-[15px] text-slate-600 dark:text-slate-300">
          {copy.facts.map((f) => (
            <li key={f} className="flex gap-2">
              <span aria-hidden="true" className="mt-[0.55em] w-1.5 h-1.5 rounded-full bg-ink-600 shrink-0" />
              {f}
            </li>
          ))}
        </ul>
      </div>

      {/* The product itself: a real CV sheet that follows what you type */}
      <figure className="relative">
        <div className="rounded-sm shadow-[0_1px_2px_rgba(27,29,33,0.08),0_12px_40px_-12px_rgba(27,29,33,0.25)] overflow-hidden bg-white">
          <CvSheet kit={sampleCvKit(lang, 'sidebar', name)} />
        </div>
        <figcaption className="mt-3 text-sm text-slate-500 dark:text-slate-400">{copy.sheetCaption}</figcaption>
      </figure>
    </section>
  );
}

/** The two layouts, shown as real sheets in two accent colours. */
export function CvLayoutsShowcase({
  lang,
  captions,
}: {
  lang: DocumentLang;
  captions: { sidebar: string; classic: string };
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
      {([
        ['sidebar', '#1F5C4A', captions.sidebar],
        ['classic', '#7A2335', captions.classic],
      ] as const).map(([layout, color, caption]) => (
        <figure key={layout}>
          <div className="bg-white shadow-[0_1px_2px_rgba(27,29,33,0.08),0_10px_30px_-12px_rgba(27,29,33,0.22)]">
            <CvSheet kit={sampleCvKit(lang, layout, undefined, color)} />
          </div>
          <figcaption className="mt-3 text-[15px] text-slate-700 dark:text-slate-300">{caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}
