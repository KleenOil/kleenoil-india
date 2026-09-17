export const DEFAULT_AMC_HERO = {
  eyebrow: 'ANNUAL MAINTENANCE',
  heading: 'Predictable performance.\nZero operational stress.',
  lead: 'The Kleenoil Oil Management Contract keeps filtration machines in spec all year — so your team runs the plant, not the failure.',
  note: 'Preventive care, written into the year',
  cta: {
    label: 'Request an Estimate',
    href: '/contact',
    appearance: 'primary' as const,
  },
  imageUrl: '/images/amc-hero.png',
  imageAlt: 'Engineer servicing a Kleenoil filtration unit on the plant floor',
  points: [
    {
      n: '01',
      title: 'Peak performance',
      body: 'Stable pressure, flow, and filtration quality.',
    },
    {
      n: '02',
      title: 'Genuine cartridges',
      body: '100% Kleenoil filters — counterfeits stay off.',
    },
    {
      n: '03',
      title: 'Priority engineers',
      body: 'Dedicated techs and faster turnaround.',
    },
  ],
  stats: [
    { value: '12', label: 'MONTHS' },
    { value: '04', label: 'SCHEDULED VISITS' },
    { value: '01', label: 'CONTRACT' },
  ],
  quarters: [
    { code: 'Q1', label: 'SCHEDULE' },
    { code: 'Q2', label: 'INSPECT' },
    { code: 'Q3', label: 'REPLACE' },
    { code: 'Q4', label: 'VERIFY' },
  ],
};

export const DEFAULT_AMC_WHY = {
  kicker: 'WHY AMC',
  heading: 'Why plants put filtration\non a contract.',
  lead: 'Filtration machines need consistent monitoring. Neglect them and you get downtime, contamination, and unstable pressure. The Kleenoil Oil Management Contract is preventive — so your team runs the plant, not the failure.',
  imageUrl: '/images/amc-why.png',
  imageAlt: 'Industrial filtration hardware used under a Kleenoil AMC',
  items: [
    {
      n: '01',
      icon: 'gauge' as const,
      title: 'Guaranteed machine performance',
      body: 'Regular scheduled maintenance keeps filtration machines at peak efficiency — stable pressure, consistent flow, and predictable filtration quality.',
    },
    {
      n: '02',
      icon: 'timer' as const,
      title: 'Extended machine life',
      body: 'Routine servicing, filter inspection, moisture control, and carbon-dust monitoring increase the lifespan of both the machine and the oil inside the system.',
    },
    {
      n: '03',
      icon: 'headphones' as const,
      title: 'Priority service & faster response',
      body: 'AMC customers receive priority scheduling, quicker turnaround, and dedicated service engineers for faster issue resolution.',
    },
    {
      n: '04',
      icon: 'shield-check' as const,
      title: 'Authentic Kleenoil filters only',
      body: 'Counterfeit filters are common. AMC guarantees 100% genuine Kleenoil cartridges — protecting the machinery and the filtration result.',
    },
    {
      n: '05',
      icon: 'package' as const,
      title: 'Free or discounted spare parts',
      body: 'Based on your AMC tier, enjoy free consumables or special pricing on spare parts — reducing maintenance cost significantly.',
    },
  ],
};

export const DEFAULT_AMC_COVERAGE = {
  eyebrow: 'WHAT THE CONTRACT COVERS',
  heading: 'Preventive care, written into the year.',
  lead: 'The AMC is not a call-out list. It is scheduled work on the filtration system — so pressure, flow, and cartridge quality stay inside the band you bought the machine for.',
  cards: [
    {
      icon: 'calendar-check' as const,
      title: 'Scheduled maintenance',
      body: 'Regular visits on a calendar, not after a failure.',
    },
    {
      icon: 'search' as const,
      title: 'Filter inspection',
      body: 'Cartridges checked and replaced on condition, not guesswork.',
    },
    {
      icon: 'droplets' as const,
      title: 'Moisture control',
      body: 'Water watched and removed before it turns into acid and wear.',
    },
    {
      icon: 'wind' as const,
      title: 'Carbon-dust monitoring',
      body: 'Degradation products tracked so the oil stays inside spec.',
    },
    {
      icon: 'shield-check' as const,
      title: 'Genuine cartridges only',
      body: '100% Kleenoil filters — no counterfeit media in the housing.',
    },
    {
      icon: 'wrench' as const,
      title: 'Dedicated engineers',
      body: 'Named service engineers, not a rotating call desk.',
    },
    {
      icon: 'zap' as const,
      title: 'Priority scheduling',
      body: 'Faster turnaround than ad-hoc service.',
    },
    {
      icon: 'package' as const,
      title: 'Spares by tier',
      body: 'Free consumables or discounted parts, depending on the contract.',
    },
  ],
};

