import type { CoverLetterContent } from '@/types';

/**
 * Cover letter examples per job (French). Each one matches the CV example with
 * the same slug (same person, same jobs), so both open together in the editor.
 * Every person, company and address is fictional.
 */
export interface LetterExample {
  slug: string;
  /** CV example to load with the letter; null when there is none (spontaneous application). */
  cvSlug: string | null;
  /** Job as people search it. */
  job: string;
  short: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  color: string;
  letter: CoverLetterContent;
  tips: { title: string; body: string }[];
  faq: { q: string; a: string }[];
}

const L = (l: Partial<CoverLetterContent> & Pick<CoverLetterContent, 'recipient' | 'subject' | 'body'>): CoverLetterContent => ({
  senderAddress: '',
  place: '',
  date: '',
  salutation: 'Madame, Monsieur,',
  closing: 'Je vous prie d’agréer, Madame, Monsieur, l’expression de mes salutations distinguées.',
  ...l,
});

export const LETTER_EXAMPLES_FR: LetterExample[] = [
  {
    slug: 'vendeur',
    cvSlug: 'vendeur',
    job: 'Vendeur / vendeuse',
    short: 'Vendeur',
    h1: 'Exemple de lettre de motivation vendeur / vendeuse',
    metaTitle: 'Lettre de motivation vendeur / vendeuse : exemple gratuit (PDF) – LogoLoom',
    metaDescription:
      'Un exemple de lettre de motivation pour un poste de vendeur ou vendeuse en boutique, à modifier gratuitement et à télécharger en PDF avec le CV assorti, sans compte.',
    intro:
      'Pour un poste en boutique, la lettre doit montrer que vous aimez le client et que vous faites vendre. Un chiffre concret vaut mieux que trois adjectifs.',
    color: '#7A2335',
    letter: L({
      recipient: 'Madame Hélène Roux\nResponsable de magasin\nMaison Delorme\n18 cours de l’Intendance\n33000 Bordeaux',
      subject: 'Candidature au poste de vendeuse en prêt-à-porter',
      salutation: 'Madame,',
      body:
        'Cliente de Maison Delorme depuis plusieurs années, j’apprécie la qualité de vos collections et le soin que votre équipe apporte au conseil. C’est pourquoi je vous propose ma candidature au poste de vendeuse que vous avez publié.\n\n' +
        'Vendeuse depuis quatre ans à la Boutique Garance, j’ai augmenté mon panier moyen de 15 % en un an grâce à la vente additionnelle, tout en assurant la caisse, le réassort et la mise en place des vitrines. Mes saisons à Arcachon m’ont appris à garder le sourire et le rythme pendant les soldes.\n\n' +
        'Disponible le samedi et pendant les périodes de forte affluence, je serais ravie de vous présenter ma façon de travailler lors d’un entretien, ou lors d’une journée d’essai en boutique.',
      closing: 'Je vous prie d’agréer, Madame, l’expression de mes salutations distinguées.',
    }),
    tips: [
      { title: 'Citez la boutique', body: 'Une phrase qui montre que vous connaissez l’enseigne (ses collections, son style) suffit à prouver que la lettre n’est pas envoyée à tout le monde.' },
      { title: 'Un chiffre de vente', body: 'Panier moyen, objectif atteint, taux de transformation : le recruteur retient un résultat bien plus qu’une liste de qualités.' },
      { title: 'Proposez un essai', body: 'En commerce, proposer une journée d’essai est courant et montre que vous êtes à l’aise sur le terrain.' },
    ],
    faq: [
      { q: 'Faut-il une lettre de motivation pour un poste de vendeur ?', a: 'Elle n’est pas toujours demandée, mais une lettre courte et ciblée vous distingue des candidatures envoyées sans un mot, surtout pour une boutique indépendante.' },
      { q: 'Quelle longueur pour une lettre de vendeur ?', a: 'Trois paragraphes courts, une demi-page à une page. Le recruteur la lit en moins d’une minute.' },
    ],
  },
  {
    slug: 'caissier',
    cvSlug: 'caissier',
    job: 'Caissier / caissière',
    short: 'Caissier',
    h1: 'Exemple de lettre de motivation caissier / caissière',
    metaTitle: 'Lettre de motivation caissière / caissier : exemple gratuit (PDF) – LogoLoom',
    metaDescription:
      'Exemple de lettre de motivation pour un poste d’hôte ou d’hôtesse de caisse en supermarché : fiabilité, disponibilités, accueil. Modifiable et gratuit en PDF.',
    intro:
      'En caisse, on recrute avant tout quelqu’un de fiable, souriant et disponible. Votre lettre doit le dire avec des faits : nombre de clients, caisse juste, horaires acceptés.',
    color: '#155E75',
    letter: L({
      recipient: 'Service recrutement\nSupermarché Les Halles du Nord\n5 avenue de la République\n59000 Lille',
      subject: 'Candidature au poste d’hôtesse de caisse',
      body:
        'Hôtesse de caisse depuis trois ans en hypermarché, je souhaite rejoindre votre équipe et vous propose ma candidature pour le poste en CDI annoncé sur votre site.\n\n' +
        'À l’Hypermarché Grand Nord, j’encaisse chaque jour entre 250 et 300 clients et je n’ai eu aucun écart de caisse cette année. J’assure aussi l’accueil au point information et j’ai formé quatre nouvelles hôtesses à l’ouverture et à la clôture.\n\n' +
        'Disponible en horaires décalés et le dimanche matin, j’habite à dix minutes de votre magasin. Je serais heureuse de vous rencontrer pour en parler.',
    }),
    tips: [
      { title: 'Vos disponibilités', body: 'Horaires décalés, week-end, jours fériés : c’est souvent le premier critère du recruteur. Dites-les clairement.' },
      { title: 'La fiabilité en chiffres', body: 'Nombre de clients par jour et caisse juste à la clôture : deux faits qui rassurent plus qu’un « je suis rigoureuse ».' },
      { title: 'La proximité', body: 'Habiter près du magasin est un vrai argument pour des horaires tôt le matin ou tard le soir.' },
    ],
    faq: [
      { q: 'Que mettre dans une lettre de motivation de caissière sans expérience ?', a: 'Parlez de vos expériences de contact client (job d’été, bénévolat, associations), de votre aisance avec les chiffres et de vos disponibilités.' },
      { q: 'Peut-on envoyer la même lettre à plusieurs magasins ?', a: 'Gardez la même base, mais changez au moins le nom du magasin et une phrase sur l’enseigne. Une lettre générique se repère tout de suite.' },
    ],
  },
  {
    slug: 'serveur',
    cvSlug: 'serveur',
    job: 'Serveur / serveuse',
    short: 'Serveur',
    h1: 'Exemple de lettre de motivation serveur / serveuse',
    metaTitle: 'Lettre de motivation serveur / serveuse : exemple gratuit (PDF) – LogoLoom',
    metaDescription:
      'Exemple de lettre de motivation pour un poste de serveur ou chef de rang en restaurant : rythme, couverts, disponibilités. À modifier et télécharger gratuitement.',
    intro:
      'En restauration, la lettre doit être courte et concrète : combien de couverts vous tenez, dans quel type d’établissement, et quand vous êtes disponible.',
    color: '#1F5C4A',
    letter: L({
      recipient: 'Monsieur Antoine Guérin\nGérant\nLe Bistrot de l’Île\n3 quai de la Fosse\n44000 Nantes',
      subject: 'Candidature au poste de chef de rang',
      salutation: 'Monsieur,',
      body:
        'Votre annonce pour un chef de rang a retenu toute mon attention : votre carte de saison et votre terrasse sur les quais correspondent exactement au service que j’aime faire.\n\n' +
        'Chef de rang à la Brasserie du Port depuis 2022, je sers de 120 à 180 couverts par service au sein d’une équipe de six. Je prends les commandes sur tablette, je conseille les vins du jour et je forme les extras pendant la saison. Mes trois ans au Comptoir des Halles m’ont aussi rendu à l’aise derrière le bar.\n\n' +
        'Disponible en coupure, le soir et le week-end, je peux faire un service d’essai quand vous le souhaitez.',
      closing: 'Je vous prie d’agréer, Monsieur, l’expression de mes salutations distinguées.',
    }),
    tips: [
      { title: 'Le volume', body: 'Le nombre de couverts par service dit tout de votre rythme. C’est l’information que le gérant cherche en premier.' },
      { title: 'Le type de service', body: 'Brasserie, gastronomique, terrasse, bar : précisez où vous êtes à l’aise, pour qu’il vous imagine dans sa salle.' },
      { title: 'Le service d’essai', body: 'Le proposer vous-même montre de l’assurance. Beaucoup de restaurants recrutent comme ça.' },
    ],
    faq: [
      { q: 'Une lettre de motivation est-elle utile pour un poste de serveur ?', a: 'Pour un extra ou un saisonnier, souvent non. Pour un poste fixe de chef de rang ou dans un établissement réputé, une lettre courte fait la différence.' },
      { q: 'Faut-il parler des langues étrangères ?', a: 'Oui, surtout dans une ville touristique : l’anglais ou l’espagnol au service est un vrai plus.' },
    ],
  },
  {
    slug: 'aide-soignant',
    cvSlug: 'aide-soignant',
    job: 'Aide-soignant / aide-soignante',
    short: 'Aide-soignant',
    h1: 'Exemple de lettre de motivation aide-soignant / aide-soignante',
    metaTitle: 'Lettre de motivation aide-soignante : exemple gratuit (PDF) – LogoLoom',
    metaDescription:
      'Exemple de lettre de motivation d’aide-soignante diplômée en EHPAD ou à l’hôpital : savoir-être, soins, travail de nuit. Gratuit, modifiable, en PDF avec le CV.',
    intro:
      'Un établissement de santé cherche une soignante fiable, à l’écoute et qui s’intègre dans une équipe. Montrez votre expérience des soins et votre façon d’être avec les patients.',
    color: '#155E75',
    letter: L({
      recipient: 'Madame la Directrice des soins\nCentre hospitalier de Muret\nService des ressources humaines\n1 avenue de l’Hôpital\n31600 Muret',
      subject: 'Candidature au poste d’aide-soignante en médecine gériatrique',
      salutation: 'Madame la Directrice,',
      body:
        'Aide-soignante diplômée d’État depuis 2018, je souhaite rejoindre votre service de médecine gériatrique, dont j’ai pu apprécier la qualité de prise en charge lors du stage d’une collègue.\n\n' +
        'À l’EHPAD Les Tilleuls, j’assure les soins d’hygiène et de confort de 14 résidents par poste, la surveillance des constantes et les transmissions écrites. J’accompagne aussi les familles, y compris en fin de vie. Mes trois années en médecine polyvalente à la Clinique Saint-Exupère m’ont habituée au rythme d’un service hospitalier.\n\n' +
        'Habituée au travail de nuit et en douze heures, je suis disponible pour un entretien à votre convenance.',
      closing: 'Je vous prie d’agréer, Madame la Directrice, l’expression de mes salutations respectueuses.',
    }),
    tips: [
      { title: 'Le diplôme d’abord', body: 'Le DEAS et son année sont la première chose vérifiée. Mettez-les dès la première phrase.' },
      { title: 'Le nombre de patients', body: 'Combien de résidents ou de lits par poste : un chiffre simple qui montre votre charge de travail réelle.' },
      { title: 'Le savoir-être', body: 'Dignité, écoute, accompagnement des familles : dites-le avec une situation concrète plutôt qu’avec des adjectifs.' },
    ],
    faq: [
      { q: 'Comment s’adresser à la direction d’un hôpital ?', a: '« Madame la Directrice » ou « Monsieur le Directeur des soins » est la formule habituelle. Reprenez-la dans la formule de politesse.' },
      { q: 'Faut-il joindre son diplôme ?', a: 'Pas avec la lettre, sauf si l’annonce le demande. Il sera vérifié à l’embauche.' },
    ],
  },
  {
    slug: 'auxiliaire-de-vie',
    cvSlug: 'auxiliaire-de-vie',
    job: 'Auxiliaire de vie',
    short: 'Auxiliaire de vie',
    h1: 'Exemple de lettre de motivation auxiliaire de vie',
    metaTitle: 'Lettre de motivation auxiliaire de vie : exemple gratuit (PDF) – LogoLoom',
    metaDescription:
      'Exemple de lettre de motivation d’auxiliaire de vie à domicile : autonomie, accompagnement, relation avec les familles. Gratuit, modifiable et en PDF.',
    intro:
      'À domicile, l’employeur doit pouvoir vous faire confiance seule chez les bénéficiaires. Votre lettre doit inspirer cette confiance : autonomie, ponctualité, discrétion.',
    color: '#1F5C4A',
    letter: L({
      recipient: 'Service recrutement\nAssociation Domicile Plus\n22 rue de la Liberté\n21000 Dijon',
      subject: 'Candidature au poste d’auxiliaire de vie à domicile',
      body:
        'Auxiliaire de vie depuis sept ans, je souhaite rejoindre Domicile Plus, dont l’attachement à l’autonomie des personnes accompagnées rejoint ma façon de travailler.\n\n' +
        'À l’association Bien Chez Soi, j’accompagne chaque semaine huit bénéficiaires âgés ou en situation de handicap : toilette, habillage, repas, courses et sorties. Je travaille en lien régulier avec les familles et l’infirmière coordinatrice, et je sais organiser seule mes interventions sur Dijon et ses alentours.\n\n' +
        'Titulaire du DEAES et du permis B, je dispose d’un véhicule. Je serais heureuse d’échanger avec vous lors d’un entretien.',
    }),
    tips: [
      { title: 'L’autonomie', body: 'Vous travaillez seule chez les gens : montrez que vous savez organiser vos tournées et réagir sans attendre.' },
      { title: 'Le permis et le véhicule', body: 'C’est souvent indispensable à domicile. S’il est dans votre CV, rappelez-le dans la lettre.' },
      { title: 'Le lien avec les familles', body: 'Les employeurs apprécient une auxiliaire qui communique bien avec l’entourage et l’équipe soignante.' },
    ],
    faq: [
      { q: 'Peut-on postuler comme auxiliaire de vie sans diplôme ?', a: 'Oui, beaucoup de structures recrutent sans diplôme et forment ensuite. Mettez alors en avant votre expérience auprès de proches ou en bénévolat.' },
      { q: 'Faut-il parler de ses horaires ?', a: 'Oui : week-ends, soirées ou remplacements d’été sont souvent recherchés.' },
    ],
  },
  {
    slug: 'assistant-administratif',
    cvSlug: 'assistant-administratif',
    job: 'Assistant(e) administratif(ve)',
    short: 'Assistante administrative',
    h1: 'Exemple de lettre de motivation assistante administrative',
    metaTitle: 'Lettre de motivation assistante administrative : exemple gratuit (PDF) – LogoLoom',
    metaDescription:
      'Exemple de lettre de motivation d’assistant ou assistante administrative en PME : organisation, facturation, accueil. Modifiable gratuitement et en PDF.',
    intro:
      'Une assistante administrative est jugée sur son organisation. Une lettre bien construite, sans faute, avec des résultats précis, est déjà une preuve.',
    color: '#2340A8',
    letter: L({
      recipient: 'Madame Sandrine Le Gall\nDirectrice administrative et financière\nOuest Énergies\n14 rue de Paris\n35000 Rennes',
      subject: 'Candidature au poste d’assistante administrative',
      salutation: 'Madame,',
      body:
        'Votre annonce pour une assistante administrative au sein d’Ouest Énergies m’intéresse vivement : rejoindre une entreprise en croissance, avec des missions de facturation et de suivi client, correspond exactement à ce que je fais depuis cinq ans.\n\n' +
        'Chez Bati Ouest, je saisis une soixantaine de devis et factures par mois, je gère les agendas de trois conducteurs de travaux et j’assure l’accueil. J’ai mis en place des relances régulières qui ont réduit le délai moyen de paiement de 12 jours.\n\n' +
        'Organisée et discrète, je suis à l’aise avec Excel et les logiciels de facturation. Je serais ravie de vous présenter mon parcours lors d’un entretien.',
      closing: 'Je vous prie d’agréer, Madame, l’expression de mes salutations distinguées.',
    }),
    tips: [
      { title: 'Zéro faute', body: 'Pour ce métier, une seule faute dans la lettre peut suffire à écarter la candidature. Relisez à voix haute.' },
      { title: 'Un résultat mesurable', body: 'Délai de paiement réduit, temps gagné, nombre de factures : un chiffre montre l’impact de votre organisation.' },
      { title: 'Les logiciels', body: 'Citez les outils que vous maîtrisez vraiment : pack Office, logiciel de facturation, CRM.' },
    ],
    faq: [
      { q: 'Lettre de motivation ou email de candidature ?', a: 'Si vous postulez par email, mettez un message court dans le corps et la lettre en PDF en pièce jointe, avec le CV.' },
      { q: 'Faut-il parler de son salaire ?', a: 'Non, sauf si l’annonce demande vos prétentions. Gardez ce sujet pour l’entretien.' },
    ],
  },
  {
    slug: 'preparateur-de-commandes',
    cvSlug: 'preparateur-de-commandes',
    job: 'Préparateur / préparatrice de commandes',
    short: 'Préparateur de commandes',
    h1: 'Exemple de lettre de motivation préparateur de commandes',
    metaTitle: 'Lettre de motivation préparateur de commandes : exemple gratuit (PDF) – LogoLoom',
    metaDescription:
      'Exemple de lettre de motivation de préparateur de commandes en entrepôt : cadence, fiabilité, CACES, horaires. À modifier et télécharger gratuitement en PDF.',
    intro:
      'En logistique, on regarde la cadence, la fiabilité, les CACES et les horaires. Une lettre courte qui donne ces quatre informations suffit.',
    color: '#383D39',
    letter: L({
      recipient: 'Service des ressources humaines\nEntrepôt Loire Logistique\nZone d’activités des Varennes\n45770 Saran',
      subject: 'Candidature au poste de préparateur de commandes (équipe de nuit)',
      body:
        'Préparateur de commandes depuis cinq ans, je vous propose ma candidature pour le poste en équipe de nuit annoncé sur votre site carrières.\n\n' +
        'Chez LogiCentre, je prépare de 180 à 220 lignes par heure au scanner, avec moins de 0,3 % d’erreurs. Je charge et décharge les camions au chariot, je contrôle et emballe les colis, et je suis référent sécurité de l’équipe de nuit.\n\n' +
        'Titulaire des CACES R489 catégories 1, 3 et 5, je suis disponible immédiatement en équipes alternées ou de nuit. Je reste à votre disposition pour un entretien.',
    }),
    tips: [
      { title: 'La cadence', body: 'Lignes ou colis par heure : c’est l’indicateur que tout chef d’équipe connaît.' },
      { title: 'Les CACES', body: 'Précisez la recommandation (R489) et les catégories. Sans eux, la candidature est souvent écartée.' },
      { title: 'La sécurité', body: 'Être référent sécurité ou n’avoir aucun accident est un argument fort en entrepôt.' },
    ],
    faq: [
      { q: 'Faut-il une lettre de motivation pour un poste en entrepôt ?', a: 'Pas toujours, surtout en intérim. Pour un CDI ou une grande plateforme, une lettre courte montre votre sérieux.' },
      { q: 'Comment parler de ses CACES ?', a: 'Donnez la recommandation, les catégories et l’année d’obtention. Vérifiez qu’ils sont encore valides.' },
    ],
  },
  {
    slug: 'agent-d-entretien',
    cvSlug: 'agent-d-entretien',
    job: 'Agent / agente d’entretien',
    short: 'Agent d’entretien',
    h1: 'Exemple de lettre de motivation agent d’entretien',
    metaTitle: 'Lettre de motivation agent d’entretien : exemple gratuit (PDF) – LogoLoom',
    metaDescription:
      'Exemple de lettre de motivation d’agent ou agente d’entretien : bureaux, établissements de santé, protocoles d’hygiène, horaires. Gratuit et modifiable en PDF.',
    intro:
      'Pour un poste d’entretien, l’employeur veut quelqu’un de ponctuel, soigneux et autonome. Dites où vous avez travaillé, avec quel matériel et à quels horaires.',
    color: '#155E75',
    letter: L({
      recipient: 'Service recrutement\nPropreté Méditerranée\n40 boulevard National\n13003 Marseille',
      subject: 'Candidature au poste d’agente d’entretien',
      body:
        'Agente d’entretien depuis six ans, je souhaite rejoindre Propreté Méditerranée et vous propose ma candidature pour le poste en milieu hospitalier publié sur votre site.\n\n' +
        'Chez Net’Services Provence, j’entretiens chaque matin 1 200 m² de bureaux, avec l’autolaveuse et la monobrosse. Auparavant, à la Clinique du Littoral, j’ai réalisé le bionettoyage des chambres et des blocs en suivant les protocoles d’hygiène.\n\n' +
        'Ponctuelle et autonome, je travaille volontiers tôt le matin ou en soirée. Je suis disponible pour un entretien quand vous le souhaitez.',
    }),
    tips: [
      { title: 'Le type de sites', body: 'Bureaux, hôpital, école, industrie : chaque milieu a ses exigences. Citez ceux que vous connaissez.' },
      { title: 'Le matériel', body: 'Autolaveuse, monobrosse, méthode de pré-imprégnation : nommez ce que vous savez utiliser.' },
      { title: 'Les horaires', body: 'Tôt le matin, le soir, en horaires coupés : c’est souvent décisif. Dites-les clairement.' },
    ],
    faq: [
      { q: 'Que dire si on n’a pas de diplôme ?', a: 'Mettez en avant votre expérience, votre ponctualité et les protocoles que vous connaissez. Beaucoup d’entreprises forment sur place.' },
      { q: 'La lettre doit-elle être longue ?', a: 'Non. Trois paragraphes courts suffisent pour ce poste.' },
    ],
  },
  {
    slug: 'infirmier',
    cvSlug: 'infirmier',
    job: 'Infirmier / infirmière',
    short: 'Infirmier',
    h1: 'Exemple de lettre de motivation infirmier / infirmière',
    metaTitle: 'Lettre de motivation infirmière : exemple gratuit (PDF) – LogoLoom',
    metaDescription:
      'Exemple de lettre de motivation d’infirmière diplômée d’État pour un poste à l’hôpital ou en clinique : soins techniques, organisation, encadrement. Gratuit en PDF.',
    intro:
      'Une infirmière est recrutée pour ses compétences techniques et sa capacité à gérer les priorités. Votre lettre doit relier votre expérience au service visé.',
    color: '#155E75',
    letter: L({
      recipient: 'Madame la Cadre de santé\nService de chirurgie digestive\nHôpital Saint-Éloi\n80 avenue Augustin-Fliche\n34090 Montpellier',
      subject: 'Candidature au poste d’infirmière en chirurgie digestive',
      salutation: 'Madame la Cadre de santé,',
      body:
        'Infirmière diplômée d’État depuis 2020, je souhaite rejoindre votre service de chirurgie digestive pour continuer à développer mon expertise en soins post-opératoires.\n\n' +
        'En chirurgie orthopédique au Centre hospitalier du Littoral, je prends en charge 10 à 12 patients par poste de douze heures : soins pré et postopératoires, pansements complexes, perfusions et éducation thérapeutique avant la sortie. J’encadre aussi les étudiants infirmiers en stage. Mes deux années en médecine polyvalente m’ont donné une bonne base clinique.\n\n' +
        'Organisée dans la gestion des priorités et attentive aux patients comme à leurs proches, je serais heureuse de vous rencontrer pour échanger sur le poste.',
      closing: 'Je vous prie d’agréer, Madame la Cadre de santé, l’expression de mes salutations respectueuses.',
    }),
    tips: [
      { title: 'Le service visé', body: 'Nommez le service et reliez-le à votre expérience : c’est ce qui montre que votre candidature est réfléchie.' },
      { title: 'La charge de travail', body: 'Nombre de patients par poste et durée des postes donnent une image précise de votre expérience.' },
      { title: 'L’encadrement', body: 'Tutorat des étudiants, accueil des nouveaux : des responsabilités appréciées par les cadres.' },
    ],
    faq: [
      { q: 'À qui adresser la lettre ?', a: 'À la direction des soins ou au cadre de santé du service quand vous le connaissez. Sinon, au service des ressources humaines.' },
      { q: 'Faut-il une lettre pour une infirmière jeune diplômée ?', a: 'Oui : appuyez-vous sur vos stages, en précisant les services et les soins pratiqués.' },
    ],
  },
  {
    slug: 'chauffeur-livreur',
    cvSlug: 'chauffeur-livreur',
    job: 'Chauffeur livreur / chauffeuse livreuse',
    short: 'Chauffeur livreur',
    h1: 'Exemple de lettre de motivation chauffeur livreur',
    metaTitle: 'Lettre de motivation chauffeur livreur : exemple gratuit (PDF) – LogoLoom',
    metaDescription:
      'Exemple de lettre de motivation de chauffeur livreur (permis B ou C) : tournées, ponctualité, sécurité. À modifier gratuitement et à télécharger en PDF.',
    intro:
      'Un transporteur cherche un chauffeur ponctuel, prudent et organisé. Permis, nombre de points de livraison et absence d’accident : voilà votre lettre.',
    color: '#155E75',
    letter: L({
      recipient: 'Monsieur Karim Haddad\nResponsable d’exploitation\nRhône Express Logistique\n9 rue du Dauphiné\n69800 Saint-Priest',
      subject: 'Candidature au poste de chauffeur livreur poids lourd',
      salutation: 'Monsieur,',
      body:
        'Chauffeur livreur depuis cinq ans, titulaire du permis C et de la FIMO marchandises, je vous propose ma candidature pour le poste de chauffeur porteur que vous recherchez.\n\n' +
        'Chez Trans’Rhône Messagerie, j’effectue chaque jour des tournées de 25 à 40 points de livraison en porteur 19 tonnes. Je charge et cale la marchandise, je saisis les livraisons sur terminal et j’assure l’entretien courant du véhicule. Je n’ai eu aucun accident responsable depuis le début de ma carrière.\n\n' +
        'Je connais bien l’agglomération lyonnaise et je suis disponible rapidement. Je serais heureux de vous rencontrer.',
      closing: 'Je vous prie d’agréer, Monsieur, l’expression de mes salutations distinguées.',
    }),
    tips: [
      { title: 'Les permis', body: 'Permis, FIMO, FCO, carte conducteur : listez-les avec leur validité, c’est le premier filtre.' },
      { title: 'La sécurité', body: 'Aucun accident responsable, zéro infraction : un argument simple et très apprécié.' },
      { title: 'Le secteur', body: 'Connaître la zone de livraison fait gagner du temps à l’employeur. Dites-le.' },
    ],
    faq: [
      { q: 'Faut-il mentionner son nombre de points sur le permis ?', a: 'Ce n’est pas obligatoire. Dire que vous n’avez eu aucun accident responsable suffit généralement.' },
      { q: 'Lettre courte ou longue ?', a: 'Courte : trois paragraphes. Le responsable d’exploitation la lit entre deux tournées.' },
    ],
  },
  {
    slug: 'alternance',
    cvSlug: 'alternance',
    job: 'Alternance',
    short: 'Alternance',
    h1: 'Exemple de lettre de motivation pour une alternance',
    metaTitle: 'Lettre de motivation alternance : exemple gratuit (PDF) – LogoLoom',
    metaDescription:
      'Exemple de lettre de motivation pour une alternance en BTS : formation, rythme, motivation, premières expériences. Modifiable gratuitement et en PDF.',
    intro:
      'Pour une alternance, l’entreprise recrute un futur collègue autant qu’un étudiant. Précisez la formation, le rythme, la date de début, et ce que vous apportez déjà.',
    color: '#2340A8',
    letter: L({
      recipient: 'Madame Laure Vidal\nResponsable commerciale\nOccitanie Bureautique\n27 allée Jean-Jaurès\n31000 Toulouse',
      subject: 'Candidature pour une alternance en BTS NDRC (rentrée de septembre)',
      salutation: 'Madame,',
      body:
        'Admis en BTS Négociation et digitalisation de la relation client au CFA du commerce de Toulouse, je recherche une entreprise pour deux ans d’alternance à partir de septembre, au rythme de deux jours en formation et trois jours en entreprise.\n\n' +
        'Occitanie Bureautique accompagne de nombreuses PME de la région, et j’aimerais apprendre la prospection et le suivi client à vos côtés. Téléconseiller en job étudiant, je traite environ 40 appels par jour et je propose déjà des options aux clients. Mon stage dans un magasin de sport m’a aussi appris le conseil en face à face.\n\n' +
        'Motivé et à l’aise au téléphone, je serais ravi de vous rencontrer pour vous présenter mon projet.',
      closing: 'Je vous prie d’agréer, Madame, l’expression de mes salutations distinguées.',
    }),
    tips: [
      { title: 'Formation, rythme, date', body: 'Le diplôme préparé, l’école, le rythme et la date de début doivent apparaître dès le premier paragraphe.' },
      { title: 'Ce que vous apportez déjà', body: 'Job étudiant, stage, projet personnel : montrez que vous serez utile dès les premières semaines.' },
      { title: 'Pourquoi cette entreprise', body: 'Une phrase sur ce que vous voulez apprendre chez eux vaut mieux qu’un paragraphe sur l’école.' },
    ],
    faq: [
      { q: 'Faut-il être admis à l’école pour envoyer sa lettre ?', a: 'Non. Si votre admission est en cours, dites-le simplement (« candidature en cours au BTS… »).' },
      { q: 'Quand envoyer ses candidatures d’alternance ?', a: 'Dès le printemps pour une rentrée de septembre : beaucoup d’entreprises recrutent leurs alternants plusieurs mois à l’avance.' },
    ],
  },
  {
    slug: 'etudiant',
    cvSlug: 'etudiant',
    job: 'Job étudiant',
    short: 'Job étudiant',
    h1: 'Exemple de lettre de motivation pour un job étudiant',
    metaTitle: 'Lettre de motivation job étudiant sans expérience : exemple gratuit (PDF) – LogoLoom',
    metaDescription:
      'Exemple de lettre de motivation pour un job étudiant sans expérience : disponibilités, sérieux, bénévolat. À modifier gratuitement et à télécharger en PDF.',
    intro:
      'Sans expérience, votre lettre mise sur vos disponibilités, votre sérieux et ce que vous avez déjà fait ailleurs : bénévolat, baby-sitting, associations.',
    color: '#2340A8',
    letter: L({
      recipient: 'Monsieur le Responsable\nCafé des Halles\n2 place Gaston-Paillhou\n37000 Tours',
      subject: 'Candidature pour un job étudiant le week-end',
      salutation: 'Monsieur,',
      body:
        'Étudiante en BTS Management commercial opérationnel à Tours, je cherche un emploi le week-end et pendant les vacances, et je serais heureuse de rejoindre l’équipe du Café des Halles.\n\n' +
        'Je n’ai pas encore travaillé en restauration, mais j’ai tenu pendant trois jours le stand de boissons du festival Terres du Son, en plus de l’accueil du public. Je garde aussi deux enfants plusieurs fois par semaine depuis 2023, ce qui demande ponctualité et sens des responsabilités.\n\n' +
        'Disponible dès maintenant le samedi et le dimanche, je peux passer vous rencontrer au café quand cela vous arrange.',
      closing: 'Je vous prie d’agréer, Monsieur, l’expression de mes salutations distinguées.',
    }),
    tips: [
      { title: 'Vos disponibilités', body: 'Week-ends, vacances, soirées : pour un job étudiant, c’est l’information principale.' },
      { title: 'Toute expérience compte', body: 'Bénévolat, baby-sitting, club de sport : racontez ce qui montre que vous êtes fiable.' },
      { title: 'Passez en personne', body: 'Pour un café ou une boutique, proposer de passer déposer votre candidature est souvent efficace.' },
    ],
    faq: [
      { q: 'Comment écrire une lettre de motivation sans expérience ?', a: 'Parlez de vos études, de vos activités (bénévolat, sport, garde d’enfants) et de ce qu’elles prouvent : ponctualité, contact, sens des responsabilités.' },
      { q: 'Faut-il dire que c’est un job temporaire ?', a: 'Oui, soyez clair sur vos disponibilités et la durée : l’employeur s’organise en conséquence.' },
    ],
  },
  {
    slug: 'candidature-spontanee',
    cvSlug: null,
    job: 'Candidature spontanée',
    short: 'Candidature spontanée',
    h1: 'Exemple de lettre de motivation pour une candidature spontanée',
    metaTitle: 'Lettre de motivation candidature spontanée : exemple gratuit (PDF) – LogoLoom',
    metaDescription:
      'Exemple de lettre de motivation pour une candidature spontanée, sans offre d’emploi : comment se présenter, cibler l’entreprise et proposer ses services. Gratuit en PDF.',
    intro:
      'Sans offre publiée, votre lettre doit expliquer pourquoi vous écrivez à cette entreprise, ce que vous pouvez lui apporter et quel poste vous visez.',
    color: '#383D39',
    letter: L({
      recipient: '[Nom du responsable]\n[Fonction]\n[Nom de l’entreprise]\n[Adresse]\n[Code postal et ville]',
      subject: 'Candidature spontanée pour un poste de [intitulé du poste]',
      body:
        'Je m’intéresse depuis plusieurs mois à [nom de l’entreprise], en particulier à [un projet, un produit ou une actualité de l’entreprise]. C’est pourquoi je me permets de vous adresser ma candidature spontanée pour un poste de [intitulé du poste].\n\n' +
        'Fort(e) de [X] années d’expérience en [domaine], j’ai notamment [une réalisation concrète, avec un chiffre]. Ces compétences pourraient vous être utiles pour [un besoin probable de l’entreprise : croissance, nouveau site, saison…].\n\n' +
        'Je sais qu’aucun poste n’est ouvert pour le moment, mais je serais heureux(se) d’échanger avec vous, même brièvement, pour vous présenter mon parcours. Je me permettrai de vous recontacter dans quelques jours.',
    }),
    tips: [
      { title: 'Le bon destinataire', body: 'Écrivez au responsable du service ou au dirigeant d’une petite entreprise, pas à une adresse générique.' },
      { title: 'Un poste précis', body: 'Même sans offre, dites quel poste vous visez. « Tout poste » donne l’impression que vous n’avez pas de projet.' },
      { title: 'La relance', body: 'Annoncez que vous rappellerez, puis faites-le une semaine plus tard : c’est souvent là que tout se joue.' },
    ],
    faq: [
      { q: 'Une candidature spontanée a-t-elle des chances ?', a: 'Oui, une partie des recrutements se fait sans offre publiée, surtout dans les petites entreprises. La clé est de bien cibler et de relancer.' },
      { q: 'Faut-il joindre un CV ?', a: 'Oui, toujours. La lettre donne envie de lire le CV, le CV prouve ce que vous dites dans la lettre.' },
    ],
  },
];

export function getLetterExample(slug: string): LetterExample | undefined {
  return LETTER_EXAMPLES_FR.find((e) => e.slug === slug);
}
