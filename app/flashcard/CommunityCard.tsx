import { useState } from 'react';
import { Share2, Play, Download, Users } from 'lucide-react';
import { Flashcard } from './page';
import { StudyMode } from './StudyMode';

interface CommunityCardsProps {
  sharedFlashcards: Flashcard[];
  setSharedFlashcards: (flashcards: Flashcard[]) => void;
  flashcards: Flashcard[];
  setFlashcards: (flashcards: Flashcard[]) => void;
}

export function CommunityCards({ 
  sharedFlashcards, 
  setSharedFlashcards, 
  flashcards,
  setFlashcards,
}: CommunityCardsProps) {
  const [isStudyMode, setIsStudyMode] = useState(false);
  const [showShareForm, setShowShareForm] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [authorName, setAuthorName] = useState('');

  const handleShareCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim() || !authorName.trim()) return;

    const newSharedCard: Flashcard = {
      id: 'shared-' + Date.now().toString(),
      question: question.trim(),
      answer: answer.trim(),
      author: authorName.trim(),
      sharedAt: new Date().toISOString(),
    };

    setSharedFlashcards([newSharedCard, ...sharedFlashcards]);
    setQuestion('');
    setAnswer('');
    setAuthorName('');
    setShowShareForm(false);
  };

  const handleImportCard = (card: Flashcard) => {
    const importedCard: Flashcard = {
      id: crypto.randomUUID(),
      question: card.question,
      answer: card.answer,
    };
    setFlashcards([...flashcards, importedCard]);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return '오늘';
    if (diffDays === 1) return '어제';
    if (diffDays < 7) return `${diffDays}일 전`;
    return date.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' });
  };

  const startStudy = () => {
    if (sharedFlashcards.length === 0) return;
    setIsStudyMode(true);
  };

  if (isStudyMode) {
    return (
      <StudyMode 
        cards={sharedFlashcards} 
        onEnd={() => setIsStudyMode(false)} 
      />
    );
  }

  return (
    <>
      {/* Community Header */}
      <div className="rounded-[24px] shadow-lg border p-6 mb-6 transition-colors duration-300 bg-white border-[#d2d2d7] dark:bg-[#1c1c1e] dark:border-[#38383a]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-[28px] font-bold transition-colors duration-300 text-[#1d1d1f] dark:text-white">
              커뮤니티 카드
            </h2>
            <p className="text-[15px] mt-1 transition-colors duration-300 text-[#86868b] dark:text-[#98989d]">
              다른 사람들이 공유한 암기 카드
            </p>
          </div>
          <div className="text-right">
            <div className="text-[36px] font-bold transition-colors duration-300 text-[#1d1d1f] dark:text-white">
              {sharedFlashcards.length}
            </div>
            <div className="text-[13px] transition-colors duration-300 text-[#86868b] dark:text-[#98989d]">
              공유 카드
            </div>
          </div>
        </div>

        {sharedFlashcards.length > 0 && (
          <button
            onClick={startStudy}
            className="w-full bg-gradient-to-br from-[#34C759] to-[#30D158] text-white py-4 px-6 rounded-[16px] text-[19px] font-medium transition-all hover:shadow-lg hover:shadow-green-500/25 active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5" strokeWidth={2.5} fill="currentColor" />
            전체 학습 시작
          </button>
        )}
      </div>

      {/* Share Button */}
      <button
        onClick={() => setShowShareForm(true)}
        className="w-full py-4 px-6 rounded-[18px] text-[17px] font-medium mb-6 transition-all flex items-center justify-center gap-2 bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#e8e8ed] dark:bg-[#2c2c2e] dark:text-white dark:hover:bg-[#3a3a3c]"
      >
        <Share2 className="w-5 h-5" strokeWidth={2.5} />
        카드 공유하기
      </button>

      {/* Share Form */}
      {showShareForm && (
        <div className="rounded-[24px] shadow-lg border p-6 mb-6 transition-colors duration-300 bg-white border-[#d2d2d7] dark:bg-[#1c1c1e] dark:border-[#38383a]">
          <form onSubmit={handleShareCard} className="space-y-4">
            <div>
              <label className="text-[15px] font-medium mb-2 block transition-colors duration-300 text-[#86868b] dark:text-[#98989d]">
                작성자 이름
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="닉네임을 입력하세요"
                required
                className="w-full px-4 py-3 border-2 border-transparent rounded-[14px] text-[17px] focus:outline-none focus:border-[#FF9500] transition-all bg-[#f5f5f7] text-[#1d1d1f] placeholder:text-[#86868b] dark:bg-[#2c2c2e] dark:text-white dark:placeholder:text-[#98989d]"
              />
            </div>

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
                  setShowShareForm(false);
                  setQuestion('');
                  setAnswer('');
                  setAuthorName('');
                }}
                className="flex-1 py-3 px-4 rounded-[14px] text-[17px] font-medium transition-all bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#e8e8ed] dark:bg-[#2c2c2e] dark:text-white dark:hover:bg-[#3a3a3c]"
              >
                취소
              </button>
              <button
                type="submit"
                className="flex-1 bg-gradient-to-br from-[#34C759] to-[#30D158] text-white py-3 px-4 rounded-[14px] text-[17px] font-medium transition-all hover:shadow-lg hover:shadow-green-500/25"
              >
                공유하기
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Shared Cards List */}
      {sharedFlashcards.length > 0 ? (
        <div className="space-y-3">
          {sharedFlashcards.map((card) => (
            <div
              key={card.id}
              className="rounded-[18px] shadow-md border p-5 transition-colors duration-300 bg-white border-[#d2d2d7] dark:bg-[#1c1c1e] dark:border-[#38383a]"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-semibold bg-[#f5f5f7] text-[#1d1d1f] dark:bg-[#2c2c2e] dark:text-white">
                    {card.author?.[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="text-[15px] font-medium transition-colors duration-300 text-[#1d1d1f] dark:text-white">
                      {card.author}
                    </div>
                    <div className="text-[13px] transition-colors duration-300 text-[#86868b] dark:text-[#98989d]">
                      {card.sharedAt && formatDate(card.sharedAt)}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleImportCard(card)}
                  className="flex-shrink-0 px-4 py-2 rounded-[10px] text-[15px] font-medium transition-all flex items-center gap-2 bg-[#f5f5f7] text-[#007AFF] hover:bg-[#e8e8ed] dark:bg-[#2c2c2e] dark:text-[#0a84ff] dark:hover:bg-[#3a3a3c]"
                >
                  <Download className="w-4 h-4" strokeWidth={2.5} />
                  가져오기
                </button>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[17px] font-semibold mb-2 transition-colors duration-300 text-[#1d1d1f] dark:text-white">
                  {card.question}
                </div>
                <div className="text-[15px] transition-colors duration-300 text-[#86868b] dark:text-[#98989d]">
                  {card.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-[24px] shadow-lg border p-12 text-center transition-colors duration-300 bg-white border-[#d2d2d7] dark:bg-[#1c1c1e] dark:border-[#38383a]">
          <div className="w-20 h-20 mx-auto mb-6 rounded-[20px] flex items-center justify-center bg-[#f5f5f7] dark:bg-[#2c2c2e]">
            <Users className="w-10 h-10 transition-colors duration-300 text-[#86868b] dark:text-[#98989d]" strokeWidth={2} />
          </div>
          <p className="text-[21px] font-medium transition-colors duration-300 text-[#1d1d1f] dark:text-white">
            아직 공유된 카드가 없습니다
          </p>
        </div>
      )}
    </>
  );
}
