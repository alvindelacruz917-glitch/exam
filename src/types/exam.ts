export type SectionName =
  | 'Aptitude and Reasoning Skills'
  | 'Language Skills'
  | 'General Sciences'
  | 'Mathematics';

export type AnswerKey = 'A' | 'B' | 'C' | 'D';

export interface Question {
  id: number;
  questionNumber: number;
  section: SectionName;
  questionText: string;
  passage?: string;
  passageTitle?: string;
  choices: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: AnswerKey;
  explanation: string;
  diagramId?: string;
  formulaNote?: string;
}

export interface SectionInfo {
  name: SectionName;
  shortName: string;
  startQ: number;
  endQ: number;
  totalQuestions: number;
  color: string;
  badgeBg: string;
  badgeText: string;
}

export interface UserProfile {
  username: string;
  school?: string;
  targetCourse?: string;
  isRegistered?: boolean;
}

export interface LeaderboardEntry {
  id: string;
  rank?: number;
  username: string;
  school?: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  durationSeconds: number;
  timestamp: number;
  isCurrentUser?: boolean;
}

export interface ExamAttempt {
  id: string;
  username: string;
  school?: string;
  targetCourse?: string;
  timestamp: number;
  durationSeconds: number; // time spent in seconds
  answers: Record<number, AnswerKey>; // questionNumber -> selected choice
  flags: Record<number, boolean>;
  questionTimes?: Record<number, number>; // seconds spent per question
  score: number;
  totalQuestions: number;
  percentage: number;
  sectionBreakdown: {
    [key in SectionName]: {
      correct: number;
      wrong: number;
      unanswered: number;
      total: number;
      percentage: number;
    };
  };
}

export interface ActiveExamState {
  answers: Record<number, AnswerKey>;
  flags: Record<number, boolean>;
  questionTimes?: Record<number, number>;
  currentQuestionIndex: number; // 0 to 119
  timeRemaining: number; // in seconds (starts at 7200 = 120 mins)
  startTime: number;
  isPaused: boolean;
  isStarted: boolean;
  username?: string;
}

export interface PracticeState {
  currentQuestionIndex: number;
  selectedAnswers: Record<number, AnswerKey>;
  revealedExplanations: Record<number, boolean>;
  sectionFilter: SectionName | 'ALL';
}

export interface MistakeBankState {
  mistakeQuestionNumbers: number[];
  masteredQuestionNumbers: number[];
}
