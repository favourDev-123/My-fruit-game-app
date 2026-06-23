import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, BookOpen, Apple, Users, BookHeart, Volume2, VolumeX, Trophy, Music, Music2 } from 'lucide-react';
import { getHighScore, getSfxMuted, setSfxMuted } from '@/lib/gameStorage';
import { useMusic } from '@/lib/MusicContext';

const tabs = [
  { path: '/game', label: 'Start Game', icon: Play, desc: 'Play the fruit quiz', color: 'from-green-500 to-emerald-600', glow: 'shadow-[0_0_30px_rgba(34,197,94,0.5)]' },
  { path: '/quiz', label: 'Quiz', icon: BookOpen, desc: 'Test your knowledge', color: 'from-orange-500 to-orange-600', glow: 'shadow-[0_0_30px_rgba(249,115,22,0.5)]' },
  { path: '/fruits', label: 'Fruits', icon: Apple, desc: 'Explore fruits', color: 'from-cyan-500 to-cyan-600', glow: '' },
  { path: '/age-guide', label: 'Age Guide', icon: Users, desc: 'Fruits by age', color: 'from-purple-500 to-purple-600', glow: '' },
  { path: '/learn', label: 'Learn', icon: BookHeart, desc: 'Health benefits', color: 'from-pink-500 to-rose-600', glow: '' },
];

export default function Home() {
  const navigate = useNavigate();
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
    <div className="min-h-screen game-gradient overflow-hidden flex flex-col p-4 sm:p-6 relative">
      {/* Floating background fruits - more energetic */}
      {['🍎', '🍊', '🍋', '🍇', '🫐', '🥝', '🍓', '🍌', '🍍', '🥭'].map((emoji, i) => (
        <motion.span
          key={i}
          className="fixed text-3xl pointer-events-none"
          style={{
            left: `${5 + i * 9}%`,
            top: `${5 + (i % 6) * 16}%`,
            opacity: 0.06 + (i % 3) * 0.02,
          }}
          animate={{
            y: [0, -20 - i * 3, 0],
            x: [0, i % 2 === 0 ? 10 : -10, 0],
            rotate: [0, i % 2 === 0 ? 15 : -15, 0],
          }}
          transition={{
            duration: 6 + i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.4,
          }}
        >
          {emoji}
        </motion.span>
      ))}

      {/* Top bar with Naija styling */}
      <div className="flex items-center justify-between mb-6 mt-2 relative z-10">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <span className="text-3xl">🍎</span>
            <div>
              <h1 className="text-2xl sm:text-3xl font-heading text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                FruitQuest
              </h1>
              <p className="text-xs text-green-300/70 font-bold tracking-wider flex items-center gap-1">
                <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Learn · Play · Grow
              </p>
            </div>
          </motion.div>
        </div>
        <div className="flex items-center gap-2">
          {/* Music toggle - prominent */}
          <motion.button
            onClick={toggleMusic}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`rounded-full p-2.5 transition-all duration-300 ${
              musicOn
                ? 'bg-green-500/20 text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.3)]'
                : 'bg-white/5 text-white/40 hover:text-white/70'
            }`}
            title={musicOn ? 'Mute music' : 'Play music'}
          >
            {musicOn ? <Music2 className="w-5 h-5" /> : <Music className="w-5 h-5" />}
          </motion.button>

          {/* SFX toggle */}
          <button
            onClick={toggleSfx}
            className="glass rounded-full p-2 text-white/60 hover:text-white hover:bg-white/10 transition-all"
            title={sfxOn ? 'Mute SFX' : 'Unmute SFX'}
          >
            {sfxOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* High score banner */}
      {highScore > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative z-10 mb-4 mx-auto"
        >
          <div className="bg-gradient-to-r from-yellow-500/20 via-amber-500/20 to-yellow-500/20 border border-yellow-500/30 rounded-full px-4 py-1.5 flex items-center gap-2 shadow-[0_0_20px_rgba(234,179,8,0.15)]">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span className="text-xs font-bold text-yellow-300">HIGH SCORE</span>
            <span className="text-sm font-black text-yellow-200">{highScore}</span>
          </div>
        </motion.div>
      )}

      {/* Hero section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative z-10 flex-1 flex flex-col"
      >
        {/* Naija-inspired title strip */}
        <div className="flex items-center gap-2 mb-4 px-1">
          <div className="h-[2px] flex-1 bg-gradient-to-r from-green-400 via-white to-green-400 rounded-full" />
          <span className="text-[10px] font-bold text-green-300/60 tracking-[0.3em] uppercase">Play Mode</span>
          <div className="h-[2px] flex-1 bg-gradient-to-r from-green-400 via-white to-green-400 rounded-full" />
        </div>

        {/* Game cards grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 auto-rows-fr">
          {tabs.map((tab, i) => {
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.path}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08, type: 'spring', stiffness: 200, damping: 15 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(tab.path)}
                className={`relative flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl text-white
                  bg-gradient-to-br ${tab.color} ${tab.glow}
                  transition-all duration-200 min-h-[120px] sm:min-h-[140px]
                  border border-white/10 backdrop-blur-sm`}
              >
                {/* Shine effect on hover */}
                <div className="absolute inset-0 rounded-2xl bg-[linear-gradient(135deg,rgba(255,255,255,0.15)_0%,transparent_50%)] pointer-events-none" />
                <Icon className="w-8 h-8 sm:w-10 sm:h-10 mb-2 drop-shadow-lg" />
                <span className="font-heading text-sm sm:text-base drop-shadow-md">{tab.label}</span>
                <span className="text-[10px] text-white/60 mt-0.5 hidden sm:block">{tab.desc}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Quick start */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6"
        >
          <button
            onClick={() => navigate('/game')}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-green-500 via-green-400 to-emerald-500
              text-white font-heading text-lg font-bold tracking-wider
              shadow-[0_0_30px_rgba(34,197,94,0.4)] hover:shadow-[0_0_50px_rgba(34,197,94,0.6)]
              transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]
              border border-white/20 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)] animate-shimmer" />
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Play className="w-5 h-5" /> JUMP INTO THE GAME
            </span>
          </button>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="text-center text-[10px] text-white/15 mt-4 py-2 tracking-wider relative z-10"
      >
        Discover the health benefits of fruits from across the globe
      </motion.p>
    </div>
  );
}
