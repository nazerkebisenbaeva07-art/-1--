import React, { useState } from 'react';
import { Plus, Minus, RefreshCw, ArrowRightLeft, Sparkles, Check } from 'lucide-react';
import { BilimpazGuide } from './BilimpazGuide';
import { FruitCounter } from './FruitCounter';
import { sound } from '../utils/sound';
import { fireConfetti } from '../utils/confetti';

export const ExplainSection: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'addition' | 'subtraction' | 'commutative'>('addition');

  // Addition state: starts with 3, can add 2
  const [addedMore, setAddedMore] = useState(false);

  // Subtraction state: starts with 5, can subtract 2
  const [subtracted, setSubtracted] = useState(false);

  // Commutative state: swapped or original
  const [isSwapped, setIsSwapped] = useState(false);

  const handleAddApples = () => {
    sound.playSuccess();
    setAddedMore(true);
    fireConfetti();
  };

  const handleResetAddition = () => {
    sound.playPop();
    setAddedMore(false);
  };

  const handleSubtractApples = () => {
    sound.playPop();
    setSubtracted(true);
  };

  const handleResetSubtraction = () => {
    sound.playPop();
    setSubtracted(false);
  };

  const handleSwap = () => {
    sound.playStar();
    setIsSwapped((prev) => !prev);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-2">
      {/* Header */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold">
          <span>⏱️</span> 3–4 минуттық көрнекі түсіндірме бөлімі
        </div>
        <h2 className="font-heading font-black text-2xl sm:text-3xl text-slate-900">
          ТАҚЫРЫПТЫ ТҮСІНУ: ҚОСУ, АЗАЙТУ ЖӘНЕ ОРЫН АУЫСТЫРУ
        </h2>
        <p className="text-sm text-slate-600">
          Интерактивті тақтада заттарды санап, математикалық құпияларды ашайық!
        </p>
      </div>

      {/* Sub-tab switcher */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-white rounded-2xl border-2 border-slate-200 shadow-xs max-w-xl mx-auto">
        <button
          onClick={() => {
            sound.playClick();
            setActiveSubTab('addition');
          }}
          className={`flex-1 min-w-[130px] py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
            activeSubTab === 'addition'
              ? 'bg-sky-500 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          1. Қосу дегеніміз не?
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setActiveSubTab('subtraction');
          }}
          className={`flex-1 min-w-[130px] py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
            activeSubTab === 'subtraction'
              ? 'bg-amber-500 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          2. Азайту дегеніміз не?
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setActiveSubTab('commutative');
          }}
          className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
            activeSubTab === 'commutative'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          3. Орын ауыстыру заңы
        </button>
      </div>

      {/* SUB-SECTION 1: ҚОСУ ДЕГЕНІМІЗ НЕ? */}
      {activeSubTab === 'addition' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-sky-200 shadow-sm space-y-6 animate-pop-in">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-sky-100 pb-4">
            <div>
              <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
                1-қадам • Негізгі ұғым
              </span>
              <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-800">
                Қосу дегеніміз не?
              </h3>
            </div>
            <button
              onClick={handleResetAddition}
              className="px-3 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Бастапқы күйіне қайтару
            </button>
          </div>

          <BilimpazGuide
            message="«Қосу дегеніміз — заттарды біріктіру. Қосу кезінде заттардың жалпы санын анықтаймыз». Алмаларды бірге санайық!"
            mood="happy"
          />

          {/* Visual Interactive Display */}
          <div className="bg-gradient-to-b from-sky-50 to-white rounded-3xl p-6 border-2 border-sky-100 text-center space-y-6">
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
              {/* Group 1: 3 red apples */}
              <div className="bg-white p-4 rounded-2xl border-2 border-rose-200 shadow-xs">
                <p className="text-xs font-bold text-rose-600 mb-1">
                  1-топ: Алғашқы алмалар
                </p>
                <FruitCounter type="red-apple" count={3} interactive size="lg" />
                <span className="font-heading font-black text-2xl text-rose-600 tabular-nums">
                  3
                </span>
              </div>

              {/* Plus sign */}
              <div className="w-12 h-12 rounded-full bg-sky-500 text-white flex items-center justify-center text-2xl font-black shadow-md">
                +
              </div>

              {/* Group 2: 2 green apples (or placeholder) */}
              <div className="bg-white p-4 rounded-2xl border-2 border-emerald-200 shadow-xs min-w-[140px]">
                <p className="text-xs font-bold text-emerald-600 mb-1">
                  2-топ: Қосылған алмалар
                </p>
                {addedMore ? (
                  <div className="animate-pop-in">
                    <FruitCounter type="green-apple" count={2} interactive size="lg" />
                    <span className="font-heading font-black text-2xl text-emerald-600 tabular-nums">
                      2
                    </span>
                  </div>
                ) : (
                  <div className="py-6 text-slate-400 text-xs font-bold italic">
                    Әзірге алма қосылмады
                  </div>
                )}
              </div>

              {/* Equals sign */}
              <div className="w-12 h-12 rounded-full bg-indigo-500 text-white flex items-center justify-center text-2xl font-black shadow-md">
                =
              </div>

              {/* Result group */}
              <div className="bg-white p-4 rounded-2xl border-2 border-amber-300 shadow-xs min-w-[160px]">
                <p className="text-xs font-bold text-amber-700 mb-1">
                  Барлық алма саны:
                </p>
                {addedMore ? (
                  <div className="animate-pop-in">
                    <div className="flex items-center justify-center gap-1">
                      <FruitCounter type="red-apple" count={3} size="sm" />
                      <FruitCounter type="green-apple" count={2} size="sm" />
                    </div>
                    <span className="font-heading font-black text-3xl text-amber-600 tabular-nums block mt-1">
                      5
                    </span>
                  </div>
                ) : (
                  <div className="py-6 text-slate-400 text-xs font-bold">
                    3 алма
                  </div>
                )}
              </div>
            </div>

            {/* Action button */}
            <div>
              {!addedMore ? (
                <button
                  onClick={handleAddApples}
                  className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-base sm:text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:scale-95 inline-flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-6 h-6" />
                  Тағы 2 алма қосу
                </button>
              ) : (
                <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-100 text-emerald-800 rounded-2xl font-black text-lg border-2 border-emerald-300 animate-pop-in">
                  <Check className="w-6 h-6 text-emerald-600" />
                  Нәтиже: 3 + 2 = 5 алма болды!
                </div>
              )}
            </div>

            {/* Formal mathematical expression */}
            <div className="p-4 bg-white rounded-2xl border-2 border-slate-200 inline-block shadow-xs">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Математикалық өрнек:
              </span>
              <span className="font-heading font-black text-3xl sm:text-4xl text-slate-900 tracking-wider">
                {addedMore ? '3 + 2 = 5' : '3 + ? = ?'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* SUB-SECTION 2: АЗАЙТУ ДЕГЕНІМІЗ НЕ? */}
      {activeSubTab === 'subtraction' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-200 shadow-sm space-y-6 animate-pop-in">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-amber-100 pb-4">
            <div>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                2-қадам • Негізгі ұғым
              </span>
              <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-800">
                Азайту дегеніміз не?
              </h3>
            </div>
            <button
              onClick={handleResetSubtraction}
              className="px-3 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Бастапқы 5 алмаға оралу
            </button>
          </div>

          <BilimpazGuide
            message="«Азайту дегеніміз — заттардың бір бөлігін алып тастау және қалған санын анықтау». 5 алманың 2-еуін жеп қойсақ немесе алып тастасақ нешеуі қалады?"
            mood="thinking"
          />

          <div className="bg-gradient-to-b from-amber-50 to-white rounded-3xl p-6 border-2 border-amber-100 text-center space-y-6">
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
              {/* Initial: 5 red apples */}
              <div className="bg-white p-4 rounded-2xl border-2 border-rose-200 shadow-xs">
                <p className="text-xs font-bold text-slate-600 mb-1">
                  Бастапқы алмалар:
                </p>
                <div className="flex items-center justify-center gap-1">
                  {/* First 3 remain */}
                  <FruitCounter type="red-apple" count={3} interactive size="lg" />
                  {/* Remaining 2: animated out if subtracted */}
                  <div
                    className={`transition-all duration-500 ${
                      subtracted ? 'opacity-20 scale-75 line-through' : 'opacity-100'
                    }`}
                  >
                    <FruitCounter type="red-apple" count={2} interactive size="lg" />
                  </div>
                </div>
                <span className="font-heading font-black text-2xl text-slate-800 tabular-nums">
                  5 алма
                </span>
              </div>

              {/* Minus sign */}
              <div className="w-12 h-12 rounded-full bg-rose-500 text-white flex items-center justify-center text-2xl font-black shadow-md">
                −
              </div>

              {/* Subtracted count: 2 apples */}
              <div className="bg-white p-4 rounded-2xl border-2 border-rose-300 shadow-xs">
                <p className="text-xs font-bold text-rose-600 mb-1">
                  Алып тасталғаны:
                </p>
                <FruitCounter type="red-apple" count={2} size="md" />
                <span className="font-heading font-black text-2xl text-rose-600 tabular-nums">
                  2
                </span>
              </div>

              {/* Equals sign */}
              <div className="w-12 h-12 rounded-full bg-indigo-500 text-white flex items-center justify-center text-2xl font-black shadow-md">
                =
              </div>

              {/* Leftover: 3 apples */}
              <div className="bg-white p-4 rounded-2xl border-2 border-emerald-300 shadow-xs min-w-[140px]">
                <p className="text-xs font-bold text-emerald-700 mb-1">
                  Қалған алмалар:
                </p>
                {subtracted ? (
                  <div className="animate-pop-in">
                    <FruitCounter type="red-apple" count={3} interactive size="lg" />
                    <span className="font-heading font-black text-3xl text-emerald-600 tabular-nums">
                      3
                    </span>
                  </div>
                ) : (
                  <div className="py-6 text-slate-400 text-xs font-bold">
                    ? қалды
                  </div>
                )}
              </div>
            </div>

            {/* Action button */}
            <div>
              {!subtracted ? (
                <button
                  onClick={handleSubtractApples}
                  className="px-6 py-3.5 bg-rose-500 hover:bg-rose-600 text-white font-black text-base sm:text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:scale-95 inline-flex items-center gap-2 cursor-pointer"
                >
                  <Minus className="w-6 h-6" />
                  2 алманы алып тастау
                </button>
              ) : (
                <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-100 text-emerald-800 rounded-2xl font-black text-lg border-2 border-emerald-300 animate-pop-in">
                  <Check className="w-6 h-6 text-emerald-600" />
                  Дұрыс! 5 алмадан 2-сі алынды, 3 алма қалды!
                </div>
              )}
            </div>

            {/* Expression */}
            <div className="p-4 bg-white rounded-2xl border-2 border-slate-200 inline-block shadow-xs">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Математикалық өрнек:
              </span>
              <span className="font-heading font-black text-3xl sm:text-4xl text-slate-900 tracking-wider">
                {subtracted ? '5 − 2 = 3' : '5 − 2 = ?'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* SUB-SECTION 3: ҚОСУДЫҢ АУЫСТЫРЫМДЫЛЫҚ ҚАСИЕТІ */}
      {activeSubTab === 'commutative' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-purple-200 shadow-sm space-y-6 animate-pop-in">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-purple-100 pb-4">
            <div>
              <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">
                3-қадам • Маңызды қасиет
              </span>
              <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-800">
                Қосудың ауыстырымдылық қасиеті
              </h3>
            </div>
            <span className="text-xs font-bold bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
              Оқу мақсаты 1.1.2.3
            </span>
          </div>

          <BilimpazGuide
            message="«Қосылғыштардың орнын ауыстырғанмен, қосындының мәні өзгермейді». Төмендегі батырманы басып, топтардың орнын ауыстырып көр!"
            mood="celebrate"
          />

          <div className="bg-gradient-to-b from-purple-50 to-white rounded-3xl p-6 border-2 border-purple-100 text-center space-y-6">
            {/* Visual fruit groups that swap smoothly */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 min-h-[140px]">
              {/* Group A */}
              <div
                className={`p-4 rounded-2xl border-2 shadow-xs transition-all duration-500 transform ${
                  !isSwapped
                    ? 'border-rose-300 bg-rose-50/60'
                    : 'border-amber-300 bg-amber-50/60 translate-x-1 sm:translate-x-2'
                }`}
              >
                <p className="text-xs font-bold text-slate-600 mb-1">
                  {!isSwapped ? '1-қосылғыш: 3 қызыл алма' : '1-қосылғыш: 4 сары алма'}
                </p>
                {!isSwapped ? (
                  <FruitCounter type="red-apple" count={3} size="lg" />
                ) : (
                  <FruitCounter type="pear" count={4} size="lg" />
                )}
                <span className="font-heading font-black text-2xl text-slate-800 tabular-nums">
                  {!isSwapped ? '3' : '4'}
                </span>
              </div>

              {/* Plus sign */}
              <div className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center text-2xl font-black shadow-md">
                +
              </div>

              {/* Group B */}
              <div
                className={`p-4 rounded-2xl border-2 shadow-xs transition-all duration-500 transform ${
                  !isSwapped
                    ? 'border-amber-300 bg-amber-50/60'
                    : 'border-rose-300 bg-rose-50/60 -translate-x-1 sm:-translate-x-2'
                }`}
              >
                <p className="text-xs font-bold text-slate-600 mb-1">
                  {!isSwapped ? '2-қосылғыш: 4 сары алма' : '2-қосылғыш: 3 қызыл алма'}
                </p>
                {!isSwapped ? (
                  <FruitCounter type="pear" count={4} size="lg" />
                ) : (
                  <FruitCounter type="red-apple" count={3} size="lg" />
                )}
                <span className="font-heading font-black text-2xl text-slate-800 tabular-nums">
                  {!isSwapped ? '4' : '3'}
                </span>
              </div>

              {/* Equals sign */}
              <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center text-2xl font-black shadow-md">
                =
              </div>

              {/* Sum: always 7 */}
              <div className="bg-white p-4 rounded-2xl border-2 border-emerald-300 shadow-xs">
                <p className="text-xs font-bold text-emerald-700 mb-1">
                  Жалпы қосынды:
                </p>
                <div className="flex items-center justify-center gap-1">
                  <FruitCounter type="red-apple" count={3} size="sm" />
                  <FruitCounter type="pear" count={4} size="sm" />
                </div>
                <span className="font-heading font-black text-3xl text-emerald-600 tabular-nums block mt-1">
                  7 жеміс
                </span>
              </div>
            </div>

            {/* Swap Button */}
            <div>
              <button
                onClick={handleSwap}
                className="px-6 py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-black text-base sm:text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 inline-flex items-center gap-2 cursor-pointer"
              >
                <ArrowRightLeft className="w-6 h-6 animate-pulse" />
                Орындарын ауыстыру! (3 пен 4)
              </button>
            </div>

            {/* Dual Comparison Cards side-by-side as requested */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto pt-2">
              <div
                className={`p-4 rounded-2xl border-2 transition-all ${
                  !isSwapped ? 'bg-purple-100 border-purple-400 scale-105' : 'bg-white border-slate-200'
                }`}
              >
                <span className="text-xs font-bold text-slate-500 block">
                  1-жағдай:
                </span>
                <span className="font-heading font-black text-3xl text-purple-700">
                  3 + 4 = 7
                </span>
              </div>

              <div
                className={`p-4 rounded-2xl border-2 transition-all ${
                  isSwapped ? 'bg-purple-100 border-purple-400 scale-105' : 'bg-white border-slate-200'
                }`}
              >
                <span className="text-xs font-bold text-slate-500 block">
                  2-жағдай:
                </span>
                <span className="font-heading font-black text-3xl text-purple-700">
                  4 + 3 = 7
                </span>
              </div>
            </div>

            {/* Big Conclusion Banner */}
            <div className="p-4 bg-amber-50 rounded-2xl border-2 border-amber-300 text-amber-950 font-bold text-sm sm:text-base">
              🎉 Түйін: <span className="font-black text-amber-900">3 + 4 = 4 + 3 = 7</span>! Сандардың орнын ауыстырғанмен, нәтиже өзгермейді!
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
