import type { CvCustomContent } from '@/types';
import type { CvExample } from './fr';

/**
 * Lebenslauf-Beispiele nach Beruf (Deutsch, DACH-Konventionen: tabellarisch,
 * antichronologisch, Daten im Format MM/JJJJ, Ort, Datum und Unterschrift am Ende).
 * Alle Personen, Firmen, E-Mails und Telefonnummern sind erfunden.
 */
export interface CvExampleDe extends CvExample {
  /** Slug of the matching French example, for hreflang. */
  fr?: string;
  /** Slug of the matching English example, for hreflang. */
  en?: string;
}

const PHONE = '+49 000 0000000';
const SIGN = { enabled: true, place: '', date: '', signatureUrl: null } as const;

const cv = (c: Omit<CvCustomContent, 'photoUrl' | 'link' | 'signOff'> & Partial<CvCustomContent>): CvCustomContent => ({
  photoUrl: null,
  link: '',
  signOff: { ...SIGN },
  ...c,
});

export const CV_EXAMPLES_DE: CvExampleDe[] = [
  {
    slug: 'verkaeufer',
    fr: 'vendeur',
    en: 'retail-sales-assistant',
    job: 'Verkäufer / Verkäuferin',
    short: 'Verkäufer/in',
    metaTitle: 'Lebenslauf Verkäufer/in – Muster kostenlos als PDF | LogoLoom',
    metaDescription:
      'Lebenslauf-Muster für Verkäufer und Verkäuferinnen: Kurzprofil, Aufgaben mit Ergebnissen, gefragte Kenntnisse. Kostenlos anpassen und als PDF herunterladen, ohne Anmeldung.',
    intro:
      'Filialleitungen suchen Menschen, die gern beraten, verkaufen können und an Kasse und Ware zuverlässig sind. Dieser Lebenslauf zeigt alles drei mit einfachen Zahlen.',
    color: '#7A2335',
    cv: cv({
      layout: 'sidebar',
      fullName: 'Sarah Becker',
      jobTitle: 'Verkäuferin im Einzelhandel',
      email: 'sarah.becker@beispiel.de',
      phone: PHONE,
      city: 'Hannover',
      summary:
        'Verkäuferin mit 5 Jahren Erfahrung im Modeeinzelhandel. Ich berate gern, finde mit Kundinnen und Kunden schnell das Passende und bleibe auch im Weihnachtsgeschäft freundlich und genau an der Kasse.',
      experiences: [
        {
          role: 'Verkäuferin',
          company: 'Modehaus Lindner',
          location: 'Hannover',
          start: '04/2021',
          end: 'heute',
          details:
            'Beratung und Verkauf auf 400 m² Verkaufsfläche (Bon-Durchschnitt +12 % in einem Jahr)\nKassenabrechnung und Tagesabschluss ohne Differenzen\nWarenannahme, Auszeichnung und Nachfüllen der Fläche\nGestaltung der Schaufenster nach Vorgaben der Zentrale',
        },
        {
          role: 'Aushilfe im Verkauf',
          company: 'Schuh & Sohle',
          location: 'Hildesheim',
          start: '09/2019',
          end: '03/2021',
          details: 'Verkauf und Kasse an Samstagen und im Schlussverkauf\nMithilfe bei der Inventur',
        },
      ],
      education: [
        { degree: 'Ausbildung zur Verkäuferin (IHK)', school: 'Kaufhaus Brandt, Hildesheim', start: '08/2017', end: '07/2019', details: '' },
        { degree: 'Realschulabschluss', school: 'Realschule Hildesheim-Nord', start: '2011', end: '2017', details: '' },
      ],
      skills: ['Kundenberatung', 'Kassensysteme', 'Warenpräsentation', 'Zusatzverkauf', 'Warenannahme', 'Inventur'],
      languages: [
        { name: 'Deutsch', level: 'Muttersprache' },
        { name: 'Englisch', level: 'Gute Kenntnisse (B1)' },
      ],
      interests: 'Mode, Laufen',
    }),
    tips: [
      { title: 'Ergebnisse statt Aufgaben', body: '„Bon-Durchschnitt +12 %“ sagt mehr als „Kunden bedient“. Schon eine Zahl pro Station hebt Ihren Lebenslauf ab.' },
      { title: 'Die Kasse erwähnen', body: 'Ein Tagesabschluss ohne Differenzen zeigt Vertrauenswürdigkeit. Genau das sucht jede Filialleitung.' },
      { title: 'Verfügbarkeit nennen', body: 'Samstage, Spätschichten, Weihnachtsgeschäft: Wenn Sie flexibel sind, schreiben Sie es ins Kurzprofil.' },
      { title: 'Eine Seite reicht', body: 'Für den Verkauf genügt eine klare Seite. Ort, Datum und Unterschrift setzen Sie unten darunter.' },
    ],
    keywords: ['Kundenberatung', 'Verkaufsziele', 'Kassenabrechnung', 'Warenpräsentation', 'Visual Merchandising', 'Zusatzverkauf', 'Warenwirtschaft', 'Teamfähigkeit', 'Flexible Arbeitszeiten'],
    summaries: [
      'Freundliche Verkäuferin mit 5 Jahren Erfahrung im Modehandel, sicher an der Kasse und im Umgang mit Stoßzeiten. Ich suche eine Vollzeitstelle mit Beratungsschwerpunkt.',
      'Motivierter Quereinsteiger aus der Gastronomie mit viel Kundenkontakt. Flexibel einsetzbar, auch samstags und abends.',
    ],
    faq: [
      { q: 'Was gehört in den Lebenslauf einer Verkäuferin?', a: 'Ein kurzes Profil, Ihre Stationen im Handel mit ein oder zwei Ergebnissen, Kenntnisse wie Kasse und Warenwirtschaft, Sprachen und Ihre Verfügbarkeit. Am Ende Ort, Datum und Unterschrift.' },
      { q: 'Brauche ich ein Bewerbungsfoto?', a: 'Nein, ein Foto ist in Deutschland freiwillig. Im Verkauf ist ein freundliches, professionelles Foto aber weiterhin üblich und kann helfen.' },
    ],
  },
  {
    slug: 'kassierer',
    fr: 'caissier',
    en: 'cashier',
    job: 'Kassierer / Kassiererin',
    short: 'Kassierer/in',
    metaTitle: 'Lebenslauf Kassierer/in – Muster kostenlos als PDF | LogoLoom',
    metaDescription:
      'Lebenslauf-Muster für Kassierer und Kassiererinnen im Supermarkt: Genauigkeit, Tempo und Kundenservice auf einer Seite. Kostenlos bearbeiten und als PDF laden.',
    intro:
      'An der Kasse zählen drei Dinge: Genauigkeit beim Geld, Tempo bei langen Schlangen und ein freundliches Wort für jeden Kunden. Sagen Sie es klar und belegen Sie es mit Fakten.',
    color: '#155E75',
    cv: cv({
      layout: 'classic',
      fullName: 'Mehmet Yilmaz',
      jobTitle: 'Kassierer im Lebensmitteleinzelhandel',
      email: 'mehmet.yilmaz@beispiel.de',
      phone: PHONE,
      city: 'Dortmund',
      summary:
        'Kassierer mit 4 Jahren Erfahrung in einem stark frequentierten Supermarkt. Schnell und genau an der Kasse, ruhig bei Andrang und immer höflich. Verfügbar für Früh-, Spät- und Samstagsschichten.',
      experiences: [
        {
          role: 'Kassierer',
          company: 'FrischMarkt GmbH',
          location: 'Dortmund',
          start: '02/2022',
          end: 'heute',
          details:
            'Bis zu 350 Kundinnen und Kunden pro Schicht an Bedien- und SB-Kassen\nKassenabschluss ohne Differenz bei allen Prüfungen 2024\nRückgaben, Pfand, Jugendschutz und Kundenkarten\nEinarbeitung von 4 neuen Aushilfen',
        },
        {
          role: 'Aushilfe Kasse und Regalservice',
          company: 'Nahkauf am Markt',
          location: 'Dortmund',
          start: '06/2020',
          end: '01/2022',
          details: 'Kasse, Warenverräumung und MHD-Kontrolle\nÖffnen und Schließen der Filiale am Wochenende',
        },
      ],
      education: [
        { degree: 'Hauptschulabschluss nach Klasse 10', school: 'Gesamtschule Dortmund-Scharnhorst', start: '2014', end: '2020', details: '' },
      ],
      skills: ['Kassensysteme', 'Bargeldhandling', 'SB-Kassen', 'Jugendschutz', 'Reklamationen', 'Regalservice'],
      languages: [
        { name: 'Deutsch', level: 'Verhandlungssicher (C1)' },
        { name: 'Türkisch', level: 'Muttersprache' },
      ],
      interests: 'Fußball im Verein, Kochen',
      drivingLicence: 'Klasse B',
    }),
    tips: [
      { title: 'Genauigkeit zuerst', body: 'Ein stimmender Kassenabschluss ist das Erste, worauf die Marktleitung schaut. Wenn Ihrer immer stimmt, schreiben Sie es.' },
      { title: 'Tempo zeigen', body: 'Kunden pro Schicht oder Stoßzeiten zeigen, dass Sie auch bei langer Schlange mithalten.' },
      { title: 'Abläufe benennen', body: 'Jugendschutz, Pfand, Reklamationen, SB-Kassen: Diese Begriffe zeigen, dass Sie wenig Einarbeitung brauchen.' },
      { title: 'Schichten angeben', body: 'Früh, spät, samstags: Flexibilität ist im Supermarkt ein großes Plus.' },
    ],
    keywords: ['Kassieren', 'Kassenabschluss', 'Bargeldhandling', 'Kundenservice', 'SB-Kasse', 'Jugendschutz', 'Pfandrücknahme', 'Warenverräumung', 'Schichtbereitschaft'],
    summaries: [
      'Zuverlässiger Kassierer mit 4 Jahren Erfahrung im Supermarkt. Genau beim Geld, schnell an der Kasse und freundlich auch unter Druck.',
      'Schülerin, verfügbar abends und samstags, erfahren im Umgang mit Geld als Kassenwartin im Sportverein. Ich suche einen Minijob an der Kasse.',
    ],
    faq: [
      { q: 'Wie schreibe ich einen Lebenslauf als Kassiererin ohne Erfahrung?', a: 'Nennen Sie alles, was Zuverlässigkeit beim Geld und Kundenkontakt zeigt: Ferienjobs, Vereinskasse, Praktika. Dazu Ihre Verfügbarkeit.' },
      { q: 'Gehört der Schulabschluss in den Lebenslauf?', a: 'Ja, unter „Ausbildung“. Bei wenig Berufserfahrung ist er besonders wichtig.' },
    ],
  },
  {
    slug: 'pflegehelfer',
    fr: 'aide-soignant',
    en: 'healthcare-assistant',
    job: 'Pflegehelfer / Pflegehelferin',
    short: 'Pflegehelfer/in',
    metaTitle: 'Lebenslauf Pflegehelfer/in – Muster kostenlos als PDF | LogoLoom',
    metaDescription:
      'Lebenslauf-Muster für Pflegehelfer und Pflegehelferinnen in Klinik und Altenpflege: Aufgaben, Qualifikationen, Kurzprofil. Kostenlos anpassen und als PDF herunterladen.',
    intro:
      'Pflegedienstleitungen wollen auf einen Blick sehen: Wo haben Sie gearbeitet, welche Qualifikation haben Sie, und können Sie im Schichtdienst einspringen? Dieser Lebenslauf beantwortet genau das.',
    color: '#1F5C4A',
    cv: cv({
      layout: 'sidebar',
      fullName: 'Julia Hoffmann',
      jobTitle: 'Pflegehelferin',
      email: 'julia.hoffmann@beispiel.de',
      phone: PHONE,
      city: 'Kassel',
      summary:
        'Pflegehelferin mit 6 Jahren Erfahrung in der stationären Altenpflege. Ich unterstütze Bewohnerinnen und Bewohner geduldig im Alltag, beobachte genau und arbeite eng mit den Pflegefachkräften zusammen. Schichtdienst und Wochenenden sind kein Problem.',
      experiences: [
        {
          role: 'Pflegehelferin',
          company: 'Seniorenzentrum Am Park',
          location: 'Kassel',
          start: '03/2020',
          end: 'heute',
          details:
            'Grundpflege und Mobilisation von 12 Bewohnerinnen und Bewohnern pro Schicht\nUnterstützung bei Mahlzeiten und Getränkeprotokollen\nDokumentation in der Pflegesoftware und Übergabe an die Fachkräfte\nBegleitung von Menschen mit Demenz im Tagesablauf',
        },
        {
          role: 'Betreuungskraft nach § 43b SGB XI',
          company: 'Haus Lindenhof',
          location: 'Baunatal',
          start: '01/2018',
          end: '02/2020',
          details: 'Einzel- und Gruppenangebote (Gedächtnistraining, Spaziergänge)\nBegleitung zu Arztterminen',
        },
      ],
      education: [
        { degree: 'Ausbildung zur staatlich anerkannten Altenpflegehelferin', school: 'Berufsfachschule für Altenpflege Kassel', start: '09/2019', end: '08/2020', details: 'berufsbegleitend' },
        { degree: 'Qualifizierung Betreuungskraft (160 Std.)', school: 'Bildungswerk Nordhessen', start: '2017', end: '2017', details: '' },
      ],
      skills: ['Grundpflege', 'Mobilisation', 'Pflegedokumentation', 'Demenzbetreuung', 'Lagerung', 'Erste Hilfe'],
      languages: [
        { name: 'Deutsch', level: 'Muttersprache' },
        { name: 'Polnisch', level: 'Gute Kenntnisse (B1)' },
      ],
      interests: 'Gärtnern, Wandern',
      drivingLicence: 'Klasse B',
    }),
    tips: [
      { title: 'Qualifikation nach oben', body: 'Staatlich anerkannte Helferausbildung, Betreuungskraft nach § 43b: Abschlüsse sind in der Pflege entscheidend. Nennen Sie sie genau.' },
      { title: 'Konkrete Aufgaben', body: 'Grundpflege, Mobilisation, Dokumentation: Die Leitung will wissen, was Sie ohne Einarbeitung können.' },
      { title: 'Schichtbereitschaft', body: 'Früh-, Spät-, Nachtdienst, Wochenende: Schreiben Sie ins Profil, was für Sie möglich ist.' },
      { title: 'Führerschein erwähnen', body: 'Für die ambulante Pflege ist er oft Pflicht. Tragen Sie ihn unter „Persönliche Daten“ ein.' },
    ],
    keywords: ['Grundpflege', 'Behandlungspflege (einfach)', 'Mobilisation', 'Pflegedokumentation', 'Demenz', 'Schichtdienst', 'Empathie', 'Hygiene', 'Teamarbeit'],
    summaries: [
      'Erfahrene Pflegehelferin mit 6 Jahren in der stationären Altenpflege, geduldig, aufmerksam und sicher in der Dokumentation.',
      'Quereinsteiger mit Erfahrung in der Pflege eines Angehörigen und Pflegebasiskurs. Ich möchte in der ambulanten Pflege anfangen.',
    ],
    faq: [
      { q: 'Kann ich ohne Ausbildung als Pflegehelfer arbeiten?', a: 'Ja, viele Einrichtungen stellen ungelernte Hilfskräfte ein. Ein Pflegebasiskurs oder die einjährige Helferausbildung verbessern Ihre Chancen deutlich.' },
      { q: 'Was schreibe ich ins Kurzprofil?', a: 'Ihre Erfahrung in Jahren, den Bereich (Klinik, stationär, ambulant), eine Stärke im Umgang mit Menschen und Ihre Schichtbereitschaft.' },
    ],
  },
  {
    slug: 'pflegefachkraft',
    fr: 'infirmier',
    job: 'Pflegefachkraft',
    short: 'Pflegefachkraft',
    h1: 'Lebenslauf Pflegefachkraft: Muster',
    label: 'Lebenslauf Pflegefachkraft',
    metaTitle: 'Lebenslauf Pflegefachkraft – Muster kostenlos als PDF | LogoLoom',
    metaDescription:
      'Lebenslauf-Muster für Pflegefachfrauen und Pflegefachmänner: Stationen, Fachweiterbildungen, Kurzprofil. Kostenlos bearbeiten und als PDF herunterladen, ohne Anmeldung.',
    intro:
      'Pflegefachkräfte werden überall gesucht, trotzdem lohnt sich ein klarer Lebenslauf: Fachbereich, Examen, Weiterbildungen und Verantwortung (Praxisanleitung, Schichtleitung) gehören nach vorn.',
    color: '#2340A8',
    cv: cv({
      layout: 'sidebar',
      fullName: 'Thomas Wagner',
      jobTitle: 'Pflegefachmann, Innere Medizin',
      email: 'thomas.wagner@beispiel.de',
      phone: PHONE,
      city: 'Freiburg im Breisgau',
      summary:
        'Examinierter Pflegefachmann mit 7 Jahren Erfahrung in der Inneren Medizin, davon 3 Jahre als Praxisanleiter. Sicher in der Behandlungspflege, ruhig in kritischen Situationen und gern im interprofessionellen Team.',
      experiences: [
        {
          role: 'Pflegefachmann und Praxisanleiter',
          company: 'Klinikum Breisgau',
          location: 'Freiburg',
          start: '10/2019',
          end: 'heute',
          details:
            'Pflege von bis zu 10 Patientinnen und Patienten pro Schicht auf einer internistischen Station (32 Betten)\nAnleitung von 6 Auszubildenden pro Jahr, Praxisprüfungen begleitet\nSchichtleitung im Spät- und Nachtdienst\nMitarbeit im Qualitätszirkel Sturzprophylaxe',
        },
        {
          role: 'Gesundheits- und Krankenpfleger',
          company: 'Kreiskrankenhaus Emmendingen',
          location: 'Emmendingen',
          start: '10/2017',
          end: '09/2019',
          details: 'Allgemeine Innere Medizin und Kardiologie\nAufnahme, Entlassmanagement, Medikamentenstellung',
        },
      ],
      education: [
        { degree: 'Weiterbildung Praxisanleitung (300 Std.)', school: 'Akademie für Gesundheitsberufe Freiburg', start: '2021', end: '2021', details: '' },
        { degree: 'Examen Gesundheits- und Krankenpfleger', school: 'Pflegeschule Emmendingen', start: '10/2014', end: '09/2017', details: '' },
      ],
      skills: ['Behandlungspflege', 'Praxisanleitung', 'Schichtleitung', 'Entlassmanagement', 'Wundversorgung', 'Pflegeplanung'],
      languages: [
        { name: 'Deutsch', level: 'Muttersprache' },
        { name: 'Englisch', level: 'Gute Kenntnisse (B2)' },
      ],
      interests: 'Klettern, Kochen',
    }),
    tips: [
      { title: 'Examen und Fachbereich', body: 'Berufsbezeichnung, Examensjahr und Fachbereich gehören in die ersten Zeilen. Danach Fachweiterbildungen.' },
      { title: 'Verantwortung zeigen', body: 'Praxisanleitung, Schichtleitung, Qualitätszirkel: Das unterscheidet Sie von anderen Bewerbungen.' },
      { title: 'Zahlen helfen auch hier', body: 'Bettenzahl, Patientinnen pro Schicht, Auszubildende pro Jahr: so wird Ihr Arbeitsalltag greifbar.' },
      { title: 'Ausländische Abschlüsse', body: 'Mit Anerkennung? Schreiben Sie „Berufsurkunde liegt vor“ oder „Anerkennung beantragt“ direkt zum Abschluss.' },
    ],
    keywords: ['Behandlungspflege', 'Grundpflege', 'Pflegeplanung', 'Praxisanleitung', 'Schichtleitung', 'Entlassmanagement', 'Wundmanagement', 'Hygiene', 'Dokumentation'],
    summaries: [
      'Pflegefachmann mit 7 Jahren Erfahrung in der Inneren Medizin und Weiterbildung zum Praxisanleiter. Verlässlich, strukturiert und gern in der Ausbildung engagiert.',
      'Frisch examinierte Pflegefachfrau mit Einsätzen in Chirurgie, Psychiatrie und ambulanter Pflege. Ich suche eine Station mit guter Einarbeitung.',
    ],
    faq: [
      { q: 'Wie lang darf der Lebenslauf einer Pflegefachkraft sein?', a: 'Eine bis zwei Seiten. Ältere Stationen können Sie kürzer fassen, Weiterbildungen und aktuelle Verantwortung ausführlicher.' },
      { q: 'Gehören Einsätze aus der Ausbildung in den Lebenslauf?', a: 'Bei Berufseinstieg ja, kurz unter der Ausbildung. Später reicht das Examen.' },
    ],
  },
  {
    slug: 'lagerist',
    fr: 'preparateur-de-commandes',
    en: 'warehouse-operative',
    job: 'Lagerist / Lageristin',
    short: 'Lagerist/in',
    metaTitle: 'Lebenslauf Lagerist/in – Muster kostenlos als PDF | LogoLoom',
    metaDescription:
      'Lebenslauf-Muster für Lageristen und Fachkräfte für Lagerlogistik: Staplerschein, Kommissionierung, Scanner. Kostenlos anpassen und als PDF herunterladen.',
    intro:
      'Im Lager zählen Tempo, Genauigkeit und die richtigen Scheine. Staplerschein, Scanner, Leistungszahlen: Wer sie klar nennt, wird schneller eingeladen.',
    color: '#383D39',
    cv: cv({
      layout: 'classic',
      fullName: 'Dennis Krüger',
      jobTitle: 'Fachkraft für Lagerlogistik',
      email: 'dennis.krueger@beispiel.de',
      phone: PHONE,
      city: 'Bielefeld',
      summary:
        'Fachkraft für Lagerlogistik mit 6 Jahren Erfahrung in Wareneingang, Kommissionierung und Versand. Gültiger Staplerschein, sicher mit Handscanner und SAP. Bereit für Schichtarbeit.',
      experiences: [
        {
          role: 'Fachkraft für Lagerlogistik',
          company: 'Ostwestfalen Logistik GmbH',
          location: 'Bielefeld',
          start: '08/2021',
          end: 'heute',
          details:
            'Kommissionierung von 180 Positionen pro Stunde (Ziel 150) mit Pick-by-Scan\nWareneingangskontrolle und Einlagerung im SAP EWM\nStaplerfahren im Hochregal bis 10 m\nEinarbeitung neuer Kolleginnen und Kollegen in der Spätschicht',
        },
        {
          role: 'Lagerhelfer',
          company: 'TeileDirekt Versand',
          location: 'Gütersloh',
          start: '09/2018',
          end: '07/2021',
          details: 'Verpackung und Versandvorbereitung\nMitarbeit bei der jährlichen Inventur',
        },
      ],
      education: [
        { degree: 'Ausbildung zur Fachkraft für Lagerlogistik (IHK)', school: 'Ostwestfalen Logistik GmbH, Bielefeld', start: '08/2018', end: '07/2021', details: '' },
        { degree: 'Staplerschein (DGUV 308-001)', school: 'TÜV Nord', start: '2018', end: '2018', details: '' },
      ],
      skills: ['Kommissionierung', 'Wareneingang', 'Gabelstapler', 'Handscanner', 'SAP EWM', 'Inventur', 'Ladungssicherung'],
      languages: [
        { name: 'Deutsch', level: 'Muttersprache' },
        { name: 'Russisch', level: 'Gute Kenntnisse (B1)' },
      ],
      interests: 'Fitness, Motorräder',
      drivingLicence: 'Klasse B, Staplerschein',
    }),
    tips: [
      { title: 'Scheine nach vorn', body: 'Staplerschein, Kranschein, Gefahrgut: Diese Nachweise entscheiden oft allein. Tragen Sie sie unter Ausbildung und Führerschein ein.' },
      { title: 'Leistung in Zahlen', body: 'Picks pro Stunde, Fehlerquote, Paletten pro Schicht: eine Zahl reicht, um Ihre Arbeitsweise zu zeigen.' },
      { title: 'Systeme nennen', body: 'SAP, Lagerverwaltungssystem, Handscanner: Wer sie kennt, braucht weniger Einarbeitung.' },
      { title: 'Schichtbereitschaft', body: 'Zwei- oder Dreischicht, Wochenende: Schreiben Sie es ins Profil, das spart eine Rückfrage.' },
    ],
    keywords: ['Kommissionierung', 'Wareneingang', 'Warenausgang', 'Staplerschein', 'Ladungssicherung', 'SAP', 'Handscanner', 'Inventur', 'Schichtarbeit'],
    summaries: [
      'Fachkraft für Lagerlogistik mit 6 Jahren Erfahrung, Staplerschein und sicher in SAP. Schnell, genau und bereit für Schichtarbeit.',
      'Motivierter Lagerhelfer ohne Ausbildung mit Ferienjob-Erfahrung im Versand. Körperlich belastbar und ab sofort verfügbar.',
    ],
    faq: [
      { q: 'Wo trage ich den Staplerschein ein?', a: 'Unter „Ausbildung“ mit Jahr und Stelle, und zusätzlich bei „Führerschein“ unter den persönlichen Daten. So fällt er sofort auf.' },
      { q: 'Lagerhelfer ohne Ausbildung: Was schreibe ich?', a: 'Ferienjobs, Aushilfen, Umzugshilfe, Sport: alles, was Belastbarkeit und Zuverlässigkeit zeigt. Dazu ab wann Sie verfügbar sind.' },
    ],
  },
  {
    slug: 'kaufmann-bueromanagement',
    fr: 'assistant-administratif',
    en: 'administrative-assistant',
    job: 'Kaufmann / Kauffrau für Büromanagement',
    short: 'Bürokauffrau/-mann',
    h1: 'Lebenslauf Kauffrau für Büromanagement: Muster',
    label: 'Lebenslauf Büromanagement',
    metaTitle: 'Lebenslauf Büromanagement / Bürokauffrau – Muster als PDF | LogoLoom',
    metaDescription:
      'Lebenslauf-Muster für Kaufleute für Büromanagement und Bürokräfte: Organisation, MS Office, Buchhaltung. Kostenlos bearbeiten und als PDF herunterladen, ohne Anmeldung.',
    intro:
      'Im Büro sucht man Menschen, die den Laden zusammenhalten: Termine, Rechnungen, Ablage, Kundenanfragen. Zeigen Sie, was über Ihren Schreibtisch läuft und welche Programme Sie beherrschen.',
    color: '#5B2A6E',
    cv: cv({
      layout: 'sidebar',
      fullName: 'Anna Schulz',
      jobTitle: 'Kauffrau für Büromanagement',
      email: 'anna.schulz@beispiel.de',
      phone: PHONE,
      city: 'Nürnberg',
      summary:
        'Kauffrau für Büromanagement mit 5 Jahren Erfahrung in der Assistenz eines mittelständischen Handwerksbetriebs. Ich organisiere gern, behalte Fristen im Blick und bin die erste Ansprechpartnerin für Kunden und Lieferanten.',
      experiences: [
        {
          role: 'Kauffrau für Büromanagement',
          company: 'Haustechnik Meier GmbH',
          location: 'Nürnberg',
          start: '09/2020',
          end: 'heute',
          details:
            'Auftragsannahme, Angebote und Rechnungen für rund 60 Aufträge im Monat\nVorbereitende Buchhaltung und Mahnwesen (offene Posten um 30 % reduziert)\nTerminplanung für 14 Monteure\nEinführung einer digitalen Ablage mit DATEV Unternehmen online',
        },
        {
          role: 'Auszubildende',
          company: 'Haustechnik Meier GmbH',
          location: 'Nürnberg',
          start: '09/2017',
          end: '08/2020',
          details: 'Empfang, Telefon, Post- und Ablageorganisation\nEinsätze in Einkauf und Personalverwaltung',
        },
      ],
      education: [
        { degree: 'Ausbildung zur Kauffrau für Büromanagement (IHK)', school: 'Städtische Berufsschule Nürnberg', start: '09/2017', end: '08/2020', details: '' },
        { degree: 'Fachhochschulreife', school: 'Fachoberschule Nürnberg', start: '2015', end: '2017', details: '' },
      ],
      skills: ['MS Office', 'DATEV', 'Rechnungswesen', 'Mahnwesen', 'Terminplanung', 'Korrespondenz', 'Ablageorganisation'],
      languages: [
        { name: 'Deutsch', level: 'Muttersprache' },
        { name: 'Englisch', level: 'Gute Kenntnisse (B2)' },
      ],
      interests: 'Yoga, Reisen',
    }),
    tips: [
      { title: 'Programme konkret nennen', body: 'Nicht nur „PC-Kenntnisse“: MS Office, DATEV, SAP, Lexware. Am besten mit Niveau (Grund-, gute, sehr gute Kenntnisse).' },
      { title: 'Volumen zeigen', body: 'Aufträge pro Monat, Anzahl betreuter Kollegen, Postfächer: so wird Ihre Arbeitslast vorstellbar.' },
      { title: 'Verbesserungen erwähnen', body: 'Digitale Ablage eingeführt, Mahnwesen verbessert: Das zeigt Eigeninitiative.' },
      { title: 'Ausbildung mit Kammer', body: 'Schreiben Sie „(IHK)“ hinter die Ausbildung. Das ist für Personalabteilungen ein bekanntes Qualitätssignal.' },
    ],
    keywords: ['Büroorganisation', 'MS Office', 'DATEV', 'Rechnungsstellung', 'Mahnwesen', 'Terminkoordination', 'Korrespondenz', 'Kundenservice', 'Zuverlässigkeit'],
    summaries: [
      'Organisierte Kauffrau für Büromanagement mit 5 Jahren Erfahrung, sicher in MS Office und DATEV, mit Blick für Fristen und Zahlen.',
      'Berufsrückkehrerin mit langjähriger Erfahrung im Sekretariat, aktuell Auffrischungskurs Office 365. Ich suche eine Teilzeitstelle im Büro.',
    ],
    faq: [
      { q: 'Wie beschreibe ich meine Office-Kenntnisse?', a: 'Nennen Sie jedes Programm einzeln und ordnen Sie es ein: „Excel (sehr gute Kenntnisse, SVERWEIS, Pivot)“ sagt mehr als „MS Office“.' },
      { q: 'Muss ich die Ausbildung und den Schulabschluss angeben?', a: 'Ja. Bei Berufserfahrung reicht der höchste Schulabschluss; Grundschule und frühere Schulen lassen Sie weg.' },
    ],
  },
  {
    slug: 'reinigungskraft',
    fr: 'agent-d-entretien',
    en: 'cleaner',
    job: 'Reinigungskraft',
    short: 'Reinigungskraft',
    h1: 'Lebenslauf Reinigungskraft: Muster',
    label: 'Lebenslauf Reinigungskraft',
    metaTitle: 'Lebenslauf Reinigungskraft – Muster kostenlos als PDF | LogoLoom',
    metaDescription:
      'Lebenslauf-Muster für Reinigungskräfte in Gebäude-, Büro- und Unterhaltsreinigung. Kurz, klar, kostenlos anpassen und als PDF herunterladen, ohne Anmeldung.',
    intro:
      'Für Reinigungsfirmen zählen Zuverlässigkeit, Gründlichkeit und Erfahrung mit den richtigen Mitteln und Maschinen. Ein kurzer, sauberer Lebenslauf reicht völlig.',
    color: '#155E75',
    cv: cv({
      layout: 'classic',
      fullName: 'Elena Popescu',
      jobTitle: 'Reinigungskraft, Gebäude- und Büroreinigung',
      email: 'elena.popescu@beispiel.de',
      phone: PHONE,
      city: 'Stuttgart',
      summary:
        'Reinigungskraft mit 8 Jahren Erfahrung in Büro- und Praxisreinigung. Gründlich, pünktlich und selbstständig, auch früh morgens oder abends. Vertraut mit Hygieneplänen und Reinigungsmaschinen.',
      experiences: [
        {
          role: 'Reinigungskraft (Objektleitung Vertretung)',
          company: 'Glanzwerk Gebäudeservice',
          location: 'Stuttgart',
          start: '05/2019',
          end: 'heute',
          details:
            'Unterhaltsreinigung von 3 Bürogebäuden (insgesamt 4.500 m²)\nPraxisreinigung nach Hygieneplan (Desinfektion, Sanitärbereiche)\nBedienung von Scheuersaugmaschine und Einscheibenmaschine\nVertretung der Objektleitung: Schlüsselverwaltung, Materialbestellung',
        },
        {
          role: 'Reinigungskraft',
          company: 'Hotel am Schlossgarten',
          location: 'Stuttgart',
          start: '03/2016',
          end: '04/2019',
          details: 'Zimmer- und Etagenreinigung (14 Zimmer pro Schicht)\nWäscheservice und Kontrolle der Minibars',
        },
      ],
      education: [
        { degree: 'Schulung Hygiene und Desinfektion in Arztpraxen', school: 'Innung Gebäudereiniger Stuttgart', start: '2020', end: '2020', details: '' },
        { degree: 'Abitur (in Deutschland anerkannt)', school: 'Liceul Teoretic, Brașov (Rumänien)', start: '2008', end: '2012', details: '' },
      ],
      skills: ['Unterhaltsreinigung', 'Sanitärreinigung', 'Desinfektion', 'Reinigungsmaschinen', 'Hygienepläne', 'Schlüsselverwaltung'],
      languages: [
        { name: 'Rumänisch', level: 'Muttersprache' },
        { name: 'Deutsch', level: 'Gute Kenntnisse (B2)' },
      ],
      interests: 'Kochen, Familie',
      drivingLicence: 'Klasse B',
    }),
    tips: [
      { title: 'Objekte und Flächen', body: 'Büro, Praxis, Hotel, Schule: Nennen Sie die Art der Objekte und, wenn möglich, die Fläche. So sieht man Ihre Erfahrung sofort.' },
      { title: 'Maschinen und Hygiene', body: 'Scheuersaugmaschine, Hygieneplan, Desinfektion: Fachbegriffe zeigen, dass Sie sofort einsetzbar sind.' },
      { title: 'Zeiten angeben', body: 'Früh morgens, abends, Wochenende: Viele Aufträge laufen außerhalb der Bürozeiten.' },
      { title: 'Deutschkenntnisse ehrlich', body: 'Ein Niveau wie „B1“ oder „B2“ ist besser als „gut“. Es zeigt, dass Sie Anweisungen und Pläne verstehen.' },
    ],
    keywords: ['Unterhaltsreinigung', 'Büroreinigung', 'Sanitärreinigung', 'Desinfektion', 'Hygieneplan', 'Reinigungsmaschinen', 'Zuverlässigkeit', 'Gründlichkeit', 'Selbstständiges Arbeiten'],
    summaries: [
      'Erfahrene Reinigungskraft mit 8 Jahren in Büro- und Praxisreinigung, gründlich, pünktlich und sicher mit Maschinen und Hygieneplänen.',
      'Zuverlässige Wiedereinsteigerin, verfügbar morgens von 5 bis 9 Uhr. Ich suche einen Minijob in der Büroreinigung.',
    ],
    faq: [
      { q: 'Brauche ich als Reinigungskraft überhaupt einen Lebenslauf?', a: 'Ja, die meisten Firmen fragen danach. Eine kurze, klare Seite reicht: Stationen, Objekte, Zeiten, Sprachen.' },
      { q: 'Wie gebe ich ausländische Abschlüsse an?', a: 'Mit Land und, wenn vorhanden, „in Deutschland anerkannt“. Für Reinigungsjobs ist der Abschluss aber selten entscheidend.' },
    ],
  },
  {
    slug: 'servicekraft',
    fr: 'serveur',
    en: 'waiter',
    job: 'Servicekraft / Kellner',
    short: 'Servicekraft',
    h1: 'Lebenslauf Servicekraft und Kellner: Muster',
    label: 'Lebenslauf Servicekraft',
    metaTitle: 'Lebenslauf Servicekraft / Kellner – Muster als PDF | LogoLoom',
    metaDescription:
      'Lebenslauf-Muster für Servicekräfte, Kellner und Kellnerinnen in Restaurant und Hotel. Kostenlos anpassen und als PDF herunterladen, ohne Anmeldung.',
    intro:
      'In der Gastronomie zählt, ob Sie Stress aushalten, freundlich bleiben und mehrere Tische gleichzeitig im Blick haben. Zeigen Sie es mit Zahlen und klaren Stationen.',
    color: '#7A2335',
    cv: cv({
      layout: 'sidebar',
      fullName: 'Luca Romano',
      jobTitle: 'Servicekraft im Restaurant',
      email: 'luca.romano@beispiel.de',
      phone: PHONE,
      city: 'München',
      summary:
        'Servicekraft mit 5 Jahren Erfahrung in Restaurants mit bis zu 120 Plätzen. Ich behalte auch an vollen Abenden den Überblick, berate gern zu Wein und Speisen und sorge dafür, dass Gäste wiederkommen.',
      experiences: [
        {
          role: 'Chef de Rang',
          company: 'Trattoria Isarblick',
          location: 'München',
          start: '04/2022',
          end: 'heute',
          details:
            'Verantwortung für 6 Tische (bis zu 30 Gäste) pro Abend\nWeinempfehlungen, Durchschnittsbon um 10 % gesteigert\nKassieren mit Orderman und Tagesabrechnung\nEinarbeitung von Aushilfen und Saisonkräften',
        },
        {
          role: 'Servicekraft',
          company: 'Hotel Alpenrose',
          location: 'Garmisch-Partenkirchen',
          start: '05/2020',
          end: '03/2022',
          details: 'Frühstücks- und Bankettservice für bis zu 200 Gäste\nZimmerservice und Barunterstützung',
        },
      ],
      education: [
        { degree: 'Ausbildung zum Restaurantfachmann (IHK)', school: 'Berufsschule für Gastronomie München', start: '09/2017', end: '07/2020', details: '' },
        { degree: 'Mittlerer Schulabschluss', school: 'Realschule München-Pasing', start: '2011', end: '2017', details: '' },
      ],
      skills: ['À-la-carte-Service', 'Weinberatung', 'Bankett', 'Orderman', 'Kassenabrechnung', 'Teamarbeit'],
      languages: [
        { name: 'Deutsch', level: 'Muttersprache' },
        { name: 'Italienisch', level: 'Fließend (C1)' },
        { name: 'Englisch', level: 'Gute Kenntnisse (B2)' },
      ],
      interests: 'Kochen, Fußball',
    }),
    tips: [
      { title: 'Größe des Betriebs', body: 'Plätze, Tische pro Abend, Bankettgröße: Damit versteht der Betrieb sofort, welches Tempo Sie gewohnt sind.' },
      { title: 'Sprachen sind Gold wert', body: 'Englisch und weitere Sprachen helfen besonders in Hotels und Touristenorten. Mit Niveau angeben.' },
      { title: 'Kassensystem nennen', body: 'Orderman, Gastrofix, eigene Kasse: Wer das System kennt, steht am ersten Abend schon im Service.' },
      { title: 'Verfügbarkeit', body: 'Abende, Wochenenden, Feiertage, Saison: Schreiben Sie, was geht. In der Gastronomie oft entscheidend.' },
    ],
    keywords: ['Gästebetreuung', 'À-la-carte', 'Bankettservice', 'Weinberatung', 'Kassensystem', 'Belastbarkeit', 'Freundlichkeit', 'Teamfähigkeit', 'Flexible Arbeitszeiten'],
    summaries: [
      'Erfahrene Servicekraft mit Ausbildung zum Restaurantfachmann, sicher im À-la-carte- und Bankettservice, dreisprachig.',
      'Studentin mit Erfahrung im Café, freundlich und belastbar. Verfügbar an Wochenenden und in den Semesterferien.',
    ],
    faq: [
      { q: 'Kellner ohne Ausbildung: Lohnt sich ein Lebenslauf?', a: 'Ja. Viele Betriebe stellen Quereinsteiger ein. Nennen Sie Aushilfsjobs, Kundenkontakt, Sprachen und Ihre Verfügbarkeit.' },
      { q: 'Gehört ein Foto zur Bewerbung in der Gastronomie?', a: 'Freiwillig, aber üblich. Ein freundliches, professionelles Foto passt gut zu einem Beruf mit Gästekontakt.' },
    ],
  },
  {
    slug: 'berufskraftfahrer',
    fr: 'chauffeur-livreur',
    job: 'Berufskraftfahrer / Auslieferungsfahrer',
    short: 'Berufskraftfahrer/in',
    h1: 'Lebenslauf Berufskraftfahrer: Muster',
    label: 'Lebenslauf Berufskraftfahrer',
    metaTitle: 'Lebenslauf Berufskraftfahrer / Fahrer – Muster als PDF | LogoLoom',
    metaDescription:
      'Lebenslauf-Muster für Berufskraftfahrer, LKW-Fahrer und Auslieferungsfahrer: Führerscheinklassen, Module, Touren. Kostenlos anpassen und als PDF herunterladen.',
    intro:
      'Für Speditionen und Lieferdienste zählen zuerst die Führerscheinklassen und Nachweise, dann die Erfahrung auf der Straße. Beides gehört gut sichtbar in den Lebenslauf.',
    color: '#383D39',
    cv: cv({
      layout: 'classic',
      fullName: 'Marco Schmitt',
      jobTitle: 'Berufskraftfahrer (CE)',
      email: 'marco.schmitt@beispiel.de',
      phone: PHONE,
      city: 'Mannheim',
      summary:
        'Berufskraftfahrer mit 9 Jahren unfallfreier Fahrpraxis im Nah- und Regionalverkehr. Pünktlich, sicher in der Ladungssicherung und freundlich bei der Übergabe an Kundinnen und Kunden.',
      experiences: [
        {
          role: 'Berufskraftfahrer im Regionalverkehr',
          company: 'Rhein-Neckar Spedition',
          location: 'Mannheim',
          start: '03/2019',
          end: 'heute',
          details:
            'Tägliche Touren mit Sattelzug zu bis zu 12 Kunden im Umkreis von 200 km\nLadungssicherung, Abfahrtskontrolle und digitale Lieferscheine\n9 Jahre unfallfrei, keine Reklamationen bei Lieferterminen 2024\nBe- und Entladen mit Mitnahmestapler',
        },
        {
          role: 'Auslieferungsfahrer',
          company: 'Getränke Fuchs',
          location: 'Ludwigshafen',
          start: '06/2016',
          end: '02/2019',
          details: 'Belieferung von Gastronomie und Handel mit 7,5-Tonner\nLeergutrücknahme und Kassieren bei Barkunden',
        },
      ],
      education: [
        { degree: 'Führerschein CE mit Grundqualifikation (Code 95)', school: 'Fahrschule Neckarstadt', start: '2016', end: '2016', details: 'Weiterbildung Module 1–5 zuletzt 2024' },
        { degree: 'Ausbildung zum Fachlageristen (IHK)', school: 'Getränke Fuchs, Ludwigshafen', start: '08/2013', end: '07/2015', details: '' },
      ],
      skills: ['Ladungssicherung', 'Digitaler Tachograph', 'Tourenplanung', 'Mitnahmestapler', 'Kundenkontakt', 'Telematik'],
      languages: [
        { name: 'Deutsch', level: 'Muttersprache' },
        { name: 'Italienisch', level: 'Grundkenntnisse (A2)' },
      ],
      interests: 'Angeln, Oldtimer',
      drivingLicence: 'Klassen B, C1, CE, Code 95, Fahrerkarte, Staplerschein',
    }),
    tips: [
      { title: 'Klassen gut sichtbar', body: 'B, C1, CE, Code 95, ADR: Tragen Sie alle Klassen unter „Führerschein“ ein. Sie sind das Erste, was die Disposition prüft.' },
      { title: 'Module und Gültigkeit', body: 'Schreiben Sie, wann die letzten Weiterbildungsmodule abgeschlossen wurden. Abgelaufene Nachweise fallen sonst im Gespräch auf.' },
      { title: 'Sicherheit belegen', body: '„Unfallfrei seit 9 Jahren“ ist im Fahrerberuf ein starkes Argument. Schreiben Sie es, wenn es stimmt.' },
      { title: 'Touren beschreiben', body: 'Nah-, Regional- oder Fernverkehr, Fahrzeugtyp, Stopps pro Tag: So weiß man, wofür Sie einsetzbar sind.' },
    ],
    keywords: ['Führerschein CE', 'Code 95', 'Ladungssicherung', 'Fahrerkarte', 'Tourenplanung', 'Abfahrtskontrolle', 'ADR', 'Pünktlichkeit', 'Kundenorientierung'],
    summaries: [
      'Berufskraftfahrer CE mit 9 Jahren unfallfreier Erfahrung im Regionalverkehr, sicher in der Ladungssicherung und kundenfreundlich.',
      'Auslieferungsfahrer mit Führerschein B und Erfahrung im Paketdienst. Ich suche eine feste Tour im Nahverkehr.',
    ],
    faq: [
      { q: 'Wo gehören die Führerscheinklassen hin?', a: 'Unter „Führerschein“ bei den persönlichen Daten, vollständig mit allen Klassen und Code 95. Zusätzlich die Ausbildung dazu unter „Ausbildung“.' },
      { q: 'Muss ich die Module der Weiterbildung angeben?', a: 'Ja, mindestens das Datum der letzten Weiterbildung. Für Arbeitgeber ist wichtig, dass der Code 95 gültig ist.' },
    ],
  },
  {
    slug: 'werkstudent',
    fr: 'etudiant',
    en: 'student',
    job: 'Werkstudent / Studentenjob',
    short: 'Werkstudent/in',
    h1: 'Lebenslauf Werkstudent und Studentenjob: Muster',
    label: 'Lebenslauf Werkstudent',
    metaTitle: 'Lebenslauf Werkstudent / Student – Muster kostenlos als PDF | LogoLoom',
    metaDescription:
      'Lebenslauf-Muster für Studierende: Werkstudentenstelle, Nebenjob oder Praktikum. Studium, Projekte und Nebenjobs gut darstellen. Kostenlos als PDF, ohne Anmeldung.',
    intro:
      'Mit wenig Berufserfahrung zählt, was Sie neben dem Studium gemacht haben: Nebenjobs, Projekte, Ehrenamt. Das Studium steht oben, mit Schwerpunkten und voraussichtlichem Abschluss.',
    color: '#2340A8',
    cv: cv({
      layout: 'sidebar',
      fullName: 'Lea Fischer',
      jobTitle: 'Studentin Wirtschaftsinformatik',
      email: 'lea.fischer@beispiel.de',
      phone: PHONE,
      city: 'Köln',
      link: 'github.com/lea-fischer',
      summary:
        'Studentin der Wirtschaftsinformatik im 5. Semester mit Schwerpunkt Datenanalyse. Erfahrung mit Python und SQL aus Studienprojekten und einem Nebenjob. Ich suche eine Werkstudentenstelle mit 15 bis 20 Stunden pro Woche.',
      experiences: [
        {
          role: 'Studentische Hilfskraft',
          company: 'Lehrstuhl für Wirtschaftsinformatik, Universität zu Köln',
          location: 'Köln',
          start: '10/2024',
          end: 'heute',
          details:
            'Betreuung von Übungsgruppen (25 Studierende) in Datenbanken\nAufbereitung von Umfragedaten mit Python (pandas)\nPflege der Kursseiten im Lernportal',
        },
        {
          role: 'Aushilfe im Service',
          company: 'Café Südstadt',
          location: 'Köln',
          start: '03/2022',
          end: '09/2024',
          details: 'Service und Kasse am Wochenende\nVerantwortung für die Wochenendschicht ab 2023',
        },
      ],
      education: [
        { degree: 'B.Sc. Wirtschaftsinformatik (voraussichtlich 09/2026)', school: 'Universität zu Köln', start: '10/2023', end: 'heute', details: 'Schwerpunkt Datenanalyse, aktueller Notenschnitt 1,9' },
        { degree: 'Abitur (Note 1,8)', school: 'Gymnasium Köln-Rodenkirchen', start: '2015', end: '2023', details: '' },
      ],
      skills: ['Python', 'SQL', 'Excel', 'Power BI', 'Git', 'Projektarbeit'],
      languages: [
        { name: 'Deutsch', level: 'Muttersprache' },
        { name: 'Englisch', level: 'Fließend (C1)' },
        { name: 'Spanisch', level: 'Grundkenntnisse (A2)' },
      ],
      interests: 'Hackathons, Volleyball, Ehrenamt bei der Tafel',
    }),
    tips: [
      { title: 'Studium mit Abschlussdatum', body: '„Voraussichtlich 09/2026“ und ein Schwerpunkt zeigen, wie lange Sie verfügbar sind und wofür Sie sich interessieren.' },
      { title: 'Stunden pro Woche', body: 'Werkstudentenstellen haben feste Stundenrahmen. Schreiben Sie ins Profil, wie viele Stunden Sie arbeiten können.' },
      { title: 'Nebenjobs zählen', body: 'Auch Gastronomie oder Einzelhandel zeigen Verantwortung und Belastbarkeit. Kurz halten, aber nicht weglassen.' },
      { title: 'Projekte verlinken', body: 'GitHub, Portfolio oder eine Projektarbeit: Ein Link im Kontaktbereich macht Ihre Kenntnisse greifbar.' },
    ],
    keywords: ['Werkstudent', 'Studium', 'Projektarbeit', 'Python', 'Excel', 'Teamfähigkeit', 'Selbstorganisation', 'Lernbereitschaft', 'Flexible Arbeitszeiten'],
    summaries: [
      'Studentin der Wirtschaftsinformatik im 5. Semester mit Python- und SQL-Erfahrung, verfügbar für 20 Stunden pro Woche.',
      'BWL-Student im 3. Semester, zuverlässig aus zwei Jahren Nebenjob im Einzelhandel. Ich suche eine Werkstudentenstelle im Controlling.',
    ],
    faq: [
      { q: 'Gehört die Abiturnote in den Lebenslauf?', a: 'Bei Studierenden ja, wenn sie gut ist. Ab dem ersten Abschluss im Studium wird sie unwichtiger.' },
      { q: 'Wie lang darf der Lebenslauf als Student sein?', a: 'Eine Seite. Konzentrieren Sie sich auf Studium, relevante Jobs, Projekte und Kenntnisse.' },
    ],
  },
  {
    slug: 'ausbildung',
    fr: 'alternance',
    job: 'Bewerbung um einen Ausbildungsplatz',
    short: 'Ausbildung',
    h1: 'Lebenslauf für die Ausbildung: Muster',
    label: 'Lebenslauf für die Ausbildung',
    metaTitle: 'Lebenslauf für die Ausbildung – Muster für Schüler als PDF | LogoLoom',
    metaDescription:
      'Lebenslauf-Muster für die Bewerbung um einen Ausbildungsplatz: Schule, Praktika, Stärken. Für Schülerinnen und Schüler, kostenlos als PDF, ohne Anmeldung.',
    intro:
      'Für einen Ausbildungsplatz erwartet niemand Berufserfahrung. Wichtig sind Schulabschluss, Praktika, Lieblingsfächer und was Sie in der Freizeit machen. Das zeigt Motivation.',
    color: '#1F5C4A',
    cv: cv({
      layout: 'sidebar',
      fullName: 'Jonas Weber',
      jobTitle: 'Bewerber um einen Ausbildungsplatz als Elektroniker',
      email: 'jonas.weber@beispiel.de',
      phone: PHONE,
      city: 'Augsburg',
      summary:
        'Schüler der 10. Klasse mit großem Interesse an Technik. In zwei Praktika habe ich Schaltungen verdrahtet und bei der Fehlersuche geholfen. Ich bin genau, arbeite gern mit den Händen und möchte ab September eine Ausbildung zum Elektroniker beginnen.',
      experiences: [
        {
          role: 'Schülerpraktikum (2 Wochen)',
          company: 'Elektro Huber GmbH',
          location: 'Augsburg',
          start: '02/2026',
          end: '02/2026',
          details: 'Verlegen von Leitungen auf einer Baustelle\nPrüfen von Steckdosen mit dem Messgerät unter Anleitung',
        },
        {
          role: 'Schülerpraktikum (1 Woche)',
          company: 'Stadtwerke Augsburg',
          location: 'Augsburg',
          start: '07/2025',
          end: '07/2025',
          details: 'Einblick in Netzleitstelle und Werkstatt\nMithilfe bei der Wartung von Zählern',
        },
      ],
      education: [
        { degree: 'Mittlerer Schulabschluss (voraussichtlich 07/2026)', school: 'Realschule Augsburg-Süd', start: '09/2020', end: 'heute', details: 'Lieblingsfächer: Physik, Mathematik, Technik' },
        { degree: 'Grundschule', school: 'Grundschule Augsburg-Haunstetten', start: '2016', end: '2020', details: '' },
      ],
      skills: ['Technisches Verständnis', 'Handwerkliches Geschick', 'Teamfähigkeit', 'Zuverlässigkeit', 'MS Office', 'Löten (Grundkenntnisse)'],
      languages: [
        { name: 'Deutsch', level: 'Muttersprache' },
        { name: 'Englisch', level: 'Schulkenntnisse (B1)' },
      ],
      interests: 'Elektronikbasteln mit Arduino, Freiwillige Feuerwehr (Jugendgruppe), Basketball',
    }),
    tips: [
      { title: 'Praktika als Erfahrung', body: 'Praktika stehen unter „Berufserfahrung“. Schreiben Sie, was Sie dort konkret gemacht haben, nicht nur den Firmennamen.' },
      { title: 'Lieblingsfächer passend', body: 'Physik und Mathe für Technikberufe, Deutsch und Wirtschaft fürs Büro: Nennen Sie die Fächer, die zum Beruf passen.' },
      { title: 'Hobbys zeigen Motivation', body: 'Feuerwehr, Vereinssport, Basteln: Bei Schülern sagen Hobbys viel über Interessen und Zuverlässigkeit.' },
      { title: 'Unterschrift nicht vergessen', body: 'Ort, Datum und Unterschrift unter dem Lebenslauf werden bei Ausbildungsbewerbungen fast immer erwartet.' },
    ],
    keywords: ['Ausbildungsplatz', 'Schülerpraktikum', 'Motivation', 'Lernbereitschaft', 'Zuverlässigkeit', 'Teamfähigkeit', 'Handwerkliches Geschick', 'Pünktlichkeit', 'Schulabschluss'],
    summaries: [
      'Motivierter Schüler der 10. Klasse mit technischem Interesse und zwei Praktika im Elektrohandwerk. Ich suche einen Ausbildungsplatz als Elektroniker.',
      'Abiturientin mit Interesse an Zahlen und Organisation, Praktikum in einer Steuerkanzlei. Ich bewerbe mich um eine Ausbildung zur Steuerfachangestellten.',
    ],
    faq: [
      { q: 'Gehört die Grundschule in den Lebenslauf?', a: 'Bei Schülerinnen und Schülern kann sie stehen, weil der Lebenslauf sonst sehr kurz ist. Ab dem Berufsleben lassen Sie sie weg.' },
      { q: 'Was schreibe ich, wenn ich noch kein Praktikum gemacht habe?', a: 'Ferienjobs, Babysitten, Nachhilfe, Verein oder Ehrenamt: Alles, was Verantwortung zeigt, gehört in den Lebenslauf.' },
    ],
  },
  {
    slug: 'schweiz',
    fr: 'frontalier-suisse',
    job: 'Bewerbung in der Schweiz',
    short: 'Schweiz',
    h1: 'Lebenslauf für die Schweiz: Muster',
    label: 'Lebenslauf für die Schweiz',
    metaTitle: 'Lebenslauf Schweiz – Muster für Bewerbungen in der Schweiz (PDF) | LogoLoom',
    metaDescription:
      'Lebenslauf-Muster für die Schweiz: Bewilligung, Nationalität, Sprachen, Referenzen. Für Grenzgänger und Zuzug, kostenlos als PDF, ohne Anmeldung.',
    intro:
      'Schweizer Arbeitgeber lesen einen Lebenslauf etwas anders als deutsche: Nationalität, Bewilligung (B, C oder G), Sprachniveaus und Referenzen sind wichtig. Das Foto bleibt üblich.',
    color: '#7A2335',
    cv: cv({
      layout: 'sidebar',
      fullName: 'Katrin Vogel',
      jobTitle: 'Polymechanikerin, Grenzgängerin',
      email: 'katrin.vogel@beispiel.de',
      phone: PHONE,
      city: 'Lörrach (D), 20 Min. bis Basel',
      summary:
        'Polymechanikerin mit 8 Jahren Erfahrung in der CNC-Fertigung, davon 3 Jahre in der Schweiz. Präzise, selbstständig und vertraut mit Schweizer Qualitätsstandards. Kündigungsfrist 2 Monate.',
      experiences: [
        {
          role: 'Polymechanikerin CNC',
          company: 'Rheinpräzision AG',
          location: 'Basel',
          start: '05/2023',
          end: 'heute',
          details:
            'Programmieren und Rüsten von 5-Achs-Fräszentren (Heidenhain)\nFertigung von Kleinserien für die Medizintechnik, Toleranzen ±0,01 mm\nAusschussquote der Zelle von 2,1 % auf 0,8 % gesenkt\nBetreuung von 2 Lernenden',
        },
        {
          role: 'Industriemechanikerin',
          company: 'Schwarzwald Feinmechanik GmbH',
          location: 'Schopfheim (D)',
          start: '09/2017',
          end: '04/2023',
          details: 'CNC-Drehen und Fräsen, Erstmusterprüfung\nWartung der Maschinen nach Plan',
        },
      ],
      education: [
        { degree: 'Industriemechanikerin (IHK), in der Schweiz vergleichbar mit Polymechanikerin EFZ', school: 'Gewerbeschule Lörrach', start: '09/2014', end: '07/2017', details: '' },
        { degree: 'CNC-Programmierung Heidenhain TNC 640', school: 'Weiterbildungszentrum Basel', start: '2023', end: '2023', details: '' },
      ],
      skills: ['CNC-Fräsen 5-Achs', 'Heidenhain', 'Messtechnik', 'Erstmusterprüfung', 'Technisches Zeichnen', 'Qualitätssicherung'],
      languages: [
        { name: 'Deutsch', level: 'Muttersprache' },
        { name: 'Französisch', level: 'Gute Kenntnisse (B1)' },
        { name: 'Englisch', level: 'Grundkenntnisse (A2)' },
      ],
      interests: 'Velofahren, Bergwandern',
      nationality: 'deutsch',
      workPermit: 'Grenzgängerbewilligung G',
      drivingLicence: 'Kategorie B',
      birthDate: '14.06.1998',
      signOff: { ...SIGN, place: 'Lörrach' },
    }),
    tips: [
      { title: 'Bewilligung angeben', body: 'G für Grenzgänger, B oder C für Wohnsitz in der Schweiz. Wenn noch keine vorliegt: „Bewilligung G wird nach Vertragsunterzeichnung beantragt“.' },
      { title: 'Abschlüsse übersetzen', body: 'Schreiben Sie die Schweizer Entsprechung dazu, zum Beispiel EFZ, HF oder FH. Das erspart dem Arbeitgeber Recherchen.' },
      { title: 'Sprachniveau nach GER', body: 'In der Schweiz zählen Sprachen viel. A1 bis C2 ist klarer als „gut“ oder „verhandlungssicher“.' },
      { title: 'Arbeitszeugnisse bereithalten', body: 'Schweizer Arbeitgeber erwarten oft Arbeitszeugnisse und Referenzen. „Referenzen auf Anfrage“ reicht im Lebenslauf.' },
      { title: 'In der Schweiz unterschreiben?', body: 'Ort, Datum und Unterschrift sind in der Schweiz weniger verbreitet als in Deutschland. Sie können den Block im Editor ausschalten.' },
    ],
    keywords: ['Grenzgänger', 'Bewilligung G', 'EFZ', 'Sprachniveau (GER)', 'Referenzen', 'Arbeitszeugnisse', 'Kündigungsfrist', 'Präzision', 'Zuverlässigkeit'],
    summaries: [
      'Polymechanikerin mit 8 Jahren CNC-Erfahrung, davon 3 Jahre in Basel. Grenzgängerin mit Bewilligung G, Kündigungsfrist 2 Monate.',
      'Kaufmännische Angestellte aus Konstanz, zweisprachig Deutsch-Englisch, sucht ihre erste Stelle in Zürich oder Winterthur. Bewilligung G wird nach Vertragsabschluss beantragt.',
    ],
    faq: [
      { q: 'Muss ich die Bewilligung schon haben, bevor ich mich bewerbe?', a: 'Nein. Für EU-Bürger wird die Grenzgänger- oder Aufenthaltsbewilligung meist nach der Vertragsunterzeichnung beantragt, oft mit Hilfe des Arbeitgebers.' },
      { q: 'Geburtsdatum und Nationalität im Schweizer Lebenslauf?', a: 'Beides ist in der Schweiz weiterhin üblich, aber freiwillig. Sie tragen es im Editor unter „Persönliche Daten“ ein.' },
      { q: 'Gibt es das Muster auch auf Französisch?', a: 'Ja, für die Romandie gibt es ein eigenes Beispiel für Grenzgänger auf Französisch, mit Permis G und den dortigen Gepflogenheiten.' },
    ],
  },
];

export function exampleH1De(ex: CvExample): string {
  return ex.h1 ?? `Lebenslauf ${ex.short}: Muster`;
}

export function exampleLabelDe(ex: CvExample): string {
  return ex.label ?? `Lebenslauf ${ex.short}`;
}

export function getCvExampleDe(slug: string): CvExampleDe | undefined {
  return CV_EXAMPLES_DE.find((e) => e.slug === slug);
}

/** German example matching a French slug (for hreflang). */
export function deSlugForFr(frSlug: string): string | undefined {
  return CV_EXAMPLES_DE.find((e) => e.fr === frSlug)?.slug;
}

/** German example matching an English slug (for hreflang). */
export function deSlugForEn(enSlug: string): string | undefined {
  return CV_EXAMPLES_DE.find((e) => e.en === enSlug)?.slug;
}
