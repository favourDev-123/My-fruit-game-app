import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fruits } from '@/lib/fruitData';

const bgEmojis = ['🍎', '🍊', '🍋', '🍇', '🫐', '🥝', '🍓', '🍌'];

export default function Splash() {
  const navigate = useNavigate();
  const [logoFruit] = useState(() => fruits[Math.floor(Math.random() * fruits.length)]);
  const [dots, setDots] = useState('');

  useEffect(() => {
    const t = setTimeout(() => navigate('/home', { replace: true }), 3000);
    return () => clearTimeout(t);
  }, [navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((d) => (d.length >= 3 ? '' : d + '.'));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 game-gradient overflow-hidden flex flex-col items-center justify-center">
      {/* Floating background emojis */}
      {bgEmojis.map((emoji, i) => (
        <motion.span
          key={i}
          className="absolute text-3xl sm:text-4xl opacity-[0.06] pointer-events-none"
          style={{
            left: `${10 + (i * 12) % 80}%`,
            top: `${15 + (i * 17) % 70}%`,
          }}
          animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
        >
          {emoji}
        </motion.span>
      ))}

      {/* Logo area */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.2 }}
        className="flex flex-col items-center"
      >
        <motion.span
          className="text-8xl sm:text-9xl mb-4"
          animate={{ y: [0, -12, 0], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          {logoFruit?.emoji || '🍎'}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-4xl sm:text-5xl font-heading text-cyan-neon mb-3"
        >
          FruitQuest Academy
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-lg sm:text-xl text-cyan-200/70 font-semibold tracking-wider"
        >
          Learn · Play · Grow
        </motion.p>
      </motion.div>

      {/* Loading dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-16 text-cyan-400/60 text-lg font-mono"
      >
        Loading{dots}
      </motion.div>
    </div>
  );
}
