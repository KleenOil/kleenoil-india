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
  DEFAULT_ARTICLES_FEATURED,
  DEFAULT_ARTICLES_HERO,
  DEFAULT_ARTICLES_INDEX,
  DEFAULT_CAREERS_HERO,
  DEFAULT_CAREERS_INDEX,
  DEFAULT_CS_CTA,
  DEFAULT_CS_FEATURED,
  DEFAULT_CS_HERO,
  DEFAULT_CS_INDEX,
  DEFAULT_CONTACT_CHANNELS,
  DEFAULT_CONTACT_HERO,
  DEFAULT_CONTACT_PROCESS,
  DEFAULT_TEAM,
  DEFAULT_TESTIMONIALS,
  DEFAULT_TRUST_INDICATORS,
  DEFAULT_WHATS_NEW,
} from '@/lib/cms/defaults';
import {
  DEFAULT_SUSTAINABILITY_APPLICATIONS,
  DEFAULT_SUSTAINABILITY_CIRCULAR,
  DEFAULT_SUSTAINABILITY_CTA,
  DEFAULT_SUSTAINABILITY_DROP,
  DEFAULT_SUSTAINABILITY_HERO,
  DEFAULT_SUSTAINABILITY_IMPACT,
  DEFAULT_SUSTAINABILITY_NUMBERS,
} from '@/lib/cms/sustainability';

type Appearance = 'primary' | 'secondary' | 'ghost';

export type LayoutBlock = {
  blockType: string;
  [key: string]: unknown;
};

