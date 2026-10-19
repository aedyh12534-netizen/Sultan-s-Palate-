import { MenuItem, TestimonialItem } from '../types';

export const DEFAULT_WHATSAPP_NUMBER = '201112629005'; // Egypt: 01112629005

export const RESTAURANT_IMAGES = {
  hero: '/src/assets/images/hero_sultans_palate_dining_1792427289922.jpg',
  tomahawk: '/src/assets/images/dish_tomahawk_gold_steak_1792427290302.jpg',
  kebab: '/src/assets/images/dish_ottoman_royal_kebab_1792427291161.jpg',
  baklava: '/src/assets/images/dish_luxury_baklava_pistachio_1792427290958.jpg',
  // Verified high quality secondary culinary photography
  mezzePlatter: 'https://images.unsplash.com/photo-1543353071-873f17a7a088?q=80&w=800&auto=format&fit=crop',
  wagyuRibeye: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
  lobsterTail: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop',
  cocktailGold: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800&auto=format&fit=crop',
  kunafaRoyal: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?q=80&w=800&auto=format&fit=crop',
  rackOfLamb: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
};

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'gold-tomahawk',
    category: 'mains',
    nameEn: '24K Edible Gold Imperial Tomahawk',
    nameAr: 'توماهوك السلطان المغلف بالذهب عيار 24',
    descEn: '45-day dry-aged USDA Prime Black Angus tomahawk, flame-kissed on oak ember hearth, cloaked in certified 24-karat edible gold leaves. Served with truffle bone marrow jus and smoked Maldon salt.',
    descAr: 'قطعة توماهوك بلاك أنجوس أمريكي معتقة لمدة 45 يوماً ومطهوة على جمر البلوط، مكسوة بورق الذهب الخالص عيار 24 الصالح للأكل. تقدم مع صوص نخاع العظم بالكمأة وملح مالدون المدخن.',
    priceUSD: 185,
    priceEGP: 8900,
    image: RESTAURANT_IMAGES.tomahawk,
    isChefSignature: true,
    isGoldLeaf: true,
    calories: 1420,
    prepTime: '25-30 min',
    tagsEn: ['Chef Signature', '24K Gold', 'Dry-Aged Prime', 'Halal Certified'],
    tagsAr: ['توقيع الشيف', 'ذهب 24 قيراط', 'معتق 45 يوماً', 'حلال معتمد']
  },
  {
    id: 'ottoman-royal-kebab',
    category: 'mains',
    nameEn: 'The Sultan’s Grand Imperial Banquet Platter',
    nameAr: 'وليمة السلطان الملكية الكبرى للمشاوي',
    descEn: 'A majestic feast featuring wood-grilled milk-fed lamb shanks, pistachio-crusted Urfa kebabs, saffron quail, sumac glazed charred vegetables, ruby pomegranate pearls, and fresh tandoori lavash.',
    descAr: 'صينية المشاوي الملكية العثمانية الفاخرة: موزة غنم رضيع طرية، كباب بالفستق العنتابي، سمان بالزعفران، خضار مشوية بالسماق، حبوب الرمان وخبز اللافاش الساخن.',
    priceUSD: 95,
    priceEGP: 4600,
    image: RESTAURANT_IMAGES.kebab,
    isChefSignature: true,
    calories: 1250,
    prepTime: '20-25 min',
    tagsEn: ['Traditional Ottoman', 'Antep Pistachio', 'Wood-Fired', 'For 2-3 Guests'],
    tagsAr: ['تراث عثماني', 'فستق عنتابي', 'على الفحم', 'تكفي 2-3 أفراد']
  },
  {
    id: 'wagyu-a5-strip',
    category: 'mains',
    nameEn: 'Miyazaki Japanese Wagyu A5 Striploin',
    nameAr: 'ستيك واغيو مايازاكي الياباني A5 الفاخر',
    descEn: 'Grade A5 Japanese Wagyu seared on hot volcanic salt rock, infused with smoked garlic butter and accompanied by roasted wild morel mushrooms.',
    descAr: 'أرقى قطع لحم الواغيو الياباني درجة A5 المشوية على حجر بركاني ملحي ساخن، متبلة بزبدة الثوم المدخن وفطر الموريل البري المحمص.',
    priceUSD: 160,
    priceEGP: 7700,
    image: RESTAURANT_IMAGES.wagyuRibeye,
    isChefSignature: true,
    calories: 890,
    prepTime: '15-20 min',
    tagsEn: ['Japanese A5 Wagyu', 'Volcanic Salt Sear', 'Ultimate Marble Score'],
    tagsAr: ['واغيو A5 أصلي', 'حجر بركاني', 'أعلى درجات الترخيم']
  },
  {
    id: 'royal-mezze-assortment',
    category: 'appetizers',
    nameEn: 'Sultan’s Imperial Mezze Symphony',
    nameAr: 'سيمفونية المزات السلطانية الفاخرة',
    descEn: 'Silky truffle hummus with roasted pine nuts, smoked mutabbal with pomegranate molasses, Ottoman muhammara with crushed walnuts, and crispy lamb kibbeh with mint labneh.',
    descAr: 'حمص ناعم بزيت الكمأة والصنوبر المحمص، متبل الباذنجان المدخن بدبس الرمان، محمرة حلبية بالجوز المقرمش، وكبة لحم ضأن ملكية مع لبنة بالنعناع.',
    priceUSD: 42,
    priceEGP: 2050,
    image: RESTAURANT_IMAGES.mezzePlatter,
    calories: 620,
    prepTime: '10-15 min',
    tagsEn: ['Artisanal Mezzes', 'Truffle & Pine Nuts', 'Vegetarian Available'],
    tagsAr: ['مزات فاخرة', 'كمأة وصنوبر', 'خيارات نباتية']
  },
  {
    id: 'mediterranean-royal-lobster',
    category: 'mains',
    nameEn: 'Charred Mediterranean Lobster Tail with Saffron Butter',
    nameAr: 'ذيل استاكوزا البحر المتوسط بصلصة الزبدة والزعفران',
    descEn: 'Wild-caught Mediterranean giant lobster tail, butterflied and grilled over charcoal embers, brushed with Persian saffron garlic emulsion and fresh dill oil.',
    descAr: 'ذيل استاكوزا بحري عملاق مشوي على الجمر الهادئ، مغمور بمستحلب زبدة الزعفران الإيراني والثوم المعتق مع قطرات زيت الشبت العطري.',
    priceUSD: 110,
    priceEGP: 5300,
    image: RESTAURANT_IMAGES.lobsterTail,
    calories: 540,
    prepTime: '18-22 min',
    tagsEn: ['Wild Mediterranean', 'Persian Saffron', 'Charcoal Kissed'],
    tagsAr: ['صيد بحري طازج', 'زعفران أصيل', 'مشوي على الفحم']
  },
  {
    id: 'luxury-baklava-dondurma',
    category: 'desserts',
    nameEn: '24K Gold Antep Pistachio Baklava with Maraş Ice Cream',
    nameAr: 'بقلاوة الفستق العنتابي بالذهب مع آيس كريم مرعش',
    descEn: '40 paper-thin layers of hand-rolled phyllo pastry stuffed with bright green Gaziantep pistachios, drizzled with acacia blossom syrup and finished with authentic mastic Maraş dondurma.',
    descAr: 'أربعون طبقة من رقائق الجلاش الهشة المصنوعة يدوياً والمحشوة بفستق عنتاب الأخضر الطازج، مسقية بشهد الأكاسيا ومقدمة مع آيس كريم مرعش التركي المطاطي المميز ورذاذ الذهب.',
    priceUSD: 36,
    priceEGP: 1750,
    image: RESTAURANT_IMAGES.baklava,
    isChefSignature: true,
    isGoldLeaf: true,
    calories: 580,
    prepTime: '10 min',
    tagsEn: ['Gaziantep Pistachios', 'Maraş Dondurma', '24K Gold Flakes'],
    tagsAr: ['فستق غازي عنتاب', 'آيس كريم مرعش', 'رقائق ذهب 24']
  },
  {
    id: 'golden-kunafa-ashta',
    category: 'desserts',
    nameEn: 'Imperial Smoked Kunafa with Clotted Ashta & Rose Blossom',
    nameAr: 'كنافة القصر المدخنة بالقشطة البلدية وماء الورد',
    descEn: 'Crispy spun kadayif pastry filled with rich clotted buffalo cream, baked till amber gold, kissed with Damascus rose water syrup and crushed pistachios.',
    descAr: 'شعيرية الكنافة المقرمشة المخبوزة حتى اللون الذهبي المتألق، محشوة بقشطة طازجة غنية، ومغمورة بقطر ماء الورد الجوري الدمشقي والفستق الحلبي الفاخر.',
    priceUSD: 30,
    priceEGP: 1450,
    image: RESTAURANT_IMAGES.kunafaRoyal,
    calories: 640,
    prepTime: '12 min',
    tagsEn: ['Fresh Buffalo Ashta', 'Damascus Rose', 'Warm Imperial Dessert'],
    tagsAr: ['قشطة طازجة', 'ماء ورد دمشقي', 'حلوى دافئة فاخرة']
  },
  {
    id: 'sultan-gold-elixir',
    category: 'beverages',
    nameEn: 'The Sultan’s 24K Gold Spark Mocktail',
    nameAr: 'إكسير السلطان المذهب الفوار المنعش',
    descEn: 'A regal blend of sparkling white grape nectar, cold-pressed Sicilian blood orange, wild mountain honey, aromatic saffron essence, and suspended 24K edible gold shimmer.',
    descAr: 'مزيج ملكي من عصير العنب الأبيض الفوار، وبرتقال صقلية الأحمر المعصور على البارد، وعسل الجبال البري مع قطرات الزعفران وبريق الذهب الصالح للشرب.',
    priceUSD: 24,
    priceEGP: 1150,
    image: RESTAURANT_IMAGES.cocktailGold,
    calories: 140,
    prepTime: '5 min',
    tagsEn: ['Zero Alcohol', '24K Gold Shimmer', 'Artisanal Mocktail'],
    tagsAr: ['بدون كحول', 'بريق ذهبي فاخر', 'موكتيل حرفي']
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'rev-1',
    nameEn: 'Alexander Vance',
    nameAr: 'ألكسندر فانس',
    roleEn: 'Fine Dining Critic, NYC Epicurean Guild',
    roleAr: 'ناقد طعام راقي - نقابة نيويورك للمطاعم',
    cityEn: 'Manhattan, New York',
    cityAr: 'مانهاتن، نيويورك',
    countryEn: 'USA',
    countryAr: 'الولايات المتحدة',
    quoteEn: 'Sultan’s Palate effortlessly sets a brand new global benchmark. The 24K Gold Tomahawk combined with Ottoman open-hearth grilling surpasses anything I have experienced on Park Avenue or Istanbul’s Bosphorus.',
    quoteAr: 'قصر السلطان يضع معياراً عالمياً جديداً للفخامة والطهي. ستيك التوماهوك المغلف بالذهب عيار 24 مع نكهة الشواء العثماني فاق كل توقعاتي مقارنة بأفخم مطاعم مانهاتن والبسفور.',
    rating: 5,
    date: 'March 2026'
  },
  {
    id: 'rev-2',
    nameEn: 'Lady Leyla Demir',
    nameAr: 'السيدة ليلى ديمير',
    roleEn: 'Gastronomy Ambassador & Food Historian',
    roleAr: 'سفيرة فنون الطهي ومؤرخة مطاعم',
    cityEn: 'Istanbul',
    cityAr: 'إسطنبول',
    countryEn: 'Turkey',
    countryAr: 'تركيا',
    quoteEn: 'The authenticity of their Antep spices and the respect shown to royal Ottoman palace recipes, combined with modern American steakhouse mastery, makes this an unforgettable culinary coronation.',
    quoteAr: 'أصالة توابل عنتاب والاحترام الشديد لوصفات السلاطين التاريخية ممزوجة ببراعة الستيك هاوس الأمريكية المعاصرة تجعل تناول الطعام هنا تتويجاً حقيقياً للذوق الرفيع.',
    rating: 5,
    date: 'February 2026'
  },
  {
    id: 'rev-3',
    nameEn: 'Eng. Karim El-Masry',
    nameAr: 'م. كريم المصري',
    roleEn: 'Managing Director, Horizon Luxury Investments',
    roleAr: 'رئيس مجلس إدارة - استثمارات الأفق الفاخرة',
    cityEn: 'Alexandria',
    cityAr: 'الإسكندرية',
    countryEn: 'Egypt',
    countryAr: 'مصر',
    quoteEn: 'Having hosted dignitaries and VIP business delegations across the world, Sultan’s Palate provides unmatched regal privacy, flawless service, and an ambiance steeped in gold and marble elegance.',
    quoteAr: 'كثير الاستضافة للوفود ورجال الأعمال في أفخم بقاع العالم؛ قصر السلطان يقدم خصوصية ملكية لا تضاهى، وخدمة استثنائية، وأجواء تتنفس الرخام والذهب الخالص.',
    rating: 5,
    date: 'April 2026'
  }
];

