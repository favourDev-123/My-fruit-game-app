import { Toaster } from "@/components/ui/toaster"
import { MusicProvider } from '@/lib/MusicContext';
import { GameStateProvider, useGameState } from '@/lib/GameStateContext';
import HomeScreen from './Pages/Home';
import Game from './Pages/Game';
import QuizGame from './Pages/QuizGame';
import GameOver from './Pages/GameOver';

function AppContent() {
  const { gameState } = useGameState();

  switch (gameState) {
    case 'playing':
      return <Game />;
    case 'quiz':
      return <QuizGame />;
    case 'score':
      return <GameOver />;
    case 'home':
    default:
      return <HomeScreen />;
  }
}

function App() {
  return (
    <MusicProvider>
      <GameStateProvider>
        <div className="h-screen overflow-hidden game-gradient">
          <AppContent />
        </div>
        <Toaster />
      </GameStateProvider>
    </MusicProvider>
  );
}

export default App
