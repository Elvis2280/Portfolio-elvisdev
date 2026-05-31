import { type ReactNode } from 'react';
import StepNode from '@/atoms/StepNode';
import StepConnector from '@/atoms/StepConnector';

interface ExperienceStepProps {
  index: number;
  isLast?: boolean;
  children: ReactNode;
  dotRef?: React.Ref<HTMLDivElement>;
  dotFillRef?: React.Ref<HTMLDivElement>;
  connectorFillRef?: React.Ref<HTMLDivElement>;
  textRef?: React.Ref<HTMLDivElement>;
}

function Title({ children }: { children: ReactNode }) {
  return <h3 className="text-step-title">{children}</h3>;
}

function Subtitle({ children }: { children: ReactNode }) {
  return <p className="text-base font-bold text-foreground mt-1">{children}</p>;
}

function Text({ children }: { children: ReactNode }) {
  return (
    <p className="text-body text-muted-foreground/80 mt-2 leading-relaxed max-w-2xl">
      {children}
    </p>
  );
}

function ExperienceStep({
  index,
  isLast = false,
  children,
  dotRef,
  dotFillRef,
  connectorFillRef,
  textRef,
}: ExperienceStepProps) {
  return (
    <div className="flex gap-6" data-step-index={index}>
      <div className="flex flex-col items-center shrink-0">
        <StepNode ref={dotRef} fillRef={dotFillRef} />
        {!isLast && <StepConnector fillRef={connectorFillRef} />}
      </div>
      <div ref={textRef} className="flex-1 pb-16 opacity-0">
        {children}
      </div>
    </div>
  );
}

ExperienceStep.Title = Title;
ExperienceStep.Subtitle = Subtitle;
ExperienceStep.Text = Text;

export default ExperienceStep;
