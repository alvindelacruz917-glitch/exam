import React, { useState } from 'react';
import { AnswerKey, SectionName } from '../types/exam';
import { QUESTIONS, SECTIONS } from '../data/questions';
import { Flag, Send, ArrowRight } from 'lucide-react';

interface QuestionSidebarProps {
  currentQuestionIndex: number; // 0 to 119
  answers: Record<number, AnswerKey>;
  flags: Record<number, boolean>;
  onSelectQuestion: (index: number) => void;
  onSubmitExam: () => void;
  isPracticeMode?: boolean;
}

export const QuestionSidebar: React.FC<QuestionSidebarProps> = ({
  currentQuestionIndex,
  answers,
  flags,
  onSelectQuestion,
  onSubmitExam,
  isPracticeMode = false,
}) => {
  const [filterSection, setFilterSection] = useState<SectionName | 'ALL'>('ALL');

  const answeredCount = Object.keys(answers).length;
  const flaggedCount = Object.values(flags).filter(Boolean).length;
  const unansweredCount = QUESTIONS.length - answeredCount;

  // Jump to first unanswered question
  const jumpToNextUnanswered = () => {
    // Look from current + 1 onwards
    for (let i = currentQuestionIndex + 1; i < QUESTIONS.length; i++) {
      if (!answers[QUESTIONS[i].questionNumber]) {
        onSelectQuestion(i);
        return;
      }
    }
    // Wrap around
    for (let i = 0; i <= currentQuestionIndex; i++) {
      if (!answers[QUESTIONS[i].questionNumber]) {
        onSelectQuestion(i);
        return;
      }
    }
  };

  const filteredQuestions = QUESTIONS.filter((q) => {
    if (filterSection === 'ALL') return true;
    return q.section === filterSection;
  });

  return (
    <aside className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between h-full">
      <div>
        {/* Title & Stats */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
            Question Map
          </h3>
          <span className="text-xs font-semibold text-slate-500 font-mono">
            {answeredCount} / 120
          </span>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-3 gap-1.5 py-2 px-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl mb-4 text-[11px] font-medium text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-blue-600 shrink-0" />
            <span>Answered</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-slate-200 dark:bg-slate-700 shrink-0" />
            <span>Unanswered</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-amber-400 shrink-0" />
            <span>Flagged</span>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex gap-1 overflow-x-auto pb-1 mb-3 scrollbar-none text-[11px]">
          <button
            onClick={() => setFilterSection('ALL')}
            className={`px-2 py-1 rounded-md font-semibold shrink-0 transition-colors ${
              filterSection === 'ALL'
                ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            All (120)
          </button>
          {SECTIONS.map((sec) => (
            <button
              key={sec.name}
              onClick={() => setFilterSection(sec.name)}
              className={`px-2 py-1 rounded-md font-semibold shrink-0 transition-colors ${
                filterSection === sec.name
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {sec.shortName}
            </button>
          ))}
        </div>

        {/* 120 Questions Grid */}
        <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-6 lg:grid-cols-8 gap-1.5 max-h-[360px] overflow-y-auto pr-1">
          {filteredQuestions.map((q) => {
            const qNum = q.questionNumber;
            const qIdx = qNum - 1;
            const isCurrent = qIdx === currentQuestionIndex;
            const isAnswered = !!answers[qNum];
            const isFlagged = !!flags[qNum];

            let cellClass = 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200';
            if (isAnswered) {
              cellClass = 'bg-blue-600 text-white font-bold hover:bg-blue-700';
            }
            if (isCurrent) {
              cellClass += ' ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-slate-900 z-10 scale-105';
            }

            return (
              <button
                key={qNum}
                onClick={() => onSelectQuestion(qIdx)}
                className={`relative h-9 rounded-lg text-xs font-semibold flex items-center justify-center transition-all ${cellClass}`}
                title={`Question ${qNum} (${q.section}): ${isAnswered ? 'Answered (' + answers[qNum] + ')' : 'Unanswered'}${isFlagged ? ' • Flagged' : ''}`}
              >
                <span>{qNum}</span>
                {isFlagged && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 border border-white dark:border-slate-900" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Summary & Actions */}
      <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
        {unansweredCount > 0 && (
          <button
            onClick={jumpToNextUnanswered}
            className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors"
          >
            <span>Next Unanswered ({unansweredCount})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}

        {!isPracticeMode && (
          <button
            onClick={onSubmitExam}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-600/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            <Send className="w-4 h-4" />
            <span>Finish & Submit Exam</span>
          </button>
        )}
      </div>
    </aside>
  );
};
