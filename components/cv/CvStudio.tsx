'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Check, ChevronLeft, Eye, X } from 'lucide-react';
import { useBrandKit, getDefaultCvContent } from '@/lib/use-brand-kit';
import { Header } from '@/components/Header';
import { CvEditor, type CvSection } from '@/components/CvEditor';
import { CvSheet } from '@/components/home/LiveCvHero';
import { DownloadButton } from '@/components/DownloadButton';
import type { CvCustomContent, CvLayout, InterfaceLang } from '@/types';

const CV_BACKUP_KEY = 'logoloom_cv_backup';

type StepId = 'you' | 'profile' | 'experience' | 'education' | 'skills' | 'design';

const STEP_SECTIONS: Record<StepId, CvSection[]> = {
  you: ['identity'],
  profile: ['summary'],
  experience: ['experience'],
  education: ['education'],
  skills: ['skills'],
  design: [],
};
const STEPS: StepId[] = ['you', 'profile', 'experience', 'education', 'skills', 'design'];

/** Accent colours chosen to print well and stay sober on a CV. */
const SWATCHES = [
  { hex: '#2340A8', name: { fr: 'Encre', en: 'Ink', de: 'Tinte', es: 'Tinta', it: 'Inchiostro', pt: 'Tinta' } },
  { hex: '#1F5C4A', name: { fr: 'Sapin', en: 'Pine', de: 'Tanne', es: 'Pino', it: 'Abete', pt: 'Pinho' } },
  { hex: '#7A2335', name: { fr: 'Bordeaux', en: 'Burgundy', de: 'Bordeaux', es: 'Burdeos', it: 'Bordeaux', pt: 'Bordô' } },
  { hex: '#155E75', name: { fr: 'Pétrole', en: 'Petrol', de: 'Petrol', es: 'Petróleo', it: 'Petrolio', pt: 'Petróleo' } },
  { hex: '#5B2A6E', name: { fr: 'Prune', en: 'Plum', de: 'Pflaume', es: 'Ciruela', it: 'Prugna', pt: 'Ameixa' } },
  { hex: '#383D39', name: { fr: 'Graphite', en: 'Graphite', de: 'Graphit', es: 'Grafito', it: 'Grafite', pt: 'Grafite' } },
] as const;

interface Copy {
  stepOf: (n: number, total: number) => string;
  steps: Record<StepId, { short: string; title: string; help: string }>;
  back: string;
  next: (label: string) => string;
  clear: string;
  clearConfirm: string;
  cancel: string;
  cleared: string;
  preview: string;
  closePreview: string;
  livePreview: string;
  layout: string;
  layouts: Record<CvLayout, { name: string; desc: string }>;
  color: string;
  paper: string;
  privacy: string;
  done: string;
}

