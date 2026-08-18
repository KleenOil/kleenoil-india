import { Logo } from '@/components/branding/Logo';
import { MaybeLink, hasHref } from '@/components/ui/maybe-link';
import type { SiteChrome } from '@/lib/cms/site';
import { cn } from '@/lib/utils';

type FooterProps = {
  site: SiteChrome['site'];
  columns: SiteChrome['footerColumns'];
  legalLinks: SiteChrome['legalLinks'];
};

export function Footer({ site, columns, legalLinks }: FooterProps) {
  const year = new Date().getFullYear();
  const copyright = site.copyright.replace('{{year}}', String(year));

  return (
    <footer className="border-t border-border-subtle bg-surface">
      <div className="mx-auto w-full max-w-[1440px] px-6 pb-10 pt-[100px] lg:px-[100px]">
        <div className="flex flex-col gap-16 lg:flex-row lg:gap-20">
          <div className="max-w-[380px] space-y-7">
            <Logo companyName={site.companyName} tagline={site.companyTagline} />
            <p className="text-sm leading-relaxed text-text-secondary">{site.footerTagline}</p>
          </div>

          <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-4 lg:justify-end lg:gap-12">
            {columns.map((column) => (
              <div key={column.title} className="space-y-4">
                <p className="text-[11px] font-medium tracking-[1.4px] text-text-tertiary uppercase">
                  {column.title}
                </p>
                <ul className="space-y-4">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <MaybeLink
                        href={link.href}
                        className={cn(
                          'text-sm text-text-secondary',
                          hasHref(link.href) && 'transition-colors hover:text-text-primary',
                        )}
                      >
                        {link.label}
                      </MaybeLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 border-t border-border-subtle pt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[11px] tracking-[1px] text-text-tertiary uppercase">{copyright}</p>
            <ul className="flex flex-wrap gap-8">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <MaybeLink
                    href={link.href}
                    className={cn(
                      'text-[11px] tracking-[1px] text-text-tertiary uppercase',
                      hasHref(link.href) && 'transition-colors hover:text-text-secondary',
                    )}
                  >
                    {link.label}
                  </MaybeLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
