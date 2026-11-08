'use client';

import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Sparkles,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  Sliders,
  Check,
  Eye,
  EyeOff,
  Smile,
  Activity,
  Apple,
  Moon,
  Target,
  Edit3,
} from 'lucide-react';
import {
  BrandKit,
  DocumentLang,
  HabitItem,
  HabitPackId,
  HabitTrackerCustomContent,
  InterfaceLang,
  RoadmapCustomContent,
  RoadmapPhaseCustom,
  TemplateId,
  WelcomePacketCustomContent,
} from '@/types';
import { HABIT_PACKS, HabitPack } from '@/lib/i18n/habit-packs';
import {
  getDefaultHabitTrackerContent,
  getDefaultRoadmapContent,
  getDefaultWelcomePacketContent,
} from '@/lib/use-brand-kit';

interface ContentEditorStepProps {
  brandKit: BrandKit;
  onUpdate: (updates: Partial<BrandKit>) => void;
  activeTemplate: TemplateId;
  interfaceLang: InterfaceLang;
  onResetSection?: (section: 'habitTracker' | 'roadmap' | 'welcomePacket') => void;
}

const PACK_ICONS: Record<HabitPackId, React.ElementType> = {
  wellbeing: Smile,
  fitness: Activity,
  nutrition: Apple,
  sleep: Moon,
  focus: Target,
  blank: Edit3,
};

const LABELS: Record<
  InterfaceLang,
  {
    stepTitle: string;
    templateBadge: Record<TemplateId, string>;
    stepSub: string;
    habitPacksTitle: string;
    fullyEditable: string;
    docTitle: string;
    docSubtitle: string;
    dailyHabitsTitle: string;
    addHabit: string;
    weeklyQuestionsTitle: string;
    coachNoteTitle: string;
    displayOptions: string;
    optNotesCol: string;
    optScoreRow: string;
    optScoreCol: string;
    optWeeklyChecks: string;
    optCoachNote: string;
    resetDefaults: string;
    roadmapMission: string;
    roadmapHorizon: string;
    roadmapPhasesTitle: string;
    kpiTarget: string;
    signatureBlock: string;
    welcomeMessage: string;
    workingAgreements: string;
    checklist72h: string;
  }
