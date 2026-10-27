import React from 'react';
import { Target, CheckCircle2, Clock, Sparkles, ArrowRight, Award } from 'lucide-react';
import { BilimpazGuide } from './BilimpazGuide';
import { ActiveTab } from '../types';
import { sound } from '../utils/sound';

interface Props {
  setActiveTab: (tab: ActiveTab) => void;
}

export const ObjectivesSection: React.FC<Props> = ({ setActiveTab }) => {
  const kidGoals = [
    {
      id: 1,
      icon: '➕➖',
      title: 'Қосу және азайту амалдары',
      desc: 'Қосу және азайту амалдарын көрнекі заттармен орындаймын.',
      color: 'border-sky-300 bg-sky-50 text-sky-800',
    },
    {
      id: 2,
      icon: '📊',
      title: 'Қосу кестесін қолдану',
      desc: '10-ға дейінгі сандардың қосу кестесін білемін және қолданамын.',
      color: 'border-amber-300 bg-amber-50 text-amber-800',
    },
    {
      id: 3,
      icon: '🔄',
      title: 'Ауыстырымдылық қасиеті',
      desc: 'Қосылғыштардың орнын ауыстырғанда қосынды өзгермейтінін дәлелдеймін (3+4 = 4+3).',
      color: 'border-purple-300 bg-purple-50 text-purple-800',
    },
    {
      id: 4,
      icon: '🌟',
      title: 'Өз бетімше есеп шығару',
      desc: 'Ойындар мен өмірлік кейстердегі есептерді өз бетімше шығара аламын.',
      color: 'border-emerald-300 bg-emerald-50 text-emerald-800',
    },
  ];

  const timeBreakdown = [
    {
      step: '1-қадам',
      time: '1 минут',
      title: 'Сабақты бастау',
      desc: 'Психологиялық ахуал, қызығушылықты ояту және сабақтың тақырыбын жариялау.',
      badge: 'Кіріспе',
    },
    {
      step: '2-қадам',
      time: '3–4 минут',
      title: 'Тақырыпты түсіндіру',
      desc: 'Алмалар арқылы қосу мен азайтудың мағынасын ашу, орын ауыстыру заңын көрсету.',
      badge: 'Жаңа сабақ',
    },
    {
      step: '3-қадам',
      time: '7–10 минут',
      title: 'Ойындар мен тапсырмалар',
      desc: 'Интерактивті тақтадағы 4 ойын, асхана кейсі және деңгейлік тапсырмаларды орындау.',
      badge: 'Бекіту',
    },
    {
      step: '4-қадам',
      time: '5 минут',
      title: 'Бағалау және қорытынды',
      desc: '10 сұрақтық тестті орындау, нәтижені көру және «Бағдаршам» кері байланысы.',
      badge: 'Рефлексия',
    },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2">
      {/* Title Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-xs font-bold">
          <Target className="w-4 h-4" />
          Мемлекеттік стандарт және бағдарлама талаптары
        </div>
        <h2 className="font-heading font-black text-2xl sm:text-3xl text-slate-900">
          САБАҚТЫҢ МАҚСАТЫ МЕН ТАПСЫРМАЛАРЫ
        </h2>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
          Бұл сабақта 1-сынып оқушысы қандай білім мен дағдыларды меңгереді?
        </p>
      </div>

      <BilimpazGuide
        message="Бүгінгі сабағымыз өте ерекше! Біз қосу кестесін жасауды және сандардың орнын ауыстырғанда не болатынын білетін боламыз. Алға, жас математиктер!"
        mood="encouraging"
      />

      {/* Official Curriculum Goals Card (For Teachers & Commission) */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-indigo-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-indigo-700 font-heading font-extrabold text-lg border-b border-indigo-100 pb-2">
          <Award className="w-5 h-5 text-indigo-600" />
          <span>Ресми оқу мақсаттары (ҚР Білім беру бағдарламасы):</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-indigo-50/60 rounded-2xl border border-indigo-200">
            <span className="font-mono text-xs font-black text-indigo-700 bg-white px-2 py-0.5 rounded-md border border-indigo-200">
              Оқу мақсаты 1.1.2.4
            </span>
            <p className="mt-2 text-sm font-semibold text-slate-800 leading-relaxed">
              Біртаңбалы сандарды ондықтан аттамай қосу кестесін құру, білу және қолдану.
            </p>
          </div>

          <div className="p-4 bg-sky-50/60 rounded-2xl border border-sky-200">
            <span className="font-mono text-xs font-black text-sky-700 bg-white px-2 py-0.5 rounded-md border border-sky-200">
              Оқу мақсаты 1.1.2.3
            </span>
            <p className="mt-2 text-sm font-semibold text-slate-800 leading-relaxed">
              Қосудың ауыстырымдылық қасиетін қолдану.
            </p>
          </div>
        </div>

        <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200">
          <p className="text-xs font-bold text-amber-900 uppercase tracking-wide">
            Сабақтың негізгі мақсаты:
          </p>
          <p className="text-sm font-medium text-slate-800 mt-1">
            Оқушылар біртаңбалы сандарды ондықтан аттамай қосу кестесін құрады, қолданады және қосудың ауыстырымдылық қасиетін пайдаланып, есептерді дұрыс шығарады.
          </p>
        </div>
      </div>

      {/* Kid-Friendly Visual Goals Cards */}
      <div className="space-y-3">
        <h3 className="font-heading font-extrabold text-xl text-slate-800 flex items-center gap-2">
          <span>👶</span> Оқушыға түсінікті мақсаттар («Мен үйренемін»):
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {kidGoals.map((g) => (
            <div
              key={g.id}
              className={`p-5 rounded-3xl border-2 shadow-xs transition-transform hover:-translate-y-0.5 ${g.color}`}
            >
              <div className="text-3xl mb-2">{g.icon}</div>
              <h4 className="font-heading font-extrabold text-base mb-1">
                {g.title}
              </h4>
              <p className="text-xs sm:text-sm font-medium leading-relaxed">
                {g.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Lesson Time Schedule (1 min, 3-4 min, 7-10 min, 5 min) */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-slate-200 shadow-sm space-y-4">
        <h3 className="font-heading font-extrabold text-lg text-slate-800 flex items-center gap-2">
          <Clock className="w-5 h-5 text-sky-500" />
          <span>Сабақтың уақыттық құрылымы (Ашық сабақ жоспары)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {timeBreakdown.map((t, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-sky-600 mb-2">
                  <span>{t.step}</span>
                  <span className="bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full">
                    {t.time}
                  </span>
                </div>
                <h4 className="font-bold text-slate-800 text-sm mb-1">
                  {t.title}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {t.desc}
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200 text-[11px] font-bold text-indigo-600">
                {t.badge}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Next Step CTA */}
      <div className="text-center pt-2">
        <button
          onClick={() => {
            sound.playClick();
            setActiveTab('explain');
          }}
          className="px-8 py-3.5 bg-sky-500 hover:bg-sky-600 text-white font-extrabold rounded-2xl shadow-md hover:shadow-lg transition-all active:scale-95 inline-flex items-center gap-2 text-base cursor-pointer"
        >
          <span>Тақырыпты түсінуге өту</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
