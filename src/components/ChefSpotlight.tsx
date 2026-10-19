import React from 'react';
import { Language, Currency, MenuItem } from '../types';
import { Sparkles, Utensils, MessageCircle, Plus } from 'lucide-react';

interface ChefSpotlightProps {
  language: Language;
  currency: Currency;
  onAddToCart: (item: MenuItem) => void;
  whatsappNumber: string;
  items: MenuItem[];
}

export const ChefSpotlight: React.FC<ChefSpotlightProps> = ({
  language,
  currency,
  onAddToCart,
  whatsappNumber,
  items,
}) => {
  const isAr = language === 'ar';

  // Highlight items: Tomahawk, Royal Kebab, Baklava
  const signatureItems = items.filter(i => i.isChefSignature).slice(0, 3);

  const formatPrice = (item: MenuItem) => {
    if (currency === 'EGP') {
      return `${item.priceEGP.toLocaleString()} ج.م`;
    }
    return `$${item.priceUSD}`;
  };

  return (
    <section id="signature" className="py-24 bg-[#080808] border-t border-[#d4af37]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isAr ? 'روائع قصر السلطان' : 'Chef’s Grand Signatures'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-snug">
            {isAr ? (
              <span className="font-arabic-royal">
                أطباق التتويج الملكي{' '}
                <span className="gold-gradient-text">المغلفة بالذهب الخالص</span>
              </span>
            ) : (
              <span className="font-serif-luxury">
                Imperial Coronation Dishes{' '}
                <span className="gold-gradient-text">Cloaked in Pure 24K Gold</span>
              </span>
            )}
          </h2>
          <p className="mt-4 text-neutral-300 text-sm sm:text-base font-light">
            {isAr
              ? 'أطباق أيقونية يُشرف عليها كبار الطهاة العالميين وتُقدم في طقوس استعراضية مذهلة على طاولتك مباشرة مع لهيب النار وعروض السكاكين الملكية.'
              : 'Our flagship culinary wonders prepared tableside with ceremonial fire rituals, custom Damascus steel carving, and royal presentation.'}
          </p>
        </div>

        {/* 3 Signature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {signatureItems.map((item) => {
            const itemName = isAr ? item.nameAr : item.nameEn;
            const itemDesc = isAr ? item.descAr : item.descEn;
            const whatsappOrderLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
              isAr
                ? `مرحباً، أود طلب الطبق الملكي: ${item.nameAr} (${formatPrice(item)})`
                : `Hello, I would like to order: ${item.nameEn} (${formatPrice(item)})`
            )}`;

            return (
              <div
                key={item.id}
                className="group relative bg-[#121212] rounded-xl overflow-hidden border border-[#d4af37]/30 hover:border-[#d4af37] transition-all duration-300 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(212,175,55,0.2)]"
              >
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden bg-neutral-900">
                  <img
                    src={item.image}
                    alt={itemName}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-black/30" />
                  
                  {/* Gold Badge */}
                  {item.isGoldLeaf && (
                    <div className="absolute top-3 left-3 bg-[#16140e]/90 border border-[#d4af37] px-3 py-1 rounded text-[11px] font-semibold text-[#f3e5ab] flex items-center gap-1.5 backdrop-blur-sm shadow-md">
                      <Sparkles className="w-3 h-3 text-[#d4af37]" />
                      <span>{isAr ? 'ذهب عيار 24' : '24K Edible Gold'}</span>
                    </div>
                  )}

                  {/* Price Tag */}
                  <div className="absolute bottom-3 right-3 bg-black/85 border border-[#d4af37]/40 px-3 py-1 rounded text-sm font-bold text-[#d4af37] font-mono backdrop-blur-sm">
                    {formatPrice(item)}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#f3e5ab] transition-colors leading-snug">
                      {itemName}
                    </h3>
                    <p className="mt-3 text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                      {itemDesc}
                    </p>

                    {/* Metadata tags */}
                    <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] text-[#d4af37]/90">
                      {(isAr ? item.tagsAr : item.tagsEn).map((tag, idx) => (
                        <React.Fragment key={tag}>
                          <span>{tag}</span>
                          {idx < (isAr ? item.tagsAr : item.tagsEn).length - 1 && (
                            <span className="text-neutral-600" aria-hidden="true">·</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  {/* Actions: Add to Tray + WhatsApp Direct */}
                  <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center gap-2">
                    <button
                      onClick={() => onAddToCart(item)}
                      className="flex-1 py-2.5 px-3 rounded text-xs font-semibold text-black bg-gradient-to-r from-[#d4af37] via-[#f7e7a9] to-[#bf953f] hover:brightness-110 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{isAr ? 'إضافة للطلب' : 'Add to Order'}</span>
                    </button>

                    <a
                      href={whatsappOrderLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded border border-[#25D366]/50 text-[#25D366] hover:bg-[#25D366]/10 transition-all flex items-center justify-center shrink-0"
                      title={isAr ? 'طلب عبر واتساب' : 'Order via WhatsApp'}
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
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
