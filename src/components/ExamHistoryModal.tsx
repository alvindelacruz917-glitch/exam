import React from 'react';
import { ExamAttempt } from '../types/exam';
import { clearAllHistory } from '../utils/storage';
import { History, X, Trash2, Award, Clock, ArrowRight } from 'lucide-react';

interface ExamHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: ExamAttempt[];
  onSelectAttempt: (attempt: ExamAttempt) => void;
  onHistoryCleared: () => void;
}

export const ExamHistoryModal: React.FC<ExamHistoryModalProps> = ({
  isOpen,
  onClose,
  history,
  onSelectAttempt,
  onHistoryCleared,
}) => {
  if (!isOpen) return null;

  const handleClear = () => {
    if (window.confirm('Are you sure you want to delete all examination history records? This cannot be undone.')) {
      clearAllHistory();
      onHistoryCleared();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[85vh] flex flex-col justify-between">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-600">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
                Examination Attempt History
              </h3>
              <p className="text-xs text-slate-500">
                Past submissions and scores preserved in persistent browser storage
              </p>
            </div>
          </div>

          {/* List */}
          {history.length === 0 ? (
            <div className="p-8 text-center text-slate-400">
              <Award className="w-10 h-10 mx-auto mb-2 opacity-40" />
              <p className="text-sm font-semibold">No past exam attempts recorded yet.</p>
              <p className="text-xs mt-1">Complete a 120-question mock exam to see your history here.</p>
            </div>
          ) : (
            <div className="space-y-3 overflow-y-auto max-h-[460px] pr-1">
              {history.map((attempt, idx) => {
                const date = new Date(attempt.timestamp);
                const minutes = Math.floor(attempt.durationSeconds / 60);
                const seconds = attempt.durationSeconds % 60;

                return (
                  <div
                    key={attempt.id || idx}
                    className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 hover:border-blue-300 dark:hover:border-slate-700 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-black text-slate-900 dark:text-slate-100 font-mono">
                          {attempt.score}/120
                        </span>
                        <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                          attempt.percentage >= 60 
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' 
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                        }`}>
                          {attempt.percentage.toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                        <span>{date.toLocaleDateString()} at {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {minutes}m {seconds}s
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        onSelectAttempt(attempt);
                        onClose();
                      }}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-xs transition-colors shrink-0"
                    >
                      <span>Review Attempt</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {history.length > 0 && (
          <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              Total Recorded Attempts: {history.length}
            </span>
            <button
              onClick={handleClear}
              className="flex items-center gap-1 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
