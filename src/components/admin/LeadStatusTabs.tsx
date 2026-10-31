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

async function fetchStatusCounts(): Promise<Record<LeadStatus, number>> {
  const response = await fetch('/api/leads/status-counts', {
    credentials: 'include',
  });
  if (!response.ok) {
    return { new: 0, contacted: 0, closed: 0 };
  }
  const json = (await response.json()) as Partial<Record<LeadStatus, number>>;
  return {
    new: json.new ?? 0,
    contacted: json.contacted ?? 0,
    closed: json.closed ?? 0,
  };
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
  const listTotalDocs = (query.data as { totalDocs?: number } | undefined)?.totalDocs;

  useEffect(() => {
    let cancelled = false;

    void fetchStatusCounts().then((next) => {
      if (!cancelled) {
        setCounts(next);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [mostRecentUpdate, listTotalDocs]);

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
