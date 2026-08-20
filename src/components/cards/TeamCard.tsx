import Image from 'next/image';

import { cn } from '@/lib/utils';

export type TeamMemberData = {
  name: string;
  role: string;
  imageUrl?: string | null;
  imageAlt?: string;
};

type TeamCardProps = {
  member: TeamMemberData;
  className?: string;
};

export function TeamCard({ member, className }: TeamCardProps) {
  return (
    <article data-reveal-item className={cn('flex flex-col gap-4', className)}>
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-brand-dim bg-brand-soft">
        {member.imageUrl ? (
          <Image
            src={member.imageUrl}
            alt={member.imageAlt || member.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-brand-soft to-surface">
            <span className="font-heading text-3xl font-bold text-brand-deep md:text-4xl">
              {member.name.charAt(0)}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="font-heading text-lg font-bold tracking-tight text-text-primary md:text-xl">
          {member.name}
        </h3>
        <p className="text-[13px] leading-snug tracking-wide text-text-secondary uppercase">
          {member.role}
        </p>
      </div>
    </article>
  );
}
