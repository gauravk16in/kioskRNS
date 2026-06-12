import { Clock, Wifi, BatteryFull } from 'lucide-react';

export function TopBar({ transparent = false }: { transparent?: boolean }) {
  return (
    <header className={`flex justify-between items-center w-full px-6 md:px-container-padding py-4 md:py-stack-sm max-w-[1200px] mx-auto z-50 ${transparent ? 'absolute top-0 left-0 right-0 bg-transparent' : 'relative'}`}>
      <div className="text-label-lg font-semibold text-on-surface tracking-tight">RNSIT Kiosk</div>
      <div className="flex items-center gap-2 md:gap-stack-sm text-on-surface-variant">
        <Clock className="w-4 h-4 md:w-5 md:h-5 hover:opacity-80 transition-opacity cursor-pointer hidden sm:block" />
        <span className="text-label-sm font-medium mr-1 md:mr-2">10:42 AM</span>
        <Wifi className="w-4 h-4 md:w-5 md:h-5 hover:opacity-80 transition-opacity cursor-pointer" />
        <BatteryFull className="w-4 h-4 md:w-5 md:h-5 hover:opacity-80 transition-opacity cursor-pointer" />
      </div>
    </header>
  );
}
