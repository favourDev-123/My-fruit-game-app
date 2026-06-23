import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import HUD from '@/components/game/HUD';
import FallingFruit from '@/components/game/FallingFruit';
import ParticleEffect from '@/components/game/ParticleEffect';
import { getRandomNutrient, getRoundFruits } from '@/lib/gameData';
import { setHighScore } from '@/lib/gameStorage';
import { playCorrect, playWrong } from '@/lib/quizAudio';
import { getSfxMuted } from '@/lib/gameStorage';

const TOTAL_LIVES = 5;
const GAME_DURATION = 60;

export default function Game() {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(GAME_DURATION);
  const [lives, setLives] = useState(TOTAL_LIVES);
  const [nutrient, setNutrient] = useState('');
  const [options, setOptions] = useState([]);
  const [correctId, setCorrectId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [particles, setParticles] = useState(false);
  const [shake, setShake] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const mutedRef = useRef(getSfxMuted());
  const timerRef = useRef(null);
  const roundRef = useRef(0);

  const startRound = useCallback(() => {
    const n = getRandomNutrient();
    const round = getRoundFruits(n, 4);
    setNutrient(n);
    setOptions(round.options);
    setCorrectId(round.correctId);
    setSelectedId(null);
    setShowResult(false);
  }, []);

  useEffect(() => {
    startRound();
  }, []);

  useEffect(() => {
    if (gameOver) return;
    timerRef.current = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          setGameOver(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [gameOver]);

  useEffect(() => {
    if (gameOver) {
      setHighScore(score);
      const t = setTimeout(() => navigate('/gameover', { state: { score } }), 800);
      return () => clearTimeout(t);
    }
  }, [gameOver, score, navigate]);

  const handleSelect = (fruit) => {
    if (showResult || gameOver) return;
    setSelectedId(fruit.id);
    setShowResult(true);

    if (fruit.id === correctId) {
      setScore((s) => s + 1);
      setParticles(true);
      if (!mutedRef.current) playCorrect();
      setTimeout(() => setParticles(false), 200);
      setTimeout(() => startRound(), 600);
    } else {
      setLives((l) => {
        const next = l - 1;
        if (next <= 0) {
          setGameOver(true);
        }
        return next;
      });
      setShake(true);
      if (!mutedRef.current) playWrong();
      setTimeout(() => setShake(false), 400);
      setTimeout(() => startRound(), 800);
    }
  };

  return (
    <div className={`fixed inset-0 game-gradient overflow-hidden ${shake ? 'animate-shake' : ''}`}>
      <ParticleEffect active={particles} />

      <HUD score={score} timer={timer} lives={Math.max(0, lives)} totalLives={TOTAL_LIVES} />

      {/* Nutrient prompt */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full px-4 text-center z-10">
        <motion.div
          key={nutrient}
          initial={{ opacity: 0, y: -20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          <div className="text-[10px] sm:text-xs text-cyan-400/60 font-bold tracking-[0.2em] uppercase mb-1">
            Find a fruit rich in
          </div>
          <div className="text-2xl sm:text-3xl font-heading text-white text-shadow-lg">
            {nutrient}
          </div>
        </motion.div>
      </div>

      {/* Fruits area */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center items-end gap-3 sm:gap-5 px-4 z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={nutrient + roundRef.current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center items-end gap-3 sm:gap-5 flex-wrap"
          >
            {options.map((fruit, i) => (
              <FallingFruit
                key={fruit.id + '-' + i}
                fruit={fruit}
                index={i}
                onSelect={handleSelect}
                disabled={showResult}
                isCorrect={fruit.id === correctId}
                showResult={showResult}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Subtle gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0a1628] to-transparent pointer-events-none" />
    </div>
  );
}
