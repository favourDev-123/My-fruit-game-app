import { motion } from 'framer-motion';

export default function FallingFruit({ fruit, onSelect, disabled, index, isCorrect, showResult }) {
  const colorMap = {
    'bg-yellow-100': 'bg-yellow-500/30',
    'bg-indigo-100': 'bg-indigo-500/30',
    'bg-orange-100': 'bg-orange-500/30',
    'bg-red-100': 'bg-red-500/30',
    'bg-green-100': 'bg-green-500/30',
    'bg-pink-100': 'bg-pink-500/30',
    'bg-emerald-100': 'bg-emerald-500/30',
    'bg-amber-100': 'bg-amber-500/30',
    'bg-lime-100': 'bg-lime-500/30',
    'bg-rose-100': 'bg-rose-500/30',
  };
  const bgColor = colorMap[fruit.color?.split(' ')[0]] || 'bg-cyan-500/30';

  return (
    <motion.button
      initial={{ opacity: 0, y: 80, scale: 0.5 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        ...(showResult && isCorrect ? { scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] } : {}),
        ...(showResult && !isCorrect && !disabled ? { x: [0, -5, 5, -3, 3, 0] } : {}),
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 15, delay: index * 0.08 }}
      onClick={() => !disabled && onSelect(fruit)}
      disabled={disabled}
      className={`relative flex flex-col items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-2xl cursor-pointer
        ${showResult && isCorrect ? 'ring-4 ring-green-400 ring-offset-2 ring-offset-[#0a1628]' : ''}
        ${showResult && !isCorrect && !disabled ? 'ring-4 ring-red-500 ring-offset-2 ring-offset-[#0a1628]' : ''}
        ${!showResult ? 'hover:scale-110 active:scale-95' : ''}
        transition-all duration-200`}
      style={{
        background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15), ${bgColor})`,
        boxShadow: showResult && isCorrect
          ? '0 0 30px rgba(34,197,94,0.5), inset 0 0 20px rgba(34,197,94,0.2)'
          : '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
      }}
    >
      <span className="text-4xl sm:text-5xl drop-shadow-lg">{fruit.emoji}</span>
      <span className="text-[10px] sm:text-xs font-bold text-white/80 mt-1 truncate max-w-full px-1">
        {fruit.name}
      </span>
    </motion.button>
  );
}
