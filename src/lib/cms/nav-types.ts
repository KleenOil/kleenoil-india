import type { NavLink } from '@/lib/cms/defaults';

export type MegaProductCard = {
  id: number;
  title: string;
  href: string;
  imageUrl: string | null;
  hoverImageUrl: string | null;
};

export type NavItem = NavLink & {
  enableMegaMenu?: boolean;
  productsPerRow?: number | null;
  children?: NavLink[];
  products?: MegaProductCard[];
};

export function hasMegaMenu(item: NavItem): boolean {
  return Boolean(item.enableMegaMenu && item.products?.length);
}

export function hasDropdown(item: NavItem): boolean {
  return !hasMegaMenu(item) && Boolean(item.children?.length);
}

export function getMobileSubLinks(item: NavItem): NavLink[] {
  if (hasMegaMenu(item) && item.products?.length) {
    return item.products.map((product) => ({
      label: product.title,
      href: product.href,
    }));
  }

  return item.children ?? [];
}
