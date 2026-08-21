import { resolveLink, type CmsLink, type ResolvedLink } from '@/lib/cms/links';
import { getPayloadClient } from '@/lib/payload';
import type { Job } from '@/payload-types';

export type JobDetails = NonNullable<Job['details']>;

export type JobPosting = {
  id: number | string;
  slug: string;
  title: string;
  department: string;
  location: string;
  employmentType: string;
  excerpt: string;
  details: JobDetails | null;
  apply: ResolvedLink;
};

export function jobId(
  value: number | string | { id?: number | string | null } | null | undefined,
): number | string | null {
  if (typeof value === 'number' || typeof value === 'string') {
    return value;
  }

  if (value && typeof value === 'object' && 'id' in value) {
    return value.id ?? null;
  }

  return null;
}

const DEFAULT_APPLY: ResolvedLink = {
  label: 'Apply for this role',
  href: '/contact',
  appearance: 'primary',
  openInNewTab: false,
};

type LexicalTextNode = {
  type: 'text';
  text: string;
  version: 1;
};

type LexicalBlockNode = {
  type: 'heading' | 'paragraph';
  tag?: 'h3';
  children: LexicalTextNode[];
  direction: 'ltr';
  format: '';
  indent: 0;
  version: 1;
};

function textNode(text: string): LexicalTextNode {
  return { type: 'text', text, version: 1 };
}

export function detailsFromSections(
  sections: Array<{ heading: string; body: string }>,
): JobDetails {
  const children: LexicalBlockNode[] = [];

  for (const section of sections) {
    const heading = section.heading.trim();
    const body = section.body.trim();
    if (!heading && !body) {
      continue;
    }

    if (heading) {
      children.push({
        type: 'heading',
        tag: 'h3',
        children: [textNode(heading)],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      });
    }

    if (body) {
      children.push({
        type: 'paragraph',
        children: [textNode(body)],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      });
    }
  }

  return {
    root: {
      type: 'root',
      children,
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  };
}

export function toJobPosting(job: Job): JobPosting {
  return {
    id: job.id,
    slug: job.slug,
    title: job.title?.trim() || 'Open role',
    department: job.department?.trim() || 'GENERAL',
    location: job.location?.trim() || 'India',
    employmentType: job.employmentType?.trim() || 'Full-time',
    excerpt: job.excerpt?.trim() || '',
    details: job.details ?? null,
    apply: resolveLink(job.apply as CmsLink | null) ?? DEFAULT_APPLY,
  };
}

export async function getPublishedJobs(limit = 48): Promise<Job[]> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'jobs',
      limit,
      depth: 1,
      sort: '-publishedAt',
    });

    return result.docs as Job[];
  } catch (error) {
    console.error('[cms] getPublishedJobs failed', error);
    return [];
  }
}

export async function getJobBySlug(slug: string): Promise<Job | null> {
  if (!slug) {
    return null;
  }

  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'jobs',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 1,
    });

    return (result.docs[0] as Job | undefined) ?? null;
  } catch (error) {
    console.error('[cms] getJobBySlug failed', error);
    return null;
  }
}
