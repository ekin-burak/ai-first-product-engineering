"use client";

import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface UIMessagePart {
  type: string;
  text?: string;
  [key: string]: unknown;
}

interface ChatMessage {
  id: string;
  role: string;
  parts?: UIMessagePart[];
}

interface MessageBubbleProps {
  message: ChatMessage;
  isRtl: boolean;
}

function getMessageText(message: ChatMessage): string {
  if (!message.parts) return "";
  return message.parts
    .filter((p) => p.type === "text" && p.text)
    .map((p) => p.text!)
    .join("");
}

export function MessageBubble({ message, isRtl }: MessageBubbleProps) {
  const isUser = message.role === "user";
  const text = getMessageText(message);

  if (!text && message.role === "assistant") {
    return null;
  }

  return (
    <div
      className={cn(
        "flex gap-3 px-4 py-2 sm:px-6",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
          isUser ? "bg-gradient-to-br from-primary to-indigo-600" : "bg-muted/80"
        )}
      >
        {isUser ? (
          <User className="h-4 w-4 text-primary-foreground" />
        ) : (
          <Bot className="h-4 w-4 text-muted-foreground" />
        )}
      </div>

      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm",
          isUser
            ? "bg-gradient-to-br from-primary to-indigo-600 text-primary-foreground"
            : "bg-muted/80 text-foreground"
        )}
      >
        <MessageContent content={text} />
      </div>
    </div>
  );
}

function MessageContent({ content }: { content: string }) {
  if (!content) return null;

  const blocks = content.split("\n");

  return (
    <div className="space-y-1.5">
      {blocks.map((block, i) => {
        if (!block.trim()) return <div key={i} className="h-2" />;

        const formatted = block
          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
          .replace(/\*(.*?)\*/g, "<em>$1</em>");

        return (
          <p
            key={i}
            className="whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: formatted }}
          />
        );
      })}
    </div>
  );
}
