"use client";

import { useState, useEffect, startTransition } from "react";
import { Moon, Sun, GraduationCap, TrendingUp } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

export function Header() {
  const { resolvedTheme: theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  
  useEffect(() => {
    startTransition(() => setMounted(true));
  }, []);

  return (
    <div className="sticky top-0 z-50 backdrop-blur-xl border-b shadow-sm transition-colors duration-300 bg-white/80 border-[#d2d2d7]/30 dark:bg-[#1c1c1e]/80 dark:border-[#38383a]/30">
      <div className="flex items-center justify-between md:justify-center py-3 px-4 md:px-6 md:relative">
        {/* Theme Toggle Button */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="md:absolute md:left-6 p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-200 hover:shadow-md flex-shrink-0"
        >
          {mounted &&
            (theme === "dark" ? (
              <Sun className="w-5 h-5 text-gray-300" strokeWidth={2} />
            ) : (
              <Moon className="w-5 h-5 text-gray-700" strokeWidth={2} />
            ))}
        </button>

        {/* Center Tabs */}
        <div className="flex items-center gap-1">
          <Link
            href="/dashboard"
            className={`px-4 md:px-6 py-2 md:py-2.5 rounded-[12px] text-[15px] md:text-[17px] font-medium transition-all ${
              pathname === "/dashboard"
                ? "bg-[#007AFF] text-white"
                : "text-[#86868b] hover:text-[#1d1d1f] hover:bg-[#f5f5f7] dark:text-[#98989d] dark:hover:text-white dark:hover:bg-[#3a3a3c]"
            }`}
          >
            <TrendingUp
              className="w-4 h-4 inline-block mr-1.5 md:mr-2 -mt-0.5"
              strokeWidth={2.5}
            />
            대시보드
          </Link>
          <Link
            href="/flashcard"
            className={`px-4 md:px-6 py-2 md:py-2.5 rounded-[12px] text-[15px] md:text-[17px] font-medium transition-all ${
              pathname === "/flashcard"
                ? "bg-[#007AFF] text-white"
                : "text-[#86868b] hover:text-[#1d1d1f] hover:bg-[#f5f5f7] dark:text-[#98989d] dark:hover:text-white dark:hover:bg-[#3a3a3c]"
            }`}
          >
            <GraduationCap
              className="w-4 h-4 inline-block mr-1.5 md:mr-2 -mt-0.5"
              strokeWidth={2.5}
            />
            암기 학습
          </Link>
        </div>

        {/* Spacer for mobile balance */}
        <div className="w-9 md:hidden"></div>
      </div>
    </div>
  );
}
