"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { translations, type Locale } from "./translations";

interface LocaleContextValue {
  locale: Locale;
  isRtl: boolean;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: (section: string, key: string) => string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  const toggleLocale = useCallback(() => {
    setLocale((prev) => (prev === "en" ? "ar" : "en"));
  }, []);

  const t = useCallback(
    (section: string, key: string): string => {
      const sectionObj = translations[section as keyof typeof translations];
      if (!sectionObj) return key;

      const entry = (sectionObj as Record<string, unknown>)[key];
      if (!entry) return key;

      if (typeof entry === "object" && entry !== null && locale in entry) {
        return (entry as Record<Locale, string>)[locale];
      }

      return key;
    },
    [locale]
  );

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      isRtl: locale === "ar",
      setLocale,
      toggleLocale,
      t,
    }),
    [locale, toggleLocale, t]
  );

  return <LocaleContext value={value}>{children}</LocaleContext>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return ctx;
}
