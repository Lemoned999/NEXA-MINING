import React, { useState } from 'react';
import { 
  ShieldCheck, Users, ArrowDownCircle, ArrowUpCircle, Cpu, RefreshCw, Check, X, 
  Search, Edit2, Plus, DollarSign, TrendingUp, Settings, Sliders, BellRing, Save, KeyRound
} from 'lucide-react';
import { User, Transaction, Contract } from '../types';

interface DashboardAdminProps {
  user: User;
  users: User[];
  transactions: Transaction[];
  contracts: Contract[];
  approveTransaction: (txId: string) => void;
  rejectTransaction: (txId: string) => void;
  updateUserBalance: (userId: string, newBalance: number) => void;
  updateUserHashrate: (userId: string, newHashrate: number) => void;
  isDarkMode: boolean;
}

export default function DashboardAdmin({
  user,
  users,
  transactions,
  contracts,
  approveTransaction,
  rejectTransaction,
  updateUserBalance,
  updateUserHashrate,
  isDarkMode
}: DashboardAdminProps) {
  const [activeTab, setActiveTab] = useState<'approvals' | 'users' | 'settings'>('approvals');
  const [searchQuery, setSearchQuery] = useState('');
  
  // States for user quick-edit
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editBalance, setEditBalance] = useState<string>('');
  const [editHashrate, setEditHashrate] = useState<string>('');

  // Global settings state
  const [announcement, setAnnouncement] = useState('Nexa Mining Maintenance Selesai. Selamat menambang kembali!');
  const [difficulty, setDifficulty] = useState(85);
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Filter pending transactions
  const pendingTransactions = transactions.filter(t => t.status === 'pending');
  const pastTransactions = transactions.filter(t => t.status !== 'pending');

  // Search users filter
  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Trigger editing modal
  const startEditing = (u: User) => {
    setEditingUserId(u.id);
    setEditBalance(u.balance.toString());
    setEditHashrate(u.hashrate.toString());
  };

  // Save quick-edit
  const saveUserEdit = (userId: string) => {
    const balVal = parseFloat(editBalance);
    const hashVal = parseFloat(editHashrate);
    if (!isNaN(balVal)) {
      updateUserBalance(userId, balVal);
    }
    if (!isNaN(hashVal)) {
      updateUserHashrate(userId, hashVal);
    }
    setEditingUserId(null);
    alert('Informasi pengguna berhasil diperbarui!');
  };

  // Save admin settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  return (
    <div className={`min-h-screen pt-24 pb-16 transition-colors duration-300 ${
      isDarkMode ? 'bg-[#03010b] text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Welcome Admin Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold flex items-center gap-2 text-purple-400">
              <ShieldCheck /> NEXA ADMIN CONTROL PANEL
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm">
              Kelola konfirmasi transaksi keuangan, pantau seluruh user, dan modifikasi hashrate komputasi global.
            </p>
          </div>
          
          <span className="px-3 py-1 bg-purple-950/30 border border-purple-500/20 text-xs text-purple-400 font-bold font-mono rounded-lg">
            Sistem Administrator Utama
          </span>
        </div>

        {/* Global Stats Overview Banner (Finance scale metrics) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          
          <div className={`p-5 rounded-3xl border ${
            isDarkMode ? 'bg-[#080517] border-purple-950/60' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className="flex justify-between items-start">
              <div className="text-xs text-slate-500 uppercase font-bold font-mono">Total Anggota</div>
              <Users size={16} className="text-purple-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-white mt-3">{users.length} User</div>
            <div className="text-[10px] text-slate-500 mt-1">2 User Demo Aktif</div>
          </div>

          <div className={`p-5 rounded-3xl border ${
            isDarkMode ? 'bg-[#080517] border-purple-950/60' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className="flex justify-between items-start">
              <div className="text-xs text-slate-500 uppercase font-bold font-mono">Antrean Transaksi</div>
              <ArrowDownCircle size={16} className="text-yellow-500" />
            </div>
            <div className="text-2xl font-bold font-mono text-yellow-500 mt-3">{pendingTransactions.length} Pending</div>
            <div className="text-[10px] text-slate-500 mt-1">Butuh persetujuan segera</div>
          </div>

          <div className={`p-5 rounded-3xl border ${
            isDarkMode ? 'bg-[#080517] border-purple-950/60' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className="flex justify-between items-start">
              <div className="text-xs text-slate-500 uppercase font-bold font-mono">Kontrak Berjalan</div>
              <Cpu size={16} className="text-cyan-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-cyan-400 mt-3">{contracts.length} Kontrak</div>
            <div className="text-[10px] text-slate-500 mt-1">Total hashrate aktif di-hosting</div>
          </div>

          <div className={`p-5 rounded-3xl border ${
            isDarkMode ? 'bg-[#080517] border-purple-950/60' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className="flex justify-between items-start">
              <div className="text-xs text-slate-500 uppercase font-bold font-mono">Volume Transaksi</div>
              <TrendingUp size={16} className="text-emerald-500" />
            </div>
            <div className="text-2xl font-bold font-mono text-emerald-400 mt-3">${transactions.reduce((acc, t) => acc + t.amount, 0).toLocaleString()}</div>
            <div className="text-[10px] text-slate-500 mt-1">Akumulasi deposit & penarikan</div>
          </div>

        </div>

        {/* Sub Navigation Bar inside Admin Dashboard */}
        <div className="flex items-center gap-3 mb-6 border-b border-purple-950/20 pb-3">
          <button
            onClick={() => setActiveTab('approvals')}
            className={`flex items-center gap-1.5 py-2 px-4 rounded-xl font-semibold text-xs transition-all border ${
              activeTab === 'approvals'
                ? isDarkMode ? 'bg-purple-950/25 border-purple-500 text-purple-400' : 'bg-purple-50 border-purple-500 text-purple-600'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <ArrowDownCircle size={14} />
            Persetujuan Transaksi ({pendingTransactions.length})
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`flex items-center gap-1.5 py-2 px-4 rounded-xl font-semibold text-xs transition-all border ${
              activeTab === 'users'
                ? isDarkMode ? 'bg-purple-950/25 border-purple-500 text-purple-400' : 'bg-purple-50 border-purple-500 text-purple-600'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Users size={14} />
            Manajemen Anggota
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-1.5 py-2 px-4 rounded-xl font-semibold text-xs transition-all border ${
              activeTab === 'settings'
                ? isDarkMode ? 'bg-purple-950/25 border-purple-500 text-purple-400' : 'bg-purple-50 border-purple-500 text-purple-600'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Settings size={14} />
            Konfigurasi Sistem
          </button>
        </div>

        {/* Admin Views */}

        {/* 1. APPROVALS TAB */}
        {activeTab === 'approvals' && (
          <div className="flex flex-col gap-6">
            
            {/* Pending Transactions Section */}
            <div className={`p-6 rounded-3xl border ${
              isDarkMode ? 'bg-[#080517] border-purple-950/60' : 'bg-white border-slate-200'
            }`}>
              <h2 className="text-sm font-bold font-display mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-yellow-500 animate-ping"></span>
                Antrean Permintaan Tertunda (Pending Requests)
              </h2>

              {pendingTransactions.length === 0 ? (
                <div className="text-center py-10 text-xs text-slate-500">
                  Semua bersih! Tidak ada transaksi pending saat ini. Anda dapat login kembali sebagai member dan melakukan deposit atau penarikan baru untuk diuji di sini!
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="border-b border-purple-950/20 text-slate-500 pb-2">
                        <th className="py-3 px-2">ID</th>
                        <th className="py-3 px-2">Nama Pengguna</th>
                        <th className="py-3 px-2">Tipe</th>
                        <th className="py-3 px-2">Metode Koin</th>
                        <th className="py-3 px-2">Jumlah</th>
                        <th className="py-3 px-2">Alamat Wallet</th>
                        <th className="py-3 px-2 text-right">Tindakan</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingTransactions.map(tx => (
                        <tr key={tx.id} className="border-b border-purple-950/10 hover:bg-purple-950/5 text-slate-300">
                          <td className="py-3.5 px-2 text-[10px] text-cyan-400">{tx.id}</td>
                          <td className="py-3.5 px-2 font-semibold text-slate-100">{tx.userName}</td>
                          <td className="py-3.5 px-2">
                            <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                              tx.type === 'deposit' ? 'text-cyan-400 bg-cyan-950/20' : 'text-purple-400 bg-purple-950/20'
                            }`}>
                              {tx.type === 'deposit' ? 'DEPOSIT' : 'WITHDRAW'}
                            </span>
                          </td>
                          <td className="py-3.5 px-2 text-slate-400">{tx.currency}</td>
                          <td className="py-3.5 px-2 font-bold text-white text-glow-cyan">${tx.amount}</td>
                          <td className="py-3.5 px-2 text-[10px] text-slate-500 truncate max-w-[150px]" title={tx.walletAddress}>{tx.walletAddress}</td>
                          <td className="py-3.5 px-2 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => approveTransaction(tx.id)}
                                className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 flex items-center gap-1 text-[10px] font-bold uppercase transition-all"
                                title="Approve"
                              >
                                <Check size={12} /> Setujui
                              </button>
                              <button
                                onClick={() => rejectTransaction(tx.id)}
                                className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 flex items-center gap-1 text-[10px] font-bold uppercase transition-all"
                                title="Reject"
                              >
                                <X size={12} /> Tolak
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Past transactions history */}
            <div className={`p-6 rounded-3xl border ${
              isDarkMode ? 'bg-[#080517] border-purple-950/60' : 'bg-white border-slate-200'
            }`}>
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Riwayat Penyelesaian Transaksi Terakhir</h2>
              
              {pastTransactions.length === 0 ? (
                <div className="text-center py-6 text-xs text-slate-600">Belum ada transaksi yang diselesaikan.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="border-b border-purple-950/20 text-slate-500">
                        <th className="py-2 px-2">ID</th>
                        <th className="py-2 px-2">Tanggal</th>
                        <th className="py-2 px-2">Pengguna</th>
                        <th className="py-2 px-2">Tipe</th>
                        <th className="py-2 px-2">Koin</th>
                        <th className="py-2 px-2">Jumlah</th>
                        <th className="py-2 px-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pastTransactions.map(tx => (
                        <tr key={tx.id} className="border-b border-purple-950/10 text-slate-400">
                          <td className="py-2.5 px-2 text-[10px] text-slate-500">{tx.id}</td>
                          <td className="py-2.5 px-2 text-[10px] text-slate-500">{new Date(tx.createdAt).toLocaleDateString()}</td>
                          <td className="py-2.5 px-2 text-slate-300">{tx.userName}</td>
                          <td className="py-2.5 px-2 capitalize">{tx.type}</td>
                          <td className="py-2.5 px-2">{tx.currency}</td>
                          <td className="py-2.5 px-2 font-bold">${tx.amount}</td>
                          <td className="py-2.5 px-2">
                            <span className={`px-2 py-0.5 rounded text-[8px] font-bold ${
                              tx.status === 'success' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                            }`}>{tx.status.toUpperCase()}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>
        )}

        {/* 2. MEMBERS TAB */}
        {activeTab === 'users' && (
          <div className={`p-6 rounded-3xl border ${
            isDarkMode ? 'bg-[#080517] border-purple-950/60' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-purple-950/20">
              <div>
                <h2 className="text-sm font-bold font-display">Manajemen Anggota Platform</h2>
                <p className="text-[10px] text-slate-500">Edit saldo, manipulasi hashrate, dan pantau status user terdaftar</p>
              </div>

              {/* Search Bar */}
              <div className="relative w-full sm:w-64">
                <Search size={14} className="absolute left-3.5 top-3 text-slate-500" />
                <input
                  type="text"
                  placeholder="Cari nama atau email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-9 pr-4 py-2.5 rounded-xl text-xs border focus:outline-none transition-all ${
                    isDarkMode 
                      ? 'bg-[#0f0b24] border-purple-950/40 focus:border-purple-500 text-white' 
                      : 'bg-slate-50 border-slate-200 focus:border-purple-500 text-slate-800'
                  }`}
                />
              </div>
            </div>

            {/* Members table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-purple-950/20 text-slate-500">
                    <th className="py-3 px-2">Nama</th>
                    <th className="py-3 px-2">Email</th>
                    <th className="py-3 px-2">Role</th>
                    <th className="py-3 px-2">Saldo USD</th>
                    <th className="py-3 px-2">Daya Hashrate</th>
                    <th className="py-3 px-2">Kode Referer</th>
                    <th className="py-3 px-2 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(u => (
                    <tr key={u.id} className="border-b border-purple-950/10 text-slate-300 hover:bg-purple-950/5">
                      <td className="py-4 px-2 font-semibold text-slate-100 flex items-center gap-2">
                        <img src={u.avatar} alt="avatar" className="w-6 h-6 rounded-full bg-purple-950" referrerPolicy="no-referrer" />
                        <span>{u.name}</span>
                      </td>
                      <td className="py-4 px-2 text-slate-400">{u.email}</td>
                      <td className="py-4 px-2 text-[10px] font-bold">
                        <span className={`px-2 py-0.5 rounded ${u.role === 'admin' ? 'bg-purple-950/20 text-purple-400' : 'bg-cyan-950/20 text-cyan-400'}`}>
                          {u.role.toUpperCase()}
                        </span>
                      </td>
                      
                      <td className="py-4 px-2 font-bold">
                        {editingUserId === u.id ? (
                          <div className="flex items-center gap-1 max-w-[100px]">
                            <span className="text-slate-500 text-[10px]">$</span>
                            <input
                              type="number"
                              value={editBalance}
                              onChange={(e) => setEditBalance(e.target.value)}
                              className="w-full bg-[#0a071d] border border-purple-900 rounded p-1 text-[10px] text-white"
                            />
                          </div>
                        ) : (
                          <span className="text-yellow-500 font-bold">${u.balance.toFixed(4)}</span>
                        )}
                      </td>

                      <td className="py-4 px-2">
                        {editingUserId === u.id ? (
                          <input
                            type="number"
                            value={editHashrate}
                            onChange={(e) => setEditHashrate(e.target.value)}
                            className="w-20 bg-[#0a071d] border border-purple-900 rounded p-1 text-[10px] text-white"
                          />
                        ) : (
                          <span className="text-cyan-400 font-bold">{u.hashrate.toFixed(1)} TH/s</span>
                        )}
                      </td>

                      <td className="py-4 px-2 text-slate-500">{u.refCode}</td>

                      <td className="py-4 px-2 text-right">
                        {editingUserId === u.id ? (
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => saveUserEdit(u.id)}
                              className="p-1 px-2.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold rounded-lg text-[9px] uppercase"
                            >
                              Simpan
                            </button>
                            <button
                              onClick={() => setEditingUserId(null)}
                              className="p-1 px-2 border border-purple-950 text-slate-400 rounded-lg text-[9px] uppercase"
                            >
                              Batal
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => startEditing(u)}
                            className="p-1.5 rounded-lg border border-purple-950/60 text-slate-400 hover:text-white flex items-center gap-1 text-[10px] font-bold uppercase ml-auto"
                          >
                            <Edit2 size={10} /> Edit
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            <div className="lg:col-span-8">
              <div className={`p-6 sm:p-8 rounded-3xl border ${
                isDarkMode ? 'bg-[#080517] border-purple-950/60' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <h2 className="text-sm font-bold font-display mb-4 flex items-center gap-2">
                  <Settings className="text-purple-400" /> Pengaturan Global NEXA MINING
                </h2>
                <p className="text-xs text-slate-500 mt-1 mb-6">Sesuaikan kebijakan keuangan, telemetri, dan pengumuman berjalan.</p>

                {settingsSaved && (
                  <div className="mb-4 p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-400 text-xs">
                    Pengaturan berhasil disimpan ke sistem cloud!
                  </div>
                )}

                <form onSubmit={handleSaveSettings} className="flex flex-col gap-6">
                  
                  {/* Announcement Banner */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-400">Pengumuman Banner (Running Text)</label>
                    <textarea
                      rows={2}
                      value={announcement}
                      onChange={(e) => setAnnouncement(e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl text-xs focus:outline-none transition-all ${
                        isDarkMode 
                          ? 'bg-[#0f0b24] border-purple-950/40 focus:border-purple-500 text-white' 
                          : 'bg-slate-50 border-slate-200 focus:border-purple-500 text-slate-800'
                      }`}
                    />
                  </div>

                  {/* Difficulty Config Slider */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center text-xs text-slate-400">
                      <label className="font-semibold">Faktor Kesulitan Mining Global (Difficulty)</label>
                      <span className="font-mono text-cyan-400 font-bold">{difficulty}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={difficulty}
                      onChange={(e) => setDifficulty(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                    />
                    <span className="text-[9px] text-slate-500 mt-1 leading-normal">
                      Meningkatkan tingkat kesulitan akan sedikit mengurangi estimasi profit harian yang diproduksi otomatis oleh sistem.
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="py-3.5 rounded-xl font-bold font-display text-xs tracking-wider uppercase text-slate-950 bg-gradient-to-r from-purple-400 to-cyan-400 shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Save size={14} /> Simpan Semua Konfigurasi
                  </button>

                </form>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className={`p-6 rounded-3xl border ${
                isDarkMode ? 'bg-[#080517] border-purple-950/60' : 'bg-white border-slate-200'
              }`}>
                <h3 className="text-sm font-bold mb-4 flex items-center gap-1.5"><KeyRound size={16} /> Keamanan Admin</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Semua perubahan pada dashboard admin ini dicatat dalam sistem audit keamanan pusat data. Setiap manipulasi saldo ilegal akan membekukan node pusat data terkait.
                </p>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
