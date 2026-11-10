import { DocumentLang } from '@/types';

export interface CatalogLabels {
  common: {
    pageOf: (current: number, total: number) => string;
    verified: string;
    madeWith: string;
    name: string;
    date: string;
  };
  goalPlanner: {
    nameLabel: string;
    horizonLabel: string;
    horizonValue: string;
    goalsTitle: string;
    whyLabel: string;
    progressTitle: string;
    weeklyTitle: string;
    weekPrefix: string;
    quarterNotesLabel: string;
    footerCategory: string;
  };
  weeklyPlanner: {
    weekOfLabel: string;
    prioritiesTitle: string;
    dayNotesLabel: string;
    reviewNotesLabel: string;
    footerCategory: string;
  };
  monthlyCalendar: {
    goalsTitle: string;
    notesTitle: string;
    footerCategory: string;
  };
  dailyPriorities: {
    dateLabel: string;
    top3Title: string;
    todoTitle: string;
    scheduleTitle: string;
    gratitudeLabel: string;
    footerCategory: string;
  };
  mealPlanner: {
    weekOfLabel: string;
    shoppingListTitle: string;
    notesLabel: string;
    footerCategory: string;
    breakfast: string;
    lunch: string;
    dinner: string;
    snack: string;
  };
  budgetTracker: {
    monthLabel: string;
    savingsGoalLabel: string;
    incomeTitle: string;
    fixedExpensesTitle: string;
    variableExpensesTitle: string;
    totalIncomeLabel: string;
    totalFixedLabel: string;
    totalVariableLabel: string;
    netBalanceLabel: string;
    notesLabel: string;
    footerCategory: string;
  };
  priceList: {
    lastUpdatedLabel: string;
    currencyNote: string;
    footerCategory: string;
  };
  clientTracker: {
    colDate: string;
    colClient: string;
    colService: string;
    colDuration: string;
    colStatus: string;
    colNotes: string;
    footerCategory: string;
  };
  checklist: {
    targetDateLabel: string;
    projectLabel: string;
    footerCategory: string;
  };
}

