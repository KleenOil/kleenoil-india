/** Default PDP template / fallback copy from Pencil “PDP — Combined”. */

export const DEFAULT_PDP_HERO = {
  badge: 'FLAGSHIP SYSTEM',
  eyebrow: '01 / OIL FILTRATION SYSTEMS',
  title: 'Multi-Stage Bypass\nFiltration System',
  summary:
    'Precision oil purification that removes 99.9% of particulate, water and varnish — extending equipment life by up to 5× and cutting unplanned downtime across heavy industry.',
  galleryUrls: [
    'https://images.unsplash.com/photo-1569371030340-816be1bc1be9?auto=format&fit=crop&w=1080&q=80',
    'https://images.unsplash.com/photo-1764114441005-df7e660bc2c8?auto=format&fit=crop&w=1080&q=80',
    'https://images.unsplash.com/photo-1720670996713-98e074aff7be?auto=format&fit=crop&w=1080&q=80',
    'https://images.unsplash.com/photo-1531708366981-aa022a4e34ef?auto=format&fit=crop&w=1080&q=80',
  ],
  quickSpecs: [
    { value: '99.9%', label: 'REMOVAL' },
    { value: '5×', label: 'OIL LIFE' },
    { value: 'ISO 16', label: 'CLEANLINESS' },
    { value: '24/7', label: 'DUTY' },
  ],
  quickSpecsPerRow: 'auto' as const,
  ctas: [
    { label: 'Contact to buy', href: '/contact', appearance: 'primary' as const },
    { label: 'Download specs', href: '/resources', appearance: 'secondary' as const },
  ],
};

export const DEFAULT_PDP_CONTAMINATION = {
  eyebrow: 'THE CONTAMINATION PROBLEM',
  heading: 'What enters the oil —\nand what it costs.',
  description:
    'Hydraulic fluid does more than transmit power. Contaminants accelerate wear, raise energy use, and shorten oil life across presses, moulders and mobile plant.',
  leftHeading: 'Contamination generated',
  leftDescription: 'Common solids and moisture found in hydraulic circuits',
  rightHeading: 'Problems this leads to',
  rightDescription: 'Downstream failures and operating cost',
  leftItems: [
    'Iron particles',
    'Aluminum particles',
    'Rubber particles',
    'Moisture',
    'Carbon particles',
  ],
  rightItems: [
    'Pump damage',
    'Valve damage',
    'Seal damage',
    'Pressure issues',
    'Higher machine energy consumption',
    'Lesser machine output',
    'High replacement cost of industrial oils',
  ],
};

export const DEFAULT_PDP_HOW_IT_WORKS = {
  eyebrow: 'HOW IT WORKS',
  heading: 'Four stages. One continuous clean.',
  description:
    'Oil is drawn from the reservoir, conditioned through sequential stages, and returned cleaner — without interrupting production.',
  steps: [
    {
      label: '01',
      title: 'Intake',
      description: 'Oil drawn from reservoir via dedicated bypass circuit at controlled flow.',
    },
    {
      label: '02',
      title: 'Coalescing',
      description: 'Water and gases separated through coalescing media and vacuum dehydration.',
    },
    {
      label: '03',
      title: 'Depth filtration',
      description: 'Multi-layer media captures wear debris down to sub-micron levels.',
    },
    {
      label: '04',
      title: 'Return',
      description: 'Conditioned oil returned to service — cleaner than new fluid.',
    },
  ],
};

export const DEFAULT_PDP_MACHINES = {
  eyebrow: 'WHERE IT WORKS',
  heading: 'Built for the machines\nthat keep plants running.',
  description:
    'Deployed across hydraulic power packs, injection moulding, die casting and continuous process equipment.',
  machines: [
    {
      title: 'Injection Molding Machines',
      description: 'Clamp and injection hydraulics kept at OEM cleanliness for cycle consistency.',
    },
    {
      title: 'Die Casting Machines',
      description: 'High-pressure systems protected from water and particulate ingress.',
    },
    {
      title: 'Blow Moulding Machines',
      description: 'Continuous filtration for hydraulic circuits under thermal load.',
    },
  ],
};

export const DEFAULT_PDP_MODELS = {
  eyebrow: 'AVAILABLE MODELS',
  heading: 'Kleenoil hydraulic\ncleaning systems',
  description:
    'Select by capacity. All units use 9788 filter cartridges and can run as permanent reservoir loops or mobile trolleys.',
  columns: [{ label: 'MODEL' }, { label: 'FLOW' }, { label: 'RESERVOIR' }, { label: 'POWER' }],
  models: [
    {
      name: 'KO-BFS 30',
      values: [{ value: '30 L/min' }, { value: 'up to 2,000 L' }, { value: '1.5 kW' }],
    },
    {
      name: 'KO-BFS 60',
      values: [{ value: '60 L/min' }, { value: 'up to 5,000 L' }, { value: '2.2 kW' }],
    },
    {
      name: 'KO-BFS 100',
      values: [{ value: '100 L/min' }, { value: 'up to 10,000 L' }, { value: '3.7 kW' }],
    },
  ],
};

export const DEFAULT_PDP_RESULTS = {
  eyebrow: 'PROVEN RESULTS',
  heading: 'What plants measure\nafter install.',
  description:
    'Typical outcomes from KO-BFS deployments in automotive, steel and power generation facilities.',
  results: [
    {
      tag: 'AUTOMOTIVE',
      title: 'Oil life extended 5×',
      description: 'Bypass units on hydraulic presses cut oil changes from quarterly to annual.',
      metrics: [
        { value: '5×', label: 'OIL LIFE' },
        { value: '68%', label: 'DOWNTIME ↓' },
      ],
    },
    {
      tag: 'STEEL',
      title: 'Water held under 50 ppm',
      description: 'Vacuum dehydration stabilized caster hydraulics across two lines.',
      metrics: [
        { value: '<50', label: 'PPM WATER' },
        { value: '92%', label: 'WATER REMOVED' },
      ],
    },
  ],
};

export const DEFAULT_PDP_RELATED = {
  eyebrow: 'RELATED SYSTEMS',
  heading: 'Complete the contamination\ncontrol stack.',
  description: 'Pair bypass filtration with vacuum dehydration and analysis for a closed loop.',
  cards: [
    {
      title: 'Vacuum Dehydration',
      description: 'Remove dissolved water and gases from turbine and hydraulic oils.',
      href: '/products',
    },
    {
      title: 'Coolant Purification',
      description: 'Continuous purification of cutting fluids for CNC cells.',
      href: '/products',
    },
    {
      title: 'Oil Analysis',
      description: 'On-site cleanliness and water content instrumentation.',
      href: '/products',
    },
  ],
};

export const DEFAULT_PDP_CTA = {
  eyebrow: 'READY TO SPECIFY',
  heading: 'Talk to an engineer\nbefore you buy.',
  subtext:
    'Share your reservoir size, fluid type and cleanliness target — we’ll recommend the right KO-BFS configuration and send a quote.',
  ctas: [
    { label: 'Book a consultation', href: '/contact', appearance: 'primary' as const },
    { label: 'Download brochure', href: '/resources', appearance: 'secondary' as const },
  ],
  trustBadges: [
    { label: 'ISO 9001 CERTIFIED' },
    { label: '24H RESPONSE' },
    { label: '2,000+ CLIENTS' },
  ],
};
