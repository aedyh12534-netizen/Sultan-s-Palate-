import React from 'react';
import { Language, Currency } from '../types';
import { ShoppingBag, Globe, Phone, Calendar, Lock, Music, Play, Pause, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  currency: Currency;
  onCurrencyChange: (curr: Currency) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
  whatsappNumber: string;
  onOpenAdmin: () => void;
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageChange,
  currency,
  onCurrencyChange,
  cartCount,
  onOpenCart,
  onOpenReservation,
  whatsappNumber,
  onOpenAdmin,
  isPlayingMusic,
  onToggleMusic,
}) => {
  const isAr = language === 'ar';

  return (
    <header className="sticky top-0 z-40 w-full bg-[#080808]/95 backdrop-blur-md border-b border-[#d4af37]/25 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark */}
        <a 
          href="#home" 
          className="flex items-center gap-3 shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]"
        >
          <div className="w-10 h-10 rounded-full border border-[#d4af37]/70 flex items-center justify-center bg-gradient-to-br from-[#1c180e] to-[#0d0d0d] shadow-[0_0_15px_rgba(212,175,55,0.25)] group-hover:border-[#d4af37] transition-all">
            <span className="font-serif-luxury text-[#d4af37] text-lg font-bold">S</span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif-luxury tracking-widest text-lg sm:text-xl font-bold gold-gradient-text uppercase">
              Sultan’s Palate
            </span>
            <span className="text-[11px] tracking-wider text-[#d4af37]/80 font-arabic-royal -mt-1 font-semibold">
              قصر السلطان
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-neutral-300">
          <a href="#about" className="hover:text-[#d4af37] transition-colors whitespace-nowrap shrink-0">
            {isAr ? 'من نحن' : 'About Us'}
          </a>
          <a href="#menu" className="hover:text-[#d4af37] transition-colors whitespace-nowrap shrink-0">
            {isAr ? 'قائمة الطعام' : 'Imperial Menu'}
          </a>
          <a href="#signature" className="hover:text-[#d4af37] transition-colors whitespace-nowrap shrink-0">
            {isAr ? 'الأطباق الملكية' : 'Signatures'}
          </a>
          <a href="#reviews" className="hover:text-[#d4af37] transition-colors whitespace-nowrap shrink-0">
            {isAr ? 'آراء النخبة' : 'Reviews'}
          </a>
          <a href="#locations" className="hover:text-[#d4af37] transition-colors whitespace-nowrap shrink-0">
            {isAr ? 'الفروع' : 'Locations'}
          </a>
        </nav>

        {/* Zone 3: Interactive Controls, Music Bar & Admin Access */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Integrated Music Player (music-player-chic) */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#181818] border border-[#d4af37]/35 shadow-sm">
            <Music className={`w-3.5 h-3.5 text-[#d4af37] ${isPlayingMusic ? 'animate-bounce' : ''}`} />
            <span className="text-[11px] text-neutral-300 hidden md:inline font-medium">
              {isAr ? 'الأجواء' : 'Ambiance'}
            </span>
            <button
              onClick={onToggleMusic}
              className="px-2 py-0.5 rounded-full bg-gradient-to-r from-[#d4af37] to-[#b88c22] text-black font-bold text-[10px] hover:brightness-110 transition-all cursor-pointer"
              title={isPlayingMusic ? (isAr ? 'إيقاف الموسيقى' : 'Pause Music') : (isAr ? 'تشغيل موسيقى هادئة' : 'Play Lounge Music')}
            >
              {isPlayingMusic ? (isAr ? 'إيقاف' : 'Pause') : (isAr ? 'تشغيل' : 'Play')}
            </button>
          </div>

          {/* Prominent Admin Panel Button (غرفة الإدارة) */}
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all text-xs font-semibold cursor-pointer shadow-[0_0_12px_rgba(212,175,55,0.25)]"
            title={isAr ? 'غرفة الإدارة وتخصيص الثيم والأطباق (الرمز: 01112629005)' : 'Admin Dashboard & Theme Customizer'}
          >
            <Lock className="w-3.5 h-3.5" />
            <span className="whitespace-nowrap">{isAr ? 'غرفة الإدارة' : 'Admin'}</span>
          </button>

          {/* Currency Toggle */}
          <button
            onClick={() => onCurrencyChange(currency === 'USD' ? 'EGP' : 'USD')}
            className="px-2 py-1 text-xs font-semibold rounded border border-[#d4af37]/30 text-[#d4af37] bg-[#121008] hover:bg-[#d4af37]/15 transition-all whitespace-nowrap shrink-0"
            title={isAr ? 'تغيير العملة' : 'Change Currency'}
          >
            {currency}
          </button>

          {/* Language Switcher */}
          <button
            onClick={() => onLanguageChange(language === 'ar' ? 'en' : 'ar')}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded border border-[#333] hover:border-[#d4af37]/50 text-neutral-200 hover:text-[#d4af37] bg-[#111] transition-all whitespace-nowrap shrink-0"
            title={isAr ? 'Switch to English' : 'التحويل إلى العربية'}
          >
            <Globe className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>{isAr ? 'English' : 'العربية'}</span>
          </button>

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="relative p-2 rounded-lg border border-[#333] hover:border-[#d4af37]/60 text-neutral-200 hover:text-[#d4af37] bg-[#111] transition-all cursor-pointer"
            title={isAr ? 'سلة الطلب الملكية' : 'Royal Order Tray'}
          >
            <ShoppingBag className="w-4 h-4 text-[#d4af37]" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#d4af37] text-black font-bold text-[11px] rounded-full flex items-center justify-center shadow-md animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* VIP Reservation CTA */}
          <button
            onClick={onOpenReservation}
            className="hidden xl:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-black bg-gradient-to-r from-[#d4af37] via-[#f7e7a9] to-[#bf953f] hover:brightness-110 rounded transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)] whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{isAr ? 'حجز VIP' : 'Reserve'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
