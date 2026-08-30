import type { NavLink } from '@/lib/cms/defaults';
import { getMediaAlt, getMediaUrl, resolveLink } from '@/lib/cms/links';
import type { MegaColumn, MegaColumnItem, MegaProductCard, NavItem } from '@/lib/cms/nav-types';
import { getPayloadClient } from '@/lib/payload';
import { resolvePdpLayout, type PdpLayoutBlock } from '@/lib/cms/resolve-pdp-layout';
import type { Media, Navigation, Product, ProductTemplate } from '@/payload-types';

export type { MegaProductCard, NavItem } from '@/lib/cms/nav-types';

type CmsNavItem = NonNullable<Navigation['mainMenu']>[number];

type CmsNavRow = {
  label: string;
  type: 'page' | 'custom';
  page?: CmsNavItem['page'];
  url?: string | null;
  openInNewTab?: boolean | null;
  enableMegaMenu?: boolean | null;
  megaProducts?: CmsNavItem['megaProducts'];
  megaColumns?: CmsNavItem['megaColumns'];
  productsPerRow?: number | null;
  children?: CmsNavItem['children'];
};

export function mapNavLinks(
  items: Navigation['mainMenu'] | Navigation['utilityMenu'] | null | undefined,
): NavLink[] {
  if (!items?.length) {
    return [];
  }

  return items.map((item) => mapNavLink(item)).filter((item): item is NavLink => Boolean(item));
}

function mapNavLink(
  item: Pick<CmsNavRow, 'label' | 'type' | 'url' | 'page' | 'openInNewTab'> | null | undefined,
): NavLink | null {
  if (!item) {
    return null;
  }

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

  return {
    label: resolved.label,
    href: resolved.href,
    openInNewTab: resolved.openInNewTab,
  };
}

export async function mapMainNavItems(items: CmsNavRow[] | null | undefined): Promise<NavItem[]> {
  if (!items?.length) {
    return [];
  }

  const cardsByProductId = await loadMegaProductCards(items);
  const mapped: NavItem[] = [];

  for (const item of items) {
    const link = mapNavLink(item);
    if (!link) {
      continue;
    }

    const enableMegaMenu = Boolean(item.enableMegaMenu);
    const products = enableMegaMenu ? mapProductRows(item.megaProducts, cardsByProductId) : [];
    const megaColumns = enableMegaMenu
      ? mapMegaColumns(item.megaColumns, cardsByProductId, products)
      : [];

    const children =
      !enableMegaMenu && item.children?.length
        ? item.children
            .map((child) => mapNavLink(child))
            .filter((child): child is NavLink => Boolean(child))
        : [];

    mapped.push({
      ...link,
      enableMegaMenu: enableMegaMenu && (megaColumns.length > 0 || products.length > 0),
      productsPerRow: normalizeProductsPerRow(item.productsPerRow),
      children,
      products,
      megaColumns,
    });
  }

  return mapped;
}

type CmsProductRow = { product?: number | Product | null } | null | undefined;

function productIdFromRow(row: CmsProductRow): number | null {
  if (!row?.product) {
    return null;
  }

  return typeof row.product === 'object' ? row.product.id : row.product;
}

function productIdsFromRows(rows: CmsProductRow[] | null | undefined): number[] {
  return (rows ?? [])
    .map((row) => productIdFromRow(row))
    .filter((id): id is number => typeof id === 'number');
}

function mapProductRows(
  rows: CmsProductRow[] | null | undefined,
  cardsByProductId: Map<number, MegaProductCard>,
): MegaProductCard[] {
  return (rows ?? [])
    .map((row) => {
      const id = productIdFromRow(row);
      return typeof id === 'number' ? cardsByProductId.get(id) : null;
    })
    .filter((card): card is MegaProductCard => Boolean(card));
}

