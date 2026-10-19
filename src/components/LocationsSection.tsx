import React from 'react';
import { Language } from '../types';
import { RESTAURANT_LOCATIONS } from '../data/restaurantData';
import { Sparkles, MapPin, Clock, Phone, Navigation } from 'lucide-react';

interface LocationsSectionProps {
  language: Language;
}

export const LocationsSection: React.FC<LocationsSectionProps> = ({ language }) => {
  const isAr = language === 'ar';

  return (
    <section id="locations" className="py-24 bg-[#080808] border-t border-[#d4af37]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isAr ? 'قصورنا وعناويننا العالمية' : 'Imperial Destinations'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {isAr ? (
              <span className="font-arabic-royal">
                فروع <span className="gold-gradient-text">قصر السلطان</span>
              </span>
            ) : (
              <span className="font-serif-luxury">
                Palaces Across <span className="gold-gradient-text">The Continents</span>
              </span>
            )}
          </h2>
          <p className="mt-3 text-neutral-400 text-sm">
            {isAr
              ? 'مواقع استثنائية تم اختيارها على أرقى الواجهات البحرية والجادات الملكية حول العالم.'
              : 'Iconic flagship locations situated along world-renowned waterfronts and royal avenues.'}
          </p>
        </div>

        {/* 3 Location Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {RESTAURANT_LOCATIONS.map((loc, idx) => {
            const city = isAr ? loc.cityAr : loc.cityEn;
            const address = isAr ? loc.addressAr : loc.addressEn;
            const hours = isAr ? loc.hoursAr : loc.hoursEn;

            return (
              <div
                key={idx}
                className="bg-[#121212] border border-[#2a2a2a] hover:border-[#d4af37]/60 rounded-xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 group shadow-lg"
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-[#1a160d] border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] mb-5 group-hover:border-[#d4af37] transition-all">
                    <MapPin className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-bold text-white font-serif-luxury mb-2">
                    {city}
                  </h3>

                  <p className="text-neutral-300 text-sm font-light leading-relaxed mb-4">
                    {address}
                  </p>

                  <div className="space-y-2 text-xs text-neutral-400">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>{hours}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span className="font-mono">{loc.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-800">
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(`${city} ${address}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-[#d4af37] hover:text-[#f3e5ab] transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>{isAr ? 'عرض الاتجاهات على الخريطة' : 'View on Google Maps'}</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
