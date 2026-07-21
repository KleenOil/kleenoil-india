/** Design-accurate fallbacks when CMS globals are empty (Kleenoil homepage design). */

export type NavLink = {
  label: string;
  href: string;
};

export type FooterColumn = {
  title: string;
  links: NavLink[];
};

export const DEFAULT_SITE = {
  companyName: 'KLEENOIL',
  companyTagline: 'INDIA — EST. 1988',
  footerTagline:
    'Engineering the cleanest oil and longest equipment life in heavy industry, since 1988.',
  copyright: '© {{year}} KLEENOIL INDIA PVT. LTD. — BANGALORE, INDIA',
};

export const DEFAULT_MAIN_NAV: NavLink[] = [
  { label: 'Products', href: '/products' },
  { label: 'Industries', href: '/industries' },
  { label: 'Solutions', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Resources', href: '/resources' },
];

export const DEFAULT_UTILITY_NAV: NavLink[] = [{ label: 'Contact', href: '/contact' }];

export const DEFAULT_FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: 'PRODUCTS',
    links: [
      { label: 'Oil Filtration', href: '/products' },
      { label: 'Vacuum Dehydration', href: '/products' },
      { label: 'Coolant Purification', href: '/products' },
      { label: 'Magnetic Filtration', href: '/products' },
      { label: 'Oil Analysis', href: '/products' },
    ],
  },
  {
    title: 'INDUSTRIES',
    links: [
      { label: 'Automotive', href: '/industries' },
      { label: 'Aerospace', href: '/industries' },
      { label: 'Steel Plants', href: '/industries' },
      { label: 'Marine', href: '/industries' },
      { label: 'Power Plants', href: '/industries' },
      { label: 'CNC Manufacturing', href: '/industries' },
    ],
  },
  {
    title: 'COMPANY',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Engineering Team', href: '/about' },
      { label: 'Press', href: '/about' },
      { label: 'Careers', href: '/about' },
      { label: 'Sustainability', href: '/about' },
    ],
  },
  {
    title: 'RESOURCES',
    links: [
      { label: 'Case Studies', href: '/case-studies' },
      { label: 'Technical Library', href: '/resources/downloads' },
      { label: 'Brochures', href: '/resources/brochures' },
      { label: 'FAQ', href: '/resources/faqs' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

export const DEFAULT_LEGAL_LINKS: NavLink[] = [
  { label: 'PRIVACY', href: '/privacy' },
  { label: 'TERMS', href: '/terms' },
  { label: 'COOKIES', href: '/cookies' },
  { label: 'COMPLIANCE', href: '/compliance' },
];

export const DEFAULT_HERO = {
  eyebrow: 'INDUSTRIAL FILTRATION TECHNOLOGY',
  headline: 'Industrial Filtration\nEngineered For\nMaximum Equipment\nLife.',
  subheadline:
    'Precision oil purification and bypass filtration systems that extend equipment life by up to 5×, slash unplanned downtime, and protect the engineering backbone of modern industry.',
  ctas: [
    { label: 'Explore Products', href: '/products', appearance: 'primary' as const },
    { label: 'Book Consultation', href: '/contact', appearance: 'secondary' as const },
  ],
  metaStats: [
    { value: '99.9%', label: 'CONTAMINANT REMOVAL' },
    { value: '5×', label: 'OIL LIFE EXTENDED' },
    { value: '68%', label: 'DOWNTIME REDUCED' },
  ],
};

export const DEFAULT_STATISTICS = {
  eyebrow: 'BY THE NUMBERS',
  heading: 'Four decades of\nengineering trust.',
  description:
    'From mid-sized factories to global Fortune 500 plants, Kleenoil has spent 35 years building the most trusted filtration backbone in heavy industry.',
  stats: [
    { value: '35+', label: 'Years of engineering excellence' },
    { value: '2,000+', label: 'Clients across heavy industry' },
    { value: 'ISO 9001', label: 'Certified manufacturing standards' },
    { value: '40+', label: 'Countries with active deployments' },
  ],
};

export const DEFAULT_TRUST_INDICATORS = {
  heading: 'TRUSTED BY GLOBAL INDUSTRY LEADERS',
  logos: [
    { name: 'SIEMENS' },
    { name: 'TATA STEEL' },
    { name: 'L&T' },
    { name: 'BOSCH' },
    { name: 'MAHINDRA' },
    { name: 'JSW' },
    { name: 'BHEL' },
    { name: 'GODREJ' },
  ],
};

export const DEFAULT_FEATURED_PRODUCTS = {
  eyebrow: 'PRODUCT CATEGORIES',
  heading: 'Filtration systems engineered\nfor every operational reality.',
  description:
    'A complete portfolio of contamination control, fluid conditioning, and oil analysis technologies — each engineered to extend equipment life and eliminate downtime.',
  cta: { label: 'View full catalogue', href: '/products', appearance: 'ghost' as const },
  products: [
    {
      tag: '01 / SYSTEM',
      title: 'Oil Filtration Systems',
      description:
        'Multi-stage bypass filtration removing 99.9% of particulate, water and varnish from industrial lubricants.',
      href: '/products',
      imageUrl:
        'https://images.unsplash.com/photo-1659391197600-d271112c08a4?auto=format&fit=crop&w=1080&q=80',
    },
    {
      tag: '02 / VACUUM',
      title: 'Vacuum Dehydration',
      description:
        'High-vacuum dehydrators that eliminate dissolved water and gases from hydraulic and turbine oils.',
      href: '/products',
      imageUrl:
        'https://images.unsplash.com/photo-1724222976890-38f36c591a67?auto=format&fit=crop&w=1080&q=80',
    },
    {
      tag: '03 / COOLANT',
      title: 'Coolant Purification',
      description:
        'Continuous purification of cutting fluids and water-soluble coolants for CNC machining.',
      href: '/products',
      imageUrl:
        'https://images.unsplash.com/photo-1733665934619-138a47d7be55?auto=format&fit=crop&w=1080&q=80',
    },
    {
      tag: '04 / MAGNETIC',
      title: 'Magnetic Filtration',
      description:
        'High-gauss magnetic separators that capture sub-micron ferrous particles invisible to mesh filtration.',
      href: '/products',
      imageUrl:
        'https://images.unsplash.com/photo-1632305308846-86bfa4494b1d?auto=format&fit=crop&w=1080&q=80',
    },
    {
      tag: '05 / ANALYSIS',
      title: 'Oil Analysis Equipment',
      description:
        'Lab and on-site instrumentation for ISO 4406 cleanliness, water content and wear metals.',
      href: '/products',
      imageUrl:
        'https://images.unsplash.com/photo-1699373383910-6f9cf75ee50a?auto=format&fit=crop&w=1080&q=80',
    },
  ],
};

export const DEFAULT_FEATURED_INDUSTRIES = {
  eyebrow: 'INDUSTRY SOLUTIONS',
  heading: 'Deployed in the most demanding\nengineering environments.',
  description:
    'From precision aerospace to heavy-duty steel mills, our filtration platforms operate at the extremes of pressure, temperature, and tolerance.',
  industries: [
    {
      tag: '01 / INDUSTRY',
      title: 'Automotive',
      description:
        'Engine assembly, transmission and machining hydraulics across Tier-1 OEM and component plants.',
      href: '/industries',
      imageUrl:
        'https://images.unsplash.com/photo-1770983438559-00913b3e2769?auto=format&fit=crop&w=1080&q=80',
    },
    {
      tag: '02 / INDUSTRY',
      title: 'Aerospace',
      description:
        'Mission-critical hydraulic and lubrication systems for engine test cells, machining, and assembly.',
      href: '/industries',
      imageUrl:
        'https://images.unsplash.com/photo-1520642589361-855efeb16791?auto=format&fit=crop&w=1080&q=80',
    },
    {
      tag: '03 / INDUSTRY',
      title: 'Steel Plants',
      description:
        'Rolling mills, continuous casters and hydraulic systems where contamination defines uptime.',
      href: '/industries',
      imageUrl:
        'https://images.unsplash.com/photo-1543781826-35d17354536c?auto=format&fit=crop&w=1080&q=80',
    },
    {
      tag: '04 / INDUSTRY',
      title: 'Marine',
      description:
        'Engine room lubrication, hydraulic deck machinery and turbine oil conditioning at sea.',
      href: '/industries',
      imageUrl:
        'https://images.unsplash.com/photo-1699045385182-fcd0f563ebd9?auto=format&fit=crop&w=1080&q=80',
    },
    {
      tag: '05 / INDUSTRY',
      title: 'Power Plants',
      description:
        'Turbine oil reservoirs, governor systems and EHC for thermal, nuclear and renewable plants.',
      href: '/industries',
      imageUrl:
        'https://images.unsplash.com/photo-1767795197649-8bb9dc3c3011?auto=format&fit=crop&w=1080&q=80',
    },
    {
      tag: '06 / INDUSTRY',
      title: 'CNC Manufacturing',
      description:
        'Coolant management and hydraulic filtration for high-precision machining operations.',
      href: '/industries',
      imageUrl:
        'https://images.unsplash.com/photo-1738162837335-3745e5d16c09?auto=format&fit=crop&w=1080&q=80',
    },
  ],
};

export const DEFAULT_PROCESS_STORY = {
  eyebrow: 'THE FILTRATION PROCESS',
  heading: 'From contaminated to pristine,\nengineered at the molecular level.',
  description:
    'Four engineered stages working in continuous flow to remove particulate, water and varnish — protecting the precision tolerances of modern machinery.',
  steps: [
    {
      stage: 'STAGE 01',
      title: 'Contaminated Oil',
      description:
        'Heavy industrial lubricant entering the system loaded with sub-micron wear metals, oxidation by-products and free water.',
      spec: 'PARTICULATE > 18μm',
      theme: 'contaminated' as const,
    },
    {
      stage: 'STAGE 02',
      title: 'Coalescer Stage',
      description:
        'Water and gases separated from the fluid stream via high-velocity coalescing media and vacuum dehydration.',
      spec: 'WATER < 50 PPM',
      theme: 'coalescer' as const,
    },
    {
      stage: 'STAGE 03',
      title: 'Depth Filtration',
      description:
        'Multi-layer cellulose and magnetic media capture wear debris down to 0.5 microns with absolute efficiency.',
      spec: 'PARTICULATE < 0.5μm',
      theme: 'depth' as const,
    },
    {
      stage: 'STAGE 04',
      title: 'Pristine Output',
      description:
        'Conditioned oil returned to service — cleaner than new, ready to extend equipment life by 5× or more.',
      spec: 'ISO 16/14/11',
      theme: 'pristine' as const,
    },
  ],
};

export const DEFAULT_FEATURED_CASE_STUDIES = {
  eyebrow: 'PROVEN RESULTS',
  heading: 'Measured outcomes from\nthe industrial frontline.',
  description:
    'Selected deployments where Kleenoil filtration platforms have rewritten the equipment-life economics of demanding operations.',
  cta: { label: 'View all case studies', href: '/case-studies', appearance: 'ghost' as const },
  caseStudies: [
    {
      tag: 'CASE STUDY / AUTOMOTIVE',
      title: '68% reduction in unplanned downtime at Tier-1 OEM plant',
      description:
        'Deployed 12 Kleenoil bypass filtration units across hydraulic systems. Result: extended oil life by 5× and saved over $1.2M in annual maintenance.',
      href: '/case-studies',
      metrics: [
        { value: '68%', label: 'DOWNTIME REDUCED' },
        { value: '5×', label: 'OIL LIFE EXTENDED' },
        { value: '$1.2M', label: 'ANNUAL SAVINGS' },
      ],
    },
    {
      tag: 'CASE STUDY / STEEL',
      title: 'Continuous caster uptime restored at integrated steel mill',
      description:
        'Vacuum dehydration combined with bypass filtration on 50,000L hydraulic reservoirs eliminated water-driven valve failures across two casting lines.',
      href: '/case-studies',
      metrics: [
        { value: '92%', label: 'WATER REMOVED' },
        { value: '3.4yr', label: 'PAYBACK PERIOD' },
        { value: '18K hrs', label: 'ADDED LIFE' },
      ],
    },
    {
      tag: 'CASE STUDY / POWER',
      title: 'Turbine oil restored to OEM cleanliness without an outage',
      description:
        'Inline Kleenoil conditioning on a 660MW thermal turbine restored ISO 16/14/11 cleanliness in 96 hours — no shutdown required.',
      href: '/case-studies',
      metrics: [
        { value: 'ISO 16', label: 'FINAL CLEANLINESS' },
        { value: '96h', label: 'RESTORATION TIME' },
        { value: '0', label: 'OUTAGE HOURS' },
      ],
    },
    {
      tag: 'CASE STUDY / MARINE',
      title: 'Bulk carrier fleet maintenance cycles cut in half',
      description:
        'On-board filtration packages across 14 vessels extended main engine lube oil change intervals from 6 to 14 months, freeing fleet schedules and crew load.',
      href: '/case-studies',
      metrics: [
        { value: '2.3×', label: 'INTERVAL EXTENSION' },
        { value: '14', label: 'VESSELS DEPLOYED' },
        { value: '₹14Cr', label: 'FLEET SAVINGS' },
      ],
    },
  ],
};

export const DEFAULT_ABOUT_STORY = {
  eyebrow: 'OUR STORY',
  heading: 'Thirty-five years\nof engineering precision.',
  description:
    'From a single workshop in Bangalore to filtration installations across forty countries — a continuous engineering lineage built on first-principles thinking.',
  quote:
    'Clean oil is the foundation of every reliable machine. Our work has always been to make that foundation absolute.',
  quoteAuthor: 'Rajiv Mehra',
  quoteRole: 'FOUNDER & CHIEF ENGINEER',
  imageUrl:
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1080&q=80',
  timeline: [
    {
      year: '1988',
      label: 'FOUNDATION',
      title: 'Kleenoil India Founded',
      description:
        'Established in Bangalore as a pioneering bypass filtration specialist serving Indian heavy industry.',
    },
    {
      year: '1995',
      label: 'FIRST MAJOR DEPLOYMENT',
      title: '50-Unit Steel Plant Installation',
      description:
        'Largest-ever bypass filtration deployment in South Asia — a hydraulic transformation across a single integrated mill.',
    },
    {
      year: '2002',
      label: 'CERTIFICATION',
      title: 'ISO 9001:2000 Achieved',
      description:
        'Manufacturing operations brought under formal quality systems — the first Indian filtration brand in its category to certify end-to-end.',
    },
    {
      year: '2008',
      label: 'INTERNATIONAL',
      title: 'Global Distribution Begins',
      description:
        'Distribution agreements established across the Middle East, Southeast Asia, and Africa — the brand passes its first decade abroad.',
    },
    {
      year: '2015',
      label: 'R&D',
      title: 'Engineering Centre Opens',
      description:
        'A dedicated 12,000 sq ft research and testing facility commissioned to develop next-generation vacuum and depth filtration platforms.',
    },
    {
      year: '2020',
      label: 'DIGITAL',
      title: 'Smart Filtration Platform',
      description:
        'IoT-enabled remote condition monitoring launched — customers gain real-time visibility into fluid health and filter life.',
    },
    {
      year: '2024',
      label: 'GLOBAL',
      title: '40 Countries, 2000 Clients',
      description:
        'Active deployments span 40+ countries, with Kleenoil systems integrated into Fortune 500 manufacturing and energy operations.',
    },
  ],
};

export const DEFAULT_TEAM = {
  eyebrow: 'LEADERSHIP',
  heading: 'Engineers who built\nthe filtration standard.',
  description:
    'A multidisciplinary team of fluid systems engineers, metallurgists, and field specialists with decades of combined heavy-industry experience.',
  members: [
    {
      name: 'Rajiv Mehra',
      role: 'FOUNDER & CHIEF ENGINEER',
      imageUrl:
        'https://images.unsplash.com/photo-1546888673-4db7ff10251a?auto=format&fit=crop&w=1080&q=80',
    },
    {
      name: 'Anita Krishnan',
      role: 'DIRECTOR OF ENGINEERING',
      imageUrl:
        'https://images.unsplash.com/photo-1701287348766-2eeb0e16f874?auto=format&fit=crop&w=1080&q=80',
    },
    {
      name: 'Vikram Shah',
      role: 'HEAD OF R&D',
      imageUrl:
        'https://images.unsplash.com/photo-1627776880991-808c5996527b?auto=format&fit=crop&w=1080&q=80',
    },
    {
      name: 'Maya Iyer',
      role: 'GLOBAL OPERATIONS',
      imageUrl:
        'https://images.unsplash.com/photo-1743015852574-977620784641?auto=format&fit=crop&w=1080&q=80',
    },
  ],
};

export const DEFAULT_CTA = {
  eyebrow: 'BOOK A CONSULTATION',
  heading: 'Reduce downtime.\nExtend equipment life.',
  subtext:
    'Talk to a Kleenoil engineer about your fluid system, operating envelope and production goals.',
  ctas: [
    { label: 'Book a consultation', href: '/contact', appearance: 'primary' as const },
    { label: 'Download brochure', href: '/resources/brochures', appearance: 'secondary' as const },
  ],
  trustBadges: [
    { label: 'ISO 9001 CERTIFIED' },
    { label: '24H RESPONSE' },
    { label: '2,000+ CLIENTS GLOBALLY' },
  ],
};

export const DEFAULT_TESTIMONIALS = {
  eyebrow: 'CLIENT VOICES',
  heading: 'Trusted by engineers\non the plant floor.',
  description:
    'Maintenance leaders and reliability engineers share how Kleenoil filtration changed their operating economics.',
  items: [
    {
      quote:
        'We cut hydraulic oil consumption by 60% in the first year. The bypass units paid for themselves before the second quarter.',
      clientName: 'Suresh Nair',
      position: 'Plant Engineering Head',
      company: 'Tier-1 Automotive OEM',
    },
    {
      quote:
        'Caster line availability improved immediately once water contamination was under control. This is now standard on every new line.',
      clientName: 'Meera Deshpande',
      position: 'Reliability Manager',
      company: 'Integrated Steel Mill',
    },
    {
      quote:
        'Kleenoil restored our turbine oil to OEM cleanliness without taking the unit offline. That alone saved us three weeks of production.',
      clientName: 'Arjun Patel',
      position: 'Chief Engineer',
      company: '660MW Thermal Plant',
    },
  ],
};

export const DEFAULT_CONTACT_PREVIEW = {
  eyebrow: 'GET IN TOUCH',
  heading: 'Speak with a\nfiltration engineer.',
  description:
    'Share your fluid system details and operating goals. Our engineering team responds with a tailored contamination control assessment.',
};

export const DEFAULT_FEATURED_SERVICES = {
  eyebrow: 'ENGINEERING SOLUTIONS',
  heading: 'End-to-end support\nfrom audit to installation.',
  description:
    'Beyond equipment supply, Kleenoil engineers contamination control programmes that integrate with your maintenance workflow.',
  cta: { label: 'View all solutions', href: '/services', appearance: 'ghost' as const },
  services: [
    {
      tag: '01 / CONSULT',
      title: 'Fluid System Audit',
      description:
        'On-site assessment of oil condition, contamination sources, and filtration architecture across critical assets.',
      href: '/services',
    },
    {
      tag: '02 / DESIGN',
      title: 'Turnkey Filtration Design',
      description:
        'Custom bypass, vacuum, and coalescing configurations engineered for your fluid chemistry and duty cycle.',
      href: '/services',
    },
    {
      tag: '03 / DEPLOY',
      title: 'Installation & Commissioning',
      description:
        'Factory-trained teams deploy, commission, and validate filtration systems with ISO cleanliness targets.',
      href: '/services',
    },
    {
      tag: '04 / SUPPORT',
      title: 'Lifecycle Maintenance',
      description:
        'Filter change programmes, oil analysis reviews, and remote condition monitoring to sustain equipment life.',
      href: '/services',
    },
    {
      tag: '05 / TRAIN',
      title: 'Operator Training',
      description:
        'Hands-on programmes for maintenance teams on contamination control, sampling, and filtration best practices.',
      href: '/services',
    },
    {
      tag: '06 / MONITOR',
      title: 'Smart Condition Monitoring',
      description:
        'IoT-enabled dashboards for real-time fluid health, filter life tracking, and predictive maintenance alerts.',
      href: '/services',
    },
  ],
};
