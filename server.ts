import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const isProduction = process.env.NODE_ENV === 'production';

// Ensure data directory exists
const DATA_DIR = path.resolve(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const LEADERBOARD_FILE = path.join(DATA_DIR, 'leaderboard.json');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// Initialize empty files if not present (NO MOCK/EXAMPLE DATA)
if (!fs.existsSync(LEADERBOARD_FILE)) {
  fs.writeFileSync(LEADERBOARD_FILE, JSON.stringify([], null, 2), 'utf-8');
}
if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2), 'utf-8');
}

// Helpers for read/write
function readJSON<T>(filePath: string, fallback: T): T {
  try {
    if (!fs.existsSync(filePath)) return fallback;
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content) as T;
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    return fallback;
  }
}

function writeJSON<T>(filePath: string, data: T): boolean {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
    return false;
  }
}

app.use(express.json());

// API Routes

// 1. Get Leaderboard
app.get('/api/leaderboard', (_req: Request, res: Response) => {
  const entries = readJSON<any[]>(LEADERBOARD_FILE, []);
  
  // Sort by score desc, then durationSeconds asc (faster is better)
  entries.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.durationSeconds - b.durationSeconds;
  });

  const ranked = entries.map((item, idx) => ({
    ...item,
    rank: idx + 1,
  }));

  res.json({ success: true, count: ranked.length, data: ranked });
});

// 2. Submit Exam Result to Leaderboard
app.post('/api/leaderboard', (req: Request, res: Response) => {
  const { username, school, targetCourse, score, totalQuestions, percentage, durationSeconds, timestamp } = req.body;

  if (!username || typeof score !== 'number') {
    return res.status(400).json({ success: false, error: 'Invalid payload: username and score are required' });
  }

  const entries = readJSON<any[]>(LEADERBOARD_FILE, []);
  
  const newEntry = {
    id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    username: String(username).trim(),
    school: school ? String(school).trim() : 'DOST STEM Applicant',
    targetCourse: targetCourse ? String(targetCourse).trim() : '',
    score: Number(score),
    totalQuestions: Number(totalQuestions) || 120,
    percentage: Number(percentage) || Number(((score / 120) * 100).toFixed(1)),
    durationSeconds: Number(durationSeconds) || 0,
    timestamp: Number(timestamp) || Date.now(),
  };

  entries.push(newEntry);

  // Keep top 100 entries sorted
  entries.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.durationSeconds - b.durationSeconds;
  });

  writeJSON(LEADERBOARD_FILE, entries.slice(0, 100));

  res.json({ success: true, data: newEntry });
});

// 3. Register or Update Examinee Profile
app.post('/api/users', (req: Request, res: Response) => {
  const { username, school, targetCourse } = req.body;
  if (!username || !String(username).trim()) {
    return res.status(400).json({ success: false, error: 'Username is required' });
  }

  const cleanName = String(username).trim();
  const users = readJSON<any[]>(USERS_FILE, []);
  
  const existingIdx = users.findIndex((u) => u.username.toLowerCase() === cleanName.toLowerCase());
  const profile = {
    username: cleanName,
    school: school ? String(school).trim() : 'DOST STEM Aspirant',
    targetCourse: targetCourse ? String(targetCourse).trim() : '',
    updatedAt: Date.now(),
  };

  if (existingIdx >= 0) {
    users[existingIdx] = { ...users[existingIdx], ...profile };
  } else {
    users.push({ ...profile, registeredAt: Date.now() });
  }

  writeJSON(USERS_FILE, users);
  res.json({ success: true, profile });
});

// 4. Reset/Clear Leaderboard (Optional admin endpoint if user wants fresh start)
app.post('/api/leaderboard/clear', (_req: Request, res: Response) => {
  writeJSON(LEADERBOARD_FILE, []);
  res.json({ success: true, message: 'Leaderboard cleared' });
});

// Setup Vite middlewares in development or static serving in production
async function startServer() {
  if (!isProduction) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT} (isProduction=${isProduction})`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
