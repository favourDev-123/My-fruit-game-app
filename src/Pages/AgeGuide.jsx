import { useState } from "react";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { fruits, ageGroupLabels } from "@/lib/fruitData";

const ageKeys = Object.keys(ageGroupLabels);

export default function AgeGuide() {
  const [activeAge, setActiveAge] = useState("children");

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="font-heading text-3xl sm:text-4xl mb-3">
          👨‍👩‍👧‍👦 Age Guide
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Different ages need different nutrients. Find the best fruits for every stage of life.
        </p>
      </div>

      {/* Age selector */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {ageKeys.map((key) => {
          const group = ageGroupLabels[key];
          const active = activeAge === key;
          return (
            <button
              key={key}
              onClick={() => setActiveAge(key)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full border-2 font-semibold text-sm transition-all duration-200
                ${active
                  ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20"
                  : "bg-card border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
                }`}
            >
              <span className="text-lg">{group.emoji}</span>
              {group.label}
            </button>
          );
        })}
      </div>

      {/* Fruit recommendations */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeAge}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="grid gap-4 sm:grid-cols-2"
        >
          {fruits.map((fruit, i) => (
            <motion.div
              key={fruit.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <Card className="p-5 border-2 border-border hover:border-primary/20 hover:shadow-md transition-all duration-200">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className={`w-14 h-14 rounded-2xl ${fruit.color} border-2 flex items-center justify-center text-2xl`}>
                      {fruit.emoji}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-heading text-base mb-1">{fruit.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {fruit.ageGroups[activeAge]}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}