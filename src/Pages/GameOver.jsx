import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Home, Star } from 'lucide-react';
import { getHighScore } from '@/lib/gameStorage';

export default function GameOver() {
  const navigate = useNavigate();
  const location = useLocation();
  const score = location.state?.score || 0;
  const highScore = getHighScore();
  const [stars, setStars] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const s = score >= 15 ? 3 : score >= 8 ? 2 : score >= 3 ? 1 : 0;
    setTimeout(() => setStars(s), 300);
    setTimeout(() => setShowContent(true), 500);
  }, [score]);

  const isNewHigh = score >= highScore && score > 0;

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15, delayChildren: 0.6 } },
  };
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 15 } },
  };

  return (
    <div className="fixed inset-0 game-gradient overflow-hidden flex flex-col items-center justify-center p-6">
      {/* Stars */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.2 }}
        className="flex gap-2 mb-4"
      >
        {[1, 2, 3].map((s) => (
          <motion.div
            key={s}
            initial={{ scale: 0, rotate: -180 }}
            animate={stars >= s ? { scale: 1, rotate: 0 } : {}}
            transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.3 + s * 0.2 }}
          >
            <Star
              className={`w-10 h-10 sm:w-12 sm:h-12 ${
                stars >= s ? 'fill-yellow-400 text-yellow-400' : 'text-white/20'
              }`}
            />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate={showContent ? "show" : "hidden"}
        className="flex flex-col items-center gap-5 w-full max-w-sm z-10"
      >
        {/* Game Over text */}
        <motion.div variants={item} className="text-center">
          <div className="text-[10px] text-cyan-400/60 font-bold tracking-[0.2em] uppercase mb-1">
            Game Over
          </div>
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-5xl sm:text-6xl font-heading text-white"
          >
            {score}
          </motion.div>
          <div className="text-sm text-cyan-300/60 mt-1 font-semibold">points</div>
        </motion.div>

        {/* High score */}
        <motion.div variants={item} className="glass rounded-2xl px-5 py-3 w-full max-w-[220px] text-center">
          <div className="text-[10px] text-yellow-300/60 font-bold tracking-widest uppercase">High Score</div>
          <div className="text-2xl font-extrabold text-yellow-400">{highScore}</div>
          {isNewHigh && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 }}
              className="text-[10px] text-orange-400 font-bold tracking-widest mt-1"
            >
              ★ NEW HIGH SCORE! ★
            </motion.div>
          )}
        </motion.div>

        {/* Play Again */}
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
          Play Again
        </motion.button>

        {/* Home */}
        <motion.button
          variants={item}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/home')}
          className="w-full max-w-[280px] py-3.5 rounded-2xl font-heading text-lg text-white
            bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-200
            flex items-center justify-center gap-3"
        >
          <Home className="w-5 h-5" />
          Return Home
        </motion.button>
      </motion.div>
    </div>
  );
}
