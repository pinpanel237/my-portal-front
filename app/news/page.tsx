'use client';

import { useState } from "react";
import { NewsCard } from "./NewsCard";
import { Newspaper, Menu, Search, MapPin, X, Sun, Moon, TrendingUp, Sparkles } from "lucide-react";

const newsCategories = ["전체", "정치", "경제", "사회", "스포츠", "연예", "과학"];
const newsSources = ["전체", "네이버", "다음"];

const newsData = [
  {
    id: 1,
    title: "AI 기술 발전으로 새로운 미래를 열다",
    category: "과학",
    source: "네이버",
    description: "인공지능 기술이 빠르게 발전하면서 다양한 산업 분야에서 혁신적인 변화가 일어나고 있습니다.",
    imageUrl: "https://images.unsplash.com/photo-1632507127573-f4098f6f027f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVha2luZyUyMG5ld3MlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3MTQ3MzA1Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    time: "2시간 전"
  },
  {
    id: 2,
    title: "경제 회복세, 기업들의 투자 확대",
    category: "경제",
    source: "다음",
    description: "국내 주요 기업들이 신규 투자를 발표하면서 경제 회복에 대한 기대감이 높아지고 있습니다.",
    imageUrl: "https://images.unsplash.com/photo-1632858265907-961f1454ccf6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBlY29ub215fGVufDF8fHx8MTc3MTU1ODU3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    time: "3시간 전"
  },
  {
    id: 3,
    title: "프로 스포츠 시즌 개막, 팬들의 뜨거운 관심",
    category: "스포츠",
    source: "네이버",
    description: "새 시즌이 시작되면서 각 팀의 경쟁이 치열해지고 있으며, 팬들의 응원 열기도 뜨겁습니다.",
    imageUrl: "https://images.unsplash.com/photo-1763854413165-1713bc5a7f4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBzdGFkaXVtJTIwYWN0aW9ufGVufDF8fHx8MTc3MTUxNDAyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    time: "5시간 전"
  },
  {
    id: 4,
    title: "세계 여행 트렌드, 새로운 관광지 주목",
    category: "사회",
    source: "다음",
    description: "코로나19 이후 여행 수요가 급증하면서 새로운 여행 트렌드와 관광지들이 주목받고 있습니다.",
    imageUrl: "https://images.unsplash.com/photo-1685850749074-9cf8023d7e8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3JsZCUyMHRyYXZlbCUyMGRlc3RpbmF0aW9ufGVufDF8fHx8MTc3MTUxNDE0Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    time: "6시간 전"
  },
  {
    id: 5,
    title: "의학 연구의 새로운 돌파구 마련",
    category: "과학",
    source: "네이버",
    description: "최신 의학 연구를 통해 난치병 치료에 대한 새로운 가능성이 발견되었습니다.",
    imageUrl: "https://images.unsplash.com/photo-1707944746058-4da338d0f827?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwbGFib3JhdG9yeSUyMHJlc2VhcmNofGVufDF8fHx8MTc3MTQ4NTc3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    time: "8시간 전"
  },
  {
    id: 6,
    title: "엔터테인먼트 산업, 새로운 흐름 주도",
    category: "연예",
    source: "다음",
    description: "국내 엔터테인먼트 산업이 글로벌 시장에서 새로운 트렌드를 만들어가고 있습니다.",
    imageUrl: "https://images.unsplash.com/photo-1762235634044-ac18d682a0d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnRlcnRhaW5tZW50JTIwbW92aWUlMjB0aGVhdGVyfGVufDF8fHx8MTc3MTU1ODU3N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    time: "10시간 전"
  }
];

