'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation.js';
import { Button, useDocumentEvents, useListQuery } from '@payloadcms/ui';
import type { Where } from 'payload';

import { LEAD_STATUSES, type LeadStatus } from '@/lib/cms/leads';

function statusFromWhere(where: Where | undefined): LeadStatus | null {
  if (!where || typeof where !== 'object' || Array.isArray(where)) {
    return null;
  }

  const direct = (where as { status?: { equals?: unknown } }).status?.equals;
  if (typeof direct === 'string' && LEAD_STATUSES.some((item) => item.value === direct)) {
    return direct as LeadStatus;
  }

  return null;
}

async function countByStatus(status: LeadStatus): Promise<number> {
  const params = new URLSearchParams({
    limit: '1',
    depth: '0',
  });
  params.set('where[status][equals]', status);
  const response = await fetch(`/api/leads?${params.toString()}`, {
    credentials: 'include',
  });
  if (!response.ok) {
    return 0;
  }
  const json = (await response.json()) as { totalDocs?: number };
  return json.totalDocs ?? 0;
}

export function LeadStatusTabs() {
  const { handleWhereChange, query } = useListQuery();
  const { mostRecentUpdate } = useDocumentEvents();
  const router = useRouter();
  const searchParams = useSearchParams();
  const didDefaultFilter = useRef(false);
  const [counts, setCounts] = useState<Record<LeadStatus, number>>({
    new: 0,
    contacted: 0,
    closed: 0,
  });

  const active = statusFromWhere(query.where) ?? 'new';
  const staleNotFound = searchParams.get('notFound');

  useEffect(() => {
    let cancelled = false;

    void Promise.all(LEAD_STATUSES.map((item) => countByStatus(item.value))).then(
      ([newCount, contactedCount, closedCount]) => {
        if (!cancelled) {
          setCounts({
            new: newCount,
            contacted: contactedCount,
            closed: closedCount,
          });
        }
      },
    );

    return () => {
      cancelled = true;
    };
  }, [mostRecentUpdate, (query.data as { totalDocs?: number } | undefined)?.totalDocs]);

  useEffect(() => {
    if (staleNotFound) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete('notFound');
      const next = params.toString();
      router.replace(next ? `?${next}` : '?');
      return;
    }

    if (didDefaultFilter.current) {
      return;
    }

    if (!statusFromWhere(query.where)) {
      didDefaultFilter.current = true;
      void handleWhereChange?.({ status: { equals: 'new' } });
      return;
    }

    didDefaultFilter.current = true;
  }, [handleWhereChange, query.where, router, searchParams, staleNotFound]);

  const tabs = useMemo(
    () =>
      LEAD_STATUSES.map((item) => ({
        ...item,
        count: counts[item.value],
      })),
    [counts],
  );

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
        marginBottom: '1rem',
      }}
    >
      {tabs.map((tab) => {
        const selected = active === tab.value;
        return (
          <Button
            key={tab.value}
            type="button"
            size="small"
            buttonStyle={selected ? 'primary' : 'secondary'}
            onClick={() => {
              void handleWhereChange?.({ status: { equals: tab.value } });
            }}
          >
            {tab.label} ({tab.count})
          </Button>
        );
      })}
    </div>
  );
}