> = {
  fr: {
    stepTitle: '5. Personnaliser le contenu',
    templateBadge: {
      'habit-tracker': 'Suivi d’habitudes',
      'roadmap-90': 'Feuille de route',
      'welcome-packet': 'Pack d’accueil',
    },
    stepSub: 'Packs d’habitudes, textes et sections personnalisables',
    habitPacksTitle: 'Packs d’habitudes (1 clic)',
    fullyEditable: 'Modifiables après choix',
    docTitle: 'Titre du document',
    docSubtitle: 'Sous-titre',
    dailyHabitsTitle: 'Habitudes quotidiennes (3 à 8)',
    addHabit: 'Ajouter',
    weeklyQuestionsTitle: 'Questions de bilan hebdomadaire (4 semaines)',
    coachNoteTitle: 'Mot ou citation du référent',
    displayOptions: 'Options d’affichage sur le PDF',
    optNotesCol: 'Colonne "Notes" à droite',
    optScoreRow: 'Ligne "Score total" en bas',
    optScoreCol: 'Colonne score (___ / 30)',
    optWeeklyChecks: 'Bilans hebdomadaires (4 semaines)',
    optCoachNote: 'Encadré conseil du référent',
    resetDefaults: 'Rétablir le contenu par défaut',
    roadmapMission: 'Mission / Projet clé',
    roadmapHorizon: 'Horizon d’exécution',
    roadmapPhasesTitle: 'Les 3 Phases Stratégiques',
    kpiTarget: 'Cible clé / KPI',
    signatureBlock: 'Bloc de signature bilatérale',
    welcomeMessage: 'Message d’accueil & engagement',
    workingAgreements: 'Règles du jeu & modalités de collaboration',
    checklist72h: 'Checklist des 72 premières heures',
  },
  en: {
    stepTitle: '5. Customize Content',
    templateBadge: {
      'habit-tracker': 'Habit Tracker',
      'roadmap-90': 'Roadmap',
      'welcome-packet': 'Welcome Packet',
    },
    stepSub: 'Habit packs, custom text and toggleable sections',
    habitPacksTitle: 'Habit Packs (1 click)',
    fullyEditable: 'Fully editable',
    docTitle: 'Document Title',
    docSubtitle: 'Subtitle',
    dailyHabitsTitle: 'Daily Habits (3 to 8)',
    addHabit: 'Add habit',
    weeklyQuestionsTitle: 'Weekly Check-in Prompts (4 weeks)',
    coachNoteTitle: 'Practitioner note or quote',
    displayOptions: 'Display Options on PDF',
    optNotesCol: '"Notes" column on the right',
    optScoreRow: '"Total Score" row at the bottom',
    optScoreCol: 'Score column (___ / 30)',
    optWeeklyChecks: 'Weekly check-in cards',
    optCoachNote: 'Practitioner advice block',
    resetDefaults: 'Reset to defaults',
    roadmapMission: 'Mission / Key Initiative',
    roadmapHorizon: 'Execution Horizon',
    roadmapPhasesTitle: 'The 3 Strategic Phases',
    kpiTarget: 'Key Target / KPI',
    signatureBlock: 'Bilateral signature block',
    welcomeMessage: 'Welcome statement & commitment',
    workingAgreements: 'Working agreements & protocols',
    checklist72h: 'First 72 Hours Checklist',
  },
  de: {
    stepTitle: '5. Inhalt anpassen',
    templateBadge: {
      'habit-tracker': 'Gewohnheiten-Tracker',
      'roadmap-90': 'Strategische Roadmap',
      'welcome-packet': 'Willkommenspaket',
    },
    stepSub: 'Vorlagen, Texte und Abschnitte anpassen',
    habitPacksTitle: 'Gewohnheiten-Pakete (1 Klick)',
    fullyEditable: 'Frei anpassbar',
    docTitle: 'Dokumententitel',
    docSubtitle: 'Untertitel',
    dailyHabitsTitle: 'Tägliche Gewohnheiten (3 bis 8)',
    addHabit: 'Hinzufügen',
    weeklyQuestionsTitle: 'Wöchentliche Reflexion (4 Wochen)',
    coachNoteTitle: 'Notiz oder Zitat des Ansprechpartners',
    displayOptions: 'PDF-Anzeigeoptionen',
    optNotesCol: '"Notizen"-Spalte rechts',
    optScoreRow: '"Gesamtpunktzahl"-Zeile unten',
    optScoreCol: 'Punkte-Spalte (___ / 30)',
    optWeeklyChecks: 'Wöchentliche Reflexionskarten',
    optCoachNote: 'Hinweisfeld des Ansprechpartners',
    resetDefaults: 'Auf Standard zurücksetzen',
    roadmapMission: 'Projekt / Kerninitiative',
    roadmapHorizon: 'Zeithorizont',
    roadmapPhasesTitle: 'Die 3 Strategischen Phasen',
    kpiTarget: 'Kernziel / KPI',
    signatureBlock: 'Beidseitiges Unterschriftenfeld',
    welcomeMessage: 'Willkommensnachricht & Verpflichtung',
    workingAgreements: 'Zusammenarbeitsregeln & Protokolle',
    checklist72h: 'Checkliste für die ersten 72 Stunden',
  },
  es: {
    stepTitle: '5. Personalizar contenido',
    templateBadge: {
      'habit-tracker': 'Seguimiento de hábitos',
      'roadmap-90': 'Hoja de ruta',
      'welcome-packet': 'Paquete de bienvenida',
    },
    stepSub: 'Paquetes de hábitos, textos y secciones configurables',
    habitPacksTitle: 'Paquetes de hábitos (1 clic)',
    fullyEditable: 'Totalmente editable',
    docTitle: 'Título del documento',
    docSubtitle: 'Subtítulo',
    dailyHabitsTitle: 'Hábitos diarios (3 a 8)',
    addHabit: 'Añadir hábito',
    weeklyQuestionsTitle: 'Preguntas de reflexión semanal (4 semanas)',
    coachNoteTitle: 'Nota o cita del especialista',
    displayOptions: 'Opciones de visualización en PDF',
    optNotesCol: 'Columna "Notas" a la derecha',
    optScoreRow: 'Fila "Puntuación total" abajo',
    optScoreCol: 'Columna de puntuación (___ / 30)',
    optWeeklyChecks: 'Tarjetas de balance semanal',
    optCoachNote: 'Bloque de consejo del especialista',
    resetDefaults: 'Restablecer valores predeterminados',
    roadmapMission: 'Misión / Proyecto clave',
    roadmapHorizon: 'Horizonte de ejecución',
    roadmapPhasesTitle: 'Las 3 Fases Estratégicas',
    kpiTarget: 'Objetivo clave / KPI',
    signatureBlock: 'Bloque de firma bilateral',
    welcomeMessage: 'Mensaje de bienvenida y compromiso',
    workingAgreements: 'Pautas de trabajo y comunicación',
    checklist72h: 'Lista de verificación primeras 72h',
  },
  it: {
    stepTitle: '5. Personalizza i contenuti',
    templateBadge: {
      'habit-tracker': 'Tracker abitudini',
      'roadmap-90': 'Tabella di marcia',
      'welcome-packet': 'Pacchetto benvenuto',
    },
    stepSub: 'Pacchetti di abitudini, testi e sezioni personalizzabili',
    habitPacksTitle: 'Pacchetti abitudini (1 clic)',
    fullyEditable: 'Completamente modificabile',
    docTitle: 'Titolo del documento',
    docSubtitle: 'Sottotitolo',
    dailyHabitsTitle: 'Abitudini giornaliere (da 3 a 8)',
    addHabit: 'Aggiungi',
    weeklyQuestionsTitle: 'Domande di revisione settimanale (4 settimane)',
    coachNoteTitle: 'Nota o citazione del professionista',
    displayOptions: 'Opzioni di visualizzazione su PDF',
    optNotesCol: 'Colonna "Note" a destra',
    optScoreRow: 'Riga "Punteggio totale" in basso',
    optScoreCol: 'Colonna punteggio (___ / 30)',
    optWeeklyChecks: 'Schede di bilancio settimanale',
    optCoachNote: 'Riquadro consiglio del professionista',
    resetDefaults: 'Ripristina predefiniti',
    roadmapMission: 'Missione / Iniziativa chiave',
    roadmapHorizon: 'Orizzonte temporale',
    roadmapPhasesTitle: 'Le 3 Fasi Strategiche',
    kpiTarget: 'Obiettivo chiave / KPI',
    signatureBlock: 'Riquadro per firma bilaterale',
    welcomeMessage: 'Messaggio di benvenuto & impegno',
    workingAgreements: 'Accordi di lavoro e canali',
    checklist72h: 'Checklist prime 72 ore',
  },
  pt: {
    stepTitle: '5. Personalizar conteúdo',
    templateBadge: {
      'habit-tracker': 'Rastreador de hábitos',
      'roadmap-90': 'Roteiro de 90 dias',
      'welcome-packet': 'Pacote de boas-vindas',
    },
    stepSub: 'Pacotes de hábitos, textos e seções personalizáveis',
    habitPacksTitle: 'Pacotes de hábitos (1 clique)',
    fullyEditable: 'Totalmente editável',
    docTitle: 'Título do documento',
    docSubtitle: 'Subtítulo',
    dailyHabitsTitle: 'Hábitos diários (3 a 8)',
    addHabit: 'Adicionar',
    weeklyQuestionsTitle: 'Perguntas de revisão semanal (4 semanas)',
    coachNoteTitle: 'Nota ou citação do profissional',
    displayOptions: 'Opções de exibição no PDF',
    optNotesCol: 'Coluna "Notas" à direita',
    optScoreRow: 'Linha "Pontuação total" abaixo',
    optScoreCol: 'Coluna pontuação (___ / 30)',
    optWeeklyChecks: 'Cartões de revisão semanal',
    optCoachNote: 'Quadro de conselho do profissional',
    resetDefaults: 'Restaurar padrões',
    roadmapMission: 'Missão / Projeto principal',
    roadmapHorizon: 'Horizonte de execução',
    roadmapPhasesTitle: 'As 3 Fases Estratégicas',
    kpiTarget: 'Meta principal / KPI',
    signatureBlock: 'Bloco de assinatura bilateral',
    welcomeMessage: 'Mensagem de boas-vindas & compromisso',
    workingAgreements: 'Acordos de trabalho e protocolos',
    checklist72h: 'Checklist das primeiras 72 horas',
  },
};

