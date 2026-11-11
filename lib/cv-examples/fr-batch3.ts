import type { CvExample } from './fr';

/**
 * Third batch of French CV examples (Nov 2026). Fictional people, companies and contacts.
 */
const PHONE = '06 00 00 00 00';

export const CV_EXAMPLES_FR_BATCH3_JOBS: CvExample[] = [
  {
    slug: 'employe-polyvalent',
    job: 'Employé polyvalent / employée polyvalente',
    short: 'Employé polyvalent',
    h1: 'Exemple de CV employé polyvalent en restauration',
    metaTitle: 'Exemple de CV employé polyvalent (restauration rapide) gratuit – LogoLoom',
    metaDescription:
      'Exemple de CV d’employé polyvalent en restauration rapide : caisse, cuisine, service, horaires. À modifier gratuitement et télécharger en PDF, sans compte.',
    intro:
      'En restauration rapide, le manager cherche quelqu’un de disponible, rapide et souriant, qui peut passer de la caisse à la cuisine. Vos disponibilités comptent autant que votre expérience : écrivez-les clairement.',
    color: '#7A2335',
    cv: {
      layout: 'sidebar',
      fullName: 'Sarah Moreau',
      jobTitle: 'Employée polyvalente, disponible soirs et week-ends',
      email: 'sarah.moreau@exemple.fr',
      phone: PHONE,
      city: 'Lille',
      link: '',
      photoUrl: null,
      summary:
        'Employée polyvalente depuis 2 ans en restauration rapide. À l’aise en caisse, en comptoir et en production, je garde le sourire pendant les rushs. Disponible les soirs, les week-ends et pendant les vacances scolaires.',
      experiences: [
        {
          role: 'Employée polyvalente',
          company: 'Burger Express',
          location: 'Lille',
          start: '2024',
          end: 'Aujourd’hui',
          details:
            'Prise de commande en caisse et au drive, jusqu’à 120 clients par heure en rush\nPréparation des produits en cuisine en respectant les temps et les recettes\nNettoyage de la salle et des équipements selon le planning d’hygiène\nFormation de 3 nouveaux équipiers à la caisse',
        },
        {
          role: 'Équipière (job d’été)',
          company: 'Snack de la Plage',
          location: 'Berck',
          start: '2023',
          end: '2023',
          details: 'Service au comptoir, préparation des boissons et des glaces\nTenue de la caisse en fin de journée',
        },
      ],
      education: [
        { degree: 'Baccalauréat général', school: 'Lycée Faidherbe, Lille', start: '2021', end: '2024', details: '' },
      ],
      skills: ['Caisse et encaissement', 'Préparation en cuisine', 'Service au comptoir et drive', 'Hygiène HACCP', 'Travail en équipe', 'Rapidité'],
      languages: [
        { name: 'Français', level: 'Langue maternelle' },
        { name: 'Anglais', level: 'Intermédiaire' },
      ],
      interests: 'Danse, cuisine',
    },
    tips: [
      { title: 'Écrivez vos disponibilités', body: 'Soirs, week-ends, vacances, fermetures : c’est souvent le premier critère du manager. Mettez-les dans le titre ou le profil.' },
      { title: 'Montrez la polyvalence', body: 'Caisse, cuisine, salle, drive : citez tous les postes tenus, même brièvement.' },
      { title: 'Un chiffre sur le rythme', body: 'Clients par heure, nombre de couverts : une seule donnée suffit à montrer que vous tenez un rush.' },
      { title: 'Les petits jobs comptent', body: 'Un job d’été ou du bénévolat dans l’événementiel prouve que vous savez déjà travailler en équipe.' },
    ],
    keywords: ['Polyvalence', 'Caisse', 'Encaissement', 'Préparation', 'Service client', 'Drive', 'Hygiène', 'HACCP', 'Travail en équipe', 'Disponibilité'],
    summaries: [
      'Employée polyvalente, 2 ans en restauration rapide, à l’aise en caisse comme en cuisine. Disponible soirs et week-ends.',
      'Étudiant motivé cherchant un poste d’équipier polyvalent, disponible 20 h par semaine, souriant et rapide.',
    ],
    faq: [
      { q: 'Faut-il une expérience pour être employé polyvalent ?', a: 'Non, c’est souvent un premier emploi. Mettez en avant vos disponibilités, vos petits jobs et votre envie d’apprendre.' },
      { q: 'Comment présenter un temps partiel ?', a: 'Indiquez-le simplement dans l’intitulé (« 20 h par semaine ») : c’est fréquent dans la restauration et ça ne pénalise pas.' },
    ],
  },
  {
    slug: 'manutentionnaire',
    job: 'Manutentionnaire',
    short: 'Manutentionnaire',
    metaTitle: 'Exemple de CV manutentionnaire gratuit (PDF) – LogoLoom',
    metaDescription:
      'Exemple de CV de manutentionnaire à modifier gratuitement : chargement, tri, préparation, sécurité. Téléchargez votre CV en PDF sans compte.',
    intro:
      'Pour un poste de manutentionnaire, le recruteur veut savoir si vous êtes fiable, endurant et sérieux sur la sécurité. Les missions d’intérim comptent : regroupez-les pour montrer votre régularité.',
    color: '#383D39',
    cv: {
      layout: 'classic',
      fullName: 'Karim Benali',
      jobTitle: 'Manutentionnaire, disponible en équipe',
      email: 'karim.benali@exemple.fr',
      phone: PHONE,
      city: 'Orléans',
      link: '',
      photoUrl: null,
      summary:
        'Manutentionnaire depuis 4 ans en entrepôt et en usine. Endurant, ponctuel et attentif aux règles de sécurité. Habitué au travail en 2x8 et aux périodes de forte activité.',
      experiences: [
        {
          role: 'Manutentionnaire (intérim)',
          company: 'Plateforme logistique Loire Distribution',
          location: 'Saran',
          start: '2023',
          end: 'Aujourd’hui',
          details:
            'Déchargement des camions et contrôle des colis à réception\nTri, étiquetage et rangement des marchandises en zone de stockage\nUtilisation du transpalette manuel et électrique\nRespect des consignes de sécurité et des gestes et postures',
        },
        {
          role: 'Agent de manutention',
          company: 'Centre de tri postal',
          location: 'Orléans',
          start: '2021',
          end: '2023',
          details: 'Tri de 1 500 colis par poste en période de fêtes\nChargement des véhicules de tournée',
        },
      ],
      education: [
        { degree: 'Formation gestes et postures', school: 'Organisme de formation de l’agence d’intérim', start: '2021', end: '2021', details: '' },
        { degree: 'CAP Opérateur logistique (en cours de VAE)', school: 'GRETA Centre-Val de Loire', start: '2025', end: 'Aujourd’hui', details: '' },
      ],
      skills: ['Chargement et déchargement', 'Tri et étiquetage', 'Transpalette électrique', 'Gestes et postures', 'Travail en 2x8', 'Port de charges'],
      languages: [
        { name: 'Français', level: 'Courant' },
        { name: 'Arabe', level: 'Langue maternelle' },
      ],
      interests: 'Football en club, musculation',
    },
    tips: [
      { title: 'Regroupez l’intérim', body: 'Une ligne par période et par type de mission évite un CV de deux pages et montre que les agences vous rappellent.' },
      { title: 'Citez le matériel', body: 'Transpalette manuel ou électrique, scanner, filmeuse : chaque outil maîtrisé est un argument.' },
      { title: 'La sécurité', body: 'Gestes et postures, EPI, aucun accident : c’est rassurant pour l’employeur.' },
      { title: 'Vos horaires possibles', body: '2x8, 3x8, nuit, samedi : dites ce que vous acceptez, c’est souvent décisif.' },
    ],
    keywords: ['Manutention', 'Chargement', 'Déchargement', 'Tri', 'Étiquetage', 'Transpalette', 'Port de charges', 'Sécurité', 'Gestes et postures', 'Travail en équipe'],
    summaries: [
      'Manutentionnaire, 4 ans en entrepôt, fiable et endurant. Disponible en 2x8 et le samedi.',
      'Premier emploi en logistique : sérieux, sportif et ponctuel, prêt à travailler en équipe de matin ou d’après-midi.',
    ],
    faq: [
      { q: 'Faut-il un diplôme pour être manutentionnaire ?', a: 'Non. L’expérience et le sérieux comptent plus. Une formation gestes et postures ou un CACES est un vrai plus.' },
      { q: 'Comment parler de missions courtes ?', a: 'Regroupez-les sous « Missions d’intérim » avec les dates et les secteurs, sans détailler chaque semaine.' },
    ],
  },
  {
    slug: 'cariste',
    job: 'Cariste / magasinier cariste',
    short: 'Cariste',
    metaTitle: 'Exemple de CV cariste / magasinier cariste gratuit (PDF) – LogoLoom',
    metaDescription:
      'Exemple de CV de cariste : CACES R489, préparation de commandes, gestion de stock. À modifier gratuitement et télécharger en PDF, sans compte.',
    intro:
      'Pour un cariste, le CACES est le premier filtre : écrivez les catégories et la date de validité tout en haut. Ensuite, le recruteur regarde le type d’entrepôt et les outils (WMS, scanner).',
    color: '#155E75',
    cv: {
      layout: 'sidebar',
      fullName: 'Thomas Girard',
      jobTitle: 'Magasinier cariste, CACES R489 cat. 1, 3 et 5',
      email: 'thomas.girard@exemple.fr',
      phone: PHONE,
      city: 'Lyon',
      link: '',
      photoUrl: null,
      summary:
        'Magasinier cariste depuis 6 ans en entrepôt de grande distribution. CACES R489 catégories 1, 3 et 5 à jour. Précis en préparation de commandes, à l’aise avec le WMS et rigoureux sur la sécurité.',
      experiences: [
        {
          role: 'Magasinier cariste',
          company: 'Entrepôt Rhône Logistique',
          location: 'Saint-Priest',
          start: '2021',
          end: 'Aujourd’hui',
          details:
            'Mise en stock et réapprovisionnement en hauteur au chariot à mât rétractable\nPréparation de commandes au scanner, taux d’erreur inférieur à 0,5 %\nInventaires tournants et saisie des mouvements dans le WMS\nFormation des intérimaires aux règles de circulation dans l’entrepôt',
        },
        {
          role: 'Préparateur de commandes',
          company: 'Plateforme alimentaire Sud-Est',
          location: 'Corbas',
          start: '2019',
          end: '2021',
          details: 'Préparation en froid positif, 180 colis par heure\nChargement des quais selon l’ordre des tournées',
        },
      ],
      education: [
        { degree: 'CACES R489 catégories 1, 3 et 5', school: 'Centre de formation AFTRAL', start: '2024', end: '2024', details: 'Valide jusqu’en 2029' },
        { degree: 'Titre professionnel Agent magasinier', school: 'AFPA Vénissieux', start: '2018', end: '2019', details: '' },
      ],
      skills: ['CACES R489 1, 3, 5', 'Préparation de commandes', 'WMS et scanner', 'Inventaire', 'Gestion de stock', 'Sécurité en entrepôt'],
      languages: [{ name: 'Français', level: 'Langue maternelle' }],
      interests: 'VTT, bricolage',
    },
    tips: [
      { title: 'Le CACES en haut', body: 'Catégories et date de validité dans le titre ou le profil : sans ça, beaucoup de recruteurs ne lisent pas la suite.' },
      { title: 'Un chiffre de productivité', body: 'Colis par heure, lignes préparées, taux d’erreur : c’est ce qui distingue un bon préparateur.' },
      { title: 'Le type d’entrepôt', body: 'Froid, grande distribution, e-commerce, pièces détachées : chaque secteur a ses contraintes.' },
      { title: 'Les outils informatiques', body: 'WMS, scanner, saisie des inventaires : citez les logiciels si vous les connaissez.' },
    ],
    keywords: ['CACES R489', 'Chariot élévateur', 'Préparation de commandes', 'WMS', 'Scanner', 'Inventaire', 'Réception', 'Expédition', 'Gestion de stock', 'Sécurité'],
    summaries: [
      'Magasinier cariste, CACES R489 1, 3 et 5 à jour, 6 ans en grande distribution. Précis, rapide et rigoureux sur la sécurité.',
      'Cariste débutant, CACES R489 catégorie 3 obtenu en 2026, motivé et disponible en horaires d’équipe.',
    ],
    faq: [
      { q: 'Quelle différence entre CACES R389 et R489 ?', a: 'Le R489 a remplacé le R389 en 2020. Si votre CACES est ancien, vérifiez sa date de fin de validité et indiquez-la.' },
      { q: 'Faut-il joindre une copie du CACES ?', a: 'Pas avec le CV, mais gardez-la prête : l’employeur ou l’agence la demandera avant de vous faire conduire.' },
    ],
  },
  {
    slug: 'assistante-maternelle',
    job: 'Assistante maternelle / assistant maternel',
    short: 'Assistante maternelle',
    metaTitle: 'Exemple de CV assistante maternelle gratuit (PDF) – LogoLoom',
    metaDescription:
      'Exemple de CV d’assistante maternelle : agrément, accueil des enfants, activités, relation avec les parents. À modifier gratuitement et télécharger en PDF.',
    intro:
      'Une assistante maternelle s’adresse surtout aux parents. Ils veulent savoir combien d’enfants vous pouvez accueillir, à partir de quel âge, où, et comment se passe une journée. Rassurez-les avec du concret.',
    color: '#1F5C4A',
    cv: {
      layout: 'sidebar',
      fullName: 'Nadia Fontaine',
      jobTitle: 'Assistante maternelle agréée, 4 places',
      email: 'nadia.fontaine@exemple.fr',
      phone: PHONE,
      city: 'Nantes',
      link: '',
      photoUrl: null,
      summary:
        'Assistante maternelle agréée depuis 8 ans, j’accueille jusqu’à 4 enfants de 0 à 6 ans dans une maison avec jardin. Douce et organisée, je propose des journées rythmées par le jeu, les sorties et l’éveil, en lien étroit avec les parents.',
      experiences: [
        {
          role: 'Assistante maternelle agréée',
          company: 'À domicile',
          location: 'Nantes',
          start: '2018',
          end: 'Aujourd’hui',
          details:
            'Accueil de 4 enfants de 3 mois à 6 ans, dont périscolaire\nActivités d’éveil adaptées à chaque âge : peinture, motricité, lecture, jardinage\nSorties régulières au relais petite enfance et à la médiathèque\nCahier de liaison quotidien et échanges réguliers avec les familles',
        },
        {
          role: 'Auxiliaire en crèche (remplacements)',
          company: 'Multi-accueil Les Petits Pas',
          location: 'Rezé',
          start: '2015',
          end: '2018',
          details: 'Accompagnement des enfants dans les repas, la sieste et les soins\nParticipation au projet pédagogique de la structure',
        },
      ],
      education: [
        { degree: 'Agrément PMI, 4 places', school: 'Conseil départemental de Loire-Atlantique', start: '2018', end: '2018', details: 'Renouvelé en 2023' },
        { degree: 'CAP Accompagnant éducatif petite enfance', school: 'GRETA Nantes', start: '2016', end: '2017', details: '' },
        { degree: 'Prévention et secours civiques (PSC1)', school: 'Croix-Rouge', start: '2024', end: '2024', details: '' },
      ],
      skills: ['Éveil et activités manuelles', 'Rythme et besoins de l’enfant', 'Hygiène et sécurité', 'Préparation des repas', 'Relation avec les parents', 'Premiers secours'],
      languages: [{ name: 'Français', level: 'Langue maternelle' }],
      interests: 'Jardinage, lecture jeunesse, randonnée',
    },
    tips: [
      { title: 'L’agrément en premier', body: 'Nombre de places, âges et date de renouvellement : c’est la première question des parents.' },
      { title: 'Décrivez votre lieu d’accueil', body: 'Maison, jardin, pièce dédiée, quartier, proximité de l’école : les parents se projettent.' },
      { title: 'Une journée type', body: 'Activités, sorties, sieste, repas : deux ou trois lignes concrètes valent mieux qu’une liste de qualités.' },
      { title: 'Vos formations', body: 'PSC1, formations continues, ateliers au relais petite enfance : ça montre que vous vous tenez à jour.' },
    ],
    keywords: ['Agrément PMI', 'Accueil du jeune enfant', 'Éveil', 'Activités manuelles', 'Sécurité', 'Hygiène', 'Repas', 'Relation parents', 'Périscolaire', 'PSC1'],
    summaries: [
      'Assistante maternelle agréée 4 places, 8 ans d’expérience, maison avec jardin près des écoles. Journées rythmées par l’éveil et les sorties.',
      'Nouvellement agréée après 3 ans en crèche, je propose un accueil chaleureux et des activités adaptées à chaque âge.',
    ],
    faq: [
      { q: 'Faut-il mettre une photo sur un CV d’assistante maternelle ?', a: 'C’est fréquent et plutôt apprécié par les parents, qui veulent mettre un visage sur la personne qui gardera leur enfant. Choisissez une photo souriante et simple.' },
      { q: 'Peut-on mettre des références de parents ?', a: 'Oui, avec leur accord. Une ligne « Références de familles disponibles sur demande » suffit sur le CV.' },
    ],
  },
  {
    slug: 'aide-a-domicile',
    job: 'Aide à domicile',
    short: 'Aide à domicile',
    metaTitle: 'Exemple de CV aide à domicile gratuit (PDF) – LogoLoom',
    metaDescription:
      'Exemple de CV d’aide à domicile : aide aux personnes âgées, entretien, courses, repas. À modifier gratuitement et télécharger en PDF, sans compte.',
    intro:
      'Le recruteur, souvent une association ou une agence de services à la personne, cherche quelqu’un de fiable, discret et autonome. Montrez les tâches réalisées, le public accompagné et votre mobilité.',
    color: '#5B2A6E',
    cv: {
      layout: 'classic',
      fullName: 'Martine Lefèvre',
      jobTitle: 'Aide à domicile, permis B et véhicule',
      email: 'martine.lefevre@exemple.fr',
      phone: PHONE,
      city: 'Limoges',
      link: '',
      photoUrl: null,
      summary:
        'Aide à domicile depuis 7 ans auprès de personnes âgées et de personnes en situation de handicap. Patiente, discrète et organisée, j’interviens chez 6 à 8 bénéficiaires par jour. Permis B et véhicule personnel.',
      experiences: [
        {
          role: 'Aide à domicile',
          company: 'Association Vivre chez Soi',
          location: 'Limoges et environs',
          start: '2019',
          end: 'Aujourd’hui',
          details:
            'Aide au lever, à l’habillage et à la toilette simple\nEntretien du logement, linge et repassage\nCourses, préparation des repas en respectant les régimes\nCompagnie, stimulation et transmission des informations à l’équipe et aux familles',
        },
        {
          role: 'Employée de ménage',
          company: 'Particuliers employeurs (CESU)',
          location: 'Limoges',
          start: '2017',
          end: '2019',
          details: 'Entretien de 5 logements par semaine, gestion des clés et des horaires',
        },
      ],
      education: [
        { degree: 'Titre professionnel Assistant de vie aux familles (ADVF)', school: 'AFPA Limoges', start: '2018', end: '2019', details: '' },
        { degree: 'Sauveteur secouriste du travail (SST)', school: 'Organisme agréé', start: '2025', end: '2025', details: '' },
      ],
      skills: ['Aide aux actes de la vie quotidienne', 'Entretien du logement', 'Préparation des repas', 'Écoute et discrétion', 'Transmissions écrites', 'Autonomie'],
      languages: [{ name: 'Français', level: 'Langue maternelle' }],
      interests: 'Couture, cuisine familiale',
    },
    tips: [
      { title: 'Le public accompagné', body: 'Personnes âgées, handicap, Alzheimer, sortie d’hospitalisation : précisez avec qui vous avez l’habitude de travailler.' },
      { title: 'Mobilité', body: 'Permis et véhicule sont souvent indispensables : écrivez-les dans le titre.' },
      { title: 'Les tâches concrètes', body: 'Lever, toilette simple, repas, courses, ménage : soyez précise, chaque structure a ses besoins.' },
      { title: 'Les qualités humaines', body: 'Discrétion, patience, ponctualité : appuyez-les sur un exemple plutôt que de les lister.' },
    ],
    keywords: ['Aide à domicile', 'Personnes âgées', 'Autonomie', 'Entretien du logement', 'Préparation des repas', 'Courses', 'ADVF', 'Discrétion', 'Bienveillance', 'Permis B'],
    summaries: [
      'Aide à domicile, 7 ans auprès de personnes âgées, titre ADVF, permis B et véhicule. Patiente, discrète et ponctuelle.',
      'En reconversion vers l’aide à la personne, j’ai accompagné un proche dépendant pendant 3 ans et je prépare le titre ADVF.',
    ],
    faq: [
      { q: 'Peut-on être aide à domicile sans diplôme ?', a: 'Oui, beaucoup de structures recrutent sans diplôme. Le titre ADVF ou le DEAES permettent ensuite d’évoluer et d’être mieux payé.' },
      { q: 'Faut-il parler de l’aide apportée à un proche ?', a: 'Oui, c’est une vraie expérience. Présentez-la comme « aidant familial » avec les tâches réalisées.' },
    ],
  },
  {
    slug: 'coiffeur',
    job: 'Coiffeur / coiffeuse',
    short: 'Coiffeur',
    metaTitle: 'Exemple de CV coiffeur / coiffeuse gratuit (PDF) – LogoLoom',
    metaDescription:
      'Exemple de CV de coiffeuse : techniques maîtrisées, CAP ou BP, vente de produits. À modifier gratuitement et télécharger en PDF, sans compte.',
    intro:
      'En salon, le responsable veut savoir quelles techniques vous maîtrisez (coupe homme, couleur, balayage, chignon) et si vous savez conseiller et vendre. Un lien vers vos réalisations est un vrai plus.',
    color: '#5B2A6E',
    cv: {
      layout: 'sidebar',
      fullName: 'Chloé Martin',
      jobTitle: 'Coiffeuse coloriste, BP Coiffure',
      email: 'chloe.martin@exemple.fr',
      phone: PHONE,
      city: 'Montpellier',
      link: 'instagram.com/chloe.coiffure.exemple',
      photoUrl: null,
      summary:
        'Coiffeuse depuis 5 ans, spécialisée en couleur et balayage. À l’écoute des clientes, je conseille les coupes et les soins adaptés. Habituée à un salon de 6 personnes et à la vente de produits.',
      experiences: [
        {
          role: 'Coiffeuse coloriste',
          company: 'Salon L’Atelier',
          location: 'Montpellier',
          start: '2022',
          end: 'Aujourd’hui',
          details:
            'Coupes femme, homme et enfant, brushings et coiffures de mariage\nColorations, balayages et ombrés, diagnostic du cheveu\nConseil et vente de soins : 20 % du chiffre d’affaires produits du salon\nFidélisation d’une clientèle personnelle d’environ 150 personnes',
        },
        {
          role: 'Coiffeuse (apprentissage)',
          company: 'Coiffure & Style',
          location: 'Sète',
          start: '2019',
          end: '2022',
          details: 'Shampoings, soins, coupes et couleurs sous la responsabilité de la gérante',
        },
      ],
      education: [
        { degree: 'Brevet professionnel Coiffure', school: 'CFA de la coiffure, Montpellier', start: '2020', end: '2022', details: '' },
        { degree: 'CAP Métiers de la coiffure', school: 'CFA de la coiffure, Montpellier', start: '2018', end: '2020', details: '' },
      ],
      skills: ['Coupe femme, homme, enfant', 'Coloration et balayage', 'Brushing et chignon', 'Diagnostic du cheveu', 'Conseil et vente', 'Hygiène du salon'],
      languages: [
        { name: 'Français', level: 'Langue maternelle' },
        { name: 'Espagnol', level: 'Intermédiaire' },
      ],
      interests: 'Mode, tendances couleur, photographie',
    },
    tips: [
      { title: 'Listez vos techniques', body: 'Coupe homme, dégradé, couleur, balayage, lissage, chignon : le responsable cherche ce qui manque dans son équipe.' },
      { title: 'Montrez vos réalisations', body: 'Un lien Instagram ou un book en ligne dans le champ site web vaut plusieurs lignes de texte.' },
      { title: 'La vente compte', body: 'Une part du chiffre d’affaires produits ou un nombre de clientes fidèles rassure le gérant.' },
      { title: 'CAP ou BP', body: 'Le BP permet de gérer un salon : précisez-le, il ouvre des postes de responsable.' },
    ],
    keywords: ['Coupe', 'Coloration', 'Balayage', 'Brushing', 'Chignon', 'Diagnostic', 'Conseil client', 'Vente de produits', 'CAP Coiffure', 'BP Coiffure'],
    summaries: [
      'Coiffeuse coloriste, BP Coiffure, 5 ans en salon. Spécialiste balayage, à l’écoute et à l’aise en vente de soins.',
      'Jeune coiffeuse, CAP obtenu en 2026, à l’aise en coupe homme et dégradés, cherche un salon pour progresser en couleur.',
    ],
    faq: [
      { q: 'Faut-il mettre une photo ?', a: 'Dans la coiffure, une photo soignée est assez courante, mais pas obligatoire. Un lien vers vos réalisations est plus utile.' },
      { q: 'Comment présenter l’apprentissage ?', a: 'Comme une vraie expérience, avec le salon, les années et les techniques apprises.' },
    ],
  },
  {
    slug: 'agent-de-production',
    job: 'Agent de production / opérateur de production',
    short: 'Agent de production',
    metaTitle: 'Exemple de CV agent de production gratuit (PDF) – LogoLoom',
    metaDescription:
      'Exemple de CV d’agent de production en usine : conduite de ligne, contrôle qualité, travail en équipe. À modifier gratuitement et télécharger en PDF.',
    intro:
      'En usine, le chef d’équipe veut savoir sur quel type de ligne vous avez travaillé, si vous respectez les cadences et les règles de qualité, et quels horaires vous acceptez. Citez le secteur : agroalimentaire, automobile, plasturgie…',
    color: '#383D39',
    cv: {
      layout: 'classic',
      fullName: 'Julien Mercier',
      jobTitle: 'Agent de production, travail en 3x8',
      email: 'julien.mercier@exemple.fr',
      phone: PHONE,
      city: 'Rennes',
      link: '',
      photoUrl: null,
      summary:
        'Agent de production depuis 5 ans en agroalimentaire. Rigoureux sur la qualité et l’hygiène, je tiens les cadences et je sais réagir en cas d’arrêt de ligne. Habitué au travail en 3x8.',
      experiences: [
        {
          role: 'Agent de production',
          company: 'Laiterie de l’Ouest',
          location: 'Vitré',
          start: '2022',
          end: 'Aujourd’hui',
          details:
            'Alimentation et surveillance d’une ligne de conditionnement de yaourts\nContrôles qualité en cours de production : poids, étiquetage, dates\nNettoyage et désinfection de la ligne selon le plan d’hygiène\nRemplissage des fiches de traçabilité et signalement des anomalies',
        },
        {
          role: 'Opérateur (intérim)',
          company: 'Usine de pièces plastiques',
          location: 'Rennes',
          start: '2020',
          end: '2022',
          details: 'Ébavurage et contrôle visuel des pièces en sortie de presse\nRespect des cadences et des consignes de sécurité',
        },
      ],
      education: [
        { degree: 'CQP Conducteur de ligne (en cours)', school: 'Organisme de formation de la branche', start: '2025', end: 'Aujourd’hui', details: '' },
        { degree: 'Bac pro Pilote de ligne de production', school: 'Lycée professionnel Jean-Jaurès, Rennes', start: '2017', end: '2020', details: '' },
      ],
      skills: ['Conduite et surveillance de ligne', 'Contrôle qualité', 'Hygiène et traçabilité', 'Respect des cadences', 'Travail en 3x8', 'Sécurité au poste'],
      languages: [{ name: 'Français', level: 'Langue maternelle' }],
      interests: 'Course à pied, jeux vidéo',
    },
    tips: [
      { title: 'Le secteur et le produit', body: 'Agroalimentaire, cosmétique, automobile : chaque secteur a ses règles. Dites ce que vous fabriquiez.' },
      { title: 'Vos horaires', body: '2x8, 3x8, nuit, week-end : écrivez ce que vous acceptez, c’est souvent la première question.' },
      { title: 'La qualité', body: 'Contrôles, traçabilité, autocontrôle : montrez que vous ne faites pas que produire, vous vérifiez aussi.' },
      { title: 'L’évolution', body: 'Un CQP ou une formation de conducteur de ligne montre que vous voulez progresser.' },
    ],
    keywords: ['Production', 'Conduite de ligne', 'Conditionnement', 'Contrôle qualité', 'Traçabilité', 'Hygiène', 'Cadences', 'Sécurité', 'Travail en équipe', '3x8'],
    summaries: [
      'Agent de production, 5 ans en agroalimentaire, rigoureux sur la qualité et habitué au 3x8.',
      'Opérateur polyvalent en intérim, à l’aise sur différentes lignes, disponible rapidement et en horaires d’équipe.',
    ],
    faq: [
      { q: 'Quelle différence entre agent et opérateur de production ?', a: 'Les deux termes désignent souvent le même poste. Reprenez l’intitulé exact de l’offre dans votre titre.' },
      { q: 'Faut-il détailler chaque mission d’intérim ?', a: 'Non. Regroupez-les par secteur avec le type de poste, et gardez le détail pour les missions longues.' },
    ],
  },
  {
    slug: 'technicien-de-maintenance',
    job: 'Technicien / technicienne de maintenance',
    short: 'Technicien de maintenance',
    metaTitle: 'Exemple de CV technicien de maintenance gratuit (PDF) – LogoLoom',
    metaDescription:
      'Exemple de CV de technicien de maintenance industrielle : mécanique, électricité, automatismes, GMAO. À modifier gratuitement et télécharger en PDF.',
    intro:
      'Le responsable maintenance cherche d’abord vos domaines (mécanique, électricité, automatisme), vos habilitations et le type d’équipements. Montrez que vous savez dépanner vite et prévenir les pannes.',
    color: '#2340A8',
    cv: {
      layout: 'sidebar',
      fullName: 'Antoine Roux',
      jobTitle: 'Technicien de maintenance industrielle',
      email: 'antoine.roux@exemple.fr',
      phone: PHONE,
      city: 'Grenoble',
      link: '',
      photoUrl: null,
      summary:
        'Technicien de maintenance depuis 7 ans en industrie. Polyvalent en mécanique, électricité et automatismes, je dépanne les lignes de production et je mets en place la maintenance préventive. Habilitations électriques BR et B2V à jour.',
      experiences: [
        {
          role: 'Technicien de maintenance',
          company: 'Alpes Emballages',
          location: 'Voiron',
          start: '2021',
          end: 'Aujourd’hui',
          details:
            'Dépannage mécanique, électrique et pneumatique sur 5 lignes de production\nDiagnostic et modifications simples de programmes automates\nPlans de maintenance préventive dans la GMAO : temps d’arrêt réduit de 15 %\nGestion du stock de pièces détachées et relation avec les fournisseurs',
        },
        {
          role: 'Technicien de maintenance (alternance)',
          company: 'Papeterie du Dauphiné',
          location: 'Grenoble',
          start: '2018',
          end: '2021',
          details: 'Interventions préventives et curatives sur les machines de transformation\nRédaction des comptes rendus d’intervention',
        },
      ],
      education: [
        { degree: 'BTS Maintenance des systèmes', school: 'Lycée Vaucanson, Grenoble (alternance)', start: '2019', end: '2021', details: '' },
        { degree: 'Habilitations électriques BR, B2V', school: 'Organisme agréé', start: '2025', end: '2025', details: '' },
      ],
      skills: ['Mécanique et pneumatique', 'Électricité industrielle', 'Automates programmables', 'Maintenance préventive', 'GMAO', 'Lecture de plans et schémas'],
      languages: [
        { name: 'Français', level: 'Langue maternelle' },
        { name: 'Anglais technique', level: 'Intermédiaire' },
      ],
      interests: 'Escalade, électronique',
    },
    tips: [
      { title: 'Vos habilitations', body: 'Électriques (BR, B2V, H0), CACES nacelle, travail en hauteur : écrivez-les avec les dates.' },
      { title: 'Vos domaines', body: 'Mécanique, électricité, automatisme, hydraulique : précisez votre spécialité et ce que vous savez aussi faire.' },
      { title: 'Un résultat chiffré', body: 'Temps d’arrêt réduit, pannes évitées, délai d’intervention : un chiffre vaut mieux qu’un adjectif.' },
      { title: 'Les équipements', body: 'Types de machines, marques d’automates, logiciel de GMAO : c’est ce que le recruteur va chercher.' },
    ],
    keywords: ['Maintenance préventive', 'Maintenance curative', 'Dépannage', 'Électricité', 'Mécanique', 'Automatisme', 'GMAO', 'Habilitation électrique', 'Lecture de plans', 'Pneumatique'],
    summaries: [
      'Technicien de maintenance polyvalent, 7 ans en industrie, habilitations BR et B2V. Dépannage rapide et maintenance préventive en GMAO.',
      'Jeune diplômé de BTS Maintenance des systèmes en alternance, à l’aise en électricité et automatismes, disponible en horaires postés.',
    ],
    faq: [
      { q: 'Faut-il citer les marques d’automates ?', a: 'Oui, si vous les connaissez vraiment : c’est un mot-clé que les recruteurs et les logiciels de tri recherchent.' },
      { q: 'Comment présenter l’astreinte ?', a: 'Une ligne suffit (« astreintes une semaine sur quatre ») : elle montre que vous êtes fiable et autonome.' },
    ],
  },
];

