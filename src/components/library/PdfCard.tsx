import { Download, FileText } from 'lucide-react';

import { MaybeLink, hasHref } from '@/components/ui/maybe-link';

type PdfCardProps = {
  title: string;
  meta: string;
  href?: string;
};

export function PdfCard({ title, meta, href }: PdfCardProps) {
  const linked = hasHref(href);

  return (
    <MaybeLink
      href={href}
      className="flex flex-col gap-3.5 rounded-2xl border border-[#B7D4C6] bg-[#E8F3ED] p-[22px] shadow-[0_8px_20px_#00331912] transition-transform duration-300 hover:-translate-y-0.5"
    >
      <div className="flex items-center justify-between">
        <span className="flex size-10 items-center justify-center rounded-[10px] bg-[#CAE5D9]">
          <FileText className="size-[18px] text-brand-primary" aria-hidden />
        </span>
        <span className="rounded-md bg-white/60 px-2 py-1 font-heading text-[10px] font-bold tracking-[1.2px] text-brand-primary uppercase">
          PDF
        </span>
      </div>
      <p className="font-heading text-base font-bold leading-snug text-text-primary">{title}</p>
      <p className="text-[13px] text-text-secondary">{meta}</p>
      <span className="mt-auto inline-flex items-center gap-1.5 font-heading text-xs font-semibold text-brand-primary">
        Download
        <Download className="size-3.5" aria-hidden />
        <span className="sr-only">{linked ? title : `${title} (coming soon)`}</span>
      </span>
    </MaybeLink>
  );
}
