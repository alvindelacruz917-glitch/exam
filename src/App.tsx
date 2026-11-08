import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  SectionName, 
  AnswerKey, 
  ExamAttempt, 
  ActiveExamState,
  UserProfile,
  LeaderboardEntry
} from './types/exam';
import { QUESTIONS } from './data/questions';
import { 
  getActiveExam, 
  saveActiveExam, 
  clearActiveExam, 
  getExamHistory, 
  saveExamAttempt, 
  getLastAttempt,
  getUserProfile,
  saveUserProfile,
  getLeaderboard,
  fetchLeaderboardFromDB,
  getMistakeBankQuestions,
  saveMistakeBankQuestions
} from './utils/storage';
import { ExamineeWelcomeGate } from './components/ExamineeWelcomeGate';
import { Navbar } from './components/Navbar';
import { ExamIntro } from './components/ExamIntro';
import { QuestionCard } from './components/QuestionCard';
import { QuestionSidebar } from './components/QuestionSidebar';
import { SubmitModal } from './components/SubmitModal';
import { ResultsDashboard } from './components/ResultsDashboard';
import { QuestionReview } from './components/QuestionReview';
import { PracticeMode } from './components/PracticeMode';
import { MistakeBank } from './components/MistakeBank';
import { ExamHistoryModal } from './components/ExamHistoryModal';
import { FormulaSheetModal } from './components/FormulaSheetModal';
import { LeaderboardModal } from './components/LeaderboardModal';
import { UsernameModal } from './components/UsernameModal';
import { Scratchpad } from './components/Scratchpad';
import { ExamTipsModal } from './components/ExamTipsModal';
import { PrintReviewerModal } from './components/PrintReviewerModal';
import { AlertCircle } from 'lucide-react';

const TOTAL_TIME_SECONDS = 120 * 60; // 120 minutes = 7200s

