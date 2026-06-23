import { Link, useLocation } from "react-router-dom";
import { Apple, BookOpen, Gamepad2, Users, Home, Music, Music2 } from "lucide-react";
import { useMusic } from "@/lib/MusicContext";

const navItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/fruits", label: "Fruit Library", icon: Apple },
  { path: "/quiz", label: "Quiz Game", icon: Gamepad2 },
  { path: "/age-guide", label: "Age Guide", icon: Users },
  { path: "/learn", label: "Learn", icon: BookOpen },
];

export default function AppNavbar() {
  const location = useLocation();
  const { musicOn, toggleMusic } = useMusic();

  return (
    <nav className="sticky top-0 z-50 bg-[#0a1628]/90 backdrop-blur-xl border-b border-green-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🍎</span>
            <span className="font-heading text-xl text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] hidden sm:block">FruitQuest</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200
                    ${active 
                      ? "bg-green-500/20 text-green-300 shadow-[0_0_15px_rgba(34,197,94,0.15)]" 
                      : "text-white/40 hover:text-white/70 hover:bg-white/5"
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-1">
            {/* Music toggle */}
            <button
              onClick={toggleMusic}
              className={`p-2 rounded-xl transition-all duration-200 ${
                musicOn
                  ? "text-green-400 hover:text-green-300"
                  : "text-white/40 hover:text-white/70"
              }`}
              title={musicOn ? "Mute music" : "Play music"}
            >
              {musicOn ? <Music2 className="w-5 h-5" /> : <Music className="w-5 h-5" />}
            </button>

            {/* Mobile nav */}
            <div className="flex md:hidden items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`p-2 rounded-xl transition-all duration-200
                      ${active 
                        ? "bg-green-500/20 text-green-300" 
                        : "text-white/40 hover:text-white/70"
                      }`}
                  >
                    <Icon className="w-5 h-5" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
