import React, { useState } from 'react';
import { BilimpazGuide } from '../BilimpazGuide';
import { sound } from '../../utils/sound';
import { fireConfetti } from '../../utils/confetti';
import { Star, CheckCircle, RefreshCcw, Wind } from 'lucide-react';

interface Props {
  onEarnStar: () => void;
}

interface SubtractionQuestion {
  total: number;
  subtracted: number;
  options: number[];
}

export const SubtractionIslandGame: React.FC<Props> = ({ onEarnStar }) => {
  const questions: SubtractionQuestion[] = [
    { total: 7, subtracted: 3, options: [3, 4, 5] },
    { total: 5, subtracted: 2, options: [2, 3, 4] },
    { total: 8, subtracted: 3, options: [4, 5, 6] },
    { total: 6, subtracted: 4, options: [1, 2, 3] },
    { total: 9, subtracted: 5, options: [3, 4, 5] },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlownAway, setIsFlownAway] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [solvedCount, setSolvedCount] = useState(0);

  const currentQ = questions[currentIndex];
  const correctLeft = currentQ.total - currentQ.subtracted;

  const handleFlyAway = () => {
    sound.playPop();
    setIsFlownAway(true);
  };

  const handleSelectOption = (opt: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(opt);

    const right = opt === correctLeft;
    setIsCorrect(right);

    if (right) {
      sound.playSuccess();
      onEarnStar();
      fireConfetti();
      setSolvedCount((c) => c + 1);
    } else {
      sound.playGentleError();
    }
  };

  const handleNext = () => {
    sound.playPop();
    setSelectedOption(null);
    setIsCorrect(null);
    setIsFlownAway(false);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const balloonColors = [
    '#f43f5e', '#ec4899', '#8b5cf6', '#3b82f6', '#06b6d4', 
    '#10b981', '#f59e0b', '#f97316', '#6366f1'
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-300 shadow-md space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-emerald-100 pb-4">
        <div>
          <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider">
            2-ойын • Азайту аралы
          </span>
          <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-800 mt-1">
            Неше шар қалды?
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500">
            Сұрақ: <span className="text-emerald-600 font-black">{currentIndex + 1} / {questions.length}</span>
          </span>
          <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-xl text-xs font-extrabold flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            {solvedCount} ұпай
          </span>
        </div>
      </div>

      <BilimpazGuide
        message={
          !isFlownAway
            ? `«Аралда ${currentQ.total} түрлі-түсті шар бар. «Шарларды ұшыру» батырмасын басқанда, ${currentQ.subtracted} шар ұшып кетеді! Содан соң қалғандарын сана!»`
            : isCorrect === true
            ? `Керемет! ${currentQ.total} − ${currentQ.subtracted} = ${correctLeft} шар қалды! 1 жұлдыз алдың!`
            : isCorrect === false
            ? "Асықпай, аралда қалған шарларды бір-бірлеп санап көр!"
            : `Кәне, енді аралда неше шар қалды? Төменнен жауабын таңда!`
        }
        mood={isCorrect === true ? 'celebrate' : isCorrect === false ? 'encouraging' : 'happy'}
      />

      {/* Tropical Island Visual Graphic Stage */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-sky-200 via-sky-100 to-amber-100 p-6 sm:p-8 border-2 border-emerald-200 min-h-[340px] flex flex-col justify-between shadow-inner">
        {/* Sky with floating clouds */}
        <div className="absolute top-4 left-6 text-4xl select-none opacity-80 animate-float">
          ☁️
        </div>
        <div className="absolute top-8 right-12 text-3xl select-none opacity-70 animate-float" style={{ animationDelay: '1.5s' }}>
          ☁️
        </div>

        {/* Tropical Island Backdrop elements */}
        <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-emerald-500 via-emerald-400 to-amber-200 rounded-b-3xl flex items-end justify-center pb-2 select-none pointer-events-none">
          <span className="text-5xl sm:text-6xl mr-6">🌴</span>
          <span className="text-4xl sm:text-5xl">🏝️</span>
          <span className="text-5xl sm:text-6xl ml-6">🌴</span>
        </div>

        {/* Balloons Display Container */}
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4 py-4 max-w-xl mx-auto">
          {Array.from({ length: currentQ.total }).map((_, i) => {
            const isOneOfSubtracted = i >= currentQ.total - currentQ.subtracted;
            const flyingAnimation = isFlownAway && isOneOfSubtracted;

            return (
              <div
                key={i}
                className={`relative flex flex-col items-center transition-all duration-1000 ${
                  flyingAnimation
                    ? '-translate-y-48 translate-x-12 opacity-0 scale-50'
                    : 'translate-y-0 opacity-100'
                }`}
              >
                <div
                  className="w-12 h-16 sm:w-14 sm:h-18 rounded-full shadow-md flex items-center justify-center text-white font-black text-sm relative"
                  style={{
                    backgroundColor: balloonColors[i % balloonColors.length],
                    boxShadow: 'inset -3px -3px 8px rgba(0,0,0,0.2)',
                  }}
                >
                  <span className="opacity-90">{i + 1}</span>
                  {/* Balloon knot */}
                  <div className="absolute -bottom-1 w-2 h-1.5 bg-black/30 rounded-full" />
                </div>
                {/* String */}
                <div className="w-0.5 h-6 bg-slate-400/80" />
              </div>
            );
          })}
        </div>

        {/* Fly Away Action Button (if not flown yet) */}
        <div className="relative z-10 text-center py-2">
          {!isFlownAway ? (
            <button
              onClick={handleFlyAway}
              className="px-6 py-3.5 bg-sky-500 hover:bg-sky-600 text-white font-black rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 inline-flex items-center gap-2 cursor-pointer text-base"
            >
              <Wind className="w-5 h-5 animate-pulse" />
              {currentQ.subtracted} шарды ұшырып жіберу 🎈💨
            </button>
          ) : (
            <div className="inline-block bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-emerald-300 text-emerald-800 font-extrabold text-sm shadow-xs">
              {currentQ.subtracted} шар аспанға ұшып кетті!
            </div>
          )}
        </div>
      </div>

      {/* Equation and Question Display */}
      <div className="text-center space-y-4">
        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 inline-block">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Өрнек:
          </span>
          <span className="font-heading font-black text-3xl sm:text-4xl text-slate-900 tracking-wider">
            {currentQ.total} − {currentQ.subtracted} = {selectedOption !== null ? selectedOption : '?'}
          </span>
        </div>

        {/* 3 Answer choices */}
        {isFlownAway && (
          <div className="space-y-4 animate-pop-in">
            <p className="font-bold text-slate-700 text-sm">
              Қалған шарлар санын таңда:
            </p>

            <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-md mx-auto">
              {currentQ.options.map((opt) => {
                const isThisSelected = selectedOption === opt;
                const isThisCorrect = opt === correctLeft;

                let btnStyle = 'bg-white hover:bg-emerald-50 text-slate-800 border-emerald-300 hover:border-emerald-400';
                if (selectedOption !== null) {
                  if (isThisCorrect) {
                    btnStyle = 'bg-emerald-500 text-white border-emerald-600 shadow-lg scale-105';
                  } else if (isThisSelected && !isThisCorrect) {
                    btnStyle = 'bg-rose-500 text-white border-rose-600';
                  } else {
                    btnStyle = 'bg-slate-100 text-slate-400 border-slate-200 opacity-60';
                  }
                }

                return (
                  <button
                    key={opt}
                    disabled={selectedOption !== null}
                    onClick={() => handleSelectOption(opt)}
                    className={`h-16 sm:h-20 rounded-2xl border-3 font-heading font-black text-2xl sm:text-3xl shadow-sm transition-all transform active:scale-95 cursor-pointer ${btnStyle}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {selectedOption !== null && (
              <div className="pt-2 animate-pop-in">
                <button
                  onClick={handleNext}
                  className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-2xl text-base shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
                >
                  {currentIndex < questions.length - 1 ? 'Келесі аралға өту ➡️' : 'Басынан бастау 🔄'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
