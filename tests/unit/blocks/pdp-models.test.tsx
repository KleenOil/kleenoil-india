import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { PdpModelsBlock } from '@/blocks/pdp/PdpModels/Component';

const denseBlock = {
  blockType: 'pdp-models' as const,
  eyebrow: 'AVAILABLE MODELS',
  heading: 'Particle counters',
  description: 'Compare portable and installed units.',
  columns: [
    { label: 'MODEL' },
    { label: 'TYPE' },
    { label: 'STANDARDS' },
    { label: 'CHANNELS' },
    { label: 'KEY' },
  ],
  models: [
    {
      name: 'FS9V4',
      values: [
        { value: 'Portable' },
        { value: 'NAS 1638, ISO 4406, SAE AS4059' },
        { value: '4, imaging + shape recognition' },
        { value: 'field-rugged case' },
      ],
    },
  ],
};

describe('PdpModelsBlock', () => {
  it('stacks labeled specs on small screens instead of a colliding grid', () => {
    const { container } = render(<PdpModelsBlock block={denseBlock} />);

    const mobileList = container.querySelector('.lg\\:hidden');
    const desktopTable = container.querySelector('.hidden.lg\\:block');

    expect(mobileList).not.toBeNull();
    expect(desktopTable).not.toBeNull();
    expect(mobileList?.querySelector('[style*="grid-template-columns: repeat"]')).toBeNull();

    const typeLabel = screen.getAllByText('TYPE')[0];
    expect(typeLabel.tagName).toBe('DT');
    expect(screen.getAllByText('Portable').length).toBeGreaterThan(0);
    expect(screen.getByRole('heading', { name: 'Particle counters' })).toBeInTheDocument();
  });
});
