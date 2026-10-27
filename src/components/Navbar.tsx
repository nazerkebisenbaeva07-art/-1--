import React from 'react';
import { ActiveTab } from '../types';
import { 
  Star, 
  Volume2, 
  VolumeX, 
  BookOpen, 
  Gamepad2, 
  CheckCircle2, 
  Layers, 
  Sparkles, 
  GraduationCap,
  MessageSquareHeart,
  Grid
} from 'lucide-react';
import { sound } from '../utils/sound';

interface Props {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  starsCount: number;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
  onOpenSticks: () => void;
}

export const Navbar: React.FC<Props> = ({
  activeTab,
  setActiveTab,
  starsCount,
  soundEnabled,
  setSoundEnabled,
  onOpenSticks,
}) => {
  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sound.enabled = next;
    if (next) sound.playClick();
  };

  const navItems: { id: ActiveTab; label: string; icon: string }[] = [
    { id: 'home', label: 'Басты бет', icon: '🏠' },
    { id: 'objectives', label: 'Мақсаты', icon: '🎯' },
    { id: 'explain', label: 'Түсіну', icon: '💡' },
    { id: 'table', label: 'Қосу кестесі', icon: '📊' },
    { id: 'games', label: 'Ойындар', icon: '🎮' },
    { id: 'case', label: 'Асхана кейсі', icon: '🍎' },
    { id: 'differentiated', label: 'Тапсырмалар', icon: '⭐' },
    { id: 'quiz', label: 'Тест', icon: '📝' },
    { id: 'feedback', label: 'Кері байланыс', icon: '🚦' },
    { id: 'teacher', label: 'Мұғалімге', icon: '👩‍🏫' },
  ];

  const handleNavClick = (tab: ActiveTab) => {
    sound.playClick();
    setActiveTab(tab);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-sky-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          
          {/* Brand Zone: 1st-grade friendly typography */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 group text-left cursor-pointer focus:outline-none shrink-0"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-amber-400 via-sky-400 to-indigo-500 flex items-center justify-center text-xl sm:text-2xl shadow-sm group-hover:scale-105 transition-transform">
              ✨
            </div>
            <div>
              <span className="font-heading font-extrabold text-base sm:text-xl tracking-tight bg-gradient-to-r from-sky-600 via-indigo-600 to-amber-500 bg-clip-text text-transparent block">
                МАТЕМАТИКА ӘЛЕМІ
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-slate-400 block -mt-0.5">
                1-сынып: Қосу және азайту
              </span>
            </div>
          </button>

          {/* Nav Items (scrollable row on medium screens, visible buttons on tablet/whiteboard) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 overflow-x-auto py-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-xl text-xs xl:text-sm font-bold flex items-center gap-1.5 transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-sky-500 text-white shadow-md shadow-sky-200 scale-105'
                      : 'text-slate-600 hover:text-sky-600 hover:bg-sky-50'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Zone: Stars counter, Sound, Counting sticks helper */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Stars score badge */}
            <div 
              title="Жиналған жұлдыздар"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border-2 border-amber-300 rounded-2xl shadow-xs"
            >
              <Star className="w-5 h-5 text-amber-500 fill-amber-400 animate-pulse-star" />
              <span className="font-black text-amber-800 text-sm sm:text-base tabular-nums">
                {starsCount}
              </span>
            </div>

            {/* Manipulative Sticks Tool Button */}
            <button
              onClick={onOpenSticks}
              className="p-2 sm:px-3 sm:py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-2 border-emerald-300 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all active:scale-95 shadow-xs"
              title="Санау таяқшаларын ашу (Көмекші құрал)"
            >
              <span className="text-base sm:text-lg">🪵</span>
              <span className="hidden sm:inline">Таяқшалар</span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className={`p-2.5 rounded-2xl border-2 transition-all active:scale-95 ${
                soundEnabled
                  ? 'bg-sky-50 border-sky-300 text-sky-600 hover:bg-sky-100'
                  : 'bg-slate-100 border-slate-300 text-slate-400'
              }`}
              title={soundEnabled ? 'Дыбысты өшіру' : 'Дыбысты қосу'}
            >
              {soundEnabled ? (
                <Volume2 className="w-5 h-5" />
              ) : (
                <VolumeX className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile/Tablet Secondary Nav Scroll Strip */}
        <div className="lg:hidden flex items-center gap-1.5 overflow-x-auto py-2 -mx-3 px-3 scrollbar-none border-t border-slate-100">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-sky-500 text-white shadow-sm'
                    : 'text-slate-600 bg-slate-50 hover:bg-sky-50'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
