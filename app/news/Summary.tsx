import { NewsItem } from "./page";
import { Sparkles, TrendingUp } from "lucide-react";

export default function Summary({ filteredNews }: { filteredNews: NewsItem[] }) {
  return (
    filteredNews.length > 0 && (
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-xl shadow-lg shadow-purple-500/20">
            <Sparkles className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <h2 className="text-2xl text-gray-900 dark:text-white tracking-tight">
            주요 뉴스 요약
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNews.slice(0, 3).map((news, index) => (
            <div
              key={`summary-${news.id}`}
              className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20 transition-all duration-300 cursor-pointer hover:-translate-y-1"
            >
              <div className="flex items-start gap-4 mb-3">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <TrendingUp
                    className="w-5 h-5 text-white"
                    strokeWidth={2.5}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600">
                      {news.category}
                    </span>
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full border ${
                        news.source === "네이버"
                          ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700"
                          : "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700"
                      }`}
                    >
                      {news.source}
                    </span>
                  </div>
                  <h3 className="text-base mb-2 line-clamp-2 text-gray-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {news.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                    {news.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <span className="text-xs text-gray-500 dark:text-gray-400 tracking-wide">
                  {news.time}
                </span>
                <div className="flex items-center text-blue-600 dark:text-blue-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="mr-1">자세히 보기</span>
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );
}
