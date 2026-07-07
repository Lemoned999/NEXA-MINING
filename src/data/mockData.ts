import { MiningPackage, FAQItem } from '../types';

export const MINING_PACKAGES: MiningPackage[] = [
  {
    id: 'bronze',
    name: 'BRONZE HASHRATE',
    price: 50,
    hashrate: 5,
    durationDays: 30,
    dailyProfitPercent: 1.5,
    color: 'from-amber-600 to-amber-800 border-amber-500/50',
    features: [
      'Alokasi 5 TH/s Hashrate',
      'Kontrak Aktif Selama 30 Hari',
      'Profit Harian ~1.5% ($0.75/hari)',
      'Aktivasi Instan & Otomatis',
      'Biaya Pemeliharaan Rendah (0.01%/hari)',
      'Dukungan Layanan Standar 24/7'
    ]
  },
  {
    id: 'silver',
    name: 'SILVER HASHRATE',
    price: 250,
    hashrate: 30,
    durationDays: 60,
    dailyProfitPercent: 2.0,
    color: 'from-slate-400 to-slate-600 border-slate-300/50',
    features: [
      'Alokasi 30 TH/s Hashrate',
      'Kontrak Aktif Selama 60 Hari',
      'Profit Harian ~2.0% ($5.00/hari)',
      'Aktivasi Instan & Otomatis',
      'Biaya Pemeliharaan 0% (Gratis)',
      'Dukungan Layanan Prioritas'
    ],
    popular: true
  },
  {
    id: 'gold',
    name: 'GOLD INDUSTRIAL',
    price: 1000,
    hashrate: 135,
    durationDays: 90,
    dailyProfitPercent: 2.5,
    color: 'from-yellow-500 to-amber-600 border-yellow-400/50',
    features: [
      'Alokasi 135 TH/s Hashrate',
      'Kontrak Aktif Selama 90 Hari',
      'Profit Harian ~2.5% ($25.00/hari)',
      'Perangkat Keras ASIC Khusus',
      'Laporan Telemetri Real-time',
      'Manajer Akun Pribadi 24/7'
    ]
  },
  {
    id: 'platinum',
    name: 'PLATINUM ENTERPRISE',
    price: 5000,
    hashrate: 750,
    durationDays: 120,
    dailyProfitPercent: 3.2,
    color: 'from-cyan-400 to-purple-600 border-cyan-300/50',
    features: [
      'Alokasi 750 TH/s Hashrate',
      'Kontrak Aktif Selama 120 Hari',
      'Profit Harian ~3.2% ($160.00/hari)',
      'Hosting Pusat Data Tier-3',
      'Akses VIP Nexa Platinum Club',
      'Dukungan Teknis Prioritas Utama'
    ]
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Apa itu NEXA MINING?',
    answer: 'NEXA MINING adalah platform penambangan awan (cloud mining) generasi terbaru yang memungkinkan siapa saja untuk menambang mata uang kripto tanpa perlu membeli atau merawat perangkat keras ASIC yang mahal dan bising. Kami menyewakan daya komputasi (hashrate) berkinerja tinggi langsung dari pusat data ramah lingkungan kami.',
    category: 'general'
  },
  {
    id: 'faq-2',
    question: 'Bagaimana cara mulai menambang di NEXA MINING?',
    answer: 'Sangat mudah! Anda hanya perlu membuat akun, memilih salah satu paket hashrate yang sesuai dengan anggaran Anda (Bronze, Silver, Gold, atau Platinum), melakukan deposit untuk aktivasi, dan sistem pertambangan kami akan langsung aktif menghasilkan profit harian yang bisa ditarik kapan saja.',
    category: 'mining'
  },
  {
    id: 'faq-3',
    question: 'Berapa batas minimum Deposit dan Penarikan (Withdraw)?',
    answer: 'Batas deposit minimum adalah $10, sedangkan batas penarikan minimum adalah $15. Kami memproses penarikan secara otomatis ke alamat wallet kripto yang Anda daftarkan di menu profil.',
    category: 'financial'
  },
  {
    id: 'faq-4',
    question: 'Bagaimana sistem rujukan (Referral) bekerja?',
    answer: 'Kami menawarkan program referral multi-level yang sangat menguntungkan. Anda akan mendapatkan bonus komisi sebesar 10% dari setiap pembelian paket hashrate yang dilakukan oleh pengguna yang mendaftar menggunakan tautan atau kode referral Anda.',
    category: 'general'
  },
  {
    id: 'faq-5',
    question: 'Apakah NEXA MINING aman dan terpercaya?',
    answer: 'Ya, NEXA MINING menerapkan standar keamanan berlapis kelas militer. Semua data pengguna dienkripsi, dan dana transaksi diamankan dengan teknologi smart contract serta multi-signature wallets untuk menjamin keamanan aset digital Anda dari ancaman eksternal.',
    category: 'security'
  },
  {
    id: 'faq-6',
    question: 'Berapa lama waktu yang dibutuhkan untuk deposit masuk ke saldo?',
    answer: 'Deposit kripto diproses dalam 1-3 konfirmasi blockchain (biasanya memakan waktu 5-15 menit). Di NEXA MINING, semua pengajuan deposit dipantau oleh admin untuk konfirmasi instan guna memastikan kenyamanan transaksi Anda.',
    category: 'financial'
  }
];
