import {
  DocumentLang,
  GoalPlannerCustomContent,
  WeeklyPlannerCustomContent,
  MonthlyCalendarCustomContent,
  DailyPrioritiesCustomContent,
  MealPlannerCustomContent,
  BudgetTrackerCustomContent,
  ChecklistCustomContent,
} from '@/types';

// ============================================================================
// 1. GOAL PLANNER 90 DAYS (Personal)
// ============================================================================
export const DEFAULT_GOAL_PLANNER: Record<DocumentLang, GoalPlannerCustomContent> = {
  fr: {
    title: 'Objectifs 90 jours',
    subtitle: 'Plan d’action trimestriel & jalons',
    goals: [
      'Finaliser et lancer le projet principal avec clarté',
      'Établir une routine sportive régulière (3x/semaine)',
      'Développer l’activité professionnelle et atteindre 5 nouveaux clients',
    ],
    whyItMatters: 'Ce trimestre pose les fondations de ma liberté et de ma sérénité sur l’année.',
    phases: [
      {
        title: 'Mois 1 — Cadrage & Fondations',
        focus: 'Mettre en place les bases et éliminer les distractions',
        milestones: [
          'Définir le périmètre exact et les étapes clés',
          'Bloquer les créneaux dédiés dans le calendrier',
          'Préparer tous les outils et ressources indispensables',
          'Bilan de fin de premier mois et ajustements',
        ],
        kpi: '100% des bases posées',
      },
      {
        title: 'Mois 2 — Exécution & Rythme',
        focus: 'Maintenir la régularité et produire les premiers résultats',
        milestones: [
          'Livrer la première version ou le prototype',
          'Tester et récolter les premiers retours concrets',
          'Corriger les points de friction identifiés',
          'Valider le passage à la vitesse supérieure',
        ],
        kpi: 'Premier livrable validé',
      },
      {
        title: 'Mois 3 — Finalisation & Impact',
        focus: 'Boucler le projet, célébrer les victoires et consolider',
        milestones: [
          'Finaliser tous les détails et la documentation',
          'Lancer officiellement et communiquer',
          'Faire le bilan complet des 90 jours',
          'Définir les priorités du trimestre suivant',
        ],
        kpi: 'Objectif final atteint',
      },
    ],
    notes: 'Prioriser la constance sur l’intensité. Célébrer chaque petite victoire.',
  },
  en: {
    title: '90-Day Goal Planner',
    subtitle: 'Quarterly focus, milestones & weekly momentum',
    goals: [
      'Finalize and launch the primary project with clarity',
      'Establish a consistent workout routine (3x / week)',
      'Expand professional pipeline and secure 5 new clients',
    ],
    whyItMatters: 'This quarter creates the foundation for long-term independence and momentum.',
    phases: [
      {
        title: 'Month 1 — Foundations & Setup',
        focus: 'Set clear systems and eliminate friction',
        milestones: [
          'Define the exact scope and critical path milestones',
          'Block dedicated deep-work slots in calendar',
          'Gather all essential tools and documentation',
          'End-of-month progress review and calibration',
        ],
        kpi: '100% foundation set',
      },
      {
        title: 'Month 2 — Execution & Momentum',
        focus: 'Build consistent cadence and ship initial milestones',
        milestones: [
          'Deliver prototype or first phase deliverables',
          'Gather constructive feedback and test iterations',
          'Refine systems and remove operational bottlenecks',
          'Validate readiness for the final launch phase',
        ],
        kpi: 'First milestone shipped',
      },
      {
        title: 'Month 3 — Launch & Consolidation',
        focus: 'Complete deliverables, celebrate wins, and set future path',
        milestones: [
          'Complete final polish and delivery details',
          'Public launch and announce results',
          'Conduct comprehensive 90-day retrospective',
          'Draft strategic priorities for the next quarter',
        ],
        kpi: 'Core goal accomplished',
      },
    ],
    notes: 'Consistency over intensity. Small daily steps compound into breakthrough results.',
  },
  de: {
    title: '90-Tage-Zielplaner',
    subtitle: 'Quartalsfokus, Meilensteine & wöchentlicher Fortschritt',
    goals: [
      'Hauptprojekt abschließen und erfolgreich veröffentlichen',
      'Feste Trainingsroutine etablieren (3x pro Woche)',
      'Geschäft ausbauen und 5 neue Kunden gewinnen',
    ],
    whyItMatters: 'Dieses Quartal schafft das Fundament für nachhaltigen Erfolg und Klarheit.',
    phases: [
      {
        title: 'Monat 1 — Fundament & Struktur',
        focus: 'Klarheit schaffen und Ablenkungen beseitigen',
        milestones: [
          'Projektumfang und Meilensteine genau definieren',
          'Feste Fokuszeiten im Kalender reservieren',
          'Benötigte Werkzeuge und Ressourcen vorbereiten',
          'Monatsabschluss und Feinabstimmung der Strategie',
        ],
        kpi: '100% Fundament steht',
      },
      {
        title: 'Monat 2 — Umsetzung & Rhythmus',
        focus: 'Konstanz wahren und erste Ergebnisse liefern',
        milestones: [
          'Erste Version oder Prototyp fertigstellen',
          'Feedback einholen und Verbesserungen umsetzen',
          'Arbeitsabläufe vereinfachen und Reibung minimieren',
          'Bereitschaft für die finale Phase bestätigen',
        ],
        kpi: 'Erster Meilenstein erreicht',
      },
      {
        title: 'Monat 3 — Abschluss & Verankerung',
        focus: 'Projekt vollenden, Erfolge feiern und Ausblick planen',
        milestones: [
          'Feinschliff und Dokumentation abschließen',
          'Offizieller Launch und Veröffentlichung',
          'Umfassende 90-Tage-Retrospektive durchführen',
          'Prioritäten für das nächste Quartal festlegen',
        ],
        kpi: 'Hauptziel erfolgreich erreicht',
      },
    ],
    notes: 'Beständigkeit schlägt Intensität. Jeder Tag zählt.',
  },
  es: {
    title: 'Planificador 90 Días',
    subtitle: 'Enfoque trimestral, hitos y avance semanal',
    goals: [
      'Finalizar y lanzar el proyecto principal con claridad',
      'Establecer rutina de ejercicio constante (3 veces/semana)',
      'Hacer crecer el negocio y conseguir 5 nuevos clientes',
    ],
    whyItMatters: 'Este trimestre sienta las bases de mi serenidad y crecimiento personal.',
    phases: [
      {
        title: 'Mes 1 — Bases y Organización',
        focus: 'Crear bases sólidas y eliminar distracciones',
        milestones: [
          'Definir alcance exacto e hitos prioritarios',
          'Reservar bloques de trabajo profundo en el calendario',
          'Reunir herramientas y recursos clave',
          'Evaluación mensual y calibración de objetivos',
        ],
        kpi: '100% bases completadas',
      },
      {
        title: 'Mes 2 — Ejecución y Ritmo',
        focus: 'Mantener la constancia y entregar los primeros avances',
        milestones: [
          'Completar primera versión o prototipo funcional',
          'Recoger feedback y realizar mejoras clave',
          'Optimizar procesos para mayor fluidez',
          'Preparar el terreno para la fase final',
        ],
        kpi: 'Primer hito entregado',
      },
      {
        title: 'Mes 3 — Culminación y Consolidación',
        focus: 'Finalizar entregables, celebrar logros y planificar el futuro',
        milestones: [
          'Completar detalles finales y documentación',
          'Lanzamiento oficial y comunicación de resultados',
          'Retrospectiva completa de los 90 días',
          'Planificar prioridades para el próximo trimestre',
        ],
        kpi: 'Objetivo final alcanzado',
      },
    ],
    notes: 'La constancia vence a la intensidad. Celebra cada pequeño progreso.',
  },
  it: {
    title: 'Pianificatore 90 Giorni',
    subtitle: 'Obiettivi trimestrali, traguardi e ritmo settimanale',
    goals: [
      'Completare e lanciare il progetto principale con chiarezza',
      'Stabilire una routine di allenamento regolare (3x/settimana)',
      'Espandere l’attività e acquisire 5 nuovi clienti',
    ],
    whyItMatters: 'Questo trimestre costruisce le basi per la serenità e la crescita personale.',
    phases: [
      {
        title: 'Mese 1 — Fondamenta & Organizzazione',
        focus: 'Definire i sistemi ed eliminare le distrazioni',
        milestones: [
          'Definire l’ambito esatto e i traguardi chiave',
          'Pianificare blocchi di lavoro dedicati in agenda',
          'Preparare tutti gli strumenti necessari',
          'Revisione di fine mese e aggiustamenti strategici',
        ],
        kpi: '100% basi stabilite',
      },
      {
        title: 'Mese 2 — Esecuzione & Costanza',
        focus: 'Mantenere il ritmo e produrre i primi risultati',
        milestones: [
          'Consegnare la prima bozza o versione pilota',
          'Raccogliere riscontri e applicare modifiche',
          'Semplificare i passaggi operativi',
          'Preparare la fase di completamento',
        ],
        kpi: 'Primo traguardo raggiunto',
      },
      {
        title: 'Mese 3 — Finalizzazione & Consolidamento',
        focus: 'Completare l’obiettivo, festeggiare i successi e rilanciare',
        milestones: [
          'Rifinire gli ultimi dettagli e la documentazione',
          'Lancio ufficiale e presentazione dei risultati',
          'Retrospettiva approfondita dei 90 giorni',
          'Pianificare gli obiettivi del trimestre successivo',
        ],
        kpi: 'Obiettivo completato con successo',
      },
    ],
    notes: 'La costanza vince sempre sull’intensità. Ogni giorno fa la differenza.',
  },
  pt: {
    title: 'Planejador de 90 Dias',
    subtitle: 'Foco trimestral, marcos e ritmo semanal',
    goals: [
      'Finalizar e lançar o projeto principal com clareza',
      'Estabelecer rotina consistente de exercícios (3x/semana)',
      'Expandir o negócio e conquistar 5 novos clientes',
    ],
    whyItMatters: 'Este trimestre constrói a base sólida para a liberdade e realização do ano.',
    phases: [
      {
        title: 'Mês 1 — Fundamentos & Estrutura',
        focus: 'Estabelecer clareza e eliminar distrações',
        milestones: [
          'Definir escopo exato e marcos principais',
          'Reservar blocos de foco no calendário semanal',
          'Reunir ferramentas essenciais e documentação',
          'Revisão do primeiro mês e ajustes necessários',
        ],
        kpi: '100% das bases estabelecidas',
      },
      {
        title: 'Mês 2 — Execução & Ritmo',
        focus: 'Manter a constância e entregar os primeiros resultados',
        milestones: [
          'Entregar protótipo ou primeira versão funcional',
          'Coletar feedback e implementar melhorias',
          'Otimizar a rotina para reduzir atritos',
          'Validar a prontidão para o lançamento final',
        ],
        kpi: 'Primeiro marco concluído',
      },
      {
        title: 'Mês 3 — Finalização & Celebração',
        focus: 'Concluir entregas, celebrar conquistas e planejar o futuro',
        milestones: [
          'Finalizar detalhes e acabamento do projeto',
          'Lançamento oficial e divulgação dos resultados',
          'Retrospectiva completa do ciclo de 90 dias',
          'Definir prioridades para o próximo trimestre',
        ],
        kpi: 'Meta principal realizada',
      },
    ],
    notes: 'A constância supera a intensidade. Celebre cada pequeno avanço.',
  },
};

