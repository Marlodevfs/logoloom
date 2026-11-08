import { DocumentLang } from '@/types';

export interface HabitItem {
  title: string;
  subtitle: string;
}

export interface DocumentContent {
  habitTracker: {
    headerCategory: string;
    headerSubtitleRight: string;
    title: string;
    subtitle: string;
    clientPrompt: string;
    periodPrompt: string;
    periodPlaceholder: string;
    goalPrompt: string;
    goalPlaceholder: string;
    coachPrompt: string;
    habitsHeader: string;
    scoreHeader: string;
    monthPrompt: string;
    habitPlaceholder: string;
    daysHeader: string;
    categories: {
      movement: string;
      mindset: string;
      nutrition: string;
      productivity: string;
    };
    habitsList: HabitItem[];
    milestones: {
      day7: string;
      day14: string;
      day21: string;
      day30: string;
    };
    weeklyReflectionTitle: string;
    weekNames: string[];
    reflectionPrompts: string[];
    coachNoteTitle: string;
    coachNotePlaceholder: string;
    coachNoteDefault: string;
    confidentialTag: string;
    scanToBookTitle: string;
    qrPrompt: string;
  };
  roadmap90: {
    title: string;
    subtitle: string;
    initiativePrompt: string;
    clientPrompt: string;
    timelinePrompt: string;
    phase1: {
      number: string;
      range: string;
      title: string;
      deliverables: string[];
      kpiLabel: string;
      kpiValue: string;
    };
    phase2: {
      number: string;
      range: string;
      title: string;
      deliverables: string[];
      kpiLabel: string;
      kpiValue: string;
    };
    phase3: {
      number: string;
      range: string;
      title: string;
      deliverables: string[];
      kpiLabel: string;
      kpiValue: string;
    };
    signoffTitle: string;
    clientSign: string;
    leadSign: string;
    qrPrompt: string;
  };
  welcomePacket: {
    title: string;
    subtitle: string;
    welcomeHeader: string;
    welcomeBody: string;
    commHeader: string;
    commSub: string;
    commItems: { label: string; text: string }[];
    agreementsHeader: string;
    agreements: { title: string; desc: string }[];
    firstStepsHeader: string;
    firstSteps: string[];
    schedulePrompt: string;
    qrPrompt: string;
  };
  footer: {
    madeWith: string;
    confidential: string;
    scanToBook: string;
    page: string;
  };
}

