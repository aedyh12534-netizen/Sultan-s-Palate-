import React, { useState } from 'react';
import { Language, Currency, CartItem } from '../types';
import { X, Plus, Minus, Trash2, ShoppingBag, MessageCircle, Send, Check } from 'lucide-react';

interface WhatsAppDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  currency: Currency;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  whatsappNumber: string;
}

export const WhatsAppDrawer: React.FC<WhatsAppDrawerProps> = ({
  isOpen,
  onClose,
  language,
  currency,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  whatsappNumber,
}) => {
  const isAr = language === 'ar';
  const [customerName, setCustomerName] = useState('');
  const [orderType, setOrderType] = useState<'dine_in' | 'vip_takeaway'>('dine_in');
  const [specialNotes, setSpecialNotes] = useState('');

  if (!isOpen) return null;

  const totalUSD = cart.reduce((sum, item) => sum + item.item.priceUSD * item.quantity, 0);
  const totalEGP = cart.reduce((sum, item) => sum + item.item.priceEGP * item.quantity, 0);

  const formatPrice = (usd: number, egp: number) => {
    return currency === 'EGP' ? `${egp.toLocaleString()} ج.م` : `$${usd}`;
  };

  const generateWhatsAppMessage = () => {
    const header = isAr
      ? `👑 *طلب قائمة قصر السلطان Sultan’s Palate* 👑\n`
      : `👑 *Sultan’s Palate Imperial Order* 👑\n`;

    const guest = isAr
      ? `👤 *اسم العميل:* ${customerName || 'ضيف مميز'}\n`
      : `👤 *Guest Name:* ${customerName || 'VIP Guest'}\n`;

    const service = isAr
      ? `🍽️ *نوع الخدمة:* ${orderType === 'dine_in' ? 'طلب لطاولة بالقصر' : 'استلام فاخر VIP'}\n\n`
      : `🍽️ *Service:* ${orderType === 'dine_in' ? 'Dine-In Table Order' : 'VIP Private Takeaway'}\n\n`;

    const itemsList = cart
      .map((cartItem, idx) => {
        const name = isAr ? cartItem.item.nameAr : cartItem.item.nameEn;
        const price = formatPrice(
          cartItem.item.priceUSD * cartItem.quantity,
          cartItem.item.priceEGP * cartItem.quantity
        );
        return `${idx + 1}. ${name} × ${cartItem.quantity} = ${price}`;
      })
      .join('\n');

    const totalStr = isAr
      ? `\n\n💰 *الإجمالي الكلي:* $${totalUSD} USD / ${totalEGP.toLocaleString()} ج.م EGP`
      : `\n\n💰 *Total Investment:* $${totalUSD} USD / ${totalEGP.toLocaleString()} EGP`;

    const notesStr = specialNotes
      ? (isAr ? `\n📝 *ملاحظات الشيف:* ${specialNotes}` : `\n📝 *Chef Notes:* ${specialNotes}`)
      : '';

    const footer = isAr
      ? `\n\nيرجى تأكيد الطلب الملكي ووقت التجهيز.`
      : `\n\nPlease confirm preparation and timing.`;

    return encodeURIComponent(header + guest + service + itemsList + totalStr + notesStr + footer);
  };

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${generateWhatsAppMessage()}`;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm transition-opacity">
      <div 
        className="w-full max-w-md bg-[#111111] border-l rtl:border-r rtl:border-l-0 border-[#d4af37]/30 h-full flex flex-col justify-between shadow-2xl relative"
        dir={isAr ? 'rtl' : 'ltr'}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#262626] flex items-center justify-between bg-[#141414]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center text-[#d4af37]">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-serif-luxury">
                {isAr ? 'سلة الطلب الملكية' : 'Imperial Order Tray'}
              </h3>
              <p className="text-xs text-neutral-400">
                {cart.length} {isAr ? 'أطباق محددة' : 'items selected'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-neutral-700 hover:border-[#d4af37] text-neutral-400 hover:text-white transition-all cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content / Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 text-neutral-500 space-y-3">
              <ShoppingBag className="w-12 h-12 mx-auto text-neutral-600 stroke-[1.5]" />
              <p className="text-sm">
                {isAr ? 'سلة الطلب فارغة حالياً' : 'Your royal order tray is empty'}
              </p>
              <button
                onClick={onClose}
                className="text-xs text-[#d4af37] underline hover:text-[#f3e5ab]"
              >
                {isAr ? 'تصفح قائمة الطعام' : 'Explore the menu'}
              </button>
            </div>
          ) : (
            <>
              {cart.map((cartItem) => {
                const itemName = isAr ? cartItem.item.nameAr : cartItem.item.nameEn;
                const itemTotal = formatPrice(
                  cartItem.item.priceUSD * cartItem.quantity,
                  cartItem.item.priceEGP * cartItem.quantity
                );

                return (
                  <div
                    key={cartItem.item.id}
                    className="p-3.5 rounded-lg bg-[#181818] border border-[#2a2a2a] flex items-center gap-3"
                  >
                    <img
                      src={cartItem.item.image}
                      alt={itemName}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 rounded-md object-cover border border-[#d4af37]/30"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">
                        {itemName}
                      </h4>
                      <p className="text-xs font-mono text-[#d4af37] mt-0.5">
                        {itemTotal}
                      </p>

                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => onUpdateQuantity(cartItem.item.id, -1)}
                          className="w-6 h-6 rounded bg-[#222] border border-neutral-700 hover:border-[#d4af37] flex items-center justify-center text-white text-xs cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-mono font-semibold text-white px-1">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(cartItem.item.id, 1)}
                          className="w-6 h-6 rounded bg-[#222] border border-neutral-700 hover:border-[#d4af37] flex items-center justify-center text-white text-xs cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveItem(cartItem.item.id)}
                      className="p-1.5 text-neutral-500 hover:text-red-400 transition-colors cursor-pointer"
                      title={isAr ? 'حذف' : 'Remove'}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}

              {/* Order Options */}
              <div className="pt-4 border-t border-[#262626] space-y-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                    {isAr ? 'اسمك الكريم' : 'Your Name'}
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder={isAr ? 'فلان الفلاني' : 'Lord / Lady / Name'}
                    className="w-full bg-[#181818] border border-neutral-700 focus:border-[#d4af37] rounded-md px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                    {isAr ? 'نوع التقديم' : 'Service Preference'}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setOrderType('dine_in')}
                      className={`py-1.5 px-2 rounded text-xs border cursor-pointer ${
                        orderType === 'dine_in'
                          ? 'bg-[#1e1a10] border-[#d4af37] text-[#f3e5ab]'
                          : 'bg-[#161616] border-neutral-800 text-neutral-400'
                      }`}
                    >
                      {isAr ? 'طلب داخل القصر' : 'Dine-In Table'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderType('vip_takeaway')}
                      className={`py-1.5 px-2 rounded text-xs border cursor-pointer ${
                        orderType === 'vip_takeaway'
                          ? 'bg-[#1e1a10] border-[#d4af37] text-[#f3e5ab]'
                          : 'bg-[#161616] border-neutral-800 text-neutral-400'
                      }`}
                    >
                      {isAr ? 'استلام VIP خارجي' : 'VIP Takeaway'}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                    {isAr ? 'ملاحظات خاصة للشيف' : 'Special Culinary Notes'}
                  </label>
                  <input
                    type="text"
                    value={specialNotes}
                    onChange={(e) => setSpecialNotes(e.target.value)}
                    placeholder={isAr ? 'مثال: درجة الاستواء Medium Rare، حساسية معينة...' : 'E.g., Medium Rare, nut allergy, extra gold leaf...'}
                    className="w-full bg-[#181818] border border-neutral-700 focus:border-[#d4af37] rounded-md px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer & Submit to WhatsApp */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-[#262626] bg-[#141414] space-y-4">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-neutral-400">
                <span>{isAr ? 'الإجمالي (دولار أمريكي):' : 'Total (USD):'}</span>
                <span className="font-mono text-white">${totalUSD}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>{isAr ? 'الإجمالي (جنيه مصري):' : 'Total (EGP):'}</span>
                <span className="font-mono text-[#d4af37] font-bold">{totalEGP.toLocaleString()} ج.م</span>
              </div>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded text-sm font-semibold uppercase tracking-wider text-white bg-[#25D366] hover:bg-[#20ba59] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,211,102,0.3)] text-center cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>{isAr ? 'إرسال الطلب الملكي عبر واتساب' : 'Confirm Order via WhatsApp'}</span>
            </a>

            <button
              onClick={onClearCart}
              className="w-full text-center text-[11px] text-neutral-500 hover:text-red-400 transition-colors"
            >
              {isAr ? 'تفريغ السلة بالكامل' : 'Clear Order Tray'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
