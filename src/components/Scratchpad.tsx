import React, { useRef, useState, useEffect } from 'react';
import { Pen, Eraser, Trash2, X, Minimize2, Maximize2, Palette } from 'lucide-react';

interface ScratchpadProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Scratchpad: React.FC<ScratchpadProps> = ({ isOpen, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#1e293b');
  const [lineWidth, setLineWidth] = useState(2.5);
  const [isEraser, setIsEraser] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set high DPI canvas resolution
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    if (isEraser) {
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 14;
    } else {
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 w-[360px] sm:w-[420px] h-[360px] bg-white dark:bg-slate-900 border-2 border-blue-500 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fadeIn">
      {/* Scratchpad Header Toolbar */}
      <div className="p-2.5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="font-bold text-xs uppercase tracking-wider text-blue-300">
            Computation Scratchpad
          </span>
        </div>

        {/* Tools */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsEraser(false)}
            className={`p-1.5 rounded-lg text-xs transition-colors ${
              !isEraser ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
            title="Pen Tool"
          >
            <Pen className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsEraser(true)}
            className={`p-1.5 rounded-lg text-xs transition-colors ${
              isEraser ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
            title="Eraser Tool"
          >
            <Eraser className="w-3.5 h-3.5" />
          </button>

          {/* Color Pickers */}
          {!isEraser && (
            <div className="flex items-center gap-1 ml-1">
              {['#1e293b', '#2563eb', '#dc2626', '#059669'].map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  style={{ backgroundColor: c }}
                  className={`w-3.5 h-3.5 rounded-full border border-white/50 transition-transform ${
                    color === c ? 'scale-125 ring-1 ring-white' : ''
                  }`}
                />
              ))}
            </div>
          )}

          <button
            onClick={handleClear}
            className="p-1.5 rounded-lg text-xs text-rose-400 hover:text-rose-300 hover:bg-slate-800 transition-colors ml-1"
            title="Clear Scratchpad"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-1"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Drawing Canvas */}
      <div className="flex-1 bg-white relative cursor-crosshair touch-none">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-full h-full block"
        />
        <div className="absolute bottom-2 left-3 text-[10px] text-slate-300 pointer-events-none font-mono">
          DOST Digital Scratchpad • Draw solutions & formulas
        </div>
      </div>
    </div>
  );
};