// ============================================================================
// 2. WEEKLY PLANNER (Personal)
// ============================================================================
export const DEFAULT_WEEKLY_PLANNER: Record<DocumentLang, WeeklyPlannerCustomContent> = {
  fr: {
    title: 'Semainier minimal',
    subtitle: 'Priorités, planification quotidienne & notes',
    priorities: [
      'Avancer sur le livrable principal du projet',
      '3 séances de sport ou marche active',
      'Faire le tri administratif et financier',
    ],
    notes: 'Prendre 10 minutes chaque matin pour relire les 3 priorités.',
  },
  en: {
    title: 'Weekly Planner',
    subtitle: 'Top priorities, daily schedule & focus notes',
    priorities: [
      'Complete and ship primary project milestone',
      '3 exercise or active movement sessions',
      'Review administrative and financial tasks',
    ],
    notes: 'Take 5 minutes every morning to calibrate the day against weekly priorities.',
  },
  de: {
    title: 'Wochenplaner',
    subtitle: 'Wochenprioritäten, Tagesstruktur & Notizen',
    priorities: [
      'Hauptaufgabe des Projekts abschließen',
      '3 Sport- oder Bewegungseinheiten durchführen',
      'Finanzen und Wochenrückblick erledigen',
    ],
    notes: 'Morgens 5 Minuten innehalten, um den Fokus des Tages zu schärfen.',
  },
  es: {
    title: 'Planificador Semanal',
    subtitle: 'Prioridades semanales, agenda diaria y notas',
    priorities: [
      'Avanzar en la entrega clave del proyecto',
      '3 sesiones de ejercicio o caminata activa',
      'Revisar gestiones administrativas y finanzas',
    ],
    notes: 'Dedicar 5 minutos cada mañana para alinear las acciones del día.',
  },
  it: {
    title: 'Pianificatore Settimanale',
    subtitle: 'Priorità chiave, orari giornalieri e note',
    priorities: [
      'Completare la consegna principale del progetto',
      '3 sessioni di allenamento o camminata',
      'Revisione contabile e amministrativa settimanale',
    ],
    notes: 'Prendersi 5 minuti ogni mattina per confermare le priorità della giornata.',
  },
  pt: {
    title: 'Planejador Semanal',
    subtitle: 'Prioridades da semana, rotina diária e notas',
    priorities: [
      'Concluir entrega principal do projeto',
      '3 sessões de exercícios ou caminhada ativa',
      'Revisão administrativa e financeira da semana',
    ],
    notes: 'Dedique 5 minutos toda manhã para alinhar o foco do dia com as prioridades.',
  },
};

