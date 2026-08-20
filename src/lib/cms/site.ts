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
import type { Footer, Navigation, SiteSetting } from '@/payload-types';

export type SiteChrome = {
  site: {
    companyName: string;
    companyTagline: string;
    footerTagline: string;
    copyright: string;
  };
  mainNav: NavItem[];
  mobileNav: NavItem[];
  utilityNav: NavLink[];
  footerColumns: FooterColumn[];
  legalLinks: NavLink[];
  enableSearch: boolean;
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
      site: DEFAULT_SITE,
      mainNav: DEFAULT_MAIN_NAV,
      mobileNav: DEFAULT_MAIN_NAV,
      utilityNav: DEFAULT_UTILITY_NAV,
      footerColumns: DEFAULT_FOOTER_COLUMNS,
      legalLinks: DEFAULT_LEGAL_LINKS,
      enableSearch: true,
    };
  }
}
