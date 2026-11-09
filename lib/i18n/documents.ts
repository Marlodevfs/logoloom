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
  footer: {
    madeWith: string;
    confidential: string;
    scanToBook: string;
    page: string;
    verified: string;
  };
}

export const DOCUMENT_TRANSLATIONS: Record<DocumentLang, DocumentContent> = {
  en: {
    habitTracker: {
      headerCategory: 'Coaching program',
      headerSubtitleRight: '30-day habit tracker',
      title: '30-Day Habit Tracker',
      subtitle: 'Small daily actions lead to lasting change. Check off each day completed.',
      clientPrompt: 'Client:',
      periodPrompt: 'Period:',
      periodPlaceholder: 'From ____ / ____ to ____ / ____',
      goalPrompt: 'Main goal:',
      goalPlaceholder: 'Define your primary breakthrough intention...',
      coachPrompt: 'Lead Coach / Guide:',
      habitsHeader: 'DAILY HABITS',
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
        day7: 'Day 7: first week done',
        day14: 'Day 14: halfway there',
        day21: 'Day 21: three weeks in',
        day30: 'Day 30: finish line',
      },
      weeklyReflectionTitle: 'WEEKLY CHECK-INS',
      weekNames: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      reflectionPrompts: [
        'Week 1 Win: What brought the most momentum?',
        'Week 2 Resistance: Where did friction appear & how was it met?',
        'Week 3 Breakthrough: What routine now feels automatic?',
        'Week 4 Mastery: Key transformation to carry into next cycle',
      ],
      coachNoteTitle: "Coach's note",
      coachNotePlaceholder: 'Progress over perfection. If you miss a day, just start again tomorrow.',
      coachNoteDefault: 'Progress over perfection. If you miss a day, just start again tomorrow.',
      confidentialTag: 'Client document',
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
    footer: {
      madeWith: 'Document generated with LogoLoom',
      confidential: 'Client document',
      scanToBook: 'Scan to contact or book',
      page: 'Page 1 of 1',
      verified: 'Verified Client Document',
    },
  },
  fr: {
    habitTracker: {
      headerCategory: 'Programme d’accompagnement',
      headerSubtitleRight: 'Suivi d’habitudes sur 30 jours',
      title: 'Suivi d’habitudes sur 30 jours',
      subtitle: 'De petits gestes quotidiens créent de grands changements. Cochez chaque jour validé.',
      clientPrompt: 'Client :',
      periodPrompt: 'Période :',
      periodPlaceholder: 'Du ____ / ____ au ____ / ____',
      goalPrompt: 'Objectif clé :',
      goalPlaceholder: 'Définir l’intention majeure de ce cycle...',
      coachPrompt: 'Coach référent :',
      habitsHeader: 'HABITUDES QUOTIDIENNES',
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
        day7: 'J07 : première semaine validée',
        day14: 'J14 : à mi-chemin',
        day21: 'J21 : trois semaines d’ancrage',
        day30: 'J30 : ligne d’arrivée',
      },
      weeklyReflectionTitle: 'BILANS HEBDOMADAIRES',
      weekNames: ['Semaine 1', 'Semaine 2', 'Semaine 3', 'Semaine 4'],
      reflectionPrompts: [
        'Victoire Semaine 1 : qu’est-ce qui a procuré le plus d’énergie ?',
        'Point de friction Semaine 2 : où avez-vous rencontré de la résistance ?',
        'Ajustement Semaine 3 : quelle habitude devient naturelle ?',
        'Bilan Semaine 4 : transformation majeure acquise pour le prochain cycle',
      ],
      coachNoteTitle: 'Le mot du coach',
      coachNotePlaceholder: 'La régularité prime sur la perfection. En cas d’oubli, reprenez simplement le lendemain.',
      coachNoteDefault: 'La régularité prime sur la perfection. En cas d’oubli, reprenez simplement le lendemain.',
      confidentialTag: 'Document client',
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
    footer: {
      madeWith: 'Document créé avec LogoLoom',
      confidential: 'Document client',
      scanToBook: 'Scannez pour nous contacter',
      page: 'Page 1 sur 1',
      verified: 'Document client vérifié',
    },
  },
  de: {
    habitTracker: {
      headerCategory: 'Coaching-Programm',
      headerSubtitleRight: '30-Tage-Gewohnheitstracker',
      title: '30-Tage-Gewohnheitstracker',
      subtitle: 'Kleine tägliche Schritte führen zu dauerhafter Veränderung. Haken Sie jeden Tag ab.',
      clientPrompt: 'Klient:',
      periodPrompt: 'Zeitraum:',
      periodPlaceholder: 'Vom ____ / ____ bis ____ / ____',
      goalPrompt: 'Hauptziel:',
      goalPlaceholder: 'Definieren Sie Ihre zentrale Absicht für diesen Zyklus...',
      coachPrompt: 'Coach / Berater:',
      habitsHeader: 'TÄGLICHE GEWOHNHEITEN',
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
        day7: 'Tag 7: erste Woche geschafft',
        day14: 'Tag 14: Halbzeit erreicht',
        day21: 'Tag 21: drei Wochen geschafft',
        day30: 'Tag 30: Ziellinie erreicht',
      },
      weeklyReflectionTitle: 'WÖCHENTLICHE RÜCKBLICK',
      weekNames: ['Woche 1', 'Woche 2', 'Woche 3', 'Woche 4'],
      reflectionPrompts: [
        'Woche 1 Erfolg: Was hat am meisten Energie freigesetzt?',
        'Woche 2 Hürde: Wo trat Reibung auf und wie wurde sie gelöst?',
        'Woche 3 Durchbruch: Welche Routine fühlt sich jetzt leicht an?',
        'Woche 4 Meisterschaft: Wichtigste Erkenntnis für den nächsten Zyklus',
      ],
      coachNoteTitle: 'Rat des Coaches',
      coachNotePlaceholder: 'Beständigkeit schlägt Perfektion. Wenn ein Tag ausfällt, morgen einfach weitermachen.',
      coachNoteDefault: 'Beständigkeit schlägt Perfektion. Wenn ein Tag ausfällt, morgen einfach weitermachen.',
      confidentialTag: 'Klientendokument',
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
    footer: {
      madeWith: 'Erstellt mit LogoLoom',
      confidential: 'Vertraulich & Geschützt',
      scanToBook: 'Scannen für Kontakt oder Termin',
      page: 'Seite 1 von 1',
      verified: 'Verifiziertes Kundendokument',
    },
  },
  es: {
    habitTracker: {
      headerCategory: 'Programa de coaching',
      headerSubtitleRight: 'Seguimiento de hábitos de 30 días',
      title: 'Seguimiento de hábitos de 30 días',
      subtitle: 'Pequeñas acciones diarias generan grandes cambios. Marca cada día completado.',
      clientPrompt: 'Cliente:',
      periodPrompt: 'Período:',
      periodPlaceholder: 'Del ____ / ____ al ____ / ____',
      goalPrompt: 'Objetivo clave:',
      goalPlaceholder: 'Define tu intención de avance para este ciclo...',
      coachPrompt: 'Coach Referente:',
      habitsHeader: 'HÁBITOS DIARIOS',
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
        day7: 'Día 7: primera semana completada',
        day14: 'Día 14: a mitad de camino',
        day21: 'Día 21: tres semanas de constancia',
        day30: 'Día 30: meta alcanzada',
      },
      weeklyReflectionTitle: 'REVISIÓN SEMANAL',
      weekNames: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
      reflectionPrompts: [
        'Semana 1 Logro: ¿Qué acción generó más energía positiva?',
        'Semana 2 Resistencia: ¿Dónde surgió fricción y cómo se resolvió?',
        'Semana 3 Avance: ¿Qué rutina ya se siente automática?',
        'Semana 4 Dominio: Aprendizaje clave para el próximo ciclo',
      ],
      coachNoteTitle: 'Consejo del coach',
      coachNotePlaceholder: 'La constancia supera a la perfección. Si fallas un día, retoma mañana con calma.',
      coachNoteDefault: 'La constancia supera a la perfección. Si fallas un día, retoma mañana con calma.',
      confidentialTag: 'Documento cliente',
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
    footer: {
      madeWith: 'Documento generado con LogoLoom',
      confidential: 'Documento cliente',
      scanToBook: 'Escanea para contactar o reservar',
      page: 'Página 1 de 1',
      verified: 'Documento de cliente verificado',
    },
  },
  pt: {
    habitTracker: {
      headerCategory: 'Programa de coaching',
      headerSubtitleRight: 'Rastreador de hábitos de 30 dias',
      title: 'Rastreador de hábitos de 30 dias',
      subtitle: 'Pequenos hábitos diários geram grandes mudanças. Marque cada dia concluído.',
      clientPrompt: 'Cliente:',
      periodPrompt: 'Período:',
      periodPlaceholder: 'De ____ / ____ até ____ / ____',
      goalPrompt: 'Meta principal:',
      goalPlaceholder: 'Defina a intenção principal deste ciclo...',
      coachPrompt: 'Coach Responsável:',
      habitsHeader: 'HÁBITOS DIÁRIOS',
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
        day7: 'Dia 7: primeira semana concluída',
        day14: 'Dia 14: a meio do caminho',
        day21: 'Dia 21: três semanas de foco',
        day30: 'Dia 30: meta alcançada',
      },
      weeklyReflectionTitle: 'REVISÃO SEMANAL',
      weekNames: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
      reflectionPrompts: [
        'Semana 1 Vitória: O que gerou maior energia e progresso?',
        'Semana 2 Desafio: Onde surgiu resistência e como foi superada?',
        'Semana 3 Avanço: Qual rotina já parece natural e automática?',
        'Semana 4 Conquista: Principal aprendizado para o próximo ciclo',
      ],
      coachNoteTitle: 'Mensagem do coach',
      coachNotePlaceholder: 'Consistência supera perfeição. Se perder um dia, recomece amanhã com tranquilidade.',
      coachNoteDefault: 'Consistência supera perfeição. Se perder um dia, recomece amanhã com tranquilidade.',
      confidentialTag: 'Documento do cliente',
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
    footer: {
      madeWith: 'Documento gerado com LogoLoom',
      confidential: 'Documento Confidencial & Exclusivo',
      scanToBook: 'Escaneie para contato ou agendamento',
      page: 'Página 1 de 1',
      verified: 'Documento de cliente verificado',
    },
  },
  it: {
    habitTracker: {
      headerCategory: 'Programma di coaching',
      headerSubtitleRight: 'Tracciatore di abitudini a 30 giorni',
      title: 'Tracciatore di abitudini a 30 giorni',
      subtitle: 'Piccole azioni quotidiane creano grandi cambiamenti. Spunta ogni giorno completato.',
      clientPrompt: 'Cliente:',
      periodPrompt: 'Periodo:',
      periodPlaceholder: 'Dal ____ / ____ al ____ / ____',
      goalPrompt: 'Obiettivo principale:',
      goalPlaceholder: 'Definisci il traguardo principale di questo ciclo...',
      coachPrompt: 'Coach Referente:',
      habitsHeader: 'ABITUDINI QUOTIDIANE',
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
        day7: 'Giorno 7: prima settimana completata',
        day14: 'Giorno 14: a metà strada',
        day21: 'Giorno 21: tre settimane di costanza',
        day30: 'Giorno 30: traguardo finale',
      },
      weeklyReflectionTitle: 'REVISIONE SETTIMANALE',
      weekNames: ['Settimana 1', 'Settimana 2', 'Settimana 3', 'Settimana 4'],
      reflectionPrompts: [
        'Settimana 1 Vittoria: Quale azione ha dato maggiore slancio?',
        'Settimana 2 Ostacolo: Dove è emersa resistenza e come è stata superata?',
        'Settimana 3 Svolta: Quale abitudine ora sembra spontanea?',
        'Settimana 4 Padronanza: Apprendimento chiave per il prossimo ciclo',
      ],
      coachNoteTitle: 'Nota del coach',
      coachNotePlaceholder: 'La costanza batte la perfezione. Se salti un giorno, riparti domani con serenità.',
      coachNoteDefault: 'La costanza batte la perfezione. Se salti un giorno, riparti domani con serenità.',
      confidentialTag: 'Documento cliente',
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
    footer: {
      madeWith: 'Documento creato con LogoLoom',
      confidential: 'Documento Riservato & Confidenziale',
      scanToBook: 'Scansiona per contattarci o prenotare',
      page: 'Pagina 1 di 1',
      verified: 'Documento cliente verificato',
    },
  },
};
