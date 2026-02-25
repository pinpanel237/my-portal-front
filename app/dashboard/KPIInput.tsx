'use client';

import { useState } from 'react';
import { X, BookOpen, Dumbbell, Wallet, Sparkles } from 'lucide-react';
import { DailyKPI } from './page';

interface KPIInputProps {
  isDarkMode?: boolean;
  onSubmit: (study: number, exercise: number, spending: number) => void;
  onClose: () => void;
  existingData?: DailyKPI;
}

export function KPIInput({ onSubmit, onClose, existingData }: KPIInputProps) {
  const [study, setStudy] = useState(existingData?.study.toString() || '');
  const [exercise, setExercise] = useState(existingData?.exercise.toString() || '');
  const [spending, setSpending] = useState(existingData?.spending.toString() || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const studyNum = parseFloat(study) || 0;
    const exerciseNum = parseFloat(exercise) || 0;
    const spendingNum = parseInt(spending) || 0;
    
    onSubmit(studyNum, exerciseNum, spendingNum);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md backdrop-blur-xl rounded-[24px] shadow-2xl border transition-colors duration-300 bg-white/95 border-[#d2d2d7]/30 dark:bg-[#2c2c2e]/95 dark:border-[#38383a]/30">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#d2d2d7]/20">
          <h2 className="text-[24px] font-semibold transition-colors duration-300 text-[#1d1d1f] dark:text-white">
            오늘의 기록
          </h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full transition-all flex items-center justify-center hover:bg-[#f5f5f7] text-[#1d1d1f] dark:hover:bg-[#3a3a3c] dark:text-white"
          >
            <X className="w-5 h-5" strokeWidth={2.5} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Study */}
          <div>
            <label className="flex items-center gap-2 text-[15px] font-medium mb-3 uppercase tracking-wide transition-colors duration-300 text-[#86868b] dark:text-[#98989d]">
              <BookOpen className="w-4 h-4 text-[#007AFF]" strokeWidth={2.5} />
              공부 시간
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.5"
                min="0"
                max="24"
                value={study}
                onChange={(e) => setStudy(e.target.value)}
                placeholder="0"
                required
                className="w-full px-5 py-4 pr-16 border-2 border-transparent rounded-[14px] text-[19px] focus:outline-none focus:border-[#007AFF] transition-all bg-[#f5f5f7] text-[#1d1d1f] placeholder:text-[#86868b] focus:bg-white dark:bg-[#3a3a3c] dark:text-white dark:placeholder:text-[#98989d] dark:focus:bg-[#48484a]"
              />
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[17px] font-medium transition-colors duration-300 text-[#86868b] dark:text-[#98989d]">
                시간
              </span>
            </div>
            <p className="text-[13px] mt-2 transition-colors duration-300 text-[#86868b] dark:text-[#98989d]">
              💡 1시간 = 50 EXP
            </p>
          </div>

          {/* Exercise */}
          <div>
            <label className="flex items-center gap-2 text-[15px] font-medium mb-3 uppercase tracking-wide transition-colors duration-300 text-[#86868b] dark:text-[#98989d]">
              <Dumbbell className="w-4 h-4 text-[#34C759]" strokeWidth={2.5} />
              운동 시간
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.5"
                min="0"
                max="24"
                value={exercise}
                onChange={(e) => setExercise(e.target.value)}
                placeholder="0"
                required
                className="w-full px-5 py-4 pr-16 border-2 border-transparent rounded-[14px] text-[19px] focus:outline-none focus:border-[#34C759] transition-all bg-[#f5f5f7] text-[#1d1d1f] placeholder:text-[#86868b] focus:bg-white dark:bg-[#3a3a3c] dark:text-white dark:placeholder:text-[#98989d] dark:focus:bg-[#48484a]"
              />
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[17px] font-medium transition-colors duration-300 text-[#86868b] dark:text-[#98989d]">
                시간
              </span>
            </div>
            <p className="text-[13px] mt-2 transition-colors duration-300 text-[#86868b] dark:text-[#98989d]">
              💡 1시간 = 40 EXP
            </p>
          </div>

          {/* Spending */}
          <div>
            <label className="flex items-center gap-2 text-[15px] font-medium mb-3 uppercase tracking-wide transition-colors duration-300 text-[#86868b] dark:text-[#98989d]">
              <Wallet className="w-4 h-4 text-[#FF9500]" strokeWidth={2.5} />
              오늘의 소비
            </label>
            <div className="relative">
              <input
                type="number"
                step="1000"
                min="0"
                value={spending}
                onChange={(e) => setSpending(e.target.value)}
                placeholder="0"
                required
                className="w-full px-5 py-4 pr-16 border-2 border-transparent rounded-[14px] text-[19px] focus:outline-none focus:border-[#FF9500] transition-all bg-[#f5f5f7] text-[#1d1d1f] placeholder:text-[#86868b] focus:bg-white dark:bg-[#3a3a3c] dark:text-white dark:placeholder:text-[#98989d] dark:focus:bg-[#48484a]"
              />
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[17px] font-medium transition-colors duration-300 text-[#86868b] dark:text-[#98989d]">
                원
              </span>
            </div>
            <p className="text-[13px] mt-2 transition-colors duration-300 text-[#86868b] dark:text-[#98989d]">
              💡 3만원 미만: +30 EXP / 5만원 초과: -20 EXP
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-br from-[#007AFF] to-[#0051D5] text-white py-4 px-6 rounded-[14px] text-[19px] font-medium transition-all hover:shadow-lg hover:shadow-blue-500/25 active:scale-[0.98] mt-6 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" strokeWidth={2.5} />
            {existingData ? '수정하기' : '기록하기'}
          </button>
        </form>

        {/* Info */}
        <div className={`px-6 pb-6 pt-0`}>
          <div className="p-4 rounded-[16px] transition-colors duration-300 bg-[#007AFF]/5 border border-[#007AFF]/10 dark:bg-[#007AFF]/10 dark:border-[#007AFF]/20">
            <p className="text-[13px] leading-relaxed transition-colors duration-300 text-[#6e6e73] dark:text-[#98989d]">
              📊 매일의 기록으로 경험치를 얻고 캐릭터를 성장시키세요!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
