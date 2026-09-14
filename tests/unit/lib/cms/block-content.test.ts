import { describe, expect, it } from 'vitest';

import { blockHasCmsData, cmsList, cmsText, isCmsFilled } from '@/lib/cms/block-content';

describe('blockHasCmsData', () => {
  it('treats an empty CMS block as having no content', () => {
    expect(
      blockHasCmsData({
        id: 'abc',
        blockType: 'sustainability-hero',
        blockName: 'Hero',
        heading: '',
        pills: [{ id: '1', n: null, label: null }],
      }),
    ).toBe(false);
  });

  it('ignores layout-only fields such as variant', () => {
    expect(
      blockHasCmsData({
        id: 'abc',
        blockType: 'hero',
        variant: 'panel',
        heading: '',
      }),
    ).toBe(false);
  });

  it('ignores PDP dataSource so empty custom sections still use design fallbacks', () => {
    expect(
      blockHasCmsData({
        id: 'cta-2',
        blockType: 'pdp-cta',
        dataSource: 'custom',
        heading: '',
      }),
    ).toBe(false);
  });

  it('detects a single filled field', () => {
    expect(
      blockHasCmsData({
        id: 'abc',
        blockType: 'sustainability-hero',
        heading: 'Custom heading',
      }),
    ).toBe(true);
  });
});

describe('cmsText', () => {
  it('uses placeholders only when the block has no CMS content', () => {
    expect(cmsText('', 'Placeholder', false)).toBe('Placeholder');
    expect(cmsText('Real', 'Placeholder', false)).toBe('Real');
  });

  it('hides placeholders once any CMS field is filled', () => {
    expect(cmsText('', 'Placeholder', true)).toBe('');
    expect(cmsText('  Real heading  ', 'Placeholder', true)).toBe('  Real heading  ');
  });
});

describe('cmsList', () => {
  it('keeps CMS rows and skips placeholders when the block is in use', () => {
    expect(
      cmsList([{ title: 'A' }], [{ title: 'Fallback' }], true, (item) => Boolean(item.title)),
    ).toEqual([{ title: 'A' }]);
    expect(cmsList([], [{ title: 'Fallback' }], true, (item) => Boolean(item.title))).toEqual([]);
  });
});

describe('isCmsFilled', () => {
  it('ignores payload row ids', () => {
    expect(isCmsFilled({ id: 'row-1', title: null, body: '' })).toBe(false);
    expect(isCmsFilled({ id: 'row-1', title: 'Kept' })).toBe(true);
  });
});