export const ContentEditorStep: React.FC<ContentEditorStepProps> = ({
  brandKit,
  onUpdate,
  activeTemplate,
  interfaceLang,
  onResetSection,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const l = LABELS[interfaceLang] || LABELS.en;
  const docLang = brandKit.documentLang || 'en';

  // Habit Content
  const habitContent: HabitTrackerCustomContent =
    brandKit.habitTrackerContent || getDefaultHabitTrackerContent(docLang, 'wellbeing');

  const updateHabitContent = (updates: Partial<HabitTrackerCustomContent>) => {
    const next = { ...habitContent, ...updates };
    onUpdate({ habitTrackerContent: next });
  };

  // Roadmap Content
  const roadmapContent: RoadmapCustomContent =
    brandKit.roadmapContent || getDefaultRoadmapContent(docLang);

  const updateRoadmapContent = (updates: Partial<RoadmapCustomContent>) => {
    const next = { ...roadmapContent, ...updates };
    onUpdate({ roadmapContent: next });
  };

  // Welcome Content
  const welcomeContent: WelcomePacketCustomContent =
    brandKit.welcomePacketContent || getDefaultWelcomePacketContent(docLang);

  const updateWelcomeContent = (updates: Partial<WelcomePacketCustomContent>) => {
    const next = { ...welcomeContent, ...updates };
    onUpdate({ welcomePacketContent: next });
  };

  const currentPackId = habitContent.packId || 'wellbeing';
  const localizedPacks = HABIT_PACKS[docLang] || HABIT_PACKS.en;

  // Apply a habit pack
  const handleApplyPack = (packId: HabitPackId) => {
    const pack = localizedPacks[packId];
    if (!pack) return;
    updateHabitContent({
      packId,
      habits: pack.habits.map((h, i) => ({
        id: `pack-${packId}-${i + 1}`,
        title: h.title,
        subtitle: h.subtitle,
      })),
    });
  };

  // Add habit
  const handleAddHabit = () => {
    if (habitContent.habits.length >= 8) return;
    const newIdx = habitContent.habits.length + 1;
    const defaultNewHabits: Record<InterfaceLang, { titlePrefix: string; subtitle: string }> = {
      fr: { titlePrefix: 'Habitude', subtitle: 'Objectif quotidien convenu' },
      en: { titlePrefix: 'Habit', subtitle: 'Daily action to track' },
      de: { titlePrefix: 'Gewohnheit', subtitle: 'Vereinbarte tägliche Routine' },
      es: { titlePrefix: 'Hábito', subtitle: 'Acción diaria acordada' },
      it: { titlePrefix: 'Abitudine', subtitle: 'Azione quotidiana concordata' },
      pt: { titlePrefix: 'Hábito', subtitle: 'Ação diária combinada' },
    };
    const habitDef = defaultNewHabits[interfaceLang] || defaultNewHabits.en;
    const newHabit: HabitItem = {
      id: `custom-habit-${Date.now()}`,
      title: `${habitDef.titlePrefix} ${newIdx} : ________`,
      subtitle: habitDef.subtitle,
    };
    updateHabitContent({ habits: [...habitContent.habits, newHabit] });
  };

  // Remove habit
  const handleRemoveHabit = (idx: number) => {
    if (habitContent.habits.length <= 3) return;
    const updated = habitContent.habits.filter((_, i) => i !== idx);
    updateHabitContent({ habits: updated });
  };

  // Move habit up/down
  const handleMoveHabit = (idx: number, direction: 'up' | 'down') => {
    const newIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (newIdx < 0 || newIdx >= habitContent.habits.length) return;
    const updated = [...habitContent.habits];
    const [moved] = updated.splice(idx, 1);
    updated.splice(newIdx, 0, moved);
    updateHabitContent({ habits: updated });
  };

  // Update habit title/subtitle
  const handleUpdateHabit = (idx: number, field: 'title' | 'subtitle', val: string) => {
    const updated = [...habitContent.habits];
    updated[idx] = { ...updated[idx], [field]: val };
    updateHabitContent({ habits: updated });
  };

  // Update weekly questions
  const handleUpdateQuestion = (idx: number, val: string) => {
    const updatedQuestions = [...habitContent.weeklyQuestions] as [string, string, string, string];
    updatedQuestions[idx] = val;
    updateHabitContent({ weeklyQuestions: updatedQuestions });
  };

  const packList: HabitPackId[] = ['wellbeing', 'fitness', 'nutrition', 'sleep', 'focus', 'blank'];

  return (
    <div className="border border-slate-200/90 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900/60 transition-all">
      {/* Accordion Trigger (Collapsed by default) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3.5 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
      >
        <div className="flex items-center space-x-2.5">
          <Sliders className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                {l.stepTitle}
              </span>
              <span className="text-[10px] text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-1.5 py-0.5 rounded font-semibold">
                {l.templateBadge[activeTemplate]}
              </span>
            </div>
            <span className="text-[10.5px] text-slate-500 dark:text-slate-400 mt-0.5">
              {l.stepSub}
            </span>
          </div>
        </div>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
        )}
      </button>

      {/* Accordion Content */}
      {isOpen && (
        <div className="p-3.5 pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-4 text-xs">
          {/* 1. HABIT TRACKER CONTENT EDITOR */}
          {activeTemplate === 'habit-tracker' && (
            <>
              {/* Habit Packs Selection */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{l.habitPacksTitle}</span>
                  </label>
                  <span className="text-[10px] text-slate-400">
                    {l.fullyEditable}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-1.5">
                  {packList.map((pId) => {
                    const pack = localizedPacks[pId];
                    const Icon = PACK_ICONS[pId];
                    const isSelected = currentPackId === pId;
                    return (
                      <button
                        key={pId}
                        type="button"
                        onClick={() => handleApplyPack(pId)}
                        className={`flex items-center space-x-1.5 px-2 py-1.5 rounded-lg border text-left transition-all ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-50/80 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-bold shadow-xs'
                            : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                        title={pack.description}
                      >
                        <Icon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-indigo-600' : 'text-slate-400'}`} />
                        <span className="truncate text-[10.5px]">{pack.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-2 pt-1 border-t border-slate-100 dark:border-slate-800/80">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                      {l.docTitle}
                    </label>
                    <span className="text-[10px] font-mono text-slate-400">
                      {(habitContent.title || '').length}/45
                    </span>
                  </div>
                  <input
                    type="text"
                    maxLength={45}
                    value={habitContent.title || ''}
                    onChange={(e) => updateHabitContent({ title: e.target.value })}
                    placeholder="30-Day Habit Tracker"
                    className="w-full px-3 py-2 sm:py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-base sm:text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[11px] font-medium text-slate-600 dark:text-slate-400">
                      {l.docSubtitle}
                    </label>
                    <span className="text-[10px] font-mono text-slate-400">
                      {(habitContent.subtitle || '').length}/100
                    </span>
                  </div>
                  <input
                    type="text"
                    maxLength={100}
                    value={habitContent.subtitle || ''}
                    onChange={(e) => updateHabitContent({ subtitle: e.target.value })}
                    placeholder="Small daily actions lead to lasting change."
                    className="w-full px-3 py-2 sm:py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-base sm:text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Habits List (3 to 8) */}
              <div className="space-y-2 pt-1 border-t border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    {l.dailyHabitsTitle}
                  </label>
                  {habitContent.habits.length < 8 && (
                    <button
                      type="button"
                      onClick={handleAddHabit}
                      className="inline-flex items-center space-x-1 text-[11px] text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 font-semibold"
                    >
                      <Plus className="w-3 h-3" />
                      <span>{l.addHabit}</span>
                    </button>
                  )}
                </div>

                <div className="space-y-2">
                  {habitContent.habits.map((h, idx) => (
                    <div
                      key={h.id || idx}
                      className="p-2 rounded-lg border border-slate-200 dark:border-slate-700/80 bg-slate-50/70 dark:bg-slate-800/50 space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className="w-4 h-4 rounded text-[9.5px] font-bold flex items-center justify-center shrink-0"
                          style={{
                            backgroundColor: `${brandKit.brandColor}18`,
                            color: brandKit.brandColor,
                          }}
                        >
                          {idx + 1}
                        </span>

                        <div className="flex items-center space-x-1">
                          <button
                            type="button"
                            onClick={() => handleMoveHabit(idx, 'up')}
                            disabled={idx === 0}
                            className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed"
                            title="Monter"
                          >
                            <ArrowUp className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMoveHabit(idx, 'down')}
                            disabled={idx === habitContent.habits.length - 1}
                            className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed"
                            title="Descendre"
                          >
                            <ArrowDown className="w-3 h-3" />
                          </button>
                          {habitContent.habits.length > 3 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveHabit(idx)}
                              className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                              title="Supprimer"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>

                      <input
                        type="text"
                        maxLength={40}
                        value={h.title}
                        onChange={(e) => handleUpdateHabit(idx, 'title', e.target.value)}
                        placeholder="Habit title"
                        className="w-full px-2 py-1 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-slate-100"
                      />
                      <input
                        type="text"
                        maxLength={55}
                        value={h.subtitle}
                        onChange={(e) => handleUpdateHabit(idx, 'subtitle', e.target.value)}
                        placeholder="Short target / description"
                        className="w-full px-2 py-1 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-[10.5px] text-slate-600 dark:text-slate-300"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Weekly Questions */}
              <div className="space-y-2 pt-1 border-t border-slate-100 dark:border-slate-800/80">
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block">
                  {l.weeklyQuestionsTitle}
                </label>
                <div className="space-y-1.5">
                  {habitContent.weeklyQuestions.map((q, idx) => (
                    <div key={idx} className="flex items-center space-x-1.5">
                      <span className="text-[10px] font-mono font-bold text-slate-400 shrink-0 w-6">
                        S{idx + 1}
                      </span>
                      <input
                        type="text"
                        maxLength={80}
                        value={q}
                        onChange={(e) => handleUpdateQuestion(idx, e.target.value)}
                        className="flex-1 px-2 py-1 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-[11px] text-slate-800 dark:text-slate-200"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Coach Note */}
              <div className="space-y-1.5 pt-1 border-t border-slate-100 dark:border-slate-800/80">
                <div className="flex justify-between items-center">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    {l.coachNoteTitle}
                  </label>
                  <span className="text-[10px] font-mono text-slate-400">
                    {(habitContent.coachNote || '').length}/120
                  </span>
                </div>
                <textarea
                  rows={2}
                  maxLength={120}
                  value={habitContent.coachNote || ''}
                  onChange={(e) => updateHabitContent({ coachNote: e.target.value })}
                  placeholder="Consistency creates lasting results."
                  className="w-full px-3 py-2 sm:py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-base sm:text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              {/* Display Toggles */}
              <div className="space-y-2 pt-1 border-t border-slate-100 dark:border-slate-800/80">
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block">
                  {l.displayOptions}
                </label>

                {brandKit.designStyle === 'minimal' ? (
                  <div className="space-y-1.5">
                    <label className="flex items-center justify-between p-2 rounded-lg border border-slate-200 dark:border-slate-700/80 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer">
                      <span className="text-[11px] text-slate-700 dark:text-slate-300">
                        {l.optNotesCol}
                      </span>
                      <input
                        type="checkbox"
                        checked={habitContent.showNotesColumn || false}
                        onChange={(e) => updateHabitContent({ showNotesColumn: e.target.checked })}
                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                      />
                    </label>

                    <label className="flex items-center justify-between p-2 rounded-lg border border-slate-200 dark:border-slate-700/80 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer">
                      <span className="text-[11px] text-slate-700 dark:text-slate-300">
                        {l.optScoreRow}
                      </span>
                      <input
                        type="checkbox"
                        checked={habitContent.showScoreRow || false}
                        onChange={(e) => updateHabitContent({ showScoreRow: e.target.checked })}
                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                      />
                    </label>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <label className="flex items-center justify-between p-2 rounded-lg border border-slate-200 dark:border-slate-700/80 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer">
                      <span className="text-[11px] text-slate-700 dark:text-slate-300">
                        {l.optScoreCol}
                      </span>
                      <input
                        type="checkbox"
                        checked={habitContent.showScoreColumn}
                        onChange={(e) => updateHabitContent({ showScoreColumn: e.target.checked })}
                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                      />
                    </label>

                    <label className="flex items-center justify-between p-2 rounded-lg border border-slate-200 dark:border-slate-700/80 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer">
                      <span className="text-[11px] text-slate-700 dark:text-slate-300">
                        {l.optWeeklyChecks}
                      </span>
                      <input
                        type="checkbox"
                        checked={habitContent.showWeeklyCheckins}
                        onChange={(e) => updateHabitContent({ showWeeklyCheckins: e.target.checked })}
                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                      />
                    </label>

                    <label className="flex items-center justify-between p-2 rounded-lg border border-slate-200 dark:border-slate-700/80 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer">
                      <span className="text-[11px] text-slate-700 dark:text-slate-300">
                        {l.optCoachNote}
                      </span>
                      <input
                        type="checkbox"
                        checked={habitContent.showCoachNote}
                        onChange={(e) => updateHabitContent({ showCoachNote: e.target.checked })}
                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                      />
                    </label>
                  </div>
                )}
              </div>

              {/* Reset to defaults button */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    if (onResetSection) onResetSection('habitTracker');
                    else updateHabitContent(getDefaultHabitTrackerContent(docLang, 'wellbeing'));
                  }}
                  className="inline-flex items-center space-x-1.5 text-[11px] text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>{l.resetDefaults}</span>
                </button>
              </div>
            </>
          )}

          {/* 2. ROADMAP 90 CONTENT EDITOR */}
          {activeTemplate === 'roadmap-90' && (
            <>
              {/* Title & Subtitle */}
              <div className="space-y-2">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    {l.docTitle}
                  </label>
                  <input
                    type="text"
                    value={roadmapContent.title}
                    onChange={(e) => updateRoadmapContent({ title: e.target.value })}
                    className="w-full px-3 py-2 sm:py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-base sm:text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-medium text-slate-600 dark:text-slate-400 block mb-1">
                    {l.docSubtitle}
                  </label>
                  <input
                    type="text"
                    value={roadmapContent.subtitle}
                    onChange={(e) => updateRoadmapContent({ subtitle: e.target.value })}
                    className="w-full px-3 py-2 sm:py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-base sm:text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Mission & Horizon */}
              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100 dark:border-slate-800">
                <div>
                  <label className="text-[10.5px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                    {l.roadmapMission}
                  </label>
                  <input
                    type="text"
                    value={roadmapContent.mission}
                    onChange={(e) => updateRoadmapContent({ mission: e.target.value })}
                    className="w-full px-3 py-2 sm:py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-base sm:text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-[10.5px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                    {l.roadmapHorizon}
                  </label>
                  <input
                    type="text"
                    value={roadmapContent.horizon}
                    onChange={(e) => updateRoadmapContent({ horizon: e.target.value })}
                    className="w-full px-3 py-2 sm:py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-base sm:text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* 3 Phases */}
              <div className="space-y-3 pt-1 border-t border-slate-100 dark:border-slate-800">
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block">
                  {l.roadmapPhasesTitle}
                </label>
                {roadmapContent.phases.map((phase, pIdx) => (
                  <div
                    key={pIdx}
                    className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10.5px] font-bold text-indigo-600 dark:text-indigo-400">
                        Phase 0{pIdx + 1}
                      </span>
                      <input
                        type="text"
                        value={phase.daysLabel}
                        onChange={(e) => {
                          const phases = [...roadmapContent.phases] as [
                            RoadmapPhaseCustom,
                            RoadmapPhaseCustom,
                            RoadmapPhaseCustom,
                          ];
                          phases[pIdx] = { ...phases[pIdx], daysLabel: e.target.value };
                          updateRoadmapContent({ phases });
                        }}
                        className="px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-[10px] text-slate-700 dark:text-slate-300 w-24 text-right"
                      />
                    </div>
                    <input
                      type="text"
                      value={phase.title}
                      onChange={(e) => {
                        const phases = [...roadmapContent.phases] as [
                          RoadmapPhaseCustom,
                          RoadmapPhaseCustom,
                          RoadmapPhaseCustom,
                        ];
                        phases[pIdx] = { ...phases[pIdx], title: e.target.value };
                        updateRoadmapContent({ phases });
                      }}
                      className="w-full px-2 py-1 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-slate-100"
                    />
                    <div>
                      <label className="text-[10px] text-slate-500 block mb-0.5">{l.kpiTarget}</label>
                      <input
                        type="text"
                        value={phase.kpi}
                        onChange={(e) => {
                          const phases = [...roadmapContent.phases] as [
                            RoadmapPhaseCustom,
                            RoadmapPhaseCustom,
                            RoadmapPhaseCustom,
                          ];
                          phases[pIdx] = { ...phases[pIdx], kpi: e.target.value };
                          updateRoadmapContent({ phases });
                        }}
                        className="w-full px-2 py-1 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-[11px] text-slate-700 dark:text-slate-300"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Toggles */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <label className="flex items-center justify-between p-2 rounded-lg border border-slate-200 dark:border-slate-700/80 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer">
                  <span className="text-[11px] text-slate-700 dark:text-slate-300 font-medium">
                    {l.signatureBlock}
                  </span>
                  <input
                    type="checkbox"
                    checked={roadmapContent.showSignatureBlock !== false}
                    onChange={(e) => updateRoadmapContent({ showSignatureBlock: e.target.checked })}
                    className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                  />
                </label>
              </div>

              {/* Reset to defaults button */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    if (onResetSection) onResetSection('roadmap');
                    else updateRoadmapContent(getDefaultRoadmapContent(docLang));
                  }}
                  className="inline-flex items-center space-x-1.5 text-[11px] text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>{l.resetDefaults}</span>
                </button>
              </div>
            </>
          )}

          {/* 3. WELCOME PACKET CONTENT EDITOR */}
          {activeTemplate === 'welcome-packet' && (
            <>
              {/* Title & Subtitle */}
              <div className="space-y-2">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    {l.docTitle}
                  </label>
                  <input
                    type="text"
                    value={welcomeContent.title}
                    onChange={(e) => updateWelcomeContent({ title: e.target.value })}
                    className="w-full px-3 py-2 sm:py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-base sm:text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-medium text-slate-600 dark:text-slate-400 block mb-1">
                    {l.docSubtitle}
                  </label>
                  <input
                    type="text"
                    value={welcomeContent.subtitle}
                    onChange={(e) => updateWelcomeContent({ subtitle: e.target.value })}
                    className="w-full px-3 py-2 sm:py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-base sm:text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    {l.welcomeMessage}
                  </label>
                  <textarea
                    rows={3}
                    value={welcomeContent.welcomeMessage}
                    onChange={(e) => updateWelcomeContent({ welcomeMessage: e.target.value })}
                    className="w-full px-3 py-2 sm:py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-base sm:text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Working Agreements */}
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block">
                  {l.workingAgreements}
                </label>
                {welcomeContent.workingAgreements.map((ag, agIdx) => (
                  <div
                    key={agIdx}
                    className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 space-y-1"
                  >
                    <input
                      type="text"
                      value={ag.title}
                      onChange={(e) => {
                        const workingAgreements = [...welcomeContent.workingAgreements];
                        workingAgreements[agIdx] = { ...workingAgreements[agIdx], title: e.target.value };
                        updateWelcomeContent({ workingAgreements });
                      }}
                      className="w-full px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200"
                    />
                    <input
                      type="text"
                      value={ag.description}
                      onChange={(e) => {
                        const workingAgreements = [...welcomeContent.workingAgreements];
                        workingAgreements[agIdx] = {
                          ...workingAgreements[agIdx],
                          description: e.target.value,
                        };
                        updateWelcomeContent({ workingAgreements });
                      }}
                      className="w-full px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-400"
                    />
                  </div>
                ))}
              </div>

              {/* 72h Checklist */}
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block">
                  {l.checklist72h}
                </label>
                {welcomeContent.checklist72h.map((step, sIdx) => (
                  <div key={sIdx} className="flex items-center space-x-1.5">
                    <span className="text-[10px] text-slate-400">•</span>
                    <input
                      type="text"
                      value={step}
                      onChange={(e) => {
                        const checklist72h = [...welcomeContent.checklist72h];
                        checklist72h[sIdx] = e.target.value;
                        updateWelcomeContent({ checklist72h });
                      }}
                      className="flex-1 px-2 py-1 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200"
                    />
                  </div>
                ))}
              </div>

              {/* Reset to defaults button */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    if (onResetSection) onResetSection('welcomePacket');
                    else updateWelcomeContent(getDefaultWelcomePacketContent(docLang));
                  }}
                  className="inline-flex items-center space-x-1.5 text-[11px] text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>{l.resetDefaults}</span>
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
