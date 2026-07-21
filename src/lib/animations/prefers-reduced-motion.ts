/** True when the user prefers reduced motion (SSR-safe default: no motion). */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') {
    return true;
  }

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