const COPY: Record<InterfaceLang, Copy> = {
  fr: {
    stepOf: (n, t) => `Étape ${n} sur ${t}`,
    steps: {
      you: { short: 'Vous', title: 'Vos coordonnées', help: 'Elles apparaissent en haut du CV. Seuls le nom et un moyen de contact sont indispensables.' },
      profile: { short: 'Profil', title: 'Votre profil', help: 'Deux à quatre phrases : ce que vous savez faire et ce que vous cherchez.' },
      experience: { short: 'Expériences', title: 'Vos expériences', help: 'De la plus récente à la plus ancienne. Une ligne par mission, avec un chiffre quand vous en avez un.' },
      education: { short: 'Formation', title: 'Votre formation', help: 'Diplômes et formations, du plus récent au plus ancien.' },
      skills: { short: 'Compétences', title: 'Compétences et langues', help: 'Ce que vous maîtrisez, les langues que vous parlez et, si vous voulez, vos centres d’intérêt.' },
      design: { short: 'Mise en page', title: 'Mise en page et couleur', help: 'Choisissez l’allure du CV, puis téléchargez le PDF.' },
    },
    back: 'Précédent',
    next: (s) => `Suivant : ${s}`,
    clear: 'Partir d’un CV vide',
    clearConfirm: 'Effacer tout l’exemple ?',
    cancel: 'Annuler',
    cleared: 'Le CV est vide, à vous de jouer.',
    preview: 'Aperçu',
    closePreview: 'Fermer l’aperçu',
    livePreview: 'Aperçu en direct',
    layout: 'Mise en page',
    layouts: {
      sidebar: { name: 'Colonne latérale', desc: 'Contact, compétences et langues à gauche.' },
      classic: { name: 'Classique', desc: 'Une seule colonne, pour les parcours longs.' },
    },
    color: 'Couleur',
    paper: 'Format',
    privacy: 'Votre CV reste dans ce navigateur. Rien n’est envoyé sur nos serveurs.',
    done: 'C’est prêt.',
  },
  en: {
    stepOf: (n, t) => `Step ${n} of ${t}`,
    steps: {
      you: { short: 'You', title: 'Your contact details', help: 'They sit at the top of the CV. Only your name and one way to reach you are essential.' },
      profile: { short: 'Profile', title: 'Your profile', help: 'Two to four sentences: what you do well and what you are looking for.' },
      experience: { short: 'Experience', title: 'Your experience', help: 'Most recent first. One line per achievement, with a number when you have one.' },
      education: { short: 'Education', title: 'Your education', help: 'Degrees and training, most recent first.' },
      skills: { short: 'Skills', title: 'Skills and languages', help: 'What you are good at, the languages you speak and, if you like, your interests.' },
      design: { short: 'Layout', title: 'Layout and colour', help: 'Pick how the CV looks, then download the PDF.' },
    },
    back: 'Back',
    next: (s) => `Next: ${s}`,
    clear: 'Start from a blank CV',
    clearConfirm: 'Erase the whole example?',
    cancel: 'Cancel',
    cleared: 'The CV is blank. Over to you.',
    preview: 'Preview',
    closePreview: 'Close preview',
    livePreview: 'Live preview',
    layout: 'Layout',
    layouts: {
      sidebar: { name: 'Sidebar', desc: 'Contact, skills and languages on the left.' },
      classic: { name: 'Classic', desc: 'A single column, for long careers.' },
    },
    color: 'Colour',
    paper: 'Paper size',
    privacy: 'Your CV stays in this browser. Nothing is sent to our servers.',
    done: 'All set.',
  },
  de: {
    stepOf: (n, t) => `Schritt ${n} von ${t}`,
    steps: {
      you: { short: 'Sie', title: 'Ihre Kontaktdaten', help: 'Sie stehen oben im Lebenslauf. Nötig sind nur Name und eine Kontaktmöglichkeit.' },
      profile: { short: 'Profil', title: 'Ihr Profil', help: 'Zwei bis vier Sätze: was Sie können und was Sie suchen.' },
      experience: { short: 'Erfahrung', title: 'Ihre Berufserfahrung', help: 'Die neueste Station zuerst. Ein Punkt pro Zeile, gern mit einer Zahl.' },
      education: { short: 'Ausbildung', title: 'Ihre Ausbildung', help: 'Abschlüsse und Weiterbildungen, die neuesten zuerst.' },
      skills: { short: 'Kenntnisse', title: 'Kenntnisse und Sprachen', help: 'Was Sie beherrschen, welche Sprachen Sie sprechen und, wenn Sie möchten, Ihre Interessen.' },
      design: { short: 'Layout', title: 'Layout und Farbe', help: 'Wählen Sie das Aussehen und laden Sie das PDF herunter.' },
    },
    back: 'Zurück',
    next: (s) => `Weiter: ${s}`,
    clear: 'Mit leerem Lebenslauf beginnen',
    clearConfirm: 'Das ganze Beispiel löschen?',
    cancel: 'Abbrechen',
    cleared: 'Der Lebenslauf ist leer. Jetzt sind Sie dran.',
    preview: 'Vorschau',
    closePreview: 'Vorschau schließen',
    livePreview: 'Live-Vorschau',
    layout: 'Layout',
    layouts: {
      sidebar: { name: 'Seitenleiste', desc: 'Kontakt, Kenntnisse und Sprachen links.' },
      classic: { name: 'Klassisch', desc: 'Eine Spalte, für lange Laufbahnen.' },
    },
    color: 'Farbe',
    paper: 'Format',
    privacy: 'Ihr Lebenslauf bleibt in diesem Browser. Nichts wird an unsere Server gesendet.',
    done: 'Fertig.',
  },
  es: {
    stepOf: (n, t) => `Paso ${n} de ${t}`,
    steps: {
      you: { short: 'Tú', title: 'Tus datos de contacto', help: 'Aparecen arriba del CV. Solo son imprescindibles el nombre y una forma de contacto.' },
      profile: { short: 'Perfil', title: 'Tu perfil', help: 'De dos a cuatro frases: lo que sabes hacer y lo que buscas.' },
      experience: { short: 'Experiencia', title: 'Tu experiencia', help: 'De la más reciente a la más antigua. Una línea por logro, con una cifra si la tienes.' },
      education: { short: 'Formación', title: 'Tu formación', help: 'Títulos y cursos, del más reciente al más antiguo.' },
      skills: { short: 'Competencias', title: 'Competencias e idiomas', help: 'Lo que dominas, los idiomas que hablas y, si quieres, tus intereses.' },
      design: { short: 'Diseño', title: 'Diseño y color', help: 'Elige el aspecto del CV y descarga el PDF.' },
    },
    back: 'Anterior',
    next: (s) => `Siguiente: ${s}`,
    clear: 'Empezar con un CV vacío',
    clearConfirm: '¿Borrar todo el ejemplo?',
    cancel: 'Cancelar',
    cleared: 'El CV está vacío. Te toca.',
    preview: 'Vista previa',
    closePreview: 'Cerrar vista previa',
    livePreview: 'Vista previa en directo',
    layout: 'Diseño',
    layouts: {
      sidebar: { name: 'Columna lateral', desc: 'Contacto, competencias e idiomas a la izquierda.' },
      classic: { name: 'Clásico', desc: 'Una sola columna, para trayectorias largas.' },
    },
    color: 'Color',
    paper: 'Formato',
    privacy: 'Tu CV se queda en este navegador. No se envía nada a nuestros servidores.',
    done: 'Listo.',
  },
  it: {
    stepOf: (n, t) => `Passo ${n} di ${t}`,
    steps: {
      you: { short: 'Tu', title: 'I tuoi contatti', help: 'Compaiono in cima al CV. Bastano il nome e un modo per contattarti.' },
      profile: { short: 'Profilo', title: 'Il tuo profilo', help: 'Da due a quattro frasi: cosa sai fare e cosa cerchi.' },
      experience: { short: 'Esperienze', title: 'Le tue esperienze', help: 'Dalla più recente alla più vecchia. Una riga per attività, con un numero quando c’è.' },
      education: { short: 'Formazione', title: 'La tua formazione', help: 'Titoli e corsi, dal più recente.' },
      skills: { short: 'Competenze', title: 'Competenze e lingue', help: 'Ciò che sai fare, le lingue che parli e, se vuoi, i tuoi interessi.' },
      design: { short: 'Stile', title: 'Impaginazione e colore', help: 'Scegli l’aspetto del CV, poi scarica il PDF.' },
    },
    back: 'Indietro',
    next: (s) => `Avanti: ${s}`,
    clear: 'Parti da un CV vuoto',
    clearConfirm: 'Cancellare tutto l’esempio?',
    cancel: 'Annulla',
    cleared: 'Il CV è vuoto. Tocca a te.',
    preview: 'Anteprima',
    closePreview: 'Chiudi anteprima',
    livePreview: 'Anteprima dal vivo',
    layout: 'Impaginazione',
    layouts: {
      sidebar: { name: 'Colonna laterale', desc: 'Contatti, competenze e lingue a sinistra.' },
      classic: { name: 'Classico', desc: 'Una sola colonna, per percorsi lunghi.' },
    },
    color: 'Colore',
    paper: 'Formato',
    privacy: 'Il tuo CV resta in questo browser. Nulla viene inviato ai nostri server.',
    done: 'Fatto.',
  },
  pt: {
    stepOf: (n, t) => `Passo ${n} de ${t}`,
    steps: {
      you: { short: 'Você', title: 'Os seus contactos', help: 'Aparecem no topo do CV. Bastam o nome e uma forma de contacto.' },
      profile: { short: 'Perfil', title: 'O seu perfil', help: 'Duas a quatro frases: o que sabe fazer e o que procura.' },
      experience: { short: 'Experiência', title: 'A sua experiência', help: 'Da mais recente para a mais antiga. Uma linha por conquista, com um número se o tiver.' },
      education: { short: 'Formação', title: 'A sua formação', help: 'Cursos e diplomas, do mais recente.' },
      skills: { short: 'Competências', title: 'Competências e línguas', help: 'O que domina, as línguas que fala e, se quiser, os seus interesses.' },
      design: { short: 'Estilo', title: 'Layout e cor', help: 'Escolha o aspeto do CV e descarregue o PDF.' },
    },
    back: 'Anterior',
    next: (s) => `Seguinte: ${s}`,
    clear: 'Começar com um CV vazio',
    clearConfirm: 'Apagar todo o exemplo?',
    cancel: 'Cancelar',
    cleared: 'O CV está vazio. É consigo.',
    preview: 'Pré-visualizar',
    closePreview: 'Fechar pré-visualização',
    livePreview: 'Pré-visualização ao vivo',
    layout: 'Layout',
    layouts: {
      sidebar: { name: 'Coluna lateral', desc: 'Contacto, competências e línguas à esquerda.' },
      classic: { name: 'Clássico', desc: 'Uma só coluna, para percursos longos.' },
    },
    color: 'Cor',
    paper: 'Formato',
    privacy: 'O seu CV fica neste navegador. Nada é enviado para os nossos servidores.',
    done: 'Pronto.',
  },
};

