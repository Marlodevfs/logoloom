'use client';

import { useEffect, useState } from 'react';

const PRO_TOKEN_KEY = 'logoloom_pro_token_v1';

const MSG: Record<string, { ok: string; ko: string }> = {
  fr: { ok: 'Pro activé ✓ Vos PDF sont maintenant sans mention LogoLoom.', ko: 'Paiement reçu, mais l’activation a échoué. Utilisez « Restaurer l’accès » avec votre email.' },
  en: { ok: 'Pro activated ✓ Your PDFs no longer carry the LogoLoom credit.', ko: 'Payment received, but activation failed. Use “Restore access” with your email.' },
  de: { ok: 'Pro aktiviert ✓', ko: 'Zahlung erhalten, Aktivierung fehlgeschlagen. Bitte Zugang per E-Mail wiederherstellen.' },
  es: { ok: 'Pro activado ✓', ko: 'Pago recibido, pero la activación falló. Restaura el acceso con tu email.' },
  it: { ok: 'Pro attivato ✓', ko: 'Pagamento ricevuto, ma l’attivazione non è riuscita. Ripristina l’accesso con la tua email.' },
  pt: { ok: 'Pro ativado ✓', ko: 'Pagamento recebido, mas a ativação falhou. Restaure o acesso com o seu email.' },
};

/**
 * Runs on every page: after a Paddle checkout the browser lands on `?transaction_id=txn_...`.
 * Verifies it server-side, stores the signed Pro token and shows a short confirmation.
 * (Editor pages also verify through useBrandKit; doing it twice is harmless.)
 */
export function ProActivation({ lang }: { lang: string }) {
  const [status, setStatus] = useState<'ok' | 'ko' | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const transactionId = params.get('transaction_id');
    if (!transactionId) return;

    fetch('/api/subscription/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ transactionId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.verified && data.token) {
          try {
            localStorage.setItem(PRO_TOKEN_KEY, data.token);
          } catch {}
          setStatus('ok');
        } else {
          setStatus('ko');
        }
      })
      .catch(() => setStatus('ko'))
      .finally(() => {
        params.delete('transaction_id');
        const qs = params.toString();
        window.history.replaceState({}, '', `${window.location.pathname}${qs ? `?${qs}` : ''}`);
      });
  }, []);

  useEffect(() => {
    if (status !== 'ok') return;
    const t = setTimeout(() => setStatus(null), 8000);
    return () => clearTimeout(t);
  }, [status]);

  if (!status) return null;
  const m = MSG[lang] || MSG.en;
  return (
    <div
      role="status"
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-[60] max-w-md w-[calc(100%-2rem)] rounded-xl px-4 py-3 text-sm font-semibold shadow-lg ${
        status === 'ok' ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
      }`}
      onClick={() => setStatus(null)}
    >
      {status === 'ok' ? m.ok : m.ko}
    </div>
  );
}
