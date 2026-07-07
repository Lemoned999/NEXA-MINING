import React, { useState, useEffect } from 'react';
import { Cpu, Zap, ShieldCheck, ArrowRight, TrendingUp, DollarSign, Calculator, ChevronRight, Activity, Users, Award, Play } from 'lucide-react';
import { MINING_PACKAGES } from '../data/mockData';
import { MiningPackage } from '../types';
import Logo from './Logo';

interface LandingPageProps {
  setCurrentView: (view: string) => void;
  onSelectPackage: (pkg: MiningPackage) => void;
  isDarkMode: boolean;
}

export default function LandingPage({ setCurrentView, onSelectPackage, isDarkMode }: LandingPageProps) {
  // Live crypto ticker simulation
  const [prices, setPrices] = useState({
    BTC: 92450.25,
    ETH: 3415.80,
    NEXA: 0.1245,
    globalPower: 452.84,
  });

  // Simulator values
  const [calcAmount, setCalcAmount] = useState<number>(500);
  const [calcDays, setCalcDays] = useState<number>(90);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(prev => ({
        BTC: prev.BTC + (Math.random() - 0.49) * 15,
        ETH: prev.ETH + (Math.random() - 0.48) * 2,
        NEXA: Number((prev.NEXA + (Math.random() - 0.5) * 0.0001).toFixed(6)),
        globalPower: Number((prev.globalPower + (Math.random() - 0.5) * 0.05).toFixed(2)),
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Calculate earnings based on simulator
  const estimatedHashrate = calcAmount * 0.135; // ~135 TH/s per $1000
  const dailyEarnings = calcAmount * 0.024; // Average 2.4% daily
  const totalEarnings = dailyEarnings * calcDays;
  const netProfit = totalEarnings - calcAmount;

  return (
    <div className={`pt-20 transition-colors duration-300 ${isDarkMode ? 'bg-[#03010b] text-white' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Hero Section */}
      <div className="relative overflow-hidden py-16 lg:py-28">
        {/* Background glow animations */}
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[120px] animate-pulse delay-75"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold w-fit border border-purple-500/20 bg-purple-950/15 text-purple-400">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                Platform Cloud Mining Bersertifikat & Berkinerja Tinggi
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-tight">
                Revolusi <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-amber-400">Penambangan</span> Digital Tanpa Batas
              </h1>
              
              <p className={`text-base sm:text-lg leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Mulai hasilkan Bitcoin, Ethereum, dan NEXA Coin dengan menyewa daya hashrate modern langsung dari smartphone Anda. Tanpa instalasi, tanpa biaya listrik mahal, 100% otomatis, dan transparan.
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-2">
                <button
                  onClick={() => setCurrentView('register')}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-purple-500 to-indigo-600 text-slate-950 font-bold font-display shadow-[0_4px_30px_rgba(6,182,212,0.4)] hover:shadow-[0_4px_40px_rgba(139,92,246,0.6)] hover:scale-[1.02] transition-all flex items-center gap-2"
                >
                  Mulai Sekarang <ArrowRight size={18} />
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById('packages-preview');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`px-8 py-4 rounded-2xl border font-bold transition-all ${
                    isDarkMode 
                      ? 'border-purple-900/50 bg-[#0c081e]/60 text-slate-200 hover:bg-[#120c2d]' 
                      : 'border-slate-200 bg-white text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  Lihat Paket
                </button>
              </div>

              {/* Badges */}
              <div className="grid grid-cols-3 gap-4 pt-4 mt-4 border-t border-purple-950/20">
                <div>
                  <div className="font-mono text-xl sm:text-2xl font-bold text-yellow-500">${prices.BTC.toLocaleString('en-US', {maximumFractionDigits: 2})}</div>
                  <div className="text-xs text-slate-500 mt-1">Indeks BTC/USD</div>
                </div>
                <div>
                  <div className="font-mono text-xl sm:text-2xl font-bold text-purple-400">${prices.ETH.toLocaleString('en-US', {maximumFractionDigits: 2})}</div>
                  <div className="text-xs text-slate-500 mt-1">Indeks ETH/USD</div>
                </div>
                <div>
                  <div className="font-mono text-xl sm:text-2xl font-bold text-cyan-400">{prices.globalPower} PH/s</div>
                  <div className="text-xs text-slate-500 mt-1">Total Daya Jaringan</div>
                </div>
              </div>
            </div>

            {/* Right Card Mockup (Binance Style) */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-3xl blur-[40px] opacity-15"></div>
              
              <div className={`relative p-6 sm:p-8 rounded-3xl border ${
                isDarkMode 
                  ? 'bg-[#0a071a]/95 border-purple-950/60 shadow-[0_15px_40px_rgba(0,0,0,0.6)]' 
                  : 'bg-white border-slate-200 shadow-2xl text-slate-900'
              }`}>
                {/* Simulated UI Header */}
                <div className="flex items-center justify-between pb-4 border-b border-purple-950/30 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>
                    <span className="text-xs font-mono text-slate-400">STATUS NODE: ONLINE</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded bg-purple-950/30 border border-purple-900/30 text-[10px] text-purple-400 font-bold">BLOCK v834.92</span>
                </div>

                {/* Main Stats Display */}
                <div className="flex flex-col gap-5">
                  <div className="p-4 rounded-2xl bg-purple-950/10 border border-purple-900/20">
                    <div className="text-xs text-slate-400">Total Akumulasi Pembayaran</div>
                    <div className="text-3xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500 font-mono mt-1">
                      $12,482,912.45
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
                      <TrendingUp size={12} className="text-emerald-500" /> +$42,850.15 hari ini
                    </div>
                  </div>

                  {/* Mining Speed Visual */}
                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-2">
                      <span>Efisiensi Pusat Data Global</span>
                      <span className="font-mono text-cyan-400">99.98%</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full" style={{ width: '92.4%' }}></div>
                    </div>
                  </div>

                  {/* Hashrate Live Log */}
                  <div className="p-3.5 rounded-xl bg-slate-950/40 border border-purple-950/40 font-mono text-xs text-slate-400 flex flex-col gap-1.5">
                    <div className="flex justify-between border-b border-purple-950/20 pb-1">
                      <span className="text-slate-500">Node</span>
                      <span className="text-slate-500">Sewa Hashrate</span>
                      <span className="text-slate-500">Mulai Tambang</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-400">#NEXA-081</span>
                      <span className="text-slate-200">135 TH/s</span>
                      <span className="text-emerald-400">Aktif</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-400">#NEXA-102</span>
                      <span className="text-slate-200">30 TH/s</span>
                      <span className="text-emerald-400">Aktif</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-400">#NEXA-004</span>
                      <span className="text-slate-200">750 TH/s</span>
                      <span className="text-emerald-400">Aktif</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setCurrentView('login')}
                    className="w-full py-3.5 rounded-xl font-bold font-display text-xs tracking-wider uppercase text-slate-950 bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 hover:opacity-90 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Play size={14} fill="currentColor" /> Pantau Mining Live
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Feature Grid */}
      <div className={`py-16 border-t ${isDarkMode ? 'border-purple-950/20 bg-[#050311]' : 'border-slate-200 bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-display font-extrabold tracking-tight">
              Mengapa Memilih <span className="text-cyan-400">NEXA MINING</span>?
            </h2>
            <p className="text-slate-500 text-sm mt-3">
              Kami menyatukan efisiensi perangkat keras ASIC tier-1 dengan keandalan manajemen cloud cerdas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className={`p-6 rounded-2xl border transition-all ${
              isDarkMode ? 'bg-[#0a071c] border-purple-950/40 hover:border-cyan-500/40' : 'bg-slate-50 border-slate-200 hover:border-cyan-500'
            }`}>
              <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-xl w-fit mb-4">
                <Cpu size={24} />
              </div>
              <h3 className="text-lg font-bold">Teknologi ASIC Terbaru</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Pusat data kami ditenagai oleh seri hardware penambangan Antminer, Whatsminer, dan Avalon tercanggih dengan efisiensi energi optimal.
              </p>
            </div>

            <div className={`p-6 rounded-2xl border transition-all ${
              isDarkMode ? 'bg-[#0a071c] border-purple-950/40 hover:border-purple-500/40' : 'bg-slate-50 border-slate-200 hover:border-purple-500'
            }`}>
              <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl w-fit mb-4">
                <Zap size={24} />
              </div>
              <h3 className="text-lg font-bold">Penarikan Instan</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Tidak ada penundaan pembayaran. Ajukan penarikan kapan saja Anda mencapai ambang batas minimum, dan sistem kami memproses secara otomatis.
              </p>
            </div>

            <div className={`p-6 rounded-2xl border transition-all ${
              isDarkMode ? 'bg-[#0a071c] border-purple-950/40 hover:border-yellow-500/40' : 'bg-slate-50 border-slate-200 hover:border-yellow-500'
            }`}>
              <div className="p-3 bg-yellow-500/10 text-yellow-500 rounded-xl w-fit mb-4">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-lg font-bold">Keamanan Enkripsi</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Semua dana pengguna disimpan dalam cold-storage multi-sig. Platform kami terenkripsi penuh SSL kelas militer 256-bit.
              </p>
            </div>

            <div className={`p-6 rounded-2xl border transition-all ${
              isDarkMode ? 'bg-[#0a071c] border-purple-950/40 hover:border-pink-500/40' : 'bg-slate-50 border-slate-200 hover:border-pink-500'
            }`}>
              <div className="p-3 bg-pink-500/10 text-pink-500 rounded-xl w-fit mb-4">
                <Users size={24} />
              </div>
              <h3 className="text-lg font-bold">Afiliasi Menguntungkan</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Undang teman Anda dan nikmati bonus hashrate komisi langsung hingga 10% untuk setiap transaksi pembelian paket sewa mereka.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Interactive Calculator Section */}
      <div className={`py-16 ${isDarkMode ? 'bg-[#03010b]' : 'bg-slate-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Description */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="p-3 bg-yellow-500/10 text-yellow-500 rounded-xl w-fit">
                <Calculator size={28} />
              </div>
              <h2 className="text-3xl font-display font-extrabold tracking-tight">
                Hitung Estimasi <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500 text-glow-gold">Keuntungan</span> Mining Anda
              </h2>
              <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Gunakan simulator penambangan cerdas kami untuk mengetahui proyeksi pengembalian modal (ROI) berdasarkan jumlah sewa hashrate Anda. Geser nilai dana untuk simulasi keuntungan!
              </p>
              
              <div className="flex flex-col gap-2 mt-2">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  <span>Perkiraan hasil dihitung berdasarkan tingkat kesulitan mining saat ini.</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                  <span>Masa kontrak bervariasi dari 30 hingga 120 hari.</span>
                </div>
              </div>
            </div>

            {/* Right Calculator Card */}
            <div className="lg:col-span-7">
              <div className={`p-6 sm:p-8 rounded-3xl border ${
                isDarkMode ? 'bg-[#080517] border-purple-950/60 shadow-xl' : 'bg-white border-slate-200 shadow-md'
              }`}>
                <div className="flex flex-col gap-6">
                  {/* Amount Slider */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-semibold">Jumlah Sewa Modal (USD)</label>
                      <span className="text-lg font-mono font-bold text-cyan-400">${calcAmount.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="10000"
                      step="50"
                      value={calcAmount}
                      onChange={(e) => setCalcAmount(Number(e.target.value))}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                      <span>$50 (Bronze Min)</span>
                      <span>$1,000 (Gold)</span>
                      <span>$10,000 (Maks)</span>
                    </div>
                  </div>

                  {/* Days Selector */}
                  <div>
                    <label className="text-sm font-semibold block mb-3">Masa Aktif Kontrak</label>
                    <div className="grid grid-cols-4 gap-2">
                      {[30, 60, 90, 120].map((days) => (
                        <button
                          key={days}
                          onClick={() => setCalcDays(days)}
                          className={`py-2 px-3 rounded-xl font-semibold text-xs border font-mono transition-all ${
                            calcDays === days
                              ? 'bg-purple-600 border-purple-500 text-white shadow-lg'
                              : isDarkMode 
                                ? 'border-purple-950/50 bg-[#0d0a21] text-slate-300 hover:bg-purple-950/25' 
                                : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {days} Hari
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Calculations breakdown */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-purple-950/20 font-mono text-center">
                    <div className="p-3 bg-purple-950/15 border border-purple-900/10 rounded-2xl">
                      <div className="text-[10px] text-slate-500 uppercase">Daya Alokasi</div>
                      <div className="text-sm font-bold text-white mt-1">{estimatedHashrate.toFixed(2)} TH/s</div>
                    </div>
                    <div className="p-3 bg-purple-950/15 border border-purple-900/10 rounded-2xl">
                      <div className="text-[10px] text-slate-500 uppercase">Profit / Hari</div>
                      <div className="text-sm font-bold text-yellow-500 mt-1">${dailyEarnings.toFixed(2)}</div>
                    </div>
                    <div className="p-3 bg-purple-950/15 border border-purple-900/10 rounded-2xl">
                      <div className="text-[10px] text-slate-500 uppercase">Estimasi Total</div>
                      <div className="text-sm font-bold text-cyan-400 mt-1">${totalEarnings.toFixed(2)}</div>
                    </div>
                    <div className="p-3 bg-purple-950/15 border border-purple-900/10 rounded-2xl">
                      <div className="text-[10px] text-slate-500 uppercase">Profit Bersih</div>
                      <div className="text-sm font-bold text-emerald-400 mt-1">${netProfit.toFixed(2)}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => setCurrentView('register')}
                    className="w-full py-4 rounded-2xl font-bold font-display text-sm text-slate-950 bg-gradient-to-r from-cyan-400 to-purple-500 shadow-xl hover:opacity-95 transition-all flex items-center justify-center gap-1.5"
                  >
                    Beli Kontrak Sekarang <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Package showcase block preview */}
      <div id="packages-preview" className={`py-16 sm:py-24 border-t ${isDarkMode ? 'border-purple-950/20 bg-[#04020f]' : 'border-slate-200 bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight">
              Sewa Paket <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 text-glow-cyan">Hashrate Cloud</span>
            </h2>
            <p className="text-slate-500 text-sm mt-3">
              Mulai penambangan dalam 5 menit. Pilih paket penambangan cloud profesional kami sesuai dengan tujuan finansial Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MINING_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`rounded-3xl border p-6 flex flex-col justify-between relative transition-all duration-300 ${
                  pkg.popular ? 'scale-105 border-purple-500 glow-purple z-10' : 'border-purple-950/30'
                } ${isDarkMode ? 'bg-[#080516]/95 hover:bg-[#0c0821]' : 'bg-slate-50 hover:bg-slate-100/50'}`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full text-[10px] font-extrabold tracking-wider text-slate-950 uppercase">
                    Paling Populer
                  </span>
                )}

                <div className="flex flex-col gap-4">
                  <div className={`text-xs font-bold font-mono text-cyan-400 uppercase`}>{pkg.name}</div>
                  
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl sm:text-4xl font-display font-extrabold font-mono">${pkg.price}</span>
                    <span className="text-xs text-slate-500 font-mono">/ {pkg.durationDays} hari</span>
                  </div>

                  <div className={`p-3 rounded-2xl bg-purple-950/15 border border-purple-900/10 flex items-center justify-between text-xs font-mono`}>
                    <span className="text-slate-400">Hashrate:</span>
                    <span className="font-bold text-white text-glow-cyan">{pkg.hashrate} TH/s</span>
                  </div>

                  <div className="flex flex-col gap-2.5 my-3 text-xs leading-relaxed">
                    {pkg.features.map((feat, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-0.5">✓</span>
                        <span className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    onSelectPackage(pkg);
                    setCurrentView('login');
                  }}
                  className={`w-full py-3.5 rounded-2xl font-bold text-xs tracking-wider uppercase font-display transition-all ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-cyan-400 to-purple-500 text-slate-950 hover:opacity-90 shadow-lg'
                      : isDarkMode 
                        ? 'bg-purple-950/30 border border-purple-900/40 text-slate-200 hover:bg-purple-950/60' 
                        : 'bg-white border border-slate-200 text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  Sewa Sekarang
                </button>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Trust & Certifications section */}
      <div className={`py-16 ${isDarkMode ? 'bg-[#03010b] border-t border-purple-950/10' : 'bg-slate-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#0d0925] to-[#04030f] border border-purple-950/40">
            <div className="flex flex-col gap-3">
              <div className="text-xs text-cyan-400 font-bold font-mono tracking-wider uppercase">Keandalan Platform</div>
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white">Butuh informasi lebih lanjut mengenai infrastruktur kami?</h3>
              <p className="text-slate-400 text-xs sm:text-sm max-w-xl leading-relaxed">
                Pusat data NEXA MINING berlokasi di Islandia dan Norwegia, beroperasi menggunakan 100% energi listrik panas bumi dan hidroelektrik terbarukan berbiaya rendah.
              </p>
            </div>
            <button
              onClick={() => setCurrentView('about')}
              className="px-6 py-3 rounded-xl font-bold text-xs tracking-wider uppercase text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-all flex items-center gap-1.5 shrink-0"
            >
              Pelajari Infrastruktur <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={`py-12 border-t ${isDarkMode ? 'bg-[#020108] border-purple-950/30 text-slate-400' : 'bg-white border-slate-200 text-slate-600'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="flex flex-col gap-4">
            <Logo size="md" />
            <p className="text-xs leading-relaxed mt-2">
              Platform cloud mining modern, andal, dan transparan untuk era penambangan koin digital yang lebih mudah dan efisien.
            </p>
          </div>

          <div>
            <h4 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} mb-4`}>Pilihan Link</h4>
            <div className="flex flex-col gap-2.5 text-xs">
              <button onClick={() => setCurrentView('landing')} className="hover:text-cyan-400 text-left">Beranda</button>
              <button onClick={() => setCurrentView('about')} className="hover:text-cyan-400 text-left">Tentang Kami</button>
              <button onClick={() => setCurrentView('faq')} className="hover:text-cyan-400 text-left">FAQ</button>
              <button onClick={() => setCurrentView('contact')} className="hover:text-cyan-400 text-left">Kontak Kami</button>
            </div>
          </div>

          <div>
            <h4 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} mb-4`}>Keamanan</h4>
            <div className="flex flex-col gap-2.5 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <span>Enkripsi SSL 256-bit</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <span>Cold Storage Wallet</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <span>Pencadangan Otomatis</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} mb-4`}>Hubungi Kami</h4>
            <div className="flex flex-col gap-2 text-xs">
              <p>Email: support@nexa-mining.com</p>
              <p>Waktu Layanan: 24/7/365</p>
              <p className="text-[10px] text-slate-500 mt-2">
                Peringatan Risiko: Investasi cryptocurrency mengandung risiko fluktuasi harga pasar yang signifikan. Harap menambang dengan bijak.
              </p>
            </div>
          </div>

        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-purple-950/20 text-center text-xs text-slate-500">
          © 2026 NEXA MINING. Seluruh hak cipta dilindungi undang-undang.
        </div>
      </footer>

    </div>
  );
}
