import type { CvCustomContent } from '@/types';
import { CV_EXAMPLES_FR_MORE } from './fr-more';
import { CV_EXAMPLES_FR_BATCH3_JOBS, CV_EXAMPLES_FR_BATCH3_SITUATIONS } from './fr-batch3';

/**
 * CV examples per job (French). Every person, company, email and phone number
 * is fictional: the examples show what to write, the visitor replaces it.
 */
export interface CvExample {
  slug: string;
  /** Job as people search it, e.g. "vendeur" → "Vendeur / vendeuse". */
  job: string;
  /** Short label for lists and links. */
  short: string;
  /** Overrides "Exemple de CV <job>" when lowercasing the job would be wrong. */
  h1?: string;
  /** Overrides "CV <short>" in lists. */
  label?: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  color: string;
  cv: CvCustomContent;
  tips: { title: string; body: string }[];
  keywords: string[];
  summaries: string[];
  faq: { q: string; a: string }[];
}

const PHONE = '06 00 00 00 00';

const BASE: CvExample[] = [
  {
    slug: 'vendeur',
    job: 'Vendeur / vendeuse',
    short: 'Vendeur',
    metaTitle: 'Exemple de CV vendeur / vendeuse gratuit (PDF) – LogoLoom',
    metaDescription:
      'Un exemple de CV de vendeur en boutique à reprendre gratuitement : profil, missions chiffrées, compétences attendues. Modifiez-le et téléchargez le PDF, sans compte.',
    intro:
      'En vente, le recruteur cherche trois choses : que vous aimez le contact client, que vous savez vendre, et que vous êtes fiable sur la caisse et le rayon. Ce CV les montre avec des chiffres simples.',
    color: '#7A2335',
    cv: {
      layout: 'sidebar',
      fullName: 'Inès Laurent',
      jobTitle: 'Vendeuse en prêt-à-porter',
      email: 'ines.laurent@exemple.fr',
      phone: PHONE,
      city: 'Bordeaux',
      link: '',
      photoUrl: null,
      summary:
        'Vendeuse depuis 4 ans en boutique de prêt-à-porter. J’aime conseiller, trouver la bonne taille du premier coup et faire revenir les clients. À l’aise en caisse, en réassort et pendant les soldes.',
      experiences: [
        {
          role: 'Vendeuse',
          company: 'Boutique Garance',
          location: 'Bordeaux',
          start: '2022',
          end: 'Aujourd’hui',
          details:
            'Conseil client et vente additionnelle (panier moyen +15 % en un an)\nTenue de caisse et clôture quotidienne\nRéception des livraisons, réassort et mise en rayon\nMise en place des vitrines selon le plan merchandising',
        },
        {
          role: 'Vendeuse saisonnière',
          company: 'Maison Lescure',
          location: 'Arcachon',
          start: '2020',
          end: '2022',
          details: 'Vente en période estivale et pendant les soldes\nInventaire de fin de saison',
        },
      ],
      education: [
        { degree: 'Bac pro Métiers du commerce et de la vente', school: 'Lycée Jean-Moulin, Bordeaux', start: '2017', end: '2020', details: '' },
      ],
      skills: ['Conseil client', 'Vente additionnelle', 'Encaissement', 'Merchandising', 'Réassort', 'Gestion des stocks', 'Travail en équipe'],
      languages: [
        { name: 'Français', level: 'Langue maternelle' },
        { name: 'Anglais', level: 'Intermédiaire (B1)' },
      ],
      interests: 'Mode et friperie, danse, bénévolat aux Restos du cœur',
    },
    tips: [
      { title: 'Chiffrez au moins une réussite', body: 'Un panier moyen, un objectif atteint, un nombre de clients par jour : un seul chiffre rend tout le CV plus crédible.' },
      { title: 'Montrez la polyvalence', body: 'Caisse, réception des livraisons, vitrine, inventaire : les petites boutiques cherchent quelqu’un qui sait tout faire.' },
      { title: 'Parlez du produit', body: 'Si vous postulez dans le même univers (mode, sport, high-tech), dites-le dans le titre et le profil.' },
      { title: 'Indiquez vos disponibilités', body: 'Week-ends, soldes, fêtes : c’est souvent décisif en commerce. Une phrase dans le profil suffit.' },
    ],
    keywords: ['Accueil client', 'Conseil personnalisé', 'Vente additionnelle', 'Encaissement', 'Fidélisation', 'Merchandising', 'Réassort', 'Inventaire', 'Objectifs de vente', 'Polyvalence'],
    summaries: [
      'Vendeuse avec 4 ans d’expérience en prêt-à-porter. Je conseille avec franchise, je tiens la caisse sans erreur et je suis disponible le week-end.',
      'Vendeur en magasin de sport, passionné de running. J’aime faire essayer, expliquer la différence entre deux modèles et voir les clients revenir.',
    ],
    faq: [
      { q: 'Faut-il mettre une photo sur un CV de vendeur ?', a: 'Ce n’est pas obligatoire. En vente, une photo souriante et soignée est souvent bien reçue, mais un CV sans photo ne vous pénalisera pas.' },
      { q: 'Que mettre quand on n’a jamais travaillé en vente ?', a: 'Mettez en avant tout ce qui touche au contact : jobs d’été, accueil, associations, stages. Et écrivez dans le profil pourquoi la vente vous attire.' },
    ],
  },
  {
    slug: 'caissier',
    job: 'Caissier / caissière',
    short: 'Caissier',
    metaTitle: 'Exemple de CV caissier / caissière gratuit (PDF) – LogoLoom',
    metaDescription:
      'Exemple de CV de caissière en supermarché à modifier gratuitement : missions, compétences, profil. Téléchargez votre CV en PDF sans créer de compte.',
    intro:
      'Pour un poste en caisse, le recruteur veut être rassuré sur deux points : la rigueur avec l’argent et la gentillesse avec les clients, même aux heures de pointe. Le CV doit être court et clair.',
    color: '#155E75',
    cv: {
      layout: 'classic',
      fullName: 'Sarah Benali',
      jobTitle: 'Hôtesse de caisse',
      email: 'sarah.benali@exemple.fr',
      phone: PHONE,
      city: 'Lille',
      link: '',
      photoUrl: null,
      summary:
        'Hôtesse de caisse depuis 3 ans en hypermarché. Caisse juste à chaque clôture, accueil souriant et calme aux heures de pointe. Disponible en horaires décalés et le dimanche matin.',
      experiences: [
        {
          role: 'Hôtesse de caisse',
          company: 'Hypermarché Grand Nord',
          location: 'Lille',
          start: '2023',
          end: 'Aujourd’hui',
          details:
            'Encaissement de 250 à 300 clients par jour (espèces, carte, titres-restaurant)\nOuverture et clôture de caisse, sans écart sur l’année\nAccueil au point information et gestion des retours\nFormation de 4 nouvelles hôtesses',
        },
        {
          role: 'Employée libre-service (job étudiant)',
          company: 'Supérette du Vieux-Lille',
          location: 'Lille',
          start: '2021',
          end: '2023',
          details: 'Mise en rayon et contrôle des dates\nRemplacement en caisse le samedi',
        },
      ],
      education: [
        { degree: 'CAP Équipier polyvalent du commerce', school: 'Lycée Gustave-Eiffel, Lille', start: '2019', end: '2021', details: '' },
      ],
      skills: ['Encaissement', 'Rendu de monnaie', 'Accueil client', 'Gestion des litiges', 'Self-checkout', 'Rigueur'],
      languages: [
        { name: 'Français', level: 'Langue maternelle' },
        { name: 'Arabe', level: 'Courant' },
      ],
      interests: 'Cuisine, handball en club',
    },
    tips: [
      { title: 'Mettez en avant la fiabilité', body: '« Aucun écart de caisse », « clôture seule » : c’est ce qu’un manager veut lire en premier.' },
      { title: 'Donnez un volume', body: 'Le nombre de clients par jour montre que vous tenez le rythme. Une estimation honnête suffit.' },
      { title: 'Citez les moyens de paiement', body: 'Espèces, carte, chèques, titres-restaurant, caisses automatiques : ça montre que rien ne vous surprendra.' },
      { title: 'Précisez vos horaires possibles', body: 'Soirées, week-ends, jours fériés : en grande distribution, la disponibilité compte autant que l’expérience.' },
    ],
    keywords: ['Encaissement', 'Ouverture et clôture de caisse', 'Rendu de monnaie', 'Accueil', 'Gestion des files d’attente', 'Retours et échanges', 'Caisses automatiques', 'Rigueur', 'Amabilité'],
    summaries: [
      'Caissière rigoureuse avec 3 ans d’expérience en hypermarché. Aucune erreur de caisse, accueil souriant même le samedi.',
      'Étudiant disponible le week-end, à l’aise avec les chiffres et le contact client. Première expérience en caisse lors d’un job d’été.',
    ],
    faq: [
      { q: 'Un CV de caissière doit-il tenir sur une page ?', a: 'Oui. Une page suffit largement : profil, deux ou trois expériences, formation, compétences.' },
      { q: 'Faut-il une formation pour être caissier ?', a: 'Non, la plupart des enseignes forment sur place. Mettez plutôt en avant votre sérieux, votre aisance avec les chiffres et vos disponibilités.' },
    ],
  },
  {
    slug: 'serveur',
    job: 'Serveur / serveuse',
    short: 'Serveur',
    metaTitle: 'Exemple de CV serveur / serveuse gratuit (PDF) – LogoLoom',
    metaDescription:
      'Exemple de CV de serveur en restauration à reprendre gratuitement : service en salle, compétences, profil. Modifiez et téléchargez en PDF, sans compte.',
    intro:
      'En restauration, on embauche vite. Le patron lit votre CV en quelques secondes : type d’établissement, nombre de couverts, ce que vous savez faire (bar, vin, plateau). Allez droit au but.',
    color: '#1F5C4A',
    cv: {
      layout: 'sidebar',
      fullName: 'Lucas Moreau',
      jobTitle: 'Serveur en restauration traditionnelle',
      email: 'lucas.moreau@exemple.fr',
      phone: PHONE,
      city: 'Nantes',
      link: '',
      photoUrl: null,
      summary:
        'Serveur depuis 5 ans en brasserie et en restaurant traditionnel. Rapide en coup de feu, à l’aise au bar et avec les accords mets-vins simples. Disponible en coupure, le soir et le week-end.',
      experiences: [
        {
          role: 'Chef de rang',
          company: 'Brasserie du Port',
          location: 'Nantes',
          start: '2022',
          end: 'Aujourd’hui',
          details:
            'Service de 120 à 180 couverts par service, en équipe de 6\nPrise de commande sur tablette et encaissement\nConseil sur les vins et les plats du jour\nFormation des extras pendant la saison',
        },
        {
          role: 'Serveur',
          company: 'Le Comptoir des Halles',
          location: 'Nantes',
          start: '2019',
          end: '2022',
          details: 'Service en salle et en terrasse (80 couverts)\nPréparation des boissons au bar et des cafés',
        },
      ],
      education: [
        { degree: 'CAP Commercialisation et services en hôtel-café-restaurant', school: 'Lycée hôtelier Sainte-Anne, Saint-Nazaire', start: '2017', end: '2019', details: '' },
      ],
      skills: ['Service à l’assiette', 'Port de plateau', 'Bar et cafés', 'Prise de commande sur tablette', 'Encaissement', 'Accords mets-vins', 'Hygiène HACCP'],
      languages: [
        { name: 'Français', level: 'Langue maternelle' },
        { name: 'Anglais', level: 'Courant (B2)' },
      ],
      interests: 'Œnologie, football, voyages',
    },
    tips: [
      { title: 'Donnez le nombre de couverts', body: '« 150 couverts par service » dit tout de suite à quel rythme vous savez travailler.' },
      { title: 'Nommez le type d’établissement', body: 'Brasserie, gastronomique, plage, hôtel : chaque patron cherche quelqu’un qui connaît son univers.' },
      { title: 'Valorisez les langues', body: 'En zone touristique, l’anglais ou l’espagnol peut faire la différence avec un autre candidat.' },
      { title: 'Restez sur une page', body: 'Les extras et saisons peuvent être regroupés en une seule ligne : « Saisons d’été 2019 à 2021, restaurants de plage ».' },
    ],
    keywords: ['Service en salle', 'Prise de commande', 'Port de plateau', 'Bar', 'Encaissement', 'Mise en place', 'Accueil', 'HACCP', 'Travail en coupure', 'Rapidité'],
    summaries: [
      'Serveur avec 5 ans d’expérience en brasserie. Rapide, souriant, à l’aise avec 150 couverts et avec les clients anglophones.',
      'Serveuse polyvalente, salle et bar, disponible pour la saison d’été en zone touristique.',
    ],
    faq: [
      { q: 'Comment présenter des extras ou des saisons ?', a: 'Regroupez-les en une seule expérience avec une période et le type d’établissement. Le recruteur voit l’expérience cumulée sans lire dix lignes.' },
      { q: 'Faut-il mentionner la formation HACCP ?', a: 'Oui, si vous l’avez : c’est un vrai plus en restauration, même pour un poste en salle.' },
    ],
  },
  {
    slug: 'aide-soignant',
    job: 'Aide-soignant / aide-soignante',
    short: 'Aide-soignant',
    metaTitle: 'Exemple de CV aide-soignant(e) gratuit (PDF) – LogoLoom',
    metaDescription:
      'Exemple de CV d’aide-soignante en EHPAD ou à l’hôpital à modifier gratuitement : soins, compétences, diplôme. Téléchargez le PDF, sans compte.',
    intro:
      'Un CV d’aide-soignant doit montrer le diplôme (DEAS) tout de suite, puis les services où vous avez travaillé. Les établissements cherchent aussi des qualités humaines : patience, écoute, travail en équipe.',
    color: '#155E75',
    cv: {
      layout: 'classic',
      fullName: 'Nadia Fontaine',
      jobTitle: 'Aide-soignante diplômée d’État',
      email: 'nadia.fontaine@exemple.fr',
      phone: PHONE,
      city: 'Toulouse',
      link: '',
      photoUrl: null,
      summary:
        'Aide-soignante diplômée d’État avec 6 ans d’expérience en EHPAD et en service de médecine. Attentive au confort et à la dignité des patients, habituée au travail de nuit et aux transmissions en équipe.',
      experiences: [
        {
          role: 'Aide-soignante',
          company: 'EHPAD Les Tilleuls',
          location: 'Toulouse',
          start: '2021',
          end: 'Aujourd’hui',
          details:
            'Soins d’hygiène et de confort pour 14 résidents par poste\nAide aux repas, à la mobilité et prévention des chutes\nSurveillance des constantes et transmissions écrites\nAccompagnement des familles et des résidents en fin de vie',
        },
        {
          role: 'Aide-soignante',
          company: 'Clinique Saint-Exupère',
          location: 'Toulouse',
          start: '2018',
          end: '2021',
          details: 'Service de médecine polyvalente (28 lits)\nPréparation des chambres et entretien du matériel',
        },
      ],
      education: [
        { degree: 'Diplôme d’État d’aide-soignant (DEAS)', school: 'IFAS du CHU de Toulouse', start: '2017', end: '2018', details: '' },
        { degree: 'AFGSU niveau 2', school: 'CESU 31', start: '2023', end: '2023', details: 'Gestes et soins d’urgence' },
      ],
      skills: ['Soins d’hygiène et de confort', 'Prise des constantes', 'Manutention des patients', 'Prévention des escarres', 'Transmissions', 'Logiciel de soins'],
      languages: [
        { name: 'Français', level: 'Langue maternelle' },
        { name: 'Espagnol', level: 'Notions' },
      ],
      interests: 'Randonnée, chorale',
    },
    tips: [
      { title: 'Le diplôme en premier', body: 'Écrivez « diplômée d’État » dès le titre : c’est la première chose que cherche le cadre de santé.' },
      { title: 'Précisez les services', body: 'EHPAD, gériatrie, chirurgie, soins à domicile : nommez-les, avec le nombre de patients ou de lits.' },
      { title: 'Ajoutez vos formations courtes', body: 'AFGSU, manutention, bientraitance, soins palliatifs : chaque formation rassure.' },
      { title: 'Parlez des horaires', body: 'Jour, nuit, 12 heures, week-ends : dites ce que vous acceptez pour gagner du temps à l’entretien.' },
    ],
    keywords: ['DEAS', 'Soins d’hygiène', 'Confort du patient', 'Constantes', 'Transmissions', 'Bientraitance', 'Manutention', 'Prévention des chutes', 'AFGSU', 'Travail en équipe'],
    summaries: [
      'Aide-soignante DE avec 6 ans d’expérience en EHPAD. Douce, organisée, habituée aux nuits et aux transmissions.',
      'Jeune diplômé du DEAS, stages en chirurgie et en gériatrie, motivé pour rejoindre une équipe hospitalière.',
    ],
    faq: [
      { q: 'Comment présenter ses stages de formation ?', a: 'Si vous venez d’être diplômé, mettez vos stages dans les expériences, avec le service et la durée. C’est votre vraie expérience terrain.' },
      { q: 'Faut-il une photo ?', a: 'Ce n’est pas demandé. Si vous en mettez une, choisissez une photo simple et professionnelle.' },
    ],
  },
  {
    slug: 'auxiliaire-de-vie',
    job: 'Auxiliaire de vie',
    short: 'Auxiliaire de vie',
    metaTitle: 'Exemple de CV auxiliaire de vie gratuit (PDF) – LogoLoom',
    metaDescription:
      'Exemple de CV d’auxiliaire de vie à domicile à modifier gratuitement : missions, qualités, diplômes. Téléchargez votre CV en PDF sans compte.',
    intro:
      'Une auxiliaire de vie entre chez les gens. Le recruteur, souvent une agence d’aide à domicile, cherche quelqu’un de fiable, autonome et mobile. Le permis et le véhicule sont à écrire noir sur blanc.',
    color: '#1F5C4A',
    cv: {
      layout: 'sidebar',
      fullName: 'Sophie Garnier',
      jobTitle: 'Auxiliaire de vie sociale',
      email: 'sophie.garnier@exemple.fr',
      phone: PHONE,
      city: 'Dijon',
      link: '',
      photoUrl: null,
      summary:
        'Auxiliaire de vie depuis 7 ans auprès de personnes âgées et en situation de handicap. Autonome, ponctuelle et discrète. J’accompagne les gestes du quotidien en laissant à chacun le plus d’autonomie possible.',
      experiences: [
        {
          role: 'Auxiliaire de vie sociale',
          company: 'Association Bien Chez Soi',
          location: 'Dijon et alentours',
          start: '2019',
          end: 'Aujourd’hui',
          details:
            'Accompagnement de 8 bénéficiaires par semaine à domicile\nAide à la toilette, à l’habillage et aux repas\nCourses, entretien du logement et sorties\nLiens réguliers avec les familles et l’infirmière coordinatrice',
        },
        {
          role: 'Agent de service hospitalier',
          company: 'Résidence Les Charmilles',
          location: 'Beaune',
          start: '2017',
          end: '2019',
          details: 'Service des repas et entretien des chambres\nAide ponctuelle aux soignants',
        },
      ],
      education: [
        { degree: 'DEAES, spécialité vie à domicile', school: 'IRTESS de Bourgogne', start: '2018', end: '2019', details: '' },
      ],
      skills: ['Permis B et véhicule', 'Aide à la toilette', 'Préparation des repas', 'Transferts lit-fauteuil', 'Entretien du logement', 'Écoute', 'Autonomie'],
      languages: [{ name: 'Français', level: 'Langue maternelle' }],
      interests: 'Jardinage, couture',
    },
    tips: [
      { title: 'Écrivez « permis B, véhicule »', body: 'Pour l’aide à domicile, c’est souvent éliminatoire. Mettez-le bien en vue, en tête de vos compétences.' },
      { title: 'Décrivez les publics', body: 'Personnes âgées, handicap, maladie d’Alzheimer, enfants : dites avec qui vous avez l’habitude de travailler.' },
      { title: 'Montrez l’autonomie', body: 'Plannings, nombre de bénéficiaires, liens avec les familles : le recruteur veut savoir que vous gérez seule.' },
      { title: 'Citez vos diplômes et formations', body: 'DEAES, titre ADVF, formation Alzheimer ou gestes de premiers secours : tout compte.' },
    ],
    keywords: ['Aide à domicile', 'Accompagnement', 'Aide à la toilette', 'Repas', 'Transferts', 'Autonomie', 'Bienveillance', 'Discrétion', 'Permis B', 'DEAES / ADVF'],
    summaries: [
      'Auxiliaire de vie avec 7 ans d’expérience à domicile. Autonome, véhiculée, à l’écoute des personnes âgées et de leurs familles.',
      'Reconversion vers l’aide à la personne après 10 ans dans le commerce. Titre ADVF obtenu en 2026, motivée et véhiculée.',
    ],
    faq: [
      { q: 'Peut-on devenir auxiliaire de vie sans diplôme ?', a: 'Oui, beaucoup d’agences recrutent sans diplôme. Mettez en avant votre expérience auprès de proches, vos qualités et votre permis.' },
      { q: 'Où mettre le permis de conduire ?', a: 'Près de vos coordonnées ou dans les compétences, pour qu’il soit vu en premier.' },
    ],
  },
  {
    slug: 'assistant-administratif',
    job: 'Assistant(e) administratif(ve)',
    short: 'Assistant administratif',
    metaTitle: 'Exemple de CV assistant(e) administratif(ve) gratuit (PDF) – LogoLoom',
    metaDescription:
      'Exemple de CV d’assistante administrative à modifier gratuitement : missions, logiciels, compétences. Téléchargez le PDF, sans compte ni abonnement.',
    intro:
      'Pour un poste d’assistant, le CV est déjà un test : il doit être net, bien aligné et sans faute. Listez vos missions concrètes et les logiciels que vous maîtrisez.',
    color: '#2340A8',
    cv: {
      layout: 'classic',
      fullName: 'Julie Perrin',
      jobTitle: 'Assistante administrative',
      email: 'julie.perrin@exemple.fr',
      phone: PHONE,
      city: 'Rennes',
      link: 'linkedin.com/in/julie-perrin',
      photoUrl: null,
      summary:
        'Assistante administrative avec 5 ans d’expérience en PME. Organisée et discrète, je gère l’agenda, le courrier, la facturation et l’accueil pour que l’équipe puisse se concentrer sur son métier.',
      experiences: [
        {
          role: 'Assistante administrative et commerciale',
          company: 'Bati Ouest',
          location: 'Rennes',
          start: '2021',
          end: 'Aujourd’hui',
          details:
            'Saisie des devis et des factures (environ 60 par mois)\nRelance des impayés : délai de paiement moyen réduit de 12 jours\nGestion des agendas de 3 conducteurs de travaux\nAccueil physique et téléphonique',
        },
        {
          role: 'Assistante d’accueil',
          company: 'Cabinet Lemaître',
          location: 'Rennes',
          start: '2019',
          end: '2021',
          details: 'Accueil des clients et prise de rendez-vous\nClassement et archivage des dossiers',
        },
      ],
      education: [
        { degree: 'BTS Support à l’action managériale', school: 'Lycée Bréquigny, Rennes', start: '2017', end: '2019', details: '' },
      ],
      skills: ['Pack Office (Excel avancé)', 'Facturation', 'Gestion d’agenda', 'Accueil', 'Classement et archivage', 'Sage'],
      languages: [
        { name: 'Français', level: 'Langue maternelle' },
        { name: 'Anglais', level: 'Professionnel (B2)' },
      ],
      interests: 'Lecture, yoga, théâtre amateur',
    },
    tips: [
      { title: 'Zéro faute', body: 'Relisez à voix haute ou faites relire. Une faute sur un CV d’assistante se remarque plus que partout ailleurs.' },
      { title: 'Nommez vos logiciels', body: 'Excel, Word, Outlook, Sage, EBP, un ERP : écrivez les noms exacts, les recruteurs les cherchent.' },
      { title: 'Ajoutez un résultat', body: 'Des factures traitées, un délai réduit, un classement réorganisé : un chiffre vous distingue.' },
      { title: 'Adaptez le titre', body: 'Assistante de direction, commerciale, RH ou comptable : reprenez l’intitulé exact de l’annonce.' },
    ],
    keywords: ['Gestion administrative', 'Accueil', 'Agenda', 'Facturation', 'Courrier', 'Pack Office', 'Excel', 'Classement', 'Organisation', 'Confidentialité'],
    summaries: [
      'Assistante administrative organisée, 5 ans en PME. Facturation, agenda, accueil : je fais tourner le bureau.',
      'Assistant de direction bilingue, habitué à gérer plusieurs agendas et les déplacements d’une équipe dirigeante.',
    ],
    faq: [
      { q: 'Quelle mise en page choisir ?', a: 'La mise en page classique, sur une colonne, convient bien : elle fait sérieux et se lit facilement.' },
      { q: 'Faut-il indiquer son niveau Excel ?', a: 'Oui, et le plus précis possible : tableaux croisés dynamiques, RECHERCHEV, mises en forme conditionnelles.' },
    ],
  },
  {
    slug: 'comptable',
    job: 'Comptable',
    short: 'Comptable',
    metaTitle: 'Exemple de CV comptable gratuit (PDF) – LogoLoom',
    metaDescription:
      'Exemple de CV de comptable à reprendre gratuitement : missions, logiciels, diplômes. Modifiez-le et téléchargez le PDF sans compte.',
    intro:
      'Un CV de comptable se lit comme un bilan : précis et structuré. Indiquez le périmètre (nombre de dossiers, chiffre d’affaires), les clôtures que vous gérez et vos logiciels.',
    color: '#383D39',
    cv: {
      layout: 'classic',
      fullName: 'Thomas Girard',
      jobTitle: 'Comptable général',
      email: 'thomas.girard@exemple.fr',
      phone: PHONE,
      city: 'Strasbourg',
      link: 'linkedin.com/in/thomas-girard',
      photoUrl: null,
      summary:
        'Comptable général avec 8 ans d’expérience en cabinet puis en entreprise. Je tiens la comptabilité jusqu’au bilan, je prépare les déclarations fiscales et je fiabilise les process pour des clôtures sans surprise.',
      experiences: [
        {
          role: 'Comptable général',
          company: 'Groupe Alsatec (industrie, 120 salariés)',
          location: 'Strasbourg',
          start: '2020',
          end: 'Aujourd’hui',
          details:
            'Tenue de la comptabilité générale et des clôtures mensuelles\nPréparation du bilan et de la liasse fiscale avec le commissaire aux comptes\nDéclarations de TVA et suivi de la trésorerie\nMise en place de la dématérialisation des factures fournisseurs',
        },
        {
          role: 'Collaborateur comptable',
          company: 'Cabinet Weber & Associés',
          location: 'Strasbourg',
          start: '2017',
          end: '2020',
          details: 'Portefeuille de 45 dossiers (TPE, artisans, professions libérales)\nRévision et préparation des bilans',
        },
      ],
      education: [
        { degree: 'DCG (Diplôme de comptabilité et de gestion)', school: 'Lycée Jean-Rostand, Strasbourg', start: '2014', end: '2017', details: '' },
      ],
      skills: ['Comptabilité générale', 'Clôtures et bilan', 'TVA', 'Liasse fiscale', 'Rapprochements bancaires', 'Sage 100', 'Cegid', 'Excel avancé'],
      languages: [
        { name: 'Français', level: 'Langue maternelle' },
        { name: 'Allemand', level: 'Courant (C1)' },
        { name: 'Anglais', level: 'Intermédiaire (B1)' },
      ],
      interests: 'Course à pied, échecs',
    },
    tips: [
      { title: 'Donnez le périmètre', body: 'Nombre de dossiers, taille de l’entreprise, chiffre d’affaires : ça situe immédiatement votre niveau.' },
      { title: 'Allez jusqu’au bilan', body: 'Dites clairement si vous préparez les clôtures, le bilan, la liasse fiscale, ou seulement la saisie.' },
      { title: 'Citez vos logiciels', body: 'Sage, Cegid, Quadra, SAP, Pennylane : c’est un filtre fréquent dans les annonces.' },
      { title: 'Valorisez les améliorations', body: 'Dématérialisation, automatisation, réduction des délais de clôture : c’est ce qui fait la différence.' },
    ],
    keywords: ['Comptabilité générale', 'Clôture mensuelle', 'Bilan', 'Liasse fiscale', 'TVA', 'Rapprochement bancaire', 'Trésorerie', 'Sage', 'Cegid', 'Rigueur'],
    summaries: [
      'Comptable général, 8 ans entre cabinet et entreprise. Clôtures mensuelles, bilan et fiscalité sans mauvaise surprise.',
      'Jeune diplômé du DCG, alternance de 2 ans en cabinet, à l’aise avec Sage et les déclarations de TVA.',
    ],
    faq: [
      { q: 'Faut-il détailler chaque logiciel ?', a: 'Oui, listez-les dans les compétences. Les recruteurs et les logiciels de tri cherchent souvent un nom précis.' },
      { q: 'Comment présenter un parcours en cabinet ?', a: 'Indiquez le nombre et le type de dossiers, et jusqu’où vous alliez : saisie, révision, bilan, conseil.' },
    ],
  },
  {
    slug: 'commercial',
    job: 'Commercial(e)',
    short: 'Commercial',
    metaTitle: 'Exemple de CV commercial(e) gratuit (PDF) – LogoLoom',
    metaDescription:
      'Exemple de CV de commercial B2B à modifier gratuitement : résultats chiffrés, prospection, compétences. Téléchargez le PDF, sans compte.',
    intro:
      'Un CV de commercial se juge sur les chiffres. Objectifs atteints, chiffre d’affaires, nouveaux clients : le recruteur veut voir ce que vous avez rapporté, pas seulement ce que vous avez fait.',
    color: '#2340A8',
    cv: {
      layout: 'sidebar',
      fullName: 'Karim Dubois',
      jobTitle: 'Commercial terrain B2B',
      email: 'karim.dubois@exemple.fr',
      phone: PHONE,
      city: 'Lyon',
      link: 'linkedin.com/in/karim-dubois',
      photoUrl: null,
      summary:
        'Commercial terrain depuis 6 ans auprès des PME. Je prospecte, je négocie et je fidélise. 112 % de mon objectif en moyenne sur les trois dernières années.',
      experiences: [
        {
          role: 'Commercial terrain',
          company: 'Equip’Pro (fournitures industrielles)',
          location: 'Rhône-Alpes',
          start: '2021',
          end: 'Aujourd’hui',
          details:
            'Portefeuille de 140 clients PME, 1,2 M€ de chiffre d’affaires annuel\n35 nouveaux clients signés en 2025\nNégociation des contrats annuels et des remises\nSuivi des opportunités dans le CRM',
        },
        {
          role: 'Conseiller commercial sédentaire',
          company: 'Bureau Plus',
          location: 'Lyon',
          start: '2019',
          end: '2021',
          details: 'Prospection téléphonique (60 appels par jour)\nPrise de rendez-vous pour l’équipe terrain',
        },
      ],
      education: [
        { degree: 'BTS Négociation et digitalisation de la relation client', school: 'Lycée La Martinière, Lyon', start: '2017', end: '2019', details: 'En alternance' },
      ],
      skills: ['Prospection', 'Négociation', 'Fidélisation', 'CRM (Salesforce, HubSpot)', 'Gestion de portefeuille', 'Permis B'],
      languages: [
        { name: 'Français', level: 'Langue maternelle' },
        { name: 'Anglais', level: 'Professionnel (B2)' },
      ],
      interests: 'Boxe, golf, podcasts business',
    },
    tips: [
      { title: 'Un chiffre par expérience', body: 'Chiffre d’affaires, pourcentage d’objectif, nombre de nouveaux clients : sans chiffre, un CV commercial ne convainc pas.' },
      { title: 'Précisez la cible', body: 'B2B ou B2C, PME ou grands comptes, terrain ou sédentaire : chaque poste demande un profil différent.' },
      { title: 'Mentionnez le CRM', body: 'Salesforce, HubSpot ou un outil maison : ça montre que vous suivez vos ventes avec méthode.' },
      { title: 'Le permis compte', body: 'Pour un poste terrain, écrivez-le clairement.' },
    ],
    keywords: ['Prospection', 'Négociation', 'Développement commercial', 'Fidélisation', 'Objectifs', 'Portefeuille clients', 'CRM', 'B2B', 'Closing', 'Chiffre d’affaires'],
    summaries: [
      'Commercial B2B terrain, 6 ans auprès des PME. 112 % d’objectif en moyenne et 35 nouveaux clients en 2025.',
      'Commerciale sédentaire en télévente, à l’aise au téléphone, en recherche d’un premier poste terrain.',
    ],
    faq: [
      { q: 'Et si on n’a pas atteint ses objectifs ?', a: 'Choisissez un autre chiffre vrai et positif : nombre de rendez-vous, progression d’une année sur l’autre, clients fidélisés.' },
      { q: 'Faut-il une photo ?', a: 'Ce n’est pas obligatoire, mais en vente une photo professionnelle est souvent bien perçue.' },
    ],
  },
  {
    slug: 'preparateur-de-commandes',
    job: 'Préparateur / préparatrice de commandes',
    short: 'Préparateur de commandes',
    metaTitle: 'Exemple de CV préparateur de commandes gratuit (PDF) – LogoLoom',
    metaDescription:
      'Exemple de CV de préparateur de commandes en entrepôt à modifier gratuitement : CACES, cadences, compétences. Téléchargez le PDF sans compte.',
    intro:
      'En logistique, le recruteur regarde d’abord les CACES, puis votre cadence et votre fiabilité. Mettez les certificats bien en vue et dites dans quel type d’entrepôt vous avez travaillé.',
    color: '#383D39',
    cv: {
      layout: 'sidebar',
      fullName: 'Mehdi Lefèvre',
      jobTitle: 'Préparateur de commandes, CACES R489 cat. 1, 3 et 5',
      email: 'mehdi.lefevre@exemple.fr',
      phone: PHONE,
      city: 'Orléans',
      link: '',
      photoUrl: null,
      summary:
        'Préparateur de commandes depuis 5 ans en entrepôt e-commerce et grande distribution. Rapide et fiable : moins de 0,3 % d’erreurs de préparation. Disponible en équipes et en horaires de nuit.',
      experiences: [
        {
          role: 'Préparateur de commandes',
          company: 'LogiCentre (e-commerce)',
          location: 'Saran',
          start: '2022',
          end: 'Aujourd’hui',
          details:
            'Préparation de 180 à 220 lignes par heure au scanner\nChargement et déchargement des camions au chariot (CACES 3)\nContrôle qualité et emballage des colis\nRéférent sécurité de l’équipe de nuit',
        },
        {
          role: 'Cariste (intérim)',
          company: 'Plateforme Val de Loire',
          location: 'Orléans',
          start: '2020',
          end: '2022',
          details: 'Mise en stock et réapprovisionnement des allées\nInventaires tournants',
        },
      ],
      education: [
        { degree: 'CACES R489 catégories 1, 3 et 5', school: 'AFTRAL Orléans', start: '2020', end: '2020', details: 'Renouvelé en 2025' },
        { degree: 'CAP Opérateur logistique', school: 'Lycée Paul-Gauguin, Orléans', start: '2017', end: '2019', details: '' },
      ],
      skills: ['Permis B', 'Préparation au scanner', 'Commande vocale', 'Chariot élévateur', 'Gerbeur', 'Gestion des stocks', 'WMS', 'Sécurité en entrepôt'],
      languages: [{ name: 'Français', level: 'Langue maternelle' }],
      interests: 'Musculation, mécanique',
    },
    tips: [
      { title: 'Les CACES dans le titre', body: 'Catégories et date de validité : c’est le premier filtre des agences d’intérim.' },
      { title: 'Donnez votre cadence', body: 'Lignes ou colis par heure, taux d’erreur : un chiffre montre que vous tenez le rythme.' },
      { title: 'Précisez les outils', body: 'Scanner, commande vocale, WMS, transpalette électrique : citez ce que vous connaissez.' },
      { title: 'Horaires et mobilité', body: 'Nuit, équipes, week-ends, permis : écrivez ce que vous acceptez.' },
    ],
    keywords: ['Préparation de commandes', 'CACES R489', 'Scanner', 'Commande vocale', 'Chariot élévateur', 'Réception', 'Expédition', 'Inventaire', 'Sécurité', 'Cadence'],
    summaries: [
      'Préparateur de commandes, 5 ans en entrepôt e-commerce, CACES 1, 3 et 5. Rapide, fiable, disponible de nuit.',
      'Débutant motivé en logistique, CACES 1 obtenu en 2026, habitué au travail physique et aux horaires décalés.',
    ],
    faq: [
      { q: 'Où indiquer ses CACES ?', a: 'Dans le titre du CV et dans la formation, avec les catégories et l’année. Les recruteurs cherchent ces mots en premier.' },
      { q: 'Comment présenter beaucoup de missions d’intérim ?', a: 'Regroupez-les : « Missions d’intérim 2020-2022, plateformes logistiques de la région d’Orléans », puis listez ce que vous y faisiez.' },
    ],
  },
  {
    slug: 'agent-d-entretien',
    job: 'Agent / agente d’entretien',
    short: 'Agent d’entretien',
    metaTitle: 'Exemple de CV agent d’entretien gratuit (PDF) – LogoLoom',
    metaDescription:
      'Exemple de CV d’agent d’entretien ou de propreté à modifier gratuitement : missions, compétences, qualités. Téléchargez votre CV en PDF sans compte.',
    intro:
      'Pour un poste d’entretien, un CV simple et propre suffit. Indiquez les lieux où vous avez travaillé (bureaux, hôpital, hôtel), les machines que vous savez utiliser et vos horaires possibles.',
    color: '#155E75',
    cv: {
      layout: 'classic',
      fullName: 'Fatou Diallo',
      jobTitle: 'Agente d’entretien',
      email: 'fatou.diallo@exemple.fr',
      phone: PHONE,
      city: 'Marseille',
      link: '',
      photoUrl: null,
      summary:
        'Agente d’entretien depuis 6 ans dans les bureaux et les établissements de santé. Soigneuse, ponctuelle et autonome. Je respecte les protocoles d’hygiène et je travaille tôt le matin ou en soirée.',
      experiences: [
        {
          role: 'Agente de propreté',
          company: 'Net’Services Provence',
          location: 'Marseille',
          start: '2021',
          end: 'Aujourd’hui',
          details:
            'Entretien de 1 200 m² de bureaux chaque matin\nUtilisation de l’autolaveuse et de la monobrosse\nGestion des produits et du réapprovisionnement des sanitaires\nTri des déchets selon les consignes du site',
        },
        {
          role: 'Agente de service hospitalier',
          company: 'Clinique du Littoral',
          location: 'Marseille',
          start: '2019',
          end: '2021',
          details: 'Bionettoyage des chambres et des blocs selon les protocoles\nDistribution des repas',
        },
      ],
      education: [
        { degree: 'CAP Agent de propreté et d’hygiène', school: 'Lycée professionnel La Floride, Marseille', start: '2017', end: '2019', details: '' },
      ],
      skills: ['Bionettoyage', 'Autolaveuse', 'Monobrosse', 'Protocoles d’hygiène', 'Tri des déchets', 'Autonomie'],
      languages: [
        { name: 'Français', level: 'Courant' },
        { name: 'Wolof', level: 'Langue maternelle' },
      ],
      interests: 'Cuisine, couture',
    },
    tips: [
      { title: 'Nommez les lieux', body: 'Bureaux, hôpital, école, hôtel, industrie : chaque environnement a ses règles, montrez que vous les connaissez.' },
      { title: 'Citez les machines', body: 'Autolaveuse, monobrosse, aspirateur dorsal : c’est un vrai plus pour l’employeur.' },
      { title: 'Montrez la fiabilité', body: 'Ponctualité, autonomie, respect des consignes : écrivez-le dans le profil avec un exemple.' },
      { title: 'Précisez les horaires', body: 'Tôt le matin, soir, week-end, temps partiel : c’est souvent ce qui décide.' },
    ],
    keywords: ['Entretien des locaux', 'Bionettoyage', 'Hygiène', 'Autolaveuse', 'Monobrosse', 'Produits d’entretien', 'Tri des déchets', 'Autonomie', 'Ponctualité'],
    summaries: [
      'Agente d’entretien avec 6 ans d’expérience en bureaux et en clinique. Soigneuse, autonome, disponible tôt le matin.',
      'Agent de propreté polyvalent, habitué aux grandes surfaces et aux machines, cherche un poste à temps plein.',
    ],
    faq: [
      { q: 'Faut-il un diplôme ?', a: 'Non, ce n’est pas obligatoire. L’expérience, même informelle, et la fiabilité comptent davantage.' },
      { q: 'Comment présenter un temps partiel ?', a: 'Écrivez simplement le nombre d’heures ou les créneaux dans l’expérience. Ça aide l’employeur à comprendre vos disponibilités.' },
    ],
  },
  {
    slug: 'developpeur-web',
    job: 'Développeur / développeuse web',
    short: 'Développeur web',
    metaTitle: 'Exemple de CV développeur web gratuit (PDF) – LogoLoom',
    metaDescription:
      'Exemple de CV de développeur web à modifier gratuitement : stack technique, projets, résultats. Téléchargez un PDF lisible par les ATS, sans compte.',
    intro:
      'Un CV de développeur doit montrer la stack dès le haut de la page, puis ce que vous avez livré. Un lien GitHub ou portfolio vaut souvent plus qu’un long paragraphe.',
    color: '#5B2A6E',
    cv: {
      layout: 'sidebar',
      fullName: 'Antoine Mercier',
      jobTitle: 'Développeur web full-stack (React, Node.js)',
      email: 'antoine.mercier@exemple.fr',
      phone: PHONE,
      city: 'Montpellier',
      link: 'github.com/antoine-mercier',
      photoUrl: null,
      summary:
        'Développeur full-stack avec 4 ans d’expérience en startup. Je construis des applications web rapides et testées, du design à la mise en production. J’aime le code lisible et les produits utiles.',
      experiences: [
        {
          role: 'Développeur full-stack',
          company: 'Agrilink (SaaS agricole)',
          location: 'Montpellier, hybride',
          start: '2022',
          end: 'Aujourd’hui',
          details:
            'Refonte du tableau de bord en React et TypeScript (temps de chargement divisé par 3)\nAPI Node.js et PostgreSQL utilisée par 8 000 exploitations\nMise en place des tests et du déploiement continu\nRevue de code et accompagnement de 2 développeurs juniors',
        },
        {
          role: 'Développeur front-end',
          company: 'Agence Pixel Sud',
          location: 'Montpellier',
          start: '2020',
          end: '2022',
          details: 'Sites vitrines et e-commerce pour 20 clients\nIntégration de maquettes Figma, accessibilité et SEO',
        },
      ],
      education: [
        { degree: 'Licence professionnelle Développement web', school: 'IUT de Montpellier-Sète', start: '2019', end: '2020', details: '' },
        { degree: 'BTS SIO, option SLAM', school: 'Lycée Jean-Mermoz, Montpellier', start: '2017', end: '2019', details: '' },
      ],
      skills: ['TypeScript', 'React / Next.js', 'Node.js', 'PostgreSQL', 'Tests (Jest, Playwright)', 'Docker', 'Git / CI', 'Accessibilité'],
      languages: [
        { name: 'Français', level: 'Langue maternelle' },
        { name: 'Anglais', level: 'Technique et écrit (B2)' },
      ],
      interests: 'Open source, escalade, jeux de société',
    },
    tips: [
      { title: 'La stack dans le titre', body: '« Développeur full-stack React / Node.js » : le recruteur sait en une seconde si vous correspondez.' },
      { title: 'Mettez un lien', body: 'GitHub, portfolio ou projet en ligne : c’est la preuve la plus forte d’un CV de développeur.' },
      { title: 'Parlez d’impact', body: 'Performance, nombre d’utilisateurs, temps gagné : dites ce que votre code a changé.' },
      { title: 'Gardez une seule colonne de texte simple', body: 'Les outils de tri (ATS) lisent mieux un PDF en vrai texte, comme celui que génère LogoLoom.' },
    ],
    keywords: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'API REST', 'SQL', 'Git', 'Tests', 'CI/CD', 'Méthodes agiles'],
    summaries: [
      'Développeur full-stack React / Node.js, 4 ans en startup. Je livre des fonctionnalités testées et rapides, de la maquette à la production.',
      'Développeuse front-end junior issue d’une reconversion, 3 projets en ligne, à l’aise avec React et l’accessibilité.',
    ],
    faq: [
      { q: 'Faut-il lister tous les langages connus ?', a: 'Non. Gardez ceux que vous maîtrisez vraiment et qui correspondent au poste, une dizaine maximum.' },
      { q: 'Le PDF est-il lisible par les logiciels de recrutement ?', a: 'Oui : LogoLoom génère un PDF en vrai texte, que les ATS peuvent lire, pas une image.' },
    ],
  },
  {
    slug: 'frontalier-suisse',
    job: 'Frontalier en Suisse',
    short: 'Frontalier Suisse',
    h1: 'Exemple de CV pour travailler en Suisse (frontalier)',
    label: 'CV frontalier Suisse',
    metaTitle: 'Exemple de CV frontalier pour la Suisse, gratuit (PDF) – LogoLoom',
    metaDescription:
      'Exemple de CV pour postuler en Suisse depuis la France : permis G, langues, certificats de travail, photo. Modifiez-le gratuitement et téléchargez le PDF, sans compte.',
    intro:
      'Un employeur suisse lit un CV un peu différemment d’un recruteur français. Il veut savoir tout de suite où vous habitez, si vous avez déjà le permis frontalier, quelles langues vous parlez vraiment, et il s’attend souvent à une photo.',
    color: '#7A2335',
    cv: {
      layout: 'sidebar',
      fullName: 'Julien Masson',
      jobTitle: 'Technicien de maintenance, frontalier permis G',
      email: 'julien.masson@exemple.fr',
      phone: '+33 6 00 00 00 00',
      city: 'Saint-Julien-en-Genevois (F), 15 min de Genève',
      link: 'linkedin.com/in/julien-masson',
      photoUrl: null,
      summary:
        'Technicien de maintenance avec 9 ans d’expérience en industrie, dont 3 ans en Suisse romande. Diagnostic électrique et mécanique, maintenance préventive, amélioration continue. Disponible rapidement, préavis d’un mois.',
      experiences: [
        {
          role: 'Technicien de maintenance',
          company: 'Précitech SA',
          location: 'Plan-les-Ouates (GE)',
          start: '2023',
          end: 'Aujourd’hui',
          details:
            'Maintenance préventive et curative de 12 lignes d’assemblage\nTaux de disponibilité des machines porté de 91 % à 96 %\nRédaction des procédures et formation des opérateurs\nSuivi des pièces de rechange dans la GMAO',
        },
        {
          role: 'Technicien de maintenance',
          company: 'Alpes Plasturgie',
          location: 'Annecy (F)',
          start: '2017',
          end: '2023',
          details: 'Dépannage électrique et pneumatique en 3x8\nParticipation à l’installation de 2 nouvelles presses',
        },
      ],
      education: [
        { degree: 'BTS Maintenance des systèmes', school: 'Lycée Germain-Sommeiller, Annecy', start: '2015', end: '2017', details: '' },
        { degree: 'Habilitation électrique B2V-BR', school: 'APAVE', start: '2024', end: '2024', details: '' },
      ],
      skills: ['Permis G valable', 'Permis B (voiture)', 'Électrotechnique', 'Automates Siemens', 'Pneumatique', 'GMAO', 'Lecture de plans'],
      languages: [
        { name: 'Français', level: 'Langue maternelle' },
        { name: 'Anglais', level: 'Professionnel (B2)' },
        { name: 'Allemand', level: 'Notions (A2)' },
      ],
      interests: 'Ski de randonnée, VTT',
    },
    tips: [
      { title: 'Votre statut en une ligne', body: 'Permis G déjà obtenu ou à demander, ville de résidence en France, temps de trajet : écrivez-le en haut, l’employeur se pose la question tout de suite.' },
      { title: 'Les langues avec un niveau', body: 'En Suisse, les langues pèsent lourd. Indiquez un niveau européen (A1 à C2) plutôt que « bon niveau ».' },
      { title: 'Expliquez vos diplômes', body: 'Un recruteur suisse ne connaît pas forcément le BTS ou le bac pro. Ajoutez l’équivalent suisse quand vous le connaissez (CFC, ES, HES).' },
      { title: 'Préparez vos certificats de travail', body: 'En Suisse, on joint souvent au CV les certificats de travail et les diplômes. Gardez-les prêts en PDF, avec une lettre de motivation.' },
      { title: 'La photo est courante', body: 'Elle reste habituelle sur un CV suisse. Choisissez une photo sobre et professionnelle, ajoutée à l’étape « Vous ».' },
    ],
    keywords: ['Permis G', 'Frontalier', 'Disponibilité', 'Préavis', 'Langues (niveau CECR)', 'Certificats de travail', 'CFC / ES / HES', 'Fiabilité', 'Précision', 'Mobilité'],
    summaries: [
      'Technicien de maintenance, 9 ans en industrie dont 3 en Suisse romande. Frontalier avec permis G, disponible avec un mois de préavis.',
      'Assistante de direction installée à Annemasse, bilingue français-anglais, cherche un premier poste à Genève. Permis G à demander dès la signature du contrat.',
    ],
    faq: [
      { q: 'Faut-il déjà avoir le permis G pour postuler ?', a: 'Non. Le permis G se demande en général une fois le contrat signé, souvent avec l’aide de l’employeur. Écrivez simplement « permis G à demander » pour être clair.' },
      { q: 'Doit-on indiquer sa date de naissance et sa nationalité ?', a: 'C’est encore fréquent sur les CV suisses, mais ce n’est pas obligatoire. Si vous les ajoutez, mettez-les dans le titre ou le profil, en une ligne.' },
      { q: 'Faut-il écrire son salaire souhaité sur le CV ?', a: 'Non, gardez-le pour la lettre de motivation si l’annonce le demande, ou pour l’entretien.' },
    ],
  },
  {
    slug: 'etudiant',
    job: 'Étudiant (sans expérience)',
    short: 'Étudiant sans expérience',
    h1: 'Exemple de CV étudiant sans expérience',
    metaTitle: 'Exemple de CV étudiant sans expérience gratuit (PDF) – LogoLoom',
    metaDescription:
      'Exemple de CV étudiant pour un job, un stage ou une alternance, même sans expérience. Modifiez-le gratuitement et téléchargez le PDF, sans compte.',
    intro:
      'Sans expérience, votre CV montre autre chose : vos études, vos projets, le bénévolat, le sport, les petits jobs. Le recruteur cherche surtout de la motivation et du sérieux.',
    color: '#2340A8',
    cv: {
      layout: 'sidebar',
      fullName: 'Léa Rousseau',
      jobTitle: 'Étudiante en BTS, recherche un job étudiant',
      email: 'lea.rousseau@exemple.fr',
      phone: PHONE,
      city: 'Tours',
      link: '',
      photoUrl: null,
      summary:
        'Étudiante en BTS Management commercial, sérieuse et souriante. Je cherche un job le week-end et pendant les vacances, en vente ou en restauration. Disponible dès maintenant.',
      experiences: [
        {
          role: 'Bénévole',
          company: 'Festival Terres du Son',
          location: 'Monts',
          start: '2025',
          end: '2025',
          details: 'Accueil du public et contrôle des billets\nTenue du stand de boissons pendant 3 jours',
        },
        {
          role: 'Baby-sitting',
          company: 'Particuliers',
          location: 'Tours',
          start: '2023',
          end: 'Aujourd’hui',
          details: 'Garde régulière de 2 enfants après l’école\nAide aux devoirs',
        },
      ],
      education: [
        { degree: 'BTS Management commercial opérationnel', school: 'Lycée Choiseul, Tours', start: '2025', end: '2027', details: 'En cours' },
        { degree: 'Bac STMG', school: 'Lycée Grandmont, Tours', start: '2022', end: '2025', details: 'Mention bien' },
      ],
      skills: ['Contact client', 'Ponctualité', 'Travail en équipe', 'Pack Office', 'Réseaux sociaux'],
      languages: [
        { name: 'Français', level: 'Langue maternelle' },
        { name: 'Anglais', level: 'Intermédiaire (B1)' },
        { name: 'Espagnol', level: 'Scolaire' },
      ],
      interests: 'Volley-ball en club (capitaine), photographie',
    },
    tips: [
      { title: 'Tout compte comme expérience', body: 'Baby-sitting, bénévolat, stage de 3e, association, sport en club : ça montre que vous êtes fiable.' },
      { title: 'Mettez la formation en valeur', body: 'Diplôme en cours, spécialité, mention : c’est votre point fort, placez-le bien en vue.' },
      { title: 'Dites ce que vous cherchez', body: 'Job, stage ou alternance, dates et disponibilités : écrivez-le dans le titre ou le profil.' },
      { title: 'Restez sur une page', body: 'Un CV court et propre fait plus sérieux qu’un CV rallongé pour remplir la page.' },
    ],
    keywords: ['Motivation', 'Disponibilité', 'Sérieux', 'Ponctualité', 'Esprit d’équipe', 'Contact client', 'Adaptabilité', 'Bénévolat', 'Pack Office'],
    summaries: [
      'Étudiante en BTS, sérieuse et souriante, disponible le week-end et pendant les vacances pour un job en vente ou en restauration.',
      'Étudiant en licence d’informatique, cherche une alternance de 2 ans en développement à partir de septembre.',
    ],
    faq: [
      { q: 'Que mettre dans un CV quand on n’a jamais travaillé ?', a: 'Vos études, vos projets scolaires, le bénévolat, le sport, le baby-sitting : tout ce qui montre que vous êtes fiable et motivé.' },
      { q: 'Faut-il mettre ses notes ?', a: 'Seulement si elles sont bonnes ou s’il y a une mention. Sinon, le nom du diplôme suffit.' },
    ],
  },
];

// Situations (frontalier, student) come last, after the jobs.
const SITUATIONS = ['frontalier-suisse', 'etudiant'];
export const CV_EXAMPLES_FR: CvExample[] = [
  ...BASE.filter((e) => !SITUATIONS.includes(e.slug)),
  ...CV_EXAMPLES_FR_MORE,
  ...CV_EXAMPLES_FR_BATCH3_JOBS,
  ...SITUATIONS.map((slug) => BASE.find((e) => e.slug === slug)!),
  ...CV_EXAMPLES_FR_BATCH3_SITUATIONS,
];

export function exampleH1(ex: CvExample): string {
  return ex.h1 ?? `Exemple de CV ${ex.job.toLowerCase()}`;
}

export function exampleLabel(ex: CvExample): string {
  return ex.label ?? `CV ${ex.short.toLowerCase()}`;
}

export function getCvExample(slug: string): CvExample | undefined {
  return CV_EXAMPLES_FR.find((e) => e.slug === slug);
}
