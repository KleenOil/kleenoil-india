import type { Metadata } from 'next';
import { Arimo, Poppins } from 'next/font/google';

import { SiteShell } from '@/components/layout/SiteShell';
import { cn } from '@/lib/utils';

import '@/styles/globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-family-heading',
  display: 'swap',
});

const arimo = Arimo({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-family-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Kleenoil India | Industrial Filtration',
    template: '%s | Kleenoil India',
  },
  description:
    'Precision oil purification and bypass filtration systems that extend equipment life and reduce downtime.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-body text-text-primary antialiased',
          poppins.variable,
          arimo.variable,
        )}
      >
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
