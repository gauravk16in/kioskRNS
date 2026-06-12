import { Mic } from 'lucide-react';

export function SiriOrb({ label = "" }: { label?: string }) {
  return (
    <div className="flex flex-col items-center gap-unit z-20">
      <div className="relative flex items-center justify-center pointer-events-none">
        {/* Ambient glows */}
        <div className="absolute w-20 h-20 rounded-full bg-primary/20 blur-xl animate-orb-glow mix-blend-multiply"></div>
        <div className="absolute w-12 h-12 rounded-full bg-secondary-container/40 blur-md animate-orb-glow mix-blend-multiply" style={{ animationDelay: '1s' }}></div>
        {/* Core Orb */}
        <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-primary-fixed to-primary flex items-center justify-center shadow-[0_0_20px_rgba(0,112,235,0.4)] border border-white/30 backdrop-blur-sm animate-pulse-orb pointer-events-auto cursor-pointer">
          <Mic className="text-white w-6 h-6 outline-none" strokeWidth={2.5} />
        </div>
      </div>
      {label && <span className="text-label-lg text-on-surface-variant mt-2">{label}</span>}
    </div>
  );
}
