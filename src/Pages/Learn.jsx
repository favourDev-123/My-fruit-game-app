import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { fruits, healthConditions } from "@/lib/fruitData";

export default function Learn({ onBack }) {
  const [activeCondition, setActiveCondition] = useState(null);
  const [search, setSearch] = useState("");

  const filteredConditions = healthConditions.filter((c) =>
    c.toLowerCase().includes(search.toLowerCase())
  );

  const matchingFruits = activeCondition
    ? fruits.filter((f) =>
        f.healthBenefits.some((b) => b.condition === activeCondition)
      )
    : [];

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <Button onClick={onBack} variant="ghost" className="mb-4 rounded-full gap-2 text-muted-foreground hover:text-foreground">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Button>

      <div className="text-center mb-6">
        <h1 className="font-heading text-3xl sm:text-4xl mb-3">❤️ Health Conditions</h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Select a health condition to discover which fruits can help.
        </p>
      </div>

      <div className="max-w-md mx-auto mb-6 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search conditions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-12 h-12 rounded-full border-2 text-base"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {filteredConditions.map((condition) => {
          const active = activeCondition === condition;
          return (
            <button
              key={condition}
              onClick={() => setActiveCondition(active ? null : condition)}
              className={`px-4 py-2 rounded-full border-2 text-sm font-semibold transition-all duration-200
                ${active
                  ? "bg-accent text-accent-foreground border-accent shadow-md"
                  : "bg-card border-border text-muted-foreground hover:border-accent/40 hover:text-foreground"
                }`}
            >
              {condition}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {activeCondition ? (
          <motion.div
            key={activeCondition}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
          >
            <h2 className="font-heading text-xl mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-accent" />
              Fruits that help with {activeCondition}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {matchingFruits.map((fruit, i) => {
                const benefit = fruit.healthBenefits.find(
                  (b) => b.condition === activeCondition
                );
                return (
                  <motion.div
                    key={fruit.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Card className="p-5 border-2 border-border hover:shadow-md transition-all">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <img
                            src={fruit.image}
                            alt={fruit.name}
                            className="w-16 h-16 rounded-xl object-cover"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xl">{fruit.emoji}</span>
                            <h3 className="font-heading text-base">{fruit.name}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {benefit?.detail}
                          </p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {fruit.nutrients.slice(0, 3).map((n) => (
                              <Badge key={n} variant="secondary" className="text-xs">
                                {n}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <span className="text-5xl block mb-4">👆</span>
            <p className="text-muted-foreground text-lg">
              Select a health condition above to see recommended fruits.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