const localNewsData = [
  {
    id: 101,
    title: "강남구 전통시장 활성화 프로그램 시작",
    category: "사회",
    source: "네이버",
    description: "지역 전통시장 살리기 프로젝트가 본격화되면서 상인들과 주민들의 기대가 높아지고 있습니다.",
    imageUrl: "https://images.unsplash.com/photo-1762592957827-99db60cfd0c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2NhbCUyMGNvbW11bml0eSUyMG1hcmtldHxlbnwxfHx8fDE3NzE1NTkzNTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    time: "1시간 전"
  },
  {
    id: 102,
    title: "서초구 신규 카페거리 조성, 주민 호평",
    category: "사회",
    source: "다음",
    description: "지역 상권 활성화를 위한 카페거리가 조성되면서 젊은층 유입이 늘어나고 있습니다.",
    imageUrl: "https://images.unsplash.com/photo-1765472980704-5caaa6ba4867?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZWlnaGJvcmhvb2QlMjBzdHJlZXQlMjBjYWZlfGVufDF8fHx8MTc3MTU1MTk1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    time: "3시간 전"
  },
  {
    id: 103,
    title: "마포구 지역 축제 대성황, 3만명 방문",
    category: "사회",
    source: "네이버",
    description: "주말에 열린 지역 축제에 많은 주민들이 참여하면서 지역 공동체 의식이 강화되고 있습니다.",
    imageUrl: "https://images.unsplash.com/photo-1761503390713-a1fd8b8bb6c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2NhbCUyMGZlc3RpdmFsJTIwZXZlbnR8ZW58MXx8fHwxNzcxNTU5MzU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    time: "4시간 전"
  },
  {
    id: 104,
    title: "송파구 도시공원 리모델링 완료",
    category: "사회",
    source: "다음",
    description: "주민들의 요청으로 진행된 공원 리모델링이 완료되어 더 쾌적한 휴식 공간이 마련되었습니다.",
    imageUrl: "https://images.unsplash.com/photo-1557265021-ad01a98a24e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwcGFyayUyMHBlb3BsZXxlbnwxfHx8fDE3NzE1NTkzNTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    time: "5시간 전"
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<"news" | "local">("news");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedSource, setSelectedSource] = useState("전체");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const currentData = activeTab === "news" ? newsData : localNewsData;
  
  const filteredNews = currentData.filter(news => {
    const categoryMatch = selectedCategory === "전체" || news.category === selectedCategory;
    const sourceMatch = selectedSource === "전체" || news.source === selectedSource;
    return categoryMatch && sourceMatch;
  });

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? "dark bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900" 
        : "bg-gradient-to-br from-gray-50 via-white to-gray-50"
    }`}>
      {/* Header */}
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
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-200 hover:shadow-md"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-gray-300" strokeWidth={2} />
                ) : (
                  <Moon className="w-5 h-5 text-gray-700" strokeWidth={2} />
                )}
              </button>
              <button 
                className="md:hidden p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-200"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5 text-gray-700 dark:text-gray-300" strokeWidth={2} />
                ) : (
                  <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" strokeWidth={2} />
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Tab Navigation */}
        <div className="border-t border-gray-200/50 dark:border-gray-700/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex gap-1">
              <button
                onClick={() => {
                  setActiveTab("news");
                  setSelectedCategory("전체");
                  setSelectedSource("전체");
                }}
                className={`flex items-center gap-2 px-6 py-4 transition-all duration-200 relative ${
                  activeTab === "news"
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                <Newspaper className="w-4 h-4" strokeWidth={2.5} />
                <span className="tracking-tight">뉴스 보기</span>
                {activeTab === "news" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 rounded-full"></div>
                )}
              </button>
              <button
                onClick={() => {
                  setActiveTab("local");
                  setSelectedCategory("전체");
                  setSelectedSource("전체");
                }}
                className={`flex items-center gap-2 px-6 py-4 transition-all duration-200 relative ${
                  activeTab === "local"
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                <MapPin className="w-4 h-4" strokeWidth={2.5} />
                <span className="tracking-tight">우리동네 기사보기</span>
                {activeTab === "local" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 rounded-full"></div>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Category Filter */}
      <div className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 border-b border-gray-200/50 dark:border-gray-700/50 sticky top-[140px] z-40 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row gap-4 md:gap-6 py-5`}>
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400 self-center whitespace-nowrap mr-1 tracking-wide">카테고리</span>
              {newsCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setIsMenuOpen(false);
                  }}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200 tracking-tight ${
                    selectedCategory === category
                      ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 shadow-lg shadow-gray-900/20 dark:shadow-gray-100/10"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:shadow-md"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="hidden md:block w-px bg-gray-200 dark:bg-gray-700"></div>
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400 self-center whitespace-nowrap mr-1 tracking-wide">출처</span>
              {newsSources.map((source) => (
                <button
                  key={source}
                  onClick={() => {
                    setSelectedSource(source);
                    setIsMenuOpen(false);
                  }}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200 tracking-tight ${
                    selectedSource === source
                      ? source === "네이버" 
                        ? "bg-emerald-600 dark:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20"
                        : source === "다음"
                        ? "bg-blue-600 dark:bg-blue-500 text-white shadow-lg shadow-blue-600/20"
                        : "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 shadow-lg shadow-gray-900/20 dark:shadow-gray-100/10"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:shadow-md"
                  }`}
                >
                  {source}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* News Grid */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Summary Section */}
        {filteredNews.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-xl shadow-lg shadow-purple-500/20">
                <Sparkles className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <h2 className="text-2xl text-gray-900 dark:text-white tracking-tight">주요 뉴스 요약</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredNews.slice(0, 3).map((news, index) => (
                <div 
                  key={`summary-${news.id}`}
                  className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20 transition-all duration-300 cursor-pointer hover:-translate-y-1"
                >
                  <div className="flex items-start gap-4 mb-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                      <TrendingUp className="w-5 h-5 text-white" strokeWidth={2.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600">
                          {news.category}
                        </span>
                        <span className={`text-xs px-2.5 py-1 rounded-full border ${
                          news.source === "네이버"
                            ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700"
                            : "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700"
                        }`}>
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
                    <span className="text-xs text-gray-500 dark:text-gray-400 tracking-wide">{news.time}</span>
                    <div className="flex items-center text-blue-600 dark:text-blue-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="mr-1">자세히 보기</span>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mb-10">
          <h2 className="text-3xl text-gray-900 dark:text-white tracking-tight mb-2">
            {activeTab === "local" 
              ? selectedSource === "전체" 
                ? "우리동네 최신 소식" 
                : `${selectedSource} 우리동네 소식`
              : selectedSource === "전체" && selectedCategory === "전체" 
                ? "최신 뉴스" 
                : selectedSource !== "전체" && selectedCategory === "전체"
                ? `${selectedSource} 최신 뉴스`
                : selectedSource === "전체" && selectedCategory !== "전체"
                ? `${selectedCategory} 뉴스`
                : `${selectedSource} ${selectedCategory} 뉴스`}
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
              <Newspaper className="w-8 h-8 text-gray-400 dark:text-gray-600" strokeWidth={2} />
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
