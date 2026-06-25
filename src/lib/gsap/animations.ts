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
      scale: 1.05,
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

  tl.to({}, { duration: 0.3 });

  tl.to(paths, {
    scaleY: 0,
    opacity: 0,
    duration: 0.1,
    ease: 'power1.inOut',
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

function createAntennaSway(antenaEl: SVGGElement | null) {
  if (!antenaEl) return null;

  gsap.set(antenaEl, { transformOrigin: '50% 100%' });

  return gsap.fromTo(
    antenaEl,
    { rotation: -8 },
    {
      rotation: 8,
      duration: 1.5,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    },
  );
}

export function createMiraAnimation(miraRef: SVGGElement | null) {
  if (!miraRef) return null;

  gsap.set(miraRef, { transformOrigin: '50% 100%' });

  const tl = gsap.timeline({ repeat: -1 });

  tl.to(miraRef, {
    y: -40,
    rotation: -12,
    duration: 2.5,
    ease: 'power2.inOut',
  });

  tl.to({}, { duration: 0.8 });

  tl.to(miraRef, {
    y: 40,
    rotation: 12,
    duration: 3,
    ease: 'power2.inOut',
  });

  tl.to({}, { duration: 0.8 });

  tl.to(miraRef, {
    y: 0,
    rotation: 0,
    duration: 2,
    ease: 'power2.inOut',
  });

  return tl;
}

export function createExperienceScrollAnimation(
  containerRef: HTMLDivElement | null,
  helmetRef: HTMLDivElement | null,
  antenaRef: SVGGElement | null,
  stepNodes: (HTMLDivElement | null)[],
  dotFills: (HTMLDivElement | null)[],
  connFills: (HTMLDivElement | null)[],
  textEls: (HTMLDivElement | null)[],
) {
  if (!containerRef || !helmetRef || !antenaRef) return null;

  let wheelHandler: ((e: WheelEvent) => void) | null = null;
  let touchStartHandler: ((e: TouchEvent) => void) | null = null;
  let touchMoveHandler: ((e: TouchEvent) => void) | null = null;
  let isTrapped = false;
  let progress = 0;
  let isLoaded = false;
  let touchStartY = 0;
  let tl: ReturnType<typeof gsap.timeline>;

  const SENSITIVITY = 0.0003;

  function releaseTrap() {
    isTrapped = false;
    document.body.style.overflow = '';
    if (wheelHandler) window.removeEventListener('wheel', wheelHandler);
    if (touchStartHandler)
      window.removeEventListener('touchstart', touchStartHandler);
    if (touchMoveHandler)
      window.removeEventListener('touchmove', touchMoveHandler);
  }

  function updateProgress(p: number) {
    if (isNaN(p)) return;
    const clamped = Math.max(0, Math.min(1, p));

    progress = clamped;

    tl.progress(progress);

    if (progress >= 1) isLoaded = true;

    if (progress >= 1 || progress <= 0) {
      releaseTrap();
    }
  }

  function onWheel(e: WheelEvent) {
    if (!isTrapped) return;
    e.preventDefault();
    updateProgress(progress + e.deltaY * SENSITIVITY);
  }

  function onTouchStart(e: TouchEvent) {
    if (!isTrapped) return;
    touchStartY = e.touches[0].clientY;
  }

  function onTouchMove(e: TouchEvent) {
    if (!isTrapped) return;
    e.preventDefault();
    const deltaY = touchStartY - e.touches[0].clientY;
    touchStartY = e.touches[0].clientY;
    updateProgress(progress + deltaY * SENSITIVITY);
  }

  function activateTrap() {
    if (isTrapped || progress >= 1 || isLoaded) return;
    containerRef!.scrollIntoView({ behavior: 'smooth', block: 'center' });
    isTrapped = true;
    document.body.style.overflow = 'hidden';
    wheelHandler = onWheel;
    touchStartHandler = onTouchStart;
    touchMoveHandler = onTouchMove;
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchmove', onTouchMove, { passive: false });
  }

  const ctx = gsap.context(() => {
    const containerRect = containerRef.getBoundingClientRect();

    const dotPositions = stepNodes.map((dot) => {
      if (!dot) return { x: 0, y: 0 };
      const rect = dot.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2 - containerRect.left,
        y: rect.top + rect.height / 2 - containerRect.top,
      };
    });

    gsap.set(helmetRef, {
      xPercent: -50,
      yPercent: -50,
      x: dotPositions[0].x - 12,
      y: dotPositions[0].y,
    });

    if (dotFills[0]) gsap.set(dotFills[0], { height: '100%' });
    for (let i = 1; i < dotFills.length; i++) {
      if (dotFills[i]) gsap.set(dotFills[i], { height: '0%' });
    }
    connFills.forEach((fill) => gsap.set(fill, { height: '0%' }));
    textEls.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, {
        opacity: i === 0 ? 1 : 0,
        x: i === 0 ? 0 : -50,
        duration: 1.5,
        ease: 'power2.in',
      });
    });

    const numSteps = dotFills.length;

    tl = gsap.timeline({ paused: true });

    for (let i = 1; i < numSteps; i++) {
      const t = i;

      if (dotFills[i]) {
        tl.to(
          dotFills[i],
          { height: '100%', duration: 1, ease: 'none' },
          t - 1,
        );
      }

      if (i > 0 && connFills[i - 1]) {
        tl.to(
          connFills[i - 1],
          { height: '100%', duration: 1, ease: 'none' },
          t - 1,
        );
      }

      tl.to(
        helmetRef,
        {
          x: dotPositions[i].x - 12,
          y: dotPositions[i].y,
          duration: 1,
          ease: 'none',
        },
        t - 1,
      );

      if (textEls[i]) {
        tl.to(textEls[i], { opacity: 1, x: 0, duration: 0.2 }, t);
      }
    }

    tl.to({}, { duration: 1 }, numSteps - 1);

    createAntennaSway(antenaRef);
  }, containerRef);

  ctx.add(() => {
    releaseTrap();
  });

  return { ctx, activateTrap, releaseTrap };
}

