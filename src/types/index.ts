export interface Product {
  id: string;
  name: { en: string; ar: string };
  description: { en: string; ar: string };
  price: number;
  currency: string;
  category: { en: string; ar: string };
  inStock: boolean;
  stockCount: number;
  images: string[];
  rating: number;
  reviewCount: number;
}

export type OrderStatus =
  | "placed"
  | "confirmed"
  | "processing"
  | "shipped"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export interface OrderStatusEntry {
  status: OrderStatus;
  timestamp: string;
  note?: { en: string; ar: string };
}

export interface OrderItem {
  productId: string;
  productName: { en: string; ar: string };
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  totalAmount: number;
  currency: string;
  statusHistory: OrderStatusEntry[];
  currentStatus: OrderStatus;
  shippingAddress: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
  createdAt: string;
}

export interface ReturnPolicy {
  category: string;
  returnWindowDays: number;
  conditions: { en: string; ar: string }[];
  refundMethod: { en: string; ar: string };
  exceptions: { en: string; ar: string }[];
}

export interface ReturnRequest {
  id: string;
  orderId: string;
  productId: string;
  reason: string;
  status: "pending" | "approved" | "rejected" | "completed";
  createdAt: string;
  refundAmount?: number;
}
