import { UserProfile, WalletBalances, TaskItem, Transaction, NotificationItem, NoticeBanner, LeaderboardUser, AdminSubmission } from '../types';

export const INITIAL_USER: UserProfile = {
  id: 'DEZ-889021',
  name: 'Md. Nazmul Hossain',
  phone: '01930-XXXXXX',
  email: 'gwnazmul01930@gmail.com',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  level: 2,
  referralCode: 'DEZ7788',
  referrerName: 'Admin Official',
  totalEarnings: 245.50,
  totalTasksCompleted: 18,
  joinedDate: '15 Jan 2025',
  kycVerified: true,
  bkashNumber: '01930123456',
  nagadNumber: '01930123456',
  rocketNumber: '019301234564'
};

export const INITIAL_BALANCES: WalletBalances = {
  main: 120.00,
  fb: 45.50,
  mail: 50.00,
  insta: 30.00
};

export const INITIAL_NOTICES: NoticeBanner[] = [
  {
    id: 'n1',
    badge: 'SPECIAL BONUS',
    title: 'Facebook Page Follow & Review Task',
    subtitle: 'প্রতিটি পেজ ফলো ও পজিটিভ রিভিউতে পাচ্ছেন নিশ্চিত ৳৫.০০!',
    linkText: 'কাজ শুরু করুন',
    actionType: 'task'
  },
  {
    id: 'n2',
    badge: 'SPIN WHEEL',
    title: 'দৈনিক ফ্রি স্পিন ঘুরে জিতে নিন ৳৫০ পর্যন্ত!',
    subtitle: 'প্রতি ২৪ ঘণ্টায় একবার ফ্রি স্পিন ঘুরানোর সুযোগ।',
    linkText: 'স্পিন ঘুরান',
    actionType: 'spin'
  },
  {
    id: 'n3',
    badge: 'TELEGRAM',
    title: 'DEZ অফিশিয়াল টেলিগ্রাম চ্যানেলে যুক্ত হন',
    subtitle: 'সবার আগে নতুন হাই-পেইং টাস্ক ও পেমেন্ট প্রুফ পেতে যুক্ত থাকুন।',
    linkText: 'চ্যানেলে যোগ দিন',
    actionType: 'telegram'
  }
];

