import React, { useState } from 'react';
import { BilimpazGuide } from './BilimpazGuide';
import { FruitCounter } from './FruitCounter';
import { sound } from '../utils/sound';
import { fireConfetti } from '../utils/confetti';
import { Star, CheckCircle, RefreshCw, Sparkles, HelpCircle } from 'lucide-react';

interface Props {
  onEarnStar: () => void;
}

export const AdditionTableSection: React.FC<Props> = ({ onEarnStar }) => {
  const [selectedCell, setSelectedCell] = useState<{ a: number; b: number } | null>({ a: 3, b: 2 });
  const [practiceMode, setPracticeMode] = useState<boolean>(false);

  // Hidden cells for practice mode
  const hiddenPairs = [
    { a: 2, b: 3, correct: 5 },
    { a: 4, b: 2, correct: 6 },
    { a: 5, b: 3, correct: 8 },
    { a: 1, b: 6, correct: 7 },
    { a: 3, b: 6, correct: 9 },
  ];

  const [userAnswers, setUserAnswers] = useState<{ [key: string]: number }>({});
  const [checkedResults, setCheckedResults] = useState<{ [key: string]: boolean }>({});
  const [completedPractice, setCompletedPractice] = useState(false);

  // Handle cell selection
  const handleSelectCell = (a: number, b: number) => {
    sound.playPop();
    setSelectedCell({ a, b });
  };

  const handleAnswerSelect = (key: string, val: number, correctVal: number) => {
    setUserAnswers((prev) => ({ ...prev, [key]: val }));
    const isRight = val === correctVal;
    setCheckedResults((prev) => ({ ...prev, [key]: isRight }));

    if (isRight) {
      sound.playSuccess();
      onEarnStar();
      fireConfetti();
    } else {
      sound.playGentleError();
    }
  };

  const resetPractice = () => {
    sound.playPop();
    setUserAnswers({});
    setCheckedResults({});
    setCompletedPractice(false);
  };

  const aRange = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const bRange = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-2">
      {/* Title */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-bold">
          <span>📊</span> Оқу мақсаты 1.1.2.4
        </div>
        <h2 className="font-heading font-black text-2xl sm:text-3xl text-slate-900">
          ҚОСУ КЕСТЕСІ (10-ҒА ДЕЙІН)
        </h2>
        <p className="text-sm text-slate-600">
          Ондықтан аттамайтын қосу кестесі: әр ұяшықты басып, нәтижені көзбен көр!
        </p>
      </div>

      {/* Mode Switcher */}
      <div className="flex items-center justify-center gap-2 p-1.5 bg-white rounded-2xl border-2 border-slate-200 shadow-xs max-w-md mx-auto">
        <button
          onClick={() => {
            sound.playClick();
            setPracticeMode(false);
          }}
          className={`flex-1 py-2 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
            !practiceMode ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          🔍 Зерттеу кестесі
        </button>
        <button
          onClick={() => {
            sound.playClick();
            setPracticeMode(true);
          }}
          className={`flex-1 py-2 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
            practiceMode ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          ✏️ Бос орындарды толтыр
        </button>
      </div>

      <BilimpazGuide
        message={
          practiceMode
            ? "«Сұрақ белгісі» қойылған ұяшықтардың үстінен басып, дұрыс жауапты таңдаңыз! Әр дұрыс жауапқа жұлдыз беріледі!"
            : "Кестеден кез келген өрнекті таңда. Төменде оған сәйкес алмалар мен қосу амалы шығады!"
        }
        mood={practiceMode ? 'thinking' : 'happy'}
      />

      {/* Interactive Table Container */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border-2 border-indigo-200 shadow-sm overflow-x-auto">
        <div className="min-w-[500px]">
          <div className="text-xs font-bold text-slate-500 mb-2 flex items-center justify-between">
            <span>➕ Тігінен (1-қосылғыш) және Көлденеңнен (2-қосылғыш):</span>
            <span className="text-indigo-600 font-extrabold">Қосындысы ≤ 10 ұяшықтар</span>
          </div>

          {/* Grid */}
          <table className="w-full border-collapse text-center">
            <thead>
              <tr>
                <th className="p-2 bg-indigo-100 border border-indigo-200 rounded-tl-xl text-indigo-900 font-black text-sm">
                  +
                </th>
                {bRange.map((b) => (
                  <th
                    key={b}
                    className={`p-2 border border-indigo-200 font-extrabold text-sm ${
                      selectedCell && selectedCell.b === b
                        ? 'bg-amber-200 text-amber-900 font-black'
                        : 'bg-indigo-50 text-indigo-900'
                    }`}
                  >
                    {b}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {aRange.map((a) => (
                <tr key={a}>
                  <th
                    className={`p-2 border border-indigo-200 font-extrabold text-sm ${
                      selectedCell && selectedCell.a === a
                        ? 'bg-amber-200 text-amber-900 font-black'
                        : 'bg-indigo-50 text-indigo-900'
                    }`}
                  >
                    {a}
                  </th>
                  {bRange.map((b) => {
                    const sum = a + b;
                    const isValid = sum <= 10;
                    const isSelected = selectedCell && selectedCell.a === a && selectedCell.b === b;
                    const hiddenPair = hiddenPairs.find((p) => p.a === a && p.b === b);
                    const cellKey = `${a}+${b}`;
                    const userAnswer = userAnswers[cellKey];
                    const isChecked = checkedResults[cellKey];

                    if (!isValid) {
                      return (
                        <td
                          key={b}
                          className="p-1.5 border border-slate-100 bg-slate-100/50 text-slate-300 text-xs select-none"
                          title="Қосынды 10-нан асады"
                        >
                          —
                        </td>
                      );
                    }

                    // Practice mode with hidden cell
                    if (practiceMode && hiddenPair) {
                      return (
                        <td
                          key={b}
                          onClick={() => handleSelectCell(a, b)}
                          className={`p-1.5 border border-indigo-200 font-bold text-xs cursor-pointer transition-all ${
                            isChecked
                              ? 'bg-emerald-100 text-emerald-800 border-emerald-400'
                              : isChecked === false
                              ? 'bg-rose-100 text-rose-800 border-rose-400'
                              : 'bg-amber-100 text-amber-900 hover:bg-amber-200 animate-pulse'
                          }`}
                        >
                          {userAnswer !== undefined ? (
                            <span className="font-black text-sm">{userAnswer}</span>
                          ) : (
                            <span className="font-black text-sm">❓</span>
                          )}
                        </td>
                      );
                    }

                    return (
                      <td
                        key={b}
                        onClick={() => handleSelectCell(a, b)}
                        className={`p-1.5 border border-indigo-100 font-extrabold text-xs sm:text-sm cursor-pointer transition-all hover:scale-105 ${
                          isSelected
                            ? 'bg-amber-400 text-slate-900 shadow-md ring-2 ring-amber-500 scale-105 font-black z-10'
                            : 'bg-white hover:bg-sky-50 text-slate-800'
                        }`}
                      >
                        <span className="tabular-nums">{sum}</span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Showcase when a cell is clicked */}
      {selectedCell && !practiceMode && (
        <div className="bg-white rounded-3xl p-6 border-2 border-amber-300 shadow-md animate-pop-in space-y-4 text-center">
          <div className="inline-block px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-bold">
            Таңдалған ұяшық: {selectedCell.a} + {selectedCell.b}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <div className="bg-rose-50 border border-rose-200 p-3 rounded-2xl">
              <span className="text-xs font-bold text-rose-600 block mb-1">
                {selectedCell.a} қызыл алма
              </span>
              <FruitCounter type="red-apple" count={selectedCell.a} size="md" />
            </div>

            <span className="text-2xl font-black text-slate-400">+</span>

            <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-2xl">
              <span className="text-xs font-bold text-emerald-600 block mb-1">
                {selectedCell.b} жасыл алма
              </span>
              <FruitCounter type="green-apple" count={selectedCell.b} size="md" />
            </div>

            <span className="text-2xl font-black text-slate-400">=</span>

            <div className="bg-amber-50 border border-amber-300 p-3 rounded-2xl">
              <span className="text-xs font-bold text-amber-700 block mb-1">
                Барлығы: {selectedCell.a + selectedCell.b} алма
              </span>
              <span className="font-heading font-black text-3xl text-amber-600 tabular-nums">
                {selectedCell.a + selectedCell.b}
              </span>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 max-w-md mx-auto text-xs sm:text-sm font-medium text-slate-700">
            💡 Орын ауыстыру қасиеті: <span className="font-bold text-slate-900">{selectedCell.a} + {selectedCell.b} = {selectedCell.b} + {selectedCell.a} = {selectedCell.a + selectedCell.b}</span>
          </div>
        </div>
      )}

      {/* Practice Mode Active Question Modal/Card */}
      {practiceMode && selectedCell && (
        <div className="bg-white rounded-3xl p-6 border-2 border-amber-400 shadow-md animate-pop-in space-y-4 text-center max-w-xl mx-auto">
          <h4 className="font-heading font-bold text-lg text-slate-800">
            {selectedCell.a} + {selectedCell.b} = ?
          </h4>
          <p className="text-xs text-slate-500">
            Сәйкес келетін дұрыс санды таңдаңыз:
          </p>

          <div className="flex items-center justify-center gap-2">
            <FruitCounter type="red-apple" count={selectedCell.a} size="sm" />
            <span className="text-xl font-bold text-slate-400">+</span>
            <FruitCounter type="green-apple" count={selectedCell.b} size="sm" />
          </div>

          {/* Option buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {[
              selectedCell.a + selectedCell.b,
              selectedCell.a + selectedCell.b - 1,
              selectedCell.a + selectedCell.b + 1,
            ]
              .filter((v, idx, arr) => arr.indexOf(v) === idx && v > 0 && v <= 10)
              .sort(() => 0.5 - Math.random())
              .map((val) => {
                const key = `${selectedCell.a}+${selectedCell.b}`;
                const isSelected = userAnswers[key] === val;
                const isCorrect = val === selectedCell.a + selectedCell.b;

                return (
                  <button
                    key={val}
                    onClick={() => handleAnswerSelect(key, val, selectedCell.a + selectedCell.b)}
                    className={`w-14 h-14 rounded-2xl font-black text-2xl border-2 transition-all cursor-pointer ${
                      isSelected && isCorrect
                        ? 'bg-emerald-500 text-white border-emerald-600 scale-110 shadow-lg'
                        : isSelected && !isCorrect
                        ? 'bg-rose-500 text-white border-rose-600'
                        : 'bg-white hover:bg-amber-100 text-slate-800 border-amber-300'
                    }`}
                  >
                    {val}
                  </button>
                );
              })}
          </div>

          <div className="pt-2">
            <button
              onClick={resetPractice}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 inline-flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Жаттығуды қайта бастау
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
