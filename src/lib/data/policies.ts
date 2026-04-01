import { ReturnPolicy, ReturnRequest } from "@/types";

const sharedConditions = [
  { en: "Item must be in original condition, unused, and with all tags and packaging intact", ar: "يجب أن يكون المنتج في حالته الأصلية، غير مستخدم، مع جميع البطاقات والتغليف سليمة" },
  { en: "Return shipping costs are the customer's responsibility, unless the return is due to our error", ar: "تكاليف شحن الإرجاع على حساب العميل، ما لم يكن الإرجاع بسبب خطأ من طرفنا" },
];

const standardRefundMethod = {
  en: "Original payment method within 4 business days of receiving the returned item. Shipping costs are non-refundable.",
  ar: "طريقة الدفع الأصلية خلال 4 أيام عمل من استلام المنتج المُرجع. تكاليف الشحن غير قابلة للاسترداد.",
};

const saleItemException = { en: "Items purchased on sale or with a discount are eligible for store credit or exchange only", ar: "المنتجات المشتراة بتخفيض أو خصم مؤهلة لرصيد المتجر أو الاستبدال فقط" };
const misusedException = { en: "Items damaged due to customer misuse or negligence are not eligible for refunds", ar: "المنتجات التالفة بسبب سوء استخدام العميل أو إهماله غير مؤهلة للاسترداد" };

export const returnPolicies: ReturnPolicy[] = [
  {
    category: "Electronics",
    returnWindowDays: 3,
    conditions: [
      ...sharedConditions,
      { en: "All accessories must be included", ar: "يجب تضمين جميع الملحقات" },
    ],
    refundMethod: standardRefundMethod,
    exceptions: [
      saleItemException,
      misusedException,
      { en: "Opened software or digital products cannot be returned", ar: "لا يمكن إرجاع البرامج أو المنتجات الرقمية المفتوحة" },
    ],
  },
  {
    category: "Fashion",
    returnWindowDays: 3,
    conditions: [
      ...sharedConditions,
      { en: "Tags must still be attached, item must be unworn and unwashed", ar: "يجب أن تكون البطاقات مرفقة، ولم يُلبس أو يُغسل المنتج" },
    ],
    refundMethod: standardRefundMethod,
    exceptions: [
      saleItemException,
      misusedException,
      { en: "Intimate apparel is not eligible for returns", ar: "الملابس الداخلية غير قابلة للإرجاع" },
      { en: "Customized or altered items cannot be returned", ar: "لا يمكن إرجاع المنتجات المخصصة أو المعدلة" },
    ],
  },
  {
    category: "Perfumes",
    returnWindowDays: 3,
    conditions: [
      ...sharedConditions,
      { en: "Perfume must be sealed and unopened", ar: "يجب أن يكون العطر مختوماً وغير مفتوح" },
    ],
    refundMethod: standardRefundMethod,
    exceptions: [
      saleItemException,
      misusedException,
      { en: "Opened or used perfumes cannot be returned for hygiene reasons", ar: "لا يمكن إرجاع العطور المفتوحة أو المستخدمة لأسباب صحية" },
    ],
  },
  {
    category: "Home & Kitchen",
    returnWindowDays: 3,
    conditions: [
      ...sharedConditions,
      { en: "All parts and accessories must be included", ar: "يجب تضمين جميع الأجزاء والملحقات" },
    ],
    refundMethod: standardRefundMethod,
    exceptions: [
      saleItemException,
      misusedException,
      { en: "Perishable goods and opened food-related items cannot be returned", ar: "لا يمكن إرجاع المواد القابلة للتلف والمنتجات الغذائية المفتوحة" },
    ],
  },
  {
    category: "Kids & Toys",
    returnWindowDays: 3,
    conditions: sharedConditions,
    refundMethod: standardRefundMethod,
    exceptions: [
      saleItemException,
      misusedException,
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
