import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { fruits, ageGroupLabels } from "@/lib/fruitData";
import NutrientBadge from "@/components/fruits/NutrientBadge";
import HealthBenefitItem from "@/components/fruits/HealthBenefitItem";

export default function FruitDetail({ fruitId, onBack }) {
  const fruit = fruits.find((f) => f.id === fruitId);

  if (!fruit) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <span className="text-6xl block mb-4">🤔</span>
        <h2 className="font-heading text-2xl mb-4">Fruit not found</h2>
        <Button onClick={onBack} variant="outline" className="rounded-full">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Library
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Button onClick={onBack} variant="ghost" className="mb-6 rounded-full gap-2 text-muted-foreground hover:text-foreground">
        <ArrowLeft className="w-4 h-4" /> Back to Library
      </Button>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="relative rounded-3xl overflow-hidden mb-8">
          <img src={fruit.image} alt={fruit.name} className="w-full h-56 sm:h-72 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 sm:p-8">
            <span className="text-5xl drop-shadow-lg block mb-2">{fruit.emoji}</span>
            <h1 className="font-heading text-3xl sm:text-4xl text-white">{fruit.name}</h1>
          </div>
        </div>

        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{fruit.description}</p>

        <div className="mb-8">
          <h2 className="font-heading text-xl mb-3">Key Nutrients</h2>
          <div className="flex flex-wrap gap-2">
            {fruit.nutrients.map((n) => (
              <NutrientBadge key={n} nutrient={n} />
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="font-heading text-xl mb-3">Health Benefits</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {fruit.healthBenefits.map((b) => (
              <HealthBenefitItem key={b.condition} benefit={b} />
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="font-heading text-xl mb-3">Age-Specific Benefits</h2>
          <Tabs defaultValue="children">
            <TabsList className="w-full grid grid-cols-4 h-auto p-1 bg-muted rounded-xl">
              {Object.entries(ageGroupLabels).map(([key, group]) => (
                <TabsTrigger key={key} value={key}
                  className="rounded-lg py-2 text-xs sm:text-sm data-[state=active]:shadow-sm"
                >
                  <span className="hidden sm:inline mr-1">{group.emoji}</span>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>
            {Object.entries(fruit.ageGroups).map(([key, info]) => (
              <TabsContent key={key} value={key}>
                <div className={`p-5 rounded-xl border-2 ${ageGroupLabels[key].color} mt-3`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{ageGroupLabels[key].emoji}</span>
                    <h3 className="font-bold">{ageGroupLabels[key].label}</h3>
                  </div>
                  <p className="text-sm leading-relaxed">{info}</p>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </motion.div>
    </div>
  );
}
