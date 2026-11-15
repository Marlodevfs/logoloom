export type PaperSize = 'a4' | 'letter';

export type TemplateFamily = 'career' | 'organisation' | 'home';

export type TemplateId =
  // Personal organization (7)
  | 'habit-tracker'
  | 'goal-planner-90'
  | 'weekly-planner'
  | 'monthly-calendar'
  | 'daily-priorities'
  | 'meal-planner'
  | 'budget-tracker'
  // Business (5)
  | 'checklist'
  // Career (2)
  | 'cv'
  | 'business-card';

export type DesignStyle = 'minimal' | 'complete';

export type InterfaceLang = 'en' | 'fr' | 'es' | 'de' | 'pt' | 'it';
export type DocumentLang = 'en' | 'fr' | 'es' | 'de' | 'pt' | 'it';

export type WeekStartDay = 'monday' | 'sunday';

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
  showNotesColumn?: boolean;
  showScoreRow?: boolean;
}

export interface GoalPhaseCustom {
  title: string;
  focus: string;
  milestones: string[];
  kpi: string;
}

export interface GoalPlannerCustomContent {
  title: string;
  subtitle: string;
  goals: [string, string, string];
  whyItMatters: string;
  phases: [GoalPhaseCustom, GoalPhaseCustom, GoalPhaseCustom];
  notes: string;
}

export interface WeeklyPlannerCustomContent {
  title: string;
  subtitle: string;
  priorities: [string, string, string];
  notes: string;
}

export interface MonthlyCalendarCustomContent {
  title: string;
  monthName: string;
  year: string;
  goals: [string, string, string];
  notes: string;
}

export interface DailyPrioritiesCustomContent {
  title: string;
  subtitle: string;
  priorities: [string, string, string];
  tasks: Array<{ text: string; done: boolean }>;
  gratitude: string;
  notes: string;
}

export interface MealPlannerDayCustom {
  breakfast: string;
  lunch: string;
  dinner: string;
  snack: string;
}

export interface MealPlannerCustomContent {
  title: string;
  subtitle: string;
  days: MealPlannerDayCustom[];
  shoppingItems: string[];
}

export interface BudgetItemCustom {
  description: string;
  planned: number;
  actual: number;
}

export interface BudgetTrackerCustomContent {
  title: string;
  period: string;
  income: BudgetItemCustom[];
  fixedExpenses: BudgetItemCustom[];
  variableExpenses: BudgetItemCustom[];
  savingsGoal: number;
  notes: string;
}







export interface ChecklistGroupCustom {
  groupName: string;
  items: Array<{ text: string; done: boolean }>;
}

export interface CvExperience {
  role: string;
  company: string;
  location: string;
  start: string;
  end: string;
  /** One achievement per line. */
  details: string;
}

export interface CvEducation {
  degree: string;
  school: string;
  start: string;
  end: string;
  details: string;
}

export interface CvLanguage {
  name: string;
  level: string;
}

export type CvLayout = 'classic' | 'sidebar';

export interface CvCustomContent {
  layout: CvLayout;
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  city: string;
  /** LinkedIn, portfolio or website. */
  link: string;
  /** Small JPEG data URL (resized in the browser), or null. */
  photoUrl: string | null;
  summary: string;
  experiences: CvExperience[];
  education: CvEducation[];
  skills: string[];
  languages: CvLanguage[];
  interests: string;
}

export type CardLayout = 'classic' | 'band' | 'centered';

/** Business card. Colour and logo come from the brand kit (brandColor, logoUrl). */
export interface BusinessCardContent {
  layout: CardLayout;
  fullName: string;
  jobTitle: string;
  company: string;
  phone: string;
  email: string;
  website: string;
  address: string;
  /** QR code printed on the card (front, or back for the centered layout). */
  showQr: boolean;
  /** QR target; the website is used when empty. */
  qrUrl: string;
  /** Print a back side (logo, tagline). */
  backSide: boolean;
  backText: string;
  /** 'eu' 85 × 55 mm, 'us' 3.5 × 2 in. */
  cardSize: 'eu' | 'us';
  /** 'sheet': A4/Letter page of cards with crop marks; 'printer': one card per page with 3 mm bleed. */
  output: 'sheet' | 'printer';
}

/** Cover letter written next to the CV. Sender name, email and phone come from the CV. */
export interface CoverLetterContent {
  /** Street address of the sender (optional; the CV city is used when empty). */
  senderAddress: string;
  /** Recipient block, one line per line (name, company, address). */
  recipient: string;
  /** Place written before the date; the CV city is used when empty. */
  place: string;
  /** Free text date; today's date in the document language when empty. */
  date: string;
  /** Subject without its prefix ("Objet :" is added per language). */
  subject: string;
  salutation: string;
  /** Paragraphs separated by blank lines. */
  body: string;
  closing: string;
}

export interface ChecklistCustomContent {
  title: string;
  subtitle: string;
  groups: ChecklistGroupCustom[];
  notes: string;
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
  designStyle: DesignStyle;
  isPro: boolean;
  removeWatermark: boolean;
  selectedTemplate?: TemplateId;
  weekStart?: WeekStartDay;
  currency?: string;

  // Template contents
  habitTrackerContent?: HabitTrackerCustomContent;
  goalPlannerContent?: GoalPlannerCustomContent;
  weeklyPlannerContent?: WeeklyPlannerCustomContent;
  monthlyCalendarContent?: MonthlyCalendarCustomContent;
  dailyPrioritiesContent?: DailyPrioritiesCustomContent;
  mealPlannerContent?: MealPlannerCustomContent;
  budgetTrackerContent?: BudgetTrackerCustomContent;
  checklistContent?: ChecklistCustomContent;
  cvContent?: CvCustomContent;
  letterContent?: CoverLetterContent;
  cardContent?: BusinessCardContent;
}

export interface TemplateConfig {
  id: TemplateId;
  family: TemplateFamily;
  nameKey: string;
  descriptionKey: string;
  badgeKey: string;
  iconName: string;
}
