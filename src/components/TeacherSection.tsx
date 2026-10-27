import React, { useState } from 'react';
import { 
  GraduationCap, 
  CheckCircle, 
  Clock, 
  FileText, 
  Printer, 
  Sparkles, 
  Users, 
  Award,
  Layers,
  HeartHandshake
} from 'lucide-react';
import { sound } from '../utils/sound';

export const TeacherSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'plan' | 'rubric' | 'inclusion'>('plan');

  const descriptors = [
    {
      step: '1-тапсырма',
      name: '«Сиқырлы қосу» ойыны',
      criterion: 'Біртаңбалы сандарды ондықтан аттамай қосу',
      descriptors: [
        'Қосындысы 10-нан аспайтын өрнектердің мәнін дұрыс табады;',
        'Суреттегі заттарды (алма, алмұрт) санап сәйкестендіреді.',
      ],
      score: '2 балл',
    },
    {
      step: '2-тапсырма',
      name: '«Азайту аралы» ойыны',
      criterion: 'Азайту амалының мағынасын түсіну',
      descriptors: [
        'Алынған заттарды ескере отырып қалған заттар санын анықтайды;',
        'Азайту өрнегінің жауабын дұрыс белгілейді.',
      ],
      score: '2 балл',
    },
    {
      step: '3-тапсырма',
      name: '«Жұбын тап» және «Орын ауыстыру»',
      criterion: 'Қосудың ауыстырымдылық қасиетін қолдану',
      descriptors: [
        'Қосылғыштардың орнын ауыстырғанда мәні өзгермейтінін біледі;',
        'Тең өрнектерді жұптап көрсетеді (2+5 = 5+2).',
      ],
      score: '2 балл',
    },
    {
      step: '4-тапсырма',
      name: '«Мектеп асханасындағы жемістер» кейсі',
      criterion: 'Функционалдық сауаттылықты қолдану',
      descriptors: [
        'Өмірлік жағдаятты математикалық тілге айналдырады;',
        'Қосу өрнегін дұрыс жазады және орын ауыстыру арқылы салыстырады.',
      ],
      score: '2 балл',
    },
    {
      step: '5-тапсырма',
      name: 'Қорытынды тест және қатені түзету',
      criterion: 'Оқу мақсаттарын толық меңгеру',
      descriptors: [
        'Тест сұрақтарына өз бетінше жауап береді;',
        'Өрнектегі қатені тауып, дұрыс жауабын ұсынады.',
      ],
      score: '2 балл',
    },
  ];

  const scale10 = [
    { score: '9–10 балл', level: 'Жоғары деңгей', desc: 'Барлық оқу мақсаттарын толық меңгерген, есептерді өз бетінше қатесіз шығарады.' },
    { score: '7–8 балл', level: 'Ортадан жоғары', desc: 'Қосу мен азайтуды біледі, кейбір тапсырмаларда шағын бағыттауды қажет етеді.' },
    { score: '4–6 балл', level: 'Орта деңгей', desc: 'Көрнекі суреттер мен таяқшалардың көмегімен қосу мен азайтуды орындайды.' },
    { score: '1–3 балл', level: 'Талпыну деңгейі', desc: 'Мұғалімнің жетекші сұрақтары арқылы заттарды санайды және біріктіреді.' },
  ];

  const handlePrint = () => {
    sound.playPop();
    window.print();
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-2">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400 text-slate-900 rounded-full text-xs font-black">
            <GraduationCap className="w-4 h-4" />
            Педагогикалық папка • Ашық сабақ
          </div>
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-white">
            МҰҒАЛІМГЕ ЖӘНЕ БАҒАЛАУ КОМИССИЯСЫНА
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            1-сынып математика пәні бойынша үлгілік бағдарламаға сай әзірленген сабақ құрылымы, бағалау дескрипторлары және инклюзивті оқыту моделі.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="px-5 py-3 bg-white hover:bg-slate-100 text-slate-900 font-extrabold rounded-2xl text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all active:scale-95 shrink-0 cursor-pointer"
        >
          <Printer className="w-4 h-4 text-sky-600" />
          Сабақ картасын басып шығару
        </button>
      </div>

      {/* Internal Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-white rounded-2xl border-2 border-slate-200 shadow-xs max-w-xl mx-auto">
        <button
          onClick={() => {
            sound.playClick();
            setActiveTab('plan');
          }}
          className={`flex-1 min-w-[130px] py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
            activeTab === 'plan' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          📋 Сабақ жоспары
        </button>
        <button
          onClick={() => {
            sound.playClick();
            setActiveTab('rubric');
          }}
          className={`flex-1 min-w-[130px] py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
            activeTab === 'rubric' ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          ⭐ Дескрипторлар
        </button>
        <button
          onClick={() => {
            sound.playClick();
            setActiveTab('inclusion');
          }}
          className={`flex-1 min-w-[130px] py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
            activeTab === 'inclusion' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          🤝 Инклюзивті оқыту
        </button>
      </div>

      {/* TAB 1: САБАҚ ЖОСПАРЫ */}
      {activeTab === 'plan' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-sky-200 shadow-sm space-y-6 animate-pop-in">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-heading font-black text-xl text-slate-800">
              Қысқа мерзімді жоспар (ҚМЖ) тезистері
            </h3>
            <p className="text-xs text-slate-500">
              Пән: Математика • 1-сынып • Бөлім: «Сандар және амалдар»
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-sky-50 rounded-2xl border border-sky-200 space-y-2">
              <span className="text-xs font-black text-sky-800 uppercase tracking-wide">
                Оқу мақсаттары:
              </span>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-semibold">
                • <strong>1.1.2.4</strong> — біртаңбалы сандарды ондықтан аттамай қосу кестесін құру, білу және қолдану.<br />
                • <strong>1.1.2.3</strong> — қосудың ауыстырымдылық қасиетін қолдану.
              </p>
            </div>

            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-2">
              <span className="text-xs font-black text-amber-800 uppercase tracking-wide">
                Сабақтың түрі мен әдістері:
              </span>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-semibold">
                • Ашық сабақ, білімді бекіту және функционалдық сауаттылықты дамыту сабағы.<br />
                • Интерактивті оқыту, ойын технологиясы, цифрлық білім беру ресурстары (ЦБР).
              </p>
            </div>
          </div>

          {/* Time management table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <th className="p-3 rounded-l-xl">Сабақ кезеңі</th>
                  <th className="p-3">Уақыты</th>
                  <th className="p-3">Мұғалім мен оқушының әрекеті</th>
                  <th className="p-3 rounded-r-xl">Ресурс / Тақта</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-3 font-bold text-slate-800">1. Ұйымдастыру</td>
                  <td className="p-3 text-sky-600 font-bold">1 минут</td>
                  <td className="p-3 text-slate-600">Сәлемдесу, Білімпаз кейіпкерімен танысу, сабаққа зейін аудару.</td>
                  <td className="p-3 text-slate-500">«Басты бет» бөлімі</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-800">2. Тақырыпты түсіндіру</td>
                  <td className="p-3 text-sky-600 font-bold">3–4 минут</td>
                  <td className="p-3 text-slate-600">Алмалар арқылы қосу, азайту және орын ауыстыру заңын нақты көрсету.</td>
                  <td className="p-3 text-slate-500">«Тақырыпты түсіну» бөлімі</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-800">3. Ойындар мен кейс</td>
                  <td className="p-3 text-sky-600 font-bold">7–10 минут</td>
                  <td className="p-3 text-slate-600">Интерактивті тақтада «Сиқырлы қосу», «Азайту аралы», «Жұбын тап», асхана кейсі.</td>
                  <td className="p-3 text-slate-500">«Ойындар әлемі» & «Кейс»</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-800">4. Бағалау және кері байланыс</td>
                  <td className="p-3 text-sky-600 font-bold">5 минут</td>
                  <td className="p-3 text-slate-600">10 сұрақтық қорытынды тест орындау, жұлдыздарды қорытындылау, «Бағдаршам» рефлексиясы.</td>
                  <td className="p-3 text-slate-500">«Тест» & «Кері байланыс»</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: БАҒАЛАУ КРИТЕРИЙЛЕРІ МЕН ДЕСКРИПТОРЛАР */}
      {activeTab === 'rubric' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-200 shadow-sm space-y-6 animate-pop-in">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-heading font-black text-xl text-slate-800">
              Бағалау критерийлері мен дескрипторлар кестесі
            </h3>
            <p className="text-xs text-slate-500">
              Барлық тапсырмалар бойынша 10 балдық шкаланың бөлінісі
            </p>
          </div>

          <div className="space-y-4">
            {descriptors.map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-heading font-black text-sm sm:text-base text-slate-800">
                    {item.step}: {item.name}
                  </span>
                  <span className="px-3 py-1 bg-amber-100 text-amber-900 rounded-full font-black text-xs border border-amber-300">
                    {item.score}
                  </span>
                </div>
                <p className="text-xs font-bold text-indigo-700">
                  Критерий: {item.criterion}
                </p>
                <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
                  {item.descriptors.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* 10-point scale */}
          <div className="bg-amber-50/70 rounded-2xl p-4 border border-amber-200 space-y-2">
            <h4 className="font-heading font-black text-sm text-amber-900">
              10 балдық бағалау жүйесінің шкаласы:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {scale10.map((s, idx) => (
                <div key={idx} className="p-2 bg-white rounded-xl border border-amber-200">
                  <span className="font-black text-amber-800">{s.score} ({s.level}): </span>
                  <span className="text-slate-600">{s.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ИНКЛЮЗИВТІ ОҚЫТУҒА БЕЙІМДЕУ */}
      {activeTab === 'inclusion' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-200 shadow-sm space-y-6 animate-pop-in">
          <div className="border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2 text-emerald-700 font-heading font-black text-lg">
              <HeartHandshake className="w-5 h-5" />
              <span>Инклюзивті оқушыларға арналған бейімдеу нұсқаулығы</span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Сыныптағы ерекше білім беруді қажет ететін 3 оқушының ерекшелігін ескеру:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2">
              <h4 className="font-bold text-sm text-emerald-900 flex items-center gap-1.5">
                <span>🪵</span> Көрнекілік пен санау таяқшалары:
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed">
                Сайттың жоғарғы панелінде кез келген уақытта ашылатын «Санау таяқшалары» виртуалды құралы жасалды. Оқушылар абстрактілі сандарды таяқшалар мен жемістер түрінде көріп, қолмен санап шығара алады.
              </p>
            </div>

            <div className="p-4 bg-sky-50 rounded-2xl border border-sky-200 space-y-2">
              <h4 className="font-bold text-sm text-sky-900 flex items-center gap-1.5">
                <span>🔊</span> Дыбыстық және сенсорлық реттеу:
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed">
                Дыбысты қажет болған жағдайда бір батырмамен өшіруге болады. Дыбыстар жұмсақ әрі мазасыздық тудырмайтын етіп Web Audio арқылы бапталған.
              </p>
            </div>

            <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200 space-y-2">
              <h4 className="font-bold text-sm text-purple-900 flex items-center gap-1.5">
                <span>⏱️</span> Уақыттық шектеудің болмауы:
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed">
                Тапсырмаларда қатаң таймерлер қойылмаған. Оқушы өз қарқынымен ойланып, жауапты қатесіз таңдауына толық жағдай жасалған.
              </p>
            </div>

            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-2">
              <h4 className="font-bold text-sm text-amber-900 flex items-center gap-1.5">
                <span>🔄</span> Қайта орындау мүмкіндігі:
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed">
                Қате жауап берілген жағдайда оқушыны сөгетін немесе бағасын төмендететін қатал хабарламалар жоқ. Керісінше, қайта байқап көруге жігерлендіретін сөздер көрсетіледі.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
