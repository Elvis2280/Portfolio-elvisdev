import { gsap } from './config';

export function createAstronautAnimation(element: HTMLElement | null) {
  if (!element) return null;

  const tl = gsap.timeline();

  // Phase 1: Entrance — fade in from above
  tl.from(element, {
    y: -100,
    opacity: 0,
    duration: 5,
    ease: 'power2.out',
  });

  // Phase 2: Float loop — gentle bob + subtle scale
  tl.to(element, {
    y: -20,
    scale: 1.05,
    duration: 2.5,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
  });

  return tl;
}
