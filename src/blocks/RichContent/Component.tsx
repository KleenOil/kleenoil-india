import { RichText } from '@payloadcms/richtext-lexical/react';

import type { ContactInfo } from '@/payload-types';

type LexicalContent = NonNullable<ContactInfo['businessHours']>;

export type RichContentBlockData = {
  blockType: 'rich-content';
  content?: LexicalContent | null;
};

type RichContentBlockProps = {
  block?: RichContentBlockData | null;
};

export function RichContentBlock({ block }: RichContentBlockProps) {
  if (!block?.content) {
    return null;
  }

  return (
    <section className="bg-background">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-16 lg:px-[100px] lg:py-24">
        <div
          data-reveal-part
          className="rich-content mx-auto max-w-3xl text-base leading-relaxed text-text-secondary [&_a]:font-semibold [&_a]:text-brand-primary [&_h2]:mb-4 [&_h2]:font-heading [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:text-text-primary [&_h3]:mb-3 [&_h3]:font-heading [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:text-text-primary [&_li]:my-1 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:my-4 [&_strong]:font-semibold [&_strong]:text-text-primary [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6"
        >
          <RichText data={block.content} />
        </div>
      </div>
    </section>
  );
}
