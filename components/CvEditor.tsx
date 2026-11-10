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

interface CvEditorProps {
  brandKit: BrandKit;
  onUpdate: (updates: Partial<BrandKit>) => void;
  interfaceLang: InterfaceLang;
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

const input =
  'w-full px-2 py-1 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100';
const label = 'block text-[10px] text-slate-500 dark:text-slate-400';
const sectionTitle = 'text-[11px] font-bold text-slate-700 dark:text-slate-300';
const card =
  'p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 space-y-1.5';
const addBtn =
  'inline-flex items-center space-x-1 text-[10.5px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline';

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
}> = ({ l, idx, count, onMove, onRemove }) => (
  <div className="flex items-center justify-end space-x-0.5">
    <button type="button" onClick={() => onMove(-1)} disabled={idx === 0} className="p-1 text-slate-400 hover:text-slate-600 disabled:opacity-30" title={l.moveUp} aria-label={l.moveUp}>
      <ArrowUp className="w-3 h-3" />
    </button>
    <button type="button" onClick={() => onMove(1)} disabled={idx === count - 1} className="p-1 text-slate-400 hover:text-slate-600 disabled:opacity-30" title={l.moveDown} aria-label={l.moveDown}>
      <ArrowDown className="w-3 h-3" />
    </button>
    <button type="button" onClick={onRemove} className="p-1 text-rose-500 hover:text-rose-700" title={l.remove} aria-label={l.remove}>
      <Trash2 className="w-3 h-3" />
    </button>
  </div>
);

