import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, BookOpen, Apple, Users, BookHeart, Volume2, VolumeX, Trophy } from 'lucide-react';
import { getHighScore, getSfxMuted, setSfxMuted } from '@/lib/gameStorage';

const tabs = [
  { path: '/game', label: 'Start Game', icon: Play, desc: 'Play the fruit quiz', color: 'from-cyan-500 to-cyan-600', glow: 'neon-glow' },
  { path: '/quiz', label: 'Quiz', icon: BookOpen, desc: 'Test your knowledge', color: 'from-orange-500 to-orange-600', glow: 'neon-glow-orange' },
  { path: '/fruits', label: 'Fruits', icon: Apple, desc: 'Explore fruits', color: 'from-green-500 to-emerald-600', glow: '' },
  { path: '/age-guide', label: 'Age Guide', icon: Users, desc: 'Fruits by age', color: 'from-purple-500 to-purple-600', glow: '' },
  { path: '/learn', label: 'Learn', icon: BookHeart, desc: 'Health benefits', color: 'from-pink-500 to-rose-600', glow: '' },
];

export default function Home() {
  const navigate = useNavigate();
  const [highScore, setHighScore] = useState(0);
  const [sfxOn, setSfxOn] = useState(!getSfxMuted());

  useEffect(() => {
    setHighScore(getHighScore());
  }, []);

  const toggleSfx = () => {
    const next = !sfxOn;
    setSfxOn(next);
    setSfxMuted(!next);
  };

  return (
    <div className="min-h-screen game-gradient overflow-hidden flex flex-col p-4 sm:p-6">
      {/* Floating background */}
      {['🍎', '🍊', '🍋', '🍇', '🫐', '🥝', '🍓', '🍌'].map((emoji, i) => (
        <motion.span
          key={i}
          className="fixed text-2xl opacity-[0.04] pointer-events-none"
          style={{ left: `${8 + i * 11}%`, top: `${10 + (i % 5) * 18}%` }}
          animate={{ y: [0, -15, 0], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 5 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
        >
          {emoji}
        </motion.span>
      ))}

      {/* Header */}
      <div className="flex items-center justify-between mb-6 mt-2">
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl sm:text-3xl font-heading text-cyan-neon"
          >
            FruitQuest
          </motion.h1>
          <p className="text-xs text-cyan-300/50 font-semibold tracking-wider">Learn · Play · Grow</p>
        </div>
        <div className="flex items-center gap-2">
          {highScore > 0 && (
            <div className="glass rounded-full px-3 py-1.5 flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-yellow-400" />
              <span className="text-sm font-bold text-white">{highScore}</span>
            </div>
          )}
          <button
            onClick={toggleSfx}
            className="glass rounded-full p-2 text-white/60 hover:text-white hover:bg-white/10 transition-all"
            title={sfxOn ? 'Mute' : 'Unmute'}
          >
            {sfxOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Horizontal tab cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex-1 flex flex-col"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 auto-rows-fr">
          {tabs.map((tab, i) => {
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.path}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08, type: 'spring', stiffness: 200, damping: 15 }}
                whileHover={{ scale: 1.03, y: -3 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(tab.path)}
                className={`relative flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl text-white
                  bg-gradient-to-br ${tab.color} ${tab.glow}
                  transition-all duration-200 min-h-[120px] sm:min-h-[140px]`}
              >
                <Icon className="w-8 h-8 sm:w-10 sm:h-10 mb-2 drop-shadow-lg" />
                <span className="font-heading text-sm sm:text-base">{tab.label}</span>
                <span className="text-[10px] text-white/60 mt-0.5 hidden sm:block">{tab.desc}</span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="text-center text-[10px] text-white/20 mt-4 py-2 tracking-wider"
      >
        Discover the health benefits of fruits from across the globe
      </motion.p>
    </div>
  );
}
