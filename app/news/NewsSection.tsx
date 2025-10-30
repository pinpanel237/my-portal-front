'use client'

import {useState} from "react";
import {Category, News} from "@/app/news/page";
import FilterButton from "@/app/news/FilterButton";
import NewsItem from "@/app/news/NewsItem";

export default function NewsSection({newsData}: { newsData: News[] }) {
    const [activeCategory, setActiveCategory] = useState<string>('all');

    const categories: Category[] = [
        {id: 'all', label: '전체'},
        {id: 'politics', label: '정치'},
        {id: 'economy', label: '경제'},
        {id: 'society', label: '사회'},
        {id: 'tech', label: 'IT/과학'}
    ];

    const filteredNews: News[] = activeCategory === 'all'
        ? newsData
        : newsData.filter((news: News) => news.category === activeCategory);

    return (
        <section className="bg-white rounded-lg p-8 shadow-lg">
            <div className="flex justify-between items-center mb-5 pb-4 border-b-2 border-blue-600 flex-wrap gap-4">
                <h2 className="text-2xl font-semibold text-gray-800">최신 뉴스</h2>
                <div className="flex gap-2 flex-wrap">
                    {categories.map((cat: Category) => (
                        <FilterButton
                            key={cat.id}
                            category={cat.id}
                            label={cat.label}
                            isActive={activeCategory === cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                        />
                    ))}
                </div>
            </div>

            <ul className="list-none">
                {filteredNews.map((news: News, index: number) => (
                    <NewsItem key={index} news={news}/>
                ))}
            </ul>
        </section>
    );
};