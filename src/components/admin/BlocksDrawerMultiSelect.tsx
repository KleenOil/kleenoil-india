'use client';

import { Button, useField, useForm, useModal } from '@payloadcms/ui';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { PAGE_BLOCK_OPTIONS } from '@/lib/cms/layout-presets';

const LABEL_TO_SLUG = new Map(
  PAGE_BLOCK_OPTIONS.map((option) => [option.label.toLowerCase(), option.slug]),
);

function resolveSlugFromBlockCard(card: Element): string | null {
  const label =
    card.querySelector('.thumbnail-card__label')?.textContent?.trim().toLowerCase() ||
    card.textContent?.trim().toLowerCase() ||
    '';

  for (const [blockLabel, slug] of LABEL_TO_SLUG) {
    if (label.includes(blockLabel)) {
      return slug;
    }
  }

  return null;
}

function findOpenBlocksDrawer(): HTMLElement | null {
  const drawers = Array.from(document.querySelectorAll<HTMLElement>('.drawer'));
  return drawers.find((drawer) => drawer.querySelector('.blocks-drawer__blocks')) ?? null;
}

function clearSelectedStyles() {
  document.querySelectorAll('.blocks-drawer__block[data-multi-selected="true"]').forEach((node) => {
    node.removeAttribute('data-multi-selected');
    (node as HTMLElement).style.outline = '';
    (node as HTMLElement).style.outlineOffset = '';
  });
}

type DrawerChrome = {
  headerHost: HTMLElement | null;
  footerHost: HTMLElement | null;
  activeDrawerSlug: string | null;
  isOpen: boolean;
};

function readDrawerChrome(): DrawerChrome {
  const drawer = findOpenBlocksDrawer();
  if (!drawer) {
    return {
      headerHost: null,
      footerHost: null,
      activeDrawerSlug: null,
      isOpen: false,
    };
  }

  const header = drawer.querySelector<HTMLElement>('.drawer__header');
  const content = drawer.querySelector<HTMLElement>('.drawer__content-children');
  if (!header || !content) {
    return {
      headerHost: null,
      footerHost: null,
      activeDrawerSlug: null,
      isOpen: true,
    };
  }

  header.style.display = 'flex';
  header.style.alignItems = 'center';
  header.style.gap = '0.75rem';

  let controls = header.querySelector<HTMLElement>('[data-multi-select-controls]');
  if (!controls) {
    controls = document.createElement('div');
    controls.setAttribute('data-multi-select-controls', 'true');
    controls.style.cssText = 'margin-left:auto;display:flex;align-items:center;flex-shrink:0;';
    const closeBtn = header.querySelector('.drawer__header__close');
    if (closeBtn) {
      header.insertBefore(controls, closeBtn);
    } else {
      header.appendChild(controls);
    }
  }

  let footer = content.querySelector<HTMLElement>('[data-multi-select-footer]');
  if (!footer) {
    footer = document.createElement('div');
    footer.setAttribute('data-multi-select-footer', 'true');
    footer.style.cssText = 'margin-top:1rem;padding-top:0.75rem;';
    content.appendChild(footer);
  }

  const closeId = drawer.querySelector<HTMLElement>('[id^="close-drawer__"]')?.id ?? '';
  const slug = closeId.replace(/^close-drawer__/, '') || null;

  return {
    headerHost: controls,
    footerHost: footer,
    activeDrawerSlug: slug,
    isOpen: true,
  };
}

type BlocksDrawerMultiSelectProps = {
  path: string;
  schemaPath: string;
};

/**
 * Enhances Payload's native "Add Layout" drawer with a top-right
 * "Select multiple" checkbox so editors can add several blocks at once.
 */
export function BlocksDrawerMultiSelect({ path, schemaPath }: BlocksDrawerMultiSelectProps) {
  const { addFieldRow } = useForm();
  const { closeModal, modalState } = useModal();
  const { rows = [] } = useField({ path, hasRows: true });

  const [multiSelect, setMultiSelect] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [chrome, setChrome] = useState<DrawerChrome>({
    headerHost: null,
    footerHost: null,
    activeDrawerSlug: null,
    isOpen: false,
  });

  const multiSelectRef = useRef(false);
  const selectedRef = useRef<string[]>([]);

  useEffect(() => {
    multiSelectRef.current = multiSelect;
  }, [multiSelect]);

  useEffect(() => {
    selectedRef.current = selected;
  }, [selected]);

  const resetSelection = useCallback(() => {
    setSelected([]);
    clearSelectedStyles();
  }, []);

  useEffect(() => {
    let frame = 0;

    const applyChrome = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const next = readDrawerChrome();
        setChrome((prev) => {
          if (
            prev.headerHost === next.headerHost &&
            prev.footerHost === next.footerHost &&
            prev.activeDrawerSlug === next.activeDrawerSlug &&
            prev.isOpen === next.isOpen
          ) {
            return prev;
          }
          return next;
        });

        if (!next.isOpen) {
          setMultiSelect(false);
          setSelected([]);
          clearSelectedStyles();
        }
      });
    };

    applyChrome();

    const observer = new MutationObserver(() => {
      applyChrome();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [modalState]);

  useEffect(() => {
    const onClickCapture = (event: MouseEvent) => {
      if (!multiSelectRef.current) {
        return;
      }

      const target = event.target as HTMLElement | null;
      if (!target) {
        return;
      }

      const card = target.closest('.blocks-drawer__block');
      if (!card || !findOpenBlocksDrawer()?.contains(card)) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      const slug = resolveSlugFromBlockCard(card);
      if (!slug) {
        return;
      }

      const isSelected = selectedRef.current.includes(slug);
      const next = isSelected
        ? selectedRef.current.filter((item) => item !== slug)
        : [...selectedRef.current, slug];

      setSelected(next);

      if (isSelected) {
        card.removeAttribute('data-multi-selected');
        (card as HTMLElement).style.outline = '';
        (card as HTMLElement).style.outlineOffset = '';
      } else {
        card.setAttribute('data-multi-selected', 'true');
        (card as HTMLElement).style.outline = '2px solid var(--theme-success-500, #3ac47d)';
        (card as HTMLElement).style.outlineOffset = '2px';
      }
    };

    document.addEventListener('click', onClickCapture, true);
    return () => document.removeEventListener('click', onClickCapture, true);
  }, []);

  const addSelected = useCallback(() => {
    if (selected.length === 0) {
      return;
    }

    const ordered = PAGE_BLOCK_OPTIONS.map((option) => option.slug).filter((slug) =>
      selected.includes(slug),
    );

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

    if (chrome.activeDrawerSlug) {
      closeModal(chrome.activeDrawerSlug);
    }

    setMultiSelect(false);
    resetSelection();
  }, [
    addFieldRow,
    chrome.activeDrawerSlug,
    closeModal,
    path,
    resetSelection,
    rows.length,
    schemaPath,
    selected,
  ]);

  return (
    <>
      {chrome.headerHost
        ? createPortal(
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
            </label>,
            chrome.headerHost,
          )
        : null}

      {chrome.footerHost && multiSelect
        ? createPortal(
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <Button buttonStyle="primary" disabled={selected.length === 0} onClick={addSelected}>
                Add selected ({selected.length})
              </Button>
              <Button
                buttonStyle="secondary"
                disabled={selected.length === 0}
                onClick={resetSelection}
              >
                Clear
              </Button>
            </div>,
            chrome.footerHost,
          )
        : null}
    </>
  );
}