export const RESTAURANT_LOCATIONS = [
  {
    cityEn: 'Istanbul, Turkey',
    cityAr: 'إسطنبول، تركيا',
    addressEn: 'Çırağan Bosphorus Palace Suite No. 14, Beşiktaş',
    addressAr: 'جناح قصر شيراغان على البسفور رقم 14، بشكتاش',
    hoursEn: 'Daily: 1:00 PM – 1:30 AM',
    hoursAr: 'يومياً: 1:00 ظهراً – 1:30 صباحاً',
    phone: '+90 212 555 0199'
  },
  {
    cityEn: 'Manhattan, New York',
    cityAr: 'مانهاتن، نيويورك',
    addressEn: '782 5th Avenue, Crown Jewel Level, New York, NY',
    addressAr: '782 الجادة الخامسة، طابق النخبة، نيويورك',
    hoursEn: 'Tue – Sun: 4:30 PM – 12:00 AM',
    hoursAr: 'الثلاثاء – الأحد: 4:30 عصراً – 12:00 منتصف الليل',
    phone: '+1 212 555 8820'
  },
  {
    cityEn: 'Alexandria, Egypt',
    cityAr: 'الإسكندرية، مصر',
    addressEn: 'Gleem Bay Royal Waterfront Promenade, Alexandria',
    addressAr: 'ممشى جليم باي الملكي على الواجهة البحرية، الإسكندرية',
    hoursEn: 'Daily: 2:00 PM – 2:00 AM',
    hoursAr: 'يومياً: 2:00 ظهراً – 2:00 صباحاً',
    phone: '+20 111 262 9005'
  }
];
