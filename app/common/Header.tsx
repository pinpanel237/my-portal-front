"use client";

import { useState, useEffect, startTransition } from "react";
import { Moon, Sun, User, Users } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function Header() {
  const { resolvedTheme: theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    startTransition(() => setMounted(true));
  }, []);

  const isMainPage = pathname === "/";

  return (
      <header className={`relative z-50 transition-all duration-300 ${
        isMainPage 
          ? "bg-transparent border-transparent backdrop-blur-none" 
          : "bg-white/50 border-b border-[#d2d2d7] backdrop-blur-lg dark:bg-black/50 dark:border-[#38383a]"
      }`}>
        <div className="flex items-center justify-between py-3 px-4 md:px-6">
          {/* Title */}
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <h1 className="text-[20px] md:text-[24px] font-bold transition-colors duration-300 text-[#1d1d1f] dark:text-white">
              암기 카드
            </h1>
          </Link>

          {/* Center Tabs */}
          <div className="flex gap-2">
            <Link
              href="/flashcards"
              className={`py-2 px-4 md:px-6 rounded-[12px] text-[15px] md:text-[17px] font-medium transition-all flex items-center justify-center gap-2 ${
                pathname === "/flashcards"
                  ? "bg-[#007AFF] text-white"
                  : isMainPage
                    ? "text-[#1d1d1f] hover:bg-black/5 dark:text-white dark:hover:bg-white/10"
                    : "text-[#1d1d1f] hover:bg-white/20 dark:text-white dark:hover:bg-black/20"
              }`}
            >
              <User className="w-4 h-4" strokeWidth={2.5} />
              <span className="hidden sm:inline">내 카드</span>
            </Link>
            <Link
              href="/flashcards/community"
              className={`py-2 px-4 md:px-6 rounded-[12px] text-[15px] md:text-[17px] font-medium transition-all flex items-center justify-center gap-2 ${
                pathname === "/flashcards/community"
                  ? "bg-[#007AFF] text-white"
                  : isMainPage
                    ? "text-[#1d1d1f] hover:bg-black/5 dark:text-white dark:hover:bg-white/10"
                    : "text-[#1d1d1f] hover:bg-white/20 dark:text-white dark:hover:bg-black/20"
              }`}
            >
              <Users className="w-4 h-4" strokeWidth={2.5} />
              <span className="hidden sm:inline">커뮤니티</span>
            </Link>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={`w-9 h-9 md:w-10 md:h-10 rounded-[10px] transition-all flex items-center justify-center flex-shrink-0 text-[#007AFF] dark:text-[#ffd60a] ${
              isMainPage
                ? "bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20"
                : "bg-white/20 hover:bg-white/30 dark:bg-black/20 dark:hover:bg-black/30"
            }`}
            aria-label="테마 전환"
          >
            {mounted && (theme === "dark" ? (
              <Moon
                className="w-4 h-4 md:w-5 md:h-5"
                strokeWidth={2.5}
                fill="currentColor"
              />
            ) : (
              <Sun className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2.5} />
            ))}
          </button>
        </div>
      </header>
  );
}
