import React, { useState } from 'react';
import { BilimpazGuide } from './BilimpazGuide';
import { FruitCounter } from './FruitCounter';
import { sound } from '../utils/sound';
import { fireConfetti } from '../utils/confetti';
import { Star, CheckCircle, Sparkles, Layers, Sliders, Lightbulb } from 'lucide-react';

interface Props {
  onEarnStar: () => void;
  onOpenSticks: () => void;
}

type LevelTab = 'start' | 'continue' | 'explore';

export const DifferentiatedSection: React.FC<Props> = ({ onEarnStar, onOpenSticks }) => {
  const [level, setLevel] = useState<LevelTab>('start');

  // --- Level 1: «Бастаймын» state ---
  const [l1Count, setL1Count] = useState<number | null>(null);
  const [l1Solved, setL1Solved] = useState(false);

  // --- Level 2: «Жалғастырамын» state ---
  const [l2Missing, setL2Missing] = useState<number | null>(null);
  const [l2Solved, setL2Solved] = useState(false);

  // --- Level 3: «Зерттеймін» state ---
  // Sub-task: Sum of 8 builder
  const [userExprPairs, setUserExprPairs] = useState<{ a: number; b: number }[]>([
    { a: 4, b: 4 },
  ]);
  const [inputA, setInputA] = useState<number>(3);
  const [inputB, setInputB] = useState<number>(5);
  const [l3StarsEarned, setL3StarsEarned] = useState(0);

  const handleL1Answer = (ans: number) => {
    setL1Count(ans);
    if (ans === 6) {
      sound.playSuccess();
      onEarnStar();
      fireConfetti();
      setL1Solved(true);
    } else {
      sound.playGentleError();
    }
  };

  const handleL2Answer = (ans: number) => {
    setL2Missing(ans);
    if (ans === 5) {
      sound.playSuccess();
      onEarnStar();
      fireConfetti();
      setL2Solved(true);
    } else {
      sound.playGentleError();
    }
  };

  const handleAddL3Pair = () => {
    if (inputA + inputB === 8) {
      sound.playSuccess();
      onEarnStar();
      fireConfetti();
      setUserExprPairs((prev) => [...prev, { a: inputA, b: inputB }]);
      setL3StarsEarned((c) => c + 1);
    } else {
      sound.playGentleError();
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-2">
      {/* Title */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-100 text-sky-800 rounded-full text-xs font-bold">
          <Layers className="w-3.5 h-3.5" /> Сабақты саралау және даралау
        </div>
        <h2 className="font-heading font-black text-2xl sm:text-3xl text-slate-900">
          САРАЛАНҒАН ТАПСЫРМАЛАР
        </h2>
        <p className="text-sm text-slate-600">
          Әр оқушы өзіне лайықты баспалдақты таңдап, білімін бекітеді!
        </p>
      </div>

      {/* 3 Level Tabs (Using the exact requested encouraging names only) */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 p-2 bg-white rounded-3xl border-2 border-slate-200 shadow-xs max-w-2xl mx-auto">
        <button
          onClick={() => {
            sound.playClick();
            setLevel('start');
          }}
          className={`flex-1 min-w-[150px] py-3 px-4 rounded-2xl font-heading font-black text-sm sm:text-base transition-all cursor-pointer flex items-center justify-center gap-2 ${
            level === 'start'
              ? 'bg-sky-500 text-white shadow-md scale-102'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <span>🌱</span> «Бастаймын»
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setLevel('continue');
          }}
          className={`flex-1 min-w-[150px] py-3 px-4 rounded-2xl font-heading font-black text-sm sm:text-base transition-all cursor-pointer flex items-center justify-center gap-2 ${
            level === 'continue'
              ? 'bg-amber-500 text-white shadow-md scale-102'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <span>🌿</span> «Жалғастырамын»
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setLevel('explore');
          }}
          className={`flex-1 min-w-[150px] py-3 px-4 rounded-2xl font-heading font-black text-sm sm:text-base transition-all cursor-pointer flex items-center justify-center gap-2 ${
            level === 'explore'
              ? 'bg-purple-600 text-white shadow-md scale-102'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <span>🚀</span> «Зерттеймін»
        </button>
      </div>

      {/* LEVEL 1: «БАСТАЙМЫН» */}
      {level === 'start' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-sky-300 shadow-md space-y-6 animate-pop-in">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-sky-100 pb-3">
            <div>
              <span className="text-xs font-black text-sky-600 uppercase">
                1-баспалдақ
              </span>
              <h3 className="font-heading font-black text-xl text-slate-800">
                «Бастаймын» деңгейінің тапсырмасы
              </h3>
            </div>
            <button
              onClick={onOpenSticks}
              className="px-3 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              🪵 Санау таяқшаларын көмекке шақыру
            </button>
          </div>

          <BilimpazGuide
            message="Суреттегі алмаларды сана және «2 қызыл алма қосу 4 жасыл алма» теңдігінің жауабын тап! Қажет болса, таяқшаларды пайдалан!"
            mood="happy"
          />

          <div className="bg-sky-50 rounded-3xl p-6 border-2 border-sky-200 text-center space-y-5">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="bg-white p-3 rounded-2xl border border-rose-200">
                <span className="text-xs font-bold text-rose-600 block mb-1">
                  2 қызыл алма
                </span>
                <FruitCounter type="red-apple" count={2} size="lg" interactive />
              </div>

              <span className="text-3xl font-black text-sky-500">+</span>

              <div className="bg-white p-3 rounded-2xl border border-emerald-200">
                <span className="text-xs font-bold text-emerald-600 block mb-1">
                  4 жасыл алма
                </span>
                <FruitCounter type="green-apple" count={4} size="lg" interactive />
              </div>

              <span className="text-3xl font-black text-slate-400">=</span>

              <div className="bg-white p-4 rounded-2xl border-2 border-dashed border-sky-300 min-w-[80px]">
                <span className="font-heading font-black text-3xl text-sky-600">
                  {l1Count !== null ? l1Count : '?'}
                </span>
              </div>
            </div>

            <div className="font-heading font-black text-3xl text-slate-800">
              2 + 4 = {l1Count !== null ? l1Count : '?'}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {[4, 5, 6, 7].map((num) => (
                <button
                  key={num}
                  onClick={() => handleL1Answer(num)}
                  className={`w-14 h-14 rounded-2xl font-black text-2xl border-2 transition-all cursor-pointer ${
                    l1Count === num
                      ? num === 6
                        ? 'bg-emerald-500 text-white border-emerald-600 shadow-md scale-105'
                        : 'bg-rose-500 text-white border-rose-600'
                      : 'bg-white hover:bg-sky-100 text-slate-800 border-sky-300'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>

            {l1Solved && (
              <div className="p-3 bg-emerald-100 text-emerald-900 rounded-2xl font-bold max-w-sm mx-auto border border-emerald-300 animate-pop-in">
                ✅ Керемет! 2 + 4 = 6 алма! Келесі деңгейге көше аласың!
              </div>
            )}
          </div>
        </div>
      )}

      {/* LEVEL 2: «ЖАЛҒАСТЫРАМЫН» */}
      {level === 'continue' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-300 shadow-md space-y-6 animate-pop-in">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-amber-100 pb-3">
            <div>
              <span className="text-xs font-black text-amber-600 uppercase">
                2-баспалдақ
              </span>
              <h3 className="font-heading font-black text-xl text-slate-800">
                «Жалғастырамын» деңгейінің тапсырмасы
              </h3>
            </div>
            <span className="text-xs font-bold bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
              Белгісіз қосылғыш
            </span>
          </div>

          <BilimpazGuide
            message="Бос ұяшықты толтыр: «3 + ❓ = 8». Үшке қандай санды қоссақ 8 шығады? Орын ауыстыру заңын (8 - 3 = ❓) еске түсір!"
            mood="thinking"
          />

          <div className="bg-amber-50 rounded-3xl p-6 border-2 border-amber-200 text-center space-y-5">
            <div className="font-heading font-black text-4xl sm:text-5xl text-slate-900 tracking-wider">
              3 + <span className="text-amber-600 underline px-2">{l2Missing !== null ? l2Missing : '❓'}</span> = 8
            </div>

            <p className="text-xs sm:text-sm font-semibold text-slate-600">
              Бос орынға сәйкес келетін қосылғышты таңда:
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {[3, 4, 5, 6].map((num) => (
                <button
                  key={num}
                  onClick={() => handleL2Answer(num)}
                  className={`w-14 h-14 rounded-2xl font-black text-2xl border-2 transition-all cursor-pointer ${
                    l2Missing === num
                      ? num === 5
                        ? 'bg-emerald-500 text-white border-emerald-600 shadow-md scale-105'
                        : 'bg-rose-500 text-white border-rose-600'
                      : 'bg-white hover:bg-amber-100 text-slate-800 border-amber-300'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>

            {l2Solved && (
              <div className="p-3 bg-emerald-100 text-emerald-900 rounded-2xl font-bold max-w-md mx-auto border border-emerald-300 animate-pop-in">
                ✅ Дұрыс таптың! 3 + 5 = 8 және 5 + 3 = 8!
              </div>
            )}
          </div>
        </div>
      )}

      {/* LEVEL 3: «ЗЕРТТЕЙМІН» */}
      {level === 'explore' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-purple-300 shadow-md space-y-6 animate-pop-in">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-purple-100 pb-3">
            <div>
              <span className="text-xs font-black text-purple-600 uppercase">
                3-баспалдақ • Шығармашылық
              </span>
              <h3 className="font-heading font-black text-xl text-slate-800">
                «Зерттеймін» — Жас ғалымдарға арналған
              </h3>
            </div>
            <span className="text-xs font-bold bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
              Шығармашылық ізденіс
            </span>
          </div>

          <BilimpazGuide
            message="Зерттеу тапсырмасы: Қосындысы 8-ге тең болатын бірнеше түрлі өрнек құрастыр! Екі санды таңдап, «Тексеру және қосу» батырмасын бас!"
            mood="celebrate"
          />

          <div className="bg-purple-50 rounded-3xl p-6 border-2 border-purple-200 space-y-6">
            <div className="text-center">
              <span className="text-xs font-bold text-purple-700 uppercase tracking-wider block">
                Зерттеу мақсаты:
              </span>
              <span className="font-heading font-black text-3xl text-purple-900">
                ? + ? = 8
              </span>
            </div>

            {/* Interactive Builder */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-2xl border border-purple-200">
                <span className="text-xs font-bold text-slate-500">1-сан:</span>
                <input
                  type="number"
                  min="0"
                  max="8"
                  value={inputA}
                  onChange={(e) => setInputA(Number(e.target.value))}
                  className="w-14 text-center font-heading font-black text-2xl border-b-2 border-purple-400 focus:outline-none"
                />
              </div>

              <span className="text-2xl font-black text-purple-600">+</span>

              <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-2xl border border-purple-200">
                <span className="text-xs font-bold text-slate-500">2-сан:</span>
                <input
                  type="number"
                  min="0"
                  max="8"
                  value={inputB}
                  onChange={(e) => setInputB(Number(e.target.value))}
                  className="w-14 text-center font-heading font-black text-2xl border-b-2 border-purple-400 focus:outline-none"
                />
              </div>

              <button
                onClick={handleAddL3Pair}
                className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-black text-sm rounded-2xl transition-all active:scale-95 cursor-pointer shadow-sm"
              >
                Тексеру және тізімге қосу
              </button>
            </div>

            {/* Already found pairs */}
            <div className="bg-white p-4 rounded-2xl border border-purple-200">
              <p className="text-xs font-bold text-purple-900 mb-2">
                Сен тапқан 8-ге тең өрнектер жиынтығы:
              </p>
              <div className="flex flex-wrap gap-2">
                {userExprPairs.map((p, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-xl font-heading font-bold text-sm border border-purple-300"
                  >
                    {p.a} + {p.b} = 8
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
