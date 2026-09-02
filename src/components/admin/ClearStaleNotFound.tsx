'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation.js';

/** Payload leaves ?notFound=id on the list after a failed document open. */
export function ClearStaleNotFound() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!searchParams.get('notFound')) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    params.delete('notFound');
    const next = params.toString();
    router.replace(next ? `?${next}` : '?');
  }, [router, searchParams]);

  return null;
}
