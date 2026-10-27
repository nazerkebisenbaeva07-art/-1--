/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ActiveTab } from './types';
import { Navbar } from './components/Navbar';
import { CountingSticksModal } from './components/CountingSticksModal';
import { HomeSection } from './components/HomeSection';
import { ObjectivesSection } from './components/ObjectivesSection';
import { ExplainSection } from './components/ExplainSection';
import { AdditionTableSection } from './components/AdditionTableSection';
import { GamesSection } from './components/GamesSection';
import { CaseStudySection } from './components/CaseStudySection';
import { DifferentiatedSection } from './components/DifferentiatedSection';
import { QuizSection } from './components/QuizSection';
import { FeedbackSection } from './components/FeedbackSection';
import { TeacherSection } from './components/TeacherSection';
import { sound } from './utils/sound';
import { Heart, Sparkles, BookOpen } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [starsCount, setStarsCount] = useState<number>(3); // starts with 3 starter stars for 1st grade delight!
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isSticksOpen, setIsSticksOpen] = useState<boolean>(false);

  const handleEarnStar = () => {
    setStarsCount((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-50 via-indigo-50/40 to-amber-50/50 text-slate-800">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        starsCount={starsCount}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        onOpenSticks={() => setIsSticksOpen(true)}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {activeTab === 'home' && (
          <HomeSection
            setActiveTab={setActiveTab}
            starsCount={starsCount}
            onOpenSticks={() => setIsSticksOpen(true)}
          />
        )}

        {activeTab === 'objectives' && (
          <ObjectivesSection setActiveTab={setActiveTab} />
        )}

        {activeTab === 'explain' && <ExplainSection />}

        {activeTab === 'table' && (
          <AdditionTableSection onEarnStar={handleEarnStar} />
        )}

        {activeTab === 'games' && (
          <GamesSection onEarnStar={handleEarnStar} />
        )}

        {activeTab === 'case' && (
          <CaseStudySection onEarnStar={handleEarnStar} />
        )}

        {activeTab === 'differentiated' && (
          <DifferentiatedSection
            onEarnStar={handleEarnStar}
            onOpenSticks={() => setIsSticksOpen(true)}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizSection onEarnStar={handleEarnStar} />
        )}

        {activeTab === 'feedback' && (
          <FeedbackSection onEarnStar={handleEarnStar} />
        )}

        {activeTab === 'teacher' && <TeacherSection />}
      </main>

      {/* Counting Sticks (Санау таяқшалары) Modal */}
      <CountingSticksModal
        isOpen={isSticksOpen}
        onClose={() => setIsSticksOpen(false)}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-sky-100 bg-white/80 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-heading font-black text-sky-700">МАТЕМАТИКА ӘЛЕМІ</span>
            <span>·</span>
            <span>1-сынып ашық сабағына арналған интерактивті кешен</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('teacher');
              }}
              className="hover:text-sky-600 transition-colors cursor-pointer"
            >
              Мұғалім бөлімі
            </button>
            <span>·</span>
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('objectives');
              }}
              className="hover:text-sky-600 transition-colors cursor-pointer"
            >
              Оқу мақсаттары
            </button>
            <span>·</span>
            <button
              onClick={() => setIsSticksOpen(true)}
              className="hover:text-emerald-600 transition-colors cursor-pointer"
            >
              Санау таяқшалары
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
