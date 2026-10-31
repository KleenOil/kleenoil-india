import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

import { CMS_CACHE_TAGS, type CmsCacheTag } from '@/lib/cms/cache';

export const dynamic = 'force-dynamic';

const ALLOWED_TAGS = new Set<string>(Object.values(CMS_CACHE_TAGS));

type RevalidateBody = {
  secret?: string;
  tags?: string[];
  paths?: string[];
};

function authorized(secret: string | null | undefined): boolean {
  const expected = process.env.REVALIDATE_SECRET?.trim();
  if (!expected || expected.length < 16) {
    return false;
  }

  return Boolean(secret && secret === expected);
}

export async function POST(request: Request) {
  let body: RevalidateBody = {};

  try {
    body = (await request.json()) as RevalidateBody;
  } catch {
    body = {};
  }

  const headerSecret = request.headers.get('x-revalidate-secret');
  const secret = body.secret ?? headerSecret;

  if (!authorized(secret)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const tags = (body.tags ?? []).filter((tag): tag is CmsCacheTag => ALLOWED_TAGS.has(tag));
  const paths = (body.paths ?? []).filter(
    (path) => typeof path === 'string' && path.startsWith('/'),
  );

  for (const tag of tags) {
    revalidateTag(tag, 'max');
  }

  for (const path of paths) {
    revalidatePath(path);
  }

  if (!tags.length && !paths.length) {
    for (const tag of Object.values(CMS_CACHE_TAGS)) {
      revalidateTag(tag, 'max');
    }
    revalidatePath('/', 'layout');
  }

  return NextResponse.json({
    revalidated: true,
    tags: tags.length ? tags : Object.values(CMS_CACHE_TAGS),
    paths,
    now: Date.now(),
  });
}
