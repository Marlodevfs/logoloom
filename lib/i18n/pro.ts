import { InterfaceLang } from '@/types';

/**
 * Is the Pro subscription purchasable on this deployment?
 * Computed at build time in next.config.ts (Paddle keys present, or local dev).
 */
export const PRO_ENABLED = process.env.NEXT_PUBLIC_PRO_ENABLED === '1';

/** Display price per interface language (€ for European languages, $ for English). */
export const PRO_PRICE_LABEL: Record<InterfaceLang, string> = {
  en: '$5',
  fr: '5 €',
  de: '5 €',
  es: '5 €',
  it: '5 €',
  pt: '5 €',
};

/** Yearly Pro price label per interface language. */
export const PRO_YEARLY_PRICE_LABEL: Record<InterfaceLang, string> = {
  en: '$30',
  fr: '30 €',
  de: '30 €',
  es: '30 €',
  it: '30 €',
  pt: '30 €',
};

export const FREE_PRICE_LABEL: Record<InterfaceLang, string> = {
  en: '$0',
  fr: '0 €',
  de: '0 €',
  es: '0 €',
  it: '0 €',
  pt: '0 €',
};

export interface ProStrings {
  // Shared
  perMonth: string;
  comingSoon: string;
  comingSoonNote: string;
  connectingStripe: string;
  /** Secondary button for the yearly plan, e.g. "or 29 €/year" */
  orYearly: (price: string) => string;
  checkoutError: string;
  networkError: string;
  // Modal
  modalTitle: string;
  modalSubtitle: string;
  noCommitment: string;
  benefits: { title: string; desc: string }[];
  upgradeBtn: (price: string) => string;
  restorePrompt: string;
  restoreTitle: string;
  restorePlaceholder: string;
  restoreBtn: string;
  secureNotice: string;
  subRestored: string;
  subNotFound: string;
  seePricing: string;
  // Pricing page
  backToStudio: string;
  eyebrow: string;
  pageTitle: string;
  pageSubtitle: string;
  freeName: string;
  freeFor: string;
  forever: string;
  freeFeatures: string[];
  freeCredit: string;
  startFree: string;
  proName: string;
  proFor: string;
  proFeatures: string[];
  upgradePage: string;
  faqTitle: string;
  faqSubtitle: string;
  faqs: { q: string; a: string }[];
}