export const CATALOG_LABELS: Record<DocumentLang, CatalogLabels> = {
  fr: {
    common: {
      pageOf: (curr, tot) => `Page ${curr} sur ${tot}`,
      verified: 'Document vérifié',
      madeWith: 'Créé avec',
      name: 'Nom :',
      date: 'Date :',
    },
    goalPlanner: {
      nameLabel: 'Nom :',
      horizonLabel: 'Horizon :',
      horizonValue: '90 jours',
      goalsTitle: 'Objectifs Majeurs du Trimestre (Top 3)',
      whyLabel: 'Pourquoi c’est capital :',
      progressTitle: 'Progression',
      weeklyTitle: 'Suivi hebdomadaire (Semaines 1 à 12)',
      weekPrefix: 'S',
      quarterNotesLabel: 'Note de trimestre :',
      footerCategory: 'Plan d\'action personnel • 90 jours',
    },
    weeklyPlanner: {
      weekOfLabel: 'Semaine du :',
      prioritiesTitle: 'Priorités de la semaine (Top 3)',
      dayNotesLabel: 'Notes',
      reviewNotesLabel: 'Bilan & Notes :',
      footerCategory: 'Organisation personnelle • Semainier',
    },
    monthlyCalendar: {
      goalsTitle: 'Objectifs du mois',
      notesTitle: 'Notes & Échéances',
      footerCategory: 'Organisation personnelle • Calendrier mensuel',
    },
    dailyPriorities: {
      dateLabel: 'Date :',
      top3Title: 'Top 3 Priorités du Jour',
      todoTitle: 'Tâches & Actions',
      scheduleTitle: 'Emploi du temps (08h - 18h)',
      gratitudeLabel: 'Victoire du jour / Gratitude :',
      footerCategory: 'Organisation personnelle • Priorités du jour',
    },
    mealPlanner: {
      weekOfLabel: 'Semaine du :',
      shoppingListTitle: 'Liste de courses',
      notesLabel: 'Prep & Notes de cuisine :',
      footerCategory: 'Santé & Bien-être • Planificateur repas',
      breakfast: 'Petit-déjeuner',
      lunch: 'Déjeuner',
      dinner: 'Dîner',
      snack: 'Collation',
    },
    budgetTracker: {
      monthLabel: 'Mois / Période :',
      savingsGoalLabel: 'Objectif d\'épargne :',
      incomeTitle: 'Revenus',
      fixedExpensesTitle: 'Dépenses fixes',
      variableExpensesTitle: 'Dépenses variables',
      totalIncomeLabel: 'Total Revenus :',
      totalFixedLabel: 'Total Fixes :',
      totalVariableLabel: 'Total Variables :',
      netBalanceLabel: 'Solde net (Épargne) :',
      notesLabel: 'Notes de budget :',
      footerCategory: 'Finances • Budget mensuel',
    },
    priceList: {
      lastUpdatedLabel: 'Mise à jour :',
      currencyNote: 'Tous les prix en',
      footerCategory: 'Document professionnel • Grille tarifaire',
    },
    clientTracker: {
      colDate: 'Date',
      colClient: 'Client / Structure',
      colService: 'Prestation / Sujet',
      colDuration: 'Durée',
      colStatus: 'Statut',
      colNotes: 'Points clés / Suite',
      footerCategory: 'Document professionnel • Suivi clients',
    },
    checklist: {
      targetDateLabel: 'Date cible :',
      projectLabel: 'Projet / Cadre :',
      footerCategory: 'Organisation • Checklist de projet',
    },
  },
  en: {
    common: {
      pageOf: (curr, tot) => `Page ${curr} of ${tot}`,
      verified: 'Verified Document',
      madeWith: 'Made with',
      name: 'Name:',
      date: 'Date:',
    },
    goalPlanner: {
      nameLabel: 'Name:',
      horizonLabel: 'Horizon:',
      horizonValue: '90 Days',
      goalsTitle: 'Top 3 Quarterly Goals',
      whyLabel: 'Why it matters:',
      progressTitle: 'Progress',
      weeklyTitle: 'Weekly Momentum (Weeks 1 to 12)',
      weekPrefix: 'W',
      quarterNotesLabel: 'Quarterly Notes:',
      footerCategory: 'Personal Action Plan • 90 Days',
    },
    weeklyPlanner: {
      weekOfLabel: 'Week of:',
      prioritiesTitle: 'Top 3 Priorities of the Week',
      dayNotesLabel: 'Notes',
      reviewNotesLabel: 'Weekly Review & Notes:',
      footerCategory: 'Personal Organization • Weekly Planner',
    },
    monthlyCalendar: {
      goalsTitle: 'Monthly Focus & Goals',
      notesTitle: 'Key Notes & Reminders',
      footerCategory: 'Personal Organization • Monthly Calendar',
    },
    dailyPriorities: {
      dateLabel: 'Date:',
      top3Title: 'Today\'s Top 3 Priorities',
      todoTitle: 'Tasks & Actions',
      scheduleTitle: 'Daily Schedule (08:00 - 18:00)',
      gratitudeLabel: 'Daily Win / Gratitude:',
      footerCategory: 'Personal Organization • Daily Priorities',
    },
    mealPlanner: {
      weekOfLabel: 'Week of:',
      shoppingListTitle: 'Shopping List',
      notesLabel: 'Meal Prep & Kitchen Notes:',
      footerCategory: 'Health & Wellbeing • Meal Planner',
      breakfast: 'Breakfast',
      lunch: 'Lunch',
      dinner: 'Dinner',
      snack: 'Snack',
    },
    budgetTracker: {
      monthLabel: 'Month / Period:',
      savingsGoalLabel: 'Savings Goal:',
      incomeTitle: 'Income',
      fixedExpensesTitle: 'Fixed Expenses',
      variableExpensesTitle: 'Variable Expenses',
      totalIncomeLabel: 'Total Income:',
      totalFixedLabel: 'Total Fixed:',
      totalVariableLabel: 'Total Variable:',
      netBalanceLabel: 'Net Balance (Savings):',
      notesLabel: 'Budget Notes:',
      footerCategory: 'Finance • Monthly Budget',
    },
    priceList: {
      lastUpdatedLabel: 'Effective:',
      currencyNote: 'All prices in',
      footerCategory: 'Business Document • Price List',
    },
    clientTracker: {
      colDate: 'Date',
      colClient: 'Client / Account',
      colService: 'Service / Topic',
      colDuration: 'Duration',
      colStatus: 'Status',
      colNotes: 'Key Takeaways / Next Steps',
      footerCategory: 'Business Document • Client Sessions',
    },
    checklist: {
      targetDateLabel: 'Target Date:',
      projectLabel: 'Project / Scope:',
      footerCategory: 'Organization • Master Checklist',
    },
  },
  de: {
    common: {
      pageOf: (curr, tot) => `Seite ${curr} von ${tot}`,
      verified: 'Verifiziertes Dokument',
      madeWith: 'Erstellt mit',
      name: 'Name:',
      date: 'Datum:',
    },
    goalPlanner: {
      nameLabel: 'Name:',
      horizonLabel: 'Zeithorizont:',
      horizonValue: '90 Tage',
      goalsTitle: 'Quartalsziele (Top 3)',
      whyLabel: 'Warum es wichtig ist:',
      progressTitle: 'Fortschritt',
      weeklyTitle: 'Wöchentlicher Fortschritt (Wochen 1 bis 12)',
      weekPrefix: 'W',
      quarterNotesLabel: 'Quartalsnotiz:',
      footerCategory: 'Persönlicher Aktionsplan • 90 Tage',
    },
    weeklyPlanner: {
      weekOfLabel: 'Woche vom:',
      prioritiesTitle: 'Wochenprioritäten (Top 3)',
      dayNotesLabel: 'Notizen',
      reviewNotesLabel: 'Wochenrückblick & Notizen:',
      footerCategory: 'Persönliche Organisation • Wochenplaner',
    },
    monthlyCalendar: {
      goalsTitle: 'Monatsfokus & Ziele',
      notesTitle: 'Wichtige Notizen & Termine',
      footerCategory: 'Persönliche Organisation • Monatskalender',
    },
    dailyPriorities: {
      dateLabel: 'Datum:',
      top3Title: 'Top 3 Tagesprioritäten',
      todoTitle: 'Aufgaben & Aktionen',
      scheduleTitle: 'Tagesplan (08:00 - 18:00)',
      gratitudeLabel: 'Tageserfolg / Dankbarkeit:',
      footerCategory: 'Persönliche Organisation • Tagesprioritäten',
    },
    mealPlanner: {
      weekOfLabel: 'Woche vom:',
      shoppingListTitle: 'Einkaufsliste',
      notesLabel: 'Meal Prep & Kochnotizen:',
      footerCategory: 'Gesundheit & Wohlbefinden • Essensplaner',
      breakfast: 'Frühstück',
      lunch: 'Mittagessen',
      dinner: 'Abendessen',
      snack: 'Snack',
    },
    budgetTracker: {
      monthLabel: 'Monat / Zeitraum:',
      savingsGoalLabel: 'Sparziel:',
      incomeTitle: 'Einnahmen',
      fixedExpensesTitle: 'Fixe Kosten',
      variableExpensesTitle: 'Variable Kosten',
      totalIncomeLabel: 'Gesamteinnahmen:',
      totalFixedLabel: 'Gesamte Fixkosten:',
      totalVariableLabel: 'Gesamte Variable:',
      netBalanceLabel: 'Netto-Überschuss (Ersparnis):',
      notesLabel: 'Budget-Notizen:',
      footerCategory: 'Finanzen • Monatsbudget',
    },
    priceList: {
      lastUpdatedLabel: 'Gültig ab:',
      currencyNote: 'Alle Preise in',
      footerCategory: 'Geschäftsdokument • Preisliste',
    },
    clientTracker: {
      colDate: 'Datum',
      colClient: 'Kunde / Organisation',
      colService: 'Leistung / Thema',
      colDuration: 'Dauer',
      colStatus: 'Status',
      colNotes: 'Wichtige Punkte / Nächste Schritte',
      footerCategory: 'Geschäftsdokument • Kundensitzungen',
    },
    checklist: {
      targetDateLabel: 'Zieldatum:',
      projectLabel: 'Projekt / Kontext:',
      footerCategory: 'Organisation • Master-Checkliste',
    },
  },
  es: {
    common: {
      pageOf: (curr, tot) => `Página ${curr} de ${tot}`,
      verified: 'Documento verificado',
      madeWith: 'Creado con',
      name: 'Nombre:',
      date: 'Fecha:',
    },
    goalPlanner: {
      nameLabel: 'Nombre:',
      horizonLabel: 'Plazo:',
      horizonValue: '90 Días',
      goalsTitle: 'Objetivos del Trimestre (Top 3)',
      whyLabel: 'Por qué es importante:',
      progressTitle: 'Progreso',
      weeklyTitle: 'Seguimiento semanal (Semanas 1 a 12)',
      weekPrefix: 'S',
      quarterNotesLabel: 'Notas del trimestre:',
      footerCategory: 'Plan de acción personal • 90 Días',
    },
    weeklyPlanner: {
      weekOfLabel: 'Semana del:',
      prioritiesTitle: 'Prioridades de la semana (Top 3)',
      dayNotesLabel: 'Notas',
      reviewNotesLabel: 'Balance y notas:',
      footerCategory: 'Organización personal • Planificador semanal',
    },
    monthlyCalendar: {
      goalsTitle: 'Objetivos del mes',
      notesTitle: 'Notas y recordatorios',
      footerCategory: 'Organización personal • Calendario mensual',
    },
    dailyPriorities: {
      dateLabel: 'Fecha:',
      top3Title: 'Top 3 Prioridades de Hoy',
      todoTitle: 'Tareas y Acciones',
      scheduleTitle: 'Horario diario (08:00 - 18:00)',
      gratitudeLabel: 'Victoria del día / Gratitud:',
      footerCategory: 'Organización personal • Prioridades diarias',
    },
    mealPlanner: {
      weekOfLabel: 'Semana del:',
      shoppingListTitle: 'Lista de la compra',
      notesLabel: 'Preparación y notas culinarias:',
      footerCategory: 'Salud y bienestar • Planificador de comidas',
      breakfast: 'Desayuno',
      lunch: 'Almuerzo',
      dinner: 'Cena',
      snack: 'Merienda',
    },
    budgetTracker: {
      monthLabel: 'Mes / Período:',
      savingsGoalLabel: 'Objetivo de ahorro:',
      incomeTitle: 'Ingresos',
      fixedExpensesTitle: 'Gastos fijos',
      variableExpensesTitle: 'Gastos variables',
      totalIncomeLabel: 'Total Ingresos:',
      totalFixedLabel: 'Total Fijos:',
      totalVariableLabel: 'Total Variables:',
      netBalanceLabel: 'Saldo neto (Ahorro):',
      notesLabel: 'Notas de presupuesto:',
      footerCategory: 'Finanzas • Presupuesto mensual',
    },
    priceList: {
      lastUpdatedLabel: 'Actualizado:',
      currencyNote: 'Todos los precios en',
      footerCategory: 'Documento profesional • Lista de precios',
    },
    clientTracker: {
      colDate: 'Fecha',
      colClient: 'Cliente / Empresa',
      colService: 'Servicio / Tema',
      colDuration: 'Duración',
      colStatus: 'Estado',
      colNotes: 'Puntos clave / Próximos pasos',
      footerCategory: 'Documento profesional • Sesiones clientes',
    },
    checklist: {
      targetDateLabel: 'Fecha objetivo:',
      projectLabel: 'Proyecto / Ámbito:',
      footerCategory: 'Organización • Lista de control',
    },
  },
  it: {
    common: {
      pageOf: (curr, tot) => `Pagina ${curr} di ${tot}`,
      verified: 'Documento verificato',
      madeWith: 'Creato con',
      name: 'Nome:',
      date: 'Data:',
    },
    goalPlanner: {
      nameLabel: 'Nome:',
      horizonLabel: 'Orizzonte:',
      horizonValue: '90 Giorni',
      goalsTitle: 'Obiettivi Trimestrali (Top 3)',
      whyLabel: 'Perché è importante:',
      progressTitle: 'Avanzamento',
      weeklyTitle: 'Monitoraggio settimanale (Settimane 1 a 12)',
      weekPrefix: 'S',
      quarterNotesLabel: 'Note del trimestre:',
      footerCategory: 'Piano d\'azione personale • 90 Giorni',
    },
    weeklyPlanner: {
      weekOfLabel: 'Settimana del:',
      prioritiesTitle: 'Priorità della settimana (Top 3)',
      dayNotesLabel: 'Note',
      reviewNotesLabel: 'Bilancio e note:',
      footerCategory: 'Organizzazione personale • Planner settimanale',
    },
    monthlyCalendar: {
      goalsTitle: 'Obiettivi del mese',
      notesTitle: 'Note e scadenze',
      footerCategory: 'Organizzazione personale • Calendario mensile',
    },
    dailyPriorities: {
      dateLabel: 'Data:',
      top3Title: 'Top 3 Priorità di Oggi',
      todoTitle: 'Attività e Azioni',
      scheduleTitle: 'Programma giornaliero (08:00 - 18:00)',
      gratitudeLabel: 'Vittoria del giorno / Gratitudine:',
      footerCategory: 'Organizzazione personale • Priorità del giorno',
    },
    mealPlanner: {
      weekOfLabel: 'Settimana del:',
      shoppingListTitle: 'Lista della spesa',
      notesLabel: 'Preparazione e note di cucina:',
      footerCategory: 'Salute e benessere • Pianificatore pasti',
      breakfast: 'Colazione',
      lunch: 'Pranzo',
      dinner: 'Cena',
      snack: 'Spuntino',
    },
    budgetTracker: {
      monthLabel: 'Mese / Periodo:',
      savingsGoalLabel: 'Obiettivo di risparmio:',
      incomeTitle: 'Entrate',
      fixedExpensesTitle: 'Spese fisse',
      variableExpensesTitle: 'Spese variabili',
      totalIncomeLabel: 'Totale Entrate:',
      totalFixedLabel: 'Totale Fisse:',
      totalVariableLabel: 'Totale Variabili:',
      netBalanceLabel: 'Saldo netto (Risparmio):',
      notesLabel: 'Note di bilancio:',
      footerCategory: 'Finanze • Budget mensile',
    },
    priceList: {
      lastUpdatedLabel: 'Aggiornato:',
      currencyNote: 'Tutti i prezzi in',
      footerCategory: 'Documento aziendale • Listino prezzi',
    },
    clientTracker: {
      colDate: 'Data',
      colClient: 'Cliente / Organizzazione',
      colService: 'Servizio / Argomento',
      colDuration: 'Durata',
      colStatus: 'Stato',
      colNotes: 'Punti chiave / Prossimi passi',
      footerCategory: 'Documento aziendale • Registro clienti',
    },
    checklist: {
      targetDateLabel: 'Data obiettivo:',
      projectLabel: 'Progetto / Ambito:',
      footerCategory: 'Organizzazione • Checklist operativa',
    },
  },
  pt: {
    common: {
      pageOf: (curr, tot) => `Página ${curr} de ${tot}`,
      verified: 'Documento verificado',
      madeWith: 'Criado com',
      name: 'Nome:',
      date: 'Data:',
    },
    goalPlanner: {
      nameLabel: 'Nome:',
      horizonLabel: 'Horizonte:',
      horizonValue: '90 Dias',
      goalsTitle: 'Metas do Trimestre (Top 3)',
      whyLabel: 'Por que é importante:',
      progressTitle: 'Progresso',
      weeklyTitle: 'Acompanhamento semanal (Semanas 1 a 12)',
      weekPrefix: 'S',
      quarterNotesLabel: 'Notas do trimestre:',
      footerCategory: 'Plano de ação pessoal • 90 Dias',
    },
    weeklyPlanner: {
      weekOfLabel: 'Semana de:',
      prioritiesTitle: 'Prioridades da semana (Top 3)',
      dayNotesLabel: 'Notas',
      reviewNotesLabel: 'Balanço e notas:',
      footerCategory: 'Organização pessoal • Planejador semanal',
    },
    monthlyCalendar: {
      goalsTitle: 'Metas do mês',
      notesTitle: 'Notas e prazos',
      footerCategory: 'Organização pessoal • Calendário mensal',
    },
    dailyPriorities: {
      dateLabel: 'Data:',
      top3Title: 'Top 3 Prioridades de Hoje',
      todoTitle: 'Tarefas e Ações',
      scheduleTitle: 'Agenda diária (08:00 - 18:00)',
      gratitudeLabel: 'Vitória do dia / Gratidão:',
      footerCategory: 'Organização pessoal • Prioridades diárias',
    },
    mealPlanner: {
      weekOfLabel: 'Semana de:',
      shoppingListTitle: 'Lista de compras',
      notesLabel: 'Preparo e notas culinárias:',
      footerCategory: 'Saúde e bem-estar • Cardápio semanal',
      breakfast: 'Café da manhã',
      lunch: 'Almoço',
      dinner: 'Jantar',
      snack: 'Lanche',
    },
    budgetTracker: {
      monthLabel: 'Mês / Período:',
      savingsGoalLabel: 'Meta de poupança:',
      incomeTitle: 'Receitas',
      fixedExpensesTitle: 'Despesas fixas',
      variableExpensesTitle: 'Despesas variáveis',
      totalIncomeLabel: 'Total Receitas:',
      totalFixedLabel: 'Total Fixas:',
      totalVariableLabel: 'Total Variáveis:',
      netBalanceLabel: 'Saldo líquido (Poupança):',
      notesLabel: 'Notas de orçamento:',
      footerCategory: 'Finanças • Orçamento mensal',
    },
    priceList: {
      lastUpdatedLabel: 'Atualizado:',
      currencyNote: 'Todos os preços em',
      footerCategory: 'Documento comercial • Tabela de preços',
    },
    clientTracker: {
      colDate: 'Data',
      colClient: 'Cliente / Empresa',
      colService: 'Serviço / Tema',
      colDuration: 'Duração',
      colStatus: 'Status',
      colNotes: 'Pontos-chave / Próximos passos',
      footerCategory: 'Documento comercial • Atendimentos',
    },
    checklist: {
      targetDateLabel: 'Data-alvo:',
      projectLabel: 'Projeto / Escopo:',
      footerCategory: 'Organização • Lista de verificação',
    },
  },
};
