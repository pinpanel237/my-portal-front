import Link from "next/link";
import { Edit3, PlayCircle, Users, ArrowRight } from "lucide-react";

const FEATURES = [
  {
    id: 1,
    title: '나만의 카드 작성',
    description: '공부하고 싶은 내용을 질문과 답변 형식으로 자유롭게 기록하세요.',
    icon: <Edit3 className="w-8 h-8 text-blue-500" />,
  },
  {
    id: 2,
    title: '역동적인 학습 모드',
    description: '깔끔한 UI와 직관적인 조작으로 효과적인 암기 학습을 제공합니다.',
    icon: <PlayCircle className="w-8 h-8 text-green-500" />,
  },
  {
    id: 3,
    title: '커뮤니티와 공유',
    description: '다른 사용자들이 만든 최고의 카드 뭉치를 찾아보세요.',
    icon: <Users className="w-8 h-8 text-purple-500" />,
  },
];

export default function Home() {
  return (
    <div className="fixed inset-0 overflow-hidden transition-colors duration-300 bg-[#f5f5f7] dark:bg-[#000000]">
      <main className="h-full overflow-y-auto snap-y snap-mandatory scroll-smooth">
        {/* Hero Section with Enhanced Background - Overlaps Header flow */}
        <section className="relative h-screen snap-start flex flex-col items-center justify-center px-6 overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" 
              alt="Background" 
              className="w-full h-full object-cover opacity-60 dark:opacity-40"
            />
            <div className="absolute inset-0 bg-white/30 dark:bg-black/50 backdrop-blur-xl" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#f5f5f7] dark:to-[#000000]" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto text-center mt-[-64px] md:mt-[-72px]">
            <h1 className="text-[48px] md:text-[80px] font-bold tracking-tight leading-[1.1] mb-8 text-[#1d1d1f] dark:text-white">
              더 쉽고 빠르게, <br />
              <span className="bg-gradient-to-r from-[#007AFF] to-[#00C7BE] bg-clip-text text-transparent">
                당신의 지식을 마스터하세요
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-[19px] md:text-[24px] mb-12 text-[#1d1d1f] dark:text-[#f5f5f7] font-medium">
              나만의 암기카드를 만들고 효율적으로 학습하세요. <br className="hidden md:block" />
              학습 시간을 단축하고 기억력을 극대화하는 최고의 도구입니다.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/flashcards"
                className="w-full sm:w-auto px-10 py-5 rounded-[22px] text-[19px] font-semibold bg-[#1d1d1f] text-white hover:bg-black dark:bg-white dark:text-black dark:hover:bg-[#f5f5f7] hover:shadow-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 group"
              >
                지금 무료로 시작하기
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative h-screen snap-start flex items-center px-6 bg-white dark:bg-[#1c1c1e] transition-colors duration-300">
          <div className="max-w-6xl mx-auto w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {FEATURES.map((feature) => (
                <div key={feature.id} className="group p-8 rounded-[32px] bg-[#f5f5f7] dark:bg-[#2c2c2e] hover:scale-[1.03] transition-all duration-300">
                  <div className="w-16 h-16 rounded-[18px] bg-white dark:bg-[#3a3a3c] flex items-center justify-center mb-6 shadow-sm group-hover:shadow-md transition-shadow">
                    {feature.icon}
                  </div>
                  <h3 className="text-[24px] font-bold mb-4 text-[#1d1d1f] dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-[17px] leading-relaxed text-[#86868b] dark:text-[#98989d]">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section and Footer */}
        <section className="relative h-screen snap-start flex flex-col px-6 py-12">
          <div className="flex-1 flex items-center justify-center">
            <div className="max-w-4xl mx-auto w-full rounded-[48px] p-12 md:p-20 bg-gradient-to-br from-[#1d1d1f] to-[#000000] text-center text-white relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-[36px] md:text-[50px] font-bold mb-8 leading-[1.1]">
                  준비되셨나요? <br />
                  함께 학습을 시작해 보세요.
                </h2>
                <Link
                  href="/flashcards"
                  className="inline-flex items-center justify-center px-12 py-5 rounded-[22px] text-[19px] font-semibold bg-white text-black hover:bg-[#f5f5f7] transition-all active:scale-[0.98]"
                >
                  무료 가입 및 시작
                </Link>
              </div>
              {/* Decorative element */}
              <div className="absolute top-[-20%] right-[-10%] w-[300px] h-[300px] bg-blue-500/20 blur-[120px] rounded-full" />
              <div className="absolute bottom-[-20%] left-[-10%] w-[300px] h-[300px] bg-purple-500/10 blur-[120px] rounded-full" />
            </div>
          </div>

          {/* Footer (Simple) */}
          <footer className="mt-auto py-8 border-t border-[#d2d2d7] dark:border-[#38383a] transition-colors duration-300">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-[15px] text-[#86868b] dark:text-[#98989d]">
                © 2026 Flashcard App. All rights reserved.
              </div>
              <div className="flex gap-8 text-[15px] text-[#86868b] dark:text-[#98989d]">
                <a href="#" className="hover:text-[#007AFF] transition-colors">개인정보 처리방침</a>
                <a href="#" className="hover:text-[#007AFF] transition-colors">이용약관</a>
              </div>
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
}
