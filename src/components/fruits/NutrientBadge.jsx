import { Badge } from "@/components/ui/badge";

export default function NutrientBadge({ nutrient }) {
  return (
    <Badge variant="outline" className="text-sm font-medium px-3 py-1 bg-card">
      {nutrient}
    </Badge>
  );
}