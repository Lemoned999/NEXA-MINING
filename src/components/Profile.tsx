import React, { useState } from 'react';
import { Shield, Check, Mail, Lock, KeyRound, Bell, Save, Sparkles, UserCheck, User as UserIcon } from 'lucide-react';
import { User } from '../types';

interface ProfileProps {
  user: User;
  updateProfile: (name: string, walletAddress: string) => void;
  isDarkMode: boolean;
}

const AVATAR_PRESETS = [
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80', // Cyber-neon purple
  'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=150&q=80', // Glass neon ball
  'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=150&q=80', // Artistic gold portrait
  'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=150&q=80', // High-tech purple crystal
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=150&q=80', // Tech-neon cyber face
];

export default function Profile({ user, updateProfile, isDarkMode }: ProfileProps) {
  const [name, setName] = useState(user.name);
  const [wallet, setWallet] = useState(user.walletAddress || '');
  const [password, setPassword] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  // Avatar selector
  const [selectedAvatar, setSelectedAvatar] = useState(user.avatar);

  // Notifications toggles
  const [notifProfit, setNotifProfit] = useState(true);
  const [notifPromo, setNotifPromo] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(name, wallet);
    
    // Change selected avatar in state (simulated)
    user.avatar = selectedAvatar;

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className={`min-h-screen pt-28 pb-16 transition-colors duration-300 ${
      isDarkMode ? 'bg-[#03010b] text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold flex items-center gap-2">
            Pengaturan Profil <Sparkles className="text-yellow-400" />
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm">Konfigurasi akun penambangan awan, kelola dompet koin kripto penerima, dan ganti avatar profil.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Avatar preset selector Left */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className={`p-6 rounded-3xl border flex flex-col items-center text-center ${
              isDarkMode ? 'bg-[#080517] border-purple-950/60' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              {/* Profile Image */}
              <div className="relative w-24 h-24 mb-4 rounded-full p-1 bg-gradient-to-tr from-cyan-400 via-purple-500 to-yellow-500">
                <img
                  src={selectedAvatar}
                  alt="Avatar"
                  className="w-full h-full rounded-full object-cover bg-[#04020f]"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="font-bold text-base">{user.name}</div>
              <span className="text-[10px] font-bold font-mono tracking-wider uppercase text-purple-400 px-2.5 py-0.5 rounded-full bg-purple-950/20 border border-purple-900/30 mt-1.5">
                {user.role === 'admin' ? 'SYSTEM ADMINISTRATOR' : 'PREMIUM MEMBER'}
              </span>

              {/* Avatar presets selection */}
              <div className="mt-6 w-full">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold block mb-2.5">Pilih Preset Avatar Cyber</span>
                <div className="grid grid-cols-5 gap-2">
                  {AVATAR_PRESETS.map((url, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedAvatar(url)}
                      className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-all hover:scale-105 ${
                        selectedAvatar === url ? 'border-cyan-400 scale-105 shadow-md' : 'border-transparent'
                      }`}
                    >
                      <img src={url} alt="preset" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Account security notice */}
            <div className={`p-6 rounded-3xl border ${
              isDarkMode ? 'bg-[#080517] border-purple-950/60' : 'bg-white border-slate-200'
            }`}>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5"><Shield size={14} /> Keamanan Wallet</h3>
              <p className="text-[11px] text-slate-400 leading-normal">
                NEXA MINING tidak pernah menyimpan kunci pribadi (private keys) dompet Anda. Kami hanya mencatat alamat wallet publik guna menyalurkan penarikan saldo sewa Anda secara otomatis.
              </p>
            </div>
          </div>

          {/* Configuration Form Right */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className={`p-6 sm:p-8 rounded-3xl border ${
              isDarkMode ? 'bg-[#080517] border-purple-950/60 shadow-xl' : 'bg-white border-slate-200 shadow-md'
            }`}>
              
              <h3 className="text-sm font-bold font-display mb-6 pb-2 border-b border-purple-950/15">Detail Profil Pribadi</h3>

              {isSaved && (
                <div className="mb-5 p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                  <Check size={14} />
                  <span>Profil dan preferensi berhasil disimpan!</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-400">Nama Tampilan</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl text-xs focus:outline-none transition-all ${
                      isDarkMode 
                        ? 'bg-[#0f0b24] border-purple-950/40 focus:border-cyan-500 text-white' 
                        : 'bg-slate-50 border-slate-200 focus:border-cyan-500 text-slate-800'
                    }`}
                  />
                </div>

                {/* Email Read-only */}
                <div className="flex flex-col gap-1.5 opacity-65">
                  <label className="text-xs font-semibold text-slate-400">Alamat Email Terdaftar (Tidak dapat diubah)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500"><Mail size={14} /></div>
                    <input
                      type="email"
                      readOnly
                      value={user.email}
                      className={`w-full pl-9 pr-4 py-3 rounded-xl text-xs bg-[#060411] border border-purple-950/40 text-slate-400 select-all font-mono`}
                    />
                  </div>
                </div>

                {/* Withdrawal Wallet Address */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-400">Alamat Wallet Penarikan (Bitcoin / USDT TRC20 / ETH)</label>
                  <input
                    type="text"
                    placeholder="Masukkan alamat dompet crypto luar Anda"
                    value={wallet}
                    onChange={(e) => setWallet(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl text-xs font-mono focus:outline-none transition-all ${
                      isDarkMode 
                        ? 'bg-[#0f0b24] border-purple-950/40 focus:border-cyan-500 text-white' 
                        : 'bg-slate-50 border-slate-200 focus:border-cyan-500 text-slate-800'
                    }`}
                  />
                  <span className="text-[10px] text-slate-500">Alamat ini akan otomatis terisi saat Anda mengajukan permintaan penarikan (WD) saldo hasil tambang.</span>
                </div>

                {/* Change Password (Simulated) */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-400">Ubah Kata Sandi</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500"><Lock size={14} /></div>
                    <input
                      type="password"
                      placeholder="Masukkan kata sandi baru jika ingin mengubah"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`w-full pl-9 pr-4 py-3 rounded-xl text-xs focus:outline-none transition-all ${
                        isDarkMode 
                          ? 'bg-[#0f0b24] border-purple-950/40 focus:border-cyan-500 text-white' 
                          : 'bg-slate-50 border-slate-200 focus:border-cyan-500 text-slate-800'
                      }`}
                    />
                  </div>
                </div>

                {/* Notifications checkboxes */}
                <div className="mt-2 p-4 rounded-2xl bg-purple-950/15 border border-purple-900/10 flex flex-col gap-3">
                  <span className="text-xs font-bold text-glow-cyan flex items-center gap-1.5"><Bell size={14} /> Notifikasi Sistem</span>
                  
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      id="p_profit"
                      checked={notifProfit}
                      onChange={(e) => setNotifProfit(e.target.checked)}
                      className="rounded accent-cyan-400 h-4 w-4 bg-transparent border-purple-950"
                    />
                    <label htmlFor="p_profit" className="text-xs text-slate-400 select-none">
                      Kirimkan notifikasi ringkasan profit harian ke dasbor Anda
                    </label>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      id="p_promo"
                      checked={notifPromo}
                      onChange={(e) => setNotifPromo(e.target.checked)}
                      className="rounded accent-cyan-400 h-4 w-4 bg-transparent border-purple-950"
                    />
                    <label htmlFor="p_promo" className="text-xs text-slate-400 select-none">
                      Terima penawaran bonus sewa hashrate terbatas lewat notifikasi
                    </label>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl font-bold font-display text-xs tracking-wider uppercase text-slate-950 bg-gradient-to-r from-cyan-400 to-purple-500 shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-1.5 mt-2"
                >
                  <Save size={14} /> Simpan Pembaruan Profil
                </button>

              </form>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
