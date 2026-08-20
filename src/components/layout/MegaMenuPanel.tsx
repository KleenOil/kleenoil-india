'use client';

import Image from 'next/image';
import type { CSSProperties } from 'react';

import { MaybeLink } from '@/components/ui/maybe-link';
import type { MegaProductCard } from '@/lib/cms/nav-types';
import { cn } from '@/lib/utils';

type MegaMenuPanelProps = {
  open: boolean;
  products: MegaProductCard[];
  productsPerRow?: number | null;
  labelledBy: string;
};

export function MegaMenuPanel({ open, products, productsPerRow, labelledBy }: MegaMenuPanelProps) {
  if (!products.length) {
    return null;
  }

  const columns = resolveMegaColumns(products.length, productsPerRow);

  return (
    <div
      className={cn('mega-menu-panel', open && 'is-open')}
      role="region"
      aria-labelledby={labelledBy}
      aria-hidden={!open}
    >
      <div className="mega-menu-panel-clip">
        <div className="mega-menu-panel-body">
          <div className="mx-auto w-full max-w-[1440px] px-6 py-8 lg:px-16 lg:py-10">
            <div
              className="mega-menu-grid mega-menu-grid-fixed"
              style={{ '--mega-cols': columns } as CSSProperties}
            >
              {products.map((product) => (
                <MegaProductTile key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function resolveMegaColumns(count: number, perRow?: number | null): number {
  if (typeof perRow === 'number' && perRow > 0) {
    return Math.min(12, Math.max(1, Math.round(perRow)));
  }

  if (count <= 1) {
    return 1;
  }

  const max = 7;
  if (count <= max) {
    return count;
  }

  for (let cols = max; cols >= 3; cols -= 1) {
    if (count % cols === 0) {
      return cols;
    }
  }

  return max;
}

function MegaProductTile({ product }: { product: MegaProductCard }) {
  const hasHoverImage = Boolean(product.hoverImageUrl);

  return (
    <MaybeLink href={product.href} className="group flex min-w-0 flex-col gap-3">
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border-subtle bg-brand-soft">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.title}
            fill
            className={cn(
              'object-cover transition-opacity duration-300 ease-out',
              hasHoverImage && 'group-hover:opacity-0',
            )}
            sizes="(max-width: 1280px) 20vw, 12vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-brand-soft to-surface px-3">
            <span className="text-center font-heading text-sm font-bold text-brand-deep">
              {product.title}
            </span>
          </div>
        )}
        {hasHoverImage && product.hoverImageUrl ? (
          <Image
            src={product.hoverImageUrl}
            alt=""
            fill
            className="object-cover opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
            sizes="(max-width: 1280px) 20vw, 12vw"
            aria-hidden
          />
        ) : null}
      </div>
      <p className="text-center text-sm font-semibold leading-snug tracking-wide text-text-primary transition-colors group-hover:text-brand-primary">
        {product.title}
      </p>
    </MaybeLink>
  );
}
