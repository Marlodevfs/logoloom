'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

/**
 * Demand test for a paid "Swiss application pack". Nothing is sold yet:
 * the button only counts interest (cookieless GoatCounter event).
 */
export function SwissPackTeaser({ startHref }: { startHref: string }) {
  const [sent, setSent] = useState(false);

  return (
    <section aria-labelledby="swiss-pack" className="rounded-2xl border-2 border-ink-600 bg-ink-50 dark:bg-ink-950 p-7 sm:p-9">
      <p className="text-sm font-bold text-ink-700 dark:text-ink-300">Bientôt disponible</p>
      <h2 id="swiss-pack" className="mt-1 font-display text-3xl font-semibold text-slate-900 dark:text-white">
        Pack candidature Suisse
      </h2>
      <p className="mt-3 text-slate-700 dark:text-slate-200 leading-relaxed max-w-[56ch]">
        Tout le dossier que demandent les employeurs suisses, prêt à envoyer en un seul PDF.
      </p>
      <ul className="mt-5 space-y-2 text-slate-700 dark:text-slate-200">
        {[
          'Un CV au format suisse : photo, état civil, permis, langues avec niveau',
          'Une lettre de motivation au format suisse',
          'CV, lettre, certificats de travail et diplômes assemblés en un seul PDF, dans le bon ordre',
          'Tout reste dans votre navigateur, comme le reste du site',
        ].map((item) => (
          <li key={item} className="flex gap-2.5">
            <Check className="w-5 h-5 mt-0.5 shrink-0 text-ink-600" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <p className="mt-5 text-slate-900 dark:text-white">
        <span className="font-bold">9,90 €</span>, paiement unique, sans abonnement.
      </p>

      <div className="mt-6" aria-live="polite">
        {sent ? (
          <p className="text-slate-800 dark:text-slate-100">
            <span className="font-bold">Merci, c’est noté.</span> Le pack n’est pas encore prêt : votre intérêt nous aide à décider de le lancer. En attendant, le{' '}
            <a href={startHref} className="font-bold text-ink-700 dark:text-ink-300 underline underline-offset-4">CV frontalier gratuit</a> est déjà disponible.
          </p>
        ) : (
          <button
            type="button"
            onClick={() => {
              trackEvent('swiss_pack_interest');
              setSent(true);
            }}
            className="h-12 px-6 rounded-lg bg-ink-600 hover:bg-ink-700 text-white font-bold"
          >
            Ça m’intéresse
          </button>
        )}
      </div>
    </section>
  );
}
