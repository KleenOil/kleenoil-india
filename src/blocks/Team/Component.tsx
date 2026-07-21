import { TeamCard } from '@/components/cards/TeamCard';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { DEFAULT_TEAM } from '@/lib/cms/defaults';
import { getMediaAlt, getMediaUrl } from '@/lib/cms/links';
import type { Media } from '@/payload-types';

type TeamMember = {
  name?: string | null;
  role?: string | null;
  photo?: number | Media | null;
};

export type TeamBlockData = {
  blockType: 'team';
  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;
  members?: TeamMember[] | null;
};

type TeamBlockProps = {
  block?: TeamBlockData | null;
};

export function TeamBlock({ block }: TeamBlockProps) {
  const eyebrow = block?.eyebrow || DEFAULT_TEAM.eyebrow;
  const heading = block?.heading || DEFAULT_TEAM.heading;
  const description = block?.description || DEFAULT_TEAM.description;

  const cmsMembers =
    block?.members
      ?.filter((member) => member.name && member.role)
      .map((member) => ({
        name: member.name!,
        role: member.role!,
        imageUrl: getMediaUrl(member.photo),
        imageAlt: getMediaAlt(member.photo, member.name || 'Team member'),
      })) ?? [];

  const members = cmsMembers.length > 0 ? cmsMembers : DEFAULT_TEAM.members;

  return (
    <section className="border-y border-border-subtle bg-surface">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-6 py-16 lg:gap-20 lg:px-[100px] lg:py-[140px]">
        <SectionHeader eyebrow={eyebrow} heading={heading} description={description} />

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {members.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
