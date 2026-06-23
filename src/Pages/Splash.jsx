import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { playSplash, resumeContext } from '@/lib/quizAudio';
import { useMusic } from '@/lib/MusicContext';

const FRUITS = ['🍎', '🍊', '🍋', '🍇', '🫐', '🥝', '🍓', '🍌', '🍉', '🥭'];
const ORBIT_RADIUS_X = 140;
const ORBIT_RADIUS_Y = 60;

export default function Splash() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const { startMusic } = useMusic();

  useEffect(() => {
    const t = setTimeout(() => navigate('/home', { replace: true }), 5500);
    return () => clearTimeout(t);
  }, [navigate]);

  useEffect(() => {
    resumeContext();
    const t = setTimeout(() => {
      playSplash();
      startMusic();
    }, 200);
    return () => clearTimeout(t);
  }, [startMusic]);

  return (
    <div className="fixed inset-0 game-gradient overflow-hidden flex flex-col items-center justify-center">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-green-500/5 blur-3xl" />

      {/* Background particles */}
      {FRUITS.slice(0, 6).map((emoji, i) => (
        <motion.span
          key={`bg-${i}`}
          className="absolute text-2xl opacity-[0.05] pointer-events-none"
          style={{ left: `${12 + i * 16}%`, top: `${15 + (i % 4) * 22}%` }}
          animate={{ y: [0, -20, 0], rotate: [0, 15, -15, 0] }}
          transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.6 }}
        >
          {emoji}
        </motion.span>
      ))}

      {/* Welcome text */}
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
        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mx-auto mt-3 w-24 h-[2px] bg-gradient-to-r from-green-400 via-white to-green-400 rounded-full origin-center"
        />
      </motion.div>

      {/* Orbiting fruits */}
      <div ref={containerRef} className="relative w-72 h-36 sm:w-80 sm:h-40 z-10">
        {FRUITS.map((emoji, i) => {
          const angle = (i / FRUITS.length) * Math.PI * 2;
          return (
            <motion.span
              key={i}
              className="absolute text-3xl sm:text-4xl"
              style={{
                left: '50%',
                top: '50%',
                marginLeft: -20,
                marginTop: -20,
              }}
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
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'linear',
                delay: i * 0.15,
              }}
            >
              {emoji}
            </motion.span>
          );
        })}
      </div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="text-sm text-green-300/40 mt-8 font-semibold tracking-wider z-10"
      >
        Discover · Learn · Play
      </motion.p>

      {/* Loading dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-12 text-green-400/40 text-sm font-mono z-10"
      >
        <Dots />
      </motion.div>
    </div>
  );
}

function Dots() {
  return (
    <span>
      <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}>.</motion.span>
      <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}>.</motion.span>
      <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}>.</motion.span>
    </span>
  );
}
