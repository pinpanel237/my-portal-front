'use client'

import React, { useState } from 'react';

// 타입 정의
interface Keyword {
    text: string;
    size: number;
}

interface News {
    category: string;
    categoryName: string;
    headline: string;
    summary: string;
    source: string;
    time: string;
}

interface Category {
    id: string;
    label: string;
}

interface FilterButtonProps {
    category: string;
    label: string;
    isActive: boolean;
    onClick: () => void;
}

interface NewsItemProps {
    news: News;
}

// 워드 클라우드 데이터
const keywords: Keyword[] = [
    { text: '인공지능', size: 2.5 },
    { text: '경제성장', size: 2 },
    { text: '기후변화', size: 1.8 },
    { text: '전기차', size: 2.2 },
    { text: '메타버스', size: 1.5 },
    { text: '블록체인', size: 1.6 },
    { text: '반도체', size: 2.3 },
    { text: '우주탐사', size: 1.7 },
    { text: '양자컴퓨팅', size: 1.4 },
    { text: '로봇공학', size: 1.9 },
    { text: '바이오', size: 1.8 },
    { text: '재생에너지', size: 2.1 }
];

// 샘플 뉴스 데이터
const newsData: News[] = [
    {
        category: 'tech',
        categoryName: 'IT/과학',
        headline: 'AI 기술 혁신, 새로운 시대를 열다',
        summary: '최신 인공지능 기술이 산업 전반에 걸쳐 혁신적인 변화를 가져오고 있습니다. 전문가들은 향후 5년간 더욱 가속화될 것으로 전망합니다.',
        source: '테크뉴스',
        time: '1시간 전'
    },
    {
        category: 'economy',
        categoryName: '경제',
        headline: '글로벌 경제 회복세, 전문가들 긍정 전망',
        summary: '세계 주요 경제 지표가 회복세를 보이면서 경제 전문가들이 올해 성장률에 대해 긍정적인 전망을 내놓고 있습니다.',
        source: '경제일보',
        time: '2시간 전'
    },
    {
        category: 'society',
        categoryName: '사회',
        headline: '친환경 정책 강화, 시민들의 관심 증가',
        summary: '정부의 친환경 정책 강화에 따라 시민들의 환경 보호에 대한 관심이 높아지고 있으며, 다양한 실천 운동이 확산되고 있습니다.',
        source: '사회뉴스',
        time: '3시간 전'
    },
    {
        category: 'politics',
        categoryName: '정치',
        headline: '국회, 새로운 법안 통과로 변화 예고',
        summary: '국회에서 오늘 새로운 법안이 통과되면서 관련 업계와 시민들의 생활에 큰 변화가 예상됩니다.',
        source: '정치데일리',
        time: '4시간 전'
    },
    {
        category: 'tech',
        categoryName: 'IT/과학',
        headline: '우주 탐사선, 새로운 행성 발견',
        summary: '최근 발사된 우주 탐사선이 태양계 외곽에서 새로운 천체를 발견하여 과학계의 주목을 받고 있습니다.',
        source: '과학저널',
        time: '5시간 전'
    },
    {
        category: 'economy',
        categoryName: '경제',
        headline: '전기차 시장 급성장, 투자자들 관심 집중',
        summary: '전기차 시장이 예상보다 빠르게 성장하면서 관련 기업들의 주가가 상승하고 투자자들의 관심이 집중되고 있습니다.',
        source: '투자일보',
        time: '6시간 전'
    }
];

// Header 컴포넌트
const Header: React.FC = () => {
    return (
        <header className="bg-white shadow-md mb-8">
            <div className="max-w-6xl mx-auto px-5 py-5">
                <h1 className="text-center text-blue-600 text-3xl font-bold">📰 뉴스 포털</h1>
            </div>
        </header>
    );
};

// WordCloud 컴포넌트
const WordCloud: React.FC = () => {
    return (
        <section className="bg-white rounded-lg p-8 mb-8 shadow-lg">
            <h2 className="text-xl font-semibold mb-5 text-gray-800">🔥 실시간 트렌드 키워드</h2>
            <div className="w-full h-72 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-lg relative overflow-hidden">
                <div className="absolute w-full h-full flex flex-wrap items-center justify-center p-5 gap-3">
                    {keywords.map((keyword: Keyword, index: number) => (
                        <span
                            key={index}
                            className="text-white/90 font-semibold transition-all cursor-pointer hover:text-white hover:scale-110"
                            style={{ fontSize: `${keyword.size}em` }}
                        >
              {keyword.text}
            </span>
                    ))}
                </div>
            </div>
        </section>
    );
};

// NewsItem 컴포넌트
const NewsItem: React.FC<NewsItemProps> = ({ news }) => {
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

// FilterButton 컴포넌트
const FilterButton: React.FC<FilterButtonProps> = ({ category, label, isActive, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 border rounded-full text-sm transition-all ${
                isActive
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white border-gray-300 hover:bg-gray-100'
            }`}
        >
            {label}
        </button>
    );
};

// NewsSection 컴포넌트
const NewsSection: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<string>('all');

    const categories: Category[] = [
        { id: 'all', label: '전체' },
        { id: 'politics', label: '정치' },
        { id: 'economy', label: '경제' },
        { id: 'society', label: '사회' },
        { id: 'tech', label: 'IT/과학' }
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
                    <NewsItem key={index} news={news} />
                ))}
            </ul>
        </section>
    );
};

// App 컴포넌트
const NewsPortal: React.FC = () => {
    return (
        <div className="bg-gray-100 min-h-screen">
            <Header />
            <div className="max-w-6xl mx-auto px-5 pb-8">
                <WordCloud />
                <NewsSection />
            </div>
        </div>
    );
};

export default NewsPortal;