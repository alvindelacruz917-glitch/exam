import React from 'react';

interface DiagramRendererProps {
  diagramId: string;
}

export const DiagramRenderer: React.FC<DiagramRendererProps> = ({ diagramId }) => {
  switch (diagramId) {
    case 'Q2_FLASKS':
      return (
        <div className="my-6 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl max-w-2xl mx-auto shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 text-center">
            Experimental Setup: Sealed Drainage Systems
          </div>
          <svg viewBox="0 0 700 320" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.9" />
              </linearGradient>
            </defs>

            {/* System A */}
            <g transform="translate(40, 20)">
              <text x="80" y="15" textAnchor="middle" className="text-base font-bold fill-slate-800 dark:fill-slate-100">A</text>
              {/* Stand */}
              <line x1="20" y1="30" x2="20" y2="260" stroke="#475569" strokeWidth="4" />
              <rect x="5" y="258" width="150" height="10" rx="3" fill="#334155" />
              <rect x="15" y="60" width="30" height="8" fill="#64748b" />
              {/* Funnel Clamp */}
              <line x1="25" y1="64" x2="60" y2="64" stroke="#64748b" strokeWidth="4" />
              {/* Funnel Body */}
              <polygon points="50,60 130,60 100,140 80,140" fill="url(#waterGrad)" stroke="#1e293b" strokeWidth="2" />
              {/* Top stopper */}
              <rect x="46" y="52" width="88" height="8" rx="2" fill="#0f172a" />
              {/* Funnel stem */}
              <rect x="85" y="140" width="10" height="60" fill="none" stroke="#1e293b" strokeWidth="2" />
              {/* Beaker */}
              <rect x="60" y="190" width="60" height="65" rx="3" fill="none" stroke="#334155" strokeWidth="2.5" />
              <path d="M 60 190 Q 55 190 55 186" stroke="#334155" strokeWidth="2" fill="none" />
              {/* Water in beaker */}
              <rect x="62" y="235" width="56" height="18" fill="url(#waterGrad)" opacity="0.6" />
            </g>

            {/* System B */}
            <g transform="translate(260, 20)">
              <text x="80" y="15" textAnchor="middle" className="text-base font-bold fill-slate-800 dark:fill-slate-100">B</text>
              {/* Stand */}
              <line x1="20" y1="30" x2="20" y2="260" stroke="#475569" strokeWidth="4" />
              <rect x="5" y="258" width="150" height="10" rx="3" fill="#334155" />
              <rect x="15" y="60" width="30" height="8" fill="#64748b" />
              <line x1="25" y1="64" x2="60" y2="64" stroke="#64748b" strokeWidth="4" />
              {/* Funnel Body */}
              <polygon points="50,60 130,60 100,140 80,140" fill="url(#waterGrad)" stroke="#1e293b" strokeWidth="2" />
              <rect x="46" y="52" width="88" height="8" rx="2" fill="#0f172a" />
              {/* Funnel stem deep into beaker */}
              <rect x="85" y="140" width="10" height="95" fill="none" stroke="#1e293b" strokeWidth="2" />
              {/* Beaker */}
              <rect x="60" y="190" width="60" height="65" rx="3" fill="none" stroke="#334155" strokeWidth="2.5" />
              <path d="M 60 190 Q 55 190 55 186" stroke="#334155" strokeWidth="2" fill="none" />
              <rect x="62" y="225" width="56" height="28" fill="url(#waterGrad)" opacity="0.6" />
            </g>

            {/* System C */}
            <g transform="translate(480, 20)">
              <text x="80" y="15" textAnchor="middle" className="text-base font-bold fill-slate-800 dark:fill-slate-100">C</text>
              {/* Stand */}
              <line x1="20" y1="30" x2="20" y2="260" stroke="#475569" strokeWidth="4" />
              <rect x="5" y="258" width="150" height="10" rx="3" fill="#334155" />
              <rect x="15" y="60" width="30" height="8" fill="#64748b" />
              <line x1="25" y1="64" x2="60" y2="64" stroke="#64748b" strokeWidth="4" />
              {/* Funnel Body */}
              <polygon points="50,60 130,60 100,140 80,140" fill="url(#waterGrad)" stroke="#1e293b" strokeWidth="2" />
              <rect x="46" y="52" width="88" height="8" rx="2" fill="#0f172a" />
              {/* Double tube: Drain stem + Air equalization bypass tube */}
              <rect x="82" y="140" width="8" height="75" fill="none" stroke="#1e293b" strokeWidth="2" />
              <rect x="92" y="130" width="6" height="90" fill="none" stroke="#2563eb" strokeWidth="2" strokeDasharray="3 2" />
              <text x="110" y="170" className="text-[10px] fill-blue-600 font-semibold">air inlet</text>
              {/* Beaker */}
              <rect x="60" y="190" width="60" height="65" rx="3" fill="none" stroke="#334155" strokeWidth="2.5" />
              <path d="M 60 190 Q 55 190 55 186" stroke="#334155" strokeWidth="2" fill="none" />
              <rect x="62" y="215" width="56" height="38" fill="url(#waterGrad)" opacity="0.6" />
            </g>
          </svg>
        </div>
      );

    case 'Q4_PATTERN_GRID':
      return (
        <div className="my-6 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl max-w-xl mx-auto shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 text-center">
            Pattern Completion Problem
          </div>
          <svg viewBox="0 0 540 180" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            {/* Main 2x2 Question Grid */}
            <g transform="translate(30, 25)">
              <rect x="0" y="0" width="120" height="120" fill="white" stroke="#0f172a" strokeWidth="3" />
              <line x1="60" y1="0" x2="60" y2="120" stroke="#0f172a" strokeWidth="2" />
              <line x1="0" y1="60" x2="120" y2="60" stroke="#0f172a" strokeWidth="2" />

              {/* Top-Left Quadrant */}
              <g clipPath="url(#q4-tl)">
                <line x1="0" y1="20" x2="60" y2="40" stroke="#0f172a" strokeWidth="4" />
                <line x1="0" y1="40" x2="60" y2="60" stroke="#0f172a" strokeWidth="4" />
                <line x1="0" y1="0" x2="60" y2="20" stroke="#0f172a" strokeWidth="4" />
              </g>
              {/* Top-Right Quadrant */}
              <g>
                <line x1="60" y1="20" x2="120" y2="0" stroke="#0f172a" strokeWidth="4" />
                <line x1="60" y1="40" x2="120" y2="20" stroke="#0f172a" strokeWidth="4" />
                <line x1="60" y1="60" x2="120" y2="40" stroke="#0f172a" strokeWidth="4" />
              </g>
              {/* Bottom-Left Quadrant */}
              <g>
                <line x1="0" y1="80" x2="60" y2="100" stroke="#0f172a" strokeWidth="4" />
                <line x1="0" y1="100" x2="60" y2="120" stroke="#0f172a" strokeWidth="4" />
                <line x1="0" y1="60" x2="60" y2="80" stroke="#0f172a" strokeWidth="4" />
              </g>
              {/* Bottom-Right: Question Mark */}
              <rect x="60" y="60" width="60" height="60" fill="#f8fafc" />
              <text x="90" y="98" textAnchor="middle" className="text-3xl font-extrabold fill-slate-700">?</text>
            </g>

            {/* Candidate Options 1, 2, 3, 4 */}
            {/* Option 1 */}
            <g transform="translate(190, 50)">
              <rect x="0" y="0" width="65" height="65" fill="white" stroke="#0f172a" strokeWidth="2.5" />
              <line x1="0" y1="20" x2="65" y2="45" stroke="#0f172a" strokeWidth="3" />
              <line x1="0" y1="45" x2="65" y2="65" stroke="#0f172a" strokeWidth="3" />
              <text x="32" y="85" textAnchor="middle" className="text-sm font-bold fill-slate-700">1</text>
            </g>

            {/* Option 2 */}
            <g transform="translate(275, 50)">
              <rect x="0" y="0" width="65" height="65" fill="white" stroke="#0f172a" strokeWidth="2.5" />
              <line x1="20" y1="0" x2="45" y2="65" stroke="#0f172a" strokeWidth="3" />
              <line x1="45" y1="0" x2="65" y2="65" stroke="#0f172a" strokeWidth="3" />
              <text x="32" y="85" textAnchor="middle" className="text-sm font-bold fill-slate-700">2</text>
            </g>

            {/* Option 3 */}
            <g transform="translate(360, 50)">
              <rect x="0" y="0" width="65" height="65" fill="white" stroke="#0f172a" strokeWidth="2.5" />
              <line x1="0" y1="0" x2="65" y2="65" stroke="#0f172a" strokeWidth="3" />
              <line x1="0" y1="35" x2="35" y2="65" stroke="#0f172a" strokeWidth="3" />
              <text x="32" y="85" textAnchor="middle" className="text-sm font-bold fill-slate-700">3</text>
            </g>

            {/* Option 4 (Correct) */}
            <g transform="translate(445, 50)">
              <rect x="0" y="0" width="65" height="65" fill="white" stroke="#0f172a" strokeWidth="2.5" />
              <line x1="0" y1="45" x2="65" y2="25" stroke="#0f172a" strokeWidth="3.5" />
              <line x1="0" y1="20" x2="65" y2="0" stroke="#0f172a" strokeWidth="3.5" />
              <line x1="0" y1="65" x2="65" y2="45" stroke="#0f172a" strokeWidth="3.5" />
              <text x="32" y="85" textAnchor="middle" className="text-sm font-bold fill-slate-700">4</text>
            </g>
          </svg>
        </div>
      );

    case 'Q5_ROTATED_POLYGON':
      return (
        <div className="my-6 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl max-w-xl mx-auto shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 text-center">
            Spatial Rotation Problem
          </div>
          <svg viewBox="0 0 540 180" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            {/* Given Polygon Figure */}
            <g transform="translate(40, 30)">
              <text x="45" y="-10" textAnchor="middle" className="text-xs font-bold fill-slate-500">Given Figure</text>
              <polygon points="45,15 80,45 65,90 25,90 10,45" fill="none" stroke="#0f172a" strokeWidth="3" />
              {/* Attachments */}
              <circle cx="10" cy="45" r="8" fill="#0f172a" />
              <circle cx="80" cy="45" r="7" fill="white" stroke="#0f172a" strokeWidth="2.5" />
              <polygon points="45,5 40,15 50,15" fill="white" stroke="#0f172a" strokeWidth="2" />
              <circle cx="45" cy="100" r="8" fill="#0f172a" />
            </g>

            {/* Option A */}
            <g transform="translate(160, 40)">
              <text x="40" y="-12" textAnchor="middle" className="text-sm font-bold fill-slate-700">A.</text>
              <polygon points="40,20 75,45 60,85 20,85 5,45" fill="none" stroke="#0f172a" strokeWidth="2.5" />
              <circle cx="40" cy="10" r="7" fill="#0f172a" />
              <rect x="0" y="40" width="10" height="10" fill="#0f172a" />
              <circle cx="70" cy="80" r="6" fill="white" stroke="#0f172a" strokeWidth="2" />
            </g>

            {/* Option B */}
            <g transform="translate(255, 40)">
              <text x="40" y="-12" textAnchor="middle" className="text-sm font-bold fill-slate-700">B.</text>
              <polygon points="40,20 75,45 60,85 20,85 5,45" fill="none" stroke="#0f172a" strokeWidth="2.5" />
              <circle cx="40" cy="10" r="6" fill="white" stroke="#0f172a" strokeWidth="2" />
              <rect x="5" y="45" width="10" height="10" fill="white" stroke="#0f172a" strokeWidth="2" />
              <circle cx="40" cy="95" r="7" fill="#0f172a" />
            </g>

            {/* Option C (Correct) */}
            <g transform="translate(350, 40)">
              <text x="40" y="-12" textAnchor="middle" className="text-sm font-bold fill-slate-700">C.</text>
              <polygon points="40,20 75,45 60,85 20,85 5,45" fill="none" stroke="#0f172a" strokeWidth="2.5" />
              <circle cx="40" cy="10" r="7" fill="#0f172a" />
              <circle cx="40" cy="95" r="6" fill="white" stroke="#0f172a" strokeWidth="2" />
              <rect x="0" y="42" width="10" height="10" fill="white" stroke="#0f172a" strokeWidth="2" />
              <rect x="70" y="42" width="10" height="10" fill="#0f172a" />
            </g>

            {/* Option D */}
            <g transform="translate(445, 40)">
              <text x="40" y="-12" textAnchor="middle" className="text-sm font-bold fill-slate-700">D.</text>
              <polygon points="40,20 75,45 60,85 20,85 5,45" fill="none" stroke="#0f172a" strokeWidth="2.5" />
              <rect x="35" y="5" width="10" height="10" fill="#0f172a" />
              <circle cx="75" cy="45" r="7" fill="#0f172a" />
              <circle cx="5" cy="45" r="6" fill="white" stroke="#0f172a" strokeWidth="2" />
            </g>
          </svg>
        </div>
      );

    case 'Q7_OIL_WATER':
      return (
        <div className="my-6 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl max-w-xl mx-auto shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 text-center">
            Fluid Immiscibility & Density
          </div>
          <svg viewBox="0 0 540 160" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            {/* Initial beaker */}
            <g transform="translate(30, 20)">
              <text x="45" y="-6" textAnchor="middle" className="text-xs font-bold fill-slate-500">Initial</text>
              <rect x="10" y="10" width="70" height="90" rx="3" fill="none" stroke="#0f172a" strokeWidth="2" />
              <path d="M 80 20 C 100 20, 100 70, 80 80" stroke="#0f172a" strokeWidth="2" fill="none" />
              {/* Layers */}
              <rect x="11" y="40" width="68" height="30" fill="#fef08a" opacity="0.8" />
              <rect x="11" y="70" width="68" height="29" fill="#93c5fd" opacity="0.8" />
              <text x="45" y="58" textAnchor="middle" className="text-xs font-bold fill-amber-900">Oil</text>
              <text x="45" y="88" textAnchor="middle" className="text-xs font-bold fill-blue-900">Water</text>
            </g>

            {/* Option A */}
            <g transform="translate(160, 20)">
              <text x="45" y="-6" textAnchor="middle" className="text-sm font-bold fill-slate-700">A</text>
              <rect x="10" y="10" width="70" height="90" rx="3" fill="none" stroke="#0f172a" strokeWidth="2" />
              <path d="M 80 20 C 100 20, 100 70, 80 80" stroke="#0f172a" strokeWidth="2" fill="none" />
              <rect x="11" y="25" width="68" height="40" fill="#cbd5e1" opacity="0.8" />
              <rect x="11" y="65" width="68" height="34" fill="#93c5fd" opacity="0.8" />
              <text x="45" y="42" textAnchor="middle" className="text-[10px] font-bold fill-slate-800">Oil & Water</text>
              <text x="45" y="85" textAnchor="middle" className="text-xs font-bold fill-blue-900">Water</text>
            </g>

            {/* Option B */}
            <g transform="translate(290, 20)">
              <text x="45" y="-6" textAnchor="middle" className="text-sm font-bold fill-slate-700">B</text>
              <rect x="10" y="10" width="70" height="90" rx="3" fill="none" stroke="#0f172a" strokeWidth="2" />
              <path d="M 80 20 C 100 20, 100 70, 80 80" stroke="#0f172a" strokeWidth="2" fill="none" />
              <rect x="11" y="25" width="68" height="25" fill="#93c5fd" opacity="0.8" />
              <rect x="11" y="50" width="68" height="25" fill="#fef08a" opacity="0.8" />
              <rect x="11" y="75" width="68" height="24" fill="#93c5fd" opacity="0.8" />
              <text x="45" y="41" textAnchor="middle" className="text-[10px] font-bold fill-blue-900">Water</text>
              <text x="45" y="66" textAnchor="middle" className="text-[10px] font-bold fill-amber-900">Oil</text>
              <text x="45" y="90" textAnchor="middle" className="text-[10px] font-bold fill-blue-900">Water</text>
            </g>

            {/* Option C (Correct) */}
            <g transform="translate(420, 20)">
              <text x="45" y="-6" textAnchor="middle" className="text-sm font-bold fill-slate-700">C</text>
              <rect x="10" y="10" width="70" height="90" rx="3" fill="none" stroke="#0f172a" strokeWidth="2" />
              <path d="M 80 20 C 100 20, 100 70, 80 80" stroke="#0f172a" strokeWidth="2" fill="none" />
              <rect x="11" y="25" width="68" height="35" fill="#fef08a" opacity="0.8" />
              <rect x="11" y="60" width="68" height="39" fill="#93c5fd" opacity="0.8" />
              <text x="45" y="47" textAnchor="middle" className="text-xs font-bold fill-amber-900">Oil</text>
              <text x="45" y="82" textAnchor="middle" className="text-xs font-bold fill-blue-900">Water</text>
            </g>
          </svg>
        </div>
      );

    case 'Q8_SOLID_ROTATION':
      return (
        <div className="my-6 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl max-w-xl mx-auto shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 text-center">
            3D Solid Spatial Rotation
          </div>
          <svg viewBox="0 0 540 180" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            {/* Original Solid */}
            <g transform="translate(40, 20)">
              <text x="50" y="5" textAnchor="middle" className="text-xs font-bold fill-slate-500">Given Solid</text>
              <path d="M 15 80 L 15 105 L 25 105 L 25 90 L 70 90 L 70 105 L 80 105 L 80 70 L 40 40 L 15 80 Z" fill="#e2e8f0" stroke="#0f172a" strokeWidth="2.5" />
              <polygon points="40,40 85,25 95,55 80,70" fill="#cbd5e1" stroke="#0f172a" strokeWidth="2" />
            </g>

            {/* A */}
            <g transform="translate(160, 40)">
              <text x="35" y="-10" textAnchor="middle" className="text-sm font-bold fill-slate-700">A.</text>
              <path d="M 10 50 L 50 20 L 75 35 L 35 65 Z" fill="#cbd5e1" stroke="#0f172a" strokeWidth="2" />
              <path d="M 10 50 L 10 70 L 35 85 L 35 65 Z" fill="#e2e8f0" stroke="#0f172a" strokeWidth="2" />
            </g>

            {/* B (Correct) */}
            <g transform="translate(255, 40)">
              <text x="35" y="-10" textAnchor="middle" className="text-sm font-bold fill-slate-700">B.</text>
              <path d="M 10 40 L 55 55 L 75 35 L 30 20 Z" fill="#cbd5e1" stroke="#0f172a" strokeWidth="2" />
              <path d="M 10 40 L 10 65 L 20 65 L 20 55 L 55 55 L 55 65 Z" fill="#e2e8f0" stroke="#0f172a" strokeWidth="2" />
            </g>

            {/* C */}
            <g transform="translate(350, 40)">
              <text x="35" y="-10" textAnchor="middle" className="text-sm font-bold fill-slate-700">C.</text>
              <path d="M 15 60 L 55 25 L 70 35 L 30 70 Z" fill="#cbd5e1" stroke="#0f172a" strokeWidth="2" />
            </g>

            {/* D */}
            <g transform="translate(445, 40)">
              <text x="35" y="-10" textAnchor="middle" className="text-sm font-bold fill-slate-700">D.</text>
              <path d="M 15 70 L 45 40 L 45 70 L 15 90 Z" fill="#cbd5e1" stroke="#0f172a" strokeWidth="2" />
            </g>
          </svg>
        </div>
      );

    case 'Q9_NET_FOLD':
      return (
        <div className="my-6 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl max-w-xl mx-auto shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 text-center">
            Cube Net Folding (X)
          </div>
          <svg viewBox="0 0 540 180" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            {/* Unfolded Net X */}
            <g transform="translate(30, 20)">
              <text x="50" y="125" textAnchor="middle" className="text-sm font-bold fill-slate-700">(X)</text>
              {/* Row 1 */}
              <rect x="35" y="10" width="30" height="30" fill="white" stroke="#0f172a" strokeWidth="2" />
              <polygon points="35,10 65,10 65,40" fill="#0f172a" />
              {/* Row 2 */}
              <rect x="5" y="40" width="30" height="30" fill="white" stroke="#0f172a" strokeWidth="2" />
              <rect x="35" y="40" width="30" height="30" fill="white" stroke="#0f172a" strokeWidth="2" />
              <rect x="65" y="40" width="30" height="30" fill="white" stroke="#0f172a" strokeWidth="2" />
              {/* Row 3 */}
              <rect x="35" y="70" width="30" height="30" fill="white" stroke="#0f172a" strokeWidth="2" />
              <polygon points="35,70 65,100 35,100" fill="#0f172a" />
            </g>

            {/* Box (1) */}
            <g transform="translate(160, 40)">
              <text x="35" y="95" textAnchor="middle" className="text-sm font-bold fill-slate-700">(1)</text>
              <polygon points="35,10 65,25 35,40 5,25" fill="white" stroke="#0f172a" strokeWidth="2" />
              <polygon points="5,25 35,40 35,75 5,60" fill="white" stroke="#0f172a" strokeWidth="2" />
              <polygon points="35,40 65,25 65,60 35,75" fill="white" stroke="#0f172a" strokeWidth="2" />
              <polygon points="35,10 50,17 35,40" fill="#0f172a" />
            </g>

            {/* Box (2) */}
            <g transform="translate(255, 40)">
              <text x="35" y="95" textAnchor="middle" className="text-sm font-bold fill-slate-700">(2)</text>
              <polygon points="35,10 65,25 35,40 5,25" fill="white" stroke="#0f172a" strokeWidth="2" />
              <polygon points="5,25 35,40 35,75 5,60" fill="#0f172a" stroke="#0f172a" strokeWidth="2" />
              <polygon points="35,40 65,25 65,60 35,75" fill="white" stroke="#0f172a" strokeWidth="2" />
            </g>

            {/* Box (3) */}
            <g transform="translate(350, 40)">
              <text x="35" y="95" textAnchor="middle" className="text-sm font-bold fill-slate-700">(3)</text>
              <polygon points="35,10 65,25 35,40 5,25" fill="white" stroke="#0f172a" strokeWidth="2" />
              <polygon points="5,25 35,40 35,75 5,60" fill="white" stroke="#0f172a" strokeWidth="2" />
              <polygon points="35,40 65,25 65,60 35,75" fill="#0f172a" stroke="#0f172a" strokeWidth="2" />
            </g>

            {/* Box (4) */}
            <g transform="translate(445, 40)">
              <text x="35" y="95" textAnchor="middle" className="text-sm font-bold fill-slate-700">(4)</text>
              <polygon points="35,10 65,25 35,40 5,25" fill="white" stroke="#0f172a" strokeWidth="2" />
              <polygon points="5,25 35,40 35,75 5,60" fill="white" stroke="#0f172a" strokeWidth="2" />
              <polygon points="35,40 65,25 65,60 35,75" fill="white" stroke="#0f172a" strokeWidth="2" />
              <polygon points="5,25 20,32 5,60" fill="#0f172a" />
            </g>
          </svg>
        </div>
      );

    case 'Q10_FRONT_VIEW':
      return (
        <div className="my-6 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl max-w-xl mx-auto shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 text-center">
            Orthographic Front View Projection
          </div>
          <svg viewBox="0 0 540 160" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            {/* 3D Stepped Solid */}
            <g transform="translate(30, 20)">
              <text x="45" y="5" textAnchor="middle" className="text-xs font-bold fill-slate-500">3D Object</text>
              <polygon points="15,60 45,40 75,40 75,70 45,90 15,90" fill="#cbd5e1" stroke="#0f172a" strokeWidth="2" />
              <line x1="45" y1="40" x2="45" y2="90" stroke="#0f172a" strokeWidth="2" />
              <polygon points="45,40 75,40 90,20 60,20" fill="#e2e8f0" stroke="#0f172a" strokeWidth="2" />
              {/* Arrow indicating front view */}
              <line x1="10" y1="110" x2="35" y2="90" stroke="#2563eb" strokeWidth="2.5" markerEnd="url(#arrow)" />
              <text x="15" y="125" className="text-[10px] font-bold fill-blue-600">Front</text>
            </g>

            {/* Figure A */}
            <g transform="translate(160, 40)">
              <text x="30" y="-10" textAnchor="middle" className="text-sm font-bold fill-slate-700">Figure A</text>
              <rect x="10" y="10" width="40" height="60" fill="none" stroke="#0f172a" strokeWidth="2" />
              <line x1="10" y1="40" x2="50" y2="40" stroke="#0f172a" strokeWidth="2" />
            </g>

            {/* Figure B */}
            <g transform="translate(255, 40)">
              <text x="30" y="-10" textAnchor="middle" className="text-sm font-bold fill-slate-700">Figure B</text>
              <rect x="10" y="10" width="40" height="60" fill="none" stroke="#0f172a" strokeWidth="2" />
              <line x1="30" y1="10" x2="30" y2="70" stroke="#0f172a" strokeWidth="2" />
            </g>

            {/* Figure C */}
            <g transform="translate(350, 40)">
              <text x="30" y="-10" textAnchor="middle" className="text-sm font-bold fill-slate-700">Figure C</text>
              <path d="M 10 30 L 30 30 L 30 10 L 50 10 L 50 70 L 10 70 Z" fill="none" stroke="#0f172a" strokeWidth="2" />
            </g>

            {/* Figure D (Correct) */}
            <g transform="translate(445, 40)">
              <text x="30" y="-10" textAnchor="middle" className="text-sm font-bold fill-slate-700">Figure D</text>
              <rect x="10" y="10" width="40" height="60" fill="none" stroke="#0f172a" strokeWidth="2" />
              <line x1="10" y1="40" x2="30" y2="40" stroke="#0f172a" strokeWidth="2" />
              <line x1="30" y1="10" x2="30" y2="70" stroke="#0f172a" strokeWidth="2" />
            </g>
          </svg>
        </div>
      );

    case 'Q14_PAPER_FOLD_HOLES':
      return (
        <div className="my-6 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl max-w-xl mx-auto shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 text-center">
            Paper Folding & Punching
          </div>
          <svg viewBox="0 0 540 160" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            {/* Sheet with 2 circular holes */}
            <g transform="translate(30, 20)">
              <text x="45" y="0" textAnchor="middle" className="text-xs font-bold fill-slate-500">Unfolded Sheet</text>
              <rect x="5" y="10" width="80" height="80" fill="#f8fafc" stroke="#0f172a" strokeWidth="2" />
              <line x1="45" y1="10" x2="45" y2="90" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 3" />
              <line x1="5" y1="50" x2="85" y2="50" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 3" />
              {/* Diagonally opposite holes */}
              <circle cx="25" cy="30" r="6" fill="#0f172a" />
              <circle cx="65" cy="70" r="6" fill="#0f172a" />
            </g>

            {/* A */}
            <g transform="translate(160, 35)">
              <text x="25" y="-10" textAnchor="middle" className="text-sm font-bold fill-slate-700">Figure A</text>
              <rect x="5" y="10" width="40" height="40" fill="#f8fafc" stroke="#0f172a" strokeWidth="2" />
              <circle cx="25" cy="20" r="5" fill="#0f172a" />
              <circle cx="25" cy="40" r="5" fill="#0f172a" />
            </g>

            {/* B (Correct) */}
            <g transform="translate(255, 35)">
              <text x="25" y="-10" textAnchor="middle" className="text-sm font-bold fill-slate-700">Figure B</text>
              <rect x="5" y="10" width="40" height="40" fill="#f8fafc" stroke="#0f172a" strokeWidth="2" />
              <circle cx="16" cy="20" r="5" fill="#0f172a" />
              <circle cx="34" cy="40" r="5" fill="#0f172a" />
            </g>

            {/* C */}
            <g transform="translate(350, 35)">
              <text x="25" y="-10" textAnchor="middle" className="text-sm font-bold fill-slate-700">Figure C</text>
              <rect x="5" y="10" width="40" height="40" fill="#f8fafc" stroke="#0f172a" strokeWidth="2" />
              <circle cx="16" cy="30" r="5" fill="#0f172a" />
              <circle cx="34" cy="30" r="5" fill="#0f172a" />
            </g>

            {/* D */}
            <g transform="translate(445, 35)">
              <text x="25" y="-10" textAnchor="middle" className="text-sm font-bold fill-slate-700">Figure D</text>
              <rect x="5" y="10" width="40" height="40" fill="#f8fafc" stroke="#0f172a" strokeWidth="2" />
              <circle cx="25" cy="30" r="6" fill="#0f172a" />
            </g>
          </svg>
        </div>
      );

    case 'Q15_PULLEY_BLOCKS':
      return (
        <div className="my-6 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl max-w-lg mx-auto shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 text-center">
            Single Fixed Pulley System
          </div>
          <svg viewBox="0 0 420 200" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            {/* Table Surface */}
            <line x1="40" y1="90" x2="280" y2="90" stroke="#334155" strokeWidth="4" />
            <line x1="280" y1="90" x2="280" y2="180" stroke="#334155" strokeWidth="4" />

            {/* Block #1 on table */}
            <rect x="90" y="55" width="50" height="35" rx="3" fill="#cbd5e1" stroke="#0f172a" strokeWidth="2.5" />
            <text x="115" y="77" textAnchor="middle" className="text-xs font-bold fill-slate-800">#1</text>

            {/* Motion arrow for Block 1 */}
            <line x1="145" y1="72" x2="185" y2="72" stroke="#2563eb" strokeWidth="2.5" markerEnd="url(#arrowBlue)" />
            <text x="165" y="60" textAnchor="middle" className="text-[10px] font-bold fill-blue-600">10 ft right</text>

            {/* Fixed Pulley */}
            <circle cx="280" cy="85" r="14" fill="#64748b" stroke="#0f172a" strokeWidth="2.5" />
            <circle cx="280" cy="85" r="4" fill="#0f172a" />

            {/* Cable from Block 1 over Pulley to Block 2 */}
            <line x1="140" y1="72" x2="280" y2="72" stroke="#0f172a" strokeWidth="2.5" />
            <line x1="294" y1="85" x2="294" y2="140" stroke="#0f172a" strokeWidth="2.5" />

            {/* Hanging Block #2 */}
            <rect x="274" y="140" width="40" height="35" rx="3" fill="#cbd5e1" stroke="#0f172a" strokeWidth="2.5" />
            <text x="294" y="162" textAnchor="middle" className="text-xs font-bold fill-slate-800">#2</text>

            {/* Arrow for Block 2 movement */}
            <line x1="330" y1="165" x2="330" y2="135" stroke="#2563eb" strokeWidth="2.5" markerEnd="url(#arrowBlue)" />
            <text x="355" y="152" className="text-[10px] font-bold fill-blue-600">lift ?</text>
          </svg>
        </div>
      );

    case 'Q17_PATTERN_MATRIX':
      return (
        <div className="my-6 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl max-w-xl mx-auto shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 text-center">
            Matrix Pattern Continuity
          </div>
          <svg viewBox="0 0 540 180" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            {/* 3x3 Grid */}
            <g transform="translate(30, 20)">
              <rect x="0" y="0" width="120" height="120" fill="white" stroke="#0f172a" strokeWidth="3" />
              <line x1="40" y1="0" x2="40" y2="120" stroke="#0f172a" strokeWidth="1.5" />
              <line x1="80" y1="0" x2="80" y2="120" stroke="#0f172a" strokeWidth="1.5" />
              <line x1="0" y1="40" x2="120" y2="40" stroke="#0f172a" strokeWidth="1.5" />
              <line x1="0" y1="80" x2="120" y2="80" stroke="#0f172a" strokeWidth="1.5" />

              {/* Diagonal progression elements */}
              <circle cx="20" cy="20" r="10" fill="#0f172a" />
              <rect x="48" y="8" width="24" height="24" fill="white" stroke="#0f172a" strokeWidth="2" />
              <polygon points="100,8 88,32 112,32" fill="#0f172a" />

              <rect x="8" y="48" width="24" height="24" fill="white" stroke="#0f172a" strokeWidth="2" />
              <polygon points="60,48 48,72 72,72" fill="#0f172a" />
              <circle cx="100" cy="60" r="10" fill="white" stroke="#0f172a" strokeWidth="2" />

              <polygon points="20,88 8,112 32,112" fill="#0f172a" />
              <circle cx="60" cy="100" r="10" fill="white" stroke="#0f172a" strokeWidth="2" />
              {/* Missing Cell */}
              <rect x="80" y="80" width="40" height="40" fill="#f1f5f9" />
              <text x="100" y="106" textAnchor="middle" className="text-xl font-bold fill-slate-700">?</text>
            </g>

            {/* Candidate Frames */}
            <g transform="translate(180, 50)">
              <text x="25" y="-10" textAnchor="middle" className="text-xs font-bold fill-slate-700">Figure A</text>
              <rect x="5" y="10" width="40" height="40" fill="white" stroke="#0f172a" strokeWidth="2" />
              <circle cx="25" cy="30" r="10" fill="#0f172a" />
            </g>

            <g transform="translate(265, 50)">
              <text x="25" y="-10" textAnchor="middle" className="text-xs font-bold fill-slate-700">Figure B</text>
              <rect x="5" y="10" width="40" height="40" fill="white" stroke="#0f172a" strokeWidth="2" />
              <polygon points="25,16 13,38 37,38" fill="white" stroke="#0f172a" strokeWidth="2" />
            </g>

            <g transform="translate(350, 50)">
              <text x="25" y="-10" textAnchor="middle" className="text-xs font-bold fill-slate-700">Figure C</text>
              <rect x="5" y="10" width="40" height="40" fill="white" stroke="#0f172a" strokeWidth="2" />
              <rect x="13" y="18" width="24" height="24" fill="#0f172a" />
            </g>

            <g transform="translate(435, 50)">
              <text x="25" y="-10" textAnchor="middle" className="text-xs font-bold fill-slate-700">Figure D</text>
              <rect x="5" y="10" width="40" height="40" fill="white" stroke="#0f172a" strokeWidth="2" />
              <polygon points="25,16 13,38 37,38" fill="#0f172a" />
            </g>
          </svg>
        </div>
      );

    case 'Q19_MIRROR_IMAGE':
      return (
        <div className="my-6 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl max-w-xl mx-auto shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 text-center">
            Vertical Lateral Inversion (Mirror Image)
          </div>
          <div className="flex items-center justify-center gap-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
            <span className="text-2xl font-black tracking-widest text-slate-800 dark:text-slate-100 font-mono">
              EFFECTIVE
            </span>
            <div className="h-10 w-1 bg-red-500 relative flex items-center justify-center">
              <span className="absolute -top-5 text-[10px] text-red-500 font-bold">Mirror</span>
            </div>
            <span className="text-xl text-slate-400 font-bold">➔</span>
            <div className="text-sm font-semibold text-slate-600 dark:text-slate-300">
              Find the reflected word combination
            </div>
          </div>
        </div>
      );

    case 'Q20_PUNCH_HOLE_UNFOLD':
      return (
        <div className="my-6 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl max-w-xl mx-auto shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 text-center">
            Fold & Hole Punch Stages (X ➔ Y ➔ Z)
          </div>
          <svg viewBox="0 0 540 150" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            {/* Step X */}
            <g transform="translate(40, 25)">
              <text x="35" y="85" textAnchor="middle" className="text-xs font-bold fill-slate-700">X</text>
              <rect x="10" y="10" width="50" height="50" fill="white" stroke="#0f172a" strokeWidth="2" />
              <line x1="10" y1="10" x2="60" y2="60" stroke="#2563eb" strokeDasharray="3 2" strokeWidth="2" />
            </g>

            {/* Step Y */}
            <g transform="translate(130, 25)">
              <text x="35" y="85" textAnchor="middle" className="text-xs font-bold fill-slate-700">Y</text>
              <polygon points="10,10 60,10 60,60" fill="#e2e8f0" stroke="#0f172a" strokeWidth="2" />
              <line x1="10" y1="10" x2="60" y2="10" stroke="#2563eb" strokeDasharray="3 2" strokeWidth="2" />
            </g>

            {/* Step Z */}
            <g transform="translate(220, 25)">
              <text x="35" y="85" textAnchor="middle" className="text-xs font-bold fill-slate-700">Z</text>
              <polygon points="10,10 60,10 35,45" fill="#cbd5e1" stroke="#0f172a" strokeWidth="2" />
              <circle cx="35" cy="25" r="4" fill="#0f172a" />
              <circle cx="45" cy="18" r="4" fill="#0f172a" />
            </g>

            {/* Result Indicator */}
            <text x="310" y="60" className="text-xl font-bold fill-slate-400">➔</text>
            <text x="340" y="55" className="text-xs font-bold fill-slate-600">Which unfolded pattern (1-4)?</text>
          </svg>
        </div>
      );

    case 'Q83_TANGENTS':
      return (
        <div className="my-6 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl max-w-lg mx-auto shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 text-center">
            Circle Tangent Properties: Quadrilateral ABCD
          </div>
          <svg viewBox="0 0 460 260" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            {/* Circle centered at A */}
            <circle cx="150" cy="130" r="75" fill="none" stroke="#2563eb" strokeWidth="2.5" />
            <circle cx="150" cy="130" r="4" fill="#1e293b" />
            <text x="135" y="135" className="text-sm font-bold fill-slate-800 dark:fill-slate-100">A</text>

            {/* External Point C */}
            <circle cx="380" cy="130" r="4" fill="#1e293b" />
            <text x="390" y="135" className="text-sm font-bold fill-slate-800 dark:fill-slate-100">C</text>

            {/* Tangent points B and D */}
            {/* B is top tangent */}
            <circle cx="178" cy="61" r="4" fill="#1e293b" />
            <text x="175" y="48" className="text-sm font-bold fill-slate-800 dark:fill-slate-100">B</text>

            {/* D is bottom tangent */}
            <circle cx="178" cy="199" r="4" fill="#1e293b" />
            <text x="175" y="222" className="text-sm font-bold fill-slate-800 dark:fill-slate-100">D</text>

            {/* Radii AB and AD */}
            <line x1="150" y1="130" x2="178" y2="61" stroke="#64748b" strokeWidth="2" strokeDasharray="4 2" />
            <line x1="150" y1="130" x2="178" y2="199" stroke="#64748b" strokeWidth="2" strokeDasharray="4 2" />

            {/* Tangent lines CB and CD */}
            <line x1="380" y1="130" x2="178" y2="61" stroke="#0f172a" strokeWidth="2.5" />
            <line x1="380" y1="130" x2="178" y2="199" stroke="#0f172a" strokeWidth="2.5" />

            {/* Right angle symbols at B and D */}
            <path d="M 183 73 L 173 77 L 168 65" fill="none" stroke="#dc2626" strokeWidth="2" />
            <text x="190" y="85" className="text-[10px] font-bold fill-red-600">90°</text>

            <path d="M 183 187 L 173 183 L 168 195" fill="none" stroke="#dc2626" strokeWidth="2" />
            <text x="190" y="185" className="text-[10px] font-bold fill-red-600">90°</text>

            {/* Angle BCD at C */}
            <path d="M 350 120 A 30 30 0 0 1 350 140" fill="none" stroke="#059669" strokeWidth="2" />
            <text x="320" y="134" className="text-xs font-bold fill-emerald-600">24°</text>

            {/* Angle BAD at A */}
            <path d="M 165 95 A 40 40 0 0 1 165 165" fill="none" stroke="#7c3aed" strokeWidth="2.5" />
            <text x="180" y="135" className="text-xs font-bold fill-purple-700">∠A = ?</text>
          </svg>
        </div>
      );

    case 'Q96_INTERSECTING_LINES':
      return (
        <div className="my-6 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl max-w-lg mx-auto shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 text-center">
            Intersecting Lines AB and CD at Point E
          </div>
          <svg viewBox="0 0 460 220" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            {/* Line AB */}
            <line x1="40" y1="160" x2="420" y2="60" stroke="#0f172a" strokeWidth="3" />
            <circle cx="50" cy="157" r="4" fill="#0f172a" />
            <text x="35" y="180" className="text-sm font-bold fill-slate-800">A</text>
            <circle cx="410" cy="63" r="4" fill="#0f172a" />
            <text x="425" y="65" className="text-sm font-bold fill-slate-800">B</text>

            {/* Line CD */}
            <line x1="80" y1="40" x2="380" y2="180" stroke="#0f172a" strokeWidth="3" />
            <circle cx="90" cy="45" r="4" fill="#0f172a" />
            <text x="75" y="35" className="text-sm font-bold fill-slate-800">C</text>
            <circle cx="370" cy="175" r="4" fill="#0f172a" />
            <text x="385" y="195" className="text-sm font-bold fill-slate-800">D</text>

            {/* Intersection E */}
            <circle cx="230" cy="110" r="5" fill="#2563eb" />
            <text x="240" y="105" className="text-base font-extrabold fill-blue-600">E</text>

            {/* Angles labeled around E */}
            <text x="225" y="60" className="text-xs font-semibold fill-slate-600">∠CEB</text>
            <text x="280" y="125" className="text-xs font-semibold fill-slate-600">∠BED</text>
            <text x="225" y="165" className="text-xs font-semibold fill-slate-600">∠AED</text>
            <text x="160" y="100" className="text-xs font-semibold fill-slate-600">∠AEC</text>
          </svg>
        </div>
      );

    default:
      return null;
  }
};
