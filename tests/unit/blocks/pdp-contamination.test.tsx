import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { PdpContaminationBlock } from '@/blocks/pdp/PdpContamination/Component';

describe('PdpContaminationBlock', () => {
  it('hides a column that has no list items', () => {
    render(
      <PdpContaminationBlock
        block={{
          blockType: 'pdp-contamination',
          heading: 'What enters the oil',
          leftHeading: 'Contamination generated',
          rightHeading: 'Problems this leads to',
          items: [
            { text: 'Iron particles', onRight: false },
            { text: 'Moisture', onRight: false },
          ],
        }}
      />,
    );

    expect(screen.getByRole('heading', { name: 'Contamination generated' })).toBeInTheDocument();
    expect(screen.getByText('Iron particles')).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: 'Problems this leads to' }),
    ).not.toBeInTheDocument();
  });

  it('shows only the right column when the left list is empty', () => {
    render(
      <PdpContaminationBlock
        block={{
          blockType: 'pdp-contamination',
          heading: 'What enters the oil',
          leftHeading: 'Contamination generated',
          rightHeading: 'Problems this leads to',
          items: [{ text: 'Pump damage', onRight: true }],
        }}
      />,
    );

    expect(screen.getByRole('heading', { name: 'Problems this leads to' })).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: 'Contamination generated' }),
    ).not.toBeInTheDocument();
  });
});
