'use client';

import { Button, useField, useForm, useFormFields } from '@payloadcms/ui';
import { useRef, useState } from 'react';

import { parsePdpModelsCsv } from '@/lib/cms/pdp-models-csv';

type PdpModelsCsvImportProps = {
  path: string;
  schemaPath?: string;
};

function siblingPath(path: string, siblingName: string): string {
  const segments = path.split('.');
  segments[segments.length - 1] = siblingName;
  return segments.join('.');
}

function schemaSiblingPath(schemaPath: string | undefined, siblingName: string): string {
  if (!schemaPath) {
    return siblingName;
  }

  const segments = schemaPath.split('.');
  segments[segments.length - 1] = siblingName;
  return segments.join('.');
}

function fieldState(value: string) {
  return {
    initialValue: value,
    valid: true,
    value,
  };
}

export function PdpModelsCsvImport({ path, schemaPath }: PdpModelsCsvImportProps) {
  const { addFieldRow, removeFieldRow, setModified } = useForm();
  const fileRef = useRef<HTMLInputElement>(null);
  const [paste, setPaste] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const dataSource = useFormFields(([fields]) => {
    const value = fields[siblingPath(path, 'dataSource')]?.value;
    return typeof value === 'string' ? value : undefined;
  });

  const columnsPath = siblingPath(path, 'columns');
  const modelsPath = siblingPath(path, 'models');
  const columnsSchemaPath = schemaSiblingPath(schemaPath, 'columns');
  const modelsSchemaPath = schemaSiblingPath(schemaPath, 'models');

  const { rows: columnRows = [] } = useField({ path: columnsPath, hasRows: true });
  const { rows: modelRows = [] } = useField({ path: modelsPath, hasRows: true });

  const hiddenOnCommon = dataSource === 'common';

  if (hiddenOnCommon) {
    return (
      <div className="field-type" style={{ marginBottom: '1.5rem' }}>
        <p style={{ color: 'var(--theme-elevation-600)', margin: 0 }}>
          Switch Data source to Custom to import this product&apos;s model table from CSV.
        </p>
      </div>
    );
  }

  const replaceRows = async (text: string) => {
    setError(null);
    setMessage(null);

    try {
      const parsed = parsePdpModelsCsv(text);

      for (let index = columnRows.length - 1; index >= 0; index -= 1) {
        removeFieldRow({ path: columnsPath, rowIndex: index });
      }

      for (let index = modelRows.length - 1; index >= 0; index -= 1) {
        removeFieldRow({ path: modelsPath, rowIndex: index });
      }

      parsed.columns.forEach((column, rowIndex) => {
        addFieldRow({
          path: columnsPath,
          rowIndex,
          schemaPath: columnsSchemaPath,
          subFieldState: {
            label: fieldState(column.label),
          },
        });
      });

      parsed.models.forEach((model, modelIndex) => {
        addFieldRow({
          path: modelsPath,
          rowIndex: modelIndex,
          schemaPath: modelsSchemaPath,
          subFieldState: {
            name: fieldState(model.name),
          },
        });

        model.values.forEach((cell, valueIndex) => {
          addFieldRow({
            path: `${modelsPath}.${modelIndex}.values`,
            rowIndex: valueIndex,
            schemaPath: `${modelsSchemaPath}.values`,
            subFieldState: {
              value: fieldState(cell.value),
            },
          });
        });
      });

      setModified(true);
      const warning = parsed.warnings.length ? ` ${parsed.warnings.join(' ')}` : '';
      setMessage(
        `Imported ${parsed.models.length} models across ${parsed.columns.length} columns.${warning}`,
      );
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Could not read that CSV.');
    }
  };

  return (
    <div className="field-type" style={{ marginBottom: '1.75rem' }}>
      <p className="field-label" style={{ fontWeight: 600, marginBottom: '0.35rem' }}>
        Import models from CSV
      </p>
      <p style={{ color: 'var(--theme-elevation-600)', margin: '0 0 0.85rem' }}>
        First row is headers. First column is the model name. Every other column becomes a table
        cell, in the same order. Commas inside values must be quoted.
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
        <Button
          buttonStyle="secondary"
          onClick={() => fileRef.current?.click()}
          size="small"
          type="button"
        >
          Choose CSV
        </Button>
        <Button
          buttonStyle="secondary"
          el="anchor"
          newTab
          size="small"
          url="/examples/pdp-models.csv"
        >
          Download example
        </Button>
        <a
          download="pdp-models.csv"
          href="/examples/pdp-models.csv"
          style={{ alignSelf: 'center', fontSize: 13 }}
        >
          or use the site example
        </a>
      </div>

      <input
        accept=".csv,text/csv,text/plain"
        hidden
        onChange={(event) => {
          const file = event.target.files?.[0];
          event.target.value = '';
          if (!file) {
            return;
          }

          void file.text().then((text) => replaceRows(text));
        }}
        ref={fileRef}
        type="file"
      />

      <textarea
        onChange={(event) => setPaste(event.target.value)}
        placeholder={'MODEL,FLOW,RESERVOIR,POWER\nKO-BFS 30,30 L/min,"up to 2,000 L",1.5 kW'}
        rows={5}
        style={{
          fontFamily: 'var(--font-mono, ui-monospace, monospace)',
          fontSize: 13,
          width: '100%',
        }}
        value={paste}
      />

      <div style={{ marginTop: '0.65rem' }}>
        <Button
          buttonStyle="primary"
          disabled={!paste.trim()}
          onClick={() => void replaceRows(paste)}
          size="small"
          type="button"
        >
          Replace table from pasted CSV
        </Button>
      </div>

      {message ? (
        <p style={{ color: 'var(--theme-success-600)', margin: '0.75rem 0 0' }}>{message}</p>
      ) : null}
      {error ? (
        <p style={{ color: 'var(--theme-error-500)', margin: '0.75rem 0 0' }}>{error}</p>
      ) : null}
    </div>
  );
}