export function createSistemaOrbitAnimations(
  saturnRef: SVGGElement | null,
  asteroidRef: SVGGElement | null,
  saturnLine1Ref: SVGGElement | null,
  saturnLine2Ref: SVGGElement | null,
  particules1Ref: SVGGElement | null,
  partciules2Ref: SVGGElement | null,
  particules3Ref: SVGGElement | null,
  speedRef: SVGGElement | null,
  startRef: SVGGElement | null,
) {
  if (
    !saturnRef ||
    !asteroidRef ||
    !saturnLine1Ref ||
    !saturnLine2Ref ||
    !particules1Ref ||
    !partciules2Ref ||
    !particules3Ref ||
    !speedRef
  )
    return null;

  const ctx = gsap.context(() => {
    gsap.to(saturnRef, {
      motionPath: {
        path: '#circle_3',
        align: '#circle_3',
        alignOrigin: [0.5, 0.5],
      },
      duration: 30,
      repeat: -1,
      ease: 'none',
    });

    gsap.to(asteroidRef, {
      motionPath: {
        path: '#circle_2',
        align: '#circle_2',
        alignOrigin: [0.5, 0.5],
        start: 1,
        end: 0,
      },
      duration: 15,
      repeat: -1,
      ease: 'none',
    });

    gsap.set(saturnLine1Ref, { transformOrigin: '50% 50%' });
    gsap.to(saturnLine1Ref, {
      y: 5,
      duration: 3,
      delay: 0.5,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    });

    gsap.set(saturnLine2Ref, { transformOrigin: '50% 50%' });
    gsap.to(saturnLine2Ref, {
      y: -5,
      scale: 1.2,
      duration: 3,
      delay: 0.5,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    });

    gsap.set(particules1Ref, { transformOrigin: '50% 50%', scale: 0.2 });
    gsap.to(particules1Ref, {
      scale: 1,
      duration: 3,
      yoyo: true,
      repeat: -1,
      repeatDelay: 1,
      ease: 'sine.inOut',
    });

    gsap.set(partciules2Ref, { transformOrigin: '50% 50%', scale: 0.5 });
    gsap.to(partciules2Ref, {
      scale: 1,
      duration: 3,
      yoyo: true,
      repeat: -1,
      repeatDelay: 1,
      ease: 'sine.inOut',
    });

    gsap.set(particules3Ref, { transformOrigin: '50% 50%' });
    gsap.to(particules3Ref, {
      scale: 1.1,
      duration: 2,
      yoyo: true,
      repeat: -1,
      repeatDelay: 0.5,
      ease: 'sine.inOut',
    });

    gsap.to(speedRef, {
      x: -20,
      y: 20,
      duration: 5,
      yoyo: true,
      repeat: -1,
      ease: 'power2.inOut',
    });
  });

  gsap.set(startRef, { opacity: 1 });
  gsap.to(startRef, {
    opacity: 0.3,
    duration: 1,
    yoyo: true,
    repeat: -1,
    repeatDelay: 5,
  });

  return ctx;
}

export function createOvniProjectAnimations(
  weaponRef: SVGGElement | null,
  ovniRef: SVGGElement | null,
  alienRef: SVGGElement | null,
  lightColorRef: SVGGElement | null,
) {
  if (!weaponRef || !ovniRef || !alienRef || !lightColorRef) return null;

  const ctx = gsap.context(() => {
    // UFO gentle hover
    gsap.set(ovniRef, { transformOrigin: '50% 50%' });
    gsap.to(ovniRef, {
      y: -8,
      duration: 4,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });

    // Alien drops down and returns
    gsap.to(alienRef, {
      y: 60,
      duration: 3,
      delay: 1,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: -1,
      repeatDelay: 1,
    });

    // Beam light blink
    gsap.to(lightColorRef, {
      opacity: 0,
      duration: 0.15,
      repeat: -1,
      yoyo: true,
      repeatDelay: 1.5,
      ease: 'power1.inOut',
    });
  });

  return ctx;
}

