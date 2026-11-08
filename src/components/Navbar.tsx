import React from 'react';
import { SectionName } from '../types/exam';
import { SECTIONS } from '../data/questions';
import { 
  Clock, 
  Flag, 
  Award, 
  BookOpen, 
  Maximize2, 
  Minimize2, 
  RotateCcw, 
  CheckCircle2, 
  History,
  FileSpreadsheet,
  Trophy,
  Target,
  Lightbulb,
  Printer,
  User
} from 'lucide-react';

interface NavbarProps {
  mode: 'intro' | 'exam' | 'results' | 'review' | 'practice' | 'mistakes';
  setMode: (mode: 'intro' | 'exam' | 'results' | 'review' | 'practice' | 'mistakes') => void;
  timeRemaining?: number;
  totalAnswered?: number;
  totalFlagged?: number;
  currentSection?: SectionName;
  currentUsername?: string;
  mistakeCount?: number;
  onOpenHistory?: () => void;
  onOpenFormulas?: () => void;
  onOpenLeaderboard?: () => void;
  onOpenProfile?: () => void;
  onOpenTips?: () => void;
  onOpenPrint?: () => void;
  onRetakeExam?: () => void;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  mode,
  setMode,
  timeRemaining = 7200,
  totalAnswered = 0,
  totalFlagged = 0,
  currentSection,
  currentUsername = 'Examinee',
  mistakeCount = 0,
  onOpenHistory,
  onOpenFormulas,
  onOpenLeaderboard,
  onOpenProfile,
  onOpenTips,
  onOpenPrint,
  onRetakeExam,
  isFullscreen,
  onToggleFullscreen,
}) => {
  // Format seconds into HH:MM:SS or MM:SS
  const formatTime = (secs: number) => {
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor((secs % 3600) / 60);
    const seconds = secs % 60;
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const isTimeCritical = timeRemaining <= 15 * 60; // 15 minutes left

  const activeSectionInfo = SECTIONS.find((s) => s.name === currentSection);

  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & App Title */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMode('intro')}
              className="flex items-center gap-2.5 text-left group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center font-black text-white shadow-sm border border-blue-400/30">
                <span className="text-sm tracking-tighter">REACH</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-base tracking-tight text-white group-hover:text-blue-300 transition-colors">
                    Project REACH
                  </span>
                  <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/40">
                    DOST-SEI
                  </span>
                </div>
                <p className="text-xs text-slate-400 hidden sm:block">
                  Mock Examination Practice Portal
                </p>
              </div>
            </button>
          </div>

          {/* Navigation / Mode Tabs */}
          <nav className="hidden lg:flex items-center space-x-1">
            <button
              onClick={() => setMode('intro')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                mode === 'intro'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => setMode('exam')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                mode === 'exam'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>Mock Exam</span>
              {mode === 'exam' && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              )}
            </button>

            <button
              onClick={() => setMode('practice')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                mode === 'practice'
                  ? 'bg-cyan-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Practice Mode</span>
            </button>

            <button
              onClick={() => setMode('mistakes')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                mode === 'mistakes'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              <span>Mistakes</span>
              {mistakeCount > 0 && (
                <span className="text-[10px] bg-rose-500 text-white font-black px-1.5 py-0.2 rounded-full">
                  {mistakeCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMode('review')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                mode === 'review'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Review (120 Qs)</span>
            </button>
          </nav>

          {/* Center Info in Exam Mode: Current Section & Timer */}
          {mode === 'exam' && (
            <div className="flex items-center gap-3">
              {activeSectionInfo && (
                <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-xs font-medium text-slate-300">
                  <span 
                    className="w-2 h-2 rounded-full" 
                    style={{ backgroundColor: activeSectionInfo.color }}
                  />
                  <span>{activeSectionInfo.name}</span>
                </div>
              )}

              {/* Countdown Timer */}
              <div 
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono font-bold text-sm tracking-wider border shadow-xs transition-colors ${
                  isTimeCritical 
                    ? 'bg-red-950/80 text-red-300 border-red-700 animate-pulse' 
                    : 'bg-slate-800 text-amber-300 border-slate-700'
                }`}
                title="Time Remaining"
              >
                <Clock className={`w-4 h-4 ${isTimeCritical ? 'text-red-400' : 'text-amber-400'}`} />
                <span>{formatTime(timeRemaining)}</span>
              </div>
            </div>
          )}

          {/* Right Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Quick stats in exam mode */}
            {mode === 'exam' && (
              <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-400 mr-1">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                  {totalAnswered}/120
                </span>
                {totalFlagged > 0 && (
                  <span className="flex items-center gap-1 text-amber-400">
                    <Flag className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {totalFlagged}
                  </span>
                )}
              </div>
            )}

            {/* Leaderboard Button */}
            {onOpenLeaderboard && (
              <button
                onClick={onOpenLeaderboard}
                title="Public Leaderboard"
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-amber-300 hover:text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-xs font-bold transition-colors cursor-pointer"
              >
                <Trophy className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="hidden sm:inline">Leaderboard</span>
              </button>
            )}

            {/* Username Profile Button */}
            {onOpenProfile && (
              <button
                onClick={onOpenProfile}
                title="Edit Username & Profile"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 text-xs font-semibold transition-colors cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-blue-400" />
                <span className="max-w-[80px] sm:max-w-[110px] truncate">{currentUsername}</span>
              </button>
            )}

            {/* Exam Tips */}
            {onOpenTips && (
              <button
                onClick={onOpenTips}
                title="DOST Qualifier Tips & Strategies"
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <Lightbulb className="w-4 h-4 text-amber-400" />
              </button>
            )}

            {/* Formula Reference Sheet */}
            {onOpenFormulas && (
              <button
                onClick={onOpenFormulas}
                title="DOST Formula & Reference Sheet"
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4" />
              </button>
            )}

            {/* Printable Reviewer */}
            {onOpenPrint && (
              <button
                onClick={onOpenPrint}
                title="Printable 120-Question Reviewer"
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4" />
              </button>
            )}

            {/* Past Exam History */}
            {onOpenHistory && (
              <button
                onClick={onOpenHistory}
                title="Exam Attempt History"
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <History className="w-4 h-4" />
              </button>
            )}

            {/* Fullscreen Toggle */}
            {onToggleFullscreen && (
              <button
                onClick={onToggleFullscreen}
                title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            )}

            {/* Retake Button if in results or review */}
            {(mode === 'results' || mode === 'review') && onRetakeExam && (
              <button
                onClick={onRetakeExam}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Retake Exam</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
