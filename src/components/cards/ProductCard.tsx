import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { cn } from '@/lib/utils';

export type ProductCardData = {
  tag: string;
  title: string;
  description: string;
  href: string;
  imageUrl?: string | null;
  imageAlt?: string;
};

type ProductCardProps = {
  product: ProductCardData;
  className?: string;
};

export function ProductCard({ product, className }: ProductCardProps) {
  return (
    <Link
      href={product.href}
      data-reveal-item
      className={cn(
        'group surface-card flex flex-col overflow-hidden rounded-2xl border-2 border-border-subtle bg-surface-elevated/70',
        className,
      )}
    >
      <div className="relative h-[220px] overflow-hidden bg-brand-soft sm:h-[280px]">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.imageAlt || product.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-brand-soft to-surface">
            <span className="font-heading text-lg font-bold text-brand-deep">{product.title}</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3.5 p-7">
        <p className="font-mono text-xs font-bold tracking-[1.4px] text-brand-primary uppercase">
          {product.tag}
        </p>
        <h3 className="font-heading text-[28px] font-bold leading-tight tracking-tight text-text-primary">
          {product.title}
        </h3>
        <p className="flex-1 text-sm leading-relaxed text-text-secondary">{product.description}</p>
        <div className="flex items-center justify-between pt-3">
          <span className="font-heading text-sm font-bold text-brand-primary">Explore</span>
          <ArrowUpRight
            className="size-4 text-brand-primary transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1"
            aria-hidden
          />
        </div>
      </div>
    </Link>
  );
}
