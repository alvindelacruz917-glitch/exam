import React, { useEffect } from 'react';
import { Question, AnswerKey } from '../types/exam';
import { SECTIONS } from '../data/questions';
import { DiagramRenderer } from './DiagramRenderer';
import { 
  Flag, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  Check, 
  BookOpen, 
  Send
} from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  selectedAnswer?: AnswerKey;
  isFlagged: boolean;
  onSelectAnswer: (choice: AnswerKey) => void;
  onClearAnswer: () => void;
  onToggleFlag: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onOpenSubmitModal: () => void;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
  onToggleScratchpad?: () => void;
  questionTimeSeconds?: number;
  // In practice mode:
  isPracticeMode?: boolean;
  isExplanationRevealed?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedAnswer,
  isFlagged,
  onSelectAnswer,
  onClearAnswer,
  onToggleFlag,
  onPrevious,
  onNext,
  onOpenSubmitModal,
  isFirstQuestion,
  isLastQuestion,
  onToggleScratchpad,
  questionTimeSeconds = 0,
  isPracticeMode = false,
  isExplanationRevealed = false,
}) => {
  const sectionInfo = SECTIONS.find((s) => s.name === question.section);

  // Keyboard shortcut listener for A, B, C, D, Arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      const key = e.key.toUpperCase();
      if (['A', 'B', 'C', 'D'].includes(key)) {
        onSelectAnswer(key as AnswerKey);
      } else if (e.key === 'ArrowLeft' && !isFirstQuestion) {
        onPrevious();
      } else if (e.key === 'ArrowRight' && !isLastQuestion) {
        onNext();
      } else if (e.key === 'f' || e.key === 'F') {
        onToggleFlag();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [question.id, isFirstQuestion, isLastQuestion, onSelectAnswer, onPrevious, onNext, onToggleFlag]);

  const choicesList: AnswerKey[] = ['A', 'B', 'C', 'D'];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden flex flex-col justify-between min-h-[580px]">
      {/* Top Question Header Bar */}
      <div className="p-4 sm:p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 font-mono">
            Question {question.questionNumber}
          </span>
          <span className="text-xs font-semibold text-slate-400">
            of 120
          </span>
          {sectionInfo && (
            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-full border ${sectionInfo.badgeBg} ${sectionInfo.badgeText}`}
            >
              {sectionInfo.name}
            </span>
          )}
        </div>

        {/* Flag, Scratchpad, Pacing and Clear Controls */}
        <div className="flex items-center gap-2">
          {/* Pacing Timer */}
          {!isPracticeMode && questionTimeSeconds > 0 && (
            <span
              className={`text-[11px] font-mono font-semibold px-2 py-1 rounded-md border ${
                questionTimeSeconds > 90
                  ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300 animate-pulse'
                  : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700'
              }`}
              title={questionTimeSeconds > 90 ? 'Pacing Alert: Spending > 90s on this question' : 'Time spent on this question'}
            >
              ⏱ {Math.floor(questionTimeSeconds / 60)}:{(questionTimeSeconds % 60).toString().padStart(2, '0')}
            </span>
          )}

          {/* Scratchpad Button */}
          {onToggleScratchpad && (
            <button
              onClick={onToggleScratchpad}
              title="Open Computation Scratchpad"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 transition-colors shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5 hidden" />
              <span>✏️ Scratchpad</span>
            </button>
          )}

          {selectedAnswer && !isPracticeMode && (
            <button
              onClick={onClearAnswer}
              title="Clear chosen answer"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Clear</span>
            </button>
          )}

          {!isPracticeMode && (
            <button
              onClick={onToggleFlag}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                isFlagged
                  ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-700 shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300'
              }`}
            >
              <Flag className={`w-3.5 h-3.5 ${isFlagged ? 'fill-amber-500 text-amber-500' : ''}`} />
              <span>{isFlagged ? 'Flagged for Review' : 'Flag for Review'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Question Body Area */}
      <div className="p-4 sm:p-8 flex-1">
        {/* Reading Passage if present (Passage A / Passage C) */}
        {question.passage && (
          <div className="mb-6 p-4 sm:p-5 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-900 dark:text-blue-300 uppercase tracking-wider mb-2">
              <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>{question.passageTitle || 'Reading Passage'}</span>
            </div>
            <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed italic font-serif">
              “{question.passage}”
            </p>
          </div>
        )}

        {/* Question Text */}
        <div className="text-base sm:text-lg font-medium text-slate-900 dark:text-slate-100 leading-relaxed mb-6 whitespace-pre-line">
          {question.questionText}
        </div>

        {/* Embedded Diagram if applicable */}
        {question.diagramId && (
          <DiagramRenderer diagramId={question.diagramId} />
        )}

        {/* 4 Answer Choices */}
        <div className="space-y-3 mt-6">
          {choicesList.map((choiceKey) => {
            const choiceText = question.choices[choiceKey];
            const isSelected = selectedAnswer === choiceKey;
            
            // In practice mode feedback:
            const isCorrect = choiceKey === question.correctAnswer;
            const showPracticeCorrect = isPracticeMode && isExplanationRevealed && isCorrect;
            const showPracticeWrong = isPracticeMode && isExplanationRevealed && isSelected && !isCorrect;

            let borderAndBg = 'border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800/60 hover:border-blue-300 dark:hover:border-slate-600';
            let badgeStyle = 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700';

            if (isSelected) {
              borderAndBg = 'border-blue-600 dark:border-blue-500 bg-blue-50/80 dark:bg-blue-950/40 shadow-xs ring-1 ring-blue-600/30';
              badgeStyle = 'bg-blue-600 text-white border-blue-600 font-bold';
            }

            if (showPracticeCorrect) {
              borderAndBg = 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100 ring-1 ring-emerald-600';
              badgeStyle = 'bg-emerald-600 text-white border-emerald-600';
            } else if (showPracticeWrong) {
              borderAndBg = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-950 dark:text-rose-100 ring-1 ring-rose-500';
              badgeStyle = 'bg-rose-600 text-white border-rose-600';
            }

            return (
              <button
                key={choiceKey}
                onClick={() => onSelectAnswer(choiceKey)}
                className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all flex items-start gap-3.5 group cursor-pointer ${borderAndBg}`}
              >
                {/* Letter Badge (A, B, C, D) */}
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 border transition-all ${badgeStyle}`}
                >
                  {choiceKey}
                </div>

                {/* Choice Text */}
                <div className="flex-1 pt-0.5 text-sm sm:text-base font-normal text-slate-800 dark:text-slate-200 leading-snug">
                  {choiceText}
                </div>

                {/* Checkmark or Selection Indicator */}
                <div className="shrink-0 pt-1">
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                  {showPracticeCorrect && !isSelected && (
                    <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Practice Mode Instant Explanation Box */}
        {isPracticeMode && isExplanationRevealed && (
          <div className="mt-6 p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 animate-fadeIn">
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-xs font-extrabold uppercase px-2 py-0.5 rounded ${
                selectedAnswer === question.correctAnswer
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
              }`}>
                {selectedAnswer === question.correctAnswer ? '✓ Correct Answer' : '✕ Incorrect Answer'}
              </span>
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                Official Answer: Option {question.correctAnswer}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans mt-2">
              <strong className="text-slate-900 dark:text-slate-100 font-semibold">Explanation: </strong>
              {question.explanation}
            </p>
          </div>
        )}
      </div>

      {/* Navigation Footer Controls */}
      <div className="p-4 sm:p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between gap-3">
        {/* Previous Button */}
        <button
          onClick={onPrevious}
          disabled={isFirstQuestion}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        {/* Center shortcuts note */}
        <div className="hidden md:block text-[11px] text-slate-400">
          Keys: <kbd className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px]">A</kbd>-<kbd className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px]">D</kbd> select • <kbd className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px]">←</kbd> <kbd className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px]">→</kbd> navigate • <kbd className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px]">F</kbd> flag
        </div>

        {/* Next or Finish Button */}
        {isLastQuestion ? (
          <button
            onClick={onOpenSubmitModal}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Review & Submit Exam</span>
            <Send className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={onNext}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-xs transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Next Question</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
