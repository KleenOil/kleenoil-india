import type { CollectionBeforeChangeHook, CollectionConfig, FieldAccess } from 'payload';

import { editorsAndAdmins, isEditorOrAdmin } from '@/access/roles';
import { LEAD_INDUSTRIES, LEAD_STATUSES, LEAD_TIMINGS } from '@/lib/cms/leads';

const locked: FieldAccess = () => false;

const stampStatusChangedAt: CollectionBeforeChangeHook = ({ data, originalDoc, operation }) => {
  if (!data) {
    return data;
  }

  if (operation === 'create') {
    data.status = data.status || 'new';
    data.statusChangedAt = new Date().toISOString();
    return data;
  }

  if (data.status && data.status !== originalDoc?.status) {
    data.statusChangedAt = new Date().toISOString();
  }

  return data;
};

export const Leads: CollectionConfig = {
  slug: 'leads',
  labels: {
    singular: 'Lead',
    plural: 'Leads',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: [
      'name',
      'email',
      'company',
      'industry',
      'status',
      'statusChangedAt',
      'createdAt',
    ],
    group: 'Inbox',
    description:
      'Consultation form submissions. Form fields are locked; status can be moved between New, Contacted, and Closed.',
    components: {
      beforeListTable: ['/components/admin/LeadStatusTabs#LeadStatusTabs'],
    },
  },
  access: {
    read: editorsAndAdmins,
    create: () => false,
    update: editorsAndAdmins,
    delete: editorsAndAdmins,
  },
  hooks: {
    beforeChange: [stampStatusChangedAt],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      access: { update: locked },
      admin: { readOnly: true },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      access: { update: locked },
      admin: { readOnly: true },
    },
    {
      name: 'company',
      type: 'text',
      access: { update: locked },
      admin: { readOnly: true },
    },
    {
      name: 'plant',
      type: 'text',
      label: 'Plant / site',
      access: { update: locked },
      admin: { readOnly: true },
    },
    {
      name: 'industry',
      type: 'select',
      options: [...LEAD_INDUSTRIES],
      access: { update: locked },
      admin: { readOnly: true },
    },
    {
      name: 'timing',
      type: 'select',
      label: 'When they can talk',
      options: [...LEAD_TIMINGS],
      access: { update: locked },
      admin: { readOnly: true },
    },
    {
      name: 'message',
      type: 'textarea',
      label: 'What we should look at',
      access: { update: locked },
      admin: { readOnly: true },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'new',
      options: [...LEAD_STATUSES],
      access: { update: ({ req }) => isEditorOrAdmin({ req }) },
      admin: {
        position: 'sidebar',
        components: {
          Cell: '/components/admin/LeadStatusCell#LeadStatusCell',
        },
      },
    },
    {
      name: 'statusChangedAt',
      type: 'date',
      label: 'Status changed',
      access: { update: locked },
      admin: {
        position: 'sidebar',
        readOnly: true,
        date: {
          pickerAppearance: 'dayAndTime',
          displayFormat: 'dd MMM yyyy, HH:mm',
        },
      },
    },
    {
      name: 'source',
      type: 'text',
      defaultValue: 'consultation',
      access: { update: locked },
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
  ],
  timestamps: true,
};
