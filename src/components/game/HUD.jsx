import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function HUD({ score, timer, lives, totalLives = 5, streak = 0, comboActive = false }) {
  const [prevLives, setPrevLives] = useState(lives);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (lives < prevLives) {
      setFlash(true);
      setTimeout(() => setFlash(false), 400);
    }
    setPrevLives(lives);
  }, [lives]);

  return (
    <>
      {/* Score */}
      <div className="absolute top-4 left-4 rounded-2xl px-4 py-2 z-20 bg-black/30 backdrop-blur-md border border-white/5 shadow-lg">
        <div className="text-xs text-green-400/80 font-bold tracking-wider">SCORE</div>
        <div className="text-2xl font-extrabold text-white tabular-nums">
          {score.toString().padStart(3, '0')}
        </div>
      </div>

      {/* Timer */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 rounded-2xl px-5 py-2 z-20 bg-black/30 backdrop-blur-md border border-white/5 shadow-lg flex items-center gap-2">
        <div className={`text-lg font-extrabold tabular-nums ${timer <= 10 ? 'text-red-400' : 'text-green-300'}`}>
          {timer}s
        </div>
        <div className="w-20 h-1.5 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${timer <= 10 ? 'bg-red-400' : 'bg-green-400'}`}
            animate={{ width: `${(timer / 60) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Streak / Combo */}
      {streak >= 2 && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-20">
          <motion.div
            key={streak}
            initial={{ scale: 1.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`text-sm font-black tracking-wider px-3 py-1 rounded-full ${
              comboActive
                ? 'text-yellow-300 bg-yellow-500/20 shadow-[0_0_20px_rgba(234,179,8,0.3)]'
                : 'text-green-300 bg-green-500/20'
            }`}
          >
            {streak}x {comboActive ? 'COMBO' : 'STREAK'}
          </motion.div>
        </div>
      )}

      {/* Lives */}
      <div className="absolute top-4 right-4 rounded-2xl px-4 py-2 z-20 bg-black/30 backdrop-blur-md border border-white/5 shadow-lg flex gap-1">
        {Array.from({ length: totalLives }, (_, i) => (
          <motion.span
            key={i}
            animate={i === lives && flash ? { scale: [1, 1.5, 1], opacity: [1, 0.3, 1] } : {}}
            transition={{ duration: 0.3 }}
            className={`text-xl ${i < lives ? 'opacity-100' : 'opacity-20'}`}
          >
            ❤️
          </motion.span>
        ))}
      </div>
    </>
  );
}
