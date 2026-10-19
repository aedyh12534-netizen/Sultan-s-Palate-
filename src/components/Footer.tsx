import React, { useState } from 'react';
import { Language } from '../types';
import { Sparkles, Phone, Mail, MapPin, Send, Check } from 'lucide-react';

interface FooterProps {
  language: Language;
  whatsappNumber: string;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ language, whatsappNumber, onOpenAdmin }) => {
  const isAr = language === 'ar';
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="bg-[#050505] border-t border-[#d4af37]/20 text-neutral-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full border border-[#d4af37] flex items-center justify-center bg-[#14120b]">
                <span className="font-serif-luxury text-[#d4af37] font-bold">S</span>
              </div>
              <div>
                <span className="font-serif-luxury text-lg font-bold text-white uppercase tracking-wider block">
                  Sultan’s Palate
                </span>
                <span className="text-xs text-[#d4af37] font-arabic-royal font-semibold block -mt-1">
                  قصر السلطان
                </span>
              </div>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              {isAr
                ? 'المطعم العالمي الفاخر الذي يجمع بين أصالة التراث العثماني، براعة الشواء على جمر البلوط، وأفخم شرائح اللحم الأمريكية المعتقة بالذهب 24 قيراط.'
                : 'An ultra-luxury culinary destination blending Ottoman imperial banquets, oak-ember wood smoking, and USDA Prime dry-aged 24K gold steaks.'}
            </p>

            <div className="pt-2">
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#25D366] hover:text-[#52e88a] transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>wa.me/{whatsappNumber}</span>
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#d4af37] mb-4">
              {isAr ? 'روابط القصر' : 'Palace Navigation'}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#home" className="hover:text-white transition-colors">
                  {isAr ? 'الرئيسية' : 'Home'}
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-white transition-colors">
                  {isAr ? 'قائمة الطعام الإمبراطورية' : 'Imperial Menu'}
                </a>
              </li>
              <li>
                <a href="#signature" className="hover:text-white transition-colors">
                  {isAr ? 'روائع الأطباق بالذهب' : '24K Gold Signatures'}
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-white transition-colors">
                  {isAr ? 'تراث القصر وفلسفة الطهي' : 'Royal Heritage'}
                </a>
              </li>
              <li>
                <a href="#reservation" className="hover:text-white transition-colors">
                  {isAr ? 'حجز طاولة VIP' : 'Reserve VIP Table'}
                </a>
              </li>
              <li>
                <a href="#locations" className="hover:text-white transition-colors">
                  {isAr ? 'فروعنا (إسطنبول، نيويورك، الإسكندرية)' : 'Destinations (Istanbul, NYC, Alexandria)'}
                </a>
              </li>
            </ul>
          </div>

          {/* Operating Hours */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#d4af37] mb-4">
              {isAr ? 'ساعات الاستقبال' : 'Dining Hours'}
            </h4>
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-white font-medium block">
                  {isAr ? 'الغداء والولائم الملكية' : 'Imperial Lunch & Banquets'}
                </span>
                <span className="text-neutral-500">1:00 PM – 5:00 PM</span>
              </div>
              <div>
                <span className="text-white font-medium block">
                  {isAr ? 'العشاء وسهرات الجمر' : 'Royal Evening & Hearth Dinners'}
                </span>
                <span className="text-neutral-500">6:00 PM – 2:00 AM</span>
              </div>
              <p className="text-[11px] text-[#d4af37]/80 pt-1">
                {isAr ? 'الخدمة الخاصة متاحة على مدار الأسبوع' : 'VIP Concierge available 7 days a week'}
              </p>
            </div>
          </div>

          {/* VIP Newsletter */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#d4af37] mb-4">
              {isAr ? 'النشرة البريدية الملكية' : 'Imperial Gazette'}
            </h4>
            <p className="text-xs text-neutral-400 mb-3 font-light">
              {isAr
                ? 'انضم إلى قائمة النخبة لتصلك دعوات التذوق الخاصة وقوائم المواسم الحصرية.'
                : 'Subscribe to receive invitations to private seasonal tasting dinners and rare vintage releases.'}
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder={isAr ? 'بريدك الإلكتروني' : 'Your email address'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#111] border border-neutral-800 focus:border-[#d4af37] rounded-lg py-2.5 px-3 text-xs text-white placeholder-neutral-500 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 px-3 rounded text-xs font-semibold uppercase text-black bg-[#d4af37] hover:bg-[#c49e2e] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {subscribed ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-black" />
                    <span>{isAr ? 'تم الاشتراك بنجاح' : 'Subscribed'}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3 h-3 text-black" />
                    <span>{isAr ? 'انضم لقائمة النخبة' : 'Join The Circle'}</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>
            © {new Date().getFullYear()} Sultan’s Palate (قصر السلطان). {isAr ? 'جميع الحقوق محفوظة.' : 'All Rights Reserved.'}
          </p>

          <div className="flex items-center gap-4">
            <span className="text-[#d4af37] font-serif-luxury">Haute Gastronomy</span>
            <span>·</span>
            <span>Istanbul</span>
            <span>·</span>
            <span>New York</span>
            <span>·</span>
            <span>Alexandria</span>
            {onOpenAdmin && (
              <>
                <span>·</span>
                <button
                  onClick={onOpenAdmin}
                  className="text-neutral-600 hover:text-[#d4af37] transition-colors cursor-pointer text-[11px] underline underline-offset-4"
                  title="غرفة الإدارة (مخصص لصاحب المطعم)"
                >
                  {isAr ? 'غرفة الإدارة' : 'Admin Portal'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
