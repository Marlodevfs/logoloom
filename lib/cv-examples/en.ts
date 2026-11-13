import type { CvExample } from './fr';

/**
 * CV examples per job (English, UK conventions: no photo, no date of birth).
 * Every person, company, email and phone number is fictional. Phone numbers use
 * Ofcom's reserved drama range (07700 900000–900999), emails use example.com.
 */
export interface CvExampleEn extends CvExample {
  /** Slug of the matching French example, for hreflang. */
  fr?: string;
}

export const CV_EXAMPLES_EN: CvExampleEn[] = [
  {
    slug: 'retail-sales-assistant',
    fr: 'vendeur',
    job: 'Retail sales assistant',
    short: 'Sales assistant',
    metaTitle: 'Retail Sales Assistant CV Example – Free PDF | LogoLoom',
    metaDescription:
      'A retail sales assistant CV example you can copy for free: profile, duties with results, the skills shops look for. Edit it and download the PDF, no account needed.',
    intro:
      'Shop managers look for three things: you enjoy helping customers, you can sell, and you can be trusted with the till and the shop floor. This CV shows all three with simple numbers.',
    color: '#7A2335',
    cv: {
      layout: 'sidebar',
      fullName: 'Amelia Hughes',
      jobTitle: 'Retail Sales Assistant',
      email: 'amelia.hughes@example.com',
      phone: '07700 900123',
      city: 'Bristol',
      link: '',
      photoUrl: null,
      summary:
        'Friendly sales assistant with 4 years in fashion retail. I like helping customers find the right fit first time and turning browsers into regulars. Confident on the till, with stock and through busy sale periods.',
      experiences: [
        {
          role: 'Sales Assistant',
          company: 'Marlow & Finch',
          location: 'Bristol',
          start: '2022',
          end: 'Present',
          details:
            'Advised customers and grew add-on sales (average basket up 15% in a year)\nOpened and closed the till, cashing up daily with no discrepancies\nReceived deliveries, replenished stock and kept the floor tidy\nSet up window displays following the visual merchandising plan',
        },
        {
          role: 'Seasonal Sales Assistant',
          company: 'Harbour Lane Clothing',
          location: 'Weston-super-Mare',
          start: '2020',
          end: '2022',
          details: 'Covered summer and Christmas peaks, including sale periods\nHelped run the end-of-season stock count',
        },
      ],
      education: [
        { degree: 'BTEC Level 3 Diploma in Retail', school: 'City College Bristol', start: '2018', end: '2020', details: '' },
        { degree: 'GCSEs: 8 grades 9–4 including English and Maths', school: 'Ashton Park School', start: '2013', end: '2018', details: '' },
      ],
      skills: ['Customer service', 'Upselling', 'Cash handling', 'Visual merchandising', 'Stock replenishment', 'Stock control', 'Teamwork'],
      languages: [{ name: 'English', level: 'Native' }],
      interests: 'Vintage fashion, running',
    },
    tips: [
      { title: 'Show results, not tasks', body: '"Average basket up 15%" says more than "served customers". Even one number per job makes your CV stand out.' },
      { title: 'Mention the till', body: 'Shops need people they can trust with cash. "Cashing up with no discrepancies" reassures straight away.' },
      { title: 'Availability matters', body: 'Weekends, evenings, Christmas: if you are flexible, say so in your profile. It is often the deciding factor.' },
      { title: 'Keep it to one page', body: 'For retail roles, one clear page is plenty. Managers read dozens of CVs in peak season.' },
    ],
    keywords: ['Customer service', 'Sales targets', 'Upselling', 'Till operation', 'Cash handling', 'Stock control', 'Visual merchandising', 'Teamwork', 'Flexible hours'],
    summaries: [
      'Customer-focused sales assistant with 4 years in fashion retail, used to busy weekends and sale periods. Reliable on the till and keen to help customers find what suits them.',
      'Enthusiastic first-time job seeker with volunteering experience in a charity shop. Available weekends and evenings for a part-time sales assistant role.',
    ],
    faq: [
      { q: 'What should a retail CV include?', a: 'A short profile, your shop experience with one or two results, your skills (till, stock, customer service) and your availability. Education goes after experience.' },
      { q: 'I have never worked in a shop. What do I put?', a: 'Any role with customers counts: café, volunteering in a charity shop, events. Show that you are reliable, friendly and available.' },
    ],
  },
  {
    slug: 'cashier',
    fr: 'caissier',
    job: 'Cashier',
    short: 'Cashier',
    metaTitle: 'Cashier CV Example – Free PDF Template | LogoLoom',
    metaDescription:
      'A cashier CV example to copy for free: accuracy, speed and customer service shown in a clean one-page CV. Edit it and download the PDF, no sign-up.',
    intro:
      'For a cashier job, the recruiter wants accuracy with money, speed at busy times and a friendly word for every customer. Say it plainly and back it up with facts.',
    color: '#155E75',
    cv: {
      layout: 'classic',
      fullName: 'Daniel Okafor',
      jobTitle: 'Cashier / Checkout Operator',
      email: 'daniel.okafor@example.com',
      phone: '07700 900245',
      city: 'Leeds',
      link: '',
      photoUrl: null,
      summary:
        'Checkout operator with 3 years in a busy supermarket. Fast and accurate on the till, calm in long queues and always polite with customers. Available for early, late and weekend shifts.',
      experiences: [
        {
          role: 'Checkout Operator',
          company: 'FreshWay Supermarkets',
          location: 'Leeds',
          start: '2023',
          end: 'Present',
          details:
            'Served up to 400 customers per shift on manned and self-service tills\nCashed up with a balanced till on every shift checked in 2024\nHandled refunds, age-restricted sales (Challenge 25) and loyalty cards\nTrained 3 new starters on till procedures',
        },
        {
          role: 'Customer Assistant',
          company: 'Corner Express',
          location: 'Leeds',
          start: '2021',
          end: '2023',
          details: 'Till, shelf filling and date checks\nOpened and closed the store on weekends',
        },
      ],
      education: [
        { degree: 'GCSEs: 6 grades 9–4 including Maths and English', school: 'Roundhay School', start: '2016', end: '2021', details: '' },
      ],
      skills: ['Till operation', 'Cash handling', 'Self-checkout support', 'Challenge 25', 'Refunds and exchanges', 'Customer service', 'Shelf filling'],
      languages: [
        { name: 'English', level: 'Fluent' },
        { name: 'Yoruba', level: 'Native' },
      ],
      interests: 'Football (Sunday league), cooking',
    },
    tips: [
      { title: 'Accuracy first', body: 'A balanced till is the first thing a manager checks. If yours always balances, write it.' },
      { title: 'Give a sense of pace', body: 'Customers per shift or busy periods handled show you can keep up when the queue grows.' },
      { title: 'Name the procedures', body: 'Challenge 25, refunds, self-checkout support: these words tell the recruiter you need less training.' },
      { title: 'State your shifts', body: 'Early, late, weekend, bank holiday: flexibility is a big plus for supermarkets.' },
    ],
    keywords: ['Till operation', 'Cash handling', 'Balancing the till', 'Challenge 25', 'Customer service', 'Self-checkout', 'Refunds', 'Shelf filling', 'Flexible shifts'],
    summaries: [
      'Reliable cashier with 3 years in a high-volume supermarket. Accurate with cash, quick on the till and friendly under pressure.',
      'Student available evenings and weekends, used to handling money as a club treasurer. Looking for a part-time cashier role.',
    ],
    faq: [
      { q: 'What skills should I put on a cashier CV?', a: 'Till operation, cash handling, accuracy, customer service and any procedures you know (Challenge 25, refunds). Add languages if you speak several.' },
      { q: 'Should I mention self-checkouts?', a: 'Yes. Supervising self-service tills is now part of most cashier jobs and shows you are comfortable with the equipment.' },
    ],
  },
  {
    slug: 'waiter',
    fr: 'serveur',
    job: 'Waiter / waitress',
    short: 'Waiter',
    metaTitle: 'Waiter / Waitress CV Example – Free PDF | LogoLoom',
    metaDescription:
      'A waiter and waitress CV example to copy for free: service, covers, upselling and teamwork in one clear page. Edit it and download the PDF, no account.',
    intro:
      'Restaurants hire people who stay calm during a full service, remember orders and make guests want to come back. Numbers like covers per service do the talking.',
    color: '#1F5C4A',
    cv: {
      layout: 'sidebar',
      fullName: 'Sofia Romano',
      jobTitle: 'Waitress',
      email: 'sofia.romano@example.com',
      phone: '07700 900318',
      city: 'Manchester',
      link: '',
      photoUrl: null,
      summary:
        'Waitress with 5 years in busy restaurants and a hotel brasserie. Comfortable with sections of up to 8 tables, wine recommendations and allergen questions. Smiling, quick and a good team player.',
      experiences: [
        {
          role: 'Waitress',
          company: 'The Copper Kettle Brasserie',
          location: 'Manchester',
          start: '2022',
          end: 'Present',
          details:
            'Served up to 120 covers on Friday and Saturday evenings\nRecommended dishes and wines, raising average spend per table\nAnswered allergen questions using the restaurant matrix\nTrained new waiting staff on the EPOS system',
        },
        {
          role: 'Waiting Staff',
          company: 'Linden Hotel',
          location: 'Stockport',
          start: '2019',
          end: '2022',
          details: 'Breakfast and banqueting service for up to 200 guests\nSet-up and clear-down of function rooms',
        },
      ],
      education: [
        { degree: 'Level 2 Food Hygiene Certificate', school: 'Highfield Qualifications (online)', start: '', end: '2022', details: '' },
        { degree: 'A levels: English, Italian, Psychology', school: 'Xaverian College', start: '2017', end: '2019', details: '' },
      ],
      skills: ['Table service', 'Upselling', 'Allergen awareness', 'EPOS systems', 'Wine service', 'Banqueting', 'Teamwork'],
      languages: [
        { name: 'English', level: 'Native' },
        { name: 'Italian', level: 'Fluent' },
      ],
      interests: 'Cooking, travel',
    },
    tips: [
      { title: 'Count your covers', body: '"Up to 120 covers" shows the pace you can handle better than any adjective.' },
      { title: 'Allergens are a must', body: 'Mention allergen awareness and your food hygiene certificate: managers check for them.' },
      { title: 'Languages are a plus', body: 'Tourist areas and hotels value staff who can welcome guests in another language.' },
      { title: 'Show you can sell', body: 'Recommending dishes and drinks raises the bill. Say that you do it.' },
    ],
    keywords: ['Table service', 'Covers', 'Upselling', 'Allergen awareness', 'Food hygiene', 'EPOS', 'Silver service', 'Banqueting', 'Teamwork'],
    summaries: [
      'Experienced waitress used to busy evening services of 100+ covers. Calm, quick and confident recommending food and wine.',
      'Motivated student looking for weekend waiting shifts, with front-of-house experience at a family café.',
    ],
    faq: [
      { q: 'How do I write a waiter CV with no experience?', a: 'Highlight any customer-facing role, volunteering at events, and soft skills such as memory, teamwork and staying calm. A food hygiene certificate is a quick win.' },
      { q: 'Should I include tips earned?', a: 'No. Talk about covers, average spend or guest feedback instead.' },
    ],
  },
  {
    slug: 'healthcare-assistant',
    fr: 'aide-soignant',
    job: 'Healthcare assistant',
    short: 'Healthcare assistant',
    metaTitle: 'Healthcare Assistant CV Example (HCA) – Free PDF | LogoLoom',
    metaDescription:
      'A healthcare assistant (HCA) CV example to copy for free: patient care, observations, Care Certificate. Edit it and download the PDF, no account needed.',
    intro:
      'Wards and care homes look for HCAs who give safe, kind care and record it properly. Name the tasks you are trained for and the settings you have worked in.',
    color: '#155E75',
    cv: {
      layout: 'classic',
      fullName: 'Grace Mensah',
      jobTitle: 'Healthcare Assistant',
      email: 'grace.mensah@example.com',
      phone: '07700 900427',
      city: 'Birmingham',
      link: '',
      photoUrl: null,
      summary:
        'Healthcare assistant with 4 years on acute medical wards. Experienced in personal care, observations and supporting patients with dementia. Caring, organised and calm in emergencies.',
      experiences: [
        {
          role: 'Healthcare Assistant (Band 3)',
          company: 'Riverside Hospital Trust',
          location: 'Birmingham',
          start: '2022',
          end: 'Present',
          details:
            'Personal care, mobility and nutrition support for up to 8 patients per shift\nVital signs and NEWS2 observations, escalating concerns to nurses\nAccurate care records on the electronic patient system\nSupported patients living with dementia and their families',
        },
        {
          role: 'Care Assistant',
          company: 'Elmwood Care Home',
          location: 'Solihull',
          start: '2020',
          end: '2022',
          details: 'Day and night shifts in a 40-bed residential home\nMedication rounds support and end-of-life care',
        },
      ],
      education: [
        { degree: 'Care Certificate', school: 'Riverside Hospital Trust', start: '', end: '2022', details: '' },
        { degree: 'Level 3 Diploma in Health and Social Care', school: 'South & City College Birmingham', start: '2018', end: '2020', details: '' },
      ],
      skills: ['Personal care', 'NEWS2 observations', 'Moving and handling', 'Dementia care', 'Infection control', 'Record keeping', 'Basic Life Support'],
      languages: [
        { name: 'English', level: 'Fluent' },
        { name: 'Twi', level: 'Native' },
      ],
      interests: 'Gospel choir, walking',
    },
    tips: [
      { title: 'List your training', body: 'Care Certificate, Basic Life Support, moving and handling: recruiters scan for these first.' },
      { title: 'Name the setting', body: 'Acute ward, care home, community: it shows what you are used to and what you can step into.' },
      { title: 'Show safe practice', body: 'Observations, escalation, accurate records: these are what make an HCA trusted on a ward.' },
      { title: 'Keep a human tone', body: 'One line on how you support patients and families says a lot about your care values.' },
    ],
    keywords: ['Personal care', 'Patient observations', 'NEWS2', 'Care Certificate', 'Moving and handling', 'Infection control', 'Dementia care', 'Basic Life Support', 'Record keeping'],
    summaries: [
      'Compassionate HCA with 4 years on acute wards, trained in observations and dementia care. Calm, reliable and focused on patient dignity.',
      'Caring and dependable career changer with family caring experience, completing the Care Certificate and keen to join a ward team.',
    ],
    faq: [
      { q: 'Do I need qualifications to be a healthcare assistant?', a: 'Often not to start: many employers train you through the Care Certificate. Experience in care or customer service and the right values matter most.' },
      { q: 'What is the difference between an HCA and a care assistant CV?', a: 'An HCA CV focuses more on clinical tasks such as observations and hospital procedures. A care assistant CV puts daily living support and residents\' wellbeing first.' },
    ],
  },
  {
    slug: 'care-worker',
    fr: 'auxiliaire-de-vie',
    job: 'Care worker',
    short: 'Care worker',
    metaTitle: 'Care Worker CV Example – Free PDF (Domiciliary Care) | LogoLoom',
    metaDescription:
      'A care worker CV example to copy for free: home visits, personal care, medication support and reliability. Edit it and download the PDF, no account.',
    intro:
      'In home care, agencies need workers who turn up on time, respect people\'s routines and report changes. Your CV should prove you are reliable and caring.',
    color: '#1F5C4A',
    cv: {
      layout: 'sidebar',
      fullName: 'Thomas Reid',
      jobTitle: 'Domiciliary Care Worker',
      email: 'thomas.reid@example.com',
      phone: '07700 900512',
      city: 'Norwich',
      link: '',
      photoUrl: null,
      summary:
        'Care worker with 3 years supporting older people and adults with disabilities in their own homes. Full driving licence and own car. Patient, punctual and good at building trust with clients and families.',
      experiences: [
        {
          role: 'Domiciliary Care Worker',
          company: 'Brightside Home Care',
          location: 'Norwich',
          start: '2022',
          end: 'Present',
          details:
            'Up to 12 home visits a day across a rural round\nPersonal care, meal preparation and medication prompts\nUpdated care plans and reported changes to the coordinator\nSupported clients to stay independent and active',
        },
        {
          role: 'Support Worker',
          company: 'Oakfield Supported Living',
          location: 'Norwich',
          start: '2021',
          end: '2022',
          details: 'Supported adults with learning disabilities in daily living\nAccompanied clients to appointments and activities',
        },
      ],
      education: [
        { degree: 'Level 2 Diploma in Care', school: 'City College Norwich', start: '2021', end: '2022', details: '' },
        { degree: 'Care Certificate, Medication Awareness, First Aid', school: 'Brightside Home Care', start: '', end: '2022', details: '' },
      ],
      skills: ['Personal care', 'Medication support', 'Meal preparation', 'Care plans', 'Safeguarding', 'Lone working', 'Full UK driving licence'],
      languages: [{ name: 'English', level: 'Native' }],
      interests: 'Gardening, local history',
    },
    tips: [
      { title: 'Driving licence up front', body: 'For home care, a licence and a car are often essential. Put them in your profile, not at the bottom.' },
      { title: 'Show reliability', body: 'Visits per day, rounds covered, no missed calls: punctuality is what agencies value most.' },
      { title: 'Mention safeguarding', body: 'Safeguarding and medication training show you know the rules that protect clients.' },
      { title: 'Values count', body: 'Dignity, independence, trust: one honest sentence about why you do this work is worth adding.' },
    ],
    keywords: ['Domiciliary care', 'Personal care', 'Medication prompting', 'Care plans', 'Safeguarding', 'Lone working', 'Dementia awareness', 'Driving licence', 'Reliability'],
    summaries: [
      'Reliable domiciliary care worker with a full licence and own car, experienced in personal care and medication support for older clients.',
      'Kind and patient person with experience caring for a relative, looking to start a career in home care with full training.',
    ],
    faq: [
      { q: 'Can I become a care worker without experience?', a: 'Yes. Most agencies train new staff through the Care Certificate. Highlight caring for family, volunteering and your reliability.' },
      { q: 'Should I mention my driving licence?', a: 'Yes, clearly. Many home care jobs need a car to reach clients, so it can decide whether you are shortlisted.' },
    ],
  },
  {
    slug: 'administrative-assistant',
    fr: 'assistant-administratif',
    job: 'Administrative assistant',
    short: 'Admin assistant',
    metaTitle: 'Administrative Assistant CV Example – Free PDF | LogoLoom',
    metaDescription:
      'An administrative assistant CV example to copy for free: organisation, software skills and results in a clean layout. Edit it and download the PDF.',
    intro:
      'An admin assistant keeps an office running. Recruiters want to see that you are organised, accurate with data and at ease with the usual software.',
    color: '#2340A8',
    cv: {
      layout: 'classic',
      fullName: 'Hannah Clarke',
      jobTitle: 'Administrative Assistant',
      email: 'hannah.clarke@example.com',
      phone: '07700 900634',
      city: 'Nottingham',
      link: 'linkedin.com/in/hannah-clarke-example',
      photoUrl: null,
      summary:
        'Administrative assistant with 5 years supporting busy teams. Organised, discreet and quick with Microsoft 365. I like making processes simpler and making sure nothing falls through the cracks.',
      experiences: [
        {
          role: 'Administrative Assistant',
          company: 'Calder Property Services',
          location: 'Nottingham',
          start: '2021',
          end: 'Present',
          details:
            'Managed diaries, meetings and travel for 3 directors\nProcessed around 150 invoices a month with no late payments\nSet up a shared filing system that cut document search time\nFirst point of contact for clients by phone and email',
        },
        {
          role: 'Office Junior',
          company: 'Trent Logistics',
          location: 'Derby',
          start: '2019',
          end: '2021',
          details: 'Data entry, post and stationery orders\nPrepared weekly reports in Excel',
        },
      ],
      education: [
        { degree: 'Level 3 Diploma in Business Administration', school: 'Nottingham College', start: '2017', end: '2019', details: '' },
      ],
      skills: ['Microsoft 365', 'Excel (pivot tables)', 'Diary management', 'Invoicing', 'Data entry', 'Minute taking', 'Confidentiality'],
      languages: [
        { name: 'English', level: 'Native' },
        { name: 'French', level: 'Intermediate (B1)' },
      ],
      interests: 'Book club, yoga',
    },
    tips: [
      { title: 'Name your software', body: 'Excel, Outlook, Teams, Xero, Sage: list what you use. ATS filters often search for these exact words.' },
      { title: 'Quantify the volume', body: 'Invoices per month, people supported, calls handled: numbers turn routine tasks into proof.' },
      { title: 'Show an improvement', body: 'One process you made faster or simpler shows initiative, not just execution.' },
      { title: 'Stay sober', body: 'A clean, well-aligned CV is itself proof of the care an admin role needs.' },
    ],
    keywords: ['Administration', 'Microsoft 365', 'Excel', 'Diary management', 'Invoicing', 'Data entry', 'Minute taking', 'Customer service', 'Confidentiality'],
    summaries: [
      'Organised administrative assistant with 5 years of experience, confident with Microsoft 365 and used to supporting several managers at once.',
      'Detail-oriented graduate with strong Excel skills and front-desk experience, looking for a first office administration role.',
    ],
    faq: [
      { q: 'Which skills matter most on an admin CV?', a: 'Organisation, accuracy, communication and software (Microsoft 365, accounting or CRM tools). Back each one up with a task or a number.' },
      { q: 'How long should an administrative assistant CV be?', a: 'One page is ideal up to about 10 years of experience. Two pages only if every line is relevant.' },
    ],
  },
  {
    slug: 'accountant',
    fr: 'comptable',
    job: 'Accountant',
    short: 'Accountant',
    metaTitle: 'Accountant CV Example – Free PDF Template | LogoLoom',
    metaDescription:
      'An accountant CV example to copy for free: month-end close, reporting, software and qualifications, laid out clearly. Edit it and download the PDF.',
    intro:
      'Finance recruiters read quickly: qualification, software, scope (company size, number of entities) and one or two improvements you delivered. This CV puts them first.',
    color: '#383D39',
    cv: {
      layout: 'classic',
      fullName: 'James Patel',
      jobTitle: 'Management Accountant (ACCA part-qualified)',
      email: 'james.patel@example.com',
      phone: '07700 900741',
      city: 'Reading',
      link: 'linkedin.com/in/james-patel-example',
      photoUrl: null,
      summary:
        'Part-qualified ACCA accountant with 6 years in industry. I run month-end close, management reporting and VAT returns for a £40m group, and I like turning numbers into clear decisions.',
      experiences: [
        {
          role: 'Management Accountant',
          company: 'Kestrel Components Ltd',
          location: 'Reading',
          start: '2021',
          end: 'Present',
          details:
            'Month-end close and management accounts for 3 entities\nCut the close from 8 to 5 working days by automating reconciliations\nQuarterly VAT returns and support for the annual audit\nBudget and forecast models for department heads',
        },
        {
          role: 'Assistant Accountant',
          company: 'Thames Valley Foods',
          location: 'Slough',
          start: '2018',
          end: '2021',
          details: 'Purchase and sales ledger, bank reconciliations\nFixed asset register and prepayments',
        },
      ],
      education: [
        { degree: 'ACCA (12 of 13 exams passed)', school: 'Association of Chartered Certified Accountants', start: '2019', end: 'Present', details: '' },
        { degree: 'BSc Accounting and Finance', school: 'University of Reading', start: '2015', end: '2018', details: '' },
      ],
      skills: ['Month-end close', 'Management accounts', 'VAT returns', 'Budgeting and forecasting', 'Sage 200', 'Xero', 'Advanced Excel'],
      languages: [
        { name: 'English', level: 'Native' },
        { name: 'Gujarati', level: 'Fluent' },
      ],
      interests: 'Cricket, chess',
    },
    tips: [
      { title: 'Qualification in the title', body: 'ACCA, CIMA, ACA, AAT, with your progress: recruiters filter on it first, so put it next to your job title.' },
      { title: 'Give the scope', body: 'Turnover, number of entities, team size: it tells the reader what level of complexity you handle.' },
      { title: 'One improvement', body: 'A faster close or an automated reconciliation shows you add value beyond processing.' },
      { title: 'List your systems', body: 'Sage, Xero, SAP, Power BI: name them. Many roles require a specific one.' },
    ],
    keywords: ['Month-end close', 'Management accounts', 'Reconciliations', 'VAT', 'Budgeting', 'Forecasting', 'Audit', 'Xero', 'Sage', 'Advanced Excel'],
    summaries: [
      'Part-qualified ACCA management accountant with 6 years in manufacturing, focused on fast, reliable month-end and clear reporting.',
      'AAT-qualified assistant accountant looking to grow into a management accounting role in a commercial team.',
    ],
    faq: [
      { q: 'Should I put my exam results on an accountant CV?', a: 'Put the qualification and how many exams you have passed. Individual marks only if they are prizes or top scores.' },
      { q: 'How do I show impact as an accountant?', a: 'Time saved on the close, errors removed, savings found, reports introduced: one measurable result per role is enough.' },
    ],
  },
  {
    slug: 'sales-representative',
    fr: 'commercial',
    job: 'Sales representative',
    short: 'Sales rep',
    metaTitle: 'Sales Representative CV Example – Free PDF | LogoLoom',
    metaDescription:
      'A sales representative CV example to copy for free: targets, revenue, new accounts and CRM skills, laid out to impress. Edit it and download the PDF.',
    intro:
      'A sales CV is judged on numbers: targets hit, revenue, new clients. Put them in every job, and keep the rest short.',
    color: '#2340A8',
    cv: {
      layout: 'sidebar',
      fullName: 'Oliver Bennett',
      jobTitle: 'B2B Sales Representative',
      email: 'oliver.bennett@example.com',
      phone: '07700 900856',
      city: 'Glasgow',
      link: 'linkedin.com/in/oliver-bennett-example',
      photoUrl: null,
      summary:
        'B2B sales representative with 5 years selling to SMEs. 112% of target on average over 3 years. I enjoy building a pipeline from scratch and keeping clients for the long term.',
      experiences: [
        {
          role: 'Sales Representative',
          company: 'Northpoint Office Solutions',
          location: 'Glasgow',
          start: '2021',
          end: 'Present',
          details:
            'Managed a territory of 180 SME accounts across central Scotland\n112% of annual target on average (2022–2024)\nWon 35 new accounts in 2024, worth £420k in yearly revenue\nKept pipeline and forecasts up to date in Salesforce',
        },
        {
          role: 'Inside Sales Executive',
          company: 'Clyde Telecom',
          location: 'Glasgow',
          start: '2019',
          end: '2021',
          details: 'Outbound calls and demos, 60 calls a day\nPromoted after 18 months',
        },
      ],
      education: [
        { degree: 'BA (Hons) Business Management', school: 'Glasgow Caledonian University', start: '2015', end: '2019', details: '' },
      ],
      skills: ['New business', 'Account management', 'Negotiation', 'Pipeline management', 'Salesforce', 'Cold calling', 'Full UK driving licence'],
      languages: [
        { name: 'English', level: 'Native' },
        { name: 'Spanish', level: 'Intermediate (B1)' },
      ],
      interests: 'Five-a-side football, hill walking',
    },
    tips: [
      { title: 'A number in every role', body: '% of target, revenue, new accounts, ranking in the team: sales managers look for these first.' },
      { title: 'Say what you sell and to whom', body: 'B2B or B2C, SMEs or large accounts, product or service: it helps the recruiter picture you in their team.' },
      { title: 'Name your CRM', body: 'Salesforce, HubSpot, Pipedrive: knowing the tool means a faster start.' },
      { title: 'Show progression', body: 'A promotion or a bigger territory proves your results were noticed.' },
    ],
    keywords: ['Sales targets', 'New business', 'Account management', 'Negotiation', 'Pipeline', 'CRM', 'Salesforce', 'B2B sales', 'Closing'],
    summaries: [
      'Target-driven B2B sales representative averaging 112% of target, experienced in new business and long-term account management.',
      'Confident graduate with retail sales experience and a strong customer focus, looking for a first inside sales role.',
    ],
    faq: [
      { q: 'What if I missed my targets?', a: 'Use another honest number: revenue grown, new clients won, conversion rate, or your ranking in the team. Do not invent figures.' },
      { q: 'Should a sales CV be one page?', a: 'One page up to around 8 years of experience. The numbers matter more than the length.' },
    ],
  },
  {
    slug: 'warehouse-operative',
    fr: 'preparateur-de-commandes',
    job: 'Warehouse operative',
    short: 'Warehouse operative',
    metaTitle: 'Warehouse Operative CV Example – Free PDF | LogoLoom',
    metaDescription:
      'A warehouse operative CV example to copy for free: picking rates, accuracy, scanners and forklift licence. Edit it and download the PDF, no account.',
    intro:
      'Warehouse managers want people who hit their pick rate, make few mistakes and work safely. Say how fast and how accurate you are, and list your licences.',
    color: '#383D39',
    cv: {
      layout: 'sidebar',
      fullName: 'Marek Nowak',
      jobTitle: 'Warehouse Operative / Picker Packer',
      email: 'marek.nowak@example.com',
      phone: '07700 900963',
      city: 'Northampton',
      link: '',
      photoUrl: null,
      summary:
        'Warehouse operative with 4 years in e-commerce distribution centres. Consistently above pick rate with 99.8% accuracy. Counterbalance forklift licence, happy to work nights and overtime.',
      experiences: [
        {
          role: 'Warehouse Operative',
          company: 'Swiftline Distribution',
          location: 'Northampton',
          start: '2022',
          end: 'Present',
          details:
            'Picked an average of 140 units an hour (target 120) with 99.8% accuracy\nPacked and labelled parcels for next-day delivery\nLoaded and unloaded trailers by forklift\nTrained new starters on RF scanners and safe lifting',
        },
        {
          role: 'Picker Packer (agency)',
          company: 'Midlands Fulfilment Centre',
          location: 'Daventry',
          start: '2020',
          end: '2022',
          details: 'Peak season picking and packing\nKept permanent contract after 6 months',
        },
      ],
      education: [
        { degree: 'Counterbalance forklift licence (RTITB)', school: 'Swiftline Distribution', start: '', end: '2023', details: '' },
        { degree: 'Manual handling and health and safety training', school: 'Midlands Fulfilment Centre', start: '', end: '2020', details: '' },
      ],
      skills: ['Picking and packing', 'RF scanners', 'Counterbalance forklift', 'Loading and unloading', 'Stock rotation', 'Health and safety', 'Night shifts'],
      languages: [
        { name: 'Polish', level: 'Native' },
        { name: 'English', level: 'Fluent' },
      ],
      interests: 'Gym, fishing',
    },
    tips: [
      { title: 'Pick rate and accuracy', body: 'Units per hour against target, plus your accuracy: that is exactly how managers measure warehouse staff.' },
      { title: 'Licences first', body: 'Forklift (counterbalance, reach), with the awarding body. These are often required to apply.' },
      { title: 'Shifts and overtime', body: 'Nights, weekends, peak season overtime: write what you can do.' },
      { title: 'Safety record', body: 'Manual handling, PPE, no incidents: safety is a deciding factor in logistics.' },
    ],
    keywords: ['Picking', 'Packing', 'Pick rate', 'RF scanner', 'Forklift licence', 'Loading', 'Stock control', 'Health and safety', 'Night shifts'],
    summaries: [
      'Fast and accurate warehouse operative, consistently above pick rate, with a counterbalance forklift licence and flexible shift availability.',
      'Hard-working and physically fit, looking for a first warehouse role with full training. Available for nights and weekends.',
    ],
    faq: [
      { q: 'What should I put on a warehouse CV with no experience?', a: 'Physical work you have done, reliability, punctuality and the shifts you can do. Any manual handling or safety training is a plus.' },
      { q: 'Do I need a forklift licence?', a: 'Not for picking and packing roles, but it opens better-paid jobs. If you have one, give the type and the awarding body.' },
    ],
  },
  {
    slug: 'cleaner',
    fr: 'agent-d-entretien',
    job: 'Cleaner',
    short: 'Cleaner',
    metaTitle: 'Cleaner CV Example – Free PDF Template | LogoLoom',
    metaDescription:
      'A cleaner CV example to copy for free: commercial and domestic cleaning, COSHH, reliability and attention to detail. Edit it and download the PDF.',
    intro:
      'Cleaning companies look for people who are reliable, thorough and safe with products. Say which places you have cleaned and the training you have.',
    color: '#155E75',
    cv: {
      layout: 'classic',
      fullName: 'Fatima Begum',
      jobTitle: 'Commercial Cleaner',
      email: 'fatima.begum@example.com',
      phone: '07700 900178',
      city: 'Leicester',
      link: '',
      photoUrl: null,
      summary:
        'Cleaner with 6 years in offices, schools and a medical centre. Thorough, discreet and always on time. Trained in COSHH and safe use of cleaning machines.',
      experiences: [
        {
          role: 'Commercial Cleaner',
          company: 'Sparkle Facilities Ltd',
          location: 'Leicester',
          start: '2021',
          end: 'Present',
          details:
            'Early-morning cleaning of 3 office buildings to a set schedule\nWashrooms, kitchens, floors and waste recycling\nUsed scrubber dryers and carpet machines\nPassed every client quality audit in 2024',
        },
        {
          role: 'Cleaner',
          company: 'Westfield Primary School',
          location: 'Leicester',
          start: '2018',
          end: '2021',
          details: 'After-school cleaning of classrooms and halls\nDeep cleans during school holidays',
        },
      ],
      education: [
        { degree: 'COSHH and infection control training', school: 'Sparkle Facilities Ltd', start: '', end: '2021', details: '' },
      ],
      skills: ['Commercial cleaning', 'Washroom hygiene', 'COSHH', 'Scrubber dryer', 'Carpet cleaning', 'Waste and recycling', 'Lone working'],
      languages: [
        { name: 'English', level: 'Fluent' },
        { name: 'Bengali', level: 'Native' },
      ],
      interests: 'Sewing, community volunteering',
    },
    tips: [
      { title: 'Name the places', body: 'Offices, schools, hospitals, hotels: each has its own standards, and recruiters look for similar experience.' },
      { title: 'Safety training', body: 'COSHH and infection control show you know how to use products safely.' },
      { title: 'Machines you can use', body: 'Scrubber dryer, buffer, carpet machine: list them, it saves training time.' },
      { title: 'Reliability is key', body: 'Early starts, keys and alarms, working alone: show you can be trusted.' },
    ],
    keywords: ['Commercial cleaning', 'COSHH', 'Infection control', 'Washrooms', 'Floor care', 'Scrubber dryer', 'Attention to detail', 'Reliability', 'Lone working'],
    summaries: [
      'Reliable commercial cleaner with 6 years in offices and schools, trained in COSHH and used to early starts and working alone.',
      'Hard-working and thorough, looking for part-time evening cleaning work near Leicester.',
    ],
    faq: [
      { q: 'What skills should a cleaner put on a CV?', a: 'Types of cleaning (commercial, domestic, deep cleans), product safety (COSHH), machines you use, and qualities like reliability and attention to detail.' },
      { q: 'Is a CV needed for cleaning jobs?', a: 'Many employers ask for one. A short, clear page with your experience and availability is enough.' },
    ],
  },
  {
    slug: 'web-developer',
    fr: 'developpeur-web',
    job: 'Web developer',
    short: 'Web developer',
    metaTitle: 'Web Developer CV Example – Free PDF Template | LogoLoom',
    metaDescription:
      'A web developer CV example to copy for free: stack, projects, impact and links to your work. Edit it and download the PDF, no account needed.',
    intro:
      'Tech recruiters skim for your stack, what you shipped and a link to your code. Put the technologies up front and describe impact, not just tasks.',
    color: '#5B2A6E',
    cv: {
      layout: 'sidebar',
      fullName: 'Chloe Evans',
      jobTitle: 'Full-Stack Web Developer',
      email: 'chloe.evans@example.com',
      phone: '07700 900289',
      city: 'Cardiff',
      link: 'github.com/chloe-evans-example',
      photoUrl: null,
      summary:
        'Full-stack developer with 4 years building web apps in TypeScript, React and Node.js. I care about fast, accessible interfaces and clean, tested code.',
      experiences: [
        {
          role: 'Full-Stack Developer',
          company: 'Bayview Digital',
          location: 'Cardiff (hybrid)',
          start: '2022',
          end: 'Present',
          details:
            'Built a booking platform in Next.js and Node.js used by 40,000 customers a month\nCut page load time by 45% (Core Web Vitals all green)\nIntroduced automated tests and CI, reducing production bugs\nMentored 2 junior developers',
        },
        {
          role: 'Junior Web Developer',
          company: 'Taff Web Studio',
          location: 'Cardiff',
          start: '2020',
          end: '2022',
          details: 'Websites and e-shops for local businesses (WordPress, Shopify)\nAccessibility fixes to WCAG 2.1 AA',
        },
      ],
      education: [
        { degree: 'BSc Computer Science', school: 'Cardiff Metropolitan University', start: '2017', end: '2020', details: '' },
      ],
      skills: ['TypeScript', 'React', 'Next.js', 'Node.js', 'PostgreSQL', 'Testing (Jest, Playwright)', 'Git and CI/CD', 'Accessibility'],
      languages: [
        { name: 'English', level: 'Native' },
        { name: 'Welsh', level: 'Conversational' },
      ],
      interests: 'Open source, climbing',
    },
    tips: [
      { title: 'Stack first', body: 'List languages and frameworks near the top. Recruiters and ATS filters search for them.' },
      { title: 'Impact, not tasks', body: 'Users, speed gains, bugs reduced: one measurable result per project makes you memorable.' },
      { title: 'Link to your work', body: 'A GitHub or portfolio link lets people check your code. Make sure it is tidy.' },
      { title: 'Keep it current', body: 'Drop outdated tools unless the job asks for them. Two pages maximum, one is better.' },
    ],
    keywords: ['TypeScript', 'JavaScript', 'React', 'Next.js', 'Node.js', 'REST APIs', 'SQL', 'Testing', 'CI/CD', 'Accessibility', 'Agile'],
    summaries: [
      'Full-stack developer with 4 years in TypeScript, React and Node.js, focused on performance, accessibility and well-tested code.',
      'Self-taught front-end developer with 3 shipped projects on GitHub, looking for a first junior role in a product team.',
    ],
    faq: [
      { q: 'Should a developer CV include projects?', a: 'Yes, especially early in your career. Give each project one line: what it does, your stack and a link.' },
      { q: 'How do I list technical skills?', a: 'Group them (languages, frameworks, tools) and only include what you could discuss in an interview.' },
    ],
  },
  {
    slug: 'student',
    fr: 'etudiant',
    job: 'Student',
    short: 'Student',
    h1: 'Student CV example (no experience)',
    label: 'Student CV',
    metaTitle: 'Student CV Example With No Experience – Free PDF | LogoLoom',
    metaDescription:
      'A student CV example for your first job, with no work experience: education, volunteering and skills that count. Edit it and download the PDF for free.',
    intro:
      'With no work experience, your CV sells your reliability and potential. Education, volunteering, school roles and part-time help all count.',
    color: '#2340A8',
    cv: {
      layout: 'sidebar',
      fullName: 'Ethan Walker',
      jobTitle: 'Sixth-form student – part-time job seeker',
      email: 'ethan.walker@example.com',
      phone: '07700 900391',
      city: 'Sheffield',
      link: '',
      photoUrl: null,
      summary:
        'Reliable A-level student looking for a weekend job in retail or hospitality. Friendly, punctual and used to teamwork through sport and volunteering. Available Saturdays, Sundays and school holidays.',
      experiences: [
        {
          role: 'Volunteer',
          company: 'Hillsborough Food Bank',
          location: 'Sheffield',
          start: '2024',
          end: 'Present',
          details: 'Sorting donations and packing food parcels every Saturday\nWelcoming visitors and helping at busy sessions',
        },
        {
          role: 'Junior Football Coach (volunteer)',
          company: 'Loxley Juniors FC',
          location: 'Sheffield',
          start: '2023',
          end: 'Present',
          details: 'Helped run weekly training for under-9s\nOrganised kit and match-day set-up',
        },
      ],
      education: [
        { degree: 'A levels: Business, Maths, Geography (in progress)', school: 'Tapton Sixth Form', start: '2024', end: '2026', details: '' },
        { degree: 'GCSEs: 9 grades 9–5 including English and Maths', school: 'Tapton School', start: '2019', end: '2024', details: '' },
      ],
      skills: ['Teamwork', 'Communication', 'Punctuality', 'Customer service', 'Microsoft Office', 'Cash handling (club tuck shop)'],
      languages: [
        { name: 'English', level: 'Native' },
        { name: 'Spanish', level: 'Basic (A2)' },
      ],
      interests: 'Football, cooking for friends, photography',
    },
    tips: [
      { title: 'Everything counts', body: 'Volunteering, babysitting, coaching, school roles, Duke of Edinburgh: they show you are reliable.' },
      { title: 'Education in the spotlight', body: 'Your qualifications are your strongest point: put them high, with subjects and grades if good.' },
      { title: 'Say what you are looking for', body: 'Weekend job, summer work or apprenticeship, and when you are available: write it in your profile.' },
      { title: 'One page only', body: 'A short, clean CV looks more serious than one stretched to fill space.' },
    ],
    keywords: ['Motivation', 'Availability', 'Reliability', 'Punctuality', 'Teamwork', 'Customer service', 'Communication', 'Volunteering', 'Microsoft Office'],
    summaries: [
      'Hard-working sixth-form student, friendly and reliable, available weekends and holidays for a retail or hospitality job.',
      'Second-year computer science student looking for a summer internship in software development, with two personal projects on GitHub.',
    ],
    faq: [
      { q: 'What do I put on a CV if I have never worked?', a: 'Your education, volunteering, sports or clubs, school responsibilities and any informal work like babysitting. Anything that shows reliability counts.' },
      { q: 'Should I include my grades?', a: 'Include them if they are good or if the employer asks. Otherwise the qualification and subjects are enough.' },
    ],
  },
];

export function exampleH1En(ex: CvExample): string {
  return ex.h1 ?? `${ex.job} CV example`;
}

export function exampleLabelEn(ex: CvExample): string {
  return ex.label ?? `${ex.short} CV`;
}

export function getCvExampleEn(slug: string): CvExampleEn | undefined {
  return CV_EXAMPLES_EN.find((e) => e.slug === slug);
}

/** English example matching a French slug (for hreflang). */
export function enSlugForFr(frSlug: string): string | undefined {
  return CV_EXAMPLES_EN.find((e) => e.fr === frSlug)?.slug;
}
