'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Check, ImagePlus } from 'lucide-react';
import { useBrandKit } from '@/lib/use-brand-kit';
import { Header } from '@/components/Header';
import { DownloadButton } from '@/components/DownloadButton';
import { CardFace } from '@/components/card/CardFace';
import { CARD_COPY, blankCard, cardQrTarget, getDefaultCardContent, qrOnBack, sheetLayout } from '@/lib/i18n/card-data';
import { cardHasBack } from '@/lib/card-layout';
import type { BusinessCardContent, CardLayout, InterfaceLang } from '@/types';

const SWATCHES = ['#2340A8', '#1F5C4A', '#7A2335', '#155E75', '#5B2A6E', '#383D39', '#B45309', '#0F172A'];
const LAYOUTS: CardLayout[] = ['classic', 'band', 'centered'];

/** Shrinks a logo to a small PNG (transparency kept) so it fits in local storage. */
function resizeLogo(file: File, max = 600): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, max / Math.max(img.width, img.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.round(img.width * scale));
      canvas.height = Math.max(1, Math.round(img.height * scale));
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject(new Error('no canvas'));
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('unreadable image'));
    };
    img.src = url;
  });
}

const input =
  'mt-1.5 w-full h-11 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-[15px] text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-ink-600 focus:ring-2 focus:ring-ink-100 dark:focus:ring-ink-900';
const label = 'block text-sm font-bold text-slate-700 dark:text-slate-200';
const legend = 'font-display text-xl font-semibold text-slate-900 dark:text-white';

function Choice({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`text-left rounded-xl p-3 border-2 transition-colors ${
        active ? 'border-ink-600 bg-ink-50 dark:bg-ink-950' : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
      }`}
    >
      {children}
    </button>
  );
}

