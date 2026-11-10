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
  TemplateId,
} from '@/types';
import { HABIT_PACKS, HabitPack } from '@/lib/i18n/habit-packs';
import { getDefaultHabitTrackerContent } from '@/lib/use-brand-kit';
import { CvEditor } from './CvEditor';

interface ContentEditorStepProps {
  brandKit: BrandKit;
  onUpdate: (updates: Partial<BrandKit>) => void;
  activeTemplate: TemplateId;
  interfaceLang: InterfaceLang;
  onResetSection?: (templateId: TemplateId) => void;
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
    stepSub: string;
    cvStepTitle: string;
    cvStepSub: string;
    habitPacksTitle: string;
    fullyEditable: string;
    docTitle: string;
    dailyHabitsTitle: string;
    addHabit: string;
    displayOptions: string;
    optNotesCol: string;
    optScoreRow: string;
    resetDefaults: string;
    moveUp: string;
    moveDown: string;
    deleteHabit: string;
    habitTitlePlaceholder: string;
    habitSubtitlePlaceholder: string;
    clickToEditDirectly: string;
  }
> = {
  fr: {
    stepTitle: '5. Personnaliser le contenu',
    stepSub: 'Packs d’habitudes, textes et sections personnalisables',
    cvStepTitle: '4. Votre CV',
    cvStepSub: 'Expériences, formation, compétences, langues, photo',
    habitPacksTitle: 'Packs d’habitudes (1 clic)',
    fullyEditable: 'Modifiables après choix',
    docTitle: 'Titre du document',
    dailyHabitsTitle: 'Habitudes quotidiennes (3 à 7)',
    addHabit: 'Ajouter',
    displayOptions: 'Options d’affichage sur le PDF',
    optNotesCol: 'Colonne "Notes" à droite',
    optScoreRow: 'Ligne "Score total" en bas',
    resetDefaults: 'Rétablir le contenu par défaut',
    moveUp: 'Monter',
    moveDown: 'Descendre',
    deleteHabit: 'Supprimer',
    habitTitlePlaceholder: 'Titre de l’habitude',
    habitSubtitlePlaceholder: 'Objectif court / description',
    clickToEditDirectly: 'Astuce : Vous pouvez aussi modifier n’importe quel texte directement en cliquant dessus dans l’aperçu à droite.',
  },
  en: {
    stepTitle: '5. Customize Content',
    stepSub: 'Habit packs, custom text and toggleable sections',
    cvStepTitle: '4. Your CV',
    cvStepSub: 'Experience, education, skills, languages, photo',
    habitPacksTitle: 'Habit Packs (1 click)',
    fullyEditable: 'Fully editable',
    docTitle: 'Document Title',
    dailyHabitsTitle: 'Daily Habits (3 to 7)',
    addHabit: 'Add',
    displayOptions: 'Display options on print',
    optNotesCol: 'Right "Notes" column',
    optScoreRow: 'Bottom "Total Score" row',
    resetDefaults: 'Reset to default content',
    moveUp: 'Move up',
    moveDown: 'Move down',
    deleteHabit: 'Delete',
    habitTitlePlaceholder: 'Habit title',
    habitSubtitlePlaceholder: 'Brief goal / description',
    clickToEditDirectly: 'Tip: You can also edit any text directly by clicking on it in the live preview on the right.',
  },
  de: {
    stepTitle: '5. Inhalt anpassen',
    stepSub: 'Gewohnheiten-Pakete und Textinhalte',
    cvStepTitle: '4. Ihr Lebenslauf',
    cvStepSub: 'Berufserfahrung, Ausbildung, Kenntnisse, Sprachen, Foto',
    habitPacksTitle: 'Gewohnheiten-Pakete (1 Klick)',
    fullyEditable: 'Frei anpassbar',
    docTitle: 'Dokumententitel',
    dailyHabitsTitle: 'Tägliche Gewohnheiten (3 bis 7)',
    addHabit: 'Hinzufügen',
    displayOptions: 'Druck- und Anzeigeoptionen',
    optNotesCol: 'Rechte "Notizen"-Spalte',
    optScoreRow: 'Untere "Gesamtscore"-Zeile',
    resetDefaults: 'Auf Standardwerte zurücksetzen',
    moveUp: 'Nach oben',
    moveDown: 'Nach unten',
    deleteHabit: 'Löschen',
    habitTitlePlaceholder: 'Titel der Gewohnheit',
    habitSubtitlePlaceholder: 'Kurzes Ziel / Beschreibung',
    clickToEditDirectly: 'Tipp: Sie können jeden Text auch direkt in der Live-Vorschau bearbeiten.',
  },
  es: {
    stepTitle: '5. Personalizar contenido',
    stepSub: 'Packs de hábitos y textos personalizables',
    cvStepTitle: '4. Tu currículum',
    cvStepSub: 'Experiencia, formación, competencias, idiomas, foto',
    habitPacksTitle: 'Packs de hábitos (1 clic)',
    fullyEditable: 'Totalmente editable',
    docTitle: 'Título del documento',
    dailyHabitsTitle: 'Hábitos diarios (3 a 7)',
    addHabit: 'Añadir',
    displayOptions: 'Opciones de visualización',
    optNotesCol: 'Columna "Notas" a la derecha',
    optScoreRow: 'Fila "Puntuación total" abajo',
    resetDefaults: 'Restablecer contenido inicial',
    moveUp: 'Subir',
    moveDown: 'Bajar',
    deleteHabit: 'Eliminar',
    habitTitlePlaceholder: 'Título del hábito',
    habitSubtitlePlaceholder: 'Objetivo corto / descripción',
    clickToEditDirectly: 'Consejo: Puede editar cualquier texto haciendo clic directamente en la vista previa.',
  },
  it: {
    stepTitle: '5. Personalizza i Contenuti',
    stepSub: 'Pacchetti abitudini e testi personalizzati',
    cvStepTitle: '4. Il tuo CV',
    cvStepSub: 'Esperienze, formazione, competenze, lingue, foto',
    habitPacksTitle: 'Pacchetti abitudini (1 clic)',
    fullyEditable: 'Completamente modificabile',
    docTitle: 'Titolo del documento',
    dailyHabitsTitle: 'Abitudini giornaliere (3 a 7)',
    addHabit: 'Aggiungi',
    displayOptions: 'Opzioni di visualizzazione',
    optNotesCol: 'Colonna "Note" a destra',
    optScoreRow: 'Riga "Punteggio totale" in basso',
    resetDefaults: 'Ripristina contenuti predefiniti',
    moveUp: 'Sposta su',
    moveDown: 'Sposta giù',
    deleteHabit: 'Elimina',
    habitTitlePlaceholder: 'Titolo dell’abitudine',
    habitSubtitlePlaceholder: 'Breve descrizione',
    clickToEditDirectly: 'Suggerimento: Puoi modificare qualsiasi testo cliccandoci direttamente sopra nell’anteprima.',
  },
  pt: {
    stepTitle: '5. Personalizar Conteúdo',
    stepSub: 'Pacotes de hábitos e textos sob medida',
    cvStepTitle: '4. O seu CV',
    cvStepSub: 'Experiência, formação, competências, línguas, foto',
    habitPacksTitle: 'Pacotes de hábitos (1 clique)',
    fullyEditable: 'Totalmente editável',
    docTitle: 'Título do documento',
    dailyHabitsTitle: 'Hábitos diários (3 a 7)',
    addHabit: 'Adicionar',
    displayOptions: 'Opções de exibição no impresso',
    optNotesCol: 'Coluna "Notas" à direita',
    optScoreRow: 'Linha de pontuação no rodapé',
    resetDefaults: 'Restaurar conteúdo padrão',
    moveUp: 'Subir',
    moveDown: 'Descer',
    deleteHabit: 'Excluir',
    habitTitlePlaceholder: 'Título do hábito',
    habitSubtitlePlaceholder: 'Breve descrição / meta',
    clickToEditDirectly: 'Dica: Você também pode editar qualquer texto diretamente clicando nele na pré-visualização.',
  },
};

