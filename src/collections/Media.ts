import type {
  CollectionBeforeChangeHook,
  CollectionBeforeValidateHook,
  CollectionConfig,
  FieldHook,
} from 'payload';

import { anyone, editorsAndAdmins } from '@/access/roles';

/** Use the uploaded file name as default alt until an editor changes it. */
export function altFromFilename(filename: string | null | undefined): string {
  if (!filename) {
    return '';
  }

  const base = filename.split(/[/\\]/).pop() || filename;
  return base.replace(/\.[^.]+$/, '') || base;
}

function resolveUploadFilename(
  data: { filename?: unknown } | null | undefined,
  req: { file?: { name?: string } },
): string {
  if (typeof data?.filename === 'string' && data.filename) {
    return data.filename;
  }

  if (typeof req.file?.name === 'string' && req.file.name) {
    return req.file.name;
  }

  return '';
}

const setAltFieldFromFilename: FieldHook = ({ value, data, req }) => {
  if (typeof value === 'string' && value.trim()) {
    return value;
  }

  const next = altFromFilename(resolveUploadFilename(data, req));
  return next || value;
};

const setDefaultAltFromFilename: CollectionBeforeValidateHook = ({ data, req }) => {
  if (!data) {
    return data;
  }

  const currentAlt = typeof data.alt === 'string' ? data.alt.trim() : '';
  if (currentAlt) {
    return data;
  }

  const nextAlt = altFromFilename(resolveUploadFilename(data, req));
  if (nextAlt) {
    data.alt = nextAlt;
  }

  return data;
};

const ensureAltBeforeChange: CollectionBeforeChangeHook = ({ data, req }) => {
  if (!data) {
    return data;
  }

  const currentAlt = typeof data.alt === 'string' ? data.alt.trim() : '';
  if (currentAlt) {
    return data;
  }

  const nextAlt = altFromFilename(resolveUploadFilename(data, req));
  if (nextAlt) {
    data.alt = nextAlt;
  }

  return data;
};

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: 'Content',
  },
  access: {
    read: anyone,
    create: editorsAndAdmins,
    update: editorsAndAdmins,
    delete: editorsAndAdmins,
  },
  hooks: {
    beforeValidate: [setDefaultAltFromFilename],
    beforeChange: [ensureAltBeforeChange],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description: 'Defaults to the image file name. Change anytime to customize.',
        components: {
          Field: '/components/admin/MediaAltField#MediaAltField',
        },
      },
      hooks: {
        beforeValidate: [setAltFieldFromFilename],
      },
    },
    {
      name: 'caption',
      type: 'text',
    },
  ],
  upload: {
    staticDir: 'media',
    mimeTypes: [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/avif',
      'image/svg+xml',
      'video/mp4',
      'video/webm',
      'application/pdf',
      'model/gltf-binary',
    ],
  },
};
