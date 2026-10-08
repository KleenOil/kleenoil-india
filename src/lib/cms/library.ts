export type ResourceHeroVariant = 'industries' | 'applications' | 'fluids' | 'testimonials' | 'faq';

export type ResourcePdfsVariant = 'industries' | 'applications' | 'fluids' | 'testimonials';

export type ResourceStat = { n: string; label: string };
export type ResourcePdfCard = { title: string; meta: string; href?: string };
export type ResourcePreview = { title: string; kicker: string };
export type FaqTopic = {
  label: string;
  items: Array<{ question: string; answer: string; defaultOpen?: boolean }>;
};

export const RESOURCE_HERO_VARIANTS: Array<{ label: string; value: ResourceHeroVariant }> = [
  { label: 'Industries', value: 'industries' },
  { label: 'Applications', value: 'applications' },
  { label: 'Types of Oil', value: 'fluids' },
  { label: 'Testimonials', value: 'testimonials' },
  { label: 'FAQ', value: 'faq' },
];

export const RESOURCE_PDFS_VARIANTS: Array<{ label: string; value: ResourcePdfsVariant }> = [
  { label: 'Industries', value: 'industries' },
  { label: 'Applications', value: 'applications' },
  { label: 'Types of Oil', value: 'fluids' },
  { label: 'Testimonials', value: 'testimonials' },
];

export const DEFAULT_RESOURCE_HERO: Record<
  ResourceHeroVariant,
  {
    eyebrow: string;
    heading: string;
    lead: string;
    cta?: { label: string; href: string; appearance: 'primary' | 'secondary' | 'ghost' };
    stats: ResourceStat[];
    quote?: string;
    attribution?: string;
    previews?: ResourcePreview[];
    imageUrl?: string;
  }
