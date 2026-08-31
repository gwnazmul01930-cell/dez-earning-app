import React, { useState } from 'react';
import { X, Copy, Check, ShieldCheck, AlertCircle, ArrowDownLeft } from 'lucide-react';
import { DEPOSIT_ACCOUNTS } from '../data/initialData';

interface AddFundModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessDeposit: (amount: number, method: 'bKash' | 'Nagad' | 'Rocket', trxId: string) => void;
}

export const AddFundModal: React.FC<AddFundModalProps> = ({
  isOpen,
  onClose,
  onSuccessDeposit,
}) => {
  if (!isOpen) return null;

  const [selectedMethod, setSelectedMethod] = useState<'bkash' | 'nagad' | 'rocket'>('bkash');
  const [amount, setAmount] = useState('100');
  const [trxId, setTrxId] = useState('');
  const [senderNumber, setSenderNumber] = useState('');
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const account = DEPOSIT_ACCOUNTS[selectedMethod];

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(account.number);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount < account.minDeposit) {
      setErrorMsg(`সর্বনিম্ন ডিপোজিট পরিমাণ ৳${account.minDeposit}`);
      return;
    }
    if (!trxId.trim()) {
      setErrorMsg('অনুগ্রহ করে ট্রানজেকশন আইডি (TrxID) লিখুন');
      return;
    }
    if (!senderNumber.trim()) {
      setErrorMsg('যে নাম্বার থেকে টাকা পাঠিয়েছেন তা লিখুন');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      const methodName =
        selectedMethod === 'bkash'
          ? 'bKash'
          : selectedMethod === 'nagad'
          ? 'Nagad'
          : 'Rocket';
      onSuccessDeposit(numAmount, methodName, trxId.trim().toUpperCase());
      setIsProcessing(false);
      onClose();
    }, 900);
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
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <ArrowDownLeft className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900">
                Add Fund / ডিপোজিট
              </h2>
              <p className="text-[11px] text-slate-400">ব্যালেন্স লোড করুন</p>
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

        {/* METHOD TABS */}
        <div className="my-4 grid grid-cols-3 gap-2">
          {/* bKash */}
          <button
            type="button"
            onClick={() => setSelectedMethod('bkash')}
            className={`press flex flex-col items-center rounded-2xl p-2.5 border text-center transition-all ${
              selectedMethod === 'bkash'
                ? 'border-pink-500 bg-pink-50 text-pink-700 font-extrabold shadow-xs'
                : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span className="text-xs font-bold">bKash</span>
            <span className="text-[9px] text-slate-400">বিকাশ পার্সোনাল</span>
          </button>

          {/* Nagad */}
          <button
            type="button"
            onClick={() => setSelectedMethod('nagad')}
            className={`press flex flex-col items-center rounded-2xl p-2.5 border text-center transition-all ${
              selectedMethod === 'nagad'
                ? 'border-orange-500 bg-orange-50 text-orange-700 font-extrabold shadow-xs'
                : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span className="text-xs font-bold">Nagad</span>
            <span className="text-[9px] text-slate-400">নগদ পার্সোনাল</span>
          </button>

          {/* Rocket */}
          <button
            type="button"
            onClick={() => setSelectedMethod('rocket')}
            className={`press flex flex-col items-center rounded-2xl p-2.5 border text-center transition-all ${
              selectedMethod === 'rocket'
                ? 'border-purple-500 bg-purple-50 text-purple-700 font-extrabold shadow-xs'
                : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span className="text-xs font-bold">Rocket</span>
            <span className="text-[9px] text-slate-400">রকেট পার্সোনাল</span>
          </button>
        </div>

        {/* ACCOUNT INFO CARD */}
        <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200/80 space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500">অফিশিয়াল নাম্বার ({account.type}):</span>
            <span className="font-mono text-sm font-extrabold text-blue-700">{account.number}</span>
          </div>

          <button
            type="button"
            onClick={handleCopyNumber}
            className="press flex w-full items-center justify-center gap-1.5 rounded-xl bg-white border border-slate-200 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors shadow-2xs"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-emerald-600" />
                <span className="text-emerald-600">নাম্বার কপি হয়েছে!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 text-slate-500" />
                <span>নাম্বার কপি করুন</span>
              </>
            )}
          </button>

          <p className="text-[11px] text-slate-500 leading-relaxed pt-1">
            📌 <strong>নির্দেশনা:</strong> {account.instruction}
          </p>
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
              টাকার পরিমাণ (BDT) *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400">৳</span>
              <input
                type="number"
                min={account.minDeposit}
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={`সর্বনিম্ন ৳${account.minDeposit}`}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-8 pr-3 text-xs font-extrabold text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              যে নাম্বার থেকে পাঠিয়েছেন (Sender Number) *
            </label>
            <input
              type="text"
              required
              placeholder="01XXXXXXXXX"
              value={senderNumber}
              onChange={(e) => setSenderNumber(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-semibold text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              ট্রানজেকশন আইডি (TrxID) *
            </label>
            <input
              type="text"
              required
              placeholder="যেমন: 9G7K2L8X1M"
              value={trxId}
              onChange={(e) => setTrxId(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-mono font-bold uppercase text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-hidden"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isProcessing}
              className="press w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 py-3 text-xs font-black text-white shadow-lg transition-all"
            >
              {isProcessing ? (
                <span>ডিপোজিট ভেরিফাই হচ্ছে...</span>
              ) : (
                <>
                  <ShieldCheck className="h-4 w-4" />
                  <span>ডিপোজিট নিশ্চিত করুন</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