export function CardStudio({ initialLang, title }: { initialLang: InterfaceLang; title: string }) {
  const { brandKit, updateBrandKit, interfaceLang, setInterfaceLang, setUploadedLogo, resetLogo, isLoaded } = useBrandKit(initialLang, 'business-card');
  const t = CARD_COPY[interfaceLang] || CARD_COPY.en;
  const card: BusinessCardContent = brandKit.cardContent || getDefaultCardContent(brandKit.documentLang || 'en');
  const style = { accent: brandKit.brandColor || '#2340A8', logoUrl: brandKit.logoUrl || null };
  const fileRef = useRef<HTMLInputElement>(null);
  const [logoError, setLogoError] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);

  const update = (patch: Partial<BusinessCardContent>) => updateBrandKit({ cardContent: { ...card, ...patch } });

  // Coming from the CV tool (?from=cv): the card starts with the CV's details.
  const prefilled = useRef(false);
  useEffect(() => {
    if (!isLoaded || prefilled.current) return;
    prefilled.current = true;
    const params = new URLSearchParams(window.location.search);
    if (params.get('from') !== 'cv') return;
    const cv = brandKit.cvContent;
    if (cv?.fullName?.trim()) {
      update({
        fullName: cv.fullName,
        jobTitle: cv.jobTitle,
        company: '',
        phone: cv.phone,
        email: cv.email,
        website: cv.link,
        address: cv.city,
        qrUrl: '',
        showQr: Boolean(cv.link?.trim()),
      });
    }
    window.history.replaceState({}, '', window.location.pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);
  const hasBack = cardHasBack(card);
  const paper = brandKit.paperSize === 'letter' ? 'letter' : 'a4';
  const perSheet = (() => {
    const g = sheetLayout(paper, card.cardSize);
    return g.cols * g.rows;
  })();

  const onLogo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    try {
      setLogoError(false);
      await setUploadedLogo(await resizeLogo(file));
    } catch {
      setLogoError(true);
    }
  };

  const field = (key: keyof BusinessCardContent, text: string, type = 'text', autoComplete?: string, placeholder?: string) => (
    <label className={label}>
      {text}
      <input
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={(card[key] as string) || ''}
        onChange={(e) => update({ [key]: e.target.value } as Partial<BusinessCardContent>)}
        className={input}
      />
    </label>
  );

  const preview = (
    <div className="space-y-5">
      <figure>
        <figcaption className="mb-2 text-sm text-slate-600 dark:text-slate-400">{t.front}</figcaption>
        <div className="shadow-[0_1px_2px_rgba(27,29,33,0.08),0_12px_32px_-12px_rgba(27,29,33,0.3)] rounded-[3px] overflow-hidden bg-white">
          <CardFace card={card} side="front" style={style} />
        </div>
      </figure>
      {hasBack && (
        <figure>
          <figcaption className="mb-2 text-sm text-slate-600 dark:text-slate-400">{t.backLabel}</figcaption>
          <div className="shadow-[0_1px_2px_rgba(27,29,33,0.08),0_12px_32px_-12px_rgba(27,29,33,0.3)] rounded-[3px] overflow-hidden">
            <CardFace card={card} side="back" style={style} />
          </div>
        </figure>
      )}
    </div>
  );

  return (
    <div className="bg-slate-50 dark:bg-slate-950">
      <Header interfaceLang={interfaceLang} onLanguageChange={setInterfaceLang} />

      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        {/* Form */}
        <div className="bg-white dark:bg-slate-900 lg:border-r border-slate-200 dark:border-slate-800">
          <div className="max-w-[640px] lg:ml-auto px-5 sm:px-8 lg:px-12 pt-8 sm:pt-10 pb-32 lg:pb-16">
            <h1 className="text-sm font-bold text-slate-500 dark:text-slate-400">{title}</h1>
            <h2 className="mt-3 font-display text-3xl sm:text-[2.5rem] leading-tight font-semibold text-slate-900 dark:text-white">{t.title}</h2>
            <p className="mt-3 text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-[52ch]">{t.help}</p>

            <div className="mt-4 text-sm">
              {confirmClear ? (
                <span className="inline-flex items-center gap-3">
                  <span className="text-slate-700 dark:text-slate-200">{t.clearConfirm}</span>
                  <button
                    type="button"
                    onClick={() => {
                      update(blankCard(card));
                      setConfirmClear(false);
                    }}
                    className="h-9 px-3 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold"
                  >
                    {t.clear}
                  </button>
                  <button type="button" onClick={() => setConfirmClear(false)} className="h-9 px-3 rounded-lg text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold">
                    {t.cancel}
                  </button>
                </span>
              ) : (
                <button type="button" onClick={() => setConfirmClear(true)} className="text-slate-600 dark:text-slate-300 underline underline-offset-4 decoration-slate-300 hover:decoration-slate-600">
                  {t.clear}
                </button>
              )}
            </div>

            {/* Mobile preview */}
            <div className="mt-8 lg:hidden">{preview}</div>

            <div className="mt-10 space-y-12">
              <fieldset className="space-y-4">
                <legend className={legend}>{t.you}</legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4 pt-2">
                  {field('fullName', t.fullName, 'text', 'name')}
                  {field('jobTitle', t.jobTitle, 'text', 'organization-title')}
                  {field('company', t.company, 'text', 'organization')}
                  {field('phone', t.phone, 'tel', 'tel')}
                  {field('email', t.email, 'email', 'email')}
                  {field('website', t.website, 'text', 'url')}
                </div>
                {field('address', t.address, 'text', 'street-address')}
              </fieldset>

              <fieldset className="space-y-3">
                <legend className={legend}>{t.logo}</legend>
                <p className="text-sm text-slate-500 dark:text-slate-400 pt-1">{t.logoHint}</p>
                <div className="flex items-center gap-4">
                  {brandKit.logoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={brandKit.logoUrl} alt="" className="w-16 h-16 object-contain rounded-lg border border-slate-200 bg-white" />
                  ) : (
                    <div className="w-16 h-16 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                      <ImagePlus className="w-5 h-5" aria-hidden="true" />
                    </div>
                  )}
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className="text-sm font-bold text-ink-700 dark:text-ink-300 underline underline-offset-4 decoration-ink-200 hover:decoration-ink-600"
                    >
                      {t.addLogo}
                    </button>
                    {brandKit.logoUrl && (
                      <button type="button" onClick={resetLogo} className="text-sm text-rose-600 hover:underline">
                        {t.removeLogo}
                      </button>
                    )}
                  </div>
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onLogo} />
                </div>
                {logoError && <p role="alert" className="text-sm text-rose-600">{t.logoError}</p>}
              </fieldset>

              <fieldset className="space-y-4">
                <legend className={legend}>{t.design}</legend>
                <div className="grid grid-cols-3 gap-3 pt-2">
                  {LAYOUTS.map((layout) => (
                    <Choice key={layout} active={card.layout === layout} onClick={() => update({ layout })}>
                      <span className="block overflow-hidden rounded-[2px] shadow-sm bg-white">
                        <CardFace card={{ ...card, layout }} side="front" style={style} />
                      </span>
                      <span className="mt-2 flex items-center gap-1.5 font-bold text-sm text-slate-900 dark:text-white">
                        {card.layout === layout && <Check className="w-4 h-4 text-ink-600" aria-hidden="true" />}
                        {t.layouts[layout]}
                      </span>
                    </Choice>
                  ))}
                </div>
                <div>
                  <span className={label}>{t.color}</span>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    {SWATCHES.map((hex) => {
                      const active = brandKit.brandColor?.toUpperCase() === hex;
                      return (
                        <button
                          key={hex}
                          type="button"
                          aria-pressed={active}
                          aria-label={hex}
                          onClick={() => updateBrandKit({ brandColor: hex })}
                          className={`w-11 h-11 rounded-full inline-flex items-center justify-center ring-offset-2 ring-offset-white dark:ring-offset-slate-900 ${
                            active ? 'ring-2 ring-slate-900 dark:ring-white' : 'hover:ring-2 hover:ring-slate-300'
                          }`}
                          style={{ backgroundColor: hex }}
                        >
                          {active && <Check className="w-5 h-5 text-white" aria-hidden="true" />}
                        </button>
                      );
                    })}
                    <label className="inline-flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-200 cursor-pointer">
                      <input
                        type="color"
                        value={brandKit.brandColor || '#2340A8'}
                        onChange={(e) => updateBrandKit({ brandColor: e.target.value.toUpperCase() })}
                        className="w-11 h-11 rounded-full border border-slate-300 cursor-pointer bg-transparent"
                        aria-label={t.customColor}
                      />
                      {t.customColor}
                    </label>
                  </div>
                </div>
              </fieldset>

              <fieldset className="space-y-4">
                <legend className={legend}>{t.qr}</legend>
                <label className="flex items-center gap-2.5 text-[15px] text-slate-800 dark:text-slate-100 cursor-pointer pt-2">
                  <input type="checkbox" checked={card.showQr} onChange={(e) => update({ showQr: e.target.checked })} className="w-5 h-5 accent-ink-600" />
                  {t.qrToggle}
                </label>
                {card.showQr && (
                  <>
                    {field('qrUrl', t.qrUrl, 'text', 'url', t.qrUrlHint)}
                    {cardQrTarget(card) && <p className="text-sm text-slate-500 dark:text-slate-400 break-all">→ {cardQrTarget(card)}</p>}
                    {qrOnBack(card) && <p className="text-sm text-slate-600 dark:text-slate-300">{t.qrBackNote}</p>}
                  </>
                )}
              </fieldset>

              <fieldset className="space-y-4">
                <legend className={legend}>{t.back}</legend>
                <label className="flex items-center gap-2.5 text-[15px] text-slate-800 dark:text-slate-100 cursor-pointer pt-2">
                  <input type="checkbox" checked={card.backSide} onChange={(e) => update({ backSide: e.target.checked })} className="w-5 h-5 accent-ink-600" />
                  {t.backToggle}
                </label>
                {card.backSide && field('backText', t.backText)}
              </fieldset>

              <fieldset className="space-y-5">
                <legend className={legend}>{t.print}</legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {(['sheet', 'printer'] as const).map((output) => (
                    <Choice key={output} active={card.output === output} onClick={() => update({ output })}>
                      <span className="flex items-center gap-1.5 font-bold text-sm text-slate-900 dark:text-white">
                        {card.output === output && <Check className="w-4 h-4 text-ink-600" aria-hidden="true" />}
                        {t.outputs[output].name}
                      </span>
                      <span className="block mt-0.5 text-sm text-slate-500 dark:text-slate-400 leading-snug">{t.outputs[output].desc(perSheet)}</span>
                    </Choice>
                  ))}
                </div>
                <div className="flex flex-wrap gap-6">
                  <div>
                    <span className={label}>{t.cardSize}</span>
                    <div className="mt-2 inline-flex rounded-lg border border-slate-300 dark:border-slate-700 p-1">
                      {(['eu', 'us'] as const).map((s) => (
                        <button
                          key={s}
                          type="button"
                          aria-pressed={card.cardSize === s}
                          onClick={() => update({ cardSize: s })}
                          className={`h-9 px-3 rounded-md text-sm font-bold ${
                            card.cardSize === s ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                          }`}
                        >
                          {t.sizes[s]}
                        </button>
                      ))}
                    </div>
                  </div>
                  {card.output === 'sheet' && (
                    <div>
                      <span className={label}>{t.paper}</span>
                      <div className="mt-2 inline-flex rounded-lg border border-slate-300 dark:border-slate-700 p-1">
                        {(['a4', 'letter'] as const).map((p) => (
                          <button
                            key={p}
                            type="button"
                            aria-pressed={paper === p}
                            onClick={() => updateBrandKit({ paperSize: p })}
                            className={`h-9 px-4 rounded-md text-sm font-bold ${
                              paper === p ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                            }`}
                          >
                            {p === 'a4' ? 'A4' : 'US Letter'}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {hasBack && card.output === 'sheet' && <p className="text-sm text-slate-600 dark:text-slate-300">{t.duplexNote}</p>}
              </fieldset>

              <div className="hidden lg:block max-w-[320px]">
                <DownloadButton brandKit={brandKit} activeTemplate="business-card" interfaceLang={interfaceLang} />
              </div>
            </div>

            <p className="mt-10 text-sm text-slate-500 dark:text-slate-400">{t.privacy}</p>
          </div>
        </div>

        {/* Live preview (desktop) */}
        <aside className="hidden lg:block" aria-label={t.preview}>
          <div className="sticky top-16 px-10 xl:px-14 py-10">
            <div className="max-w-[520px] mx-auto space-y-6">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm text-slate-600 dark:text-slate-400">{t.preview}</p>
                <div className="w-[220px]">
                  <DownloadButton brandKit={brandKit} activeTemplate="business-card" interfaceLang={interfaceLang} compact />
                </div>
              </div>
              {preview}
            </div>
          </div>
        </aside>
      </div>

      {/* Mobile download bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-[60] bg-white/95 dark:bg-slate-900/95 border-t border-slate-200 dark:border-slate-800 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <DownloadButton brandKit={brandKit} activeTemplate="business-card" interfaceLang={interfaceLang} compact />
      </div>
    </div>
  );
}
