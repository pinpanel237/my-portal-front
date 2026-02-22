const newsSources = ["전체", "네이버", "다음"];
const newsCategories = ["전체", "정치", "경제", "사회", "스포츠", "연예", "과학"];

export default function Category({ isMenuOpen, setIsMenuOpen, selectedCategory, setSelectedCategory, selectedSource, setSelectedSource }: { isMenuOpen: boolean, setIsMenuOpen: (open: boolean) => void,
    selectedCategory: string, setSelectedCategory: (category: string) => void,
    selectedSource: string, setSelectedSource: (source: string) => void }) {
    return (
        <div className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 border-b border-gray-200/50 dark:border-gray-700/50 sticky
          top-[140px] z-40 transition-colors duration-300">
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
    )
}