export const PRO_I18N: Record<InterfaceLang, ProStrings> = {
  en: {
    perMonth: '/ month',
    comingSoon: 'Coming soon',
    comingSoonNote: 'The Pro plan is not open yet. The free version stays 100% free.',
    connectingStripe: 'Opening secure checkout...',
    orYearly: (price) => `or ${price}/year (save 50%)`,
    checkoutError: 'Unable to start checkout. Please try again.',
    networkError: 'Network error during checkout.',
    modalTitle: 'Deliver 100% white-label documents',
    modalSubtitle: 'For freelancers, studios and businesses who send documents to clients.',
    noCommitment: 'Monthly, no commitment.',
    benefits: [
      { title: 'No LogoLoom credit', desc: 'Removes the footer credit and the LogoLoom QR code from every PDF.' },
      { title: 'Your brand only', desc: 'PDF metadata (author, creator) shows your business, not LogoLoom.' },
      { title: 'New templates included', desc: 'Every new template is available as soon as it ships.' },
    ],
    upgradeBtn: (price) => `Upgrade to Pro — ${price}/mo`,
    restorePrompt: 'Already subscribed? Restore access',
    restoreTitle: 'Restore Pro with your billing email',
    restorePlaceholder: 'you@company.com',
    restoreBtn: 'Restore',
    secureNotice: 'Secure payment by Paddle • No commitment',
    subRestored: 'Subscription restored!',
    subNotFound: 'No active subscription found for this email.',
    seePricing: 'See pricing details',
    backToStudio: 'Back to Studio',
    eyebrow: 'Simple pricing',
    pageTitle: 'Free for everyone. Pro when you need white-label.',
    pageSubtitle: 'Every template and every feature is free. Pro only removes the LogoLoom credit for documents you hand to clients.',
    freeName: 'Free',
    freeFor: 'For individuals, creators and freelancers.',
    forever: '/ forever',
    freeFeatures: [
      'All 12 print-ready templates',
      'Unlimited vector PDF downloads',
      'Your logo + automatic brand color',
      'Booking / website QR code',
    ],
    freeCredit: 'Small "Made with LogoLoom" footer credit',
    startFree: 'Start free (no account)',
    proName: 'Pro White-Label',
    proFor: 'For studios, agencies and businesses.',
    proFeatures: [
      'Everything in Free',
      'No LogoLoom credit or QR code on PDFs',
      'PDF metadata in your business name',
      'New templates as soon as they ship',
    ],
    upgradePage: 'Upgrade to Pro',
    faqTitle: 'Frequently asked questions',
    faqSubtitle: 'Everything you need to know about pricing.',
    faqs: [
      { q: 'Can I use the free version for client work?', a: 'Yes. The free version can be used for unlimited client documents. The only difference is the small "Made with LogoLoom" credit in the footer.' },
      { q: 'What exactly does Pro change?', a: 'Pro removes the LogoLoom footer credit and QR code from your PDFs and puts your business name in the PDF metadata. Templates and features are the same as the free version.' },
      { q: 'Can I cancel anytime?', a: 'Yes, there is no commitment. Write to support@logoloom.app and your subscription stops at the end of the current paid month.' },
      { q: 'Do you store my logo or documents?', a: 'No. Everything is generated in your browser. Your logo and document content never leave your device.' },
    ],
  },
  fr: {
    perMonth: '/ mois',
    comingSoon: 'Bientôt disponible',
    comingSoonNote: 'L’offre Pro n’est pas encore ouverte. La version gratuite reste 100 % gratuite.',
    connectingStripe: 'Ouverture du paiement sécurisé...',
    orYearly: (price) => `ou ${price}/an (50 % d’économie)`,
    checkoutError: 'Impossible d’ouvrir le paiement. Veuillez réessayer.',
    networkError: 'Erreur réseau pendant le paiement.',
    modalTitle: 'Des documents 100 % en marque blanche',
    modalSubtitle: 'Pour les indépendants, studios et entreprises qui envoient des documents à leurs clients.',
    noCommitment: 'Mensuel, sans engagement.',
    benefits: [
      { title: 'Plus aucune mention LogoLoom', desc: 'Supprime la mention en pied de page et le QR code LogoLoom de chaque PDF.' },
      { title: 'Uniquement votre marque', desc: 'Les métadonnées du PDF (auteur, créateur) affichent votre entreprise, pas LogoLoom.' },
      { title: 'Nouveaux modèles inclus', desc: 'Chaque nouveau modèle est disponible dès sa sortie.' },
    ],
    upgradeBtn: (price) => `Passer à Pro — ${price}/mois`,
    restorePrompt: 'Déjà abonné ? Restaurer l’accès',
    restoreTitle: 'Restaurer Pro avec votre email de facturation',
    restorePlaceholder: 'vous@entreprise.com',
    restoreBtn: 'Restaurer',
    secureNotice: 'Paiement sécurisé par Paddle • Sans engagement',
    subRestored: 'Abonnement Pro restauré !',
    subNotFound: 'Aucun abonnement actif trouvé pour cet email.',
    seePricing: 'Voir le détail des tarifs',
    backToStudio: 'Retour à l’éditeur',
    eyebrow: 'Tarifs simples',
    pageTitle: 'Gratuit pour tous. Pro quand vous voulez la marque blanche.',
    pageSubtitle: 'Tous les modèles et toutes les fonctions sont gratuits. Pro retire seulement la mention LogoLoom sur les documents que vous remettez à vos clients.',
    freeName: 'Gratuit',
    freeFor: 'Pour les particuliers, créateurs et indépendants.',
    forever: '/ pour toujours',
    freeFeatures: [
      'Les 12 modèles prêts à imprimer',
      'Téléchargements PDF vectoriels illimités',
      'Votre logo + couleur de marque automatique',
      'QR code vers votre site / prise de RDV',
    ],
    freeCredit: 'Petite mention « Créé avec LogoLoom » en pied de page',
    startFree: 'Commencer gratuitement (sans compte)',
    proName: 'Pro Marque Blanche',
    proFor: 'Pour les studios, agences et entreprises.',
    proFeatures: [
      'Tout ce qui est inclus dans Gratuit',
      'Aucune mention ni QR code LogoLoom',
      'Métadonnées PDF à votre nom',
      'Nouveaux modèles dès leur sortie',
    ],
    upgradePage: 'Passer à Pro',
    faqTitle: 'Questions fréquentes',
    faqSubtitle: 'Tout ce qu’il faut savoir sur les tarifs.',
    faqs: [
      { q: 'Puis-je utiliser la version gratuite pour mes clients ?', a: 'Oui. La version gratuite permet des documents clients illimités. La seule différence est la petite mention « Créé avec LogoLoom » en pied de page.' },
      { q: 'Qu’est-ce que Pro change exactement ?', a: 'Pro retire la mention et le QR code LogoLoom de vos PDF et met le nom de votre entreprise dans les métadonnées du PDF. Les modèles et fonctions sont les mêmes qu’en gratuit.' },
      { q: 'Puis-je résilier à tout moment ?', a: 'Oui, sans engagement. Écrivez à support@logoloom.app et l’abonnement s’arrête à la fin du mois en cours déjà payé.' },
      { q: 'Stockez-vous mon logo ou mes documents ?', a: 'Non. Tout est généré dans votre navigateur. Votre logo et le contenu de vos documents ne quittent jamais votre appareil.' },
    ],
  },
  de: {
    perMonth: '/ Monat',
    comingSoon: 'Demnächst verfügbar',
    comingSoonNote: 'Der Pro-Tarif ist noch nicht verfügbar. Die kostenlose Version bleibt 100 % kostenlos.',
    connectingStripe: 'Sichere Zahlung wird geöffnet...',
    orYearly: (price) => `oder ${price}/Jahr (50 % sparen)`,
    checkoutError: 'Zahlung konnte nicht gestartet werden. Bitte erneut versuchen.',
    networkError: 'Netzwerkfehler bei der Zahlung.',
    modalTitle: '100 % White-Label-Dokumente',
    modalSubtitle: 'Für Freelancer, Studios und Unternehmen, die Dokumente an Kunden senden.',
    noCommitment: 'Monatlich, ohne Bindung.',
    benefits: [
      { title: 'Kein LogoLoom-Hinweis', desc: 'Entfernt den Fußzeilen-Hinweis und den LogoLoom-QR-Code aus jedem PDF.' },
      { title: 'Nur Ihre Marke', desc: 'PDF-Metadaten (Autor, Ersteller) zeigen Ihr Unternehmen statt LogoLoom.' },
      { title: 'Neue Vorlagen inklusive', desc: 'Jede neue Vorlage ist sofort nach Erscheinen verfügbar.' },
    ],
    upgradeBtn: (price) => `Auf Pro upgraden — ${price}/Monat`,
    restorePrompt: 'Bereits abonniert? Zugriff wiederherstellen',
    restoreTitle: 'Pro mit Ihrer Rechnungs-E-Mail wiederherstellen',
    restorePlaceholder: 'sie@unternehmen.de',
    restoreBtn: 'Wiederherstellen',
    secureNotice: 'Sichere Zahlung über Paddle • Ohne Bindung',
    subRestored: 'Abo wiederhergestellt!',
    subNotFound: 'Kein aktives Abo für diese E-Mail gefunden.',
    seePricing: 'Preisdetails ansehen',
    backToStudio: 'Zurück zum Editor',
    eyebrow: 'Einfache Preise',
    pageTitle: 'Kostenlos für alle. Pro, wenn Sie White-Label brauchen.',
    pageSubtitle: 'Alle Vorlagen und Funktionen sind kostenlos. Pro entfernt nur den LogoLoom-Hinweis auf Dokumenten für Ihre Kunden.',
    freeName: 'Kostenlos',
    freeFor: 'Für Privatpersonen, Kreative und Freelancer.',
    forever: '/ für immer',
    freeFeatures: [
      'Alle 12 druckfertigen Vorlagen',
      'Unbegrenzte Vektor-PDF-Downloads',
      'Ihr Logo + automatische Markenfarbe',
      'QR-Code zu Website / Terminbuchung',
    ],
    freeCredit: 'Kleiner Hinweis „Erstellt mit LogoLoom“ in der Fußzeile',
    startFree: 'Kostenlos starten (ohne Konto)',
    proName: 'Pro White-Label',
    proFor: 'Für Studios, Agenturen und Unternehmen.',
    proFeatures: [
      'Alles aus Kostenlos',
      'Kein LogoLoom-Hinweis oder QR-Code',
      'PDF-Metadaten mit Ihrem Firmennamen',
      'Neue Vorlagen sofort nach Erscheinen',
    ],
    upgradePage: 'Auf Pro upgraden',
    faqTitle: 'Häufige Fragen',
    faqSubtitle: 'Alles Wissenswerte zu den Preisen.',
    faqs: [
      { q: 'Darf ich die kostenlose Version für Kunden nutzen?', a: 'Ja. Die kostenlose Version erlaubt unbegrenzte Kundendokumente. Der einzige Unterschied ist der kleine Hinweis „Erstellt mit LogoLoom“ in der Fußzeile.' },
      { q: 'Was ändert Pro genau?', a: 'Pro entfernt den LogoLoom-Hinweis und QR-Code aus Ihren PDFs und setzt Ihren Firmennamen in die PDF-Metadaten. Vorlagen und Funktionen sind identisch mit der kostenlosen Version.' },
      { q: 'Kann ich jederzeit kündigen?', a: 'Ja, ohne Bindung. Schreiben Sie an support@logoloom.app – das Abo endet zum Ende des bereits bezahlten Monats.' },
      { q: 'Speichern Sie mein Logo oder meine Dokumente?', a: 'Nein. Alles wird in Ihrem Browser erzeugt. Logo und Inhalte verlassen nie Ihr Gerät.' },
    ],
  },
  es: {
    perMonth: '/ mes',
    comingSoon: 'Próximamente',
    comingSoonNote: 'El plan Pro aún no está disponible. La versión gratuita sigue siendo 100 % gratuita.',
    connectingStripe: 'Abriendo el pago seguro...',
    orYearly: (price) => `o ${price}/año (ahorra un 50 %)`,
    checkoutError: 'No se pudo iniciar el pago. Inténtelo de nuevo.',
    networkError: 'Error de red durante el pago.',
    modalTitle: 'Documentos 100 % marca blanca',
    modalSubtitle: 'Para freelancers, estudios y empresas que envían documentos a sus clientes.',
    noCommitment: 'Mensual, sin permanencia.',
    benefits: [
      { title: 'Sin mención de LogoLoom', desc: 'Elimina la mención del pie de página y el código QR de LogoLoom de cada PDF.' },
      { title: 'Solo tu marca', desc: 'Los metadatos del PDF (autor, creador) muestran tu empresa, no LogoLoom.' },
      { title: 'Nuevas plantillas incluidas', desc: 'Cada nueva plantilla está disponible en cuanto se publica.' },
    ],
    upgradeBtn: (price) => `Pasar a Pro — ${price}/mes`,
    restorePrompt: '¿Ya estás suscrito? Restaurar acceso',
    restoreTitle: 'Restaurar Pro con tu correo de facturación',
    restorePlaceholder: 'tu@empresa.com',
    restoreBtn: 'Restaurar',
    secureNotice: 'Pago seguro con Paddle • Sin permanencia',
    subRestored: '¡Suscripción restaurada!',
    subNotFound: 'No se encontró ninguna suscripción activa para este correo.',
    seePricing: 'Ver detalles de precios',
    backToStudio: 'Volver al editor',
    eyebrow: 'Precios simples',
    pageTitle: 'Gratis para todos. Pro cuando necesites marca blanca.',
    pageSubtitle: 'Todas las plantillas y funciones son gratuitas. Pro solo elimina la mención de LogoLoom en los documentos para tus clientes.',
    freeName: 'Gratis',
    freeFor: 'Para particulares, creadores y freelancers.',
    forever: '/ para siempre',
    freeFeatures: [
      'Las 12 plantillas listas para imprimir',
      'Descargas ilimitadas de PDF vectorial',
      'Tu logo + color de marca automático',
      'Código QR a tu web / reservas',
    ],
    freeCredit: 'Pequeña mención «Hecho con LogoLoom» en el pie de página',
    startFree: 'Empezar gratis (sin cuenta)',
    proName: 'Pro Marca Blanca',
    proFor: 'Para estudios, agencias y empresas.',
    proFeatures: [
      'Todo lo incluido en Gratis',
      'Sin mención ni código QR de LogoLoom',
      'Metadatos del PDF a tu nombre',
      'Nuevas plantillas en cuanto salen',
    ],
    upgradePage: 'Pasar a Pro',
    faqTitle: 'Preguntas frecuentes',
    faqSubtitle: 'Todo lo que necesitas saber sobre los precios.',
    faqs: [
      { q: '¿Puedo usar la versión gratuita para clientes?', a: 'Sí. La versión gratuita permite documentos ilimitados para clientes. La única diferencia es la pequeña mención «Hecho con LogoLoom» en el pie de página.' },
      { q: '¿Qué cambia exactamente con Pro?', a: 'Pro elimina la mención y el código QR de LogoLoom de tus PDF y pone el nombre de tu empresa en los metadatos. Las plantillas y funciones son las mismas que en la versión gratuita.' },
      { q: '¿Puedo cancelar en cualquier momento?', a: 'Sí, sin permanencia. Escribe a support@logoloom.app y la suscripción termina al final del mes ya pagado.' },
      { q: '¿Guardáis mi logo o mis documentos?', a: 'No. Todo se genera en tu navegador. Tu logo y tus contenidos nunca salen de tu dispositivo.' },
    ],
  },
  it: {
    perMonth: '/ mese',
    comingSoon: 'Presto disponibile',
    comingSoonNote: 'Il piano Pro non è ancora aperto. La versione gratuita resta 100% gratuita.',
    connectingStripe: 'Apertura del pagamento sicuro...',
    orYearly: (price) => `oppure ${price}/anno (risparmi il 50%)`,
    checkoutError: 'Impossibile avviare il pagamento. Riprova.',
    networkError: 'Errore di rete durante il pagamento.',
    modalTitle: 'Documenti 100% white-label',
    modalSubtitle: 'Per freelance, studi e aziende che inviano documenti ai clienti.',
    noCommitment: 'Mensile, senza vincoli.',
    benefits: [
      { title: 'Nessuna menzione LogoLoom', desc: 'Rimuove la menzione nel piè di pagina e il codice QR LogoLoom da ogni PDF.' },
      { title: 'Solo il tuo marchio', desc: 'I metadati del PDF (autore, creatore) mostrano la tua azienda, non LogoLoom.' },
      { title: 'Nuovi modelli inclusi', desc: 'Ogni nuovo modello è disponibile appena pubblicato.' },
    ],
    upgradeBtn: (price) => `Passa a Pro — ${price}/mese`,
    restorePrompt: 'Già abbonato? Ripristina l’accesso',
    restoreTitle: 'Ripristina Pro con la tua email di fatturazione',
    restorePlaceholder: 'tu@azienda.it',
    restoreBtn: 'Ripristina',
    secureNotice: 'Pagamento sicuro con Paddle • Senza vincoli',
    subRestored: 'Abbonamento ripristinato!',
    subNotFound: 'Nessun abbonamento attivo trovato per questa email.',
    seePricing: 'Vedi i dettagli dei prezzi',
    backToStudio: 'Torna all’editor',
    eyebrow: 'Prezzi semplici',
    pageTitle: 'Gratis per tutti. Pro quando ti serve il white-label.',
    pageSubtitle: 'Tutti i modelli e tutte le funzioni sono gratuiti. Pro rimuove solo la menzione LogoLoom dai documenti per i tuoi clienti.',
    freeName: 'Gratis',
    freeFor: 'Per privati, creativi e freelance.',
    forever: '/ per sempre',
    freeFeatures: [
      'Tutti i 12 modelli pronti per la stampa',
      'Download illimitati di PDF vettoriali',
      'Il tuo logo + colore del marchio automatico',
      'Codice QR verso sito / prenotazioni',
    ],
    freeCredit: 'Piccola menzione «Creato con LogoLoom» nel piè di pagina',
    startFree: 'Inizia gratis (senza account)',
    proName: 'Pro White-Label',
    proFor: 'Per studi, agenzie e aziende.',
    proFeatures: [
      'Tutto ciò che è incluso in Gratis',
      'Nessuna menzione né QR LogoLoom',
      'Metadati PDF a nome della tua azienda',
      'Nuovi modelli appena pubblicati',
    ],
    upgradePage: 'Passa a Pro',
    faqTitle: 'Domande frequenti',
    faqSubtitle: 'Tutto quello che devi sapere sui prezzi.',
    faqs: [
      { q: 'Posso usare la versione gratuita per i clienti?', a: 'Sì. La versione gratuita consente documenti illimitati per i clienti. L’unica differenza è la piccola menzione «Creato con LogoLoom» nel piè di pagina.' },
      { q: 'Cosa cambia esattamente con Pro?', a: 'Pro rimuove la menzione e il codice QR LogoLoom dai tuoi PDF e inserisce il nome della tua azienda nei metadati. Modelli e funzioni sono gli stessi della versione gratuita.' },
      { q: 'Posso disdire in qualsiasi momento?', a: 'Sì, senza vincoli. Scrivi a support@logoloom.app e l’abbonamento termina alla fine del mese già pagato.' },
      { q: 'Conservate il mio logo o i miei documenti?', a: 'No. Tutto viene generato nel tuo browser. Logo e contenuti non lasciano mai il tuo dispositivo.' },
    ],
  },
  pt: {
    perMonth: '/ mês',
    comingSoon: 'Em breve',
    comingSoonNote: 'O plano Pro ainda não está disponível. A versão gratuita continua 100% gratuita.',
    connectingStripe: 'A abrir o pagamento seguro...',
    orYearly: (price) => `ou ${price}/ano (poupe 50%)`,
    checkoutError: 'Não foi possível iniciar o pagamento. Tente novamente.',
    networkError: 'Erro de rede durante o pagamento.',
    modalTitle: 'Documentos 100% marca branca',
    modalSubtitle: 'Para freelancers, estúdios e empresas que enviam documentos a clientes.',
    noCommitment: 'Mensal, sem fidelização.',
    benefits: [
      { title: 'Sem menção LogoLoom', desc: 'Remove a menção no rodapé e o código QR LogoLoom de cada PDF.' },
      { title: 'Apenas a sua marca', desc: 'Os metadados do PDF (autor, criador) mostram a sua empresa, não a LogoLoom.' },
      { title: 'Novos modelos incluídos', desc: 'Cada novo modelo fica disponível assim que é lançado.' },
    ],
    upgradeBtn: (price) => `Mudar para Pro — ${price}/mês`,
    restorePrompt: 'Já é assinante? Restaurar acesso',
    restoreTitle: 'Restaurar Pro com o email de faturação',
    restorePlaceholder: 'voce@empresa.com',
    restoreBtn: 'Restaurar',
    secureNotice: 'Pagamento seguro pela Paddle • Sem fidelização',
    subRestored: 'Assinatura restaurada!',
    subNotFound: 'Nenhuma assinatura ativa encontrada para este email.',
    seePricing: 'Ver detalhes dos preços',
    backToStudio: 'Voltar ao editor',
    eyebrow: 'Preços simples',
    pageTitle: 'Grátis para todos. Pro quando precisar de marca branca.',
    pageSubtitle: 'Todos os modelos e funções são gratuitos. O Pro apenas remove a menção LogoLoom dos documentos que entrega aos clientes.',
    freeName: 'Grátis',
    freeFor: 'Para particulares, criadores e freelancers.',
    forever: '/ para sempre',
    freeFeatures: [
      'Os 12 modelos prontos a imprimir',
      'Downloads ilimitados de PDF vetorial',
      'O seu logo + cor da marca automática',
      'Código QR para o seu site / marcações',
    ],
    freeCredit: 'Pequena menção «Feito com LogoLoom» no rodapé',
    startFree: 'Começar grátis (sem conta)',
    proName: 'Pro Marca Branca',
    proFor: 'Para estúdios, agências e empresas.',
    proFeatures: [
      'Tudo o que está incluído no Grátis',
      'Sem menção nem QR LogoLoom',
      'Metadados do PDF com o nome da empresa',
      'Novos modelos assim que saem',
    ],
    upgradePage: 'Mudar para Pro',
    faqTitle: 'Perguntas frequentes',
    faqSubtitle: 'Tudo o que precisa de saber sobre os preços.',
    faqs: [
      { q: 'Posso usar a versão gratuita para clientes?', a: 'Sim. A versão gratuita permite documentos ilimitados para clientes. A única diferença é a pequena menção «Feito com LogoLoom» no rodapé.' },
      { q: 'O que muda exatamente com o Pro?', a: 'O Pro remove a menção e o código QR LogoLoom dos seus PDF e coloca o nome da sua empresa nos metadados. Os modelos e funções são os mesmos da versão gratuita.' },
      { q: 'Posso cancelar a qualquer momento?', a: 'Sim, sem fidelização. Escreva para support@logoloom.app e a assinatura termina no fim do mês já pago.' },
      { q: 'Guardam o meu logo ou documentos?', a: 'Não. Tudo é gerado no seu navegador. O logo e os conteúdos nunca saem do seu dispositivo.' },
    ],
  },
};
