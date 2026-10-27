import React, { useState } from 'react';
import { BilimpazGuide } from './BilimpazGuide';
import { FruitCounter } from './FruitCounter';
import { sound } from '../utils/sound';
import { fireGrandConfetti } from '../utils/confetti';
import { Apple, CheckCircle2, Sparkles, ShoppingBag, ArrowRight } from 'lucide-react';

interface Props {
  onEarnStar: () => void;
}

export const CaseStudySection: React.FC<Props> = ({ onEarnStar }) => {
  // Step 1: count fruits (answer: 7)
  const [step1Answer, setStep1Answer] = useState<number | null>(null);

  // Step 2: build addition equation (4 + 3 = 7)
  const [step2First, setStep2First] = useState<number | null>(null);
  const [step2Second, setStep2Second] = useState<number | null>(null);
  const [step2Sum, setStep2Sum] = useState<number | null>(null);

  // Step 3: compare 4 + 3 and 3 + 4
  const [step3Comparison, setStep3Comparison] = useState<'equal' | 'notEqual' | null>(null);

  const [caseCompleted, setCaseCompleted] = useState(false);

  const handleStep1 = (val: number) => {
    setStep1Answer(val);
    if (val === 7) {
      sound.playSuccess();
      onEarnStar();
    } else {
      sound.playGentleError();
    }
  };

  const handleCheckStep2 = () => {
    if (step2First === 4 && step2Second === 3 && step2Sum === 7) {
      sound.playSuccess();
      onEarnStar();
    } else {
      sound.playGentleError();
    }
  };

  const handleStep3 = (ans: 'equal' | 'notEqual') => {
    setStep3Comparison(ans);
    if (ans === 'equal') {
      sound.playFanfare();
      onEarnStar();
      fireGrandConfetti();
      setCaseCompleted(true);
    } else {
      sound.playGentleError();
    }
  };

  const step2IsCorrect = step2First === 4 && step2Second === 3 && step2Sum === 7;

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-2">
      {/* Title */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold">
          <span>🍎</span> Функционалдық сауаттылық кейсі
        </div>
        <h2 className="font-heading font-black text-2xl sm:text-3xl text-slate-900">
          МЕКТЕП АСХАНАСЫНДАҒЫ ЖЕМІСТЕР
        </h2>
        <p className="text-sm text-slate-600">
          Өмірлік жағдаят: күнделікті тұрмыста математиканы қалай қолданамыз?
        </p>
      </div>

      <BilimpazGuide
        message="«Мектеп асханасына 4 алма және 3 алмұрт әкелінді. Барлығы неше жеміс әкелінді?» Кел, бірге есептеп, асхана аспаздарына көмектесейік!"
        mood="happy"
      />

      {/* Case Situation Graphic Card */}
      <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 rounded-3xl p-6 sm:p-8 border-3 border-amber-300 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="inline-flex items-center gap-1 text-xs font-black text-amber-800 bg-amber-200/80 px-3 py-1 rounded-full uppercase">
              <ShoppingBag className="w-3.5 h-3.5" /> Мектеп асханасынан түскен хабар
            </span>
            <h3 className="font-heading font-black text-2xl sm:text-3xl text-slate-900 leading-tight">
              «Мектеп асханасына 4 алма және 3 алмұрт әкелінді. Барлығы неше жеміс әкелінді?»
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-slate-700 leading-relaxed">
              Жәшіктердегі жемістерді санап, төмендегі 3 сұраққа ретімен жауап беріңіз.
            </p>
          </div>

          {/* Visual Crates */}
          <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
            {/* Apple crate */}
            <div className="bg-white p-4 rounded-3xl border-2 border-rose-300 shadow-sm text-center">
              <span className="text-xs font-extrabold text-rose-600 block mb-1">
                4 Қызыл алма
              </span>
              <FruitCounter type="red-apple" count={4} size="lg" interactive />
            </div>

            <span className="text-3xl font-black text-amber-500">+</span>

            {/* Pear crate */}
            <div className="bg-white p-4 rounded-3xl border-2 border-amber-300 shadow-sm text-center">
              <span className="text-xs font-extrabold text-amber-700 block mb-1">
                3 Сары алмұрт
              </span>
              <FruitCounter type="pear" count={3} size="lg" interactive />
            </div>
          </div>
        </div>

        {/* 3 Step Interactive Questions */}
        <div className="space-y-4 pt-4 border-t border-amber-200">
          
          {/* 1-тапсырма: Барлығы неше жеміс бар? */}
          <div className="bg-white p-5 rounded-2xl border-2 border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-heading font-bold text-base sm:text-lg text-slate-800">
                1-тапсырма: Барлығы неше жеміс бар?
              </h4>
              {step1Answer === 7 && (
                <span className="text-xs font-extrabold text-emerald-600 flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4" /> Дұрыс: 7 жеміс
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {[5, 6, 7, 8].map((num) => (
                <button
                  key={num}
                  disabled={step1Answer === 7}
                  onClick={() => handleStep1(num)}
                  className={`w-14 h-14 rounded-2xl font-black text-xl border-2 transition-all cursor-pointer ${
                    step1Answer === num
                      ? num === 7
                        ? 'bg-emerald-500 text-white border-emerald-600 shadow-md scale-105'
                        : 'bg-rose-500 text-white border-rose-600'
                      : 'bg-slate-50 hover:bg-amber-100 text-slate-800 border-slate-300'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* 2-тапсырма: Қосу амалын жаз */}
          {step1Answer === 7 && (
            <div className="bg-white p-5 rounded-2xl border-2 border-slate-200 space-y-3 animate-pop-in">
              <div className="flex items-center justify-between">
                <h4 className="font-heading font-bold text-base sm:text-lg text-slate-800">
                  2-тапсырма: Қосу амалын жаз
                </h4>
                {step2IsCorrect && (
                  <span className="text-xs font-extrabold text-emerald-600 flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-4 h-4" /> 4 + 3 = 7
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2 font-heading font-black text-2xl text-slate-800">
                <select
                  value={step2First || ''}
                  onChange={(e) => setStep2First(Number(e.target.value))}
                  className="bg-slate-50 border-2 border-slate-300 rounded-xl px-3 py-2 text-xl font-black focus:outline-none focus:ring-2 focus:ring-sky-400"
                >
                  <option value="">?</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>

                <span>+</span>

                <select
                  value={step2Second || ''}
                  onChange={(e) => setStep2Second(Number(e.target.value))}
                  className="bg-slate-50 border-2 border-slate-300 rounded-xl px-3 py-2 text-xl font-black focus:outline-none focus:ring-2 focus:ring-sky-400"
                >
                  <option value="">?</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>

                <span>=</span>

                <select
                  value={step2Sum || ''}
                  onChange={(e) => setStep2Sum(Number(e.target.value))}
                  className="bg-slate-50 border-2 border-slate-300 rounded-xl px-3 py-2 text-xl font-black focus:outline-none focus:ring-2 focus:ring-sky-400"
                >
                  <option value="">?</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                </select>

                <button
                  onClick={handleCheckStep2}
                  className="ml-2 px-5 py-2.5 bg-sky-500 hover:bg-sky-600 text-white rounded-xl text-sm font-extrabold transition-all cursor-pointer"
                >
                  Тексеру
                </button>
              </div>
            </div>
          )}

          {/* 3-тапсырма: 4 + 3 және 3 + 4 өрнектерін салыстыр */}
          {step2IsCorrect && (
            <div className="bg-white p-5 rounded-2xl border-2 border-slate-200 space-y-4 animate-pop-in">
              <h4 className="font-heading font-bold text-base sm:text-lg text-slate-800">
                3-тапсырма: 4 + 3 және 3 + 4 өрнектерін салыстыр:
              </h4>

              <div className="flex flex-wrap items-center justify-center gap-4 text-center">
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl font-heading font-black text-xl text-rose-700">
                  4 + 3 = 7
                </div>

                <span className="text-xl font-bold text-slate-400">және</span>

                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl font-heading font-black text-xl text-amber-700">
                  3 + 4 = 7
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <button
                  onClick={() => handleStep3('equal')}
                  className={`px-6 py-3 rounded-2xl font-black text-base border-2 transition-all cursor-pointer flex items-center gap-2 ${
                    step3Comparison === 'equal'
                      ? 'bg-emerald-500 text-white border-emerald-600 shadow-md scale-105'
                      : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-300'
                  }`}
                >
                  <CheckCircle2 className="w-5 h-5" />
                  Бұл өрнектер өзара тең: (4 + 3 = 3 + 4)
                </button>

                <button
                  onClick={() => handleStep3('notEqual')}
                  className={`px-6 py-3 rounded-2xl font-black text-base border-2 transition-all cursor-pointer ${
                    step3Comparison === 'notEqual'
                      ? 'bg-rose-500 text-white border-rose-600'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-300'
                  }`}
                >
                  Бұл өрнектер тең емес
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Completion Congratulation Badge as explicitly requested */}
      {caseCompleted && (
        <div className="p-6 sm:p-8 bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 rounded-3xl text-white text-center space-y-3 shadow-xl animate-pop-in">
          <div className="text-5xl">🎉 🍎 🍐 🌟</div>
          <h3 className="font-heading font-black text-2xl sm:text-3xl text-white leading-tight">
            Жарайсың! Сен математиканы күнделікті өмірде қолдана аласың!
          </h3>
          <p className="text-sm sm:text-base text-emerald-100 max-w-xl mx-auto font-medium">
            4 алма мен 3 алмұртты қосу арқылы мектеп асханасында барлығы 7 жеміс бар екенін және олардың орнын ауыстырғанмен мәні өзгермейтінін дәлелдедің!
          </p>
        </div>
      )}
    </div>
  );
};
