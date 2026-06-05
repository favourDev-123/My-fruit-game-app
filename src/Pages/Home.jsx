import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Apple, Gamepad2, Users, BookOpen, ArrowRight, Sparkles } from "lucide-react";

const features = [
  {
    icon: Apple,
    title: "Fruit Library",
    description: "Explore 10+ fruits with detailed health benefits and nutrient profiles.",
    link: "/fruits",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: Gamepad2,
    title: "Health Quiz",
    description: "Test your knowledge with fun, interactive quizzes about fruit health facts.",
    link: "/quiz",
    color: "bg-orange-100 text-orange-600",
  },
  {
    icon: Users,
    title: "Age Guide",
    description: "Find the best fruits for every age group — babies to seniors.",
    link: "/age-guide",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: BookOpen,
    title: "Health Conditions",
    description: "Discover which fruits help with specific health conditions.",
    link: "/learn",
    color: "bg-rose-100 text-rose-600",
  },
];

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <section className="relative px-4 pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Welcome to FruitQuest Academy
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading text-foreground leading-tight mb-6">
              Discover the Superpowered
              <span className="text-primary"> Health Benefits</span> of Fruits
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Unlock the superpowered health benefits of nature's best fruits through fun,
              interactive games and easy-to-digest knowledge tailored for all ages.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/fruits">
                <Button size="lg" className="gap-2 text-base">
                  Explore Fruits <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/quiz">
                <Button size="lg" variant="outline" className="gap-2 text-base">
                  Take a Quiz <Gamepad2 className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:pb-28">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-heading text-foreground mb-4">
              Explore & Learn
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Everything you need to know about fruits and their health benefits.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link to={feature.link} className="block group">
                  <div className="h-full p-6 rounded-2xl border bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4`}>
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-heading text-foreground mb-2 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
