import { createContext, useContext, useState, useCallback } from 'react';

const GameStateContext = createContext();

export function GameStateProvider({ children }) {
  const [gameState, setGameState] = useState('home');
  const [screenData, setScreenData] = useState({});

  const goTo = useCallback((screen, data = {}) => {
    setScreenData(data);
    setGameState(screen);
  }, []);

  return (
    <GameStateContext.Provider value={{ gameState, goTo, screenData }}>
      {children}
    </GameStateContext.Provider>
  );
}

export function useGameState() {
  const ctx = useContext(GameStateContext);
  if (!ctx) throw new Error('useGameState must be used within GameStateProvider');
  return ctx;
}
