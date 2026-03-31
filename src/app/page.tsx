import { LocaleProvider } from "@/lib/i18n";
import { ChatInterface } from "@/components/chat/chat-interface";

export default function Home() {
  return (
    <div className="flex h-dvh items-center justify-center p-4 sm:p-6">
      <div className="h-full w-full max-w-2xl">
        <LocaleProvider>
          <ChatInterface />
        </LocaleProvider>
      </div>
    </div>
  );
}
