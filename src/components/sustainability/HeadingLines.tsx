type HeadingLinesProps = {
  text: string;
  className?: string;
};

export function HeadingLines({ text, className }: HeadingLinesProps) {
  return (
    <>
      {text.split('\n').map((line, index) => (
        <span key={`${line}-${index}`} data-reveal-part className={className}>
          {line}
        </span>
      ))}
    </>
  );
}
