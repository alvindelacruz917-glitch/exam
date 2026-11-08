import React from 'react';
import { QUESTIONS, SECTIONS } from '../data/questions';
import { DiagramRenderer } from './DiagramRenderer';
import { Printer, X, Download } from 'lucide-react';

interface PrintReviewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrintReviewerModal: React.FC<PrintReviewerModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/80 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-4xl w-full p-4 sm:p-8 shadow-2xl relative max-h-[92vh] flex flex-col justify-between">
        {/* Header toolbar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-4 print:hidden">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
              Printable Reviewer Document
            </h3>
            <p className="text-xs text-slate-500">
              All 120 Questions, Official Answers, and Detailed Explanations
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-xs transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Document Content */}
        <div className="overflow-y-auto max-h-[72vh] pr-3 space-y-6 print:overflow-visible print:max-h-none text-slate-900 dark:text-slate-100">
          <div className="text-center pb-6 border-b border-slate-200">
            <div className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-1">
              DOST-SEI S&T Undergraduate Scholarships
            </div>
            <h1 className="text-2xl font-black">
              Project REACH Official Mock Examination Reviewer
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              120 Questions Comprehensive Diagnostic Guide with Answer Keys & Scientific Solutions
            </p>
          </div>

          {SECTIONS.map((sec) => {
            const secQuestions = QUESTIONS.filter((q) => q.section === sec.name);

            return (
              <div key={sec.name} className="space-y-6 pt-4">
                <div className="py-2 px-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-sm font-extrabold flex items-center justify-between">
                  <span>{sec.name}</span>
                  <span className="text-xs font-normal text-slate-500">{secQuestions.length} Questions</span>
                </div>

                <div className="space-y-5">
                  {secQuestions.map((q) => (
                    <div
                      key={q.questionNumber}
                      className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs sm:text-sm page-break-inside-avoid"
                    >
                      <div className="font-bold text-slate-900 dark:text-slate-100 mb-2">
                        {q.questionNumber}. {q.questionText}
                      </div>

                      {q.passage && (
                        <div className="my-2 p-3 rounded-lg bg-blue-50/70 dark:bg-blue-950/30 text-xs italic">
                          “{q.passage}”
                        </div>
                      )}

                      {q.diagramId && (
                        <div className="my-3 max-w-sm">
                          <DiagramRenderer diagramId={q.diagramId} />
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-2 text-xs">
                        <div className={q.correctAnswer === 'A' ? 'font-bold text-emerald-600' : 'text-slate-600'}>
                          A. {q.choices.A}
                        </div>
                        <div className={q.correctAnswer === 'B' ? 'font-bold text-emerald-600' : 'text-slate-600'}>
                          B. {q.choices.B}
                        </div>
                        <div className={q.correctAnswer === 'C' ? 'font-bold text-emerald-600' : 'text-slate-600'}>
                          C. {q.choices.C}
                        </div>
                        <div className={q.correctAnswer === 'D' ? 'font-bold text-emerald-600' : 'text-slate-600'}>
                          D. {q.choices.D}
                        </div>
                      </div>

                      <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                        <span className="font-bold text-emerald-600 mr-2">
                          [Correct Answer: {q.correctAnswer}]
                        </span>
                        <span>{q.explanation}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center print:hidden">
          <span className="text-xs text-slate-400">Total: 120 Questions Loaded</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
