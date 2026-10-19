import React, { useState } from 'react';
import { Language } from '../types';
import { MessageCircle, Settings, X, Check, Phone } from 'lucide-react';

interface FloatingWhatsAppProps {
  language: Language;
  whatsappNumber: string;
  onUpdateWhatsappNumber: (newNumber: string) => void;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  language,
  whatsappNumber,
  onUpdateWhatsappNumber,
}) => {
  const isAr = language === 'ar';
  const [showConfig, setShowConfig] = useState(false);
  const [tempNumber, setTempNumber] = useState(whatsappNumber);
  const [copiedSuccess, setCopiedSuccess] = useState(false);

  const defaultMsg = encodeURIComponent(
    isAr
      ? "مرحباً قصر السلطان Sultan’s Palate، أود الاستفسار وطلب قائمة الطعام"
      : "Hello, I want to order from Sultan's Palate"
  );

  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${defaultMsg}`;

  const handleSaveNumber = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNumber = tempNumber.replace(/[^0-9]/g, '');
    if (cleanNumber.length >= 8) {
      onUpdateWhatsappNumber(cleanNumber);
      setShowConfig(false);
    }
  };

  return (
    <>
      {/* Floating Action Button Cluster */}
      <div className={`fixed bottom-6 ${isAr ? 'left-6' : 'right-6'} z-50 flex items-center gap-2 group`}>
        {/* Quick Config Button */}
        <button
          onClick={() => setShowConfig(true)}
          className="w-8 h-8 rounded-full bg-[#181818] border border-neutral-700 hover:border-[#d4af37] text-neutral-400 hover:text-[#d4af37] flex items-center justify-center text-xs shadow-lg transition-all backdrop-blur-sm cursor-pointer"
          title={isAr ? 'تخصيص رقم الواتساب المباشر' : 'Customize WhatsApp Number'}
          aria-label="Settings for WhatsApp"
        >
          <Settings className="w-4 h-4" />
        </button>

        {/* The Fixed Floating WhatsApp Button with Pulsing Animation */}
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20ba59] rounded-full shadow-[0_0_25px_rgba(37,211,102,0.45)] hover:shadow-[0_0_35px_rgba(37,211,102,0.7)] transition-all transform hover:scale-110 active:scale-95 group focus:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40 cursor-pointer"
          title={isAr ? 'تواصل فوراً عبر واتساب مع قصر السلطان' : 'Chat Instantly on WhatsApp'}
          aria-label="Chat with Sultan’s Palate on WhatsApp"
        >
          {/* Subtle Outer Pulsing Halo */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-75 animate-ping -z-10 duration-1000" />

          {/* WhatsApp Icon */}
          <svg
            className="w-7 h-7 text-white fill-current"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.17 8.17 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.24 8.24-1.42 0-2.82-.37-4.06-1.07l-.29-.17-3.02.79.81-2.95-.19-.3a8.16 8.16 0 0 1-1.25-4.36c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.58c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.07-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.48-.3z" />
          </svg>

          {/* Quick Preview Badge on Hover */}
          <span className={`absolute ${isAr ? 'left-16' : 'right-16'} bottom-1 bg-[#121212] border border-[#d4af37]/40 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none font-medium`}>
            {isAr ? '💬 تواصل واطلب فوراً' : '💬 Instant WhatsApp Order'}
          </span>
        </a>
      </div>

      {/* WhatsApp Configuration Modal */}
      {showConfig && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#141414] border border-[#d4af37]/60 rounded-xl p-6 max-w-md w-full shadow-2xl relative" dir={isAr ? 'rtl' : 'ltr'}>
            <button
              onClick={() => setShowConfig(false)}
              className="absolute top-4 right-4 rtl:left-4 rtl:right-auto text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3 text-[#25D366]">
              <Phone className="w-5 h-5" />
              <h3 className="text-base font-bold text-white">
                {isAr ? 'إعداد رقم الواتساب المباشر' : 'Configure WhatsApp Number'}
              </h3>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed mb-4">
              {isAr
                ? 'أدخل رقمك مع كود الدولة وبدون إشارة (+) أو أصفار البداية (مثال لمصر: 201234567890، للسعودية: 966501234567، لأمريكا: 12125550199).'
                : 'Enter your phone number with country code without (+) or leading zeroes (e.g. Egypt: 201234567890, US: 12125550199).'}
            </p>

            <form onSubmit={handleSaveNumber} className="space-y-4">
              <div>
                <label className="block text-xs uppercase text-neutral-400 mb-1 font-semibold">
                  {isAr ? 'رقم الواتساب الحالي' : 'Active WhatsApp Number'}
                </label>
                <input
                  type="text"
                  value={tempNumber}
                  onChange={(e) => setTempNumber(e.target.value)}
                  placeholder="201234567890"
                  className="w-full bg-[#1e1e1e] border border-neutral-700 focus:border-[#d4af37] rounded-lg p-3 text-sm text-white font-mono focus:outline-none"
                />
              </div>

              <div className="p-3 bg-[#0d0d0d] rounded-lg border border-neutral-800 text-[11px] text-neutral-400 space-y-1 font-mono">
                <p>{isAr ? 'رابط الواتساب المولد:' : 'Generated Link Target:'}</p>
                <p className="text-[#25D366] break-all">https://wa.me/{tempNumber.replace(/[^0-9]/g, '')}</p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 rounded text-xs font-semibold uppercase text-black bg-[#d4af37] hover:bg-[#c29e2f] transition-all cursor-pointer"
                >
                  {isAr ? 'حفظ وتطبيق فوراً' : 'Save & Update'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowConfig(false)}
                  className="py-2.5 px-4 rounded text-xs text-neutral-400 hover:text-white border border-neutral-700 cursor-pointer"
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