// ============================================================================
// 3. MONTHLY CALENDAR (Personal)
// ============================================================================
export const DEFAULT_MONTHLY_CALENDAR: Record<DocumentLang, MonthlyCalendarCustomContent> = {
  fr: {
    title: 'Calendrier mensuel',
    monthName: 'Mois en cours',
    year: '2026',
    goals: [
      'Maintenir la régularité sur le projet phare',
      'Équilibrer temps de travail et récupération',
      'Bloquer un week-end complet de déconnexion',
    ],
    notes: 'Noter les jalons importants, rendez-vous clés et moments de détente.',
  },
  en: {
    title: 'Monthly Calendar',
    monthName: 'Current Month',
    year: '2026',
    goals: [
      'Maintain strong execution on primary milestone',
      'Balance focused work with intentional recovery',
      'Schedule a dedicated screen-free weekend',
    ],
    notes: 'Track critical deadlines, major events, and personal milestones.',
  },
  de: {
    title: 'Monatskalender',
    monthName: 'Aktueller Monat',
    year: '2026',
    goals: [
      'Konsequente Umsetzung der Hauptziele',
      'Gesunde Balance zwischen Fokus und Erholung',
      'Ein komplett bildschirmfreies Wochenende planen',
    ],
    notes: 'Wichtige Fristen, Termine und Meilensteine hier festhalten.',
  },
  es: {
    title: 'Calendario Mensual',
    monthName: 'Mes actual',
    year: '2026',
    goals: [
      'Mantener la constancia en el proyecto principal',
      'Equilibrar trabajo enfocado y descanso',
      'Planificar un fin de semana de desconexión',
    ],
    notes: 'Anotar fechas límite importantes, reuniones clave y descansos.',
  },
  it: {
    title: 'Calendario Mensile',
    monthName: 'Mese corrente',
    year: '2026',
    goals: [
      'Mantenere costanza sul progetto principale',
      'Bilanciare lavoro profondo e recupero fisico',
      'Pianificare un fine settimana senza schermi',
    ],
    notes: 'Annotare scadenze essenziali, appuntamenti importanti e momenti di riposo.',
  },
  pt: {
    title: 'Calendário Mensal',
    monthName: 'Mês corrente',
    year: '2026',
    goals: [
      'Manter ritmo constante no projeto principal',
      'Equilibrar trabalho focado com descanso de qualidade',
      'Planejar um fim de semana totalmente desconectado',
    ],
    notes: 'Anote prazos decisivos, compromissos importantes e pausas planejadas.',
  },
};

