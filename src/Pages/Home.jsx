import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, BookOpen, Apple, Users, BookHeart, Volume2, VolumeX, Trophy, Music, Music2 } from 'lucide-react';
import { getHighScore, getSfxMuted, setSfxMuted } from '@/lib/gameStorage';
import { useMusic } from '@/lib/MusicContext';
import { useGameState } from '@/lib/GameStateContext';
import { playSplash, resumeContext } from '@/lib/quizAudio';
import FruitLibrary from './FruitLibrary';
import FruitDetail from './FruitDetail';
import AgeGuide from './AgeGuide';
import Learn from './Learn';

const FRUITS = ['🍎', '🍊', '🍋', '🍇', '🫐', '🥝', '🍓', '🍌', '🍉', '🥭'];
const ORBIT_RADIUS_X = 140;
const ORBIT_RADIUS_Y = 60;

function SplashContent() {
  useEffect(() => {
    resumeContext();
    const t = setTimeout(() => playSplash(), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-green-500/5 blur-3xl" />
      {FRUITS.slice(0, 6).map((emoji, i) => (
        <motion.span
          key={i}
          className="absolute text-2xl opacity-[0.05] pointer-events-none"
          style={{ left: `${12 + i * 16}%`, top: `${15 + (i % 4) * 22}%` }}
          animate={{ y: [0, -20, 0], rotate: [0, 15, -15, 0] }}
          transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.6 }}
        >
          {emoji}
        </motion.span>
      ))}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center z-10 mb-8"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg sm:text-xl text-green-200/80 font-semibold tracking-wider"
        >
          Welcome to the
        </motion.p>
        <motion.h1
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, type: 'spring', stiffness: 150, damping: 12 }}
          className="text-4xl sm:text-5xl font-heading text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] mt-1"
        >
          World of Fruits
        </motion.h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mx-auto mt-3 w-24 h-[2px] bg-gradient-to-r from-green-400 via-white to-green-400 rounded-full origin-center"
        />
      </motion.div>
      <div className="relative w-72 h-36 sm:w-80 sm:h-40 z-10">
        {FRUITS.map((emoji, i) => {
          const angle = (i / FRUITS.length) * Math.PI * 2;
          return (
            <motion.span
              key={i}
              className="absolute text-3xl sm:text-4xl"
              style={{ left: '50%', top: '50%', marginLeft: -20, marginTop: -20 }}
              animate={{
                x: [
                  Math.cos(angle) * ORBIT_RADIUS_X,
                  Math.cos(angle + Math.PI * 2 * 0.25) * ORBIT_RADIUS_X,
                  Math.cos(angle + Math.PI * 2 * 0.5) * ORBIT_RADIUS_X,
                  Math.cos(angle + Math.PI * 2 * 0.75) * ORBIT_RADIUS_X,
                  Math.cos(angle) * ORBIT_RADIUS_X,
                ],
                y: [
                  Math.sin(angle) * ORBIT_RADIUS_Y,
                  Math.sin(angle + Math.PI * 2 * 0.25) * ORBIT_RADIUS_Y,
                  Math.sin(angle + Math.PI * 2 * 0.5) * ORBIT_RADIUS_Y,
                  Math.sin(angle + Math.PI * 2 * 0.75) * ORBIT_RADIUS_Y,
                  Math.sin(angle) * ORBIT_RADIUS_Y,
                ],
                scale: [1, 1.3, 1, 0.8, 1],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear', delay: i * 0.15 }}
            >
              {emoji}
            </motion.span>
          );
        })}
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="text-sm text-green-300/40 mt-8 font-semibold tracking-wider z-10"
      >
        Discover · Learn · Play
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-12 text-green-400/40 text-sm font-mono z-10"
      >
        <span>
          <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}>.</motion.span>
          <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}>.</motion.span>
          <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}>.</motion.span>
        </span>
      </motion.div>
    </div>
  );
}

const hubTabs = [
  { path: 'playing', label: 'Play', icon: Play, color: 'from-green-500 to-emerald-600', glow: 'shadow-[0_0_24px_rgba(34,197,94,0.4)]' },
  { path: 'quiz', label: 'Quiz', icon: BookOpen, color: 'from-orange-500 to-orange-600', glow: 'shadow-[0_0_24px_rgba(249,115,22,0.4)]' },
  { path: 'fruits', label: 'Fruits', icon: Apple, color: 'from-cyan-500 to-cyan-600', glow: '' },
  { path: 'age-guide', label: 'Guide', icon: Users, color: 'from-purple-500 to-purple-600', glow: '' },
  { path: 'learn', label: 'Learn', icon: BookHeart, color: 'from-pink-500 to-rose-600', glow: '' },
];

export default function HomeScreen() {
  const [splashDone, setSplashDone] = useState(false);
  const [subScreen, setSubScreen] = useState(null);
  const [fruitId, setFruitId] = useState(null);
  const { goTo } = useGameState();
  const { startMusic } = useMusic();

  useEffect(() => {
    startMusic();
    const t = setTimeout(() => setSplashDone(true), 5500);
    return () => clearTimeout(t);
  }, [startMusic]);

  if (!splashDone) return <SplashContent />;

  if (subScreen === 'fruits') {
    return (
      <div className="h-full overflow-y-auto">
        <FruitLibrary onBack={() => setSubScreen(null)} onFruitSelect={(id) => { setFruitId(id); setSubScreen('fruit-detail'); }} />
      </div>
    );
  }
  if (subScreen === 'fruit-detail') {
    return (
      <div className="h-full overflow-y-auto">
        <FruitDetail fruitId={fruitId} onBack={() => setSubScreen('fruits')} />
      </div>
    );
  }
  if (subScreen === 'age-guide') {
    return (
      <div className="h-full overflow-y-auto">
        <AgeGuide onBack={() => setSubScreen(null)} />
      </div>
    );
  }
  if (subScreen === 'learn') {
    return (
      <div className="h-full overflow-y-auto">
        <Learn onBack={() => setSubScreen(null)} />
      </div>
    );
  }

  return <HubContent onNavigate={(path) => {
    if (path === 'playing' || path === 'quiz') goTo(path);
    else setSubScreen(path);
  }} />;
}

