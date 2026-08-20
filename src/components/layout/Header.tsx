'use client';

import { ChevronDown, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { Logo } from '@/components/branding/Logo';
import { MegaMenuPanel } from '@/components/layout/MegaMenuPanel';
import { CtaButton } from '@/components/ui/cta-button';
import { MaybeLink, hasHref } from '@/components/ui/maybe-link';
import { getMobileSubLinks, hasDropdown, hasMegaMenu, type NavItem } from '@/lib/cms/nav-types';
import type { NavLink } from '@/lib/cms/defaults';
import { cn } from '@/lib/utils';

type HeaderProps = {
  site: {
    companyName: string;
    companyTagline: string;
  };
  mainNav: NavItem[];
  mobileNav: NavItem[];
  utilityNav: NavLink[];
};

export function Header({ site, mainNav, mobileNav, utilityNav }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const contact = utilityNav[0] ?? { label: 'Contact', href: '/contact' };

  function clearCloseTimer() {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }

  function openMenu(key: string) {
    clearCloseTimer();
    setOpenKey(key);
  }

  function scheduleClose() {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpenKey(null), 120);
  }

  useEffect(() => {
    return () => clearCloseTimer();
  }, []);

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
    if (!mobileOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!openKey) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenKey(null);
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setOpenKey(null);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('pointerdown', onPointerDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('pointerdown', onPointerDown);
    };
  }, [openKey]);

  return (
    <header
      ref={headerRef}
      className="site-header relative sticky top-0 z-50 border-b border-border-subtle"
      onMouseLeave={scheduleClose}
      onMouseEnter={clearCloseTimer}
    >
      <div className="site-header-inner mx-auto flex w-full max-w-[1440px] items-center justify-between px-6 py-5 lg:px-16">
        <div onMouseEnter={() => setOpenKey(null)}>
          <Logo companyName={site.companyName} tagline={site.companyTagline} />
        </div>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          {mainNav.map((item, index) => (
            <DesktopNavItem
              key={`${item.label}-${index}`}
              item={item}
              itemKey={`${item.label}-${index}`}
              openKey={openKey}
              onOpen={openMenu}
              onClose={scheduleClose}
            />
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex" onMouseEnter={() => setOpenKey(null)}>
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
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileOpen((value) => !value)}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {mainNav.map((item, index) => {
        const itemKey = `${item.label}-${index}`;
        if (!hasMegaMenu(item)) {
          return null;
        }

        return (
          <MegaMenuPanel
            key={itemKey}
            open={openKey === itemKey}
            products={item.products ?? []}
            productsPerRow={item.productsPerRow}
            labelledBy={`nav-trigger-${itemKey}`}
          />
        );
      })}

      <div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        aria-hidden={!mobileOpen}
        className={cn(
          'fixed inset-0 z-[60] flex flex-col bg-background lg:hidden',
          'transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
          mobileOpen
            ? 'translate-x-0 pointer-events-auto'
            : '-translate-x-full pointer-events-none',
        )}
      >
        <div className="flex items-center justify-between border-b border-border-subtle px-6 py-5">
          <Logo companyName={site.companyName} tagline={site.companyTagline} />
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-lg border border-border-subtle text-text-primary"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          >
            <X className="size-5" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-6 py-8" aria-label="Mobile">
          {mobileNav.map((item, index) => (
            <MobileNavItem
              key={`${item.label}-${index}`}
              item={item}
              itemKey={`${item.label}-${index}`}
              expanded={expandedMobile === `${item.label}-${index}`}
              onToggle={() =>
                setExpandedMobile((current) =>
                  current === `${item.label}-${index}` ? null : `${item.label}-${index}`,
                )
              }
              onNavigate={() => setMobileOpen(false)}
              menuOpen={mobileOpen}
            />
          ))}
        </nav>

        <div className="border-t border-border-subtle px-6 py-6">
          <CtaButton
            href={contact.href}
            appearance="primary"
            className="w-full"
            onClick={() => setMobileOpen(false)}
          >
            {contact.label}
          </CtaButton>
        </div>
      </div>
    </header>
  );
}

type DesktopNavItemProps = {
  item: NavItem;
  itemKey: string;
  openKey: string | null;
  onOpen: (key: string) => void;
  onClose: () => void;
};

function DesktopNavItem({ item, itemKey, openKey, onOpen, onClose }: DesktopNavItemProps) {
  const triggerId = `nav-trigger-${itemKey}`;
  const mega = hasMegaMenu(item);
  const dropdown = hasDropdown(item);
  const expandable = mega || dropdown;
  const open = openKey === itemKey;

  return (
    <div
      className="relative"
      onMouseEnter={() => (expandable ? onOpen(itemKey) : onClose())}
      onFocusCapture={() => (expandable ? onOpen(itemKey) : undefined)}
    >
      <MaybeLink
        id={triggerId}
        href={item.href}
        openInNewTab={item.openInNewTab}
        className={cn(
          'inline-flex items-center gap-1.5 text-sm font-semibold tracking-wide text-text-secondary',
          (hasHref(item.href) || expandable) && 'transition-colors hover:text-text-primary',
          open && 'text-text-primary',
        )}
        aria-expanded={expandable ? open : undefined}
        aria-haspopup={expandable ? (mega ? 'dialog' : 'menu') : undefined}
        onClick={
          expandable && !hasHref(item.href)
            ? (event) => {
                event.preventDefault();
                if (open) {
                  onClose();
                } else {
                  onOpen(itemKey);
                }
              }
            : undefined
        }
      >
        {item.label}
        {expandable ? (
          <ChevronDown
            className={cn('size-3.5 transition-transform duration-200', open && 'rotate-180')}
            aria-hidden
          />
        ) : null}
      </MaybeLink>

      {dropdown ? (
        <div
          className={cn(
            'absolute left-1/2 top-full z-50 pt-4 -translate-x-1/2',
            'transition-[opacity,transform,visibility] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
            open
              ? 'visible translate-y-0 opacity-100'
              : 'invisible pointer-events-none -translate-y-1 opacity-0',
          )}
        >
          <ul
            className="min-w-[220px] rounded-xl border border-border-subtle bg-background py-2 shadow-[0_16px_40px_#00663318]"
            role="menu"
            aria-labelledby={triggerId}
          >
            {item.children?.map((child, childIndex) => (
              <li key={`${child.href}-${child.label}-${childIndex}`} role="none">
                <MaybeLink
                  href={child.href}
                  openInNewTab={child.openInNewTab}
                  className={cn(
                    'block px-4 py-2.5 text-sm font-medium text-text-secondary',
                    hasHref(child.href) &&
                      'transition-colors hover:bg-surface hover:text-text-primary',
                  )}
                  role="menuitem"
                >
                  {child.label}
                </MaybeLink>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

type MobileNavItemProps = {
  item: NavItem;
  itemKey: string;
  expanded: boolean;
  onToggle: () => void;
  onNavigate: () => void;
  menuOpen: boolean;
};

function MobileNavItem({
  item,
  itemKey,
  expanded,
  onToggle,
  onNavigate,
  menuOpen,
}: MobileNavItemProps) {
  const panelId = `mobile-sub-${itemKey}`;
  const subLinks = getMobileSubLinks(item);
  const expandable = subLinks.length > 0;

  if (!expandable) {
    return (
      <MaybeLink
        href={item.href}
        openInNewTab={item.openInNewTab}
        className={cn(
          'rounded-lg px-3 py-4 text-lg font-semibold text-text-primary',
          hasHref(item.href) && 'transition-colors hover:bg-surface',
        )}
        onClick={onNavigate}
        tabIndex={menuOpen ? undefined : -1}
      >
        {item.label}
      </MaybeLink>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-1">
        <MaybeLink
          href={item.href}
          openInNewTab={item.openInNewTab}
          className={cn(
            'flex-1 rounded-lg px-3 py-4 text-lg font-semibold text-text-primary',
            hasHref(item.href) && 'transition-colors hover:bg-surface',
          )}
          onClick={hasHref(item.href) ? onNavigate : onToggle}
          tabIndex={menuOpen ? undefined : -1}
        >
          {item.label}
        </MaybeLink>
        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-lg text-text-primary"
          aria-expanded={expanded}
          aria-controls={panelId}
          aria-label={`${expanded ? 'Collapse' : 'Expand'} ${item.label}`}
          onClick={onToggle}
          tabIndex={menuOpen ? undefined : -1}
        >
          <ChevronDown
            className={cn('size-5 transition-transform duration-200', expanded && 'rotate-180')}
          />
        </button>
      </div>
      <div
        id={panelId}
        className={cn(
          'grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none',
          expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          <ul className="flex flex-col gap-0.5 pb-3 pl-3">
            {subLinks.map((child, childIndex) => (
              <li key={`${child.href}-${child.label}-${childIndex}`}>
                <MaybeLink
                  href={child.href}
                  openInNewTab={child.openInNewTab}
                  className={cn(
                    'block rounded-lg px-3 py-3 text-base font-medium text-text-secondary',
                    hasHref(child.href) &&
                      'transition-colors hover:bg-surface hover:text-text-primary',
                  )}
                  onClick={onNavigate}
                  tabIndex={menuOpen && expanded ? undefined : -1}
                >
                  {child.label}
                </MaybeLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
