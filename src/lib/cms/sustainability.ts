export const DEFAULT_SUSTAINABILITY_HERO = {
  eyebrow: 'SUSTAINABILITY',
  heading: 'Sustainability Through\nEvery Cycle',
  lead: 'The most sustainable oil is often the oil you don’t have to replace.',
  body: 'Our filtration technology continuously removes contaminants from circulating oil — helping extend service life, reduce unnecessary replacement, minimize used-oil waste, and make better use of the resources already in your system.',
  cta: {
    label: 'Discover Our Technology',
    href: '/products',
    appearance: 'primary' as const,
  },
  imageUrl: '/images/sustainability-hero.png',
  imageAlt: 'Industrial oil sight glass on filtration equipment',
  pills: [
    { n: '01', label: 'CONTINUOUS FILTRATION' },
    { n: '02', label: 'EXTENDED OIL LIFE' },
    { n: '03', label: 'REDUCED WASTE' },
    { n: '04', label: 'RESOURCE EFFICIENCY' },
  ],
};

export const DEFAULT_SUSTAINABILITY_IMPACT = {
  eyebrow: 'SUSTAINABILITY IMPACT',
  heading: 'Clean Oil. Less Waste. Better\nEfficiency.',
  lead: 'Traditional oil management often leads to premature replacement — discarding fluid that still has useful life. Our filtration systems keep oil cleaner for longer, so operations can maximize the oil already in service rather than treating it as a disposable input.',
  cards: [
    {
      icon: 'hourglass' as const,
      title: 'Extended Oil Life',
      body: 'Keep oil in service longer through continuous contamination control.',
    },
    {
      icon: 'recycle' as const,
      title: 'Reduced Oil Consumption',
      body: 'Reduce the frequency of oil replacement and make better use of existing resources.',
    },
    {
      icon: 'trash' as const,
      title: 'Less Used-Oil Waste',
      body: 'Minimize the amount of used oil requiring disposal.',
    },
    {
      icon: 'shield' as const,
      title: 'Equipment Protection',
      body: 'Cleaner oil helps reduce contamination-related wear and supports reliable equipment performance.',
    },
  ],
};

export const DEFAULT_SUSTAINABILITY_CIRCULAR = {
  eyebrow: 'CIRCULAR OIL MANAGEMENT',
  heading: 'From Oil Consumption to Oil\nCirculation',
  lead: 'Filtration supports a more circular approach to industrial oil management — extending the useful life of oil rather than treating it as a disposable resource.',
  steps: [
    {
      n: '01',
      title: 'FILTER',
      body: 'Remove particulates, water, and degradation by-products as oil circulates.',
    },
    {
      n: '02',
      title: 'CLEAN',
      body: 'Restore fluid cleanliness without taking the system offline.',
    },
    {
      n: '03',
      title: 'REUSE',
      body: 'Keep qualified oil in service instead of scheduling a premature drain.',
    },
    {
      n: '04',
      title: 'EXTEND',
      body: 'Compound the value of every litre already purchased, stored, and filled.',
    },
  ],
  cycle: [
    { label: 'Filter', icon: 'layers' as const, angle: -90 },
    { label: 'Filter Again', icon: 'refresh' as const, angle: -18 },
    { label: 'Clean', icon: 'droplet' as const, angle: 42 },
    { label: 'Extend', icon: 'hourglass' as const, angle: 145 },
    { label: 'Reuse', icon: 'recycle' as const, angle: 215 },
  ],
};

export const DEFAULT_SUSTAINABILITY_DROP = {
  eyebrow: 'EVERY DROP MATTERS',
  heading: 'Sustainability Starts With\nEvery Drop',
  paragraphs: [
    'Every litre of oil represents valuable resources, energy, manufacturing effort, transportation, and disposal. Replacing oil unnecessarily can create avoidable waste.',
    'Our filtration solutions help businesses maximize the useful life of their oil, allowing them to extract greater value from every drop while reducing the environmental impact associated with frequent oil replacement and disposal.',
  ],
  imageUrl: '/images/sustainability-drop.png',
  imageAlt: 'Oil drop falling through a filter cone',
};

export const DEFAULT_SUSTAINABILITY_NUMBERS = {
  eyebrow: 'SUSTAINABILITY BY NUMBERS',
  heading: 'Potential, not promises.',
  lead: 'Results vary by application. The figures below are placeholders for measured outcomes — not claimed performance.',
  stats: [
    { value: '[XX%]', label: 'Potential reduction in oil consumption' },
    { value: '[XX×]', label: 'Potential extension of oil service life' },
    { value: '[XX L]', label: 'Potential oil waste avoided' },
    { value: '[XX%]', label: 'Potential reduction in replacement frequency' },
  ],
  disclaimer:
    'Actual results depend on application, operating conditions, oil type, contamination levels, and filtration system configuration.',
};

export const DEFAULT_SUSTAINABILITY_APPLICATIONS = {
  eyebrow: 'APPLICATIONS',
  heading: 'Engineering a More\nSustainable Industry',
  lead: 'Sustainability and industrial performance can work together. Cleaner circulating oil supports longer fluid life and more reliable equipment across the operations that keep industry moving.',
  cards: [
    {
      icon: 'factory' as const,
      title: 'Manufacturing',
      body: 'Continuous contamination control for machining, presses, and production lines.',
    },
    {
      icon: 'zap' as const,
      title: 'Power Generation',
      body: 'Cleaner lubricants for turbines, generators, and auxiliary plant systems.',
    },
    {
      icon: 'gauge' as const,
      title: 'Hydraulics',
      body: 'Fluid cleanliness for hydraulic circuits under continuous industrial load.',
    },
    {
      icon: 'truck' as const,
      title: 'Heavy Machinery',
      body: 'Extended fluid life for high-duty mobile plant and industrial equipment.',
    },
    {
      icon: 'cog' as const,
      title: 'Industrial Equipment',
      body: 'Resource-efficient oil management across rotating and process assets.',
    },
    {
      icon: 'car' as const,
      title: 'Automotive / Mobility',
      body: 'Precision fluid cleanliness for production lines and powertrain operations.',
    },
  ],
};

export const DEFAULT_SUSTAINABILITY_CTA = {
  eyebrow: 'NEXT STEP',
  heading: 'Cleaner Oil. Longer Service Life. Less\nWaste.',
  subtext:
    'Discover how smarter filtration can help make your operation more efficient and resource-conscious.',
  cta: {
    label: 'Explore Our Filtration Solutions',
    href: '/products',
    appearance: 'primary' as const,
  },
};
