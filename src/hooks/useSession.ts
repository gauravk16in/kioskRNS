import { useState, useEffect, useRef } from 'react';

export interface SessionData {
  session_id: string;
  user_name?: string;
  is_returning?: boolean;
  visit_count?: number;
  asking_name?: boolean;
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:8000';

export function useSession() {
  const [session, setSession] = useState<SessionData | null>(null);
  const [lastSession, setLastSession] = useState<SessionData | null>(null);
  
  const pollRef = useRef<NodeJS.Timeout | null>(null);
  const prevActiveRef = useRef<boolean>(false);

  useEffect(() => {
    async function poll() {
      try {
        const res = await fetch(`${BACKEND_URL}/session/current`);
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();

        if (data && data.active) {
          if (!prevActiveRef.current) {
            // New session detected
            prevActiveRef.current = true;
          }
          setSession(data);
        } else {
          if (prevActiveRef.current) {
            // Session just ended
            setSession((current) => {
              setLastSession(current);
              return null;
            });
            prevActiveRef.current = false;
          }
        }
      } catch (e) {
        // Silently ignore network errors to keep polling alive
      }
    }

    poll();
    pollRef.current = setInterval(poll, 1500);

    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  return { session, lastSession, backendUrl: BACKEND_URL };
}
