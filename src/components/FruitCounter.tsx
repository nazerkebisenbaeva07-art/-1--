import React from 'react';
import { sound } from '../utils/sound';

interface Props {
  type: 'red-apple' | 'green-apple' | 'pear' | 'balloon' | 'star';
  count: number;
  highlightedCount?: number;
  interactive?: boolean;
  onItemClick?: (index: number) => void;
  size?: 'sm' | 'md' | 'lg';
}

export const FruitCounter: React.FC<Props> = ({
  type,
  count,
  highlightedCount = 0,
  interactive = false,
  onItemClick,
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xl',
    md: 'w-12 h-12 text-3xl',
    lg: 'w-16 h-16 text-4xl',
  };

  const renderIcon = (index: number) => {
    switch (type) {
      case 'red-apple':
        return '🍎';
      case 'green-apple':
        return '🍏';
      case 'pear':
        return '🍐';
      case 'balloon':
        return '🎈';
      case 'star':
        return '⭐';
      default:
        return '🍎';
    }
  };

  const handleItemClick = (index: number) => {
    sound.playPop();
    if (onItemClick) {
      onItemClick(index);
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-2">
      {Array.from({ length: count }).map((_, i) => {
        const isHighlighted = i < highlightedCount;
        return (
          <button
            key={i}
            type="button"
            disabled={!interactive}
            onClick={() => handleItemClick(i)}
            className={`group relative flex flex-col items-center justify-center p-1 rounded-2xl transition-all duration-300 ${
              interactive
                ? 'cursor-pointer hover:scale-115 active:scale-95 focus:outline-none'
                : 'cursor-default'
            } ${
              isHighlighted
                ? 'ring-4 ring-amber-400 bg-amber-50 shadow-md scale-105'
                : 'hover:bg-white/60'
            }`}
            title={`Элемент #${i + 1}`}
          >
            <span
              className={`select-none transition-transform ${sizeClasses[size]} flex items-center justify-center`}
            >
              {renderIcon(i)}
            </span>
            <span className="text-[11px] font-extrabold text-slate-500 tabular-nums">
              {i + 1}
            </span>
          </button>
        );
      })}
    </div>
  );
};
