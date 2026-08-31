import type { NavLink } from '@/lib/cms/defaults';

export type MegaProductCard = {
  id: number;
  title: string;
  href: string;
  imageUrl: string | null;
  hoverImageUrl: string | null;
};

export type MegaColumnItem = {
  label: string;
  href: string;
  description?: string;
  imageUrl?: string | null;
  imageAlt?: string;
};

export type MegaColumn = {
  heading?: string;
  layout: 'product-tiles' | 'text-list' | 'image-list' | 'profile';
  products: MegaProductCard[];
  items: MegaColumnItem[];
  profile?: {
    title?: string;
    copy?: string;
    imageUrl?: string | null;
    imageAlt?: string;
  };
  cta?: { label: string; href: string } | null;
};

export type MegaPointer = {
  value: string;
  label: string;
};

export type MegaIntro = {
  heading?: string;
  description?: string;
  pointers: MegaPointer[];
};

export type MegaNode = {
  label: string;
  href: string;
  children: MegaNode[];
};

export type NavItem = NavLink & {
  enableMegaMenu?: boolean;
  productsPerRow?: number | null;
  children?: NavLink[];
  products?: MegaProductCard[];
  megaColumns?: MegaColumn[];
  megaIntro?: MegaIntro;
  megaTree?: MegaNode[];
};

export function hasMegaMenu(item: NavItem): boolean {
  return Boolean(
    item.enableMegaMenu &&
    (item.megaTree?.length || item.megaColumns?.length || item.products?.length),
  );
}

export function hasDropdown(item: NavItem): boolean {
  return !hasMegaMenu(item) && Boolean(item.children?.length);
}

function flattenMegaNodes(nodes: MegaNode[] | undefined): NavLink[] {
  if (!nodes?.length) {
    return [];
  }

  return nodes.flatMap((node) => {
    const self = node.href ? [{ label: node.label, href: node.href }] : [];
    return [...self, ...flattenMegaNodes(node.children)];
  });
}

export function getMobileSubLinks(item: NavItem): NavLink[] {
  if (hasMegaMenu(item) && item.megaTree?.length) {
    return flattenMegaNodes(item.megaTree);
  }

  if (hasMegaMenu(item) && item.megaColumns?.length) {
    return item.megaColumns.flatMap((column) => {
      if (column.layout === 'product-tiles') {
        return column.products.map((product) => ({
          label: product.title,
          href: product.href,
        }));
      }

      const links: NavLink[] = column.items
        .filter((entry) => entry.href)
        .map((entry) => ({ label: entry.label, href: entry.href }));

      if (column.cta?.href) {
        links.push({ label: column.cta.label, href: column.cta.href });
      }

      return links;
    });
  }

  if (hasMegaMenu(item) && item.products?.length) {
    return item.products.map((product) => ({
      label: product.title,
      href: product.href,
    }));
  }

  return item.children ?? [];
}
