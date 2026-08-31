import React, { useState } from 'react';
import { X, ArrowRightLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { WalletBalances, WalletType } from '../types';

interface TransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  balances: WalletBalances;
  onSuccessTransfer: (from: WalletType, amount: number) => void;
}

export const TransferModal: React.FC<TransferModalProps> = ({
  isOpen,
  onClose,
  balances,
  onSuccessTransfer,
}) => {
  if (!isOpen) return null;

  const [fromWallet, setFromWallet] = useState<WalletType>('fb');
  const [amount, setAmount] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const availableInSelected =
    fromWallet === 'fb'
      ? balances.fb
      : fromWallet === 'mail'
      ? balances.mail
      : balances.insta;

  const getWalletLabel = (w: WalletType) => {
    switch (w) {
      case 'fb':
        return 'Facebook Wallet (FB)';
      case 'mail':
        return 'Gmail Wallet (Mail)';
      case 'insta':
        return 'Instagram Wallet (Insta)';
      default:
        return 'Main Balance';
    }
  };

  const handleTransferAll = () => {
    setAmount(availableInSelected.toString());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setErrorMsg('সঠিক টাকার পরিমাণ লিখুন');
      return;
    }
    if (numAmount > availableInSelected) {
      setErrorMsg('নির্বাচিত ওয়ালেটে পর্যাপ্ত টাকা নেই');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      onSuccessTransfer(fromWallet, numAmount);
      setIsProcessing(false);
      onClose();
    }, 600);
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
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <ArrowRightLeft className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900">
                ওয়ালেট কনভার্ট / ট্রান্সফার
              </h2>
              <p className="text-[11px] text-slate-400">
                সাব-ওয়ালেট থেকে মেইন ব্যালেন্সে স্থানান্তর
              </p>
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

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
          {errorMsg && (
            <div className="flex items-center gap-2 rounded-xl bg-red-50 p-2.5 text-xs font-bold text-red-700 border border-red-200">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              যে ওয়ালেট থেকে পাঠাবেন (Source Wallet) *
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['fb', 'mail', 'insta'] as const).map((w) => (
                <button
                  key={w}
                  type="button"
                  onClick={() => {
                    setFromWallet(w);
                    setAmount('');
                  }}
                  className={`press flex flex-col items-center rounded-2xl p-2.5 border text-center transition-all ${
                    fromWallet === w
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-extrabold shadow-xs'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-xs font-bold uppercase">{w} Wallet</span>
                  <span className="text-[10px] text-indigo-700 font-extrabold mt-0.5">
                    ৳{w === 'fb' ? balances.fb.toFixed(2) : w === 'mail' ? balances.mail.toFixed(2) : balances.insta.toFixed(2)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-slate-50 p-3 text-center border border-slate-200/60">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              স্থানান্তর গন্তব্য
            </span>
            <span className="text-xs font-extrabold text-blue-700">
              Main Balance (মেইন ব্যালেন্স - উইথড্রযোগ্য)
            </span>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-700">
                স্থানান্তরের পরিমাণ (BDT) *
              </label>
              <button
                type="button"
                onClick={handleTransferAll}
                className="text-[11px] font-extrabold text-indigo-600 hover:underline"
              >
                সব টাকা (৳{availableInSelected.toFixed(2)})
              </button>
            </div>

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400">৳</span>
              <input
                type="number"
                min="1"
                max={availableInSelected}
                step="0.5"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="যেমন: 50"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-8 pr-3 text-xs font-black text-slate-900 focus:bg-white focus:border-indigo-500 focus:outline-hidden"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isProcessing || availableInSelected <= 0}
              className={`press w-full flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-black text-white shadow-lg transition-all ${
                availableInSelected <= 0
                  ? 'bg-slate-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {isProcessing ? (
                <span>ট্রান্সফার হচ্ছে...</span>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  <span>মেইন ব্যালেন্সে ট্রান্সফার করুন</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
