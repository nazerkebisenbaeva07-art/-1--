import React, { useState } from 'react';
import { BilimpazGuide } from './BilimpazGuide';
import { sound } from '../utils/sound';
import { fireConfetti } from '../utils/confetti';
import { CheckCircle2, Heart, Sparkles, Smile, HelpCircle, ThumbsUp } from 'lucide-react';

interface Props {
  onEarnStar: () => void;
}

type TrafficLightColor = 'green' | 'yellow' | 'red' | null;

export const FeedbackSection: React.FC<Props> = ({ onEarnStar }) => {
  const [selectedLight, setSelectedLight] = useState<TrafficLightColor>(null);

  // «Бүгін мен не үйрендім?» interactive reflection checklist
  const [learnedItems, setLearnedItems] = useState<{ [key: string]: boolean }>({
    addition: false,
    subtraction: false,
    commutative: false,
    table: false,
    life: false,
  });

  const handleSelectLight = (color: TrafficLightColor) => {
    setSelectedLight(color);
    if (color === 'green') {
      sound.playSuccess();
      fireConfetti();
      onEarnStar();
    } else {
      sound.playPop();
    }
  };

  const toggleLearned = (key: string) => {
    sound.playPop();
    setLearnedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-2">
      {/* Title */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-100 text-rose-800 rounded-full text-xs font-bold">
          <span>🚦</span> Сабақты қорыту және рефлексия
        </div>
        <h2 className="font-heading font-black text-2xl sm:text-3xl text-slate-900">
          КЕРІ БАЙЛАНЫС: «БАҒДАРШАМ» ӘДІСІ
        </h2>
        <p className="text-sm text-slate-600">
          Бүгінгі сабақта өз көңіл-күйің мен жетістігіңді бағала!
        </p>
      </div>

      <BilimpazGuide
        message="Бүгінгі сабақ қалай өтті, достым? Бағдаршамның бір түсін таңда және өзің үйренген жаңа дағдыларды белгіле!"
        mood="happy"
      />

      {/* Traffic Light Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-sm space-y-6">
        <div className="text-center">
          <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest block mb-1">
            Өзін-өзі бағалау
          </span>
          <h3 className="font-heading font-extrabold text-xl text-slate-800">
            «Бағдаршам» түстері арқылы өзіңді бағала:
          </h3>
        </div>

        {/* 3 Traffic Light Choices */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Green */}
          <button
            onClick={() => handleSelectLight('green')}
            className={`p-5 rounded-3xl border-3 text-left transition-all cursor-pointer flex flex-col justify-between ${
              selectedLight === 'green'
                ? 'bg-emerald-500 text-white border-emerald-600 shadow-xl scale-103 ring-4 ring-emerald-200'
                : 'bg-white hover:bg-emerald-50/60 border-emerald-300 text-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center text-2xl shadow-inner border-2 border-white">
                🟢
              </div>
              <span className={`text-xs font-black px-2.5 py-0.5 rounded-full ${
                selectedLight === 'green' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
              }`}>
                Жасыл
              </span>
            </div>
            <div>
              <h4 className="font-heading font-black text-base sm:text-lg mb-1">
                Өзіме сенімдімін
              </h4>
              <p className={`text-xs sm:text-sm font-semibold leading-relaxed ${
                selectedLight === 'green' ? 'text-emerald-100' : 'text-slate-600'
              }`}>
                «Мен тапсырмаларды өзім орындай аламын».
              </p>
            </div>
          </button>

          {/* Yellow */}
          <button
            onClick={() => handleSelectLight('yellow')}
            className={`p-5 rounded-3xl border-3 text-left transition-all cursor-pointer flex flex-col justify-between ${
              selectedLight === 'yellow'
                ? 'bg-amber-400 text-slate-900 border-amber-500 shadow-xl scale-103 ring-4 ring-amber-200'
                : 'bg-white hover:bg-amber-50/60 border-amber-300 text-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-full bg-amber-400 text-white flex items-center justify-center text-2xl shadow-inner border-2 border-white">
                🟡
              </div>
              <span className={`text-xs font-black px-2.5 py-0.5 rounded-full ${
                selectedLight === 'yellow' ? 'bg-slate-900/10 text-slate-900' : 'bg-amber-100 text-amber-800'
              }`}>
                Сары
              </span>
            </div>
            <div>
              <h4 className="font-heading font-black text-base sm:text-lg mb-1">
                Жаттығу қажет
              </h4>
              <p className={`text-xs sm:text-sm font-semibold leading-relaxed ${
                selectedLight === 'yellow' ? 'text-amber-950' : 'text-slate-600'
              }`}>
                «Маған тағы да жаттығу керек».
              </p>
            </div>
          </button>

          {/* Red */}
          <button
            onClick={() => handleSelectLight('red')}
            className={`p-5 rounded-3xl border-3 text-left transition-all cursor-pointer flex flex-col justify-between ${
              selectedLight === 'red'
                ? 'bg-rose-500 text-white border-rose-600 shadow-xl scale-103 ring-4 ring-rose-200'
                : 'bg-white hover:bg-rose-50/60 border-rose-300 text-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-full bg-rose-500 text-white flex items-center justify-center text-2xl shadow-inner border-2 border-white">
                🔴
              </div>
              <span className={`text-xs font-black px-2.5 py-0.5 rounded-full ${
                selectedLight === 'red' ? 'bg-white/20 text-white' : 'bg-rose-100 text-rose-800'
              }`}>
                Қызыл
              </span>
            </div>
            <div>
              <h4 className="font-heading font-black text-base sm:text-lg mb-1">
                Көмек сұраймын
              </h4>
              <p className={`text-xs sm:text-sm font-semibold leading-relaxed ${
                selectedLight === 'red' ? 'text-rose-100' : 'text-slate-600'
              }`}>
                «Маған көмек қажет».
              </p>
            </div>
          </button>
        </div>

        {selectedLight && (
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-center text-sm font-bold text-slate-800 animate-pop-in">
            {selectedLight === 'green' && '🌟 Жарайсың! Өзіңе сенімді болғаның керемет нәтиже!'}
            {selectedLight === 'yellow' && '💪 Тамаша талпыныс! Тағы бірнеше ойын ойнап, шеберлігіңді арттырасың!'}
            {selectedLight === 'red' && '🤝 Еш уайымдама! Мұғалім мен Білімпаз саған әрқашан көмектесуге дайын!'}
          </div>
        )}
      </div>

      {/* «Бүгін мен не үйрендім?» Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-sky-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-sky-800 font-heading font-black text-lg">
          <Smile className="w-5 h-5 text-sky-500" />
          <span>«Бүгін мен не үйрендім?» (Өзің меңгергенді таңда)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { id: 'addition', text: '🍎 Біртаңбалы сандарды ондықтан аттамай қосуды' },
            { id: 'subtraction', text: '🎈 Заттардың қалған санын азайту арқылы табуды' },
            { id: 'commutative', text: '🔄 Қосылғыштардың орнын ауыстыру заңын (3+4 = 4+3)' },
            { id: 'table', text: '📊 10-ға дейінгі қосу кестесін пайдалануды' },
            { id: 'life', text: '🍽️ Мектеп асханасындағы жемістерді санауды' },
          ].map((item) => {
            const isChecked = learnedItems[item.id];
            return (
              <button
                key={item.id}
                onClick={() => toggleLearned(item.id)}
                className={`p-3.5 rounded-2xl border-2 text-left font-semibold text-xs sm:text-sm flex items-center justify-between transition-all cursor-pointer ${
                  isChecked
                    ? 'bg-sky-50 border-sky-400 text-sky-900 shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-sky-50/50'
                }`}
              >
                <span>{item.text}</span>
                <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ml-2 ${
                  isChecked ? 'bg-sky-500 text-white' : 'border border-slate-300 bg-white'
                }`}>
                  {isChecked ? '✓' : ''}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
