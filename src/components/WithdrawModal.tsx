import React, { useState } from 'react';
import { X, ArrowUpRight, ShieldCheck, AlertCircle, Info } from 'lucide-react';
import { UserProfile } from '../types';

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  mainBalance: number;
  user: UserProfile;
  onSuccessWithdraw: (amount: number, method: 'bKash' | 'Nagad' | 'Rocket', accountNumber: string) => void;
}

export const WithdrawModal: React.FC<WithdrawModalProps> = ({
  isOpen,
  onClose,
  mainBalance,
  user,
  onSuccessWithdraw,
}) => {
  if (!isOpen) return null;

  const [selectedMethod, setSelectedMethod] = useState<'bKash' | 'Nagad' | 'Rocket'>('bKash');
  const [accountNumber, setAccountNumber] = useState(
    selectedMethod === 'bKash'
      ? user.bkashNumber || ''
      : selectedMethod === 'Nagad'
      ? user.nagadNumber || ''
      : user.rocketNumber || ''
  );
  const [amount, setAmount] = useState('50');
  const [errorMsg, setErrorMsg] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const MIN_WITHDRAW = 50;
  const WITHDRAW_FEE_PERCENT = 0; // 0% fee promo!

  const numAmount = parseFloat(amount) || 0;
  const fee = (numAmount * WITHDRAW_FEE_PERCENT) / 100;
  const receiveAmount = numAmount - fee;

  const handleQuickAmount = (val: number) => {
    setAmount(val.toString());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (isNaN(numAmount) || numAmount < MIN_WITHDRAW) {
      setErrorMsg(`সর্বনিম্ন উইথড্রয়াল পরিমাণ ৳${MIN_WITHDRAW}`);
      return;
    }
    if (numAmount > mainBalance) {
      setErrorMsg('আপনার মেইন ব্যালেন্সে পর্যাপ্ত টাকা নেই');
      return;
    }
    if (!accountNumber.trim() || accountNumber.length < 11) {
      setErrorMsg('সঠিক ১১ বা ১২ ডিজিটের মোবাইল নাম্বার দিন');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      onSuccessWithdraw(numAmount, selectedMethod, accountNumber.trim());
      setIsProcessing(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="relative z-10 max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl bg-white p-5 sm:p-6 shadow-2xl hide-scrollbar animate-in zoom-in-95 duration-150">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <ArrowUpRight className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900">
                Withdraw / টাকা উত্তোলন
              </h2>
              <p className="text-[11px] text-slate-400">তাত্ক্ষণিক পেমেন্ট রিকুয়েস্ট</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="press flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* BALANCE HIGHLIGHT */}
        <div className="my-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 p-3.5 border border-emerald-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              উত্তোলনযোগ্য মেইন ব্যালেন্স
            </span>
            <div className="text-xl font-black text-emerald-700">
              ৳{mainBalance.toFixed(2)}
            </div>
          </div>

          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-1 rounded-lg">
            ০% ফি অফার
          </span>
        </div>

        {/* PAYMENT METHOD TABS */}
        <div className="grid grid-cols-3 gap-2">
          {(['bKash', 'Nagad', 'Rocket'] as const).map((method) => (
            <button
              key={method}
              type="button"
              onClick={() => {
                setSelectedMethod(method);
                if (method === 'bKash') setAccountNumber(user.bkashNumber || '');
                else if (method === 'Nagad') setAccountNumber(user.nagadNumber || '');
                else setAccountNumber(user.rocketNumber || '');
              }}
              className={`press flex flex-col items-center rounded-2xl p-2.5 border text-center transition-all ${
                selectedMethod === method
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-800 font-extrabold shadow-xs'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className="text-xs font-bold">{method}</span>
              <span className="text-[9px] text-slate-400">পার্সোনাল</span>
            </button>
          ))}
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          {errorMsg && (
            <div className="flex items-center gap-2 rounded-xl bg-red-50 p-2.5 text-xs font-bold text-red-700 border border-red-200">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              আপনার {selectedMethod} পার্সোনাল নাম্বার *
            </label>
            <input
              type="text"
              required
              placeholder="01XXXXXXXXX"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-semibold text-slate-900 focus:bg-white focus:border-emerald-500 focus:outline-hidden"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-700">
                উত্তোলনের পরিমাণ (BDT) *
              </label>
              <button
                type="button"
                onClick={() => setAmount(mainBalance.toString())}
                className="text-[11px] font-extrabold text-emerald-600 hover:underline"
              >
                সব ব্যালেন্স (Max)
              </button>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400">৳</span>
              <input
                type="number"
                min={MIN_WITHDRAW}
                max={mainBalance}
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={`সর্বনিম্ন ৳${MIN_WITHDRAW}`}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-8 pr-3 text-xs font-black text-slate-900 focus:bg-white focus:border-emerald-500 focus:outline-hidden"
              />
            </div>

            {/* QUICK AMOUNT BUTTONS */}
            <div className="mt-2 flex items-center gap-1.5">
              {[50, 100, 200, 500].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => handleQuickAmount(val)}
                  className="flex-1 rounded-lg border border-slate-200 bg-slate-50 py-1 text-[11px] font-bold text-slate-600 hover:bg-slate-100"
                >
                  ৳{val}
                </button>
              ))}
            </div>
          </div>

          {/* SUMMARY BREAKDOWN */}
          <div className="rounded-xl bg-slate-50 p-3 text-xs space-y-1.5 border border-slate-200/60">
            <div className="flex justify-between text-slate-500">
              <span>অনুরোধকৃত অর্থ:</span>
              <span className="font-bold text-slate-800">৳{numAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>চার্জ / ফি:</span>
              <span className="font-bold text-emerald-600">৳০.০০ (ফ্রি)</span>
            </div>
            <div className="flex justify-between border-t border-slate-200 pt-1 text-slate-800 font-extrabold">
              <span>আপনি পাবেন:</span>
              <span className="text-emerald-700">৳{receiveAmount.toFixed(2)}</span>
            </div>
          </div>

          <div className="pt-1">
            <button
              type="submit"
              disabled={isProcessing || mainBalance < MIN_WITHDRAW}
              className={`press w-full flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-black text-white shadow-lg transition-all ${
                mainBalance < MIN_WITHDRAW
                  ? 'bg-slate-400 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-700'
              }`}
            >
              {isProcessing ? (
                <span>প্রসেসিং হচ্ছে...</span>
              ) : (
                <>
                  <ShieldCheck className="h-4 w-4" />
                  <span>উইথড্র কনফার্ম করুন</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