function blankCv(layout: CvLayout): CvCustomContent {
  return {
    layout,
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    city: '',
    link: '',
    photoUrl: null,
    summary: '',
    experiences: [{ role: '', company: '', location: '', start: '', end: '', details: '' }],
    education: [{ degree: '', school: '', start: '', end: '', details: '' }],
    skills: [],
    languages: [{ name: '', level: '' }],
    interests: '',
  };
}

export function CvStudio({ initialLang, title }: { initialLang: InterfaceLang; title: string }) {
  const { brandKit, updateBrandKit, interfaceLang, setInterfaceLang, isLoaded } = useBrandKit(initialLang, 'cv');
  const c = COPY[interfaceLang] || COPY.en;
  const cv = brandKit.cvContent || getDefaultCvContent(brandKit.documentLang || 'en');

  const [step, setStep] = useState(0);
  const [confirmClear, setConfirmClear] = useState(false);
  const [justCleared, setJustCleared] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [loadedExample, setLoadedExample] = useState<string | null>(null);
  const formTop = useRef<HTMLDivElement>(null);
  const stepHeading = useRef<HTMLHeadingElement>(null);
  const prefilled = useRef(false);

  // The homepage hero sends ?name=…, the example pages send ?exemple=…
  useEffect(() => {
    if (!isLoaded || prefilled.current) return;
    prefilled.current = true;
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name')?.trim().slice(0, 60);
    const exampleSlug = params.get('exemple');
    const exampleSlugEn = params.get('example');
    // The old violet default looks off on a CV: move it to ink.
    const legacyColor = brandKit.brandColor?.toUpperCase() === '#4F46E5';
    if (name || legacyColor) {
      updateBrandKit({
        ...(name ? { cvContent: { ...cv, fullName: name } } : {}),
        ...(legacyColor ? { brandColor: SWATCHES[0].hex } : {}),
      });
    }
    if (exampleSlug) {
      import('@/lib/cv-examples/fr').then(({ getCvExample }) => {
        const ex = getCvExample(exampleSlug);
        if (!ex) return;
        // Keep the visitor's own CV aside so loading an example never loses work.
        try {
          localStorage.setItem(CV_BACKUP_KEY, JSON.stringify({ cvContent: cv, brandColor: brandKit.brandColor }));
        } catch {}
        updateBrandKit({ cvContent: { ...ex.cv }, brandColor: ex.color });
        setLoadedExample(ex.short);
      });
    }
    if (exampleSlugEn) {
      import('@/lib/cv-examples/en').then(({ getCvExampleEn }) => {
        const ex = getCvExampleEn(exampleSlugEn);
        if (!ex) return;
        try {
          localStorage.setItem(CV_BACKUP_KEY, JSON.stringify({ cvContent: cv, brandColor: brandKit.brandColor }));
        } catch {}
        updateBrandKit({ cvContent: { ...ex.cv }, brandColor: ex.color });
        setLoadedExample(ex.short);
      });
    }
    if (name || exampleSlug || exampleSlugEn) window.history.replaceState({}, '', window.location.pathname);
  }, [isLoaded]); // eslint-disable-line react-hooks/exhaustive-deps

  const restoreBackup = () => {
    try {
      const raw = localStorage.getItem(CV_BACKUP_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        updateBrandKit({ cvContent: saved.cvContent, brandColor: saved.brandColor });
      }
      localStorage.removeItem(CV_BACKUP_KEY);
    } catch {}
    setLoadedExample(null);
  };

  // Escape closes the mobile preview.
  useEffect(() => {
    if (!previewOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setPreviewOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [previewOpen]);

  const goTo = (i: number) => {
    setStep(i);
    setConfirmClear(false);
    setJustCleared(false);
    requestAnimationFrame(() => {
      const top = formTop.current;
      if (top && top.getBoundingClientRect().top < 0) top.scrollIntoView({ block: 'start' });
      stepHeading.current?.focus({ preventScroll: true });
    });
  };

  const id = STEPS[step];
  const s = c.steps[id];
  const isLast = step === STEPS.length - 1;

  const sheet = <CvSheet kit={brandKit} />;

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Header interfaceLang={interfaceLang} onLanguageChange={setInterfaceLang} />

      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        {/* Form */}
        <div className="bg-white dark:bg-slate-900 lg:border-r border-slate-200 dark:border-slate-800">
          <div ref={formTop} className="max-w-[640px] lg:ml-auto px-5 sm:px-8 lg:px-12 pt-8 sm:pt-10 pb-32 lg:pb-16 scroll-mt-16">
            <h1 className="text-sm font-bold text-slate-500 dark:text-slate-400">{title}</h1>

            {loadedExample && (
              <div role="status" className="mt-5 rounded-lg border border-ink-200 bg-ink-50 dark:bg-ink-950 dark:border-ink-800 px-4 py-3 text-sm text-slate-800 dark:text-slate-100 flex flex-wrap items-center gap-x-4 gap-y-1">
                <span>
                  Exemple « {loadedExample} » chargé. Remplacez les informations par les vôtres.
                </span>
                <button type="button" onClick={restoreBackup} className="font-bold text-ink-700 dark:text-ink-300 underline underline-offset-4">
                  Revenir à mon CV précédent
                </button>
              </div>
            )}

            {/* Stepper: the six steps are a real sequence, so they are numbered. */}
            <nav aria-label={c.stepOf(step + 1, STEPS.length)} className="mt-5">
              <ol className="grid grid-cols-6 gap-1.5">
                {STEPS.map((sid, i) => {
                  const active = i === step;
                  const past = i < step;
                  return (
                    <li key={sid}>
                      <button
                        type="button"
                        onClick={() => goTo(i)}
                        aria-current={active ? 'step' : undefined}
                        className="group w-full text-left rounded-sm"
                      >
                        <span
                          className={`block h-1 rounded-full transition-colors ${
                            active ? 'bg-ink-600' : past ? 'bg-ink-300 dark:bg-ink-700' : 'bg-slate-200 dark:bg-slate-700 group-hover:bg-slate-300'
                          }`}
                        />
                        <span
                          className={`mt-2 hidden sm:block text-[13px] truncate ${
                            active ? 'font-bold text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200'
                          }`}
                        >
                          {c.steps[sid].short}
                        </span>
                        <span className="sr-only sm:hidden">{c.steps[sid].short}</span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </nav>

            <div className="mt-8 sm:mt-10">
              <p className="text-sm text-slate-500 dark:text-slate-400">{c.stepOf(step + 1, STEPS.length)}</p>
              <h2
                ref={stepHeading}
                tabIndex={-1}
                className="mt-1 font-display text-3xl sm:text-[2.5rem] leading-tight font-semibold text-slate-900 dark:text-white focus:outline-none"
              >
                {s.title}
              </h2>
              <p className="mt-3 text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-[52ch]">{s.help}</p>
            </div>

            <div className="mt-8">
              {id === 'design' ? (
                <DesignStep c={c} lang={interfaceLang} brandKit={brandKit} cv={cv} onUpdate={updateBrandKit} />
              ) : (
                <CvEditor
                  brandKit={brandKit}
                  onUpdate={updateBrandKit}
                  interfaceLang={interfaceLang}
                  sections={STEP_SECTIONS[id]}
                  variant="roomy"
                />
              )}
            </div>

            {id === 'you' && interfaceLang === 'fr' && !loadedExample && (
              <p className="mt-8 text-sm text-slate-600 dark:text-slate-300">
                Besoin d’inspiration ?{' '}
                <a href="/fr/cv/exemples" className="font-bold text-ink-700 dark:text-ink-300 underline underline-offset-4">
                  Voir des exemples de CV par métier
                </a>
              </p>
            )}

            {id === 'you' && (
              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 text-sm">
                {justCleared ? (
                  <p role="status" className="text-slate-600 dark:text-slate-300">{c.cleared}</p>
                ) : confirmClear ? (
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-slate-700 dark:text-slate-200 font-bold">{c.clearConfirm}</span>
                    <button
                      type="button"
                      onClick={() => {
                        updateBrandKit({ cvContent: blankCv(cv.layout) });
                        setConfirmClear(false);
                        setJustCleared(true);
                      }}
                      className="h-9 px-3 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold"
                    >
                      {c.clear}
                    </button>
                    <button type="button" onClick={() => setConfirmClear(false)} className="h-9 px-3 rounded-lg text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold">
                      {c.cancel}
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setConfirmClear(true)}
                    className="text-slate-600 dark:text-slate-300 underline underline-offset-4 decoration-slate-300 hover:decoration-slate-600"
                  >
                    {c.clear}
                  </button>
                )}
              </div>
            )}

            {/* Step navigation */}
            <div className="mt-10 flex items-center gap-3">
              {step > 0 && (
                <button
                  type="button"
                  onClick={() => goTo(step - 1)}
                  className="h-12 px-4 inline-flex items-center gap-1 rounded-lg text-slate-700 dark:text-slate-200 font-bold hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                  {c.back}
                </button>
              )}
              <div className="flex-1" />
              {!isLast ? (
                <button
                  type="button"
                  onClick={() => goTo(step + 1)}
                  className="h-12 px-6 rounded-lg bg-ink-600 hover:bg-ink-700 text-white font-bold"
                >
                  {c.next(c.steps[STEPS[step + 1]].short)}
                </button>
              ) : (
                <div className="w-full max-w-[260px] hidden lg:block">
                  <DownloadButton brandKit={brandKit} activeTemplate="cv" interfaceLang={interfaceLang} compact />
                </div>
              )}
            </div>

            <p className="mt-10 text-sm text-slate-500 dark:text-slate-400">{c.privacy}</p>
          </div>
        </div>

        {/* Live sheet (desktop) */}
        <aside className="hidden lg:block" aria-label={c.livePreview}>
          <div className="sticky top-16 h-[calc(100vh-4rem)] flex flex-col px-10 xl:px-14 py-8">
            <div className="flex items-center justify-between gap-4 mb-5 max-w-[560px] w-full mx-auto">
              <p className="text-sm text-slate-600 dark:text-slate-400">{c.livePreview}</p>
              <div className="w-[220px]">
                <DownloadButton brandKit={brandKit} activeTemplate="cv" interfaceLang={interfaceLang} compact />
              </div>
            </div>
            <div className="flex-1 min-h-0 flex justify-center">
              {/* Width follows the available height so the whole page stays visible. */}
              <div className="h-full aspect-[793/1123] max-w-full">
                <div className="shadow-[0_1px_2px_rgba(27,29,33,0.08),0_12px_32px_-12px_rgba(27,29,33,0.25)] bg-white">{sheet}</div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Mobile action bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-[60] bg-white/95 dark:bg-slate-900/95 border-t border-slate-200 dark:border-slate-800 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] flex gap-2.5">
        <button
          type="button"
          onClick={() => setPreviewOpen(true)}
          className="h-12 px-4 shrink-0 inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 font-bold text-sm text-slate-800 dark:text-slate-100"
        >
          <Eye className="w-4 h-4" aria-hidden="true" />
          {c.preview}
        </button>
        <div className="flex-1 min-w-0">
          <DownloadButton brandKit={brandKit} activeTemplate="cv" interfaceLang={interfaceLang} compact />
        </div>
      </div>

      {/* Mobile preview */}
      {previewOpen && (
        <div role="dialog" aria-modal="true" aria-label={c.livePreview} className="lg:hidden fixed inset-0 z-50 bg-slate-100 dark:bg-slate-950 overflow-y-auto">
          <div className="sticky top-0 z-10 flex items-center justify-between px-4 h-14 bg-slate-100/95 dark:bg-slate-950/95 border-b border-slate-200 dark:border-slate-800">
            <p className="font-bold text-sm">{c.livePreview}</p>
            <button
              type="button"
              autoFocus
              onClick={() => setPreviewOpen(false)}
              className="w-11 h-11 -mr-2 inline-flex items-center justify-center rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800"
              aria-label={c.closePreview}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-4 pb-28">
            <div className="shadow-[0_8px_24px_-12px_rgba(27,29,33,0.35)] bg-white">{sheet}</div>
          </div>
        </div>
      )}
    </div>
  );
}

function DesignStep({
  c,
  lang,
  brandKit,
  cv,
  onUpdate,
}: {
  c: Copy;
  lang: InterfaceLang;
  brandKit: ReturnType<typeof useBrandKit>['brandKit'];
  cv: CvCustomContent;
  onUpdate: ReturnType<typeof useBrandKit>['updateBrandKit'];
}) {
  const color = brandKit.brandColor?.toUpperCase();
  return (
    <div className="space-y-10">
      <fieldset>
        <legend className="text-sm font-bold text-slate-700 dark:text-slate-200">{c.layout}</legend>
        <div className="mt-3 grid grid-cols-2 gap-4">
          {(['sidebar', 'classic'] as const).map((layout) => {
            const active = cv.layout === layout;
            return (
              <button
                key={layout}
                type="button"
                aria-pressed={active}
                onClick={() => onUpdate({ cvContent: { ...cv, layout } })}
                className={`text-left rounded-xl p-3 border-2 transition-colors ${
                  active ? 'border-ink-600 bg-ink-50 dark:bg-ink-950' : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <span className="block bg-white shadow-sm overflow-hidden">
                  <CvSheet kit={{ ...brandKit, cvContent: { ...cv, layout } }} />
                </span>
                <span className="mt-3 flex items-center gap-1.5 font-bold text-sm text-slate-900 dark:text-white">
                  {active && <Check className="w-4 h-4 text-ink-600" aria-hidden="true" />}
                  {c.layouts[layout].name}
                </span>
                <span className="block mt-0.5 text-sm text-slate-500 dark:text-slate-400 leading-snug">{c.layouts[layout].desc}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-sm font-bold text-slate-700 dark:text-slate-200">{c.color}</legend>
        <div className="mt-3 flex flex-wrap gap-3">
          {SWATCHES.map((sw) => {
            const active = color === sw.hex;
            const name = sw.name[lang] || sw.name.en;
            return (
              <button
                key={sw.hex}
                type="button"
                aria-pressed={active}
                aria-label={name}
                title={name}
                onClick={() => onUpdate({ brandColor: sw.hex })}
                className={`w-11 h-11 rounded-full inline-flex items-center justify-center ring-offset-2 ring-offset-white dark:ring-offset-slate-900 transition-shadow ${
                  active ? 'ring-2 ring-slate-900 dark:ring-white' : 'hover:ring-2 hover:ring-slate-300'
                }`}
                style={{ backgroundColor: sw.hex }}
              >
                {active && <Check className="w-5 h-5 text-white" aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-sm font-bold text-slate-700 dark:text-slate-200">{c.paper}</legend>
        <div className="mt-3 inline-flex rounded-lg border border-slate-300 dark:border-slate-700 p-1">
          {(['a4', 'letter'] as const).map((p) => (
            <button
              key={p}
              type="button"
              aria-pressed={brandKit.paperSize === p}
              onClick={() => onUpdate({ paperSize: p })}
              className={`h-9 px-4 rounded-md text-sm font-bold ${
                brandKit.paperSize === p ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              {p === 'a4' ? 'A4' : 'US Letter'}
            </button>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
