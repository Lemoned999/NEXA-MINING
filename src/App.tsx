import React, { useState, useEffect } from 'react';
import { User, Contract, Transaction, Notification, MiningPackage } from './types';
import Navigation from './components/Navigation';
import LandingPage from './components/LandingPage';
import Auth from './components/Auth';
import DashboardMember from './components/DashboardMember';
import DashboardAdmin from './components/DashboardAdmin';
import FAQView from './components/FAQView';
import AboutContact from './components/AboutContact';
import Profile from './components/Profile';

// Default Demo Users
const DEFAULT_USERS: User[] = [
  {
    id: 'member-1',
    name: 'Dandy Aditya',
    email: 'member@nexa-mining.com',
    role: 'member',
    walletAddress: 'TY3mZ5k9f6aUX6bHkS7d89WvWq1YpXp8Zq',
    balance: 350.00,
    hashrate: 35.0, // 30 TH/s Silver + 5 TH/s Bronze
    refCode: 'NEXAREF100',
    avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80',
    createdAt: '2026-06-15T08:00:00Z',
  },
  {
    id: 'admin-1',
    name: 'Nexa Admin Control',
    email: 'admin@nexa-mining.com',
    role: 'admin',
    balance: 1420500.00,
    hashrate: 0,
    refCode: 'NEXAADMIN',
    avatar: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=150&q=80',
    createdAt: '2026-05-01T08:00:00Z',
  }
];

// Initial Contracts for Member Demo
const DEFAULT_CONTRACTS: Contract[] = [
  {
    id: 'contract-silver',
    userId: 'member-1',
    packageName: 'SILVER HASHRATE',
    price: 250,
    hashrate: 30,
    durationDays: 60,
    progress: 42.50,
    status: 'active',
    dailyEarnings: 5.00,
    earningsAccumulated: 53.1204,
    lastTickTime: new Date().toISOString(),
    createdAt: '2026-06-20T10:30:00Z'
  },
  {
    id: 'contract-bronze',
    userId: 'member-1',
    packageName: 'BRONZE HASHRATE',
    price: 50,
    hashrate: 5,
    durationDays: 30,
    progress: 78.20,
    status: 'active',
    dailyEarnings: 0.75,
    earningsAccumulated: 29.3402,
    lastTickTime: new Date().toISOString(),
    createdAt: '2026-06-25T14:15:00Z'
  }
];

// Initial Transactions (Deposit and Withdrawals)
const DEFAULT_TRANSACTIONS: Transaction[] = [
  {
    id: 'TXN-094182',
    userId: 'member-1',
    userName: 'Dandy Aditya',
    type: 'deposit',
    amount: 250,
    currency: 'USDT-TRC20',
    walletAddress: 'TY3mZ5k9f6aUX6bHkS7d89WvWq1YpXp8Zq',
    status: 'success',
    txHash: '0x49da7812bc3c35f992abfdcf82efb7a2d8151fec861d8a1496a7989faef92822',
    createdAt: '2026-06-20T10:20:00Z'
  },
  {
    id: 'TXN-083145',
    userId: 'member-1',
    userName: 'Dandy Aditya',
    type: 'withdraw',
    amount: 50,
    currency: 'Bitcoin (BTC)',
    walletAddress: 'bc1qxy2kg3ut78dhf5yz0ha946n4v9rn97t36t44yp',
    status: 'success',
    txHash: '0x5acb8dcf2f3428df8c8a1e28ffcfcaef837c5efc19385bfefb4e4aebe623e105',
    createdAt: '2026-07-02T16:40:00Z'
  },
  // Pending transactions for Admin verification center
  {
    id: 'TXN-PENDING-DEP',
    userId: 'member-1',
    userName: 'Dandy Aditya',
    type: 'deposit',
    amount: 500,
    currency: 'USDT-TRC20',
    walletAddress: 'TY3mZ5k9f6aUX6bHkS7d89WvWq1YpXp8Zq',
    status: 'pending',
    txHash: '0xpendingdeposit728491abcdeff0123456789abcdef0123456789abcdeff',
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString() // 30 mins ago
  },
  {
    id: 'TXN-PENDING-WD',
    userId: 'member-1',
    userName: 'Dandy Aditya',
    type: 'withdraw',
    amount: 100,
    currency: 'USDT-TRC20',
    walletAddress: 'TY3mZ5k9f6aUX6bHkS7d89WvWq1YpXp8Zq',
    status: 'pending',
    txHash: '0xpendingwithdrawal938102abcdeff0123456789abcdef0123456789abcdef',
    createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString() // 15 mins ago
  }
];

