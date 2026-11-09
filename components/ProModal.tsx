'use client';

import React, { useState } from 'react';
import { X, Check, Sparkles, ShieldCheck, Loader2, ArrowRight, KeyRound } from 'lucide-react';
import { InterfaceLang } from '@/types';
import { UI_TRANSLATIONS } from '@/lib/i18n/interface';

interface ProModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRestoreSubscription?: (email: string) => Promise<{ success: boolean; message?: string; error?: string }>;
  interfaceLang: InterfaceLang;
}

interface ProModalBenefit {
  title: string;
  desc: string;
}

interface ProModalStrings {
  title: string;
  subtitle: string;
  priceNotice: string;
  perMonth: string;
  unlimitedPdfs: string;
  benefits: ProModalBenefit[];
  upgradeBtn: string;
  connectingStripe: string;
  restorePrompt: string;
  restoreTitle: string;
  restorePlaceholder: string;
  restoreBtn: string;
  cancelNotice: string;
  checkoutError: string;
  networkError: string;
  subRestored: string;
  subNotFound: string;
}

const PRO_MODAL_I18N: Record<InterfaceLang, ProModalStrings> = {
  fr: {
    title: 'Offrez à vos clients une expérience 100% marque blanche',
    subtitle: 'Documents épurés et impeccables pour indépendants, créatifs et entreprises.',
    priceNotice: 'Résiliable en 1 clic. Aucun engagement de durée.',
    perMonth: ' / mois',
    unlimitedPdfs: 'PDFs illimités',
    benefits: [
      {
        title: 'Marque blanche intégrale',
        desc: 'Supprime 100% des mentions LogoLoom et le QR code de filigrane.',
      },
      {
        title: 'Export vectoriel Ultra-HD',
        desc: 'Polices Unicode incorporées et QR code vectoriel SVG haute résolution.',
      },
      {
        title: 'Couleur de marque illimitée',
        desc: 'Appliquez n’importe quel code couleur HEX sans restriction.',
      },
      {
        title: 'Distribution commerciale sans réserve',
        desc: 'Remettez vos documents à vos clients sans la moindre mention tierce.',
      },
    ],
    upgradeBtn: 'Passer à LogoLoom Pro — 9 €/mois',
    connectingStripe: 'Connexion à Stripe...',
    restorePrompt: 'Déjà abonné ? Restaurer l’accès',
    restoreTitle: 'Restaurer l’accès Pro via votre email',
    restorePlaceholder: 'vous@entreprise.com',
    restoreBtn: 'Restaurer',
    cancelNotice: 'Paiement sécurisé chiffré 256 bits par Stripe • Sans engagement',
    checkoutError: 'Impossible d’ouvrir la session de paiement. Veuillez réessayer.',
    networkError: 'Erreur réseau lors de la commande.',
    subRestored: 'Abonnement Pro restauré !',
    subNotFound: 'Aucun abonnement actif trouvé pour cet e-mail.',
  },
  en: {
    title: 'Give your clients a 100% white-label experience',
    subtitle: 'Clean, professional documents for freelancers, creators and businesses.',
    priceNotice: 'Cancel anytime with 1-click. No long-term contract.',
    perMonth: ' / month',
    unlimitedPdfs: 'Unlimited PDFs',
    benefits: [
      {
        title: 'Full White-Label Branding',
        desc: '100% remove the LogoLoom footer and QR watermark on all documents.',
      },
      {
        title: 'Ultra-HD Vector Export',
        desc: 'Embedded Unicode fonts and pure vector SVG QR codes with crisp 300 DPI print quality.',
      },
      {
        title: 'Custom Brand Colors',
        desc: 'Unlock any specific brand color hex code without restrictions.',
      },
      {
        title: 'Commercial Client Distribution',
        desc: 'Deliver fully unbranded documents to corporate and private clients legally.',
      },
    ],
    upgradeBtn: 'Upgrade to Pro — $9/mo',
    connectingStripe: 'Connecting to Stripe...',
    restorePrompt: 'Already subscribed? Restore access',
    restoreTitle: 'Restore Pro via Billing Email',
    restorePlaceholder: 'you@company.com',
    restoreBtn: 'Restore',
    cancelNotice: 'Secure 256-bit encrypted Stripe billing • Cancel anytime',
    checkoutError: 'Unable to start checkout session. Please try again.',
    networkError: 'Network error during checkout.',
    subRestored: 'Subscription restored!',
    subNotFound: 'No active subscription found.',
  },
  de: {
    title: 'Bieten Sie Ihren Kunden ein 100%iges White-Label-Erlebnis',
    subtitle: 'Elegantes Branding für Freiberufler, Kreative und kleine Unternehmen.',
    priceNotice: 'Jederzeit mit 1 Klick kündbar. Keine Mindestlaufzeit.',
    perMonth: ' / Monat',
    unlimitedPdfs: 'Unbegrenzte PDFs',
    benefits: [
      {
        title: 'Vollständiges White-Label-Branding',
        desc: 'Entfernt das LogoLoom-Wasserzeichen und den Logo-QR-Code zu 100%.',
      },
      {
        title: 'Ultra-HD Vektor-Export',
        desc: 'Eingebettete Unicode-Schriften und gestochen scharfe Vektor-QR-Codes in 300 DPI.',
      },
      {
        title: 'Individuelle Markenfarben',
        desc: 'Nutzen Sie jeden beliebigen HEX-Farbcode ohne Einschränkungen.',
      },
      {
        title: 'Gewerbliche Weitergabe an Kunden',
        desc: 'Übergeben Sie vollkommen neutrale Dokumente an Ihre Kunden.',
      },
    ],
    upgradeBtn: 'Auf Pro upgraden — 9 €/Monat',
    connectingStripe: 'Verbindung zu Stripe wird hergestellt...',
    restorePrompt: 'Bereits abonniert? Zugriff wiederherstellen',
    restoreTitle: 'Pro über Rechnungs-E-Mail wiederherstellen',
    restorePlaceholder: 'ihre-mail@unternehmen.de',
    restoreBtn: 'Wiederherstellen',
    cancelNotice: 'Sichere 256-Bit-verschlüsselte Stripe-Zahlung • Jederzeit kündbar',
    checkoutError: 'Konnte Zahlungssitzung nicht starten. Bitte erneut versuchen.',
    networkError: 'Netzwerkfehler beim Starten des Bezahlvorgangs.',
    subRestored: 'Abonnement erfolgreich wiederhergestellt!',
    subNotFound: 'Kein aktives Abonnement für diese E-Mail gefunden.',
  },
  es: {
    title: 'Ofrece a tus clientes una experiencia 100% marca blanca',
    subtitle: 'Documentos impecables y profesionales para autónomos, creativos y empresas.',
    priceNotice: 'Cancela en 1 clic en cualquier momento. Sin permanencia.',
    perMonth: ' / mes',
    unlimitedPdfs: 'PDFs ilimitados',
    benefits: [
      {
        title: 'Marca blanca total',
        desc: 'Elimina al 100% la mención y el código QR de LogoLoom de tus documentos.',
      },
      {
        title: 'Exportación vectorial Ultra-HD',
        desc: 'Fuentes Unicode integradas y código QR SVG vectorial a 300 DPI.',
      },
      {
        title: 'Colores de marca ilimitados',
        desc: 'Usa cualquier código hexadecimal de color de tu marca sin límites.',
      },
      {
        title: 'Distribución comercial a clientes',
        desc: 'Entrega documentos profesionales sin créditos externos a tus clientes.',
      },
    ],
    upgradeBtn: 'Actualizar a Pro — 9 €/mes',
    connectingStripe: 'Conectando con Stripe...',
    restorePrompt: '¿Ya estás suscrito? Restaurar acceso',
    restoreTitle: 'Restaurar Pro con tu correo de facturación',
    restorePlaceholder: 'tu@empresa.com',
    restoreBtn: 'Restaurar',
    cancelNotice: 'Pago seguro cifrado de 256 bits mediante Stripe • Cancela cuando quieras',
    checkoutError: 'No se pudo iniciar la sesión de pago. Inténtelo de nuevo.',
    networkError: 'Error de red durante el proceso de pago.',
    subRestored: '¡Suscripción restaurada con éxito!',
    subNotFound: 'No se encontró ninguna suscripción activa para este correo.',
  },
  it: {
    title: 'Offri ai tuoi clienti un’esperienza 100% white-label',
    subtitle: 'Branding pulito e professionale per freelance, creativi e piccole imprese.',
    priceNotice: 'Disdici in 1 clic in qualsiasi momento. Nessun vincolo.',
    perMonth: ' / mese',
    unlimitedPdfs: 'PDF illimitati',
    benefits: [
      {
        title: 'White-Label Completo',
        desc: 'Rimuove al 100% la dicitura e il codice QR LogoLoom da tutti i documenti.',
      },
      {
        title: 'Esportazione Vettoriale Ultra-HD',
        desc: 'Font Unicode incorporati e codici QR vettoriali SVG nitidi a 300 DPI.',
      },
      {
        title: 'Colori del Brand Personalizzati',
        desc: 'Utilizza qualsiasi codice HEX per il tuo brand senza limitazioni.',
      },
      {
        title: 'Distribuzione Commerciale ai Clienti',
        desc: 'Fornisci documenti completamente brandizzati senza crediti di terze parti.',
      },
    ],
    upgradeBtn: 'Passa a Pro — 9 €/mese',
    connectingStripe: 'Connessione a Stripe in corso...',
    restorePrompt: 'Già abbonato? Ripristina l’accesso',
    restoreTitle: 'Ripristina Pro tramite email di fatturazione',
    restorePlaceholder: 'tu@azienda.it',
    restoreBtn: 'Ripristina',
    cancelNotice: 'Fatturazione Stripe protetta con crittografia a 256 bit • Cancella quando vuoi',
    checkoutError: 'Impossibile avviare la sessione di pagamento. Riprova.',
    networkError: 'Errore di rete durante il checkout.',
    subRestored: 'Abbonamento ripristinato con successo!',
    subNotFound: 'Nessun abbonamento attivo trovato per questa email.',
  },
  pt: {
    title: 'Ofereça aos seus clientes uma experiência 100% marca branca',
    subtitle: 'Design limpo e sofisticado para freelancers, criativos e empresas.',
    priceNotice: 'Cancele a qualquer momento com 1 clique. Sem fidelização.',
    perMonth: ' / mês',
    unlimitedPdfs: 'PDFs ilimitados',
    benefits: [
      {
        title: 'Marca Branca Total',
        desc: 'Remova 100% da menção LogoLoom e da marca d’água QR dos seus documentos.',
      },
      {
        title: 'Exportação Vetorial Ultra-HD',
        desc: 'Fontes Unicode incorporadas e código QR vetorial SVG a 300 DPI nítidos.',
      },
      {
        title: 'Cores de Marca Personalizadas',
        desc: 'Utilize qualquer código HEX da sua identidade visual sem restrições.',
      },
      {
        title: 'Distribuição Comercial sem Limites',
        desc: 'Entregue documentos aos seus clientes sem referências de terceiros.',
      },
    ],
    upgradeBtn: 'Atualizar para o Pro — 9 €/mês',
    connectingStripe: 'A ligar ao Stripe...',
    restorePrompt: 'Já é assinante? Restaurar acesso',
    restoreTitle: 'Restaurar Pro através do email de faturação',
    restorePlaceholder: 'voce@empresa.com',
    restoreBtn: 'Restaurar',
    cancelNotice: 'Faturação segura encriptada a 256 bits via Stripe • Cancele quando quiser',
    checkoutError: 'Não foi possível iniciar a sessão de pagamento. Tente novamente.',
    networkError: 'Erro de rede durante o checkout.',
    subRestored: 'Assinatura restaurada com sucesso!',
    subNotFound: 'Nenhuma assinatura ativa encontrada para este e-mail.',
  },
};

