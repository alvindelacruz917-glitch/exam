import React, { useState, useMemo, useEffect } from 'react';
import { AnswerKey, SectionName, ExamAttempt } from '../types/exam';
import { QUESTIONS, SECTIONS } from '../data/questions';
import { DiagramRenderer } from './DiagramRenderer';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Check, 
  X, 
  RotateCcw, 
  ArrowUp, 
  BookOpen,
  Filter,
  Layers,
  ChevronDown,
  Sparkles
} from 'lucide-react';

interface QuestionReviewProps {
  attempt?: ExamAttempt | null;
  initialFilter?: 'ALL' | 'WRONG' | 'CORRECT' | 'UNANSWERED';
  onRetakeExam: () => void;
  onBackToResults?: () => void;
}

export const QuestionReview: React.FC<QuestionReviewProps> = ({
  attempt,
  initialFilter = 'ALL',
  onRetakeExam,
  onBackToResults,
}) => {
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'WRONG' | 'CORRECT' | 'UNANSWERED'>(initialFilter);
  const [sectionFilter, setSectionFilter] = useState<SectionName | 'ALL'>('ALL');
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [showJumpGrid, setShowJumpGrid] = useState<boolean>(false);

  const userAnswers: Record<number, AnswerKey> = attempt?.answers || {};

  // Compute status for all questions
  const questionsWithStatus = useMemo(() => {
    return QUESTIONS.map((q, idx) => {
      const userAnswer = userAnswers[q.questionNumber];
      const isAnswered = !!userAnswer;
      const isCorrect = isAnswered && userAnswer === q.correctAnswer;
      const isWrong = isAnswered && userAnswer !== q.correctAnswer;
      const isUnanswered = !isAnswered;

      return {
        ...q,
        index: idx,
        userAnswer,
        isAnswered,
        isCorrect,
        isWrong,
        isUnanswered,
      };
    });
  }, [userAnswers]);

  // Counts
  const counts = useMemo(() => {
    let correct = 0;
    let wrong = 0;
    let unanswered = 0;
    questionsWithStatus.forEach((q) => {
      if (q.isCorrect) correct++;
      else if (q.isWrong) wrong++;
      else unanswered++;
    });
    return { all: 120, correct, wrong, unanswered };
  }, [questionsWithStatus]);

  // Filtered list for the continuous vertical scroll
  const filteredQuestions = useMemo(() => {
    return questionsWithStatus.filter((q) => {
      if (statusFilter === 'WRONG' && !q.isWrong) return false;
      if (statusFilter === 'CORRECT' && !q.isCorrect) return false;
      if (statusFilter === 'UNANSWERED' && !q.isUnanswered) return false;
      if (sectionFilter !== 'ALL' && q.section !== sectionFilter) return false;
      return true;
    });
  }, [questionsWithStatus, statusFilter, sectionFilter]);

  // Detect scroll position for Back to Top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToQuestion = (qNum: number) => {
    const el = document.getElementById(`review-q-${qNum}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setShowJumpGrid(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {/* Top Header Summary */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              DOST Comprehensive Answer Review & Solutions
            </span>
            {attempt && (
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                Score: {attempt.score}/120 ({attempt.percentage.toFixed(1)}%)
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100">
            Scrollable Solution Review
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Scroll down to examine all questions, your answers, official answer keys, and step-by-step solutions from the official DOST reviewer.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {onBackToResults && (
            <button
              onClick={onBackToResults}
              className="px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Results Summary
            </button>
          )}

          <button
            onClick={onRetakeExam}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Exam</span>
          </button>
        </div>
      </div>

      {/* Sticky Filter & Jump Bar */}
      <div className="sticky top-16 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 sm:p-4 shadow-md mb-8 transition-all">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Status Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setStatusFilter('ALL')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                statusFilter === 'ALL'
                  ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              All ({counts.all})
            </button>

            <button
              onClick={() => setStatusFilter('WRONG')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                statusFilter === 'WRONG'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900 hover:bg-rose-100'
              }`}
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>Wrong Answers ({counts.wrong})</span>
            </button>

            <button
              onClick={() => setStatusFilter('CORRECT')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                statusFilter === 'CORRECT'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900 hover:bg-emerald-100'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Correct ({counts.correct})</span>
            </button>

            <button
              onClick={() => setStatusFilter('UNANSWERED')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                statusFilter === 'UNANSWERED'
                  ? 'bg-slate-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Not Answered ({counts.unanswered})</span>
            </button>
          </div>

          {/* Quick Jump Dropdown Toggle */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowJumpGrid((prev) => !prev)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 transition-colors text-slate-700 dark:text-slate-200 cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              <span>Jump to Question ({filteredQuestions.length})</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showJumpGrid ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {/* Section Jump Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
          <span className="text-slate-400 font-semibold mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Section:
          </span>
          <button
            onClick={() => setSectionFilter('ALL')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
              sectionFilter === 'ALL'
                ? 'bg-blue-600 text-white'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            All 4 Sections
          </button>
          {SECTIONS.map((sec) => (
            <button
              key={sec.name}
              onClick={() => setSectionFilter(sec.name)}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                sectionFilter === sec.name
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {sec.name} (Q{sec.startQ}–Q{sec.endQ})
            </button>
          ))}
        </div>

        {/* Expandable Quick Jump Grid */}
        {showJumpGrid && (
          <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 max-h-52 overflow-y-auto animate-fadeIn">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Click any question number to scroll directly to it:
            </div>
            <div className="grid grid-cols-8 sm:grid-cols-12 md:grid-cols-16 gap-1">
              {filteredQuestions.map((q) => {
                let badgeClass = 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300';
                if (q.isCorrect) badgeClass = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold';
                else if (q.isWrong) badgeClass = 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 font-bold';

                return (
                  <button
                    key={q.questionNumber}
                    onClick={() => scrollToQuestion(q.questionNumber)}
                    className={`h-7 rounded-md text-[11px] flex items-center justify-center transition-transform hover:scale-105 cursor-pointer ${badgeClass}`}
                    title={`Question ${q.questionNumber}: ${q.isCorrect ? 'Correct' : q.isWrong ? 'Wrong' : 'Unanswered'}`}
                  >
                    {q.questionNumber}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* CONTINUOUS SCROLLABLE QUESTIONS LIST */}
      {filteredQuestions.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xs">
          <p className="text-slate-500 font-medium">No questions match the selected filter combination.</p>
          <button
            onClick={() => {
              setStatusFilter('ALL');
              setSectionFilter('ALL');
            }}
            className="mt-3 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {filteredQuestions.map((q, idx) => (
            <ScrollReviewItemCard 
              key={q.questionNumber} 
              question={q} 
              itemIndex={idx}
              totalFiltered={filteredQuestions.length}
            />
          ))}
        </div>
      )}

      {/* Bottom Completion Action */}
      <div className="mt-12 p-6 rounded-3xl bg-gradient-to-r from-blue-900 to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg text-center sm:text-left">
        <div>
          <h3 className="text-lg font-bold">Finished reviewing all questions?</h3>
          <p className="text-xs text-blue-200">
            You can retake the mock examination or practice specific sections to reinforce difficult concepts.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={scrollToTop}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors cursor-pointer"
          >
            Back to Top
          </button>
          <button
            onClick={onRetakeExam}
            className="px-5 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-white text-xs font-bold shadow-md transition-colors cursor-pointer"
          >
            Retake Mock Exam
          </button>
        </div>
      </div>

      {/* Floating Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center"
          title="Scroll to Top"
        >
          <ArrowUp className="w-5 h-5 stroke-[2.5]" />
        </button>
      )}
    </div>
  );
};

// Continuous Review Item Card
const ScrollReviewItemCard: React.FC<{
  question: typeof QUESTIONS[0] & {
    userAnswer?: AnswerKey;
    isCorrect?: boolean;
    isWrong?: boolean;
    isUnanswered?: boolean;
  };
  itemIndex: number;
  totalFiltered: number;
}> = ({ question, itemIndex, totalFiltered }) => {
  const choicesList: AnswerKey[] = ['A', 'B', 'C', 'D'];
  const sectionInfo = SECTIONS.find((s) => s.name === question.section);

  return (
    <div 
      id={`review-q-${question.questionNumber}`}
      className="scroll-mt-40 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm transition-shadow hover:shadow-md"
    >
      {/* Question Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 font-mono tracking-tight">
            Question {question.questionNumber}
          </span>
          {sectionInfo && (
            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${sectionInfo.badgeBg} ${sectionInfo.badgeText}`}>
              {sectionInfo.name}
            </span>
          )}
        </div>

        {/* Clear Visual Status Pill */}
        <div className="flex items-center gap-2">
          {question.isCorrect && (
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Correct (+1 pt)</span>
            </span>
          )}
          {question.isWrong && (
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-300">
              <XCircle className="w-4 h-4 text-rose-600" />
              <span>Wrong Answer</span>
            </span>
          )}
          {question.isUnanswered && (
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-300">
              <HelpCircle className="w-4 h-4 text-slate-500" />
              <span>Not Answered (0 pt)</span>
            </span>
          )}
          <span className="text-[11px] font-mono font-bold text-slate-400 ml-1">
            #{itemIndex + 1}/{totalFiltered}
          </span>
        </div>
      </div>

      {/* Reading Passage if applicable */}
      {question.passage && (
        <div className="mb-5 p-4 sm:p-5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-900 dark:text-blue-300 uppercase tracking-wider mb-2">
            <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>{question.passageTitle || 'Reading Comprehension Passage'}</span>
          </div>
          <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed italic font-serif">
            “{question.passage}”
          </p>
        </div>
      )}

      {/* Question Text */}
      <div className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100 leading-relaxed mb-5 whitespace-pre-line">
        {question.questionText}
      </div>

      {/* Embedded Vector Diagram if applicable */}
      {question.diagramId && (
        <div className="my-5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 flex justify-center">
          <DiagramRenderer diagramId={question.diagramId} />
        </div>
      )}

      {/* 4 Choices */}
      <div className="space-y-2.5 my-6">
        {choicesList.map((choiceKey) => {
          const choiceText = question.choices[choiceKey];
          const isUserChoice = question.userAnswer === choiceKey;
          const isCorrectAnswer = question.correctAnswer === choiceKey;

          let cardStyle = 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40 text-slate-800 dark:text-slate-200';
          let letterStyle = 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300';

          if (isCorrectAnswer) {
            cardStyle = 'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100 ring-2 ring-emerald-500/30';
            letterStyle = 'bg-emerald-600 text-white border-emerald-600 font-black shadow-xs';
          } else if (isUserChoice && !isCorrectAnswer) {
            cardStyle = 'border-rose-400 bg-rose-50/80 dark:bg-rose-950/40 text-rose-950 dark:text-rose-100 ring-2 ring-rose-400/30';
            letterStyle = 'bg-rose-600 text-white border-rose-600 font-black shadow-xs';
          }

          return (
            <div
              key={choiceKey}
              className={`p-3.5 sm:p-4 rounded-2xl border flex items-start justify-between gap-3 transition-all ${cardStyle}`}
            >
              <div className="flex items-start gap-3 flex-1">
                <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 border ${letterStyle}`}>
                  {choiceKey}
                </span>
                <span className="text-sm sm:text-base font-normal pt-0.5 leading-snug">
                  {choiceText}
                </span>
              </div>

              {/* Status Badges on Right */}
              <div className="flex items-center gap-2 shrink-0 pt-0.5">
                {isCorrectAnswer && (
                  <span className="flex items-center gap-1 text-xs font-bold text-emerald-800 dark:text-emerald-200 bg-emerald-100 dark:bg-emerald-900/60 px-2.5 py-1 rounded-lg border border-emerald-300 dark:border-emerald-700">
                    <Check className="w-3.5 h-3.5 stroke-[3] text-emerald-600" />
                    <span>Correct answer</span>
                  </span>
                )}
                {isUserChoice && !isCorrectAnswer && (
                  <span className="flex items-center gap-1 text-xs font-bold text-rose-800 dark:text-rose-200 bg-rose-100 dark:bg-rose-900/60 px-2.5 py-1 rounded-lg border border-rose-300 dark:border-rose-700">
                    <X className="w-3.5 h-3.5 stroke-[3] text-rose-600" />
                    <span>Your answer</span>
                  </span>
                )}
                {isUserChoice && isCorrectAnswer && (
                  <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300">
                    (You selected this)
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Official Explanation Box directly from PDF */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80">
        <h4 className="text-xs font-black uppercase tracking-wider text-blue-700 dark:text-blue-400 mb-2 flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5" />
          Official Explanation from DOST Reviewer
        </h4>
        <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-sans whitespace-pre-line">
          {question.explanation}
        </p>
      </div>
    </div>
  );
};
