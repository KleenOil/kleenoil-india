import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { getSiteChrome } from '@/lib/cms/site';

export async function SiteShell({ children }: { children: React.ReactNode }) {
  const chrome = await getSiteChrome();

  return (
    <>
      <Header
        site={chrome.site}
        mainNav={chrome.mainNav}
        utilityNav={chrome.utilityNav}
        enableSearch={chrome.enableSearch}
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
    </>
  );
}
