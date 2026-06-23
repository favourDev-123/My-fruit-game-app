import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Trophy, RotateCcw, Star, Home } from "lucide-react";

export default function ScoreScreen({ score, total, onRestart, onHome }) {
  const percentage = Math.round((score / total) * 100);
  const getMessage = () => {
    if (percentage === 100) return { text: "Perfect Score! 🎉", sub: "You're a Fruit Genius!" };
    if (percentage >= 80) return { text: "Amazing! 🌟", sub: "You really know your fruits!" };
    if (percentage >= 60) return { text: "Good Job! 👍", sub: "You're learning well!" };
    if (percentage >= 40) return { text: "Not Bad! 🍎", sub: "Keep learning about fruits!" };
    return { text: "Keep Going! 💪", sub: "Practice makes perfect!" };
  };

  const msg = getMessage();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center max-w-md mx-auto"
    >
      <div className="relative inline-block mb-6">
        <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
          <Trophy className="w-16 h-16 text-primary" />
        </div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="absolute -top-2 -right-2 w-12 h-12 rounded-full bg-secondary flex items-center justify-center"
        >
          <Star className="w-6 h-6 text-secondary-foreground" />
        </motion.div>
      </div>

      <h2 className="font-heading text-3xl mb-2">{msg.text}</h2>
      <p className="text-muted-foreground text-lg mb-6">{msg.sub}</p>

      <div className="bg-card rounded-2xl p-6 border border-border shadow-sm mb-8">
        <div className="text-5xl font-heading text-primary mb-2">{score}/{total}</div>
        <p className="text-muted-foreground">
          You got <span className="font-bold text-foreground">{percentage}%</span> correct
        </p>
      </div>

      <div className="flex gap-3 justify-center">
        <Button
          onClick={onRestart}
          size="lg"
          className="rounded-full px-8 gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Play Again
        </Button>
        {onHome && (
          <Button
            onClick={onHome}
            size="lg"
            variant="outline"
            className="rounded-full px-6 gap-2"
          >
            <Home className="w-4 h-4" />
            Home
          </Button>
        )}
      </div>
    </motion.div>
  );
}
