import React, { useState } from 'react';
import { X, BookOpen, Atom, Calculator, Compass, Sparkles } from 'lucide-react';

interface FormulaSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FormulaSheetModal: React.FC<FormulaSheetModalProps> = ({ isOpen, onClose }) => {
  const [tab, setTab] = useState<'sciences' | 'math' | 'aptitude'>('math');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[88vh] flex flex-col justify-between">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-600">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
              DOST-SEI Formula & Quick Reference Sheet
            </h3>
            <p className="text-xs text-slate-500">
              Essential formulas, constants, and geometric laws appearing in the examination
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 mb-4 text-xs font-bold">
          <button
            onClick={() => setTab('math')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
              tab === 'math'
                ? 'bg-purple-600 text-white'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Mathematics</span>
          </button>

          <button
            onClick={() => setTab('sciences')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
              tab === 'sciences'
                ? 'bg-emerald-600 text-white'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Atom className="w-3.5 h-3.5" />
            <span>General Sciences</span>
          </button>

          <button
            onClick={() => setTab('aptitude')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
              tab === 'aptitude'
                ? 'bg-blue-600 text-white'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Aptitude & Reasoning</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="overflow-y-auto max-h-[50vh] pr-2 space-y-4 text-xs">
          {tab === 'math' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700">
                <h4 className="font-bold text-purple-700 dark:text-purple-300 text-sm mb-2">
                  Trigonometry Identities & Formulas
                </h4>
                <ul className="space-y-1.5 text-slate-700 dark:text-slate-300 font-mono">
                  <li>• Law of Cosines: c² = a² + b² − 2ab cos(C)</li>
                  <li>• Triangle Area with Included Angle: Area = ½ ab sin(C)</li>
                  <li>• Tangent Double Angle: tan(2θ) = 2 tan θ / (1 − tan² θ)</li>
                  <li>• Sum/Difference: sin(x+y)sin(x−y) = sin² x − sin² y</li>
                  <li>• Power Reduction: sin⁴ x = (3 − 4 cos 2x + cos 4x) / 8</li>
                  <li>• Amplitude & Max: Max of a sin x + b cos x + c is √(a² + b²) + c</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700">
                <h4 className="font-bold text-purple-700 dark:text-purple-300 text-sm mb-2">
                  Geometry & Circles
                </h4>
                <ul className="space-y-1.5 text-slate-700 dark:text-slate-300 font-mono">
                  <li>• Circle Arc Length: s = rθ (θ in radians) or s = (θ/360°) × 2πr</li>
                  <li>• Sector Area: Area = ½ r² θ (θ in rad) or Area = (θ/360°) × πr²</li>
                  <li>• Chord & Radius: r² = d² + (chord/2)²</li>
                  <li>• Regular Hexagon Area: Area = (3√3 / 2) s²</li>
                  <li>• Polygon Interior Angle Sum: S = (n − 2) × 180°</li>
                  <li>• Cylinder Surface Area: S = 2πr² + 2πrh</li>
                  <li>• Cube TSA: TSA = 6s²; Volume = s³</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700">
                <h4 className="font-bold text-purple-700 dark:text-purple-300 text-sm mb-2">
                  Algebra & Functions
                </h4>
                <ul className="space-y-1.5 text-slate-700 dark:text-slate-300 font-mono">
                  <li>• Perpendicular Lines: m₁ × m₂ = −1 ⟹ m₂ = −1/m₁</li>
                  <li>• Distance Formula: d = √((x₂ − x₁)² + (y₂ − y₁)²)</li>
                  <li>• Quadratic Vertex: x = −b / (2a)</li>
                  <li>• Polynomial Remainder Theorem: Remainder when P(x) ÷ (x − c) is P(c)</li>
                  <li>• Complex Numbers: i² = −1, (1 − i√3) = 2 e^(−iπ/3)</li>
                  <li>• Cistern / Combined Work: 1/t_total = 1/t₁ + 1/t₂</li>
                </ul>
              </div>
            </div>
          )}

          {tab === 'sciences' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700">
                <h4 className="font-bold text-emerald-700 dark:text-emerald-300 text-sm mb-2">
                  Physics Formulas
                </h4>
                <ul className="space-y-1.5 text-slate-700 dark:text-slate-300 font-mono">
                  <li>• Uniform Acceleration: v = u + at</li>
                  <li>• Newton's 2nd Law: F = ma ⟹ a = F/m</li>
                  <li>• Ohm's Law: V = IR</li>
                  <li>• Electric Power: P = VI = I²R = V²/R</li>
                  <li>• Sound Waves: Longitudinal wave (compression and rarefaction)</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700">
                <h4 className="font-bold text-emerald-700 dark:text-emerald-300 text-sm mb-2">
                  Chemistry & Nuclear Principles
                </h4>
                <ul className="space-y-1.5 text-slate-700 dark:text-slate-300 font-mono">
                  <li>• pH Calculation: pH = −log[H⁺] (0.001 M HCl = 10⁻³ M ⟹ pH = 3)</li>
                  <li>• Molality (m): m = moles of solute / mass of solvent (in kg)</li>
                  <li>• Nuclear First-Order Half-Life: t½ = ln(2) / k ≈ 0.693 / k</li>
                  <li>• Gas Laws: Charles's Law (V ∝ T at constant P), Boyle's Law (P ∝ 1/V)</li>
                  <li>• Redox: Reduction = gain of electrons (e.g. Cl₂ + 2e⁻ → 2Cl⁻)</li>
                  <li>• VSEPR: Methane (CH₄) = 4 single bonds, 0 lone pairs = Tetrahedral (109.5°)</li>
                  <li>• Quantum Numbers for 3p: n = 3, l = 1, mₗ ∈ {'{-1, 0, +1}'}</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700">
                <h4 className="font-bold text-emerald-700 dark:text-emerald-300 text-sm mb-2">
                  Biology & Environmental Science
                </h4>
                <ul className="space-y-1.5 text-slate-700 dark:text-slate-300">
                  <li>• Central Dogma: DNA → RNA (Transcription) → Protein (Translation)</li>
                  <li>• Mendelian Monohybrid Cross: Tt × Tt ⟹ 25% homozygous recessive dwarf (tt)</li>
                  <li>• Philippine RA 6969: Toxic Substances and Hazardous and Nuclear Wastes Act</li>
                  <li>• Geological Eras: Mesozoic Era (252–66 Ma) is the "Age of Dinosaurs"</li>
                  <li>• Tectonic Stress: Shear stress causes horizontal sliding along transform faults</li>
                </ul>
              </div>
            </div>
          )}

          {tab === 'aptitude' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700">
                <h4 className="font-bold text-blue-700 dark:text-blue-300 text-sm mb-2">
                  Mechanical & Physics Reasoning
                </h4>
                <ul className="space-y-1.5 text-slate-700 dark:text-slate-300">
                  <li>• <strong>Single Fixed Pulley:</strong> Changes force direction without mechanical advantage. Moving cable 10 ft moves load 10 ft.</li>
                  <li>• <strong>Sealed Airtight Drainage:</strong> Liquid cannot freely drain unless air equalizes internal pressure (atmospheric inlet tube).</li>
                  <li>• <strong>Fluid Density:</strong> Water (1.0 g/cm³) is denser than oil (~0.9 g/cm³); water always sinks to the bottom.</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700">
                <h4 className="font-bold text-blue-700 dark:text-blue-300 text-sm mb-2">
                  Spatial, Net Folding & Mirror Images
                </h4>
                <ul className="space-y-1.5 text-slate-700 dark:text-slate-300">
                  <li>• <strong>Cube Folding:</strong> Opposing sides in a net cannot be adjacent in the folded 3D cube.</li>
                  <li>• <strong>Paper Punctures:</strong> Unfolding reflects holes across the crease line symmetry axis.</li>
                  <li>• <strong>Mirror Inversion:</strong> Vertical mirror reverses character sequence and individual horizontal orientation.</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Close Button */}
        <div className="pt-4 mt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold hover:opacity-90 transition-opacity"
          >
            Close Reference Sheet
          </button>
        </div>
      </div>
    </div>
  );
};
