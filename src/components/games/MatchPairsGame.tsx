import React, { useState } from 'react';
import { BilimpazGuide } from '../BilimpazGuide';
import { sound } from '../../utils/sound';
import { fireConfetti } from '../../utils/confetti';
import { Star, CheckCircle, RefreshCcw, Sparkles } from 'lucide-react';

interface Props {
  onEarnStar: () => void;
}

interface CardItem {
  id: string;
  pairId: number;
  text: string;
  sum: number;
}

export const MatchPairsGame: React.FC<Props> = ({ onEarnStar }) => {
  const initialCards: CardItem[] = [
    { id: 'c1', pairId: 1, text: '2 + 5', sum: 7 },
    { id: 'c2', pairId: 1, text: '5 + 2', sum: 7 },
    { id: 'c3', pairId: 2, text: '3 + 4', sum: 7 },
    { id: 'c4', pairId: 2, text: '4 + 3', sum: 7 },
    { id: 'c5', pairId: 3, text: '1 + 6', sum: 7 },
    { id: 'c6', pairId: 3, text: '6 + 1', sum: 7 },
    { id: 'c7', pairId: 4, text: '2 + 6', sum: 8 },
    { id: 'c8', pairId: 4, text: '6 + 2', sum: 8 },
  ];

  // We can randomize order on start
  const [cards, setCards] = useState<CardItem[]>(() => {
    return [...initialCards].sort(() => 0.5 - Math.random());
  });

  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [matchedPairIds, setMatchedPairIds] = useState<number[]>([]);
  const [wrongPair, setWrongPair] = useState<string[]>([]);

  const handleCardClick = (card: CardItem) => {
    // If already matched, ignore
    if (matchedPairIds.includes(card.pairId)) return;

    sound.playPop();

    // If no card selected yet, select this one
    if (!selectedCardId) {
      setSelectedCardId(card.id);
      setWrongPair([]);
      return;
    }

    // If clicked the exact same card, deselect
    if (selectedCardId === card.id) {
      setSelectedCardId(null);
      return;
    }

    // Two cards are selected, check match
    const firstCard = cards.find((c) => c.id === selectedCardId);
    if (!firstCard) {
      setSelectedCardId(null);
      return;
    }

    if (firstCard.pairId === card.pairId) {
      // MATCHED!
      sound.playSuccess();
      onEarnStar();
      fireConfetti();
      setMatchedPairIds((prev) => [...prev, card.pairId]);
      setSelectedCardId(null);
      setWrongPair([]);
    } else {
      // Not a commutative pair
      sound.playGentleError();
      setWrongPair([firstCard.id, card.id]);
      setTimeout(() => {
        setWrongPair([]);
        setSelectedCardId(null);
      }, 1000);
    }
  };

  const resetGame = () => {
    sound.playPop();
    setMatchedPairIds([]);
    setSelectedCardId(null);
    setWrongPair([]);
    setCards([...initialCards].sort(() => 0.5 - Math.random()));
  };

  const isAllMatched = matchedPairIds.length === 4;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-purple-300 shadow-md space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-purple-100 pb-4">
        <div>
          <span className="text-xs font-black text-purple-700 bg-purple-100 px-3 py-1 rounded-full uppercase tracking-wider">
            3-ойын • Жұбын тап
          </span>
          <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-800 mt-1">
            Орын ауыстыру жұптарын сәйкестендір!
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-xl text-xs font-extrabold flex items-center gap-1">
            Табылған жұп: {matchedPairIds.length} / 4
          </span>
          <button
            onClick={resetGame}
            className="p-2 hover:bg-slate-100 rounded-xl text-slate-500 hover:text-slate-800 transition-colors"
            title="Қайта араластыру"
          >
            <RefreshCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <BilimpazGuide
        message={
          isAllMatched
            ? "Алақай! Барлық жұптарды дәл таптың! Сандардың орнын ауыстырсақ та, олар бір-біріне тең жұптар!"
            : "Бір карточканы басып, оның ауыстырымды жұбын тап! Мысалы: 2 + 5 пен 5 + 2 — сиқырлы егіз жұптар!"
        }
        mood={isAllMatched ? 'celebrate' : 'happy'}
      />

      {/* Grid of Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto py-2">
        {cards.map((c) => {
          const isMatched = matchedPairIds.includes(c.pairId);
          const isSelected = selectedCardId === c.id;
          const isWrong = wrongPair.includes(c.id);

          let style = 'bg-white text-slate-800 border-purple-200 hover:border-purple-400 hover:bg-purple-50/50';

          if (isMatched) {
            style = 'bg-emerald-500 text-white border-emerald-600 shadow-md ring-2 ring-emerald-300';
          } else if (isWrong) {
            style = 'bg-rose-500 text-white border-rose-600 animate-shake';
          } else if (isSelected) {
            style = 'bg-amber-400 text-slate-900 border-amber-500 shadow-lg scale-105 ring-4 ring-amber-200';
          }

          return (
            <button
              key={c.id}
              disabled={isMatched}
              onClick={() => handleCardClick(c)}
              className={`h-24 sm:h-28 rounded-3xl border-3 flex flex-col items-center justify-center p-2 font-heading font-black text-xl sm:text-2xl transition-all duration-200 active:scale-95 cursor-pointer shadow-xs ${style}`}
            >
              <span>{c.text}</span>
              {isMatched ? (
                <span className="text-xs font-bold text-emerald-100 mt-1 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Жұпталды ({c.sum})
                </span>
              ) : (
                <span className="text-[11px] font-bold text-slate-400 mt-0.5">
                  жұбын бас
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Completed Banner */}
      {isAllMatched && (
        <div className="p-5 bg-gradient-to-r from-emerald-100 via-sky-100 to-amber-100 rounded-3xl border-2 border-emerald-400 text-center space-y-3 animate-pop-in max-w-lg mx-auto">
          <div className="text-4xl">🎉 ⭐ 🏆</div>
          <h4 className="font-heading font-black text-xl text-emerald-900">
            Барлық жұптар дұрыс табылды!
          </h4>
          <p className="text-xs sm:text-sm text-slate-700 font-semibold">
            2+5 = 5+2 • 3+4 = 4+3 • 1+6 = 6+1 • 2+6 = 6+2
          </p>
          <button
            onClick={resetGame}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-2xl text-sm shadow-md transition-all active:scale-95 cursor-pointer inline-flex items-center gap-2"
          >
            <RefreshCcw className="w-4 h-4" />
            Қайта ойнау
          </button>
        </div>
      )}
    </div>
  );
};
