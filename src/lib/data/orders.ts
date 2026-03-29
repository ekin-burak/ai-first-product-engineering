import { Order } from "@/types";

export const orders: Order[] = [
  {
    id: "ORD-10234",
    customerName: "Ahmed Al-Rashid",
    customerEmail: "ahmed@example.com",
    items: [
      {
        productId: "PRD-003",
        productName: { en: "Oud Perfume - Royal Collection", ar: "عطر عود - المجموعة الملكية" },
        quantity: 1,
        price: 699,
      },
      {
        productId: "PRD-007",
        productName: { en: "Bakhoor Incense Burner Set", ar: "طقم مبخرة بخور" },
        quantity: 2,
        price: 245,
      },
    ],
    totalAmount: 1189,
    currency: "SAR",
    currentStatus: "shipped",
    statusHistory: [
      { status: "placed", timestamp: "2026-03-25T10:30:00Z" },
      {
        status: "confirmed",
        timestamp: "2026-03-25T11:00:00Z",
        note: { en: "Payment verified via Mada", ar: "تم التحقق من الدفع عبر مدى" },
      },
      { status: "processing", timestamp: "2026-03-26T08:00:00Z" },
      {
        status: "shipped",
        timestamp: "2026-03-27T14:00:00Z",
        note: { en: "Shipped via SMSA Express", ar: "تم الشحن عبر SMSA إكسبرس" },
      },
    ],
    shippingAddress: "Riyadh, Al Olaya District",
    trackingNumber: "SMSA-78234561",
    estimatedDelivery: "2026-03-31",
    createdAt: "2026-03-25T10:30:00Z",
  },
  {
    id: "ORD-10235",
    customerName: "Fatima Hassan",
    customerEmail: "fatima@example.com",
    items: [
      {
        productId: "PRD-006",
        productName: { en: "Women's Abaya - Modern Design", ar: "عباية نسائية - تصميم عصري" },
        quantity: 1,
        price: 520,
      },
    ],
    totalAmount: 520,
    currency: "SAR",
    currentStatus: "delivered",
    statusHistory: [
      { status: "placed", timestamp: "2026-03-20T16:00:00Z" },
      { status: "confirmed", timestamp: "2026-03-20T16:30:00Z" },
      { status: "processing", timestamp: "2026-03-21T09:00:00Z" },
      { status: "shipped", timestamp: "2026-03-22T11:00:00Z" },
      { status: "out_for_delivery", timestamp: "2026-03-23T07:30:00Z" },
      {
        status: "delivered",
        timestamp: "2026-03-23T14:15:00Z",
        note: { en: "Signed by recipient", ar: "تم التوقيع من قبل المستلم" },
      },
    ],
    shippingAddress: "Jeddah, Al Hamra District",
    trackingNumber: "ARAMEX-99871234",
    estimatedDelivery: "2026-03-24",
    createdAt: "2026-03-20T16:00:00Z",
  },
  {
    id: "ORD-10236",
    customerName: "Khalid Mohammed",
    customerEmail: "khalid@example.com",
    items: [
      {
        productId: "PRD-004",
        productName: { en: "Smart Watch Pro X", ar: "ساعة ذكية برو إكس" },
        quantity: 1,
        price: 899,
      },
      {
        productId: "PRD-008",
        productName: {
          en: "Kids Arabic Alphabet Learning Tablet",
          ar: "تابلت تعليم الحروف العربية للأطفال",
        },
        quantity: 1,
        price: 185,
      },
    ],
    totalAmount: 1084,
    currency: "SAR",
    currentStatus: "processing",
    statusHistory: [
      { status: "placed", timestamp: "2026-03-28T20:00:00Z" },
      {
        status: "confirmed",
        timestamp: "2026-03-28T20:15:00Z",
        note: { en: "Payment via Apple Pay", ar: "الدفع عبر Apple Pay" },
      },
      { status: "processing", timestamp: "2026-03-29T08:00:00Z" },
    ],
    shippingAddress: "Dammam, Al Faisaliyah District",
    estimatedDelivery: "2026-04-02",
    createdAt: "2026-03-28T20:00:00Z",
  },
  {
    id: "ORD-10237",
    customerName: "Sara Abdullah",
    customerEmail: "sara@example.com",
    items: [
      {
        productId: "PRD-001",
        productName: { en: "Premium Arabic Coffee Set", ar: "طقم قهوة عربية فاخر" },
        quantity: 1,
        price: 450,
      },
      {
        productId: "PRD-005",
        productName: { en: "Luxury Prayer Rug - Velvet", ar: "سجادة صلاة فاخرة - مخمل" },
        quantity: 2,
        price: 159,
      },
    ],
    totalAmount: 768,
    currency: "SAR",
    currentStatus: "out_for_delivery",
    statusHistory: [
      { status: "placed", timestamp: "2026-03-26T12:00:00Z" },
      { status: "confirmed", timestamp: "2026-03-26T12:20:00Z" },
      { status: "processing", timestamp: "2026-03-27T07:00:00Z" },
      { status: "shipped", timestamp: "2026-03-28T10:00:00Z" },
      {
        status: "out_for_delivery",
        timestamp: "2026-03-30T06:00:00Z",
        note: { en: "With delivery driver", ar: "مع سائق التوصيل" },
      },
    ],
    shippingAddress: "Riyadh, Al Malqa District",
    trackingNumber: "SMSA-78234599",
    estimatedDelivery: "2026-03-30",
    createdAt: "2026-03-26T12:00:00Z",
  },
  {
    id: "ORD-10238",
    customerName: "Omar Al-Farsi",
    customerEmail: "omar@example.com",
    items: [
      {
        productId: "PRD-002",
        productName: { en: "Men's White Thobe - Premium Cotton", ar: "ثوب رجالي أبيض - قطن فاخر" },
        quantity: 3,
        price: 289,
      },
    ],
    totalAmount: 867,
    currency: "SAR",
    currentStatus: "cancelled",
    statusHistory: [
      { status: "placed", timestamp: "2026-03-27T09:00:00Z" },
      { status: "confirmed", timestamp: "2026-03-27T09:30:00Z" },
      {
        status: "cancelled",
        timestamp: "2026-03-27T15:00:00Z",
        note: { en: "Cancelled by customer - wrong size", ar: "ألغي بواسطة العميل - مقاس خاطئ" },
      },
    ],
    shippingAddress: "Mecca, Al Aziziyah District",
    createdAt: "2026-03-27T09:00:00Z",
  },
];

export function getOrderById(id: string): Order | undefined {
  return orders.find((o) => o.id.toLowerCase() === id.toLowerCase());
}

export function getOrdersByEmail(email: string): Order[] {
  return orders.filter((o) => o.customerEmail.toLowerCase() === email.toLowerCase());
}
