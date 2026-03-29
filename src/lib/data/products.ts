import { Product } from "@/types";

export const products: Product[] = [
  {
    id: "PRD-001",
    name: { en: "Premium Arabic Coffee Set", ar: "طقم قهوة عربية فاخر" },
    description: {
      en: "Handcrafted brass dallah with 6 finjan cups. Perfect for traditional Arabic coffee service. Includes serving tray.",
      ar: "دلة نحاسية مصنوعة يدوياً مع 6 فناجين. مثالية لتقديم القهوة العربية التقليدية. تشمل صينية تقديم.",
    },
    price: 450,
    currency: "SAR",
    category: { en: "Home & Kitchen", ar: "المنزل والمطبخ" },
    inStock: true,
    stockCount: 23,
    images: ["/products/coffee-set.jpg"],
    rating: 4.8,
    reviewCount: 156,
  },
  {
    id: "PRD-002",
    name: { en: "Men's White Thobe - Premium Cotton", ar: "ثوب رجالي أبيض - قطن فاخر" },
    description: {
      en: "Premium Egyptian cotton thobe with embroidered collar. Available in sizes S-3XL. Machine washable.",
      ar: "ثوب قطن مصري فاخر بياقة مطرزة. متوفر بمقاسات S-3XL. قابل للغسل في الغسالة.",
    },
    price: 289,
    currency: "SAR",
    category: { en: "Men's Fashion", ar: "أزياء رجالية" },
    inStock: true,
    stockCount: 87,
    images: ["/products/thobe.jpg"],
    rating: 4.6,
    reviewCount: 312,
  },
  {
    id: "PRD-003",
    name: { en: "Oud Perfume - Royal Collection", ar: "عطر عود - المجموعة الملكية" },
    description: {
      en: "Luxurious oud-based fragrance with notes of saffron, rose, and amber. 100ml EDP. Long-lasting 12+ hours.",
      ar: "عطر عود فاخر بنفحات الزعفران والورد والعنبر. 100 مل أو دو بارفان. يدوم أكثر من 12 ساعة.",
    },
    price: 699,
    currency: "SAR",
    category: { en: "Perfumes", ar: "عطور" },
    inStock: true,
    stockCount: 45,
    images: ["/products/oud-perfume.jpg"],
    rating: 4.9,
    reviewCount: 89,
  },
  {
    id: "PRD-004",
    name: { en: "Smart Watch Pro X", ar: "ساعة ذكية برو إكس" },
    description: {
      en: "AMOLED display, heart rate monitor, GPS tracking, water resistant. Compatible with iOS and Android. Arabic interface supported.",
      ar: "شاشة AMOLED، مراقب نبضات القلب، تتبع GPS، مقاومة للماء. متوافقة مع iOS و Android. تدعم الواجهة العربية.",
    },
    price: 899,
    currency: "SAR",
    category: { en: "Electronics", ar: "إلكترونيات" },
    inStock: true,
    stockCount: 12,
    images: ["/products/smartwatch.jpg"],
    rating: 4.5,
    reviewCount: 201,
  },
  {
    id: "PRD-005",
    name: { en: "Luxury Prayer Rug - Velvet", ar: "سجادة صلاة فاخرة - مخمل" },
    description: {
      en: "High-quality velvet prayer rug with compass for Qibla direction. Padded for comfort. Portable with carrying bag.",
      ar: "سجادة صلاة مخملية عالية الجودة مع بوصلة لاتجاه القبلة. مبطنة للراحة. محمولة مع حقيبة حمل.",
    },
    price: 159,
    currency: "SAR",
    category: { en: "Home & Kitchen", ar: "المنزل والمطبخ" },
    inStock: true,
    stockCount: 200,
    images: ["/products/prayer-rug.jpg"],
    rating: 4.7,
    reviewCount: 445,
  },
  {
    id: "PRD-006",
    name: { en: "Women's Abaya - Modern Design", ar: "عباية نسائية - تصميم عصري" },
    description: {
      en: "Elegant black abaya with subtle embroidery and flared sleeves. Premium crepe fabric. Sizes XS-XXL.",
      ar: "عباية سوداء أنيقة بتطريز رقيق وأكمام واسعة. قماش كريب فاخر. مقاسات XS-XXL.",
    },
    price: 520,
    currency: "SAR",
    category: { en: "Women's Fashion", ar: "أزياء نسائية" },
    inStock: false,
    stockCount: 0,
    images: ["/products/abaya.jpg"],
    rating: 4.8,
    reviewCount: 178,
  },
  {
    id: "PRD-007",
    name: { en: "Bakhoor Incense Burner Set", ar: "طقم مبخرة بخور" },
    description: {
      en: "Electric bakhoor burner with 3 premium bakhoor varieties. Ceramic design with gold accents. USB rechargeable.",
      ar: "مبخرة بخور كهربائية مع 3 أنواع بخور فاخرة. تصميم سيراميك بلمسات ذهبية. قابلة للشحن عبر USB.",
    },
    price: 245,
    currency: "SAR",
    category: { en: "Home & Kitchen", ar: "المنزل والمطبخ" },
    inStock: true,
    stockCount: 67,
    images: ["/products/bakhoor.jpg"],
    rating: 4.4,
    reviewCount: 92,
  },
  {
    id: "PRD-008",
    name: { en: "Kids Arabic Alphabet Learning Tablet", ar: "تابلت تعليم الحروف العربية للأطفال" },
    description: {
      en: "Interactive tablet for kids 3-8 years. Teaches Arabic letters, numbers, and Quran recitation basics. Bilingual AR/EN.",
      ar: "تابلت تفاعلي للأطفال من 3-8 سنوات. يعلم الحروف العربية والأرقام وأساسيات تلاوة القرآن. ثنائي اللغة عربي/إنجليزي.",
    },
    price: 185,
    currency: "SAR",
    category: { en: "Kids & Toys", ar: "أطفال وألعاب" },
    inStock: true,
    stockCount: 34,
    images: ["/products/kids-tablet.jpg"],
    rating: 4.6,
    reviewCount: 267,
  },
];

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.en.toLowerCase().includes(q) ||
      p.name.ar.includes(query) ||
      p.description.en.toLowerCase().includes(q) ||
      p.description.ar.includes(query) ||
      p.category.en.toLowerCase().includes(q) ||
      p.category.ar.includes(query) ||
      p.id.toLowerCase() === q
  );
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
