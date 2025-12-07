'use client'

import NewsItem from "@/app/news/NewsItem";
import {Article} from "@/app/news/page";

export default function NewsSection({ newsData }: { newsData: Article[] }) {
    return (
        <section className="bg-white rounded-lg p-8 shadow-lg">
            <div className="flex justify-between items-center mb-5 pb-4 border-b-2 border-blue-600">
                <h2 className="text-2xl font-semibold text-gray-800">최신 뉴스</h2>
            </div>

            <ul className="list-none">
                {newsData.map((news: Article, index: number) => (
                    <NewsItem key={index} news={news}/>
                ))}
            </ul>
        </section>
    );
}
