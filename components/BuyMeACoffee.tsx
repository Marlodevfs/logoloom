import { siteConfig } from '@/config/site';

const LABELS: Record<string, { button: string; hint: string }> = {
  en: { button: 'Buy me a coffee', hint: 'LogoLoom is free. A coffee helps keep it that way.' },
  fr: { button: 'Offrez-moi un café', hint: 'LogoLoom est gratuit. Un café aide à ce que ça le reste.' },
  de: { button: 'Spendier mir einen Kaffee', hint: 'LogoLoom ist kostenlos. Ein Kaffee hilft, dass es so bleibt.' },
  es: { button: 'Invítame a un café', hint: 'LogoLoom es gratis. Un café ayuda a que siga así.' },
  it: { button: 'Offrimi un caffè', hint: 'LogoLoom è gratuito. Un caffè aiuta a mantenerlo tale.' },
  pt: { button: 'Pague-me um café', hint: 'O LogoLoom é grátis. Um café ajuda a mantê-lo assim.' },
};

export const BMC_URL = `https://www.buymeacoffee.com/${siteConfig.buyMeACoffee}`;

export function getBmcLabels(lang: string) {
  return LABELS[lang] || LABELS.en;
}

/**
 * Buy Me a Coffee button. Recreated as a plain link (the official widget script
 * relies on document.write, which doesn't work in a React/Next.js page).
 * Same look as the official yellow button.
 */
export function BuyMeACoffeeButton({ lang, withHint = false }: { lang: string; withHint?: boolean }) {
  const l = getBmcLabels(lang);
  return (
    <div className="space-y-2">
      <a
        href={BMC_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-[#FFDD00] hover:bg-[#ffd000] text-black text-sm font-bold border border-black shadow-sm transition-colors"
      >
        <span aria-hidden="true">☕</span>
        <span>{l.button}</span>
      </a>
      {withHint && <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">{l.hint}</p>}
    </div>
  );
}
