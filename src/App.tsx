/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  INITIAL_USER,
  INITIAL_BALANCES,
  INITIAL_TASKS,
  INITIAL_TRANSACTIONS,
  INITIAL_NOTIFICATIONS,
  INITIAL_NOTICES,
  INITIAL_LEADERBOARD,
  INITIAL_SUBMISSIONS,
} from './data/initialData';
import {
  UserProfile,
  WalletBalances,
  TaskItem,
  Transaction,
  NotificationItem,
  WalletType,
  NoticeBanner,
  AdminSubmission,
  SubmissionType,
} from './types';
import { Header } from './components/Header';
import { DrawerMenu } from './components/DrawerMenu';
import { BalanceOverview } from './components/BalanceOverview';
import { BannerCarousel } from './components/BannerCarousel';
import { QuickActions } from './components/QuickActions';
import { ExploreServicesGrid } from './components/ExploreServicesGrid';
import { TaskSection } from './components/TaskSection';
import { TaskDetailModal } from './components/TaskDetailModal';
import { AddFundModal } from './components/AddFundModal';
import { WithdrawModal } from './components/WithdrawModal';
import { DailySpinModal } from './components/DailySpinModal';
import { ReferralSection } from './components/ReferralSection';
import { LeaderboardView } from './components/LeaderboardView';
import { TransactionsView } from './components/TransactionsView';
import { WalletsView } from './components/WalletsView';
import { NotificationModal } from './components/NotificationModal';
import { ProfileModal } from './components/ProfileModal';
import { TelegramSupportModal } from './components/TelegramSupportModal';
import { ShareLinkModal } from './components/ShareLinkModal';
import { BottomNavigation } from './components/BottomNavigation';
import { FloatingSupportButton } from './components/FloatingSupportButton';
import { AuthModal } from './components/AuthModal';

