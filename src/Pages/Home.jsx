import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, BookOpen, Volume2, VolumeX, Trophy } from 'lucide-react';
import { getHighScore, getSfxMuted, setSfxMuted } from '@/lib/gameStorage';

const bgEmojis = ['🍎', '🍊', '🍋', '🍇', '🫐', '🥝', '🍓', '🍌', '🍉', '🥭'];

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

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  };
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 15 } },
  };

  return (
    <div className="fixed inset-0 game-gradient overflow-hidden flex flex-col items-center justify-center p-6">
      {/* Floating background emojis */}
      {bgEmojis.map((emoji, i) => (
        <motion.span
          key={i}
          className="absolute text-2xl sm:text-3xl opacity-[0.07] pointer-events-none"
          style={{ left: `${8 + (i * 10) % 84}%`, top: `${10 + (i * 13) % 80}%` }}
          animate={{ y: [0, -15, 0], rotate: [0, 8, -8, 0] }}
          transition={{ duration: 5 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
        >
          {emoji}
        </motion.span>
      ))}

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col items-center gap-5 w-full max-w-sm z-10"
      >
        {/* Logo */}
        <motion.div variants={item} className="flex flex-col items-center mb-2">
          <motion.span
            className="text-7xl sm:text-8xl mb-3"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            🍎
          </motion.span>
          <h1 className="text-3xl sm:text-4xl font-heading text-cyan-neon text-center">
            FruitQuest Academy
          </h1>
          <p className="text-sm text-cyan-300/60 mt-1 font-semibold tracking-wider">
            LEARN · PLAY · GROW
          </p>
        </motion.div>

        {/* High Score */}
        <motion.div variants={item} className="glass rounded-2xl px-5 py-3 w-full max-w-[260px] flex items-center gap-3">
          <Trophy className="w-5 h-5 text-yellow-400 flex-shrink-0" />
          <div>
            <div className="text-[10px] text-yellow-300/60 font-bold tracking-widest uppercase">High Score</div>
            <div className="text-xl font-extrabold text-white">{highScore}</div>
          </div>
        </motion.div>

        {/* Start Game */}
        <motion.button
          variants={item}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/game')}
          className="w-full max-w-[280px] py-4 rounded-2xl font-heading text-xl text-white neon-glow
            bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500
            transition-all duration-200 flex items-center justify-center gap-3"
        >
          <Play className="w-6 h-6 fill-white" />
          Start Game
        </motion.button>

        {/* Quiz & Learn */}
        <motion.button
          variants={item}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/quiz')}
          className="w-full max-w-[280px] py-3.5 rounded-2xl font-heading text-lg text-white
            bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500
            transition-all duration-200 flex items-center justify-center gap-3 neon-glow-orange"
        >
          <BookOpen className="w-5 h-5" />
          Quiz & Learn
        </motion.button>

        {/* Sound toggle */}
        <motion.button
          variants={item}
          whileTap={{ scale: 0.9 }}
          onClick={toggleSfx}
          className="glass rounded-full p-3 text-white/60 hover:text-white hover:bg-white/10 transition-all"
          title={sfxOn ? 'Mute' : 'Unmute'}
        >
          {sfxOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </motion.button>
      </motion.div>
    </div>
  );
}
