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

type ExtraMember = {
  name?: string | null;
  role?: string | null;
};

export type TeamBlockData = {
  blockType: 'team';
  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;
  members?: TeamMember[] | null;
  showExtraMembers?: boolean | null;
  extraHeading?: string | null;
  extraMembers?: ExtraMember[] | null;
};

type TeamBlockProps = {
  block?: TeamBlockData | null;
};

export function TeamBlock({ block }: TeamBlockProps) {
  const eyebrow = block?.eyebrow || DEFAULT_TEAM.eyebrow;
  const heading = block?.heading || DEFAULT_TEAM.heading;
  const description = block?.description || DEFAULT_TEAM.description;
  const extraHeading = block?.extraHeading || DEFAULT_TEAM.extraHeading;
  const showExtraMembers = block?.showExtraMembers ?? !block;

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

  const cmsExtraMembers =
    block?.extraMembers
      ?.filter((member) => member.name && member.role)
      .map((member) => ({
        name: member.name!,
        role: member.role!,
      })) ?? [];

  const extraMembers = cmsExtraMembers.length > 0 ? cmsExtraMembers : DEFAULT_TEAM.extraMembers;

  return (
    <section className="border-y border-border-subtle bg-surface">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-6 py-16 lg:gap-16 lg:px-[100px] lg:py-[140px]">
        <SectionHeader eyebrow={eyebrow} heading={heading} description={description} />

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {members.map((member, index) => (
            <TeamCard key={`${member.name}-${index}`} member={member} />
          ))}
        </div>

        {showExtraMembers && extraMembers.length > 0 ? (
          <div className="flex flex-col gap-5">
            {extraHeading ? (
              <p className="font-mono text-[11px] font-medium tracking-[1.4px] text-text-tertiary uppercase">
                {extraHeading}
              </p>
            ) : null}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {extraMembers.map((member, index) => (
                <article
                  key={`${member.name}-${index}`}
                  data-reveal-item
                  className="rounded-xl border border-border-subtle bg-surface-elevated px-5 py-4"
                >
                  <h3 className="font-heading text-base font-bold tracking-tight text-text-primary">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-sm leading-snug text-text-secondary">{member.role}</p>
                </article>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
