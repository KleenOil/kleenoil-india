'use client';

import { Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { Logo } from '@/components/branding/Logo';
import { CtaButton } from '@/components/ui/cta-button';
import { MaybeLink, hasHref } from '@/components/ui/maybe-link';
import type { SiteChrome } from '@/lib/cms/site';
import { cn } from '@/lib/utils';

type HeaderProps = {
  site: SiteChrome['site'];
  mainNav: SiteChrome['mainNav'];
  utilityNav: SiteChrome['utilityNav'];
};

export function Header({ site, mainNav, utilityNav }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const contact = utilityNav[0] ?? { label: 'Contact', href: '/contact' };

  useEffect(() => {
    const header = headerRef.current;
    const sentinel = document.getElementById('header-scroll-sentinel');
    if (!header || !sentinel) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) {
          return;
        }
        header.classList.toggle('header-scrolled', !entry.isIntersecting);
      },
      { threshold: 0 },
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <header ref={headerRef} className="site-header sticky top-0 z-50 border-b border-border-subtle">
      <div className="site-header-inner mx-auto flex w-full max-w-[1440px] items-center justify-between px-6 py-5 lg:px-16">
        <Logo companyName={site.companyName} tagline={site.companyTagline} />

        <nav className="hidden items-center gap-10 lg:flex" aria-label="Main">
          {mainNav.map((item) => (
            <MaybeLink
              key={item.label}
              href={item.href}
              className={cn(
                'text-sm font-semibold tracking-wide text-text-secondary',
                hasHref(item.href) && 'transition-colors hover:text-text-primary',
              )}
            >
              {item.label}
            </MaybeLink>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <CtaButton
            href={contact.href}
            appearance="secondary"
            className="border px-4 py-2.5 text-[13px] font-medium shadow-none"
          >
            {contact.label}
          </CtaButton>
        </div>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-lg border border-border-subtle text-text-primary lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        aria-hidden={!open}
        className={cn(
          'fixed inset-0 z-[60] flex flex-col bg-background lg:hidden',
          'transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
          open ? 'translate-x-0 pointer-events-auto' : '-translate-x-full pointer-events-none',
        )}
      >
        <div className="flex items-center justify-between border-b border-border-subtle px-6 py-5">
          <Logo companyName={site.companyName} tagline={site.companyTagline} />
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-lg border border-border-subtle text-text-primary"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            <X className="size-5" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-6 py-8" aria-label="Mobile">
          {mainNav.map((item) => (
            <MaybeLink
              key={item.label}
              href={item.href}
              className={cn(
                'rounded-lg px-3 py-4 text-lg font-semibold text-text-primary',
                hasHref(item.href) && 'transition-colors hover:bg-surface',
              )}
              onClick={() => setOpen(false)}
              tabIndex={open ? undefined : -1}
            >
              {item.label}
            </MaybeLink>
          ))}
        </nav>

        <div className="border-t border-border-subtle px-6 py-6">
          <CtaButton
            href={contact.href}
            appearance="primary"
            className="w-full"
            onClick={() => setOpen(false)}
          >
            {contact.label}
          </CtaButton>
        </div>
      </div>
    </header>
  );
}
