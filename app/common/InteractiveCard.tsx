"use client";

import { useState } from "react";

export const InteractiveCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="group perspective-1000 w-[320px] h-[450px] md:w-[400px] md:h-[500px] cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          setIsFlipped(!isFlipped);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label="체험용 암기 카드, 클릭하여 뒤집기"
    >
      <div 
        className={`relative w-full h-full transition-transform duration-700 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}
      >
        {/* Front Face (Question) */}
        <div className="absolute inset-0 backface-hidden rounded-[32px] bg-white dark:bg-[#1c1c1e] shadow-2xl flex flex-col p-10 border border-[#d2d2d7] dark:border-[#38383a]">
          <div className="text-[14px] font-bold text-[#007AFF] uppercase tracking-widest mb-6">Question</div>
          <div className="flex-1 flex items-center justify-center text-center">
            <p className="text-[24px] md:text-[28px] font-bold text-[#1d1d1f] dark:text-white leading-tight">
              학습 효과를 극대화하는 <br />
              암기 카드 사용법은?
            </p>
          </div>
          <div className="mt-auto text-center text-[15px] text-[#86868b] dark:text-[#98989d] font-medium">
            클릭해서 정답 확인
          </div>
        </div>

        {/* Back Face (Answer) */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-[32px] bg-gradient-to-br from-[#007AFF] to-[#00C7BE] shadow-2xl flex flex-col p-10 text-white">
          <div className="text-[14px] font-bold text-white/80 uppercase tracking-widest mb-6">Answer</div>
          <div className="flex-1 flex items-center justify-center text-center">
            <p className="text-[24px] md:text-[28px] font-bold leading-tight">
              짧고 명확한 내용을 <br />
              반복적으로 <br />
              복습하는 것입니다.
            </p>
          </div>
          <div className="mt-auto text-center text-[15px] text-white/80 font-medium">
            다시 클릭해서 닫기
          </div>
        </div>
      </div>

      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};
