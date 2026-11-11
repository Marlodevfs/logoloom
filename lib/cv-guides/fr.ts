/**
 * French CV guides (informational pages that lead to the CV maker).
 * Examples are fictional.
 */
export interface GuideSection {
  h2: string;
  paragraphs?: string[];
  list?: string[];
  /** Short example lines shown as quotes ("bon exemple"). */
  examples?: string[];
  /** Optional "à éviter" lines. */
  avoid?: string[];
}

export interface CvGuide {
  slug: string;
  h1: string;
  /** Short label for lists and links. */
  label: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  sections: GuideSection[];
  faq: { q: string; a: string }[];
  /** Example slugs to link at the end. */
  related: string[];
}

export const CV_GUIDES_FR: CvGuide[] = [
  {
    slug: 'comment-faire-un-cv',
    h1: 'Comment faire un CV : la méthode simple en 7 étapes',
    label: 'Comment faire un CV',
    metaTitle: 'Comment faire un CV en 2026 : méthode simple en 7 étapes – LogoLoom',
    metaDescription:
      'Comment faire un CV qui donne envie d’être lu : structure, rubriques, longueur, erreurs à éviter, exemples. Puis créez le vôtre gratuitement en PDF, sans compte.',
    intro:
      'Un recruteur passe en moyenne moins d’une minute sur un CV. Votre objectif n’est donc pas de tout dire, mais de lui faire comprendre très vite qui vous êtes, ce que vous cherchez et pourquoi vous êtes la bonne personne. Voici la méthode, étape par étape.',
    sections: [
      {
        h2: '1. Partez de l’offre, pas de votre parcours',
        paragraphs: [
          'Avant d’écrire, relisez l’annonce et soulignez ce que l’employeur demande : missions, compétences, logiciels, permis, horaires. Votre CV doit répondre à cette liste. Un CV unique envoyé partout marche beaucoup moins bien qu’un CV ajusté en cinq minutes pour chaque offre.',
        ],
      },
      {
        h2: '2. Choisissez une structure claire',
        paragraphs: ['L’ordre classique fonctionne pour presque tout le monde :'],
        list: [
          'En-tête : nom, titre du poste visé, téléphone, email, ville',
          'Profil : 2 ou 3 phrases qui résument ce que vous apportez',
          'Expériences : de la plus récente à la plus ancienne',
          'Formation : diplômes, formations courtes, certifications',
          'Compétences et langues',
          'Centres d’intérêt (facultatif, mais utile s’ils disent quelque chose de vous)',
        ],
      },
      {
        h2: '3. Écrivez un titre qui dit ce que vous cherchez',
        paragraphs: [
          'Sous votre nom, remplacez « Curriculum vitae » par le poste visé. C’est la première chose que le recruteur lit. Ajoutez-y un élément fort : années d’expérience, diplôme, permis ou disponibilité.',
        ],
        examples: ['Vendeuse en prêt-à-porter, 4 ans d’expérience', 'Cariste, CACES R489 cat. 1, 3 et 5', 'Recherche alternance assistant RH, dès septembre'],
      },
      {
        h2: '4. Rédigez un profil court et concret',
        paragraphs: [
          'Le profil (ou accroche) tient en deux ou trois phrases : qui vous êtes professionnellement, ce que vous savez faire de mieux, et ce que vous cherchez. Évitez les adjectifs vagues sans preuve : « dynamique et motivé » ne dit rien, « habitué aux rushs de 120 clients par heure » dit tout.',
        ],
      },
      {
        h2: '5. Décrivez vos expériences avec des résultats',
        paragraphs: [
          'Pour chaque poste : intitulé, entreprise, ville, dates, puis 2 à 4 lignes qui commencent par un verbe d’action. Dès que possible, ajoutez un chiffre : nombre de clients, de colis, de couverts, chiffre d’affaires, taux d’erreur, taille d’équipe.',
        ],
        examples: ['Préparation de 180 colis par heure en froid positif', 'Encadrement d’une équipe de 4 vendeurs pendant les soldes'],
        avoid: ['Chargé de diverses tâches', 'Polyvalence et sens du service'],
      },
      {
        h2: '6. Gardez une seule page (le plus souvent)',
        paragraphs: [
          'Une page suffit jusqu’à environ 10 ans d’expérience. Au-delà, deux pages sont acceptées si chaque ligne est utile. Pour gagner de la place : résumez les postes anciens en une ligne, regroupez les missions d’intérim et supprimez les rubriques qui n’apportent rien pour ce poste.',
        ],
      },
      {
        h2: '7. Vérifiez avant d’envoyer',
        list: [
          'Zéro faute : faites relire par quelqu’un ou lisez à voix haute',
          'Un email sérieux (prénom.nom) et un numéro joignable',
          'Le fichier en PDF, nommé « CV-Prenom-Nom.pdf »',
          'Un texte sélectionnable : les logiciels de tri des recruteurs doivent pouvoir le lire',
        ],
      },
    ],
    faq: [
      { q: 'Faut-il mettre une photo sur son CV ?', a: 'En France, ce n’est pas obligatoire. Elle est courante dans certains métiers en contact avec le public. Si vous en mettez une, choisissez une photo récente, simple et souriante.' },
      { q: 'Faut-il indiquer son âge et son adresse complète ?', a: 'Non. La ville suffit, et l’âge n’est pas nécessaire. En Suisse, en revanche, l’état civil et la date de naissance sont encore souvent attendus.' },
      { q: 'Quel format envoyer ?', a: 'Le PDF, toujours. Il garde votre mise en page sur tous les ordinateurs et téléphones.' },
    ],
    related: ['vendeur', 'etudiant', 'reconversion', 'alternance'],
  },
  {
    slug: 'accroche-cv',
    h1: 'Accroche de CV : 20 exemples de profil à adapter',
    label: 'Accroche de CV',
    metaTitle: 'Accroche CV : 20 exemples de profil à copier et adapter – LogoLoom',
    metaDescription:
      'Comment écrire l’accroche (le profil) de votre CV en 3 phrases, avec 20 exemples par situation : débutant, expérimenté, reconversion, alternance. Gratuit.',
    intro:
      'L’accroche, aussi appelée profil ou résumé, ce sont les deux ou trois phrases sous votre nom. C’est souvent la seule partie lue en entier. Bien écrite, elle donne envie de lire le reste ; vague, elle fait passer au CV suivant.',
    sections: [
      {
        h2: 'La formule en 3 phrases',
        list: [
          'Qui vous êtes : métier, années d’expérience ou diplôme',
          'Ce que vous faites bien : une ou deux forces, avec une preuve',
          'Ce que vous cherchez : type de poste, contrat, disponibilité',
        ],
        paragraphs: ['Écrivez-la à la fin, une fois le reste du CV terminé : vous saurez exactement quoi mettre en avant.'],
      },
      {
        h2: 'Exemples pour un premier emploi ou un étudiant',
        examples: [
          'Étudiante en BTS MCO, disponible le week-end et pendant les vacances. À l’aise avec les clients grâce à 2 étés en restauration rapide.',
          'Jeune diplômé d’un CAP Cuisine, rapide et propre en mise en place, je cherche un poste de commis dans une brigade exigeante.',
          'Lycéen de 17 ans, sérieux et ponctuel, je cherche un job d’été en magasin ou en animation. Titulaire du BAFA.',
          'Titulaire d’un bac pro Logistique, CACES R489 cat. 3, disponible immédiatement en horaires d’équipe.',
          'Étudiant en informatique, je développe des sites web sur mon temps libre et cherche un stage de 2 mois en développement.',
        ],
      },
      {
        h2: 'Exemples pour un profil expérimenté',
        examples: [
          'Assistante administrative depuis 8 ans, je gère l’agenda de 3 dirigeants, la facturation et l’accueil. Organisée et discrète, je cherche un poste en CDI.',
          'Technicien de maintenance industrielle, 10 ans d’expérience, habilitations BR et B2V. J’ai réduit de 15 % les arrêts de ligne grâce au préventif.',
          'Commercial terrain B2B depuis 6 ans, portefeuille de 120 clients, objectifs dépassés 5 années sur 6.',
          'Aide-soignante diplômée, 12 ans en EHPAD et en service de médecine. Douce, rigoureuse sur les transmissions et à l’aise en équipe de nuit.',
          'Comptable unique en PME depuis 7 ans, de la saisie au bilan. Habituée à travailler avec l’expert-comptable et à tenir les délais.',
        ],
      },
      {
        h2: 'Exemples pour une reconversion',
        examples: [
          'Après 10 ans dans la vente, je me suis formée à la comptabilité (titre professionnel 2026). Rigoureuse avec les chiffres, je cherche un poste d’assistante comptable.',
          'Ancien chef d’équipe logistique devenu développeur web après une formation de 9 mois. J’aime résoudre des problèmes concrets et travailler en équipe.',
          'Ex-commerciale en reconversion vers les ressources humaines, en formation d’assistante RH. Mon expérience du terrain m’aide à comprendre les besoins des salariés.',
          'Militaire pendant 8 ans, je mets mon sens de l’organisation et de la sécurité au service d’un poste de responsable logistique.',
          'Après une carrière dans la restauration, je deviens aide à domicile : j’ai accompagné un proche pendant 3 ans et je prépare le titre ADVF.',
        ],
      },
      {
        h2: 'Exemples pour une alternance ou un stage',
        examples: [
          'Admis en BTS NDRC, je cherche une alternance de 2 ans en relation client dès septembre, rythme 2 jours / 3 jours.',
          'Étudiante en licence pro RH, à la recherche d’une alternance d’un an en gestion du personnel à partir d’octobre.',
          'En master marketing digital, je cherche un stage de 6 mois à partir de janvier pour piloter des campagnes sur les réseaux sociaux.',
          'Élève en bac pro Commerce, je recherche une période de formation en entreprise de 4 semaines en magasin.',
          'Futur apprenti électricien (CAP en alternance), bricoleur depuis toujours, je cherche une entreprise pour 2 ans.',
        ],
      },
      {
        h2: 'Les erreurs qui font décrocher',
        avoid: [
          'Des qualités sans preuve : « dynamique, motivé, rigoureux »',
          'Un objectif centré sur vous : « je souhaite développer mes compétences »',
          'Un pavé de 6 lignes',
          'Une accroche identique pour toutes les offres',
        ],
      },
    ],
    faq: [
      { q: 'L’accroche est-elle obligatoire ?', a: 'Non, mais elle est fortement conseillée : c’est le moyen le plus rapide de montrer que vous correspondez au poste.' },
      { q: 'Faut-il écrire à la première personne ?', a: 'Les deux se font. « Je » rend le texte plus vivant ; un style sans pronom (« Vendeuse depuis 4 ans… ») est plus compact. Restez cohérent.' },
    ],
    related: ['assistant-administratif', 'technicien-de-maintenance', 'reconversion', 'alternance'],
  },
  {
    slug: 'titre-cv',
    h1: 'Titre de CV : comment le choisir, avec exemples',
    label: 'Titre de CV',
    metaTitle: 'Titre de CV : comment bien le choisir + 30 exemples – LogoLoom',
    metaDescription:
      'Le titre du CV est la première ligne lue par le recruteur. Comment le formuler pour un poste précis, une alternance ou une reconversion, avec 30 exemples.',
    intro:
      'Le titre, c’est la ligne juste sous votre nom. En quelques mots, il dit au recruteur quel poste vous visez et pourquoi vous êtes crédible. C’est aussi un mot-clé important pour les logiciels qui trient les candidatures.',
    sections: [
      {
        h2: 'La règle : le poste visé + un atout',
        paragraphs: [
          'Reprenez l’intitulé exact de l’offre (« Préparateur de commandes », pas « Logisticien polyvalent »), puis ajoutez un seul élément qui vous distingue : expérience, diplôme, permis, langue ou disponibilité. Restez sous une ligne.',
        ],
        examples: ['Préparateur de commandes, 5 ans en froid positif', 'Infirmière diplômée d’État, 3 ans en réanimation', 'Serveuse, anglais courant, disponible saison 2026'],
      },
      {
        h2: 'Exemples par métier',
        list: [
          'Vendeur conseil en électroménager, 6 ans d’expérience',
          'Caissière, disponible soirs et week-ends',
          'Aide-soignante diplômée, expérience en EHPAD',
          'Chauffeur livreur, permis B et C, FIMO à jour',
          'Agent d’entretien, horaires tôt le matin',
          'Comptable, maîtrise de la paie et des bilans',
          'Développeur web React, 4 ans d’expérience',
          'Cuisinier, chef de partie chaud',
          'Électricien bâtiment, habilitations BR et B2V',
          'Assistante maternelle agréée, 4 places',
          'Coiffeuse coloriste, BP Coiffure',
          'Technicien de maintenance industrielle',
        ],
      },
      {
        h2: 'Exemples pour un étudiant, une alternance ou un stage',
        list: [
          'Étudiant en BTS, job étudiant le week-end',
          'Recherche alternance assistant commercial, 2 ans, dès septembre',
          'Stage de fin d’études en marketing digital, 6 mois, janvier 2027',
          'Premier emploi en logistique, CACES R489 cat. 3',
          'Job d’été en animation, BAFA',
        ],
      },
      {
        h2: 'Exemples pour une reconversion',
        list: [
          'Assistante comptable, en reconversion après 10 ans dans la vente',
          'Développeur web junior, ancien chef d’équipe logistique',
          'Aide à domicile, titre ADVF en cours',
          'Conducteur de bus en formation, permis D obtenu',
        ],
      },
      {
        h2: 'À éviter',
        avoid: [
          '« Curriculum vitae » ou « CV » : ça n’apporte rien',
          '« Polyvalent cherche emploi » : trop vague',
          'Un titre qui ne correspond pas à l’offre',
          'Plusieurs métiers à la fois : faites plutôt un CV par type de poste',
        ],
      },
    ],
    faq: [
      { q: 'Faut-il changer le titre pour chaque candidature ?', a: 'Oui, si l’intitulé du poste change. C’est la modification la plus rapide et la plus efficace à faire.' },
      { q: 'Peut-on mettre « recherche d’emploi » dans le titre ?', a: 'Mieux vaut indiquer le poste visé directement. « Recherche » est utile surtout pour une alternance ou un stage, avec les dates.' },
    ],
    related: ['preparateur-de-commandes', 'caissier', 'electricien', 'etudiant'],
  },
  {
    slug: 'competences-cv',
    h1: 'Compétences à mettre sur un CV : savoir-faire et savoir-être',
    label: 'Compétences sur un CV',
    metaTitle: 'Compétences CV : liste de savoir-faire et savoir-être + exemples – LogoLoom',
    metaDescription:
      'Quelles compétences mettre sur un CV ? Différence entre savoir-faire et savoir-être, listes par domaine et comment les prouver. Puis créez votre CV gratuitement.',
    intro:
      'La rubrique Compétences sert à deux choses : montrer au recruteur que vous savez faire ce que le poste demande, et contenir les mots-clés que les logiciels de tri recherchent. Six à huit compétences bien choisies valent mieux qu’une liste de vingt.',
    sections: [
      {
        h2: 'Savoir-faire et savoir-être : la différence',
        paragraphs: [
          'Les savoir-faire (hard skills) sont techniques et vérifiables : encaisser, conduire un chariot, utiliser Excel, faire un bilan. Les savoir-être (soft skills) décrivent votre façon de travailler : organisation, calme, sens du contact. Le recruteur croit aux premiers, et attend une preuve pour les seconds.',
        ],
      },
      {
        h2: 'Exemples de savoir-faire par domaine',
        list: [
          'Commerce : encaissement, conseil client, merchandising, gestion des stocks, vente additionnelle',
          'Logistique : préparation de commandes, CACES, WMS, inventaire, réception et expédition',
          'Restauration : mise en place, service en salle, HACCP, cuissons, gestion des commandes',
          'Administratif : Pack Office, facturation, gestion d’agenda, classement, accueil téléphonique',
          'Santé et aide à la personne : soins d’hygiène, transmissions, aide aux repas, premiers secours',
          'Technique : lecture de plans, habilitations électriques, dépannage, maintenance préventive',
          'Numérique : réseaux sociaux, création de contenus, outils de suivi, langages de programmation',
        ],
      },
      {
        h2: 'Les savoir-être les plus recherchés',
        list: ['Fiabilité et ponctualité', 'Sens du contact client', 'Organisation', 'Travail en équipe', 'Adaptabilité', 'Calme sous pression', 'Autonomie', 'Rigueur'],
        paragraphs: [
          'Ne les listez pas seuls : glissez-les dans vos expériences avec un fait. « Calme sous pression » devient « 120 clients par heure en rush sans erreur de caisse ».',
        ],
      },
      {
        h2: 'Comment choisir les vôtres',
        list: [
          'Reprenez les compétences citées dans l’offre, avec les mêmes mots',
          'Gardez seulement celles que vous pouvez prouver en entretien',
          'Mettez les techniques d’abord, les savoir-être ensuite',
          'Ajoutez les permis, habilitations et certifications : ce sont des compétences fortes',
        ],
      },
      {
        h2: 'À éviter',
        avoid: [
          'Des jauges ou des étoiles : « Excel 4/5 » ne veut rien dire pour un recruteur',
          '« Maîtrise de Word » pour un poste qui ne l’exige pas : ça prend de la place',
          'Des compétences que vous ne pourriez pas montrer en entretien',
        ],
      },
    ],
    faq: [
      { q: 'Combien de compétences mettre sur un CV ?', a: 'Entre 6 et 10 en général. Au-delà, le recruteur ne retient rien et la rubrique devient du remplissage.' },
      { q: 'Faut-il mettre les langues dans les compétences ?', a: 'Mieux vaut une rubrique Langues séparée, avec un niveau clair (A2, B1, courant, langue maternelle).' },
    ],
    related: ['employe-polyvalent', 'cariste', 'aide-a-domicile', 'comptable'],
  },
];

export function getCvGuide(slug: string): CvGuide | undefined {
  return CV_GUIDES_FR.find((g) => g.slug === slug);
}
