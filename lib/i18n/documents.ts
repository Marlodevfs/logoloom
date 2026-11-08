import { DocumentLang } from '@/types';

export interface DocumentContent {
  habitTracker: {
    title: string;
    subtitle: string;
    monthPrompt: string;
    clientPrompt: string;
    coachPrompt: string;
    categories: {
      movement: string;
      mindset: string;
      nutrition: string;
      productivity: string;
    };
    habitPlaceholder: string;
    daysHeader: string;
    milestones: {
      day7: string;
      day14: string;
      day21: string;
      day30: string;
    };
    weeklyReflectionTitle: string;
    reflectionPrompts: string[];
    coachNoteTitle: string;
    coachNotePlaceholder: string;
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
      title: '30-Day Daily Habit & Momentum Tracker',
      subtitle: 'Consistent action creates compounding transformation. Check off each completed day.',
      monthPrompt: 'Month / Cycle',
      clientPrompt: 'Prepared for',
      coachPrompt: 'Lead Coach / Guide',
      categories: {
        movement: '1. Physical Vitality & Movement',
        mindset: '2. Deep Work & Strategic Focus',
        nutrition: '3. Nutrition, Hydration & Sleep',
        productivity: '4. Mindset & Daily Reflection',
      },
      habitPlaceholder: 'Define your primary routine...',
      daysHeader: 'Days 1 to 30',
      milestones: {
        day7: 'Day 7 Checkpoint: Establishing Rhythm',
        day14: 'Day 14 Checkpoint: Overcoming Resistance',
        day21: 'Day 21 Checkpoint: Habit Neuropathway Formed',
        day30: 'Day 30 Checkpoint: Identity Shift Completed',
      },
      weeklyReflectionTitle: 'Weekly Check-in & Momentum Score',
      reflectionPrompts: [
        'Week 1 Win: What energized you most?',
        'Week 2 Adjustment: Where did friction appear?',
        'Week 3 Breakthrough: What feels effortless now?',
        'Week 4 Mastery: Key takeaway for the next 30 days',
      ],
      coachNoteTitle: 'Coach Notes & Accountability Agreement',
      coachNotePlaceholder: 'Focus on showing up 1% better every day. Miss one day, never miss two.',
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
        kpiValue: 'Core framework operational with 25%+ speed/outcome gains',
      },
      phase3: {
        number: 'PHASE 03',
        range: 'Days 61 – 90',
        title: 'Optimization, Scale & Autonomy',
        deliverables: [
          'Automate recurring processes and lock in best practices',
          'Stress-test workflows for long-term resilience',
          'Final performance review vs. initial benchmark targets',
          'Handover playbook & long-term maintenance roadmap',
        ],
        kpiLabel: 'Phase 3 Key Target:',
        kpiValue: 'Full autonomous execution and confirmed milestone delivery',
      },
      signoffTitle: 'Mutual Commitment & Milestone Sign-off',
      clientSign: 'Client Approval & Signature',
      leadSign: 'Lead Consultant / Coach',
      qrPrompt: 'Scan to view live project tracking board',
    },
    welcomePacket: {
      title: 'Client Welcome & Collaboration Guide',
      subtitle: 'Everything you need to know for a seamless, high-impact partnership.',
      welcomeHeader: 'Welcome aboard! We are thrilled to partner with you.',
      welcomeBody:
        'This guide outlines how we will work together, our communication channels, key expectations, and what to expect during our first 14 days.',
      commHeader: 'Communication & Working Channels',
      commSub: 'Clear channels prevent friction and keep projects running swiftly.',
      commItems: [
        { label: 'Primary Channel', text: 'Email & Dedicated Slack / Telegram workspace for daily exchanges' },
        { label: 'Response Time', text: 'Under 24 hours during business days (Mon–Fri, 9am–6pm)' },
        { label: 'Status Reviews', text: 'Bi-weekly 45-minute sprint calls with shared agenda & summary' },
        { label: 'Urgent Matters', text: 'Flag subject line with [URGENT] for priority 4-hour response' },
      ],
      agreementsHeader: 'Our Core Working Agreements',
      agreements: [
        {
          title: 'Radical Transparency',
          desc: 'We share honest updates, early warning signs, and transparent metrics so decisions are data-driven.',
        },
        {
          title: 'Punctual Feedback Cycles',
          desc: 'Reviews and approvals within 48h to maintain project momentum and avoid schedule delays.',
        },
        {
          title: 'Focus on Outcomes',
          desc: 'Every task is measured by business impact and client clarity, not busywork.',
        },
      ],
      firstStepsHeader: 'First 72 Hours: What to Prepare',
      firstSteps: [
        'Complete the initial intake questionnaire and share relevant credentials / assets',
        'Confirm our recurring bi-weekly check-in timeslot in your calendar',
        'Review and sign our master mutual collaboration scope',
      ],
      schedulePrompt: 'Schedule your initial kickoff session via the QR code below',
      qrPrompt: 'Scan to book your kickoff call & access client portal',
    },
    footer: {
      madeWith: 'Branded with LogoLoom (logoloom.app)',
      confidential: 'Strictly Confidential & Proprietary',
      scanToBook: 'Scan for direct contact',
      page: 'Page 1 of 1',
    },
  },
  fr: {
    habitTracker: {
      title: 'Suivi Quotidien d\'Habitudes & Dynamique 30 Jours',
      subtitle: 'La constance crée des résultats durables. Cochez chaque jour validé avec fierté.',
      monthPrompt: 'Mois / Cycle',
      clientPrompt: 'Préparé pour',
      coachPrompt: 'Coach référent',
      categories: {
        movement: '1. Énergie Physique & Mouvement',
        mindset: '2. Concentration & Travail Profond',
        nutrition: '3. Nutrition, Sommeil & Hydratation',
        productivity: '4. Clarté Mentale & Bilan du Soir',
      },
      habitPlaceholder: 'Définissez votre routine principale...',
      daysHeader: 'Jours 01 à 30',
      milestones: {
        day7: 'Étape J7 : Mise en place du rythme initial',
        day14: 'Étape J14 : Dépassement des résistances',
        day21: 'Étape J21 : Ancrage de la nouvelle routine',
        day30: 'Étape J30 : Transformation et autonomie acquise',
      },
      weeklyReflectionTitle: 'Bilans Hebdomadaires & Score d\'Engagement',
      reflectionPrompts: [
        'Semaine 1 : Quelle action vous a procuré le plus d\'énergie ?',
        'Semaine 2 : Où avez-vous rencontré le plus de friction ?',
        'Semaine 3 : Quelle habitude commence à devenir automatique ?',
        'Semaine 4 : Bilan global et objectifs pour le prochain cycle',
      ],
      coachNoteTitle: 'Conseil du Coach & Engagement Mutuel',
      coachNotePlaceholder: 'Soyez 1% meilleur chaque jour. Rater un jour est humain, ne ratez jamais deux jours de suite.',
      qrPrompt: 'Scannez pour valider votre point hebdomadaire',
    },
    roadmap90: {
      title: 'Feuille de Route Stratégique 90 Jours',
      subtitle: 'Jalons structurés, livrables concrets et indicateurs de réussite pour notre mission.',
      initiativePrompt: 'Mission / Projet',
      clientPrompt: 'Client Partenaire',
      timelinePrompt: 'Horizon d\'Exécution',
      phase1: {
        number: 'PHASE 01',
        range: 'Jours 01 – 30',
        title: 'Diagnostic, Fondations & Victoires Rapides',
        deliverables: [
          'Audit complet de l\'existant et cartographie des goulots d\'étranglement',
          'Priorisation des leviers à plus fort impact immédiat',
          'Mise en place des premiers outils et routines opérationnelles',
          'Définition du rythme de synchronisation et des tableaux de bord',
        ],
        kpiLabel: 'Objectif Clé Phase 1 :',
        kpiValue: 'Audit validé à 100% et premiers freins critiques éliminés',
      },
      phase2: {
        number: 'PHASE 02',
        range: 'Jours 31 – 60',
        title: 'Déploiement Opérationnel & Accélération',
        deliverables: [
          'Exécution des chantiers prioritaires et restructuration des process',
          'Tests terrain en conditions réelles et ajustements itératifs',
          'Montée en compétences de l\'équipe et formalisation des guides',
          'Point d\'étape à mi-parcours et réalignement stratégique',
        ],
        kpiLabel: 'Objectif Clé Phase 2 :',
        kpiValue: 'Processus cibles opérationnels avec gain d\'efficacité mesurable',
      },
      phase3: {
        number: 'PHASE 03',
        range: 'Jours 61 – 90',
        title: 'Optimisation, Passage à l\'Échelle & Autonomie',
        deliverables: [
          'Automatisation des tâches récurrentes et consolidation des acquis',
          'Épreuve de charge des nouvelles méthodes pour pérenniser les gains',
          'Bilan final des résultats comparés aux indicateurs initiaux',
          'Transmission du livret de bord et plan de maintenance à long terme',
        ],
        kpiLabel: 'Objectif Clé Phase 3 :',
        kpiValue: 'Autonomie totale validée et atteinte des objectifs contractuels',
      },
      signoffTitle: 'Validation & Engagement Mutuel',
      clientSign: 'Signature du Client',
      leadSign: 'Signature du Consultant / Coach',
      qrPrompt: 'Scannez pour accéder au tableau de bord en ligne',
    },
    welcomePacket: {
      title: 'Guide d\'Accueil & Modalités de Collaboration',
      subtitle: 'Toutes les informations essentielles pour une mission fluide et performante.',
      welcomeHeader: 'Bienvenue ! Nous sommes ravis de collaborer avec vous.',
      welcomeBody:
        'Ce livret résume le fonctionnement de notre collaboration, les canaux d\'échange, les engagements réciproques et les premières étapes de notre lancement.',
      commHeader: 'Canaux de Communication & Disponibilité',
      commSub: 'Des canaux clairs garantissent rapidité et sérénité.',
      commItems: [
        { label: 'Canal Principal', text: 'E-mail et espace Slack / WhatsApp dédié pour les échanges réguliers' },
        { label: 'Délai de Réponse', text: 'Sous 24 heures ouvrées du lundi au vendredi (9h-18h)' },
        { label: 'Points de Suivi', text: 'Visio bimensuelle de 45 minutes avec ordre du jour partagé' },
        { label: 'Urgences', text: 'Mentionnez [URGENT] en objet pour un traitement prioritaire sous 4h' },
      ],
      agreementsHeader: 'Nos Accords de Fonctionnement',
      agreements: [
        {
          title: 'Transparence Totale',
          desc: 'Nous partageons sans détour les avancées, les doutes et les indicateurs pour décider efficacement.',
        },
        {
          title: 'Réactivité sur les Retours',
          desc: 'Retours sous 48h sur les propositions pour préserver le rythme du projet et respecter les délais.',
        },
        {
          title: 'Culture du Résultat',
          desc: 'Chaque action est guidée par l\'impact réel pour votre activité, sans surcharge inutile.',
        },
      ],
      firstStepsHeader: 'Dans les 72 Heures : Vos Premières Actions',
      firstSteps: [
        'Remplir le questionnaire initial et transmettre les accès nécessaires',
        'Valider le créneau de notre premier atelier de cadrage dans votre agenda',
        'Consulter et signer notre récapitulatif de cadrage',
      ],
      schedulePrompt: 'Réservez votre séance de démarrage directement via le QR code ci-dessous',
      qrPrompt: 'Scannez pour planifier votre séance de lancement',
    },
    footer: {
      madeWith: 'Document créé avec LogoLoom (logoloom.app)',
      confidential: 'Document Confidentiel & Réservé',
      scanToBook: 'Scannez pour nous contacter',
      page: 'Page 1 sur 1',
    },
  },
  // Placeholders for ES, DE, PT, IT (populated fully in Phase 2)
  es: {} as any,
  de: {} as any,
  pt: {} as any,
  it: {} as any,
};

// Fallback to English for incomplete translations in Phase 1
['es', 'de', 'pt', 'it'].forEach((l) => {
  DOCUMENT_TRANSLATIONS[l as DocumentLang] = DOCUMENT_TRANSLATIONS.en;
});
