'use client';

import Image from 'next/image';

import { MaybeLink, hasHref } from '@/components/ui/maybe-link';
import type { MegaColumn, MegaColumnItem, MegaProductCard } from '@/lib/cms/nav-types';
import { cn } from '@/lib/utils';

type MegaMenuPanelProps = {
  open: boolean;
  columns: MegaColumn[];
  labelledBy: string;
};

export function MegaMenuPanel({ open, columns, labelledBy }: MegaMenuPanelProps) {
  if (!columns.length) {
    return null;
  }

  return (
    <div
      className={cn('mega-menu-panel', open && 'is-open')}
      role="region"
      aria-labelledby={labelledBy}
      aria-hidden={!open}
    >
      <div className="mega-menu-panel-clip">
        <div className="mega-menu-panel-body">
          <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-6 py-8 lg:flex-row lg:items-start lg:gap-12 lg:px-16 lg:py-9">
            {columns.map((column, index) => (
              <div key={`${column.heading}-${column.layout}-${index}`} className="contents">
                {index > 0 ? (
                  <div
                    className="hidden w-px shrink-0 self-stretch bg-brand-primary/50 lg:block"
                    aria-hidden
                  />
                ) : null}
                <MegaColumnView column={column} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MegaColumnView({ column }: { column: MegaColumn }) {
  const width =
    column.layout === 'profile'
      ? 'lg:w-[380px] lg:shrink-0'
      : column.layout === 'text-list'
        ? 'lg:w-[340px] lg:shrink-0'
        : 'min-w-0 flex-1';

  return (
    <div className={cn('mega-col flex flex-col gap-4', width)}>
      {column.heading ? (
        <p className="text-[11px] font-semibold tracking-[1.6px] text-border-strong uppercase">
          {column.heading}
        </p>
      ) : null}

      {column.layout === 'product-tiles' ? <ProductTiles products={column.products} /> : null}
      {column.layout === 'image-list' ? <ImageList items={column.items} /> : null}
      {column.layout === 'text-list' ? <TextList items={column.items} /> : null}
      {column.layout === 'profile' && column.profile ? (
        <ProfileCard profile={column.profile} />
      ) : null}

      {column.cta && hasHref(column.cta.href) ? (
        <MaybeLink
          href={column.cta.href}
          className="mt-1 text-sm font-semibold text-brand-bright transition-colors duration-300 hover:text-brand-soft"
        >
          {column.cta.label}
        </MaybeLink>
      ) : column.cta ? (
        <p className="mt-1 text-sm font-semibold text-brand-bright">{column.cta.label}</p>
      ) : null}
    </div>
  );
}

function ProductTiles({ products }: { products: MegaProductCard[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {products.map((product) => (
        <MaybeLink
          key={product.id}
          href={product.href}
          className="group flex min-w-0 flex-col gap-2.5"
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-[10px] bg-brand-primary/30">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.title}
                fill
                className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                sizes="(max-width: 1024px) 40vw, 16vw"
              />
            ) : (
              <div className="flex h-full items-center justify-center px-3">
                <span className="text-center font-heading text-sm font-semibold text-background">
                  {product.title}
                </span>
              </div>
            )}
          </div>
          <p className="font-heading text-sm font-semibold text-background transition-colors duration-300 group-hover:text-brand-soft">
            {product.title}
          </p>
        </MaybeLink>
      ))}
    </div>
  );
}

function ImageList({ items }: { items: MegaColumnItem[] }) {
  const compact = items.length > 4;

  return (
    <div
      className={cn('grid gap-x-4 gap-y-3', compact ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-3')}
    >
      {items.map((item) => {
        const inner = (
          <>
            <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-brand-primary/30">
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={item.imageAlt || item.label}
                  fill
                  className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  sizes="56px"
                />
              ) : null}
            </div>
            <span className="font-heading text-base font-semibold text-background transition-colors duration-300 group-hover:text-brand-soft">
              {item.label}
            </span>
          </>
        );

        if (hasHref(item.href)) {
          return (
            <MaybeLink
              key={`${item.label}-${item.href}`}
              href={item.href}
              className="group flex min-w-0 items-center gap-3"
            >
              {inner}
            </MaybeLink>
          );
        }

        return (
          <div key={item.label} className="flex min-w-0 items-center gap-3">
            {inner}
          </div>
        );
      })}
    </div>
  );
}

function TextList({ items }: { items: MegaColumnItem[] }) {
  return (
    <div className="flex flex-col gap-4">
      {items.map((item) => {
        const body = (
          <>
            <p className="font-heading text-lg font-semibold text-background">{item.label}</p>
            {item.description ? (
              <p className="mt-1 text-sm leading-relaxed text-brand-soft">{item.description}</p>
            ) : null}
          </>
        );

        if (hasHref(item.href)) {
          return (
            <MaybeLink
              key={`${item.label}-${item.href}`}
              href={item.href}
              className="block transition-opacity duration-300 hover:opacity-80"
            >
              {body}
            </MaybeLink>
          );
        }

        return <div key={item.label}>{body}</div>;
      })}
    </div>
  );
}

function ProfileCard({ profile }: { profile: NonNullable<MegaColumn['profile']> }) {
  return (
    <div className="flex flex-col gap-3">
      {profile.imageUrl ? (
        <div className="relative h-40 overflow-hidden rounded-xl">
          <Image
            src={profile.imageUrl}
            alt={profile.imageAlt || profile.title || 'Company profile'}
            fill
            className="object-cover"
            sizes="380px"
          />
        </div>
      ) : null}
      {profile.title ? (
        <p className="font-heading text-xl font-semibold text-background">{profile.title}</p>
      ) : null}
      {profile.copy ? (
        <p className="text-sm leading-relaxed text-brand-soft">{profile.copy}</p>
      ) : null}
    </div>
  );
}