export function createOvniHoverAnimation(
  weaponRef: SVGGElement | null,
  ovniRef: SVGGElement | null,
  lightColorRef: SVGGElement | null,
) {
  if (!weaponRef || !ovniRef || !lightColorRef) return null;

  const tl = gsap.timeline();

  gsap.set(weaponRef, { transformOrigin: '50% 50%' });
  tl.to(
    weaponRef,
    {
      y: -90,
      duration: 0.5,
      yoyo: true,
      repeat: 1,
      ease: 'power2.out',
    },
    0,
  );

  tl.to(
    lightColorRef,
    {
      opacity: 0,
      duration: 0.125,
      repeat: 3,
      yoyo: true,
      ease: 'power1.inOut',
    },
    0,
  );

  gsap.set(ovniRef, { transformOrigin: '50% 50%' });
  tl.to(
    ovniRef,
    {
      x: 5,
      rotation: 2,
      duration: 0.1,
      yoyo: true,
      repeat: 5,
      ease: 'power1.inOut',
    },
    0,
  );

  return tl;
}

export function createNotesAnimation(
  notesLElement: SVGGElement | null,
  notesRElement: SVGGElement | null,
) {
  if (!notesLElement && !notesRElement) return null;

  const ctx = gsap.context(() => {
    if (notesLElement) {
      gsap.set(notesLElement, { x: 150, y: 200, scale: 0, opacity: 0 });
      const tlL = gsap.timeline({ repeat: -1, repeatDelay: 1 });
      tlL.to(notesLElement, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 5,
        opacity: 1,
        ease: 'power2.inOut',
      });
      tlL.to(notesLElement, {
        opacity: 0,
        duration: 1,
        ease: 'power2.inOut',
      });
    }

    if (notesRElement) {
      gsap.set(notesRElement, { x: -150, y: 200, scale: 0, opacity: 0 });
      const tlR = gsap.timeline({ repeat: -1, repeatDelay: 1 });
      const moveR = gsap.timeline();
      moveR.to(
        notesRElement,
        {
          y: 0,
          scale: 1,
          duration: 5,
          opacity: 1,
          ease: 'power2.inOut',
        },
        0,
      );
      moveR.to(
        notesRElement,
        {
          x: 0,
          duration: 5,
          ease: 'sine.inOut',
        },
        0,
      );
      tlR.add(moveR);
      tlR.to(notesRElement, {
        opacity: 0,
        duration: 1,
        ease: 'power2.inOut',
      });
    }
  });

  return ctx;
}

export function createHeadSway(headElement: SVGGElement | null) {
  if (!headElement) return null;

  gsap.set(headElement, { transformOrigin: '50% 50%' });

  return gsap.to(headElement, {
    rotation: 4,
    duration: 1.2,
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut',
  });
}

export function createAlbumOrbit(
  element: SVGGElement | null,
  pathSelector: string,
  onRepeat?: () => void,
) {
  if (!element) return null;

  const tl = gsap.timeline({
    repeat: -1,
    ease: 'none',
    onRepeat,
  });

  gsap.set(element, {
    motionPath: {
      path: pathSelector,
      align: pathSelector,
      alignOrigin: [0.5, 0.5],
      start: 0,
    },
    scale: 0,
    opacity: 0,
  });

  tl.to(
    element,
    {
      motionPath: {
        path: pathSelector,
        align: pathSelector,
        alignOrigin: [0.5, 0.5],
      },
      duration: 7,
      ease: 'none',
    },
    0,
  );

  tl.to(
    element,
    {
      scale: 1,
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
    },
    0,
  );

  tl.to(
    element,
    {
      scale: 0,
      opacity: 0,
      duration: 1,
      ease: 'power2.in',
    },
    6,
  );

  return tl;
}

export function createProjectTransitionAnimation(
  planetEl: HTMLElement | null,
  titleEl: HTMLElement | null,
  direction: 'enter' | 'exit',
  onComplete?: () => void,
) {
  if (!planetEl || !titleEl) return null;

  const tl = gsap.timeline({ onComplete });

  if (direction === 'exit') {
    tl.to(planetEl, {
      y: 30,
      opacity: 0,
      scale: 0.8,
      duration: 0.5,
      ease: 'power2.inOut',
    });
    tl.to(
      titleEl,
      {
        y: 30,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut',
      },
      '<',
    );
  } else {
    tl.fromTo(
      planetEl,
      { y: 30, opacity: 0, scale: 0.8 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'power2.inOut' },
    );
    tl.fromTo(
      titleEl,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power2.inOut' },
      '<',
    );
  }

  return tl;
}
