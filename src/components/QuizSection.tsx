import React, { useState } from 'react';
import { BilimpazGuide } from './BilimpazGuide';
import { QuizQuestion } from '../types';
import { sound } from '../utils/sound';
import { fireGrandConfetti, fireConfetti } from '../utils/confetti';
import { Star, CheckCircle, RefreshCcw, Award, ArrowRight } from 'lucide-react';

interface Props {
  onEarnStar: () => void;
}

export const QuizSection: React.FC<Props> = ({ onEarnStar }) => {
  // Exactly 10 questions structured as requested
  const questions: QuizQuestion[] = [
    // 4 addition questions
    {
      id: 1,
      type: 'addition',
      typeLabel: 'Қосу амалы',
      question: '3 + 4 өрнегінің мәні нешеге тең?',
      options: [
        { id: 'a', text: '6', isCorrect: false },
        { id: 'b', text: '7', isCorrect: true },
        { id: 'c', text: '8', isCorrect: false },
      ],
      explanation: '3-ке 4-ті қосқанда 7 шығады.',
    },
    {
      id: 2,
      type: 'addition',
      typeLabel: 'Қосу амалы',
      question: '5 + 3 қосындысы нешеге тең?',
      options: [
        { id: 'a', text: '8', isCorrect: true },
        { id: 'b', text: '7', isCorrect: false },
        { id: 'c', text: '9', isCorrect: false },
      ],
      explanation: '5 пен 3-тің қосындысы 8-ге тең.',
    },
    {
      id: 3,
      type: 'addition',
      typeLabel: 'Қосу амалы',
      question: '2 + 6 өрнегін есепте:',
      options: [
        { id: 'a', text: '7', isCorrect: false },
        { id: 'b', text: '8', isCorrect: true },
        { id: 'c', text: '9', isCorrect: false },
      ],
      explanation: '2 + 6 = 8 болады.',
    },
    {
      id: 4,
      type: 'addition',
      typeLabel: 'Қосу амалы',
      question: '4 + 4 нешеге тең?',
      options: [
        { id: 'a', text: '8', isCorrect: true },
        { id: 'b', text: '7', isCorrect: false },
        { id: 'c', text: '6', isCorrect: false },
      ],
      explanation: '4 пен 4-тің қосындысы 8-ге тең.',
    },

    // 2 subtraction questions
    {
      id: 5,
      type: 'subtraction',
      typeLabel: 'Азайту амалы',
      question: '7 − 3 өрнегінің мәні неше?',
      options: [
        { id: 'a', text: '5', isCorrect: false },
        { id: 'b', text: '4', isCorrect: true },
        { id: 'c', text: '3', isCorrect: false },
      ],
      explanation: '7-ден 3-ті азайтқанда 4 қалады.',
    },
    {
      id: 6,
      type: 'subtraction',
      typeLabel: 'Азайту амалы',
      question: '9 − 5 айырмасын тап:',
      options: [
        { id: 'a', text: '3', isCorrect: false },
        { id: 'b', text: '4', isCorrect: true },
        { id: 'c', text: '5', isCorrect: false },
      ],
      explanation: '9-дан 5-ті алып тастасақ, 4 қалады.',
    },

    // 2 commutative property questions
    {
      id: 7,
      type: 'commutative',
      typeLabel: 'Ауыстырымдылық қасиеті',
      question: 'Егер 2 + 5 = 7 болса, онда 5 + 2 нешеге тең болады?',
      options: [
        { id: 'a', text: '7', isCorrect: true },
        { id: 'b', text: '8', isCorrect: false },
        { id: 'c', text: '6', isCorrect: false },
      ],
      explanation: 'Қосылғыштардың орнын ауыстырғанмен, қосындының мәні өзгермейді.',
    },
    {
      id: 8,
      type: 'commutative',
      typeLabel: 'Ауыстырымдылық қасиеті',
      question: '3 + 6 өрнегіне қай өрнек тең?',
      options: [
        { id: 'a', text: '6 + 2', isCorrect: false },
        { id: 'b', text: '6 + 3', isCorrect: true },
        { id: 'c', text: '5 + 3', isCorrect: false },
      ],
      explanation: '3 + 6 және 6 + 3 өрнектері өзара тең.',
    },

    // 1 fill-in-the-blank question
    {
      id: 9,
      type: 'blank',
      typeLabel: 'Бос орынды толтыру',
      question: '4 + ❓ = 9 өрнегіндегі сұрақтың орнындағы санды тап:',
      options: [
        { id: 'a', text: '4', isCorrect: false },
        { id: 'b', text: '5', isCorrect: true },
        { id: 'c', text: '6', isCorrect: false },
      ],
      explanation: '4-ке 5-ті қосқанда 9 болады.',
    },

    // 1 contextual real-life problem
    {
      id: 10,
      type: 'context',
      typeLabel: 'Өмірлік жағдаят (Кейс)',
      question: 'Асқарда 3 қызыл қарындаш және 5 көк қарындаш бар. Асқарда барлығы неше қарындаш?',
      options: [
        { id: 'a', text: '7', isCorrect: false },
        { id: 'b', text: '8', isCorrect: true },
        { id: 'c', text: '9', isCorrect: false },
      ],
      explanation: '3 + 5 = 8 қарындаш.',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: number]: string }>({});
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = questions[currentIndex];

  const handleSelectAnswer = (optId: string) => {
    sound.playPop();
    setSelectedAnswers((prev) => ({ ...prev, [currentQ.id]: optId }));
  };

  const handleNextQuestion = () => {
    sound.playClick();
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      // Calculate score
      let score = 0;
      questions.forEach((q) => {
        const userChoice = selectedAnswers[q.id];
        const correctOpt = q.options.find((o) => o.isCorrect);
        if (correctOpt && userChoice === correctOpt.id) {
          score++;
        }
      });

      if (score >= 7) {
        sound.playFanfare();
        fireGrandConfetti();
        onEarnStar();
      } else {
        sound.playSuccess();
      }
      setIsFinished(true);
    }
  };

  const calculateFinalScore = () => {
    let score = 0;
    questions.forEach((q) => {
      const userChoice = selectedAnswers[q.id];
      const correctOpt = q.options.find((o) => o.isCorrect);
      if (correctOpt && userChoice === correctOpt.id) {
        score++;
      }
    });
    return score;
  };

  const handleRestart = () => {
    sound.playPop();
    setSelectedAnswers({});
    setCurrentIndex(0);
    setIsFinished(false);
  };

  const finalScore = calculateFinalScore();

  const getEncouragingMessage = (score: number) => {
    if (score >= 9) {
      return {
        title: 'Керемет! Сен нағыз жас математиксің!',
        stars: 3,
        color: 'text-emerald-700 bg-emerald-50 border-emerald-300',
      };
    } else if (score >= 7) {
      return {
        title: 'Жарайсың! Тағы бір рет орындап, біліміңді шыңдай түс!',
        stars: 2,
        color: 'text-amber-800 bg-amber-50 border-amber-300',
      };
    } else {
      return {
        title: 'Талпынғаның өте жақсы! Сен міндетті түрде үйренесің!',
        stars: 1,
        color: 'text-sky-800 bg-sky-50 border-sky-300',
      };
    }
  };

  const feedbackInfo = getEncouragingMessage(finalScore);

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-2">
      {/* Title */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">
          <span>📝</span> 10 балдық қорытынды бақылау
        </div>
        <h2 className="font-heading font-black text-2xl sm:text-3xl text-slate-900">
          БІЛІМІМДІ ТЕКСЕРЕМІН
        </h2>
        <p className="text-sm text-slate-600">
          Әр сұраққа бір жауап таңда. Соңында автоматты түрде бағаң шығады!
        </p>
      </div>

      {!isFinished ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-300 shadow-md space-y-6">
          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span className="bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                {currentQ.typeLabel}
              </span>
              <span>
                Сұрақ: <span className="text-emerald-600 font-black">{currentIndex + 1}</span> / {questions.length}
              </span>
            </div>
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden border border-slate-200">
              <div
                className="bg-emerald-500 h-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          <BilimpazGuide
            message="Сұрақты мұқият оқы! 3 нұсқаның біреуі ғана дұрыс. Таңдап болған соң, «Келесі сұрақ» батырмасын бас!"
            mood="thinking"
          />

          {/* Question Body */}
          <div className="p-6 bg-slate-50 rounded-3xl border-2 border-slate-200 text-center space-y-6">
            <h3 className="font-heading font-black text-xl sm:text-2xl text-slate-900 leading-snug">
              {currentQ.question}
            </h3>

            {/* 3 Options */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-xl mx-auto">
              {currentQ.options.map((opt) => {
                const isSelected = selectedAnswers[currentQ.id] === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectAnswer(opt.id)}
                    className={`p-4 rounded-2xl border-3 font-heading font-black text-xl sm:text-2xl transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-500 text-white border-emerald-600 shadow-md scale-105'
                        : 'bg-white hover:bg-emerald-50 text-slate-800 border-slate-200 hover:border-emerald-300'
                    }`}
                  >
                    {opt.text}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Next Button */}
          <div className="text-center pt-2">
            <button
              disabled={!selectedAnswers[currentQ.id]}
              onClick={handleNextQuestion}
              className={`px-8 py-3.5 rounded-2xl font-black text-base shadow-md transition-all active:scale-95 inline-flex items-center gap-2 cursor-pointer ${
                selectedAnswers[currentQ.id]
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>{currentIndex < questions.length - 1 ? 'Келесі сұрақ' : 'Нәтижені көру'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="bg-white rounded-3xl p-6 sm:p-10 border-3 border-amber-300 shadow-xl text-center space-y-6 animate-pop-in">
          <div className="inline-block p-4 rounded-full bg-amber-100 text-amber-600 mb-2">
            <Award className="w-14 h-14" />
          </div>

          {/* Stars display */}
          <div className="flex items-center justify-center gap-2 text-4xl">
            {Array.from({ length: 3 }).map((_, i) => (
              <span
                key={i}
                className={`transition-transform duration-500 ${
                  i < feedbackInfo.stars
                    ? 'text-amber-400 scale-125 animate-bounce'
                    : 'text-slate-200'
                }`}
              >
                ★
              </span>
            ))}
          </div>

          {/* Score */}
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
              Сенің қорытынды ұпайың:
            </span>
            <div className="text-5xl sm:text-6xl font-heading font-black text-slate-900 tabular-nums">
              {finalScore} <span className="text-2xl text-slate-400 font-bold">/ 10 балл</span>
            </div>
          </div>

          {/* Encouraging Kazakh Message as explicitly required */}
          <div className={`p-5 rounded-2xl border-2 font-heading font-black text-lg sm:text-xl max-w-lg mx-auto ${feedbackInfo.color}`}>
            {feedbackInfo.title}
          </div>

          {/* Question Breakdown List */}
          <div className="text-left bg-slate-50 p-4 rounded-2xl border border-slate-200 max-w-xl mx-auto space-y-2">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">
              Сұрақтар бойынша жауаптар:
            </h4>
            {questions.map((q, idx) => {
              const userAns = selectedAnswers[q.id];
              const isCorrect = q.options.find((o) => o.id === userAns)?.isCorrect;
              return (
                <div key={q.id} className="flex items-center justify-between text-xs sm:text-sm py-1 border-b border-slate-100 last:border-none">
                  <span className="font-semibold text-slate-700">
                    {idx + 1}. {q.question}
                  </span>
                  <span className={`font-black ml-2 shrink-0 ${isCorrect ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {isCorrect ? 'Дұрыс (+1)' : 'Қате (0)'}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Restart Button */}
          <div className="pt-4">
            <button
              onClick={handleRestart}
              className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl text-base shadow-lg transition-all active:scale-95 inline-flex items-center gap-2 cursor-pointer"
            >
              <RefreshCcw className="w-5 h-5" />
              Қайта орындау (Тестті қайталау)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
