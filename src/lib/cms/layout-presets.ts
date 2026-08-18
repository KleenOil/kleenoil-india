import {
  DEFAULT_CTA,
  DEFAULT_CONTACT_PREVIEW,
  DEFAULT_ABOUT_ORIGIN,
  DEFAULT_DISTRIBUTION_NETWORK,
  DEFAULT_FAQ_ACCORDION,
  DEFAULT_FEATURED_CASE_STUDIES,
  DEFAULT_FEATURED_INDUSTRIES,
  DEFAULT_FEATURED_PRODUCTS,
  DEFAULT_FEATURED_SERVICES,
  DEFAULT_HERO,
  DEFAULT_MANIFESTO,
  DEFAULT_PROCESS_STORY,
  DEFAULT_STATISTICS,
  DEFAULT_ABOUT_STORY,
  DEFAULT_TEAM,
  DEFAULT_TESTIMONIALS,
  DEFAULT_TRUST_INDICATORS,
  DEFAULT_WHATS_NEW,
} from '@/lib/cms/defaults';

type Appearance = 'primary' | 'secondary' | 'ghost';

export type LayoutBlock = {
  blockType: string;
  [key: string]: unknown;
};

/** Labels shown in the CMS multi-add picker (About-first order, then other homepage blocks). */
export const PAGE_BLOCK_OPTIONS = [
  { slug: 'hero', label: 'Hero' },
  { slug: 'manifesto', label: 'Manifesto' },
  { slug: 'about-origin', label: 'About Origin' },
  { slug: 'about-story', label: 'About Story' },
  { slug: 'trust-indicators', label: 'Trust Indicators' },
  { slug: 'team', label: 'Team' },
  { slug: 'whats-new', label: 'Whats New' },
  { slug: 'distribution-network', label: 'Distribution Network' },
  { slug: 'faq-accordion', label: 'FAQ Accordion' },
  { slug: 'cta', label: 'CTA' },
  { slug: 'statistics', label: 'Statistics' },
  { slug: 'featured-products', label: 'Featured Products' },
  { slug: 'featured-industries', label: 'Featured Industries' },
  { slug: 'featured-services', label: 'Featured Services' },
  { slug: 'process-story', label: 'Process Story' },
  { slug: 'featured-case-studies', label: 'Featured Case Studies' },
  { slug: 'testimonials', label: 'Testimonials' },
  { slug: 'contact-preview', label: 'Contact Preview' },
  { slug: 'rich-content', label: 'Rich Content' },
] as const;

export type PageBlockSlug = (typeof PAGE_BLOCK_OPTIONS)[number]['slug'];

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

