import { 
  ActiveExamState, 
  ExamAttempt, 
  PracticeState, 
  UserProfile, 
  LeaderboardEntry 
} from '../types/exam';

const STORAGE_KEYS = {
  ACTIVE_EXAM: 'dost_mock_active_exam_v1',
  EXAM_HISTORY: 'dost_mock_exam_history_v1',
  PRACTICE_STATE: 'dost_mock_practice_state_v1',
  LAST_ATTEMPT: 'dost_mock_last_attempt_v1',
  USER_PROFILE: 'dost_mock_user_profile_v1',
  LEADERBOARD: 'dost_mock_leaderboard_v1',
  MISTAKE_BANK: 'dost_mock_mistake_bank_v1',
};

// Empty default leaderboard: Only REAL examinees will be displayed!
export const DEFAULT_LEADERBOARD: LeaderboardEntry[] = [];

export const getUserProfile = (): UserProfile => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    if (!raw) {
      return {
        username: '',
        school: '',
        targetCourse: '',
        isRegistered: false,
      };
    }
    const parsed = JSON.parse(raw) as UserProfile;
    return {
      ...parsed,
      isRegistered: !!(parsed.username && parsed.username.trim().length > 0 && parsed.isRegistered !== false),
    };
  } catch (e) {
    return {
      username: '',
      school: '',
      isRegistered: false,
    };
  }
};

export const saveUserProfile = (profile: UserProfile): void => {
  try {
    const cleanProfile: UserProfile = {
      ...profile,
      username: profile.username.trim(),
      isRegistered: true,
    };
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(cleanProfile));

    // Async sync to server database
    if (typeof window !== 'undefined' && cleanProfile.username) {
      fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cleanProfile),
      }).catch((err) => console.warn('Could not sync user to database API:', err));
    }
  } catch (e) {
    console.error('Failed to save user profile:', e);
  }
};

export const getLeaderboard = (): LeaderboardEntry[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LEADERBOARD);
    let list: LeaderboardEntry[] = raw ? JSON.parse(raw) : [];
    
    // Sort primarily by score desc, then by duration asc (faster is better)
    list.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return a.durationSeconds - b.durationSeconds;
    });

    return list.map((item, idx) => ({ ...item, rank: idx + 1 }));
  } catch (e) {
    return [];
  }
};

export const fetchLeaderboardFromDB = async (): Promise<LeaderboardEntry[]> => {
  try {
    const res = await fetch('/api/leaderboard');
    if (!res.ok) throw new Error('Failed to fetch leaderboard from DB');
    const json = await res.json();
    if (json.success && Array.isArray(json.data)) {
      const dbEntries: LeaderboardEntry[] = json.data;
      // Cache to localStorage
      localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(dbEntries));
      return dbEntries;
    }
    return getLeaderboard();
  } catch (e) {
    console.warn('Falling back to local leaderboard cache:', e);
    return getLeaderboard();
  }
};

export const addLeaderboardEntry = (entry: Omit<LeaderboardEntry, 'id'>): void => {
  try {
    const list = getLeaderboard();
    const newEntry: LeaderboardEntry = {
      ...entry,
      id: `entry_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      isCurrentUser: true,
    };
    const updated = [newEntry, ...list.filter((item) => item.id !== newEntry.id)];
    
    // Sort and limit
    updated.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.durationSeconds - b.durationSeconds;
    });

    localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(updated.slice(0, 100)));

    // Sync to backend database API
    if (typeof window !== 'undefined') {
      fetch('/api/leaderboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEntry),
      }).catch((err) => console.warn('Could not sync score to database API:', err));
    }
  } catch (e) {
    console.error('Failed to save to leaderboard:', e);
  }
};

export const getActiveExam = (): ActiveExamState | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ACTIVE_EXAM);
    if (!raw) return null;
    return JSON.parse(raw) as ActiveExamState;
  } catch (e) {
    return null;
  }
};

export const saveActiveExam = (state: ActiveExamState): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_EXAM, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save active exam:', e);
  }
};

export const clearActiveExam = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_EXAM);
  } catch (e) {
    console.error('Failed to clear active exam:', e);
  }
};

export const getExamHistory = (): ExamAttempt[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.EXAM_HISTORY);
    if (!raw) return [];
    return JSON.parse(raw) as ExamAttempt[];
  } catch (e) {
    return [];
  }
};

export const saveExamAttempt = (attempt: ExamAttempt): void => {
  try {
    const history = getExamHistory();
    const updated = [attempt, ...history];
    localStorage.setItem(STORAGE_KEYS.EXAM_HISTORY, JSON.stringify(updated));
    localStorage.setItem(STORAGE_KEYS.LAST_ATTEMPT, JSON.stringify(attempt));

    // Also record on leaderboard
    addLeaderboardEntry({
      username: attempt.username || 'Anonymous Examinee',
      school: attempt.school || 'DOST STEM Applicant',
      score: attempt.score,
      totalQuestions: attempt.totalQuestions,
      percentage: attempt.percentage,
      durationSeconds: attempt.durationSeconds,
      timestamp: attempt.timestamp,
    });
  } catch (e) {
    console.error('Failed to save exam attempt:', e);
  }
};

export const getLastAttempt = (): ExamAttempt | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LAST_ATTEMPT);
    if (!raw) return null;
    return JSON.parse(raw) as ExamAttempt;
  } catch (e) {
    return null;
  }
};

export const clearAllHistory = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEYS.EXAM_HISTORY);
    localStorage.removeItem(STORAGE_KEYS.LAST_ATTEMPT);
  } catch (e) {
    console.error('Failed to clear history:', e);
  }
};

// Mistake Bank (Targeted Review)
export const getMistakeBankQuestions = (): number[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.MISTAKE_BANK);
    if (!raw) return [];
    return JSON.parse(raw) as number[];
  } catch (e) {
    return [];
  }
};

export const saveMistakeBankQuestions = (qNumbers: number[]): void => {
  try {
    const unique = Array.from(new Set(qNumbers)).sort((a, b) => a - b);
    localStorage.setItem(STORAGE_KEYS.MISTAKE_BANK, JSON.stringify(unique));
  } catch (e) {
    console.error('Failed to save mistake bank:', e);
  }
};

export const removeMistakeQuestion = (qNum: number): void => {
  try {
    const current = getMistakeBankQuestions();
    const filtered = current.filter((n) => n !== qNum);
    localStorage.setItem(STORAGE_KEYS.MISTAKE_BANK, JSON.stringify(filtered));
  } catch (e) {
    console.error('Failed to remove mistake question:', e);
  }
};

export const getPracticeState = (): PracticeState | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PRACTICE_STATE);
    if (!raw) return null;
    return JSON.parse(raw) as PracticeState;
  } catch (e) {
    return null;
  }
};

export const savePracticeState = (state: PracticeState): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.PRACTICE_STATE, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save practice state:', e);
  }
};

export const clearPracticeState = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEYS.PRACTICE_STATE);
  } catch (e) {
    console.error('Failed to clear practice state:', e);
  }
};
