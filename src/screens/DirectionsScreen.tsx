import { CheckCircle2, Navigation, Mic, CornerUpLeft, DoorOpen } from 'lucide-react';
import { ScreenProps } from '../types';
import { TopBar } from '../components/TopBar';
import { motion } from 'motion/react';

export function DirectionsScreen({ onNavigate, routeParams }: ScreenProps) {
  const isCafeteria = routeParams?.target === 'cafeteria';
  const title = isCafeteria ? "Directions to Cafeteria" : "Directions to Reception";
  const imageSrc = isCafeteria 
    ? "https://lh3.googleusercontent.com/aida-public/AB6AXuDtbWalIpfMQnHt12a9RfqC-Kf2b_HZFvKsu-6KxlpOwHffYMr5JfoT0jg48ZRn3aJK0HMzGMqy6WsOJgXIYvGfzDhHwu9esYVyXpa7FaUxxPEWvmXcxRQSpL3ww6xsKONVR8_jUxDHy-RIEtoxCFWqrpbi6fKkbHAWCKL08H6eAhQyo-1_SpxGFvR18RcEdsQXC4QXvFkSVQuYY3XSPxDL6gBJ0KWTsS-Ije_jpYMhXi_5PdlQTgzNVGdiWL6eLE30oznHlxipAHM2" 
    : "/campus-map.png";

  return (
    <div className="h-full w-full bg-background relative flex flex-col overflow-hidden">
      <TopBar transparent />

      {/* Map Base */}
      <div className="absolute inset-0 z-0 bg-[#2f3238]">
         <img src={imageSrc} className="w-full h-full object-cover opacity-80 mix-blend-screen mix-blend-luminosity brightness-[1.2]" alt="Map" />
         <svg className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-xl" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1200 800">
           <path className="opacity-90 animate-[dash_2s_linear_infinite]" strokeDasharray="16 16" d="M 400 600 C 400 500, 450 500, 500 450 C 550 400, 600 450, 650 400" fill="none" stroke="#0058bc" strokeWidth="8"/>
           <circle className="animate-ping opacity-70 origin-center" cx="400" cy="600" fill="#0058bc" r="20"></circle>
           <circle cx="400" cy="600" fill="#ffffff" r="8"></circle>
           <path d="M 650 400 L 635 370 L 665 370 Z" fill="#ba1a1a" transform="rotate(180 650 400) translate(0 15)"></path>
           <circle cx="650" cy="400" fill="#ba1a1a" r="8"></circle>
         </svg>
      </div>

      <main className="flex-1 relative z-10 flex flex-col justify-end md:justify-center w-full md:max-w-md md:mt-stack-lg px-4 md:px-container-padding pointer-events-auto pb-6 md:pb-0">
         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-surface-container-low/80 backdrop-blur-xl border border-outline-variant/30 rounded-xl shadow-lg p-5 md:p-stack-md flex flex-col gap-5 md:gap-stack-md">
            <div>
              <h1 className="text-headline-md text-on-surface mb-unit leading-tight">{title}</h1>
              <p className="text-label-lg text-on-surface-variant flex items-center gap-2">
                <Navigation className="w-4 h-4" /> Est. 2 mins
              </p>
            </div>
            <div className="h-[1px] w-full bg-outline-variant/30"></div>

            <div className="flex flex-col gap-stack-sm">
               <div className="flex items-start gap-stack-sm">
                  <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0">
                     <Navigation className="w-5 h-5 pointer-events-none" />
                  </div>
                  <div className="pt-2"><p className="text-body-md text-on-surface">1. Go straight past the lobby.</p></div>
               </div>
               <div className="flex items-start gap-stack-sm">
                  <div className="w-10 h-10 rounded-full bg-surface-variant text-on-surface-variant flex items-center justify-center shrink-0">
                     <CornerUpLeft className="w-5 h-5" />
                  </div>
                  <div className="pt-2">
                    <p className="text-body-md text-on-surface">
                      {isCafeteria ? "2. Turn left at the campus courtyard." : "2. Turn left at the elevators."}
                    </p>
                  </div>
               </div>
               <div className="flex items-start gap-stack-sm">
                  <div className="w-10 h-10 rounded-full bg-surface-variant text-on-surface-variant flex items-center justify-center shrink-0">
                     <DoorOpen className="w-5 h-5" />
                  </div>
                  <div className="pt-2">
                    <p className="text-body-md text-on-surface">
                      {isCafeteria ? "3. The Cafeteria is straight ahead near the sports ground." : "3. Reception is the first door on your right."}
                    </p>
                  </div>
               </div>
            </div>

            <div className="mt-stack-sm flex items-center gap-gutter">
              <button onClick={() => onNavigate('idle')} className="flex-1 bg-primary text-on-primary h-14 rounded-full text-label-lg font-semibold hover:opacity-90 active:scale-95 transition-all shadow-sm flex items-center justify-center gap-2">
                 <CheckCircle2 className="w-5 h-5" /> Done
              </button>
              <button className="w-14 h-14 rounded-full bg-surface-container-high text-primary flex items-center justify-center relative hover:bg-surface-variant transition-colors">
                 <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping opacity-20"></div>
                 <Mic className="w-6 h-6" />
              </button>
            </div>
         </motion.div>
      </main>
    </div>
  );
}
