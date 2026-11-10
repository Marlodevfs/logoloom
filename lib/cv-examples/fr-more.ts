import type { CvExample } from './fr';

/**
 * Second batch of French CV examples. Fictional people, companies and contacts.
 */
const PHONE = '06 00 00 00 00';

export const CV_EXAMPLES_FR_MORE: CvExample[] = [
  {
    slug: 'chauffeur-livreur',
    job: 'Chauffeur livreur / chauffeuse livreuse',
    short: 'Chauffeur livreur',
    metaTitle: 'Exemple de CV chauffeur livreur gratuit (PDF) – LogoLoom',
    metaDescription:
      'Exemple de CV de chauffeur livreur à modifier gratuitement : permis, tournées, compétences. Téléchargez votre CV en PDF sans compte.',
    intro:
      'Pour un poste de chauffeur livreur, le recruteur regarde d’abord les permis, puis votre fiabilité : ponctualité, aucun accident, colis livrés sans litige. Mettez les permis tout en haut.',
    color: '#155E75',
    cv: {
      layout: 'sidebar',
      fullName: 'Yanis Bernard',
      jobTitle: 'Chauffeur livreur, permis B et C',
      email: 'yanis.bernard@exemple.fr',
      phone: PHONE,
      city: 'Lyon',
      link: '',
      photoUrl: null,
      summary:
        'Chauffeur livreur depuis 5 ans en messagerie et en livraison de magasin. Ponctuel, organisé dans mes tournées et à l’aise avec les clients. Aucun accident responsable depuis le début de ma carrière.',
      experiences: [
        {
          role: 'Chauffeur livreur poids lourd',
          company: 'Trans’Rhône Messagerie',
          location: 'Vénissieux',
          start: '2022',
          end: 'Aujourd’hui',
          details:
            'Tournées de 25 à 40 points de livraison par jour en porteur 19 t\nChargement, calage et contrôle des marchandises\nSaisie des livraisons sur terminal et gestion des réserves\nEntretien courant du véhicule et signalement des anomalies',
        },
        {
          role: 'Livreur VL',
          company: 'Express Colis Lyon',
          location: 'Lyon',
          start: '2020',
          end: '2022',
          details: 'Livraison de 80 à 120 colis par jour en véhicule utilitaire\nTaux de colis livrés au premier passage : 97 %',
        },
      ],
      education: [
        { degree: 'Permis C et FIMO marchandises', school: 'AFTRAL Lyon', start: '2021', end: '2021', details: '' },
        { degree: 'CAP Conducteur livreur de marchandises', school: 'Lycée professionnel Marcel-Sembat, Vénissieux', start: '2017', end: '2019', details: '' },
      ],
      skills: ['Permis B et C', 'FIMO / FCO à jour', 'Hayon et transpalette', 'Optimisation de tournée', 'Terminal de livraison', 'Relation client'],
      languages: [{ name: 'Français', level: 'Langue maternelle' }],
      interests: 'Football, mécanique',
    },
    tips: [
      { title: 'Les permis dans le titre', body: 'Permis B, C, CE, FIMO, FCO, ADR : écrivez-les en haut, c’est le premier filtre.' },
      { title: 'Chiffrez vos tournées', body: 'Nombre de points ou de colis par jour, kilomètres : ça montre que vous tenez le rythme.' },
      { title: 'Parlez de sécurité', body: 'Aucun accident, permis sans retrait de points, entretien du véhicule : c’est très rassurant pour un employeur.' },
      { title: 'Montrez le contact client', body: 'Le livreur est souvent le seul visage de l’entreprise. Une ligne sur la relation client fait la différence.' },
    ],
    keywords: ['Permis B / C / CE', 'FIMO', 'FCO', 'Livraison', 'Tournée', 'Chargement', 'Ponctualité', 'Sécurité routière', 'Relation client', 'Terminal de livraison'],
    summaries: [
      'Chauffeur livreur permis C, 5 ans de messagerie, aucun accident responsable. Organisé, ponctuel et souriant avec les clients.',
      'Livreur en véhicule utilitaire, permis B depuis 8 ans, disponible tôt le matin et le samedi.',
    ],
    faq: [
      { q: 'Faut-il indiquer ses points de permis ?', a: 'Ce n’est pas obligatoire, mais écrire « permis sans retrait de points » peut rassurer un employeur.' },
      { q: 'Comment présenter des missions d’intérim ?', a: 'Regroupez-les en une seule ligne par période, avec le type de véhicule et de livraison.' },
    ],
  },
  {
    slug: 'cuisinier',
    job: 'Cuisinier / cuisinière',
    short: 'Cuisinier',
    metaTitle: 'Exemple de CV cuisinier / cuisinière gratuit (PDF) – LogoLoom',
    metaDescription:
      'Exemple de CV de cuisinier à modifier gratuitement : postes tenus, type de cuisine, couverts, HACCP. Téléchargez le PDF sans compte.',
    intro:
      'En cuisine, le chef veut savoir quel poste vous avez tenu, dans quel type de restaurant et à quel rythme. Soyez précis sur la brigade et le nombre de couverts.',
    color: '#7A2335',
    cv: {
      layout: 'classic',
      fullName: 'Hugo Petit',
      jobTitle: 'Cuisinier, chef de partie',
      email: 'hugo.petit@exemple.fr',
      phone: PHONE,
      city: 'Bordeaux',
      link: '',
      photoUrl: null,
      summary:
        'Cuisinier depuis 6 ans en restaurant traditionnel et bistronomique. Chef de partie chaud, rapide en coup de feu, rigoureux sur l’hygiène et les fiches techniques. J’aime travailler les produits frais et de saison.',
      experiences: [
        {
          role: 'Chef de partie chaud',
          company: 'Le Bistrot des Chartrons',
          location: 'Bordeaux',
          start: '2022',
          end: 'Aujourd’hui',
          details:
            'Poste viandes et sauces, 90 couverts par service\nMise en place, cuissons et dressage selon les fiches techniques\nGestion des commandes de mon poste et de la rotation des stocks\nEncadrement d’un commis et d’un apprenti',
        },
        {
          role: 'Commis de cuisine',
          company: 'Hôtel-restaurant La Garonne',
          location: 'Bordeaux',
          start: '2019',
          end: '2022',
          details: 'Préparations froides et desserts pour 150 couverts\nRéception et contrôle des livraisons',
        },
      ],
      education: [
        { degree: 'CAP Cuisine', school: 'Lycée hôtelier de Talence', start: '2017', end: '2019', details: '' },
        { degree: 'Formation HACCP', school: 'Organisme agréé', start: '2019', end: '2019', details: '' },
      ],
      skills: ['Cuissons', 'Sauces et fonds', 'Dressage', 'Fiches techniques', 'Gestion des stocks', 'HACCP', 'Travail en brigade'],
      languages: [
        { name: 'Français', level: 'Langue maternelle' },
        { name: 'Anglais', level: 'Notions' },
      ],
      interests: 'Marchés de producteurs, pêche',
    },
    tips: [
      { title: 'Nommez votre poste', body: 'Commis, chef de partie, second, poste chaud, froid ou pâtisserie : le chef sait tout de suite où vous placer.' },
      { title: 'Le type de cuisine', body: 'Traditionnelle, bistronomique, gastronomique, collective : chaque cuisine a son rythme.' },
      { title: 'Le nombre de couverts', body: 'Il montre que vous savez tenir un coup de feu.' },
      { title: 'L’hygiène', body: 'HACCP, traçabilité, plan de nettoyage : une ligne suffit, mais elle est attendue.' },
    ],
    keywords: ['Mise en place', 'Cuissons', 'Dressage', 'Fiches techniques', 'HACCP', 'Brigade', 'Coup de feu', 'Gestion des stocks', 'Produits frais', 'Polyvalence'],
    summaries: [
      'Chef de partie chaud, 6 ans en bistronomie, 90 couverts par service. Rapide, propre et attentif au produit.',
      'Commis de cuisine motivé, CAP en poche, prêt à apprendre auprès d’une brigade exigeante.',
    ],
    faq: [
      { q: 'Faut-il mettre des photos de plats ?', a: 'Pas sur le CV. Vous pouvez en revanche ajouter un lien vers un compte Instagram de vos plats dans le champ site web.' },
      { q: 'Comment présenter des saisons ?', a: 'Regroupez-les avec le type d’établissement et le poste tenu, en une ou deux lignes.' },
    ],
  },
  {
    slug: 'infirmier',
    job: 'Infirmier / infirmière',
    short: 'Infirmier',
    metaTitle: 'Exemple de CV infirmier / infirmière gratuit (PDF) – LogoLoom',
    metaDescription:
      'Exemple de CV d’infirmière diplômée d’État à modifier gratuitement : services, compétences techniques, formations. Téléchargez le PDF sans compte.',
    intro:
      'Un CV d’infirmier doit montrer le diplôme d’État et les services où vous avez exercé. Les cadres de santé cherchent des compétences techniques précises et une vraie capacité à travailler en équipe.',
    color: '#155E75',
    cv: {
      layout: 'classic',
      fullName: 'Clara Lemoine',
      jobTitle: 'Infirmière diplômée d’État',
      email: 'clara.lemoine@exemple.fr',
      phone: PHONE,
      city: 'Montpellier',
      link: '',
      photoUrl: null,
      summary:
        'Infirmière diplômée d’État avec 5 ans d’expérience en chirurgie et en médecine. À l’aise avec les soins techniques, organisée dans la gestion des priorités et attentive à la relation avec les patients et leurs proches.',
      experiences: [
        {
          role: 'Infirmière',
          company: 'Centre hospitalier du Littoral, chirurgie orthopédique',
          location: 'Montpellier',
          start: '2022',
          end: 'Aujourd’hui',
          details:
            'Prise en charge de 10 à 12 patients par poste en 12 heures\nSoins pré et postopératoires, pansements complexes, perfusions\nÉducation thérapeutique avant la sortie\nEncadrement des étudiants infirmiers en stage',
        },
        {
          role: 'Infirmière',
          company: 'Clinique Saint-Roch, médecine polyvalente',
          location: 'Montpellier',
          start: '2020',
          end: '2022',
          details: 'Soins et surveillance de 14 patients par poste\nGestion du chariot d’urgence',
        },
      ],
      education: [
        { degree: 'Diplôme d’État d’infirmier', school: 'IFSI de Montpellier', start: '2017', end: '2020', details: '' },
        { degree: 'AFGSU niveau 2', school: 'CESU 34', start: '2024', end: '2024', details: '' },
      ],
      skills: ['Soins techniques', 'Pansements complexes', 'Gestion de la douleur', 'Dossier de soins informatisé', 'Éducation thérapeutique', 'Gestion des priorités'],
      languages: [
        { name: 'Français', level: 'Langue maternelle' },
        { name: 'Anglais', level: 'Intermédiaire (B1)' },
      ],
      interests: 'Course à pied, bénévolat à la Croix-Rouge',
    },
    tips: [
      { title: 'Diplôme d’État en premier', body: 'Indiquez-le dans le titre. Le cadre de santé le cherche avant tout le reste.' },
      { title: 'Les services, avec le volume', body: 'Chirurgie, urgences, réanimation, EHPAD : nommez-les, avec le nombre de patients par poste.' },
      { title: 'Les gestes techniques', body: 'Perfusions, pansements complexes, chambres implantables : citez ce que vous maîtrisez vraiment.' },
      { title: 'Formations complémentaires', body: 'AFGSU, plaies et cicatrisation, douleur, tutorat des étudiants : chaque formation compte.' },
    ],
    keywords: ['Diplôme d’État d’infirmier', 'Soins techniques', 'Surveillance clinique', 'Dossier de soins', 'Éducation thérapeutique', 'Gestion des priorités', 'AFGSU', 'Travail en équipe', 'Tutorat'],
    summaries: [
      'Infirmière DE, 5 ans en chirurgie et en médecine. Sûre dans les soins techniques, calme dans l’urgence.',
      'Jeune infirmier diplômé, stages en réanimation et aux urgences, cherche un premier poste en service aigu.',
    ],
    faq: [
      { q: 'Comment présenter ses stages quand on vient d’être diplômé ?', a: 'Mettez-les dans les expériences avec le service et la durée. Ce sont vos vraies références.' },
      { q: 'Faut-il indiquer son numéro RPPS ?', a: 'Ce n’est pas nécessaire sur le CV. L’employeur le demandera lors de l’embauche.' },
    ],
  },
  {
    slug: 'electricien',
    job: 'Électricien / électricienne',
    short: 'Électricien',
    metaTitle: 'Exemple de CV électricien gratuit (PDF) – LogoLoom',
    metaDescription:
      'Exemple de CV d’électricien bâtiment à modifier gratuitement : habilitations, chantiers, compétences. Téléchargez le PDF sans compte.',
    intro:
      'Pour un électricien, le CV se lit en deux temps : les habilitations et diplômes d’abord, puis les types de chantiers. Précisez neuf ou rénovation, résidentiel ou tertiaire.',
    color: '#383D39',
    cv: {
      layout: 'sidebar',
      fullName: 'Romain Fabre',
      jobTitle: 'Électricien bâtiment, habilitations B2V-BR',
      email: 'romain.fabre@exemple.fr',
      phone: PHONE,
      city: 'Toulouse',
      link: '',
      photoUrl: null,
      summary:
        'Électricien depuis 7 ans en neuf et en rénovation, résidentiel et tertiaire. Autonome sur chantier, de la lecture des plans à la mise en service. Soigneux, respectueux des normes et des délais.',
      experiences: [
        {
          role: 'Électricien',
          company: 'Elec Sud Bâtiment',
          location: 'Toulouse',
          start: '2021',
          end: 'Aujourd’hui',
          details:
            'Installation électrique complète de logements neufs et de bureaux\nPose de tableaux, câblage, courants faibles et éclairage\nMise en service et contrôle selon la norme NF C 15-100\nChef d’équipe sur 2 chantiers de rénovation de 1 200 m²',
        },
        {
          role: 'Électricien (apprentissage puis CDD)',
          company: 'Garcia Électricité',
          location: 'Blagnac',
          start: '2017',
          end: '2021',
          details: 'Rénovation de maisons et d’appartements\nDépannage chez les particuliers',
        },
      ],
      education: [
        { degree: 'Bac pro Métiers de l’électricité et de ses environnements connectés', school: 'Lycée Le Garros, Auch', start: '2015', end: '2018', details: 'En apprentissage' },
        { degree: 'Habilitations électriques B2V, BR, BC', school: 'Organisme agréé', start: '2025', end: '2025', details: 'Recyclage' },
      ],
      skills: ['Lecture de plans', 'NF C 15-100', 'Tableaux électriques', 'Courants faibles', 'Domotique', 'Permis B'],
      languages: [{ name: 'Français', level: 'Langue maternelle' }],
      interests: 'Rugby, bricolage',
    },
    tips: [
      { title: 'Les habilitations visibles', body: 'B1V, B2V, BR, BC, H0 : écrivez-les avec la date du dernier recyclage.' },
      { title: 'Le type de chantier', body: 'Neuf, rénovation, résidentiel, tertiaire, industriel : chaque employeur cherche un profil précis.' },
      { title: 'Votre niveau d’autonomie', body: 'Seul sur chantier, chef d’équipe, en binôme : dites-le clairement.' },
      { title: 'Les normes', body: 'Mentionner la NF C 15-100 montre que vous travaillez dans les règles.' },
    ],
    keywords: ['Habilitations électriques', 'NF C 15-100', 'Lecture de plans', 'Câblage', 'Tableau électrique', 'Mise en service', 'Courants faibles', 'Dépannage', 'Autonomie', 'Permis B'],
    summaries: [
      'Électricien bâtiment, 7 ans en neuf et en rénovation, habilitations B2V-BR à jour. Autonome de la lecture des plans à la mise en service.',
      'Électricien en fin d’apprentissage, bac pro en poche, cherche un CDI en rénovation résidentielle.',
    ],
    faq: [
      { q: 'Où mettre les habilitations ?', a: 'Dans le titre et dans la formation, avec la date de recyclage. Les recruteurs les cherchent en premier.' },
      { q: 'Faut-il parler de ses outils ?', a: 'Seulement s’ils sont spécifiques (logiciels de plans, matériel de mesure). Les outils courants vont de soi.' },
    ],
  },
  {
    slug: 'atsem',
    job: 'ATSEM',
    short: 'ATSEM',
    h1: 'Exemple de CV ATSEM',
    label: 'CV ATSEM',
    metaTitle: 'Exemple de CV ATSEM gratuit (PDF) – LogoLoom',
    metaDescription:
      'Exemple de CV d’ATSEM (agent territorial spécialisé des écoles maternelles) à modifier gratuitement : missions, diplômes, qualités. PDF sans compte.',
    intro:
      'Une mairie qui recrute une ATSEM cherche quelqu’un de doux avec les enfants, fiable avec l’enseignant et rigoureux sur l’hygiène. Le CAP Accompagnant éducatif petite enfance et le concours se mettent en avant.',
    color: '#1F5C4A',
    cv: {
      layout: 'sidebar',
      fullName: 'Émilie Roux',
      jobTitle: 'ATSEM, CAP AEPE',
      email: 'emilie.roux@exemple.fr',
      phone: PHONE,
      city: 'Angers',
      link: '',
      photoUrl: null,
      summary:
        'ATSEM depuis 4 ans en classe de petite et moyenne section. J’accompagne les enfants dans leur autonomie, je prépare les ateliers avec l’enseignante et je veille à l’hygiène de la classe. Patiente et organisée.',
      experiences: [
        {
          role: 'ATSEM contractuelle',
          company: 'Ville d’Angers, école maternelle des Tilleuls',
          location: 'Angers',
          start: '2022',
          end: 'Aujourd’hui',
          details:
            'Accompagnement de 26 enfants de petite section\nPréparation du matériel et animation d’ateliers avec l’enseignante\nAide à l’habillage, au repas et à la sieste\nEntretien et désinfection de la classe et des jouets',
        },
        {
          role: 'Animatrice périscolaire',
          company: 'Accueil de loisirs Les Lutins',
          location: 'Angers',
          start: '2020',
          end: '2022',
          details: 'Animation des temps du midi et du soir\nAccueil des familles',
        },
      ],
      education: [
        { degree: 'CAP Accompagnant éducatif petite enfance (AEPE)', school: 'GRETA Anjou', start: '2019', end: '2020', details: '' },
        { degree: 'BAFA', school: 'UFCV', start: '2018', end: '2018', details: '' },
      ],
      skills: ['Accompagnement de l’enfant', 'Ateliers manuels', 'Hygiène et entretien', 'Travail avec l’enseignant', 'Écoute', 'PSC1'],
      languages: [{ name: 'Français', level: 'Langue maternelle' }],
      interests: 'Loisirs créatifs, chant',
    },
    tips: [
      { title: 'Diplômes et concours', body: 'CAP AEPE, concours d’ATSEM, BAFA, PSC1 : mettez-les bien en vue.' },
      { title: 'Le niveau de classe', body: 'Petite, moyenne ou grande section, avec le nombre d’enfants : c’est concret pour la mairie.' },
      { title: 'Le double rôle', body: 'Montrez à la fois l’aide éducative (ateliers, autonomie) et l’entretien des locaux : les deux font partie du poste.' },
      { title: 'Le travail avec l’enseignant', body: 'La relation avec l’enseignant est centrale. Une ligne sur votre collaboration rassure.' },
    ],
    keywords: ['CAP AEPE', 'Concours ATSEM', 'Petite enfance', 'Accompagnement éducatif', 'Hygiène', 'Ateliers', 'Bienveillance', 'Travail en équipe', 'BAFA', 'PSC1'],
    summaries: [
      'ATSEM depuis 4 ans en petite section, CAP AEPE. Patiente, organisée et complice avec l’enseignante.',
      'Animatrice périscolaire titulaire du BAFA, en préparation du CAP AEPE, cherche un poste d’ATSEM contractuelle.',
    ],
    faq: [
      { q: 'Peut-on être ATSEM sans le concours ?', a: 'Oui, beaucoup de communes recrutent des contractuels. Le CAP AEPE est souvent demandé, le concours permet ensuite d’être titularisé.' },
      { q: 'Faut-il une lettre de motivation ?', a: 'Oui, les mairies la demandent presque toujours. Adressez-la au maire ou au service des ressources humaines.' },
    ],
  },
  {
    slug: 'agent-de-securite',
    job: 'Agent / agente de sécurité',
    short: 'Agent de sécurité',
    metaTitle: 'Exemple de CV agent de sécurité gratuit (PDF) – LogoLoom',
    metaDescription:
      'Exemple de CV d’agent de sécurité à modifier gratuitement : carte professionnelle, SSIAP, missions. Téléchargez votre CV en PDF sans compte.',
    intro:
      'En sécurité privée, la carte professionnelle est obligatoire et c’est la première chose vérifiée. Ensuite viennent le SSIAP, le type de sites et vos horaires possibles.',
    color: '#383D39',
    cv: {
      layout: 'sidebar',
      fullName: 'Samir Haddad',
      jobTitle: 'Agent de sécurité, SSIAP 1, carte pro CNAPS',
      email: 'samir.haddad@exemple.fr',
      phone: PHONE,
      city: 'Paris',
      link: '',
      photoUrl: null,
      summary:
        'Agent de sécurité depuis 6 ans sur des sites tertiaires et commerciaux. Calme, vigilant et courtois. Titulaire du SSIAP 1 et du SST, disponible de jour comme de nuit et le week-end.',
      experiences: [
        {
          role: 'Agent de sécurité incendie (SSIAP 1)',
          company: 'Vigie Sécurité (tour de bureaux)',
          location: 'La Défense',
          start: '2022',
          end: 'Aujourd’hui',
          details:
            'Rondes de sécurité et contrôle des issues de secours\nAccueil et filtrage de 1 500 personnes par jour\nGestion des alarmes et du PC sécurité\nParticipation aux exercices d’évacuation',
        },
        {
          role: 'Agent de prévention et de sécurité',
          company: 'Centre commercial Les Arcades',
          location: 'Noisy-le-Grand',
          start: '2019',
          end: '2022',
          details: 'Surveillance de la galerie et prévention des vols\nGestion des situations conflictuelles',
        },
      ],
      education: [
        { degree: 'Titre professionnel Agent de prévention et de sécurité', school: 'Centre de formation agréé', start: '2019', end: '2019', details: '' },
        { degree: 'SSIAP 1 et SST', school: 'Centre de formation agréé', start: '2021', end: '2021', details: 'Recyclés en 2024' },
      ],
      skills: ['Carte professionnelle CNAPS', 'SSIAP 1', 'SST', 'Rondes et contrôle d’accès', 'Vidéosurveillance', 'Gestion des conflits'],
      languages: [
        { name: 'Français', level: 'Courant' },
        { name: 'Arabe', level: 'Langue maternelle' },
        { name: 'Anglais', level: 'Notions' },
      ],
      interests: 'Sports de combat, course à pied',
    },
    tips: [
      { title: 'Carte pro et diplômes en haut', body: 'Carte CNAPS, SSIAP, SST, H0B0 : un recruteur ne lira pas plus loin s’il ne les voit pas.' },
      { title: 'Le type de site', body: 'Bureaux, commerce, événementiel, industrie, hôpital : chaque site demande des réflexes différents.' },
      { title: 'Le calme avant la force', body: 'Mettez en avant la prévention, l’accueil et la gestion des conflits plutôt que l’intervention.' },
      { title: 'Vos horaires', body: 'Nuit, week-end, 12 heures : indiquez ce que vous acceptez.' },
    ],
    keywords: ['Carte professionnelle CNAPS', 'SSIAP', 'SST', 'Rondes', 'Contrôle d’accès', 'Vidéosurveillance', 'Sécurité incendie', 'Gestion des conflits', 'Vigilance', 'Travail de nuit'],
    summaries: [
      'Agent de sécurité SSIAP 1, 6 ans sur sites tertiaires et commerciaux. Calme, vigilant, disponible de nuit.',
      'Agent de prévention et de sécurité fraîchement diplômé, carte professionnelle obtenue, cherche un premier poste en événementiel.',
    ],
    faq: [
      { q: 'Faut-il indiquer le numéro de carte professionnelle ?', a: 'Vous pouvez simplement écrire « carte professionnelle CNAPS valide ». L’employeur vous demandera le numéro à l’embauche.' },
      { q: 'Comment présenter beaucoup de sites différents ?', a: 'Regroupez-les par employeur ou par type de site, avec la période.' },
    ],
  },
  {
    slug: 'secretaire-medicale',
    job: 'Secrétaire médicale',
    short: 'Secrétaire médicale',
    metaTitle: 'Exemple de CV secrétaire médicale gratuit (PDF) – LogoLoom',
    metaDescription:
      'Exemple de CV de secrétaire médicale à modifier gratuitement : accueil patients, logiciels, terminologie médicale. Téléchargez le PDF sans compte.',
    intro:
      'Une secrétaire médicale est la première personne que voit le patient. Le CV doit montrer l’accueil, la maîtrise des logiciels de prise de rendez-vous et le respect du secret médical.',
    color: '#5B2A6E',
    cv: {
      layout: 'classic',
      fullName: 'Laura Mercier',
      jobTitle: 'Secrétaire médicale',
      email: 'laura.mercier@exemple.fr',
      phone: PHONE,
      city: 'Nice',
      link: '',
      photoUrl: null,
      summary:
        'Secrétaire médicale depuis 5 ans en cabinet de groupe et en centre de radiologie. Accueil chaleureux, agenda tenu sans erreur, frappe rapide des comptes rendus. Discrète et attachée au secret médical.',
      experiences: [
        {
          role: 'Secrétaire médicale',
          company: 'Centre d’imagerie médicale Riviera',
          location: 'Nice',
          start: '2022',
          end: 'Aujourd’hui',
          details:
            'Accueil de 80 à 100 patients par jour\nGestion des rendez-vous de 4 radiologues\nFrappe des comptes rendus et envoi aux médecins prescripteurs\nFacturation, tiers payant et télétransmission',
        },
        {
          role: 'Secrétaire médicale',
          company: 'Cabinet médical des Oliviers (5 médecins)',
          location: 'Antibes',
          start: '2020',
          end: '2022',
          details: 'Accueil physique et téléphonique\nTenue des dossiers patients',
        },
      ],
      education: [
        { degree: 'Titre professionnel Secrétaire assistant médico-social', school: 'AFPA Nice', start: '2019', end: '2020', details: '' },
      ],
      skills: ['Accueil des patients', 'Prise de rendez-vous en ligne', 'Terminologie médicale', 'Frappe rapide', 'Tiers payant', 'Secret médical'],
      languages: [
        { name: 'Français', level: 'Langue maternelle' },
        { name: 'Italien', level: 'Courant (B2)' },
        { name: 'Anglais', level: 'Intermédiaire (B1)' },
      ],
      interests: 'Lecture, natation',
    },
    tips: [
      { title: 'Le volume d’accueil', body: 'Nombre de patients par jour ou de médecins gérés : ça montre votre capacité d’organisation.' },
      { title: 'Les logiciels', body: 'Logiciels de rendez-vous, de dossiers patients, de facturation : nommez ceux que vous utilisez.' },
      { title: 'La terminologie', body: 'Préciser que vous frappez les comptes rendus montre que vous maîtrisez le vocabulaire médical.' },
      { title: 'La discrétion', body: 'Une ligne sur le secret médical rassure toujours un médecin employeur.' },
    ],
    keywords: ['Accueil patients', 'Prise de rendez-vous', 'Dossier patient', 'Terminologie médicale', 'Comptes rendus', 'Facturation', 'Tiers payant', 'Télétransmission', 'Secret médical', 'Organisation'],
    summaries: [
      'Secrétaire médicale, 5 ans en cabinet et en imagerie. Accueil chaleureux, agenda impeccable, comptes rendus frappés vite et bien.',
      'Assistante administrative en reconversion vers le secrétariat médical, titre professionnel obtenu en 2026.',
    ],
    faq: [
      { q: 'Faut-il un diplôme ?', a: 'Ce n’est pas toujours exigé, mais un titre professionnel de secrétaire médicale ou médico-social est un vrai plus.' },
      { q: 'Faut-il parler des langues ?', a: 'Oui, surtout en zone touristique ou frontalière : accueillir un patient dans sa langue est très apprécié.' },
    ],
  },
  {
    slug: 'mecanicien-automobile',
    job: 'Mécanicien / mécanicienne automobile',
    short: 'Mécanicien auto',
    metaTitle: 'Exemple de CV mécanicien automobile gratuit (PDF) – LogoLoom',
    metaDescription:
      'Exemple de CV de mécanicien automobile à modifier gratuitement : diagnostic, entretien, marques, diplômes. Téléchargez le PDF sans compte.',
    intro:
      'Un chef d’atelier cherche un mécanicien autonome sur le diagnostic, rapide sur l’entretien et soigneux avec les véhicules des clients. Citez les marques que vous connaissez et vos habilitations.',
    color: '#2340A8',
    cv: {
      layout: 'sidebar',
      fullName: 'Kevin Marchand',
      jobTitle: 'Mécanicien automobile, habilitation véhicules électriques',
      email: 'kevin.marchand@exemple.fr',
      phone: PHONE,
      city: 'Rouen',
      link: '',
      photoUrl: null,
      summary:
        'Mécanicien automobile depuis 6 ans en concession et en garage indépendant. Autonome sur le diagnostic électronique, l’entretien et la distribution. Habilité à intervenir sur les véhicules électriques et hybrides.',
      experiences: [
        {
          role: 'Mécanicien automobile',
          company: 'Garage Normandie Auto (concession multimarque)',
          location: 'Rouen',
          start: '2021',
          end: 'Aujourd’hui',
          details:
            'Entretien, révisions et réparations, 6 à 8 véhicules par jour\nDiagnostic électronique avec valise constructeur\nRemplacement de distributions, embrayages et trains roulants\nIntervention sur véhicules hybrides et électriques',
        },
        {
          role: 'Mécanicien (apprentissage)',
          company: 'Garage du Centre',
          location: 'Elbeuf',
          start: '2018',
          end: '2021',
          details: 'Vidanges, freinage, pneumatiques\nPréparation des véhicules d’occasion',
        },
      ],
      education: [
        { degree: 'Bac pro Maintenance des véhicules, option voitures particulières', school: 'CFA de l’automobile, Rouen', start: '2017', end: '2020', details: 'En apprentissage' },
        { degree: 'Habilitation électrique véhicules électriques et hybrides', school: 'Organisme agréé', start: '2023', end: '2023', details: '' },
      ],
      skills: ['Diagnostic électronique', 'Entretien et révision', 'Distribution', 'Freinage et liaison au sol', 'Climatisation', 'Véhicules hybrides et électriques'],
      languages: [{ name: 'Français', level: 'Langue maternelle' }],
      interests: 'Sport automobile, restauration de motos',
    },
    tips: [
      { title: 'Le diagnostic', body: 'C’est la compétence la plus recherchée. Citez les outils et les marques que vous connaissez.' },
      { title: 'Électrique et hybride', body: 'Une habilitation sur ces véhicules est un vrai atout aujourd’hui : mettez-la dans le titre.' },
      { title: 'Le rythme', body: 'Nombre de véhicules par jour : ça montre votre efficacité.' },
      { title: 'Le soin', body: 'Un mot sur la propreté et le respect des véhicules clients rassure un chef d’atelier.' },
    ],
    keywords: ['Diagnostic', 'Entretien', 'Révision', 'Distribution', 'Freinage', 'Électronique embarquée', 'Véhicules hybrides et électriques', 'Climatisation', 'Autonomie', 'Rigueur'],
    summaries: [
      'Mécanicien auto, 6 ans en concession, autonome sur le diagnostic et habilité sur les véhicules électriques.',
      'Jeune mécanicien sorti d’apprentissage, bac pro en poche, motivé pour progresser vers le diagnostic.',
    ],
    faq: [
      { q: 'Faut-il citer les marques ?', a: 'Oui, surtout si vous postulez en concession. Les constructeurs préfèrent des mécaniciens qui connaissent leurs véhicules.' },
      { q: 'Où mettre le permis ?', a: 'Dans les compétences. Il est souvent utile pour les essais et les déplacements de véhicules.' },
    ],
  },
  {
    slug: 'conseiller-clientele-banque',
    job: 'Conseiller / conseillère clientèle en banque',
    short: 'Conseiller bancaire',
    metaTitle: 'Exemple de CV conseiller clientèle bancaire gratuit (PDF) – LogoLoom',
    metaDescription:
      'Exemple de CV de conseiller clientèle en banque à modifier gratuitement : portefeuille, objectifs, certification AMF. Téléchargez le PDF sans compte.',
    intro:
      'En banque, le CV doit montrer trois choses : la relation client, les résultats commerciaux et la rigueur réglementaire. La certification AMF est souvent demandée.',
    color: '#2340A8',
    cv: {
      layout: 'classic',
      fullName: 'Mathilde Chevalier',
      jobTitle: 'Conseillère clientèle particuliers',
      email: 'mathilde.chevalier@exemple.fr',
      phone: PHONE,
      city: 'Lille',
      link: 'linkedin.com/in/mathilde-chevalier',
      photoUrl: null,
      summary:
        'Conseillère clientèle particuliers depuis 4 ans en agence. Je gère un portefeuille de 600 clients, j’accompagne leurs projets d’épargne et de crédit et je dépasse régulièrement mes objectifs. Certifiée AMF.',
      experiences: [
        {
          role: 'Conseillère clientèle particuliers',
          company: 'Banque Régionale du Nord, agence Lille Centre',
          location: 'Lille',
          start: '2022',
          end: 'Aujourd’hui',
          details:
            'Gestion d’un portefeuille de 600 clients particuliers\nVente de crédits immobiliers, d’épargne et d’assurances (108 % de l’objectif en 2025)\nOuverture de comptes et contrôles de conformité\nRendez-vous de bilan patrimonial',
        },
        {
          role: 'Chargée d’accueil (alternance)',
          company: 'Crédit des Flandres',
          location: 'Roubaix',
          start: '2020',
          end: '2022',
          details: 'Accueil et orientation des clients\nOpérations courantes au guichet',
        },
      ],
      education: [
        { degree: 'BTS Banque, conseiller de clientèle', school: 'Lycée Gaston-Berger, Lille', start: '2020', end: '2022', details: 'En alternance' },
        { degree: 'Certification AMF', school: 'Organisme certifié', start: '2022', end: '2022', details: '' },
      ],
      skills: ['Gestion de portefeuille', 'Crédit immobilier', 'Épargne et assurance', 'Conformité', 'Prospection', 'Négociation'],
      languages: [
        { name: 'Français', level: 'Langue maternelle' },
        { name: 'Anglais', level: 'Professionnel (B2)' },
      ],
      interests: 'Tennis, finances personnelles',
    },
    tips: [
      { title: 'La taille du portefeuille', body: 'Nombre de clients, type de clientèle : c’est le premier repère pour un directeur d’agence.' },
      { title: 'Vos résultats', body: 'Pourcentage d’objectif, production de crédits : un chiffre vaut plus qu’une longue phrase.' },
      { title: 'La conformité', body: 'Certification AMF, contrôles, lutte anti-blanchiment : la rigueur réglementaire est attendue.' },
      { title: 'La relation de confiance', body: 'Montrez que vous accompagnez les clients sur la durée, pas seulement que vous vendez.' },
    ],
    keywords: ['Conseil clientèle', 'Portefeuille clients', 'Crédit immobilier', 'Épargne', 'Assurance', 'Certification AMF', 'Conformité', 'Objectifs commerciaux', 'Prospection', 'Fidélisation'],
    summaries: [
      'Conseillère clientèle particuliers, 4 ans en agence, 600 clients, 108 % d’objectif. Certifiée AMF.',
      'Diplômé d’un BTS Banque en alternance, à l’aise avec l’accueil et les opérations courantes, cherche un premier poste de conseiller.',
    ],
    faq: [
      { q: 'La certification AMF est-elle obligatoire ?', a: 'Elle est souvent exigée pour conseiller des produits financiers. Si vous l’avez, mettez-la bien en vue.' },
      { q: 'Faut-il chiffrer ses résultats ?', a: 'Oui, si vous pouvez le faire sans révéler d’information confidentielle. Un pourcentage d’objectif est généralement suffisant.' },
    ],
  },
  {
    slug: 'agent-d-accueil',
    job: 'Agent / agente d’accueil',
    short: 'Agent d’accueil',
    metaTitle: 'Exemple de CV agent d’accueil gratuit (PDF) – LogoLoom',
    metaDescription:
      'Exemple de CV d’agent d’accueil à modifier gratuitement : accueil physique et téléphonique, standard, qualités. Téléchargez le PDF sans compte.',
    intro:
      'L’agent d’accueil représente l’entreprise. Le recruteur cherche une présentation soignée, une vraie aisance relationnelle et de l’organisation pour gérer plusieurs demandes à la fois.',
    color: '#155E75',
    cv: {
      layout: 'sidebar',
      fullName: 'Chloé Gauthier',
      jobTitle: 'Hôtesse d’accueil en entreprise',
      email: 'chloe.gauthier@exemple.fr',
      phone: PHONE,
      city: 'Paris',
      link: '',
      photoUrl: null,
      summary:
        'Hôtesse d’accueil depuis 4 ans en entreprise et en événementiel. Souriante, organisée et à l’aise en anglais. Je gère le standard, les visiteurs et les salles de réunion sans jamais perdre le fil.',
      experiences: [
        {
          role: 'Hôtesse d’accueil standardiste',
          company: 'Accueil Plus (prestataire, siège d’un groupe industriel)',
          location: 'Paris 8e',
          start: '2022',
          end: 'Aujourd’hui',
          details:
            'Accueil de 150 visiteurs par jour et remise des badges\nStandard téléphonique (environ 200 appels par jour)\nRéservation des salles de réunion et des taxis\nRéception et distribution du courrier et des colis',
        },
        {
          role: 'Hôtesse événementielle',
          company: 'Missions ponctuelles',
          location: 'Paris',
          start: '2020',
          end: '2022',
          details: 'Accueil sur salons professionnels et congrès\nOrientation du public et gestion des vestiaires',
        },
      ],
      education: [
        { degree: 'Bac pro Métiers de l’accueil', school: 'Lycée Jean-Jaurès, Montreuil', start: '2017', end: '2020', details: '' },
      ],
      skills: ['Accueil physique et téléphonique', 'Standard', 'Gestion des visiteurs', 'Réservation de salles', 'Pack Office', 'Présentation soignée'],
      languages: [
        { name: 'Français', level: 'Langue maternelle' },
        { name: 'Anglais', level: 'Courant (B2)' },
        { name: 'Espagnol', level: 'Intermédiaire (B1)' },
      ],
      interests: 'Danse, voyages',
    },
    tips: [
      { title: 'Le volume', body: 'Visiteurs et appels par jour : ça montre que vous gardez le sourire sous pression.' },
      { title: 'Les langues', body: 'L’anglais est souvent demandé, surtout dans les sièges sociaux et l’événementiel.' },
      { title: 'Les tâches annexes', body: 'Courrier, salles, taxis, badges : listez-les, elles font partie du poste.' },
      { title: 'Une photo soignée', body: 'Pour l’accueil, une photo professionnelle est souvent un plus. Elle reste facultative.' },
    ],
    keywords: ['Accueil physique', 'Standard téléphonique', 'Gestion des visiteurs', 'Orientation', 'Courrier', 'Réservation de salles', 'Anglais', 'Présentation', 'Sens du service', 'Organisation'],
    summaries: [
      'Hôtesse d’accueil, 4 ans en entreprise et en événementiel, anglais courant. Souriante et organisée, même aux heures de pointe.',
      'Agent d’accueil polyvalent, à l’aise au standard et avec les outils bureautiques, cherche un poste en administration.',
    ],
    faq: [
      { q: 'Faut-il mettre une photo ?', a: 'Ce n’est pas obligatoire, mais pour un poste d’accueil une photo professionnelle est souvent bien reçue.' },
      { q: 'Comment présenter des missions d’hôtesse ponctuelles ?', a: 'Regroupez-les en une seule expérience avec la période et le type d’événements.' },
    ],
  },
];
