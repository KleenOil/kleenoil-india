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
        <div data-reveal-part className="rich-content mx-auto max-w-3xl">
          <RichText data={block.content} />
        </div>
      </div>
    </section>
  );
}