// ============================================================================
// 4. DAILY PRIORITIES (Personal)
// ============================================================================
export const DEFAULT_DAILY_PRIORITIES: Record<DocumentLang, DailyPrioritiesCustomContent> = {
  fr: {
    title: 'Priorités du jour',
    subtitle: 'Focus, to-do list & créneaux horaires',
    priorities: [
      'Finaliser la tâche la plus importante (Deep Work)',
      'Répondre aux e-mails et messages prioritaires',
      'Prendre 30 minutes de marche au grand air',
    ],
    tasks: [
      { text: 'Réviser les objectifs de la matinée', done: false },
      { text: 'Bloquer les notifications pendant la session de focus', done: false },
      { text: 'Appel ou point de synchronisation prévu', done: false },
      { text: 'Classer les documents du jour', done: false },
      { text: 'Boire 2L d’eau et s’étirer', done: false },
    ],
    gratitude: 'Reconnaissant pour l’énergie du matin et la clarté retrouvée.',
    notes: 'Si une tâche prend moins de 2 minutes, la traiter immédiatement.',
  },
  en: {
    title: 'Daily Priorities',
    subtitle: 'Daily focus, scheduled blocks & to-do list',
    priorities: [
      'Complete the most impactful deep-work task',
      'Process high-priority communications & follow-ups',
      '30-minute outdoor walk or workout',
    ],
    tasks: [
      { text: 'Calibrate morning priorities and calendar', done: false },
      { text: 'Silence notifications during deep focus block', done: false },
      { text: 'Scheduled check-in or team touchpoint', done: false },
      { text: 'File and organize daily documents', done: false },
      { text: 'Hydrate (2L water) and stretch between sessions', done: false },
    ],
    gratitude: 'Grateful for morning momentum and focused mental clarity.',
    notes: 'If an essential task takes under 2 minutes, do it right now.',
  },
  de: {
    title: 'Tagesprioritäten',
    subtitle: 'Tagesfokus, Zeitblöcke & To-Do-Liste',
    priorities: [
      'Wichtigste Aufgabe des Tages abschließen (Deep Work)',
      'Dringende Nachrichten und E-Mails beantworten',
      '30 Minuten Bewegung an der frischen Luft',
    ],
    tasks: [
      { text: 'Tagesagenda und Termine kurz prüfen', done: false },
      { text: 'Benachrichtigungen während der Fokusphase stummschalten', done: false },
      { text: 'Wichtiges Abstimmungsgespräch führen', done: false },
      { text: 'Offene Dokumente ablegen und ordnen', done: false },
      { text: 'Ausreichend Wasser trinken und Pausen einhalten', done: false },
    ],
    gratitude: 'Dankbar für Ruhe am Morgen und klare Gedanken.',
    notes: 'Wenn eine Aufgabe weniger als zwei Minuten dauert, sofort erledigen.',
  },
  es: {
    title: 'Prioridades Diarias',
    subtitle: 'Enfoque diario, bloques de tiempo y tareas',
    priorities: [
      'Completar la tarea de mayor impacto (Trabajo profundo)',
      'Responder correos y mensajes prioritarios',
      'Caminata de 30 minutos al aire libre',
    ],
    tasks: [
      { text: 'Revisar prioridades y agenda de la mañana', done: false },
      { text: 'Silenciar notificaciones durante el bloque de foco', done: false },
      { text: 'Reunión o llamada prevista', done: false },
      { text: 'Archivar y ordenar los documentos del día', done: false },
      { text: 'Beber 2L de agua y estirar entre bloques', done: false },
    ],
    gratitude: 'Agradecido por la claridad mental y el avance constante.',
    notes: 'Si una tarea dura menos de dos minutos, hazla al instante.',
  },
  it: {
    title: 'Priorità del Giorno',
    subtitle: 'Focus quotidiano, orari e lista attività',
    priorities: [
      'Completare l’attività a più alto impatto (Deep Work)',
      'Rispondere a comunicazioni e messaggi urgenti',
      'Camminata di 30 minuti all’aria aperta',
    ],
    tasks: [
      { text: 'Calibrare le priorità della mattinata', done: false },
      { text: 'Disattivare le notifiche durante la sessione di focus', done: false },
      { text: 'Chiamata o confronto programmato', done: false },
      { text: 'Archiviare i documenti della giornata', done: false },
      { text: 'Idratarsi con cura e fare pause attive', done: false },
    ],
    gratitude: 'Grato per la serenità del mattino e l’energia positiva.',
    notes: 'Se un’azione richiede meno di due minuti, completala subito.',
  },
  pt: {
    title: 'Prioridades do Dia',
    subtitle: 'Foco diário, blocos de tempo e lista de tarefas',
    priorities: [
      'Concluir a tarefa de maior impacto (Trabalho focado)',
      'Responder e-mails e contatos essenciais',
      'Caminhada de 30 minutos ao ar livre',
    ],
    tasks: [
      { text: 'Revisar a agenda e prioridades da manhã', done: false },
      { text: 'Desativar notificações durante o bloco de concentração', done: false },
      { text: 'Reunião ou alinhamento planejado', done: false },
      { text: 'Organizar e arquivar os arquivos do dia', done: false },
      { text: 'Beber água regularmente e fazer pausas para alongar', done: false },
    ],
    gratitude: 'Grato pela disposição matinal e pela oportunidade de progredir.',
    notes: 'Se uma tarefa essencial leva menos de dois minutos, resolva-a agora.',
  },
};

