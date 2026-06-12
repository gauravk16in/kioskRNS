import { ArrowLeft, Map } from 'lucide-react';
import { ScreenProps } from '../types';
import { TopBar } from '../components/TopBar';
import { SiriOrb } from '../components/SiriOrb';
import { motion } from 'motion/react';

export function LocationDetailScreen({ onNavigate, routeParams }: ScreenProps) {
  const isCafeteria = routeParams?.target === 'cafeteria';
  
  const title = isCafeteria ? "The Hub Cafeteria" : "Campus Map";
  const desc = isCafeteria 
    ? "I can help with that. The Cafeteria is just a 2-minute walk away." 
    : "Explore the campus layout to find your destination.";
  const imageSrc = isCafeteria ? "/cafeteria-map.png" : "/campus-map.png";

  return (
    <div className="h-full w-full bg-surface relative flex flex-col overflow-hidden">
      <TopBar transparent />
      
      <main className="flex-1 relative w-full h-full max-w-[1400px] mx-auto flex items-center">
        {/* Background Image right aligned */}
        <div className="absolute inset-x-0 top-0 h-1/2 md:inset-y-0 md:inset-x-auto md:right-0 w-full md:w-3/4 md:h-full z-0 image-fade-mask flex items-start md:items-center justify-center md:justify-end md:pr-8 opacity-60 md:opacity-100">
           <img src={imageSrc} className="w-full h-full md:h-[85%] object-cover md:object-contain object-top md:object-right drop-shadow-2xl" alt="Location" />
        </div>

        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="relative z-10 w-full px-6 md:px-container-padding flex items-end md:items-center pb-24 md:pb-0 h-full">
          <div className="glass-panel rounded-xl p-6 md:p-stack-lg flex flex-col gap-4 md:gap-stack-md w-full max-w-[540px] mb-8 md:mb-0">
            <div className="flex flex-col gap-unit">
              {isCafeteria && (
                <div className="flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                  <span className="text-label-lg font-semibold text-emerald-700">Open until 8:00 PM</span>
                </div>
              )}
              <h1 className="text-display-lg text-on-surface">{title}</h1>
            </div>

            <p className="text-headline-md text-on-surface-variant font-light leading-relaxed">
              {desc}
            </p>

            <div className="flex flex-col sm:flex-row gap-stack-sm pt-stack-sm mt-stack-sm border-t border-outline-variant/20">
              <button onClick={() => onNavigate('directions', routeParams)} className="flex-1 bg-primary text-on-primary h-14 rounded-full text-label-lg font-bold flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-95 hover:bg-surface-tint">
                <Map className="w-5 h-5" /> Show Directions
              </button>
              <button onClick={() => onNavigate('entry')} className="flex-1 bg-surface-container-high text-on-surface h-14 rounded-full text-label-lg font-semibold flex items-center justify-center gap-2 transition-colors active:scale-95 hover:bg-surface-container-highest">
                <ArrowLeft className="w-5 h-5" /> Go Back
              </button>
            </div>
          </div>
        </motion.div>
      </main>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-50">
         <SiriOrb label="" />
      </div>
    </div>
  );
}
