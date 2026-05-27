interface StepConnectorProps {
  className?: string;
}

export default function StepConnector({ className }: StepConnectorProps) {
  return (
    <div className={`w-px flex-1 bg-neon min-h-[24px] ${className ?? ''}`} />
  );
}
