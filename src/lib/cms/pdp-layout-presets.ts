import {
  DEFAULT_PDP_CONTAMINATION,
  DEFAULT_PDP_CTA,
  DEFAULT_PDP_HERO,
  DEFAULT_PDP_HOW_IT_WORKS,
  DEFAULT_PDP_MACHINES,
  DEFAULT_PDP_MODELS,
  DEFAULT_PDP_RELATED,
  DEFAULT_PDP_RESULTS,
} from '@/lib/cms/pdp-defaults';

type Appearance = 'primary' | 'secondary' | 'ghost';

export type PdpLayoutSeedBlock = {
  blockType: string;
  [key: string]: unknown;
};

function customLink(label: string, url: string, appearance?: Appearance) {
  return {
    link: {
      type: 'custom' as const,
      label,
      url,
      openInNewTab: false,
      ...(appearance ? { appearance } : {}),
    },
  };
}

/** Full default PDP template layout (Pencil “PDP — Combined”). */
export function getDefaultPdpTemplateLayout(): PdpLayoutSeedBlock[] {
  return [
    {
      blockType: 'pdp-hero',
      badge: DEFAULT_PDP_HERO.badge,
      eyebrow: DEFAULT_PDP_HERO.eyebrow,
      title: DEFAULT_PDP_HERO.title,
      summary: DEFAULT_PDP_HERO.summary,
      quickSpecs: DEFAULT_PDP_HERO.quickSpecs,
      ctas: DEFAULT_PDP_HERO.ctas.map((cta) => customLink(cta.label, cta.href, cta.appearance)),
    },
    {
      blockType: 'pdp-contamination',
      eyebrow: DEFAULT_PDP_CONTAMINATION.eyebrow,
      heading: DEFAULT_PDP_CONTAMINATION.heading,
      description: DEFAULT_PDP_CONTAMINATION.description,
      cards: DEFAULT_PDP_CONTAMINATION.cards,
    },
    {
      blockType: 'pdp-how-it-works',
      eyebrow: DEFAULT_PDP_HOW_IT_WORKS.eyebrow,
      heading: DEFAULT_PDP_HOW_IT_WORKS.heading,
      description: DEFAULT_PDP_HOW_IT_WORKS.description,
      steps: DEFAULT_PDP_HOW_IT_WORKS.steps,
    },
    {
      blockType: 'pdp-machines',
      eyebrow: DEFAULT_PDP_MACHINES.eyebrow,
      heading: DEFAULT_PDP_MACHINES.heading,
      description: DEFAULT_PDP_MACHINES.description,
      machines: DEFAULT_PDP_MACHINES.machines,
    },
    {
      blockType: 'pdp-models',
      eyebrow: DEFAULT_PDP_MODELS.eyebrow,
      heading: DEFAULT_PDP_MODELS.heading,
      description: DEFAULT_PDP_MODELS.description,
      columns: DEFAULT_PDP_MODELS.columns,
      models: DEFAULT_PDP_MODELS.models,
    },
    {
      blockType: 'pdp-results',
      eyebrow: DEFAULT_PDP_RESULTS.eyebrow,
      heading: DEFAULT_PDP_RESULTS.heading,
      description: DEFAULT_PDP_RESULTS.description,
      results: DEFAULT_PDP_RESULTS.results,
    },
    {
      blockType: 'pdp-related',
      eyebrow: DEFAULT_PDP_RELATED.eyebrow,
      heading: DEFAULT_PDP_RELATED.heading,
      description: DEFAULT_PDP_RELATED.description,
      cards: DEFAULT_PDP_RELATED.cards,
    },
    {
      blockType: 'pdp-cta',
      eyebrow: DEFAULT_PDP_CTA.eyebrow,
      heading: DEFAULT_PDP_CTA.heading,
      subtext: DEFAULT_PDP_CTA.subtext,
      ctas: DEFAULT_PDP_CTA.ctas.map((cta) => customLink(cta.label, cta.href, cta.appearance)),
      trustBadges: DEFAULT_PDP_CTA.trustBadges,
    },
  ];
}
