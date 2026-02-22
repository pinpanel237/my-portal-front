import Header from "@/app/common/Header";

export default function LocalPage() {
  return (
    <div className="min-h-screen transition-colors duration-300 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      {/* 헤더 */}
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-12">
        추가 예정입니다...
      </main>
    </div>
  );
}