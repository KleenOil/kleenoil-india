'use client';

import type { TextFieldClientComponent } from 'payload';
import { TextField, useField, useFormFields } from '@payloadcms/ui';
import { useEffect, useRef } from 'react';

function altFromFilename(filename: string): string {
  const base = filename.split(/[/\\]/).pop() || filename;
  return base.replace(/\.[^.]+$/, '') || base;
}

function getFileName(file: unknown): string {
  if (typeof File !== 'undefined' && file instanceof File) {
    return file.name;
  }

  if (file && typeof file === 'object' && 'name' in file) {
    const name = (file as { name?: unknown }).name;
    if (typeof name === 'string') {
      return name;
    }
  }

  return '';
}

/**
 * Auto-fills Media alt from the selected/uploaded file name until the editor changes it.
 * Needed because client-side required validation runs before server hooks.
 */
export const MediaAltField: TextFieldClientComponent = (props) => {
  const { path } = props;
  const { value, setValue } = useField<string>({ path });
  const file = useFormFields(([fields]) => fields.file?.value);
  const filenameField = useFormFields(([fields]) => {
    const raw = fields.filename?.value;
    return typeof raw === 'string' ? raw : undefined;
  });
  const lastAutoAlt = useRef<string | null>(null);

  useEffect(() => {
    const name = getFileName(file) || filenameField || '';
    if (!name) {
      return;
    }

    const next = altFromFilename(name);
    if (!next) {
      return;
    }

    const current = typeof value === 'string' ? value.trim() : '';

    // Do not overwrite a value the editor typed (different from our last auto-fill).
    if (current && current !== lastAutoAlt.current) {
      return;
    }

    if (current === next) {
      lastAutoAlt.current = next;
      return;
    }

    lastAutoAlt.current = next;
    setValue(next);
  }, [file, filenameField, setValue, value]);

  return <TextField {...props} />;
};
