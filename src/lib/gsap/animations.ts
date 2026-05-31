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
    gsap.to('#particula_animation', {
      x: 80,
      y: -40,
      duration: 5,
      ease: 'bounce.inOut',
      repeat: -1,
      yoyo: true,
    });

    gsap.to('#cuerpo', {
      x: -100,
      y: 50,
      duration: 3,
      ease: 'power2.out',
      repeat: -1,
      yoyo: true,
    });
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

export function createBlinkAnimation(parpadosElement: SVGGElement | null) {
  if (!parpadosElement) return null;

  const paths = parpadosElement.querySelectorAll('path');

  gsap.set(paths, {
    scaleY: 0,
    opacity: 0,
    transformOrigin: 'top center',
  });

  const tl = gsap.timeline({
    repeat: -1,
    repeatDelay: 2.63,
    delay: 1.5,
  });

  tl.to(paths, {
    scaleY: 1,
    opacity: 1,
    duration: 0.12,
    ease: 'power1.out',
  });

  tl.to({}, { duration: 0.15 });

  tl.to(paths, {
    scaleY: 0,
    opacity: 0,
    duration: 0.1,
    ease: 'power1.in',
  });

  return tl;
}

export function createCinturonGlowAnimation() {
  return gsap.to('#STROKE_1ec6533e-1ab4-4145-8431-6fb1abadb74c', {
    fill: '#a5f3fc',
    duration: 2.5,
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut',
  });
}
