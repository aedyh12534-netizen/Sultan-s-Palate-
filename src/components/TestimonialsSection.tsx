import React from 'react';
import { Language, TestimonialItem } from '../types';
import { Sparkles, Star, Quote } from 'lucide-react';

interface TestimonialsSectionProps {
  language: Language;
  testimonials: TestimonialItem[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  language,
  testimonials,
}) => {
  const isAr = language === 'ar';

  return (
    <section id="reviews" className="py-24 bg-[#0a0a0a] border-t border-[#d4af37]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isAr ? 'شهادات النخبة العالمية' : 'Global Accolades'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {isAr ? (
              <span className="font-arabic-royal">
                ماذا يقول <span className="gold-gradient-text">نقاد ورواد القصر</span>
              </span>
            ) : (
              <span className="font-serif-luxury">
                Acclaimed by <span className="gold-gradient-text">Epicures & Dignitaries</span>
              </span>
            )}
          </h2>
          <p className="mt-3 text-neutral-400 text-sm">
            {isAr
              ? 'تقييمات موثقة من أبرز نقاد الطعام الدوليين ورواد الفخامة في نيويورك، إسطنبول، والإسكندرية.'
              : 'Endorsements from recognized international culinary critics and discerning patrons.'}
          </p>
        </div>

        {/* 3 Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test) => {
            const name = isAr ? test.nameAr : test.nameEn;
            const role = isAr ? test.roleAr : test.roleEn;
            const city = isAr ? test.cityAr : test.cityEn;
            const quote = isAr ? test.quoteAr : test.quoteEn;

            return (
              <div
                key={test.id}
                className="bg-[#121212] border border-[#2a2a2a] hover:border-[#d4af37]/50 rounded-xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative group"
              >
                <div>
                  {/* Rating Stars & Quote Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(test.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#d4af37] text-[#d4af37]" />
                      ))}
                    </div>
                    <Quote className="w-5 h-5 text-[#d4af37]/30 group-hover:text-[#d4af37]/60 transition-colors" />
                  </div>

                  {/* Quote Body */}
                  <p className="text-neutral-300 text-sm sm:text-base italic leading-relaxed font-light">
                    "{quote}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="mt-6 pt-5 border-t border-neutral-800">
                  <h4 className="text-sm font-bold text-white font-serif-luxury">
                    {name}
                  </h4>
                  <p className="text-xs text-[#d4af37] mt-0.5">
                    {role}
                  </p>
                  {/* Clean unboxed metadata separator */}
                  <div className="mt-2 text-[11px] text-neutral-400 flex items-center gap-2">
                    <span>{city}</span>
                    <span aria-hidden="true">·</span>
                    <span>{test.date}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
