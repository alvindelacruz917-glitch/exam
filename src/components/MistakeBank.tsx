import React, { useState, useEffect } from 'react';
import { AnswerKey, Question } from '../types/exam';
import { QUESTIONS, SECTIONS } from '../data/questions';
import { 
  getMistakeBankQuestions, 
  removeMistakeQuestion, 
  saveMistakeBankQuestions 
} from '../utils/storage';
import { DiagramRenderer } from './DiagramRenderer';
import { 
  Target, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  Check, 
  X, 
  Sparkles, 
  BookOpen, 
  ChevronLeft, 
  ChevronRight,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface MistakeBankProps {
  onTakeMockExam: () => void;
}

export const MistakeBank: React.FC<MistakeBankProps> = ({ onTakeMockExam }) => {
  const [mistakeNumbers, setMistakeNumbers] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, AnswerKey>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [mastered, setMastered] = useState<number[]>([]);

  useEffect(() => {
    const list = getMistakeBankQuestions();
    setMistakeNumbers(list);
  }, []);

  // Filter full question objects
  const mistakeQuestions: Question[] = QUESTIONS.filter((q) =>
    mistakeNumbers.includes(q.questionNumber)
  );

  const activeQuestion = mistakeQuestions[currentIndex] || mistakeQuestions[0];

  const handleSelect = (choice: AnswerKey) => {
    if (!activeQuestion) return;
    const qNum = activeQuestion.questionNumber;
    setSelectedAnswers((prev) => ({ ...prev, [qNum]: choice }));
    setRevealed((prev) => ({ ...prev, [qNum]: true }));

    if (choice === activeQuestion.correctAnswer) {
      // Trigger confetti!
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch (e) {}

      // Add to mastered
      if (!mastered.includes(qNum)) {
        setMastered((prev) => [...prev, qNum]);
      }
    }
  };

  const handleRemoveFromMistakes = (qNum: number) => {
    removeMistakeQuestion(qNum);
    const updated = mistakeNumbers.filter((n) => n !== qNum);
    setMistakeNumbers(updated);
    if (currentIndex >= updated.length) {
      setCurrentIndex(Math.max(0, updated.length - 1));
    }
  };

  const handleResetAll = () => {
    if (window.confirm('Clear all items from your Mistake Bank?')) {
      saveMistakeBankQuestions([]);
      setMistakeNumbers([]);
      setCurrentIndex(0);
    }
  };

  const choicesList: AnswerKey[] = ['A', 'B', 'C', 'D'];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
              <Target className="w-4 h-4" />
              Targeted Weakness Mastery
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100">
            Mistake Review Bank
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Drill and conquer the questions you previously answered wrong in your mock exams.
          </p>
        </div>

        {mistakeNumbers.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleResetAll}
              className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-50 transition-colors"
            >
              Clear Bank
            </button>
            <button
              onClick={onTakeMockExam}
              className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-xs transition-colors"
            >
              Take Mock Exam
            </button>
          </div>
        )}
      </div>

      {mistakeNumbers.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 mx-auto mb-4">
            <Sparkles className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            Zero Mistakes in Your Bank!
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-6">
            Whenever you submit a 120-question mock exam, all incorrect answers will automatically be saved here so you can review and master them.
          </p>
          <button
            onClick={onTakeMockExam}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-600/20 transition-all"
          >
            Start Mock Examination
          </button>
        </div>
      ) : activeQuestion ? (
        <div>
          {/* Progress Tracker Strip */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Question {currentIndex + 1} of {mistakeQuestions.length}
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                Item #{activeQuestion.questionNumber} ({activeQuestion.section})
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs font-semibold">
              <span className="text-slate-500">
                Mastered: <strong className="text-emerald-600">{mastered.length}</strong> / {mistakeQuestions.length}
              </span>
            </div>
          </div>

          {/* Main Question Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs mb-6">
            {activeQuestion.passage && (
              <div className="mb-6 p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-900 dark:text-blue-300 uppercase tracking-wider mb-1.5">
                  <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>{activeQuestion.passageTitle || 'Reading Passage'}</span>
                </div>
                <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed italic font-serif">
                  “{activeQuestion.passage}”
                </p>
              </div>
            )}

            <div className="text-base sm:text-lg font-medium text-slate-900 dark:text-slate-100 leading-relaxed mb-6 whitespace-pre-line">
              {activeQuestion.questionText}
            </div>

            {activeQuestion.diagramId && (
              <DiagramRenderer diagramId={activeQuestion.diagramId} />
            )}

            {/* Answer Choices */}
            <div className="space-y-3 my-6">
              {choicesList.map((choiceKey) => {
                const choiceText = activeQuestion.choices[choiceKey];
                const isSelected = selectedAnswers[activeQuestion.questionNumber] === choiceKey;
                const isCorrect = choiceKey === activeQuestion.correctAnswer;
                const isRevealed = !!revealed[activeQuestion.questionNumber];

                let cardStyle = 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40 text-slate-800 dark:text-slate-200 hover:border-blue-400';
                let letterStyle = 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300';

                if (isRevealed) {
                  if (isCorrect) {
                    cardStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100 ring-1 ring-emerald-500';
                    letterStyle = 'bg-emerald-600 text-white border-emerald-600 font-bold';
                  } else if (isSelected && !isCorrect) {
                    cardStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-950 dark:text-rose-100 ring-1 ring-rose-500';
                    letterStyle = 'bg-rose-600 text-white border-rose-600 font-bold';
                  }
                }

                return (
                  <button
                    key={choiceKey}
                    onClick={() => handleSelect(choiceKey)}
                    className={`w-full text-left p-4 rounded-xl border flex items-start gap-3.5 transition-all cursor-pointer ${cardStyle}`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 border ${letterStyle}`}>
                      {choiceKey}
                    </div>
                    <div className="flex-1 pt-1 text-sm sm:text-base font-normal leading-snug">
                      {choiceText}
                    </div>
                    {isRevealed && isCorrect && (
                      <div className="shrink-0 pt-1 text-emerald-600 font-bold flex items-center gap-1 text-xs">
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>Correct Answer</span>
                      </div>
                    )}
                    {isRevealed && isSelected && !isCorrect && (
                      <div className="shrink-0 pt-1 text-rose-600 font-bold flex items-center gap-1 text-xs">
                        <X className="w-4 h-4 stroke-[3]" />
                        <span>Incorrect</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Revealed Explanation */}
            {revealed[activeQuestion.questionNumber] && (
              <div className="mt-6 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 animate-fadeIn">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Official DOST Reviewer Solution
                  </span>
                  {selectedAnswers[activeQuestion.questionNumber] === activeQuestion.correctAnswer && (
                    <button
                      onClick={() => handleRemoveFromMistakes(activeQuestion.questionNumber)}
                      className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Remove from Mistake Bank</span>
                    </button>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                  {activeQuestion.explanation}
                </p>
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Question</span>
            </button>

            <span className="text-xs font-mono font-bold text-slate-400">
              {currentIndex + 1} / {mistakeQuestions.length}
            </span>

            <button
              onClick={() => setCurrentIndex((prev) => Math.min(mistakeQuestions.length - 1, prev + 1))}
              disabled={currentIndex >= mistakeQuestions.length - 1}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-xs disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <span>Next Question</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
