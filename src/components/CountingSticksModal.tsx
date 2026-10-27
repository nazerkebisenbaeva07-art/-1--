import React, { useState } from 'react';
import { X, Plus, RotateCcw, Volume2, Sparkles } from 'lucide-react';
import { sound } from '../utils/sound';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const CountingSticksModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [stickColor, setStickColor] = useState<'red' | 'blue' | 'yellow' | 'green'>('red');
  const [sticks, setSticks] = useState<{ id: number; color: 'red' | 'blue' | 'yellow' | 'green' }[]>([
    { id: 1, color: 'red' },
    { id: 2, color: 'red' },
    { id: 3, color: 'red' },
  ]);

  if (!isOpen) return null;

  const addStick = () => {
    if (sticks.length >= 10) return;
    sound.playPop();
    setSticks((prev) => [...prev, { id: Date.now(), color: stickColor }]);
  };

  const removeStick = (id: number) => {
    sound.playPop();
    setSticks((prev) => prev.filter((s) => s.id !== id));
  };

  const clearSticks = () => {
    sound.playPop();
    setSticks([]);
  };

  const colorStyles = {
    red: 'bg-rose-500 border-rose-600 text-rose-500',
    blue: 'bg-sky-500 border-sky-600 text-sky-500',
    yellow: 'bg-amber-400 border-amber-500 text-amber-500',
    green: 'bg-emerald-500 border-emerald-600 text-emerald-500',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-pop-in">
      <div className="bg-white rounded-3xl shadow-2xl border-4 border-amber-300 max-w-xl w-full p-6 text-slate-800">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🪵</span>
            <div>
              <h3 className="font-heading font-bold text-xl text-slate-800">
                Санау таяқшалары (Көмекші құрал)
              </h3>
              <p className="text-xs text-slate-500">
                1-сынып оқушылары мен инклюзивті көмекке арналған
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
            title="Жабу"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Total Count Display */}
        <div className="text-center bg-amber-50 rounded-2xl py-3 px-4 mb-4 border border-amber-200">
          <p className="text-sm font-semibold text-amber-900">
            Барлық таяқша саны:
          </p>
          <div className="text-4xl font-extrabold text-amber-600 tabular-nums my-1">
            {sticks.length} <span className="text-xl font-normal text-slate-600">таяқша</span>
          </div>
          <p className="text-xs text-slate-500">
            Таяқшаны алып тастау үшін үстінен басыңыз (10-ға дейін)
          </p>
        </div>

        {/* Visual sticks area */}
        <div className="min-h-[160px] bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-4 flex flex-wrap items-center justify-center gap-3 mb-4">
          {sticks.length === 0 ? (
            <div className="text-center text-slate-400 text-sm">
              Әзірге таяқшалар жоқ. Төмендегі «Таяқша қосу» батырмасын басыңыз!
            </div>
          ) : (
            sticks.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => removeStick(s.id)}
                className="group flex flex-col items-center focus:outline-none"
                title="Алып тастау"
              >
                <div
                  className={`w-4 h-24 rounded-full border-2 shadow-sm transition-transform group-hover:scale-105 active:scale-95 ${
                    colorStyles[s.color]
                  }`}
                />
                <span className="text-xs font-bold text-slate-500 mt-1 tabular-nums">
                  {idx + 1}
                </span>
              </button>
            ))
          )}
        </div>

        {/* Color picker & action buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600">Түсі:</span>
            {(['red', 'blue', 'yellow', 'green'] as const).map((color) => (
              <button
                key={color}
                onClick={() => setStickColor(color)}
                className={`w-7 h-7 rounded-full transition-transform border-2 ${
                  color === 'red'
                    ? 'bg-rose-500 border-rose-600'
                    : color === 'blue'
                    ? 'bg-sky-500 border-sky-600'
                    : color === 'yellow'
                    ? 'bg-amber-400 border-amber-500'
                    : 'bg-emerald-500 border-emerald-600'
                } ${stickColor === color ? 'scale-125 ring-2 ring-slate-400' : 'opacity-70 hover:opacity-100'}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={clearSticks}
              className="px-3 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Тазарту
            </button>
            <button
              onClick={addStick}
              disabled={sticks.length >= 10}
              className={`px-4 py-2 text-sm font-bold rounded-xl flex items-center gap-1 text-white shadow-md transition-all ${
                sticks.length >= 10
                  ? 'bg-slate-300 cursor-not-allowed'
                  : 'bg-amber-500 hover:bg-amber-600 active:scale-95'
              }`}
            >
              <Plus className="w-4 h-4" />
              Таяқша қосу (+1)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