// ============================================================================
// 5. MEAL PLANNER (Personal)
// ============================================================================
export const DEFAULT_MEAL_PLANNER: Record<DocumentLang, MealPlannerCustomContent> = {
  fr: {
    title: 'Menu de la semaine',
    subtitle: 'Planification des repas & liste de courses',
    days: [
      { breakfast: 'Porridge avoine & fruits frais', lunch: 'Salade quinoa, avocat & poulet', dinner: 'Soupe potimarron & tartines chèvre', snack: 'Amandes & pomme' },
      { breakfast: 'Œufs brouillés & pain complet', lunch: 'Pavé de saumon & brocolis vapeur', dinner: 'Omelette fines herbes & salade verte', snack: 'Yaourt grec & miel' },
      { breakfast: 'Smoothie banane & épinards', lunch: 'Bowl lentilles corail & patates douces', dinner: 'Poêlée légumes & tofu mariné', snack: 'Noix & chocolat noir' },
      { breakfast: 'Pain levain & purée d’amandes', lunch: 'Filet de dinde & haricots verts', dinner: 'Velouté courgettes & feta', snack: 'Fruits de saison' },
      { breakfast: 'Granola maison & lait végétal', lunch: 'Riz complet, légumes & crevettes', dinner: 'Galettes sarrasin complètes', snack: 'Compote sans sucre' },
      { breakfast: 'Pancakes avoine & myrtilles', lunch: 'Assiette méditerranéenne', dinner: 'Dîner convivial ou restaurant', snack: 'Infusion & oléagineux' },
      { breakfast: 'Brunch dominical équilibré', lunch: 'Reste de la semaine ou salade fraîche', dinner: 'Bouillon réconfortant & légumes rôtis', snack: 'Thé vert' },
    ],
    shoppingItems: [
      'Flocons d’avoine & quinoa',
      'Légumes frais de saison',
      'Fruits (pommes, bananes, myrtilles)',
      'Œufs bio & yaourt grec',
      'Poulet fermier & pavés de saumon',
      'Huile d’olive & graines de courge',
    ],
  },
  en: {
    title: 'Weekly Meal Planner',
    subtitle: '7-day nutritious menu & integrated grocery list',
    days: [
      { breakfast: 'Oatmeal with berries & seeds', lunch: 'Quinoa bowl with avocado & grilled chicken', dinner: 'Roasted butternut soup & sourdough', snack: 'Almonds & green apple' },
      { breakfast: 'Scrambled pasture eggs & whole grain toast', lunch: 'Salmon fillet with steamed broccoli', dinner: 'Herb omelette & fresh leafy salad', snack: 'Greek yogurt with honey' },
      { breakfast: 'Green smoothie (spinach & banana)', lunch: 'Lentil bowl with sweet potatoes', dinner: 'Vegetable stir-fry with tofu', snack: 'Walnuts & dark chocolate' },
      { breakfast: 'Sourdough toast & almond butter', lunch: 'Turkey breast with green beans & rice', dinner: 'Zucchini cream soup with feta cheese', snack: 'Seasonal fresh fruit' },
      { breakfast: 'Homemade granola & almond milk', lunch: 'Brown rice, roasted vegetables & shrimp', dinner: 'Buckwheat savory crepes', snack: 'Unsweetened applesauce' },
      { breakfast: 'Oatmeal banana pancakes', lunch: 'Mediterranean grain bowl', dinner: 'Relaxed dinner or dining out', snack: 'Herbal tea & mixed nuts' },
      { breakfast: 'Balanced Sunday brunch', lunch: 'Leftovers & fresh garden salad', dinner: 'Light warm broth & roasted squash', snack: 'Mint tea' },
    ],
    shoppingItems: [
      'Rolled oats, quinoa & brown rice',
      'Fresh seasonal vegetables',
      'Fresh berries, apples & bananas',
      'Organic eggs & Greek yogurt',
      'Free-range chicken & wild salmon',
      'Cold-pressed olive oil & mixed nuts',
    ],
  },
  de: {
    title: 'Wochen-Speiseplan',
    subtitle: 'Gesunde Mahlzeiten für 7 Tage & Einkaufsliste',
    days: [
      { breakfast: 'Haferbrei mit Beeren & Nüssen', lunch: 'Quinoa-Bowl mit Avocado & Hähnchen', dinner: 'Kürbissuppe mit Vollkornbrot', snack: 'Mandeln & Apfel' },
      { breakfast: 'Rühreier auf Vollkornbrot', lunch: 'Lachsfilet mit Brokkoli', dinner: 'Kräuter-Omelett mit grünem Salat', snack: 'Griechischer Joghurt mit Honig' },
      { breakfast: 'Grüner Smoothie mit Banane', lunch: 'Linsen-Bowl mit Süßkartoffeln', dinner: 'Gemüsepfanne mit Tofu', snack: 'Walnüsse & Zartbitterschokolade' },
      { breakfast: 'Sauerteigbrot mit Mandelmus', lunch: 'Putenbrust mit grünen Bohnen', dinner: 'Zucchinisuppe mit Feta', snack: 'Frisches Obst der Saison' },
      { breakfast: 'Hausgemachtes Granola mit Pflanzenmilch', lunch: 'Naturreis mit Gemüse & Garnelen', dinner: 'Buchweizen-Wraps mit Gemüse', snack: 'Ungesüßtes Apfelmus' },
      { breakfast: 'Bananen-Hafer-Pancakes', lunch: 'Mediterraner Salatteller', dinner: 'Gemütliches Abendessen', snack: 'Kräutertee & Nüsse' },
      { breakfast: 'Ausgewogener Sonntagsbrunch', lunch: 'Reste der Woche & frischer Salat', dinner: 'Leichte Gemüsesuppe', snack: 'Pfefferminztee' },
    ],
    shoppingItems: [
      'Haferflocken, Quinoa & Naturreis',
      'Frisches Gemüse der Saison',
      'Äpfel, Beeren & Bananen',
      'Bio-Eier & griechischer Joghurt',
      'Hähnchenbrust & Lachsfilets',
      'Natives Olivenöl & Nussmischung',
    ],
  },
  es: {
    title: 'Planificador de Comidas',
    subtitle: 'Menú semanal saludable y lista de la compra',
    days: [
      { breakfast: 'Avena con frutos rojos y nueces', lunch: 'Bol de quinoa con aguacate y pollo', dinner: 'Crema de calabaza con pan integral', snack: 'Manzana y almendras' },
      { breakfast: 'Huevos revueltos con tostada', lunch: 'Salmón a la plancha con brócoli', dinner: 'Tortilla de hierbas y ensalada', snack: 'Yogur griego con miel' },
      { breakfast: 'Batido verde de espinacas y plátano', lunch: 'Lentejas con batata asada', dinner: 'Salteado de verduras con tofu', snack: 'Nueces y chocolate negro' },
      { breakfast: 'Pan de masa madre con crema de almendra', lunch: 'Pavo con judías verdes y arroz', dinner: 'Crema de calabacín con queso feta', snack: 'Fruta fresca de temporada' },
      { breakfast: 'Granola casera con bebida vegetal', lunch: 'Arroz integral con verduras y gambas', dinner: 'Crepes saladas de trigo sarraceno', snack: 'Compota sin azúcar' },
      { breakfast: 'Tortitas de avena y plátano', lunch: 'Plato mediterráneo variado', dinner: 'Cena relajada o fuera', snack: 'Infusión y frutos secos' },
      { breakfast: 'Brunch dominical equilibrado', lunch: 'Ensalada fresca y restos saludables', dinner: 'Caldo reconfortante de verduras', snack: 'Té verde' },
    ],
    shoppingItems: [
      'Avena en copos, quinoa y arroz',
      'Verduras frescas de temporada',
      'Fruta variada (manzanas, plátanos, frutos rojos)',
      'Huevos camperos y yogur griego',
      'Pechuga de pollo y salmón fresco',
      'Aceite de oliva virgen extra y frutos secos',
    ],
  },
  it: {
    title: 'Menu Settimanale',
    subtitle: 'Pasti bilanciati per 7 giorni e lista della spesa',
    days: [
      { breakfast: 'Fiocchi d’avena con frutti di bosco', lunch: 'Insalata di quinoa con pollo e avocado', dinner: 'Vellutata di zucca con pane integrale', snack: 'Mela e mandorle' },
      { breakfast: 'Uova strapazzate con pane tostato', lunch: 'Filetto di salmone con broccoli al vapore', dinner: 'Frittata alle erbe con insalata verde', snack: 'Yogurt greco con miele' },
      { breakfast: 'Frullato verde di spinaci e banana', lunch: 'Lenticchie con patate dolci arrosto', dinner: 'Spadellata di verdure con tofu', snack: 'Noci e cioccolato fondente' },
      { breakfast: 'Pane a lievitazione naturale con burro di mandorle', lunch: 'Tacchino ai ferri con fagiolini', dinner: 'Crema di zucchine e feta', snack: 'Frutta fresca di stagione' },
      { breakfast: 'Granola fatta in casa con latte vegetale', lunch: 'Riso integrale con verdure e gamberi', dinner: 'Crespelle rustiche di grano saraceno', snack: 'Macedonia senza zucchero' },
      { breakfast: 'Pancake leggeri di avena e banana', lunch: 'Piatto unico mediterraneo', dinner: 'Cena conviviale', snack: 'Tisana e frutta secca' },
      { breakfast: 'Brunch domenicale nutriente', lunch: 'Insalata ricca con ciò che è avanzato', dinner: 'Brodo caldo con verdure al forno', snack: 'Tè alla menta' },
    ],
    shoppingItems: [
      'Avena, quinoa e riso integrale',
      'Verdure fresche di stagione',
      'Frutta (mele, banane, frutti di bosco)',
      'Uova biologiche e yogurt greco',
      'Petto di pollo e tranci di salmone',
      'Olio extravergine d’oliva e frutta secca',
    ],
  },
  pt: {
    title: 'Cardápio Semanal',
    subtitle: 'Planejamento de refeições nutritivas e lista de compras',
    days: [
      { breakfast: 'Aveia com frutas vermelhas e sementes', lunch: 'Tigela de quinoa com frango e abacate', dinner: 'Sopa de abóbora com pão artesanal', snack: 'Maçã e amêndoas' },
      { breakfast: 'Ovos mexidos com torradas integrais', lunch: 'Salmão grelhado com brócolis ao vapor', dinner: 'Omelete de ervas com salada verde', snack: 'Iogurte grego com mel' },
      { breakfast: 'Smoothie verde de espinafre e banana', lunch: 'Lentilhas com batata doce assada', dinner: 'Refogado de legumes com tofu', snack: 'Nozes e chocolate amargo' },
      { breakfast: 'Pão de fermentação natural com pasta de amendoim', lunch: 'Peito de peru com feijão verde e arroz', dinner: 'Sopa de abobrinha com queijo feta', snack: 'Fruta fresca da estação' },
      { breakfast: 'Granola caseira com leite vegetal', lunch: 'Arroz integral com legumes e camarões', dinner: 'Panquecas salgadas de trigo sarraceno', snack: 'Frutas secas' },
      { breakfast: 'Panquecas de aveia e banana', lunch: 'Prato mediterrâneo saudável', dinner: 'Jantar descontraído', snack: 'Chá de ervas e castanhas' },
      { breakfast: 'Brunch equilibrado de domingo', lunch: 'Salada fresca e aproveitamento inteligente', dinner: 'Caldo reconfortante de legumes', snack: 'Chá de hortelã' },
    ],
    shoppingItems: [
      'Aveia em flocos, quinoa e arroz integral',
      'Legumes frescos da estação',
      'Frutas variadas (maçãs, bananas, bagas)',
      'Ovos caipiras e iogurte grego',
      'Peito de frango e salmão fresco',
      'Azeite de oliva extravirgem e castanhas',
    ],
  },
};

