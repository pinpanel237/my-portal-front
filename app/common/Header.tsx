'use client';

import { MapPin, Moon, Newspaper, Search, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import { startTransition, useEffect, useState } from "react";

export default function Header() {
    const pathname = usePathname();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const { resolvedTheme: theme, setTheme } = useTheme();
    
    useEffect(() => {
      startTransition(() => setMounted(true));
    }, []);

    return (
      <header className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50 shadow-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-2xl shadow-lg shadow-blue-500/20">
                <Newspaper className="w-7 h-7 text-white" strokeWidth={2.5} />
              </div>
              <h1 className="text-2xl tracking-tight dark:text-white">뉴스 포털</h1>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-200 hover:shadow-md">
                <Search className="w-5 h-5 text-gray-700 dark:text-gray-300" strokeWidth={2} />
              </button>
              <button 
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-200 hover:shadow-md"
              >
                {mounted && (theme === "dark" ? (
                  <Sun className="w-5 h-5 text-gray-300" strokeWidth={2} />
                ) : (
                  <Moon className="w-5 h-5 text-gray-700" strokeWidth={2} />
                ))}
              </button>
            </div>
          </div>
        </div>
        
        {/* 탭 내비게이션 */}
        <div className="border-t border-gray-200/50 dark:border-gray-700/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex gap-1">
              <button
                onClick={() => router.push("/news/main")}
                className={`flex items-center gap-2 px-6 py-4 transition-all duration-200 relative ${
                  pathname === "/news/main"
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                <Newspaper className="w-4 h-4" strokeWidth={2.5} />
                <span className="tracking-tight">뉴스 보기</span>
                {pathname === "/news/main" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 rounded-full"></div>
                )}
              </button>
              <button
                onClick={() => router.push("/news/local")}
                className={`flex items-center gap-2 px-6 py-4 transition-all duration-200 relative ${
                  pathname === "/news/local"
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                <MapPin className="w-4 h-4" strokeWidth={2.5} />
                <span className="tracking-tight">우리동네 기사보기</span>
                {pathname === "/news/local" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 rounded-full"></div>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>
    )
}