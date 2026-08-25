import { getMediaAlt, getMediaUrl } from '@/lib/cms/links';
import { getPayloadClient } from '@/lib/payload';
import {
  DEFAULT_FOOTER_COLUMNS,
  DEFAULT_LEGAL_LINKS,
  DEFAULT_MAIN_NAV,
  DEFAULT_SITE,
  DEFAULT_UTILITY_NAV,
  type FooterColumn,
  type NavLink,
} from '@/lib/cms/defaults';
import { mapMainNavItems, mapNavLinks, type NavItem } from '@/lib/cms/nav';
import type { Footer, Media, Navigation, SiteSetting } from '@/payload-types';

export type SiteLogoImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  mimeType?: string | null;
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

export async function getSiteChrome(): Promise<SiteChrome> {
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

    return {
      site: {
        companyName: settings?.companyName || DEFAULT_SITE.companyName,
        companyTagline: settings?.companyTagline || DEFAULT_SITE.companyTagline,
        footerTagline: DEFAULT_SITE.footerTagline,
        copyright: footerData?.bottomBar?.copyrightText || DEFAULT_SITE.copyright,
        logo: toSiteLogo(settings?.logo, settings?.companyName || DEFAULT_SITE.companyName),
        logoMark: toSiteLogo(settings?.logoMark, settings?.companyName || DEFAULT_SITE.companyName),
      },
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
    console.error('[cms] getSiteChrome failed', error);
    return {
      site: FALLBACK_SITE,
      mainNav: DEFAULT_MAIN_NAV,
      mobileNav: DEFAULT_MAIN_NAV,
      utilityNav: DEFAULT_UTILITY_NAV,
      footerColumns: DEFAULT_FOOTER_COLUMNS,
      legalLinks: DEFAULT_LEGAL_LINKS,
      enableSearch: true,
    };
  }
}
