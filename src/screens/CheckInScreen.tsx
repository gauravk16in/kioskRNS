import { useState, useEffect } from 'react';
import { ArrowLeft, Delete, Lock } from 'lucide-react';
import { ScreenProps } from '../types';
import { TopBar } from '../components/TopBar';
import { SiriOrb } from '../components/SiriOrb';
import { motion } from 'motion/react';

export function CheckInScreen({ onNavigate }: ScreenProps) {
  const [rawPhone, setRawPhone] = useState('');

  // Auto-navigate when 10 digits are entered
  useEffect(() => {
    if (rawPhone.length === 10) {
      // Small delay for visual feedback of the last digit
      const timeout = setTimeout(() => {
        onNavigate('admin');
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [rawPhone, onNavigate]);

  const formatPhone = (val: string) => {
    const clean = val.replace(/\D/g, '');
    if (!clean) return '';
    let formatted = '+91 ';
    if (clean.length > 0) formatted += clean.substring(0, 5);
    if (clean.length > 5) formatted += ' ' + clean.substring(5, 10);
    return formatted;
  };

  const handlePress = (num: string) => {
    if (rawPhone.length < 10) setRawPhone(prev => prev + num);
  };
  const handleDelete = () => setRawPhone(prev => prev.slice(0, -1));

  return (
    <div className="h-full w-full flex flex-col bg-[radial-gradient(circle_at_50%_-20%,var(--color-primary-fixed-dim),var(--color-background)_70%)] relative">
      <TopBar transparent />
      
      {/* Absolute Back Button */}
      <button 
        onClick={() => onNavigate('entry')} 
        className="absolute top-4 left-4 md:top-6 md:left-6 z-50 flex items-center justify-center gap-2 px-4 py-2 rounded-full text-on-surface hover:bg-surface-variant transition-colors font-medium text-label-lg"
      >
        <ArrowLeft className="w-5 h-5" /> Back
      </button>

      <main className="flex-1 flex flex-col items-center justify-center w-full max-w-[1200px] mx-auto px-6 md:px-container-padding z-10 pt-16 md:pt-0 pb-8 md:pb-8">
        <div className="w-full max-w-2xl flex flex-col items-center gap-4 md:gap-stack-md">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-2 md:space-y-stack-sm">
            <h1 className="text-display-lg text-on-surface leading-[1.1]">Enter your phone number to check in.</h1>
            <p className="text-body-lg text-on-surface-variant">We'll use this to find your reservation.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-panel rounded-xl p-4 md:p-6 w-full flex flex-col items-center gap-4 md:gap-6">
            <div className="w-full relative">
              <input 
                type="text" readOnly value={formatPhone(rawPhone) || '+91 _____ _____'} 
                className="w-full bg-surface-container-lowest text-center text-headline-md md:text-headline-lg text-on-surface border-none focus:ring-0 rounded-lg py-3 md:py-4 shadow-sm tracking-[0.1em] outline-none" 
              />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-primary rounded-t-full"></div>
            </div>

            <div className="grid grid-cols-3 gap-x-4 md:gap-x-6 gap-y-3 md:gap-y-4 w-full max-w-[280px] md:max-w-[300px] mx-auto">
              {[
                ['1', ' '], ['2', 'ABC'], ['3', 'DEF'],
                ['4', 'GHI'], ['5', 'JKL'], ['6', 'MNO'],
                ['7', 'PQRS'], ['8', 'TUV'], ['9', 'WXYZ']
              ].map(([num, letters]) => (
                <button key={num} onClick={() => handlePress(num)} className="numpad-key flex flex-col items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-surface-container-lowest shadow-sm hover:bg-surface-variant mx-auto">
                  <span className="text-headline-md md:text-headline-lg text-on-surface leading-none">{num}</span>
                  <span className="text-[10px] md:text-label-sm text-on-surface-variant leading-none mt-1">{letters}</span>
                </button>
              ))}
              <div></div>
              <button onClick={() => handlePress('0')} className="numpad-key flex flex-col items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-surface-container-lowest shadow-sm hover:bg-surface-variant mx-auto">
                <span className="text-headline-md md:text-headline-lg text-on-surface pt-1 md:pt-2">0</span>
              </button>
              <button onClick={handleDelete} className="numpad-key flex flex-col items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-transparent mx-auto text-on-surface-variant hover:text-on-surface">
                <Delete className="w-6 h-6 md:w-8 md:h-8" />
              </button>
            </div>
          </motion.div>
        </div>
      </main>

      <footer className="w-full pb-10 md:pb-stack-lg pt-4 md:pt-stack-md flex flex-col items-center gap-4 md:gap-stack-md absolute md:relative bottom-0 bg-gradient-to-t md:bg-none from-background to-transparent z-20 pointer-events-none">
        <div className="pointer-events-auto"><SiriOrb label="" /></div>
        <p className="text-[11px] md:text-label-sm text-outline flex items-center gap-1 bg-surface-container-low/50 px-3 py-1 rounded-full backdrop-blur-sm pointer-events-auto">
          <Lock className="w-3 h-3 md:w-4 md:h-4" /> Your privacy is important. No recordings are stored.
        </p>
      </footer>
    </div>
  );
}