export const CV_EXAMPLES_FR_BATCH3_SITUATIONS: CvExample[] = [
  {
    slug: 'alternance',
    job: 'Alternance',
    short: 'Alternance',
    h1: 'Exemple de CV pour une alternance',
    label: 'CV alternance',
    metaTitle: 'Exemple de CV alternance gratuit (PDF) – LogoLoom',
    metaDescription:
      'Exemple de CV pour trouver une alternance : formation visée, rythme, projets, motivation. À modifier gratuitement et télécharger en PDF, sans compte.',
    intro:
      'Pour une alternance, l’entreprise recrute à la fois un étudiant et un futur collègue. Elle veut voir tout de suite la formation visée, le rythme école-entreprise et la date de début. Le reste prouve votre motivation.',
    color: '#2340A8',
    cv: {
      layout: 'sidebar',
      fullName: 'Lucas Dubois',
      jobTitle: 'Recherche alternance assistant commercial, rythme 2 j / 3 j, dès septembre',
      email: 'lucas.dubois@exemple.fr',
      phone: PHONE,
      city: 'Toulouse',
      link: 'linkedin.com/in/lucas-dubois-exemple',
      photoUrl: null,
      summary:
        'Admis en BTS Négociation et digitalisation de la relation client, je cherche une entreprise pour 2 ans d’alternance à partir de septembre. J’aime le contact client et je suis à l’aise au téléphone grâce à mon job de téléconseiller.',
      experiences: [
        {
          role: 'Téléconseiller (job étudiant)',
          company: 'Centre de relation client',
          location: 'Toulouse',
          start: '2025',
          end: 'Aujourd’hui',
          details: 'Prise d’appels entrants, environ 40 appels par jour\nTraitement des demandes et ventes additionnelles d’options',
        },
        {
          role: 'Stage de vente (4 semaines)',
          company: 'Magasin de sport',
          location: 'Blagnac',
          start: '2024',
          end: '2024',
          details: 'Conseil client au rayon running, mise en rayon et inventaire',
        },
      ],
      education: [
        { degree: 'BTS NDRC en alternance (admis, rentrée de septembre)', school: 'CFA du commerce, Toulouse', start: '2026', end: '2028', details: 'Rythme : 2 jours en cours, 3 jours en entreprise' },
        { degree: 'Baccalauréat STMG', school: 'Lycée Ozenne, Toulouse', start: '2023', end: '2026', details: 'Mention assez bien' },
      ],
      skills: ['Relation client', 'Prospection téléphonique', 'Pack Office', 'Réseaux sociaux', 'Travail en équipe', 'Organisation'],
      languages: [
        { name: 'Français', level: 'Langue maternelle' },
        { name: 'Anglais', level: 'B1' },
      ],
      interests: 'Rugby en club, création de vidéos',
    },
    tips: [
      { title: 'Tout dans le titre', body: 'Poste visé, diplôme, rythme et date de début : le recruteur doit tout comprendre en lisant une seule ligne.' },
      { title: 'L’école en avant', body: 'Indiquez la formation, l’école et si vous êtes déjà admis : beaucoup d’entreprises le demandent avant de signer.' },
      { title: 'Les jobs étudiants', body: 'Caisse, téléconseil, baby-sitting, animation : tout montre que vous savez déjà travailler.' },
      { title: 'Un projet concret', body: 'Un projet scolaire, une association ou une création personnelle prouvent votre motivation mieux qu’un adjectif.' },
    ],
    keywords: ['Alternance', 'Apprentissage', 'Contrat de professionnalisation', 'Rythme', 'Motivation', 'Polyvalence', 'Travail en équipe', 'Autonomie', 'Pack Office', 'Relation client'],
    summaries: [
      'Admis en BTS NDRC, je cherche une alternance de 2 ans en relation client dès septembre, rythme 2 jours / 3 jours.',
      'Étudiant en licence pro RH, à la recherche d’une alternance d’un an en gestion du personnel à partir d’octobre.',
    ],
    faq: [
      { q: 'Faut-il être admis dans une école avant de chercher ?', a: 'Pas forcément, mais c’est un plus. Si l’admission est en cours, écrivez « candidature en cours » avec le nom de la formation.' },
      { q: 'Faut-il une lettre de motivation pour une alternance ?', a: 'Souvent oui. Elle explique pourquoi cette entreprise et ce que vous apprendrez à l’école qui lui sera utile.' },
    ],
  },
  {
    slug: 'reconversion',
    job: 'Reconversion professionnelle',
    short: 'Reconversion',
    h1: 'Exemple de CV de reconversion professionnelle',
    label: 'CV reconversion',
    metaTitle: 'Exemple de CV reconversion professionnelle gratuit (PDF) – LogoLoom',
    metaDescription:
      'Exemple de CV pour une reconversion : nouveau métier visé, compétences transférables, formation. À modifier gratuitement et télécharger en PDF, sans compte.',
    intro:
      'En reconversion, le risque est que le recruteur ne voie que votre ancien métier. Le CV doit annoncer le nouveau dès le titre, puis montrer ce qui vous y prépare : la formation, les stages et les compétences qui se transfèrent.',
    color: '#1F5C4A',
    cv: {
      layout: 'classic',
      fullName: 'Céline Garnier',
      jobTitle: 'Assistante comptable, en reconversion après 10 ans dans la vente',
      email: 'celine.garnier@exemple.fr',
      phone: PHONE,
      city: 'Strasbourg',
      link: '',
      photoUrl: null,
      summary:
        'Après 10 ans dans la vente, dont 4 comme responsable adjointe de magasin, je me suis formée à la comptabilité. Rigoureuse avec les chiffres et habituée à gérer une caisse, des inventaires et des plannings, je cherche un poste d’assistante comptable.',
      experiences: [
        {
          role: 'Stage d’assistante comptable (8 semaines)',
          company: 'Cabinet d’expertise comptable Rhin Conseil',
          location: 'Strasbourg',
          start: '2026',
          end: '2026',
          details: 'Saisie des factures et rapprochements bancaires pour 15 dossiers clients\nPréparation des déclarations de TVA sous contrôle d’un collaborateur',
        },
        {
          role: 'Responsable adjointe de magasin',
          company: 'Enseigne de décoration',
          location: 'Strasbourg',
          start: '2020',
          end: '2025',
          details: 'Contrôle des caisses et des remises en banque\nSuivi du chiffre d’affaires et des indicateurs hebdomadaires\nInventaires annuels et gestion des écarts de stock',
        },
        {
          role: 'Vendeuse',
          company: 'Enseigne de décoration',
          location: 'Strasbourg',
          start: '2015',
          end: '2020',
          details: '',
        },
      ],
      education: [
        { degree: 'Titre professionnel Gestionnaire comptable et fiscal', school: 'AFPA Strasbourg', start: '2025', end: '2026', details: 'Formation financée par le CPF' },
        { degree: 'BTS Management des unités commerciales', school: 'Lycée Jean-Rostand, Strasbourg', start: '2013', end: '2015', details: '' },
      ],
      skills: ['Saisie comptable', 'Rapprochement bancaire', 'Déclarations de TVA', 'Excel (tableaux croisés)', 'Logiciel comptable', 'Rigueur et organisation'],
      languages: [
        { name: 'Français', level: 'Langue maternelle' },
        { name: 'Allemand', level: 'Intermédiaire' },
      ],
      interests: 'Course à pied, bénévolat dans une association de quartier (trésorière)',
    },
    tips: [
      { title: 'Le nouveau métier dans le titre', body: 'Le recruteur doit lire votre futur poste avant votre ancien. Mentionnez la reconversion, c’est une force.' },
      { title: 'La formation en premier', body: 'Si elle est récente, placez-la avant l’expérience, avec les stages réalisés.' },
      { title: 'Les compétences transférables', body: 'Dans votre ancien métier, gardez seulement ce qui sert le nouveau : chiffres, gestion, relation client, encadrement.' },
      { title: 'Raccourcissez l’ancien', body: 'Les postes anciens sans lien direct tiennent en une ligne, sans détail.' },
    ],
    keywords: ['Reconversion', 'Compétences transférables', 'Formation', 'Stage', 'CPF', 'Motivation', 'Adaptabilité', 'Rigueur', 'Polyvalence', 'Expérience terrain'],
    summaries: [
      'En reconversion vers la comptabilité après 10 ans dans la vente, titre professionnel obtenu en 2026 et stage en cabinet.',
      'Ancien chef d’équipe en logistique devenu développeur web après une formation intensive, je cherche un premier poste en entreprise.',
    ],
    faq: [
      { q: 'Faut-il expliquer pourquoi on change de métier ?', a: 'Une phrase dans le profil suffit. Gardez l’explication détaillée pour la lettre de motivation ou l’entretien.' },
      { q: 'Faut-il garder toute son ancienne carrière ?', a: 'Oui, sans trou, mais en résumant fortement les postes qui n’ont rien à voir avec le nouveau métier.' },
    ],
  },
];
