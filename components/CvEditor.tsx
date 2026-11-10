'use client';

import React, { useRef, useState } from 'react';
import { ArrowDown, ArrowUp, Camera, Plus, Trash2 } from 'lucide-react';
import {
  BrandKit,
  CvCustomContent,
  CvEducation,
  CvExperience,
  CvLanguage,
  InterfaceLang,
} from '@/types';
import { getDefaultCvContent } from '@/lib/use-brand-kit';

export type CvSection = 'layout' | 'identity' | 'summary' | 'experience' | 'education' | 'skills';

interface CvEditorProps {
  brandKit: BrandKit;
  onUpdate: (updates: Partial<BrandKit>) => void;
  interfaceLang: InterfaceLang;
  /** Which blocks to render (default: all, in order). */
  sections?: CvSection[];
  /** 'roomy' is the full-page CV editor; 'compact' fits the 410px studio panel. */
  variant?: 'compact' | 'roomy';
}

type L = {
  layout: string;
  layoutSidebar: string;
  layoutClassic: string;
  identity: string;
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  city: string;
  link: string;
  photo: string;
  addPhoto: string;
  removePhoto: string;
  photoError: string;
  summary: string;
  experiences: string;
  addExperience: string;
  role: string;
  company: string;
  location: string;
  start: string;
  end: string;
  details: string;
  detailsHint: string;
  education: string;
  addEducation: string;
  degree: string;
  school: string;
  skills: string;
  skillsHint: string;
  languages: string;
  addLanguage: string;
  language: string;
  level: string;
  interests: string;
  remove: string;
  moveUp: string;
  moveDown: string;
  privacy: string;
};

