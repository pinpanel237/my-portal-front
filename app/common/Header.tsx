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

  return (
      <div className="sticky top-0 z-50 border-b transition-colors duration-300 bg-white border-[#d2d2d7] dark:bg-[#1c1c1e] dark:border-[#38383a]">
        <div className="flex items-center justify-between py-3 px-4 md:px-6">
          {/* Title */}
          <h1 className="text-[20px] md:text-[24px] font-bold transition-colors duration-300 text-[#1d1d1f] dark:text-white">
            암기 카드
          </h1>

          {/* Center Tabs */}
          <div className="flex gap-2">
            <Link
              href="/flashcards"
              className={`py-2 px-4 md:px-6 rounded-[12px] text-[15px] md:text-[17px] font-medium transition-all flex items-center justify-center gap-2 ${
                pathname === "/flashcards"
                  ? "bg-[#007AFF] text-white"
                  : "text-[#86868b] hover:text-[#1d1d1f] hover:bg-[#f5f5f7] dark:text-[#98989d] dark:hover:text-white dark:hover:bg-[#2c2c2e]"
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
                  : "text-[#86868b] hover:text-[#1d1d1f] hover:bg-[#f5f5f7] dark:text-[#98989d] dark:hover:text-white dark:hover:bg-[#2c2c2e]"
              }`}
            >
              <Users className="w-4 h-4" strokeWidth={2.5} />
              <span className="hidden sm:inline">커뮤니티</span>
            </Link>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-9 h-9 md:w-10 md:h-10 rounded-[10px] transition-all flex items-center justify-center flex-shrink-0 bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#007AFF] dark:bg-[#3a3a3c] dark:hover:bg-[#48484a] dark:text-[#ffd60a]"
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
      </div>
  );
}
