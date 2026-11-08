import { DocumentLang } from '@/types';

export type HabitPackId = 'wellbeing' | 'fitness' | 'nutrition' | 'sleep' | 'focus' | 'blank';

export interface HabitDefinition {
  title: string;
  subtitle: string;
}

export interface HabitPack {
  id: HabitPackId;
  name: string;
  description: string;
  habits: HabitDefinition[];
}

export const HABIT_PACKS: Record<DocumentLang, Record<HabitPackId, HabitPack>> = {
  fr: {
    wellbeing: {
      id: 'wellbeing',
      name: 'Bien-être',
      description: 'Habitudes simples pour un équilibre quotidien durable',
      habits: [
        { title: 'Hydratation & Vitalité', subtitle: 'Boire 1,5L à 2L d’eau tout au long de la journée' },
        { title: 'Marche quotidienne', subtitle: '20 à 30 minutes de marche ou mouvement au grand air' },
        { title: 'Pause respiration & calme', subtitle: '5 à 10 minutes de respiration guidée ou méditation' },
        { title: 'Déconnexion du soir', subtitle: 'Éteindre les écrans 30 minutes avant le coucher' },
        { title: 'Gratitude du jour', subtitle: 'Noter une victoire ou un moment positif de la journée' },
      ],
    },
    fitness: {
      id: 'fitness',
      name: 'Sport & Forme',
      description: 'Mouvement régulier, énergie et renforcement',
      habits: [
        { title: 'Réveil corporel & mobilité', subtitle: '10 minutes d’étirements doux au lever' },
        { title: 'Activité physique ciblée', subtitle: '30 minutes d’entraînement, cardio ou renforcement' },
        { title: 'Objectif 8 000 à 10 000 pas', subtitle: 'Bouger régulièrement durant la journée' },
        { title: 'Posture & pauses actives', subtitle: 'Se lever et redresser sa posture toutes les heures' },
        { title: 'Récupération & étirements', subtitle: 'Relâchement musculaire et hydratation post-séance' },
      ],
    },
    nutrition: {
      id: 'nutrition',
      name: 'Alimentation',
      description: 'Repas équilibrés et énergie stable',
      habits: [
        { title: 'Petit-déjeuner complet', subtitle: 'Protéines, fibres naturelles et hydratation' },
        { title: 'Portion de légumes frais', subtitle: 'Légumes de saison à chaque repas principal' },
        { title: 'Priorité eau & infusions', subtitle: 'Éviter les boissons sucrées et excitants tardifs' },
        { title: 'Cuisine maison & produits bruts', subtitle: 'Privilégier les aliments peu transformés' },
        { title: 'Dîner léger & digeste', subtitle: 'Manger au moins 2h30 avant d’aller dormir' },
      ],
    },
    sleep: {
      id: 'sleep',
      name: 'Sommeil',
      description: 'Nuits réparatrices et réveils en pleine forme',
      habits: [
        { title: 'Coucher à heure régulière', subtitle: 'Respecter le même rythme même le week-end' },
        { title: 'Lumière tamisée le soir', subtitle: 'Créer une ambiance relaxante dès le dîner' },
        { title: 'Chambre sans écran', subtitle: 'Téléphone et tablettes posés hors de la chambre' },
        { title: 'Rituel d’apaisement', subtitle: 'Lecture, tisane ou musique douce avant de dormir' },
        { title: 'Nuit réparatrice de 7h à 8h', subtitle: 'Préserver son quota de repos essentiel' },
      ],
    },
    focus: {
      id: 'focus',
      name: 'Travail & Clarté',
      description: 'Priorités claires et travail en profondeur',
      habits: [
        { title: 'Top 3 priorités du jour', subtitle: 'Identifier l’essentiel avant d’ouvrir sa boîte mail' },
        { title: 'Bloc de concentration profonde', subtitle: '45 à 60 minutes de travail sans interruption' },
        { title: 'Consultation des messages ciblée', subtitle: 'Traiter les e-mails et messages à heures fixes' },
        { title: 'Micro-pause toutes les heures', subtitle: 'S’aérer l’esprit et reposer ses yeux 2 minutes' },
        { title: 'Bilan & clôture de journée', subtitle: 'Fermer les onglets et préparer les tâches du lendemain' },
      ],
    },
    blank: {
      id: 'blank',
      name: 'Vierge (à remplir)',
      description: '5 lignes blanches prêtes à personnaliser',
      habits: [
        { title: 'Habitude 1 : ________________', subtitle: 'Objectif quotidien à définir' },
        { title: 'Habitude 2 : ________________', subtitle: 'Objectif quotidien à définir' },
        { title: 'Habitude 3 : ________________', subtitle: 'Objectif quotidien à définir' },
        { title: 'Habitude 4 : ________________', subtitle: 'Objectif quotidien à définir' },
        { title: 'Habitude 5 : ________________', subtitle: 'Objectif quotidien à définir' },
      ],
    },
  },
  en: {
    wellbeing: {
      id: 'wellbeing',
      name: 'Wellbeing',
      description: 'Simple daily rituals for sustainable balance',
      habits: [
        { title: 'Hydration & Vitality', subtitle: 'Drink 1.5L to 2L of fresh water throughout the day' },
        { title: 'Daily Outdoor Walk', subtitle: '20 to 30 minutes of walking or gentle outdoor movement' },
        { title: 'Calm & Breathwork Pause', subtitle: '5 to 10 minutes of guided breathing or quiet reflection' },
        { title: 'Evening Screen Disconnect', subtitle: 'Turn off screens 30 minutes before sleep' },
        { title: 'Daily Gratitude Note', subtitle: 'Acknowledge one meaningful win or positive moment' },
      ],
    },
    fitness: {
      id: 'fitness',
      name: 'Fitness & Form',
      description: 'Regular movement, daily vitality, and strength',
      habits: [
        { title: 'Morning Mobility & Stretch', subtitle: '10 minutes of gentle joint mobility upon waking' },
        { title: 'Dedicated Workout Session', subtitle: '30 minutes of cardio, strength, or sport activity' },
        { title: 'Daily Step Target', subtitle: 'Reach 8,000 to 10,000 active steps throughout the day' },
        { title: 'Posture & Movement Breaks', subtitle: 'Stand tall and reset posture every hour' },
        { title: 'Recovery & Post-Workout Hydration', subtitle: 'Muscle release and proper hydration' },
      ],
    },
    nutrition: {
      id: 'nutrition',
      name: 'Nutrition',
      description: 'Balanced meals and sustained energy throughout the day',
      habits: [
        { title: 'Nourishing Breakfast', subtitle: 'Whole food proteins and dietary fiber' },
        { title: 'Fresh Greens with Main Meals', subtitle: 'Include vegetables in every lunch and dinner' },
        { title: 'Water Over Sugary Drinks', subtitle: 'Choose water or herbal infusions over soda and stimulants' },
        { title: 'Home Cooking with Whole Foods', subtitle: 'Focus on unprocessed, freshly prepared meals' },
        { title: 'Mindful Light Dinner', subtitle: 'Finish eating at least 2.5 hours before sleeping' },
      ],
    },
    sleep: {
      id: 'sleep',
      name: 'Sleep & Rest',
      description: 'Restorative nights and energized mornings',
      habits: [
        { title: 'Consistent Sleep Schedule', subtitle: 'Go to bed and wake up at consistent times' },
        { title: 'Dim Evening Lighting', subtitle: 'Switch to warm, soft ambient lighting after sunset' },
        { title: 'Screen-Free Bedroom', subtitle: 'Keep phones and tablets away from the bedside' },
        { title: 'Calming Bedtime Routine', subtitle: 'Light reading, herbal tea, or soothing music' },
        { title: '7 to 8 Hours Restorative Sleep', subtitle: 'Protect uninterrupted nocturnal recovery' },
      ],
    },
    focus: {
      id: 'focus',
      name: 'Focus & Work',
      description: 'Clear priorities and uninterrupted progress',
      habits: [
        { title: 'Top 3 Daily Priorities', subtitle: 'Define the essentials before checking messages' },
        { title: 'Deep Work Block', subtitle: '45 to 60 minutes of single-task immersion' },
        { title: 'Batched Message Checks', subtitle: 'Review emails and notifications at scheduled hours' },
        { title: 'Hourly Micro-Breaks', subtitle: 'Rest your eyes and stretch for 2 minutes every hour' },
        { title: 'End-of-Day Shutdown', subtitle: 'Clear workspace and plan tomorrow’s primary goals' },
      ],
    },
    blank: {
      id: 'blank',
      name: 'Blank (Fill by hand)',
      description: '5 blank writing lines ready for custom routines',
      habits: [
        { title: 'Habit 1: ________________', subtitle: 'Daily goal to define' },
        { title: 'Habit 2: ________________', subtitle: 'Daily goal to define' },
        { title: 'Habit 3: ________________', subtitle: 'Daily goal to define' },
        { title: 'Habit 4: ________________', subtitle: 'Daily goal to define' },
        { title: 'Habit 5: ________________', subtitle: 'Daily goal to define' },
      ],
    },
  },
  es: {
    wellbeing: {
      id: 'wellbeing',
      name: 'Bienestar',
      description: 'Hábitos sencillos para un equilibrio diario duradero',
      habits: [
        { title: 'Hidratación y vitalidad', subtitle: 'Beber de 1,5L a 2L de agua a lo largo del día' },
        { title: 'Caminata diaria', subtitle: '20 a 30 minutos de movimiento al aire libre' },
        { title: 'Pausa de respiración y calma', subtitle: '5 a 10 minutos de pausa reflexiva o meditación' },
        { title: 'Desconexión nocturna', subtitle: 'Apagar pantallas 30 minutos antes de dormir' },
        { title: 'Gratitud del día', subtitle: 'Anotar un momento positivo o logro de la jornada' },
      ],
    },
    fitness: {
      id: 'fitness',
      name: 'Deporte y Salud',
      description: 'Movimiento regular, vitalidad y fuerza',
      habits: [
        { title: 'Movilidad matutina', subtitle: '10 minutos de estiramientos suaves al levantarse' },
        { title: 'Sesión de ejercicio', subtitle: '30 minutos de cardio o entrenamiento de fuerza' },
        { title: 'Meta de 8.000 a 10.000 pasos', subtitle: 'Mantenerse activo a lo largo del día' },
        { title: 'Postura y pausas activas', subtitle: 'Levantarse y corregir la postura cada hora' },
        { title: 'Recuperación y estiramientos', subtitle: 'Relajación muscular e hidratación adecuada' },
      ],
    },
    nutrition: {
      id: 'nutrition',
      name: 'Alimentación',
      description: 'Comidas equilibradas y energía constante',
      habits: [
        { title: 'Desayuno nutritivo', subtitle: 'Proteínas limpias y fibra natural' },
        { title: 'Porción de verduras frescas', subtitle: 'Presentes en cada comida principal' },
        { title: 'Prioridad agua e infusiones', subtitle: 'Evitar refrescos azucarados y estimulantes' },
        { title: 'Cocina casera con productos frescos', subtitle: 'Alimentos naturales poco procesados' },
        { title: 'Cena ligera y digestiva', subtitle: 'Comer al menos 2h30 antes de acostarse' },
      ],
    },
    sleep: {
      id: 'sleep',
      name: 'Sueño',
      description: 'Noches reparadoras y mañanas llenas de energía',
      habits: [
        { title: 'Horario de sueño constante', subtitle: 'Ir a dormir y levantarse a la misma hora' },
        { title: 'Luz tenue al anochecer', subtitle: 'Crear un ambiente cálido y relajante' },
        { title: 'Dormitorio sin pantallas', subtitle: 'Teléfono alejado de la mesita de noche' },
        { title: 'Rutina relajante antes de dormir', subtitle: 'Lectura o infusión antes de descansar' },
        { title: 'Descanso reparador de 7-8h', subtitle: 'Proteger el descanso nocturno continuo' },
      ],
    },
    focus: {
      id: 'focus',
      name: 'Trabajo y Enfoque',
      description: 'Prioridades claras y avance sin distracciones',
      habits: [
        { title: 'Top 3 prioridades del día', subtitle: 'Definir lo esencial antes de abrir el correo' },
        { title: 'Bloque de concentración profunda', subtitle: '45 a 60 minutos sin interrupciones' },
        { title: 'Revisión puntual de mensajes', subtitle: 'Revisar notificaciones a horas fijas' },
        { title: 'Micro-pausa cada hora', subtitle: 'Estirar el cuerpo y descansar la vista 2 minutos' },
        { title: 'Cierre de jornada ordenado', subtitle: 'Planificar los objetivos del día siguiente' },
      ],
    },
    blank: {
      id: 'blank',
      name: 'En blanco',
      description: '5 líneas en blanco para personalizar a mano',
      habits: [
        { title: 'Hábito 1: ________________', subtitle: 'Objetivo diario a definir' },
        { title: 'Hábito 2: ________________', subtitle: 'Objetivo diario a definir' },
        { title: 'Hábito 3: ________________', subtitle: 'Objetivo diario a definir' },
        { title: 'Hábito 4: ________________', subtitle: 'Objetivo diario a definir' },
        { title: 'Hábito 5: ________________', subtitle: 'Objetivo diario a definir' },
      ],
    },
  },
  de: {
    wellbeing: {
      id: 'wellbeing',
      name: 'Wohlbefinden',
      description: 'Einfache Routinen für nachhaltige tägliche Balance',
      habits: [
        { title: 'Hydration & Vitalität', subtitle: '1,5 bis 2 Liter frisches Wasser über den Tag trinken' },
        { title: 'Täglicher Spaziergang', subtitle: '20 bis 30 Minuten Bewegung an der frischen Luft' },
        { title: 'Atem- & Ruhepause', subtitle: '5 bis 10 Minuten bewusstes Atmen oder Meditation' },
        { title: 'Bildschirmfreie Abendstunde', subtitle: '30 Minuten vor dem Schlafen Bildschirme ausschalten' },
        { title: 'Dankbarkeitsmoment', subtitle: 'Einen positiven Moment des Tages notieren' },
      ],
    },
    fitness: {
      id: 'fitness',
      name: 'Fitness & Sport',
      description: 'Regelmäßige Bewegung, Energie und Kraft',
      habits: [
        { title: 'Morgenroutine & Mobilität', subtitle: '10 Minuten Dehnen und Gelenkmobilisation' },
        { title: 'Gezielte Bewegungseinheit', subtitle: '30 Minuten Ausdauer-, Kraft- oder Sporttraining' },
        { title: 'Schrittziel 8.000 bis 10.000', subtitle: 'Regelmäßige Bewegung im Alltag beibehalten' },
        { title: 'Haltung & Bewegungspausen', subtitle: 'Stündlich aufstehen und aufrecht durchatmen' },
        { title: 'Regeneration & Erholung', subtitle: 'Muskelentspannung und ausreichende Hydration' },
      ],
    },
    nutrition: {
      id: 'nutrition',
      name: 'Ernährung',
      description: 'Ausgewogene Mahlzeiten und stabile Energie',
      habits: [
        { title: 'Nährstoffreiches Frühstück', subtitle: 'Proteinreich und natürliche Ballaststoffe' },
        { title: 'Frisches Gemüse zu den Mahlzeiten', subtitle: 'Gemüseanteil bei jedem Hauptgericht' },
        { title: 'Wasser statt zuckerhaltige Getränke', subtitle: 'Ungesüßte Getränke und Kräutertee bevorzugen' },
        { title: 'Frisch gekochte Mahlzeiten', subtitle: 'Unverarbeitete, natürliche Zutaten nutzen' },
        { title: 'Leichtes Abendessen', subtitle: 'Mindestens 2,5 Stunden vor dem Schlafen essen' },
      ],
    },
    sleep: {
      id: 'sleep',
      name: 'Schlaf',
      description: 'Erholsame Nächte und ein wacher Start in den Tag',
      habits: [
        { title: 'Feste Schlafenszeiten', subtitle: 'Zur gleichen Zeit schlafen gehen und aufstehen' },
        { title: 'Gedimmtes Licht am Abend', subtitle: 'Sanfte Atmosphäre nach Sonnenuntergang schaffen' },
        { title: 'Bildschirmfreies Schlafzimmer', subtitle: 'Smartphone und Tablet außerhalb des Betts lassen' },
        { title: 'Beruhigendes Abendritual', subtitle: 'Ein Buch lesen oder Tee vor dem Einschlafen' },
        { title: '7 bis 8 Stunden erholsamer Schlaf', subtitle: 'Ungestörte nächtliche Erholung schützen' },
      ],
    },
    focus: {
      id: 'focus',
      name: 'Fokus & Arbeit',
      description: 'Klare Prioritäten und ungestörte Konzentration',
      habits: [
        { title: 'Top 3 Tagesprioritäten', subtitle: 'Das Wesentliche vor dem E-Mail-Check festlegen' },
        { title: 'Tiefe Konzentrationsphase', subtitle: '45 bis 60 Minuten ohne Unterbrechung arbeiten' },
        { title: 'Feste Zeiten für Nachrichten', subtitle: 'E-Mails und Benachrichtigungen gebündelt prüfen' },
        { title: 'Mikropause jede Stunde', subtitle: 'Augen entspannen und 2 Minuten bewegen' },
        { title: 'Tagesabschluss & Vorbereitung', subtitle: 'Aufgaben für den nächsten Tag strukturieren' },
      ],
    },
    blank: {
      id: 'blank',
      name: 'Leer (zum Ausfüllen)',
      description: '5 leere Schreibzeilen zum handschriftlichen Eintragen',
      habits: [
        { title: 'Gewohnheit 1: ________________', subtitle: 'Tagesziel zum Ausfüllen' },
        { title: 'Gewohnheit 2: ________________', subtitle: 'Tagesziel zum Ausfüllen' },
        { title: 'Gewohnheit 3: ________________', subtitle: 'Tagesziel zum Ausfüllen' },
        { title: 'Gewohnheit 4: ________________', subtitle: 'Tagesziel zum Ausfüllen' },
        { title: 'Gewohnheit 5: ________________', subtitle: 'Tagesziel zum Ausfüllen' },
      ],
    },
  },
  pt: {
    wellbeing: {
      id: 'wellbeing',
      name: 'Bem-estar',
      description: 'Hábitos diários simples para um equilíbrio duradouro',
      habits: [
        { title: 'Hidratação e Vitalidade', subtitle: 'Beber 1,5L a 2L de água ao longo do dia' },
        { title: 'Caminhada diária', subtitle: '20 a 30 minutos de movimento ao ar livre' },
        { title: 'Pausa para respirar e acalmar', subtitle: '5 a 10 minutos de reflexão ou meditação' },
        { title: 'Desconexão noturna de ecrãs', subtitle: 'Desligar ecrãs 30 minutos antes de dormir' },
        { title: 'Gratidão do dia', subtitle: 'Registar um momento positivo do dia' },
      ],
    },
    fitness: {
      id: 'fitness',
      name: 'Desporto e Forma',
      description: 'Movimento regular, energia e força diária',
      habits: [
        { title: 'Mobilidade matinal', subtitle: '10 minutos de alongamentos suaves ao acordar' },
        { title: 'Treino ou atividade física', subtitle: '30 minutos de exercício físico dedicado' },
        { title: 'Meta de 8.000 a 10.000 passos', subtitle: 'Manter-se ativo ao longo de todo o dia' },
        { title: 'Postura e pausas ativas', subtitle: 'Levantar e alinhar a postura a cada hora' },
        { title: 'Recuperação e relaxamento', subtitle: 'Alongamento muscular e boa hidratação' },
      ],
    },
    nutrition: {
      id: 'nutrition',
      name: 'Alimentação',
      description: 'Refeições equilibradas e energia constante',
      habits: [
        { title: 'Pequeno-almoço nutritivo', subtitle: 'Proteína de qualidade e fibras naturais' },
        { title: 'Legumes frescos às refeições', subtitle: 'Incluir vegetais no almoço e no jantar' },
        { title: 'Água e infusões como prioridade', subtitle: 'Evitar refrigerantes e bebidas açucaradas' },
        { title: 'Comida caseira e alimentos reais', subtitle: 'Foco em ingredientes naturais e frescos' },
        { title: 'Jantar leve e digestivo', subtitle: 'Comer pelo menos 2h30 antes de ir dormir' },
      ],
    },
    sleep: {
      id: 'sleep',
      name: 'Sono',
      description: 'Noites revigorantes e acordar com energia',
      habits: [
        { title: 'Horário de sono regular', subtitle: 'Manter horários consistentes de descanso' },
        { title: 'Luz suave ao anoitecer', subtitle: 'Criar um ambiente calmo antes de dormir' },
        { title: 'Quarto livre de ecrãs', subtitle: 'Telemóvel fora do alcance da cama' },
        { title: 'Ritual relaxante de deitar', subtitle: 'Leitura ou chá morno antes de repousar' },
        { title: '7 a 8 horas de sono contínuo', subtitle: 'Proteger o descanso reparador da noite' },
      ],
    },
    focus: {
      id: 'focus',
      name: 'Foco e Trabalho',
      description: 'Prioridades claras e trabalho focado',
      habits: [
        { title: 'Top 3 prioridades do dia', subtitle: 'Definir o essencial antes de abrir e-mails' },
        { title: 'Bloco de foco profundo', subtitle: '45 a 60 minutos de trabalho ininterrupto' },
        { title: 'Verificação em horários fixos', subtitle: 'Gerir mensagens e notificações em blocos' },
        { title: 'Micro-pausas regulares', subtitle: 'Descansar a visão e mover o corpo 2 minutos' },
        { title: 'Encerramento do dia de trabalho', subtitle: 'Planear as principais metas de amanhã' },
      ],
    },
    blank: {
      id: 'blank',
      name: 'Em branco',
      description: '5 linhas em branco prontas a preencher à mão',
      habits: [
        { title: 'Hábito 1: ________________', subtitle: 'Objetivo diário a definir' },
        { title: 'Hábito 2: ________________', subtitle: 'Objetivo diário a definir' },
        { title: 'Hábito 3: ________________', subtitle: 'Objetivo diário a definir' },
        { title: 'Hábito 4: ________________', subtitle: 'Objetivo diário a definir' },
        { title: 'Hábito 5: ________________', subtitle: 'Objetivo diário a definir' },
      ],
    },
  },
  it: {
    wellbeing: {
      id: 'wellbeing',
      name: 'Benessere',
      description: 'Abitudini semplici per un equilibrio quotidiano',
      habits: [
        { title: 'Idratazione e Vitalità', subtitle: 'Bere da 1,5L a 2L di acqua durante la giornata' },
        { title: 'Camminata quotidiana', subtitle: '20-30 minuti di movimento all’aria aperta' },
        { title: 'Pausa di respiro e calma', subtitle: '5-10 minuti di respirazione consapevole o quiete' },
        { title: 'Disconnessione serale', subtitle: 'Spegnere gli schermi 30 minuti prima di dormire' },
        { title: 'Gratitudine del giorno', subtitle: 'Annotare un momento positivo o un successo di oggi' },
      ],
    },
    fitness: {
      id: 'fitness',
      name: 'Sport e Forma',
      description: 'Movimento costante, energia e benessere fisico',
      habits: [
        { title: 'Mobilità mattutina', subtitle: '10 minuti di stretching dolce al risveglio' },
        { title: 'Allenamento mirato', subtitle: '30 minuti di attività fisica, cardio o forza' },
        { title: 'Obiettivo 8.000 - 10.000 passi', subtitle: 'Mantenersi attivi durante tutta la giornata' },
        { title: 'Postura e pause attive', subtitle: 'Alzarsi e distendere la schiena ogni ora' },
        { title: 'Recupero e defaticamento', subtitle: 'Idratazione e rilassamento muscolare' },
      ],
    },
    nutrition: {
      id: 'nutrition',
      name: 'Alimentazione',
      description: 'Pasti sani, equilibrati e vitalità costante',
      habits: [
        { title: 'Colazione nutriente', subtitle: 'Proteine sane e fibre naturali' },
        { title: 'Verdure fresche ai pasti', subtitle: 'Una porzione a pranzo e una a cena' },
        { title: 'Priorità ad acqua e tisane', subtitle: 'Evitare bevande zuccherate e troppi caffè' },
        { title: 'Cucina casalinga con cibi freschi', subtitle: 'Preferire alimenti freschi e poco lavorati' },
        { title: 'Cena leggera e digeribile', subtitle: 'Mangiare almeno 2h30 prima di coricarsi' },
      ],
    },
    sleep: {
      id: 'sleep',
      name: 'Sonno',
      description: 'Notti riposanti e risvegli con energia',
      habits: [
        { title: 'Orario di sonno regolare', subtitle: 'Andare a dormire e svegliarsi alla stessa ora' },
        { title: 'Luci soffuse la sera', subtitle: 'Creare un’atmosfera calda e distensiva' },
        { title: 'Camera senza schermi', subtitle: 'Lasciare lo smartphone lontano dal comodino' },
        { title: 'Rituale rilassante serale', subtitle: 'Leggere un libro o bere una tisana rilassante' },
        { title: '7-8 ore di sonno ristoratore', subtitle: 'Tutelare il recupero notturno ininterrotto' },
      ],
    },
    focus: {
      id: 'focus',
      name: 'Lavoro e Focus',
      description: 'Priorità chiare e sessioni di lavoro indisturbate',
      habits: [
        { title: 'Top 3 priorità del giorno', subtitle: 'Fissare l’essenziale prima di aprire le email' },
        { title: 'Sessione di concentrazione profonda', subtitle: '45-60 minuti dedicati a una sola attività' },
        { title: 'Controllo messaggi a orari prefissati', subtitle: 'Gestire notifiche ed email in blocchi' },
        { title: 'Micro-pausa ogni ora', subtitle: 'Distendere il corpo e riposare gli occhi 2 minuti' },
        { title: 'Chiusura ordinata della giornata', subtitle: 'Pianificare con cura le attività di domani' },
      ],
    },
    blank: {
      id: 'blank',
      name: 'In bianco',
      description: '5 righe bianche pronte da compilare a mano',
      habits: [
        { title: 'Abitudine 1: ________________', subtitle: 'Obiettivo quotidiano da definire' },
        { title: 'Abitudine 2: ________________', subtitle: 'Obiettivo quotidiano da definire' },
        { title: 'Abitudine 3: ________________', subtitle: 'Obiettivo quotidiano da definire' },
        { title: 'Abitudine 4: ________________', subtitle: 'Obiettivo quotidiano da definire' },
        { title: 'Abitudine 5: ________________', subtitle: 'Obiettivo quotidiano da definire' },
      ],
    },
  },
};
