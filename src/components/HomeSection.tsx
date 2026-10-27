import React from 'react';
import { ActiveTab } from '../types';
import { 
  Sparkles, 
  Play, 
  Lightbulb, 
  Gamepad2, 
  CheckCircle, 
  MessageSquareHeart, 
  Grid, 
  Star, 
  Layers, 
  ArrowRight,
  ShieldCheck,
  BookOpen
} from 'lucide-react';
import { BilimpazGuide } from './BilimpazGuide';
import { sound } from '../utils/sound';

interface Props {
  setActiveTab: (tab: ActiveTab) => void;
  starsCount: number;
  onOpenSticks: () => void;
}

export const HomeSection: React.FC<Props> = ({ setActiveTab, starsCount, onOpenSticks }) => {
  const navigate = (tab: ActiveTab) => {
    sound.playClick();
    setActiveTab(tab);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-2">
      {/* Top Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-400 via-indigo-400 to-purple-500 text-white p-6 sm:p-10 shadow-xl border-4 border-white">
        {/* Floating background decorative bubbles */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/15 rounded-full blur-xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-amber-300/20 rounded-full blur-lg pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs sm:text-sm font-extrabold text-amber-200">
              <Sparkles className="w-4 h-4 text-amber-300" />
              1-сынып математикасы • Ашық сабақ
            </div>
            
            <h1 className="font-heading font-black text-2xl sm:text-4xl md:text-5xl tracking-tight text-white leading-tight drop-shadow-xs">
              ҚОШ КЕЛДІҢДЕР, ЖАС МАТЕМАТИКТЕР!
            </h1>
            
            <p className="text-base sm:text-xl font-medium text-sky-100 leading-relaxed">
              Бүгін біз қосу мен азайтудың құпияларын ашамыз!
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <button
                onClick={() => navigate('objectives')}
                className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-900 font-black rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center gap-2 text-base cursor-pointer"
              >
                <Play className="w-5 h-5 fill-slate-900" />
                Сабақты бастау
              </button>

              <button
                onClick={() => navigate('explain')}
                className="px-5 py-3.5 bg-white/20 hover:bg-white/30 text-white backdrop-blur-md font-bold rounded-2xl transition-all active:scale-95 flex items-center gap-2 text-base cursor-pointer"
              >
                <Lightbulb className="w-5 h-5 text-amber-300" />
                Тақырыпты түсіну
              </button>
            </div>
          </div>

          {/* Large Bilimpaz Visual Card with Star counter */}
          <div className="shrink-0 flex flex-col items-center">
            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl bg-white/25 backdrop-blur-md border-4 border-white/50 p-3 shadow-2xl flex flex-col items-center justify-center animate-float">
              <span className="text-6xl sm:text-7xl select-none">🦉</span>
              <span className="mt-2 text-xs sm:text-sm font-black text-white bg-slate-900/40 px-3 py-0.5 rounded-full">
                Білімпаз дос
              </span>
            </div>

            {/* Stars score showcase on Home Page */}
            <div className="mt-3 bg-amber-400 text-slate-900 px-4 py-2 rounded-2xl shadow-lg border-2 border-white flex items-center gap-2">
              <Star className="w-5 h-5 fill-slate-900 text-slate-900" />
              <span className="font-extrabold text-sm sm:text-base">
                Жинаған жұлдызың: <span className="tabular-nums font-black text-lg">{starsCount}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bilimpaz Welcome Message */}
      <BilimpazGuide
        message="Сәлем, достым! Бүгінгі сабақта біз алмалар мен шарларды санаймыз, сиқырлы қосу мен азайту ойындарын ойнаймыз және керемет жұлдыздар жинаймыз. Қай бөлімнен бастағың келеді?"
        mood="happy"
      />

      {/* The 5 Main Requested Buttons as Big Interactive Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-800 flex items-center gap-2">
            <span>🚀</span> Негізгі оқу бөлімдері
          </h2>
          <span className="text-xs font-bold text-slate-400">
            Барлық батырмалар белсенді
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {/* 1. Сабақты бастау */}
          <button
            onClick={() => navigate('objectives')}
            className="group p-5 bg-white rounded-3xl border-2 border-sky-200 hover:border-sky-400 shadow-sm hover:shadow-md transition-all text-left flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">
                🎯
              </div>
              <h3 className="font-heading font-bold text-lg text-slate-800 group-hover:text-sky-600 transition-colors">
                1. Сабақты бастау
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Оқу мақсаттарымен танысу және сабаққа қызықты кіріспе.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-sky-600">
              <span>Ашып көру</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* 2. Тақырыпты түсіну */}
          <button
            onClick={() => navigate('explain')}
            className="group p-5 bg-white rounded-3xl border-2 border-amber-200 hover:border-amber-400 shadow-sm hover:shadow-md transition-all text-left flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">
                💡
              </div>
              <h3 className="font-heading font-bold text-lg text-slate-800 group-hover:text-amber-600 transition-colors">
                2. Тақырыпты түсіну
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Қосу, азайту және орындарды ауыстырудың анимациялық түсіндірмесі (3-4 мин).
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-600">
              <span>Көрнекі сабақ</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* 3. Ойындар әлемі */}
          <button
            onClick={() => navigate('games')}
            className="group p-5 bg-white rounded-3xl border-2 border-purple-200 hover:border-purple-400 shadow-sm hover:shadow-md transition-all text-left flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">
                🎮
              </div>
              <h3 className="font-heading font-bold text-lg text-slate-800 group-hover:text-purple-600 transition-colors">
                3. Ойындар әлемі
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                4 интерактивті ойын: Сиқырлы қосу, Азайту аралы, Жұбын тап, Қатені тап.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-600">
              <span>Ойынға кіру</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* 4. Білімімді тексеру */}
          <button
            onClick={() => navigate('quiz')}
            className="group p-5 bg-white rounded-3xl border-2 border-emerald-200 hover:border-emerald-400 shadow-sm hover:shadow-md transition-all text-left flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">
                📝
              </div>
              <h3 className="font-heading font-bold text-lg text-slate-800 group-hover:text-emerald-600 transition-colors">
                4. Білімімді тексеру
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                10 сұрақтан тұратын қорытынды тест, 10 баллдық автоматты бағалау.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600">
              <span>Тест тапсыру</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* 5. Кері байланыс */}
          <button
            onClick={() => navigate('feedback')}
            className="group p-5 bg-white rounded-3xl border-2 border-rose-200 hover:border-rose-400 shadow-sm hover:shadow-md transition-all text-left flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">
                🚦
              </div>
              <h3 className="font-heading font-bold text-lg text-slate-800 group-hover:text-rose-600 transition-colors">
                5. Кері байланыс
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                «Бағдаршам» әдісі арқылы өзін-өзі бағалау және сабақты қорыту.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-rose-600">
              <span>Бағдаршам таңдау</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Additional Quick Access Card: Қосу кестесі & Асхана кейсі */}
          <button
            onClick={() => navigate('table')}
            className="group p-5 bg-white rounded-3xl border-2 border-indigo-200 hover:border-indigo-400 shadow-sm hover:shadow-md transition-all text-left flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">
                📊
              </div>
              <h3 className="font-heading font-bold text-lg text-slate-800 group-hover:text-indigo-600 transition-colors">
                Қосу кестесі (10-ға дейін)
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Интерактивті кесте және бос ұяшықтарды толтыру жаттығуы.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
              <span>Кестені көру</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>
      </div>

      {/* Teacher & Commission Special Section banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400/20 text-amber-300 rounded-full text-xs font-bold">
            <ShieldCheck className="w-4 h-4" />
            Ашық сабақ комиссиясы мен ұстаздарға
          </div>
          <h3 className="font-heading font-bold text-xl sm:text-2xl text-white">
            Педагогикалық құжаттама және бағалау жүйесі
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            1.1.2.4 және 1.1.2.3 оқу мақсаттары, сабақ кезеңдерінің регламенті, 10 балдық шкала, дескрипторлар және инклюзия нұсқаулығы.
          </p>
        </div>

        <button
          onClick={() => navigate('teacher')}
          className="px-6 py-3 bg-white text-slate-900 hover:bg-slate-100 font-extrabold rounded-2xl text-sm transition-all active:scale-95 shrink-0 flex items-center gap-2 cursor-pointer shadow-md"
        >
          <BookOpen className="w-4 h-4 text-sky-600" />
          Мұғалім бөлімін ашу
        </button>
      </div>
    </div>
  );
};
