export type MotionConfig = {
  yHeader: number;
  yItem: number;
  duration: number;
  staggerHeader: number;
  staggerItem: number;
};

/** Delay between each card/box fade-up within a section. */
const ITEM_STAGGER_GAP = 0.35;

export function getMotionConfig(): MotionConfig {
  if (typeof window === 'undefined') {
    return {
      yHeader: 28,
      yItem: 20,
      duration: 0.75,
      staggerHeader: 0.07,
      staggerItem: ITEM_STAGGER_GAP,
    };
  }

  const isMobile = window.matchMedia('(max-width: 767px)').matches;

  return {
    yHeader: isMobile ? 16 : 30,
    yItem: isMobile ? 12 : 22,
    duration: isMobile ? 0.6 : 0.78,
    staggerHeader: isMobile ? 0.05 : 0.08,
    staggerItem: ITEM_STAGGER_GAP,
  };
}

export const REVEAL_EASE = 'power3.out';
export const REVEAL_EASE_SOFT = 'power2.out';
