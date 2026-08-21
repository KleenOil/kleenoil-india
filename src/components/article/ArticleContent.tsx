import { RichText } from '@payloadcms/richtext-lexical/react';
import type { JSX } from 'react';

import { nodePlainText, uniqueHeadingId } from '@/lib/cms/article-content';
import type { Post } from '@/payload-types';

type ArticleContentProps = {
  content: NonNullable<Post['content']>;
};

export function ArticleContent({ content }: ArticleContentProps) {
  const seen = new Map<string, number>();

  return (
    <div className="article-prose rich-content">
      <RichText
        data={content}
        disableContainer
        converters={({ defaultConverters }) => ({
          ...defaultConverters,
          heading: ({ node, nodesToJSX }) => {
            const Tag = node.tag as keyof JSX.IntrinsicElements;
            const children = nodesToJSX({ nodes: node.children });
            const id = uniqueHeadingId(nodePlainText(node), seen);

            return (
              <Tag id={id} className="scroll-mt-28">
                {children}
              </Tag>
            );
          },
        })}
      />
    </div>
  );
}