export const INITIAL_TASKS: TaskItem[] = [
  {
    id: 't-fb-1',
    category: 'facebook',
    title: 'Official FB Page Follow & 5 Star Review',
    titleBn: 'ফেসবুক পেজ ফলো এবং ৫ স্টার রিভিউ দিন',
    description: 'প্রদত্ত লিংকে গিয়ে পেজটি ফলো/লাইক করুন এবং ৫ স্টার দিয়ে চমৎকার একটি মন্তব্য করুন। আপনার ফেসবুক প্রোফাইলের নাম ও স্ক্রিনশট সাবমিট করুন।',
    reward: 5.00,
    targetWallet: 'fb',
    timeLimitMinutes: 15,
    targetUrl: 'https://facebook.com',
    proofType: 'all',
    totalSlots: 500,
    completedSlots: 342,
    status: 'available'
  },
  {
    id: 't-fb-2',
    category: 'facebook',
    title: 'Facebook Post Share in 3 Public Groups',
    titleBn: 'ফেসবুক পোস্ট ৩টি পাবলিক গ্রুপে শেয়ার করুন',
    description: 'পোস্টটি ওপেন করে যেকোনো ৩টি সক্রিয় গ্রুপে শেয়ার করুন এবং শেয়ার পোস্টের লিংক অথবা স্ক্রিনশট দিন।',
    reward: 4.50,
    targetWallet: 'fb',
    timeLimitMinutes: 20,
    targetUrl: 'https://facebook.com',
    proofType: 'screenshot',
    totalSlots: 300,
    completedSlots: 189,
    status: 'available'
  },
  {
    id: 't-mail-1',
    category: 'gmail',
    title: 'Create Fresh Gmail Account (Active)',
    titleBn: 'একটি নতুন জিমেইল একাউন্ট তৈরি করুন',
    description: 'রিকভারি ইমেইল হিসেবে দেয়া মেইলটি বসিয়ে নতুন জিমেইল তৈরি করুন এবং ইমেইল ও পাসওয়ার্ড সাবমিট করুন। ভেরিফিকেশনের পর পেমেন্ট ক্রেডিট হবে।',
    reward: 12.00,
    targetWallet: 'mail',
    timeLimitMinutes: 30,
    targetUrl: 'https://accounts.google.com/signup',
    proofType: 'username',
    totalSlots: 200,
    completedSlots: 145,
    status: 'available'
  },
  {
    id: 't-mail-2',
    category: 'gmail',
    title: 'Google Play Store 5-Star App Review',
    titleBn: 'প্লে-স্টোরে অ্যাপ ডাউনলোড ও ৫-স্টার পজিটিভ রিভিউ',
    description: 'প্লে স্টোর থেকে অ্যাপটি ইনস্টল করে ওপেন রাখুন ২ মিনিট এবং ৫ স্টার সহ ভালো রিভিউ লিখে স্ক্রিনশট জমা দিন।',
    reward: 8.00,
    targetWallet: 'mail',
    timeLimitMinutes: 25,
    targetUrl: 'https://play.google.com',
    proofType: 'all',
    totalSlots: 400,
    completedSlots: 310,
    status: 'available'
  },
  {
    id: 't-insta-1',
    category: 'instagram',
    title: 'Follow Instagram Profile & Like 5 Reels',
    titleBn: 'ইনস্টাগ্রাম একাউন্ট ফলো ও ৫টি রিলস লাইক করুন',
    description: 'ইনস্টাগ্রাম প্রোফাইলে গিয়ে ফলো বাটনে চাপ দিন এবং সর্বশেষ ৫টি রিলস ভিডিওতে লাইক দিয়ে স্ক্রিনশট দিন।',
    reward: 3.50,
    targetWallet: 'insta',
    timeLimitMinutes: 10,
    targetUrl: 'https://instagram.com',
    proofType: 'all',
    totalSlots: 600,
    completedSlots: 480,
    status: 'available'
  },
  {
    id: 't-insta-2',
    category: 'instagram',
    title: 'Instagram Story Mention & Comment',
    titleBn: 'ইনস্টাগ্রাম পোস্টে অর্থপূর্ণ কমেন্ট ও স্টোরি শেয়ার',
    description: 'প্রদত্ত পোস্টের নিচে ভালো কমেন্ট করুন এবং আপনার স্টোরিতে শেয়ার করে স্ক্রিনশট জমা দিন।',
    reward: 4.00,
    targetWallet: 'insta',
    timeLimitMinutes: 15,
    targetUrl: 'https://instagram.com',
    proofType: 'screenshot',
    totalSlots: 250,
    completedSlots: 198,
    status: 'available'
  },
  {
    id: 't-yt-1',
    category: 'youtube',
    title: 'Subscribe YouTube Channel & Watch 3 Mins',
    titleBn: 'ইউটিউব চ্যানেল সাবস্ক্রাইব ও ৩ মিনিট ভিডিও দেখুন',
    description: 'ভিডিওটি কমপক্ষে ৩ মিনিট দেখে লাইক এবং সাবস্ক্রাইব করে বেল আইকনে চাপ দিন। আপনার ইউটিউব চ্যানেলের নাম ও স্ক্রিনশট দিন।',
    reward: 6.00,
    targetWallet: 'main',
    timeLimitMinutes: 20,
    targetUrl: 'https://youtube.com',
    proofType: 'all',
    totalSlots: 1000,
    completedSlots: 760,
    status: 'available'
  },
  {
    id: 't-daily-1',
    category: 'daily',
    title: 'Daily Platform Check-in Reward',
    titleBn: 'দৈনিক অ্যাপ চেক-ইন বোনাস সংগ্রহ করুন',
    description: 'প্রতিদিন একবার অ্যাপে প্রবেশ করে চেক-ইন বাটনে ক্লিক করে তাৎক্ষণিক বোনাস সংগ্রহ করুন।',
    reward: 1.50,
    targetWallet: 'main',
    timeLimitMinutes: 1,
    targetUrl: '#',
    proofType: 'link',
    totalSlots: 99999,
    completedSlots: 8230,
    status: 'available'
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'TRX-98214',
    type: 'withdraw',
    amount: 150.00,
    method: 'bKash',
    accountNumber: '01930123456',
    status: 'completed',
    date: 'Today, 11:20 AM',
    note: 'Withdrawal to bKash Personal'
  },
  {
    id: 'TRX-98102',
    type: 'task_earning',
    amount: 12.00,
    targetWallet: 'mail',
    status: 'completed',
    date: 'Yesterday, 04:45 PM',
    note: 'Completed Task: Create Fresh Gmail Account'
  },
  {
    id: 'TRX-97890',
    type: 'transfer',
    amount: 50.00,
    sourceWallet: 'fb',
    targetWallet: 'main',
    status: 'completed',
    date: '28 Aug 2026, 02:15 PM',
    note: 'Transferred FB Wallet to Main Balance'
  },
  {
    id: 'TRX-97451',
    type: 'deposit',
    amount: 100.00,
    method: 'Nagad',
    trxId: '9G7K2L8X1M',
    status: 'completed',
    date: '27 Aug 2026, 10:30 AM',
    note: 'Add fund via Nagad Send Money'
  },
  {
    id: 'TRX-96320',
    type: 'bonus',
    amount: 5.00,
    targetWallet: 'main',
    status: 'completed',
    date: '26 Aug 2026, 09:00 AM',
    note: 'Lucky Spin Wheel Winner Reward'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n-1',
    title: 'পেমেন্ট সফল হয়েছে! ৳১৫০',
    message: 'আপনার bKash নাম্বারে (01930123456) ৳১৫০ উইথড্রয়াল সফলভাবে সম্পন্ন হয়েছে।',
    time: '2 hours ago',
    read: false,
    type: 'success'
  },
  {
    id: 'n-2',
    title: 'নতুন হাই-পেইং টাস্ক যুক্ত হয়েছে!',
    message: 'Gmail এবং Facebook ক্যাটাগরিতে ১০টি নতুন কাজ পাওয়া যাচ্ছে। এখনই শুরু করুন।',
    time: '5 hours ago',
    read: false,
    type: 'info'
  },
  {
    id: 'n-3',
    title: 'দৈনিক স্পিন বোনাস প্রস্তুত',
    message: 'আজকের ফ্রি লাকি স্পিন এখনো ঘুরাননি! এখনই ঘুরে ফ্রিতে টাকা জিতুন।',
    time: '1 day ago',
    read: true,
    type: 'reward'
  }
];