// Dedicated Service Views matching screenshots
import { LeadershipView } from './components/services/LeadershipView';
import { FbServerView } from './components/services/FbServerView';
import { GmailSellView } from './components/services/GmailSellView';
import { InstaSellView } from './components/services/InstaSellView';
import { MailShopView } from './components/services/MailShopView';
import { VpnStoreView } from './components/services/VpnStoreView';
import { WeeklySalaryView } from './components/services/WeeklySalaryView';
import { MonthlySalaryView } from './components/services/MonthlySalaryView';
import { MonthlyMegaBonusView } from './components/services/MonthlyMegaBonusView';
import { JobPostView } from './components/services/JobPostView';
import { MicrojobView } from './components/services/MicrojobView';
import { GiftCodeModal } from './components/services/GiftCodeModal';
import { WithdrawFundsView } from './components/services/WithdrawFundsView';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  // --- PERSISTENT STATE ---
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('dez_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [balances, setBalances] = useState<WalletBalances>(() => {
    const saved = localStorage.getItem('dez_balances');
    return saved ? JSON.parse(saved) : INITIAL_BALANCES;
  });

  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    const saved = localStorage.getItem('dez_tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('dez_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('dez_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [submissions, setSubmissions] = useState<AdminSubmission[]>(() => {
    const saved = localStorage.getItem('dez_admin_submissions');
    return saved ? JSON.parse(saved) : INITIAL_SUBMISSIONS;
  });

  const [hasCheckedInToday, setHasCheckedInToday] = useState<boolean>(() => {
    const lastCheckin = localStorage.getItem('dez_last_checkin');
    const today = new Date().toDateString();
    return lastCheckin === today;
  });

  // --- SAVE TO LOCALSTORAGE ---
  useEffect(() => {
    localStorage.setItem('dez_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('dez_balances', JSON.stringify(balances));
  }, [balances]);

  useEffect(() => {
    localStorage.setItem('dez_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('dez_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('dez_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('dez_admin_submissions', JSON.stringify(submissions));
  }, [submissions]);

  // --- UI NAVIGATION & MODALS ---
  const [activeTab, setActiveTab] = useState<string>('home');
  const [toastMessage, setToastMessage] = useState<{ title: string; desc: string; type: 'success' | 'info' } | null>(null);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [isSpinOpen, setIsSpinOpen] = useState(false);
  const [isTelegramOpen, setIsTelegramOpen] = useState(false);
  const [isShareLinkOpen, setIsShareLinkOpen] = useState(false);
  const [isGiftCodeOpen, setIsGiftCodeOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);

  const showToast = (title: string, desc: string, type: 'success' | 'info' = 'success') => {
    setToastMessage({ title, desc, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const unreadNotificationCount = notifications.filter((n) => !n.read).length;
  const pendingAdminSubmissionsCount = submissions.filter((s) => s.status === 'pending').length;

  // --- ADMIN APPROVAL & REJECTION HANDLERS ---
  const handleApproveSubmission = (submissionId: string) => {
    const sub = submissions.find((s) => s.id === submissionId);
    if (!sub || sub.status !== 'pending') return;

    // 1. Mark submission approved
    setSubmissions((prev) =>
      prev.map((s) => (s.id === submissionId ? { ...s, status: 'approved' } : s))
    );

    // 2. Credit money / update user stats based on submission type
    if (sub.type === 'deposit') {
      setBalances((prev) => ({ ...prev, main: prev.main + sub.reward }));
    } else if (sub.type === 'withdraw') {
      // already deducted from wallet at request time, mark completed
    } else {
      // microjob, fb_server, gmail_sell, insta_sell
      const target = sub.targetWallet;
      setBalances((prev) => ({
        ...prev,
        [target]: prev[target] + sub.reward,
      }));
      setUser((prev) => ({
        ...prev,
        totalEarnings: prev.totalEarnings + sub.reward,
        totalTasksCompleted: prev.totalTasksCompleted + 1,
      }));

      if (sub.type === 'microjob' && sub.data.taskId) {
        setTasks((prev) =>
          prev.map((t) => (t.id === sub.data.taskId ? { ...t, status: 'completed' } : t))
        );
      }
    }

    // 3. Mark transaction completed
    setTransactions((prev) =>
      prev.map((tx) =>
        tx.id === sub.id || tx.note?.includes(sub.title)
          ? { ...tx, status: 'completed' }
          : tx
      )
    );

    // 4. Notify user
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `✅ কাজ অনুমোদিত: ৳${sub.reward.toFixed(2)} অর্জিত!`,
      message: `আপনার "${sub.title}" অ্যাডমিন কর্তৃক যাচাই ও অনুমোদন করা হয়েছে। ৳${sub.reward.toFixed(2)} ওয়ালেটে জমা দেওয়া হয়েছে।`,
      time: 'Just now',
      read: false,
      type: 'reward',
    };
    setNotifications((prev) => [newNotif, ...prev]);

    showToast('অনুমোদন সফল!', `৳${sub.reward.toFixed(2)} ইউজারের ${sub.targetWallet.toUpperCase()} ব্যালেন্সে সফলভাবে জমা হয়েছে।`);
  };

  const handleRejectSubmission = (submissionId: string, reason = 'তথ্য সঠিক নয় বা নিয়ম ভঙ্গ হয়েছে') => {
    const sub = submissions.find((s) => s.id === submissionId);
    if (!sub || sub.status !== 'pending') return;

    // 1. Mark submission rejected
    setSubmissions((prev) =>
      prev.map((s) => (s.id === submissionId ? { ...s, status: 'rejected', rejectionReason: reason } : s))
    );

    // 2. If withdraw was rejected, refund money back to wallet
    if (sub.type === 'withdraw' && sub.data.sourceWallet) {
      const source = sub.data.sourceWallet;
      setBalances((prev) => ({
        ...prev,
        [source]: prev[source] + sub.reward,
      }));
    }

    if (sub.type === 'microjob' && sub.data.taskId) {
      setTasks((prev) =>
        prev.map((t) => (t.id === sub.data.taskId ? { ...t, status: 'available' } : t))
      );
    }

    // 3. Update transaction
    setTransactions((prev) =>
      prev.map((tx) =>
        tx.id === sub.id || tx.note?.includes(sub.title)
          ? { ...tx, status: 'rejected' }
          : tx
      )
    );

    // 4. Notify user
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `❌ কাজ বাতিল: ${sub.title}`,
      message: `আপনার সাবমিশনটি অ্যাডমিন কর্তৃক বাতিল করা হয়েছে। কারণ: ${reason}`,
      time: 'Just now',
      read: false,
      type: 'alert',
    };
    setNotifications((prev) => [newNotif, ...prev]);

    showToast('সাবমিশন বাতিল করা হয়েছে', `ইউজারকে রিজেক্ট নোটিফিকেশন পাঠানো হয়েছে।`, 'info');
  };

  const handleApproveAllPending = (type?: SubmissionType) => {
    const pendingItems = submissions.filter(
      (s) => s.status === 'pending' && (!type || s.type === type)
    );
    if (pendingItems.length === 0) return;

    pendingItems.forEach((item) => {
      handleApproveSubmission(item.id);
    });

    showToast('সব অনুমোদন সম্পন্ন!', `${pendingItems.length}টি পেন্ডিং কাজ সফলভাবে অ্যাপ্রুভ করা হয়েছে।`);
  };

  // --- ACTIONS ---

  // 1. Daily Check-in
  const handleDailyCheckIn = () => {
    if (hasCheckedInToday) return;

    const reward = 1.50;
    setBalances((prev) => ({ ...prev, main: prev.main + reward }));
    setUser((prev) => ({
      ...prev,
      totalEarnings: prev.totalEarnings + reward,
    }));

    const todayStr = new Date().toDateString();
    localStorage.setItem('dez_last_checkin', todayStr);
    setHasCheckedInToday(true);

    const newTx: Transaction = {
      id: `TRX-${Math.floor(10000 + Math.random() * 90000)}`,
      type: 'bonus',
      amount: reward,
      status: 'completed',
      date: 'Just now',
      note: 'Daily Check-in Reward',
    };
    setTransactions((prev) => [newTx, ...prev]);

    showToast('দৈনিক বোনাস সফল!', 'আপনার মেইন ব্যালেন্সে ৳১.৫০ যোগ হয়েছে');
  };

  // 2. Lucky Spin Win
  const handleSpinWin = (wonAmount: number) => {
    setBalances((prev) => ({ ...prev, main: prev.main + wonAmount }));
    setUser((prev) => ({
      ...prev,
      totalEarnings: prev.totalEarnings + wonAmount,
    }));

    const newTx: Transaction = {
      id: `TRX-${Math.floor(10000 + Math.random() * 90000)}`,
      type: 'bonus',
      amount: wonAmount,
      status: 'completed',
      date: 'Just now',
      note: `Lucky Spin Wheel Winner: ৳${wonAmount.toFixed(2)}`,
    };
    setTransactions((prev) => [newTx, ...prev]);

    showToast('স্পিন উইন!', `অভিনন্দন! আপনি জিতেছেন ৳${wonAmount.toFixed(2)}`);
  };

  // 3. Task Proof Submission (PENDING REVIEW)
  const handleSubmitTaskProof = (
    taskId: string,
    proof: { username?: string; proofLink?: string; screenshotUrl?: string; note?: string }
  ) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    const target = task.targetWallet;
    const subId = `SUB-${Math.floor(10000 + Math.random() * 90000)}`;

    // Set task to submitted/pending
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              status: 'submitted',
              completedSlots: t.completedSlots + 1,
              submissionProof: proof,
            }
          : t
      )
    );

    // Create Admin Submission Queue Item
    const newAdminSub: AdminSubmission = {
      id: subId,
      userId: user.id,
      userName: user.name,
      userPhone: user.phone,
      type: 'microjob',
      title: task.titleBn,
      reward: task.reward,
      targetWallet: target,
      submittedAt: 'Just now',
      status: 'pending',
      data: {
        taskId: task.id,
        taskTitle: task.titleBn,
        username: proof.username,
        proofLink: proof.proofLink,
        screenshotUrl: proof.screenshotUrl,
        note: proof.note,
      },
    };
    setSubmissions((prev) => [newAdminSub, ...prev]);

    // Create Pending Transaction
    const newTx: Transaction = {
      id: subId,
      type: 'task_earning',
      amount: task.reward,
      targetWallet: target,
      status: 'pending',
      date: 'Just now',
      note: `Microjob: ${task.titleBn} (Pending Review)`,
    };
    setTransactions((prev) => [newTx, ...prev]);

    // User Notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `টাস্ক প্রুফ জমা হয়েছে (পেন্ডিং)`,
      message: `আপনার "${task.titleBn}" কাজের প্রুফ জমা হয়েছে। অ্যাডমিন যাচাই করে অনুমোদন দিলে ৳${task.reward.toFixed(2)} ওয়ালেটে যোগ হবে।`,
      time: 'Just now',
      read: false,
      type: 'info',
    };
    setNotifications((prev) => [newNotif, ...prev]);

    showToast(
      'টাস্ক প্রুফ জমা হয়েছে (পেন্ডিং)',
      `অ্যাডমিন রিভিউ করে অ্যাপ্রুভ করলে ৳${task.reward.toFixed(2)} আপনার ${target.toUpperCase()} ওয়ালেটে যোগ হবে।`
    );
  };

  // 4. Deposit (PENDING REVIEW)
  const handleSuccessDeposit = (amount: number, method: 'bKash' | 'Nagad' | 'Rocket', trxId: string) => {
    const subId = `DEP-${Math.floor(10000 + Math.random() * 90000)}`;

    const newAdminSub: AdminSubmission = {
      id: subId,
      userId: user.id,
      userName: user.name,
      userPhone: user.phone,
      type: 'deposit',
      title: `Deposit via ${method}`,
      reward: amount,
      targetWallet: 'main',
      submittedAt: 'Just now',
      status: 'pending',
      data: {
        method,
        trxId,
        senderNumber: user.phone || '017XXXXXXXX',
      },
    };
    setSubmissions((prev) => [newAdminSub, ...prev]);

    const newTx: Transaction = {
      id: subId,
      type: 'deposit',
      amount: amount,
      method: method,
      trxId: trxId,
      status: 'pending',
      date: 'Just now',
      note: `Deposit via ${method} (TrxID: ${trxId}) - Pending Approval`,
    };
    setTransactions((prev) => [newTx, ...prev]);

    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `ডিপোজিট রিকোয়েস্ট পেন্ডিং: ৳${amount.toFixed(2)}`,
      message: `${method} মাধ্যমে ৳${amount} ডিপোজিট অনুরোধ পাঠানো হয়েছে। অ্যাডমিন TrxID যাচাই করার পর মূল ব্যালেন্সে যোগ হবে।`,
      time: 'Just now',
      read: false,
      type: 'info',
    };
    setNotifications((prev) => [newNotif, ...prev]);

    showToast('ডিপোজিট রিকোয়েস্ট জমা হয়েছে!', `অ্যাডমিন TrxID যাচাই করার পর ৳${amount.toFixed(2)} মেইন ব্যালেন্সে জমা হবে।`);
  };

  // 5. Withdraw from Any Wallet (PENDING REVIEW)
  const handleSuccessWithdraw = (
    amount: number,
    method: 'bKash' | 'Nagad' | 'Rocket',
    accountNumber: string,
    sourceWallet: WalletType = 'main'
  ) => {
    const subId = `WD-${Math.floor(10000 + Math.random() * 90000)}`;

    // Hold / deduct money immediately
    setBalances((prev) => ({
      ...prev,
      [sourceWallet]: Math.max(0, prev[sourceWallet] - amount),
    }));

    const newAdminSub: AdminSubmission = {
      id: subId,
      userId: user.id,
      userName: user.name,
      userPhone: user.phone,
      type: 'withdraw',
      title: `Withdraw ${amount} BDT to ${method}`,
      reward: amount,
      targetWallet: sourceWallet,
      submittedAt: 'Just now',
      status: 'pending',
      data: {
        withdrawMethod: method,
        accountNumber: accountNumber,
        sourceWallet: sourceWallet,
      },
    };
    setSubmissions((prev) => [newAdminSub, ...prev]);

    const newTx: Transaction = {
      id: subId,
      type: 'withdraw',
      amount: amount,
      method: method,
      accountNumber: accountNumber,
      sourceWallet: sourceWallet,
      status: 'pending',
      date: 'Just now',
      note: `Withdraw from ${sourceWallet.toUpperCase()} to ${method} (${accountNumber}) - Pending Admin Payout`,
    };
    setTransactions((prev) => [newTx, ...prev]);

    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `উইথড্র রিকোয়েস্ট পেন্ডিং: ৳${amount.toFixed(2)}`,
      message: `আপনার ${method} (${accountNumber}) একাউন্টে ৳${amount} উইথড্র অনুরোধ গ্রহণ করা হয়েছে। অ্যাডমিন যাচাই করে পেমেন্ট পাঠিয়ে দেবেন।`,
      time: 'Just now',
      read: false,
      type: 'info',
    };
    setNotifications((prev) => [newNotif, ...prev]);

    showToast('উইথড্র রিকোয়েস্ট জমা হয়েছে!', `অ্যাডমিন যাচাই করে শীঘ্রই আপনার ${method} একাউন্টে টাকা পাঠিয়ে দেবেন।`);
  };

  // 7. Purchase Mail from Shop
  const handleMailPurchase = (type: 'outmail' | 'hotmail', qty: number, totalCost: number) => {
    setBalances((prev) => ({
      ...prev,
      main: Math.max(0, prev.main - totalCost),
    }));

    const newTx: Transaction = {
      id: `TRX-${Math.floor(10000 + Math.random() * 90000)}`,
      type: 'bonus',
      amount: totalCost,
      status: 'completed',
      date: 'Just now',
      note: `Bought 1x ${type.toUpperCase()} from shop`,
    };
    setTransactions((prev) => [newTx, ...prev]);
    showToast('ক্রয় সফল হয়েছে!', `আপনার ক্রয়কৃত ${type.toUpperCase()} হিস্ট্রিতে দেখতে পারবেন।`);
  };

  // 8. Launch New Campaign / Job Post
  const handlePostJob = (jobData: any) => {
    setBalances((prev) => ({
      ...prev,
      main: Math.max(0, prev.main - jobData.estimatedCost),
    }));

    const newTask: TaskItem = {
      id: jobData.id,
      category: jobData.category,
      title: jobData.title,
      titleBn: jobData.title,
      description: jobData.instructions,
      reward: jobData.workerPay,
      targetWallet: 'main',
      timeLimitMinutes: 20,
      targetUrl: jobData.targetUrl,
      proofType: 'screenshot',
      totalSlots: jobData.targetWorkers,
      completedSlots: 0,
      status: 'available',
    };

    setTasks((prev) => [newTask, ...prev]);

    const newTx: Transaction = {
      id: `TRX-${Math.floor(10000 + Math.random() * 90000)}`,
      type: 'withdraw',
      amount: jobData.estimatedCost,
      status: 'completed',
      date: 'Just now',
      note: `Campaign Created: ${jobData.title}`,
    };
    setTransactions((prev) => [newTx, ...prev]);

    showToast('ক্যাম্পেইন তৈরি সফল!', 'আপনার জবটি মাইক্রোজব সেকশনে লাইভ হয়েছে।');
    setActiveTab('microjob');
  };

  // 9. Gift Code Redeem
  const handleRedeemGiftCode = (code: string) => {
    const reward = 10.00;
    setBalances((prev) => ({ ...prev, main: prev.main + reward }));
    setUser((prev) => ({ ...prev, totalEarnings: prev.totalEarnings + reward }));

    const newTx: Transaction = {
      id: `TRX-${Math.floor(10000 + Math.random() * 90000)}`,
      type: 'bonus',
      amount: reward,
      status: 'completed',
      date: 'Just now',
      note: `Redeemed Gift Code: ${code}`,
    };
    setTransactions((prev) => [newTx, ...prev]);
    showToast('গিফট কোড সফল!', `৳${reward.toFixed(2)} আপনার মেইন ব্যালেন্সে যুক্ত হয়েছে`);
  };

  // 10. Explore Services Navigation
  const handleSelectService = (serviceId: string) => {
    if (serviceId === 'gift-code') {
      setIsGiftCodeOpen(true);
    } else if (serviceId === 'withdraw') {
      setActiveTab('withdraw-funds');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (serviceId === 'refer-earn') {
      setActiveTab('refer');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setActiveTab(serviceId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Banner Carousel Actions
  const handleBannerAction = (actionType: NoticeBanner['actionType']) => {
    if (actionType === 'task') setActiveTab('tasks');
    else if (actionType === 'spin') setIsSpinOpen(true);
    else if (actionType === 'telegram') setIsTelegramOpen(true);
    else if (actionType === 'deposit') setIsDepositOpen(true);
  };

  return (
    <div id="app" className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans pb-24">
      {/* GLOBAL TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm rounded-2xl bg-slate-900 text-white p-3.5 shadow-2xl flex items-center gap-3 border border-slate-800 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-xs font-black">{toastMessage.title}</h4>
            <p className="text-[11px] text-slate-300 mt-0.5">{toastMessage.desc}</p>
          </div>
        </div>
      )}

      {/* TOP HEADER */}
      <Header
        user={user}
        unreadCount={unreadNotificationCount}
        onOpenMenu={() => setIsDrawerOpen(true)}
        onOpenNotifications={() => setIsNotificationOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenShareLink={() => setIsShareLinkOpen(true)}
      />

      {/* MAIN CONTAINER */}
      <main className="mx-auto w-full max-w-2xl px-4 pt-4 flex-1">
        {/* VIEW: HOME */}
        {activeTab === 'home' && (
          <div className="space-y-5 animate-in fade-in duration-150">
            {/* BALANCE OVERVIEW */}
            <BalanceOverview
              user={user}
              balances={balances}
              onOpenDeposit={() => setIsDepositOpen(true)}
              onOpenWithdraw={() => setActiveTab('withdraw-funds')}
            />

            {/* BANNER CAROUSEL */}
            <BannerCarousel
              notices={INITIAL_NOTICES}
              onAction={handleBannerAction}
            />

            {/* EXPLORE SERVICES - SERVICES GRID MATCHING SCREENSHOT */}
            <ExploreServicesGrid
              onSelectService={handleSelectService}
            />

            {/* SPECIAL REWARDS */}
            <QuickActions
              hasCheckedInToday={hasCheckedInToday}
              onDailyCheckIn={handleDailyCheckIn}
              onOpenSpin={() => setIsSpinOpen(true)}
              onOpenReferral={() => setActiveTab('refer')}
              onOpenTelegram={() => setIsTelegramOpen(true)}
            />

            {/* MICROJOBS FEED */}
            <TaskSection
              tasks={tasks}
              onSelectTask={(task) => setSelectedTask(task)}
            />
          </div>
        )}

        {/* --- DEDICATED SERVICES VIEWS --- */}

        {/* 1. Leadership View */}
        {activeTab === 'leadership' && (
          <LeadershipView
            user={user}
            onBack={() => setActiveTab('home')}
            onOpenReferral={() => setActiveTab('refer')}
            onNavigate={(tab) => setActiveTab(tab)}
          />
        )}

        {/* 2. Leaderboard View */}
        {activeTab === 'leaderboard' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <LeaderboardView leaderboard={INITIAL_LEADERBOARD} />
          </div>
        )}

        {/* 3. FB Server 1 */}
        {activeTab === 'fb-server-1' && (
          <FbServerView
            serverNumber={1}
            user={user}
            onBack={() => setActiveTab('home')}
            onSubmitAccount={(d: any) => {
              const earned = d.rate || 8;
              const subId = `FB1-${Math.floor(10000 + Math.random() * 90000)}`;

              // Add Admin Submission
              const newSub: AdminSubmission = {
                id: subId,
                userId: user.id,
                userName: user.name,
                userPhone: user.phone,
                type: 'fb_server',
                title: `FB Server 1 Account (${d.uid})`,
                reward: earned,
                targetWallet: 'fb',
                submittedAt: 'Just now',
                status: 'pending',
                data: {
                  serverNumber: 1,
                  uid: d.uid,
                  password: d.password,
                  twoFactor: d.twoFactor,
                  fbFriends: d.fbFriends,
                  device: d.device,
                  note: d.note,
                },
              };
              setSubmissions((prev) => [newSub, ...prev]);

              // Add Pending Transaction
              const newTx: Transaction = {
                id: subId,
                type: 'task_earning',
                amount: earned,
                targetWallet: 'fb',
                status: 'pending',
                date: 'Just now',
                note: `FB Server 1 Submission (${d.uid}) - Pending Review`,
              };
              setTransactions((prev) => [newTx, ...prev]);

              // User Notification
              const newNotif: NotificationItem = {
                id: `notif-${Date.now()}`,
                title: `FB Server 1 সাবমিশন পেন্ডিং`,
                message: `আপনার ফেসবুক আইডি (${d.uid}) সফলভাবে জমা হয়েছে। অ্যাডমিন চেক করে ৳${earned.toFixed(2)} FB ওয়ালেটে জমা করবেন।`,
                time: 'Just now',
                read: false,
                type: 'info',
              };
              setNotifications((prev) => [newNotif, ...prev]);

              showToast('সাবমিশন গৃহীত (পেন্ডিং)!', `অ্যাডমিন চেক করে অনুমোদন দিলে FB ওয়ালেটে ৳${earned.toFixed(2)} জমা হবে।`);
            }}
          />
        )}

        {/* 4. FB Server 2 */}
        {activeTab === 'fb-server-2' && (
          <FbServerView
            serverNumber={2}
            user={user}
            onBack={() => setActiveTab('home')}
            onSubmitAccount={(d: any) => {
              const earned = d.rate || 16;
              const subId = `FB2-${Math.floor(10000 + Math.random() * 90000)}`;

              // Add Admin Submission
              const newSub: AdminSubmission = {
                id: subId,
                userId: user.id,
                userName: user.name,
                userPhone: user.phone,
                type: 'fb_server',
                title: `FB Server 2 Account (${d.uid})`,
                reward: earned,
                targetWallet: 'fb',
                submittedAt: 'Just now',
                status: 'pending',
                data: {
                  serverNumber: 2,
                  uid: d.uid,
                  password: d.password,
                  twoFactor: d.twoFactor,
                  fbFriends: d.fbFriends,
                  device: d.device,
                  note: d.note,
                },
              };
              setSubmissions((prev) => [newSub, ...prev]);

              // Add Pending Transaction
              const newTx: Transaction = {
                id: subId,
                type: 'task_earning',
                amount: earned,
                targetWallet: 'fb',
                status: 'pending',
                date: 'Just now',
                note: `FB Server 2 Submission (${d.uid}) - Pending Review`,
              };
              setTransactions((prev) => [newTx, ...prev]);

              // User Notification
              const newNotif: NotificationItem = {
                id: `notif-${Date.now()}`,
                title: `FB Server 2 সাবমিশন পেন্ডিং`,
                message: `আপনার ফেসবুক আইডি (${d.uid}) সফলভাবে জমা হয়েছে। অ্যাডমিন চেক করে ৳${earned.toFixed(2)} FB ওয়ালেটে জমা করবেন।`,
                time: 'Just now',
                read: false,
                type: 'info',
              };
              setNotifications((prev) => [newNotif, ...prev]);

              showToast('সাবমিশন গৃহীত (পেন্ডিং)!', `অ্যাডমিন চেক করে অনুমোদন দিলে FB ওয়ালেটে ৳${earned.toFixed(2)} জমা হবে।`);
            }}
          />
        )}

        {/* 5. Gmail Sell View */}
        {activeTab === 'gmail-sell' && (
          <GmailSellView
            user={user}
            onBack={() => setActiveTab('home')}
            onSubmitGmail={(d: any) => {
              const earned = d.rate || 20;
              const subId = `GM-${Math.floor(10000 + Math.random() * 90000)}`;

              // Add Admin Submission
              const newSub: AdminSubmission = {
                id: subId,
                userId: user.id,
                userName: user.name,
                userPhone: user.phone,
                type: 'gmail_sell',
                title: `Gmail Sell: ${d.email}`,
                reward: earned,
                targetWallet: 'mail',
                submittedAt: 'Just now',
                status: 'pending',
                data: {
                  email: d.email,
                  password: d.password,
                  recoveryMail: d.recoveryMail,
                  creationYear: d.creationYear,
                },
              };
              setSubmissions((prev) => [newSub, ...prev]);

              // Add Pending Transaction
              const newTx: Transaction = {
                id: subId,
                type: 'task_earning',
                amount: earned,
                targetWallet: 'mail',
                status: 'pending',
                date: 'Just now',
                note: `Gmail Sell: ${d.email} - Pending Review`,
              };
              setTransactions((prev) => [newTx, ...prev]);

              // User Notification
              const newNotif: NotificationItem = {
                id: `notif-${Date.now()}`,
                title: `জিমেইল সাবমিশন পেন্ডিং: ৳${earned.toFixed(2)}`,
                message: `আপনার জিমেইল (${d.email}) জমা হয়েছে। অ্যাডমিন পাসওয়ার্ড ও রিকভারি যাচাই করে ওয়ালেটে ৳${earned} জমা করবেন।`,
                time: 'Just now',
                read: false,
                type: 'info',
              };
              setNotifications((prev) => [newNotif, ...prev]);

              showToast('জিমেইল সাবমিট সফল (পেন্ডিং)!', `অ্যাডমিন যাচাই করার পর ৳${earned.toFixed(2)} আপনার GMAIL ওয়ালেটে জমা হবে।`);
            }}
          />
        )}

        {/* 6. Insta Sell View */}
        {activeTab === 'insta-sell' && (
          <InstaSellView
            user={user}
            onBack={() => setActiveTab('home')}
            onSubmitInsta={(d: any) => {
              const earned = d.rate || 4.20;
              const subId = `IG-${Math.floor(10000 + Math.random() * 90000)}`;

              // Add Admin Submission
              const newSub: AdminSubmission = {
                id: subId,
                userId: user.id,
                userName: user.name,
                userPhone: user.phone,
                type: 'insta_sell',
                title: `Instagram ID (@${d.username})`,
                reward: earned,
                targetWallet: 'insta',
                submittedAt: 'Just now',
                status: 'pending',
                data: {
                  username: d.username,
                  password: d.password,
                  postsCount: d.postsCount,
                  followersCount: d.followersCount,
                  hasProfilePic: d.hasProfilePic,
                },
              };
              setSubmissions((prev) => [newSub, ...prev]);

              // Add Pending Transaction
              const newTx: Transaction = {
                id: subId,
                type: 'task_earning',
                amount: earned,
                targetWallet: 'insta',
                status: 'pending',
                date: 'Just now',
                note: `Instagram ID Submission (@${d.username}) - Pending Review`,
              };
              setTransactions((prev) => [newTx, ...prev]);

              // User Notification
              const newNotif: NotificationItem = {
                id: `notif-${Date.now()}`,
                title: `ইনস্টাগ্রাম সাবমিশন পেন্ডিং: ৳${earned.toFixed(2)}`,
                message: `আপনার ইনস্টাগ্রাম অ্যাকাউন্ট (@${d.username}) জমা হয়েছে। অ্যাডমিন চেক করে ৳${earned} INSTA ওয়ালেটে জমা করবেন।`,
                time: 'Just now',
                read: false,
                type: 'info',
              };
              setNotifications((prev) => [newNotif, ...prev]);

              showToast('ইনস্টা আইডি সাবমিট সফল (পেন্ডিং)!', `অ্যাডমিন রিভিউ করে অ্যাপ্রুভ করলে INSTA ওয়ালেটে ৳${earned.toFixed(2)} জমা হবে।`);
            }}
          />
        )}

        {/* 7. Outmail Sell View */}
        {activeTab === 'outmail-sell' && (
          <MailShopView
            shopType="outmail"
            user={user}
            balances={balances}
            onBack={() => setActiveTab('home')}
            onPurchase={handleMailPurchase}
          />
        )}

        {/* 8. Hotmail Sell View */}
        {activeTab === 'hotmail-sell' && (
          <MailShopView
            shopType="hotmail"
            user={user}
            balances={balances}
            onBack={() => setActiveTab('home')}
            onPurchase={handleMailPurchase}
          />
        )}

        {/* 9. VPN Store */}
        {activeTab === 'vpn-store' && (
          <VpnStoreView
            user={user}
            balances={balances}
            onBack={() => setActiveTab('home')}
          />
        )}

        {/* 10. Weekly Salary View */}
        {activeTab === 'weekly-salary' && (
          <WeeklySalaryView
            user={user}
            onBack={() => setActiveTab('home')}
          />
        )}

        {/* 11. Monthly Salary View */}
        {activeTab === 'monthly-salary' && (
          <MonthlySalaryView
            user={user}
            onBack={() => setActiveTab('home')}
          />
        )}

        {/* 12. Job Post View */}
        {activeTab === 'job-post' && (
          <JobPostView
            user={user}
            balances={balances}
            onBack={() => setActiveTab('home')}
            onPostJob={handlePostJob}
          />
        )}

        {/* 13. Microjob View */}
        {activeTab === 'microjob' && (
          <MicrojobView
            tasks={tasks}
            user={user}
            onBack={() => setActiveTab('home')}
            onSelectTask={(task) => setSelectedTask(task)}
          />
        )}

        {/* 14. Target Bonus / Monthly Mega Bonus */}
        {activeTab === 'target-bonus' && (
          <MonthlyMegaBonusView
            user={user}
            onBack={() => setActiveTab('home')}
            onOpenReferral={() => setActiveTab('refer')}
          />
        )}

        {/* 15. Withdraw Funds View */}
        {activeTab === 'withdraw-funds' && (
          <WithdrawFundsView
            user={user}
            balances={balances}
            onBack={() => setActiveTab('home')}
            onSuccessWithdraw={handleSuccessWithdraw}
          />
        )}

        {/* VIEW: TASKS / EARN */}
        {activeTab === 'tasks' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <TaskSection
              tasks={tasks}
              onSelectTask={(task) => setSelectedTask(task)}
            />
          </div>
        )}

        {/* VIEW: WALLETS */}
        {activeTab === 'wallets' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <WalletsView
              balances={balances}
              onOpenDeposit={() => setIsDepositOpen(true)}
              onOpenWithdraw={() => setActiveTab('withdraw-funds')}
            />
          </div>
        )}

        {/* VIEW: TRANSACTIONS / HISTORY */}
        {activeTab === 'history' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <TransactionsView transactions={transactions} />
          </div>
        )}

        {/* VIEW: REFERRAL */}
        {activeTab === 'refer' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <ReferralSection user={user} />
          </div>
        )}
      </main>

      {/* FLOATING SUPPORT BUTTON - ALWAYS ACCESSIBLE */}
      <FloatingSupportButton
        onOpenSupport={() => setIsTelegramOpen(true)}
      />

      {/* BOTTOM NAVIGATION */}
      <BottomNavigation
        currentTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* --- ALL INTERACTIVE MODALS --- */}

      {/* 1. Navigation Drawer */}
      <DrawerMenu
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        user={user}
        activeTab={activeTab}
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenDeposit={() => setIsDepositOpen(true)}
        onOpenWithdraw={() => {
          setIsDrawerOpen(false);
          setActiveTab('withdraw-funds');
        }}
        onSignOut={() => setIsAuthOpen(true)}
      />

      {/* 2. Notifications Modal */}
      <NotificationModal
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={() => {
          setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
        }}
      />

      {/* 3. Profile Modal */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={user}
        onUpdateUser={(updated) => setUser((prev) => ({ ...prev, ...updated }))}
      />

      {/* 4. Task Detail / Submission Modal */}
      <TaskDetailModal
        task={selectedTask}
        onClose={() => setSelectedTask(null)}
        onSubmitProof={handleSubmitTaskProof}
      />

      {/* 5. Add Fund / Deposit Modal */}
      <AddFundModal
        isOpen={isDepositOpen}
        onClose={() => setIsDepositOpen(false)}
        onSuccessDeposit={handleSuccessDeposit}
      />

      {/* 6. Withdraw Modal */}
      <WithdrawModal
        isOpen={isWithdrawOpen}
        onClose={() => setIsWithdrawOpen(false)}
        mainBalance={balances.main}
        user={user}
        onSuccessWithdraw={(amt, meth, acc) => handleSuccessWithdraw(amt, meth, acc, 'main')}
      />

      {/* 7. Daily Lucky Spin Wheel Modal */}
      <DailySpinModal
        isOpen={isSpinOpen}
        onClose={() => setIsSpinOpen(false)}
        onSpinWin={handleSpinWin}
      />

      {/* 8. Telegram Support Modal */}
      <TelegramSupportModal
        isOpen={isTelegramOpen}
        onClose={() => setIsTelegramOpen(false)}
      />

      {/* 11. Share App Link Modal */}
      <ShareLinkModal
        isOpen={isShareLinkOpen}
        onClose={() => setIsShareLinkOpen(false)}
        referralCode={user.referralCode}
      />

      {/* 12. Gift Code Modal */}
      <GiftCodeModal
        isOpen={isGiftCodeOpen}
        onClose={() => setIsGiftCodeOpen(false)}
        onRedeem={handleRedeemGiftCode}
      />

      {/* 13. Auth / Create Account Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(newUserData) => {
          setUser((prev) => ({ ...prev, ...newUserData }));
          showToast('স্বাগতম!', 'আপনার একাউন্ট সফলভাবে সেট হয়েছে');
        }}
      />
    </div>
  );
}