export const ProModal: React.FC<ProModalProps> = ({
  isOpen,
  onClose,
  onRestoreSubscription,
  interfaceLang,
}) => {
  const [isLoadingCheckout, setIsLoadingCheckout] = useState(false);
  const [showRestore, setShowRestore] = useState(false);
  const [restoreEmail, setRestoreEmail] = useState('');
  const [restoreStatus, setRestoreStatus] = useState<{ loading: boolean; error?: string; success?: string }>({
    loading: false,
  });

  if (!isOpen) return null;

  const t = UI_TRANSLATIONS[interfaceLang] || UI_TRANSLATIONS.en;
  const pI18n = PRO_MODAL_I18N[interfaceLang] || PRO_MODAL_I18N.en;

  const handleStartCheckout = async () => {
    setIsLoadingCheckout(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          returnUrl: `${window.location.origin}${window.location.pathname}`,
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || pI18n.checkoutError);
      }
    } catch (err: any) {
      alert(err.message || pI18n.networkError);
    } finally {
      setIsLoadingCheckout(false);
    }
  };

  const handleRestoreSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!restoreEmail || !restoreEmail.includes('@') || !onRestoreSubscription) return;

    setRestoreStatus({ loading: true });
    const result = await onRestoreSubscription(restoreEmail);

    if (result.success) {
      setRestoreStatus({ loading: false, success: result.message || pI18n.subRestored });
      setTimeout(() => {
        onClose();
      }, 1500);
    } else {
      setRestoreStatus({ loading: false, error: result.error || pI18n.subNotFound });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl p-6 relative overflow-hidden">
        {/* Glow Header Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-indigo-500 to-violet-600" />

        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
          <Sparkles className="w-4 h-4" />
          <span>LogoLoom Pro</span>
        </div>

        <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {pI18n.title}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          {pI18n.subtitle}
        </p>

        {/* Price Card */}
        <div className="my-5 p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700 flex items-center justify-between">
          <div>
            <span className="text-2xl font-black text-slate-900 dark:text-white">$9</span>
            <span className="text-xs text-slate-500 font-medium">{pI18n.perMonth}</span>
            <p className="text-[10px] text-slate-400">{pI18n.priceNotice}</p>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300">
            {pI18n.unlimitedPdfs}
          </span>
        </div>

        {/* Benefits List */}
        <div className="space-y-2.5 mb-6">
          {pI18n.benefits.map((b, idx) => (
            <div key={idx} className="flex items-start space-x-2.5">
              <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-2.5 h-2.5" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200">{b.title}</h5>
                <p className="text-[10.5px] text-slate-500 dark:text-slate-400 leading-tight">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button: Real Stripe Checkout */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={handleStartCheckout}
            disabled={isLoadingCheckout}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/25 transition-all flex items-center justify-center space-x-2 disabled:opacity-75"
          >
            {isLoadingCheckout ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{pI18n.connectingStripe}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>{pI18n.upgradeBtn}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>

          {/* Restore Access Link */}
          <div className="text-center pt-1 border-t border-slate-100 dark:border-slate-800/80">
            {!showRestore ? (
              <button
                type="button"
                onClick={() => setShowRestore(true)}
                className="text-[11px] text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center justify-center space-x-1 mx-auto font-medium"
              >
                <KeyRound className="w-3 h-3" />
                <span>{pI18n.restorePrompt}</span>
              </button>
            ) : (
              <form onSubmit={handleRestoreSubmit} className="space-y-2 mt-2 text-left">
                <label className="text-[10px] font-bold text-slate-600 dark:text-slate-300 block uppercase tracking-wider">
                  {pI18n.restoreTitle}
                </label>
                <div className="flex space-x-1.5">
                  <input
                    type="email"
                    required
                    value={restoreEmail}
                    onChange={(e) => setRestoreEmail(e.target.value)}
                    placeholder={pI18n.restorePlaceholder}
                    className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                  <button
                    type="submit"
                    disabled={restoreStatus.loading}
                    className="px-3 py-1.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold rounded-lg disabled:opacity-50"
                  >
                    {restoreStatus.loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : pI18n.restoreBtn}
                  </button>
                </div>
                {restoreStatus.error && (
                  <p className="text-[10.5px] text-rose-500 font-medium">{restoreStatus.error}</p>
                )}
                {restoreStatus.success && (
                  <p className="text-[10.5px] text-emerald-600 font-bold">{restoreStatus.success}</p>
                )}
              </form>
            )}
          </div>

          <p className="text-[10px] text-center text-slate-400 flex items-center justify-center space-x-1 pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>{pI18n.cancelNotice}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
