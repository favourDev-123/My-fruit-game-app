import { useState, useMemo, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Lightbulb, Volume2, VolumeX } from "lucide-react";
import { quizQuestions } from "@/lib/fruitData";
import QuizOption from "@/components/quiz/QuizOption";
import ScoreScreen from "@/components/quiz/ScoreScreen";
import {
  playCorrect,
  playWrong,
  playFinish,
  resumeContext,
} from "@/lib/quizAudio";

function shuffleArray(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function QuizGame() {
  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [sfxMuted, setSfxMuted] = useState(false);
  const mutedRef = useRef(false);

  const questions = useMemo(() => shuffleArray(quizQuestions).slice(0, 8), [started]);

  useEffect(() => {
    if (started) {
      resumeContext();
    }
  }, [started]);

  useEffect(() => {
    if (finished) {
      if (!mutedRef.current) playFinish();
    }
  }, [finished]);

  const toggleSfx = () => {
    const next = !sfxMuted;
    setSfxMuted(next);
    mutedRef.current = next;
  };

  const handleSelect = (index) => {
    setSelected(index);
  };

  const handleConfirm = () => {
    if (selected === null) return;
    if (!showResult) {
      const isCorrect = selected === questions[currentQ].correct;
      if (isCorrect) {
        setScore((s) => s + 1);
        if (!mutedRef.current) playCorrect();
      } else {
        if (!mutedRef.current) playWrong();
      }
      setShowResult(true);
    } else {
      if (currentQ < questions.length - 1) {
        setCurrentQ((q) => q + 1);
        setSelected(null);
        setShowResult(false);
      } else {
        setFinished(true);
      }
    }
  };

  const restart = () => {
    setStarted(false);
    setCurrentQ(0);
    setSelected(null);
    setShowResult(false);
    setScore(0);
    setFinished(false);
    setTimeout(() => setStarted(true), 50);
  };

  if (!started) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-7xl block mb-6">🧠</span>
          <h1 className="font-heading text-3xl sm:text-4xl mb-4">Fruit Health Quiz</h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
            Test your knowledge about the health benefits of fruits! 
            8 questions, each one teaches you something new.
          </p>
          <Button
            size="lg"
            onClick={() => { resumeContext(); setStarted(true); }}
            className="rounded-full px-10 gap-2 text-base shadow-lg shadow-primary/20"
          >
            Start Quiz <ArrowRight className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        <ScoreScreen score={score} total={questions.length} onRestart={restart} />
      </div>
    );
  }

  const q = questions[currentQ];
  const progress = ((currentQ + 1) / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-muted-foreground">
            Question {currentQ + 1} of {questions.length}
          </span>
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-primary">{score} points</span>
            <button
              onClick={toggleSfx}
              className="p-1.5 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              title={sfxMuted ? "Unmute SFX" : "Mute SFX"}
            >
              {sfxMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="font-heading text-xl sm:text-2xl mb-6">{q.question}</h2>

          <div className="space-y-3 mb-6">
            {q.options.map((option, i) => (
              <QuizOption
                key={i}
                option={option}
                index={i}
                selected={selected}
                correct={q.correct}
                showResult={showResult}
                onSelect={handleSelect}
              />
            ))}
          </div>

          {/* Explanation */}
          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex gap-3 mb-6"
            >
              <Lightbulb className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm text-foreground">{q.explanation}</p>
            </motion.div>
          )}

          <Button
            onClick={handleConfirm}
            disabled={selected === null}
            size="lg"
            className="w-full rounded-xl gap-2"
          >
            {showResult
              ? currentQ < questions.length - 1
                ? "Next Question"
                : "See Results"
              : "Check Answer"}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}