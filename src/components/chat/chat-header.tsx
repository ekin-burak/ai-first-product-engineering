"use client";

import { Bot, Globe, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/i18n";

interface ChatHeaderProps {
  onReset: () => void;
}

export function ChatHeader({ onReset }: ChatHeaderProps) {
  const { t, toggleLocale } = useLocale();

  return (
    <header className="flex items-center justify-between border-b border-border/60 bg-gradient-to-r from-card to-card/80 px-4 py-3 sm:px-6">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-indigo-600">
          <Bot className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-sm font-semibold leading-none">
            {t("header", "botName")}
          </h1>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {t("header", "botSubtitle")}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleLocale}
          className="h-8 w-8"
          title={t("header", "switchLanguage")}
        >
          <Globe className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onReset}
          className="h-8 w-8"
          title={t("header", "newConversation")}
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
