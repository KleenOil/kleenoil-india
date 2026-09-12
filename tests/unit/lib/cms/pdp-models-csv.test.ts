import { describe, expect, it } from 'vitest';

import { parseCsvTable, parsePdpModelsCsv, PDP_MODELS_CSV_EXAMPLE } from '@/lib/cms/pdp-models-csv';

describe('parseCsvTable', () => {
  it('keeps commas inside quoted cells', () => {
    expect(parseCsvTable('MODEL,RESERVOIR\nKO-BFS 30,"up to 2,000 L"')).toEqual([
      ['MODEL', 'RESERVOIR'],
      ['KO-BFS 30', 'up to 2,000 L'],
    ]);
  });

  it('accepts semicolon and tab files from Excel', () => {
    expect(parseCsvTable('MODEL;FLOW\nKO-BFS 30;30 L/min')).toEqual([
      ['MODEL', 'FLOW'],
      ['KO-BFS 30', '30 L/min'],
    ]);
    expect(parseCsvTable('MODEL\tFLOW\nKO-BFS 30\t30 L/min')).toEqual([
      ['MODEL', 'FLOW'],
      ['KO-BFS 30', '30 L/min'],
    ]);
  });
});

describe('parsePdpModelsCsv', () => {
  it('maps the first column to the model name and the rest to cell values', () => {
    const parsed = parsePdpModelsCsv(PDP_MODELS_CSV_EXAMPLE);

    expect(parsed.columns.map((column) => column.label)).toEqual([
      'MODEL',
      'FLOW',
      'RESERVOIR',
      'POWER',
    ]);
    expect(parsed.models[0]).toEqual({
      name: 'KO-BFS 30',
      values: [{ value: '30 L/min' }, { value: 'up to 2,000 L' }, { value: '1.5 kW' }],
    });
    expect(parsed.models).toHaveLength(3);
  });

  it('rejects a header-only file', () => {
    expect(() => parsePdpModelsCsv('MODEL,FLOW\n')).toThrow(/at least one model row/i);
  });
});
