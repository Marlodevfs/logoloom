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
  HabitPackId,
  HabitTrackerCustomContent,
  InterfaceLang,
  TemplateId,
} from '@/types';
import { HABIT_PACKS, HabitPack } from '@/lib/i18n/habit-packs';
import { getDefaultHabitTrackerContent } from '@/lib/use-brand-kit';

interface ContentEditorStepProps {
  brandKit: BrandKit;
  onUpdate: (updates: Partial<BrandKit>) => void;
  activeTemplate: TemplateId;
  interfaceLang: InterfaceLang;
  onResetSection?: (section: 'habitTracker') => void;
}

const PACK_ICONS: Record<HabitPackId, React.ComponentType<{ className?: string }>> = {
  wellbeing: Smile,
  fitness: Activity,
  nutrition: Apple,
  sleep: Moon,
  focus: Target,
  blank: Edit3,
};

export const ContentEditorStep: React.FC<ContentEditorStepProps> = ({
  brandKit,
  onUpdate,
  activeTemplate,
  interfaceLang,
  onResetSection,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isFrench = interfaceLang === 'fr';
  const docLang = brandKit.documentLang || 'en';

  const habitContent: HabitTrackerCustomContent =
    brandKit.habitTrackerContent || getDefaultHabitTrackerContent(docLang, 'wellbeing');

  const updateHabitContent = (updates: Partial<HabitTrackerCustomContent>) => {
    const next = { ...habitContent, ...updates };
    onUpdate({ habitTrackerContent: next });
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
        id: `habit-${Date.now()}-${i + 1}`,
        title: h.title,
        subtitle: h.subtitle,
      })),
    });
  };

  // Add a new habit (up to 8)
  const handleAddHabit = () => {
    if (habitContent.habits.length >= 8) return;
    const newIdx = habitContent.habits.length + 1;
    const newHabit = {
      id: `habit-${Date.now()}`,
      title: isFrench ? `Habitude ${newIdx} : ________` : `Habit ${newIdx}: ________`,
      subtitle: isFrench ? 'Objectif quotidien convenu' : 'Daily action to track',
    };
    updateHabitContent({
      habits: [...habitContent.habits, newHabit],
    });
  };

  // Remove a habit (minimum 1)
  const handleRemoveHabit = (idx: number) => {
    if (habitContent.habits.length <= 1) return;
    const updated = habitContent.habits.filter((_, i) => i !== idx);
    updateHabitContent({ habits: updated });
  };

  // Reorder habits
  const handleMoveHabit = (idx: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= habitContent.habits.length) return;
    const updated = [...habitContent.habits];
    const [moved] = updated.splice(idx, 1);
    updated.splice(targetIdx, 0, moved);
    updateHabitContent({ habits: updated });
  };

  // Update specific habit
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
                {isFrench ? '5. Personnaliser le contenu' : '5. Customize Content'}
              </span>
              <span className="text-[10px] text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-1.5 py-0.5 rounded font-semibold">
                {activeTemplate === 'habit-tracker'
                  ? isFrench ? 'Suivi d’habitudes' : 'Habit Tracker'
                  : activeTemplate === 'roadmap-90'
                  ? isFrench ? 'Feuille de route' : 'Roadmap'
                  : isFrench ? 'Pack d’accueil' : 'Welcome Packet'}
              </span>
            </div>
            <span className="text-[10.5px] text-slate-500 dark:text-slate-400 mt-0.5">
              {isFrench
                ? 'Packs d’habitudes, textes et sections personnalisables'
                : 'Habit packs, custom text and toggleable sections'}
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
          {activeTemplate === 'habit-tracker' && (
            <>
              {/* Habit Packs Selection */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{isFrench ? 'Packs d’habitudes (1 clic)' : 'Habit Packs (1 click)'}</span>
                  </label>
                  <span className="text-[10px] text-slate-400">
                    {isFrench ? 'Modifiables après choix' : 'Fully editable'}
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
                      {isFrench ? 'Titre du document' : 'Document Title'}
                    </label>
                    <span
                      className={`text-[10px] font-mono ${
                        (habitContent.title?.length || 0) > 40 ? 'text-amber-500 font-bold' : 'text-slate-400'
                      }`}
                    >
                      {habitContent.title?.length || 0}/45
                    </span>
                  </div>
                  <input
                    type="text"
                    maxLength={45}
                    value={habitContent.title || ''}
                    onChange={(e) => updateHabitContent({ title: e.target.value })}
                    placeholder={isFrench ? 'Suivi d’habitudes 30 jours' : '30-Day Habit Tracker'}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                      {isFrench ? 'Sous-titre' : 'Subtitle'}
                    </label>
                    <span
                      className={`text-[10px] font-mono ${
                        (habitContent.subtitle?.length || 0) > 80 ? 'text-amber-500 font-bold' : 'text-slate-400'
                      }`}
                    >
                      {habitContent.subtitle?.length || 0}/90
                    </span>
                  </div>
                  <input
                    type="text"
                    maxLength={90}
                    value={habitContent.subtitle || ''}
                    onChange={(e) => updateHabitContent({ subtitle: e.target.value })}
                    placeholder={isFrench ? 'La régularité crée des résultats durables.' : 'Small daily actions lead to lasting change.'}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Habits List (1 to 8) */}
              <div className="space-y-2 pt-1 border-t border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    {isFrench
                      ? `Habitudes personnalisées (${habitContent.habits.length}/8)`
                      : `Custom Habits (${habitContent.habits.length}/8)`}
                  </label>
                  {habitContent.habits.length < 8 && (
                    <button
                      type="button"
                      onClick={handleAddHabit}
                      className="inline-flex items-center space-x-1 text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{isFrench ? 'Ajouter' : 'Add habit'}</span>
                    </button>
                  )}
                </div>

                <div className="space-y-2">
                  {habitContent.habits.map((habit, idx) => (
                    <div
                      key={habit.id || idx}
                      className="p-2 rounded-lg border border-slate-200 dark:border-slate-700/80 bg-slate-50/60 dark:bg-slate-800/40 space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1.5">
                          <span
                            className="w-4 h-4 rounded text-[9.5px] font-bold flex items-center justify-center shrink-0"
                            style={{
                              backgroundColor: `${brandKit.brandColor}20`,
                              color: brandKit.brandColor,
                            }}
                          >
                            {idx + 1}
                          </span>
                          <span className="text-[10px] font-semibold text-slate-500">
                            {isFrench ? `Habitude ${idx + 1}` : `Habit ${idx + 1}`}
                          </span>
                        </div>

                        {/* Reorder & Delete actions */}
                        <div className="flex items-center space-x-0.5">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => handleMoveHabit(idx, 'up')}
                            className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-white disabled:opacity-30"
                            title="Move up"
                          >
                            <ArrowUp className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            disabled={idx === habitContent.habits.length - 1}
                            onClick={() => handleMoveHabit(idx, 'down')}
                            className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-white disabled:opacity-30"
                            title="Move down"
                          >
                            <ArrowDown className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            disabled={habitContent.habits.length <= 1}
                            onClick={() => handleRemoveHabit(idx)}
                            className="p-1 rounded text-slate-400 hover:text-red-500 disabled:opacity-30"
                            title="Remove habit"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <input
                        type="text"
                        maxLength={35}
                        value={habit.title}
                        onChange={(e) => handleUpdateHabit(idx, 'title', e.target.value)}
                        placeholder={isFrench ? 'Intitulé de l’habitude' : 'Habit title'}
                        className="w-full px-2 py-1 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-[11px] text-slate-900 dark:text-slate-100 font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                      <input
                        type="text"
                        maxLength={60}
                        value={habit.subtitle}
                        onChange={(e) => handleUpdateHabit(idx, 'subtitle', e.target.value)}
                        placeholder={isFrench ? 'Description courte / consigne' : 'Short description / target'}
                        className="w-full px-2 py-1 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-[10.5px] text-slate-600 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Weekly Questions (Complete style only) */}
              {brandKit.designStyle === 'complete' && habitContent.showWeeklyCheckins && (
                <div className="space-y-2 pt-1 border-t border-slate-100 dark:border-slate-800/80">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block">
                    {isFrench ? 'Questions de bilan hebdomadaire (4 semaines)' : 'Weekly Check-in Prompts (4 weeks)'}
                  </label>
                  <div className="space-y-1.5">
                    {habitContent.weeklyQuestions.map((q, idx) => (
                      <div key={idx} className="flex items-center space-x-1.5">
                        <span className="text-[10px] font-bold text-slate-500 w-7 shrink-0">
                          S{idx + 1}
                        </span>
                        <input
                          type="text"
                          maxLength={80}
                          value={q}
                          onChange={(e) => handleUpdateQuestion(idx, e.target.value)}
                          className="flex-1 px-2 py-1 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-[11px] text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Coach Note (Complete style only) */}
              {brandKit.designStyle === 'complete' && habitContent.showCoachNote && (
                <div className="space-y-1.5 pt-1 border-t border-slate-100 dark:border-slate-800/80">
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                      {isFrench ? 'Mot ou citation du référent' : 'Practitioner note or quote'}
                    </label>
                    <span
                      className={`text-[10px] font-mono ${
                        (habitContent.coachNote?.length || 0) > 110 ? 'text-amber-500 font-bold' : 'text-slate-400'
                      }`}
                    >
                      {habitContent.coachNote?.length || 0}/120
                    </span>
                  </div>
                  <textarea
                    rows={2}
                    maxLength={120}
                    value={habitContent.coachNote || ''}
                    onChange={(e) => updateHabitContent({ coachNote: e.target.value })}
                    placeholder={
                      isFrench
                        ? 'La constance crée des résultats durables. Cochez chaque jour validé avec fierté.'
                        : 'Consistency creates lasting results. Celebrate each day completed.'
                    }
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              )}

              {/* Display Toggles */}
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block">
                  {isFrench ? 'Options d’affichage sur le PDF' : 'Display Options'}
                </label>

                {brandKit.designStyle === 'minimal' ? (
                  <div className="space-y-1.5">
                    <label className="flex items-center justify-between p-2 rounded-lg border border-slate-200 dark:border-slate-700/80 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer">
                      <span className="text-[11px] text-slate-700 dark:text-slate-300">
                        {isFrench ? 'Colonne "Notes" à droite' : '"Notes" column on the right'}
                      </span>
                      <input
                        type="checkbox"
                        checked={Boolean(habitContent.showNotesColumn)}
                        onChange={(e) => updateHabitContent({ showNotesColumn: e.target.checked })}
                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                      />
                    </label>

                    <label className="flex items-center justify-between p-2 rounded-lg border border-slate-200 dark:border-slate-700/80 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer">
                      <span className="text-[11px] text-slate-700 dark:text-slate-300">
                        {isFrench ? 'Ligne "Score total" en bas' : '"Total Score" row at the bottom'}
                      </span>
                      <input
                        type="checkbox"
                        checked={Boolean(habitContent.showScoreRow)}
                        onChange={(e) => updateHabitContent({ showScoreRow: e.target.checked })}
                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                      />
                    </label>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <label className="flex items-center justify-between p-2 rounded-lg border border-slate-200 dark:border-slate-700/80 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer">
                      <span className="text-[11px] text-slate-700 dark:text-slate-300">
                        {isFrench ? 'Colonne score (___ / 30)' : 'Score column (___ / 30)'}
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
                        {isFrench ? 'Bilans hebdomadaires (4 semaines)' : 'Weekly check-in cards'}
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
                        {isFrench ? 'Encadré conseil du référent' : 'Practitioner advice block'}
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
                  <span>{isFrench ? 'Rétablir le contenu par défaut' : 'Reset to defaults'}</span>
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
