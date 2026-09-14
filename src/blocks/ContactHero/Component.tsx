import Image from 'next/image';

import { ConsultationForm } from '@/components/forms/ConsultationForm';
import { type ContactFormQuestion } from '@/lib/cms/contact-form';
import { blockHasCmsData, cmsList, cmsText } from '@/lib/cms/block-content';
import { DEFAULT_CONTACT_HERO } from '@/lib/cms/defaults';
import { getCmsContactDetails } from '@/lib/cms/contact';
import { getMediaAlt, getMediaUrl } from '@/lib/cms/links';
import type { Media } from '@/payload-types';

type BenefitItem = {
  label?: string | null;
};

export type ContactHeroBlockData = {
  blockType: 'contact-hero';
  eyebrow?: string | null;
  heading?: string | null;
  subheadline?: string | null;
  image?: number | Media | null;
  phoneLabel?: string | null;
  phoneNumber?: string | null;
  benefits?: BenefitItem[] | null;
  formTitle?: string | null;
  formLead?: string | null;
  questions?: ContactFormQuestion[] | null;
  submitLabel?: string | null;
  finePrint?: string | null;
};

type ContactHeroBlockProps = {
  block?: ContactHeroBlockData | null;
};

export async function ContactHeroBlock({ block }: ContactHeroBlockProps) {
  const hasCms = blockHasCmsData(block);
  const eyebrow = cmsText(block?.eyebrow, DEFAULT_CONTACT_HERO.eyebrow, hasCms);
  const heading = cmsText(block?.heading, DEFAULT_CONTACT_HERO.heading, hasCms);
  const subheadline = cmsText(block?.subheadline, DEFAULT_CONTACT_HERO.subheadline, hasCms);
  const phoneLabel = cmsText(block?.phoneLabel, DEFAULT_CONTACT_HERO.phoneLabel, hasCms);
  const imageUrl = cmsText(getMediaUrl(block?.image) ?? '', DEFAULT_CONTACT_HERO.imageUrl, hasCms);
  const imageAlt = getMediaAlt(block?.image, heading);
  const benefits = cmsList(
    block?.benefits?.map((item) => item.label).filter(Boolean) as string[] | undefined,
    DEFAULT_CONTACT_HERO.benefits,
    hasCms,
    (label) => Boolean(label),
  );

  const contact = await getCmsContactDetails();
  const phoneNumber = cmsText(
    block?.phoneNumber ?? contact?.phones[0]?.number ?? '',
    DEFAULT_CONTACT_HERO.phoneNumber,
    hasCms,
  );
  const telHref = `tel:${phoneNumber.replace(/[^\d+]/g, '')}`;

  return (
    <section id="consultation" className="relative isolate overflow-hidden bg-brand-deep">
      <div className="relative min-h-[760px] lg:min-h-[860px]">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        ) : null}

        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, #003319F2 0%, #00331999 48%, #00331933 100%)',
          }}
        />

        <div className="relative mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-6 py-16 lg:flex-row lg:items-center lg:gap-14 lg:px-[100px] lg:py-[72px]">
          <div className="max-w-[520px] text-white">
            {eyebrow ? (
              <p className="font-mono text-[12px] font-bold tracking-[2px] text-brand-soft uppercase">
                {eyebrow}
              </p>
            ) : null}
            {heading ? (
              <h1 className="mt-4 font-heading text-4xl font-bold leading-[1.05] tracking-[-0.04em] md:text-[44px] lg:text-[48px]">
                {heading.split('\n').map((line, index) => (
                  <span key={`${line}-${index}`} className="block">
                    {line}
                  </span>
                ))}
              </h1>
            ) : null}
            {subheadline ? (
              <p className="mt-4 max-w-xl text-base font-medium leading-relaxed text-brand-soft">
                {subheadline}
              </p>
            ) : null}

            {benefits.length ? (
              <ol className="mt-8 flex flex-col gap-3">
                {benefits.map((item, index) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 font-mono text-[12px] font-bold tracking-[1px] text-brand-bright">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[15px] font-medium leading-snug">{item}</span>
                  </li>
                ))}
              </ol>
            ) : null}

            {phoneNumber ? (
              <div className="mt-8">
                {phoneLabel ? (
                  <p className="font-mono text-[11px] font-bold tracking-[1.6px] text-white/55 uppercase">
                    {phoneLabel}
                  </p>
                ) : null}
                <a
                  href={telHref}
                  className="mt-1 inline-block font-heading text-xl font-bold text-white hover:text-brand-soft"
                >
                  {phoneNumber}
                </a>
              </div>
            ) : null}
          </div>

          <div className="w-full max-w-[560px] shrink-0 lg:ml-auto">
            <ConsultationForm
              title={cmsText(block?.formTitle, DEFAULT_CONTACT_HERO.formTitle, hasCms)}
              lead={cmsText(block?.formLead, DEFAULT_CONTACT_HERO.formLead, hasCms)}
              questions={hasCms ? (block?.questions ?? []) : undefined}
              submitLabel={cmsText(block?.submitLabel, DEFAULT_CONTACT_HERO.submitLabel, hasCms)}
              finePrint={cmsText(block?.finePrint, DEFAULT_CONTACT_HERO.finePrint, hasCms)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
