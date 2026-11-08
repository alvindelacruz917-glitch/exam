import React, { useEffect } from 'react';
import { ExamAttempt, SectionName } from '../types/exam';
import { SECTIONS } from '../data/questions';
import { 
  Award, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  RotateCcw, 
  BookOpen, 
  Check, 
  TrendingUp, 
  BarChart3,
  Sparkles,
  Trophy,
  Target,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ResultsDashboardProps {
  attempt: ExamAttempt;
  onReviewAll: () => void;
  onReviewIncorrect: () => void;
  onRetakeExam: () => void;
  onStartPractice: (section?: SectionName) => void;
  onOpenLeaderboard?: () => void;
  onOpenMistakes?: () => void;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({
  attempt,
  onReviewAll,
  onReviewIncorrect,
  onRetakeExam,
  onStartPractice,
  onOpenLeaderboard,
  onOpenMistakes,
}) => {
  const { score, totalQuestions, percentage, durationSeconds, sectionBreakdown, username } = attempt;

  const minutes = Math.floor(durationSeconds / 60);
  const seconds = durationSeconds % 60;
  const timeTakenStr = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  const wrongCount = Object.values(sectionBreakdown).reduce((acc, s) => acc + s.wrong, 0);
  const unansweredCount = Object.values(sectionBreakdown).reduce((acc, s) => acc + s.unanswered, 0);

  const avgSecondsPerQuestion = Math.round(durationSeconds / 120);

  // Trigger celebration confetti on mount
  useEffect(() => {
    try {
      confetti({
        particleCount: percentage >= 60 ? 80 : 40,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {}
  }, [percentage]);

  // DOST-SEI readiness estimation based on historical cutoffs (~70%+ is strongly competitive for DOST scholarships)
  let statusBadge = {
    title: 'Needs Focused Review',
    color: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300',
    desc: 'Target your weakest sections with the Mistake Bank to boost your scores above the competitive qualifying threshold.',
  };
  if (percentage >= 75) {
    statusBadge = {
      title: 'High Probability DOST Qualifier',
      color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300',
      desc: 'Outstanding performance across general sciences, mathematics, and reasoning. You meet the top tier qualifying benchmarks.',
    };
  } else if (percentage >= 50) {
    statusBadge = {
      title: 'Competitive Candidate',
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border-blue-300',
      desc: 'Solid foundational knowledge. Revisit incorrect items in Mathematics and Sciences to secure a top scholarship percentile.',
    };
  }

  // Find lowest scoring section for recommended practice
  let lowestSection: SectionName = 'Mathematics';
  let lowestPct = 101;
  SECTIONS.forEach((sec) => {
    const s = sectionBreakdown[sec.name];
    if (s && s.percentage < lowestPct) {
      lowestPct = s.percentage;
      lowestSection = sec.name;
    }
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn">
      {/* Top Banner / Heading inspired by Project REACH results */}
      <div className="mb-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 justify-center sm:justify-start">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Official DOST Qualifying Diagnostic Scorecard
            </span>
            {username && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                Examinee: <strong>{username}</strong>
              </span>
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            Your results
          </h1>
        </div>

        <div className="flex items-center gap-2 flex-wrap justify-center">
          {onOpenLeaderboard && (
            <button
              onClick={onOpenLeaderboard}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md shadow-amber-500/20 transition-all cursor-pointer"
            >
              <Trophy className="w-4 h-4 fill-slate-950" />
              <span>Leaderboard Ranking</span>
            </button>
          )}

          <button
            onClick={onReviewAll}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
          >
            Review All Questions
          </button>

          <button
            onClick={onRetakeExam}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Exam</span>
          </button>
        </div>
      </div>

      {/* Main Scorecard Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-slate-100 dark:border-slate-800">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Full Mock Exam
            </span>
            <div className="flex items-baseline gap-4 mt-2">
              <span className="text-5xl sm:text-7xl font-black text-slate-900 dark:text-slate-100 tracking-tight font-mono">
                {percentage.toFixed(1)}%
              </span>
              <span className="text-xl sm:text-2xl font-bold text-slate-400 font-mono">
                {score}/{totalQuestions}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-3 text-xs sm:text-sm text-slate-500">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {score} out of {totalQuestions} correct
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 font-mono">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                Time taken {timeTakenStr}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 font-mono text-blue-600 dark:text-blue-400 font-semibold">
                <Zap className="w-3.5 h-3.5" />
                Avg {avgSecondsPerQuestion}s / question
              </span>
            </div>
          </div>

          {/* Readiness Assessment Badge */}
          <div className="w-full md:w-80 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className={`text-xs font-black uppercase px-2.5 py-0.5 rounded-full border ${statusBadge.color}`}>
                {statusBadge.title}
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {statusBadge.desc}
            </p>
          </div>
        </div>

        {/* 3 Metric Summary Boxes (Correct, Wrong, Unanswered) */}
        <div className="grid grid-cols-3 gap-4 pt-8 text-center sm:text-left">
          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30">
            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 mb-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Correct</span>
            </div>
            <div className="text-2xl sm:text-4xl font-black text-emerald-900 dark:text-emerald-200 font-mono">
              {score}
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30">
            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-bold text-rose-700 dark:text-rose-400 mb-1">
              <XCircle className="w-4 h-4" />
              <span>Wrong</span>
            </div>
            <div className="text-2xl sm:text-4xl font-black text-rose-900 dark:text-rose-200 font-mono">
              {wrongCount}
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700">
            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
              <HelpCircle className="w-4 h-4" />
              <span>Not answered</span>
            </div>
            <div className="text-2xl sm:text-4xl font-black text-slate-800 dark:text-slate-200 font-mono">
              {unansweredCount}
            </div>
          </div>
        </div>
      </div>

      {/* Section-by-Section Breakdown Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm mb-8">
        <h2 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          <span>Section Performance Breakdown</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase text-[11px] font-bold tracking-wider">
                <th className="pb-3 font-semibold">Section</th>
                <th className="pb-3 text-center font-semibold">Total</th>
                <th className="pb-3 text-center font-semibold text-emerald-600">Correct</th>
                <th className="pb-3 text-center font-semibold text-rose-500">Wrong</th>
                <th className="pb-3 text-center font-semibold text-slate-400">Unanswered</th>
                <th className="pb-3 text-right font-semibold">Score</th>
                <th className="pb-3 text-right font-semibold">Percentage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium text-slate-700 dark:text-slate-200">
              {SECTIONS.map((sec, idx) => {
                const s = sectionBreakdown[sec.name];
                if (!s) return null;

                return (
                  <tr key={sec.name} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-4 font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-md flex items-center justify-center font-bold text-[11px] text-white shrink-0" style={{ backgroundColor: sec.color }}>
                        {idx + 1}
                      </span>
                      <span>{sec.name}</span>
                    </td>
                    <td className="py-4 text-center text-slate-500 font-mono">{s.total}</td>
                    <td className="py-4 text-center font-bold text-emerald-600 font-mono">{s.correct}</td>
                    <td className="py-4 text-center text-rose-600 font-mono">{s.wrong}</td>
                    <td className="py-4 text-center text-slate-400 font-mono">{s.unanswered}</td>
                    <td className="py-4 text-right font-extrabold text-slate-900 dark:text-slate-100 font-mono">
                      {s.correct}/{s.total}
                    </td>
                    <td className="py-4 text-right font-black font-mono">
                      <span className={`px-2 py-0.5 rounded-md ${
                        s.percentage >= 60 
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' 
                          : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                      }`}>
                        {s.percentage.toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Visual Progress Bars for Each Section */}
        <div className="mt-8 space-y-4 pt-6 border-t border-slate-100 dark:border-slate-800">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Progress Bars by Discipline
          </div>
          {SECTIONS.map((sec) => {
            const s = sectionBreakdown[sec.name];
            if (!s) return null;

            return (
              <div key={sec.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-800 dark:text-slate-200">{sec.name}</span>
                  <span className="font-mono text-slate-500">
                    {s.correct}/{s.total} ({s.percentage.toFixed(0)}%)
                  </span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden flex">
                  {/* Correct */}
                  <div
                    style={{ width: `${(s.correct / s.total) * 100}%` }}
                    className="h-full bg-emerald-500 transition-all duration-500"
                    title={`Correct: ${s.correct}`}
                  />
                  {/* Wrong */}
                  <div
                    style={{ width: `${(s.wrong / s.total) * 100}%` }}
                    className="h-full bg-rose-400 transition-all duration-500"
                    title={`Wrong: ${s.wrong}`}
                  />
                  {/* Unanswered */}
                  <div
                    style={{ width: `${(s.unanswered / s.total) * 100}%` }}
                    className="h-full bg-slate-300 dark:bg-slate-700 transition-all duration-500"
                    title={`Unanswered: ${s.unanswered}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Review Next Steps Action Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {onOpenMistakes && (
          <button
            onClick={onOpenMistakes}
            className="p-5 rounded-2xl bg-rose-50/80 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-left hover:border-rose-400 transition-all group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider">
                Mistake Bank Drill
              </span>
              <Target className="w-5 h-5 text-rose-500 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100">
              Drill {wrongCount} Missed Questions
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
              Re-take only your mistakes until you achieve 100% mastery.
            </p>
          </button>
        )}

        <button
          onClick={onReviewIncorrect}
          className="p-5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 text-left hover:border-amber-400 transition-all group cursor-pointer"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
              Rationale Review
            </span>
            <XCircle className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform" />
          </div>
          <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100">
            Read Solutions for Missed Items
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
            Read the original official explanations from the DOST reviewer.
          </p>
        </button>

        <button
          onClick={() => onStartPractice(lowestSection)}
          className="p-5 rounded-2xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 text-left hover:border-blue-400 transition-all group cursor-pointer"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">
              Recommended Study
            </span>
            <BookOpen className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
          </div>
          <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100">
            Practice Weakest Section
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
            Focus on {lowestSection} ({sectionBreakdown[lowestSection]?.percentage.toFixed(0)}%) with step-by-step help.
          </p>
        </button>
      </div>
    </div>
  );
};
