import React, { useState, useEffect, useRef } from 'react';
import { Language, Currency, CartItem, MenuItem, ThemeColor } from './types';
import { DEFAULT_WHATSAPP_NUMBER, MENU_ITEMS, TESTIMONIALS } from './data/restaurantData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StorySection } from './components/StorySection';
import { ChefSpotlight } from './components/ChefSpotlight';
import { MenuSection } from './components/MenuSection';
import { ReservationSection } from './components/ReservationSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { LocationsSection } from './components/LocationsSection';
import { WhatsAppDrawer } from './components/WhatsAppDrawer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AdminPanelModal } from './components/AdminPanelModal';
import { Footer } from './components/Footer';

const STORAGE_KEY_MENU = 'sultans_palate_menu_v3';
const STORAGE_KEY_PHONE = 'sultans_palate_phone_v3';
const STORAGE_KEY_THEME = 'sultans_palate_theme_v3';

export default function App() {
  const [language, setLanguage] = useState<Language>('ar');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  // Audio refs & Fallback Synth
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthIntervalRef = useRef<number | null>(null);

  // Active theme state
  const [activeTheme, setActiveTheme] = useState<ThemeColor>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_THEME);
      if (saved) return saved as ThemeColor;
    } catch {}
    return 'gold';
  });

  // Apply Theme CSS Variables
  useEffect(() => {
    const root = document.documentElement;
    if (activeTheme === 'pink') {
      root.style.setProperty('--theme-primary', '#ff6b81');
      root.style.setProperty('--theme-light', '#ff9ff3');
      root.style.setProperty('--theme-dark', '#c44569');
      root.style.setProperty('--theme-glow', 'rgba(255, 107, 129, 0.3)');
    } else if (activeTheme === 'emerald') {
      root.style.setProperty('--theme-primary', '#2ed573');
      root.style.setProperty('--theme-light', '#7bed9f');
      root.style.setProperty('--theme-dark', '#10ac84');
      root.style.setProperty('--theme-glow', 'rgba(46, 213, 115, 0.28)');
    } else if (activeTheme === 'blue') {
      root.style.setProperty('--theme-primary', '#4bcffa');
      root.style.setProperty('--theme-light', '#70a1ff');
      root.style.setProperty('--theme-dark', '#3867d6');
      root.style.setProperty('--theme-glow', 'rgba(75, 207, 250, 0.28)');
    } else if (activeTheme === 'ruby') {
      root.style.setProperty('--theme-primary', '#ff4757');
      root.style.setProperty('--theme-light', '#ff6b81');
      root.style.setProperty('--theme-dark', '#b71540');
      root.style.setProperty('--theme-glow', 'rgba(255, 71, 87, 0.3)');
    } else {
      // Royal Gold
      root.style.setProperty('--theme-primary', '#d4af37');
      root.style.setProperty('--theme-light', '#f3e5ab');
      root.style.setProperty('--theme-dark', '#997a15');
      root.style.setProperty('--theme-glow', 'rgba(212, 175, 55, 0.25)');
    }
    try {
      localStorage.setItem(STORAGE_KEY_THEME, activeTheme);
    } catch {}
  }, [activeTheme]);

  // Dishes state
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_MENU);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return MENU_ITEMS;
  });

  // WhatsApp phone state (tied to 01112629005)
  const [whatsappNumber, setWhatsappNumber] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PHONE);
      if (saved && saved.length >= 8) return saved;
    } catch {}
    return DEFAULT_WHATSAPP_NUMBER;
  });

  const saveMenuItems = (newItems: MenuItem[]) => {
    setMenuItems(newItems);
    try {
      localStorage.setItem(STORAGE_KEY_MENU, JSON.stringify(newItems));
    } catch {}
  };

  const handleUpdateWhatsappNumber = (newNumber: string) => {
    setWhatsappNumber(newNumber);
    try {
      localStorage.setItem(STORAGE_KEY_PHONE, newNumber);
    } catch {}
  };

  // Dish Handlers
  const handleAddDish = (dish: MenuItem) => {
    saveMenuItems([dish, ...menuItems]);
  };

  const handleUpdateDish = (updatedDish: MenuItem) => {
    saveMenuItems(menuItems.map((dish) => (dish.id === updatedDish.id ? updatedDish : dish)));
  };

  const handleDeleteDish = (dishId: string) => {
    saveMenuItems(menuItems.filter((dish) => dish.id !== dishId));
  };

  const handleResetMenu = () => {
    saveMenuItems(MENU_ITEMS);
  };

  // Synchronize document direction and language attribute
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  // Ambient Lounge Synth Fallback
  const startAmbientSynth = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      const pentatonic = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25];
      const playNote = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state !== 'running') return;
        const ctx = audioCtxRef.current;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        const freq = pentatonic[Math.floor(Math.random() * pentatonic.length)];
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const now = ctx.currentTime;
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.06, now + 1.2);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 5.0);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 5.5);
      };

      playNote();
      synthIntervalRef.current = window.setInterval(playNote, 2200);
    } catch {}
  };

  const stopAmbientSynth = () => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
  };

  const handleToggleMusic = () => {
    if (!isPlayingMusic) {
      if (audioRef.current) {
        audioRef.current.volume = 0.35;
        audioRef.current
          .play()
          .then(() => {
            setIsPlayingMusic(true);
          })
          .catch(() => {
            startAmbientSynth();
            setIsPlayingMusic(true);
          });
      } else {
        startAmbientSynth();
        setIsPlayingMusic(true);
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      stopAmbientSynth();
      setIsPlayingMusic(false);
    }
  };

  // Cart operations
  const handleAddToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((ci) => {
          if (ci.item.id === id) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((ci) => ci.item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const scrollToReservation = () => {
    const el = document.getElementById('reservation');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className={`min-h-screen bg-[#080808] text-[#f5f5f5] ${language === 'ar' ? 'font-arabic-royal' : 'font-sans'}`}>
      {/* Hidden Audio Element for Lounge Music */}
      <audio
        ref={audioRef}
        loop
        preload="none"
        src="https://www.bensound.com/bensound-music/bensound-slowmotion.mp3"
        onError={() => startAmbientSynth()}
      />

      {/* Top Navbar with Music Player & Prominent Admin Link */}
      <Navbar
        language={language}
        onLanguageChange={setLanguage}
        currency={currency}
        onCurrencyChange={setCurrency}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={scrollToReservation}
        whatsappNumber={whatsappNumber}
        onOpenAdmin={() => setIsAdminOpen(true)}
        isPlayingMusic={isPlayingMusic}
        onToggleMusic={handleToggleMusic}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Section */}
        <Hero
          language={language}
          onOpenReservation={scrollToReservation}
          whatsappNumber={whatsappNumber}
        />

        {/* 2. About Us / Royal Heritage ("من نحن") */}
        <StorySection language={language} />

        {/* 3. Chef's 24K Gold & Open-Hearth Signatures */}
        <ChefSpotlight
          language={language}
          currency={currency}
          onAddToCart={handleAddToCart}
          whatsappNumber={whatsappNumber}
          items={menuItems}
        />

        {/* 4. Imperial Gourmet Menu with Filters & Currency */}
        <MenuSection
          language={language}
          currency={currency}
          onCurrencyToggle={() => setCurrency(currency === 'USD' ? 'EGP' : 'USD')}
          onAddToCart={handleAddToCart}
          whatsappNumber={whatsappNumber}
          items={menuItems}
        />

        {/* 5. VIP Reservation Module */}
        <ReservationSection
          language={language}
          whatsappNumber={whatsappNumber}
        />

        {/* 6. Critic & Patron Testimonials */}
        <TestimonialsSection
          language={language}
          testimonials={TESTIMONIALS}
        />

        {/* 7. Locations & International Destinations */}
        <LocationsSection language={language} />
      </main>

      {/* Slide-over WhatsApp Order Tray */}
      <WhatsAppDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        language={language}
        currency={currency}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        whatsappNumber={whatsappNumber}
      />

      {/* Floating Animated WhatsApp Button */}
      <FloatingWhatsApp
        language={language}
        whatsappNumber={whatsappNumber}
        onUpdateWhatsappNumber={handleUpdateWhatsappNumber}
      />

      {/* Comprehensive Admin Panel with Live Theme Customizer & Dishes Manager */}
      <AdminPanelModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        language={language}
        menuItems={menuItems}
        onAddDish={handleAddDish}
        onUpdateDish={handleUpdateDish}
        onDeleteDish={handleDeleteDish}
        onResetMenu={handleResetMenu}
        whatsappNumber={whatsappNumber}
        onUpdateWhatsappNumber={handleUpdateWhatsappNumber}
        activeTheme={activeTheme}
        onChangeTheme={setActiveTheme}
      />

      {/* Footer with Admin entrance */}
      <Footer
        language={language}
        whatsappNumber={whatsappNumber}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />
    </div>
  );
}
