'use client';

import { Button, useField, useForm, useModal } from '@payloadcms/ui';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { PAGE_BLOCK_OPTIONS } from '@/lib/cms/page-block-options';

type ClientBlock = {
  slug?: string;
  labels?: {
    singular?: unknown;
  };
};

type BlocksDrawerMultiSelectProps = {
  blocks?: Array<string | ClientBlock>;
  field?: {
    name?: string;
    blocks?: Array<string | ClientBlock>;
  };
  path?: string;
  schemaPath?: string;
};

function asLabel(value: unknown): string {
  return typeof value === 'string' ? value.trim().toLowerCase() : '';
}

function normalizeBlocks(blocks: Array<string | ClientBlock> | undefined): ClientBlock[] {
  if (!Array.isArray(blocks)) {
    return [];
  }

  return blocks.map((block) => {
    if (typeof block === 'string') {
      return { slug: block };
    }
    return {
      slug: typeof block?.slug === 'string' ? block.slug : undefined,
      labels: block?.labels,
    };
  });
}

function buildLabelToSlug(blocks: ClientBlock[]): Map<string, string> {
  const map = new Map<string, string>();

  for (const option of PAGE_BLOCK_OPTIONS) {
    map.set(option.label.toLowerCase(), option.slug);
    map.set(option.slug.replace(/-/g, ' '), option.slug);
  }

  for (const block of blocks) {
    if (!block?.slug) {
      continue;
    }
    const singular = asLabel(block.labels?.singular);
    if (singular) {
      map.set(singular, block.slug);
    }
    map.set(block.slug.replace(/-/g, ' '), block.slug);
  }

  return map;
}

function resolveSlugFromBlockCard(card: Element, labelToSlug: Map<string, string>): string | null {
  const label =
    card.querySelector('.thumbnail-card__label')?.textContent?.trim().toLowerCase() ||
    card.querySelector('button')?.getAttribute('title')?.trim().toLowerCase() ||
    '';

  if (!label) {
    return null;
  }

  return labelToSlug.get(label) ?? null;
}

function findOpenBlocksDrawer(): HTMLElement | null {
  const drawers = Array.from(document.querySelectorAll<HTMLElement>('.drawer'));
  return drawers.find((drawer) => drawer.querySelector('.blocks-drawer__blocks')) ?? null;
}

function getDrawerSlug(drawer: HTMLElement | null): string | null {
  const closeId = drawer?.querySelector<HTMLElement>('[id^="close-drawer__"]')?.id ?? '';
  return closeId.replace(/^close-drawer__/, '') || null;
}

function applySelectedStyles(selected: string[], labelToSlug: Map<string, string>) {
  const drawer = findOpenBlocksDrawer();
  if (!drawer) {
    return;
  }

  drawer.querySelectorAll('.blocks-drawer__block').forEach((node) => {
    const card = node as HTMLElement;
    const slug = resolveSlugFromBlockCard(card, labelToSlug);
    const isSelected = Boolean(slug && selected.includes(slug));
    card.toggleAttribute('data-multi-selected', isSelected);
    card.style.outline = isSelected ? '2px solid var(--theme-success-500, #3ac47d)' : '';
    card.style.outlineOffset = isSelected ? '2px' : '';
  });
}

function clearSelectedStyles() {
  document.querySelectorAll('.blocks-drawer__block[data-multi-selected="true"]').forEach((node) => {
    node.removeAttribute('data-multi-selected');
    (node as HTMLElement).style.outline = '';
    (node as HTMLElement).style.outlineOffset = '';
  });
}

/**
 * Adds multi-select to Payload's Add Layout drawer without replacing native
 * one-click add. Uncheck "Select multiple" to use the original click-to-add.
 */