/** Labels shown in the CMS multi-add picker (About-first order, then other homepage blocks). */
export const PAGE_BLOCK_OPTIONS = [
  { slug: 'hero', label: 'Hero' },
  { slug: 'articles-hero', label: 'Articles Hero' },
  { slug: 'articles-featured', label: 'Articles Featured' },
  { slug: 'articles-index', label: 'Articles Index' },
  { slug: 'careers-hero', label: 'Careers Hero' },
  { slug: 'careers-index', label: 'Careers Index' },
  { slug: 'cs-hero', label: 'CS Banner' },
  { slug: 'cs-featured', label: 'CS Featured' },
  { slug: 'cs-index', label: 'CS Index' },
  { slug: 'cs-cta', label: 'CS CTA' },
  { slug: 'contact-hero', label: 'Contact Hero' },
  { slug: 'contact-process', label: 'Contact Process' },
  { slug: 'contact-channels', label: 'Contact Channels' },
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
  { slug: 'sustainability-hero', label: 'Sustainability Hero' },
  { slug: 'sustainability-impact', label: 'Sustainability Impact' },
  { slug: 'sustainability-circular', label: 'Sustainability Circular' },
  { slug: 'sustainability-drop', label: 'Sustainability Drop' },
  { slug: 'sustainability-numbers', label: 'Sustainability Numbers' },
  { slug: 'sustainability-applications', label: 'Sustainability Applications' },
  { slug: 'sustainability-cta', label: 'Sustainability CTA' },
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
  'articles-hero': () => ({
    blockType: 'articles-hero',
    eyebrow: DEFAULT_ARTICLES_HERO.eyebrow,
    heading: DEFAULT_ARTICLES_HERO.heading,
    subheadline: DEFAULT_ARTICLES_HERO.subheadline,
    cta: customLink(
      DEFAULT_ARTICLES_HERO.cta.label,
      DEFAULT_ARTICLES_HERO.cta.href,
      DEFAULT_ARTICLES_HERO.cta.appearance,
    ).link,
  }),
  'articles-featured': () => ({
    blockType: 'articles-featured',
    eyebrow: DEFAULT_ARTICLES_FEATURED.eyebrow,
    heading: DEFAULT_ARTICLES_FEATURED.heading,
    description: DEFAULT_ARTICLES_FEATURED.description,
  }),
  'articles-index': () => ({
    blockType: 'articles-index',
    eyebrow: DEFAULT_ARTICLES_INDEX.eyebrow,
    heading: DEFAULT_ARTICLES_INDEX.heading,
    description: DEFAULT_ARTICLES_INDEX.description,
    hiddenPosts: [],
  }),
  'careers-hero': () => ({
    blockType: 'careers-hero',
    eyebrow: DEFAULT_CAREERS_HERO.eyebrow,
    heading: DEFAULT_CAREERS_HERO.heading,
    subheadline: DEFAULT_CAREERS_HERO.subheadline,
    cities: DEFAULT_CAREERS_HERO.cities,
  }),
  'careers-index': () => ({
    blockType: 'careers-index',
    eyebrow: DEFAULT_CAREERS_INDEX.eyebrow,
    heading: DEFAULT_CAREERS_INDEX.heading,
    hiddenJobs: [],
  }),
  'cs-hero': () => ({
    blockType: 'cs-hero',
    eyebrow: DEFAULT_CS_HERO.eyebrow,
    heading: DEFAULT_CS_HERO.heading,
    subheadline: DEFAULT_CS_HERO.subheadline,
    watermark: DEFAULT_CS_HERO.watermark,
    cta: customLink(
      DEFAULT_CS_HERO.cta.label,
      DEFAULT_CS_HERO.cta.href,
      DEFAULT_CS_HERO.cta.appearance,
    ).link,
    stats: DEFAULT_CS_HERO.stats,
  }),
  'cs-featured': () => ({
    blockType: 'cs-featured',
    eyebrow: DEFAULT_CS_FEATURED.eyebrow,
    heading: DEFAULT_CS_FEATURED.heading,
    description: DEFAULT_CS_FEATURED.description,
  }),
  'cs-index': () => ({
    blockType: 'cs-index',
    eyebrow: DEFAULT_CS_INDEX.eyebrow,
    heading: DEFAULT_CS_INDEX.heading,
    hiddenStudies: [],
  }),
  'cs-cta': () => ({
    blockType: 'cs-cta',
    eyebrow: DEFAULT_CS_CTA.eyebrow,
    heading: DEFAULT_CS_CTA.heading,
    subtext: DEFAULT_CS_CTA.subtext,
    ctas: DEFAULT_CS_CTA.ctas.map((cta) => customLink(cta.label, cta.href, cta.appearance)),
  }),
  'contact-hero': () => ({
    blockType: 'contact-hero',
    eyebrow: DEFAULT_CONTACT_HERO.eyebrow,
    heading: DEFAULT_CONTACT_HERO.heading,
    subheadline: DEFAULT_CONTACT_HERO.subheadline,
    phoneLabel: DEFAULT_CONTACT_HERO.phoneLabel,
    phoneNumber: DEFAULT_CONTACT_HERO.phoneNumber,
    benefits: DEFAULT_CONTACT_HERO.benefits.map((label) => ({ label })),
    formTitle: DEFAULT_CONTACT_HERO.formTitle,
    formLead: DEFAULT_CONTACT_HERO.formLead,
    questions: DEFAULT_CONTACT_HERO.questions,
    submitLabel: DEFAULT_CONTACT_HERO.submitLabel,
    finePrint: DEFAULT_CONTACT_HERO.finePrint,
  }),
  'contact-process': () => ({
    blockType: 'contact-process',
    eyebrow: DEFAULT_CONTACT_PROCESS.eyebrow,
    heading: DEFAULT_CONTACT_PROCESS.heading,
    steps: DEFAULT_CONTACT_PROCESS.steps,
  }),
  'contact-channels': () => ({
    blockType: 'contact-channels',
    eyebrow: DEFAULT_CONTACT_CHANNELS.eyebrow,
    heading: DEFAULT_CONTACT_CHANNELS.heading,
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
    headingAlign: DEFAULT_TRUST_INDICATORS.headingAlign,
    logos: [],
  }),
  team: () => ({
    blockType: 'team',
    eyebrow: DEFAULT_TEAM.eyebrow,
    heading: DEFAULT_TEAM.heading,
    description: DEFAULT_TEAM.description,
    members: DEFAULT_TEAM.members.map(({ name, role }) => ({ name, role })),
    showExtraMembers: true,
    extraHeading: DEFAULT_TEAM.extraHeading,
    extraMembers: DEFAULT_TEAM.extraMembers.map(({ name, role }) => ({ name, role })),
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
    showMap: true,
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
  'sustainability-hero': () => ({
    blockType: 'sustainability-hero',
    eyebrow: DEFAULT_SUSTAINABILITY_HERO.eyebrow,
    heading: DEFAULT_SUSTAINABILITY_HERO.heading,
    lead: DEFAULT_SUSTAINABILITY_HERO.lead,
    body: DEFAULT_SUSTAINABILITY_HERO.body,
    ctas: [customLink(DEFAULT_SUSTAINABILITY_HERO.cta.label, DEFAULT_SUSTAINABILITY_HERO.cta.href)],
    pills: DEFAULT_SUSTAINABILITY_HERO.pills,
  }),
  'sustainability-impact': () => ({
    blockType: 'sustainability-impact',
    eyebrow: DEFAULT_SUSTAINABILITY_IMPACT.eyebrow,
    heading: DEFAULT_SUSTAINABILITY_IMPACT.heading,
    description: DEFAULT_SUSTAINABILITY_IMPACT.lead,
    cards: DEFAULT_SUSTAINABILITY_IMPACT.cards.map(({ title, body }) => ({ title, body })),
  }),
  'sustainability-circular': () => ({
    blockType: 'sustainability-circular',
    eyebrow: DEFAULT_SUSTAINABILITY_CIRCULAR.eyebrow,
    heading: DEFAULT_SUSTAINABILITY_CIRCULAR.heading,
    description: DEFAULT_SUSTAINABILITY_CIRCULAR.lead,
    steps: DEFAULT_SUSTAINABILITY_CIRCULAR.steps,
  }),
  'sustainability-drop': () => ({
    blockType: 'sustainability-drop',
    eyebrow: DEFAULT_SUSTAINABILITY_DROP.eyebrow,
    heading: DEFAULT_SUSTAINABILITY_DROP.heading,
    paragraphs: DEFAULT_SUSTAINABILITY_DROP.paragraphs.map((text) => ({ text })),
  }),
  'sustainability-numbers': () => ({
    blockType: 'sustainability-numbers',
    eyebrow: DEFAULT_SUSTAINABILITY_NUMBERS.eyebrow,
    heading: DEFAULT_SUSTAINABILITY_NUMBERS.heading,
    description: DEFAULT_SUSTAINABILITY_NUMBERS.lead,
    stats: DEFAULT_SUSTAINABILITY_NUMBERS.stats,
    disclaimer: DEFAULT_SUSTAINABILITY_NUMBERS.disclaimer,
  }),
  'sustainability-applications': () => ({
    blockType: 'sustainability-applications',
    eyebrow: DEFAULT_SUSTAINABILITY_APPLICATIONS.eyebrow,
    heading: DEFAULT_SUSTAINABILITY_APPLICATIONS.heading,
    description: DEFAULT_SUSTAINABILITY_APPLICATIONS.lead,
    cards: DEFAULT_SUSTAINABILITY_APPLICATIONS.cards.map(({ title, body }) => ({ title, body })),
  }),
  'sustainability-cta': () => ({
    blockType: 'sustainability-cta',
    eyebrow: DEFAULT_SUSTAINABILITY_CTA.eyebrow,
    heading: DEFAULT_SUSTAINABILITY_CTA.heading,
    subtext: DEFAULT_SUSTAINABILITY_CTA.subtext,
    ctas: [customLink(DEFAULT_SUSTAINABILITY_CTA.cta.label, DEFAULT_SUSTAINABILITY_CTA.cta.href)],
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
