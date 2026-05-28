export default function StepNode() {
  return (
    <div className="relative flex items-center justify-center w-10 h-10 shrink-0">
      {/* Outer ring */}
      <div className="absolute w-10 h-10 rounded-full border border-neon/30 animate-ring-pulse-2" />
      {/* Inner ring */}
      <div className="absolute w-8 h-8 rounded-full border border-neon/50 animate-ring-pulse-1" />
      {/* Core dot */}
      <div className="relative w-6 h-6 rounded-full bg-gradient-to-br from-neon to-purple drop-shadow-[0_0_6px_rgba(34,211,238,0.4)]" />
    </div>
  );
}
