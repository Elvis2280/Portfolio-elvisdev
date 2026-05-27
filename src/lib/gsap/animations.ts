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

export function createEstrellaAnimation(containerRef: HTMLElement | null) {
  if (!containerRef) return null;

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    tl.to(
      '#particula_animation',
      {
        x: 80,
        y: -40,
        duration: 5,
        ease: 'bounce.inOut',
      },
      0,
    );

    tl.to(
      '#cuerpo',
      {
        scale: 1.1,
        duration: 5,
        ease: 'none',
      },
      0,
    );
  }, containerRef);

  return ctx;
}

export function createStepperEntrance(containerRef: HTMLElement | null) {
  if (!containerRef) return null;

  const ctx = gsap.context(() => {
    const steps = gsap.utils.toArray('[data-stepper-step]');

    gsap.from(steps, {
      scrollTrigger: {
        trigger: containerRef,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: 0.2,
      ease: 'power2.out',
    });
  }, containerRef);

  return ctx;
}
