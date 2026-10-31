import { cachedCmsQuery, CMS_CACHE_TAGS, dedupeCmsQuery } from '@/lib/cms/cache';
import { getMediaAlt, getMediaUrl } from '@/lib/cms/links';
import { getPayloadClient } from '@/lib/payload';
import {
  DEFAULT_FOOTER_COLUMNS,
  DEFAULT_LEGAL_LINKS,
  DEFAULT_MAIN_NAV,
  DEFAULT_PAGE_LOADER,
  DEFAULT_SITE,
  DEFAULT_UTILITY_NAV,
  type FooterColumn,
  type NavLink,
} from '@/lib/cms/defaults';
import { mapMainNavItems, mapNavLinks, type NavItem } from '@/lib/cms/nav';
import { logCmsFailure } from '@/lib/cms/unavailable';
import type { Footer, Media, Navigation, SiteSetting } from '@/payload-types';

export type SiteLogoImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  mimeType?: string | null;
};

export type SiteLoader = {
  enabled: boolean;
  showOnFirstLoad: boolean;
  brandName: string;
  statusText: string;
  systemCode: string;
  systemCodeMobile: string;
  versionLabel: string;
  cornerBrand: string;
  cornerBrandMobile: string;
  tagline: string;
  taglineMobile: string;
  minDurationMs: number;
};

export type SiteChrome = {
  site: {
    companyName: string;
    companyTagline: string;
    footerTagline: string;
    copyright: string;
    logo: SiteLogoImage | null;
    logoMark: SiteLogoImage | null;
  };
  loader: SiteLoader;
  mainNav: NavItem[];
  mobileNav: NavItem[];
  utilityNav: NavLink[];
  footerColumns: FooterColumn[];
  legalLinks: NavLink[];
  enableSearch: boolean;
};

function toSiteLogo(
  media: number | Media | null | undefined,
  fallbackAlt: string,
): SiteLogoImage | null {
  const src = getMediaUrl(media);
  if (!src || !media || typeof media === 'number') {
    return null;
  }

  return {
    src,
    alt: getMediaAlt(media, fallbackAlt),
    width: Math.max(1, media.width ?? 240),
    height: Math.max(1, media.height ?? 48),
    mimeType: media.mimeType,
  };
}

const FALLBACK_SITE: SiteChrome['site'] = {
  ...DEFAULT_SITE,
  logo: null,
  logoMark: null,
};

function textOrDefault(value: string | null | undefined, fallback: string): string {
  const trimmed = typeof value === 'string' ? value.trim() : '';
  return trimmed || fallback;
}

function mapLoader(settings: SiteSetting | null): SiteLoader {
  const loader = settings?.loader;
  const duration = Number(loader?.minDurationMs);
  const hasDuration = loader?.minDurationMs != null && Number.isFinite(duration) && duration > 0;

  return {
    enabled: loader?.enabled !== false,
    showOnFirstLoad: Boolean(loader?.showOnFirstLoad),
    brandName: textOrDefault(loader?.brandName, DEFAULT_PAGE_LOADER.brandName),
    statusText: textOrDefault(loader?.statusText, DEFAULT_PAGE_LOADER.statusText),
    systemCode: textOrDefault(loader?.systemCode, DEFAULT_PAGE_LOADER.systemCode),
    systemCodeMobile: textOrDefault(loader?.systemCodeMobile, DEFAULT_PAGE_LOADER.systemCodeMobile),
    versionLabel: textOrDefault(loader?.versionLabel, DEFAULT_PAGE_LOADER.versionLabel),
    cornerBrand: textOrDefault(loader?.cornerBrand, DEFAULT_PAGE_LOADER.cornerBrand),
    cornerBrandMobile: textOrDefault(
      loader?.cornerBrandMobile,
      DEFAULT_PAGE_LOADER.cornerBrandMobile,
    ),
    tagline: textOrDefault(loader?.tagline, DEFAULT_PAGE_LOADER.tagline),
    taglineMobile: textOrDefault(loader?.taglineMobile, DEFAULT_PAGE_LOADER.taglineMobile),
    minDurationMs: hasDuration
      ? Math.min(2000, Math.max(400, duration))
      : DEFAULT_PAGE_LOADER.minDurationMs,
  };
}

async function loadSiteChrome(): Promise<SiteChrome> {
  try {
    const payload = await getPayloadClient();

    const [siteSettings, navigation, footer] = await Promise.all([
      payload.findGlobal({ slug: 'site-settings', depth: 1 }).catch(() => null),
      payload.findGlobal({ slug: 'navigation', depth: 1 }).catch(() => null),
      payload.findGlobal({ slug: 'footer', depth: 1 }).catch(() => null),
    ]);

    const settings = siteSettings as SiteSetting | null;
    const nav = navigation as Navigation | null;
    const footerData = footer as Footer | null;

    const mainNav = await mapMainNavItems(nav?.mainMenu);
    const mobileOverride = await mapMainNavItems(nav?.mobileMenu);
    const utilityNav = mapNavLinks(nav?.utilityMenu);

    const footerColumns: FooterColumn[] =
      footerData?.columns
        ?.map((column) => ({
          title: column.title,
          links: mapNavLinks(column.links),
        }))
        .filter((column) => column.links.length > 0) ?? [];

    const legalLinks = mapNavLinks(footerData?.bottomBar?.legalLinks);
    const companyName = settings?.companyName || DEFAULT_SITE.companyName;

    return {
      site: {
        companyName,
        companyTagline: settings?.companyTagline || DEFAULT_SITE.companyTagline,
        footerTagline: DEFAULT_SITE.footerTagline,
        copyright: footerData?.bottomBar?.copyrightText || DEFAULT_SITE.copyright,
        logo: toSiteLogo(settings?.logo, companyName),
        logoMark: toSiteLogo(settings?.logoMark, companyName),
      },
      loader: mapLoader(settings),
      mainNav: mainNav.length ? mainNav : DEFAULT_MAIN_NAV,
      mobileNav: mobileOverride.length
        ? mobileOverride
        : mainNav.length
          ? mainNav
          : DEFAULT_MAIN_NAV,
      utilityNav: utilityNav.length ? utilityNav : DEFAULT_UTILITY_NAV,
      footerColumns: footerColumns.length ? footerColumns : DEFAULT_FOOTER_COLUMNS,
      legalLinks: legalLinks.length ? legalLinks : DEFAULT_LEGAL_LINKS,
      enableSearch: settings?.features?.enableSearch ?? true,
    };
  } catch (error) {
    logCmsFailure('getSiteChrome', error);
    return {
      site: FALLBACK_SITE,
      loader: mapLoader(null),
      mainNav: DEFAULT_MAIN_NAV,
      mobileNav: DEFAULT_MAIN_NAV,
      utilityNav: DEFAULT_UTILITY_NAV,
      footerColumns: DEFAULT_FOOTER_COLUMNS,
      legalLinks: DEFAULT_LEGAL_LINKS,
      enableSearch: true,
    };
  }
}

const fetchSiteChrome = cachedCmsQuery(
  ['cms', 'site-chrome'],
  [CMS_CACHE_TAGS.siteChrome, CMS_CACHE_TAGS.globals],
  loadSiteChrome,
);

export const getSiteChrome = dedupeCmsQuery(async (): Promise<SiteChrome> => fetchSiteChrome());
