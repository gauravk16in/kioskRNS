import { SessionData } from './hooks/useSession';

export type ScreenId = 'idle' | 'entry' | 'check-in' | 'location-detail' | 'directions' | 'admin' | 'ask-question';

export interface ScreenProps {
  onNavigate: (screen: ScreenId, params?: any) => void;
  session?: SessionData | null;
  backendUrl?: string;
  routeParams?: any;
}

