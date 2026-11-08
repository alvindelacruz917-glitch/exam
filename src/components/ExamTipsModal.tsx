import React from 'react';
import { Lightbulb, CheckCircle2, Clock, Target, Zap, X } from 'lucide-react';

interface ExamTipsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExamTipsModal: React.FC<ExamTipsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[88vh] flex flex-col justify-between">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-amber-500 shadow-sm">
              <Lightbulb className="w-6 h-6 fill-amber-500" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 dark:text-slate-100">
                DOST-SEI Qualifier Test-Taking Strategies
              </h3>
              <p className="text-xs text-slate-500">
                Proven techniques to maximize your qualifying score on exam day
              </p>
            </div>
          </div>

          {/* Tips List */}
          <div className="space-y-4 overflow-y-auto max-h-[480px] pr-2 text-xs sm:text-sm">
            {/* Strategy 1 */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40">
              <div className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-300 text-sm mb-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>1. Zero-Blank Policy (Never Leave an Item Blank)</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs">
                There is <strong>no negative marking or penalty</strong> for wrong answers in the DOST-SEI Scholarship Qualifying Examination. If you are uncertain about a solution, eliminate two improbable options and make your best educated guess among the remaining choices. Every blank answer forfeits a guaranteed 25% probability of earning a point.
              </p>
            </div>

            {/* Strategy 2 */}
            <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/40">
              <div className="flex items-center gap-2 font-bold text-blue-800 dark:text-blue-300 text-sm mb-1">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>2. Time Budgeting: 60 Seconds Average Pacing</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs">
                You have 120 minutes for 120 questions. Answer <strong>Language Skills</strong> and <strong>Aptitude</strong> swiftly (30–45 seconds per item) to bank surplus time (1.5 to 2 minutes per item) for multi-step computational problems in <strong>Mathematics</strong> and <strong>Physics</strong>.
              </p>
            </div>

            {/* Strategy 3 */}
            <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/40">
              <div className="flex items-center gap-2 font-bold text-purple-800 dark:text-purple-300 text-sm mb-1">
                <Target className="w-4 h-4 text-purple-600" />
                <span>3. Process of Elimination & Dimensional Unit Checking</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs">
                In Physics and Chemistry (such as P = VI, F = ma, pH = -log[H+]), examine the dimensional units and signs of the answer choices first. Often, two choices possess incorrect units or impossible signs (positive vs. negative) and can be eliminated immediately before solving.
              </p>
            </div>

            {/* Strategy 4 */}
            <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40">
              <div className="flex items-center gap-2 font-bold text-amber-800 dark:text-amber-300 text-sm mb-1">
                <Zap className="w-4 h-4 text-amber-600" />
                <span>4. Avoid Bottlenecks: Flag & Move Forward</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs">
                If you have spent more than 90 seconds without a clear path forward, mark the question with the <kbd className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px]">Flag</kbd> button and proceed to the next item immediately. Return to flagged questions once all straightforward items are secured.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer"
          >
            Got it, Let's Review!
          </button>
        </div>
      </div>
    </div>
  );
};
