import { Hand, Building2 } from 'lucide-react';
import { ScreenProps } from '../types';
import { motion } from 'motion/react';

export function IdleScreen({ onNavigate }: ScreenProps) {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center relative overflow-hidden text-on-background cursor-pointer" onClick={() => onNavigate('entry')}>
      {/* Background atmosphere */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_center,var(--color-surface-container-lowest)_0%,var(--color-surface-container-low)_100%)]"></div>
      
      <main className="flex-1 flex flex-col items-center justify-center z-10 w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-stack-lg">
          <h1 className="text-display-lg text-on-surface mb-stack-sm tracking-tight">Welcome to RNSIT Kiosk</h1>
        </motion.div>

        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          className="relative group flex flex-col items-center justify-center focus:outline-none rounded-full p-4 md:p-8"
          onClick={() => onNavigate('entry')}
        >
          <div className="relative flex items-center justify-center w-24 h-24 md:w-32 md:h-32 bg-primary rounded-full shadow-[0_8px_32px_rgba(0,88,188,0.2)] mb-4 md:mb-stack-md z-10 overflow-hidden">
            {/* Simulated pulse */}
            <div className="absolute inset-0 border-4 border-primary/20 rounded-full animate-ping opacity-50"></div>
            <Hand className="text-on-primary w-10 h-10 md:w-12 md:h-12" fill="currentColor" strokeWidth={1} />
            <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px] rounded-full pointer-events-none"></div>
          </div>
          <p className="text-headline-md text-primary text-center">Tap or say hello to begin</p>
          <p className="text-body-md text-on-surface-variant mt-unit text-center opacity-80">I'm ready to assist you</p>
        </motion.button>
      </main>

      <footer className="absolute bottom-8 w-full flex justify-center items-center opacity-60 z-0 hover:opacity-100 transition-opacity">
        <div className="flex items-center gap-unit grayscale hover:grayscale-0 transition-all duration-500">
          <Building2 className="text-outline w-6 h-6" />
          <span className="text-label-lg text-outline uppercase tracking-widest">Acme Corp Facility</span>
        </div>
      </footer>
    </div>
  );
}
