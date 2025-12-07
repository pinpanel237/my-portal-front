'use client'

import React, { useEffect, useState } from 'react';
import Header from "@/app/news/Header";
import NewsSection from "@/app/news/NewsSection";
import NewsSummarizer from "@/app/news/NewsSummarizer";

export interface Article {
    id: number;
    title: string;
    originalLink: string;
    description: string;
    publishDate: string;
    source: string;
}

export default function NewsPortal() {
    const [newsData, setNewsData] = useState<Article[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            setError('');

            try {
                const response = await fetch('http://localhost:8080/news', {
                    method: 'GET'
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data: Article[] = await response.json();
                setNewsData(data);

            } catch (err) {
                const msg = err instanceof Error ? err.message : 'Unknown error';
                setError(`뉴스를 불러오는 중 오류가 발생했습니다: ${msg}`);
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen">
            <Header/>
            <div className="max-w-6xl mx-auto px-5 pb-8">
                <NewsSummarizer />
                {loading && <div className="text-center py-8 text-gray-600">뉴스 불러오는 중...</div>}
                {error && <div className="text-center py-8 text-red-600">{error}</div>}
                {!loading && !error && <NewsSection newsData={newsData}/>}
            </div>
        </div>
    );
}
