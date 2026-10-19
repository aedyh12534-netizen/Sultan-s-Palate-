export type Language = 'en' | 'ar';
export type Currency = 'USD' | 'EGP';
export type ThemeColor = 'gold' | 'pink' | 'emerald' | 'blue' | 'ruby';

export type MenuCategory = 
  | 'all'
  | 'appetizers'
  | 'mains'
  | 'desserts'
  | 'beverages'
  | 'steaks'
  | 'ottoman_feasts'
  | 'seafood'
  | 'elixirs';

export interface MenuItem {
  id: string;
  category: MenuCategory;
  nameEn: string;
  nameAr: string;
  descEn: string;
  descAr: string;
  priceUSD: number;
  priceEGP: number;
  image: string;
  isChefSignature?: boolean;
  isGoldLeaf?: boolean;
  calories?: number;
  prepTime?: string;
  tagsEn: string[];
  tagsAr: string[];
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  notes?: string;
}

export interface ReservationData {
  guestName: string;
  guestPhone: string;
  date: string;
  time: string;
  guestsCount: number;
  seatingArea: 'royal_hall' | 'sultan_suite' | 'skyline_terrace' | 'hearth_table';
  specialRequests?: string;
}

export interface TestimonialItem {
  id: string;
  nameEn: string;
  nameAr: string;
  roleEn: string;
  roleAr: string;
  cityEn: string;
  cityAr: string;
  countryEn: string;
  countryAr: string;
  quoteEn: string;
  quoteAr: string;
  rating: number;
  date: string;
}