const LABELS: Record<InterfaceLang, L> = {
  fr: {
    layout: 'Mise en page',
    layoutSidebar: 'Colonne latérale',
    layoutClassic: 'Classique',
    identity: 'Vos informations',
    fullName: 'Prénom et nom',
    jobTitle: 'Poste recherché / titre',
    email: 'E-mail',
    phone: 'Téléphone',
    city: 'Ville',
    link: 'LinkedIn ou site web',
    photo: 'Photo (facultative)',
    addPhoto: 'Ajouter une photo',
    removePhoto: 'Retirer',
    photoError: 'Image illisible. Essayez un JPG ou un PNG.',
    summary: 'Profil (2 à 4 phrases)',
    experiences: 'Expériences',
    addExperience: 'Ajouter une expérience',
    role: 'Poste',
    company: 'Entreprise',
    location: 'Lieu',
    start: 'Début',
    end: 'Fin',
    details: 'Missions et réussites',
    detailsHint: 'Une ligne par point',
    education: 'Formation',
    addEducation: 'Ajouter une formation',
    degree: 'Diplôme',
    school: 'École / université',
    skills: 'Compétences',
    skillsHint: 'Séparées par des virgules',
    languages: 'Langues',
    addLanguage: 'Ajouter une langue',
    language: 'Langue',
    level: 'Niveau',
    interests: 'Centres d’intérêt',
    remove: 'Supprimer',
    moveUp: 'Monter',
    moveDown: 'Descendre',
    privacy: 'Votre CV reste dans votre navigateur : rien n’est envoyé sur nos serveurs.',
  },
  en: {
    layout: 'Layout',
    layoutSidebar: 'Sidebar',
    layoutClassic: 'Classic',
    identity: 'Your details',
    fullName: 'Full name',
    jobTitle: 'Job title',
    email: 'Email',
    phone: 'Phone',
    city: 'City',
    link: 'LinkedIn or website',
    photo: 'Photo (optional)',
    addPhoto: 'Add a photo',
    removePhoto: 'Remove',
    photoError: 'Could not read this image. Try a JPG or PNG.',
    summary: 'Profile (2 to 4 sentences)',
    experiences: 'Experience',
    addExperience: 'Add experience',
    role: 'Role',
    company: 'Company',
    location: 'Location',
    start: 'Start',
    end: 'End',
    details: 'Achievements',
    detailsHint: 'One per line',
    education: 'Education',
    addEducation: 'Add education',
    degree: 'Degree',
    school: 'School / university',
    skills: 'Skills',
    skillsHint: 'Comma-separated',
    languages: 'Languages',
    addLanguage: 'Add language',
    language: 'Language',
    level: 'Level',
    interests: 'Interests',
    remove: 'Remove',
    moveUp: 'Move up',
    moveDown: 'Move down',
    privacy: 'Your CV stays in your browser: nothing is sent to our servers.',
  },
  de: {
    layout: 'Layout',
    layoutSidebar: 'Seitenleiste',
    layoutClassic: 'Klassisch',
    identity: 'Ihre Angaben',
    fullName: 'Vor- und Nachname',
    jobTitle: 'Berufsbezeichnung',
    email: 'E-Mail',
    phone: 'Telefon',
    city: 'Ort',
    link: 'LinkedIn oder Website',
    photo: 'Foto (optional)',
    addPhoto: 'Foto hinzufügen',
    removePhoto: 'Entfernen',
    photoError: 'Bild nicht lesbar. Bitte JPG oder PNG verwenden.',
    summary: 'Profil (2 bis 4 Sätze)',
    experiences: 'Berufserfahrung',
    addExperience: 'Station hinzufügen',
    role: 'Position',
    company: 'Unternehmen',
    location: 'Ort',
    start: 'Beginn',
    end: 'Ende',
    details: 'Aufgaben und Erfolge',
    detailsHint: 'Ein Punkt pro Zeile',
    education: 'Ausbildung',
    addEducation: 'Ausbildung hinzufügen',
    degree: 'Abschluss',
    school: 'Schule / Hochschule',
    skills: 'Kenntnisse',
    skillsHint: 'Durch Kommas getrennt',
    languages: 'Sprachen',
    addLanguage: 'Sprache hinzufügen',
    language: 'Sprache',
    level: 'Niveau',
    interests: 'Interessen',
    remove: 'Entfernen',
    moveUp: 'Nach oben',
    moveDown: 'Nach unten',
    privacy: 'Ihr Lebenslauf bleibt in Ihrem Browser: Es wird nichts an unsere Server gesendet.',
  },
  es: {
    layout: 'Diseño',
    layoutSidebar: 'Columna lateral',
    layoutClassic: 'Clásico',
    identity: 'Tus datos',
    fullName: 'Nombre y apellidos',
    jobTitle: 'Puesto / título',
    email: 'Correo',
    phone: 'Teléfono',
    city: 'Ciudad',
    link: 'LinkedIn o web',
    photo: 'Foto (opcional)',
    addPhoto: 'Añadir foto',
    removePhoto: 'Quitar',
    photoError: 'No se pudo leer la imagen. Prueba con JPG o PNG.',
    summary: 'Perfil (2 a 4 frases)',
    experiences: 'Experiencia',
    addExperience: 'Añadir experiencia',
    role: 'Puesto',
    company: 'Empresa',
    location: 'Lugar',
    start: 'Inicio',
    end: 'Fin',
    details: 'Funciones y logros',
    detailsHint: 'Uno por línea',
    education: 'Formación',
    addEducation: 'Añadir formación',
    degree: 'Título',
    school: 'Centro / universidad',
    skills: 'Competencias',
    skillsHint: 'Separadas por comas',
    languages: 'Idiomas',
    addLanguage: 'Añadir idioma',
    language: 'Idioma',
    level: 'Nivel',
    interests: 'Intereses',
    remove: 'Eliminar',
    moveUp: 'Subir',
    moveDown: 'Bajar',
    privacy: 'Tu CV se queda en tu navegador: no se envía nada a nuestros servidores.',
  },
  it: {
    layout: 'Impaginazione',
    layoutSidebar: 'Colonna laterale',
    layoutClassic: 'Classico',
    identity: 'I tuoi dati',
    fullName: 'Nome e cognome',
    jobTitle: 'Ruolo / titolo',
    email: 'Email',
    phone: 'Telefono',
    city: 'Città',
    link: 'LinkedIn o sito web',
    photo: 'Foto (facoltativa)',
    addPhoto: 'Aggiungi foto',
    removePhoto: 'Rimuovi',
    photoError: 'Immagine non leggibile. Prova con JPG o PNG.',
    summary: 'Profilo (2-4 frasi)',
    experiences: 'Esperienze',
    addExperience: 'Aggiungi esperienza',
    role: 'Ruolo',
    company: 'Azienda',
    location: 'Luogo',
    start: 'Inizio',
    end: 'Fine',
    details: 'Attività e risultati',
    detailsHint: 'Uno per riga',
    education: 'Formazione',
    addEducation: 'Aggiungi formazione',
    degree: 'Titolo di studio',
    school: 'Scuola / università',
    skills: 'Competenze',
    skillsHint: 'Separate da virgole',
    languages: 'Lingue',
    addLanguage: 'Aggiungi lingua',
    language: 'Lingua',
    level: 'Livello',
    interests: 'Interessi',
    remove: 'Rimuovi',
    moveUp: 'Su',
    moveDown: 'Giù',
    privacy: 'Il tuo CV resta nel browser: nulla viene inviato ai nostri server.',
  },
  pt: {
    layout: 'Layout',
    layoutSidebar: 'Coluna lateral',
    layoutClassic: 'Clássico',
    identity: 'Os seus dados',
    fullName: 'Nome completo',
    jobTitle: 'Cargo / título',
    email: 'Email',
    phone: 'Telefone',
    city: 'Cidade',
    link: 'LinkedIn ou site',
    photo: 'Foto (opcional)',
    addPhoto: 'Adicionar foto',
    removePhoto: 'Remover',
    photoError: 'Não foi possível ler a imagem. Experimente JPG ou PNG.',
    summary: 'Perfil (2 a 4 frases)',
    experiences: 'Experiência',
    addExperience: 'Adicionar experiência',
    role: 'Cargo',
    company: 'Empresa',
    location: 'Local',
    start: 'Início',
    end: 'Fim',
    details: 'Funções e conquistas',
    detailsHint: 'Uma por linha',
    education: 'Formação',
    addEducation: 'Adicionar formação',
    degree: 'Curso',
    school: 'Escola / universidade',
    skills: 'Competências',
    skillsHint: 'Separadas por vírgulas',
    languages: 'Línguas',
    addLanguage: 'Adicionar língua',
    language: 'Língua',
    level: 'Nível',
    interests: 'Interesses',
    remove: 'Remover',
    moveUp: 'Subir',
    moveDown: 'Descer',
    privacy: 'O seu CV fica no seu navegador: nada é enviado para os nossos servidores.',
  },
};

