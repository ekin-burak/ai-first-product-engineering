"use client";

import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLocale } from "@/lib/i18n";
import { useRef, type FormEvent, type KeyboardEvent } from "react";

interface ChatInputProps {
  input: string;
  isLoading: boolean;
  onInputChange: (value: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export function ChatInput({
  input,
  isLoading,
  onInputChange,
  onSubmit,
}: ChatInputProps) {
  const { isRtl, t } = useLocale();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !isLoading) {
        const form = e.currentTarget.closest("form");
        if (form) {
          form.requestSubmit();
        }
      }
    }
  };

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  };

  return (
    <div className="border-t border-border bg-card p-3 sm:p-4">
      <form
        onSubmit={onSubmit}
        className="flex items-end gap-2"
        dir={isRtl ? "rtl" : "ltr"}
      >
        <div className="relative flex-1">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => {
              onInputChange(e.target.value);
              adjustHeight();
            }}
            onKeyDown={handleKeyDown}
            placeholder={t("input", "placeholder")}
            rows={1}
            className={cn(
              "w-full resize-none rounded-xl border border-input bg-background px-4 py-2.5 text-sm",
              "placeholder:text-muted-foreground",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
              "disabled:cursor-not-allowed disabled:opacity-50",
              isRtl && "text-right"
            )}
            disabled={isLoading}
          />
        </div>
        <Button
          type="submit"
          size="icon"
          disabled={!input.trim() || isLoading}
          className="h-10 w-10 shrink-0 rounded-xl"
        >
          <Send className={cn("h-4 w-4", isRtl && "rotate-180")} />
        </Button>
      </form>
    </div>
  );
}