// ============================================================================
// 6. BUDGET TRACKER (Personal)
// ============================================================================
export const DEFAULT_BUDGET_TRACKER: Record<DocumentLang, BudgetTrackerCustomContent> = {
  fr: {
    title: 'Budget mensuel',
    period: 'Mois en cours',
    income: [
      { description: 'Salaire / Activité principale', planned: 3200, actual: 3200 },
      { description: 'Missions freelances / Compléments', planned: 600, actual: 750 },
      { description: 'Revenus passifs / Dividendes', planned: 150, actual: 160 },
    ],
    fixedExpenses: [
      { description: 'Loyer / Remboursement prêt', planned: 1100, actual: 1100 },
      { description: 'Charges & Énergie (Élec, Eau)', planned: 140, actual: 135 },
      { description: 'Assurances & Mutuelle', planned: 95, actual: 95 },
      { description: 'Abonnements (Téléphone, Internet)', planned: 65, actual: 65 },
    ],
    variableExpenses: [
      { description: 'Courses alimentaires & Marché', planned: 450, actual: 480 },
      { description: 'Transports & Carburant', planned: 120, actual: 110 },
      { description: 'Sorties, Restaurants & Loisirs', planned: 250, actual: 230 },
      { description: 'Santé, Bien-être & Soins', planned: 100, actual: 85 },
    ],
    savingsGoal: 800,
    notes: 'Priorité : transférer l’épargne dès le 1er du mois vers les investissements.',
  },
  en: {
    title: 'Monthly Budget Tracker',
    period: 'Current Month',
    income: [
      { description: 'Primary salary / consulting fees', planned: 3500, actual: 3500 },
      { description: 'Side project / freelance retainers', planned: 700, actual: 850 },
      { description: 'Investments & dividends', planned: 150, actual: 175 },
    ],
    fixedExpenses: [
      { description: 'Rent / mortgage payment', planned: 1200, actual: 1200 },
      { description: 'Utilities (electricity, gas, water)', planned: 150, actual: 145 },
      { description: 'Health & life insurance', planned: 110, actual: 110 },
      { description: 'Subscriptions (internet, mobile, tools)', planned: 75, actual: 75 },
    ],
    variableExpenses: [
      { description: 'Groceries & fresh produce', planned: 500, actual: 520 },
      { description: 'Transportation & fuel', planned: 140, actual: 130 },
      { description: 'Dining out & entertainment', planned: 250, actual: 240 },
      { description: 'Wellness & personal care', planned: 100, actual: 90 },
    ],
    savingsGoal: 1000,
    notes: 'Rule: automate savings transfer to emergency & investment accounts on payday.',
  },
  de: {
    title: 'Monats-Budgetplaner',
    period: 'Aktueller Monat',
    income: [
      { description: 'Hauptgehalt / Festeinkommen', planned: 3400, actual: 3400 },
      { description: 'Nebeneinkünfte / Beratungsprojekte', planned: 650, actual: 800 },
      { description: 'Kapitalerträge & Zinsen', planned: 120, actual: 140 },
    ],
    fixedExpenses: [
      { description: 'Miete / Hypothek', planned: 1150, actual: 1150 },
      { description: 'Nebenkosten & Energie', planned: 160, actual: 155 },
      { description: 'Versicherungen', planned: 100, actual: 100 },
      { description: 'Telefon, Internet & Software', planned: 70, actual: 70 },
    ],
    variableExpenses: [
      { description: 'Lebensmittel & Haushalt', planned: 480, actual: 510 },
      { description: 'Mobilität & Nahverkehr', planned: 130, actual: 120 },
      { description: 'Freizeit, Gastronomie & Kultur', planned: 240, actual: 230 },
      { description: 'Gesundheit & Vorsorge', planned: 90, actual: 85 },
    ],
    savingsGoal: 900,
    notes: 'Sparbetrag am Monatsanfang sofort auf das Tagesgeld- und Depotkonto überweisen.',
  },
  es: {
    title: 'Presupuesto Mensual',
    period: 'Mes actual',
    income: [
      { description: 'Salario principal / Actividad profesional', planned: 3000, actual: 3000 },
      { description: 'Proyectos freelance / Ingresos extra', planned: 600, actual: 720 },
      { description: 'Rendimientos e inversiones', planned: 120, actual: 135 },
    ],
    fixedExpenses: [
      { description: 'Alquiler / Hipoteca', planned: 1050, actual: 1050 },
      { description: 'Suministros (Luz, Agua, Gas)', planned: 130, actual: 125 },
      { description: 'Seguros y salud', planned: 90, actual: 90 },
      { description: 'Telefonía, Internet y suscripciones', planned: 60, actual: 60 },
    ],
    variableExpenses: [
      { description: 'Alimentación y compras del hogar', planned: 420, actual: 440 },
      { description: 'Transporte y gasolina', planned: 110, actual: 105 },
      { description: 'Ocio, restaurantes y cultura', planned: 230, actual: 220 },
      { description: 'Cuidado personal y bienestar', planned: 80, actual: 75 },
    ],
    savingsGoal: 750,
    notes: 'Págate a ti primero: automatiza el ahorro al principio de cada mes.',
  },
  it: {
    title: 'Budget Mensile',
    period: 'Mese corrente',
    income: [
      { description: 'Stipendio / Compenso principale', planned: 3100, actual: 3100 },
      { description: 'Consulenze freelance / Progetti secondari', planned: 550, actual: 680 },
      { description: 'Rendite passive e investimenti', planned: 110, actual: 130 },
    ],
    fixedExpenses: [
      { description: 'Affitto / Rata mutuo', planned: 1080, actual: 1080 },
      { description: 'Utenze (Luce, Gas, Acqua)', planned: 135, actual: 130 },
      { description: 'Assicurazioni sanitarie e personali', planned: 90, actual: 90 },
      { description: 'Connettività, telefono e abbonamenti', planned: 65, actual: 65 },
    ],
    variableExpenses: [
      { description: 'Spesa alimentare e beni di prima necessità', planned: 430, actual: 450 },
      { description: 'Carburante e trasporti', planned: 115, actual: 110 },
      { description: 'Ristoranti, tempo libero e uscite', planned: 240, actual: 225 },
      { description: 'Benessere e salute', planned: 85, actual: 80 },
    ],
    savingsGoal: 800,
    notes: 'Trasferire subito la quota di risparmio sul conto deposito il giorno dell’accredito.',
  },
  pt: {
    title: 'Orçamento Mensal',
    period: 'Mês corrente',
    income: [
      { description: 'Remuneração principal / Salário', planned: 3200, actual: 3200 },
      { description: 'Projetos freelance / Renda extra', planned: 600, actual: 750 },
      { description: 'Rendimentos e investimentos', planned: 130, actual: 150 },
    ],
    fixedExpenses: [
      { description: 'Aluguel / Parcela do imóvel', planned: 1100, actual: 1100 },
      { description: 'Contas básicas (Energia, Água, Gás)', planned: 140, actual: 135 },
      { description: 'Seguros e plano de saúde', planned: 95, actual: 95 },
      { description: 'Internet, celular e assinaturas', planned: 65, actual: 65 },
    ],
    variableExpenses: [
      { description: 'Supermercado e feira', planned: 450, actual: 475 },
      { description: 'Transporte e combustível', planned: 120, actual: 115 },
      { description: 'Lazer, restaurantes e cultura', planned: 240, actual: 230 },
      { description: 'Cuidados pessoais e bem-estar', planned: 90, actual: 85 },
    ],
    savingsGoal: 800,
    notes: 'Pague-se primeiro: transfira a meta de economia no primeiro dia útil.',
  },
};