export function BlocksDrawerMultiSelect(props: BlocksDrawerMultiSelectProps) {
  const path = props.path || props.field?.name || 'layout';
  const schemaPath = props.schemaPath || path;
  const blocks = useMemo(
    () => normalizeBlocks(props.blocks ?? props.field?.blocks),
    [props.blocks, props.field?.blocks],
  );

  const { addFieldRow } = useForm();
  const { closeModal } = useModal();
  const { rows = [] } = useField({ path, hasRows: true });

  const [multiSelect, setMultiSelect] = useState(true);
  const [selected, setSelected] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [drawerSlug, setDrawerSlug] = useState<string | null>(null);

  const multiSelectRef = useRef(true);
  const selectedRef = useRef<string[]>([]);
  const wasOpenRef = useRef(false);
  const labelToSlug = useMemo(() => buildLabelToSlug(blocks), [blocks]);
  const labelToSlugRef = useRef(labelToSlug);

  useEffect(() => {
    multiSelectRef.current = multiSelect;
  }, [multiSelect]);

  useEffect(() => {
    selectedRef.current = selected;
  }, [selected]);

  useEffect(() => {
    labelToSlugRef.current = labelToSlug;
  }, [labelToSlug]);

  const resetSelection = useCallback(() => {
    setSelected([]);
    clearSelectedStyles();
  }, []);

  useEffect(() => {
    let frame = 0;

    const syncDrawerState = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const drawer = findOpenBlocksDrawer();
        const nextOpen = Boolean(drawer);
        const nextSlug = getDrawerSlug(drawer);

        setIsOpen((prev) => (prev === nextOpen ? prev : nextOpen));
        setDrawerSlug((prev) => (prev === nextSlug ? prev : nextSlug));

        if (wasOpenRef.current && !nextOpen) {
          setMultiSelect(true);
          setSelected([]);
          clearSelectedStyles();
        }
        wasOpenRef.current = nextOpen;

        if (!nextOpen) {
          return;
        }

        if (multiSelectRef.current) {
          applySelectedStyles(selectedRef.current, labelToSlugRef.current);
        }
      });
    };

    syncDrawerState();

    const observer = new MutationObserver(() => {
      syncDrawerState();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isOpen || !multiSelect) {
      return;
    }
    applySelectedStyles(selected, labelToSlug);
  }, [isOpen, labelToSlug, multiSelect, selected]);

  useEffect(() => {
    const onClickCapture = (event: MouseEvent) => {
      if (!multiSelectRef.current) {
        return;
      }

      const target = event.target as HTMLElement | null;
      if (!target) {
        return;
      }

      const drawer = findOpenBlocksDrawer();
      const card = target.closest('.blocks-drawer__block');
      if (!drawer || !card || !drawer.contains(card)) {
        return;
      }

      const slug = resolveSlugFromBlockCard(card, labelToSlugRef.current);
      if (!slug) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      const isSelected = selectedRef.current.includes(slug);
      const next = isSelected
        ? selectedRef.current.filter((item) => item !== slug)
        : [...selectedRef.current, slug];

      setSelected(next);
      applySelectedStyles(next, labelToSlugRef.current);
    };

    document.addEventListener('click', onClickCapture, true);
    return () => document.removeEventListener('click', onClickCapture, true);
  }, []);

  const addSelected = useCallback(() => {
    if (selected.length === 0) {
      return;
    }

    const known = new Set(labelToSlug.values());
    const ordered = selected.filter((slug) => known.has(slug));

    let rowIndex = rows.length;
    for (const blockType of ordered) {
      addFieldRow({
        blockType,
        path,
        rowIndex,
        schemaPath,
      });
      rowIndex += 1;
    }

    if (drawerSlug) {
      closeModal(drawerSlug);
    }

    setMultiSelect(true);
    resetSelection();
  }, [
    addFieldRow,
    closeModal,
    drawerSlug,
    labelToSlug,
    path,
    resetSelection,
    rows.length,
    schemaPath,
    selected,
  ]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div
      style={{
        position: 'fixed',
        left: '50%',
        bottom: '1.5rem',
        transform: 'translateX(-50%)',
        zIndex: 100000,
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        flexWrap: 'wrap',
        padding: '0.4rem 0.55rem',
        borderRadius: '6px',
        background: 'var(--theme-elevation-0, #fff)',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
        border: '1px solid var(--theme-elevation-150, #e0e0e0)',
      }}
    >
      <label
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          fontSize: '0.8125rem',
          cursor: 'pointer',
          userSelect: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        <input
          type="checkbox"
          checked={multiSelect}
          onChange={(event) => {
            const enabled = event.target.checked;
            setMultiSelect(enabled);
            if (!enabled) {
              resetSelection();
            }
          }}
        />
        Select multiple
      </label>
      {multiSelect ? (
        <>
          <Button buttonStyle="primary" disabled={selected.length === 0} onClick={addSelected}>
            Add selected ({selected.length})
          </Button>
          <Button buttonStyle="secondary" disabled={selected.length === 0} onClick={resetSelection}>
            Clear
          </Button>
        </>
      ) : null}
    </div>,
    document.body,
  );
}
