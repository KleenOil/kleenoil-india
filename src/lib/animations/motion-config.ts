export type MotionConfig = {
  yHeader: number;
  yItem: number;
  duration: number;
  staggerHeader: number;
  staggerItem: number;
};

export function getMotionConfig(): MotionConfig {
  if (typeof window === 'undefined') {
    return {
      yHeader: 28,
      yItem: 20,
      duration: 0.75,
      staggerHeader: 0.07,
      staggerItem: 0.05,
    };
  }

  const isMobile = window.matchMedia('(max-width: 767px)').matches;

  return {
    yHeader: isMobile ? 16 : 30,
    yItem: isMobile ? 12 : 22,
    duration: isMobile ? 0.6 : 0.78,
    staggerHeader: isMobile ? 0.05 : 0.08,
    staggerItem: isMobile ? 0.04 : 0.055,
  };
}

export const REVEAL_EASE = 'power3.out';
export const REVEAL_EASE_SOFT = 'power2.out';
