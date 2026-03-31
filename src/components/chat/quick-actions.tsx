"use client";

import { Package, Search, RotateCcw, HelpCircle, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocale } from "@/lib/i18n";
import { translations } from "@/lib/i18n/translations";

interface QuickActionsProps {
  onAction: (message: string) => void;
}

const actionKeys: Array<{
  icon: LucideIcon;
  key: keyof typeof translations.quickActions;
}> = [
  { icon: Search, key: "browseProducts" },
  { icon: Package, key: "trackOrder" },
  { icon: RotateCcw, key: "returnItem" },
  { icon: HelpCircle, key: "generalHelp" },
];

export function QuickActions({ onAction }: QuickActionsProps) {
  const { isRtl, locale } = useLocale();

  return (
    <div className="flex flex-wrap justify-center gap-2 px-4 py-3" dir={isRtl ? "rtl" : "ltr"}>
      {actionKeys.map(({ icon: Icon, key }) => {
        const action = translations.quickActions[key];
        return (
          <button
            key={key}
            onClick={() => onAction(action.message[locale])}
            className={cn(
              "flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-medium",
              "text-muted-foreground transition-colors",
              "hover:border-primary/30 hover:bg-primary/5 hover:text-foreground"
            )}
          >
            <Icon className="h-3.5 w-3.5" />
            {action.label[locale]}
          </button>
        );
      })}
    </div>
  );
}