> = {
  industries: {
    eyebrow: 'Industries',
    heading: 'Filtration for the plants\nthat never stop.',
    lead: 'From automotive presses to steel casters and turbine halls — download the industry brief for the plant you run.',
    cta: { label: 'Browse Industry PDFs', href: '#notes', appearance: 'primary' },
    stats: [
      { n: '01', label: 'AUTOMOTIVE' },
      { n: '02', label: 'STEEL' },
      { n: '03', label: 'POWER' },
      { n: '04', label: 'MARINE' },
    ],
  },
  applications: {
    eyebrow: 'Applications',
    heading: 'The machine\nis the brief.',
    lead: 'Injection moulding, die casting, presses, TBMs — each application has a contamination pattern. Download the note for the machine you run.',
    cta: { label: 'Browse Application PDFs', href: '#notes', appearance: 'primary' },
    stats: [
      { n: '01', label: 'MOULD' },
      { n: '02', label: 'PRESS' },
      { n: '03', label: 'BORE' },
    ],
  },
  fluids: {
    eyebrow: 'Types of oil',
    heading: 'Name the fluid.\nWe already treat it.',
    lead: 'Hydraulic, gear, turbine, lube, cutting, glycol — download the fluid note for the oil already in your system.',
    cta: { label: 'Browse Fluid PDFs', href: '#notes', appearance: 'primary' },
    stats: [
      { n: '01', label: 'HYDRAULIC' },
      { n: '02', label: 'GEAR' },
      { n: '03', label: 'TURBINE' },
      { n: '04', label: 'LUBE' },
    ],
  },
  testimonials: {
    eyebrow: 'Testimonials',
    heading: 'Proof,\non letterhead.',
    lead: 'Plant reports, ROI notes, and performance certificates — the same documents our customers already signed.',
    cta: { label: 'Browse Testimonial PDFs', href: '#notes', appearance: 'primary' },
    stats: [],
    quote:
      'We cut hydraulic oil consumption by 60% in the first year. The bypass units paid for themselves before the second quarter.',
    attribution: 'Plant Engineering Head  ·  Tier-1 Automotive OEM',
    previews: [
      { title: 'SAIL Steel, Rourkela', kicker: 'Performance certificate  ·  PDF' },
      { title: 'MAN Trucks', kicker: 'Field report  ·  PDF' },
      { title: 'Ultratech Cement', kicker: 'ROI note  ·  PDF' },
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1920&q=80',
  },
  faq: {
    eyebrow: 'FAQ',
    heading: 'Frequently Asked\nQuestions.',
    lead: 'High-performance hydraulics are acutely sensitive to fluid quality. Clean oil, regular samples, and scheduled care extend the life of the system.',
    stats: [
      { n: '16/13/9', label: 'ISO 4406 TARGET' },
      { n: '< 140°F', label: 'RESERVOIR TEMP' },
      { n: '0 TRACE', label: 'WATER IN OIL' },
    ],
  },
};

export const DEFAULT_RESOURCE_PDFS: Record<
  ResourcePdfsVariant,
  { eyebrow: string; heading: string; description: string; cards: ResourcePdfCard[] }
> = {
  industries: {
    eyebrow: 'Industry notes',
    heading: 'A PDF for every plant we walk into.',
    description:
      'Short industry notes — contamination patterns, typical fluids, and the filtration setup that holds on that floor.',
    cards: [
      { title: 'Automotive', meta: 'OEM, machining, transmission hydraulics' },
      { title: 'Aerospace', meta: 'Test cells, assembly, mission-critical lube' },
      { title: 'Steel Plants', meta: 'Casters, rolling mills, mill hydraulics' },
      { title: 'Marine', meta: 'Engine rooms, deck machinery, turbine oil' },
      { title: 'Power Plants', meta: 'Turbine oil, EHC, governor systems' },
      { title: 'CNC Manufacturing', meta: 'Coolant and hydraulic loops on the cell' },
      { title: 'Cement', meta: 'Kiln hydraulics and dusty mill circuits' },
      { title: 'Rubber & Tyre', meta: 'Presses, mills, and high-heat hydraulics' },
    ],
  },
  applications: {
    eyebrow: 'Application notes',
    heading: 'A PDF for every machine on the floor.',
    description:
      'Short application notes — how contamination shows up on that machine, and the filtration setup that holds.',
    cards: [
      { title: 'Injection Molding', meta: 'Clamping hydraulics and oil cleanliness' },
      { title: 'Die Casting', meta: 'High-heat hydraulics and shot loops' },
      { title: 'Rubber Molding', meta: 'Press circuits under continuous load' },
      { title: 'Hydraulic Power Press', meta: 'High-pressure oil, carbon and water' },
      { title: 'Earth Moving', meta: 'Mobile power packs in dust and shock' },
      { title: 'Tunnel Boring', meta: 'TBM hydraulics on a long drive' },
      { title: 'Ginning Press', meta: 'Seasonal presses, dirty intake oil' },
      { title: 'Blow Molding', meta: 'Closed-loop hydraulics, 24/7 duty' },
    ],
  },
  fluids: {
    eyebrow: 'Fluid notes',
    heading: 'A PDF for every oil we put back in spec.',
    description:
      'Short fluid notes — what contamination does to that oil, and how Kleenoil filtration holds cleanliness.',
    cards: [
      { title: 'Hydraulic Oil', meta: 'Power transfer, heat, sealing, lube' },
      { title: 'Gear Oil', meta: 'High-load boxes, metal wear, water' },
      { title: 'Turbine Oil', meta: 'Large reservoirs, varnish, moisture' },
      { title: 'Lube Oil', meta: 'Circulating systems, ISO cleanliness' },
      { title: 'Rust Preventive', meta: 'RP oils, residual water and dirt' },
      { title: 'Neat Cutting Oil', meta: 'Machining, swarf, tramp water' },
      { title: 'Water Glycol', meta: 'Fire-resistant fluids, particle load' },
      { title: 'Compressor Oil', meta: 'Heat, oxidation, fine particulates' },
    ],
  },
  testimonials: {
    eyebrow: 'Customer PDFs',
    heading: 'The reports plants already signed.',
    description:
      'Download performance certificates, ROI notes, and field reports from Kleenoil customers.',
    cards: [
      { title: 'Bucher Hydraulics', meta: 'Performance certificate' },
      { title: 'MAN Trucks', meta: 'Field report' },
      { title: 'Castrol India Limited', meta: 'Lab and site note' },
      { title: 'SAIL Steel, Rourkela', meta: 'Performance certificate' },
      { title: 'The Supreme Industries', meta: 'Plant report' },
      { title: 'Sansera ROI', meta: 'ROI note' },
      { title: 'Reliance', meta: 'Site certificate' },
      { title: 'Yamaha', meta: 'Performance report' },
      { title: 'Ultratech Cement', meta: 'Performance certificate' },
      { title: 'NMDC Steel Limited', meta: 'Plant report' },
      { title: 'CLP India', meta: 'Performance certificate' },
      { title: 'AIA Engineering', meta: 'Performance report' },
    ],
  },
};

export const DEFAULT_FAQ_TOPICS: { topics: FaqTopic[] } = {
  topics: [
    {
      label: 'Fluid Care',
      items: [
        {
          question: 'Why is fluid care important?',
          answer:
            'High-performance hydraulic systems need very clean oil to maximise performance and extend component life. Less sophisticated systems may tolerate dirt. Servo equipment will silt up and run erratically above an ISO 4406 rating of 16/13/9. Servo valves must move smoothly to deliver the pressures and flow they were designed for.',
          defaultOpen: true,
        },
        {
          question: 'How is the life of a hydraulic system shortened?',
          answer:
            'Particles, water and varnish accelerate wear on pumps, valves and seals. Once clearances open up, leakage and heat rise, oil oxidises faster, and unplanned downtime follows. Most premature failures start as contamination the system filter never saw.',
        },
        {
          question: 'How can hydraulic system life be maximized?',
          answer:
            'Hold cleanliness at or below the OEM ISO target, keep water at zero trace, and sample on a schedule. Bypass filtration continuously polishes the reservoir so the in-line filter is not doing the whole job. Kleenoil units run 24/7 without interrupting production.',
        },
        {
          question: 'What does clean hydraulic fluid look like?',
          answer:
            'Clean oil is bright, not cloudy, and free of visible silt. Appearance is only a start — ISO 4406 particle counts and water ppm tell you if the fluid will actually protect servo valves and pumps.',
        },
        {
          question: 'What is viscosity?',
          answer:
            'Viscosity is the oil’s resistance to flow. Too thin and the film collapses; too thick and pumps starve and heat. Contamination and oxidation both knock viscosity out of spec, which is why cleanliness and temperature control matter together.',
        },
        {
          question: 'What is oxidation?',
          answer:
            'Oxidation is oil reacting with oxygen under heat. It forms acids, sludge and varnish that stick to valves and coolers. Clean, dry oil oxidises far more slowly — extending drain intervals and keeping the system in spec.',
        },
      ],
    },
    {
      label: 'Contamination',
      items: [
        {
          question: 'Where does contamination come from?',
          answer:
            'New oil is rarely clean enough. Ingress comes through breathers, rod seals, and filling. Internally the system generates wear metal, rubber, and carbon. Water enters as condensation or coolant leaks. Bypass filtration catches what the in-line filter is not sized to hold.',
        },
        {
          question: 'What ISO code should we run to?',
          answer:
            'Servo and proportional systems typically need 16/13/9 or cleaner. Vane and piston pumps are happier below 18/16/13. The OEM rating is the floor — running one ISO grade cleaner pays back in seal and valve life.',
        },
      ],
    },
    {
      label: 'Filters & Flushing',
      items: [
        {
          question: 'How is bypass filtration different from the in-line filter?',
          answer:
            'The in-line filter protects the pump on each pass at high flow. A Kleenoil bypass unit takes a small side-stream from the reservoir and polishes it slowly through dense media, removing silt, water and varnish the pressure filter never sees.',
        },
        {
          question: 'When do we need a flush?',
          answer:
            'After a failure, a rebuild, or when ISO counts will not come down with offline filtration alone. Flushing moves debris out of lines and dead legs; bypass filtration then holds the cleanliness the flush achieved.',
        },
      ],
    },
    {
      label: 'Magnetic Filtration',
      items: [
        {
          question: 'What does a magnetic filter catch?',
          answer:
            'KleenMag captures ferrous wear particles that paper and glass media miss at high flow — the chips that score pumps and valves. It sits in the circuit as a complement to bypass and in-line filtration, not a replacement.',
        },
        {
          question: 'Where should magnetic filtration sit?',
          answer:
            'On return lines, gearboxes, and any loop generating iron or steel fines. High-intensity units work in machining, steel, and mobile plant where metal wear is continuous.',
        },
      ],
    },
  ],
};

export const DEFAULT_FAQ_CTA = {
  eyebrow: 'Next step',
  heading: 'Ready to save money and extend equipment life?',
  ctas: [{ label: 'Request an Estimate', href: '/contact', appearance: 'primary' as const }],
};
