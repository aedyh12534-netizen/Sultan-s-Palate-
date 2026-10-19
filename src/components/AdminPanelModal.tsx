import React, { useState } from 'react';
import { Language, MenuItem, MenuCategory, ThemeColor } from '../types';
import { X, Lock, Key, Plus, Trash2, RotateCcw, Check, AlertCircle, Palette, Utensils, Phone, Sparkles } from 'lucide-react';
import { RESTAURANT_IMAGES } from '../data/restaurantData';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  menuItems: MenuItem[];
  onAddDish: (dish: MenuItem) => void;
  onUpdateDish: (dish: MenuItem) => void;
  onDeleteDish: (id: string) => void;
  onResetMenu: () => void;
  whatsappNumber: string;
  onUpdateWhatsappNumber: (num: string) => void;
  activeTheme: ThemeColor;
  onChangeTheme: (theme: ThemeColor) => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  language,
  menuItems,
  onAddDish,
  onUpdateDish,
  onDeleteDish,
  onResetMenu,
  whatsappNumber,
  onUpdateWhatsappNumber,
  activeTheme,
  onChangeTheme,
}) => {
  const isAr = language === 'ar';
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);
  const [activeTab, setActiveTab] = useState<'theme' | 'menu' | 'whatsapp'>('theme');

  // Dish form state
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formNameAr, setFormNameAr] = useState('');
  const [formNameEn, setFormNameEn] = useState('');
  const [formCategory, setFormCategory] = useState<MenuCategory>('mains');
  const [formPriceEGP, setFormPriceEGP] = useState<number>(450);
  const [formPriceUSD, setFormPriceUSD] = useState<number>(10);
  const [formDescAr, setFormDescAr] = useState('');
  const [formDescEn, setFormDescEn] = useState('');
  const [formImageUrl, setFormImageUrl] = useState(RESTAURANT_IMAGES.wagyuRibeye);
  const [tempWhatsapp, setTempWhatsapp] = useState(whatsappNumber);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  if (!isOpen) return null;

  const triggerToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput.trim() === '01112629005' || passwordInput.trim() === '201112629005') {
      setIsAuthenticated(true);
      setAuthError(false);
      triggerToast(isAr ? 'تم تسجيل الدخول بنجاح إلى لوحة الإدارة' : 'Logged into Admin Dashboard');
    } else {
      setAuthError(true);
    }
  };

  const handlePriceQuickUpdate = (dish: MenuItem, newEgp: number) => {
    const updated: MenuItem = {
      ...dish,
      priceEGP: newEgp,
      priceUSD: Math.round(newEgp / 48) || 1,
    };
    onUpdateDish(updated);
    triggerToast(isAr ? `تم تحديث سعر: ${dish.nameAr}` : `Updated price for ${dish.nameEn}`);
  };

  const handleSaveNewDish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formNameAr.trim()) return;

    const newDish: MenuItem = {
      id: 'dish-' + Date.now(),
      category: formCategory,
      nameAr: formNameAr,
      nameEn: formNameEn || formNameAr,
      descAr: formDescAr || 'طبق فاخر ومميز محضر بعناية في قصر السلطان.',
      descEn: formDescEn || 'Artisanal culinary delicacy prepared at Sultan’s Palate.',
      priceEGP: Number(formPriceEGP),
      priceUSD: Number(formPriceUSD) || Math.round(Number(formPriceEGP) / 48),
      image: formImageUrl || RESTAURANT_IMAGES.wagyuRibeye,
      tagsAr: ['إضافة حديثة', 'خاص بالقصر'],
      tagsEn: ['New Signature', 'Chef Pick'],
      isChefSignature: false,
    };

    onAddDish(newDish);
    setIsAddingNew(false);
    setFormNameAr('');
    setFormNameEn('');
    setFormDescAr('');
    setFormDescEn('');
    setFormPriceEGP(450);
    setFormPriceUSD(10);
    triggerToast(isAr ? 'تمت إضافة الطبق بنجاح وتحديث الموقع فوراً!' : 'Dish added successfully!');
  };

  const handleSaveWhatsapp = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = tempWhatsapp.replace(/[^0-9]/g, '');
    if (clean.length >= 8) {
      onUpdateWhatsappNumber(clean);
      triggerToast(isAr ? 'تم حفظ وتحديث رقم الواتساب' : 'WhatsApp number updated');
    }
  };

  const themeOptions = [
    {
      id: 'gold',
      nameAr: 'الذهبي الملكي الفاخر (الأصلي)',
      nameEn: 'Royal Metallic Gold (Original)',
      primary: '#d4af37',
      light: '#f3e5ab',
      badge: 'Royal Classic',
    },
    {
      id: 'pink',
      nameAr: 'الوردي المخملي العصري (Velvet Pink)',
      nameEn: 'Modern Velvet Pink',
      primary: '#ff6b81',
      light: '#ff9ff3',
      badge: 'Velvet Rose',
    },
    {
      id: 'emerald',
      nameAr: 'الأخضر الزمردي الفخم (Imperial Emerald)',
      nameEn: 'Imperial Emerald Green',
      primary: '#2ed573',
      light: '#7bed9f',
      badge: 'Imperial Jade',
    },
    {
      id: 'blue',
      nameAr: 'الأزرق الملكي الفاخر (Sapphire Blue)',
      nameEn: 'Royal Sapphire Blue',
      primary: '#4bcffa',
      light: '#70a1ff',
      badge: 'Crown Sapphire',
    },
    {
      id: 'ruby',
      nameAr: 'الياقوتي القرمزي (Royal Ruby Red)',
      nameEn: 'Royal Ruby Crimson',
      primary: '#ff4757',
      light: '#ff6b81',
      badge: 'Royal Ruby',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto">
      <div
        className="w-full max-w-3xl bg-[#121212] border border-[#d4af37]/60 rounded-2xl shadow-[0_10px_50px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col max-h-[90vh]"
        dir={isAr ? 'rtl' : 'ltr'}
      >
        {/* Top Header */}
        <div className="p-5 border-b border-[#262626] bg-[#161616] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center text-[#d4af37]">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-serif-luxury">
                {isAr ? 'غرفة الإدارة والتحكم الشامل' : 'Palace Executive Admin Portal'}
              </h3>
              <p className="text-xs text-neutral-400">
                {isAr ? 'التحكم في الثيم وألوان الموقع، قائمة الطعام، والأسعار' : 'Control site theme colors, menu items, and prices'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-neutral-700 hover:border-[#d4af37] text-neutral-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toast Notification */}
        {successToast && (
          <div className="bg-emerald-950/90 border-b border-emerald-500/50 px-4 py-2.5 text-xs text-emerald-200 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successToast}</span>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {!isAuthenticated ? (
            /* Login Gate */
            <div className="max-w-md mx-auto py-8 text-center space-y-6">
              <div className="w-14 h-14 rounded-full bg-[#1e1b12] border border-[#d4af37] flex items-center justify-center mx-auto text-[#d4af37]">
                <Key className="w-7 h-7" />
              </div>

              <div>
                <h4 className="text-xl font-bold text-white font-serif-luxury">
                  {isAr ? 'تسجيل دخول الإدارة' : 'Manager Authentication'}
                </h4>
                <p className="text-xs text-neutral-400 mt-1">
                  {isAr
                    ? 'أدخل كلمة المرور الخاصة برقمك (01112629005)'
                    : 'Enter the owner access code (Phone number: 01112629005)'}
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <input
                    type="password"
                    placeholder={isAr ? 'كلمة المرور (01112629005)' : 'Password'}
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      setAuthError(false);
                    }}
                    className="w-full bg-[#1c1c1c] border border-neutral-700 focus:border-[#d4af37] rounded-lg p-3 text-sm text-center text-white placeholder-neutral-500 focus:outline-none font-mono"
                    autoFocus
                  />
                  {authError && (
                    <p className="text-xs text-red-400 mt-2 flex items-center justify-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{isAr ? 'كلمة المرور غير صحيحة! كلمة المرور هي 01112629005' : 'Invalid passcode! Code is 01112629005'}</span>
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-lg text-xs font-semibold uppercase tracking-wider text-black bg-gradient-to-r from-[#d4af37] via-[#f7e7a9] to-[#bf953f] hover:brightness-110 transition-all cursor-pointer shadow-md"
                >
                  {isAr ? 'دخول لوحة التحكم' : 'Authenticate & Enter'}
                </button>
              </form>
            </div>
          ) : (
            /* Authenticated Admin Dashboard */
            <div className="space-y-6">
              {/* Tab Navigation */}
              <div className="flex items-center gap-2 border-b border-neutral-800 pb-3">
                <button
                  onClick={() => setActiveTab('theme')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'theme'
                      ? 'bg-[#d4af37] text-black shadow-md'
                      : 'bg-[#181818] text-neutral-400 hover:text-white'
                  }`}
                >
                  <Palette className="w-3.5 h-3.5" />
                  <span>{isAr ? 'ألوان وثيم الموقع' : 'Color Themes'}</span>
                </button>

                <button
                  onClick={() => setActiveTab('menu')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'menu'
                      ? 'bg-[#d4af37] text-black shadow-md'
                      : 'bg-[#181818] text-neutral-400 hover:text-white'
                  }`}
                >
                  <Utensils className="w-3.5 h-3.5" />
                  <span>{isAr ? 'إدارة قائمة الطعام' : 'Menu Management'}</span>
                </button>

                <button
                  onClick={() => setActiveTab('whatsapp')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'whatsapp'
                      ? 'bg-[#d4af37] text-black shadow-md'
                      : 'bg-[#181818] text-neutral-400 hover:text-white'
                  }`}
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{isAr ? 'رقم الواتساب' : 'WhatsApp Contact'}</span>
                </button>
              </div>

              {/* TAB 1: Live Color Theme Customizer */}
              {activeTab === 'theme' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-[#181818] border border-neutral-800">
                    <h5 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#d4af37]" />
                      <span>{isAr ? 'التحكم الفوري في ألوان وهوية الموقع' : 'Instant Theme Customizer'}</span>
                    </h5>
                    <p className="text-xs text-neutral-400">
                      {isAr
                        ? 'اختر الثيم المفضل؛ تتغير ألوان الأزرار والتدرجات والحدود الذهبية في الموقع فوراً أمام عينيك!'
                        : 'Select your preferred luxury palette. Buttons, accents, and glows transform instantly!'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {themeOptions.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          onChangeTheme(opt.id as ThemeColor);
                          triggerToast(isAr ? `تم تطبيق ثيم: ${opt.nameAr}` : `Applied theme: ${opt.nameEn}`);
                        }}
                        className={`p-4 rounded-xl border text-left rtl:text-right flex items-center justify-between gap-3 transition-all cursor-pointer ${
                          activeTheme === opt.id
                            ? 'bg-[#1f1a10] border-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.25)]'
                            : 'bg-[#181818] border-neutral-800 hover:border-neutral-700'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className="w-7 h-7 rounded-full shadow-md flex items-center justify-center border border-white/20"
                            style={{ backgroundColor: opt.primary }}
                          >
                            {activeTheme === opt.id && <Check className="w-4 h-4 text-black stroke-[3]" />}
                          </span>
                          <div>
                            <span className="text-xs font-bold text-white block">
                              {isAr ? opt.nameAr : opt.nameEn}
                            </span>
                            <span className="text-[10px] text-neutral-400 block mt-0.5">
                              {opt.badge}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: opt.primary }} />
                          <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: opt.light }} />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: Menu Items & Price Editor */}
              {activeTab === 'menu' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-[#181818] border border-neutral-800">
                    <div>
                      <span className="text-xs text-neutral-400 uppercase tracking-wider">
                        {isAr ? 'الأطباق المعروضة' : 'Published Dishes'}
                      </span>
                      <h4 className="text-sm font-bold text-white mt-0.5">
                        {menuItems.length} {isAr ? 'طبقاً منشوراً حالياً' : 'Dishes currently published'}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsAddingNew(!isAddingNew)}
                        className="py-2 px-3 rounded-lg text-xs font-semibold text-black bg-[#d4af37] hover:bg-[#c29e2f] transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>{isAddingNew ? (isAr ? 'إلغاء' : 'Cancel') : (isAr ? 'إضافة طبق جديد' : 'Add Dish')}</span>
                      </button>

                      <button
                        onClick={() => {
                          onResetMenu();
                          triggerToast(isAr ? 'تم استرجاع القائمة الأصلية' : 'Default menu restored');
                        }}
                        className="p-2 rounded-lg border border-neutral-700 hover:border-neutral-500 text-neutral-400 hover:text-white transition-all cursor-pointer text-xs flex items-center gap-1"
                        title={isAr ? 'استعادة الأطباق الافتراضية' : 'Restore Default Menu'}
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span className="hidden md:inline">{isAr ? 'استعادة' : 'Reset'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Add Dish Form */}
                  {isAddingNew && (
                    <form
                      onSubmit={handleSaveNewDish}
                      className="p-5 rounded-xl bg-[#171717] border border-[#d4af37]/50 space-y-4"
                    >
                      <h5 className="text-sm font-bold text-[#f3e5ab] flex items-center gap-2 border-b border-neutral-800 pb-2">
                        <Plus className="w-4 h-4 text-[#d4af37]" />
                        <span>{isAr ? 'إضافة طبق ملكي جديد' : 'Add New Dish'}</span>
                      </h5>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-neutral-300 font-semibold mb-1">
                            {isAr ? 'اسم الطبق بالعربية' : 'Dish Name (Arabic)'} *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder={isAr ? 'مثال: ريش ضأن مشوية' : 'Grilled Lamb'}
                            value={formNameAr}
                            onChange={(e) => setFormNameAr(e.target.value)}
                            className="w-full bg-[#1f1f1f] border border-neutral-700 rounded-lg p-2.5 text-xs text-white focus:border-[#d4af37] focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs text-neutral-300 font-semibold mb-1">
                            {isAr ? 'اسم الطبق بالإنجليزية (اختياري)' : 'Dish Name (English)'}
                          </label>
                          <input
                            type="text"
                            placeholder="Grilled Lamb Chops"
                            value={formNameEn}
                            onChange={(e) => setFormNameEn(e.target.value)}
                            className="w-full bg-[#1f1f1f] border border-neutral-700 rounded-lg p-2.5 text-xs text-white focus:border-[#d4af37] focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs text-neutral-300 font-semibold mb-1">
                            {isAr ? 'القسم' : 'Category'}
                          </label>
                          <select
                            value={formCategory}
                            onChange={(e) => setFormCategory(e.target.value as MenuCategory)}
                            className="w-full bg-[#1f1f1f] border border-neutral-700 rounded-lg p-2.5 text-xs text-white focus:border-[#d4af37] focus:outline-none"
                          >
                            <option value="mains">{isAr ? 'الأطباق الرئيسية والستيك' : 'Main Courses & Steaks'}</option>
                            <option value="appetizers">{isAr ? 'المقبلات والمزات' : 'Appetizers & Mezzes'}</option>
                            <option value="desserts">{isAr ? 'الحلويات الفاخرة' : 'Luxury Desserts'}</option>
                            <option value="beverages">{isAr ? 'المشروبات والإكسير' : 'Beverages & Elixirs'}</option>
                          </select>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-xs text-neutral-300 font-semibold mb-1">
                              {isAr ? 'السعر (ج.م)' : 'Price (EGP)'} *
                            </label>
                            <input
                              type="number"
                              required
                              value={formPriceEGP}
                              onChange={(e) => {
                                const val = Number(e.target.value);
                                setFormPriceEGP(val);
                                setFormPriceUSD(Math.round(val / 48) || 1);
                              }}
                              className="w-full bg-[#1f1f1f] border border-neutral-700 rounded-lg p-2.5 text-xs text-white focus:border-[#d4af37] focus:outline-none font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-neutral-300 font-semibold mb-1">
                              {isAr ? 'السعر ($ USD)' : 'Price (USD)'}
                            </label>
                            <input
                              type="number"
                              value={formPriceUSD}
                              onChange={(e) => setFormPriceUSD(Number(e.target.value))}
                              className="w-full bg-[#1f1f1f] border border-neutral-700 rounded-lg p-2.5 text-xs text-white focus:border-[#d4af37] focus:outline-none font-mono"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs text-neutral-300 font-semibold mb-1">
                          {isAr ? 'وصف الطبق' : 'Description'}
                        </label>
                        <textarea
                          rows={2}
                          value={formDescAr}
                          onChange={(e) => setFormDescAr(e.target.value)}
                          placeholder={isAr ? 'وصف المكونات والنكهات...' : 'Dish ingredients and description...'}
                          className="w-full bg-[#1f1f1f] border border-neutral-700 rounded-lg p-2 text-xs text-white focus:border-[#d4af37] focus:outline-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 rounded-lg text-xs font-semibold uppercase text-black bg-[#d4af37] hover:bg-[#c29e2f] transition-all cursor-pointer shadow-md"
                      >
                        {isAr ? 'حفظ ونشر الطبق في الموقع' : 'Save & Publish Dish'}
                      </button>
                    </form>
                  )}

                  {/* Dishes List & Price Quick Edit */}
                  <div className="space-y-2">
                    {menuItems.map((dish) => (
                      <div
                        key={dish.id}
                        className="p-3 rounded-lg bg-[#181818] border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={dish.image}
                            alt={dish.nameAr}
                            referrerPolicy="no-referrer"
                            className="w-12 h-12 rounded-lg object-cover border border-[#d4af37]/30 shrink-0"
                          />
                          <div className="min-w-0">
                            <h6 className="text-xs font-bold text-white truncate">
                              {isAr ? dish.nameAr : dish.nameEn}
                            </h6>
                            <span className="text-[11px] text-neutral-400 block truncate">
                              {dish.category === 'mains'
                                ? (isAr ? 'أطباق رئيسية' : 'Mains')
                                : dish.category === 'appetizers'
                                ? (isAr ? 'مقبلات' : 'Appetizers')
                                : dish.category === 'desserts'
                                ? (isAr ? 'حلويات' : 'Desserts')
                                : (isAr ? 'مشروبات' : 'Beverages')}
                            </span>
                          </div>
                        </div>

                        {/* Inline price update */}
                        <div className="flex items-center gap-3 shrink-0">
                          <div className="flex items-center gap-1.5 bg-[#121212] px-2.5 py-1 rounded border border-neutral-700">
                            <span className="text-[11px] text-neutral-400">{isAr ? 'السعر:' : 'Price:'}</span>
                            <input
                              type="number"
                              defaultValue={dish.priceEGP}
                              onBlur={(e) => {
                                const newPrice = Number(e.target.value);
                                if (newPrice > 0 && newPrice !== dish.priceEGP) {
                                  handlePriceQuickUpdate(dish, newPrice);
                                }
                              }}
                              className="w-20 bg-transparent text-xs text-[#d4af37] font-bold font-mono focus:outline-none"
                            />
                            <span className="text-[11px] text-neutral-500">ج.م</span>
                          </div>

                          <button
                            onClick={() => {
                              onDeleteDish(dish.id);
                              triggerToast(isAr ? `تم حذف: ${dish.nameAr}` : `Deleted: ${dish.nameEn}`);
                            }}
                            className="p-1.5 text-neutral-500 hover:text-red-400 rounded transition-colors cursor-pointer"
                            title={isAr ? 'حذف' : 'Delete'}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: WhatsApp Number */}
              {activeTab === 'whatsapp' && (
                <form onSubmit={handleSaveWhatsapp} className="space-y-4 max-w-md">
                  <div className="p-4 rounded-xl bg-[#181818] border border-neutral-800">
                    <h5 className="text-sm font-bold text-white mb-1">
                      {isAr ? 'تحديث رقم استقبال الطلبات والحجوزات' : 'Update WhatsApp Booking Number'}
                    </h5>
                    <p className="text-xs text-neutral-400">
                      {isAr
                        ? 'رقمك الحالي المسجل هو 01112629005 (بكود مصر: 201112629005)'
                        : 'Current registered number is 01112629005 (Egypt: 201112629005)'}
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-300 font-semibold mb-1">
                      {isAr ? 'رقم الواتساب مع كود الدولة' : 'WhatsApp with Country Code'}
                    </label>
                    <input
                      type="text"
                      value={tempWhatsapp}
                      onChange={(e) => setTempWhatsapp(e.target.value)}
                      placeholder="201112629005"
                      className="w-full bg-[#1e1e1e] border border-neutral-700 rounded-lg p-3 text-sm text-white font-mono focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="py-2.5 px-6 rounded-lg text-xs font-semibold uppercase text-black bg-[#d4af37] hover:bg-[#c29e2f] transition-all cursor-pointer"
                  >
                    {isAr ? 'حفظ الرقم الجديد' : 'Save Phone Number'}
                  </button>
                </form>
              )}

              {/* Logout Button */}
              <div className="pt-4 border-t border-neutral-800 flex justify-end">
                <button
                  onClick={() => setIsAuthenticated(false)}
                  className="text-xs text-neutral-500 hover:text-neutral-300 cursor-pointer"
                >
                  {isAr ? 'قفل لوحة الإدارة' : 'Lock Admin Portal'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