function HubContent({ onNavigate }) {
  const [highScore, setHighScore] = useState(0);
  const [sfxOn, setSfxOn] = useState(!getSfxMuted());
  const { musicOn, toggleMusic } = useMusic();

  useEffect(() => {
    setHighScore(getHighScore());
  }, []);

  const toggleSfx = () => {
    const next = !sfxOn;
    setSfxOn(next);
    setSfxMuted(!next);
  };

  return (
    <div className="h-full overflow-y-auto scroll-organic p-4 sm:p-6">
      {['🍎', '🍊', '🍋', '🍇', '🫐', '🥝', '🍓', '🍌', '🍍', '🥭'].map((emoji, i) => (
        <motion.span
          key={i}
          className="fixed text-2xl pointer-events-none select-none z-0"
          style={{ left: `${5 + i * 9}%`, top: `${5 + (i % 6) * 16}%`, opacity: 0.06 + (i % 3) * 0.02 }}
          animate={{ y: [0, -16 - i * 2, 0], x: [0, i % 2 === 0 ? 8 : -8, 0], rotate: [0, i % 2 === 0 ? 12 : -12, 0] }}
          transition={{ duration: 6 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
        >
          {emoji}
        </motion.span>
      ))}

      <div className="flex items-center justify-between mb-3 relative z-10">
        <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2">
          <span className="text-2xl">🍎</span>
          <div>
            <h1 className="text-xl sm:text-2xl font-heading text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.25)]">FruitQuest</h1>
            <p className="text-[10px] text-green-300/70 font-bold tracking-wider flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Learn · Play · Grow
            </p>
          </div>
        </motion.div>
        <div className="flex items-center gap-1.5">
          <motion.button
            onClick={toggleMusic}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className={`rounded-full p-2 transition-all duration-200 ${musicOn ? 'bg-green-500/20 text-green-400 shadow-[0_0_12px_rgba(74,160,44,0.2)]' : 'bg-white/5 text-white/40 hover:text-white/70 hover:bg-white/10'}`}
          >
            {musicOn ? <Music2 className="w-4 h-4" /> : <Music className="w-4 h-4" />}
          </motion.button>
          <button onClick={toggleSfx}
            className="rounded-full p-2 bg-white/5 text-white/40 hover:text-white/70 hover:bg-white/10 transition-all duration-200 active:scale-90"
          >
            {sfxOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {highScore > 0 && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="relative z-10 mb-3">
          <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-yellow-500/20 via-amber-500/20 to-yellow-500/20 border border-yellow-500/30 rounded-full px-3 py-1 shadow-[0_0_16px_rgba(234,179,8,0.12)] backdrop-blur-sm">
            <Trophy className="w-3.5 h-3.5 text-yellow-400" />
            <span className="text-[10px] font-bold text-yellow-300">HIGH SCORE</span>
            <span className="text-sm font-black text-yellow-200">{highScore}</span>
          </div>
        </motion.div>
      )}

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-[1.5px] flex-1 bg-gradient-to-r from-green-400/60 via-white/40 to-green-400/60 rounded-full" />
          <span className="text-[9px] font-bold text-green-300/50 tracking-[0.25em] uppercase">Game Hub</span>
          <div className="h-[1.5px] flex-1 bg-gradient-to-r from-green-400/60 via-white/40 to-green-400/60 rounded-full" />
        </div>

        <div className="grid grid-cols-5 gap-2 auto-rows-fr">
          {hubTabs.map((tab, i) => {
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.06, type: 'spring', stiffness: 200, damping: 15 }}
                whileHover={{ scale: 1.04, y: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate(tab.path)}
                className={`relative flex flex-col items-center justify-center p-2 sm:p-3 rounded-2xl text-white
                  bg-gradient-to-br ${tab.color} ${tab.glow} transition-all duration-200
                  min-h-[80px] sm:min-h-[100px] border border-white/10 backdrop-blur-sm
                  hover:scale-[1.03] active:scale-[0.96]`}
              >
                <div className="absolute inset-0 rounded-2xl bg-[linear-gradient(135deg,rgba(255,255,255,0.15)_0%,transparent_50%)] pointer-events-none" />
                <Icon className="w-5 h-5 sm:w-7 sm:h-7 mb-1 drop-shadow-lg" />
                <span className="font-heading text-[10px] sm:text-xs drop-shadow-md">{tab.label}</span>
              </motion.button>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }} className="mt-3">
          <button
            onClick={() => onNavigate('playing')}
            className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-green-500 via-green-400 to-emerald-500
              text-white font-heading text-sm sm:text-base font-bold tracking-wider glow-green
              transition-all duration-200 hover:scale-[1.02] active:scale-[0.96]
              border border-white/15 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)] animate-shimmer" />
            <span className="relative z-10 flex items-center justify-center gap-1.5">
              <Play className="w-4 h-4 fill-white" /> JUMP INTO THE GAME
            </span>
          </button>
        </motion.div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center text-[9px] text-white/10 mt-3 pt-1 tracking-wider relative z-10"
      >
        Discover health benefits of fruits from across the globe
      </motion.p>
    </div>
  );
}