function mapMegaColumns(
  columns: CmsNavItem['megaColumns'],
  cardsByProductId: Map<number, MegaProductCard>,
  fallbackProducts: MegaProductCard[],
): MegaColumn[] {
  const mapped: MegaColumn[] = [];

  for (const column of columns ?? []) {
    const layout = column.layout ?? 'text-list';
    const products = mapProductRows(column.products, cardsByProductId);
    const items: MegaColumnItem[] = [];

    for (const item of column.items ?? []) {
      const resolved = resolveLink({
        type: item.type ?? 'custom',
        label: item.label,
        url: item.url,
        page: item.page,
      });
      if (!resolved && !item.label) {
        continue;
      }

      items.push({
        label: resolved?.label || item.label,
        href: resolved?.href ?? '',
        description: item.description ?? undefined,
        imageUrl: getMediaUrl(item.image),
        imageAlt: getMediaAlt(item.image, item.label),
      });
    }

    const hasContent =
      products.length > 0 ||
      items.length > 0 ||
      Boolean(column.profileTitle || column.profileCopy || getMediaUrl(column.profileImage));

    if (!hasContent) {
      continue;
    }

    mapped.push({
      heading: column.heading ?? undefined,
      layout,
      products,
      items,
      profile:
        layout === 'profile'
          ? {
              title: column.profileTitle ?? undefined,
              copy: column.profileCopy ?? undefined,
              imageUrl: getMediaUrl(column.profileImage),
              imageAlt: getMediaAlt(column.profileImage, column.profileTitle ?? 'Company profile'),
            }
          : undefined,
      cta:
        column.ctaLabel && column.ctaUrl ? { label: column.ctaLabel, href: column.ctaUrl } : null,
    });
  }

  if (mapped.length) {
    return mapped;
  }

  if (fallbackProducts.length) {
    return [
      {
        heading: 'Products',
        layout: 'product-tiles',
        products: fallbackProducts,
        items: [],
        cta: null,
      },
    ];
  }

  return [];
}

function normalizeProductsPerRow(value: unknown): number | null {
  const numeric = typeof value === 'string' ? Number(value) : value;
  if (typeof numeric !== 'number' || !Number.isFinite(numeric) || numeric < 1) {
    return null;
  }

  return Math.min(12, Math.round(numeric));
}

async function loadMegaProductCards(items: CmsNavRow[]): Promise<Map<number, MegaProductCard>> {
  const ids = [
    ...new Set(
      items.flatMap((item) =>
        item.enableMegaMenu
          ? [
              ...productIdsFromRows(item.megaProducts),
              ...(item.megaColumns ?? []).flatMap((column) => productIdsFromRows(column.products)),
            ]
          : [],
      ),
    ),
  ];

  if (!ids.length) {
    return new Map();
  }

  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'products',
      where: { id: { in: ids } },
      depth: 3,
      limit: ids.length,
      pagination: false,
    });

    const products = result.docs as Product[];
    const templateIds = [
      ...new Set(
        products
          .map((product) => {
            const template = product.template;
            return typeof template === 'object' && template ? template.id : template;
          })
          .filter((id): id is number => typeof id === 'number'),
      ),
    ];

    const templates = await Promise.all(
      templateIds.map(async (id) => {
        try {
          return (await payload.findByID({
            collection: 'product-templates',
            id,
            depth: 3,
          })) as ProductTemplate;
        } catch {
          return null;
        }
      }),
    );

    const templatesById = new Map(
      templates
        .filter((template): template is ProductTemplate => Boolean(template))
        .map((template) => [template.id, template]),
    );

    const cards = new Map<number, MegaProductCard>();

    for (const product of products) {
      const templateRef = product.template;
      const templateId =
        typeof templateRef === 'object' && templateRef ? templateRef.id : templateRef;
      const layout = resolvePdpLayout(
        product,
        typeof templateId === 'number' ? templatesById.get(templateId) : null,
      );
      const [imageUrl, hoverImageUrl] = firstTwoProductImages(product, layout);

      cards.set(product.id, {
        id: product.id,
        title: product.name,
        href: `/products/${product.slug}`,
        imageUrl,
        hoverImageUrl: hoverImageUrl && hoverImageUrl !== imageUrl ? hoverImageUrl : null,
      });
    }

    return cards;
  } catch (error) {
    console.error('[cms] loadMegaProductCards failed', error);
    return new Map();
  }
}

function firstTwoProductImages(
  product: Product,
  layout: PdpLayoutBlock[],
): [string | null, string | null] {
  const urls: string[] = [];
  const featured = getMediaUrl(product.featuredImage);
  if (featured) {
    urls.push(featured);
  }

  const hero = layout.find((block) => block.blockType === 'pdp-hero') as
    | {
        gallery?: (number | Media)[] | null;
        enableVariants?: boolean | null;
        variants?: { isDefault?: boolean | null; gallery?: (number | Media)[] | null }[] | null;
      }
    | undefined;

  const defaultVariant = hero?.enableVariants
    ? (hero.variants?.find((variant) => variant.isDefault) ?? hero.variants?.[0])
    : null;
  const gallery =
    defaultVariant?.gallery && defaultVariant.gallery.length > 0
      ? defaultVariant.gallery
      : (hero?.gallery ?? []);

  for (const media of gallery) {
    const url = getMediaUrl(media);
    if (url && !urls.includes(url)) {
      urls.push(url);
    }
    if (urls.length >= 2) {
      break;
    }
  }

  return [urls[0] ?? null, urls[1] ?? null];
}
