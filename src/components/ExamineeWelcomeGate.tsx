import React, { useState } from 'react';
import { UserProfile } from '../types/exam';
import { 
  Sparkles, 
  ShieldCheck, 
  Trophy, 
  BookOpen, 
  ArrowRight,
  School,
  Compass
} from 'lucide-react';

interface ExamineeWelcomeGateProps {
  onRegister: (profile: UserProfile) => void;
}

const POPULAR_STEM_COURSES = [
  'BS Computer Science',
  'BS Information Technology',
  'BS Civil Engineering',
  'BS Mechanical Engineering',
  'BS Electrical Engineering',
  'BS Chemical Engineering',
  'BS Biology',
  'BS Applied Physics',
  'BS Chemistry',
  'BS Applied Mathematics',
  'BS Statistics',
  'BS Food Technology',
  'BS Agriculture / Forestry',
  'BS Medical Technology'
];

export const ExamineeWelcomeGate: React.FC<ExamineeWelcomeGateProps> = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [school, setSchool] = useState('');
  const [targetCourse, setTargetCourse] = useState('BS Computer Science');
  const [customCourse, setCustomCourse] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUsername = username.trim();
    if (!cleanUsername || cleanUsername.length < 2) {
      setError('Please enter your examinee name or handle (at least 2 characters).');
      return;
    }

    const finalCourse = targetCourse === 'OTHER' ? customCourse.trim() || 'DOST Priority STEM Program' : targetCourse;

    onRegister({
      username: cleanUsername,
      school: school.trim() || 'DOST STEM Aspirant',
      targetCourse: finalCourse,
      isRegistered: true,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden animate-fadeIn my-8">
        {/* DOST Academic Banner */}
        <div className="relative bg-gradient-to-br from-blue-900 via-blue-950 to-slate-950 text-white p-6 sm:p-8 overflow-hidden">
          {/* Subtle Background Glow */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/20 text-blue-200 border border-blue-400/30">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                DOST-SEI Project REACH
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2">
              Examinee Identification
            </h1>
            <p className="text-sm text-blue-100/90 leading-relaxed font-sans">
              Please enter your examinee handle to enter the practice portal. This identifier will be used to record your official exam results on the live <strong>Public Leaderboard Database</strong>.
            </p>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
          {/* Examinee Username Input */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Examinee Name / Handle <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                required
                autoFocus
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (error) setError('');
                }}
                placeholder="e.g., Alex Rivera or STEM_Scholar2026"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all text-sm"
              />
            </div>
            {error && (
              <p className="mt-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400">
                {error}
              </p>
            )}
            <p className="mt-1 text-[11px] text-slate-500">
              This name will be displayed on the public leaderboard when you finish the exam.
            </p>
          </div>

          {/* School / Region Input */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
              <School className="w-3.5 h-3.5 text-blue-600" />
              <span>School / Institution / Division (Optional)</span>
            </label>
            <input
              type="text"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              placeholder="e.g., Manila Science High School / QC Science / Region IV-A"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all text-sm"
            />
          </div>

          {/* Target STEM Degree */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-amber-500" />
              <span>Target DOST Priority STEM Degree</span>
            </label>
            <select
              value={targetCourse}
              onChange={(e) => setTargetCourse(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all text-sm cursor-pointer"
            >
              {POPULAR_STEM_COURSES.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
              <option value="OTHER">Other STEM Degree (Specify)</option>
            </select>

            {targetCourse === 'OTHER' && (
              <input
                type="text"
                value={customCourse}
                onChange={(e) => setCustomCourse(e.target.value)}
                placeholder="Enter your target course..."
                className="mt-2 w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            )}
          </div>

          {/* Key Portal Features Preview */}
          <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl p-3.5 space-y-2 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>100% Authorized 120-Question DOST Mock Examination</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Continuous Scrollable Solution Review with step-by-step explanations</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Live Shared Leaderboard Database across all examinees</span>
            </div>
          </div>

          {/* Submit Action Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-[0.99] text-white font-bold text-sm shadow-md shadow-blue-600/25 transition-all cursor-pointer"
          >
            <span>Enter DOST Reviewer Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
