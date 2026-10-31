import type { LegalDocument as LegalDocumentType } from '@/lib/legal/content';

type LegalDocumentProps = {
  document: LegalDocumentType;
};

export function LegalDocument({ document }: LegalDocumentProps) {
  return (
    <article className="mx-auto w-full max-w-[800px] px-6 py-16 lg:px-10 lg:py-24">
      <header className="space-y-4 border-b border-border-subtle pb-10">
        <p className="font-mono text-[11px] font-bold tracking-[1.4px] text-text-secondary uppercase">
          Legal · Last updated {document.lastUpdated}
        </p>
        <h1 className="font-heading text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
          {document.title}
        </h1>
        <p className="text-base leading-relaxed text-text-secondary">{document.description}</p>
      </header>

      <div className="mt-10 space-y-6 text-[15px] leading-relaxed text-text-secondary">
        {document.intro.map((paragraph) => (
          <p key={paragraph.slice(0, 48)}>{paragraph}</p>
        ))}
      </div>

      <div className="mt-12 space-y-10">
        {document.sections.map((section) => (
          <section key={section.heading} className="space-y-4">
            <h2 className="font-heading text-xl font-bold text-text-primary">{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 48)}
                className="text-[15px] leading-relaxed text-text-secondary"
              >
                {paragraph}
              </p>
            ))}
            {section.bullets?.length ? (
              <ul className="list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-text-secondary">
                {section.bullets.map((item) => (
                  <li key={item.slice(0, 48)}>{item}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </div>

      <p className="mt-14 border-t border-border-subtle pt-8 text-sm leading-relaxed text-text-secondary">
        {document.footerNote}
      </p>
    </article>
  );
}
