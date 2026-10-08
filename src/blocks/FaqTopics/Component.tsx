import { FaqTopics } from '@/components/library/FaqTopics';
import { blockHasCmsData, cmsList } from '@/lib/cms/block-content';
import { DEFAULT_FAQ_TOPICS, type FaqTopic } from '@/lib/cms/library';

type FaqItem = { question?: string | null; answer?: string | null; defaultOpen?: boolean | null };
type TopicRow = { label?: string | null; items?: FaqItem[] | null };

export type FaqTopicsBlockData = {
  blockType: 'faq-topics';
  topics?: TopicRow[] | null;
};

export function FaqTopicsBlock({ block }: { block?: FaqTopicsBlockData | null }) {
  const hasCms = blockHasCmsData(block);
  const topics: FaqTopic[] = cmsList(block?.topics, DEFAULT_FAQ_TOPICS.topics, hasCms, (topic) =>
    Boolean(topic.label),
  )
    .map((topic) => ({
      label: topic.label as string,
      items: (topic.items ?? []).filter((item): item is FaqTopic['items'][number] =>
        Boolean(item.question && item.answer),
      ),
    }))
    .filter((topic) => topic.items.length > 0);

  return <FaqTopics topics={topics} />;
}
