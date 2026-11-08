import React, { useState } from 'react';
import { LeaderboardEntry } from '../types/exam';
import { 
  Trophy, 
  X, 
  Flame, 
  User, 
  RotateCw, 
  Sparkles
} from 'lucide-react';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  entries: LeaderboardEntry[];
  currentUsername: string;
  onEditProfile: () => void;
  onRefresh?: () => void;
  onStartExam?: () => void;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  isOpen,
  onClose,
  entries,
  currentUsername,
  onEditProfile,
  onRefresh,
  onStartExam,
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  if (!isOpen) return null;

  const top3 = entries.slice(0, 3);

  const formatDuration = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}m ${s.toString().padStart(2, '0')}s`;
  };

  const handleRefreshClick = () => {
    if (onRefresh) {
      setIsRefreshing(true);
      onRefresh();
      setTimeout(() => setIsRefreshing(false), 600);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] flex flex-col justify-between overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-amber-500 shadow-sm">
                <Trophy className="w-6 h-6 fill-amber-500" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100">
                    DOST REACH Leaderboard
                  </h3>
                  <span className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300">
                    <Flame className="w-3 h-3 fill-red-500 text-red-500" />
                    Live Database
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Verified exam performances from candidates who completed the 120-item Mock Examination
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {onRefresh && (
                <button
                  onClick={handleRefreshClick}
                  disabled={isRefreshing}
                  className="p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Refresh Leaderboard"
                >
                  <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                </button>
              )}
              <button
                onClick={onEditProfile}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-blue-600" />
                <span>Examinee: <strong>{currentUsername || 'Not Set'}</strong></span>
              </button>
            </div>
          </div>

          {/* EMPTY STATE IF NO ENTRIES YET */}
          {entries.length === 0 ? (
            <div className="p-8 sm:p-12 text-center bg-slate-50 dark:bg-slate-800/40 border border-dashed border-slate-200 dark:border-slate-700 rounded-3xl my-6">
              <div className="w-16 h-16 rounded-3xl bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-700 flex items-center justify-center mx-auto mb-4 text-amber-600 shadow-sm">
                <Sparkles className="w-8 h-8" />
              </div>
              <h4 className="text-lg sm:text-xl font-black text-slate-900 dark:text-slate-100 mb-2">
                No Examinees Recorded Yet!
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6 leading-relaxed">
                There are no placeholder or simulated examinees. Be the <strong>first DOST Scholar Aspirant</strong> to finish the full 120-question exam and claim the #1 Topnotcher rank!
              </p>
              {onStartExam && (
                <button
                  onClick={() => {
                    onClose();
                    onStartExam();
                  }}
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-600/25 transition-all cursor-pointer"
                >
                  Start Mock Exam Now
                </button>
              )}
            </div>
          ) : (
            <>
              {/* Top 3 Podium Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                {/* Rank 2 Silver */}
                {top3[1] && (
                  <div className="order-2 sm:order-1 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex flex-col items-center text-center relative overflow-hidden">
                    <div className="w-8 h-8 rounded-full bg-slate-300 text-slate-700 font-black text-xs flex items-center justify-center mb-2 shadow-xs">
                      🥈 2
                    </div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 truncate w-full">
                      {top3[1].username}
                    </h4>
                    <p className="text-[11px] text-slate-500 truncate w-full mb-2">
                      {top3[1].school || 'DOST Candidate'}
                    </p>
                    <div className="mt-auto">
                      <div className="text-xl font-black text-slate-900 dark:text-slate-100 font-mono">
                        {top3[1].score}/120
                      </div>
                      <div className="text-[11px] font-semibold text-slate-500">
                        {top3[1].percentage.toFixed(1)}% • {formatDuration(top3[1].durationSeconds)}
                      </div>
                    </div>
                  </div>
                )}

                {/* Rank 1 Gold (Center & Elevated) */}
                {top3[0] && (
                  <div className="order-1 sm:order-2 p-5 rounded-2xl bg-gradient-to-b from-amber-50 to-amber-100/50 dark:from-amber-950/40 dark:to-amber-900/20 border-2 border-amber-400 dark:border-amber-600 flex flex-col items-center text-center relative shadow-md">
                    <div className="w-10 h-10 rounded-full bg-amber-400 text-amber-950 font-black text-sm flex items-center justify-center mb-2 shadow-sm">
                      🥇 1
                    </div>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-400/30 text-amber-900 dark:text-amber-200 mb-1">
                      Topnotcher
                    </span>
                    <h4 className="font-extrabold text-base text-slate-900 dark:text-slate-100 truncate w-full">
                      {top3[0].username}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 truncate w-full mb-2">
                      {top3[0].school || 'DOST Candidate'}
                    </p>
                    <div className="mt-auto">
                      <div className="text-2xl font-black text-amber-600 dark:text-amber-400 font-mono">
                        {top3[0].score}/120
                      </div>
                      <div className="text-xs font-bold text-slate-600 dark:text-slate-300">
                        {top3[0].percentage.toFixed(1)}% • {formatDuration(top3[0].durationSeconds)}
                      </div>
                    </div>
                  </div>
                )}

                {/* Rank 3 Bronze */}
                {top3[2] && (
                  <div className="order-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex flex-col items-center text-center relative overflow-hidden">
                    <div className="w-8 h-8 rounded-full bg-amber-700/20 text-amber-800 dark:text-amber-300 font-black text-xs flex items-center justify-center mb-2 shadow-xs">
                      🥉 3
                    </div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 truncate w-full">
                      {top3[2].username}
                    </h4>
                    <p className="text-[11px] text-slate-500 truncate w-full mb-2">
                      {top3[2].school || 'DOST Candidate'}
                    </p>
                    <div className="mt-auto">
                      <div className="text-xl font-black text-slate-900 dark:text-slate-100 font-mono">
                        {top3[2].score}/120
                      </div>
                      <div className="text-[11px] font-semibold text-slate-500">
                        {top3[2].percentage.toFixed(1)}% • {formatDuration(top3[2].durationSeconds)}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Full Rankings Table */}
              <div className="overflow-y-auto max-h-[300px] border border-slate-200 dark:border-slate-800 rounded-2xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-800 text-slate-400 uppercase text-[10px] font-bold tracking-wider sticky top-0 z-10">
                    <tr>
                      <th className="py-2.5 px-3 text-center">Rank</th>
                      <th className="py-2.5 px-3">Examinee</th>
                      <th className="py-2.5 px-3 text-center">Score</th>
                      <th className="py-2.5 px-3 text-center">Accuracy</th>
                      <th className="py-2.5 px-3 text-right">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                    {entries.map((entry, idx) => {
                      const isCurrent = 
                        entry.username.toLowerCase() === currentUsername.toLowerCase() || 
                        entry.isCurrentUser;

                      return (
                        <tr
                          key={entry.id || idx}
                          className={`hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors ${
                            isCurrent
                              ? 'bg-blue-50/80 dark:bg-blue-950/40 font-bold border-l-4 border-blue-600'
                              : ''
                          }`}
                        >
                          <td className="py-2.5 px-3 text-center font-mono font-bold text-slate-600 dark:text-slate-300">
                            {idx === 0 && '🥇'}
                            {idx === 1 && '🥈'}
                            {idx === 2 && '🥉'}
                            {idx > 2 && `#${idx + 1}`}
                          </td>
                          <td className="py-2.5 px-3">
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-slate-900 dark:text-slate-100">
                                {entry.username}
                              </span>
                              {isCurrent && (
                                <span className="text-[10px] bg-blue-600 text-white font-extrabold px-1.5 py-0.2 rounded">
                                  YOU
                                </span>
                              )}
                            </div>
                            {entry.school && (
                              <div className="text-[10px] text-slate-400">
                                {entry.school}
                              </div>
                            )}
                          </td>
                          <td className="py-2.5 px-3 text-center font-mono font-extrabold text-slate-900 dark:text-slate-100">
                            {entry.score}/120
                          </td>
                          <td className="py-2.5 px-3 text-center font-mono">
                            <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                              entry.percentage >= 80 
                                ? 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60' 
                                : 'text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60'
                            }`}>
                              {entry.percentage.toFixed(1)}%
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-right font-mono text-slate-500">
                            {formatDuration(entry.durationSeconds)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <p className="text-[11px] text-slate-500">
            Completing the 120-question examination automatically records your verified score on the database.
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer"
          >
            Close Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
};
