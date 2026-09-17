export const DEFAULT_SERVICES_HERO = {
  eyebrow: 'SERVICES',
  heading: 'Oil management\nwithout the guesswork.',
  lead: 'Cleaning, reclamation, and rejuvenation for critical industrial oils. We extend fluid life, cut replacement cost, and reduce waste — on your floor.',
  note: 'Customized to your plant and fluid',
  cta: {
    label: 'Request an Estimate',
    href: '/contact',
    appearance: 'primary' as const,
  },
  imageUrl: '/images/services-hero.png',
  imageAlt: 'Engineer servicing industrial oil filtration equipment on the plant floor',
  cards: [
    {
      n: '01',
      kicker: 'CLEAN',
      title: 'Cleaning',
      body: 'Remove contamination from circulating oil so the fluid you already bought stays in spec.',
    },
    {
      n: '02',
      kicker: 'RECLAIM',
      title: 'Reclamation',
      body: 'Restore usable oil instead of draining it early — less waste, lower fluid spend.',
    },
    {
      n: '03',
      kicker: 'RENEW',
      title: 'Rejuvenation',
      body: 'Bring oil back to spec for continued service — without taking a risk on the machine.',
    },
  ],
};

export const DEFAULT_SERVICES_OFFERINGS = {
  eyebrow: 'WHAT THE SERVICE DOES',
  heading: 'Cleaning, reclamation,\nand rejuvenation.',
  cards: [
    {
      n: '01',
      title: 'Cleaning',
      body: 'Remove particulates, water, and degradation by-products from circulating oil. A cleaner fluid lasts longer and protects the machine it serves.',
      href: '/services#program',
      linkLabel: 'See the program',
      imageUrl: '/images/services-cleaning.png',
      imageAlt: 'Technician cleaning industrial oil on the plant floor',
    },
    {
      n: '02',
      title: 'Reclamation',
      body: 'Reclaim industrial oil that still has useful life. We restore cleanliness so you replace less, dispose less, and spend less on new fluid.',
      href: '/services#program',
      linkLabel: 'See the program',
      imageUrl: '/images/services-reclamation.png',
      imageAlt: 'Oil reclamation equipment in an industrial hall',
    },
    {
      n: '03',
      title: 'Rejuvenation',
      body: 'Bring used oil back to operating spec. The aim is not a one-off clean — it is oil that stays in the machine, without taking a risk.',
      href: '/services#program',
      linkLabel: 'See the program',
      imageUrl: '/images/services-rejuvenation.png',
      imageAlt: 'Oil being rejuvenated at a machine reservoir',
    },
  ],
};

export const DEFAULT_SERVICES_FLUIDS = {
  kicker: 'FLUIDS WE TREAT',
  note: 'And other industrial fluids, including synthetics — treated on-site as part of a management contract.',
  imageUrl: '/images/services-fluids.png',
  imageAlt: 'Close-up of industrial filtration hardware',
  items: [
    { icon: 'droplets' as const, label: 'Hydraulic' },
    { icon: 'droplet' as const, label: 'Lube' },
    { icon: 'circle-dot' as const, label: 'Gear' },
    { icon: 'wind' as const, label: 'Compressor' },
    { icon: 'thermometer' as const, label: 'Thermal' },
    { icon: 'sparkles' as const, label: 'Synthetic' },
  ],
};

export const DEFAULT_SERVICES_PROGRAM = {
  eyebrow: 'THE SERVICE PROGRAM',
  heading: 'A maintenance program you can judge.',
  lead: 'Kleenoil Filtration Services is built around four questions. Answer them honestly and the work has somewhere to stand.',
  processImageUrl: '/images/services-fluids.png',
  processImageAlt: 'Filtration hardware used on a Kleenoil service visit',
  questions: [
    {
      n: '01',
      icon: 'atom' as const,
      title: 'Contamination',
      body: 'What are your contamination types and issues?',
    },
    {
      n: '02',
      icon: 'shield' as const,
      title: 'Keep it out',
      body: 'How do you minimize contamination from entering the machines?',
    },
    {
      n: '03',
      icon: 'cylinder' as const,
      title: 'Take it out',
      body: 'How do you remove contamination that does enter from inside the machine?',
    },
    {
      n: '04',
      icon: 'refresh-cw' as const,
      title: 'Oil life',
      body: 'How do you maximize oil life?',
    },
  ],
  focusKicker: 'SO OUR FOCUS IS TO',
  focusHeading: 'Five commitments on every visit.',
  focusBody:
    'The aim is not a one-off clean. It is the right oil, under control, with less wear and a longer service life — without taking a risk on the machine.',
  focusImageUrl: '/images/services-commitments.png',
  focusImageAlt: 'Oil sight glass on industrial equipment',
  commitments: [
    {
      n: '01',
      title: 'Optimum oil',
      body: 'Make sure the oil you are using is the optimum available for the job.',
    },
    {
      n: '02',
      title: 'Identify contamination',
      body: 'Identify the contamination which is affecting your oil.',
    },
    {
      n: '03',
      title: 'Control the ingress',
      body: 'Investigate and advise methods for contamination control.',
    },
    {
      n: '04',
      title: 'Reduce wear',
      body: 'Reduce the wear in your machinery.',
    },
    {
      n: '05',
      title: 'Extend oil life',
      body: 'Extend oil life without any risk.',
    },
  ],
};

export const DEFAULT_SERVICES_VISIT = {
  eyebrow: 'A VISIT ON THE FLOOR',
  heading: 'Arrive. Read the oil. Leave it in spec.',
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

export const DEFAULT_SERVICES_INDUSTRIES = {
  kicker: 'COMPANIES SERVED — OIL MANAGEMENT',
  heading: 'The same oil-management logic, across the plant types we already know.',
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

export const DEFAULT_SERVICES_CTA = {
  eyebrow: 'NEXT STEP',
  heading: 'Ready to save money and\nextend equipment life?',
  subtext:
    'Contact us for an estimate. For sustained reliability and predictable cost control, ask about a Kleenoil oil management contract.',
  ctas: [
    {
      label: 'Request an Estimate',
      href: '/contact',
      appearance: 'primary' as const,
    },
    {
      label: 'View AMC',
      href: '/amc',
      appearance: 'secondary' as const,
    },
  ],
};
