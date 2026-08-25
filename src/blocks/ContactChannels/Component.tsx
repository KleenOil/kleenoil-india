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
  const eyebrow = block?.eyebrow || DEFAULT_CONTACT_CHANNELS.eyebrow;
  const heading = block?.heading || DEFAULT_CONTACT_CHANNELS.heading;
  const contact = await getCmsContactDetails();

  const items = [
    {
      label: contact?.addresses[0]?.label || DEFAULT_CONTACT_CHANNELS.items[0].label,
      value: contact?.addresses[0]?.lines.join(', ') || DEFAULT_CONTACT_CHANNELS.items[0].value,
      href: contact?.addresses[0]?.mapLink || undefined,
    },
    {
      label: contact?.phones[0]?.label || DEFAULT_CONTACT_CHANNELS.items[1].label,
      value: contact?.phones[0]?.number || DEFAULT_CONTACT_CHANNELS.items[1].value,
      href: contact?.phones[0]?.number
        ? telHref(contact.phones[0].number)
        : DEFAULT_CONTACT_CHANNELS.items[1].href,
    },
    {
      label: contact?.emails[0]?.label || DEFAULT_CONTACT_CHANNELS.items[2].label,
      value: contact?.emails[0]?.email || DEFAULT_CONTACT_CHANNELS.items[2].value,
      href: contact?.emails[0]?.email
        ? `mailto:${contact.emails[0].email}`
        : DEFAULT_CONTACT_CHANNELS.items[2].href,
    },
  ];

  return (
    <section id="direct-channels" className="bg-brand-deep text-white">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-6 py-14 lg:flex-row lg:items-end lg:justify-between lg:px-[100px] lg:py-14">
        <div className="max-w-[420px]">
          <p className="font-mono text-[11px] font-bold tracking-[1.8px] text-brand-soft uppercase">
            {eyebrow}
          </p>
          <h2 className="mt-3 font-heading text-[28px] font-bold leading-tight tracking-[-0.03em]">
            {heading}
          </h2>
        </div>

        <dl className="grid w-full max-w-[760px] gap-8 sm:grid-cols-3">
          {items.map((item) => (
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
