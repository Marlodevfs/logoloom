export type PaperSize = 'a4' | 'letter';

export type TemplateId = 'habit-tracker' | 'roadmap-90' | 'welcome-packet';

export type InterfaceLang = 'en' | 'fr' | 'es' | 'de' | 'pt' | 'it';
export type DocumentLang = 'en' | 'fr' | 'es' | 'de' | 'pt' | 'it';

export type HabitPackId = 'wellbeing' | 'fitness' | 'nutrition' | 'sleep' | 'focus' | 'blank';

export interface HabitItem {
  id: string;
  title: string;
  subtitle: string;
}

export interface HabitTrackerCustomContent {
  packId: HabitPackId;
  title: string;
  subtitle: string;
  habits: HabitItem[];
  weeklyQuestions: [string, string, string, string];
  coachNote: string;
  showScoreColumn: boolean;
  showWeeklyCheckins: boolean;
  showCoachNote: boolean;
}

export interface RoadmapPhaseCustom {
  title: string;
  daysLabel: string;
  deliverables: string[];
  kpi: string;
}

export interface RoadmapCustomContent {
  title: string;
  subtitle: string;
  mission: string;
  horizon: string;
  phases: [RoadmapPhaseCustom, RoadmapPhaseCustom, RoadmapPhaseCustom];
  showSignatureBlock: boolean;
}

export interface WelcomeAgreementCustom {
  title: string;
  description: string;
}

export interface WelcomePacketCustomContent {
  title: string;
  subtitle: string;
  welcomeMessage: string;
  channels: string;
  turnaroundTime: string;
  meetingRhythm: string;
  urgentProcedure: string;
  workingAgreements: WelcomeAgreementCustom[];
  checklist72h: string[];
}

export interface BrandKit {
  logoUrl: string | null;
  brandColor: string; // Hex color
  contrastText: '#000000' | '#FFFFFF';
  companyName: string;
  tagline: string;
  coachName: string;
  clientName: string;
  contactEmail: string;
  qrUrl: string;
  qrLabel?: string;
  paperSize: PaperSize;
  documentLang: DocumentLang;
  isPro: boolean;
  removeWatermark: boolean;
  selectedTemplate?: TemplateId;
  habitTrackerContent?: HabitTrackerCustomContent;
  roadmapContent?: RoadmapCustomContent;
  welcomePacketContent?: WelcomePacketCustomContent;
}

export interface HabitCategory {
  id: string;
  name: string;
  targetCount?: number;
}

export interface HabitTrackerData {
  title: string;
  subtitle: string;
  monthName: string;
  categories: HabitCategory[];
  weeklyReflections: string[];
}

export interface RoadmapPhase {
  phaseNumber: number;
  daysLabel: string;
  title: string;
  description: string;
  deliverables: string[];
  kpi: string;
}

export interface Roadmap90Data {
  title: string;
  subtitle: string;
  clientGoal: string;
  startDate: string;
  phases: RoadmapPhase[];
}

export interface WelcomeAgreement {
  title: string;
  description: string;
}

export interface WelcomePacketData {
  title: string;
  subtitle: string;
  welcomeMessage: string;
  communicationChannels: string;
  turnaroundTime: string;
  workingAgreements: WelcomeAgreement[];
  nextSteps: string[];
}

export interface TemplateConfig {
  id: TemplateId;
  nameKey: string;
  descriptionKey: string;
  badgeKey: string;
  iconName: string;
}
