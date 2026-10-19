import React from 'react';
import { Language } from '../types';
import { RESTAURANT_IMAGES } from '../data/restaurantData';
import { Sparkles, Check, Flame, Wine } from 'lucide-react';

interface StorySectionProps {
  language: Language;
}

export const StorySection: React.FC<StorySectionProps> = ({ language }) => {
  const isAr = language === 'ar';

  return (
    <section id="about" className="py-24 bg-[#0a0a0a] border-t border-[#d4af37]/15 relative overflow-hidden">
      {/* Decorative subtle gold glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Column */}
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isAr ? 'من نحن — قصة القصر وفلسفة الطهي' : 'About Us — The Imperial Dynasty & Philosophy'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-snug">
              {isAr ? (
                <span className="font-arabic-royal">
                  إحياء الولائم السلطانية{' '}
                  <span className="gold-gradient-text">بمعايير عالمية لا تقبل المساومة</span>
                </span>
              ) : (
                <span className="font-serif-luxury">
                  Reviving Imperial Feasts{' '}
                  <span className="gold-gradient-text">With Uncompromising Mastery</span>
                </span>
              )}
            </h2>

            <p className="mt-6 text-neutral-300 leading-relaxed text-base font-light">
              {isAr
                ? 'في قصر السلطان "Sultan’s Palate"، لم نكتفِ بمجرد إعداد أطباق راقية، بل قمنا باستحضار أسرار مطابخ القصور العثمانية العريقة التي ظلت متوارثة عبر القرون، ودمجناها مع أحدث تقنيات الستيك هاوس العالمية وأنقى أنواع لحوم البلاك أنجوس والواغيو الياباني.'
                : 'At Sultan’s Palate, we do not merely serve dinner; we orchestrate a historic coronation. Our master chefs decode secret 16th-century Ottoman palace manuscripts, uniting them with state-of-the-art Himalayan salt dry-aging chambers and open-ember wood hearths.'}
            </p>

            <p className="mt-4 text-neutral-400 leading-relaxed text-sm">
              {isAr
                ? 'كل قطعة لحم تعتق بعناية فائقة لمدة تتجاوز 45 يوماً في غرف مكسوة بألواح ملح الهيمالايا، وتُطهى على لهب أخشاب البلوط العطري لتكتسب نكهة دخانية ساحرة، قبل أن تُكسى بلمسات الذهب عيار 24 لتقدم في مشهد مهيب يليق بالنخبة والملوك.'
                : 'Every cut is dry-aged for a minimum of 45 days in bespoke Himalayan salt vaults, then flame-seared over aged oak and fruitwood embers. Crowned with certified 24-karat edible gold leaf, each dish arrives as a masterpiece destined for the discerning palate.'}
            </p>

            {/* Pillar list */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-[#141414] border border-[#d4af37]/20 flex items-start gap-3">
                <div className="p-2 rounded bg-[#d4af37]/10 text-[#d4af37] shrink-0 mt-0.5">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">
                    {isAr ? 'أفران طهي الحطب والخشب' : 'Wood-Fired Hearth'}
                  </h4>
                  <p className="text-xs text-neutral-400 mt-1">
                    {isAr ? 'حرارة نقية ونكهة تدخين طبيعية' : 'Smoked oak embers for deep caramelized crusts'}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-[#141414] border border-[#d4af37]/20 flex items-start gap-3">
                <div className="p-2 rounded bg-[#d4af37]/10 text-[#d4af37] shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">
                    {isAr ? 'توابل ومكونات أصيلة' : 'Antep & Spice Route'}
                  </h4>
                  <p className="text-xs text-neutral-400 mt-1">
                    {isAr ? 'فستق عنتاب أخضر وزعفران نقي' : 'Hand-harvested pistachios, saffron & sumac'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Showcase (2 asymmetric photos with gold accents) */}
          <div className="relative">
            <div className="relative rounded-xl overflow-hidden border border-[#d4af37]/30 shadow-[0_0_35px_rgba(212,175,55,0.15)] group">
              <img
                src={RESTAURANT_IMAGES.tomahawk}
                alt="24K Gold Tomahawk Sliced"
                referrerPolicy="no-referrer"
                className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
                <span className="font-semibold text-[#f3e5ab]">
                  {isAr ? 'توماهوك الذهب عيار 24 الصالح للأكل' : '24K Edible Gold Imperial Tomahawk'}
                </span>
                <span className="text-[#d4af37] font-mono">45-Day Dry Aged</span>
              </div>
            </div>

            {/* Floating Inset Badge */}
            <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-[#16140e] border border-[#d4af37] p-4 rounded-xl shadow-2xl max-w-xs backdrop-blur-md">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[#d4af37] font-bold text-lg font-serif-luxury">100%</span>
                <span className="text-xs font-semibold uppercase text-white">
                  {isAr ? 'معايير ملكية رفيعة' : 'Imperial Standard'}
                </span>
              </div>
              <p className="text-[11px] text-neutral-300">
                {isAr
                  ? 'خدمة فندقية خاصة وحجوزات حصرية للشخصيات ورجال الأعمال والعائلات الراقية.'
                  : 'White-glove private dining service tailored for dignitaries, executives, and royal gatherings.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
