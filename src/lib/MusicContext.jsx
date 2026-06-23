import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import {
  startBackgroundMusic,
  stopBackgroundMusic,
  setMuted as setAudioMuted,
  resumeContext,
} from '@/lib/quizAudio';

const MusicContext = createContext();

export function MusicProvider({ children }) {
  const [musicOn, setMusicOn] = useState(false);
  const startedRef = useRef(false);

  const toggleMusic = useCallback(() => {
    if (!startedRef.current) {
      resumeContext();
      startBackgroundMusic();
      startedRef.current = true;
      setMusicOn(true);
    } else {
      if (musicOn) {
        setAudioMuted(true);
        setMusicOn(false);
      } else {
        setAudioMuted(false);
        setMusicOn(true);
      }
    }
  }, [musicOn]);

  const startMusic = useCallback(() => {
    if (!startedRef.current) {
      resumeContext();
      startBackgroundMusic();
      startedRef.current = true;
      setMusicOn(true);
    }
  }, []);

  useEffect(() => {
    return () => {
      stopBackgroundMusic();
      startedRef.current = false;
    };
  }, []);

  return (
    <MusicContext.Provider value={{ musicOn, toggleMusic, startMusic }}>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error('useMusic must be used within MusicProvider');
  return ctx;
}
