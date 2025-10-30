import {News} from "@/app/news/page";

export default function NewsItem({news}: { news: News }) {
    return (
        <li className="py-5 border-b border-gray-200 last:border-b-0 transition-colors hover:bg-gray-50">
            <a href="#" className="flex gap-5 no-underline text-inherit flex-col md:flex-row">
                <div className="w-full md:w-36 h-44 md:h-24 bg-gray-300 rounded flex-shrink-0 overflow-hidden">
                    <img
                        src={`https://via.placeholder.com/150x100/667eea/ffffff?text=${encodeURIComponent(news.categoryName)}`}
                        alt="뉴스 썸네일"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex-1">
          <span className="inline-block px-3 py-1 bg-gray-100 rounded text-xs text-gray-600 mb-2">
            {news.categoryName}
          </span>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 leading-snug">
                        {news.headline}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-2">
                        {news.summary}
                    </p>
                    <div className="text-xs text-gray-400">
                        {news.source} · {news.time}
                    </div>
                </div>
            </a>
        </li>
    );
};