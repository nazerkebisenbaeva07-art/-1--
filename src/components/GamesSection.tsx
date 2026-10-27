import React, { useState } from 'react';
import { MagicAdditionGame } from './games/MagicAdditionGame';
import { SubtractionIslandGame } from './games/SubtractionIslandGame';
import { MatchPairsGame } from './games/MatchPairsGame';
import { FindErrorGame } from './games/FindErrorGame';
import { sound } from '../utils/sound';

interface Props {
  onEarnStar: () => void;
}

type GameKey = 'magic' | 'island' | 'pairs' | 'error';

export const GamesSection: React.FC<Props> = ({ onEarnStar }) => {
  const [activeGame, setActiveGame] = useState<GameKey>('magic');

  const gamesList: { id: GameKey; title: string; subtitle: string; icon: string; color: string }[] = [
    {
      id: 'magic',
      title: '1. Сиқырлы қосу',
      subtitle: 'Ондықтан аттамай қосу',
      icon: '✨',
      color: 'hover:border-sky-400',
    },
    {
      id: 'island',
      title: '2. Азайту аралы',
      subtitle: 'Ұшатын шарлар есебі',
      icon: '🎈',
      color: 'hover:border-emerald-400',
    },
    {
      id: 'pairs',
      title: '3. Жұбын тап',
      subtitle: 'Орын ауыстыру заңы',
      icon: '🔄',
      color: 'hover:border-purple-400',
    },
    {
      id: 'error',
      title: '4. Қатені тап',
      subtitle: 'Дұрыс/қате теңдіктер',
      icon: '🔍',
      color: 'hover:border-rose-400',
    },
  ];

  const handleSwitchGame = (gameId: GameKey) => {
    sound.playClick();
    setActiveGame(gameId);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-2">
      {/* Title */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-bold">
          <span>🎮</span> Ойындар арқылы оқыту (7–10 минут)
        </div>
        <h2 className="font-heading font-black text-2xl sm:text-3xl text-slate-900">
          ОЙЫНДАР ӘЛЕМІ: 4 ҚЫЗЫҚТЫ МАТЕМАТИКАЛЫҚ ОЙЫН
        </h2>
        <p className="text-sm text-slate-600">
          Интерактивті тақтада оқушылар кезекпен немесе бірге ойнайтын ойындар жинағы.
        </p>
      </div>

      {/* Game Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
        {gamesList.map((g) => {
          const isActive = activeGame === g.id;
          return (
            <button
              key={g.id}
              onClick={() => handleSwitchGame(g.id)}
              className={`p-3 sm:p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                isActive
                  ? 'bg-white border-purple-500 shadow-md ring-2 ring-purple-200 scale-102'
                  : 'bg-white/80 border-slate-200 text-slate-600 hover:bg-white'
              }`}
            >
              <div className="text-2xl mb-1">{g.icon}</div>
              <div>
                <h4 className="font-heading font-bold text-xs sm:text-sm text-slate-800 leading-tight">
                  {g.title}
                </h4>
                <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5">
                  {g.subtitle}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Render Current Game */}
      <div className="transition-opacity duration-300">
        {activeGame === 'magic' && <MagicAdditionGame onEarnStar={onEarnStar} />}
        {activeGame === 'island' && <SubtractionIslandGame onEarnStar={onEarnStar} />}
        {activeGame === 'pairs' && <MatchPairsGame onEarnStar={onEarnStar} />}
        {activeGame === 'error' && <FindErrorGame onEarnStar={onEarnStar} />}
      </div>
    </div>
  );
};
