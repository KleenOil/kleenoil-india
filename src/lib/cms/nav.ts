import type { NavLink } from '@/lib/cms/defaults';
import { getMediaUrl, resolveLink } from '@/lib/cms/links';
import type { MegaProductCard, NavItem } from '@/lib/cms/nav-types';
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
    const products = enableMegaMenu
      ? (item.megaProducts ?? [])
          .map((row) => {
            const productId =
              typeof row.product === 'object' && row.product ? row.product.id : row.product;
            return typeof productId === 'number' ? cardsByProductId.get(productId) : null;
          })
          .filter((card): card is MegaProductCard => Boolean(card))
      : [];

    const children =
      !enableMegaMenu && item.children?.length
        ? item.children
            .map((child) => mapNavLink(child))
            .filter((child): child is NavLink => Boolean(child))
        : [];

    mapped.push({
      ...link,
      enableMegaMenu: enableMegaMenu && products.length > 0,
      productsPerRow: normalizeProductsPerRow(item.productsPerRow),
      children,
      products,
    });
  }

  return mapped;
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
          ? (item.megaProducts ?? [])
              .map((row) =>
                typeof row.product === 'object' && row.product ? row.product.id : row.product,
              )
              .filter((id): id is number => typeof id === 'number')
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
      depth: 2,
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
            depth: 2,
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
    { gallery?: (number | Media)[] | null } | undefined;

  for (const media of hero?.gallery ?? []) {
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
