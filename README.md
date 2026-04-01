# Nora - AI Customer Support Chatbot

An AI-powered multilingual customer support chatbot built for e-commerce in KSA (Saudi Arabia). Handles product inquiries, order tracking, and returns/refunds in both Arabic and English with real-time streaming responses.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| AI | Vercel AI SDK v6 + Google Gemini 2.5 Flash-Lite |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Validation | Zod v4 |
| Icons | Lucide React |

## Architecture

```
┌──────────────────────────────────────────────────┐
│                   Browser                        │
│  ┌────────────────────────────────────────────┐  │
│  │         Chat UI (React + useChat)          │  │
│  │  ┌──────────┐ ┌──────────┐ ┌───────────┐  │  │
│  │  │ Messages │ │  Input   │ │  Quick    │  │  │
│  │  │ (RTL/LTR)│ │  Bar     │ │  Actions  │  │  │
│  │  └──────────┘ └──────────┘ └───────────┘  │  │
│  └──────────────────┬─────────────────────────┘  │
└─────────────────────┼────────────────────────────┘
                      │ UIMessageStream (SSE)
┌─────────────────────┼────────────────────────────┐
│  Next.js Server     │                            │
│  ┌──────────────────▼─────────────────────────┐  │
│  │        /api/chat (POST)                    │  │
│  │  streamText() + system prompt + tools      │  │
│  └──────────────────┬─────────────────────────┘  │
│                     │ Tool Calling                │
│  ┌──────────────────▼─────────────────────────┐  │
│  │            AI Tool Layer                   │  │
│  │  ┌──────────────┐ ┌────────────────────┐   │  │
│  │  │searchProducts│ │ getProductDetails  │   │  │
│  │  ├──────────────┤ ├────────────────────┤   │  │
│  │  │  trackOrder  │ │   handleReturn     │   │  │
│  │  ├──────────────┤ └────────────────────┘   │  │
│  │  │escalateHuman │                          │  │
│  │  └──────────────┘                          │  │
│  └──────────────────┬─────────────────────────┘  │
│                     │                            │
│  ┌──────────────────▼─────────────────────────┐  │
│  │         Mock Data Layer                    │  │
│  │  Products (8) · Orders (5) · Policies (5)  │  │
│  │  All bilingual (Arabic + English)          │  │
│  └────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────┘
```

## Getting Started

### Prerequisites

- Node.js 18+
- A Google Generative AI API key ([get one here](https://aistudio.google.com/apikey))

### Installation

```bash
# Clone the repository
git clone https://github.com/ekin-burak/ai-first-product-engineering.git
cd ai-first-product-engineering

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

Edit `.env.local` and add your Google Generative AI API key:

```
GOOGLE_GENERATIVE_AI_API_KEY=your-actual-key-here
```

### Running

```bash
# Development server
npm run dev

# Production build
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

### Core (MVP)

- **Product Information** — Search products, get details, pricing, availability, and ratings
- **Order Tracking** — Look up orders by ID (ORD-XXXXX) or email, view full status timeline
- **Returns & Refunds** — Check return policies, verify eligibility, initiate return requests

### Multilingual

- Auto-detects Arabic or English from user input
- Responds in the same language the customer uses
- UI toggle to switch between Arabic (RTL) and English (LTR)
- Handles Gulf Arabic dialect and Arabic/English code-switching

### UX

- Real-time streaming responses (token-by-token)
- Quick action buttons for common inquiries
- Typing indicator while AI is processing
- Mobile-first responsive design

### Beyond Requirements

- Sentiment-aware escalation to human agents (built into system prompt)
- Proactive suggestions for out-of-stock products
- Conversation context maintained across turns
- i18n system for all UI strings (easily extensible to new languages)

## Project Structure

```
src/
├── app/
│   ├── api/chat/route.ts        # Chat streaming API endpoint
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Main page (chat container)
│   └── globals.css              # Theme and styles
├── components/
│   ├── chat/
│   │   ├── chat-interface.tsx   # Main chat orchestrator
│   │   ├── chat-header.tsx      # Header with language toggle
│   │   ├── chat-input.tsx       # Message input with auto-resize
│   │   ├── message-bubble.tsx   # User/assistant message display
│   │   ├── quick-actions.tsx    # Quick action buttons
│   │   └── typing-indicator.tsx # Animated typing dots
│   └── ui/                      # shadcn/ui primitives
├── lib/
│   ├── ai/
│   │   ├── tools.ts             # 5 AI tool definitions (Zod schemas)
│   │   └── system-prompt.ts     # Bilingual system prompt
│   ├── data/
│   │   ├── products.ts          # 8 KSA-relevant products (AR/EN)
│   │   ├── orders.ts            # 5 orders in various statuses
│   │   └── policies.ts          # Return policies by category
│   ├── i18n/
│   │   ├── translations.ts      # All UI translation strings
│   │   ├── locale-context.tsx   # React context + useLocale hook
│   │   └── index.ts             # Barrel export
│   └── utils.ts                 # Tailwind merge utility
└── types/
    └── index.ts                 # Shared TypeScript interfaces
```

## Sample Data for Testing

### Order IDs

| Order ID | Status | Customer |
|----------|--------|----------|
| ORD-10234 | Shipped | Ahmed Al-Rashid |
| ORD-10235 | Delivered | Fatima Hassan |
| ORD-10236 | Processing | Khalid Mohammed |
| ORD-10237 | Out for Delivery | Sara Abdullah |
| ORD-10238 | Cancelled | Omar Al-Farsi |

### Sample Conversations

**English — Product Search:**
> "What perfumes do you have?"

**Arabic — Order Tracking:**
> "وين طلبي ORD-10234؟"

**English — Return Request:**
> "I want to return the abaya from order ORD-10235"

**Arabic — General:**
> "ابي اعرف عن المنتجات عندكم"

## Integration Design

The mock data layer uses interfaces that mirror real e-commerce platform APIs. To connect to a live system, only the tool handler implementations need to change — no AI or UI modifications required.

| Mock Layer | Real Integration Target |
|------------|----------------------|
| `products.ts` | Salla / Zid / Shopify Product API |
| `orders.ts` | Salla / Zid / Shopify Order API |
| `policies.ts` | CMS or internal policy database |
| `escalateToHuman` | Freshdesk / Zendesk ticket creation |

## License

MIT
