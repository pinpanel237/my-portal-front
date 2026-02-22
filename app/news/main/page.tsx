"use client";

import { Newspaper } from "lucide-react";
import { useState } from "react";
import Category from "./Category";
import Header from "../../common/Header";
import { NewsCard } from "./NewsCard";
import Summary from "./Summary";

export interface NewsItem {
  id: number;
  title: string;
  category: string;
  source: string;
  description: string;
  imageUrl: string;
  time: string;
}

const newsData = [
  {
    id: 1,
    title: "AI 기술 발전으로 새로운 미래를 열다",
    category: "과학",
    source: "네이버",
    description:
      "인공지능 기술이 빠르게 발전하면서 다양한 산업 분야에서 혁신적인 변화가 일어나고 있습니다.",
    imageUrl:
      "https://images.unsplash.com/photo-1632507127573-f4098f6f027f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVha2luZyUyMG5ld3MlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3MTQ3MzA1Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    time: "2시간 전",
  },
  {
    id: 2,
    title: "경제 회복세, 기업들의 투자 확대",
    category: "경제",
    source: "다음",
    description:
      "국내 주요 기업들이 신규 투자를 발표하면서 경제 회복에 대한 기대감이 높아지고 있습니다.",
    imageUrl:
      "https://images.unsplash.com/photo-1632858265907-961f1454ccf6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBlY29ub215fGVufDF8fHx8MTc3MTU1ODU3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    time: "3시간 전",
  },
  {
    id: 3,
    title: "프로 스포츠 시즌 개막, 팬들의 뜨거운 관심",
    category: "스포츠",
    source: "네이버",
    description:
      "새 시즌이 시작되면서 각 팀의 경쟁이 치열해지고 있으며, 팬들의 응원 열기도 뜨겁습니다.",
    imageUrl:
      "https://images.unsplash.com/photo-1763854413165-1713bc5a7f4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBzdGFkaXVtJTIwYWN0aW9ufGVufDF8fHx8MTc3MTUxNDAyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    time: "5시간 전",
  },
  {
    id: 4,
    title: "세계 여행 트렌드, 새로운 관광지 주목",
    category: "사회",
    source: "다음",
    description:
      "코로나19 이후 여행 수요가 급증하면서 새로운 여행 트렌드와 관광지들이 주목받고 있습니다.",
    imageUrl:
      "https://images.unsplash.com/photo-1685850749074-9cf8023d7e8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3JsZCUyMHRyYXZlbCUyMGRlc3RpbmF0aW9ufGVufDF8fHx8MTc3MTUxNDE0Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    time: "6시간 전",
  },
  {
    id: 5,
    title: "의학 연구의 새로운 돌파구 마련",
    category: "과학",
    source: "네이버",
    description:
      "최신 의학 연구를 통해 난치병 치료에 대한 새로운 가능성이 발견되었습니다.",
    imageUrl:
      "https://images.unsplash.com/photo-1707944746058-4da338d0f827?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwbGFib3JhdG9yeSUyMHJlc2VhcmNofGVufDF8fHx8MTc3MTQ4NTc3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    time: "8시간 전",
  },
  {
    id: 6,
    title: "엔터테인먼트 산업, 새로운 흐름 주도",
    category: "연예",
    source: "다음",
    description:
      "국내 엔터테인먼트 산업이 글로벌 시장에서 새로운 트렌드를 만들어가고 있습니다.",
    imageUrl:
      "https://images.unsplash.com/photo-1762235634044-ac18d682a0d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnRlcnRhaW5tZW50JTIwbW92aWUlMjB0aGVhdGVyfGVufDF8fHx8MTc3MTU1ODU3N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    time: "10시간 전",
  },
];

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedSource, setSelectedSource] = useState("전체");

  const filteredNews: NewsItem[] =
    newsData.filter((news) => {
      const categoryMatch =
        selectedCategory === "전체" || news.category === selectedCategory;
      const sourceMatch =
        selectedSource === "전체" || news.source === selectedSource;
      return categoryMatch && sourceMatch;
    }) || [];

  return (
    <div className="min-h-screen transition-colors duration-300 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      {/* 헤더 */}
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* 카테고리 필터 */}
        <Category
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedSource={selectedSource}
          setSelectedSource={setSelectedSource}
        />

        {/* 요약 섹션 */}
        <Summary filteredNews={filteredNews} />

        <div className="mb-10">
          <h2 className="text-3xl text-gray-900 dark:text-white tracking-tight mb-2">
            최신뉴스
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 tracking-wide">
            {filteredNews.length}개의 기사
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((news) => (
            <NewsCard key={news.id} {...news} />
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center py-24">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
              <Newspaper
                className="w-8 h-8 text-gray-400 dark:text-gray-600"
                strokeWidth={2}
              />
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-lg tracking-tight">
              해당 카테고리의 뉴스가 없습니다.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
