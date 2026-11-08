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
  es: {
    habitTracker: {
      title: 'Rastreador Diario de Hábitos y Momentum (30 Días)',
      subtitle: 'La constancia diaria genera resultados transformadores. Marca cada día superado con éxito.',
      monthPrompt: 'Mes / Ciclo',
      clientPrompt: 'Preparado para',
      coachPrompt: 'Coach Referente',
      categories: {
        movement: '1. Vitalidad Física y Movimiento',
        mindset: '2. Enfoque Estratégico y Trabajo Profundo',
        nutrition: '3. Nutrición, Hidratación y Descanso',
        productivity: '4. Claridad Mental y Balance Diario',
      },
      habitPlaceholder: 'Define tu rutina prioritaria...',
      daysHeader: 'Días 01 al 30',
      milestones: {
        day7: 'Hito D7: Establecimiento del ritmo inicial',
        day14: 'Hito D14: Superación de resistencias',
        day21: 'Hito D21: Consolidación del nuevo hábito',
        day30: 'Hito D30: Autonomía y transformación adquirida',
      },
      weeklyReflectionTitle: 'Revisiones Semanales y Nivel de Compromiso',
      reflectionPrompts: [
        'Semana 1: ¿Qué hábito te aportó mayor vitalidad?',
        'Semana 2: ¿Dónde apareció mayor resistencia o fricción?',
        'Semana 3: ¿Qué acción se siente ya natural y automática?',
        'Semana 4: Conclusiones clave para los próximos 30 días',
      ],
      coachNoteTitle: 'Consejo del Coach y Compromiso Mutuo',
      coachNotePlaceholder: 'Sé 1% mejor cada día. Fallar un día es humano, nunca falles dos días seguidos.',
      qrPrompt: 'Escanea para registrar tu sesión semanal',
    },
    roadmap90: {
      title: 'Hoja de Ruta Estratégica 90 Días',
      subtitle: 'Hitos estructurados, entregables clave y métricas de éxito para nuestra colaboración.',
      initiativePrompt: 'Iniciativa / Proyecto',
      clientPrompt: 'Cliente Asociado',
      timelinePrompt: 'Horizonte de Ejecución',
      phase1: {
        number: 'FASE 01',
        range: 'Días 01 – 30',
        title: 'Auditoría, Cimientos y Victorias Rápidas',
        deliverables: [
          'Auditoría integral del estado actual y mapa de cuellos de botella',
          'Priorización de palancas de alto impacto y recursos',
          'Implantación de las primeras rutinas y sistemas ágiles',
          'Definición del ritmo de reuniones y paneles de control',
        ],
        kpiLabel: 'Objetivo Clave Fase 1:',
        kpiValue: 'Auditoría 100% completada y fricciones iniciales resueltas',
      },
      phase2: {
        number: 'FASE 02',
        range: 'Días 31 – 60',
        title: 'Implementación Central y Aceleración',
        deliverables: [
          'Ejecución de cambios estratégicos en los flujos principales',
          'Pruebas operativas en tiempo real y ajustes iterativos',
          'Formación del equipo y redacción de procedimientos estándar',
          'Revisión intermedia de avances y calibración del plan',
        ],
        kpiLabel: 'Objetivo Clave Fase 2:',
        kpiValue: 'Sistema central operativo con más de 25% de mejora en velocidad',
      },
      phase3: {
        number: 'FASE 03',
        range: 'Días 61 – 90',
        title: 'Optimización, Escalabilidad y Autonomía',
        deliverables: [
          'Automatización de procesos recurrentes y consolidación',
          'Pruebas de resistencia de procesos para garantizar solidez',
          'Revisión final de métricas frente a objetivos iniciales',
          'Entrega del manual operativo y hoja de mantenimiento futuro',
        ],
        kpiLabel: 'Objetivo Clave Fase 3:',
        kpiValue: 'Autonomía operativa total y entrega de hitos confirmada',
      },
      signoffTitle: 'Compromiso Mutuo y Validación de Hitos',
      clientSign: 'Firma y Aprobación del Cliente',
      leadSign: 'Firma del Consultor / Coach',
      qrPrompt: 'Escanea para acceder al tablero de seguimiento',
    },
    welcomePacket: {
      title: 'Guía de Bienvenida y Colaboración',
      subtitle: 'Toda la información indispensable para una colaboración fluida y de máximo impacto.',
      welcomeHeader: '¡Bienvenido a bordo! Estamos encantados de colaborar contigo.',
      welcomeBody:
        'Esta guía resume cómo trabajaremos juntos, nuestros canales de comunicación, acuerdos de servicio y los primeros pasos del proyecto.',
      commHeader: 'Canales de Comunicación y Disponibilidad',
      commSub: 'Canales bien definidos evitan fricciones y garantizan rapidez.',
      commItems: [
        { label: 'Canal Principal', text: 'Email y espacio privado en Slack / Telegram para el día a día' },
        { label: 'Tiempo de Respuesta', text: 'Menos de 24 horas en días laborables (Lun–Vie, 9h–18h)' },
        { label: 'Reuniones de Estado', text: 'Visio quincenal de 45 minutos con orden del día compartido' },
        { label: 'Urgencias', text: 'Indica [URGENTE] en el asunto para atención prioritaria en 4h' },
      ],
      agreementsHeader: 'Nuestros Acuerdos de Trabajo',
      agreements: [
        {
          title: 'Transparencia Absoluta',
          desc: 'Compartimos avances, alertas tempranas y datos reales para tomar decisiones fundamentadas.',
        },
        {
          title: 'Retroalimentación Ágil',
          desc: 'Revisiones en menos de 48 horas para mantener el impulso del proyecto y respetar plazos.',
        },
        {
          title: 'Foco en Resultados',
          desc: 'Cada iniciativa se mide por su impacto comercial y valor tangible, sin tareas accesorias.',
        },
      ],
      firstStepsHeader: 'En las primeras 72 horas: Preparativos',
      firstSteps: [
        'Completar el cuestionario de inicio y compartir accesos y credenciales',
        'Confirmar la fecha de nuestra primera sesión de lanzamiento en el calendario',
        'Revisar y firmar el resumen de alcance acordado',
      ],
      schedulePrompt: 'Agenda tu sesión inicial mediante el código QR inferior',
      qrPrompt: 'Escanea para agendar tu llamada de inicio',
    },
    footer: {
      madeWith: 'Documento creado con LogoLoom (logoloom.app)',
      confidential: 'Documento Confidencial y Reservado',
      scanToBook: 'Escanea para contactar directamente',
      page: 'Página 1 de 1',
    },
  },
  de: {
    habitTracker: {
      title: '30-Tage Gewohnheits- und Momentum-Tracker',
      subtitle: 'Tägliche Beständigkeit schafft nachhaltige Transformation. Haken Sie jeden Tag ab.',
      monthPrompt: 'Monat / Zyklus',
      clientPrompt: 'Erstellt für',
      coachPrompt: 'Leitender Coach',
      categories: {
        movement: '1. Körperliche Vitalität & Bewegung',
        mindset: '2. Fokus & Strategische Tiefenarbeit',
        nutrition: '3. Ernährung, Hydration & Schlaf',
        productivity: '4. Geistige Klarheit & Abendreflexion',
      },
      habitPlaceholder: 'Definieren Sie Ihre Hauptroutine...',
      daysHeader: 'Tage 01 bis 30',
      milestones: {
        day7: 'Tag 7 Checkpoint: Etablierung des Rhythmus',
        day14: 'Tag 14 Checkpoint: Überwindung von Widerständen',
        day21: 'Tag 21 Checkpoint: Festigung der Gewohnheit',
        day30: 'Tag 30 Checkpoint: Transformation & Selbstständigkeit',
      },
      weeklyReflectionTitle: 'Wöchentlicher Rückblick & Momentum-Score',
      reflectionPrompts: [
        'Woche 1: Welche Aktion gab Ihnen die meiste Energie?',
        'Woche 2: Wo traten Reibungen oder Hindernisse auf?',
        'Woche 3: Welche Gewohnheit fühlt sich bereits mühelos an?',
        'Woche 4: Wichtigste Erkenntnis für die nächsten 30 Tage',
      ],
      coachNoteTitle: 'Coach-Empfehlung & Verbindlichkeit',
      coachNotePlaceholder: 'Jeden Tag 1% besser. Einen Tag auslassen ist menschlich, niemals zwei Tage hintereinander.',
      qrPrompt: 'Scannen für den wöchentlichen Check-in',
    },
    roadmap90: {
      title: 'Strategische 90-Tage Transformations-Roadmap',
      subtitle: 'Strukturierte Meilensteine, greifbare Ergebnisse und messbare Erfolgskriterien.',
      initiativePrompt: 'Projekt / Initiative',
      clientPrompt: 'Klient & Partner',
      timelinePrompt: 'Zeithorizont',
      phase1: {
        number: 'PHASE 01',
        range: 'Tage 01 – 30',
        title: 'Diagnose, Grundlagen & Schnelle Erfolge',
        deliverables: [
          'Umfassendes Audit und Analyse operativer Engpässe',
          'Priorisierung wirkungsvoller Hebel und Ressourcen',
          'Einführung erster schneller Systeme und Abläufe',
          'Festlegung der Abstimmungsrhythmen und Dashboards',
        ],
        kpiLabel: 'Hauptziel Phase 1:',
        kpiValue: '100% Audit abgeschlossen und erste Barrieren gelöst',
      },
      phase2: {
        number: 'PHASE 02',
        range: 'Tage 31 – 60',
        title: 'Kernumsetzung & Beschleunigung',
        deliverables: [
          'Umsetzung zentraler strategischer Anpassungen',
          'Praxistests unter realen Bedingungen und Optimierung',
          'Kompetenzaufbau im Team und Dokumentation',
          'Zwischenbilanz und strategische Neuausrichtung',
        ],
        kpiLabel: 'Hauptziel Phase 2:',
        kpiValue: 'Kernprozesse mit über 25% Effizienzgewinn im Betrieb',
      },
      phase3: {
        number: 'PHASE 03',
        range: 'Tage 61 – 90',
        title: 'Optimierung, Skalierung & Autonomie',
        deliverables: [
          'Automatisierung wiederkehrender Aufgaben',
          'Belastungstests für langfristige Stabilität',
          'Abschlussanalyse der Ergebnisse im Vergleich zum Start',
          'Übergabe des Handbuchs und langfristige Roadmap',
        ],
        kpiLabel: 'Hauptziel Phase 3:',
        kpiValue: 'Vollständige autonome Durchführung aller Meilensteine',
      },
      signoffTitle: 'Gemeinsame Vereinbarung & Freigabe',
      clientSign: 'Unterschrift Klient',
      leadSign: 'Unterschrift Berater / Coach',
      qrPrompt: 'Scannen für Zugriff auf das Live-Dashboard',
    },
    welcomePacket: {
      title: 'Willkommenspaket & Zusammenarbeits-Leitfaden',
      subtitle: 'Alle wesentlichen Grundlagen für eine transparente und wirkungsvolle Partnerschaft.',
      welcomeHeader: 'Herzlich willkommen! Wir freuen uns auf die Zusammenarbeit.',
      welcomeBody:
        'Dieser Leitfaden beschreibt unsere Arbeitsweise, Kommunikationswege, Erwartungen und die ersten gemeinsamen Schritte.',
      commHeader: 'Kommunikationswege & Erreichbarkeit',
      commSub: 'Klare Absprachen sichern reibungslose und schnelle Abläufe.',
      commItems: [
        { label: 'Hauptkanal', text: 'E-Mail & dedizierter Slack / Teams-Workspace für täglichen Austausch' },
        { label: 'Reaktionszeit', text: 'Innerhalb von 24 Stunden an Werktagen (Mo–Fr, 9:00–18:00)' },
        { label: 'Status-Reviews', text: '14-tägige 45-Minuten-Sprint-Calls mit geteilter Agenda' },
        { label: 'Dringendes', text: 'Betreff mit [DRINGEND] für priorisierte Rückmeldung in 4h' },
      ],
      agreementsHeader: 'Unsere Arbeitsvereinbarungen',
      agreements: [
        {
          title: 'Vollständige Transparenz',
          desc: 'Wir teilen Fortschritte, Herausforderungen und Kennzahlen offen für fundierte Entscheidungen.',
        },
        {
          title: 'Pünktliche Rückmeldungen',
          desc: 'Feedback innerhalb von 48 Stunden, um den Projektfortschritt und Deadlines zu wahren.',
        },
        {
          title: 'Ergebnisorientierung',
          desc: 'Jede Aufgabe orientiert sich am messbaren Geschäftswert, nicht an bürokratischem Mehraufwand.',
        },
      ],
      firstStepsHeader: 'Erste 72 Stunden: Vorbereitung',
      firstSteps: [
        'Fragebogen ausfüllen und notwendige Zugänge bereitstellen',
        'Regelmäßigen Jour-Fixe-Termin im Kalender bestätigen',
        'Zusammenarbeitsrahmen und Projektziele gegenzeichnen',
      ],
      schedulePrompt: 'Buchen Sie Ihren Auftakt-Termin über den nachfolgenden QR-Code',
      qrPrompt: 'Scannen zur Terminbuchung & Klienten-Portal',
    },
    footer: {
      madeWith: 'Erstellt mit LogoLoom (logoloom.app)',
      confidential: 'Streng Vertraulich & Geschützt',
      scanToBook: 'Scannen für direkten Kontakt',
      page: 'Seite 1 von 1',
    },
  },
  pt: {
    habitTracker: {
      title: 'Rastreador Diário de Hábitos e Ritmo (30 Dias)',
      subtitle: 'A consistência cria resultados extraordinários. Marque cada dia concluído com orgulho.',
      monthPrompt: 'Mês / Ciclo',
      clientPrompt: 'Preparado para',
      coachPrompt: 'Coach Responsável',
      categories: {
        movement: '1. Vitalidade Física e Movimento',
        mindset: '2. Foco Estratégico e Trabalho Profundo',
        nutrition: '3. Nutrição, Hidratação e Sono',
        productivity: '4. Clareza Mental e Balanço Diário',
      },
      habitPlaceholder: 'Defina a sua rotina prioritária...',
      daysHeader: 'Dias 01 a 30',
      milestones: {
        day7: 'Marco D7: Estabelecer o ritmo inicial',
        day14: 'Marco D14: Superar resistências',
        day21: 'Marco D21: Fixação do novo hábito',
        day30: 'Marco D30: Transformação e autonomia alcançada',
      },
      weeklyReflectionTitle: 'Balanço Semanal e Índice de Ritmo',
      reflectionPrompts: [
        'Semana 1: Qual a ação que lhe trouxe mais energia?',
        'Semana 2: Onde sentiu maior atrito ou resistência?',
        'Semana 3: Que hábito já parece automático e natural?',
        'Semana 4: Principal lição para os próximos 30 dias',
      ],
      coachNoteTitle: 'Conselho do Coach e Compromisso',
      coachNotePlaceholder: 'Seja 1% melhor a cada dia. Falhar um dia é normal, nunca falhe dois dias seguidos.',
      qrPrompt: 'Leia para registar o ponto semanal',
    },
    roadmap90: {
      title: 'Roteiro Estratégico de 90 Dias',
      subtitle: 'Metas estruturadas, entregas essenciais e indicadores mensuráveis para a nossa missão.',
      initiativePrompt: 'Projeto / Iniciativa',
      clientPrompt: 'Cliente Parceiro',
      timelinePrompt: 'Horizonte de Execução',
      phase1: {
        number: 'FASE 01',
        range: 'Dias 01 – 30',
        title: 'Diagnóstico, Fundamentos e Vitórias Rápidas',
        deliverables: [
          'Auditoria integral ao cenário atual e mapeamento de bloqueios',
          'Priorização de alavancas de alto impacto e recursos',
          'Implementação das primeiras rotinas e ferramentas ágeis',
          'Definição do ritmo de acompanhamento e painéis de controlo',
        ],
        kpiLabel: 'Objetivo Chave Fase 1:',
        kpiValue: 'Auditoria 100% validada e bloqueios iniciais resolvidos',
      },
      phase2: {
        number: 'FASE 02',
        range: 'Dias 31 – 60',
        title: 'Execução Central e Aceleração',
        deliverables: [
          'Implementação das alterações estratégicas nos fluxos principais',
          'Testes em condições reais e afinações contínuas',
          'Capacitação da equipa e elaboração de guias de procedimentos',
          'Ponto de situação intercalar e alinhamento do plano',
        ],
        kpiLabel: 'Objetivo Chave Fase 2:',
        kpiValue: 'Estrutura operacional com ganhos de eficiência superiores a 25%',
      },
      phase3: {
        number: 'FASE 03',
        range: 'Dias 61 – 90',
        title: 'Otimização, Escala e Autonomia',
        deliverables: [
          'Automatização de tarefas recorrentes e consolidação',
          'Testes de robustez dos processos para garantir sustentabilidade',
          'Avaliação final de resultados comparativamente às metas iniciais',
          'Entrega do manual de procedimentos e plano de continuidade',
        ],
        kpiLabel: 'Objetivo Chave Fase 3:',
        kpiValue: 'Autonomia plena e concretização integral das metas',
      },
      signoffTitle: 'Compromisso Mútuo e Validação de Metas',
      clientSign: 'Assinatura do Cliente',
      leadSign: 'Assinatura do Consultor / Coach',
      qrPrompt: 'Leia para aceder ao painel de acompanhamento online',
    },
    welcomePacket: {
      title: 'Guia de Boas-Vindas e Colaboração',
      subtitle: 'Informações indispensáveis para uma parceria fluida, ágil e focada em resultados.',
      welcomeHeader: 'Bem-vindo! É com enorme entusiasmo que iniciamos esta parceria.',
      welcomeBody:
        'Este guia estabelece as nossas formas de trabalho, canais de comunicação, compromissos mútuos e as etapas essenciais dos primeiros 14 dias.',
      commHeader: 'Canais de Comunicação e Disponibilidade',
      commSub: 'Canais bem definidos asseguram rapidez e tranquilidade.',
      commItems: [
        { label: 'Canal Principal', text: 'Email e espaço de mensagens no Slack / Telegram para o dia a dia' },
        { label: 'Prazo de Resposta', text: 'Menos de 24 horas úteis (Seg–Sex, 9h–18h)' },
        { label: 'Reuniões de Ponto', text: 'Videoconferência quinzenal de 45 minutos com ordem de trabalhos' },
        { label: 'Assuntos Urgentes', text: 'Identifique com [URGENTE] no assunto para resposta em 4h' },
      ],
      agreementsHeader: 'Os Nossos Acordos de Funcionamento',
      agreements: [
        {
          title: 'Transparência Total',
          desc: 'Partilhamos abertamente progressos, alertas e métricas para decisões informadas.',
        },
        {
          title: 'Feedback Construtivo e Ágil',
          desc: 'Aprovações e comentários em até 48 horas para manter o ritmo e cumprir prazos.',
        },
        {
          title: 'Foco no Impacto Real',
          desc: 'Todas as tarefas são medidas pelo valor efetivo gerado para a sua atividade.',
        },
      ],
      firstStepsHeader: 'Nas primeiras 72 horas: Preparativos',
      firstSteps: [
        'Preencher o formulário inicial e fornecer os acessos e ficheiros necessários',
        'Validar a data da nossa sessão de arranque no calendário',
        'Analisar e assinar o documento de âmbito acordado',
      ],
      schedulePrompt: 'Agende a sua sessão de arranque através do código QR abaixo',
      qrPrompt: 'Leia para marcar a sessão inicial de planeamento',
    },
    footer: {
      madeWith: 'Documento criado com LogoLoom (logoloom.app)',
      confidential: 'Documento Confidencial e Reservado',
      scanToBook: 'Leia para contacto direto',
      page: 'Página 1 de 1',
    },
  },
  it: {
    habitTracker: {
      title: 'Registro Giornaliero delle Abitudini (30 Giorni)',
      subtitle: 'La costanza quotidiana crea risultati duraturi. Spunta ogni giorno con soddisfazione.',
      monthPrompt: 'Mese / Ciclo',
      clientPrompt: 'Preparato per',
      coachPrompt: 'Coach di Riferimento',
      categories: {
        movement: '1. Vitalità Fisica & Movimento',
        mindset: '2. Focus Strategico & Lavoro Profondo',
        nutrition: '3. Nutrizione, Idratazione & Riposo',
        productivity: '4. Lucidità Mentale & Bilancio Serale',
      },
      habitPlaceholder: 'Definisci la tua routine prioritaria...',
      daysHeader: 'Giorni 01 a 30',
      milestones: {
        day7: 'Traguardo G7: Consolidamento del ritmo iniziale',
        day14: 'Traguardo G14: Superamento delle prime resistenze',
        day21: 'Traguardo G21: Ancoraggio della nuova abitudine',
        day30: 'Traguardo G30: Trasformazione e autonomia raggiunta',
      },
      weeklyReflectionTitle: 'Bilanci Settimanali & Punteggio di Impegno',
      reflectionPrompts: [
        'Settimana 1: Quale azione ti ha dato maggiore energia?',
        'Settimana 2: Dove hai riscontrato maggiore attrito?',
        'Settimana 3: Quale abitudine è diventata quasi spontanea?',
        'Settimana 4: Bilancio finale e obiettivi per il prossimo ciclo',
      ],
      coachNoteTitle: 'Consiglio del Coach & Impegno Reciproco',
      coachNotePlaceholder: 'Migliora dell\'1% ogni giorno. Saltare un giorno capita, non saltare mai due giorni di fila.',
      qrPrompt: 'Scansiona per registrare il tuo check-in settimanale',
    },
    roadmap90: {
      title: 'Tabella di Marcia Strategica 90 Giorni',
      subtitle: 'Pietre miliari, risultati tangibili e indicatori chiari per la nostra missione.',
      initiativePrompt: 'Progetto / Iniziativa',
      clientPrompt: 'Cliente Partner',
      timelinePrompt: 'Orizzonte Temporale',
      phase1: {
        number: 'FASE 01',
        range: 'Giorni 01 – 30',
        title: 'Diagnosi, Fondamenta & Risultati Rapidi',
        deliverables: [
          'Audit completo dello stato attuale e mappatura dei colli di bottiglia',
          'Definizione delle priorità a più alto impatto e risorse',
          'Attivazione dei primi sistemi operativi e routine agili',
          'Definizione del ritmo di allineamento e cruscotti di controllo',
        ],
        kpiLabel: 'Obiettivo Chiave Fase 1:',
        kpiValue: 'Audit validato al 100% e primi ostacoli critici superati',
      },
      phase2: {
        number: 'FASE 02',
        range: 'Giorni 31 – 60',
        title: 'Attuazione Operativa & Accelerazione',
        deliverables: [
          'Esecuzione delle modifiche strategiche sui flussi cardine',
          'Collaudo sul campo in situazioni reali e perfezionamento',
          'Formazione del team e stesura delle procedure operative',
          'Punto di verifica intermedio e ricalibrazione del piano',
        ],
        kpiLabel: 'Obiettivo Chiave Fase 2:',
        kpiValue: 'Sistema operativo cardine con oltre il 25% di incremento di resa',
      },
      phase3: {
        number: 'FASE 03',
        range: 'Giorni 61 – 90',
        title: 'Ottimizzazione, Scalabilità & Autonomia',
        deliverables: [
          'Automazione dei processi ricorrenti e consolidamento',
          'Stress test delle procedure per garantire sostenibilità nel tempo',
          'Verifica conclusiva dei risultati rispetto ai parametri iniziali',
          'Consegna del manuale operativo e piano di continuità',
        ],
        kpiLabel: 'Obiettivo Chiave Fase 3:',
        kpiValue: 'Autonomia gestionale completa e traguardi contrattuali raggiunti',
      },
      signoffTitle: 'Impegno Reciproco & Approvazione Traguardi',
      clientSign: 'Firma per Accettazione Cliente',
      leadSign: 'Firma Consulente / Coach',
      qrPrompt: 'Scansiona per accedere al pannello di monitoraggio',
    },
    welcomePacket: {
      title: 'Guida di Benvenuto & Collaborazione',
      subtitle: 'Tutte le informazioni indispensabili per una partnership efficace, trasparente e serena.',
      welcomeHeader: 'Benvenuto! Siamo felici di iniziare questa collaborazione con te.',
      welcomeBody:
        'Questo fascicolo riepiloga le modalità di lavoro, i canali di contatto, gli impegni reciproci e le tappe chiave delle prime due settimane.',
      commHeader: 'Canali di Comunicazione & Reperibilità',
      commSub: 'Canali ben definiti garantiscono velocità e serenità operativa.',
      commItems: [
        { label: 'Canale Principale', text: 'Email e gruppo dedicato su Slack / Telegram per gli scambi quotidiani' },
        { label: 'Tempi di Risposta', text: 'Entro 24 ore lavorative (Lun–Ven, 9:00–18:00)' },
        { label: 'Punti di Allineamento', text: 'Videochiamata quindicinale di 45 minuti con ordine del giorno' },
        { label: 'Emergenze', text: 'Indica [URGENTE] nell\'oggetto per gestione prioritaria entro 4 ore' },
      ],
      agreementsHeader: 'I Nostri Accordi di Funzionamento',
      agreements: [
        {
          title: 'Trasparenza Assoluta',
          desc: 'Condividiamo apertamente avanzamenti, dubbi e metriche per decisioni consapevoli.',
        },
        {
          title: 'Tempestività nei Riscontri',
          desc: 'Feedback entro 48 ore per non rallentare l\'avanzamento e rispettare le scadenze.',
        },
        {
          title: 'Cultura del Risultato',
          desc: 'Ogni azione è misurata sull\'impatto commerciale effettivo, senza sovrastrutture.',
        },
      ],
      firstStepsHeader: 'Nelle prime 72 ore: Prime Azioni',
      firstSteps: [
        'Compilare il modulo informativo iniziale e trasmettere gli accessi necessari',
        'Confermare la data del nostro primo incontro operativo in agenda',
        'Leggere e firmare il riepilogo degli accordi concordati',
      ],
      schedulePrompt: 'Prenota il tuo incontro iniziale tramite il codice QR qui sotto',
      qrPrompt: 'Scansiona per prenotare la sessione di avvio',
    },
    footer: {
      madeWith: 'Documento creato con LogoLoom (logoloom.app)',
      confidential: 'Documento Riservato & Confidenziale',
      scanToBook: 'Scansiona per contatto diretto',
      page: 'Pagina 1 di 1',
    },
  },
};
