import React, { useState } from 'react';
import { ArrowLeft, Inbox, LayoutGrid, ShoppingCart, History, CheckCircle2, ShieldCheck } from 'lucide-react';
import { UserProfile, WalletBalances } from '../../types';

interface MailShopViewProps {
  shopType: 'outmail' | 'hotmail';
  user: UserProfile;
  balances: WalletBalances;
  onBack: () => void;
  onPurchase: (type: 'outmail' | 'hotmail', quantity: number, totalCost: number) => void;
}

export const MailShopView: React.FC<MailShopViewProps> = ({
  shopType,
  user,
  balances,
  onBack,
  onPurchase,
}) => {
  const isOutmail = shopType === 'outmail';
  const title = isOutmail ? 'Outmail Shop' : 'Hotmail Shop';
  const pricePerPiece = 2.00;
  const [stock, setStock] = useState(isOutmail ? 1 : 3);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<Array<{ id: string; mail: string; pass: string; date: string }>>([]);

  const handleBuy = () => {
    if (stock <= 0) {
      alert('বর্তমানে স্টক শেষ!');
      return;
    }
    if (balances.main < pricePerPiece) {
      alert('আপনার মেইন ব্যালেন্সে পর্যাপ্ত টাকা নেই! অনুগ্রহ করে Add Fund করুন।');
      return;
    }

    const randomId = Math.floor(100000 + Math.random() * 900000);
    const generatedMail = isOutmail
      ? `dez_out_${randomId}@outlook.com`
      : `dez_hot_${randomId}@hotmail.com`;
    const generatedPass = `DezSecure#${Math.floor(100 + Math.random() * 900)}`;

    setStock((prev) => prev - 1);
    const newOrder = {
      id: `ord-${Date.now()}`,
      mail: generatedMail,
      pass: generatedPass,
      date: 'Just now',
    };
    setHistory([newOrder, ...history]);
    onPurchase(shopType, 1, pricePerPiece);
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
          {title}
        </h1>
        <div className="w-10" />
      </div>

      {/* BALANCE & HISTORY TOP CARD */}
      <div className="rounded-3xl bg-slate-900 p-5 text-white shadow-lg flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            MAIN BALANCE
          </p>
          <p className="text-2xl font-black text-emerald-400 mt-0.5">
            ৳{balances.main.toFixed(2)}
          </p>
        </div>

        <button
          onClick={() => setShowHistory(!showHistory)}
          className="press flex items-center gap-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 px-3.5 py-2 text-xs font-bold text-white transition-colors"
        >
          <History className="h-4 w-4" />
          <span>{showHistory ? 'Close History' : 'Buy History'}</span>
        </button>
      </div>

      {/* STOCK CARD */}
      <div className="rounded-3xl bg-white p-5 shadow-xs border border-slate-100 space-y-4">
        <div className="flex items-center gap-3">
          <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${isOutmail ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-blue-50 text-blue-600 border border-blue-100'}`}>
            {isOutmail ? <Inbox className="h-6 w-6" /> : <LayoutGrid className="h-6 w-6" />}
          </div>
          <div>
            <h2 className="text-sm font-extrabold text-slate-800">
              {isOutmail ? 'Available Outmail Stock' : 'Available Hotmail Stock'}
            </h2>
            <p className="text-xs text-slate-400">100% Fresh & Live Verified</p>
          </div>
        </div>

        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
          <div>
            <span className="text-lg font-black text-slate-900">৳{pricePerPiece.toFixed(2)}</span>
            <span className="text-xs text-slate-400 font-medium"> / piece</span>
          </div>
          <span className={`text-xs font-extrabold px-3 py-1 rounded-full ${stock > 0 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700'}`}>
            Available: {stock}
          </span>
        </div>

        <button
          onClick={handleBuy}
          disabled={stock <= 0}
          className={`press flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-xs font-black text-white shadow-md transition-all ${
            stock > 0
              ? isOutmail
                ? 'bg-emerald-600 hover:bg-emerald-700'
                : 'bg-blue-600 hover:bg-blue-700'
              : 'bg-slate-300 cursor-not-allowed text-slate-500'
          }`}
        >
          <ShoppingCart className="h-4 w-4" />
          <span>{stock > 0 ? 'BUY NOW (৳২.০০)' : 'OUT OF STOCK'}</span>
        </button>
      </div>

      {/* BUY HISTORY SECTION */}
      {showHistory && (
        <div className="rounded-3xl bg-white p-5 shadow-xs border border-slate-100 space-y-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <h3 className="text-xs font-extrabold text-slate-800">
              আপনার ক্রয়কৃত মেইল লিস্ট
            </h3>
          </div>

          {history.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-4">
              আপনি এখনো কোনো মেইল ক্রয় করেননি
            </p>
          ) : (
            <div className="space-y-2">
              {history.map((item) => (
                <div key={item.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1 font-mono">
                  <div className="flex justify-between text-[10px] text-slate-400 font-sans">
                    <span>{item.date}</span>
                    <span className="text-emerald-600 font-bold">Paid ৳2.00</span>
                  </div>
                  <p className="text-slate-800 font-bold break-all">Email: {item.mail}</p>
                  <p className="text-slate-600">Pass: {item.pass}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
