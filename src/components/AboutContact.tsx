import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Compass, Shield, Zap, Check, Sparkles, Server, Globe, Cpu } from 'lucide-react';

interface AboutContactProps {
  currentView: string;
  isDarkMode: boolean;
  addNotification: (title: string, message: string) => void;
}

export default function AboutContact({ currentView, isDarkMode, addNotification }: AboutContactProps) {
  const [activeSubTab, setActiveSubTab] = useState<'about' | 'contact'>(
    currentView === 'contact' ? 'contact' : 'about'
  );

  // Contact form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert('Harap lengkapi semua kolom wajib!');
      return;
    }

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setSentSuccess(true);
      addNotification(
        'Pesan Hubungi Kami Terkirim',
        `Halo ${name}, terima kasih telah menghubungi kami. Pertanyaan Anda mengenai "${subject || 'Dukungan Umum'}" telah diterima.`
      );
      // Reset form
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setTimeout(() => setSentSuccess(false), 5000);
    }, 2000);
  };

  return (
    <div className={`min-h-screen pt-28 pb-16 transition-colors duration-300 ${
      isDarkMode ? 'bg-[#03010b] text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Sub-navigation Tabs */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <button
            onClick={() => setActiveSubTab('about')}
            className={`py-2 px-6 rounded-2xl font-semibold text-xs transition-all border ${
              activeSubTab === 'about'
                ? 'bg-purple-950/25 border-cyan-500 text-cyan-400 font-bold glow-cyan'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Tentang NEXA MINING
          </button>
          <button
            onClick={() => setActiveSubTab('contact')}
            className={`py-2 px-6 rounded-2xl font-semibold text-xs transition-all border ${
              activeSubTab === 'contact'
                ? 'bg-purple-950/25 border-cyan-500 text-cyan-400 font-bold glow-cyan'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Hubungi Kami
          </button>
        </div>

        {/* 1. ABOUT TAB VIEW */}
        {activeSubTab === 'about' && (
          <div className="flex flex-col gap-12">
            
            {/* Visual Intro Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold w-fit border border-purple-500/20 bg-purple-950/15 text-purple-400">
                  <Compass size={14} /> Visi & Infrastruktur Kelas Industri
                </div>
                
                <h1 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight leading-tight">
                  Menghubungkan Anda ke <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-amber-400">Daya Tambang</span> Terbersih di Dunia
                </h1>
                
                <p className={`text-sm sm:text-base leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  Didirikan pada tahun 2022, NEXA MINING lahir dari visi untuk mendemokratisasi akses hashrate kripto kelas industrial. Kami merancang dan mengoperasikan fasilitas penambangan awan tercanggih di Islandia dan Norwegia, memadukan energi hijau terbarukan dengan teknologi ASIC optimal.
                </p>

                <p className={`text-sm sm:text-base leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  Dengan menyewa daya komputasi dari NEXA, Anda menghindari kerumitan pengiriman hardware, tagihan listrik rumah tangga yang fantastis, perawatan teknis yang bising, dan risiko kerusakan fisik hardware. Tim ahli kami mengurus semuanya untuk menjamin uptime 99.98% untuk masa depan finansial Anda.
                </p>
              </div>

              {/* Graphic stats datacenter card */}
              <div className="lg:col-span-5 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-3xl blur-[40px] opacity-15"></div>
                
                <div className={`relative p-6 sm:p-8 rounded-3xl border ${
                  isDarkMode ? 'bg-[#0a071e] border-purple-950/60 shadow-2xl' : 'bg-white border-slate-200 shadow-md'
                }`}>
                  <h3 className="text-sm font-bold flex items-center gap-2 mb-4">
                    <Server size={18} className="text-cyan-400" /> Fasilitas Pusat Data NEXA-1
                  </h3>
                  
                  <div className="flex flex-col gap-4 font-mono text-xs">
                    <div className="flex justify-between border-b border-purple-950/20 pb-2">
                      <span className="text-slate-500">Lokasi Node Utama</span>
                      <span className="text-white font-bold">Keflavík, Islandia</span>
                    </div>
                    <div className="flex justify-between border-b border-purple-950/20 pb-2">
                      <span className="text-slate-500">Sumber Energi</span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1">⚡ 100% Geothermal</span>
                    </div>
                    <div className="flex justify-between border-b border-purple-950/20 pb-2">
                      <span className="text-slate-500">Daya Komputasi Aktif</span>
                      <span className="text-cyan-400 font-bold">452.84 PH/s</span>
                    </div>
                    <div className="flex justify-between border-b border-purple-950/20 pb-2">
                      <span className="text-slate-500">Suhu Kerja Rata-Rata</span>
                      <span className="text-yellow-500 font-bold">14°C (Pendinginan Alami)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Pillars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
              
              <div className={`p-6 rounded-2xl border ${
                isDarkMode ? 'bg-[#0a071c] border-purple-950/40' : 'bg-white border-slate-200'
              }`}>
                <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-xl w-fit mb-4">
                  <Globe size={24} />
                </div>
                <h3 className="text-base font-bold mb-1.5">100% Energi Hijau</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Semua rig penambangan kami dijalankan murni dari tenaga hidroelektrik dan panas bumi bumi Islandia, mengurangi jejak karbon hingga titik nol.
                </p>
              </div>

              <div className={`p-6 rounded-2xl border ${
                isDarkMode ? 'bg-[#0a071c] border-purple-950/40' : 'bg-white border-slate-200'
              }`}>
                <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl w-fit mb-4">
                  <Cpu size={24} />
                </div>
                <h3 className="text-base font-bold mb-1.5">Kemitraan Industri Tier-1</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Kami berkolaborasi langsung dengan produsen perangkat keras Bitmain dan MicroBT untuk memperoleh rig ASIC generasi terbaru lebih cepat.
                </p>
              </div>

              <div className={`p-6 rounded-2xl border ${
                isDarkMode ? 'bg-[#0a071c] border-purple-950/40' : 'bg-white border-slate-200'
              }`}>
                <div className="p-3 bg-yellow-500/10 text-yellow-500 rounded-xl w-fit mb-4">
                  <Shield size={24} />
                </div>
                <h3 className="text-base font-bold mb-1.5">Transparansi Keuangan</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Hasil penambangan dialokasikan secara transparan setiap hari sesuai persentase hashrate kontrak yang Anda miliki.
                </p>
              </div>

            </div>

          </div>
        )}

        {/* 2. CONTACT TAB VIEW */}
        {activeSubTab === 'contact' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Contact Information Left */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div>
                <h2 className="text-2xl font-display font-extrabold text-cyan-400">Hubungi Pusat Layanan Kami</h2>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Ada kendala teknis atau pertanyaan kemitraan? Jangan ragu mengirim pesan langsung kepada tim administrasi kami.
                </p>
              </div>

              <div className="flex flex-col gap-5 mt-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-xl">
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-bold">Email Dukungan</div>
                    <div className="text-sm font-semibold">support@nexa-mining.com</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl">
                    <Phone size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-bold">Telepon Kantor Pusat</div>
                    <div className="text-sm font-semibold">+354 543 9000 (Islandia)</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-yellow-500/10 text-yellow-500 rounded-xl">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-bold">Alamat Kantor Pusat</div>
                    <div className="text-sm font-semibold">Kalkofnsvegur 2, 101 Reykjavík, Islandia</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Form Right */}
            <div className="lg:col-span-7">
              <div className={`p-6 sm:p-8 rounded-3xl border ${
                isDarkMode ? 'bg-[#080517] border-purple-950/60 shadow-2xl' : 'bg-white border-slate-200 shadow-md'
              }`}>
                <h3 className="text-lg font-bold font-display mb-4 flex items-center gap-2">
                  Kirimkan Pesan Instan <Sparkles size={16} className="text-yellow-400" />
                </h3>

                {sentSuccess ? (
                  <div className="py-8 text-center flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20 animate-bounce">
                      <Check size={24} />
                    </div>
                    <h4 className="font-bold text-sm text-emerald-400">Pesan Terkirim!</h4>
                    <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                      Terima kasih atas pesan Anda. Kami telah menambahkan notifikasi konfirmasi di akun Anda dan tim support kami akan membalas via email secepatnya.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="flex flex-col gap-4">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-slate-400">Nama Lengkap *</label>
                        <input
                          type="text"
                          required
                          placeholder="Masukkan nama Anda"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className={`w-full px-4 py-3 rounded-xl text-xs focus:outline-none transition-all ${
                            isDarkMode 
                              ? 'bg-[#0f0b24] border-purple-950/40 focus:border-cyan-500 text-white' 
                              : 'bg-slate-50 border-slate-200 focus:border-cyan-500 text-slate-800'
                          }`}
                        />
                      </div>

                      {/* Email */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-slate-400">Alamat Email *</label>
                        <input
                          type="email"
                          required
                          placeholder="name@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={`w-full px-4 py-3 rounded-xl text-xs focus:outline-none transition-all ${
                            isDarkMode 
                              ? 'bg-[#0f0b24] border-purple-950/40 focus:border-cyan-500 text-white' 
                              : 'bg-slate-50 border-slate-200 focus:border-cyan-500 text-slate-800'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-400">Subjek Pesan</label>
                      <input
                        type="text"
                        placeholder="Contoh: Kemitraan Sewa Industri / Kendala Withdraw"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl text-xs focus:outline-none transition-all ${
                          isDarkMode 
                            ? 'bg-[#0f0b24] border-purple-950/40 focus:border-cyan-500 text-white' 
                            : 'bg-slate-50 border-slate-200 focus:border-cyan-500 text-slate-800'
                          }`}
                      />
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-400">Isi Pesan Pendukung *</label>
                      <textarea
                        rows={4}
                        required
                        placeholder="Tuliskan detail pertanyaan atau keluhan Anda di sini secara rinci..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl text-xs focus:outline-none transition-all ${
                          isDarkMode 
                            ? 'bg-[#0f0b24] border-purple-950/40 focus:border-cyan-500 text-white' 
                            : 'bg-slate-50 border-slate-200 focus:border-cyan-500 text-slate-800'
                        }`}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSending}
                      className="w-full py-3.5 rounded-xl font-bold font-display text-xs tracking-wider uppercase text-slate-950 bg-gradient-to-r from-cyan-400 to-purple-500 shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
                    >
                      {isSending ? (
                        <span>Mengirimkan Pesan...</span>
                      ) : (
                        <>
                          <Send size={14} /> Kirim Pesan Sekarang
                        </>
                      )}
                    </button>

                  </form>
                )}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