export const DEFAULT_AMC_VISIT = {
  eyebrow: 'A VISIT ON THE FLOOR',
  heading: 'Arrive. Service the machine.\nLeave it in spec.',
  steps: [
    {
      n: '01',
      icon: 'truck' as const,
      title: 'Arrive',
      body: 'The engineer lands with the trolley, the cartridges, and the last ISO readout.',
      imageUrl: '/images/services-visit-arrive.png',
      imageAlt: 'Service trolley arriving at the machine',
    },
    {
      n: '02',
      icon: 'droplet' as const,
      title: 'Inspect',
      body: 'Pressure, moisture, carbon dust, and the housing — written down before a spanner turns.',
      imageUrl: '/images/services-visit-inspect.png',
      imageAlt: 'Engineer inspecting a filtration housing',
    },
    {
      n: '03',
      icon: 'circle-check' as const,
      title: 'Restore',
      body: 'Genuine cartridge in. Oil sampled. Machine back on the band you bought it for.',
      imageUrl: '/images/services-visit-restore.png',
      imageAlt: 'Filtration unit restored and running',
    },
  ],
};

export const DEFAULT_AMC_INDUSTRIES = {
  kicker: 'PLANTS ON CONTRACT',
  heading: 'The same preventive care, across the plant types we already know.',
  photos: [
    {
      label: 'Automotive',
      imageUrl:
        'https://images.unsplash.com/photo-1531708366981-aa022a4e34ef?auto=format&fit=crop&w=1080&q=80',
    },
    {
      label: 'Steel',
      imageUrl:
        'https://images.unsplash.com/photo-1569371030340-816be1bc1be9?auto=format&fit=crop&w=1080&q=80',
    },
    {
      label: 'Cement',
      imageUrl:
        'https://images.unsplash.com/photo-1600683550547-2c38a96fb400?auto=format&fit=crop&w=1080&q=80',
    },
    {
      label: 'Power',
      imageUrl:
        'https://images.unsplash.com/photo-1738162837389-3b02d6dd507b?auto=format&fit=crop&w=1080&q=80',
    },
  ],
  chips: ['Automotive', 'Steel', 'Cement', 'Mining', 'Power', 'Sugar', 'Defence', 'Die-casting'],
};

export const DEFAULT_AMC_PROOF = {
  eyebrow: 'TESTIMONIALS',
  heading: 'See the proven results\non the floor.',
  lead: 'AMC is judged by uptime, pressure, and oil that stays in spec. Read what our clients say — then put the same schedule on your plant.',
  imageUrl: '/images/amc-proof.png',
  imageAlt: 'Industrial plant floor where Kleenoil AMC results are measured',
  cta: {
    label: 'View Testimonials',
    href: '/#testimonials',
    appearance: 'primary' as const,
  },
};

export const DEFAULT_AMC_CTA = {
  eyebrow: 'START THE CONTRACT',
  heading: 'Ready to save money and\nextend equipment life?',
  subtext:
    'Contact us for an estimate on a Kleenoil Oil Management Contract. See what plants on AMC say in our testimonials.',
  ctas: [
    {
      label: 'Request an Estimate',
      href: '/contact',
      appearance: 'primary' as const,
    },
    {
      label: 'View Testimonials',
      href: '/#testimonials',
      appearance: 'secondary' as const,
    },
  ],
};
