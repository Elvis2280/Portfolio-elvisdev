import { type ReactNode } from 'react';
import StepNode from '@/atoms/StepNode';
import StepConnector from '@/atoms/StepConnector';

interface ExperienceStepProps {
  isLast?: boolean;
  children: ReactNode;
}

function Title({ children }: { children: ReactNode }) {
  return <h3 className="text-step-title">{children}</h3>;
}

function Subtitle({ children }: { children: ReactNode }) {
  return <p className="text-base font-bold text-foreground mt-1">{children}</p>;
}

function Text({ children }: { children: ReactNode }) {
  return (
    <p className="text-body text-muted-foreground/80 mt-2 leading-relaxed">
      {children}
    </p>
  );
}

function ExperienceStep({ isLast = false, children }: ExperienceStepProps) {
  return (
    <div className="flex gap-6">
      {/* Left column: node + connector */}
      <div className="flex flex-col items-center shrink-0">
        <StepNode />
        {!isLast && <StepConnector />}
      </div>
      {/* Right column: text content */}
      <div className="flex-1 pb-12">{children}</div>
    </div>
  );
}

ExperienceStep.Title = Title;
ExperienceStep.Subtitle = Subtitle;
ExperienceStep.Text = Text;

export default ExperienceStep;
