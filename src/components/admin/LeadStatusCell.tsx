'use client';

import type { DefaultCellComponentProps } from 'payload';
import { toast, useDocumentEvents, useListQuery } from '@payloadcms/ui';

import { LEAD_STATUSES, type LeadStatus } from '@/lib/cms/leads';

export function LeadStatusCell({ cellData, rowData }: DefaultCellComponentProps) {
  const { refineListData } = useListQuery();
  const { reportUpdate } = useDocumentEvents();
  const current = typeof cellData === 'string' ? cellData : 'new';

  async function handleChange(status: LeadStatus) {
    if (status === current) {
      return;
    }

    const response = await fetch(`/api/leads/${rowData.id}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      toast.error('Could not update status.');
      return;
    }

    reportUpdate({
      id: String(rowData.id),
      entitySlug: 'leads',
      operation: 'update',
      updatedAt: new Date().toISOString(),
    });
    await refineListData?.({});
  }

  return (
    <select
      value={current}
      onChange={(event) => {
        void handleChange(event.target.value as LeadStatus);
      }}
      onClick={(event) => event.stopPropagation()}
      aria-label="Lead status"
      style={{
        maxWidth: '100%',
        padding: '0.25rem 0.4rem',
        borderRadius: 4,
        border: '1px solid var(--theme-elevation-150)',
        background: 'var(--theme-input-bg)',
        color: 'var(--theme-text)',
      }}
    >
      {LEAD_STATUSES.map((item) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
}
