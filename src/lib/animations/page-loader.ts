type GsapInstance = typeof import('gsap').default;

export type PageLoaderTimeline = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  eventCallback: (...args: any[]) => unknown;
  kill: () => void;
  progress: (value?: number) => number;
  [key: string]: unknown;
};

type LoaderScope = {
  root: HTMLElement;
  reduced: boolean;
  fadeMs?: number;
};

type ProgressScope = {
  root: HTMLElement;
  progress: number;
};

let gsapModule: GsapInstance | null = null;
let gsapPromise: Promise<GsapInstance> | null = null;

async function loadGsap(): Promise<GsapInstance> {
  if (gsapModule) {
    return gsapModule;
  }

  if (!gsapPromise) {
    gsapPromise = import('gsap').then((mod) => {
      gsapModule = mod.default;
      return gsapModule;
    });
  }

  return gsapPromise;
}

/** Warm the GSAP chunk so the first navigation does not race the dynamic import. */
export function preloadPageLoaderGsap(): void {
  void loadGsap();
}

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

  return Math.min(1.2, Math.max(0.35, (fadeMs ?? 700) / 1000));
}

export function killLoaderTweens(root: HTMLElement) {
  if (!gsapModule) {
    return;
  }

  gsapModule.killTweensOf(root.querySelectorAll('[data-loader]'));
  gsapModule.killTweensOf(root);
}

export function setLoaderProgress({ root, progress }: ProgressScope) {
  const fill = select(root, 'fill');
  if (!fill || !gsapModule) {
    if (fill) {
      fill.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
      fill.style.transformOrigin = 'left center';
    }
    return;
  }

  gsapModule.to(fill, {
    scaleX: Math.min(1, Math.max(0, progress)),
    duration: 0.28,
    ease: 'sine.out',
    overwrite: 'auto',
    transformOrigin: 'left center',
  });
}

export async function playLoaderIn({
  root,
  reduced,
  fadeMs,
}: LoaderScope): Promise<PageLoaderTimeline> {
  const gsap = await loadGsap();
  killLoaderTweens(root);

  const fill = select(root, 'fill');
  const dots = selectAll(root, 'dot');
  const pulse = select(root, 'pulse');
  const duration = fadeSeconds(fadeMs, reduced);

  gsap.set(root, { pointerEvents: 'auto', visibility: 'visible' });
  gsap.set(fill, { scaleX: 0.08, transformOrigin: 'left center' });
  const dotColors = ['#006633', '#A8C3B2', '#C3D7CB'];
  dots.forEach((dot, index) => {
    gsap.set(dot, { opacity: 1, backgroundColor: dotColors[index] ?? '#C3D7CB' });
  });

  // Attach onComplete via constructor so it cannot be missed if the timeline
  // finishes before the caller's .then() attaches a callback.
  const tl = gsap.timeline({
    defaults: { force3D: true },
  });

  tl.fromTo(root, { autoAlpha: 0 }, { autoAlpha: 1, duration, ease: 'sine.inOut' }, 0);

  tl.add(() => {
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

  return tl as unknown as PageLoaderTimeline;
}

export async function playLoaderOut({
  root,
  reduced,
  fadeMs,
}: LoaderScope): Promise<PageLoaderTimeline> {
  const gsap = await loadGsap();
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
    { scaleX: 1, duration: Math.min(0.28, duration * 0.4), ease: 'sine.out', overwrite: true },
    0,
  );
  tl.to(root, { autoAlpha: 0, pointerEvents: 'none', duration, ease: 'sine.inOut' }, 0.06);

  return tl as unknown as PageLoaderTimeline;
}

/** Instant hard hide — used as a safety net when animations stall. */
export function hardHideLoader(root: HTMLElement) {
  killLoaderTweens(root);
  root.style.opacity = '0';
  root.style.visibility = 'hidden';
  root.style.pointerEvents = 'none';
  root.setAttribute('aria-hidden', 'true');
  root.setAttribute('data-state', 'idle');
  root.setAttribute('aria-busy', 'false');
}
