'use client';

import { ChevronRight } from 'lucide-react';
import { useMemo, useState } from 'react';

import { MaybeLink, hasHref } from '@/components/ui/maybe-link';
import type { MegaIntro, MegaNode } from '@/lib/cms/nav-types';
import { cn } from '@/lib/utils';

type MegaMenuPanelProps = {
  open: boolean;
  intro?: MegaIntro;
  tree: MegaNode[];
  labelledBy: string;
};

function firstIndexWithChildren(nodes: MegaNode[]): number {
  const index = nodes.findIndex((node) => node.children.length > 0);
  return index >= 0 ? index : 0;
}

function defaultPath(tree: MegaNode[]) {
  const l1 = firstIndexWithChildren(tree);
  const l2Nodes = tree[l1]?.children ?? [];
  return { l1, l2: l2Nodes.length ? firstIndexWithChildren(l2Nodes) : null };
}

export function MegaMenuPanel(props: MegaMenuPanelProps) {
  if (!props.tree.length) {
    return null;
  }

  return <MegaMenuPanelView key={props.open ? 'open' : 'closed'} {...props} />;
}

function MegaMenuPanelView({ open, intro, tree, labelledBy }: MegaMenuPanelProps) {
  const defaults = useMemo(() => defaultPath(tree), [tree]);
  const [activeL1, setActiveL1] = useState(defaults.l1);
  const [activeL2, setActiveL2] = useState<number | null>(defaults.l2);

  const level1 = tree;
  const level2 = level1[activeL1]?.children ?? [];
  const level3 = activeL2 != null ? (level2[activeL2]?.children ?? []) : [];

  function hoverLevel1(index: number) {
    setActiveL1(index);
    const next = level1[index]?.children ?? [];
    setActiveL2(next.length ? firstIndexWithChildren(next) : null);
  }

  function hoverLevel2(index: number) {
    setActiveL2(index);
  }

  return (
    <div
      className={cn('mega-menu-panel', open && 'is-open')}
      role="region"
      aria-labelledby={labelledBy}
      aria-hidden={!open}
    >
      <div className="mega-menu-panel-clip">
        <div className="mega-menu-panel-body">
          <div className="flex w-full min-h-[22rem]">
            <aside className="mega-intro flex w-[32%] shrink-0 flex-col gap-5 px-8 py-9 lg:px-16">
              {intro?.heading ? (
                <h2 className="font-heading text-[2rem] leading-tight font-semibold text-text-primary">
                  {intro.heading}
                </h2>
              ) : null}
              {intro?.description ? (
                <p className="max-w-sm text-sm leading-relaxed text-text-secondary">
                  {intro.description}
                </p>
              ) : null}
              {intro?.pointers.length ? (
                <ul className="mt-2 flex flex-col">
                  {intro.pointers.map((pointer) => (
                    <li
                      key={`${pointer.value}-${pointer.label}`}
                      className="flex items-baseline justify-between gap-6 border-b border-border-subtle py-3 last:border-b-0"
                    >
                      <span className="font-heading text-lg font-semibold text-brand-primary">
                        {pointer.value}
                      </span>
                      <span className="text-sm text-text-secondary">{pointer.label}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </aside>

            <div className="mega-levels grid min-w-0 flex-1 grid-cols-3">
              <MegaLevel nodes={level1} activeIndex={activeL1} onHover={hoverLevel1} delay={0} />
              <MegaLevel
                key={`l2-${activeL1}`}
                nodes={level2}
                activeIndex={activeL2}
                onHover={hoverLevel2}
                delay={40}
              />
              <MegaLevel
                key={`l3-${activeL1}-${activeL2}`}
                nodes={level3}
                activeIndex={null}
                onHover={() => undefined}
                delay={80}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MegaLevel({
  nodes,
  activeIndex,
  onHover,
  delay,
}: {
  nodes: MegaNode[];
  activeIndex: number | null;
  onHover: (index: number) => void;
  delay: number;
}) {
  return (
    <div
      className={cn('mega-level', nodes.length > 0 && 'is-on')}
      style={{ transitionDelay: nodes.length ? `${delay}ms` : '0ms' }}
    >
      {nodes.map((node, index) => (
        <MegaRow
          key={`${node.label}-${index}`}
          node={node}
          active={activeIndex === index}
          onHover={() => onHover(index)}
        />
      ))}
    </div>
  );
}

function MegaRow({
  node,
  active,
  onHover,
}: {
  node: MegaNode;
  active: boolean;
  onHover: () => void;
}) {
  const branched = node.children.length > 0;
  const className = cn('mega-row', active && 'is-active', hasHref(node.href) && 'is-link');

  const inner = (
    <>
      <span className="min-w-0 flex-1 text-left">{node.label}</span>
      {branched ? <ChevronRight className="mega-row-arrow" aria-hidden /> : null}
      <span className="mega-row-underline" aria-hidden />
    </>
  );

  if (hasHref(node.href)) {
    return (
      <MaybeLink href={node.href} className={className} onMouseEnter={onHover} onFocus={onHover}>
        {inner}
      </MaybeLink>
    );
  }

  return (
    <button type="button" className={className} onMouseEnter={onHover} onFocus={onHover}>
      {inner}
    </button>
  );
}
