import React from 'react';
import { Language } from '../types';
import { RESTAURANT_IMAGES } from '../data/restaurantData';
import { Sparkles, Utensils, Calendar, MessageCircle, ShieldCheck, Flame, Award } from 'lucide-react';

interface HeroProps {
  language: Language;
  onOpenReservation: () => void;
  whatsappNumber: string;
}

export const Hero: React.FC<HeroProps> = ({
  language,
  onOpenReservation,
  whatsappNumber,
}) => {
  const isAr = language === 'ar';

  const whatsappMessage = encodeURIComponent(
    isAr 
      ? 'مرحباً، أود الاستفسار وطلب قائمة طعام قصر السلطان Sultan’s Palate'
      : 'Hello, I would like to order or inquire from Sultan’s Palate'
  );

  return (
    <section id="home" className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden bg-[#080808]">
      {/* Background Hero Image with Deep Luxury Gradient Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={RESTAURANT_IMAGES.hero}
          alt="Sultan’s Palate Dining Hall"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 animate-pulse duration-[10000ms]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/80 to-[#080808]/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#080808]/40 to-[#080808]" />
      </div>

      {/* Hero Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-16 flex-1 flex flex-col justify-center items-center text-center">
        {/* Imperial Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4af37]/40 bg-[#121008]/80 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(212,175,55,0.15)]">
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#f3e5ab]">
            {isAr ? 'تجربة طهي إمبراطورية فاخرة' : 'Imperial Fine Dining Sanctuary'}
          </span>
          <span className="text-xs text-[#d4af37]">✦</span>
        </div>

        {/* Hero Slogan / Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-4xl leading-tight sm:leading-snug">
          {isAr ? (
            <span className="font-arabic-royal block">
              حيث يلتقي التراث العثماني{' '}
              <span className="gold-gradient-text">بأرقى فنون الطهي العالمية</span>
            </span>
          ) : (
            <span className="font-serif-luxury block">
              Where Ottoman Grandeur{' '}
              <span className="gold-gradient-text">Meets Modern Culinary Art</span>
            </span>
          )}
        </h1>

        {/* Subtitle / Description */}
        <p className="mt-6 text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto font-light leading-relaxed">
          {isAr
            ? 'مرحباً بكم في قصر السلطان. رحلة تذوق أسطورية تجمع بين أصول الضيافة التركية العثمانية الأصيلة وأفخم شرائح اللحم الأمريكية المعتقة المكسوة بالذهب عيار 24.'
            : 'Welcome to Sultan’s Palate. An unprecedented gastronomic coronation uniting century-old Ottoman palace recipes with 45-day dry-aged USDA prime cuts and 24-karat edible gold artistry.'}
        </p>

        {/* Primary Call to Action Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 w-full sm:w-auto">
          {/* Menu Button */}
          <a
            href="#menu"
            className="w-full sm:w-auto px-7 py-3.5 rounded text-sm font-semibold uppercase tracking-wider text-black bg-gradient-to-r from-[#d4af37] via-[#f7e7a9] to-[#bf953f] hover:brightness-110 transition-all shadow-[0_0_25px_rgba(212,175,55,0.35)] flex items-center justify-center gap-2"
          >
            <Utensils className="w-4 h-4" />
            <span>{isAr ? 'استكشف قائمة الطعام' : 'Explore The Menu'}</span>
          </a>

          {/* Reserve VIP Table */}
          <button
            onClick={onOpenReservation}
            className="w-full sm:w-auto px-7 py-3.5 rounded text-sm font-semibold uppercase tracking-wider text-[#f3e5ab] border border-[#d4af37]/60 hover:bg-[#d4af37]/15 transition-all backdrop-blur-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#d4af37]" />
            <span>{isAr ? 'حجز طاولة VIP' : 'Reserve VIP Table'}</span>
          </button>

          {/* Quick WhatsApp Order */}
          <a
            href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-7 py-3.5 rounded text-sm font-medium text-[#25D366] border border-[#25D366]/40 hover:bg-[#25D366]/10 transition-all backdrop-blur-sm flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{isAr ? 'طلب فوري عبر واتساب' : 'Order via WhatsApp'}</span>
          </a>
        </div>
      </div>

      {/* 4-Pillar Trust & Gastronomy Strip (Below hero split, clean unboxed metadata) */}
      <div className="relative z-10 w-full border-t border-[#d4af37]/20 bg-[#0d0d0d]/90 backdrop-blur-md py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {/* Pillar 1 */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full border border-[#d4af37]/30 flex items-center justify-center mb-2 text-[#d4af37]">
                <Flame className="w-5 h-5" />
              </div>
              <span className="text-sm font-semibold text-white">
                {isAr ? 'شواء على جمر البلوط' : 'Wood & Oak Ember Hearth'}
              </span>
              <span className="text-xs text-neutral-400 mt-0.5">
                {isAr ? 'تقاليد عثمانية عريقة' : 'Centuries-Old Tradition'}
              </span>
            </div>

            {/* Pillar 2 */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full border border-[#d4af37]/30 flex items-center justify-center mb-2 text-[#d4af37]">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-sm font-semibold text-white">
                {isAr ? 'ذهب 24 قيراط معتمد' : '24K Certified Edible Gold'}
              </span>
              <span className="text-xs text-neutral-400 mt-0.5">
                {isAr ? 'لمسة ملكية في كل طبق' : 'Imperial Gastronomy'}
              </span>
            </div>

            {/* Pillar 3 */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full border border-[#d4af37]/30 flex items-center justify-center mb-2 text-[#d4af37]">
                <Award className="w-5 h-5" />
              </div>
              <span className="text-sm font-semibold text-white">
                {isAr ? 'لحوم معتقة 45 يوماً' : '45-Day Dry-Aged Steaks'}
              </span>
              <span className="text-xs text-neutral-400 mt-0.5">
                {isAr ? 'أعلى معايير USDA Prime' : 'USDA Prime & Wagyu A5'}
              </span>
            </div>

            {/* Pillar 4 */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full border border-[#d4af37]/30 flex items-center justify-center mb-2 text-[#d4af37]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-sm font-semibold text-white">
                {isAr ? '100% حلال معتمد' : '100% Certified Halal'}
              </span>
              <span className="text-xs text-neutral-400 mt-0.5">
                {isAr ? 'جودة وتدقيق عالمي' : 'Global Ethical Sourcing'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
