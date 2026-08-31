import React, { useState } from 'react';
import { ArrowLeft, Landmark, Send, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';
import { UserProfile, WalletBalances, WalletType } from '../../types';

interface WithdrawFundsViewProps {
  user: UserProfile;
  balances: WalletBalances;
  onBack: () => void;
  onSuccessWithdraw: (amount: number, method: 'bKash' | 'Nagad' | 'Rocket', accountNumber: string, sourceWallet: WalletType) => void;
}

export const WithdrawFundsView: React.FC<WithdrawFundsViewProps> = ({
  user,
  balances,
  onBack,
  onSuccessWithdraw,
}) => {
  const [sourceWallet, setSourceWallet] = useState<WalletType>('main');
  const [gateway, setGateway] = useState<'bKash' | 'Nagad' | 'Rocket'>('bKash');
  const [accountNumber, setAccountNumber] = useState(user.bkashNumber || '01930123456');
  const [amount, setAmount] = useState('15');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const minLimit = 15;
  const currentWalletBalance = balances[sourceWallet] || 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const numAmount = parseFloat(amount) || 0;
    if (isNaN(numAmount) || numAmount < minLimit) {
      setErrorMsg(`সর্বনিম্ন উইথড্রয়াল পরিমাণ ৳${minLimit}`);
      return;
    }

    if (numAmount > currentWalletBalance) {
      setErrorMsg(`আপনার নির্বাচিত ওয়ালেটে পর্যাপ্ত টাকা নেই! বর্তমান ব্যালেন্স: ৳${currentWalletBalance.toFixed(2)}`);
      return;
    }

    if (!accountNumber || accountNumber.length < 11) {
      setErrorMsg('সঠিক ১১ ডিজিটের মোবাইল একাউন্ট নাম্বার দিন!');
      return;
    }

    onSuccessWithdraw(numAmount, gateway, accountNumber, sourceWallet);
    setSuccessMsg(`উইথড্র রিকুয়েস্ট সফল হয়েছে! ৳${numAmount.toFixed(2)} আপনার ${gateway} নাম্বারে অতি দ্রুত প্রেরণ করা হবে।`);
  };

  return (
    <div className="space-y-4 pb-20">
      {/* TOP BAR */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="press flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-700 shadow-xs border border-slate-200"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-base font-extrabold text-slate-800">
          Withdraw Funds
        </h1>
        <div className="w-10" />
      </div>

      {/* 4 WALLET LIMIT CARDS AS IN SCREENSHOT */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* MAIN WALLET */}
        <div className="rounded-2xl bg-white p-3.5 shadow-xs border border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            MAIN WALLET
          </p>
          <p className="text-base font-black text-slate-900 mt-0.5">
            ৳{balances.main.toFixed(2)}
          </p>
          <span className="inline-block mt-1 text-[9px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
            Min Limit: ৳15
          </span>
        </div>

        {/* FB WALLET */}
        <div className="rounded-2xl bg-white p-3.5 shadow-xs border border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            FB WALLET
          </p>
          <p className="text-base font-black text-blue-600 mt-0.5">
            ৳{balances.fb.toFixed(2)}
          </p>
          <span className="inline-block mt-1 text-[9px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
            Limit: ৳15
          </span>
        </div>

        {/* GMAIL WALLET */}
        <div className="rounded-2xl bg-white p-3.5 shadow-xs border border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            GMAIL WALLET
          </p>
          <p className="text-base font-black text-red-600 mt-0.5">
            ৳{balances.mail.toFixed(2)}
          </p>
          <span className="inline-block mt-1 text-[9px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
            Limit: ৳15
          </span>
        </div>

        {/* INSTA WALLET */}
        <div className="rounded-2xl bg-white p-3.5 shadow-xs border border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            INSTA WALLET
          </p>
          <p className="text-base font-black text-pink-600 mt-0.5">
            ৳{balances.insta.toFixed(2)}
          </p>
          <span className="inline-block mt-1 text-[9px] font-bold text-pink-600 bg-pink-50 px-1.5 py-0.5 rounded">
            Limit: ৳15
          </span>
        </div>
      </div>

      {/* FORM */}
      <div className="rounded-3xl bg-white p-5 shadow-xs border border-slate-100 space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <Landmark className="h-5 w-5 text-blue-600" />
          <h2 className="text-sm font-extrabold text-slate-800">
            Submit Request
          </h2>
        </div>

        {errorMsg && (
          <div className="flex items-center gap-2 rounded-2xl bg-rose-50 p-3 text-xs font-bold text-rose-700 border border-rose-200">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="flex items-center gap-2 rounded-2xl bg-emerald-50 p-3 text-xs font-bold text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              SELECT SOURCE WALLET *
            </label>
            <select
              value={sourceWallet}
              onChange={(e) => setSourceWallet(e.target.value as WalletType)}
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:border-blue-500 focus:outline-none"
            >
              <option value="main">Main Wallet (Available: ৳{balances.main.toFixed(2)})</option>
              <option value="fb">FB Wallet (Available: ৳{balances.fb.toFixed(2)})</option>
              <option value="mail">Gmail Wallet (Available: ৳{balances.mail.toFixed(2)})</option>
              <option value="insta">Insta Wallet (Available: ৳{balances.insta.toFixed(2)})</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              PAYMENT GATEWAY *
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['bKash', 'Nagad', 'Rocket'] as const).map((m) => (
                <button
                  type="button"
                  key={m}
                  onClick={() => setGateway(m)}
                  className={`press py-2.5 rounded-xl border text-xs font-bold transition-all ${
                    gateway === m
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-slate-200 bg-slate-50 text-slate-600'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              ACCOUNT/PHONE NUMBER *
            </label>
            <input
              type="text"
              required
              placeholder="01XXXXXXXXX"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-medium text-slate-800 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              WITHDRAW AMOUNT (৳) * (Min: ৳15)
            </label>
            <input
              type="number"
              min="15"
              step="1"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-black text-emerald-600 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="press flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-xs font-black text-white shadow-md hover:from-emerald-700 hover:to-teal-700 transition-all"
          >
            <Send className="h-4 w-4" />
            <span>SUBMIT WITHDRAWAL →</span>
          </button>
        </form>
      </div>
    </div>
  );
};
