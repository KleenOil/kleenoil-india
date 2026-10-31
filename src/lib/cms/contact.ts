import { cachedCmsQuery, CMS_CACHE_TAGS, dedupeCmsQuery } from '@/lib/cms/cache';
import { getPayloadClient } from '@/lib/payload';
import { logCmsFailure } from '@/lib/cms/unavailable';
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

function fromContactInfo(
  contactInfo: ContactInfo,
  options: { allowDefaults: boolean },
): ContactDetails | null {
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

  if (options.allowDefaults) {
    return {
      addresses: addresses.length ? addresses : DEFAULT_CONTACT.addresses,
      phones: phones.length ? phones : DEFAULT_CONTACT.phones,
      emails: emails.length ? emails : DEFAULT_CONTACT.emails,
    };
  }

  if (!addresses.length && !phones.length && !emails.length) {
    return null;
  }

  return { addresses, phones, emails };
}

const fetchContactDetails = cachedCmsQuery(
  ['cms', 'contact', 'details'],
  [CMS_CACHE_TAGS.contact, CMS_CACHE_TAGS.globals],
  async (): Promise<ContactDetails> => {
    try {
      const payload = await getPayloadClient();
      const contactInfo = (await payload
        .findGlobal({ slug: 'contact-info' })
        .catch(() => null)) as ContactInfo | null;

      if (!contactInfo) {
        return DEFAULT_CONTACT;
      }

      return fromContactInfo(contactInfo, { allowDefaults: true }) ?? DEFAULT_CONTACT;
    } catch (error) {
      logCmsFailure('getContactDetails', error);
      return DEFAULT_CONTACT;
    }
  },
);

const fetchCmsContactDetails = cachedCmsQuery(
  ['cms', 'contact', 'cms-only'],
  [CMS_CACHE_TAGS.contact, CMS_CACHE_TAGS.globals],
  async (): Promise<ContactDetails | null> => {
    try {
      const payload = await getPayloadClient();
      const contactInfo = (await payload
        .findGlobal({ slug: 'contact-info' })
        .catch(() => null)) as ContactInfo | null;

      if (!contactInfo) {
        return null;
      }

      return fromContactInfo(contactInfo, { allowDefaults: false });
    } catch (error) {
      logCmsFailure('getCmsContactDetails', error);
      return null;
    }
  },
);

export const getContactDetails = dedupeCmsQuery(async (): Promise<ContactDetails> =>
  fetchContactDetails(),
);

/** CMS Contact Information only — no Bangalore placeholders. */
export const getCmsContactDetails = dedupeCmsQuery(async (): Promise<ContactDetails | null> =>
  fetchCmsContactDetails(),
);
