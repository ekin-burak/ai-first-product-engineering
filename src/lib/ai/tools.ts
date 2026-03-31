import { tool } from "ai";
import { z } from "zod";
import { searchProducts, getProductById } from "@/lib/data/products";
import { getOrderById, getOrdersByEmail } from "@/lib/data/orders";
import {
  getReturnPolicy,
  createReturnRequest,
  getReturnRequestsByOrder,
} from "@/lib/data/policies";

export const chatTools = {
  searchProducts: tool({
    description:
      "Search the product catalog by name, category, or keyword. Use this when the customer asks about products, wants recommendations, or asks what is available. Returns matching products with full details including price, availability, and ratings.",
    inputSchema: z.object({
      query: z
        .string()
        .describe("Search query - product name, category, or keyword in English or Arabic"),
    }),
    execute: async ({ query }) => {
      const results = searchProducts(query);
      if (results.length === 0) {
        return {
          found: false as const,
          message: "No products found matching the query.",
          query,
        };
      }
      return {
        found: true as const,
        count: results.length,
        products: results.map((p) => ({
          id: p.id,
          name: p.name,
          description: p.description,
          price: `${p.price} ${p.currency}`,
          category: p.category,
          inStock: p.inStock,
          stockCount: p.stockCount,
          rating: `${p.rating}/5 (${p.reviewCount} reviews)`,
        })),
      };
    },
  }),

  getProductDetails: tool({
    description:
      "Get detailed information about a specific product by its ID (e.g. PRD-001). Use this when the customer asks about a specific product they already know, or when you need full details after a search.",
    inputSchema: z.object({
      productId: z.string().describe("The product ID, e.g. PRD-001"),
    }),
    execute: async ({ productId }) => {
      const product = getProductById(productId.toUpperCase());
      if (!product) {
        return { found: false as const, message: `No product found with ID ${productId}` };
      }
      return {
        found: true as const,
        product: {
          id: product.id,
          name: product.name,
          description: product.description,
          price: `${product.price} ${product.currency}`,
          category: product.category,
          inStock: product.inStock,
          stockCount: product.inStock
            ? `${product.stockCount} units available`
            : "Out of stock",
          rating: `${product.rating}/5 (${product.reviewCount} reviews)`,
        },
      };
    },
  }),

  trackOrder: tool({
    description:
      "Track an order by order ID (e.g. ORD-10234) or customer email. Returns the current status, full status timeline, shipping details, and estimated delivery. Use this when the customer asks about their order status, delivery time, or tracking information.",
    inputSchema: z.object({
      orderId: z
        .string()
        .optional()
        .describe("Order ID, e.g. ORD-10234"),
      email: z
        .string()
        .optional()
        .describe("Customer email to look up all their orders"),
    }),
    execute: async ({ orderId, email }) => {
      if (orderId) {
        const order = getOrderById(orderId);
        if (!order) {
          return { found: false as const, message: `No order found with ID ${orderId}. Please verify the order number.` };
        }
        return {
          found: true as const,
          order: {
            id: order.id,
            items: order.items.map((i) => ({
              name: i.productName,
              quantity: i.quantity,
              price: `${i.price} ${order.currency}`,
            })),
            totalAmount: `${order.totalAmount} ${order.currency}`,
            currentStatus: order.currentStatus,
            statusTimeline: order.statusHistory.map((s) => ({
              status: s.status,
              date: s.timestamp,
              note: s.note,
            })),
            trackingNumber: order.trackingNumber || "Not yet assigned",
            estimatedDelivery: order.estimatedDelivery || "Pending",
            shippingAddress: order.shippingAddress,
          },
        };
      }

      if (email) {
        const orders = getOrdersByEmail(email);
        if (orders.length === 0) {
          return { found: false as const, message: `No orders found for ${email}` };
        }
        return {
          found: true as const,
          count: orders.length,
          orders: orders.map((o) => ({
            id: o.id,
            totalAmount: `${o.totalAmount} ${o.currency}`,
            currentStatus: o.currentStatus,
            createdAt: o.createdAt,
            itemCount: o.items.length,
          })),
        };
      }

      return {
        found: false as const,
        message: "Please provide an order ID or email address to track your order.",
      };
    },
  }),

  handleReturn: tool({
    description:
      "Handle return and refund inquiries. This tool checks the return policy for the product category, verifies order eligibility, and can initiate a return request. Use this when the customer wants to return a product, asks about the return policy, or requests a refund.",
    inputSchema: z.object({
      orderId: z.string().describe("The order ID for the return, e.g. ORD-10235"),
      productId: z
        .string()
        .optional()
        .describe("Specific product ID to return from the order, e.g. PRD-006"),
      action: z
        .enum(["check_policy", "check_eligibility", "initiate_return"])
        .describe(
          "check_policy: show return policy; check_eligibility: verify if return is possible; initiate_return: create a return request"
        ),
      reason: z
        .string()
        .optional()
        .describe("Reason for return - required when action is initiate_return"),
    }),
    execute: async ({ orderId, productId, action, reason }) => {
      const order = getOrderById(orderId);
      if (!order) {
        return { success: false as const, message: `Order ${orderId} not found. Please verify your order number.` };
      }

      const targetItem = productId
        ? order.items.find((i) => i.productId === productId)
        : order.items[0];

      if (!targetItem) {
        return {
          success: false as const,
          message: `Product ${productId} not found in order ${orderId}.`,
          orderItems: order.items.map((i) => ({
            productId: i.productId,
            name: i.productName,
          })),
        };
      }

      const productDetails = getProductById(targetItem.productId);
      const categoryEn = productDetails?.category.en || "General";
      const policy = getReturnPolicy(categoryEn);

      if (action === "check_policy") {
        if (!policy) {
          return { success: true as const, message: "Standard 14-day return policy applies." };
        }
        return {
          success: true as const,
          policy: {
            category: categoryEn,
            returnWindow: `${policy.returnWindowDays} days`,
            conditions: policy.conditions,
            refundMethod: policy.refundMethod,
            exceptions: policy.exceptions,
          },
        };
      }

      if (action === "check_eligibility" || action === "initiate_return") {
        if (order.currentStatus === "cancelled") {
          return {
            success: false as const,
            eligible: false,
            message: "This order has been cancelled. Returns are not applicable.",
          };
        }

        if (order.currentStatus !== "delivered") {
          return {
            success: false as const,
            eligible: false,
            message: `This order is currently "${order.currentStatus}". Returns can only be initiated for delivered orders.`,
            currentStatus: order.currentStatus,
          };
        }

        const deliveredEntry = order.statusHistory.find(
          (s) => s.status === "delivered"
        );
        const deliveredDate = deliveredEntry
          ? new Date(deliveredEntry.timestamp)
          : null;
        const now = new Date();
        const daysSinceDelivery = deliveredDate
          ? Math.floor(
              (now.getTime() - deliveredDate.getTime()) / (1000 * 60 * 60 * 24)
            )
          : 0;
        const windowDays = policy?.returnWindowDays ?? 14;
        const isWithinWindow = daysSinceDelivery <= windowDays;

        if (!isWithinWindow) {
          return {
            success: false as const,
            eligible: false,
            message: `The ${windowDays}-day return window has expired. The order was delivered ${daysSinceDelivery} days ago.`,
          };
        }

        if (action === "check_eligibility") {
          return {
            success: true as const,
            eligible: true,
            message: `This item is eligible for return. ${daysSinceDelivery} of ${windowDays} days remaining in the return window.`,
            conditions: policy?.conditions,
            refundMethod: policy?.refundMethod,
          };
        }

        if (!reason) {
          return {
            success: false as const,
            message: "A reason is required to initiate a return. Please ask the customer why they want to return the item.",
          };
        }

        const existingReturns = getReturnRequestsByOrder(orderId);
        const alreadyRequested = existingReturns.some(
          (r) => r.productId === targetItem.productId
        );
        if (alreadyRequested) {
          return {
            success: false as const,
            message: "A return request already exists for this item.",
            existingRequests: existingReturns,
          };
        }

        const returnRequest = createReturnRequest(
          orderId,
          targetItem.productId,
          reason
        );
        return {
          success: true as const,
          message: "Return request created successfully.",
          returnRequest: {
            id: returnRequest.id,
            orderId: returnRequest.orderId,
            productId: returnRequest.productId,
            status: returnRequest.status,
            refundAmount: targetItem.price,
            refundMethod: policy?.refundMethod,
            nextSteps: {
              en: "Our team will review your request within 24 hours. You will receive an email with return shipping instructions.",
              ar: "سيقوم فريقنا بمراجعة طلبك خلال 24 ساعة. ستتلقى بريداً إلكترونياً يتضمن تعليمات شحن الإرجاع.",
            },
          },
        };
      }

      return { success: false as const, message: "Invalid action specified." };
    },
  }),

  escalateToHuman: tool({
    description:
      "Escalate the conversation to a human support agent. Use this when: the customer explicitly asks to speak with a human, the issue is too complex to resolve, the customer is clearly frustrated or upset, or the inquiry involves sensitive account/payment issues.",
    inputSchema: z.object({
      reason: z
        .string()
        .describe("Brief summary of why the conversation is being escalated"),
      priority: z
        .enum(["low", "medium", "high", "urgent"])
        .describe("Priority level based on issue severity and customer sentiment"),
      conversationSummary: z
        .string()
        .describe("Summary of the conversation so far to hand off to the human agent"),
    }),
    execute: async ({ reason, priority, conversationSummary }) => {
      const ticketId = `TKT-${Date.now().toString(36).toUpperCase()}`;
      return {
        success: true as const,
        ticketId,
        message: {
          en: `Your conversation has been escalated to a human agent (Priority: ${priority}). A support representative will be with you shortly. Your reference number is ${ticketId}.`,
          ar: `تم تحويل محادثتك إلى وكيل بشري (الأولوية: ${priority}). سيكون ممثل الدعم معك قريباً. رقم المرجع الخاص بك هو ${ticketId}.`,
        },
        reason,
        priority,
        conversationSummary,
        estimatedWaitTime: priority === "urgent" ? "< 5 minutes" : "< 15 minutes",
      };
    },
  }),
};
