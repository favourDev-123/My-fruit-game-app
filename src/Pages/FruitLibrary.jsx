import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { fruits } from "@/lib/fruitData";
import FruitCard from "@/components/fruits/FruitCard";

export default function FruitLibrary() {
  const [search, setSearch] = useState("");

  const filtered = fruits.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.description.toLowerCase().includes(search.toLowerCase()) ||
    f.healthBenefits.some((b) => b.condition.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="font-heading text-3xl sm:text-4xl mb-3">
          🍎 Fruit Library
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Explore the health benefits of different fruits. Tap any fruit to learn more.
        </p>
      </div>

      <div className="max-w-md mx-auto mb-10 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search fruits or health benefits..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-12 h-12 rounded-full border-2 text-base"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <span className="text-5xl mb-4 block">🔍</span>
          <p className="text-muted-foreground text-lg">No fruits found. Try a different search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((fruit, i) => (
            <FruitCard key={fruit.id} fruit={fruit} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}