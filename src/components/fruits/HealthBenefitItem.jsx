import { Heart } from "lucide-react";

export default function HealthBenefitItem({ benefit }) {
  return (
    <div className="flex gap-3 p-4 rounded-xl bg-muted/50 border border-border">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
        <Heart className="w-5 h-5 text-primary" />
      </div>
      <div>
        <h4 className="font-bold text-sm">{benefit.condition}</h4>
        <p className="text-sm text-muted-foreground mt-0.5">{benefit.detail}</p>
      </div>
    </div>
  );
}