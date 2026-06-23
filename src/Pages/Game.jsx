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
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [popupText, setPopupText] = useState(null);
  const [comboActive, setComboActive] = useState(false);
  const mutedRef = useRef(getSfxMuted());
  const timerRef = useRef(null);
  const streakTimeoutRef = useRef(null);

  const showPopup = (text, color) => {
    setPopupText({ text, color });
    setTimeout(() => setPopupText(null), 800);
  };

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
      const t = setTimeout(() => navigate('/gameover', { state: { score, bestStreak } }), 800);
      return () => clearTimeout(t);
    }
  }, [gameOver, score, bestStreak, navigate]);

  const handleSelect = (fruit) => {
    if (showResult || gameOver) return;
    setSelectedId(fruit.id);
    setShowResult(true);

    if (fruit.id === correctId) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > bestStreak) setBestStreak(newStreak);

      if (newStreak >= 3) {
        setComboActive(true);
        showPopup(`${newStreak}x COMBO!`, 'text-yellow-300');
        clearTimeout(streakTimeoutRef.current);
        streakTimeoutRef.current = setTimeout(() => setComboActive(false), 2000);
      } else {
        showPopup('+1', 'text-green-400');
      }

      setScore((s) => s + newStreak >= 3 ? s + 2 : s + 1);
      setParticles(true);
      if (!mutedRef.current) playCorrect();
      setTimeout(() => setParticles(false), 200);
      setTimeout(() => startRound(), 600);
    } else {
      setStreak(0);
      setComboActive(false);
      showPopup('MISS!', 'text-red-400');
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
      {/* Background glow rings for game feel */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-green-500/5 blur-3xl animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-[200px] h-[200px] rounded-full bg-cyan-500/5 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <ParticleEffect active={particles} />

      <HUD score={score} timer={timer} lives={Math.max(0, lives)} totalLives={TOTAL_LIVES} streak={streak} comboActive={comboActive} />

      {/* Floating score popup */}
      <AnimatePresence>
        {popupText && (
          <motion.div
            key={popupText.text + Date.now()}
            initial={{ opacity: 0, y: 0, scale: 0.5 }}
            animate={{ opacity: 1, y: -40, scale: 1.2 }}
            exit={{ opacity: 0, y: -80, scale: 0.8 }}
            transition={{ duration: 0.4 }}
            className={`absolute top-32 left-1/2 -translate-x-1/2 z-50 text-2xl font-black pointer-events-none drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] ${popupText.color}`}
          >
            {popupText.text}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nutrient prompt - game style */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full px-4 text-center z-10">
        <motion.div
          key={nutrient}
          initial={{ opacity: 0, y: -20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          <div className="text-[10px] text-green-400/80 font-bold tracking-[0.25em] uppercase mb-1">
            Find a fruit rich in
          </div>
          <div className="text-2xl sm:text-3xl font-heading text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            {nutrient}
          </div>
          {/* Decorative line */}
          <div className="mx-auto mt-2 w-16 h-[2px] bg-gradient-to-r from-green-400 via-white to-green-400 rounded-full" />
        </motion.div>
      </div>

      {/* Fruits area with running-game feel */}
      <div className="absolute bottom-8 left-0 right-0 z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={nutrient}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center items-end gap-3 sm:gap-5 px-4"
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

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0a1628] to-transparent pointer-events-none" />
    </div>
  );
}
