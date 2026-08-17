import { getPayloadClient } from '@/lib/payload';
import type { ContactInfo } from '@/payload-types';

export type ContactDetails = {
  addresses: Array<{
    label: string;
    lines: string[];
    mapLink?: string | null;
  }>;
  phones: Array<{ label: string; number: string }>;
  emails: Array<{ label: string; email: string }>;
};

const DEFAULT_CONTACT: ContactDetails = {
  addresses: [
    {
      label: 'Head Office',
      lines: [
        'Kleenoil India Pvt. Ltd.',
        'Peenya Industrial Area',
        'Bangalore, Karnataka 560058',
        'India',
      ],
    },
  ],
  phones: [
    { label: 'Sales & Enquiries', number: '+91 80 0000 0000' },
    { label: 'Technical Support', number: '+91 80 0000 0001' },
  ],
  emails: [
    { label: 'General Enquiries', email: 'info@kleenoil.com' },
    { label: 'Engineering', email: 'engineering@kleenoil.com' },
  ],
};

function formatAddress(address: NonNullable<ContactInfo['addresses']>[number]): {
  label: string;
  lines: string[];
  mapLink?: string | null;
} {
  const lines = [
    address.street,
    [address.city, address.state].filter(Boolean).join(', '),
    address.pin,
    address.country,
  ].filter((line): line is string => Boolean(line?.trim()));

  return {
    label: address.label,
    lines: lines.length ? lines : [address.label],
    mapLink: address.mapLink,
  };
}

export async function getContactDetails(): Promise<ContactDetails> {
  try {
    const payload = await getPayloadClient();
    const contactInfo = (await payload
      .findGlobal({ slug: 'contact-info' })
      .catch(() => null)) as ContactInfo | null;

    if (!contactInfo) {
      return DEFAULT_CONTACT;
    }

    const addresses =
      contactInfo.addresses?.map(formatAddress).filter((item) => item.lines.length > 0) ?? [];
    const phones =
      contactInfo.phones
        ?.filter((phone) => phone.label && phone.number)
        .map((phone) => ({
          label: phone.label,
          number: phone.number,
        })) ?? [];
    const emails =
      contactInfo.emails
        ?.filter((item) => item.label && item.email)
        .map((item) => ({
          label: item.label,
          email: item.email,
        })) ?? [];

    return {
      addresses: addresses.length ? addresses : DEFAULT_CONTACT.addresses,
      phones: phones.length ? phones : DEFAULT_CONTACT.phones,
      emails: emails.length ? emails : DEFAULT_CONTACT.emails,
    };
  } catch (error) {
    console.error('[cms] getContactDetails failed', error);
    return DEFAULT_CONTACT;
  }
}
