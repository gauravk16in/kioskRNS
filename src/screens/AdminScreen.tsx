import { LayoutDashboard, BarChart3, Users, Settings, Plus, HelpCircle, Lock, UserCheck, Timer, MessageSquare } from 'lucide-react';
import { ScreenProps } from '../types';
import { motion } from 'motion/react';

export function AdminScreen({ onNavigate }: ScreenProps) {
  return (
    <div className="h-full w-full flex flex-col md:flex-row bg-surface text-on-surface overflow-hidden">
      {/* TopAppBar (MOBILE) */}
      <header className="md:hidden shrink-0 w-full bg-surface/90 backdrop-blur-md z-40 border-b border-outline-variant/20 flex justify-between items-center px-4 py-3">
        <h1 className="text-[17px] font-bold text-on-surface flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary-container overflow-hidden">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBq855urP9grzIQaorJiJYizqyK67f0qZ1IV2iYm70_u8pEWmqj-Rd0g-jjZcXMK3qU8nkqNjwIAlCMi0_9QZg4HikrRuGmbBC_IYgg7Ft4kyXB8uiPKKY6a0RW3aFdQlWuAmn4kPH2S_6O5U_RSL9i3Pp6Gn7T4oprjB4NR-SktlaZfhA85xdYI06Qp9t2ibUjJulw3UNKzHVGMCmTx5UUkEDoX_kEcWYN1NbadfYWKSaOZYHcZGiYmYN-dAI6PdOtElKd9Th7aV5s" alt="Admin" className="w-full h-full object-cover" />
          </div>
          RNSIT Admin
        </h1>
        <button onClick={() => onNavigate('idle')} className="text-primary text-[13px] font-semibold">Exit</button>
      </header>

      {/* Sidebar (DESKTOP) */}
      <nav className="hidden md:flex flex-col h-full py-stack-md px-stack-sm bg-surface-container-low/70 backdrop-blur-xl w-64 border-r border-outline-variant/30 shadow-sm z-40 shrink-0">
        <div className="mb-stack-lg px-unit flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-container overflow-hidden">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBq855urP9grzIQaorJiJYizqyK67f0qZ1IV2iYm70_u8pEWmqj-Rd0g-jjZcXMK3qU8nkqNjwIAlCMi0_9QZg4HikrRuGmbBC_IYgg7Ft4kyXB8uiPKKY6a0RW3aFdQlWuAmn4kPH2S_6O5U_RSL9i3Pp6Gn7T4oprjB4NR-SktlaZfhA85xdYI06Qp9t2ibUjJulw3UNKzHVGMCmTx5UUkEDoX_kEcWYN1NbadfYWKSaOZYHcZGiYmYN-dAI6PdOtElKd9Th7aV5s" alt="Admin" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-body-md font-bold text-on-surface">RNSIT Admin</h2>
            <p className="text-label-sm text-on-surface-variant">Health Summary</p>
          </div>
        </div>

        <ul className="flex flex-col gap-unit flex-1">
          <li>
            <a href="#" className="flex items-center gap-3 px-3 py-3 rounded-lg bg-secondary-container text-on-secondary-container font-semibold transition-transform scale-95">
              <LayoutDashboard className="w-5 h-5 fill-current" /> <span className="text-label-lg">Overview</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center gap-3 px-3 py-3 rounded-lg text-on-surface-variant hover:bg-surface-variant/50 transition-colors">
              <BarChart3 className="w-5 h-5" /> <span className="text-label-lg">Analytics</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center gap-3 px-3 py-3 rounded-lg text-on-surface-variant hover:bg-surface-variant/50 transition-colors">
              <Users className="w-5 h-5" /> <span className="text-label-lg">Directory</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center gap-3 px-3 py-3 rounded-lg text-on-surface-variant hover:bg-surface-variant/50 transition-colors">
              <Settings className="w-5 h-5" /> <span className="text-label-lg">Settings</span>
            </a>
          </li>
        </ul>

        <div className="mt-auto pt-stack-md border-t border-outline-variant/20">
          <button className="w-full py-3 mb-stack-sm bg-primary text-on-primary rounded-full text-label-lg font-bold hover:opacity-90 transition-opacity flex justify-center items-center gap-2">
            <Plus className="w-5 h-5" /> New Entry
          </button>
          <ul className="flex flex-col gap-1">
            <li>
               <a href="#" className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-variant/50 rounded-lg">
                  <HelpCircle className="w-4 h-4" /> <span className="text-label-sm">Help</span>
               </a>
            </li>
            <li>
               <a href="#" className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-variant/50 rounded-lg">
                  <Lock className="w-4 h-4" /> <span className="text-label-sm">Privacy</span>
               </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Area */}
      <main className="flex-1 h-full overflow-y-auto pb-24 md:pb-8 pt-6 md:pt-8 px-4 md:px-container-padding bg-surface">
        <div className="max-w-[900px] mx-auto">
           <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 md:mb-stack-lg">
              <h1 className="text-[32px] md:text-display-lg font-bold text-on-surface mb-1 md:mb-2 leading-tight">Overview</h1>
              <p className="text-[15px] md:text-body-lg text-on-surface-variant">Today's high-level summary.</p>
           </motion.div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-gutter">
              {/* Hero Metric */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="admin-glass-card rounded-xl p-5 md:p-stack-md md:col-span-2 flex flex-col justify-between min-h-[200px] md:min-h-[240px]">
                 <div>
                    <h3 className="text-label-lg text-on-surface-variant mb-1 flex items-center gap-2">
                       <UserCheck className="w-5 h-5 text-primary outline-1" /> Today's Check-ins
                    </h3>
                    <div className="text-[72px] leading-none font-bold tracking-tighter mt-4 text-on-surface">142</div>
                 </div>
                 <div className="mt-8 flex items-end justify-between">
                    <div className="text-body-md text-on-surface-variant">
                       <span className="text-primary font-semibold">+12%</span> vs yesterday
                    </div>
                    <div className="w-1/2 h-12 flex items-end gap-1 opacity-80">
                       {[30,40,35,60,50,80,100].map((h, i) => (
                          <div key={i} className={`flex-1 rounded-t-sm ${i === 6 ? 'bg-primary' : 'bg-primary/50'}`} style={{ height: `${h}%` }}></div>
                       ))}
                    </div>
                 </div>
              </motion.div>

              {/* Wait Time */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="admin-glass-card rounded-xl p-5 md:p-stack-md flex flex-col min-h-[200px] md:min-h-[240px]">
                 <h3 className="text-label-lg text-on-surface-variant mb-4 flex items-center gap-2">
                    <Timer className="w-5 h-5 text-tertiary" /> Average Wait Time
                 </h3>
                 <div className="text-display-lg text-on-surface mt-2 mb-2">4m</div>
                 <div className="mt-auto">
                    <p className="text-body-lg text-on-surface-variant leading-tight">
                       Wait time is down <strong className="text-tertiary font-semibold">10%</strong> today, improving visitor flow.
                    </p>
                 </div>
              </motion.div>

              {/* Top Questions */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="admin-glass-card rounded-xl p-5 md:p-stack-md md:col-span-2">
                 <h3 className="text-label-lg text-on-surface-variant mb-6 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-secondary" /> Top Questions Asked
                 </h3>
                 <ul className="space-y-4">
                    {[
                       { n: 1, q: "Where is the restroom?", a: 45, bg: 'bg-secondary text-white' },
                       { n: 2, q: "How do I connect to guest Wi-Fi?", a: 28, bg: 'bg-surface-container-highest text-on-surface-variant' },
                       { n: 3, q: "Is parking validated here?", a: 12, bg: 'bg-surface-container-highest text-on-surface-variant' },
                    ].map(it => (
                       <li key={it.n} className="flex items-start gap-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${it.bg}`}>
                             <span className="text-sm font-bold">{it.n}</span>
                          </div>
                          <div>
                             <p className="text-body-lg text-on-surface">"{it.q}"</p>
                             <p className="text-label-sm text-on-surface-variant mt-1">Asked {it.a} times today</p>
                          </div>
                       </li>
                    ))}
                 </ul>
              </motion.div>

              {/* Aggregates */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="admin-glass-card rounded-xl p-5 md:p-stack-md flex flex-col justify-center items-center text-center py-8">
                 <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center mb-4">
                    <Users className="w-8 h-8 text-on-surface-variant" />
                 </div>
                 <div className="text-[34px] font-bold leading-tight tracking-tight text-on-surface">850+</div>
                 <p className="text-label-lg text-on-surface-variant mt-1">Recent Visitors</p>
                 <p className="text-[13px] leading-tight text-outline mt-4">Aggregated count to protect privacy.</p>
              </motion.div>
           </div>
        </div>
      </main>

      {/* BottomNav (MOBILE) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-[72px] pb-safe bg-surface/90 backdrop-blur-2xl border-t border-outline-variant/20 shadow-[0_-4px_24px_rgba(0,0,0,0.05)]">
        <a href="#" className="flex flex-col items-center justify-center text-primary font-bold transition-transform w-[72px] h-[72px]">
          <LayoutDashboard className="w-6 h-6 fill-current mb-1" />
          <span className="text-[10px] uppercase font-bold tracking-wider">Home</span>
        </a>
        <a href="#" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors w-[72px] h-[72px]">
          <BarChart3 className="w-6 h-6 mb-1" />
          <span className="text-[10px] uppercase font-bold tracking-wider">Metrics</span>
        </a>
      </nav>
    </div>
  );
}
