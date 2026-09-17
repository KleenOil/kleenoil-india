export function HeroOilSvg({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 220" className={className} aria-hidden fill="none">
      <circle cx="110" cy="110" r="96" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1" />
      <circle
        cx="110"
        cy="110"
        r="72"
        className="services-ring-spin origin-center"
        stroke="currentColor"
        strokeOpacity="0.35"
        strokeWidth="1.25"
        strokeDasharray="6 10"
      />
      <path
        d="M110 38 C148 38 172 72 172 110 C172 148 148 182 110 182 C72 182 48 148 48 110 C48 72 72 38 110 38"
        className="services-oil-dash"
        stroke="currentColor"
        strokeOpacity="0.55"
        strokeWidth="1.5"
        strokeDasharray="8 14"
      />
      <circle r="5" fill="currentColor">
        <animateMotion dur="6.4s" repeatCount="indefinite" rotate="auto">
          <mpath href="#services-hero-loop" />
        </animateMotion>
      </circle>
      <path
        id="services-hero-loop"
        d="M110 46 C142 46 164 74 164 110 C164 146 142 174 110 174 C78 174 56 146 56 110 C56 74 78 46 110 46"
        className="opacity-0"
      />
      <circle cx="110" cy="110" r="18" fill="currentColor" fillOpacity="0.16" />
      <circle cx="110" cy="110" r="8" className="services-core-pulse" fill="currentColor" />
    </svg>
  );
}
