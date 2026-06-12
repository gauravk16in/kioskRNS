import { useState, useEffect } from 'react';
import { IdleScreen } from './screens/IdleScreen';
import { EntryScreen } from './screens/EntryScreen';
import { CheckInScreen } from './screens/CheckInScreen';
import { LocationDetailScreen } from './screens/LocationDetailScreen';
import { DirectionsScreen } from './screens/DirectionsScreen';
import { AdminScreen } from './screens/AdminScreen';
import { AskQuestionScreen } from './screens/AskQuestionScreen';
import { ScreenId } from './types';
import { useSession } from './hooks/useSession';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('idle');
  const [routeParams, setRouteParams] = useState<any>({});
  const { session, lastSession, backendUrl } = useSession();

  const handleNavigate = (screen: ScreenId, params?: any) => {
    setCurrentScreen(screen);
    setRouteParams(params || {});
  };

  // Handle automatic screen transitions based on session state
  useEffect(() => {
    if (session) {
      if (currentScreen === 'idle') {
        setCurrentScreen('entry');
      }
    } else {
      if (currentScreen !== 'idle' && currentScreen !== 'admin') {
        setCurrentScreen('idle');
      }
    }
  }, [session, currentScreen]);

  return (
    <div className="w-full h-full h-screen min-h-screen bg-background text-on-background relative font-sans overflow-hidden">
      {currentScreen === 'idle' && <IdleScreen onNavigate={handleNavigate} session={lastSession} />}
      {currentScreen === 'entry' && <EntryScreen onNavigate={handleNavigate} session={session} />}
      {currentScreen === 'check-in' && <CheckInScreen onNavigate={handleNavigate} session={session} />}
      {currentScreen === 'location-detail' && <LocationDetailScreen onNavigate={handleNavigate} session={session} routeParams={routeParams} />}
      {currentScreen === 'directions' && <DirectionsScreen onNavigate={handleNavigate} session={session} routeParams={routeParams} />}
      {currentScreen === 'admin' && <AdminScreen onNavigate={handleNavigate} session={session} />}
      {currentScreen === 'ask-question' && <AskQuestionScreen onNavigate={handleNavigate} session={session} backendUrl={backendUrl} />}

      {/* Dev Navigation shortcut - helps evaluate the prototype */}
      <div className="fixed bottom-2 left-2 md:left-auto right-2 md:bottom-4 md:right-4 z-[100] flex flex-wrap justify-center md:justify-end gap-2 p-2 bg-surface-container-highest/80 backdrop-blur rounded-2xl md:rounded-full shadow-lg border border-outline-variant/30 text-xs text-on-surface">
        {['idle', 'entry', 'check-in', 'location-detail', 'directions', 'admin', 'ask-question'].map((sc) => (
          <button 
            key={sc}
            onClick={() => setCurrentScreen(sc as ScreenId)}
            className={`px-3 py-1.5 rounded-full capitalize ${currentScreen === sc ? 'bg-primary text-on-primary font-semibold' : 'hover:bg-surface-variant'}`}
          >
            {sc.split('-')[0]}
          </button>
        ))}
      </div>
    </div>
  );
}
