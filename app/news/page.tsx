import React from 'react';
import Header from "@/app/news/Header";
import WordCloud from "@/app/news/WordCloud";
import NewsSection from "@/app/news/NewsSection";

// 타입 정의
export interface Keyword {
    text: string;
    size: number;
}

export interface News {
    category: string;
    categoryName: string;
    headline: string;
    summary: string;
    source: string;
    time: string;
}

export interface Category {
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
    {text: '인공지능', size: 2.5},
    {text: '경제성장', size: 2},
    {text: '기후변화', size: 1.8},
    {text: '전기차', size: 2.2},
    {text: '메타버스', size: 1.5},
    {text: '블록체인', size: 1.6},
    {text: '반도체', size: 2.3},
    {text: '우주탐사', size: 1.7},
    {text: '양자컴퓨팅', size: 1.4},
    {text: '로봇공학', size: 1.9},
    {text: '바이오', size: 1.8},
    {text: '재생에너지', size: 2.1}
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

export default function NewsPortal() {
    return (
        <div className="bg-gray-100 min-h-screen">
            <Header/>
            <div className="max-w-6xl mx-auto px-5 pb-8">
                <WordCloud keywords={keywords}/>
                <NewsSection newsData={newsData}/>
            </div>
        </div>
    );
};