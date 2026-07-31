import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { buildConfig } from 'payload';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

import { Media } from './collections/Media';
import { Pages } from './collections/Pages';
import { Products } from './collections/Products';
import { ProductTemplates } from './collections/ProductTemplates';
import { Users } from './collections/Users';
import { ContactInfo } from './globals/ContactInfo';
import { Footer } from './globals/Footer';
import { Navigation } from './globals/Navigation';
import { SeoDefaults } from './globals/SeoDefaults';
import { SiteSettings } from './globals/SiteSettings';
import { getServerEnv } from './lib/env';
import { ensureDefaultProductTemplate } from './lib/cms/seed-product-template';
import { getStoragePlugins } from './lib/storage/plugins';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const env = getServerEnv();

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' | CMS',
    },
  },
  collections: [Users, Media, Pages, ProductTemplates, Products],
  globals: [SiteSettings, Navigation, Footer, ContactInfo, SeoDefaults],
  editor: lexicalEditor(),
  secret: env.PAYLOAD_SECRET,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: env.DATABASE_URL,
    },
  }),
  sharp,
  plugins: [...getStoragePlugins(env)],
  onInit: async (payload) => {
    try {
      await ensureDefaultProductTemplate(payload);
    } catch (error) {
      payload.logger.warn(
        `Could not seed default Product Template: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  },
});
