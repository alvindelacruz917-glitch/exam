import React from 'react';
import { SECTIONS } from '../data/questions';
import { ActiveExamState, ExamAttempt } from '../types/exam';
import { 
  Play, 
  RotateCcw, 
  BookOpen, 
  Award, 
  Clock, 
  CheckCircle, 
  FileSpreadsheet, 
  History, 
  ShieldCheck, 
  HelpCircle,
  Zap,
  Target,
  Trophy,
  User,
  Lightbulb,
  Printer
} from 'lucide-react';

interface ExamIntroProps {
  onStartExam: () => void;
  onResumeExam: () => void;
  activeExam: ActiveExamState | null;
  lastAttempt: ExamAttempt | null;
  username: string;
  mistakeCount: number;
  onOpenPractice: () => void;
  onOpenReview: () => void;
  onOpenFormulas: () => void;
  onOpenHistory: () => void;
  onOpenLeaderboard: () => void;
  onOpenProfile: () => void;
  onOpenMistakes: () => void;
  onOpenTips: () => void;
  onOpenPrint: () => void;
}

export const ExamIntro: React.FC<ExamIntroProps> = ({
  onStartExam,
  onResumeExam,
  activeExam,
  lastAttempt,
  username,
  mistakeCount,
  onOpenPractice,
  onOpenReview,
  onOpenFormulas,
  onOpenHistory,
  onOpenLeaderboard,
  onOpenProfile,
  onOpenMistakes,
  onOpenTips,
  onOpenPrint,
}) => {
  const answeredCount = activeExam ? Object.keys(activeExam.answers).length : 0;
  const hasActiveDraft = activeExam && activeExam.isStarted && answeredCount > 0;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-blue-900/50 mb-10 relative overflow-hidden">
        {/* Background Decorative Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          {/* Top User Greeting & DOST Badge */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-bold tracking-wide uppercase">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              DOST-SEI S&T Scholarship Mock Exam
            </div>

            {/* Current Examinee Button */}
            <button
              onClick={onOpenProfile}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-blue-400" />
              <span>Examinee: <strong>{username}</strong> (Change)</span>
            </button>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            DOST Project REACH <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300">
              Exact Mock Examination
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mb-8 leading-relaxed">
            Recreated with 100% exact fidelity from the authoritative DOST Project REACH mock examination. 
            Features all 120 official questions, authentic diagrams, answer keys, live leaderboard, digital scratchpad, and comprehensive scientific explanations.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            {hasActiveDraft ? (
              <>
                <button
                  onClick={onResumeExam}
                  className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-base shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <Play className="w-5 h-5 fill-current" />
                  <span>Resume Exam ({answeredCount}/120 answered)</span>
                </button>

                <button
                  onClick={onStartExam}
                  className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Start Fresh Exam</span>
                </button>
              </>
            ) : (
              <button
                onClick={onStartExam}
                className="flex items-center gap-3 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>Begin 120-Question Mock Exam</span>
              </button>
            )}

            <button
              onClick={onOpenLeaderboard}
              className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold text-sm border border-amber-500/40 transition-all cursor-pointer"
            >
              <Trophy className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>Leaderboard</span>
            </button>

            {mistakeCount > 0 && (
              <button
                onClick={onOpenMistakes}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-bold text-sm border border-rose-500/40 transition-all cursor-pointer"
              >
                <Target className="w-4 h-4 text-rose-400" />
                <span>Mistake Bank ({mistakeCount})</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick Highlights Badge Card */}
        <div className="mt-8 pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-extrabold text-white">120</div>
              <div className="text-xs text-slate-400">Total Questions</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-extrabold text-white">120 Mins</div>
              <div className="text-xs text-slate-400">Standard Duration</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-extrabold text-white">1 pt Each</div>
              <div className="text-xs text-slate-400">No Penalty / Negative Mark</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-extrabold text-white">4 Domains</div>
              <div className="text-xs text-slate-400">DOST Assessment Areas</div>
            </div>
          </div>
        </div>
      </div>

      {/* Last Attempt Banner if available */}
      {lastAttempt && (
        <div className="mb-10 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-600 font-extrabold text-lg font-mono">
              {Math.round(lastAttempt.percentage)}%
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Previous Exam Result: {lastAttempt.score} / {lastAttempt.totalQuestions} Correct
              </h3>
              <p className="text-xs text-slate-500">
                Completed on {new Date(lastAttempt.timestamp).toLocaleDateString()} at{' '}
                {new Date(lastAttempt.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • Time taken:{' '}
                {Math.floor(lastAttempt.durationSeconds / 60)}m {lastAttempt.durationSeconds % 60}s
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={onOpenReview}
              className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors cursor-pointer"
            >
              Review Results
            </button>
            <button
              onClick={onOpenLeaderboard}
              className="px-3 py-2 rounded-lg bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-700 font-semibold text-xs transition-colors cursor-pointer"
            >
              Leaderboard
            </button>
            <button
              onClick={onOpenHistory}
              className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-semibold text-xs transition-colors cursor-pointer"
            >
              History
            </button>
          </div>
        </div>
      )}

      {/* Four Examination Sections Grid */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
              Exam Sections & Structure
            </h2>
            <p className="text-xs text-slate-500">
              Strictly matching the official DOST-SEI qualification examination framework
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {SECTIONS.map((section, idx) => (
            <div
              key={section.name}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs hover:border-blue-400 dark:hover:border-blue-600 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Part {idx + 1}
                  </span>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${section.badgeBg} ${section.badgeText}`}>
                    Q{section.startQ} - Q{section.endQ}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2 leading-snug">
                  {section.name}
                </h3>

                <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                  {idx === 0 && 'Logic, verbal analogies, mechanical pulleys, 3D paper folding, rotation, and pattern matrices.'}
                  {idx === 1 && 'Grammar agreement, idioms, vocabulary in context, reading comprehension passages (Passage A & C), figures of speech.'}
                  {idx === 2 && 'Biology (genetics, homeostasis), Chemistry (pH, molality, VSEPR), Physics (kinematics, power), and Earth Science.'}
                  {idx === 3 && 'Algebra, geometry, trigonometry identities, rational functions, quadratics, complex numbers, word problems.'}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="font-extrabold text-slate-900 dark:text-slate-200 text-sm">
                  {section.totalQuestions} Questions
                </span>
                <span className="text-slate-500">
                  {Math.round((section.totalQuestions / 120) * 100)}% weight
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Study & Exam Power Tools */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <button
          onClick={onOpenTips}
          className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-400 text-left transition-all group shadow-xs cursor-pointer"
        >
          <Lightbulb className="w-6 h-6 text-amber-500 mb-2 group-hover:scale-110 transition-transform" />
          <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Qualifier Strategy Tips</h4>
          <p className="text-xs text-slate-500 mt-1">
            Zero-blank policy, time budgeting (60s/item), and choice elimination hacks.
          </p>
        </button>

        <button
          onClick={onOpenFormulas}
          className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 text-left transition-all group shadow-xs cursor-pointer"
        >
          <FileSpreadsheet className="w-6 h-6 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
          <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Formula & Equations Sheet</h4>
          <p className="text-xs text-slate-500 mt-1">
            Reference key physics kinematics, chemistry gas laws, and trigonometry identities.
          </p>
        </button>

        <button
          onClick={onOpenPrint}
          className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-400 text-left transition-all group shadow-xs cursor-pointer"
        >
          <Printer className="w-6 h-6 text-emerald-600 mb-2 group-hover:scale-110 transition-transform" />
          <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Printable Reviewer</h4>
          <p className="text-xs text-slate-500 mt-1">
            Download or print all 120 questions with answers and solutions for offline study.
          </p>
        </button>

        <button
          onClick={onOpenPractice}
          className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-400 text-left transition-all group shadow-xs cursor-pointer"
        >
          <Zap className="w-6 h-6 text-cyan-600 mb-2 group-hover:scale-110 transition-transform" />
          <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Untimed Practice Mode</h4>
          <p className="text-xs text-slate-500 mt-1">
            Solve questions by domain with instant answer checking and detailed solutions.
          </p>
        </button>
      </div>
    </div>
  );
};