const MAX_EXPERIENCES = 6;
const MAX_EDUCATION = 4;
const MAX_LANGUAGES = 5;

const STYLES = {
  compact: {
    input:
      'w-full px-2 py-1 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100',
    label: 'block text-[10px] text-slate-500 dark:text-slate-400',
    sectionTitle: 'text-[11px] font-bold text-slate-700 dark:text-slate-300',
    card: 'p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 space-y-1.5',
    addBtn: 'inline-flex items-center space-x-1 text-[10.5px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline',
    grid: 'grid grid-cols-2 gap-1.5',
    stack: 'space-y-1.5',
    gap: 'space-y-4',
    icon: 'w-3 h-3',
    hint: 'text-[10px]',
  },
  roomy: {
    input:
      'mt-1.5 w-full h-11 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-[15px] font-normal text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-ink-600 focus:ring-2 focus:ring-ink-100 dark:focus:ring-ink-900',
    label: 'block text-sm font-bold text-slate-700 dark:text-slate-200',
    sectionTitle: 'font-display text-xl font-semibold text-slate-900 dark:text-white',
    card: 'p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4',
    addBtn:
      'inline-flex items-center gap-1.5 h-10 px-3 rounded-lg border border-dashed border-slate-300 dark:border-slate-700 text-sm font-bold text-ink-700 dark:text-ink-300 hover:border-ink-400 hover:bg-ink-50 dark:hover:bg-ink-950',
    grid: 'grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4',
    stack: 'space-y-4',
    gap: 'space-y-8',
    icon: 'w-4 h-4',
    hint: 'text-sm',
  },
} as const;

