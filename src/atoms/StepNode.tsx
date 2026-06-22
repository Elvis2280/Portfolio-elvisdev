import { forwardRef } from 'react';

interface StepNodeProps {
  fillRef?: React.Ref<HTMLDivElement>;
}

export default forwardRef<HTMLDivElement, StepNodeProps>(function StepNode(
  { fillRef },
  ref,
) {
  return (
    <div
      ref={ref}
      className="relative flex items-center justify-center w-10 h-10 shrink-0"
    >
      {/* Circle shell — clips fill to circle shape */}
      <div className="absolute w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 2xl:w-20 2xl:h-20 rounded-full overflow-hidden z-10">
        <div
          ref={fillRef}
          className="absolute bottom-0 left-0 right-0 h-0 bg-white drop-shadow-[0_0_6px_rgba(34,211,238,0.4)]"
        />
      </div>
      {/* Outer ring */}
      <div className="absolute -inset-2 rounded-full border border-neon/30 animate-ring-pulse-2 z-[5]" />
      {/* Inner ring */}
      <div className="absolute -inset-1 rounded-full border border-neon/50 animate-ring-pulse-1 z-[5]" />
    </div>
  );
});
