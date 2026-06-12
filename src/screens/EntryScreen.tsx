import { UserCheck, MessageCircle, Map, HelpCircle } from 'lucide-react';
import { ScreenProps } from '../types';
import { SiriOrb } from '../components/SiriOrb';
import { TopBar } from '../components/TopBar';
import { motion } from 'motion/react';

export function EntryScreen({ onNavigate }: ScreenProps) {
  return (
    <div className="h-full w-full flex flex-col items-center relative overflow-hidden bg-[radial-gradient(circle_at_50%_-20%,var(--color-primary-fixed)_0%,var(--color-background)_70%)]">
      <TopBar transparent />
      
      <main className="relative z-10 flex-1 w-full max-w-[1200px] px-6 md:px-container-padding flex flex-col items-center justify-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="text-display-lg text-on-surface mb-8 md:mb-stack-lg text-center max-w-3xl"
        >
          What are you here for today?
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
          className="glass-panel rounded-2xl md:rounded-[2rem] p-4 md:p-stack-md flex flex-wrap justify-center gap-3 md:gap-unit w-full max-w-4xl mx-auto z-10"
        >
          <button onClick={() => onNavigate('check-in')} className="w-full sm:w-auto bg-surface-container-high hover:bg-primary-container text-on-surface hover:text-on-primary-container transition-all active:scale-[0.98] rounded-full px-6 md:px-stack-md py-4 md:py-[18px] flex items-center gap-2 md:gap-unit sm:min-w-[200px] justify-center group shadow-sm">
            <UserCheck className="w-5 h-5 md:w-6 md:h-6 group-hover:text-on-primary-container" />
            <span className="text-body-lg font-medium">Check in</span>
          </button>

          <button onClick={() => onNavigate('ask-question')} className="w-full sm:w-auto bg-surface-container-high hover:bg-primary-container text-on-surface hover:text-on-primary-container transition-all active:scale-[0.98] rounded-full px-6 md:px-stack-md py-4 md:py-[18px] flex items-center gap-2 md:gap-unit sm:min-w-[200px] justify-center group shadow-sm">
            <MessageCircle className="w-5 h-5 md:w-6 md:h-6 group-hover:text-on-primary-container" />
            <span className="text-body-lg font-medium">Ask a question</span>
          </button>

          <button onClick={() => onNavigate('location-detail')} className="w-full sm:w-auto bg-surface-container-high hover:bg-primary-container text-on-surface hover:text-on-primary-container transition-all active:scale-[0.98] rounded-full px-6 md:px-stack-md py-4 md:py-[18px] flex items-center gap-2 md:gap-unit sm:min-w-[200px] justify-center group shadow-sm">
            <Map className="w-5 h-5 md:w-6 md:h-6 group-hover:text-on-primary-container" />
            <span className="text-body-lg font-medium">Directions</span>
          </button>

          <button className="w-full sm:w-auto bg-surface-container-high hover:bg-primary-container text-on-surface hover:text-on-primary-container transition-all active:scale-[0.98] rounded-full px-6 md:px-stack-md py-4 md:py-[18px] flex items-center gap-2 md:gap-unit sm:min-w-[200px] justify-center group shadow-sm">
            <HelpCircle className="w-5 h-5 md:w-6 md:h-6 group-hover:text-on-primary-container" />
            <span className="text-body-lg font-medium">Help</span>
          </button>
        </motion.div>
      </main>


    </div>
  );
}