export default function App() {
  const [mode, setMode] = useState<'intro' | 'exam' | 'results' | 'review' | 'practice' | 'mistakes'>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, AnswerKey>>({});
  const [flags, setFlags] = useState<Record<number, boolean>>({});
  const [questionTimes, setQuestionTimes] = useState<Record<number, number>>({});
  const [timeRemaining, setTimeRemaining] = useState<number>(TOTAL_TIME_SECONDS);
  const [isExamActive, setIsExamActive] = useState<boolean>(false);
  
  // Modals & Panels
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);
  const [showFormulaModal, setShowFormulaModal] = useState<boolean>(false);
  const [showLeaderboardModal, setShowLeaderboardModal] = useState<boolean>(false);
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  const [showTipsModal, setShowTipsModal] = useState<boolean>(false);
  const [showPrintModal, setShowPrintModal] = useState<boolean>(false);
  const [isScratchpadOpen, setIsScratchpadOpen] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Profile & Leaderboard
  const [profile, setProfile] = useState<UserProfile>(() => getUserProfile());
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [mistakeCount, setMistakeCount] = useState<number>(0);

  const refreshLeaderboard = useCallback(async () => {
    try {
      const list = await fetchLeaderboardFromDB();
      setLeaderboard(list);
    } catch {
      setLeaderboard(getLeaderboard());
    }
  }, []);

  // Mode helpers
  const [practiceInitialSection, setPracticeInitialSection] = useState<SectionName | undefined>(undefined);
  const [reviewInitialFilter, setReviewInitialFilter] = useState<'ALL' | 'WRONG' | 'CORRECT' | 'UNANSWERED'>('ALL');

  const [activeDraft, setActiveDraft] = useState<ActiveExamState | null>(null);
  const [lastAttempt, setLastAttempt] = useState<ExamAttempt | null>(null);
  const [examHistory, setExamHistory] = useState<ExamAttempt[]>([]);
  const [currentAttemptResult, setCurrentAttemptResult] = useState<ExamAttempt | null>(null);

  // Time warning banner state
  const [dismissedWarning, setDismissedWarning] = useState<boolean>(false);

  // Ref for timer intervals
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Load initial storage state on mount
  useEffect(() => {
    const draft = getActiveExam();
    const history = getExamHistory();
    const latest = getLastAttempt();
    const user = getUserProfile();
    const mistakes = getMistakeBankQuestions();

    setActiveDraft(draft);
    setExamHistory(history);
    setLastAttempt(latest);
    setProfile(user);
    setMistakeCount(mistakes.length);

    if (latest && !draft) {
      setCurrentAttemptResult(latest);
    }

    refreshLeaderboard();
  }, [refreshLeaderboard]);

  // Sync active exam to localStorage
  useEffect(() => {
    if (isExamActive) {
      saveActiveExam({
        answers,
        flags,
        questionTimes,
        currentQuestionIndex,
        timeRemaining,
        startTime: Date.now() - (TOTAL_TIME_SECONDS - timeRemaining) * 1000,
        isPaused: false,
        isStarted: true,
        username: profile.username,
      });
    }
  }, [answers, flags, questionTimes, currentQuestionIndex, timeRemaining, isExamActive, profile.username]);

  // Submit and grade the examination
  const handleFinalSubmit = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    setShowSubmitModal(false);
    setIsExamActive(false);

    const durationSeconds = TOTAL_TIME_SECONDS - timeRemaining;

    // Calculate score
    let totalScore = 0;
    const missedQuestions: number[] = [];
    const sectionBreakdown: ExamAttempt['sectionBreakdown'] = {
      'Aptitude and Reasoning Skills': { correct: 0, wrong: 0, unanswered: 0, total: 20, percentage: 0 },
      'Language Skills': { correct: 0, wrong: 0, unanswered: 0, total: 20, percentage: 0 },
      'General Sciences': { correct: 0, wrong: 0, unanswered: 0, total: 40, percentage: 0 },
      'Mathematics': { correct: 0, wrong: 0, unanswered: 0, total: 40, percentage: 0 },
    };

    QUESTIONS.forEach((q) => {
      const userChoice = answers[q.questionNumber];
      const sec = sectionBreakdown[q.section];
      if (userChoice) {
        if (userChoice === q.correctAnswer) {
          totalScore++;
          sec.correct++;
        } else {
          sec.wrong++;
          missedQuestions.push(q.questionNumber);
        }
      } else {
        sec.unanswered++;
        missedQuestions.push(q.questionNumber);
      }
    });

    // Compute percentages
    (Object.keys(sectionBreakdown) as SectionName[]).forEach((secName) => {
      const s = sectionBreakdown[secName];
      s.percentage = (s.correct / s.total) * 100;
    });

    const finalAttempt: ExamAttempt = {
      id: `attempt_${Date.now()}`,
      username: profile.username || 'Anonymous Examinee',
      school: profile.school || 'DOST STEM Applicant',
      targetCourse: profile.targetCourse || '',
      timestamp: Date.now(),
      durationSeconds,
      answers,
      flags,
      questionTimes,
      score: totalScore,
      totalQuestions: 120,
      percentage: (totalScore / 120) * 100,
      sectionBreakdown,
    };

    saveExamAttempt(finalAttempt);
    clearActiveExam();

    // Save to mistake bank
    const currentMistakes = getMistakeBankQuestions();
    const updatedMistakes = Array.from(new Set([...currentMistakes, ...missedQuestions]));
    saveMistakeBankQuestions(updatedMistakes);
    setMistakeCount(updatedMistakes.length);

    setActiveDraft(null);
    setCurrentAttemptResult(finalAttempt);
    setLastAttempt(finalAttempt);
    setExamHistory(getExamHistory());
    refreshLeaderboard();
    setMode('results');
  }, [answers, flags, questionTimes, timeRemaining, profile.username, profile.school, profile.targetCourse, refreshLeaderboard]);

  // Main Timer loop
  useEffect(() => {
    if (isExamActive && mode === 'exam') {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleFinalSubmit();
            return 0;
          }
          return prev - 1;
        });

        // Track per-question pacing
        const curQNum = QUESTIONS[currentQuestionIndex]?.questionNumber;
        if (curQNum) {
          setQuestionTimes((prev) => ({
            ...prev,
            [curQNum]: (prev[curQNum] || 0) + 1,
          }));
        }
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isExamActive, mode, currentQuestionIndex, handleFinalSubmit]);

  // Start fresh examination
  const handleStartExam = () => {
    clearActiveExam();
    setAnswers({});
    setFlags({});
    setQuestionTimes({});
    setCurrentQuestionIndex(0);
    setTimeRemaining(TOTAL_TIME_SECONDS);
    setIsExamActive(true);
    setDismissedWarning(false);
    setActiveDraft(null);
    setMode('exam');
  };

  // Resume incomplete attempt
  const handleResumeExam = () => {
    const draft = getActiveExam();
    if (draft) {
      setAnswers(draft.answers || {});
      setFlags(draft.flags || {});
      setQuestionTimes(draft.questionTimes || {});
      setCurrentQuestionIndex(draft.currentQuestionIndex || 0);
      setTimeRemaining(draft.timeRemaining || TOTAL_TIME_SECONDS);
      setIsExamActive(true);
      setMode('exam');
    } else {
      handleStartExam();
    }
  };

  // Profile save
  const handleSaveProfile = (newProfile: UserProfile) => {
    setProfile(newProfile);
    saveUserProfile(newProfile);
    refreshLeaderboard();
  };

  const isRegistered = Boolean(profile.isRegistered && profile.username && profile.username.trim().length > 0);

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  // Question interactions
  const handleSelectAnswer = (choice: AnswerKey) => {
    const qNum = QUESTIONS[currentQuestionIndex].questionNumber;
    setAnswers((prev) => ({ ...prev, [qNum]: choice }));
  };

  const handleClearAnswer = () => {
    const qNum = QUESTIONS[currentQuestionIndex].questionNumber;
    setAnswers((prev) => {
      const copy = { ...prev };
      delete copy[qNum];
      return copy;
    });
  };

  const handleToggleFlag = () => {
    const qNum = QUESTIONS[currentQuestionIndex].questionNumber;
    setFlags((prev) => ({ ...prev, [qNum]: !prev[qNum] }));
  };

  const currentQ = QUESTIONS[currentQuestionIndex];
  const answeredCount = Object.keys(answers).length;
  const flaggedCount = Object.values(flags).filter(Boolean).length;
  const is15MinWarning = timeRemaining <= 15 * 60 && timeRemaining > 0 && !dismissedWarning;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Professional Header */}
      <Navbar
        mode={mode}
        setMode={(newMode) => {
          if (newMode === 'exam' && !isExamActive) {
            handleResumeExam();
          } else {
            setMode(newMode);
          }
        }}
        timeRemaining={timeRemaining}
        totalAnswered={answeredCount}
        totalFlagged={flaggedCount}
        currentSection={currentQ?.section}
        currentUsername={profile.username}
        mistakeCount={mistakeCount}
        onOpenHistory={() => setShowHistoryModal(true)}
        onOpenFormulas={() => setShowFormulaModal(true)}
        onOpenLeaderboard={() => setShowLeaderboardModal(true)}
        onOpenProfile={() => setShowProfileModal(true)}
        onOpenTips={() => setShowTipsModal(true)}
        onOpenPrint={() => setShowPrintModal(true)}
        onRetakeExam={handleStartExam}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
      />

      {/* 15-Minute Countdown Warning Banner */}
      {mode === 'exam' && is15MinWarning && (
        <div className="bg-amber-500 text-slate-950 px-4 py-2.5 text-xs sm:text-sm font-bold flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2 max-w-5xl mx-auto w-full justify-between">
            <span className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>
                15-Minute Warning: Less than 15 minutes remain before automatic examination submission. Answer all questions!
              </span>
            </span>
            <button
              onClick={() => setDismissedWarning(true)}
              className="text-xs bg-amber-600 hover:bg-amber-700 text-white px-2 py-0.5 rounded cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Main View Router */}
      <main className="flex-1">
        {mode === 'intro' && (
          <ExamIntro
            onStartExam={handleStartExam}
            onResumeExam={handleResumeExam}
            activeExam={activeDraft}
            lastAttempt={lastAttempt}
            username={profile.username}
            mistakeCount={mistakeCount}
            onOpenPractice={() => {
              setPracticeInitialSection(undefined);
              setMode('practice');
            }}
            onOpenReview={() => {
              setReviewInitialFilter('ALL');
              setMode('review');
            }}
            onOpenFormulas={() => setShowFormulaModal(true)}
            onOpenHistory={() => setShowHistoryModal(true)}
            onOpenLeaderboard={() => setShowLeaderboardModal(true)}
            onOpenProfile={() => setShowProfileModal(true)}
            onOpenMistakes={() => setMode('mistakes')}
            onOpenTips={() => setShowTipsModal(true)}
            onOpenPrint={() => setShowPrintModal(true)}
          />
        )}

        {mode === 'exam' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
              {/* Question Center Area (3 cols) */}
              <div className="lg:col-span-3">
                <QuestionCard
                  question={currentQ}
                  selectedAnswer={answers[currentQ.questionNumber]}
                  isFlagged={!!flags[currentQ.questionNumber]}
                  onSelectAnswer={handleSelectAnswer}
                  onClearAnswer={handleClearAnswer}
                  onToggleFlag={handleToggleFlag}
                  onPrevious={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                  onNext={() => setCurrentQuestionIndex((prev) => Math.min(QUESTIONS.length - 1, prev + 1))}
                  onOpenSubmitModal={() => setShowSubmitModal(true)}
                  isFirstQuestion={currentQuestionIndex === 0}
                  isLastQuestion={currentQuestionIndex === QUESTIONS.length - 1}
                  onToggleScratchpad={() => setIsScratchpadOpen((prev) => !prev)}
                  questionTimeSeconds={questionTimes[currentQ.questionNumber] || 0}
                />
              </div>

              {/* Sidebar Navigation Palette (1 col) */}
              <div className="lg:col-span-1 lg:sticky lg:top-20">
                <QuestionSidebar
                  currentQuestionIndex={currentQuestionIndex}
                  answers={answers}
                  flags={flags}
                  onSelectQuestion={(idx) => setCurrentQuestionIndex(idx)}
                  onSubmitExam={() => setShowSubmitModal(true)}
                />
              </div>
            </div>
          </div>
        )}

        {mode === 'results' && currentAttemptResult && (
          <ResultsDashboard
            attempt={currentAttemptResult}
            onReviewAll={() => {
              setReviewInitialFilter('ALL');
              setMode('review');
            }}
            onReviewIncorrect={() => {
              setReviewInitialFilter('WRONG');
              setMode('review');
            }}
            onRetakeExam={handleStartExam}
            onStartPractice={(sec) => {
              setPracticeInitialSection(sec);
              setMode('practice');
            }}
            onOpenLeaderboard={() => setShowLeaderboardModal(true)}
            onOpenMistakes={() => setMode('mistakes')}
          />
        )}

        {mode === 'review' && (
          <QuestionReview
            attempt={currentAttemptResult || lastAttempt}
            initialFilter={reviewInitialFilter}
            onRetakeExam={handleStartExam}
            onBackToResults={currentAttemptResult ? () => setMode('results') : undefined}
          />
        )}

        {mode === 'practice' && (
          <PracticeMode
            initialSection={practiceInitialSection}
            onExitToExam={handleStartExam}
          />
        )}

        {mode === 'mistakes' && (
          <MistakeBank
            onTakeMockExam={handleStartExam}
          />
        )}
      </main>

      {/* Floating Scratchpad */}
      <Scratchpad
        isOpen={isScratchpadOpen}
        onClose={() => setIsScratchpadOpen(false)}
      />

      {/* Submit Confirmation Dialog */}
      <SubmitModal
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        onConfirm={handleFinalSubmit}
        answeredCount={answeredCount}
        totalQuestions={120}
        flaggedCount={flaggedCount}
        timeRemaining={timeRemaining}
      />

      {/* Leaderboard Modal */}
      <LeaderboardModal
        isOpen={showLeaderboardModal}
        onClose={() => setShowLeaderboardModal(false)}
        entries={leaderboard}
        currentUsername={profile.username}
        onEditProfile={() => {
          setShowLeaderboardModal(false);
          setShowProfileModal(true);
        }}
        onRefresh={refreshLeaderboard}
        onStartExam={handleStartExam}
      />

      {/* User Profile / Username Modal */}
      <UsernameModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        currentProfile={profile}
        onSaveProfile={handleSaveProfile}
      />

      {/* Exam History Modal */}
      <ExamHistoryModal
        isOpen={showHistoryModal}
        onClose={() => setShowHistoryModal(false)}
        history={examHistory}
        onSelectAttempt={(attempt) => {
          setCurrentAttemptResult(attempt);
          setMode('results');
        }}
        onHistoryCleared={() => {
          setExamHistory([]);
          setLastAttempt(null);
          setCurrentAttemptResult(null);
          setLeaderboard(getLeaderboard());
        }}
      />

      {/* Formula Sheet Modal */}
      <FormulaSheetModal
        isOpen={showFormulaModal}
        onClose={() => setShowFormulaModal(false)}
      />

      {/* Exam Qualifier Strategy Tips Modal */}
      <ExamTipsModal
        isOpen={showTipsModal}
        onClose={() => setShowTipsModal(false)}
      />

      {/* Printable Reviewer Modal */}
      <PrintReviewerModal
        isOpen={showPrintModal}
        onClose={() => setShowPrintModal(false)}
      />

      {/* Minimal Academic Footer */}
      <footer className="mt-auto py-6 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              DOST Project REACH Mock Examination System
            </span>{' '}
            • S&T Undergraduate Scholarships Qualifying Practice
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <button onClick={() => setShowTipsModal(true)} className="hover:text-blue-500 cursor-pointer">Strategy Guide</button>
            <span>•</span>
            <button onClick={() => setShowLeaderboardModal(true)} className="hover:text-blue-500 cursor-pointer">Leaderboard</button>
            <span>•</span>
            <button onClick={() => setShowPrintModal(true)} className="hover:text-blue-500 cursor-pointer">Printable PDF</button>
          </div>
        </div>
      </footer>

      {/* Mandatory Examinee Welcome Gate Modal */}
      {!isRegistered && (
        <ExamineeWelcomeGate onRegister={handleSaveProfile} />
      )}
    </div>
  );
}
