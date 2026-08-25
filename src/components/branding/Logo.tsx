import Image from 'next/image';
import Link from 'next/link';

import type { SiteLogoImage } from '@/lib/cms/site';
import { cn } from '@/lib/utils';

type LogoProps = {
  companyName?: string;
  tagline?: string;
  className?: string;
  compact?: boolean;
  logo?: SiteLogoImage | null;
  logoMark?: SiteLogoImage | null;
  size?: 'header' | 'footer';
  priority?: boolean;
};

function isSvg(image: SiteLogoImage): boolean {
  return image.mimeType === 'image/svg+xml' || /\.svg(?:$|\?)/i.test(image.src);
}

export function Logo({
  companyName = 'KLEENOIL',
  tagline = 'INDIA — EST. 1988',
  className,
  compact = false,
  logo,
  logoMark,
  size = 'header',
  priority = false,
}: LogoProps) {
  const image = logo ?? logoMark ?? null;
  const imageClass =
    size === 'footer'
      ? 'h-12 max-h-12 w-auto max-w-[min(100%,20rem)]'
      : 'h-11 max-h-11 w-auto max-w-[min(70vw,18rem)] sm:h-12 sm:max-h-12';

  if (image) {
    return (
      <Link
        href="/"
        aria-label={companyName}
        className={cn('inline-flex max-w-full items-center', className)}
      >
        <Image
          src={image.src}
          alt={image.alt || companyName}
          width={image.width}
          height={image.height}
          unoptimized={isSvg(image)}
          priority={priority}
          className={cn('object-contain object-left', imageClass)}
        />
      </Link>
    );
  }

  return (
    <Link href="/" className={cn('inline-flex items-center gap-3', className)}>
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-primary font-heading text-xl font-extrabold text-white">
        {companyName.charAt(0).toUpperCase()}
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-heading text-lg font-bold tracking-tight text-text-primary">
            {companyName}
          </span>
          {tagline ? (
            <span className="mt-1 text-[9px] tracking-[1.6px] text-text-tertiary uppercase">
              {tagline}
            </span>
          ) : null}
        </span>
      )}
    </Link>
  );
}
