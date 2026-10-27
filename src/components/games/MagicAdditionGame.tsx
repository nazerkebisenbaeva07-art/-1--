import React, { useState } from 'react';
import { FruitCounter } from '../FruitCounter';
import { BilimpazGuide } from '../BilimpazGuide';
import { sound } from '../../utils/sound';
import { fireConfetti } from '../../utils/confetti';
import { Star, CheckCircle, RefreshCcw, Sparkles } from 'lucide-react';

interface Props {
  onEarnStar: () => void;
}

interface Question {
  a: number;
  b: number;
  options: number[];
}

export const MagicAdditionGame: React.FC<Props> = ({ onEarnStar }) => {
  const questions: Question[] = [
    { a: 2, b: 3, options: [4, 5, 6] },
    { a: 4, b: 2, options: [5, 6, 7] },
    { a: 5, b: 3, options: [7, 8, 9] },
    { a: 6, b: 2, options: [7, 8, 9] },
    { a: 4, b: 4, options: [7, 8, 9] },
    { a: 3, b: 6, options: [8, 9, 10] },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [solvedCount, setSolvedCount] = useState(0);

  const currentQ = questions[currentIndex];
  const correctAnswer = currentQ.a + currentQ.b;

  const handleSelectOption = (val: number) => {
    if (selectedOption !== null) return; // already answered
    setSelectedOption(val);

    const right = val === correctAnswer;
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
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handleRestart = () => {
    sound.playPop();
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsCorrect(null);
    setSolvedCount(0);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-sky-300 shadow-md space-y-6">
      {/* Game Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-sky-100 pb-4">
        <div>
          <span className="text-xs font-black text-sky-600 bg-sky-100 px-3 py-1 rounded-full uppercase tracking-wider">
            1-ойын • Сиқырлы қосу
          </span>
          <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-800 mt-1">
            Өрнектің мәнін тап!
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500">
            Сұрақ: <span className="text-sky-600 font-black">{currentIndex + 1} / {questions.length}</span>
          </span>
          <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-xl text-xs font-extrabold flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            {solvedCount} ұпай
          </span>
        </div>
      </div>

      <BilimpazGuide
        message={
          isCorrect === true
            ? "Жарайсың! Дұрыс жауап! 1 жұлдыз алдың! Келесі сұраққа өту үшін батырманы бас."
            : isCorrect === false
            ? "Қателеспе, достым! Алмаларды мұқият санап көр, сен міндетті түрде табасың!"
            : "Өрнекті мұқият оқып, алмаларды сана. Төмендегі үш жауаптың бірін таңда!"
        }
        mood={isCorrect === true ? 'celebrate' : isCorrect === false ? 'encouraging' : 'happy'}
      />

      {/* Main Interactive Play Area */}
      <div className="bg-gradient-to-b from-sky-50/70 to-white rounded-3xl p-6 border-2 border-sky-100 text-center space-y-6">
        {/* Visual Item counters */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
          <div className="bg-white p-3 rounded-2xl border-2 border-rose-200 shadow-xs">
            <FruitCounter type="red-apple" count={currentQ.a} interactive size="lg" />
            <span className="font-heading font-black text-2xl text-rose-600 tabular-nums">
              {currentQ.a}
            </span>
          </div>

          <span className="text-3xl font-black text-sky-500">+</span>

          <div className="bg-white p-3 rounded-2xl border-2 border-emerald-200 shadow-xs">
            <FruitCounter type="green-apple" count={currentQ.b} interactive size="lg" />
            <span className="font-heading font-black text-2xl text-emerald-600 tabular-nums">
              {currentQ.b}
            </span>
          </div>

          <span className="text-3xl font-black text-indigo-500">=</span>

          <div className="bg-white p-4 rounded-2xl border-2 border-dashed border-amber-300 shadow-xs min-w-[90px] flex items-center justify-center">
            <span className="font-heading font-black text-3xl text-amber-600">
              {selectedOption !== null ? selectedOption : '?'}
            </span>
          </div>
        </div>

        {/* The Equation in big, clear whiteboard-friendly numbers */}
        <div className="text-3xl sm:text-5xl font-heading font-black text-slate-800 tracking-wider">
          {currentQ.a} + {currentQ.b} = {selectedOption !== null ? selectedOption : '?'}
        </div>

        {/* 3 Answer Choice Buttons */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-md mx-auto">
          {currentQ.options.map((opt) => {
            const isThisSelected = selectedOption === opt;
            const isThisCorrect = opt === correctAnswer;

            let btnStyle = 'bg-white hover:bg-sky-50 text-slate-800 border-sky-300 hover:border-sky-400';
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

        {/* Feedback message banner */}
        {selectedOption !== null && (
          <div className="pt-2 animate-pop-in">
            {isCorrect ? (
              <div className="p-4 bg-emerald-100 text-emerald-900 border-2 border-emerald-300 rounded-2xl font-bold flex items-center justify-center gap-2 max-w-md mx-auto">
                <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
                <span>Дұрыс! {currentQ.a} + {currentQ.b} = {correctAnswer}!</span>
              </div>
            ) : (
              <div className="p-4 bg-rose-100 text-rose-900 border-2 border-rose-300 rounded-2xl font-bold max-w-md mx-auto">
                Қайта байқап көр! {currentQ.a} + {currentQ.b} = {correctAnswer} болады.
              </div>
            )}

            <button
              onClick={handleNext}
              className="mt-4 px-8 py-3 bg-sky-500 hover:bg-sky-600 text-white font-extrabold rounded-2xl text-base shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              {currentIndex < questions.length - 1 ? 'Келесі сұраққа өту ➡️' : 'Басынан бастау 🔄'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