// Default Notifications
const DEFAULT_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-1',
    userId: 'member-1',
    title: 'Sewa Hashrate Berhasil!',
    message: 'Selamat, kontrak hashrate Silver Anda senilai $250 telah diaktifkan secara instan. Daya mining Anda kini bertambah 30 TH/s.',
    read: false,
    createdAt: '2026-06-20T10:31:00Z'
  },
  {
    id: 'notif-2',
    userId: 'member-1',
    title: 'Selamat Datang di NEXA MINING',
    message: 'Terima kasih telah bergabung di Nexa Mining Platform. Akun Anda berhasil terdaftar.',
    read: true,
    createdAt: '2026-06-15T08:05:00Z'
  }
];

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [currentView, setCurrentView] = useState<string>('landing');
  const [selectedPkg, setSelectedPkg] = useState<MiningPackage | undefined>(undefined);

  // Core Data States (Restored from localStorage)
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('nexa_users');
    return saved ? JSON.parse(saved) : DEFAULT_USERS;
  });

  const [contracts, setContracts] = useState<Contract[]>(() => {
    const saved = localStorage.getItem('nexa_contracts');
    return saved ? JSON.parse(saved) : DEFAULT_CONTRACTS;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('nexa_transactions');
    return saved ? JSON.parse(saved) : DEFAULT_TRANSACTIONS;
  });

  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const saved = localStorage.getItem('nexa_notifications');
    return saved ? JSON.parse(saved) : DEFAULT_NOTIFICATIONS;
  });

  // Current logged in user (Reference to the correct object inside users array)
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('nexa_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Save states to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('nexa_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('nexa_contracts', JSON.stringify(contracts));
  }, [contracts]);

  useEffect(() => {
    localStorage.setItem('nexa_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('nexa_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('nexa_current_user', currentUser ? JSON.stringify(currentUser) : '');
  }, [currentUser]);

  // Keep the current logged in user synced with changes in the users list
  useEffect(() => {
    if (currentUser) {
      const freshUser = users.find(u => u.id === currentUser.id);
      if (freshUser && JSON.stringify(freshUser) !== JSON.stringify(currentUser)) {
        setCurrentUser(freshUser);
      }
    }
  }, [users, currentUser]);

  // Real-time Mining simulator loop
  useEffect(() => {
    const interval = setInterval(() => {
      // Loop over active contracts and increment earnings
      setContracts(prevContracts => {
        let hasChanges = false;
        const updated = prevContracts.map(contract => {
          if (contract.status === 'active') {
            hasChanges = true;
            // Boost earnings speed for satisfying visual ticking in UI
            // Normal: dailyEarnings / (24 * 3600).
            // Demo Boost: tick up 100x faster so users see numbers grow!
            const earningsIncrement = (contract.dailyEarnings / 86400) * 120;
            
            // Advance progress bar slowly
            const progressIncrement = (100 / (contract.durationDays * 86400)) * 120;
            const newProgress = Math.min(100, contract.progress + progressIncrement);
            const newStatus = newProgress >= 100 ? 'completed' : 'active';

            return {
              ...contract,
              progress: newProgress,
              status: newStatus as any,
              earningsAccumulated: contract.earningsAccumulated + earningsIncrement,
              lastTickTime: new Date().toISOString()
            };
          }
          return contract;
        });

        if (hasChanges) {
          // If contracts updated, credit the specific users' balances in parallel
          setUsers(prevUsers => {
            return prevUsers.map(u => {
              // Find active contracts of this user
              const userActiveContracts = updated.filter(c => c.userId === u.id && c.status === 'active');
              if (userActiveContracts.length > 0) {
                // Sum the micro-earnings for this second
                const microEarningsSum = userActiveContracts.reduce((sum, c) => {
                  return sum + ((c.dailyEarnings / 86400) * 120);
                }, 0);
                return {
                  ...u,
                  balance: u.balance + microEarningsSum
                };
              }
              return u;
            });
          });
        }

        return updated;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  // Helper to add notification
  const addNotification = (title: string, message: string, targetUserId: string = 'member-1') => {
    const newNotif: Notification = {
      id: `notif-${Date.now()}`,
      userId: targetUserId,
      title,
      message,
      read: false,
      createdAt: new Date().toISOString()
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Auth Operations
  const handleLogin = (email: string, password: string, forceRole?: 'member' | 'admin') => {
    // Find matching user
    let match = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    // If matching user not found but role is specified (forces demo creation)
    if (!match && forceRole) {
      match = DEFAULT_USERS.find(u => u.role === forceRole);
    }

    if (match) {
      setCurrentUser(match);
      if (match.role === 'admin') {
        setCurrentView('dashboard-admin');
      } else {
        setCurrentView('dashboard-member');
      }
      addNotification('Sesi Masuk Aktif', `Selamat datang kembali, ${match.name}. Keamanan enkripsi Anda aktif.`, match.id);
      return { success: true };
    }
    return { success: false, error: 'Email atau kata sandi tidak cocok.' };
  };

  const handleRegister = (name: string, email: string, password: string, referralCode?: string) => {
    const exists = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return { success: false, error: 'Email sudah terdaftar di platform kami.' };
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      role: 'member',
      balance: selectedPkg ? 0 : 25.00, // Dapatkan $25 saldo gratis pada pendaftaran reguler!
      hashrate: 0,
      refCode: `NEXA${Math.floor(100 + Math.random() * 900)}`,
      referredBy: referralCode || undefined,
      avatar: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=150&q=80',
      createdAt: new Date().toISOString()
    };

    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    setCurrentView('dashboard-member');

    addNotification('Pendaftaran Berhasil!', 'Selamat bergabung! Nikmati bonus pendaftaran senilai $25 gratis di NEXA MINING.', newUser.id);

    // If registration was accompanied by package sewa selection
    if (selectedPkg) {
      // Trigger buy contract for this new user
      setTimeout(() => {
        // Give them initial balance equal to package to simulate instant buy
        setUsers(prev => prev.map(u => u.id === newUser.id ? { ...u, balance: selectedPkg.price } : u));
        handleBuyContract(selectedPkg.id, newUser.id);
        setSelectedPkg(undefined);
      }, 500);
    }

    return { success: true };
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('landing');
  };

  // Profile update
  const handleProfileUpdate = (name: string, walletAddress: string) => {
    if (!currentUser) return;
    setUsers(prev => prev.map(u => u.id === currentUser.id ? { ...u, name, walletAddress } : u));
    alert('Profil berhasil diperbarui!');
  };

  // Rent Hashrate (Member)
  const handleBuyContract = (packageId: string, userId: string = currentUser?.id || 'member-1') => {
    const targetUser = users.find(u => u.id === userId);
    if (!targetUser) return { success: false, error: 'User tidak ditemukan' };

    const pkg = [
      { id: 'bronze', name: 'BRONZE HASHRATE', price: 50, hashrate: 5, duration: 30, dailyProfitPercent: 1.5 },
      { id: 'silver', name: 'SILVER HASHRATE', price: 250, hashrate: 30, duration: 60, dailyProfitPercent: 2.0 },
      { id: 'gold', name: 'GOLD INDUSTRIAL', price: 1000, hashrate: 135, duration: 90, dailyProfitPercent: 2.5 },
      { id: 'platinum', name: 'PLATINUM ENTERPRISE', price: 5000, hashrate: 750, duration: 120, dailyProfitPercent: 3.2 }
    ].find(p => p.id === packageId);

    if (!pkg) return { success: false, error: 'Paket tidak ditemukan' };

    if (targetUser.balance < pkg.price) {
      return { success: false, error: `Saldo Anda kurang. Harga paket ini adalah $${pkg.price}.` };
    }

    // Deduct balance and add hashrate
    setUsers(prev => prev.map(u => {
      if (u.id === targetUser.id) {
        return {
          ...u,
          balance: u.balance - pkg.price,
          hashrate: u.hashrate + pkg.hashrate
        };
      }
      return u;
    }));

    // Create new Contract
    const newContract: Contract = {
      id: `contract-${Date.now()}`,
      userId: targetUser.id,
      packageName: pkg.name,
      price: pkg.price,
      hashrate: pkg.hashrate,
      durationDays: pkg.duration,
      progress: 0,
      status: 'active',
      dailyEarnings: (pkg.price * pkg.dailyProfitPercent) / 100,
      earningsAccumulated: 0,
      lastTickTime: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    setContracts(prev => [newContract, ...prev]);

    // Add purchase transaction record
    const purchaseTx: Transaction = {
      id: `TXN-RENT-${Date.now().toString().slice(-6)}`,
      userId: targetUser.id,
      userName: targetUser.name,
      type: 'withdraw',
      amount: pkg.price,
      currency: 'Kontrak Sewa',
      walletAddress: 'Pusat Hosting Nexa',
      status: 'success',
      txHash: `0xleasecontract${Date.now()}8491abcdef`,
      createdAt: new Date().toISOString()
    };
    setTransactions(prev => [purchaseTx, ...prev]);

    addNotification(
      'Sewa Kontrak Aktif!',
      `Sewa paket ${pkg.name} berhasil diselesaikan. Daya hashrate komputasi Anda meningkat sebesar ${pkg.hashrate} TH/s.`,
      targetUser.id
    );

    return { success: true };
  };

  // Submit Deposit Request (Member)
  const handleRequestDeposit = (amount: number, currency: string, walletAddress: string) => {
    if (!currentUser) return;
    const newTx: Transaction = {
      id: `TXN-DEP-${Math.floor(100000 + Math.random() * 900000)}`,
      userId: currentUser.id,
      userName: currentUser.name,
      type: 'deposit',
      amount,
      currency,
      walletAddress,
      status: 'pending',
      txHash: `0xhash${Date.now()}abcdef`,
      createdAt: new Date().toISOString()
    };
    setTransactions(prev => [newTx, ...prev]);
    addNotification(
      'Pengajuan Deposit Diterima',
      `Permintaan isi saldo sebesar $${amount} via ${currency} sedang diverifikasi admin.`,
      currentUser.id
    );
  };

  // Submit Withdrawal Request (Member)
  const handleRequestWithdraw = (amount: number, walletAddress: string) => {
    if (!currentUser) return { success: false, error: 'Sesi habis' };
    if (currentUser.balance < amount) {
      return { success: false, error: 'Saldo Anda tidak mencukupi.' };
    }

    // Deduct user balance immediately to lock the funds
    setUsers(prev => prev.map(u => u.id === currentUser.id ? { ...u, balance: u.balance - amount } : u));

    const newTx: Transaction = {
      id: `TXN-WD-${Math.floor(100000 + Math.random() * 900000)}`,
      userId: currentUser.id,
      userName: currentUser.name,
      type: 'withdraw',
      amount,
      currency: 'USDT-TRC20',
      walletAddress,
      status: 'pending',
      txHash: `0xhash${Date.now()}bcdefa`,
      createdAt: new Date().toISOString()
    };
    setTransactions(prev => [newTx, ...prev]);

    addNotification(
      'Pengajuan Penarikan Diterima',
      `Penarikan dana sebesar $${amount} sedang dalam antrean audit admin.`,
      currentUser.id
    );

    return { success: true };
  };

  // Admin Operations: Approve Transaction (Deposit / Withdraw)
  const handleApproveTransaction = (txId: string) => {
    const tx = transactions.find(t => t.id === txId);
    if (!tx) return;

    // Update transaction status
    setTransactions(prev => prev.map(t => t.id === txId ? { ...t, status: 'success' } : t));

    // If it was a Deposit, we now credit the user's balance
    if (tx.type === 'deposit') {
      setUsers(prev => prev.map(u => {
        if (u.id === tx.userId) {
          return {
            ...u,
            balance: u.balance + tx.amount
          };
        }
        return u;
      }));
      addNotification(
        'Isi Saldo Disetujui!',
        `Deposit dana sebesar $${tx.amount} telah disetujui oleh admin. Saldo Anda telah bertambah.`,
        tx.userId
      );
    } else {
      // Withdrawal: funds were already deducted upon request. We just notify them of final blockchain execution.
      addNotification(
        'Penarikan Dana Berhasil',
        `Pengajuan penarikan sebesar $${tx.amount} telah berhasil disetujui admin dan ditransfer ke alamat dompet blockchain Anda.`,
        tx.userId
      );
    }
  };

  // Admin Operations: Reject Transaction
  const handleRejectTransaction = (txId: string) => {
    const tx = transactions.find(t => t.id === txId);
    if (!tx) return;

    // Update status to failed
    setTransactions(prev => prev.map(t => t.id === txId ? { ...t, status: 'failed' } : t));

    // If it was a Withdrawal, refund the funds back to user balance!
    if (tx.type === 'withdraw') {
      setUsers(prev => prev.map(u => {
        if (u.id === tx.userId) {
          return {
            ...u,
            balance: u.balance + tx.amount
          };
        }
        return u;
      }));
      addNotification(
        'Penarikan Dana Ditolak',
        `Pengajuan penarikan sebesar $${tx.amount} ditolak oleh admin. Dana dikembalikan penuh ke saldo Anda.`,
        tx.userId
      );
    } else {
      // Deposit rejected
      addNotification(
        'Deposit Dibatalkan',
        `Transaksi pengajuan deposit $${tx.amount} Anda telah ditolak/dibatalkan oleh admin karena ketidaksesuaian data transfer.`,
        tx.userId
      );
    }
  };

  // Admin Operations: Edit User Balance
  const handleUpdateUserBalance = (userId: string, newBalance: number) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, balance: newBalance } : u));
    addNotification('Penyesuaian Saldo', `Saldo Anda disesuaikan menjadi $${newBalance.toFixed(2)} oleh admin sistem.`, userId);
  };

  // Admin Operations: Edit User Hashrate
  const handleUpdateUserHashrate = (userId: string, newHashrate: number) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, hashrate: newHashrate } : u));
    addNotification('Penyesuaian Hashrate', `Daya hashrate komputasi Anda disesuaikan menjadi ${newHashrate.toFixed(1)} TH/s oleh admin sistem.`, userId);
  };

  const markNotificationsAsRead = () => {
    if (!currentUser) return;
    setNotifications(prev => prev.map(n => n.userId === currentUser.id ? { ...n, read: true } : n));
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <Navigation
        currentView={currentView}
        setCurrentView={setCurrentView}
        user={currentUser}
        logout={handleLogout}
        notifications={currentUser ? notifications.filter(n => n.userId === currentUser.id) : []}
        markNotificationsAsRead={markNotificationsAsRead}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      {/* View routing router switch */}
      {currentView === 'landing' && (
        <LandingPage
          setCurrentView={setCurrentView}
          onSelectPackage={(pkg) => {
            setSelectedPkg(pkg);
            setCurrentView('register');
          }}
          isDarkMode={isDarkMode}
        />
      )}

      {(currentView === 'login' || currentView === 'register') && (
        <Auth
          currentView={currentView as any}
          setCurrentView={setCurrentView as any}
          login={handleLogin}
          register={handleRegister}
          selectedPackage={selectedPkg?.name}
          isDarkMode={isDarkMode}
        />
      )}

      {currentView === 'dashboard-member' && currentUser && (
        <DashboardMember
          user={currentUser}
          contracts={contracts}
          transactions={transactions}
          buyContract={handleBuyContract}
          requestDeposit={handleRequestDeposit}
          requestWithdraw={handleRequestWithdraw}
          isDarkMode={isDarkMode}
        />
      )}

      {currentView === 'dashboard-admin' && currentUser && currentUser.role === 'admin' && (
        <DashboardAdmin
          user={currentUser}
          users={users}
          transactions={transactions}
          contracts={contracts}
          approveTransaction={handleApproveTransaction}
          rejectTransaction={handleRejectTransaction}
          updateUserBalance={handleUpdateUserBalance}
          updateUserHashrate={handleUpdateUserHashrate}
          isDarkMode={isDarkMode}
        />
      )}

      {currentView === 'packages' && currentUser && (
        <DashboardMember
          user={currentUser}
          contracts={contracts}
          transactions={transactions}
          buyContract={handleBuyContract}
          requestDeposit={handleRequestDeposit}
          requestWithdraw={handleRequestWithdraw}
          isDarkMode={isDarkMode}
        />
      )}

      {currentView === 'referral' && currentUser && (
        <DashboardMember
          user={currentUser}
          contracts={contracts}
          transactions={transactions}
          buyContract={handleBuyContract}
          requestDeposit={handleRequestDeposit}
          requestWithdraw={handleRequestWithdraw}
          isDarkMode={isDarkMode}
        />
      )}

      {currentView === 'faq' && (
        <FAQView isDarkMode={isDarkMode} />
      )}

      {(currentView === 'about' || currentView === 'contact') && (
        <AboutContact
          currentView={currentView}
          isDarkMode={isDarkMode}
          addNotification={(title, message) => {
            if (currentUser) {
              addNotification(title, message, currentUser.id);
            } else {
              addNotification(title, message, 'member-1');
            }
          }}
        />
      )}

      {currentView === 'profile' && currentUser && (
        <Profile
          user={currentUser}
          updateProfile={handleProfileUpdate}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
}