export const DOCUMENT_TRANSLATIONS: Record<DocumentLang, DocumentContent> = {
  en: {
    habitTracker: {
      headerCategory: 'PERFORMANCE COACHING PROTOCOL',
      headerSubtitleRight: 'HABIT MATRIX • 30-DAY SPRINT',
      title: '30-Day Daily Habit & Momentum Tracker',
      subtitle: 'Consistent daily execution creates compounding transformation. Check off each validated day.',
      clientPrompt: 'Client:',
      periodPrompt: 'Period:',
      periodPlaceholder: 'From ____ / ____ to ____ / ____',
      goalPrompt: 'Monthly Core Objective:',
      goalPlaceholder: 'Define your primary breakthrough intention...',
      coachPrompt: 'Lead Coach / Guide:',
      habitsHeader: 'CORE HABITS & ROUTINES',
      scoreHeader: 'SCORE',
      monthPrompt: 'Month / Cycle',
      categories: {
        movement: '1. Physical Vitality & Movement',
        mindset: '2. Deep Work & Strategic Focus',
        nutrition: '3. Nutrition, Hydration & Sleep',
        productivity: '4. Mindset & Daily Reflection',
      },
      habitsList: [
        { title: '1. Physical Vitality & Energy', subtitle: '2L water upon waking, daily mobility & brisk walk' },
        { title: '2. Strategic Deep Work Block', subtitle: '90 minutes uninterrupted focus without notifications' },
        { title: '3. Nutrition, Recovery & Sleep', subtitle: 'Whole nutrient-dense meals & 8 hours restorative sleep' },
        { title: '4. Mental Clarity & Evening Review', subtitle: 'Log daily wins and write top 3 priorities for tomorrow' },
        { title: '5. Custom Excellence Habit', subtitle: 'High-impact personal ritual defined with your coach' },
      ],
      habitPlaceholder: 'Define your primary routine...',
      daysHeader: 'Days 1 to 30',
      milestones: {
        day7: 'Day 07: Establishing Rhythm',
        day14: 'Day 14: Overcoming Friction',
        day21: 'Day 21: Neural Pathway Formed',
        day30: 'Day 30: Identity Shift Achieved',
      },
      weeklyReflectionTitle: 'WEEKLY REFLECTION & HANDWRITTEN CHECK-INS',
      weekNames: ['WEEK 01', 'WEEK 02', 'WEEK 03', 'WEEK 04'],
      reflectionPrompts: [
        'Week 1 Win: What brought the most momentum?',
        'Week 2 Resistance: Where did friction appear & how was it met?',
        'Week 3 Breakthrough: What routine now feels automatic?',
        'Week 4 Mastery: Key transformation to carry into next cycle',
      ],
      coachNoteTitle: 'COACH GUIDANCE & ACCOUNTABILITY AGREEMENT',
      coachNotePlaceholder: 'Focus on showing up 1% better every day. Missing one day is human; never miss two in a row.',
      coachNoteDefault: 'Focus on showing up 1% better every day. Missing one day is human; never miss two in a row.',
      confidentialTag: 'CONFIDENTIAL CLIENT PERFORMANCE PLAN',
      scanToBookTitle: 'Scan to schedule progress review:',
      qrPrompt: 'Scan to log check-in or schedule review',
    },
    roadmap90: {
      title: '90-Day Strategic Transformation Roadmap',
      subtitle: 'Structured milestones, key deliverables, and measurable success metrics for our collaboration.',
      initiativePrompt: 'Project / Initiative',
      clientPrompt: 'Client Partner',
      timelinePrompt: 'Target Execution Horizon',
      phase1: {
        number: 'PHASE 01',
        range: 'Days 01 – 30',
        title: 'Foundation, Audit & Quick Wins',
        deliverables: [
          'Comprehensive baseline audit & operational gap analysis',
          'Clarify high-impact priorities and resource allocation',
          'Deploy first set of quick-win systems & workflows',
          'Establish weekly cadence & reporting dashboards',
        ],
        kpiLabel: 'Phase 1 Key Target:',
        kpiValue: '100% baseline audit complete & initial bottlenecks resolved',
      },
      phase2: {
        number: 'PHASE 02',
        range: 'Days 31 – 60',
        title: 'Core Implementation & Acceleration',
        deliverables: [
          'Execute primary strategic shifts across core workflows',
          'Test and validate iterative improvements in real time',
          'Team coaching, capability building & SOP documentation',
          'Mid-point progress review & strategy recalibration',
        ],
        kpiLabel: 'Phase 2 Key Target:',
        kpiValue: 'Core systems active with verified 25%+ throughput lift',
      },
      phase3: {
        number: 'PHASE 03',
        range: 'Days 61 – 90',
        title: 'Optimization, Scale & Autonomy',
        deliverables: [
          'Refine automated feedback loops and quality safeguards',
          'Finalize self-sustaining playbooks and client handover',
          'Long-term KPI tracking dashboard operationalized',
          'Executive retrospective & next quarter growth roadmap',
        ],
        kpiLabel: 'Phase 3 Key Target:',
        kpiValue: 'Full autonomous execution & target ROI achieved',
      },
      signoffTitle: 'Milestone Execution & Bilateral Sign-off',
      clientSign: 'Client Representative Signature',
      leadSign: 'Lead Coach / Advisor Signature',
      qrPrompt: 'Scan to access project workspace and files',
    },
    welcomePacket: {
      title: 'Client Welcome & Onboarding Guide',
      subtitle: 'Clear rules of engagement, communication standards, and first 72-hour kickoff checklist.',
      welcomeHeader: 'Welcome to our strategic partnership',
      welcomeBody: 'We are thrilled to embark on this journey together. Our mission is to produce tangible, high-leverage outcomes through rigorous execution and transparent collaboration. This packet sets out our shared principles for success.',
      commHeader: 'Communication Protocols & Response Times',
      commSub: 'How we coordinate effectively to respect focus time and eliminate ambiguity',
      commItems: [
        { label: 'Primary Channel', text: 'Asynchronous updates and file sharing via dedicated Slack / portal' },
        { label: 'Response SLA', text: 'All written inquiries answered within 24 business hours (Mon–Fri)' },
        { label: 'Weekly Check-in', text: '45-minute focused strategy call at your scheduled weekly recurring slot' },
        { label: 'Urgent Matters', text: 'Direct SMS / phone escalation for mission-critical production blockers' },
      ],
      agreementsHeader: 'Core Working Agreements',
      agreements: [
        { title: 'Radical Ownership', desc: 'We take complete responsibility for deliverables and expect client commitment to agreed action items.' },
        { title: 'No-Surprise Transparency', desc: 'Obstacles and timeline risks are flagged immediately so we can pivot collaboratively without drama.' },
        { title: 'Protected Deep Work', desc: 'We favor asynchronous clarity over unnecessary meetings to maximize high-value thinking.' },
      ],
      firstStepsHeader: 'First 72-Hour Kickoff Checklist',
      firstSteps: [
        'Complete the client discovery questionnaire (estimated 15 mins)',
        'Accept invitations to shared workspace, Google Drive, and dashboard',
        'Upload your brand assets, historical data, and relevant logins',
        'Confirm attendance for our official Kickoff Strategy Session',
      ],
      schedulePrompt: 'Schedule your Kickoff Strategy Session via the QR code below',
      qrPrompt: 'Scan to schedule your Kickoff Session',
    },
    footer: {
      madeWith: 'Document generated with LogoLoom',
      confidential: 'Strictly Confidential & Proprietary',
      scanToBook: 'Scan to contact or book',
      page: 'Page 1 of 1',
    },
  },
  fr: {
    habitTracker: {
      headerCategory: 'PROTOCOLE DE COACHING DE PERFORMANCE',
      headerSubtitleRight: 'MATRICE D’HABITUDES • CYCLE 30 JOURS',
      title: 'Suivi Quotidien d’Habitudes & Dynamique 30 Jours',
      subtitle: 'La constance quotidienne crée la transformation durable. Cochez chaque jour validé avec rigueur.',
      clientPrompt: 'Client :',
      periodPrompt: 'Période :',
      periodPlaceholder: 'Du ____ / ____ au ____ / ____',
      goalPrompt: 'Objectif prioritaire du mois :',
      goalPlaceholder: 'Définir l’intention majeure de ce cycle...',
      coachPrompt: 'Coach référent :',
      habitsHeader: 'HABITUDES & RITUELS CLÉS',
      scoreHeader: 'SCORE',
      monthPrompt: 'Mois / Cycle',
      categories: {
        movement: '1. Énergie Physique & Mouvement',
        mindset: '2. Focus Stratégique & Travail Profond',
        nutrition: '3. Nutrition, Hydratation & Sommeil',
        productivity: '4. Clarté Mentale & Bilan du Soir',
      },
      habitsList: [
        { title: '1. Énergie Physique & Vitalité', subtitle: '2L d’eau au réveil, marche active & hydratation' },
        { title: '2. Focus Stratégique & Travail Profond', subtitle: '90 min de travail ininterrompu sans distraction' },
        { title: '3. Nutrition, Récupération & Sommeil', subtitle: 'Repas équilibrés et 8h de sommeil réparateur' },
        { title: '4. Clarté Mentale & Bilan du Soir', subtitle: 'Revue des victoires et intention du lendemain' },
        { title: '5. Rituel Personnalisé d’Excellence', subtitle: 'Action prioritaire convenue lors de notre séance' },
      ],
      habitPlaceholder: 'Définissez votre rituel principal...',
      daysHeader: 'Jours 1 à 30',
      milestones: {
        day7: 'J07 : Ancrage du rythme',
        day14: 'J14 : Dépassement des résistances',
        day21: 'J21 : Consolidation du réflexe',
        day30: 'J30 : Victoire & transformation acquise',
      },
      weeklyReflectionTitle: 'BILANS HEBDOMADAIRES (NOTES MANUSCRITES)',
      weekNames: ['SEMAINE 01', 'SEMAINE 02', 'SEMAINE 03', 'SEMAINE 04'],
      reflectionPrompts: [
        'Victoire Semaine 1 : qu’est-ce qui a procuré le plus d’énergie ?',
        'Point de friction Semaine 2 : où avez-vous rencontré de la résistance ?',
        'Ajustement Semaine 3 : quelle habitude devient naturelle ?',
        'Bilan Semaine 4 : transformation majeure acquise pour le prochain cycle',
      ],
      coachNoteTitle: 'LE MOT DU COACH & ENGAGEMENT MUTUEL',
      coachNotePlaceholder: 'Soyez 1% meilleur chaque jour. Rater un jour est humain, ne ratez jamais deux jours de suite.',
      coachNoteDefault: 'Soyez 1% meilleur chaque jour. Rater un jour est humain, ne ratez jamais deux jours de suite.',
      confidentialTag: 'PLAN DE PERFORMANCE CLIENT CONFIDENTIEL',
      scanToBookTitle: 'Scannez pour réserver votre bilan :',
      qrPrompt: 'Scannez pour valider vos progrès ou réserver un point',
    },
    roadmap90: {
      title: 'Feuille de Route Stratégique sur 90 Jours',
      subtitle: 'Jalons structurés, livrables concrets et indicateurs de réussite pour piloter notre collaboration.',
      initiativePrompt: 'Projet / Initiative',
      clientPrompt: 'Client Partenaire',
      timelinePrompt: 'Horizon d’Exécution',
      phase1: {
        number: 'PHASE 01',
        range: 'Jours 01 – 30',
        title: 'Diagnostic, Fondations & Victoires Rapides',
        deliverables: [
          'Audit opérationnel complet et identification des goulots',
          'Clarification des priorités d’impact et allocation des ressources',
          'Mise en place des premiers flux de travail optimisés',
          'Mise en place du rythme hebdomadaire et du tableau de bord',
        ],
        kpiLabel: 'Cible Clé Phase 1 :',
        kpiValue: 'Audit 100% validé et blocages initiaux éliminés',
      },
      phase2: {
        number: 'PHASE 02',
        range: 'Jours 31 – 60',
        title: 'Déploiement Central & Accélération',
        deliverables: [
          'Exécution des transformations majeures sur les processus cibles',
          'Tests en conditions réelles et ajustements itératifs rapides',
          'Formation de l’équipe, montée en compétences et guides SOP',
          'Revue d’étape intermédiaire et recalibrage stratégique',
        ],
        kpiLabel: 'Cible Clé Phase 2 :',
        kpiValue: 'Systèmes opérationnels avec gain de productivité supérieur à 25%',
      },
      phase3: {
        number: 'PHASE 03',
        range: 'Jours 61 – 90',
        title: 'Optimisation, Passage à l’Échelle & Autonomie',
        deliverables: [
          'Affinement des boucles de rétroaction et contrôle qualité',
          'Finalisation des guides de référence et passage de relais complet',
          'Tableau de bord de suivi à long terme rendu autonome',
          'Bilan stratégique exécutif et feuille de route pour le trimestre suivant',
        ],
        kpiLabel: 'Cible Clé Phase 3 :',
        kpiValue: 'Exécution 100% autonome et retour sur investissement atteint',
      },
      signoffTitle: 'Validation & Engagement Bilatéral de la Feuille de Route',
      clientSign: 'Signature du Représentant Client',
      leadSign: 'Signature du Coach / Consultant Référent',
      qrPrompt: 'Scannez pour accéder à l’espace de travail partagé',
    },
    welcomePacket: {
      title: 'Guide d’Accueil & Protocoles de Partenariat',
      subtitle: 'Règles du jeu partagées, standards de communication et checklist des 72 premières heures.',
      welcomeHeader: 'Bienvenue dans notre partenariat stratégique',
      welcomeBody: 'Nous sommes honorés d’entamer ce travail à vos côtés. Notre engagement consiste à générer des résultats tangibles et mesurables grâce à une exécution rigoureuse et une communication limpide. Ce livret pose les fondations de notre réussite commune.',
      commHeader: 'Protocoles de Communication & Délais de Réponse',
      commSub: 'Comment nous collaborons efficacement sans réunions inutiles',
      commItems: [
        { label: 'Canal Principal', text: 'Échanges asynchrones et partage de documents via Slack ou portail dédié' },
        { label: 'Délai Garanti', text: 'Réponse apportée sous 24 heures ouvrées maximum (du lundi au vendredi)' },
        { label: 'Point Hebdo', text: 'Session de travail stratégique de 45 minutes sur votre créneau récurrent' },
        { label: 'Urgence Critique', text: 'Escalade directe par SMS ou téléphone en cas de blocage opérationnel' },
      ],
      agreementsHeader: 'Nos Accords de Fonctionnement',
      agreements: [
        { title: 'Responsabilité Partagée', desc: 'Nous nous engageons sur l’excellence des livrables et comptons sur votre rigueur d’exécution.' },
        { title: 'Transparence Sans Surprise', desc: 'Les difficultés éventuelles sont partagées immédiatement pour pivoter ensemble sereinement.' },
        { title: 'Respect du Travail Profond', desc: 'Nous privilégions la clarté écrite aux interruptions incessantes pour maximiser la réflexion.' },
      ],
      firstStepsHeader: 'Checklist des 72 Premières Heures',
      firstSteps: [
        'Compléter le questionnaire initial de cadrage (durée estimée : 15 min)',
        'Accepter les invitations vers l’espace collaboratif, Drive et tableau de bord',
        'Déposer vos éléments graphiques, données clés et accès utiles',
        'Confirmer la date de notre session Kickoff dans votre agenda',
      ],
      schedulePrompt: 'Planifiez votre Session Kickoff de démarrage via le QR code ci-dessous',
      qrPrompt: 'Scannez pour planifier votre séance de cadrage',
    },
    footer: {
      madeWith: 'Document créé avec LogoLoom',
      confidential: 'Document Confidentiel & Réservé',
      scanToBook: 'Scannez pour nous contacter',
      page: 'Page 1 sur 1',
    },
  },
  de: {
    habitTracker: {
      headerCategory: 'LEISTUNGS-COACHING-PROTOKOLL',
      headerSubtitleRight: 'GEWOHNHEITEN-MATRIX • 30-TAGE-ZYKLUS',
      title: '30-Tage Gewohnheiten & Dynamik Tracker',
      subtitle: 'Tägliche Kontinuität schafft nachhaltige Transformation. Haken Sie jeden erfolgreichen Tag ab.',
      clientPrompt: 'Klient:',
      periodPrompt: 'Zeitraum:',
      periodPlaceholder: 'Vom ____ / ____ bis ____ / ____',
      goalPrompt: 'Hauptziel des Monats:',
      goalPlaceholder: 'Definieren Sie Ihre zentrale Absicht für diesen Zyklus...',
      coachPrompt: 'Coach / Berater:',
      habitsHeader: 'KERNGEWOHNHEITEN & ROUTINEN',
      scoreHeader: 'PUNKTE',
      monthPrompt: 'Monat / Zyklus',
      categories: {
        movement: '1. Körperliche Vitalität & Bewegung',
        mindset: '2. Strategische Tiefenarbeit & Fokus',
        nutrition: '3. Ernährung, Erholung & Schlaf',
        productivity: '4. Geistige Klarheit & Abendreflexion',
      },
      habitsList: [
        { title: '1. Körperliche Vitalität & Energie', subtitle: '2L Wasser nach dem Aufstehen, tägliche Bewegung' },
        { title: '2. Strategische Tiefenarbeit', subtitle: '90 Min. ununterbrochener Fokus ohne Benachrichtigungen' },
        { title: '3. Ernährung, Erholung & Schlaf', subtitle: 'Vollwertige Mahlzeiten und 8 Std. erholsamer Schlaf' },
        { title: '4. Geistige Klarheit & Abendreflexion', subtitle: 'Tageserfolge notieren und Prioritäten für morgen setzen' },
        { title: '5. Individuelle Spitzenroutine', subtitle: 'Gemeinsam vereinbarte Schwerpunktaufgabe' },
      ],
      habitPlaceholder: 'Definieren Sie Ihre Kernroutine...',
      daysHeader: 'Tage 1 bis 30',
      milestones: {
        day7: 'Tag 07: Rhythmus etablieren',
        day14: 'Tag 14: Widerstände überwinden',
        day21: 'Tag 21: Gewohnheit verankert',
        day30: 'Tag 30: Identitätswechsel erreicht',
      },
      weeklyReflectionTitle: 'WÖCHENTLICHE REFLEXION (HANDSCHRIFTLICHE NOTIZEN)',
      weekNames: ['WOCHE 01', 'WOCHE 02', 'WOCHE 03', 'WOCHE 04'],
      reflectionPrompts: [
        'Woche 1 Erfolg: Was hat am meisten Energie freigesetzt?',
        'Woche 2 Hürde: Wo trat Reibung auf und wie wurde sie gelöst?',
        'Woche 3 Durchbruch: Welche Routine fühlt sich jetzt leicht an?',
        'Woche 4 Meisterschaft: Wichtigste Erkenntnis für den nächsten Zyklus',
      ],
      coachNoteTitle: 'RAT DES COACHES & VERBINDLICHKEIT',
      coachNotePlaceholder: 'Jeden Tag 1% besser sein. Einen Tag zu verpassen ist menschlich; verpassen Sie niemals zwei Tage in Folge.',
      coachNoteDefault: 'Jeden Tag 1% besser sein. Einen Tag zu verpassen ist menschlich; verpassen Sie niemals zwei Tage in Folge.',
      confidentialTag: 'VERTRAULICHER KLIENTENPLAN',
      scanToBookTitle: 'Scannen für Ihr Reflexionsgespräch:',
      qrPrompt: 'Scannen für Feedback oder Termin',
    },
    roadmap90: {
      title: 'Strategischer 90-Tage Transformationsplan',
      subtitle: 'Strukturierte Meilensteine, konkrete Ergebnisse und messbare Erfolgskriterien für unsere Zusammenarbeit.',
      initiativePrompt: 'Projekt / Initiative',
      clientPrompt: 'Klient & Partner',
      timelinePrompt: 'Umsetzungshorizont',
      phase1: {
        number: 'PHASE 01',
        range: 'Tage 01 – 30',
        title: 'Fundament, Bestandsaufnahme & Schnelle Erfolge',
        deliverables: [
          'Umfassende operative Bestandsaufnahme & Engpassanalyse',
          'Festlegung der Kernprioritäten und optimalen Ressourceneinsatz',
          'Implementierung erster sofortiger Workflow-Optimierungen',
          'Einführung des wöchentlichen Jour Fixe und Reporting-Dashboards',
        ],
        kpiLabel: 'Phase 1 Hauptziel:',
        kpiValue: 'Bestandsaufnahme 100% abgeschlossen & erste Blockaden gelöst',
      },
      phase2: {
        number: 'PHASE 02',
        range: 'Tage 31 – 60',
        title: 'Kernumsetzung & Skalierungsbeschleunigung',
        deliverables: [
          'Ausführung zentraler strategischer Prozessoptimierungen',
          'Praxiserprobung und iterative Feinjustierung im laufenden Betrieb',
          'Mitarbeiter-Coaching, Qualifizierung und SOP-Handbücher',
          'Zwischenevaluierung und strategische Neuausrichtung',
        ],
        kpiLabel: 'Phase 2 Hauptziel:',
        kpiValue: 'Kernsysteme live mit nachweisbarem Leistungszuwachs von +25%',
      },
      phase3: {
        number: 'PHASE 03',
        range: 'Tage 61 – 90',
        title: 'Konsolidierung, Autonomie & Langzeiterfolg',
        deliverables: [
          'Perfektionierung der Kontrollschleifen und Qualitätsstandards',
          'Abschluss aller Leitfäden und vollständige Klientenübergabe',
          'Etablierung des dauerhaften Kennzahlen-Dashboards',
          'Strategische Gesamtschau und Roadmap für das Folgequartal',
        ],
        kpiLabel: 'Phase 3 Hauptziel:',
        kpiValue: 'Vollständige operative Unabhängigkeit & Ziel-ROI realisiert',
      },
      signoffTitle: 'Meilenstein-Freigabe & Verbindliche Vereinbarung',
      clientSign: 'Unterschrift Klienten-Vertretung',
      leadSign: 'Unterschrift Leitender Coach / Berater',
      qrPrompt: 'Scannen für Zugriff auf Projektdateien',
    },
    welcomePacket: {
      title: 'Willkommenspaket & Zusammenarbeitsstandards',
      subtitle: 'Gemeinsame Spielregeln, Kommunikationsstandards und Checkliste für die ersten 72 Stunden.',
      welcomeHeader: 'Willkommen zu unserer strategischen Zusammenarbeit',
      welcomeBody: 'Wir freuen uns sehr auf diesen gemeinsamen Weg. Unser Anspruch ist es, durch präzise Umsetzung und transparente Abstimmung messbare Resultate zu erzielen. Dieser Leitfaden bildet das solide Fundament unseres gemeinsamen Erfolgs.',
      commHeader: 'Kommunikationsregeln & Reaktionszeiten',
      commSub: 'Wie wir fokussiert und ohne unnötige Meetings zusammenarbeiten',
      commItems: [
        { label: 'Hauptkanal', text: 'Asynchroner Austausch und Dateifreigabe über dedizierten Slack-Kanal' },
        { label: 'Reaktionszeit', text: 'Rückmeldung auf alle schriftlichen Anfragen innerhalb von 24 Werktagsstunden' },
        { label: 'Wochengespräch', text: '45-minütiges strategisches Fokusgespräch im fest vereinbarten Zeitfenster' },
        { label: 'Dringendes', text: 'Direkte telefonische Eskalation bei geschäftskritischen Engpässen' },
      ],
      agreementsHeader: 'Unsere gemeinsamen Vereinbarungen',
      agreements: [
        { title: 'Volle Eigenverantwortung', desc: 'Wir bürgen für exzellente Ergebnisse und bauen auf Ihre konsequente Mitarbeit.' },
        { title: 'Offene Transparenz', desc: 'Herausforderungen werden sofort geteilt, um gemeinsam lösungsorientiert zu handeln.' },
        { title: 'Geschützter Fokus', desc: 'Wir schätzen durchdachte schriftliche Klarheit mehr als zeitraubende Ad-hoc-Treffen.' },
      ],
      firstStepsHeader: 'Checkliste für die ersten 72 Stunden',
      firstSteps: [
        'Erstfragebogen zur Bestandsaufnahme ausfüllen (ca. 15 Minuten)',
        'Zugang zum geteilten Workspace, Cloud-Speicher und Dashboard bestätigen',
        'Vorhandene Markendaten, Kennzahlen und Zugänge hochladen',
        'Termin für das offizielle Kickoff-Strategiegespräch im Kalender sichern',
      ],
      schedulePrompt: 'Buchen Sie Ihr Kickoff-Strategiegespräch über den QR-Code unten',
      qrPrompt: 'Scannen für Terminbuchung der Kickoff-Session',
    },
    footer: {
      madeWith: 'Erstellt mit LogoLoom',
      confidential: 'Vertraulich & Geschützt',
      scanToBook: 'Scannen für Kontakt oder Termin',
      page: 'Seite 1 von 1',
    },
  },
  es: {
    habitTracker: {
      headerCategory: 'PROTOCOLO DE COACHING DE RENDIMIENTO',
      headerSubtitleRight: 'MATRIZ DE HÁBITOS • CICLO DE 30 DÍAS',
      title: 'Seguimiento Diario de Hábitos & Impulso 30 Días',
      subtitle: 'La constancia diaria genera una transformación duradera. Marca cada día completado con rigor.',
      clientPrompt: 'Cliente:',
      periodPrompt: 'Período:',
      periodPlaceholder: 'Del ____ / ____ al ____ / ____',
      goalPrompt: 'Objetivo principal del mes:',
      goalPlaceholder: 'Define tu intención de avance para este ciclo...',
      coachPrompt: 'Coach Referente:',
      habitsHeader: 'HÁBITOS & RUTINAS CLAVE',
      scoreHeader: 'TOTAL',
      monthPrompt: 'Mes / Ciclo',
      categories: {
        movement: '1. Vitalidad Física & Movimiento',
        mindset: '2. Trabajo Profundo & Enfoque',
        nutrition: '3. Nutrición, Hidratación & Sueño',
        productivity: '4. Claridad Mental & Revisión Diaria',
      },
      habitsList: [
        { title: '1. Vitalidad Física & Energía', subtitle: '2L de agua al despertar, caminata y movilidad' },
        { title: '2. Bloque de Trabajo Profundo', subtitle: '90 minutos de concentración sin notificaciones' },
        { title: '3. Nutrición & Descanso Reparador', subtitle: 'Alimentación balanceada y 8 horas de sueño' },
        { title: '4. Claridad Mental & Revisión', subtitle: 'Registrar logros y prioridades para mañana' },
        { title: '5. Hábito Personalizado de Éxito', subtitle: 'Acción prioritaria acordada en nuestra sesión' },
      ],
      habitPlaceholder: 'Define tu hábito principal...',
      daysHeader: 'Días 1 a 30',
      milestones: {
        day7: 'Día 07: Fijación del ritmo',
        day14: 'Día 14: Superación de resistencias',
        day21: 'Día 21: Hábito consolidado',
        day30: 'Día 30: Transformación completada',
      },
      weeklyReflectionTitle: 'EVALUACIONES SEMANALES (NOTAS MANUSCRITAS)',
      weekNames: ['SEMANA 01', 'SEMANA 02', 'SEMANA 03', 'SEMANA 04'],
      reflectionPrompts: [
        'Semana 1 Logro: ¿Qué acción generó más energía positiva?',
        'Semana 2 Resistencia: ¿Dónde surgió fricción y cómo se resolvió?',
        'Semana 3 Avance: ¿Qué rutina ya se siente automática?',
        'Semana 4 Dominio: Aprendizaje clave para el próximo ciclo',
      ],
      coachNoteTitle: 'CONSEJO DEL COACH & COMPROMISO MUTUO',
      coachNotePlaceholder: 'Busca mejorar un 1% cada día. Fallar un día es humano; jamás falles dos días consecutivos.',
      coachNoteDefault: 'Busca mejorar un 1% cada día. Fallar un día es humano; jamás falles dos días consecutivos.',
      confidentialTag: 'PLAN DE RENDIMIENTO CONFIDENCIAL',
      scanToBookTitle: 'Escanea para agendar tu sesión de balance:',
      qrPrompt: 'Escanea para registrar progresos o reservar cita',
    },
    roadmap90: {
      title: 'Plan Estratégico de Transformación a 90 Días',
      subtitle: 'Hitos estructurados, entregables clave y métricas de éxito medibles para nuestra colaboración.',
      initiativePrompt: 'Proyecto / Iniciativa',
      clientPrompt: 'Cliente Colaborador',
      timelinePrompt: 'Horizonte de Ejecución',
      phase1: {
        number: 'FASE 01',
        range: 'Días 01 – 30',
        title: 'Diagnóstico, Bases & Primeras Victorias',
        deliverables: [
          'Auditoría operativa integral e identificación de bloqueos',
          'Definición de prioridades estratégicas y asignación de recursos',
          'Implementación de los primeros flujos de trabajo optimizados',
          'Establecimiento de reuniones semanales y panel de control',
        ],
        kpiLabel: 'Meta Clave Fase 1:',
        kpiValue: 'Diagnóstico 100% completado y bloqueos iniciales resueltos',
      },
      phase2: {
        number: 'FASE 02',
        range: 'Días 31 – 60',
        title: 'Ejecución Central & Aceleración',
        deliverables: [
          'Despliegue de mejoras operativas en los procesos esenciales',
          'Pruebas en tiempo real y ajustes iterativos rápidos',
          'Capacitación del equipo y documentación de manuales SOP',
          'Evaluación intermedia y recalibración de prioridades',
        ],
        kpiLabel: 'Meta Clave Fase 2:',
        kpiValue: 'Sistemas operativos con mejora comprobada de rendimiento +25%',
      },
      phase3: {
        number: 'FASE 03',
        range: 'Días 61 – 90',
        title: 'Consolidación, Escala & Autonomía',
        deliverables: [
          'Optimización de controles de calidad y retroalimentación',
          'Finalización de manuales y transferencia completa al cliente',
          'Panel de métricas a largo plazo operativo y autónomo',
          'Balance ejecutivo y plan de acción para el siguiente trimestre',
        ],
        kpiLabel: 'Meta Clave Fase 3:',
        kpiValue: 'Ejecución 100% autónoma y retorno de inversión alcanzado',
      },
      signoffTitle: 'Compromiso & Aprobación Bilateral de la Hoja de Ruta',
      clientSign: 'Firma del Representante del Cliente',
      leadSign: 'Firma del Coach / Asesor Principal',
      qrPrompt: 'Escanea para acceder al espacio de trabajo compartido',
    },
    welcomePacket: {
      title: 'Guía de Bienvenida & Protocolos de Colaboración',
      subtitle: 'Estándares de comunicación, acuerdos de trabajo y lista de verificación de las primeras 72 horas.',
      welcomeHeader: 'Bienvenido a nuestra colaboración estratégica',
      welcomeBody: 'Es un honor iniciar este proceso juntos. Nuestro objetivo es generar resultados tangibles y medibles a través de una ejecución disciplinada y una comunicación impecable. Esta guía sienta las bases de nuestro éxito mutuo.',
      commHeader: 'Protocolos de Comunicación & Tiempos de Respuesta',
      commSub: 'Cómo colaboramos de forma eficiente sin reuniones innecesarias',
      commItems: [
        { label: 'Canal Principal', text: 'Mensajería asincrónica y documentos mediante canal dedicado de Slack' },
        { label: 'Tiempo de Respuesta', text: 'Respuestas a consultas escritas en un máximo de 24 horas laborables' },
        { label: 'Sesión Semanal', text: 'Reunión de estrategia enfocada de 45 minutos en tu franja asignada' },
        { label: 'Urgencias', text: 'Contacto telefónico o SMS directo para imprevistos críticos de alta prioridad' },
      ],
      agreementsHeader: 'Nuestros Acuerdos de Funcionamiento',
      agreements: [
        { title: 'Responsabilidad Plena', desc: 'Nos comprometemos con la excelencia de los resultados y contamos con tu disciplina.' },
        { title: 'Transparencia Total', desc: 'Cualquier obstáculo se comunica de inmediato para encontrar soluciones juntos.' },
        { title: 'Respeto al Enfoque', desc: 'Priorizamos la claridad escrita sobre reuniones que interrumpan el trabajo profundo.' },
      ],
      firstStepsHeader: 'Lista de Primeros Pasos (Primeras 72 Horas)',
      firstSteps: [
        'Completar el cuestionario inicial de diagnóstico (aprox. 15 minutos)',
        'Aceptar invitaciones al espacio compartido, almacenamiento y panel',
        'Subir archivos de marca, información histórica y accesos necesarios',
        'Confirmar la fecha de nuestra Sesión Kickoff de inicio en tu agenda',
      ],
      schedulePrompt: 'Agenda tu Sesión Kickoff de inicio escaneando el código QR abajo',
      qrPrompt: 'Escanea para agendar tu Sesión Kickoff',
    },
    footer: {
      madeWith: 'Documento generado con LogoLoom',
      confidential: 'Documento Confidencial & Reservado',
      scanToBook: 'Escanea para contactar o reservar',
      page: 'Página 1 de 1',
    },
  },
  pt: {
    habitTracker: {
      headerCategory: 'PROTOCOLO DE COACHING DE PERFORMANCE',
      headerSubtitleRight: 'MATRIZ DE HÁBITOS • CICLO 30 DIAS',
      title: 'Acompanhamento Diário de Hábitos & Ritmo 30 Dias',
      subtitle: 'A consistência diária constrói transformação duradoura. Marque cada dia concluído com disciplina.',
      clientPrompt: 'Cliente:',
      periodPrompt: 'Período:',
      periodPlaceholder: 'De ____ / ____ até ____ / ____',
      goalPrompt: 'Meta central do mês:',
      goalPlaceholder: 'Defina a intenção principal deste ciclo...',
      coachPrompt: 'Coach Responsável:',
      habitsHeader: 'HÁBITOS & ROTINAS ESSENCIAIS',
      scoreHeader: 'TOTAL',
      monthPrompt: 'Mês / Ciclo',
      categories: {
        movement: '1. Vitalidade Física & Movimento',
        mindset: '2. Foco Estratégico & Trabalho Profundo',
        nutrition: '3. Nutrição, Hidratação & Sono',
        productivity: '4. Clareza Mental & Revisão Noturna',
      },
      habitsList: [
        { title: '1. Vitalidade Física & Energia', subtitle: '2L de água ao acordar, caminhada e mobilidade' },
        { title: '2. Bloco de Trabalho Profundo', subtitle: '90 minutos de foco ininterrupto sem distrações' },
        { title: '3. Nutrição & Sono Reparador', subtitle: 'Alimentação equilibrada e 8 horas de repouso' },
        { title: '4. Clareza Mental & Revisão', subtitle: 'Registrar vitórias e prioridades para amanhã' },
        { title: '5. Hábito Personalizado de Sucesso', subtitle: 'Ação estratégica alinhada em nossa sessão' },
      ],
      habitPlaceholder: 'Defina seu hábito prioritário...',
      daysHeader: 'Dias 1 a 30',
      milestones: {
        day7: 'Dia 07: Fixação do ritmo',
        day14: 'Dia 14: Superação de atritos',
        day21: 'Dia 21: Hábito consolidado',
        day30: 'Dia 30: Transformação concluída',
      },
      weeklyReflectionTitle: 'AVALIAÇÕES SEMANAIS (NOTAS MANUSCRITAS)',
      weekNames: ['SEMANA 01', 'SEMANA 02', 'SEMANA 03', 'SEMANA 04'],
      reflectionPrompts: [
        'Semana 1 Vitória: O que gerou maior energia e progresso?',
        'Semana 2 Desafio: Onde surgiu resistência e como foi superada?',
        'Semana 3 Avanço: Qual rotina já parece natural e automática?',
        'Semana 4 Conquista: Principal aprendizado para o próximo ciclo',
      ],
      coachNoteTitle: 'ORIENTAÇÃO DO COACH & COMPROMISSO',
      coachNotePlaceholder: 'Busque ser 1% melhor a cada dia. Falhar um dia é humano; nunca falhe dois dias seguidos.',
      coachNoteDefault: 'Busque ser 1% melhor a cada dia. Falhar um dia é humano; nunca falhe dois dias seguidos.',
      confidentialTag: 'PLANO DE PERFORMANCE CONFIDENCIAL',
      scanToBookTitle: 'Escaneie para agendar seu balanço:',
      qrPrompt: 'Escaneie para registrar progresso ou marcar sessão',
    },
    roadmap90: {
      title: 'Plano Estratégico de Transformação para 90 Dias',
      subtitle: 'Marcos estruturados, entregas fundamentais e indicadores mensuráveis para nossa parceria.',
      initiativePrompt: 'Projeto / Iniciativa',
      clientPrompt: 'Cliente Parceiro',
      timelinePrompt: 'Horizonte de Execução',
      phase1: {
        number: 'FASE 01',
        range: 'Dias 01 – 30',
        title: 'Diagnóstico, Fundamentos & Primeiras Vitórias',
        deliverables: [
          'Auditoria operacional ampla e identificação de gargalos',
          'Definição de prioridades estratégicas e alocação de recursos',
          'Implementação dos primeiros fluxos de trabalho aprimorados',
          'Estabelecimento de alinhamentos semanais e painel de métricas',
        ],
        kpiLabel: 'Meta Principal Fase 1:',
        kpiValue: 'Diagnóstico 100% finalizado e gargalos iniciais eliminados',
      },
      phase2: {
        number: 'FASE 02',
        range: 'Dias 31 – 60',
        title: 'Implementação Central & Aceleração',
        deliverables: [
          'Execução das mudanças principais nos processos estratégicos',
          'Testes práticos e ajustes iterativos ágeis em tempo real',
          'Capacitação da equipe e formalização de manuais operacionais',
          'Revisão intermediária de progresso e recalibração estratégica',
        ],
        kpiLabel: 'Meta Principal Fase 2:',
        kpiValue: 'Processos centrais ativos com ganho comprovado de +25% de eficiência',
      },
      phase3: {
        number: 'FASE 03',
        range: 'Dias 61 – 90',
        title: 'Consolidação, Escala & Autonomia',
        deliverables: [
          'Aperfeiçoamento dos controles de qualidade e acompanhamento',
          'Conclusão dos guias operacionais e transferência ao cliente',
          'Painel de métricas de longo prazo operando com total autonomia',
          'Avaliação executiva final e planejamento para o trimestre seguinte',
        ],
        kpiLabel: 'Meta Principal Fase 3:',
        kpiValue: 'Operação 100% autônoma e retorno sobre investimento atingido',
      },
      signoffTitle: 'Validação & Compromisso Bilateral do Plano de Ação',
      clientSign: 'Assinatura do Representante do Cliente',
      leadSign: 'Assinatura do Coach / Consultor Responsável',
      qrPrompt: 'Escaneie para acessar os arquivos do projeto',
    },
    welcomePacket: {
      title: 'Guia de Boas-Vindas & Padrões de Parceria',
      subtitle: 'Normas de comunicação, acordos de trabalho e lista de verificação das primeiras 72 horas.',
      welcomeHeader: 'Boas-vindas à nossa parceria estratégica',
      welcomeBody: 'É uma honra iniciar esta jornada com você. Nosso objetivo é produzir resultados concretos e mensuráveis com rigor técnico e transparência absoluta. Este material estabelece as bases sólidas do nosso sucesso compartilhado.',
      commHeader: 'Protocolos de Comunicação & Prazos de Resposta',
      commSub: 'Como trabalhamos de forma ágil sem reuniões desnecessárias',
      commItems: [
        { label: 'Canal Principal', text: 'Mensagens assíncronas e envio de documentos pelo Slack dedicado' },
        { label: 'Tempo de Resposta', text: 'Retorno para todas as dúvidas em até 24 horas úteis (segunda a sexta)' },
        { label: 'Sessão Semanal', text: 'Reunião estratégica de 45 minutos no horário fixo reservado na agenda' },
        { label: 'Urgências', text: 'Contato telefônico direto ou SMS para demandas operacionais críticas' },
      ],
      agreementsHeader: 'Nossos Compromissos Operacionais',
      agreements: [
        { title: 'Responsabilidade Total', desc: 'Entregamos o melhor padrão e contamos com sua dedicação na execução.' },
        { title: 'Transparência Imediata', desc: 'Dificuldades são comunicadas na hora para buscarmos soluções conjuntas.' },
        { title: 'Respeito ao Foco', desc: 'Valorizamos a clareza escrita para proteger o tempo de trabalho aprofundado.' },
      ],
      firstStepsHeader: 'Lista de Primeiros Passos (Primeiras 72 Horas)',
      firstSteps: [
        'Preencher o questionário de alinhamento inicial (cerca de 15 minutos)',
        'Aceitar convites para o espaço compartilhado, nuvem e painel',
        'Disponibilizar ativos de marca, relatórios anteriores e acessos',
        'Confirmar na sua agenda o horário da nossa Sessão Kickoff oficial',
      ],
      schedulePrompt: 'Agende sua Sessão Kickoff de início pelo código QR abaixo',
      qrPrompt: 'Escaneie para agendar sua Sessão Kickoff',
    },
    footer: {
      madeWith: 'Documento gerado com LogoLoom',
      confidential: 'Documento Confidencial & Exclusivo',
      scanToBook: 'Escaneie para contato ou agendamento',
      page: 'Página 1 de 1',
    },
  },
  it: {
    habitTracker: {
      headerCategory: 'PROTOCOLLO DI COACHING DI ALTE PRESTAZIONI',
      headerSubtitleRight: 'MATRICE DI ABITUDINI • CICLO DI 30 GIORNI',
      title: 'Monitoraggio Quotidiano Abitudini & Slancio 30 Giorni',
      subtitle: 'La costanza quotidiana crea una trasformazione duratura. Spunta ogni giorno completato con disciplina.',
      clientPrompt: 'Cliente:',
      periodPrompt: 'Periodo:',
      periodPlaceholder: 'Dal ____ / ____ al ____ / ____',
      goalPrompt: 'Obiettivo chiave del mese:',
      goalPlaceholder: 'Definisci il traguardo principale di questo ciclo...',
      coachPrompt: 'Coach Referente:',
      habitsHeader: 'ABITUDINI & ROUTINE CHIAVE',
      scoreHeader: 'PUNTI',
      monthPrompt: 'Mese / Ciclo',
      categories: {
        movement: '1. Vitalità Fisica & Movimento',
        mindset: '2. Focus Strategico & Lavoro Profondo',
        nutrition: '3. Nutrizione, Idratazione & Sonno',
        productivity: '4. Chiarezza Mentale & Revisione Serale',
      },
      habitsList: [
        { title: '1. Vitalità Fisica & Energia', subtitle: '2L d’acqua al risveglio, camminata e mobilità' },
        { title: '2. Blocco di Lavoro Profondo', subtitle: '90 minuti di concentrazione senza notifiche' },
        { title: '3. Nutrizione & Sonno Rigenerante', subtitle: 'Pasti sani e 8 ore di sonno riposante' },
        { title: '4. Chiarezza Mentale & Revisione', subtitle: 'Registrare successi e priorità per domani' },
        { title: '5. Abitudine di Eccellenza Personale', subtitle: 'Azione strategica definita nella nostra sessione' },
      ],
      habitPlaceholder: 'Definisci la tua abitudine principale...',
      daysHeader: 'Giorni 1 a 30',
      milestones: {
        day7: 'Giorno 07: Consolidamento del ritmo',
        day14: 'Giorno 14: Superamento delle resistenze',
        day21: 'Giorno 21: Abitudine interiorizzata',
        day30: 'Giorno 30: Trasformazione acquisita',
      },
      weeklyReflectionTitle: 'VALUTAZIONI SETTIMANALI (NOTE SCRITTE A MANO)',
      weekNames: ['SETTIMANA 01', 'SETTIMANA 02', 'SETTIMANA 03', 'SETTIMANA 04'],
      reflectionPrompts: [
        'Settimana 1 Vittoria: Quale azione ha dato maggiore slancio?',
        'Settimana 2 Ostacolo: Dove è emersa resistenza e come è stata superata?',
        'Settimana 3 Svolta: Quale abitudine ora sembra spontanea?',
        'Settimana 4 Padronanza: Apprendimento chiave per il prossimo ciclo',
      ],
      coachNoteTitle: 'CONSIGLIO DEL COACH & ACCORDO RECIPROCO',
      coachNotePlaceholder: 'Cerca di migliorare dell’1% ogni giorno. Saltare un giorno è umano; non saltare mai due giorni consecutivi.',
      coachNoteDefault: 'Cerca di migliorare dell’1% ogni giorno. Saltare un giorno è umano; non saltare mai due giorni consecutivi.',
      confidentialTag: 'PIANO DI PERFORMANCE CONFIDENZIALE',
      scanToBookTitle: 'Scansiona per prenotare la tua sessione di verifica:',
      qrPrompt: 'Scansiona per registrare i progressi o fissare un incontro',
    },
    roadmap90: {
      title: 'Piano Strategico di Trasformazione a 90 Giorni',
      subtitle: 'Tappe strutturate, risultati chiave ed indicatori di successo per guidare la nostra collaborazione.',
      initiativePrompt: 'Progetto / Iniziativa',
      clientPrompt: 'Cliente Partner',
      timelinePrompt: 'Orizzonte Temporale',
      phase1: {
        number: 'FASE 01',
        range: 'Giorni 01 – 30',
        title: 'Diagnosi, Fondamenta & Primi Risultati',
        deliverables: [
          'Audit operativo completo ed individuazione delle criticità',
          'Definizione delle priorità ad alto impatto ed allocazione risorse',
          'Implementazione dei primi flussi di lavoro ottimizzati',
          'Avvio degli allineamenti settimanali e del cruscotto metriche',
        ],
        kpiLabel: 'Obiettivo Chiave Fase 1:',
        kpiValue: 'Audit completato al 100% e blocchi iniziali risolti',
      },
      phase2: {
        number: 'FASE 02',
        range: 'Giorni 31 – 60',
        title: 'Attuazione Centrale & Accelerazione',
        deliverables: [
          'Esecuzione delle trasformazioni primarie sui processi chiave',
          'Test operativi sul campo e rapide ottimizzazioni periodiche',
          'Formazione del team e redazione delle procedure standard',
          'Verifica intermedia di avanzamento e ricalibrazione strategica',
        ],
        kpiLabel: 'Obiettivo Chiave Fase 2:',
        kpiValue: 'Sistemi operativi attivi con incremento misurato di produttività +25%',
      },
      phase3: {
        number: 'FASE 03',
        range: 'Giorni 61 – 90',
        title: 'Consolidamento, Scalabilità & Autonomia',
        deliverables: [
          'Perfezionamento dei cicli di controllo qualità e feedback',
          'Completamento delle linee guida e passaggio di consegne al cliente',
          'Cruscotto metriche a lungo termine operativo in piena autonomia',
          'Valutazione strategica finale e piano di crescita per il trimestre successivo',
        ],
        kpiLabel: 'Obiettivo Chiave Fase 3:',
        kpiValue: 'Esecuzione al 100% autonoma e ritorno sull’investimento raggiunto',
      },
      signoffTitle: 'Approvazione & Impegno Reciproco della Tabella di Marcia',
      clientSign: 'Firma del Rappresentante del Cliente',
      leadSign: 'Firma del Coach / Consulente Referente',
      qrPrompt: 'Scansiona per accedere ai documenti del progetto',
    },
    welcomePacket: {
      title: 'Guida di Benvenuto & Standard di Collaborazione',
      subtitle: 'Accordi di lavoro, protocolli di comunicazione e lista di controllo per le prime 72 ore.',
      welcomeHeader: 'Benvenuto nella nostra collaborazione strategica',
      welcomeBody: 'Siamo onorati di iniziare questo percorso al tuo fianco. La nostra missione è generare risultati concreti e misurabili attraverso un’esecuzione attenta ed una comunicazione cristallina. Questa guida stabilisce le fondamenta del nostro successo comune.',
      commHeader: 'Protocolli di Comunicazione & Tempi di Risposta',
      commSub: 'Come lavoriamo con efficacia senza riunioni superflue',
      commItems: [
        { label: 'Canale Principale', text: 'Messaggistica asincrona e scambio file su canale Slack dedicato' },
        { label: 'Tempo di Risposta', text: 'Risposta a tutte le richieste scritte entro 24 ore lavorative' },
        { label: 'Sessione Settimanale', text: 'Incontro strategico mirato di 45 minuti nello slot orario ricorrente' },
        { label: 'Urgenze Critiche', text: 'Chiamata telefonica diretta o SMS per blocchi operativi essenziali' },
      ],
      agreementsHeader: 'I Nostri Accordi Operativi',
      agreements: [
        { title: 'Responsabilità Condivisa', desc: 'Garantiamo la massima qualità e contiamo sulla tua costanza applicativa.' },
        { title: 'Trasparenza Immediata', desc: 'Ogni ostacolo viene condiviso subito per trovare soluzioni insieme.' },
        { title: 'Rispetto della Concentrazione', desc: 'Preferiamo la precisione scritta rispetto alle continue interruzioni.' },
      ],
      firstStepsHeader: 'Lista di Controllo per le Prime 72 Ore',
      firstSteps: [
        'Completare il questionario iniziale di inquadramento (circa 15 minuti)',
        'Accettare gli inviti all’area di lavoro condivisa, cloud e cruscotto',
        'Caricare risorse del brand, dati storici ed accessi operativi',
        'Confermare in agenda la data della Sessione Kickoff iniziale',
      ],
      schedulePrompt: 'Prenota la tua Sessione Kickoff iniziale tramite il codice QR qui sotto',
      qrPrompt: 'Scansiona per prenotare la tua Sessione Kickoff',
    },
    footer: {
      madeWith: 'Documento creato con LogoLoom',
      confidential: 'Documento Riservato & Confidenziale',
      scanToBook: 'Scansiona per contattarci o prenotare',
      page: 'Pagina 1 di 1',
    },
  },
};
