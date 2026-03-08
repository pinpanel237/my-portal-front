import { useState, useEffect, useRef } from 'react';
import { CheckCircle, Clock, Trophy, ChevronLeft } from 'lucide-react';
import { Flashcard } from '../types/flashcard';
import confetti from 'canvas-confetti';

interface StudyModeProps {
  cards: Flashcard[];
  onEnd: () => void;
}

export function StudyMode({ cards, onEnd }: StudyModeProps) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [studyStartTime] = useState(() => Date.now());
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const confettiFiredRef = useRef(false);

  // Timer effect
  useEffect(() => {
    if (isCompleted) return;
    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - studyStartTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [studyStartTime, isCompleted]);

  // Confetti on completion
  useEffect(() => {
    if (!isCompleted || confettiFiredRef.current) return;
    confettiFiredRef.current = true;

    const fire = (particleRatio: number, opts: confetti.Options) => {
      confetti({ origin: { y: 0.6 }, ...opts, particleCount: Math.floor(200 * particleRatio) });
    };
    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  }, [isCompleted]);

  const nextCard = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    } else {
      setIsCompleted(true);
    }
  };

  const prevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false);
    }
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (cards.length === 0) return null;

  const currentCard = cards[currentCardIndex];

  if (isCompleted) {
    return (
      <div className="max-w-3xl mx-auto flex flex-col items-center justify-center py-16 text-center">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#34C759] to-[#30D158] flex items-center justify-center mb-6 shadow-xl shadow-green-500/30">
          <Trophy className="w-12 h-12 text-white" strokeWidth={2} />
        </div>
        <h2 className="text-[32px] font-bold mb-3 text-[#1d1d1f] dark:text-white">
          학습 완료! 🎉
        </h2>
        <p className="text-[17px] text-[#86868b] dark:text-[#98989d] mb-2">
          {cards.length}개 카드를 모두 학습했습니다.
        </p>
        <p className="text-[17px] text-[#86868b] dark:text-[#98989d] mb-10">
          소요 시간: <span className="font-mono font-semibold text-[#1d1d1f] dark:text-white">{formatTime(elapsedTime)}</span>
        </p>
        <button
          onClick={onEnd}
          className="px-10 py-4 rounded-[18px] text-[17px] font-medium bg-gradient-to-br from-[#007AFF] to-[#0051D5] text-white hover:shadow-lg hover:shadow-blue-500/25 transition-all active:scale-[0.98]"
        >
          돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Study Header */}
      <div className="rounded-[24px] shadow-lg border p-6 mb-6 transition-colors duration-300 bg-white border-[#d2d2d7] dark:bg-[#1c1c1e] dark:border-[#38383a]">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[15px] mb-1 transition-colors duration-300 text-[#86868b] dark:text-[#98989d]">
              진행 상황
            </div>
            <div className="text-[24px] font-bold transition-colors duration-300 text-[#1d1d1f] dark:text-white">
              {currentCardIndex + 1} / {cards.length}
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-[15px] mb-1 flex items-center justify-end gap-2 transition-colors duration-300 text-[#86868b] dark:text-[#98989d]">
              <Clock className="w-4 h-4" strokeWidth={2.5} />
              학습 시간
            </div>
            <div className="text-[24px] font-bold font-mono transition-colors duration-300 text-[#1d1d1f] dark:text-white">
              {formatTime(elapsedTime)}
            </div>
          </div>
        </div>
        
        <div className="w-full h-2 rounded-full mt-4 overflow-hidden transition-colors duration-300 bg-[#e5e5ea] dark:bg-[#3a3a3c]">
          <div 
            className="h-full bg-gradient-to-r from-[#007AFF] to-[#0051D5] transition-all duration-300 rounded-full"
            style={{ width: `${((currentCardIndex + 1) / cards.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Flashcard */}
      <div 
        onClick={() => setIsFlipped(!isFlipped)}
        className="rounded-[32px] shadow-2xl border p-12 mb-6 min-h-[400px] flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:scale-[1.02] bg-white border-[#d2d2d7] dark:bg-[#1c1c1e] dark:border-[#38383a]"
      >
        <div className="text-[15px] font-medium mb-6 uppercase tracking-wide transition-colors duration-300 text-[#86868b] dark:text-[#98989d]">
          {isFlipped ? '답변' : '질문'}
        </div>
        
        <div className="text-[28px] md:text-[36px] font-semibold text-center leading-relaxed transition-colors duration-300 text-[#1d1d1f] dark:text-white">
          {isFlipped ? currentCard.answer : currentCard.question}
        </div>

        {!isFlipped && (
          <div className="mt-8 text-[15px] transition-colors duration-300 text-[#86868b] dark:text-[#98989d]">
            💡 클릭하여 답변 확인
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-4 mt-12">
        <button
          onClick={onEnd}
          className="flex-1 py-4 px-6 rounded-[18px] text-[17px] font-medium transition-all bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#e8e8ed] dark:bg-[#2c2c2e] dark:text-white dark:hover:bg-[#3a3a3c]"
        >
          학습 종료
        </button>

        <div className="flex-[2] flex gap-4">
          <button
            onClick={prevCard}
            disabled={currentCardIndex === 0}
            className={`flex-1 py-4 px-6 rounded-[18px] text-[17px] font-medium transition-all flex items-center justify-center gap-2 ${
              currentCardIndex > 0
                ? 'bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#e8e8ed] dark:bg-[#2c2c2e] dark:text-white dark:hover:bg-[#3a3a3c]'
                : 'bg-[#e5e5ea] text-[#86868b] cursor-not-allowed dark:bg-[#2c2c2e] dark:text-[#48484a] opacity-50'
            }`}
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
            이전
          </button>
          
          <button
            onClick={nextCard}
            disabled={!isFlipped}
            className={`flex-[1.5] py-4 px-6 rounded-[18px] text-[17px] font-medium transition-all flex items-center justify-center gap-2 ${
              isFlipped
                ? 'bg-gradient-to-br from-[#007AFF] to-[#0051D5] text-white hover:shadow-lg hover:shadow-blue-500/25'
                : 'bg-[#e5e5ea] text-[#86868b] cursor-not-allowed dark:bg-[#2c2c2e] dark:text-[#48484a]'
            }`}
          >
            {currentCardIndex < cards.length - 1 ? '다음 카드' : '학습 완료'}
            <CheckCircle className="w-5 h-5" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