/** Resizes a picked photo to a small square JPEG so it fits in local storage. */
function resizePhoto(file: File, size = 320): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const side = Math.min(img.width, img.height);
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject(new Error('no canvas'));
      // Center crop to a square.
      ctx.drawImage(img, (img.width - side) / 2, (img.height - side) / 2, side, side, 0, 0, size, size);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL('image/jpeg', 0.85));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('unreadable image'));
    };
    img.src = url;
  });
}

function move<T>(list: T[], idx: number, dir: -1 | 1): T[] {
  const next = [...list];
  const target = idx + dir;
  if (target < 0 || target >= next.length) return next;
  [next[idx], next[target]] = [next[target], next[idx]];
  return next;
}

const ItemTools: React.FC<{
  l: L;
  idx: number;
  count: number;
  onMove: (dir: -1 | 1) => void;
  onRemove: () => void;
  roomy?: boolean;
  title?: string;
}> = ({ l, idx, count, onMove, onRemove, roomy, title }) => {
  const btn = roomy
    ? 'w-9 h-9 inline-flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent'
    : 'p-1 text-slate-400 hover:text-slate-600 disabled:opacity-30';
  const ic = roomy ? 'w-4 h-4' : 'w-3 h-3';
  return (
    <div className={`flex items-center ${title ? 'justify-between' : 'justify-end'} gap-0.5`}>
      {title !== undefined && (
        <span className="text-sm font-bold text-slate-500 dark:text-slate-400 truncate pr-2">{title}</span>
      )}
      <div className="flex items-center gap-0.5 shrink-0">
        <button type="button" onClick={() => onMove(-1)} disabled={idx === 0} className={btn} title={l.moveUp} aria-label={l.moveUp}>
          <ArrowUp className={ic} />
        </button>
        <button type="button" onClick={() => onMove(1)} disabled={idx === count - 1} className={btn} title={l.moveDown} aria-label={l.moveDown}>
          <ArrowDown className={ic} />
        </button>
        <button type="button" onClick={onRemove} className={roomy ? btn + ' hover:!text-rose-600' : 'p-1 text-rose-500 hover:text-rose-700'} title={l.remove} aria-label={l.remove}>
          <Trash2 className={ic} />
        </button>
      </div>
    </div>
  );
};

const ALL_SECTIONS: CvSection[] = ['layout', 'identity', 'summary', 'experience', 'education', 'skills'];

