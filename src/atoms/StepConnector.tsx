import { forwardRef } from 'react';

interface StepConnectorProps {
  className?: string;
  fillRef?: React.Ref<HTMLDivElement>;
}

export default forwardRef<HTMLDivElement, StepConnectorProps>(
  function StepConnector({ className, fillRef }, ref) {
    return (
      <div
        ref={ref}
        className={`relative w-px flex-1 min-h-[24px] ${className ?? ''}`}
      >
        {/* Track — always visible gray line */}
        <div className="absolute inset-0 bg-gray-400" />
        {/* Fill overlay — grows from top to bottom */}
        <div
          ref={fillRef}
          className="absolute top-0 left-0 right-0 h-0 bg-neon"
        />
      </div>
    );
  },
);
