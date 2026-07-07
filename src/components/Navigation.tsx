import React, { useState } from 'react';
import { Menu, X, Bell, User as UserIcon, LogOut, Shield, Award, HelpCircle, Briefcase, Mail, Sun, Moon, Sparkles, TrendingUp, Cpu } from 'lucide-react';
import { User, Notification } from '../types';
import Logo from './Logo';

interface NavigationProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  user: User | null;
  logout: () => void;
  notifications: Notification[];
  markNotificationsAsRead: () => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
}

export default function Navigation({
  currentView,
  setCurrentView,
  user,
  logout,
  notifications,
  markNotificationsAsRead,
  isDarkMode,
  setIsDarkMode
}: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const unreadNotifs = notifications.filter(n => !n.read).length;

  const handleNavClick = (view: string) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
    setIsNotifOpen(false);
  };

  const toggleNotif = () => {
    setIsNotifOpen(!isNotifOpen);
    if (!isNotifOpen && unreadNotifs > 0) {
      markNotificationsAsRead();
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isDarkMode 
        ? 'bg-[#06040e]/80 border-b border-purple-950/40 backdrop-blur-md' 
        : 'bg-white/80 border-b border-slate-200 backdrop-blur-md text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => handleNavClick('landing')}>
            <Logo size="md" />
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-1">
            {!user ? (
              // Public Visitor Nav
              <>
                <button
                  onClick={() => handleNavClick('landing')}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    currentView === 'landing' 
                      ? 'text-cyan-400 bg-cyan-950/10' 
                      : isDarkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Beranda
                </button>
                <button
                  onClick={() => handleNavClick('about')}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    currentView === 'about' 
                      ? 'text-cyan-400 bg-cyan-950/10' 
                      : isDarkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Tentang Kami
                </button>
                <button
                  onClick={() => handleNavClick('faq')}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    currentView === 'faq' 
                      ? 'text-cyan-400 bg-cyan-950/10' 
                      : isDarkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  FAQ
                </button>
                <button
                  onClick={() => handleNavClick('contact')}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    currentView === 'contact' 
                      ? 'text-cyan-400 bg-cyan-950/10' 
                      : isDarkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Kontak
                </button>
              </>
            ) : (
              // Logged In Nav
              <>
                {user.role === 'member' ? (
                  <>
                    <button
                      onClick={() => handleNavClick('dashboard-member')}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5 ${
                        currentView === 'dashboard-member' 
                          ? 'text-cyan-400 bg-cyan-950/20 border border-cyan-500/20' 
                          : isDarkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Cpu size={16} />
                      Dashboard
                    </button>
                    <button
                      onClick={() => handleNavClick('packages')}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5 ${
                        currentView === 'packages' 
                          ? 'text-cyan-400 bg-cyan-950/20 border border-cyan-500/20' 
                          : isDarkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Award size={16} />
                      Sewa Hashrate
                    </button>
                    <button
                      onClick={() => handleNavClick('referral')}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5 ${
                        currentView === 'referral' 
                          ? 'text-cyan-400 bg-cyan-950/20 border border-cyan-500/20' 
                          : isDarkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <TrendingUp size={16} />
                      Afiliasi
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleNavClick('dashboard-admin')}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5 ${
                        currentView === 'dashboard-admin' 
                          ? 'text-purple-400 bg-purple-950/20 border border-purple-500/20' 
                          : isDarkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Shield size={16} />
                      Admin Panel
                    </button>
                  </>
                )}
                <button
                  onClick={() => handleNavClick('about')}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    currentView === 'about' 
                      ? 'text-cyan-400 bg-cyan-950/10' 
                      : isDarkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Tentang Kami
                </button>
                <button
                  onClick={() => handleNavClick('faq')}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    currentView === 'faq' 
                      ? 'text-cyan-400 bg-cyan-950/10' 
                      : isDarkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  FAQ
                </button>
              </>
            )}
          </div>

          {/* Action Buttons & Settings (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2.5 rounded-xl border transition-all ${
                isDarkMode 
                  ? 'border-purple-950/50 bg-[#0e0921]/60 text-yellow-400 hover:bg-[#150e32]' 
                  : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
              title="Ganti Tema"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {user ? (
              <div className="flex items-center gap-3">
                {/* Balance Summary Pill */}
                <div className={`px-4 py-1.5 rounded-xl border flex items-center gap-2 font-mono text-xs ${
                  isDarkMode 
                    ? 'border-purple-900/40 bg-purple-950/10 text-cyan-400' 
                    : 'border-slate-200 bg-slate-50 text-slate-800'
                }`}>
                  <span className="text-slate-500">Saldo:</span>
                  <span className="font-bold text-yellow-500">${user.balance.toFixed(4)}</span>
                </div>

                {/* Notifications Panel Trigger */}
                <div className="relative">
                  <button
                    onClick={toggleNotif}
                    className={`p-2.5 rounded-xl border relative transition-all ${
                      isDarkMode 
                        ? 'border-purple-950/50 bg-[#0e0921]/60 text-slate-300 hover:bg-[#150e32]' 
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Bell size={18} />
                    {unreadNotifs > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                        {unreadNotifs}
                      </span>
                    )}
                  </button>

                  {/* Notifications Dropdown */}
                  {isNotifOpen && (
                    <div className={`absolute right-0 mt-3 w-80 rounded-2xl shadow-2xl border p-4 z-50 ${
                      isDarkMode 
                        ? 'bg-[#0f0924] border-purple-900/50 text-white' 
                        : 'bg-white border-slate-200 text-slate-900'
                    }`}>
                      <div className="flex items-center justify-between pb-3 border-b border-purple-950/40 mb-3">
                        <span className="font-display font-semibold text-sm flex items-center gap-1.5">
                          <Bell size={14} className="text-cyan-400" /> Notifikasi
                        </span>
                        <span className="text-xs text-slate-500">{unreadNotifs} baru</span>
                      </div>
                      <div className="max-h-60 overflow-y-auto flex flex-col gap-2.5 pr-1">
                        {notifications.length === 0 ? (
                          <div className="text-center py-6 text-xs text-slate-500">
                            Tidak ada notifikasi baru
                          </div>
                        ) : (
                          notifications.map(notif => (
                            <div
                              key={notif.id}
                              className={`p-2.5 rounded-xl text-xs transition-all ${
                                notif.read 
                                  ? 'bg-transparent' 
                                  : isDarkMode ? 'bg-purple-950/25 border-l-2 border-cyan-500' : 'bg-slate-50 border-l-2 border-cyan-500'
                              }`}
                            >
                              <div className="font-semibold text-slate-200 flex justify-between">
                                <span className={isDarkMode ? 'text-slate-100' : 'text-slate-800'}>{notif.title}</span>
                                <span className="text-[10px] text-slate-500">{new Date(notif.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                              </div>
                              <p className={`mt-0.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{notif.message}</p>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Profile Button */}
                <button
                  onClick={() => handleNavClick('profile')}
                  className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                    currentView === 'profile'
                      ? 'border-cyan-500 bg-cyan-950/10 text-cyan-400'
                      : isDarkMode 
                        ? 'border-purple-950/50 bg-[#0e0921]/60 text-slate-300 hover:bg-[#150e32]' 
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <img src={user.avatar} alt="avatar" className="w-5 h-5 rounded-full bg-cyan-500/20" referrerPolicy="no-referrer" />
                  <span className="text-sm font-medium hidden lg:inline max-w-[100px] truncate">{user.name}</span>
                </button>

                {/* Logout */}
                <button
                  onClick={logout}
                  className={`p-2.5 rounded-xl border transition-all ${
                    isDarkMode 
                      ? 'border-red-950/30 bg-red-950/10 text-red-400 hover:bg-red-950/20' 
                      : 'border-red-100 bg-red-50 text-red-600 hover:bg-red-100'
                  }`}
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleNavClick('login')}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all border ${
                    isDarkMode 
                      ? 'border-purple-900/50 text-slate-200 hover:bg-purple-950/20' 
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Masuk
                </button>
                <button
                  onClick={() => handleNavClick('register')}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-purple-500 hover:opacity-90 transition-all font-display shadow-[0_4px_20px_rgba(6,182,212,0.3)] flex items-center gap-1.5"
                >
                  <Sparkles size={16} />
                  Daftar Sekarang
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-xl border transition-all ${
                isDarkMode ? 'border-purple-950/50 bg-[#0e0921]/60 text-yellow-400' : 'border-slate-200 bg-slate-50 text-slate-700'
              }`}
            >
              {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {user && (
              <div className="relative">
                <button
                  onClick={toggleNotif}
                  className={`p-2 rounded-xl border relative ${
                    isDarkMode ? 'border-purple-950/50 bg-[#0e0921]/60' : 'border-slate-200 bg-slate-50'
                  }`}
                >
                  <Bell size={16} />
                  {unreadNotifs > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                      {unreadNotifs}
                    </span>
                  )}
                </button>
                {isNotifOpen && (
                  <div className={`absolute right-0 mt-3 w-72 rounded-xl shadow-2xl border p-3 z-50 ${
                    isDarkMode ? 'bg-[#0f0924] border-purple-900/50 text-white' : 'bg-white border-slate-200 text-slate-900'
                  }`}>
                    <div className="flex items-center justify-between pb-2 border-b border-purple-950/40 mb-2">
                      <span className="font-semibold text-xs">Notifikasi</span>
                      <span className="text-[10px] text-slate-500">{unreadNotifs} baru</span>
                    </div>
                    <div className="max-h-48 overflow-y-auto flex flex-col gap-2">
                      {notifications.length === 0 ? (
                        <div className="text-center py-4 text-[10px] text-slate-500">Tidak ada notifikasi</div>
                      ) : (
                        notifications.slice(0, 5).map(notif => (
                          <div key={notif.id} className="p-2 rounded bg-purple-950/10 text-[10px]">
                            <div className="font-semibold">{notif.title}</div>
                            <p className="text-slate-400">{notif.message}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2.5 rounded-xl border transition-all ${
                isDarkMode 
                  ? 'border-purple-950/50 bg-[#0e0921]/60 text-slate-300' 
                  : 'border-slate-200 bg-slate-50 text-slate-700'
              }`}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={`md:hidden border-t ${
          isDarkMode ? 'bg-[#070513] border-purple-950/50 text-white' : 'bg-white border-slate-200'
        } py-4 px-4 flex flex-col gap-2`}>
          {!user ? (
            <>
              <button
                onClick={() => handleNavClick('landing')}
                className={`py-3 px-4 rounded-xl text-left font-medium text-sm ${currentView === 'landing' ? 'bg-cyan-950/20 text-cyan-400' : ''}`}
              >
                Beranda
              </button>
              <button
                onClick={() => handleNavClick('about')}
                className={`py-3 px-4 rounded-xl text-left font-medium text-sm ${currentView === 'about' ? 'bg-cyan-950/20 text-cyan-400' : ''}`}
              >
                Tentang Kami
              </button>
              <button
                onClick={() => handleNavClick('faq')}
                className={`py-3 px-4 rounded-xl text-left font-medium text-sm ${currentView === 'faq' ? 'bg-cyan-950/20 text-cyan-400' : ''}`}
              >
                FAQ
              </button>
              <button
                onClick={() => handleNavClick('contact')}
                className={`py-3 px-4 rounded-xl text-left font-medium text-sm ${currentView === 'contact' ? 'bg-cyan-950/20 text-cyan-400' : ''}`}
              >
                Kontak
              </button>
              <div className="h-[1px] bg-purple-950/20 my-2"></div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleNavClick('login')}
                  className={`py-2.5 px-4 rounded-xl font-semibold text-center text-sm border ${
                    isDarkMode ? 'border-purple-950/50 text-slate-300' : 'border-slate-200 text-slate-700'
                  }`}
                >
                  Masuk
                </button>
                <button
                  onClick={() => handleNavClick('register')}
                  className="py-2.5 px-4 rounded-xl font-semibold text-center text-sm text-slate-950 bg-gradient-to-r from-cyan-400 to-purple-500"
                >
                  Daftar
                </button>
              </div>
            </>
          ) : (
            <>
              {user.role === 'member' ? (
                <>
                  <div className="px-4 py-2 border border-purple-950/30 rounded-xl mb-2 flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-mono">Saldo:</span>
                    <span className="text-sm font-bold font-mono text-yellow-500">${user.balance.toFixed(4)}</span>
                  </div>
                  <button
                    onClick={() => handleNavClick('dashboard-member')}
                    className={`py-3 px-4 rounded-xl text-left font-medium text-sm flex items-center gap-2 ${currentView === 'dashboard-member' ? 'bg-cyan-950/20 text-cyan-400' : ''}`}
                  >
                    <Cpu size={16} /> Dashboard
                  </button>
                  <button
                    onClick={() => handleNavClick('packages')}
                    className={`py-3 px-4 rounded-xl text-left font-medium text-sm flex items-center gap-2 ${currentView === 'packages' ? 'bg-cyan-950/20 text-cyan-400' : ''}`}
                  >
                    <Award size={16} /> Sewa Hashrate
                  </button>
                  <button
                    onClick={() => handleNavClick('referral')}
                    className={`py-3 px-4 rounded-xl text-left font-medium text-sm flex items-center gap-2 ${currentView === 'referral' ? 'bg-cyan-950/20 text-cyan-400' : ''}`}
                  >
                    <TrendingUp size={16} /> Afiliasi
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleNavClick('dashboard-admin')}
                  className={`py-3 px-4 rounded-xl text-left font-medium text-sm flex items-center gap-2 ${currentView === 'dashboard-admin' ? 'bg-purple-950/20 text-purple-400' : ''}`}
                >
                  <Shield size={16} /> Admin Panel
                </button>
              )}
              <button
                onClick={() => handleNavClick('profile')}
                className={`py-3 px-4 rounded-xl text-left font-medium text-sm flex items-center gap-2 ${currentView === 'profile' ? 'bg-cyan-950/20 text-cyan-400' : ''}`}
              >
                <img src={user.avatar} alt="avatar" className="w-5 h-5 rounded-full" referrerPolicy="no-referrer" /> Profil Saya
              </button>
              <button
                onClick={() => handleNavClick('about')}
                className="py-3 px-4 rounded-xl text-left font-medium text-sm"
              >
                Tentang Kami
              </button>
              <button
                onClick={() => handleNavClick('faq')}
                className="py-3 px-4 rounded-xl text-left font-medium text-sm"
              >
                FAQ
              </button>
              <div className="h-[1px] bg-purple-950/20 my-2"></div>
              <button
                onClick={logout}
                className="py-3 px-4 rounded-xl text-left font-medium text-sm text-red-400 bg-red-950/10 flex items-center gap-2"
              >
                <LogOut size={16} /> Keluar (Logout)
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
