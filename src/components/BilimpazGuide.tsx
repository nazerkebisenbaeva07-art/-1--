import React from 'react';
import { Sparkles } from 'lucide-react';

interface Props {
  message: string;
  mood?: 'happy' | 'thinking' | 'celebrate' | 'encouraging';
  compact?: boolean;
}

export const BilimpazGuide: React.FC<Props> = ({
  message,
  mood = 'happy',
  compact = false,
}) => {
  return (
    <div
      className={`flex items-start gap-3 sm:gap-4 ${
        compact ? 'p-2' : 'p-4 sm:p-5'
      } bg-gradient-to-r from-sky-50 via-indigo-50 to-amber-50 rounded-3xl border-2 border-sky-200 shadow-sm`}
    >
      {/* Bilimpaz Character Avatar */}
      <div className="relative shrink-0 flex flex-col items-center">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-amber-300 via-sky-300 to-indigo-400 p-1 shadow-md flex items-center justify-center animate-float">
          <div className="w-full h-full bg-white rounded-xl flex items-center justify-center text-3xl select-none">
            {mood === 'celebrate' ? '🎉' : mood === 'thinking' ? '🤔' : mood === 'encouraging' ? '🌟' : '🦉'}
          </div>
        </div>
        <span className="mt-1 text-[11px] font-extrabold uppercase tracking-wider text-sky-800 bg-white/80 px-2 py-0.5 rounded-full border border-sky-200">
          Білімпаз
        </span>
      </div>

      {/* Speech Bubble */}
      <div className="flex-1 relative bg-white rounded-2xl p-3 sm:p-4 border border-sky-100 shadow-sm">
        {/* Triangle arrow on left */}
        <div className="absolute top-4 -left-2 w-3 h-3 bg-white border-l border-b border-sky-100 transform rotate-45" />

        <div className="flex items-center gap-1.5 text-xs font-bold text-sky-600 mb-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Білімпаздың кеңесі:</span>
        </div>
        <p className="text-sm sm:text-base font-semibold text-slate-800 leading-relaxed">
          {message}
        </p>
      </div>
    </div>
  );
};