export const ContentEditorStep: React.FC<ContentEditorStepProps> = ({
  brandKit,
  onUpdate,
  activeTemplate,
  interfaceLang,
  onResetSection,
}) => {
  const isCv = activeTemplate === 'cv';
  // A CV is useless until filled in: open the editor straight away.
  const [isOpen, setIsOpen] = useState(isCv);
  React.useEffect(() => {
    if (isCv) setIsOpen(true);
  }, [isCv]);
  const docLang: DocumentLang = brandKit.documentLang || 'en';
  const l = LABELS[interfaceLang] || LABELS.en;

  const habitContent: HabitTrackerCustomContent =
    brandKit.habitTrackerContent || getDefaultHabitTrackerContent(docLang, 'wellbeing');

  const updateHabitContent = (updates: Partial<HabitTrackerCustomContent>) => {
    onUpdate({
      habitTrackerContent: { ...habitContent, ...updates },
    });
  };

  const handleApplyPack = (packId: HabitPackId) => {
    const pack: HabitPack = (HABIT_PACKS[docLang] && HABIT_PACKS[docLang][packId]) || HABIT_PACKS.en.wellbeing;
    const newHabits: HabitItem[] = pack.habits.slice(0, 5).map((h, i) => ({
      id: `habit-${Date.now()}-${i}`,
      title: h.title,
      subtitle: h.subtitle,
    }));

    updateHabitContent({
      packId,
      habits: newHabits,
    });
  };

  const handleAddHabit = () => {
    if ((habitContent.habits || []).length >= 7) return;
    const newHabit: HabitItem = {
      id: `habit-${Date.now()}`,
      title: l.habitTitlePlaceholder,
      subtitle: l.habitSubtitlePlaceholder,
    };
    updateHabitContent({
      habits: [...(habitContent.habits || []), newHabit],
    });
  };

  const handleUpdateHabit = (idx: number, updates: Partial<HabitItem>) => {
    const newHabits = [...(habitContent.habits || [])];
    if (!newHabits[idx]) return;
    newHabits[idx] = { ...newHabits[idx], ...updates };
    updateHabitContent({ habits: newHabits });
  };

  const handleDeleteHabit = (idx: number) => {
    if ((habitContent.habits || []).length <= 3) return;
    const newHabits = (habitContent.habits || []).filter((_, i) => i !== idx);
    updateHabitContent({ habits: newHabits });
  };

  const handleMoveHabit = (idx: number, direction: 'up' | 'down') => {
    const habits = [...(habitContent.habits || [])];
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= habits.length) return;
    const temp = habits[idx];
    habits[idx] = habits[targetIdx];
    habits[targetIdx] = temp;
    updateHabitContent({ habits });
  };

  const packsList: { id: HabitPackId; name: string }[] = [
    { id: 'wellbeing', name: HABIT_PACKS[docLang]?.wellbeing?.name || 'Bien-être' },
    { id: 'fitness', name: HABIT_PACKS[docLang]?.fitness?.name || 'Sport' },
    { id: 'nutrition', name: HABIT_PACKS[docLang]?.nutrition?.name || 'Nutrition' },
    { id: 'sleep', name: HABIT_PACKS[docLang]?.sleep?.name || 'Sommeil' },
    { id: 'focus', name: HABIT_PACKS[docLang]?.focus?.name || 'Focus' },
    { id: 'blank', name: HABIT_PACKS[docLang]?.blank?.name || 'Vierge' },
  ];

  return (
    <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 overflow-hidden shadow-xs">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-3 sm:p-3.5 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
      >
        <div className="flex items-center space-x-2.5">
          <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <Sliders className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                {isCv ? l.cvStepTitle : l.stepTitle}
              </h3>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">
              {isCv ? l.cvStepSub : l.stepSub}
            </p>
          </div>
        </div>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-slate-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-400" />
        )}
      </button>

      {isOpen && (
        <div className="p-3 sm:p-4 border-t border-slate-100 dark:border-slate-800/80 space-y-4">
          {isCv && <CvEditor brandKit={brandKit} onUpdate={onUpdate} interfaceLang={interfaceLang} />}

          {/* Tip: In-preview editing (the CV is edited in the form above) */}
          {!isCv && (
            <>
          {/* Tip: In-preview editing */}
          <div className="p-2.5 rounded-lg bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-800/40 text-[10.5px] text-indigo-900 dark:text-indigo-200 flex items-start space-x-2">
            <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
            <p className="leading-snug">{l.clickToEditDirectly}</p>
          </div>
            </>
          )}

          {/* Habit Tracker Custom Controls */}
          {activeTemplate === 'habit-tracker' && (
            <>
              {/* Habit Packs */}
              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                  {l.habitPacksTitle}
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {packsList.map((pack) => {
                    const Icon = PACK_ICONS[pack.id] || Smile;
                    const isActive = habitContent.packId === pack.id;
                    return (
                      <button
                        key={pack.id}
                        type="button"
                        onClick={() => handleApplyPack(pack.id)}
                        className={`py-1.5 px-2 rounded-lg border text-left flex items-center space-x-1.5 transition-all ${
                          isActive
                            ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-bold'
                            : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5 shrink-0" />
                        <span className="text-[10px] truncate">{pack.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Habits List */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    {l.dailyHabitsTitle}
                  </label>
                  {(habitContent.habits || []).length < 7 && (
                    <button
                      type="button"
                      onClick={handleAddHabit}
                      className="inline-flex items-center space-x-1 text-[10.5px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      <Plus className="w-3 h-3" />
                      <span>{l.addHabit}</span>
                    </button>
                  )}
                </div>

                <div className="space-y-1.5">
                  {(habitContent.habits || []).map((habit, idx) => (
                    <div
                      key={habit.id || idx}
                      className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 space-y-1"
                    >
                      <div className="flex items-center space-x-1.5">
                        <span className="text-[9.5px] font-mono text-slate-400 w-3">{idx + 1}.</span>
                        <input
                          type="text"
                          value={habit.title}
                          onChange={(e) => handleUpdateHabit(idx, { title: e.target.value })}
                          placeholder={l.habitTitlePlaceholder}
                          className="flex-1 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-slate-100"
                        />
                        <button
                          type="button"
                          onClick={() => handleMoveHabit(idx, 'up')}
                          disabled={idx === 0}
                          className="p-1 text-slate-400 hover:text-slate-600 disabled:opacity-30"
                          title={l.moveUp}
                        >
                          <ArrowUp className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoveHabit(idx, 'down')}
                          disabled={idx === (habitContent.habits || []).length - 1}
                          className="p-1 text-slate-400 hover:text-slate-600 disabled:opacity-30"
                          title={l.moveDown}
                        >
                          <ArrowDown className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteHabit(idx)}
                          disabled={(habitContent.habits || []).length <= 3}
                          className="p-1 text-rose-500 hover:text-rose-700 disabled:opacity-30"
                          title={l.deleteHabit}
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                      <input
                        type="text"
                        value={habit.subtitle}
                        onChange={(e) => handleUpdateHabit(idx, { subtitle: e.target.value })}
                        placeholder={l.habitSubtitlePlaceholder}
                        className="w-full px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-[10px] text-slate-600 dark:text-slate-400"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
                <label className="flex items-center justify-between p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer">
                  <span className="text-[11px] text-slate-700 dark:text-slate-300 font-medium">
                    {l.optNotesCol}
                  </span>
                  <input
                    type="checkbox"
                    checked={Boolean(habitContent.showNotesColumn)}
                    onChange={(e) => updateHabitContent({ showNotesColumn: e.target.checked })}
                    className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                  />
                </label>
                <label className="flex items-center justify-between p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer">
                  <span className="text-[11px] text-slate-700 dark:text-slate-300 font-medium">
                    {l.optScoreRow}
                  </span>
                  <input
                    type="checkbox"
                    checked={Boolean(habitContent.showScoreRow)}
                    onChange={(e) => updateHabitContent({ showScoreRow: e.target.checked })}
                    className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                  />
                </label>
              </div>
            </>
          )}

          {/* Reset section button */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            <button
              type="button"
              onClick={() => onResetSection && onResetSection(activeTemplate)}
              className="inline-flex items-center space-x-1.5 text-[11px] text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{l.resetDefaults}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