export const INITIAL_LEADERBOARD: LeaderboardUser[] = [
  {
    rank: 1,
    name: 'Sabbir Ahmed',
    earnings: 3450.00,
    tasksDone: 240,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'
  },
  {
    rank: 2,
    name: 'Tanvir Hasan',
    earnings: 2890.50,
    tasksDone: 195,
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80'
  },
  {
    rank: 3,
    name: 'Sumaiya Akter',
    earnings: 2410.00,
    tasksDone: 172,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80'
  },
  {
    rank: 4,
    name: 'Md. Nazmul Hossain',
    earnings: 1980.50,
    tasksDone: 145,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    isCurrentUser: true
  },
  {
    rank: 5,
    name: 'Rakib Chowdhury',
    earnings: 1750.00,
    tasksDone: 128,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
  },
  {
    rank: 6,
    name: 'Nusrat Jahan',
    earnings: 1420.00,
    tasksDone: 105,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80'
  }
];

export const DEPOSIT_ACCOUNTS = {
  bkash: {
    name: 'bKash (Send Money / Cash In)',
    number: '01889988776',
    type: 'Personal',
    minDeposit: 50,
    maxDeposit: 25000,
    instruction: 'bKash অ্যাপ থেকে Send Money করুন। রেফারেন্সে আপনার ইউজার আইডি দিন।'
  },
  nagad: {
    name: 'Nagad (Send Money)',
    number: '01776655443',
    type: 'Personal',
    minDeposit: 50,
    maxDeposit: 25000,
    instruction: 'Nagad অ্যাপ থেকে Send Money করুন এবং সফল লেনদেনের পর TrxID টি সাবমিট করুন।'
  },
  rocket: {
    name: 'Rocket (Send Money)',
    number: '019988776654',
    type: 'Personal',
    minDeposit: 50,
    maxDeposit: 25000,
    instruction: 'Rocket অ্যাকাউন্ট থেকে Send Money করে ফিরতি মেসেজের ট্রানজেকশন আইডি প্রদান করুন।'
  }
};

export const INITIAL_SUBMISSIONS: AdminSubmission[] = [
  {
    id: 'sub-init-1',
    userId: 'DEZ-889021',
    userName: 'Md. Nazmul Hossain',
    type: 'fb_server',
    title: 'FB Server 2 (ID Sell)',
    reward: 16.00,
    targetWallet: 'fb',
    submittedAt: 'Today, 02:40 PM',
    status: 'pending',
    data: {
      serverNumber: 2,
      uid: '100084938291032',
      password: 'Pass@User2026',
      twoFactorKey: 'JBSWY3DPEHPK3PXP',
    }
  },
  {
    id: 'sub-init-2',
    userId: 'DEZ-889021',
    userName: 'Md. Nazmul Hossain',
    type: 'gmail_sell',
    title: 'Gmail Sell Submission',
    reward: 20.00,
    targetWallet: 'mail',
    submittedAt: 'Today, 11:20 AM',
    status: 'pending',
    data: {
      email: 'workdez.user89@gmail.com',
      gmailPassword: 'Digital28'
    }
  },
  {
    id: 'sub-init-3',
    userId: 'DEZ-889021',
    userName: 'Md. Nazmul Hossain',
    type: 'microjob',
    title: 'YouTube Channel Subscribe & Watch',
    reward: 6.00,
    targetWallet: 'main',
    submittedAt: 'Today, 01:15 PM',
    status: 'pending',
    data: {
      taskId: 't-yt-1',
      taskTitle: 'YouTube Channel Subscribe & Watch',
      username: '@NazmulBDChannel',
      proofLink: 'https://youtube.com/@NazmulBDChannel',
      note: 'চ্যানেল সাবস্ক্রাইব করে ৩ মিনিট ভিডিও দেখেছি।'
    }
  },
  {
    id: 'sub-init-4',
    userId: 'DEZ-889021',
    userName: 'Md. Nazmul Hossain',
    type: 'deposit',
    title: 'Deposit via bKash',
    reward: 100.00,
    targetWallet: 'main',
    submittedAt: 'Yesterday, 05:30 PM',
    status: 'approved',
    data: {
      method: 'bKash',
      trxId: 'BK994827104X',
      senderNumber: '01889988776'
    }
  }
];

