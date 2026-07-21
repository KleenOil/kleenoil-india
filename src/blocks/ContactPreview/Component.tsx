import { Mail, MapPin, Phone } from 'lucide-react';

import { ContactForm } from '@/components/forms/ContactForm';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { DEFAULT_CONTACT_PREVIEW } from '@/lib/cms/defaults';
import { getContactDetails } from '@/lib/cms/contact';

export type ContactPreviewBlockData = {
  blockType: 'contact-preview';
  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;
  showContactInfo?: boolean | null;
  showForm?: boolean | null;
};

type ContactPreviewBlockProps = {
  block?: ContactPreviewBlockData | null;
};

export async function ContactPreviewBlock({ block }: ContactPreviewBlockProps) {
  const eyebrow = block?.eyebrow || DEFAULT_CONTACT_PREVIEW.eyebrow;
  const heading = block?.heading || DEFAULT_CONTACT_PREVIEW.heading;
  const description = block?.description || DEFAULT_CONTACT_PREVIEW.description;
  const showContactInfo = block?.showContactInfo ?? true;
  const showForm = block?.showForm ?? true;

  const contact = await getContactDetails();

  return (
    <section className="border-y border-border-subtle bg-surface">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-6 py-16 lg:gap-16 lg:px-[100px] lg:py-[140px]">
        <SectionHeader eyebrow={eyebrow} heading={heading} description={description} />

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {showContactInfo ? (
            <div data-reveal-column className="flex flex-col gap-8">
              <div className="space-y-6">
                {contact.addresses.map((address) => (
                  <div key={address.label} className="flex gap-4">
                    <MapPin className="mt-0.5 size-5 shrink-0 text-brand-primary" aria-hidden />
                    <div>
                      <p className="font-heading text-sm font-bold text-text-primary">
                        {address.label}
                      </p>
                      <div className="mt-2 space-y-1 text-sm text-text-secondary">
                        {address.lines.map((line) => (
                          <p key={line}>{line}</p>
                        ))}
                      </div>
                      {address.mapLink ? (
                        <a
                          href={address.mapLink}
                          className="mt-2 inline-block text-sm font-semibold text-brand-primary hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View on map
                        </a>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-5">
                {contact.phones.map((phone) => (
                  <div key={phone.label + phone.number} className="flex gap-4">
                    <Phone className="mt-0.5 size-5 shrink-0 text-brand-primary" aria-hidden />
                    <div>
                      <p className="font-heading text-sm font-bold text-text-primary">
                        {phone.label}
                      </p>
                      <a
                        href={`tel:${phone.number.replace(/\s/g, '')}`}
                        className="mt-1 block text-sm text-text-secondary hover:text-text-primary"
                      >
                        {phone.number}
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-5">
                {contact.emails.map((email) => (
                  <div key={email.label + email.email} className="flex gap-4">
                    <Mail className="mt-0.5 size-5 shrink-0 text-brand-primary" aria-hidden />
                    <div>
                      <p className="font-heading text-sm font-bold text-text-primary">
                        {email.label}
                      </p>
                      <a
                        href={`mailto:${email.email}`}
                        className="mt-1 block text-sm text-text-secondary hover:text-text-primary"
                      >
                        {email.email}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border-subtle bg-background/50 p-8 text-sm text-text-secondary">
              Contact details are hidden for this block. Enable &ldquo;Show Contact
              Information&rdquo; in the CMS to display office, phone, and email details.
            </div>
          )}

          {showForm ? (
            <div data-reveal-column>
              <ContactForm />
            </div>
          ) : (
            <div className="flex items-center justify-center rounded-2xl border border-dashed border-border-subtle bg-background/50 p-8 text-sm text-text-secondary">
              Contact form hidden for this block.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
