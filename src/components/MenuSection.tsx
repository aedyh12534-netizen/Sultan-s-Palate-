import React, { useState } from 'react';
import { Language, Currency, MenuCategory, MenuItem } from '../types';
import { Sparkles, Plus, MessageCircle, Clock, Flame, Check } from 'lucide-react';

interface MenuSectionProps {
  language: Language;
  currency: Currency;
  onCurrencyToggle: () => void;
  onAddToCart: (item: MenuItem) => void;
  whatsappNumber: string;
  items: MenuItem[];
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  language,
  currency,
  onCurrencyToggle,
  onAddToCart,
  whatsappNumber,
  items,
}) => {
  const isAr = language === 'ar';
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('all');
  const [addedItemId, setAddedItemId] = useState<string | null>(null);

  const categories: { key: MenuCategory; labelEn: string; labelAr: string }[] = [
    { key: 'all', labelEn: 'All Offerings', labelAr: 'كافة الأطباق' },
    { key: 'appetizers', labelEn: 'Appetizers & Mezzes', labelAr: 'المقبلات' },
    { key: 'mains', labelEn: 'Main Courses & Steaks', labelAr: 'الأطباق الرئيسية' },
    { key: 'desserts', labelEn: 'Luxury Desserts', labelAr: 'الحلويات' },
    { key: 'beverages', labelEn: 'Beverages & Elixirs', labelAr: 'المشروبات' },
  ];

  const filteredItems = activeCategory === 'all'
    ? items
    : items.filter(item => {
        if (activeCategory === 'mains') {
          return item.category === 'mains' || item.category === 'steaks' || item.category === 'ottoman_feasts' || item.category === 'seafood';
        }
        if (activeCategory === 'beverages') {
          return item.category === 'beverages' || item.category === 'elixirs';
        }
        return item.category === activeCategory;
      });

  const formatPrice = (item: MenuItem) => {
    if (currency === 'EGP') {
      return `${item.priceEGP.toLocaleString()} ج.م`;
    }
    return `$${item.priceUSD}`;
  };

  const handleAdd = (item: MenuItem) => {
    onAddToCart(item);
    setAddedItemId(item.id);
    setTimeout(() => setAddedItemId(null), 1500);
  };

  return (
    <section id="menu" className="py-24 bg-[#0a0a0a] border-t border-[#d4af37]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isAr ? 'قائمة الطعام الملكية' : 'The Imperial Gastronomy'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              {isAr ? (
                <span className="font-arabic-royal">
                  قائمة طعام <span className="gold-gradient-text">قصر السلطان</span>
                </span>
              ) : (
                <span className="font-serif-luxury">
                  The Sultan’s <span className="gold-gradient-text">Gourmet Selection</span>
                </span>
              )}
            </h2>
            <p className="mt-2 text-neutral-400 text-sm max-w-xl">
              {isAr
                ? 'أعدت بدقة متناهية تحت إشراف طهاة حائزين على أوسمة طهي دولية، باستخدام خامات مستوردة ومكونات طازجة 100%.'
                : 'Curated with precision using USDA Prime dry-aged cuts, wild Mediterranean seafood, and royal Ottoman heritage spices.'}
            </p>
          </div>

          {/* Currency Switcher */}
          <div className="flex items-center gap-3 bg-[#141414] border border-[#d4af37]/30 px-3 py-1.5 rounded-lg shrink-0">
            <span className="text-xs text-neutral-400">
              {isAr ? 'عرض الأسعار بـ:' : 'Display Currency:'}
            </span>
            <div className="flex items-center gap-1 p-0.5 bg-[#080808] rounded border border-neutral-800">
              <button
                onClick={() => currency !== 'USD' && onCurrencyToggle()}
                className={`px-2.5 py-1 text-xs font-semibold rounded transition-all ${
                  currency === 'USD'
                    ? 'bg-[#d4af37] text-black shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                USD ($)
              </button>
              <button
                onClick={() => currency !== 'EGP' && onCurrencyToggle()}
                className={`px-2.5 py-1 text-xs font-semibold rounded transition-all ${
                  currency === 'EGP'
                    ? 'bg-[#d4af37] text-black shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                EGP (ج.م)
              </button>
            </div>
          </div>
        </div>

        {/* Category Segmented Tabs (Compliant with Anti-Slop interactive filter rules) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-all border shrink-0 cursor-pointer ${
                activeCategory === cat.key
                  ? 'bg-gradient-to-r from-[#d4af37] to-[#bf953f] text-black border-transparent font-bold shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                  : 'bg-[#141414] text-neutral-300 border-[#333] hover:border-[#d4af37]/50 hover:text-white'
              }`}
            >
              {isAr ? cat.labelAr : cat.labelEn}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => {
            const itemName = isAr ? item.nameAr : item.nameEn;
            const itemDesc = isAr ? item.descAr : item.descEn;
            const isJustAdded = addedItemId === item.id;
            const whatsappDirectLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
              isAr
                ? `مرحباً قصر السلطان، أود طلب الطبق: ${item.nameAr} بسعر ${formatPrice(item)}`
                : `Hello Sultan’s Palate, I would like to order: ${item.nameEn} for ${formatPrice(item)}`
            )}`;

            return (
              <div
                key={item.id}
                className="bg-[#121212] border border-[#262626] hover:border-[#d4af37]/60 rounded-xl overflow-hidden transition-all duration-300 flex flex-col justify-between group hover:shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden bg-neutral-900">
                  <img
                    src={item.image}
                    alt={itemName}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-black/20" />
                  
                  {item.isGoldLeaf && (
                    <div className="absolute top-3 left-3 bg-[#1a160c]/90 border border-[#d4af37] px-2.5 py-0.5 rounded text-[10px] font-semibold text-[#f3e5ab] flex items-center gap-1 backdrop-blur-sm">
                      <Sparkles className="w-3 h-3 text-[#d4af37]" />
                      <span>{isAr ? 'ذهب عيار 24' : '24K Gold'}</span>
                    </div>
                  )}

                  {item.isChefSignature && !item.isGoldLeaf && (
                    <div className="absolute top-3 left-3 bg-[#1a160c]/90 border border-[#d4af37]/60 px-2.5 py-0.5 rounded text-[10px] font-semibold text-[#f3e5ab] backdrop-blur-sm">
                      {isAr ? 'توقيع الشيف' : 'Chef Signature'}
                    </div>
                  )}

                  {/* Price */}
                  <div className="absolute bottom-3 right-3 bg-black/90 border border-[#d4af37]/50 px-2.5 py-1 rounded text-sm font-bold text-[#d4af37] font-mono">
                    {formatPrice(item)}
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-[#f3e5ab] transition-colors">
                      {itemName}
                    </h3>
                    <p className="mt-2 text-xs text-neutral-300 font-light leading-relaxed line-clamp-3">
                      {itemDesc}
                    </p>

                    {/* Metadata tags: clean unboxed text */}
                    <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-neutral-400">
                      {item.prepTime && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#d4af37]" />
                          <span>{item.prepTime}</span>
                        </span>
                      )}
                      {item.prepTime && <span aria-hidden="true">·</span>}
                      {item.calories && (
                        <span className="flex items-center gap-1">
                          <Flame className="w-3 h-3 text-[#d4af37]" />
                          <span>{item.calories} {isAr ? 'سعر حراري' : 'kcal'}</span>
                        </span>
                      )}
                      {item.calories && <span aria-hidden="true">·</span>}
                      <span>{(isAr ? item.tagsAr : item.tagsEn)[0]}</span>
                    </div>
                  </div>

                  {/* Order Controls */}
                  <div className="mt-5 pt-3 border-t border-neutral-800 flex items-center gap-2">
                    <button
                      onClick={() => handleAdd(item)}
                      className={`flex-1 py-2 px-3 rounded text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        isJustAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#1e1e1e] hover:bg-[#d4af37] text-white hover:text-black border border-[#333] hover:border-[#d4af37]'
                      }`}
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>{isAr ? 'تمت الإضافة بنجاح' : 'Added to Tray'}</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>{isAr ? 'إضافة للطلب' : 'Add to Order'}</span>
                        </>
                      )}
                    </button>

                    <a
                      href={whatsappDirectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/10 transition-all flex items-center justify-center shrink-0"
                      title={isAr ? 'اطلب فوراً عبر واتساب' : 'Order via WhatsApp'}
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