export const CvEditor: React.FC<CvEditorProps> = ({ brandKit, onUpdate, interfaceLang }) => {
  const l = LABELS[interfaceLang] || LABELS.en;
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

  const field = (key: keyof CvCustomContent, text: string, type = 'text') => (
    <label className={label}>
      {text}
      <input
        type={type}
        value={(cv[key] as string) || ''}
        onChange={(e) => update({ [key]: e.target.value } as Partial<CvCustomContent>)}
        className={input}
      />
    </label>
  );

  return (
    <div className="space-y-4">
      {/* Layout */}
      <div>
        <span className={sectionTitle + ' block mb-1.5'}>{l.layout}</span>
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

      {/* Identity */}
      <div className="space-y-1.5">
        <span className={sectionTitle + ' block'}>{l.identity}</span>
        <div className="grid grid-cols-2 gap-1.5">
          {field('fullName', l.fullName)}
          {field('jobTitle', l.jobTitle)}
          {field('email', l.email, 'email')}
          {field('phone', l.phone, 'tel')}
          {field('city', l.city)}
          {field('link', l.link)}
        </div>
        <div className="flex items-center gap-2 pt-1">
          {cv.photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={cv.photoUrl} alt="" className="w-10 h-10 rounded-full object-cover border border-slate-200" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
              <Camera className="w-4 h-4" />
            </div>
          )}
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500">{l.photo}</span>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => fileRef.current?.click()} className={addBtn}>
                {l.addPhoto}
              </button>
              {cv.photoUrl && (
                <button type="button" onClick={() => update({ photoUrl: null })} className="text-[10.5px] text-rose-500 hover:underline">
                  {l.removePhoto}
                </button>
              )}
            </div>
            {photoError && <span className="text-[10px] text-rose-600">{l.photoError}</span>}
          </div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onPhoto} />
        </div>
      </div>

      {/* Summary */}
      <label className={label}>
        <span className={sectionTitle}>{l.summary}</span>
        <textarea rows={3} value={cv.summary} onChange={(e) => update({ summary: e.target.value })} className={input + ' resize-none leading-snug mt-1'} />
      </label>

      {/* Experience */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className={sectionTitle}>{l.experiences}</span>
          {cv.experiences.length < MAX_EXPERIENCES && (
            <button
              type="button"
              onClick={() => update({ experiences: [...cv.experiences, { role: '', company: '', location: '', start: '', end: '', details: '' }] })}
              className={addBtn}
            >
              <Plus className="w-3 h-3" />
              <span>{l.addExperience}</span>
            </button>
          )}
        </div>
        {cv.experiences.map((exp, idx) => (
          <div key={idx} className={card}>
            <ItemTools
              l={l}
              idx={idx}
              count={cv.experiences.length}
              onMove={(dir) => update({ experiences: move(cv.experiences, idx, dir) })}
              onRemove={() => update({ experiences: cv.experiences.filter((_, i) => i !== idx) })}
            />
            <div className="grid grid-cols-2 gap-1.5">
              <label className={label}>{l.role}<input value={exp.role} onChange={(e) => setExp(idx, { role: e.target.value })} className={input + ' font-semibold'} /></label>
              <label className={label}>{l.company}<input value={exp.company} onChange={(e) => setExp(idx, { company: e.target.value })} className={input} /></label>
              <label className={label}>{l.location}<input value={exp.location} onChange={(e) => setExp(idx, { location: e.target.value })} className={input} /></label>
              <div className="grid grid-cols-2 gap-1">
                <label className={label}>{l.start}<input value={exp.start} onChange={(e) => setExp(idx, { start: e.target.value })} className={input} /></label>
                <label className={label}>{l.end}<input value={exp.end} onChange={(e) => setExp(idx, { end: e.target.value })} className={input} /></label>
              </div>
            </div>
            <label className={label}>
              {l.details} <span className="italic">({l.detailsHint})</span>
              <textarea rows={3} value={exp.details} onChange={(e) => setExp(idx, { details: e.target.value })} className={input + ' resize-none leading-snug'} />
            </label>
          </div>
        ))}
      </div>

      {/* Education */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className={sectionTitle}>{l.education}</span>
          {cv.education.length < MAX_EDUCATION && (
            <button
              type="button"
              onClick={() => update({ education: [...cv.education, { degree: '', school: '', start: '', end: '', details: '' }] })}
              className={addBtn}
            >
              <Plus className="w-3 h-3" />
              <span>{l.addEducation}</span>
            </button>
          )}
        </div>
        {cv.education.map((ed, idx) => (
          <div key={idx} className={card}>
            <ItemTools
              l={l}
              idx={idx}
              count={cv.education.length}
              onMove={(dir) => update({ education: move(cv.education, idx, dir) })}
              onRemove={() => update({ education: cv.education.filter((_, i) => i !== idx) })}
            />
            <div className="grid grid-cols-2 gap-1.5">
              <label className={label}>{l.degree}<input value={ed.degree} onChange={(e) => setEdu(idx, { degree: e.target.value })} className={input + ' font-semibold'} /></label>
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
      </div>

      {/* Skills */}
      <label className={label}>
        <span className={sectionTitle}>{l.skills}</span> <span className="italic">({l.skillsHint})</span>
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
          className={input + ' mt-1'}
        />
      </label>

      {/* Languages */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className={sectionTitle}>{l.languages}</span>
          {cv.languages.length < MAX_LANGUAGES && (
            <button type="button" onClick={() => update({ languages: [...cv.languages, { name: '', level: '' }] })} className={addBtn}>
              <Plus className="w-3 h-3" />
              <span>{l.addLanguage}</span>
            </button>
          )}
        </div>
        {cv.languages.map((lg, idx) => (
          <div key={idx} className="flex items-end gap-1.5">
            <label className={label + ' flex-1'}>{l.language}<input value={lg.name} onChange={(e) => setLang(idx, { name: e.target.value })} className={input} /></label>
            <label className={label + ' flex-1'}>{l.level}<input value={lg.level} onChange={(e) => setLang(idx, { level: e.target.value })} className={input} /></label>
            <button
              type="button"
              onClick={() => update({ languages: cv.languages.filter((_, i) => i !== idx) })}
              className="p-1.5 text-rose-500 hover:text-rose-700"
              title={l.remove}
              aria-label={l.remove}
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>

      {/* Interests */}
      <label className={label}>
        <span className={sectionTitle}>{l.interests}</span>
        <input value={cv.interests} onChange={(e) => update({ interests: e.target.value })} className={input + ' mt-1'} />
      </label>

      <p className="text-[10px] text-slate-500 leading-snug">{l.privacy}</p>
    </div>
  );
};
