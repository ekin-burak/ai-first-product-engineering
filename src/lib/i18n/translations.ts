export type Locale = "en" | "ar";

export const translations = {
  header: {
    botName: { en: "Nora", ar: "نورة" },
    botSubtitle: { en: "AI Support Assistant", ar: "مساعدة الدعم الذكية" },
    switchLanguage: { en: "التبديل إلى العربية", ar: "Switch to English" },
    newConversation: { en: "New conversation", ar: "محادثة جديدة" },
  },
  welcome: {
    greeting: { en: "Hi! I'm Nora 👋", ar: "مرحباً! أنا نورة 👋" },
    description: {
      en: "Your AI support assistant. I can help you with product information, order tracking, and returns & refunds.",
      ar: "مساعدتك الذكية للدعم. يمكنني مساعدتك في معلومات المنتجات، تتبع الطلبات، والإرجاع والاسترداد.",
    },
  },
  input: {
    placeholder: { en: "Type your message here...", ar: "اكتب رسالتك هنا..." },
  },
  quickActions: {
    browseProducts: {
      label: { en: "Browse Products", ar: "تصفح المنتجات" },
      message: { en: "What products do you have?", ar: "ما هي المنتجات المتوفرة لديكم؟" },
    },
    trackOrder: {
      label: { en: "Track Order", ar: "تتبع الطلب" },
      message: { en: "I want to track my order", ar: "أريد تتبع طلبي" },
    },
    returnItem: {
      label: { en: "Return Item", ar: "إرجاع منتج" },
      message: { en: "I'd like to return an item", ar: "أريد إرجاع منتج" },
    },
    generalHelp: {
      label: { en: "General Help", ar: "مساعدة عامة" },
      message: { en: "I need help with something", ar: "أحتاج مساعدة" },
    },
  },
} as const;

export type TranslationKey =
  | `header.${keyof typeof translations.header}`
  | `welcome.${keyof typeof translations.welcome}`
  | `input.${keyof typeof translations.input}`
  | `quickActions.${keyof typeof translations.quickActions}.${"label" | "message"}`;
