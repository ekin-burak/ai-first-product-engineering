import { ReturnPolicy, ReturnRequest } from "@/types";

export const returnPolicies: ReturnPolicy[] = [
  {
    category: "Electronics",
    returnWindowDays: 14,
    conditions: [
      { en: "Item must be in original packaging", ar: "يجب أن يكون المنتج في عبوته الأصلية" },
      { en: "All accessories must be included", ar: "يجب تضمين جميع الملحقات" },
      { en: "Item must not show signs of use or damage", ar: "يجب ألا يظهر على المنتج علامات استخدام أو تلف" },
    ],
    refundMethod: {
      en: "Original payment method within 5-7 business days",
      ar: "طريقة الدفع الأصلية خلال 5-7 أيام عمل",
    },
    exceptions: [
      { en: "Opened software or digital products cannot be returned", ar: "لا يمكن إرجاع البرامج أو المنتجات الرقمية المفتوحة" },
    ],
  },
  {
    category: "Fashion",
    returnWindowDays: 30,
    conditions: [
      { en: "Tags must still be attached", ar: "يجب أن تكون البطاقات لا تزال مرفقة" },
      { en: "Item must be unworn and unwashed", ar: "يجب ألا يكون المنتج ملبوساً أو مغسولاً" },
      { en: "Item must be in original packaging", ar: "يجب أن يكون المنتج في عبوته الأصلية" },
    ],
    refundMethod: {
      en: "Store credit or original payment method within 5-7 business days",
      ar: "رصيد المتجر أو طريقة الدفع الأصلية خلال 5-7 أيام عمل",
    },
    exceptions: [
      { en: "Undergarments and swimwear are final sale", ar: "الملابس الداخلية وملابس السباحة لا تُرجع" },
      { en: "Customized or altered items cannot be returned", ar: "لا يمكن إرجاع المنتجات المخصصة أو المعدلة" },
    ],
  },
  {
    category: "Perfumes",
    returnWindowDays: 7,
    conditions: [
      { en: "Perfume must be sealed and unopened", ar: "يجب أن يكون العطر مختوماً وغير مفتوح" },
      { en: "Original packaging must be intact", ar: "يجب أن تكون العبوة الأصلية سليمة" },
    ],
    refundMethod: {
      en: "Exchange or store credit only",
      ar: "استبدال أو رصيد متجر فقط",
    },
    exceptions: [
      { en: "Opened or used perfumes cannot be returned for hygiene reasons", ar: "لا يمكن إرجاع العطور المفتوحة أو المستخدمة لأسباب صحية" },
    ],
  },
  {
    category: "Home & Kitchen",
    returnWindowDays: 14,
    conditions: [
      { en: "Item must be in original condition", ar: "يجب أن يكون المنتج في حالته الأصلية" },
      { en: "All parts and accessories must be included", ar: "يجب تضمين جميع الأجزاء والملحقات" },
    ],
    refundMethod: {
      en: "Original payment method within 5-7 business days",
      ar: "طريقة الدفع الأصلية خلال 5-7 أيام عمل",
    },
    exceptions: [
      { en: "Food-related items that have been opened cannot be returned", ar: "لا يمكن إرجاع المنتجات الغذائية المفتوحة" },
    ],
  },
  {
    category: "Kids & Toys",
    returnWindowDays: 14,
    conditions: [
      { en: "Item must be in original packaging", ar: "يجب أن يكون المنتج في عبوته الأصلية" },
      { en: "Item must be unused", ar: "يجب ألا يكون المنتج مستخدماً" },
    ],
    refundMethod: {
      en: "Original payment method or store credit within 5-7 business days",
      ar: "طريقة الدفع الأصلية أو رصيد المتجر خلال 5-7 أيام عمل",
    },
    exceptions: [
      { en: "Personalized items cannot be returned", ar: "لا يمكن إرجاع المنتجات المخصصة" },
    ],
  },
];

const returnRequests: ReturnRequest[] = [];

export function getReturnPolicy(category: string): ReturnPolicy | undefined {
  return returnPolicies.find(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );
}

export function createReturnRequest(
  orderId: string,
  productId: string,
  reason: string
): ReturnRequest {
  const request: ReturnRequest = {
    id: `RET-${Date.now().toString(36).toUpperCase()}`,
    orderId,
    productId,
    reason,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  returnRequests.push(request);
  return request;
}

export function getReturnRequestsByOrder(orderId: string): ReturnRequest[] {
  return returnRequests.filter((r) => r.orderId === orderId);
}
