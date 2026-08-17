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
import { resolveLink } from '@/lib/cms/links';
import type { Footer, Navigation, SiteSetting } from '@/payload-types';

function mapNavItems(
  items: Navigation['mainMenu'] | Navigation['utilityMenu'] | null | undefined,
): NavLink[] {
  if (!items?.length) {
    return [];
  }

  return items
    .map((item) => {
      const resolved = resolveLink({
        type: item.type,
        label: item.label,
        url: item.url,
        page: item.page,
        openInNewTab: item.openInNewTab,
      });

      if (!resolved) {
        return null;
      }

      return { label: resolved.label, href: resolved.href };
    })
    .filter((item): item is NavLink => Boolean(item));
}

export type SiteChrome = {
  site: {
    companyName: string;
    companyTagline: string;
    footerTagline: string;
    copyright: string;
  };
  mainNav: NavLink[];
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

    const mainNav = mapNavItems(nav?.mainMenu);
    const utilityNav = mapNavItems(nav?.utilityMenu);

    const footerColumns: FooterColumn[] =
      footerData?.columns
        ?.map((column) => ({
          title: column.title,
          links: mapNavItems(column.links),
        }))
        .filter((column) => column.links.length > 0) ?? [];

    const legalLinks = mapNavItems(footerData?.bottomBar?.legalLinks);

    return {
      site: {
        companyName: settings?.companyName || DEFAULT_SITE.companyName,
        companyTagline: settings?.companyTagline || DEFAULT_SITE.companyTagline,
        footerTagline: DEFAULT_SITE.footerTagline,
        copyright: footerData?.bottomBar?.copyrightText || DEFAULT_SITE.copyright,
      },
      mainNav: mainNav.length ? mainNav : DEFAULT_MAIN_NAV,
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
      utilityNav: DEFAULT_UTILITY_NAV,
      footerColumns: DEFAULT_FOOTER_COLUMNS,
      legalLinks: DEFAULT_LEGAL_LINKS,
      enableSearch: true,
    };
  }
}
