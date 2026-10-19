import gsap from 'gsap';

export type PageLoaderTimeline = ReturnType<typeof gsap.timeline>;

type LoaderScope = {
  root: HTMLElement;
  reduced: boolean;
  fadeMs?: number;
};

function select(root: HTMLElement, name: string): HTMLElement | null {
  return root.querySelector(`[data-loader="${name}"]`);
}

function selectAll(root: HTMLElement, name: string): HTMLElement[] {
  return Array.from(root.querySelectorAll(`[data-loader="${name}"]`));
}

function fadeSeconds(fadeMs: number | undefined, reduced: boolean) {
  if (reduced) {
    return 0.2;
  }

  return Math.min(2, Math.max(0.4, (fadeMs ?? 700) / 1000));
}

export function killLoaderTweens(root: HTMLElement) {
  gsap.killTweensOf(root.querySelectorAll('[data-loader]'));
  gsap.killTweensOf(root);
}

export function playLoaderIn({ root, reduced, fadeMs }: LoaderScope): PageLoaderTimeline {
  killLoaderTweens(root);

  const fill = select(root, 'fill');
  const dots = selectAll(root, 'dot');
  const pulse = select(root, 'pulse');
  const duration = fadeSeconds(fadeMs, reduced);
  const tl = gsap.timeline({ defaults: { force3D: true } });

  gsap.set(root, { pointerEvents: 'auto' });
  gsap.set(fill, { scaleX: 0.12, transformOrigin: 'left center' });
  const dotColors = ['#006633', '#A8C3B2', '#C3D7CB'];
  dots.forEach((dot, index) => {
    gsap.set(dot, { opacity: 1, backgroundColor: dotColors[index] ?? '#C3D7CB' });
  });

  tl.fromTo(root, { autoAlpha: 0 }, { autoAlpha: 1, duration, ease: 'sine.inOut' }, 0);

  tl.add(() => {
    if (fill) {
      gsap.to(fill, {
        scaleX: 0.82,
        duration: 8,
        ease: 'none',
        overwrite: 'auto',
      });
    }

    if (pulse) {
      gsap.to(pulse, {
        opacity: 0.35,
        duration: 0.9,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }

    dots.forEach((dot, index) => {
      gsap.to(dot, {
        opacity: 0.28,
        duration: 0.7,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: index * 0.22,
      });
    });
  }, 0.05);

  return tl;
}

export function playLoaderOut({ root, reduced, fadeMs }: LoaderScope): PageLoaderTimeline {
  const fill = select(root, 'fill');
  const dots = selectAll(root, 'dot');
  const pulse = select(root, 'pulse');

  if (pulse) {
    gsap.killTweensOf(pulse);
    gsap.set(pulse, { opacity: 1 });
  }
  gsap.killTweensOf(fill);
  gsap.killTweensOf(dots);
  gsap.set(dots, { opacity: 1, backgroundColor: '#006633' });

  const duration = fadeSeconds(fadeMs, reduced);
  const tl = gsap.timeline({ defaults: { force3D: true } });

  tl.to(
    fill,
    { scaleX: 1, duration: Math.min(0.35, duration * 0.4), ease: 'sine.out', overwrite: true },
    0,
  );
  tl.to(root, { autoAlpha: 0, pointerEvents: 'none', duration, ease: 'sine.inOut' }, 0.08);

  return tl;
}
