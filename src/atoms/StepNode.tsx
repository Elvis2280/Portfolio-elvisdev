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
      <div className="absolute w-10 h-10 rounded-full overflow-hidden">
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
