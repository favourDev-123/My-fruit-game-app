import { Link, useLocation } from "react-router-dom";
import { Apple, BookOpen, Gamepad2, Users, Home, Music, Music2 } from "lucide-react";
import { useMusic } from "@/lib/MusicContext";

const navItems = [
  { path: "/home", label: "Home", icon: Home, short: "Home" },
  { path: "/fruits", label: "Fruits", icon: Apple, short: "Fruits" },
  { path: "/quiz", label: "Quiz", icon: Gamepad2, short: "Quiz" },
  { path: "/age-guide", label: "Guide", icon: Users, short: "Guide" },
  { path: "/learn", label: "Learn", icon: BookOpen, short: "Learn" },
];

export default function AppNavbar() {
  const location = useLocation();
  const { musicOn, toggleMusic } = useMusic();

  return (
    <nav className="flex-shrink-0 bg-[#0a1628]/90 backdrop-blur-xl border-b border-white/5 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-14">
        <Link to="/home" className="flex items-center gap-2">
          <span className="text-xl">🍎</span>
          <span className="font-heading text-lg text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.15)] hidden sm:block">
            FruitQuest
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200
                  ${active
                    ? "bg-white/10 text-white shadow-[0_0_12px_rgba(255,255,255,0.08)]"
                    : "text-white/40 hover:text-white/70 hover:bg-white/5"
                  }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {item.label}
              </Link>
            );
          })}
          {/* Music toggle */}
          <button
            onClick={toggleMusic}
            className={`ml-2 p-1.5 rounded-lg transition-all duration-200 ${
              musicOn
                ? "text-green-400 hover:text-green-300"
                : "text-white/30 hover:text-white/60"
            }`}
            title={musicOn ? "Mute music" : "Play music"}
          >
            {musicOn ? <Music2 className="w-4 h-4" /> : <Music className="w-4 h-4" />}
          </button>
        </div>

        {/* Mobile: bottom nav bar */}
        <div className="flex md:hidden items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`p-2 rounded-xl transition-all duration-200 ${
                  active
                    ? "bg-white/10 text-white"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                <Icon className="w-4 h-4" />
              </Link>
            );
          })}
          {/* Mobile music toggle */}
          <button
            onClick={toggleMusic}
            className={`p-2 rounded-xl transition-all duration-200 ${
              musicOn ? "text-green-400" : "text-white/30"
            }`}
          >
            {musicOn ? <Music2 className="w-4 h-4" /> : <Music className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </nav>
  );
}
