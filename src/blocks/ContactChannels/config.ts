import type { Block } from 'payload';

import { eyebrowField, headingField } from '../shared';

export const ContactChannels: Block = {
  slug: 'contact-channels',
  labels: {
    singular: 'Contact Channels',
    plural: 'Contact Channels',
  },
  fields: [eyebrowField, headingField],
};
