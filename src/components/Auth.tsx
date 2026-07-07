import React, { useState } from 'react';
import { Mail, Lock, User as UserIcon, Award, ArrowRight, Shield, AlertCircle, Eye, EyeOff, Sparkles } from 'lucide-react';
import Logo from './Logo';

interface AuthProps {
  currentView: 'login' | 'register';
  setCurrentView: (view: 'login' | 'register' | 'dashboard-member' | 'dashboard-admin') => void;
  login: (email: string, password: string, forceRole?: 'member' | 'admin') => { success: boolean; error?: string };
  register: (name: string, email: string, password: string, referralCode?: string) => { success: boolean; error?: string };
  selectedPackage?: string;
  isDarkMode: boolean;
}

export default function Auth({
  currentView,
  setCurrentView,
  login,
  register,
  selectedPackage,
  isDarkMode
}: AuthProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (currentView === 'login') {
      if (!email || !password) {
        setErrorMsg('Harap isi semua kolom login.');
        return;
      }
      const res = login(email, password);
      if (!res.success) {
        setErrorMsg(res.error || 'Email atau password salah.');
      }
    } else {
      if (!name || !email || !password) {
        setErrorMsg('Harap lengkapi semua kolom pendaftaran.');
        return;
      }
      if (!agreeTerms) {
        setErrorMsg('Anda harus menyetujui syarat & ketentuan layanan.');
        return;
      }
      const res = register(name, email, password, referralCode);
      if (!res.success) {
        setErrorMsg(res.error || 'Pendaftaran gagal.');
      }
    }
  };

  const handleDemoLogin = (role: 'member' | 'admin') => {
    setErrorMsg('');
    const demoEmail = role === 'admin' ? 'admin@nexa-mining.com' : 'member@nexa-mining.com';
    const res = login(demoEmail, 'password123', role);
    if (!res.success) {
      setErrorMsg(res.error || 'Gagal masuk sebagai demo.');
    }
  };

  return (
    <div className={`min-h-screen pt-24 pb-12 flex items-center justify-center transition-all duration-300 ${
      isDarkMode 
        ? 'bg-[#03010c] bg-radial-gradient from-purple-950/20 via-transparent to-transparent' 
        : 'bg-slate-50 text-slate-900'
    }`}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-md w-full px-4 relative z-10">
        
        {/* Brand Header */}
        <div className="flex flex-col items-center mb-8">
          <Logo size="lg" />
          <p className="text-slate-500 text-xs mt-2 text-center">
            {currentView === 'login' 
              ? 'Silakan masuk untuk mengelola hashrate penambangan Anda' 
              : 'Daftar akun baru dan dapatkan bonus daya hashrate gratis'}
          </p>
        </div>

        {/* Main Card */}
        <div className={`p-6 sm:p-8 rounded-3xl border shadow-2xl transition-all ${
          isDarkMode 
            ? 'bg-[#0a071e]/90 border-purple-950/60' 
            : 'bg-white border-slate-200'
        }`}>
          
          <h2 className="text-xl font-display font-extrabold mb-6 flex items-center gap-2">
            {currentView === 'login' ? 'Selamat Datang Kembali!' : 'Buat Akun NEXA'}
            <Sparkles size={18} className="text-yellow-400" />
          </h2>

          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-red-950/20 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
              <AlertCircle size={14} className="shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {selectedPackage && currentView === 'register' && (
            <div className="mb-5 p-3 rounded-xl bg-cyan-950/25 border border-cyan-500/20 text-xs text-cyan-400">
              Menyewa hashrate: <strong className="uppercase">{selectedPackage}</strong>. Selesaikan pendaftaran untuk mengaktifkan mining!
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            
            {/* Name Field (Register Only) */}
            {currentView === 'register' && (
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-400">Nama Lengkap</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <UserIcon size={16} />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Dandy Aditya"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl text-sm border font-medium focus:outline-none transition-all ${
                      isDarkMode 
                        ? 'bg-[#0f0b24] border-purple-950/40 focus:border-cyan-500 text-white' 
                        : 'bg-slate-50 border-slate-200 focus:border-cyan-500 text-slate-800'
                    }`}
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-400">Alamat Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail size={16} />
                </div>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl text-sm border font-medium focus:outline-none transition-all ${
                    isDarkMode 
                      ? 'bg-[#0f0b24] border-purple-950/40 focus:border-cyan-500 text-white' 
                      : 'bg-slate-50 border-slate-200 focus:border-cyan-500 text-slate-800'
                  }`}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-slate-400">Kata Sandi</label>
                {currentView === 'login' && (
                  <button 
                    type="button"
                    onClick={() => alert('Fitur pemulihan kata sandi disimulasikan. Gunakan Demo Login di bawah untuk masuk instan!')}
                    className="text-[10px] text-cyan-400 hover:underline"
                  >
                    Lupa sandi?
                  </button>
                )}
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock size={16} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-10 pr-10 py-3 rounded-xl text-sm border font-medium focus:outline-none transition-all ${
                    isDarkMode 
                      ? 'bg-[#0f0b24] border-purple-950/40 focus:border-cyan-500 text-white' 
                      : 'bg-slate-50 border-slate-200 focus:border-cyan-500 text-slate-800'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Referral Code Field (Register Only) */}
            {currentView === 'register' && (
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-400">Kode Referral (Opsional)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Award size={16} />
                  </div>
                  <input
                    type="text"
                    placeholder="Contoh: NEXAREF100"
                    value={referralCode}
                    onChange={(e) => setReferralCode(e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl text-sm border font-medium focus:outline-none transition-all ${
                      isDarkMode 
                        ? 'bg-[#0f0b24] border-purple-950/40 focus:border-cyan-500 text-white' 
                        : 'bg-slate-50 border-slate-200 focus:border-cyan-500 text-slate-800'
                    }`}
                  />
                </div>
              </div>
            )}

            {/* Agree Terms Checkbox (Register Only) */}
            {currentView === 'register' && (
              <div className="flex items-start gap-2 mt-1">
                <input
                  type="checkbox"
                  id="agree"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 rounded border-purple-950 accent-cyan-400 bg-transparent h-4 w-4"
                />
                <label htmlFor="agree" className="text-[11px] text-slate-400 leading-normal">
                  Saya menyetujui <span className="text-cyan-400 cursor-pointer hover:underline">Syarat Layanan</span> dan <span className="text-cyan-400 cursor-pointer hover:underline">Kebijakan Privasi</span> NEXA MINING.
                </label>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-bold font-display text-xs tracking-wider uppercase text-slate-950 bg-gradient-to-r from-cyan-400 to-purple-500 shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-1.5 mt-2"
            >
              {currentView === 'login' ? 'Masuk ke Platform' : 'Daftar Sekarang'}
              <ArrowRight size={14} />
            </button>

          </form>

          {/* Nav links to alternative Auth page */}
          <div className="mt-5 text-center text-xs">
            <span className="text-slate-500">
              {currentView === 'login' ? 'Belum punya akun? ' : 'Sudah terdaftar? '}
            </span>
            <button
              onClick={() => {
                setErrorMsg('');
                setCurrentView(currentView === 'login' ? 'register' : 'login');
              }}
              className="font-bold text-cyan-400 hover:underline"
            >
              {currentView === 'login' ? 'Daftar Akun' : 'Masuk Di Sini'}
            </button>
          </div>

          {/* Demo Credentials Divider */}
          <div className="relative my-6 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-purple-950/20"></div>
            </div>
            <span className={`relative px-3 text-[10px] uppercase tracking-wider font-semibold ${
              isDarkMode ? 'bg-[#0a071e] text-slate-500' : 'bg-white text-slate-400'
            }`}>
              Uji Coba Instan (Demo Mode)
            </span>
          </div>

          {/* Quick Demo Login buttons */}
          <div className="grid grid-cols-2 gap-3.5">
            <button
              onClick={() => handleDemoLogin('member')}
              className={`p-3 rounded-2xl border flex flex-col items-center justify-center text-center gap-1.5 transition-all ${
                isDarkMode 
                  ? 'border-purple-950 bg-[#0e0921]/40 text-cyan-400 hover:bg-[#150e32]/80' 
                  : 'border-slate-200 bg-slate-50 text-cyan-600 hover:bg-slate-100'
              }`}
            >
              <UserIcon size={18} />
              <div className="text-[10px] font-bold uppercase tracking-wider leading-none">Login Member</div>
              <span className="text-[8px] text-slate-500">Akses Dasbor Miner</span>
            </button>

            <button
              onClick={() => handleDemoLogin('admin')}
              className={`p-3 rounded-2xl border flex flex-col items-center justify-center text-center gap-1.5 transition-all ${
                isDarkMode 
                  ? 'border-purple-950 bg-[#0e0921]/40 text-purple-400 hover:bg-[#150e32]/80' 
                  : 'border-slate-200 bg-slate-50 text-purple-600 hover:bg-slate-100'
              }`}
            >
              <Shield size={18} />
              <div className="text-[10px] font-bold uppercase tracking-wider leading-none">Login Admin</div>
              <span className="text-[8px] text-slate-500">Konfirmasi Transaksi</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
