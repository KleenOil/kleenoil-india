import { z } from 'zod';

const nodeEnvSchema = z.enum(['development', 'test', 'production']);
const storageProviderSchema = z.enum(['local', 'cloudinary', 's3']);
const emailProviderSchema = z.enum(['resend', 'smtp']);
const searchProviderSchema = z.enum(['postgres', 'meilisearch', 'algolia']);

/** Treat empty strings as undefined for optional env vars. */
function optionalString() {
  return z
    .string()
    .optional()
    .transform((value) => (value === '' || value === undefined ? undefined : value));
}

let hasWarnedProdConfig = false;

const serverEnvSchema = z
  .object({
    NODE_ENV: nodeEnvSchema.default('development'),
    PORT: z.coerce.number().int().positive().default(3000),
    DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
    PAYLOAD_SECRET: z.string().min(32, 'PAYLOAD_SECRET must be at least 32 characters'),
    PAYLOAD_ADMIN_ROUTE: z.string().startsWith('/').default('/admin'),
    STORAGE_PROVIDER: storageProviderSchema.optional(),
    MEDIA_ROOT: z.string().default('./media'),
    CLOUDINARY_CLOUD_NAME: optionalString(),
    CLOUDINARY_API_KEY: optionalString(),
    CLOUDINARY_API_SECRET: optionalString(),
    S3_BUCKET: optionalString(),
    S3_REGION: optionalString(),
    S3_ACCESS_KEY_ID: optionalString(),
    S3_SECRET_ACCESS_KEY: optionalString(),
    S3_ENDPOINT: optionalString(),
    EMAIL_PROVIDER: emailProviderSchema.default('resend'),
    EMAIL_FROM: z.string().email().default('noreply@example.com'),
    EMAIL_TO_SALES: z.string().min(1).default('sales@example.com'),
    RESEND_API_KEY: optionalString(),
    SMTP_HOST: optionalString(),
    SMTP_PORT: z.coerce.number().int().positive().default(587),
    SMTP_USER: optionalString(),
    SMTP_PASS: optionalString(),
    TURNSTILE_SECRET_KEY: optionalString(),
    REVALIDATE_SECRET: optionalString(),
    RATE_LIMIT_MAX: z.coerce.number().int().positive().default(10),
    RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(60_000),
    SEARCH_PROVIDER: searchProviderSchema.default('postgres'),
    MEILISEARCH_HOST: optionalString(),
    MEILISEARCH_API_KEY: optionalString(),
    ALGOLIA_APP_ID: optionalString(),
    ALGOLIA_API_KEY: optionalString(),
    ALGOLIA_INDEX_NAME: optionalString(),
    ENABLE_GRAPHQL: z
      .enum(['true', 'false'])
      .default('false')
      .transform((value) => value === 'true'),
  })
  .transform((env) => {
    const hasCloudinary = Boolean(
      env.CLOUDINARY_CLOUD_NAME && env.CLOUDINARY_API_KEY && env.CLOUDINARY_API_SECRET,
    );
    const storageProvider =
      env.STORAGE_PROVIDER ?? (process.env.VERCEL || hasCloudinary ? 'cloudinary' : 'local');

    return {
      ...env,
      STORAGE_PROVIDER: storageProvider,
    };
  })
  .superRefine((env, ctx) => {
    // Always validate storage credentials when a cloud provider is selected
    // (including during Vercel builds).
    if (env.STORAGE_PROVIDER === 'cloudinary') {
      if (!env.CLOUDINARY_CLOUD_NAME || !env.CLOUDINARY_API_KEY || !env.CLOUDINARY_API_SECRET) {
        ctx.addIssue({
          code: 'custom',
          path: ['STORAGE_PROVIDER'],
          message: 'Cloudinary credentials are required when STORAGE_PROVIDER=cloudinary',
        });
      }
    }

    if (env.STORAGE_PROVIDER === 's3') {
      if (!env.S3_BUCKET || !env.S3_REGION || !env.S3_ACCESS_KEY_ID || !env.S3_SECRET_ACCESS_KEY) {
        ctx.addIssue({
          code: 'custom',
          path: ['STORAGE_PROVIDER'],
          message: 'S3 credentials are required when STORAGE_PROVIDER=s3',
        });
      }
    }

    // Vercel has no persistent disk — local uploads will always fail there.
    if (process.env.VERCEL && env.STORAGE_PROVIDER === 'local') {
      ctx.addIssue({
        code: 'custom',
        path: ['STORAGE_PROVIDER'],
        message:
          'STORAGE_PROVIDER=local is not supported on Vercel. Set STORAGE_PROVIDER=cloudinary (or s3) and credentials.',
      });
    }

    // Production quality checks are surfaced as warnings only.
    // Making them hard errors used to blow up `getServerEnv()` on any request
    // where these secrets weren't set — which took down the admin panel and
    // frontend rendering with a blank / black screen on Vercel.
    if (!shouldEnforceProductionRules()) {
      return;
    }

    const warnings: string[] = [];
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    if (!siteUrl?.startsWith('https://')) {
      warnings.push('NEXT_PUBLIC_SITE_URL should use HTTPS in production');
    }
    if (!env.REVALIDATE_SECRET || env.REVALIDATE_SECRET.length < 32) {
      warnings.push(
        'REVALIDATE_SECRET should be at least 32 characters (only needed if you use /api/revalidate)',
      );
    }
    if (env.EMAIL_PROVIDER === 'resend' && !env.RESEND_API_KEY) {
      warnings.push('RESEND_API_KEY is missing — email sending will fail until it is set');
    }
    if (env.EMAIL_PROVIDER === 'smtp' && (!env.SMTP_HOST || !env.SMTP_USER || !env.SMTP_PASS)) {
      warnings.push('SMTP credentials are incomplete — email sending will fail until they are set');
    }

    if (warnings.length && typeof console !== 'undefined' && !hasWarnedProdConfig) {
      hasWarnedProdConfig = true;
      for (const message of warnings) {
        console.warn(`[env] ${message}`);
      }
    }
  });

const clientEnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url('NEXT_PUBLIC_SITE_URL must be a valid URL'),
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: optionalString(),
  NEXT_PUBLIC_GA_MEASUREMENT_ID: optionalString(),
});

/** Whether strict production env rules should be enforced (not during `next build`). */
function shouldEnforceProductionRules(): boolean {
  return (
    process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE !== 'phase-production-build'
  );
}

export type ServerEnv = z.infer<typeof serverEnvSchema>;
export type ClientEnv = z.infer<typeof clientEnvSchema>;

let cachedServerEnv: ServerEnv | null = null;
let cachedClientEnv: ClientEnv | null = null;

function formatZodError(error: z.ZodError): string {
  return error.issues
    .map((issue) => `  - ${issue.path.join('.') || 'env'}: ${issue.message}`)
    .join('\n');
}

export function getServerEnv(): ServerEnv {
  if (cachedServerEnv) {
    return cachedServerEnv;
  }

  const result = serverEnvSchema.safeParse({
    ...process.env,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  });

  if (!result.success) {
    throw new Error(`Invalid server environment variables:\n${formatZodError(result.error)}`);
  }

  cachedServerEnv = result.data;
  return cachedServerEnv;
}

export function getClientEnv(): ClientEnv {
  if (cachedClientEnv) {
    return cachedClientEnv;
  }

  const result = clientEnvSchema.safeParse({
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
    NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  });

  if (!result.success) {
    throw new Error(`Invalid client environment variables:\n${formatZodError(result.error)}`);
  }

  cachedClientEnv = result.data;
  return cachedClientEnv;
}

/** Validate all environment variables at application startup. */
export function validateEnv(): void {
  getClientEnv();
  getServerEnv();
}

export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}

export function isTurnstileEnabled(): boolean {
  const client = getClientEnv();
  const server = getServerEnv();
  return Boolean(client.NEXT_PUBLIC_TURNSTILE_SITE_KEY && server.TURNSTILE_SECRET_KEY);
}

/** Reset cached env (for tests only). */
export function resetEnvCache(): void {
  cachedServerEnv = null;
  cachedClientEnv = null;
}
