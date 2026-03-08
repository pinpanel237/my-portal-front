import { useState } from 'react';
import { Plus, Trash2, BookOpen, Play } from 'lucide-react';
import { Flashcard } from '../types/flashcard';
import { StudyMode } from '../common/StudyMode';

interface MyCardsProps {
  flashcards: Flashcard[];
  setFlashcards: (flashcards: Flashcard[]) => void;
}

export function MyCards({ flashcards, setFlashcards }: MyCardsProps) {
  const [isStudyMode, setIsStudyMode] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) return;

    const newCard: Flashcard = {
      id: Date.now().toString(),
      question: question.trim(),
      answer: answer.trim(),
    };

    setFlashcards([...flashcards, newCard]);
    setQuestion('');
    setAnswer('');
    setShowAddForm(false);
  };

  const handleDeleteCard = (id: string) => {
    setFlashcards(flashcards.filter(card => card.id !== id));
  };

  const startStudy = () => {
    if (flashcards.length === 0) return;
    setIsStudyMode(true);
  };

  if (isStudyMode) {
    return (
      <StudyMode 
        cards={flashcards} 
        onEnd={() => setIsStudyMode(false)} 
      />
    );
  }

  return (
    <>
      {/* Header */}
      <div className="rounded-[24px] shadow-lg border p-6 mb-6 transition-colors duration-300 bg-white border-[#d2d2d7] dark:bg-[#1c1c1e] dark:border-[#38383a]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-[28px] font-bold transition-colors duration-300 text-[#1d1d1f] dark:text-white">
              내 암기 카드
            </h2>
          </div>
          <div className="text-right">
            <div className="text-[36px] font-bold transition-colors duration-300 text-[#1d1d1f] dark:text-white">
              {flashcards.length}
            </div>
            <div className="text-[13px] transition-colors duration-300 text-[#86868b] dark:text-[#98989d]">
              개의 카드
            </div>
          </div>
        </div>

        {flashcards.length > 0 && (
          <button
            onClick={startStudy}
            className="w-full bg-gradient-to-br from-[#007AFF] to-[#0051D5] text-white py-4 px-6 rounded-[16px] text-[19px] font-medium transition-all hover:shadow-lg hover:shadow-blue-500/25 active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5" strokeWidth={2.5} fill="currentColor" />
            학습 시작
          </button>
        )}
      </div>

      {/* Add Card Button */}
      <button
        onClick={() => setShowAddForm(true)}
        className="w-full py-4 px-6 rounded-[18px] text-[17px] font-medium mb-6 transition-all flex items-center justify-center gap-2 bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#e8e8ed] dark:bg-[#2c2c2e] dark:text-white dark:hover:bg-[#3a3a3c]"
      >
        <Plus className="w-5 h-5" strokeWidth={2.5} />
        새 카드 추가
      </button>

      {/* Add Form */}
      {showAddForm && (
        <div className="rounded-[24px] shadow-lg border p-6 mb-6 transition-colors duration-300 bg-white border-[#d2d2d7] dark:bg-[#1c1c1e] dark:border-[#38383a]">
          <form onSubmit={handleAddCard} className="space-y-4">
            <div>
              <label className="text-[15px] font-medium mb-2 block transition-colors duration-300 text-[#86868b] dark:text-[#98989d]">
                질문
              </label>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="질문을 입력하세요"
                required
                rows={3}
                className="w-full px-4 py-3 border-2 border-transparent rounded-[14px] text-[17px] focus:outline-none focus:border-[#007AFF] transition-all resize-none bg-[#f5f5f7] text-[#1d1d1f] placeholder:text-[#86868b] dark:bg-[#2c2c2e] dark:text-white dark:placeholder:text-[#98989d]"
              />
            </div>

            <div>
              <label className="text-[15px] font-medium mb-2 block transition-colors duration-300 text-[#86868b] dark:text-[#98989d]">
                답변
              </label>
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="답변을 입력하세요"
                required
                rows={3}
                className="w-full px-4 py-3 border-2 border-transparent rounded-[14px] text-[17px] focus:outline-none focus:border-[#34C759] transition-all resize-none bg-[#f5f5f7] text-[#1d1d1f] placeholder:text-[#86868b] dark:bg-[#2c2c2e] dark:text-white dark:placeholder:text-[#98989d]"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setQuestion('');
                  setAnswer('');
                }}
                className="flex-1 py-3 px-4 rounded-[14px] text-[17px] font-medium transition-all bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#e8e8ed] dark:bg-[#2c2c2e] dark:text-white dark:hover:bg-[#3a3a3c]"
              >
                취소
              </button>
              <button
                type="submit"
                className="flex-1 bg-gradient-to-br from-[#007AFF] to-[#0051D5] text-white py-3 px-4 rounded-[14px] text-[17px] font-medium transition-all hover:shadow-lg hover:shadow-blue-500/25"
              >
                추가
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Card List */}
      {flashcards.length > 0 ? (
        <div className="space-y-3">
          {flashcards.map((card) => (
            <div
              key={card.id}
              className="rounded-[18px] shadow-md border p-5 transition-colors duration-300 bg-white border-[#d2d2d7] dark:bg-[#1c1c1e] dark:border-[#38383a]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="text-[17px] font-semibold mb-2 transition-colors duration-300 text-[#1d1d1f] dark:text-white">
                    {card.question}
                  </div>
                  <div className="text-[15px] transition-colors duration-300 text-[#86868b] dark:text-[#98989d]">
                    {card.answer}
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteCard(card.id)}
                  className="flex-shrink-0 w-9 h-9 rounded-full transition-all flex items-center justify-center hover:bg-[#f5f5f7] text-[#ff3b30] dark:hover:bg-[#2c2c2e] dark:text-[#ff453a]"
                >
                  <Trash2 className="w-4 h-4" strokeWidth={2.5} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-[24px] shadow-lg border p-12 text-center transition-colors duration-300 bg-white border-[#d2d2d7] dark:bg-[#1c1c1e] dark:border-[#38383a]">
          <div className="w-20 h-20 mx-auto mb-6 rounded-[20px] flex items-center justify-center bg-[#f5f5f7] dark:bg-[#2c2c2e]">
            <BookOpen className="w-10 h-10 transition-colors duration-300 text-[#86868b] dark:text-[#98989d]" strokeWidth={2} />
          </div>
          <p className="text-[21px] font-medium transition-colors duration-300 text-[#1d1d1f] dark:text-white">
            첫 번째 카드를 만들어보세요
          </p>
        </div>
      )}
    </>
  );
}
