import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search, MessageCircle, AlertCircle, ShieldCheck, Sparkles } from 'lucide-react';
import { FAQ_ITEMS } from '../data/mockData';
import { FAQItem } from '../types';

interface FAQViewProps {
  isDarkMode: boolean;
}

export default function FAQView({ isDarkMode }: FAQViewProps) {
  const [expandedId, setExpandedId] = useState<string | null>('faq-1');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'general' | 'mining' | 'financial' | 'security'>('all');

  const categories = [
    { id: 'all', label: 'Semua Tanya Jawab' },
    { id: 'general', label: 'Umum (General)' },
    { id: 'mining', label: 'Penambangan (Mining)' },
    { id: 'financial', label: 'Keuangan (Financial)' },
    { id: 'security', label: 'Keamanan (Security)' }
  ];

  // Filtering Logic
  const filteredFAQs = FAQ_ITEMS.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className={`min-h-screen pt-28 pb-16 transition-colors duration-300 ${
      isDarkMode ? 'bg-[#03010b] text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 flex flex-col gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold w-fit mx-auto border border-purple-500/20 bg-purple-950/15 text-purple-400">
            <HelpCircle size={14} /> Pusat Bantuan Komprehensif
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight">
            Pertanyaan Yang Sering <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 text-glow-cyan">Diajukan</span> (FAQ)
          </h1>
          <p className="text-slate-500 text-sm">
            Temukan jawaban instan mengenai sistem hashrate, teknologi mining hardware, pembagian profit, dan prosedur keamanan NEXA MINING.
          </p>
        </div>

        {/* Search & Filter controls */}
        <div className="flex flex-col gap-5 mb-8">
          {/* Search Box */}
          <div className="relative">
            <Search size={16} className="absolute left-4 top-3.5 text-slate-500" />
            <input
              type="text"
              placeholder="Cari pertanyaan atau kata kunci tertentu (contoh: deposit)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-11 pr-4 py-3 rounded-2xl text-sm border focus:outline-none transition-all ${
                isDarkMode 
                  ? 'bg-[#0a071e]/90 border-purple-950/40 focus:border-cyan-500 text-white' 
                  : 'bg-white border-slate-200 focus:border-cyan-500 text-slate-800'
              }`}
            />
          </div>

          {/* Category Tabs (Binance/Bybit layout) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`py-2 px-4 rounded-xl font-semibold text-xs transition-all whitespace-nowrap border ${
                  selectedCategory === cat.id
                    ? isDarkMode
                      ? 'bg-purple-950/20 border-cyan-500 text-cyan-400'
                      : 'bg-cyan-50 border-cyan-500 text-cyan-600'
                    : isDarkMode
                      ? 'border-transparent text-slate-400 hover:text-white hover:bg-purple-950/10'
                      : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="flex flex-col gap-4">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs flex flex-col items-center gap-2">
              <AlertCircle size={24} className="text-slate-600" />
              <span>Tidak ditemukan kecocokan untuk kata kunci "{searchQuery}"</span>
            </div>
          ) : (
            filteredFAQs.map(faq => {
              const isExpanded = expandedId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isExpanded 
                      ? isDarkMode ? 'border-purple-500/40 bg-[#0c0821]/80' : 'border-cyan-500 bg-white shadow-md'
                      : isDarkMode ? 'border-purple-950/30 bg-[#080517]/80 hover:border-purple-950/60' : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <button
                    onClick={() => toggleExpand(faq.id)}
                    className="w-full py-4 sm:py-5 px-5 flex items-center justify-between text-left gap-4 font-semibold text-sm sm:text-base text-glow-cyan"
                  >
                    <span className={isExpanded ? (isDarkMode ? 'text-white' : 'text-cyan-600') : (isDarkMode ? 'text-slate-200' : 'text-slate-800')}>
                      {faq.question}
                    </span>
                    <span className="text-slate-500 shrink-0">
                      {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </span>
                  </button>

                  <div className={`transition-all duration-300 ${
                    isExpanded ? 'max-h-96 border-t border-purple-950/10' : 'max-h-0'
                  } overflow-hidden`}>
                    <p className={`p-5 text-xs sm:text-sm leading-relaxed ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0d0925] to-[#04030f] border border-purple-950/40 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="p-3 bg-purple-500/10 text-purple-400 rounded-2xl hidden sm:block">
              <MessageCircle size={28} />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-white">Masih memiliki pertanyaan lain?</h3>
              <p className="text-slate-400 text-xs mt-1">Tim dukungan teknis kami siap menjawab keluhan Anda 24 jam sehari.</p>
            </div>
          </div>
          <span className="text-xs bg-cyan-400 font-bold uppercase tracking-wider text-slate-950 px-4 py-2.5 rounded-xl cursor-pointer">
            Hubungi Support
          </span>
        </div>

      </div>
    </div>
  );
}
