export const PDP_MODELS_MAX_COLUMNS = 12;
export const PDP_MODELS_MAX_MODELS = 80;

export type PdpModelsCsvColumn = { label: string };
export type PdpModelsCsvModel = { name: string; values: Array<{ value: string }> };

export type PdpModelsCsvResult = {
  columns: PdpModelsCsvColumn[];
  models: PdpModelsCsvModel[];
  warnings: string[];
};

const EXAMPLE_HEADERS = ['MODEL', 'FLOW', 'RESERVOIR', 'POWER'] as const;

const EXAMPLE_ROWS = [
  ['KO-BFS 30', '30 L/min', 'up to 2,000 L', '1.5 kW'],
  ['KO-BFS 60', '60 L/min', 'up to 5,000 L', '2.2 kW'],
  ['KO-BFS 100', '100 L/min', 'up to 10,000 L', '3.7 kW'],
] as const;

export const PDP_MODELS_CSV_EXAMPLE = serializeCsv([
  [...EXAMPLE_HEADERS],
  ...EXAMPLE_ROWS.map((row) => [...row]),
]);

function detectDelimiter(line: string): ',' | ';' | '\t' {
  let commas = 0;
  let semis = 0;
  let tabs = 0;
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    if (char === '"') {
      if (inQuotes && line[index + 1] === '"') {
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (inQuotes) {
      continue;
    }

    if (char === ',') {
      commas += 1;
    } else if (char === ';') {
      semis += 1;
    } else if (char === '\t') {
      tabs += 1;
    }
  }

  if (tabs > commas && tabs >= semis) {
    return '\t';
  }

  if (semis > commas) {
    return ';';
  }

  return ',';
}

export function parseCsvTable(text: string): string[][] {
  const input = text
    .replace(/^\uFEFF/, '')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n');
  const firstLine = input.split('\n').find((line) => line.trim()) ?? '';
  const delimiter = detectDelimiter(firstLine);

  const rows: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let inQuotes = false;

  for (let index = 0; index < input.length; index += 1) {
    const char = input[index];

    if (inQuotes) {
      if (char === '"') {
        if (input[index + 1] === '"') {
          cell += '"';
          index += 1;
        } else {
          inQuotes = false;
        }
      } else {
        cell += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
      continue;
    }

    if (char === delimiter) {
      row.push(cell.trim());
      cell = '';
      continue;
    }

    if (char === '\n') {
      row.push(cell.trim());
      cell = '';
      if (row.some((value) => value.length > 0)) {
        rows.push(row);
      }
      row = [];
      continue;
    }

    cell += char;
  }

  row.push(cell.trim());
  if (row.some((value) => value.length > 0)) {
    rows.push(row);
  }

  return rows;
}

export function parsePdpModelsCsv(text: string): PdpModelsCsvResult {
  const table = parseCsvTable(text);
  if (table.length < 2) {
    throw new Error('CSV needs a header row and at least one model row.');
  }

  const warnings: string[] = [];
  const rawHeaders = table[0].map((label) => label.trim()).filter((label) => label.length > 0);

  if (!rawHeaders.length) {
    throw new Error('The first row must list column names, starting with MODEL.');
  }

  let headers = rawHeaders;
  if (headers.length > PDP_MODELS_MAX_COLUMNS) {
    warnings.push(`Only the first ${PDP_MODELS_MAX_COLUMNS} columns were imported.`);
    headers = headers.slice(0, PDP_MODELS_MAX_COLUMNS);
  }

  const valueCount = Math.max(headers.length - 1, 0);
  const models: PdpModelsCsvModel[] = [];

  for (const raw of table.slice(1)) {
    const name = (raw[0] ?? '').trim();
    if (!name) {
      warnings.push('Skipped a row with an empty model name.');
      continue;
    }

    const values = Array.from({ length: valueCount }, (_, index) => ({
      value: (raw[index + 1] ?? '').trim(),
    }));

    models.push({ name, values });

    if (models.length >= PDP_MODELS_MAX_MODELS) {
      warnings.push(`Only the first ${PDP_MODELS_MAX_MODELS} models were imported.`);
      break;
    }
  }

  if (!models.length) {
    throw new Error('No model rows found. Put the model name in the first column.');
  }

  return {
    columns: headers.map((label) => ({ label })),
    models,
    warnings,
  };
}

export function serializeCsv(rows: string[][]): string {
  return `${rows
    .map((row) =>
      row
        .map((cell) => {
          if (/[",\n;]/.test(cell)) {
            return `"${cell.replace(/"/g, '""')}"`;
          }
          return cell;
        })
        .join(','),
    )
    .join('\n')}\n`;
}
