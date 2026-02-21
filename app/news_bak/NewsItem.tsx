import { Article } from "@/app/news/page";

export default function NewsItem({ news }: { news: Article }) {
    return (
        <li className="py-2">
            <a
                href={news.originalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="
                    block
                    rounded-2xl
                    border border-gray-200
                    bg-white
                    p-6
                    transition-all
                    duration-300
                    hover:shadow-xl
                    hover:-translate-y-1
                "
            >
                <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600 mb-3">
                    {news.source}
                </span>

                <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-snug">
                    {news.title}
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                    {news.description}
                </p>

                <div className="text-xs text-gray-400">
                    {new Date(news.publishDate).toLocaleString()}
                </div>
            </a>
        </li>
    );
}