// ============================================================================
// 9. GENERIC CHECKLIST
// ============================================================================
export const DEFAULT_CHECKLIST: Record<DocumentLang, ChecklistCustomContent> = {
  fr: {
    title: 'Checklist de projet',
    subtitle: 'Étapes préparatoires, validation & suivi d’exécution',
    groups: [
      {
        groupName: '1. Préparation & Cadrage',
        items: [
          { text: 'Clarifier les objectifs précis et critères de succès', done: false },
          { text: 'Rassembler les ressources et documents nécessaires', done: false },
          { text: 'Identifier les parties prenantes et canaux d’échange', done: false },
          { text: 'Fixer la date limite finale et les dates jalons', done: false },
        ],
      },
      {
        groupName: '2. Exécution & Réalisation',
        items: [
          { text: 'Produire la première version ou maquette', done: false },
          { text: 'Faire relire et vérifier par une personne tierce', done: false },
          { text: 'Corriger les anomalies et finaliser les détails', done: false },
          { text: 'Tester les cas limites et l’expérience globale', done: false },
        ],
      },
      {
        groupName: '3. Lancement & Validation finale',
        items: [
          { text: 'Validation définitive et signature des livrables', done: false },
          { text: 'Archivage et partage de la documentation', done: false },
          { text: 'Envoyer les remerciements et planifier le retour d’expérience', done: false },
        ],
      },
    ],
    notes: 'Cocher chaque étape au fur et à mesure pour garantir une qualité rigoureuse.',
  },
  en: {
    title: 'Master Project Checklist',
    subtitle: 'Preparation milestones, quality assurance & launch verification',
    groups: [
      {
        groupName: '1. Planning & Scope Definition',
        items: [
          { text: 'Clarify target deliverables and exact success metrics', done: false },
          { text: 'Gather all reference files, assets and logins', done: false },
          { text: 'Confirm key stakeholders and communication rhythm', done: false },
          { text: 'Establish final delivery deadline and checkpoint dates', done: false },
        ],
      },
      {
        groupName: '2. Execution & Quality Review',
        items: [
          { text: 'Complete prototype or primary draft deliverables', done: false },
          { text: 'Conduct cross-review and proofreading pass', done: false },
          { text: 'Implement feedback and resolve identified bottlenecks', done: false },
          { text: 'Validate cross-device and edge-case behavior', done: false },
        ],
      },
      {
        groupName: '3. Delivery & Final Sign-Off',
        items: [
          { text: 'Secure formal acceptance and sign-off on deliverables', done: false },
          { text: 'Archive source assets and organize final repository', done: false },
          { text: 'Conduct brief retrospective and send closing summary', done: false },
        ],
      },
    ],
    notes: 'Check off each item systematically to preserve standards of excellence.',
  },
  de: {
    title: 'Projekt-Checkliste',
    subtitle: 'Vorbereitung, Qualitätssicherung & Projektabschluss',
    groups: [
      {
        groupName: '1. Vorbereitung & Zieldefinition',
        items: [
          { text: 'Zielvorgaben und Qualitätskriterien präzise klären', done: false },
          { text: 'Erforderliche Unterlagen und Zugänge bereitstellen', done: false },
          { text: 'Ansprechpartner und Kommunikationswege festlegen', done: false },
          { text: 'Endtermin und Zwischenmeilensteine terminieren', done: false },
        ],
      },
      {
        groupName: '2. Ausführung & Qualitätskontrolle',
        items: [
          { text: 'Ersten Entwurf oder Prototyp fertigstellen', done: false },
          { text: 'Vier-Augen-Prüfung und Korrekturschleife durchführen', done: false },
          { text: 'Verbesserungen einarbeiten und Details optimieren', done: false },
          { text: 'Grenzfälle und Praxistauglichkeit testen', done: false },
        ],
      },
      {
        groupName: '3. Übergabe & Projektabschluss',
        items: [
          { text: 'Formale Freigabe und Abnahme einholen', done: false },
          { text: 'Quelldateien archivieren und Dokumentation bereitstellen', done: false },
          { text: 'Abschlussgespräch führen und Erkenntnisse festhalten', done: false },
        ],
      },
    ],
    notes: 'Jeden Schritt sorgfältig abhaken, um verlässliche Qualität zu sichern.',
  },
  es: {
    title: 'Lista de Control de Proyecto',
    subtitle: 'Fases de preparación, control de calidad y entrega',
    groups: [
      {
        groupName: '1. Planificación y Preparación',
        items: [
          { text: 'Clarificar objetivos concretos y criterios de éxito', done: false },
          { text: 'Recopilar documentos, accesos y recursos esenciales', done: false },
          { text: 'Definir responsables y canales de comunicación', done: false },
          { text: 'Fijar fecha límite de entrega y fechas intermedias', done: false },
        ],
      },
      {
        groupName: '2. Ejecución y Control de Calidad',
        items: [
          { text: 'Desarrollar primera versión o borrador funcional', done: false },
          { text: 'Revisión cruzada y control exhaustivo de detalles', done: false },
          { text: 'Resolver observaciones y pulir acabados finales', done: false },
          { text: 'Verificar funcionamiento en todos los casos previstos', done: false },
        ],
      },
      {
        groupName: '3. Entrega y Cierre Formal',
        items: [
          { text: 'Validación definitiva y aprobación de entregables', done: false },
          { text: 'Archivar archivos fuente y documentar procesos', done: false },
          { text: 'Enviar agradecimientos y evaluar lecciones aprendidas', done: false },
        ],
      },
    ],
    notes: 'Marcar cada casilla metódicamente para asegurar un estándar impecable.',
  },
  it: {
    title: 'Checklist di Progetto',
    subtitle: 'Fasi preparatorie, controllo qualità e consegna finale',
    groups: [
      {
        groupName: '1. Pianificazione & Definizione Obiettivi',
        items: [
          { text: 'Chiarire gli obiettivi e i parametri di conformità', done: false },
          { text: 'Raccogliere documenti, accessi e materiali necessari', done: false },
          { text: 'Confermare i referenti e i canali di confronto', done: false },
          { text: 'Fissare la scadenza definitiva e le tappe intermedie', done: false },
        ],
      },
      {
        groupName: '2. Esecuzione & Revisione Qualità',
        items: [
          { text: 'Completare la prima bozza o versione prototipo', done: false },
          { text: 'Svolgere una revisione approfondita e correzione bozze', done: false },
          { text: 'Integrare le modifiche e perfezionare i dettagli', done: false },
          { text: 'Testare l’efficacia nei diversi scenari operativi', done: false },
        ],
      },
      {
        groupName: '3. Consegna & Chiusura Formale',
        items: [
          { text: 'Approvazione definitiva e firma dei documenti finali', done: false },
          { text: 'Archiviare i file sorgente e catalogare i dati', done: false },
          { text: 'Inviare riepilogo conclusivo e retrospettiva', done: false },
        ],
      },
    ],
    notes: 'Spuntare ciascun passaggio in modo ordinato per garantire eccellenza.',
  },
  pt: {
    title: 'Lista de Verificação de Projeto',
    subtitle: 'Etapas preparatórias, controle de qualidade e entrega final',
    groups: [
      {
        groupName: '1. Planejamento & Escopo',
        items: [
          { text: 'Esclarecer objetivos específicos e critérios de sucesso', done: false },
          { text: 'Reunir todos os arquivos, acessos e materiais essenciais', done: false },
          { text: 'Definir responsáveis diretos e canais de comunicação', done: false },
          { text: 'Estabelecer prazo final e marcos intermediários', done: false },
        ],
      },
      {
        groupName: '2. Execução & Revisão de Qualidade',
        items: [
          { text: 'Concluir a primeira versão ou modelo funcional', done: false },
          { text: 'Realizar revisão atenta e verificação de conformidade', done: false },
          { text: 'Ajustar pendências e refinar detalhes técnicos', done: false },
          { text: 'Testar usabilidade e cenários práticos de uso', done: false },
        ],
      },
      {
        groupName: '3. Entrega & Validação Final',
        items: [
          { text: 'Aprovação formal e encerramento dos entregáveis', done: false },
          { text: 'Arquivar os arquivos originais e organizar repositório', done: false },
          { text: 'Compartilhar resumo final e registrar aprendizados', done: false },
        ],
      },
    ],
    notes: 'Marque cada etapa com rigor para garantir um padrão profissional de alto nível.',
  },
};
