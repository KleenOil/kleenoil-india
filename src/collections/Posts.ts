import type { CollectionConfig } from 'payload';

import { anyone, editorsAndAdmins } from '@/access/roles';
import { seoField } from '@/fields/seo';
import { slugField } from '@/fields/slug';
import { linkArrayField, linkField } from '@/fields/link';

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: {
    singular: 'Article',
    plural: 'Articles',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'publishedAt', 'updatedAt'],
    group: 'Content',
    description:
      'Journal articles. New posts appear on the Articles listing automatically unless hidden.',
  },
  access: {
    read: anyone,
    create: editorsAndAdmins,
    update: editorsAndAdmins,
    delete: editorsAndAdmins,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Card',
          description: 'Shown on the Articles listing and related-article cards.',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'excerpt',
              type: 'textarea',
              label: 'Excerpt',
              admin: {
                description: 'Short summary used on article cards and the featured story.',
              },
            },
            {
              name: 'category',
              type: 'text',
              label: 'Category',
              admin: {
                description: 'Shown as the card tag, e.g. FILTRATION or OIL COST.',
              },
            },
            {
              name: 'featuredImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Featured Image',
            },
          ],
        },
        {
          label: 'Article',
          description: 'Hero, body, sidebar, and in-article CTAs.',
          fields: [
            {
              name: 'authorName',
              type: 'text',
              label: 'Author name',
              admin: {
                description: 'Shown in the article sidebar. Defaults to Kleenoil Engineering.',
              },
            },
            {
              name: 'authorRole',
              type: 'text',
              label: 'Author role',
              admin: {
                description: 'Short line under the author name.',
              },
            },
            {
              name: 'tableOfContents',
              type: 'array',
              label: 'In this article',
              labels: {
                singular: 'Section',
                plural: 'Sections',
              },
              admin: {
                description:
                  'Leave empty to list every Heading 2/3 from the body. Add rows to pick which sections appear and how they are labelled.',
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  label: 'Link text',
                },
                {
                  name: 'heading',
                  type: 'text',
                  label: 'Jump to heading',
                  admin: {
                    description:
                      'Paste the exact Heading 2/3 from the body this link should scroll to. Leave empty to match Link text.',
                  },
                },
              ],
            },
            linkField({ name: 'heroCta', label: 'Hero button' }),
            {
              name: 'sidebarCta',
              type: 'group',
              label: 'Sidebar estimate card',
              admin: {
                hideGutter: true,
              },
              fields: [
                {
                  name: 'heading',
                  type: 'text',
                },
                {
                  name: 'description',
                  type: 'textarea',
                },
                linkField({ name: 'link', label: 'Button' }),
              ],
            },
            {
              name: 'content',
              type: 'richText',
              label: 'Body',
            },
          ],
        },
        {
          label: 'Closing sections',
          description:
            'Related articles and the quotation CTA at the bottom of this article page. Leave fields empty to use the site defaults.',
          fields: [
            {
              name: 'relatedSection',
              type: 'group',
              label: 'More from the journal',
              admin: {
                hideGutter: true,
              },
              fields: [
                {
                  name: 'eyebrow',
                  type: 'text',
                  label: 'Eyebrow',
                  admin: {
                    description: 'Defaults to Keep reading.',
                  },
                },
                {
                  name: 'heading',
                  type: 'text',
                  label: 'Heading',
                  admin: {
                    description: 'Defaults to More from the journal.',
                  },
                },
                linkField({
                  name: 'viewAll',
                  label: 'All articles link',
                  appearances: true,
                }),
                {
                  name: 'posts',
                  type: 'array',
                  label: 'Related articles',
                  labels: {
                    singular: 'Article',
                    plural: 'Articles',
                  },
                  maxRows: 3,
                  admin: {
                    description:
                      'Pick up to three. Leave empty to fill with the latest other articles automatically.',
                    initCollapsed: true,
                  },
                  fields: [
                    {
                      name: 'post',
                      type: 'relationship',
                      relationTo: 'posts',
                      required: true,
                      label: 'Article',
                      filterOptions: ({ id }) => {
                        if (id == null) {
                          return true;
                        }

                        return { id: { not_equals: id } };
                      },
                    },
                  ],
                },
              ],
            },
            {
              name: 'closingCta',
              type: 'group',
              label: 'Bottom CTA',
              admin: {
                hideGutter: true,
                description:
                  'Split quotation band under related articles. Empty fields use the defaults from the design.',
              },
              fields: [
                {
                  name: 'eyebrow',
                  type: 'text',
                  label: 'Eyebrow',
                },
                {
                  name: 'heading',
                  type: 'textarea',
                  label: 'Heading',
                  admin: {
                    description: 'Use a line break to split the heading onto two lines.',
                  },
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Description',
                },
                linkArrayField({ name: 'ctas', label: 'Buttons', maxRows: 2 }),
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [seoField],
        },
      ],
    },
    slugField({ fallbackFrom: 'title' }),
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Published date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'showInJournal',
      type: 'checkbox',
      label: 'Show in Articles listing',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description:
          'On by default. Turn off to keep this article live but remove it from the journal grid.',
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (!data) {
          return data;
        }

        if (operation === 'create' && !data.publishedAt) {
          data.publishedAt = new Date().toISOString();
        }

        if (operation === 'create' && data.showInJournal == null) {
          data.showInJournal = true;
        }

        return data;
      },
    ],
  },
};
