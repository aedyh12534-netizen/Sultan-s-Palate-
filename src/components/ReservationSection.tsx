import React, { useState } from 'react';
import { Language, ReservationData } from '../types';
import { Sparkles, Calendar, Clock, Users, MapPin, CheckCircle, MessageCircle, Phone, User } from 'lucide-react';

interface ReservationSectionProps {
  language: Language;
  whatsappNumber: string;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({
  language,
  whatsappNumber,
}) => {
  const isAr = language === 'ar';

  const [formData, setFormData] = useState<ReservationData>({
    guestName: '',
    guestPhone: '',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time: '20:00',
    guestsCount: 4,
    seatingArea: 'royal_hall',
    specialRequests: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState('');

  const seatingOptions = [
    {
      id: 'royal_hall',
      titleEn: 'Imperial Dining Hall',
      titleAr: 'قاعة البلاط الإمبراطورية الكبرى',
      descEn: 'Surrounded by crystal chandeliers, vaulted arches and live classical oud accompaniment.',
      descAr: 'تحت الثريات الكريستالية والأقواس الملكية مع عزف العود الكلاسيكي الحي.'
    },
    {
      id: 'sultan_suite',
      titleEn: 'Private Sultan VIP Suite',
      titleAr: 'جناح السلطان الخاص (VIP)',
      descEn: 'Maximum privacy for dignitaries and royal celebrations with dedicated private butler.',
      descAr: 'أقصى درجات الخصوصية للوفود ورجال الأعمال مع كبير خدم خاص وطهاة مخصصين.'
    },
    {
      id: 'skyline_terrace',
      titleEn: 'Skyline Waterfront Terrace',
      titleAr: 'شرفة الواجهة البحرية والبانوراما',
      descEn: 'Panoramic open-air terrace with sweeping views and illuminated water fountains.',
      descAr: 'جلسة خارجية ساحرة مطلة على الواجهة البحرية والنوافير الذهبية الراقية.'
    },
    {
      id: 'hearth_table',
      titleEn: 'Chef’s Hearth Table',
      titleAr: 'طاولة موقد الشيف الاستعراضية',
      descEn: 'Front-row seats to open-ember oak fire flames and tableside gold slicing rituals.',
      descAr: 'مقاعد أمامية لمشاهدة لهيب جمر البلوط وطقوس تقطيع الذهب الملكي مباشرة.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.guestName.trim() || !formData.guestPhone.trim()) return;

    const randomId = 'SP-' + Math.floor(100000 + Math.random() * 900000);
    setBookingId(randomId);
    setIsSubmitted(true);
  };

  const getSeatingTitle = (id: string) => {
    const found = seatingOptions.find(o => o.id === id);
    return isAr ? found?.titleAr : found?.titleEn;
  };

  const whatsappReservationMessage = encodeURIComponent(
    isAr
      ? `👑 *حجز طاولة VIP في قصر السلطان Sultan’s Palate* 👑\nرقم الحجز: ${bookingId}\nالاسم: ${formData.guestName}\nالهاتف: ${formData.guestPhone}\nالتاريخ: ${formData.date}\nالوقت: ${formData.time}\nعدد الضيوف: ${formData.guestsCount} أشخاص\nالمنطقة: ${getSeatingTitle(formData.seatingArea)}\nملاحظات خاصة: ${formData.specialRequests || 'لا توجد'}\n\nيرجى تأكيد الحجز.`
      : `👑 *VIP Reservation at Sultan’s Palate* 👑\nBooking ID: ${bookingId}\nGuest Name: ${formData.guestName}\nPhone: ${formData.guestPhone}\nDate: ${formData.date}\nTime: ${formData.time}\nParty Size: ${formData.guestsCount} Guests\nSeating: ${getSeatingTitle(formData.seatingArea)}\nSpecial Requests: ${formData.specialRequests || 'None'}\n\nPlease confirm my reservation.`
  );

  return (
    <section id="reservation" className="py-24 bg-[#080808] border-t border-[#d4af37]/20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isAr ? 'حجز الموائد الملكية' : 'VIP Table Reservations'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {isAr ? (
              <span className="font-arabic-royal">
                احجز طاولتك في <span className="gold-gradient-text">قصر السلطان</span>
              </span>
            ) : (
              <span className="font-serif-luxury">
                Secure Your <span className="gold-gradient-text">Imperial Table</span>
              </span>
            )}
          </h2>
          <p className="mt-3 text-neutral-400 text-sm">
            {isAr
              ? 'احجز مقعدك الفاخر مسبقاً لضمان أفضل تجربة وضيافة ملكية، أو تواصل معنا مباشرة عبر واتساب.'
              : 'Advance reservation recommended. Experience bespoke hospitality with tailored VIP concierge services.'}
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-[#121212] border border-[#d4af37]/40 rounded-2xl p-6 sm:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.8)] relative">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Guest Name */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-300 mb-2">
                    {isAr ? 'اسم الضيف الكريم' : 'Full Name'} *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#d4af37] absolute top-3.5 left-3 pointer-events-none" />
                    <input
                      type="text"
                      required
                      placeholder={isAr ? 'معالي / فلان الفلاني' : 'Lord / Lady / Full Name'}
                      value={formData.guestName}
                      onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                      className="w-full bg-[#181818] border border-neutral-700 focus:border-[#d4af37] rounded-lg py-3 px-10 text-sm text-white placeholder-neutral-500 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-300 mb-2">
                    {isAr ? 'رقم الهاتف / الواتساب' : 'Phone / WhatsApp'} *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#d4af37] absolute top-3.5 left-3 pointer-events-none" />
                    <input
                      type="tel"
                      required
                      placeholder={isAr ? '+20 1X XXXX XXXX' : '+1 212 XXX XXXX'}
                      value={formData.guestPhone}
                      onChange={(e) => setFormData({ ...formData, guestPhone: e.target.value })}
                      className="w-full bg-[#181818] border border-neutral-700 focus:border-[#d4af37] rounded-lg py-3 px-10 text-sm text-white placeholder-neutral-500 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-300 mb-2">
                    {isAr ? 'تاريخ الحجز' : 'Reservation Date'} *
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-[#d4af37] absolute top-3.5 left-3 pointer-events-none" />
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-[#181818] border border-neutral-700 focus:border-[#d4af37] rounded-lg py-3 px-10 text-sm text-white focus:outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Time & Guests */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-300 mb-2">
                      {isAr ? 'التوقيت' : 'Time'}
                    </label>
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full bg-[#181818] border border-neutral-700 focus:border-[#d4af37] rounded-lg py-3 px-3 text-sm text-white focus:outline-none transition-all"
                    >
                      <option value="17:00">5:00 PM</option>
                      <option value="18:30">6:30 PM</option>
                      <option value="20:00">8:00 PM</option>
                      <option value="21:30">9:30 PM</option>
                      <option value="23:00">11:00 PM</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-300 mb-2">
                      {isAr ? 'عدد الضيوف' : 'Guests'}
                    </label>
                    <select
                      value={formData.guestsCount}
                      onChange={(e) => setFormData({ ...formData, guestsCount: Number(e.target.value) })}
                      className="w-full bg-[#181818] border border-neutral-700 focus:border-[#d4af37] rounded-lg py-3 px-3 text-sm text-white focus:outline-none transition-all"
                    >
                      <option value={2}>2 {isAr ? 'ضيفان' : 'Guests'}</option>
                      <option value={4}>4 {isAr ? 'ضيوف' : 'Guests'}</option>
                      <option value={6}>6 {isAr ? 'ضيوف' : 'Guests'}</option>
                      <option value={8}>8 {isAr ? 'ضيوف' : 'Guests'}</option>
                      <option value={12}>12+ {isAr ? 'وليمة كبرى' : 'Royal Feast'}</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Seating Choice */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-300 mb-3">
                  {isAr ? 'اختر الأجواء وتفضيل الجلسة' : 'Choose Seating Experience'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {seatingOptions.map((opt) => (
                    <button
                      type="button"
                      key={opt.id}
                      onClick={() => setFormData({ ...formData, seatingArea: opt.id as any })}
                      className={`p-3.5 rounded-lg border text-left rtl:text-right transition-all flex flex-col justify-between cursor-pointer ${
                        formData.seatingArea === opt.id
                          ? 'border-[#d4af37] bg-[#1a160d] shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                          : 'border-neutral-800 bg-[#161616] hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="text-sm font-semibold text-white">
                          {isAr ? opt.titleAr : opt.titleEn}
                        </span>
                        {formData.seatingArea === opt.id && (
                          <span className="w-2 h-2 rounded-full bg-[#d4af37]" />
                        )}
                      </div>
                      <span className="text-xs text-neutral-400 mt-1 font-light">
                        {isAr ? opt.descAr : opt.descEn}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-300 mb-2">
                  {isAr ? 'طلبات خاصة أو مناسبة احتفالية (اختياري)' : 'Special Requests or Celebrations'}
                </label>
                <textarea
                  rows={2}
                  placeholder={isAr ? 'مثال: مناسبة ذكرى سنوية، تفضيل شوكلاتة مذهبة، طاولة هادئة...' : 'E.g., Anniversary coronation, gold leaf slicing ritual, business discretion...'}
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  className="w-full bg-[#181818] border border-neutral-700 focus:border-[#d4af37] rounded-lg p-3 text-sm text-white placeholder-neutral-500 focus:outline-none transition-all"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                <button
                  type="submit"
                  className="w-full sm:flex-1 py-3.5 px-6 rounded text-sm font-semibold uppercase tracking-wider text-black bg-gradient-to-r from-[#d4af37] via-[#f7e7a9] to-[#bf953f] hover:brightness-110 transition-all shadow-[0_0_25px_rgba(212,175,55,0.3)] cursor-pointer"
                >
                  {isAr ? 'تأكيد طلب حجز الطاولة الملكية' : 'Request Imperial Table Reservation'}
                </button>

                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(isAr ? 'مرحباً، أود الاستفسار عن حجز طاولة VIP خاصة في قصر السلطان' : 'Hello, I would like to inquire about a VIP reservation at Sultan’s Palate')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto py-3.5 px-6 rounded text-sm font-medium text-[#25D366] border border-[#25D366]/40 hover:bg-[#25D366]/10 transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{isAr ? 'حجز سريع عبر واتساب' : 'Quick WhatsApp Booking'}</span>
                </a>
              </div>
            </form>
          ) : (
            /* Confirmation State */
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center mx-auto mb-4 text-[#d4af37]">
                <CheckCircle className="w-8 h-8" />
              </div>

              <h3 className="text-2xl font-bold text-white font-serif-luxury">
                {isAr ? 'تم استلام طلب الحجز الملكي بنجاح' : 'Imperial Reservation Request Received'}
              </h3>
              
              <p className="text-neutral-300 text-sm mt-2 max-w-lg mx-auto">
                {isAr
                  ? `أهلاً بك يا ${formData.guestName}. تم تخصيص رقم الحجز المرجعي (${bookingId}). سيقوم كونسيرج القصر بالتواصل معك فوراً لتأكيد التفاصيل.`
                  : `Honored ${formData.guestName}, your reservation reference (${bookingId}) has been logged. Our royal concierge is preparing your welcome.`}
              </p>

              {/* Reservation Summary Box */}
              <div className="mt-6 p-4 rounded-xl bg-[#181818] border border-neutral-700 max-w-md mx-auto text-xs text-neutral-300 space-y-2 text-left rtl:text-right">
                <div className="flex justify-between">
                  <span className="text-neutral-500">{isAr ? 'التاريخ والوقت:' : 'Date & Time:'}</span>
                  <span className="font-semibold text-white">{formData.date} @ {formData.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">{isAr ? 'عدد الضيوف:' : 'Guests:'}</span>
                  <span className="font-semibold text-white">{formData.guestsCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">{isAr ? 'المنطقة المحجوزة:' : 'Seating:'}</span>
                  <span className="font-semibold text-[#d4af37]">{getSeatingTitle(formData.seatingArea)}</span>
                </div>
              </div>

              {/* Direct WhatsApp Confirmation Button */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappReservationMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 rounded text-sm font-semibold text-white bg-[#25D366] hover:bg-[#20ba59] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,211,102,0.3)]"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>{isAr ? 'تأكيد الحجز فوراً عبر واتساب' : 'Confirm Instantly via WhatsApp'}</span>
                </a>

                <button
                  onClick={() => setIsSubmitted(false)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded text-sm font-medium text-neutral-400 hover:text-white border border-neutral-700 hover:border-neutral-500 transition-all cursor-pointer"
                >
                  {isAr ? 'حجز موعد آخر' : 'Book Another Table'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
