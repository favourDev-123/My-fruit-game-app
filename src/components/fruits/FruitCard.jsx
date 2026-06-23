import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function FruitCard({ fruit, index, onSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <button onClick={() => onSelect(fruit.id)} className="w-full text-left">
        <Card className={`group relative overflow-hidden border-2 ${fruit.color} hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
          <div className="relative h-40 overflow-hidden">
            <img
              src={fruit.image}
              alt={fruit.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <span className="absolute top-3 left-3 text-4xl drop-shadow-lg">{fruit.emoji}</span>
          </div>
          <div className="p-4">
            <h3 className="font-heading text-lg mb-1">{fruit.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{fruit.description}</p>
            <div className="flex flex-wrap gap-1 mb-3">
              {fruit.healthBenefits.slice(0, 2).map((b) => (
                <Badge key={b.condition} variant="secondary" className={`${fruit.tagColor} text-xs`}>
                  {b.condition}
                </Badge>
              ))}
            </div>
            <div className="flex items-center text-primary text-sm font-semibold group-hover:gap-2 transition-all">
              Learn more <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </div>
        </Card>
      </button>
    </motion.div>
  );
}
