import { describe, expect, it } from 'vitest';

import { resolvePdpLayout } from '@/lib/cms/resolve-pdp-layout';

describe('resolvePdpLayout', () => {
  it('keeps every product block when the same section is added twice', () => {
    const layout = resolvePdpLayout(
      {
        layout: [
          { blockType: 'pdp-hero', id: 'hero-1', dataSource: 'custom', heading: 'One' },
          { blockType: 'pdp-cta', id: 'cta-1', dataSource: 'custom', heading: 'First CTA' },
          { blockType: 'pdp-cta', id: 'cta-2', dataSource: 'custom', heading: 'Second CTA' },
        ],
      },
      {
        layout: [
          { blockType: 'pdp-hero', id: 'tpl-hero' },
          { blockType: 'pdp-cta', id: 'tpl-cta', heading: 'Template CTA' },
        ],
      },
    );

    expect(layout.map((block) => block.id)).toEqual(['hero-1', 'cta-1', 'cta-2']);
    expect(layout.filter((block) => block.blockType === 'pdp-cta')).toHaveLength(2);
    expect(layout[2]).toMatchObject({ heading: 'Second CTA' });
  });

  it('fills common duplicates from the matching template occurrence', () => {
    const layout = resolvePdpLayout(
      {
        layout: [
          { blockType: 'pdp-cta', id: 'cta-1', dataSource: 'common' },
          { blockType: 'pdp-cta', id: 'cta-2', dataSource: 'common' },
        ],
      },
      {
        layout: [{ blockType: 'pdp-cta', id: 'tpl-cta', heading: 'From template' }],
      },
    );

    expect(layout).toHaveLength(2);
    expect(layout[0]).toMatchObject({
      id: 'cta-1',
      heading: 'From template',
      dataSource: 'common',
    });
    expect(layout[1]).toMatchObject({
      id: 'cta-2',
      heading: 'From template',
      dataSource: 'common',
    });
  });
});
