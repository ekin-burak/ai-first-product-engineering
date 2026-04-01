"use client";

import { useChat } from "@ai-sdk/react";
import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { useLocale } from "@/lib/i18n";
import { ChatHeader } from "./chat-header";
import { MessageBubble } from "./message-bubble";
import { ChatInput } from "./chat-input";
import { QuickActions } from "./quick-actions";
import { TypingIndicator } from "./typing-indicator";
import { Bot } from "lucide-react";

function hasArabic(text: string): boolean {
  return /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/.test(text);
}

function getTextContent(message: { parts?: Array<{ type: string; text?: string }> }): string {
  if (!message.parts) return "";
  return message.parts
    .filter((p) => p.type === "text" && p.text)
    .map((p) => p.text!)
    .join("");
}

export function ChatInterface() {
  const { isRtl, setLocale, t } = useLocale();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status, setMessages } = useChat({
    onFinish: ({ message }) => {
      const text = getTextContent(message);
      if (text) {
        setLocale(hasArabic(text) ? "ar" : "en");
      }
    },
  });

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleReset = useCallback(() => {
    setMessages([]);
    setInput("");
  }, [setMessages]);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!input.trim() || isLoading) return;
      sendMessage({ text: input.trim() });
      setInput("");
    },
    [input, isLoading, sendMessage]
  );

  const handleQuickAction = useCallback(
    (message: string) => {
      setLocale(hasArabic(message) ? "ar" : "en");
      sendMessage({ text: message });
    },
    [sendMessage, setLocale]
  );

  const isEmpty = messages.length === 0;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-background/80 shadow-xl shadow-indigo-500/5 backdrop-blur-sm">
      <ChatHeader onReset={handleReset} />

      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        {isEmpty ? (
          <WelcomeScreen onQuickAction={handleQuickAction} />
        ) : (
          <div className="py-4">
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                isRtl={isRtl}
              />
            ))}
            {isLoading && <TypingIndicator />}
          </div>
        )}
        {!isEmpty && !isLoading && (
          <QuickActions onAction={handleQuickAction} />
        )}
      </div>

      <ChatInput
        input={input}
        isLoading={isLoading}
        onInputChange={setInput}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

function WelcomeScreen({
  onQuickAction,
}: {
  onQuickAction: (message: string) => void;
}) {
  const { isRtl, t } = useLocale();

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 px-6 py-12">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary/15 to-violet-500/10 ring-1 ring-primary/10">
        <Bot className="h-8 w-8 text-primary" />
      </div>
      <div className="max-w-sm text-center" dir={isRtl ? "rtl" : "ltr"}>
        <h2 className="text-lg font-semibold">
          {t("welcome", "greeting")}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {t("welcome", "description")}
        </p>
      </div>
      <QuickActions onAction={onQuickAction} />
    </div>
  );
}
