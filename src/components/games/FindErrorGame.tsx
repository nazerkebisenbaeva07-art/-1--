import React, { useState } from 'react';
import { BilimpazGuide } from '../BilimpazGuide';
import { sound } from '../../utils/sound';
import { fireConfetti } from '../../utils/confetti';
import { Check, X, Star, RefreshCcw, Wrench } from 'lucide-react';

interface Props {
  onEarnStar: () => void;
}

interface ExpressionItem {
  id: number;
  text: string;
  a: number;
  b: number;
  displayedResult: number;
  actualResult: number;
  isActuallyCorrect: boolean;
}

export const FindErrorGame: React.FC<Props> = ({ onEarnStar }) => {
  const expressions: ExpressionItem[] = [
    { id: 1, text: '3 + 2 = 5', a: 3, b: 2, displayedResult: 5, actualResult: 5, isActuallyCorrect: true },
    { id: 2, text: '4 + 3 = 6', a: 4, b: 3, displayedResult: 6, actualResult: 7, isActuallyCorrect: false },
    { id: 3, text: '5 + 2 = 7', a: 5, b: 2, displayedResult: 7, actualResult: 7, isActuallyCorrect: true },
    { id: 4, text: '2 + 6 = 8', a: 2, b: 6, displayedResult: 8, actualResult: 8, isActuallyCorrect: true },
    { id: 5, text: '6 + 3 = 8', a: 6, b: 3, displayedResult: 8, actualResult: 9, isActuallyCorrect: false },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  // 'correct' or 'wrong'
  const [userChoice, setUserChoice] = useState<'correct' | 'wrong' | null>(null);
  // If user recognized it is wrong, they need to select the fix
  const [fixedValue, setFixedValue] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [earnedCount, setEarnedCount] = useState(0);

  const current = expressions[currentIndex];

  const handleChoice = (choice: 'correct' | 'wrong') => {
    setUserChoice(choice);
    const wasRightIdentification = (choice === 'correct' && current.isActuallyCorrect) || (choice === 'wrong' && !current.isActuallyCorrect);

    if (current.isActuallyCorrect) {
      setIsAnswered(true);
      if (wasRightIdentification) {
        sound.playSuccess();
        onEarnStar();
        fireConfetti();
        setEarnedCount((c) => c + 1);
      } else {
        sound.playGentleError();
      }
    } else {
      // It is a wrong equation, wait for student to fix it if they chose 'wrong'
      if (choice === 'wrong') {
        sound.playPop();
      } else {
        setIsAnswered(true);
        sound.playGentleError();
      }
    }
  };

  const handleFixSelection = (val: number) => {
    setFixedValue(val);
    setIsAnswered(true);
    if (val === current.actualResult) {
      sound.playSuccess();
      onEarnStar();
      fireConfetti();
      setEarnedCount((c) => c + 1);
    } else {
      sound.playGentleError();
    }
  };

  const handleNext = () => {
    sound.playPop();
    setUserChoice(null);
    setFixedValue(null);
    setIsAnswered(false);
    if (currentIndex < expressions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const restartAll = () => {
    sound.playPop();
    setCurrentIndex(0);
    setUserChoice(null);
    setFixedValue(null);
    setIsAnswered(false);
    setEarnedCount(0);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-rose-300 shadow-md space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-rose-100 pb-4">
        <div>
          <span className="text-xs font-black text-rose-700 bg-rose-100 px-3 py-1 rounded-full uppercase tracking-wider">
            4-ойын • Қатені тап және түзет
          </span>
          <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-800 mt-1">
            Өрнек дұрыс па, әлде қате ме?
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500">
            Өрнек: <span className="text-rose-600 font-black">{currentIndex + 1} / {expressions.length}</span>
          </span>
          <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-xl text-xs font-extrabold flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            {earnedCount} ұпай
          </span>
        </div>
      </div>

      <BilimpazGuide
        message={
          !isAnswered
            ? userChoice === 'wrong' && !current.isActuallyCorrect
              ? "Бәрекелді! Бұл өрнекте қате бар екенін байқадың! Енді дұрыс жауабын таңдап түзет!"
              : "Тақтадағы өрнекке мұқият қара: ол Дұрыс па, әлде Қате ме?"
            : current.isActuallyCorrect
            ? userChoice === 'correct'
              ? "Дұрыс анықтадың! Өрнек ақиқат!"
              : "Анықтап қарасақ, бұл өрнек шын мәнінде дұрыс жазылған!"
            : fixedValue === current.actualResult
            ? `Керемет шеберсің! Қате өрнекті дұрыстадың: ${current.a} + ${current.b} = ${current.actualResult}!`
            : `Бұл өрнектің шын дұрысы: ${current.a} + ${current.b} = ${current.actualResult}!`
        }
        mood={isAnswered ? 'celebrate' : userChoice === 'wrong' ? 'thinking' : 'happy'}
      />

      {/* Chalkboard Display with equation */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 border-4 border-amber-300 shadow-xl text-center space-y-6 relative overflow-hidden">
        {/* Subtle grid background */}
        <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
          Математикалық тақта
        </div>

        <div className="font-heading font-black text-4xl sm:text-6xl text-white tracking-widest drop-shadow-md">
          {current.text}
        </div>

        {/* Action: Select Correct or Wrong */}
        {userChoice === null && (
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => handleChoice('correct')}
              className="px-6 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-lg sm:text-xl rounded-2xl shadow-lg transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <Check className="w-6 h-6 stroke-[3]" />
              Дұрыс (Теңдік ақиқат)
            </button>

            <button
              onClick={() => handleChoice('wrong')}
              className="px-6 py-4 bg-rose-500 hover:bg-rose-600 text-white font-black text-lg sm:text-xl rounded-2xl shadow-lg transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <X className="w-6 h-6 stroke-[3]" />
              Қате (Түзету қажет)
            </button>
          </div>
        )}

        {/* If user picked 'wrong' and it actually is wrong, offer correction */}
        {userChoice === 'wrong' && !current.isActuallyCorrect && !isAnswered && (
          <div className="space-y-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 max-w-md mx-auto animate-pop-in">
            <div className="flex items-center justify-center gap-2 text-amber-300 font-bold text-sm">
              <Wrench className="w-4 h-4" />
              <span>Дұрыс нәтижені таңдаңыз:</span>
            </div>

            <div className="flex items-center justify-center gap-3">
              {[current.actualResult - 1, current.actualResult, current.actualResult + 1]
                .sort(() => 0.5 - Math.random())
                .map((val) => (
                  <button
                    key={val}
                    onClick={() => handleFixSelection(val)}
                    className="w-14 h-14 rounded-2xl bg-white text-slate-900 font-black text-2xl hover:bg-amber-300 transition-all cursor-pointer shadow-md active:scale-95"
                  >
                    {val}
                  </button>
                ))}
            </div>
          </div>
        )}

        {/* Result message */}
        {isAnswered && (
          <div className="p-4 bg-white/15 backdrop-blur-md rounded-2xl border border-white/20 text-white font-bold text-sm sm:text-base max-w-lg mx-auto animate-pop-in">
            {current.isActuallyCorrect ? (
              <p className="text-emerald-300">
                ✅ Дұрыс! {current.a} + {current.b} = {current.actualResult} шынымен тең!
              </p>
            ) : (
              <p className="text-amber-300">
                🔧 Түзетілген нұсқасы: <span className="text-white font-black text-xl">{current.a} + {current.b} = {current.actualResult}</span> (Қатеде: {current.displayedResult} деп жазылған болатын)
              </p>
            )}

            <button
              onClick={handleNext}
              className="mt-4 px-8 py-3 bg-amber-400 hover:bg-amber-300 text-slate-900 font-black rounded-2xl text-base shadow-md transition-all active:scale-95 cursor-pointer"
            >
              {currentIndex < expressions.length - 1 ? 'Келесі өрнекке көшу ➡️' : 'Басынан қайталау 🔄'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
