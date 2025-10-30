import {Keyword} from "@/app/news/page";

export default function WordCloud ({keywords}: { keywords: Keyword[] }) {
    return (
        <section className="bg-white rounded-lg p-8 mb-8 shadow-lg">
            <h2 className="text-xl font-semibold mb-5 text-gray-800">🔥 실시간 트렌드 키워드</h2>
            <div
                className="w-full h-72 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-lg relative overflow-hidden">
                <div className="absolute w-full h-full flex flex-wrap items-center justify-center p-5 gap-3">
                    {keywords.map((keyword: Keyword, index: number) => (
                        <span
                            key={index}
                            className="text-white/90 font-semibold transition-all cursor-pointer hover:text-white hover:scale-110"
                            style={{fontSize: `${keyword.size}em`}}
                        >
              {keyword.text}
            </span>
                    ))}
                </div>
            </div>
        </section>
    );
};