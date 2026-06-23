import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function HUD({ score, timer, lives, totalLives = 5 }) {
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
      <div className="absolute top-4 left-4 glass rounded-2xl px-4 py-2 z-20">
        <div className="text-xs text-cyan-300/80 font-bold tracking-wider">SCORE</div>
        <div className="text-2xl font-extrabold text-white tabular-nums">
          {score.toString().padStart(3, '0')}
        </div>
      </div>

      {/* Timer */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 glass rounded-2xl px-5 py-2 z-20 flex items-center gap-2">
        <div className={`text-lg font-extrabold tabular-nums ${timer <= 10 ? 'text-red-400' : 'text-cyan-300'}`}>
          {timer}s
        </div>
        <div className="w-20 h-1.5 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${timer <= 10 ? 'bg-red-400' : 'bg-cyan-400'}`}
            animate={{ width: `${(timer / 60) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Lives */}
      <div className="absolute top-4 right-4 glass rounded-2xl px-4 py-2 z-20 flex gap-1">
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
