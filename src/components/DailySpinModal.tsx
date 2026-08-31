import React, { useState } from 'react';
import { X, Sparkles, Trophy, Award, Gift, ArrowRight } from 'lucide-react';

interface DailySpinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSpinWin: (wonAmount: number) => void;
}

const PRIZES = [
  { label: '৳২.০০', value: 2.0, color: '#3b82f6' },
  { label: '৳৫.০০', value: 5.0, color: '#10b981' },
  { label: '৳১.৫০', value: 1.5, color: '#f59e0b' },
  { label: '৳১০.০০', value: 10.0, color: '#8b5cf6' },
  { label: '৳৩.০০', value: 3.0, color: '#ec4899' },
  { label: '৳৫০.০০ JACKPOT', value: 50.0, color: '#ef4444' },
  { label: '৳৪.০০', value: 4.0, color: '#06b6d4' },
  { label: '৳১.০০', value: 1.0, color: '#64748b' }
];

export const DailySpinModal: React.FC<DailySpinModalProps> = ({
  isOpen,
  onClose,
  onSpinWin,
}) => {
  if (!isOpen) return null;

  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [wonPrize, setWonPrize] = useState<number | null>(null);

  const handleSpin = () => {
    if (isSpinning || wonPrize !== null) return;

    setIsSpinning(true);
    // Random select from top weights (e.g. index 0, 1, 2, 3, 4, 6, 7)
    const winningIndex = Math.floor(Math.random() * PRIZES.length);
    const selectedPrize = PRIZES[winningIndex];

    const segmentAngle = 360 / PRIZES.length;
    const extraSpins = 360 * 5; // 5 full rotations
    // The pointer is at the top (270 deg or 0 deg), adjust target
    const targetDegree = extraSpins + (360 - (winningIndex * segmentAngle + segmentAngle / 2));

    setRotation(targetDegree);

    setTimeout(() => {
      setIsSpinning(false);
      setWonPrize(selectedPrize.value);
      onSpinWin(selectedPrize.value);
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs transition-opacity"
        onClick={() => {
          if (!isSpinning) onClose();
        }}
      />

      {/* MODAL */}
      <div className="relative z-10 max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl bg-slate-900 text-white p-5 sm:p-6 shadow-2xl hide-scrollbar animate-in zoom-in-95 duration-150 border border-slate-800 text-center">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
              <Sparkles className="h-4 w-4" />
            </span>
            <div className="text-left">
              <h2 className="text-base font-black text-white">লাকি স্পিন হুইল</h2>
              <p className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                দৈনিক ফ্রি রিওয়ার্ড
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={isSpinning}
            className="press flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:text-white"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* WHEEL CONTAINER */}
        <div className="my-6 relative flex items-center justify-center">
          {/* POINTER */}
          <div className="absolute -top-3 z-30 flex flex-col items-center">
            <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[18px] border-t-amber-400 drop-shadow-md" />
          </div>

          {/* SPINNER WHEEL */}
          <div className="relative h-64 w-64 rounded-full border-4 border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.35)] overflow-hidden bg-slate-950">
            <div
              className="h-full w-full rounded-full transition-all ease-out"
              style={{
                transform: `rotate(${rotation}deg)`,
                transitionDuration: isSpinning ? '4s' : '0s',
                transitionTimingFunction: 'cubic-bezier(0.15, 0.9, 0.2, 1)'
              }}
            >
              {PRIZES.map((prize, i) => {
                const angle = (360 / PRIZES.length) * i;
                return (
                  <div
                    key={i}
                    className="absolute top-0 left-0 w-full h-full"
                    style={{
                      transform: `rotate(${angle}deg)`
                    }}
                  >
                    <div
                      className="absolute top-0 left-1/2 -translate-x-1/2 w-16 pt-3 text-center"
                      style={{ color: prize.color }}
                    >
                      <span className="text-[11px] font-black tracking-tight drop-shadow-xs block">
                        {prize.label}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* WHEEL CENTER PIN */}
              <div className="absolute inset-0 m-auto h-12 w-12 rounded-full bg-gradient-to-br from-amber-300 to-amber-600 shadow-lg border-2 border-white flex items-center justify-center text-slate-950 font-black text-[10px]">
                DEZ
              </div>
            </div>
          </div>
        </div>

        {/* WIN NOTIFICATION OR SPIN BUTTON */}
        {wonPrize !== null ? (
          <div className="rounded-2xl bg-gradient-to-r from-amber-500/20 to-emerald-500/20 border border-amber-500/40 p-4 animate-in zoom-in duration-300">
            <Gift className="h-8 w-8 text-amber-400 mx-auto mb-1" />
            <h3 className="text-lg font-black text-amber-300">
              অভিনন্দন! আপনি জিতেছেন ৳{wonPrize.toFixed(2)}
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              টাকা সরাসরি আপনার মেইন ব্যালেন্সে জমা হয়েছে!
            </p>
            <button
              onClick={onClose}
              className="press mt-3 inline-flex items-center gap-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 px-5 py-2 text-xs font-black text-slate-950"
            >
              <span>ব্যালেন্সে ফেরত যান</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs text-slate-400">
              স্পিন হুইল ঘুরিয়ে প্রতিদিন জিতে নিন আকর্ষণীয় ক্যাশ রিওয়ার্ড!
            </p>

            <button
              onClick={handleSpin}
              disabled={isSpinning}
              className={`press w-full py-3.5 rounded-2xl text-sm font-black uppercase tracking-wider shadow-lg transition-all ${
                isSpinning
                  ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 text-slate-950 hover:brightness-110 shadow-amber-500/25'
              }`}
            >
              {isSpinning ? 'স্পিন ঘুরছে...' : 'এখনই স্পিন ঘুরান (FREE)'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
