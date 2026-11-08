import React from 'react';
import { CheckCircle2, AlertTriangle, Flag, X, Send } from 'lucide-react';

interface SubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  answeredCount: number;
  totalQuestions: number;
  flaggedCount: number;
  timeRemaining: number;
}

export const SubmitModal: React.FC<SubmitModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  answeredCount,
  totalQuestions,
  flaggedCount,
  timeRemaining,
}) => {
  if (!isOpen) return null;

  const unansweredCount = totalQuestions - answeredCount;
  const minutesLeft = Math.floor(timeRemaining / 60);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400 mx-auto mb-3">
            <Send className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
            Submit Mock Examination?
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Review your exam progress before finalizing your submission.
          </p>
        </div>

        {/* Status Metrics Box */}
        <div className="grid grid-cols-3 gap-2.5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 mb-6 text-center">
          <div>
            <div className="flex items-center justify-center gap-1 text-xs text-blue-600 dark:text-blue-400 font-semibold mb-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Answered</span>
            </div>
            <div className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
              {answeredCount}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-center gap-1 text-xs text-amber-600 dark:text-amber-400 font-semibold mb-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Unanswered</span>
            </div>
            <div className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
              {unansweredCount}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-center gap-1 text-xs text-purple-600 dark:text-purple-400 font-semibold mb-1">
              <Flag className="w-3.5 h-3.5" />
              <span>Flagged</span>
            </div>
            <div className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
              {flaggedCount}
            </div>
          </div>
        </div>

        {/* Warning if unanswered */}
        {unansweredCount > 0 ? (
          <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-800 dark:text-amber-300 mb-6 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
            <div>
              <strong>Notice:</strong> You still have <strong>{unansweredCount} unanswered questions</strong> and {minutesLeft} minutes remaining. There is no negative marking in the DOST qualifying exam—answering every question improves your probability of qualifying.
            </div>
          </div>
        ) : (
          <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-xs text-emerald-800 dark:text-emerald-300 mb-6 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Excellent! You have answered all 120 questions.</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 text-sm font-semibold transition-colors"
          >
            Return to Exam
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Confirm & Finish
          </button>
        </div>
      </div>
    </div>
  );
};
