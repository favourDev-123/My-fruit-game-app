import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

export default function QuizOption({ option, index, selected, correct, showResult, onSelect }) {
  const letters = ["A", "B", "C", "D"];
  
  let stateClass = "bg-card border-border hover:border-primary/50 hover:bg-primary/5 cursor-pointer";
  if (showResult) {
    if (index === correct) {
      stateClass = "bg-green-50 border-green-400 text-green-800";
    } else if (index === selected && index !== correct) {
      stateClass = "bg-red-50 border-red-400 text-red-800";
    } else {
      stateClass = "bg-muted/50 border-border opacity-60";
    }
  } else if (index === selected) {
    stateClass = "bg-primary/10 border-primary";
  }

  return (
    <motion.button
      whileHover={!showResult ? { scale: 1.01 } : {}}
      whileTap={!showResult ? { scale: 0.99 } : {}}
      onClick={() => !showResult && onSelect(index)}
      className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${stateClass}`}
      disabled={showResult}
    >
      <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0
        ${showResult && index === correct ? "bg-green-500 text-white" : 
          showResult && index === selected ? "bg-red-500 text-white" : 
          "bg-muted text-muted-foreground"}`}>
        {showResult && index === correct ? <Check className="w-4 h-4" /> :
         showResult && index === selected && index !== correct ? <X className="w-4 h-4" /> :
         letters[index]}
      </span>
      <span className="font-semibold text-sm">{option}</span>
    </motion.button>
  );
}