export const CvEditor: React.FC<CvEditorProps> = ({
  brandKit,
  onUpdate,
  interfaceLang,
  sections = ALL_SECTIONS,
  variant = 'compact',
}) => {
  const l = LABELS[interfaceLang] || LABELS.en;
  const roomy = variant === 'roomy';
  const { input, label, sectionTitle, card, addBtn, grid, stack, gap, icon, hint } = STYLES[variant];
  const show = (sec: CvSection) => sections.includes(sec);
  // In the roomy editor each step already has its own title.
  const showTitles = !roomy;
  const cv: CvCustomContent = brandKit.cvContent || getDefaultCvContent(brandKit.documentLang || 'en');
  const fileRef = useRef<HTMLInputElement>(null);
  const [photoError, setPhotoError] = useState(false);

  const update = (patch: Partial<CvCustomContent>) => onUpdate({ cvContent: { ...cv, ...patch } });

  const setExp = (idx: number, patch: Partial<CvExperience>) =>
    update({ experiences: cv.experiences.map((e, i) => (i === idx ? { ...e, ...patch } : e)) });
  const setEdu = (idx: number, patch: Partial<CvEducation>) =>
    update({ education: cv.education.map((e, i) => (i === idx ? { ...e, ...patch } : e)) });
  const setLang = (idx: number, patch: Partial<CvLanguage>) =>
    update({ languages: cv.languages.map((e, i) => (i === idx ? { ...e, ...patch } : e)) });

  const onPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    try {
      setPhotoError(false);
      update({ photoUrl: await resizePhoto(file) });
    } catch {
      setPhotoError(true);
    }
  };

  const field = (key: keyof CvCustomContent, text: string, type = 'text', autoComplete?: string) => (
    <label className={label}>
      {text}
      <input
        type={type}
        autoComplete={autoComplete}
        value={(cv[key] as string) || ''}
        onChange={(e) => update({ [key]: e.target.value } as Partial<CvCustomContent>)}
        className={input}
      />
    </label>
  );

  const addButton = (text: string, onClick: () => void) => (
    <button type="button" onClick={onClick} className={addBtn}>
      <Plus className={icon} />
      <span>{text}</span>
    </button>
  );

  const listHeader = (title: string, add: React.ReactNode) =>
    showTitles ? (
      <div className="flex items-center justify-between">
        <span className={sectionTitle}>{title}</span>
        {add}
      </div>
    ) : null;

  const newExp = { role: '', company: '', location: '', start: '', end: '', details: '' };
  const newEdu = { degree: '', school: '', start: '', end: '', details: '' };

  return (
    <div className={gap}>
      {show('layout') && (
        <div>
          {showTitles && <span className={sectionTitle + ' block mb-1.5'}>{l.layout}</span>}
          <div className="grid grid-cols-2 gap-1.5">
            {(['sidebar', 'classic'] as const).map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => update({ layout: id })}
                aria-pressed={cv.layout === id}
                className={`py-1.5 rounded-lg border text-[11px] font-semibold transition-colors ${
                  cv.layout === id
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                {id === 'sidebar' ? l.layoutSidebar : l.layoutClassic}
              </button>
            ))}
          </div>
        </div>
      )}

      {show('identity') && (
        <div className={stack}>
          {showTitles && <span className={sectionTitle + ' block'}>{l.identity}</span>}
          <div className={grid}>
            {field('fullName', l.fullName, 'text', 'name')}
            {field('jobTitle', l.jobTitle, 'text', 'organization-title')}
            {field('email', l.email, 'email', 'email')}
            {field('phone', l.phone, 'tel', 'tel')}
            {field('city', l.city, 'text', 'address-level2')}
            {field('link', l.link, 'text', 'url')}
          </div>
          <div className={`flex items-center ${roomy ? 'gap-4 pt-2' : 'gap-2 pt-1'}`}>
            {cv.photoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={cv.photoUrl} alt="" className={`${roomy ? 'w-16 h-16' : 'w-10 h-10'} rounded-full object-cover border border-slate-200`} />
            ) : (
              <div className={`${roomy ? 'w-16 h-16' : 'w-10 h-10'} rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400`}>
                <Camera className={roomy ? 'w-5 h-5' : 'w-4 h-4'} />
              </div>
            )}
            <div className="flex flex-col gap-1">
              <span className={roomy ? 'text-sm font-bold text-slate-700 dark:text-slate-200' : 'text-[10px] text-slate-500'}>{l.photo}</span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className={roomy ? 'text-sm font-bold text-ink-700 dark:text-ink-300 underline underline-offset-4 decoration-ink-200 hover:decoration-ink-600' : addBtn}
                >
                  {l.addPhoto}
                </button>
                {cv.photoUrl && (
                  <button type="button" onClick={() => update({ photoUrl: null })} className={`${roomy ? 'text-sm' : 'text-[10.5px]'} text-rose-600 hover:underline`}>
                    {l.removePhoto}
                  </button>
                )}
              </div>
              {photoError && <span role="alert" className={`${hint} text-rose-600`}>{l.photoError}</span>}
            </div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onPhoto} />
          </div>
        </div>
      )}

      {show('summary') && (
        <label className={label}>
          {showTitles ? <span className={sectionTitle}>{l.summary}</span> : l.summary}
          <textarea
            rows={roomy ? 6 : 3}
            value={cv.summary}
            onChange={(e) => update({ summary: e.target.value })}
            className={input + (roomy ? ' h-auto py-2.5 leading-relaxed resize-y' : ' resize-none leading-snug mt-1')}
          />
        </label>
      )}

      {show('experience') && (
        <div className={stack}>
          {listHeader(
            l.experiences,
            cv.experiences.length < MAX_EXPERIENCES && addButton(l.addExperience, () => update({ experiences: [...cv.experiences, newExp] }))
          )}
          {cv.experiences.map((exp, idx) => (
            <div key={idx} className={card}>
              <ItemTools
                l={l}
                idx={idx}
                count={cv.experiences.length}
                roomy={roomy}
                title={roomy ? exp.role || `${l.role} ${idx + 1}` : undefined}
                onMove={(dir) => update({ experiences: move(cv.experiences, idx, dir) })}
                onRemove={() => update({ experiences: cv.experiences.filter((_, i) => i !== idx) })}
              />
              <div className={grid}>
                <label className={label}>{l.role}<input value={exp.role} onChange={(e) => setExp(idx, { role: e.target.value })} className={input + (roomy ? '' : ' font-semibold')} /></label>
                <label className={label}>{l.company}<input value={exp.company} onChange={(e) => setExp(idx, { company: e.target.value })} className={input} /></label>
                <label className={label}>{l.location}<input value={exp.location} onChange={(e) => setExp(idx, { location: e.target.value })} className={input} /></label>
                <div className={`grid grid-cols-2 ${roomy ? 'gap-3' : 'gap-1'}`}>
                  <label className={label}>{l.start}<input value={exp.start} onChange={(e) => setExp(idx, { start: e.target.value })} className={input} /></label>
                  <label className={label}>{l.end}<input value={exp.end} onChange={(e) => setExp(idx, { end: e.target.value })} className={input} /></label>
                </div>
              </div>
              <label className={label}>
                {l.details} <span className={roomy ? 'font-normal text-slate-500' : 'italic'}>({l.detailsHint})</span>
                <textarea
                  rows={roomy ? 4 : 3}
                  value={exp.details}
                  onChange={(e) => setExp(idx, { details: e.target.value })}
                  className={input + (roomy ? ' h-auto py-2.5 leading-relaxed resize-y' : ' resize-none leading-snug')}
                />
              </label>
            </div>
          ))}
          {roomy && cv.experiences.length < MAX_EXPERIENCES && addButton(l.addExperience, () => update({ experiences: [...cv.experiences, newExp] }))}
        </div>
      )}

      {show('education') && (
        <div className={stack}>
          {listHeader(
            l.education,
            cv.education.length < MAX_EDUCATION && addButton(l.addEducation, () => update({ education: [...cv.education, newEdu] }))
          )}
          {cv.education.map((ed, idx) => (
            <div key={idx} className={card}>
              <ItemTools
                l={l}
                idx={idx}
                count={cv.education.length}
                roomy={roomy}
                title={roomy ? ed.degree || `${l.degree} ${idx + 1}` : undefined}
                onMove={(dir) => update({ education: move(cv.education, idx, dir) })}
                onRemove={() => update({ education: cv.education.filter((_, i) => i !== idx) })}
              />
              <div className={grid}>
                <label className={label}>{l.degree}<input value={ed.degree} onChange={(e) => setEdu(idx, { degree: e.target.value })} className={input + (roomy ? '' : ' font-semibold')} /></label>
                <label className={label}>{l.school}<input value={ed.school} onChange={(e) => setEdu(idx, { school: e.target.value })} className={input} /></label>
                <label className={label}>{l.start}<input value={ed.start} onChange={(e) => setEdu(idx, { start: e.target.value })} className={input} /></label>
                <label className={label}>{l.end}<input value={ed.end} onChange={(e) => setEdu(idx, { end: e.target.value })} className={input} /></label>
              </div>
              <label className={label}>
                {l.details}
                <input value={ed.details} onChange={(e) => setEdu(idx, { details: e.target.value })} className={input} />
              </label>
            </div>
          ))}
          {roomy && cv.education.length < MAX_EDUCATION && addButton(l.addEducation, () => update({ education: [...cv.education, newEdu] }))}
        </div>
      )}

      {show('skills') && (
        <>
          <label className={label}>
            {showTitles ? <span className={sectionTitle}>{l.skills}</span> : l.skills}{' '}
            <span className={roomy ? 'font-normal text-slate-500' : 'italic'}>({l.skillsHint})</span>
            <input
              defaultValue={cv.skills.join(', ')}
              key={cv.skills.join('|')}
              onBlur={(e) =>
                update({
                  skills: e.target.value
                    .split(',')
                    .map((s) => s.trim())
                    .filter(Boolean)
                    .slice(0, 16),
                })
              }
              className={input + (roomy ? '' : ' mt-1')}
            />
          </label>

          <div className={stack}>
            {showTitles ? (
              listHeader(l.languages, cv.languages.length < MAX_LANGUAGES && addButton(l.addLanguage, () => update({ languages: [...cv.languages, { name: '', level: '' }] })))
            ) : (
              <span className={label}>{l.languages}</span>
            )}
            {cv.languages.map((lg, idx) => (
              <div key={idx} className={`flex items-end ${roomy ? 'gap-3 -mt-1' : 'gap-1.5'}`}>
                <label className={label + ' flex-1 min-w-0'}>
                  <span className={roomy ? 'sr-only' : ''}>{l.language}</span>
                  <input value={lg.name} placeholder={roomy ? l.language : undefined} onChange={(e) => setLang(idx, { name: e.target.value })} className={input} />
                </label>
                <label className={label + ' flex-1 min-w-0'}>
                  <span className={roomy ? 'sr-only' : ''}>{l.level}</span>
                  <input value={lg.level} placeholder={roomy ? l.level : undefined} onChange={(e) => setLang(idx, { level: e.target.value })} className={input} />
                </label>
                <button
                  type="button"
                  onClick={() => update({ languages: cv.languages.filter((_, i) => i !== idx) })}
                  className={roomy ? 'w-11 h-11 shrink-0 inline-flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-rose-600 dark:hover:bg-slate-800' : 'p-1.5 text-rose-500 hover:text-rose-700'}
                  title={l.remove}
                  aria-label={l.remove}
                >
                  <Trash2 className={icon} />
                </button>
              </div>
            ))}
            {roomy && cv.languages.length < MAX_LANGUAGES && addButton(l.addLanguage, () => update({ languages: [...cv.languages, { name: '', level: '' }] }))}
          </div>

          <label className={label}>
            {showTitles ? <span className={sectionTitle}>{l.interests}</span> : l.interests}
            <input value={cv.interests} onChange={(e) => update({ interests: e.target.value })} className={input + (roomy ? '' : ' mt-1')} />
          </label>
        </>
      )}

      {!roomy && <p className="text-[10px] text-slate-500 leading-snug">{l.privacy}</p>}
    </div>
  );
};
