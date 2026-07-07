import React, { useState, useEffect } from 'react';
import { 
  Cpu, Wallet, ArrowDownCircle, ArrowUpCircle, TrendingUp, Users, Award, Copy, Check, 
  Clock, RefreshCw, Send, DollarSign, ArrowRight, Compass, Sparkles, Flame, ShieldAlert, Activity
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { User, Contract, Transaction, MiningPackage } from '../types';
import { MINING_PACKAGES } from '../data/mockData';

interface DashboardMemberProps {
  user: User;
  contracts: Contract[];
  transactions: Transaction[];
  buyContract: (packageId: string) => { success: boolean; error?: string };
  requestDeposit: (amount: number, currency: string, walletAddress: string) => void;
  requestWithdraw: (amount: number, walletAddress: string) => { success: boolean; error?: string };
  isDarkMode: boolean;
}

// Mock chart data representing continuous mining efficiency over the last 7 days
const hashChartData = [
  { day: '01 Jul', hashrate: 32, temperature: 68 },
  { day: '02 Jul', hashrate: 45, temperature: 69 },
  { day: '03 Jul', hashrate: 42, temperature: 71 },
  { day: '04 Jul', hashrate: 65, temperature: 70 },
  { day: '05 Jul', hashrate: 88, temperature: 72 },
  { day: '06 Jul', hashrate: 95, temperature: 73 },
  { day: '07 Jul', hashrate: 110, temperature: 71 },
];

export default function DashboardMember({
  user,
  contracts,
  transactions,
  buyContract,
  requestDeposit,
  requestWithdraw,
  isDarkMode
}: DashboardMemberProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'packages' | 'deposit' | 'withdraw' | 'history' | 'referral'>('overview');
  
  // Clipboard copied states
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Forms state
  const [depAmount, setDepAmount] = useState<number>(100);
  const [depCoin, setDepCoin] = useState<string>('USDT-TRC20');
  const [depConfirmed, setDepConfirmed] = useState<boolean>(false);

  const [wdAmount, setWdAmount] = useState<string>('');
  const [wdAddress, setWdAddress] = useState<string>('');
  const [wdStatusMsg, setWdStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Filter user's contracts & transactions
  const userContracts = contracts.filter(c => c.userId === user.id);
  const userTransactions = transactions.filter(t => t.userId === user.id);
  const activeContracts = userContracts.filter(c => c.status === 'active');

  // Trigger copy function
  const triggerCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Deposit Coins details
  const coinAddresses: Record<string, { address: string; network: string }> = {
    'USDT-TRC20': { address: 'TY3mZ5k9f6aUX6bHkS7d89WvWq1YpXp8Zq', network: 'TRON TRC20' },
    'Bitcoin (BTC)': { address: 'bc1qxy2kg3ut78dhf5yz0ha946n4v9rn97t36t44yp', network: 'Bitcoin Native' },
    'Ethereum (ETH)': { address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F', network: 'Ethereum ERC20' },
  };

  // Submit Deposit
  const handleDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (depAmount < 10) {
      alert('Jumlah deposit minimum adalah $10');
      return;
    }
    const coinDetails = coinAddresses[depCoin] || { address: '0xAddress' };
    requestDeposit(depAmount, depCoin, coinDetails.address);
    setDepConfirmed(true);
    setTimeout(() => {
      setDepConfirmed(false);
      setActiveTab('history');
    }, 3000);
  };

  // Submit Withdraw
  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountVal = parseFloat(wdAmount);
    setWdStatusMsg(null);

    if (isNaN(amountVal) || amountVal < 15) {
      setWdStatusMsg({ type: 'error', text: 'Penarikan minimum adalah $15' });
      return;
    }
    if (!wdAddress.trim()) {
      setWdStatusMsg({ type: 'error', text: 'Harap masukkan alamat dompet tujuan' });
      return;
    }
    
    const res = requestWithdraw(amountVal, wdAddress);
    if (res.success) {
      setWdStatusMsg({ type: 'success', text: 'Pengajuan penarikan berhasil diajukan! Menunggu konfirmasi admin.' });
      setWdAmount('');
      setWdAddress('');
      setTimeout(() => {
        setWdStatusMsg(null);
        setActiveTab('history');
      }, 3000);
    } else {
      setWdStatusMsg({ type: 'error', text: res.error || 'Saldo tidak mencukupi untuk penarikan ini.' });
    }
  };

  // Rent / Buy Hashrate Contract
  const handleBuy = (pkgId: string) => {
    const res = buyContract(pkgId);
    if (res.success) {
      alert(`Kontrak hashrate berhasil disewa! Daya komputasi Anda meningkat.`);
      setActiveTab('overview');
    } else {
      alert(`Gagal menyewa: ${res.error}. Silakan lakukan Deposit terlebih dahulu.`);
      if (res.error?.includes('Saldo')) {
        setActiveTab('deposit');
      }
    }
  };

  return (
    <div className={`min-h-screen pt-24 pb-16 transition-colors duration-300 ${
      isDarkMode ? 'bg-[#03010b] text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Welcome Member Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold flex items-center gap-2">
              Halo, {user.name} <span className="animate-bounce">👋</span>
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm">
              Kelola aktivitas cloud mining Anda di NEXA Platform. Akun terdaftar pada {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
          
          {/* Member Meta Information Badge */}
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-2xl border flex items-center gap-3 ${
              isDarkMode ? 'bg-[#0b081f] border-purple-950/50' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div className="p-2 bg-purple-500/10 text-purple-400 rounded-xl">
                <Cpu size={18} />
              </div>
              <div>
                <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Total Hashrate</div>
                <div className="text-sm font-bold font-mono text-cyan-400">{user.hashrate.toFixed(1)} TH/s</div>
              </div>
            </div>

            <div className={`p-3 rounded-2xl border flex items-center gap-3 ${
              isDarkMode ? 'bg-[#0b081f] border-purple-950/50' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div className="p-2 bg-yellow-500/10 text-yellow-500 rounded-xl">
                <Wallet size={18} />
              </div>
              <div>
                <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Saldo Tersedia</div>
                <div className="text-sm font-bold font-mono text-yellow-500">${user.balance.toFixed(4)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Sub Navigation Tabs (Binance/Bybit Style scrollable bar) */}
        <div className="flex items-center overflow-x-auto gap-2 pb-3 mb-6 border-b border-purple-950/20 scrollbar-none">
          {[
            { id: 'overview', label: 'Ringkasan', icon: Compass },
            { id: 'packages', label: 'Sewa Hashrate', icon: Award },
            { id: 'deposit', label: 'Deposit Saldo', icon: ArrowDownCircle },
            { id: 'withdraw', label: 'Penarikan (WD)', icon: ArrowUpCircle },
            { id: 'history', label: 'Riwayat Keuangan', icon: Clock },
            { id: 'referral', label: 'Afiliasi & Referral', icon: Users },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 py-2.5 px-4 rounded-xl font-semibold text-xs transition-all whitespace-nowrap border ${
                  activeTab === tab.id
                    ? isDarkMode
                      ? 'bg-gradient-to-r from-purple-900/30 to-cyan-900/30 border-cyan-500 text-cyan-400 font-bold glow-cyan'
                      : 'bg-cyan-50 border-cyan-500 text-cyan-600 font-bold'
                    : isDarkMode
                      ? 'border-transparent text-slate-400 hover:text-white hover:bg-purple-950/10'
                      : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon size={14} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Dashboard Views */}

        {/* 1. OVERVIEW VIEW */}
        {activeTab === 'overview' && (
          <div className="flex flex-col gap-6">
            
            {/* Live Ticker counter banner & Mining Status */}
            <div className={`p-6 rounded-3xl border relative overflow-hidden ${
              isDarkMode ? 'bg-[#080517] border-purple-950/60' : 'bg-white border-slate-200'
            }`}>
              <div className="absolute top-0 right-0 p-4">
                <span className="px-3 py-1 bg-emerald-500/15 border border-emerald-500/20 rounded-full text-xs text-emerald-400 font-bold font-mono animate-pulse flex items-center gap-1">
                  <Flame size={12} /> MINING LIVE
                </span>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider font-bold">Aktivitas Tambang Berjalan</div>
                  <h3 className="text-3xl sm:text-4xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-amber-500 font-mono mt-1">
                    ${user.balance.toFixed(6)}
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1 font-mono">
                    <TrendingUp size={12} className="text-cyan-400" /> +{user.hashrate > 0 ? (user.hashrate * 0.0003).toFixed(5) : '0.00000'} USD / menit
                  </p>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setActiveTab('packages')}
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 text-slate-950 text-xs font-bold font-display hover:opacity-90 transition-all flex items-center gap-1"
                  >
                    Tambah Hashrate <ArrowRight size={14} />
                  </button>
                  <button
                    onClick={() => setActiveTab('withdraw')}
                    className={`px-5 py-3 rounded-xl border text-xs font-bold transition-all ${
                      isDarkMode ? 'border-purple-900/50 bg-[#0e0921]/60 hover:bg-[#130c2f]' : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    Withdraw
                  </button>
                </div>
              </div>
            </div>

            {/* Grid of Telemetry Chart & Stats Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Telemetry Chart */}
              <div className={`lg:col-span-8 p-6 rounded-3xl border flex flex-col justify-between ${
                isDarkMode ? 'bg-[#080517] border-purple-950/60' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-sm font-bold font-display">Grafik Kinerja Komputasi</h3>
                    <p className="text-[10px] text-slate-500">Hasil real-time penambangan hashrate 7 hari terakhir</p>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1 bg-purple-950/20 p-1.5 rounded-lg border border-purple-900/20">
                    <Activity size={10} className="text-cyan-400" /> TELEMETRI OK
                  </span>
                </div>

                {/* Recharts Render */}
                <div className="h-60 w-full mt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={hashChartData}>
                      <defs>
                        <linearGradient id="colorHash" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#1e1b4b" : "#e2e8f0"} opacity={0.3} />
                      <XAxis dataKey="day" stroke={isDarkMode ? "#94a3b8" : "#475569"} fontSize={10} />
                      <YAxis stroke={isDarkMode ? "#94a3b8" : "#475569"} fontSize={10} label={{ value: 'TH/s', angle: -95, position: 'insideLeft', style: { fill: '#64748b', fontSize: 10 } }} />
                      <Tooltip contentStyle={{ backgroundColor: isDarkMode ? '#0d0a21' : '#ffffff', borderColor: '#8b5cf6', borderRadius: '12px', fontSize: '10px' }} />
                      <Area type="monotone" dataKey="hashrate" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#colorHash)" name="Hash Power" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Stats & Quick Actions */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                
                {/* Referrals quick card */}
                <div className={`p-6 rounded-3xl border flex-1 flex flex-col justify-between ${
                  isDarkMode ? 'bg-[#080517] border-purple-950/60' : 'bg-white border-slate-200'
                }`}>
                  <div>
                    <h3 className="text-sm font-bold flex items-center gap-1.5">
                      <Users size={16} className="text-purple-400" /> Afiliasi Nexa
                    </h3>
                    <p className="text-[10px] text-slate-500 mt-1">Dapatkan komisi hashrate instan hingga 10%.</p>
                  </div>

                  <div className="my-4 p-3 rounded-2xl bg-purple-950/15 border border-purple-900/15 flex flex-col gap-1 text-center font-mono">
                    <span className="text-[9px] text-slate-500 uppercase">KODE REFERRAL ANDA</span>
                    <span className="text-lg font-bold text-white tracking-wider">{user.refCode}</span>
                  </div>

                  <button
                    onClick={() => setActiveTab('referral')}
                    className="w-full py-2.5 rounded-xl border border-purple-950 bg-[#0e0921]/60 text-xs font-bold transition-all hover:bg-[#160d34]"
                  >
                    Kelola Komisi
                  </button>
                </div>

                {/* Transactions summary card */}
                <div className={`p-6 rounded-3xl border flex-1 flex flex-col justify-between ${
                  isDarkMode ? 'bg-[#080517] border-purple-950/60' : 'bg-white border-slate-200'
                }`}>
                  <div>
                    <h3 className="text-sm font-bold flex items-center gap-1.5">
                      <Clock size={16} className="text-yellow-500" /> Transaksi Terakhir
                    </h3>
                    <p className="text-[10px] text-slate-500 mt-1">Status pengajuan deposit & penarikan dana.</p>
                  </div>

                  <div className="my-3 flex flex-col gap-2">
                    {userTransactions.length === 0 ? (
                      <span className="text-xs text-slate-500 text-center py-2">Belum ada transaksi keuangan.</span>
                    ) : (
                      userTransactions.slice(0, 2).map(tx => (
                        <div key={tx.id} className="flex justify-between items-center text-xs">
                          <span className="text-slate-400 capitalize">{tx.type === 'deposit' ? 'Deposit' : 'Withdraw'}</span>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold font-mono text-slate-200">${tx.amount}</span>
                            <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase ${
                              tx.status === 'success' ? 'bg-emerald-500/10 text-emerald-400' :
                              tx.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-red-500/10 text-red-400'
                            }`}>{tx.status}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <button
                    onClick={() => setActiveTab('history')}
                    className="w-full py-2.5 rounded-xl border border-purple-950 bg-[#0e0921]/60 text-xs font-bold transition-all hover:bg-[#160d34]"
                  >
                    Semua Transaksi
                  </button>
                </div>

              </div>

            </div>

            {/* User Active Contracts list panel */}
            <div className={`p-6 rounded-3xl border ${
              isDarkMode ? 'bg-[#080517] border-purple-950/60' : 'bg-white border-slate-200'
            }`}>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-sm font-bold font-display">Kontrak Pertambangan Aktif Anda</h3>
                  <p className="text-[10px] text-slate-500">Sewa hashrate cloud yang sedang aktif berjalan</p>
                </div>
                <span className="px-2.5 py-1 bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-bold text-cyan-400 rounded-lg">
                  {activeContracts.length} Kontrak Aktif
                </span>
              </div>

              {activeContracts.length === 0 ? (
                <div className="text-center py-10 flex flex-col items-center gap-3">
                  <Cpu size={36} className="text-slate-600 animate-pulse" />
                  <p className="text-xs text-slate-500">Anda belum menyewa daya hashrate.</p>
                  <button
                    onClick={() => setActiveTab('packages')}
                    className="px-4 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold hover:bg-purple-500 transition-all"
                  >
                    Mulai Sewa Pertama
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeContracts.map(contract => (
                    <div
                      key={contract.id}
                      className={`p-4 rounded-2xl border ${
                        isDarkMode ? 'bg-[#0f0b26] border-purple-900/30' : 'bg-slate-50 border-slate-200'
                      } flex flex-col gap-3 relative overflow-hidden`}
                    >
                      <div className="absolute top-0 right-0 p-3 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                        <span className="text-[8px] font-mono font-bold text-emerald-400 tracking-wider">MINING...</span>
                      </div>

                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-xs font-bold text-white uppercase">{contract.packageName}</div>
                          <div className="text-[10px] text-slate-500 font-mono mt-0.5">Sewa: ${contract.price}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-bold text-cyan-400 font-mono">{contract.hashrate} TH/s</div>
                          <div className="text-[9px] text-slate-500">Daya Komputasi</div>
                        </div>
                      </div>

                      {/* Earnings detail */}
                      <div className="grid grid-cols-2 gap-2 bg-[#020108]/40 p-2.5 rounded-xl font-mono text-[10px]">
                        <div>
                          <span className="text-slate-500">Profit / Hari:</span>
                          <div className="text-emerald-400 font-bold">${contract.dailyEarnings.toFixed(2)}</div>
                        </div>
                        <div>
                          <span className="text-slate-500">Akumulasi Hasil:</span>
                          <div className="text-yellow-500 font-bold">${contract.earningsAccumulated.toFixed(4)}</div>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div>
                        <div className="flex justify-between text-[9px] text-slate-500 mb-1">
                          <span>Progress Kontrak ({contract.progress.toFixed(2)}%)</span>
                          <span>{contract.durationDays} hari</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
                            style={{ width: `${contract.progress}%` }}
                          ></div>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

        {/* 2. PACKAGES VIEW */}
        {activeTab === 'packages' && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-display font-extrabold text-cyan-400">Sewa Hashrate Cloud</h2>
              <p className="text-slate-500 text-xs mt-1">Aktifkan salah satu paket penambangan cloud di bawah untuk menaikkan hashrate dan pendapatan harian.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {MINING_PACKAGES.map(pkg => {
                const canAfford = user.balance >= pkg.price;
                return (
                  <div
                    key={pkg.id}
                    className={`rounded-3xl border p-5 flex flex-col justify-between relative transition-all ${
                      pkg.popular ? 'border-purple-500 glow-purple' : 'border-purple-950/30'
                    } ${isDarkMode ? 'bg-[#080516] hover:bg-[#0c0821]' : 'bg-white shadow-sm hover:bg-slate-50'}`}
                  >
                    <div className="flex flex-col gap-3">
                      <div className="text-xs font-bold text-cyan-400 uppercase font-mono">{pkg.name}</div>
                      
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-display font-extrabold font-mono">${pkg.price}</span>
                        <span className="text-xs text-slate-500">/ {pkg.durationDays} hari</span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-purple-950/15 border border-purple-900/10 flex justify-between text-xs font-mono">
                        <span className="text-slate-500">Hashrate:</span>
                        <span className="font-bold text-white">{pkg.hashrate} TH/s</span>
                      </div>

                      <div className="flex flex-col gap-2 my-2 text-[11px] leading-relaxed">
                        {pkg.features.map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-1.5">
                            <span className="text-cyan-400">✓</span>
                            <span className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 flex flex-col gap-2">
                      <button
                        onClick={() => handleBuy(pkg.id)}
                        className={`w-full py-3 rounded-xl font-bold text-xs tracking-wider uppercase transition-all ${
                          pkg.popular
                            ? 'bg-gradient-to-r from-cyan-400 to-purple-500 text-slate-950'
                            : isDarkMode 
                              ? 'bg-purple-950/30 border border-purple-900/40 text-slate-200 hover:bg-purple-950/60' 
                              : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                        }`}
                      >
                        Sewa Sekarang
                      </button>
                      <div className="text-center text-[9px] text-slate-500">
                        {canAfford ? 'Sewa menggunakan saldo akun Anda' : 'Saldo Anda kurang untuk membeli paket ini'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. DEPOSIT VIEW */}
        {activeTab === 'deposit' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Form Left */}
            <div className="lg:col-span-7">
              <div className={`p-6 sm:p-8 rounded-3xl border ${
                isDarkMode ? 'bg-[#080517] border-purple-950/60' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <h2 className="text-lg font-bold font-display flex items-center gap-2">
                  <ArrowDownCircle className="text-cyan-400" /> Isi Saldo (Deposit)
                </h2>
                <p className="text-xs text-slate-500 mt-1 mb-6">Ajukan penambahan saldo USD melalui transfer cryptocurrency. Konfirmasi admin instan.</p>

                {depConfirmed ? (
                  <div className="py-10 text-center flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20 animate-bounce">
                      <Check size={24} />
                    </div>
                    <h3 className="font-bold text-sm">Deposit Berhasil Diajukan!</h3>
                    <p className="text-xs text-slate-400 max-w-sm">
                      Harap tunggu beberapa menit untuk konfirmasi blockchain. Anda dapat menyetujui transaksi ini secara instan di menu <strong>Admin Panel</strong> untuk mempermudah uji coba!
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleDepositSubmit} className="flex flex-col gap-5">
                    
                    {/* Amount Input */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-400">Jumlah Deposit (USD)</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 font-mono text-sm">$</div>
                        <input
                          type="number"
                          required
                          min="10"
                          step="1"
                          value={depAmount}
                          onChange={(e) => setDepAmount(Number(e.target.value))}
                          className={`w-full pl-8 pr-4 py-3 rounded-xl text-sm font-semibold focus:outline-none transition-all ${
                            isDarkMode 
                              ? 'bg-[#0f0b24] border-purple-950/40 focus:border-cyan-500 text-white' 
                              : 'bg-slate-50 border-slate-200 focus:border-cyan-500 text-slate-800'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Currency Selector */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-400">Pilih Koin & Jaringan</label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {Object.keys(coinAddresses).map(coin => (
                          <button
                            key={coin}
                            type="button"
                            onClick={() => setDepCoin(coin)}
                            className={`py-3 px-4 rounded-xl border text-xs font-semibold text-center transition-all ${
                              depCoin === coin
                                ? 'bg-purple-950/20 border-cyan-500 text-cyan-400 font-bold shadow-md'
                                : isDarkMode 
                                  ? 'border-purple-950/50 bg-[#0d0a21] text-slate-400 hover:bg-purple-950/15' 
                                  : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            {coin}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Deposit Instructions / Address Area */}
                    <div className="p-4 rounded-2xl bg-purple-950/10 border border-purple-900/10 flex flex-col gap-3 font-mono text-xs">
                      <div className="flex justify-between items-center text-[10px] text-slate-500 pb-2 border-b border-purple-950/20">
                        <span>Alamat Deposit Resmi NEXA</span>
                        <span className="text-cyan-400 uppercase tracking-widest font-bold text-[8px]">{coinAddresses[depCoin]?.network}</span>
                      </div>
                      
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] text-slate-500">Kirimkan senilai ${depAmount} ke alamat berikut:</span>
                        <div className="flex items-center justify-between gap-2 bg-[#020108] p-2.5 rounded-xl border border-purple-950/40 mt-1">
                          <span className="text-slate-300 select-all truncate text-[10px]">{coinAddresses[depCoin]?.address}</span>
                          <button
                            type="button"
                            onClick={() => triggerCopy(coinAddresses[depCoin]?.address, 'address')}
                            className="text-cyan-400 hover:text-cyan-300 p-1 shrink-0"
                            title="Salin Alamat"
                          >
                            {copiedText === 'address' ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl font-bold font-display text-xs tracking-wider uppercase text-slate-950 bg-gradient-to-r from-cyan-400 to-purple-500 shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-1.5"
                    >
                      <Send size={14} /> Konfirmasi Transfer Saldo
                    </button>

                  </form>
                )}
              </div>
            </div>

            {/* Instruction Right */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className={`p-6 rounded-3xl border ${
                isDarkMode ? 'bg-[#080517] border-purple-950/60' : 'bg-white border-slate-200'
              }`}>
                <h3 className="text-sm font-bold mb-4">Informasi Penting Deposit</h3>
                <div className="flex flex-col gap-4 text-xs text-slate-400 leading-relaxed">
                  <div className="flex gap-2.5">
                    <span className="font-bold text-cyan-400 font-mono">01.</span>
                    <p>Hanya kirimkan koin yang tepat ke alamat dompet yang sesuai. Kesalahan koin dapat menyebabkan dana hilang.</p>
                  </div>
                  <div className="flex gap-2.5">
                    <span className="font-bold text-cyan-400 font-mono">02.</span>
                    <p>Proses transfer biasanya memakan waktu 5-15 menit tergantung kesibukan jaringan blockchain global.</p>
                  </div>
                  <div className="flex gap-2.5">
                    <span className="font-bold text-cyan-400 font-mono">03.</span>
                    <p>Setelah melakukan transfer, saldo Anda akan otomatis bertambah setelah disetujui oleh admin.</p>
                  </div>
                </div>
              </div>

              {/* Demo Sandbox Alert */}
              <div className="p-5 rounded-2xl bg-yellow-950/20 border border-yellow-500/30 text-xs text-yellow-500 flex gap-2.5 items-start">
                <ShieldAlert size={16} className="shrink-0 mt-0.5" />
                <div>
                  <strong className="font-semibold block mb-0.5">Petunjuk Uji Coba (Sandbox)</strong>
                  Sebagai peninjau, Anda bisa langsung masuk sebagai <strong>Admin Demo</strong> setelah mengajukan deposit ini untuk mengonfirmasi transaksi instan!
                </div>
              </div>
            </div>

          </div>
        )}

        {/* 4. WITHDRAW VIEW */}
        {activeTab === 'withdraw' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            <div className="lg:col-span-7">
              <div className={`p-6 sm:p-8 rounded-3xl border ${
                isDarkMode ? 'bg-[#080517] border-purple-950/60' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <h2 className="text-lg font-bold font-display flex items-center gap-2">
                  <ArrowUpCircle className="text-cyan-400" /> Penarikan Saldo (Withdrawal)
                </h2>
                <p className="text-xs text-slate-500 mt-1 mb-6">Ajukan penarikan keuntungan tambang langsung ke dompet eksternal Anda.</p>

                {wdStatusMsg && (
                  <div className={`mb-5 p-3 rounded-xl border text-xs flex items-center gap-2 ${
                    wdStatusMsg.type === 'success' 
                      ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-400' 
                      : 'bg-red-950/20 border-red-500/30 text-red-400'
                  }`}>
                    <span>{wdStatusMsg.text}</span>
                  </div>
                )}

                <form onSubmit={handleWithdrawSubmit} className="flex flex-col gap-5">
                  
                  {/* WD Amount */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between text-xs text-slate-400">
                      <label className="font-semibold">Jumlah Penarikan (USD)</label>
                      <span>Maksimal penarikan: <strong className="text-yellow-500 font-mono">${user.balance.toFixed(4)}</strong></span>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 font-mono text-sm">$</div>
                      <input
                        type="number"
                        required
                        min="15"
                        step="0.01"
                        placeholder="Min $15"
                        value={wdAmount}
                        onChange={(e) => setWdAmount(e.target.value)}
                        className={`w-full pl-8 pr-4 py-3 rounded-xl text-sm font-semibold focus:outline-none transition-all ${
                          isDarkMode 
                            ? 'bg-[#0f0b24] border-purple-950/40 focus:border-cyan-500 text-white' 
                            : 'bg-slate-50 border-slate-200 focus:border-cyan-500 text-slate-800'
                        }`}
                      />
                    </div>
                  </div>

                  {/* WD Address */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-400">Alamat Dompet Penerima (TRC20 / ERC20 / BTC)</label>
                    <input
                      type="text"
                      required
                      placeholder="Masukkan alamat dompet crypto tujuan Anda"
                      value={wdAddress}
                      onChange={(e) => setWdAddress(e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl text-sm font-mono focus:outline-none transition-all ${
                        isDarkMode 
                          ? 'bg-[#0f0b24] border-purple-950/40 focus:border-cyan-500 text-white' 
                          : 'bg-slate-50 border-slate-200 focus:border-cyan-500 text-slate-800'
                      }`}
                    />
                    <span className="text-[10px] text-slate-500">Pastikan alamat dompet Anda sudah benar. Transaksi blockchain tidak dapat dibatalkan.</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl font-bold font-display text-xs tracking-wider uppercase text-slate-950 bg-gradient-to-r from-cyan-400 to-purple-500 shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-1.5"
                  >
                    Kirim Pengajuan Penarikan <ArrowRight size={14} />
                  </button>

                </form>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className={`p-6 rounded-3xl border ${
                isDarkMode ? 'bg-[#080517] border-purple-950/60' : 'bg-white border-slate-200'
              }`}>
                <h3 className="text-sm font-bold mb-4">Informasi Ketentuan Withdrawal</h3>
                <div className="flex flex-col gap-4 text-xs text-slate-400 leading-relaxed">
                  <div className="flex gap-2.5">
                    <span className="font-bold text-purple-400 font-mono">01.</span>
                    <p>Batas minimum penarikan dana tunggal adalah $15.</p>
                  </div>
                  <div className="flex gap-2.5">
                    <span className="font-bold text-purple-400 font-mono">02.</span>
                    <p>Biaya administrasi penarikan ditiadakan (0% Fee) untuk mendukung profitabilitas anggota.</p>
                  </div>
                  <div className="flex gap-2.5">
                    <span className="font-bold text-purple-400 font-mono">03.</span>
                    <p>Permintaan Anda akan masuk antrean persetujuan admin sebelum dikirim ke jaringan blockchain.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* 5. HISTORY VIEW */}
        {activeTab === 'history' && (
          <div className={`p-6 rounded-3xl border ${
            isDarkMode ? 'bg-[#080517] border-purple-950/60' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className="flex justify-between items-center mb-6 border-b border-purple-950/20 pb-4">
              <div>
                <h2 className="text-sm font-bold font-display">Riwayat Transaksi Keuangan</h2>
                <p className="text-[10px] text-slate-500">Semua catatan transaksi pengisian dan penarikan saldo Anda</p>
              </div>
              <button
                onClick={() => alert('Transaksi disinkronisasi!')}
                className="p-2 border border-purple-950 rounded-xl hover:bg-purple-950/15 text-slate-400"
                title="Segarkan data"
              >
                <RefreshCw size={14} />
              </button>
            </div>

            {userTransactions.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-xs">
                Belum ada riwayat transaksi keuangan tercatat.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-purple-950/20 text-slate-500">
                      <th className="py-3 px-2">ID Transaksi</th>
                      <th className="py-3 px-2">Tanggal</th>
                      <th className="py-3 px-2">Tipe</th>
                      <th className="py-3 px-2">Koin</th>
                      <th className="py-3 px-2">Jumlah</th>
                      <th className="py-3 px-2">Alamat Dompet</th>
                      <th className="py-3 px-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userTransactions.map(tx => (
                      <tr key={tx.id} className="border-b border-purple-950/10 text-slate-300 hover:bg-purple-950/5">
                        <td className="py-3.5 px-2 text-[10px] text-cyan-400 truncate max-w-[120px]">{tx.id}</td>
                        <td className="py-3.5 px-2 text-[10px] text-slate-500">{new Date(tx.createdAt).toLocaleDateString()}</td>
                        <td className="py-3.5 px-2">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                            tx.type === 'deposit' ? 'text-cyan-400 bg-cyan-950/10' : 'text-purple-400 bg-purple-950/10'
                          }`}>
                            {tx.type === 'deposit' ? 'DEPOSIT' : 'WITHDRAW'}
                          </span>
                        </td>
                        <td className="py-3.5 px-2 text-slate-400">{tx.currency}</td>
                        <td className="py-3.5 px-2 font-bold text-white">${tx.amount.toFixed(2)}</td>
                        <td className="py-3.5 px-2 text-[10px] text-slate-500 truncate max-w-[150px]" title={tx.walletAddress}>
                          {tx.walletAddress}
                        </td>
                        <td className="py-3.5 px-2">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                            tx.status === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/15' :
                            tx.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/15' :
                            'bg-red-500/10 text-red-400 border border-red-500/15'
                          }`}>
                            {tx.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* 6. REFERRAL VIEW */}
        {activeTab === 'referral' && (
          <div className="flex flex-col gap-6">
            
            {/* Top overview panel */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className={`p-6 rounded-3xl border ${
                isDarkMode ? 'bg-[#080517] border-purple-950/60' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className="text-xs text-slate-500 uppercase font-bold font-mono">Kode Afiliasi Anda</div>
                <div className="text-2xl font-bold font-mono text-cyan-400 mt-2 flex items-center justify-between">
                  <span>{user.refCode}</span>
                  <button
                    onClick={() => triggerCopy(user.refCode, 'code')}
                    className="p-2 border border-purple-950/50 rounded-xl hover:bg-purple-950/20 text-slate-400"
                  >
                    {copiedText === 'code' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>

              <div className={`p-6 rounded-3xl border ${
                isDarkMode ? 'bg-[#080517] border-purple-950/60' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className="text-xs text-slate-500 uppercase font-bold font-mono">Link Afiliasi Anda</div>
                <div className="text-xs text-slate-300 font-mono mt-2 flex items-center justify-between bg-[#020108] p-2 rounded-xl">
                  <span className="truncate mr-2">https://nexa-mining.com/ref={user.refCode}</span>
                  <button
                    onClick={() => triggerCopy(`https://nexa-mining.com/ref=${user.refCode}`, 'link')}
                    className="p-1.5 text-cyan-400 hover:text-cyan-300"
                  >
                    {copiedText === 'link' ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  </button>
                </div>
              </div>

              <div className={`p-6 rounded-3xl border ${
                isDarkMode ? 'bg-[#080517] border-purple-950/60' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className="text-xs text-slate-500 uppercase font-bold font-mono">Komisi Afiliasi Terkumpul</div>
                <div className="text-2xl font-extrabold font-mono text-yellow-500 mt-2">$0.00</div>
              </div>
            </div>

            {/* Program details card */}
            <div className={`p-6 sm:p-8 rounded-3xl border ${
              isDarkMode ? 'bg-[#080517] border-purple-950/60' : 'bg-white border-slate-200'
            }`}>
              <h3 className="text-sm font-bold flex items-center gap-2 mb-4">
                <Sparkles size={16} className="text-yellow-400" /> Bagaimana Program Afiliasi Bekerja?
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-400 leading-relaxed">
                <div className="p-4 rounded-2xl bg-purple-950/10 border border-purple-900/10 flex flex-col gap-2">
                  <span className="w-6 h-6 rounded-full bg-cyan-400/10 text-cyan-400 font-bold flex items-center justify-center font-mono">1</span>
                  <strong className="text-white">Bagikan Link Anda</strong>
                  <p>Salin kode atau link afiliasi Anda di atas, dan bagikan kepada relasi atau komunitas cryptocurrency Anda.</p>
                </div>
                
                <div className="p-4 rounded-2xl bg-purple-950/10 border border-purple-900/10 flex flex-col gap-2">
                  <span className="w-6 h-6 rounded-full bg-cyan-400/10 text-cyan-400 font-bold flex items-center justify-center font-mono">2</span>
                  <strong className="text-white">Teman Melakukan Sewa</strong>
                  <p>Setiap kali rekan Anda mendaftar menggunakan tautan Anda dan menyewa hashrate Bronze, Silver, Gold, atau Platinum.</p>
                </div>

                <div className="p-4 rounded-2xl bg-purple-950/10 border border-purple-900/10 flex flex-col gap-2">
                  <span className="w-6 h-6 rounded-full bg-cyan-400/10 text-cyan-400 font-bold flex items-center justify-center font-mono">3</span>
                  <strong className="text-white">Dapatkan Komisi 10%</strong>
                  <p>Platform kami akan memberikan komisi langsung sebesar 10% dari nilai sewa rekan Anda yang langsung masuk ke saldo utama.</p>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
