import { Analytics } from '@/components/consent/Analytics';
import { CookieBanner } from '@/components/consent/CookieBanner';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { PageLoader } from '@/components/loader/PageLoader';
import { getSiteChrome } from '@/lib/cms/site';

export async function SiteShell({ children }: { children: React.ReactNode }) {
  const chrome = await getSiteChrome();
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || '';

  return (
    <>
      <Header
        site={chrome.site}
        mainNav={chrome.mainNav}
        mobileNav={chrome.mobileNav}
        utilityNav={chrome.utilityNav}
      />
      <main className="relative min-h-[50vh]">
        <div
          id="header-scroll-sentinel"
          className="pointer-events-none absolute top-0 h-px w-px"
          aria-hidden
        />
        {children}
      </main>
      <Footer site={chrome.site} columns={chrome.footerColumns} legalLinks={chrome.legalLinks} />
      {chrome.loader.enabled ? <PageLoader loader={chrome.loader} /> : null}
      <CookieBanner />
      {gaId ? <Analytics measurementId={gaId} /> : null}
    </>
  );
}
