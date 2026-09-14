import { blockHasCmsData, cmsText } from '@/lib/cms/block-content';
import { DEFAULT_CONTACT_CHANNELS } from '@/lib/cms/defaults';
import { getCmsContactDetails } from '@/lib/cms/contact';

export type ContactChannelsBlockData = {
  blockType: 'contact-channels';
  eyebrow?: string | null;
  heading?: string | null;
};

type ContactChannelsBlockProps = {
  block?: ContactChannelsBlockData | null;
};

function telHref(number: string): string {
  return `tel:${number.replace(/[^\d+]/g, '')}`;
}

export async function ContactChannelsBlock({ block }: ContactChannelsBlockProps) {
  const hasCms = blockHasCmsData(block);
  const eyebrow = cmsText(block?.eyebrow, DEFAULT_CONTACT_CHANNELS.eyebrow, hasCms);
  const heading = cmsText(block?.heading, DEFAULT_CONTACT_CHANNELS.heading, hasCms);
  const contact = await getCmsContactDetails();
  const defaults = DEFAULT_CONTACT_CHANNELS.items;

  const items = hasCms
    ? [
        {
          label: contact?.addresses[0]?.label || '',
          value: contact?.addresses[0]?.lines.join(', ') || '',
          href: contact?.addresses[0]?.mapLink || undefined,
        },
        {
          label: contact?.phones[0]?.label || '',
          value: contact?.phones[0]?.number || '',
          href: contact?.phones[0]?.number ? telHref(contact.phones[0].number) : undefined,
        },
        {
          label: contact?.emails[0]?.label || '',
          value: contact?.emails[0]?.email || '',
          href: contact?.emails[0]?.email ? `mailto:${contact.emails[0].email}` : undefined,
        },
      ]
    : [
        {
          label: contact?.addresses[0]?.label || defaults[0].label,
          value: contact?.addresses[0]?.lines.join(', ') || defaults[0].value,
          href: contact?.addresses[0]?.mapLink || undefined,
        },
        {
          label: contact?.phones[0]?.label || defaults[1].label,
          value: contact?.phones[0]?.number || defaults[1].value,
          href: contact?.phones[0]?.number ? telHref(contact.phones[0].number) : defaults[1].href,
        },
        {
          label: contact?.emails[0]?.label || defaults[2].label,
          value: contact?.emails[0]?.email || defaults[2].value,
          href: contact?.emails[0]?.email ? `mailto:${contact.emails[0].email}` : defaults[2].href,
        },
      ];

  const visibleItems = items.filter((item) => item.label || item.value);

  return (
    <section id="direct-channels" className="bg-brand-deep text-white">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-6 py-14 lg:flex-row lg:items-end lg:justify-between lg:px-[100px] lg:py-14">
        <div className="max-w-[420px]">
          {eyebrow ? (
            <p className="font-mono text-[11px] font-bold tracking-[1.8px] text-brand-soft uppercase">
              {eyebrow}
            </p>
          ) : null}
          {heading ? (
            <h2 className="mt-3 font-heading text-[28px] font-bold leading-tight tracking-[-0.03em]">
              {heading}
            </h2>
          ) : null}
        </div>

        <dl className="grid w-full max-w-[760px] gap-8 sm:grid-cols-3">
          {visibleItems.map((item) => (
            <div key={item.label} className="flex flex-col gap-2">
              <dt className="font-mono text-[11px] font-bold tracking-[1.6px] text-brand-soft uppercase">
                {item.label}
              </dt>
              <dd className="text-base font-medium leading-snug">
                {item.href ? (
                  <a href={item.href} className="hover:text-brand-soft">
                    {item.value}
                  </a>
                ) : (
                  item.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
