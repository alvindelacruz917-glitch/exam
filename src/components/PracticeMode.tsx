import React, { useState, useEffect } from 'react';
import { SectionName, AnswerKey } from '../types/exam';
import { QUESTIONS, SECTIONS } from '../data/questions';
import { QuestionCard } from './QuestionCard';
import { getPracticeState, savePracticeState, clearPracticeState } from '../utils/storage';
import { BookOpen, RotateCcw, CheckCircle2, Award, Zap } from 'lucide-react';

interface PracticeModeProps {
  initialSection?: SectionName;
  onExitToExam: () => void;
}

export const PracticeMode: React.FC<PracticeModeProps> = ({
  initialSection,
  onExitToExam,
}) => {
  const [selectedSection, setSelectedSection] = useState<SectionName | 'ALL'>(initialSection || 'ALL');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [practiceAnswers, setPracticeAnswers] = useState<Record<number, AnswerKey>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});

  // Load saved practice progress
  useEffect(() => {
    const saved = getPracticeState();
    if (saved) {
      setPracticeAnswers(saved.selectedAnswers || {});
      setRevealed(saved.revealedExplanations || {});
      if (!initialSection && saved.sectionFilter) {
        setSelectedSection(saved.sectionFilter);
      }
      if (saved.currentQuestionIndex >= 0) {
        setCurrentIndex(saved.currentQuestionIndex);
      }
    }
  }, [initialSection]);

  // Filtered practice questions
  const practiceQuestions = QUESTIONS.filter((q) => {
    if (selectedSection === 'ALL') return true;
    return q.section === selectedSection;
  });

  const activeQuestion = practiceQuestions[currentIndex] || practiceQuestions[0];

  // Save changes
  const updatePracticeState = (
    newAnswers: Record<number, AnswerKey>,
    newRevealed: Record<number, boolean>,
    newIndex: number
  ) => {
    setPracticeAnswers(newAnswers);
    setRevealed(newRevealed);
    savePracticeState({
      currentQuestionIndex: newIndex,
      selectedAnswers: newAnswers,
      revealedExplanations: newRevealed,
      sectionFilter: selectedSection,
    });
  };

  const handleSelectAnswer = (choice: AnswerKey) => {
    const qNum = activeQuestion.questionNumber;
    const newAnswers = { ...practiceAnswers, [qNum]: choice };
    const newRevealed = { ...revealed, [qNum]: true };
    updatePracticeState(newAnswers, newRevealed, currentIndex);
  };

  const handleClearAnswer = () => {
    const qNum = activeQuestion.questionNumber;
    const newAnswers = { ...practiceAnswers };
    delete newAnswers[qNum];
    const newRevealed = { ...revealed };
    delete newRevealed[qNum];
    updatePracticeState(newAnswers, newRevealed, currentIndex);
  };

  const handleResetSection = () => {
    if (window.confirm('Reset your practice answers for this section?')) {
      const qNums = practiceQuestions.map((q) => q.questionNumber);
      const newAnswers = { ...practiceAnswers };
      const newRevealed = { ...revealed };
      qNums.forEach((n) => {
        delete newAnswers[n];
        delete newRevealed[n];
      });
      setCurrentIndex(0);
      updatePracticeState(newAnswers, newRevealed, 0);
    }
  };

  // Stats for current section
  const sectionAttempted = practiceQuestions.filter((q) => !!practiceAnswers[q.questionNumber]).length;
  const sectionCorrect = practiceQuestions.filter(
    (q) => practiceAnswers[q.questionNumber] === q.correctAnswer
  ).length;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" />
              Untimed Learning & Immediate Feedback
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100">
            Practice Mode
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleResetSection}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-50 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Progress</span>
          </button>
          <button
            onClick={onExitToExam}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <span>Take Timed Exam</span>
          </button>
        </div>
      </div>

      {/* Section Tabs */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-2.5 shadow-xs mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <button
            onClick={() => {
              setSelectedSection('ALL');
              setCurrentIndex(0);
            }}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              selectedSection === 'ALL'
                ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            All Questions (120)
          </button>

          {SECTIONS.map((sec) => (
            <button
              key={sec.name}
              onClick={() => {
                setSelectedSection(sec.name);
                setCurrentIndex(0);
              }}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                selectedSection === sec.name
                  ? 'bg-cyan-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {sec.shortName} ({sec.totalQuestions})
            </button>
          ))}
        </div>

        {/* Practice Stats Indicator */}
        <div className="flex items-center gap-3 text-xs font-semibold text-slate-500 px-3">
          <span>
            Progress: <strong className="text-slate-900 dark:text-slate-100">{sectionAttempted}</strong>/{practiceQuestions.length}
          </span>
          {sectionAttempted > 0 && (
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">
              Accuracy: {Math.round((sectionCorrect / sectionAttempted) * 100)}%
            </span>
          )}
        </div>
      </div>

      {/* Main Question Card with Immediate Solution */}
      {activeQuestion && (
        <QuestionCard
          question={activeQuestion}
          selectedAnswer={practiceAnswers[activeQuestion.questionNumber]}
          isFlagged={false}
          onSelectAnswer={handleSelectAnswer}
          onClearAnswer={handleClearAnswer}
          onToggleFlag={() => {}}
          onPrevious={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
          onNext={() => setCurrentIndex((prev) => Math.min(practiceQuestions.length - 1, prev + 1))}
          onOpenSubmitModal={() => {}}
          isFirstQuestion={currentIndex === 0}
          isLastQuestion={currentIndex === practiceQuestions.length - 1}
          isPracticeMode={true}
          isExplanationRevealed={!!revealed[activeQuestion.questionNumber]}
        />
      )}

      {/* Bottom Quick Picker Strip */}
      <div className="mt-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
          Jump to Item ({sectionAttempted}/{practiceQuestions.length} completed)
        </div>
        <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
          {practiceQuestions.map((q, idx) => {
            const isAnswered = !!practiceAnswers[q.questionNumber];
            const isCorrect = isAnswered && practiceAnswers[q.questionNumber] === q.correctAnswer;
            const isCurrent = idx === currentIndex;

            let badge = 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300';
            if (isAnswered) {
              badge = isCorrect
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold'
                : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 font-bold';
            }
            if (isCurrent) {
              badge += ' ring-2 ring-cyan-500 font-extrabold';
            }

            return (
              <button
                key={q.questionNumber}
                onClick={() => setCurrentIndex(idx)}
                className={`w-8 h-8 rounded-lg text-xs flex items-center justify-center transition-all ${badge}`}
              >
                {q.questionNumber}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