const BLOCK_SEEDS: Record<string, () => LayoutBlock> = {
  hero: () => ({
    blockType: 'hero',
    variant: 'panel',
    eyebrow: DEFAULT_HERO.eyebrow,
    headline: DEFAULT_HERO.headline,
    subheadline: DEFAULT_HERO.subheadline,
    ctas: DEFAULT_HERO.ctas.map((cta) => customLink(cta.label, cta.href, cta.appearance)),
    metaStats: DEFAULT_HERO.metaStats,
  }),
  manifesto: () => ({
    blockType: 'manifesto',
    quote: DEFAULT_MANIFESTO.quote,
    attribution: DEFAULT_MANIFESTO.attribution,
  }),
  'about-origin': () => ({
    blockType: 'about-origin',
    eyebrow: DEFAULT_ABOUT_ORIGIN.eyebrow,
    heading: DEFAULT_ABOUT_ORIGIN.heading,
    body: DEFAULT_ABOUT_ORIGIN.body,
    bodySecondary: DEFAULT_ABOUT_ORIGIN.bodySecondary,
    cta: customLink(
      DEFAULT_ABOUT_ORIGIN.cta.label,
      DEFAULT_ABOUT_ORIGIN.cta.href,
      DEFAULT_ABOUT_ORIGIN.cta.appearance,
    ).link,
    milestones: DEFAULT_ABOUT_ORIGIN.milestones,
  }),
  'about-story': () => ({
    blockType: 'about-story',
    eyebrow: DEFAULT_ABOUT_STORY.eyebrow,
    heading: DEFAULT_ABOUT_STORY.heading,
    description: DEFAULT_ABOUT_STORY.description,
    quote: DEFAULT_ABOUT_STORY.quote,
    quoteAuthor: DEFAULT_ABOUT_STORY.quoteAuthor,
    quoteRole: DEFAULT_ABOUT_STORY.quoteRole,
    timeline: DEFAULT_ABOUT_STORY.timeline,
  }),
  'trust-indicators': () => ({
    blockType: 'trust-indicators',
    heading: DEFAULT_TRUST_INDICATORS.heading,
    logos: [],
  }),
  team: () => ({
    blockType: 'team',
    eyebrow: DEFAULT_TEAM.eyebrow,
    heading: DEFAULT_TEAM.heading,
    description: DEFAULT_TEAM.description,
    members: DEFAULT_TEAM.members.map(({ name, role }) => ({ name, role })),
  }),
  'whats-new': () => ({
    blockType: 'whats-new',
    eyebrow: DEFAULT_WHATS_NEW.eyebrow,
    heading: DEFAULT_WHATS_NEW.heading,
    description: DEFAULT_WHATS_NEW.description,
    cards: DEFAULT_WHATS_NEW.cards.map((card) => ({
      badge: card.badge,
      title: card.title,
      description: card.description,
      link: {
        type: 'custom' as const,
        label: card.linkLabel,
        url: card.href,
        openInNewTab: false,
      },
    })),
  }),
  'distribution-network': () => ({
    blockType: 'distribution-network',
    eyebrow: DEFAULT_DISTRIBUTION_NETWORK.eyebrow,
    heading: DEFAULT_DISTRIBUTION_NETWORK.heading,
    description: DEFAULT_DISTRIBUTION_NETWORK.description,
    stats: DEFAULT_DISTRIBUTION_NETWORK.stats,
    regionalOffices: DEFAULT_DISTRIBUTION_NETWORK.regionalOffices,
    hq: { ...DEFAULT_DISTRIBUTION_NETWORK.hq },
  }),
  'faq-accordion': () => ({
    blockType: 'faq-accordion',
    eyebrow: DEFAULT_FAQ_ACCORDION.eyebrow,
    heading: DEFAULT_FAQ_ACCORDION.heading,
    description: DEFAULT_FAQ_ACCORDION.description,
    items: DEFAULT_FAQ_ACCORDION.items,
  }),
  cta: () => ({
    blockType: 'cta',
    eyebrow: DEFAULT_CTA.eyebrow,
    heading: DEFAULT_CTA.heading,
    subtext: DEFAULT_CTA.subtext,
    ctas: DEFAULT_CTA.ctas.map((cta) => customLink(cta.label, cta.href, cta.appearance)),
    trustBadges: DEFAULT_CTA.trustBadges,
  }),
  statistics: () => ({
    blockType: 'statistics',
    eyebrow: DEFAULT_STATISTICS.eyebrow,
    heading: DEFAULT_STATISTICS.heading,
    description: DEFAULT_STATISTICS.description,
    stats: DEFAULT_STATISTICS.stats,
  }),
  'featured-products': () => ({
    blockType: 'featured-products',
    eyebrow: DEFAULT_FEATURED_PRODUCTS.eyebrow,
    heading: DEFAULT_FEATURED_PRODUCTS.heading,
    description: DEFAULT_FEATURED_PRODUCTS.description,
    cta: customLink(
      DEFAULT_FEATURED_PRODUCTS.cta.label,
      DEFAULT_FEATURED_PRODUCTS.cta.href,
      DEFAULT_FEATURED_PRODUCTS.cta.appearance,
    ).link,
    cards: DEFAULT_FEATURED_PRODUCTS.products.map((product) => ({
      tag: product.tag,
      title: product.title,
      description: product.description,
      href: product.href,
    })),
    customEngineering: { ...DEFAULT_FEATURED_PRODUCTS.customEngineering },
  }),
  'featured-industries': () => ({
    blockType: 'featured-industries',
    eyebrow: DEFAULT_FEATURED_INDUSTRIES.eyebrow,
    heading: DEFAULT_FEATURED_INDUSTRIES.heading,
    description: DEFAULT_FEATURED_INDUSTRIES.description,
    cards: DEFAULT_FEATURED_INDUSTRIES.industries.map((industry) => ({
      tag: industry.tag,
      title: industry.title,
      description: industry.description,
      href: industry.href,
    })),
  }),
  'featured-services': () => ({
    blockType: 'featured-services',
    eyebrow: DEFAULT_FEATURED_SERVICES.eyebrow,
    heading: DEFAULT_FEATURED_SERVICES.heading,
    description: DEFAULT_FEATURED_SERVICES.description,
    cta: customLink(
      DEFAULT_FEATURED_SERVICES.cta.label,
      DEFAULT_FEATURED_SERVICES.cta.href,
      DEFAULT_FEATURED_SERVICES.cta.appearance,
    ).link,
    cards: DEFAULT_FEATURED_SERVICES.services.map((service) => ({
      tag: service.tag,
      title: service.title,
      description: service.description,
      href: service.href,
    })),
  }),
  'process-story': () => ({
    blockType: 'process-story',
    eyebrow: DEFAULT_PROCESS_STORY.eyebrow,
    heading: DEFAULT_PROCESS_STORY.heading,
    description: DEFAULT_PROCESS_STORY.description,
    steps: DEFAULT_PROCESS_STORY.steps.map((step) => ({
      year: step.stage,
      title: step.title,
      description: step.description,
      spec: step.spec,
    })),
  }),
  'featured-case-studies': () => ({
    blockType: 'featured-case-studies',
    eyebrow: DEFAULT_FEATURED_CASE_STUDIES.eyebrow,
    heading: DEFAULT_FEATURED_CASE_STUDIES.heading,
    description: DEFAULT_FEATURED_CASE_STUDIES.description,
    cta: customLink(
      DEFAULT_FEATURED_CASE_STUDIES.cta.label,
      DEFAULT_FEATURED_CASE_STUDIES.cta.href,
      DEFAULT_FEATURED_CASE_STUDIES.cta.appearance,
    ).link,
    cards: DEFAULT_FEATURED_CASE_STUDIES.caseStudies.map((item) => ({
      tag: item.tag,
      title: item.title,
      description: item.description,
      href: item.href,
      metrics: item.metrics,
    })),
  }),
  testimonials: () => ({
    blockType: 'testimonials',
    eyebrow: DEFAULT_TESTIMONIALS.eyebrow,
    heading: DEFAULT_TESTIMONIALS.heading,
    description: DEFAULT_TESTIMONIALS.description,
    items: DEFAULT_TESTIMONIALS.items,
  }),
  'contact-preview': () => ({
    blockType: 'contact-preview',
    eyebrow: DEFAULT_CONTACT_PREVIEW.eyebrow,
    heading: DEFAULT_CONTACT_PREVIEW.heading,
    description: DEFAULT_CONTACT_PREVIEW.description,
  }),
  'rich-content': () => ({
    blockType: 'rich-content',
    content: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            version: 1,
            children: [{ type: 'text', text: 'Add your content here.', version: 1 }],
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
  }),
};

/** Seed a single layout block so required CMS fields pass validation. */
export function getBlockSeed(slug: string): LayoutBlock {
  const factory = BLOCK_SEEDS[slug];
  if (factory) {
    return factory();
  }

  return { blockType: slug };
}

export function getBlockSeeds(slugs: string[]): LayoutBlock[] {
  return slugs.map((slug) => getBlockSeed(slug));
}
