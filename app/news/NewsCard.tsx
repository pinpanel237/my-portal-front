import { Clock } from "lucide-react";
import Image from "next/image";

interface NewsCardProps {
  id: number;
  title: string;
  category: string;
  source: string;
  description: string;
  imageUrl: string;
  time: string;
}

export function NewsCard({ title, category, source, description, imageUrl, time }: NewsCardProps) {
  const sourceColor = source === "네이버" ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700" : "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700";
  
  return (
    <article className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-black/10 dark:hover:shadow-black/30 hover:-translate-y-1 cursor-pointer border border-gray-100 dark:border-gray-700">
      <div className="relative h-56 overflow-hidden bg-gray-100 dark:bg-gray-900">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="backdrop-blur-xl bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-gray-200 text-xs px-3 py-1.5 rounded-full border border-white/20 dark:border-gray-600/20 shadow-sm">
            {category}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span className={`backdrop-blur-xl bg-white/90 dark:bg-gray-800/90 text-xs px-3 py-1.5 rounded-full border shadow-sm ${sourceColor}`}>
            {source}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl mb-3 line-clamp-2 text-gray-900 dark:text-white tracking-tight">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
          {description}
        </p>
        <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs">
          <Clock className="w-3.5 h-3.5 mr-1.5" strokeWidth={2} />
          <span className="tracking-wide">{time}</span>
        </div>
      </div>
    </article>
  );
}
