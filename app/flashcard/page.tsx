'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, BookOpen, Play, CheckCircle, Clock, Download, Share2, Users, User } from 'lucide-react';
import { Flashcard } from '../dashboard/page';

interface FlashcardStudyProps {
  flashcards: Flashcard[];
  setFlashcards: (flashcards: Flashcard[]) => void;
  sharedFlashcards: Flashcard[];
  setSharedFlashcards: (flashcards: Flashcard[]) => void;
  isDarkMode: boolean;
  onStudyComplete: (hours: number) => void;
}

export function FlashcardStudy({ 
  flashcards, 
  setFlashcards, 
  sharedFlashcards,
  setSharedFlashcards,
  isDarkMode, 
  onStudyComplete 
}: FlashcardStudyProps) {
  const [tab, setTab] = useState<'my' | 'community'>('my');
  const [isStudyMode, setIsStudyMode] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [studyStartTime, setStudyStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [studyingCards, setStudyingCards] = useState<Flashcard[]>([]);
  const [authorName, setAuthorName] = useState('');
  const [showShareForm, setShowShareForm] = useState(false);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isStudyMode && studyStartTime) {
      interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - studyStartTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isStudyMode, studyStartTime]);

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

  const handleDeleteCard = (id: string) => {
    setFlashcards(flashcards.filter(card => card.id !== id));
  };

  const handleImportCard = (card: Flashcard) => {
    // Create a new card without author and sharedAt
    const importedCard: Flashcard = {
      id: Date.now().toString() + Math.random(),
      question: card.question,
      answer: card.answer,
    };
    setFlashcards([...flashcards, importedCard]);
  };

  const startStudy = (cards: Flashcard[]) => {
    if (cards.length === 0) return;
    setStudyingCards(cards);
    setIsStudyMode(true);
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setStudyStartTime(Date.now());
    setElapsedTime(0);
  };

  const endStudy = () => {
    if (studyStartTime) {
      const totalSeconds = Math.floor((Date.now() - studyStartTime) / 1000);
      const hours = totalSeconds / 3600;
      onStudyComplete(parseFloat(hours.toFixed(2)));
    }
    setIsStudyMode(false);
    setStudyStartTime(null);
    setElapsedTime(0);
    setStudyingCards([]);
  };

  const nextCard = () => {
    if (currentCardIndex < studyingCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    } else {
      endStudy();
    }
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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

  if (isStudyMode && studyingCards.length > 0) {
    const currentCard = studyingCards[currentCardIndex];
    
    return (
      <div className="max-w-3xl mx-auto">
        {/* Study Header */}
        <div className={`backdrop-blur-xl rounded-[24px] shadow-xl border p-6 mb-6 transition-colors duration-300 ${
          isDarkMode
            ? 'bg-[#2c2c2e]/80 border-[#38383a]/30'
            : 'bg-white/80 border-[#d2d2d7]/30'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <div className={`text-[15px] mb-1 transition-colors duration-300 ${
                isDarkMode ? 'text-[#98989d]' : 'text-[#86868b]'
              }`}>
                진행 상황
              </div>
              <div className={`text-[24px] font-bold transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-[#1d1d1f]'
              }`}>
                {currentCardIndex + 1} / {studyingCards.length}
              </div>
            </div>
            
            <div className="text-right">
              <div className={`text-[15px] mb-1 flex items-center justify-end gap-2 transition-colors duration-300 ${
                isDarkMode ? 'text-[#98989d]' : 'text-[#86868b]'
              }`}>
                <Clock className="w-4 h-4" strokeWidth={2.5} />
                학습 시간
              </div>
              <div className={`text-[24px] font-bold font-mono transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-[#1d1d1f]'
              }`}>
                {formatTime(elapsedTime)}
              </div>
            </div>
          </div>
          
          <div className={`w-full h-2 rounded-full mt-4 overflow-hidden transition-colors duration-300 ${
            isDarkMode ? 'bg-[#3a3a3c]' : 'bg-[#e5e5ea]'
          }`}>
            <div 
              className="h-full bg-gradient-to-r from-[#007AFF] to-[#0051D5] transition-all duration-300 rounded-full"
              style={{ width: `${((currentCardIndex + 1) / studyingCards.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Flashcard */}
        <div 
          onClick={() => setIsFlipped(!isFlipped)}
          className={`backdrop-blur-xl rounded-[32px] shadow-2xl border p-12 mb-6 min-h-[400px] flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
            isDarkMode
              ? 'bg-[#2c2c2e]/80 border-[#38383a]/30'
              : 'bg-white/80 border-[#d2d2d7]/30'
          }`}
        >
          <div className={`text-[15px] font-medium mb-6 uppercase tracking-wide transition-colors duration-300 ${
            isDarkMode ? 'text-[#98989d]' : 'text-[#86868b]'
          }`}>
            {isFlipped ? '답변' : '질문'}
          </div>
          
          <div className={`text-[28px] md:text-[36px] font-semibold text-center leading-relaxed transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-[#1d1d1f]'
          }`}>
            {isFlipped ? currentCard.answer : currentCard.question}
          </div>

          {!isFlipped && (
            <div className={`mt-8 text-[15px] transition-colors duration-300 ${
              isDarkMode ? 'text-[#98989d]' : 'text-[#86868b]'
            }`}>
              💡 클릭하여 답변 확인
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={endStudy}
            className={`flex-1 py-4 px-6 rounded-[18px] text-[17px] font-medium transition-all ${
              isDarkMode
                ? 'bg-[#3a3a3c] text-white hover:bg-[#48484a]'
                : 'bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#e8e8ed]'
            }`}
          >
            학습 종료
          </button>
          
          <button
            onClick={nextCard}
            disabled={!isFlipped}
            className={`flex-1 py-4 px-6 rounded-[18px] text-[17px] font-medium transition-all flex items-center justify-center gap-2 ${
              isFlipped
                ? 'bg-gradient-to-br from-[#007AFF] to-[#0051D5] text-white hover:shadow-lg hover:shadow-blue-500/25'
                : isDarkMode
                ? 'bg-[#2c2c2e] text-[#98989d] cursor-not-allowed'
                : 'bg-[#e5e5ea] text-[#86868b] cursor-not-allowed'
            }`}
          >
            {currentCardIndex < studyingCards.length - 1 ? '다음 카드' : '학습 완료'}
            <CheckCircle className="w-5 h-5" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Tabs */}
      <div className={`backdrop-blur-xl rounded-[24px] shadow-xl border p-2 mb-6 transition-colors duration-300 ${
        isDarkMode
          ? 'bg-[#2c2c2e]/80 border-[#38383a]/30'
          : 'bg-white/80 border-[#d2d2d7]/30'
      }`}>
        <div className="flex gap-2">
          <button
            onClick={() => setTab('my')}
            className={`flex-1 py-3 px-6 rounded-[16px] text-[17px] font-medium transition-all flex items-center justify-center gap-2 ${
              tab === 'my'
                ? 'bg-[#007AFF] text-white'
                : isDarkMode
                ? 'text-[#98989d] hover:text-white hover:bg-[#3a3a3c]'
                : 'text-[#86868b] hover:text-[#1d1d1f] hover:bg-[#f5f5f7]'
            }`}
          >
            <User className="w-4 h-4" strokeWidth={2.5} />
            내 카드
          </button>
          <button
            onClick={() => setTab('community')}
            className={`flex-1 py-3 px-6 rounded-[16px] text-[17px] font-medium transition-all flex items-center justify-center gap-2 ${
              tab === 'community'
                ? 'bg-[#007AFF] text-white'
                : isDarkMode
                ? 'text-[#98989d] hover:text-white hover:bg-[#3a3a3c]'
                : 'text-[#86868b] hover:text-[#1d1d1f] hover:bg-[#f5f5f7]'
            }`}
          >
            <Users className="w-4 h-4" strokeWidth={2.5} />
            커뮤니티
          </button>
        </div>
      </div>

      {tab === 'my' ? (
        <>
          {/* Header */}
          <div className={`backdrop-blur-xl rounded-[24px] shadow-xl border p-6 mb-6 transition-colors duration-300 ${
            isDarkMode
              ? 'bg-[#2c2c2e]/80 border-[#38383a]/30'
              : 'bg-white/80 border-[#d2d2d7]/30'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className={`text-[28px] font-bold transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-[#1d1d1f]'
                }`}>
                  내 암기 카드
                </h2>
                <p className={`text-[15px] mt-1 transition-colors duration-300 ${
                  isDarkMode ? 'text-[#98989d]' : 'text-[#86868b]'
                }`}>
                  학습 시간이 자동으로 공부 시간에 추가됩니다
                </p>
              </div>
              <div className={`text-right`}>
                <div className={`text-[36px] font-bold transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-[#1d1d1f]'
                }`}>
                  {flashcards.length}
                </div>
                <div className={`text-[13px] transition-colors duration-300 ${
                  isDarkMode ? 'text-[#98989d]' : 'text-[#86868b]'
                }`}>
                  개의 카드
                </div>
              </div>
            </div>

            {flashcards.length > 0 && (
              <button
                onClick={() => startStudy(flashcards)}
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
            className={`w-full py-4 px-6 rounded-[18px] text-[17px] font-medium mb-6 transition-all flex items-center justify-center gap-2 ${
              isDarkMode
                ? 'bg-[#3a3a3c] text-white hover:bg-[#48484a]'
                : 'bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#e8e8ed]'
            }`}
          >
            <Plus className="w-5 h-5" strokeWidth={2.5} />
            새 카드 추가
          </button>

          {/* Add Form */}
          {showAddForm && (
            <div className={`backdrop-blur-xl rounded-[24px] shadow-xl border p-6 mb-6 transition-colors duration-300 ${
              isDarkMode
                ? 'bg-[#2c2c2e]/80 border-[#38383a]/30'
                : 'bg-white/80 border-[#d2d2d7]/30'
            }`}>
              <form onSubmit={handleAddCard} className="space-y-4">
                <div>
                  <label className={`text-[15px] font-medium mb-2 block transition-colors duration-300 ${
                    isDarkMode ? 'text-[#98989d]' : 'text-[#86868b]'
                  }`}>
                    질문
                  </label>
                  <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="질문을 입력하세요"
                    required
                    rows={3}
                    className={`w-full px-4 py-3 border-2 border-transparent rounded-[14px] text-[17px] focus:outline-none focus:border-[#007AFF] transition-all resize-none ${
                      isDarkMode 
                        ? 'bg-[#3a3a3c] text-white placeholder:text-[#98989d]' 
                        : 'bg-[#f5f5f7] text-[#1d1d1f] placeholder:text-[#86868b]'
                    }`}
                  />
                </div>

                <div>
                  <label className={`text-[15px] font-medium mb-2 block transition-colors duration-300 ${
                    isDarkMode ? 'text-[#98989d]' : 'text-[#86868b]'
                  }`}>
                    답변
                  </label>
                  <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="답변을 입력하세요"
                    required
                    rows={3}
                    className={`w-full px-4 py-3 border-2 border-transparent rounded-[14px] text-[17px] focus:outline-none focus:border-[#34C759] transition-all resize-none ${
                      isDarkMode 
                        ? 'bg-[#3a3a3c] text-white placeholder:text-[#98989d]' 
                        : 'bg-[#f5f5f7] text-[#1d1d1f] placeholder:text-[#86868b]'
                    }`}
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
                    className={`flex-1 py-3 px-4 rounded-[14px] text-[17px] font-medium transition-all ${
                      isDarkMode
                        ? 'bg-[#3a3a3c] text-white hover:bg-[#48484a]'
                        : 'bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#e8e8ed]'
                    }`}
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
                  className={`backdrop-blur-xl rounded-[18px] shadow-lg border p-5 transition-colors duration-300 ${
                    isDarkMode
                      ? 'bg-[#2c2c2e]/80 border-[#38383a]/30'
                      : 'bg-white/80 border-[#d2d2d7]/30'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className={`text-[17px] font-semibold mb-2 transition-colors duration-300 ${
                        isDarkMode ? 'text-white' : 'text-[#1d1d1f]'
                      }`}>
                        {card.question}
                      </div>
                      <div className={`text-[15px] transition-colors duration-300 ${
                        isDarkMode ? 'text-[#98989d]' : 'text-[#86868b]'
                      }`}>
                        {card.answer}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteCard(card.id)}
                      className={`flex-shrink-0 w-9 h-9 rounded-full transition-all flex items-center justify-center ${
                        isDarkMode
                          ? 'hover:bg-[#3a3a3c] text-[#ff453a]'
                          : 'hover:bg-[#f5f5f7] text-[#ff3b30]'
                      }`}
                    >
                      <Trash2 className="w-4 h-4" strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={`backdrop-blur-xl rounded-[24px] shadow-xl border p-12 text-center transition-colors duration-300 ${
              isDarkMode
                ? 'bg-[#2c2c2e]/80 border-[#38383a]/30'
                : 'bg-white/80 border-[#d2d2d7]/30'
            }`}>
              <div className={`w-20 h-20 mx-auto mb-6 rounded-[20px] bg-gradient-to-br flex items-center justify-center ${
                isDarkMode ? 'from-[#2c2c2e] to-[#3a3a3c]' : 'from-[#f5f5f7] to-[#e8e8ed]'
              }`}>
                <BookOpen className={`w-10 h-10 transition-colors duration-300 ${
                  isDarkMode ? 'text-[#98989d]' : 'text-[#86868b]'
                }`} strokeWidth={2} />
              </div>
              <p className={`text-[21px] font-medium mb-2 transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-[#1d1d1f]'
              }`}>
                첫 번째 카드를 만들어보세요
              </p>
              <p className={`text-[17px] transition-colors duration-300 ${
                isDarkMode ? 'text-[#98989d]' : 'text-[#86868b]'
              }`}>
                학습한 시간이 자동으로 기록됩니다
              </p>
            </div>
          )}
        </>
      ) : (
        <>
          {/* Community Header */}
          <div className={`backdrop-blur-xl rounded-[24px] shadow-xl border p-6 mb-6 transition-colors duration-300 ${
            isDarkMode
              ? 'bg-[#2c2c2e]/80 border-[#38383a]/30'
              : 'bg-white/80 border-[#d2d2d7]/30'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className={`text-[28px] font-bold transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-[#1d1d1f]'
                }`}>
                  커뮤니티 카드
                </h2>
                <p className={`text-[15px] mt-1 transition-colors duration-300 ${
                  isDarkMode ? 'text-[#98989d]' : 'text-[#86868b]'
                }`}>
                  다른 사람들이 공유한 암기 카드
                </p>
              </div>
              <div className={`text-right`}>
                <div className={`text-[36px] font-bold transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-[#1d1d1f]'
                }`}>
                  {sharedFlashcards.length}
                </div>
                <div className={`text-[13px] transition-colors duration-300 ${
                  isDarkMode ? 'text-[#98989d]' : 'text-[#86868b]'
                }`}>
                  공유 카드
                </div>
              </div>
            </div>

            {sharedFlashcards.length > 0 && (
              <button
                onClick={() => startStudy(sharedFlashcards)}
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
            className={`w-full py-4 px-6 rounded-[18px] text-[17px] font-medium mb-6 transition-all flex items-center justify-center gap-2 ${
              isDarkMode
                ? 'bg-[#3a3a3c] text-white hover:bg-[#48484a]'
                : 'bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#e8e8ed]'
            }`}
          >
            <Share2 className="w-5 h-5" strokeWidth={2.5} />
            카드 공유하기
          </button>

          {/* Share Form */}
          {showShareForm && (
            <div className={`backdrop-blur-xl rounded-[24px] shadow-xl border p-6 mb-6 transition-colors duration-300 ${
              isDarkMode
                ? 'bg-[#2c2c2e]/80 border-[#38383a]/30'
                : 'bg-white/80 border-[#d2d2d7]/30'
            }`}>
              <form onSubmit={handleShareCard} className="space-y-4">
                <div>
                  <label className={`text-[15px] font-medium mb-2 block transition-colors duration-300 ${
                    isDarkMode ? 'text-[#98989d]' : 'text-[#86868b]'
                  }`}>
                    작성자 이름
                  </label>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="닉네임을 입력하세요"
                    required
                    className={`w-full px-4 py-3 border-2 border-transparent rounded-[14px] text-[17px] focus:outline-none focus:border-[#FF9500] transition-all ${
                      isDarkMode 
                        ? 'bg-[#3a3a3c] text-white placeholder:text-[#98989d]' 
                        : 'bg-[#f5f5f7] text-[#1d1d1f] placeholder:text-[#86868b]'
                    }`}
                  />
                </div>

                <div>
                  <label className={`text-[15px] font-medium mb-2 block transition-colors duration-300 ${
                    isDarkMode ? 'text-[#98989d]' : 'text-[#86868b]'
                  }`}>
                    질문
                  </label>
                  <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="질문을 입력하세요"
                    required
                    rows={3}
                    className={`w-full px-4 py-3 border-2 border-transparent rounded-[14px] text-[17px] focus:outline-none focus:border-[#007AFF] transition-all resize-none ${
                      isDarkMode 
                        ? 'bg-[#3a3a3c] text-white placeholder:text-[#98989d]' 
                        : 'bg-[#f5f5f7] text-[#1d1d1f] placeholder:text-[#86868b]'
                    }`}
                  />
                </div>

                <div>
                  <label className={`text-[15px] font-medium mb-2 block transition-colors duration-300 ${
                    isDarkMode ? 'text-[#98989d]' : 'text-[#86868b]'
                  }`}>
                    답변
                  </label>
                  <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="답변을 입력하세요"
                    required
                    rows={3}
                    className={`w-full px-4 py-3 border-2 border-transparent rounded-[14px] text-[17px] focus:outline-none focus:border-[#34C759] transition-all resize-none ${
                      isDarkMode 
                        ? 'bg-[#3a3a3c] text-white placeholder:text-[#98989d]' 
                        : 'bg-[#f5f5f7] text-[#1d1d1f] placeholder:text-[#86868b]'
                    }`}
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
                    className={`flex-1 py-3 px-4 rounded-[14px] text-[17px] font-medium transition-all ${
                      isDarkMode
                        ? 'bg-[#3a3a3c] text-white hover:bg-[#48484a]'
                        : 'bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#e8e8ed]'
                    }`}
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
                  className={`backdrop-blur-xl rounded-[18px] shadow-lg border p-5 transition-colors duration-300 ${
                    isDarkMode
                      ? 'bg-[#2c2c2e]/80 border-[#38383a]/30'
                      : 'bg-white/80 border-[#d2d2d7]/30'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-semibold ${
                        isDarkMode ? 'bg-[#3a3a3c] text-white' : 'bg-[#f5f5f7] text-[#1d1d1f]'
                      }`}>
                        {card.author?.[0].toUpperCase()}
                      </div>
                      <div>
                        <div className={`text-[15px] font-medium transition-colors duration-300 ${
                          isDarkMode ? 'text-white' : 'text-[#1d1d1f]'
                        }`}>
                          {card.author}
                        </div>
                        <div className={`text-[13px] transition-colors duration-300 ${
                          isDarkMode ? 'text-[#98989d]' : 'text-[#86868b]'
                        }`}>
                          {card.sharedAt && formatDate(card.sharedAt)}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleImportCard(card)}
                      className={`flex-shrink-0 px-4 py-2 rounded-[10px] text-[15px] font-medium transition-all flex items-center gap-2 ${
                        isDarkMode
                          ? 'bg-[#007AFF]/20 text-[#007AFF] hover:bg-[#007AFF]/30'
                          : 'bg-[#007AFF]/10 text-[#007AFF] hover:bg-[#007AFF]/20'
                      }`}
                    >
                      <Download className="w-4 h-4" strokeWidth={2.5} />
                      가져오기
                    </button>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className={`text-[17px] font-semibold mb-2 transition-colors duration-300 ${
                      isDarkMode ? 'text-white' : 'text-[#1d1d1f]'
                    }`}>
                      {card.question}
                    </div>
                    <div className={`text-[15px] transition-colors duration-300 ${
                      isDarkMode ? 'text-[#98989d]' : 'text-[#86868b]'
                    }`}>
                      {card.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={`backdrop-blur-xl rounded-[24px] shadow-xl border p-12 text-center transition-colors duration-300 ${
              isDarkMode
                ? 'bg-[#2c2c2e]/80 border-[#38383a]/30'
                : 'bg-white/80 border-[#d2d2d7]/30'
            }`}>
              <div className={`w-20 h-20 mx-auto mb-6 rounded-[20px] bg-gradient-to-br flex items-center justify-center ${
                isDarkMode ? 'from-[#2c2c2e] to-[#3a3a3c]' : 'from-[#f5f5f7] to-[#e8e8ed]'
              }`}>
                <Users className={`w-10 h-10 transition-colors duration-300 ${
                  isDarkMode ? 'text-[#98989d]' : 'text-[#86868b]'
                }`} strokeWidth={2} />
              </div>
              <p className={`text-[21px] font-medium mb-2 transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-[#1d1d1f]'
              }`}>
                아직 공유된 카드가 없습니다
              </p>
              <p className={`text-[17px] transition-colors duration-300 ${
                isDarkMode ? 'text-[#98989d]' : 'text-[#86868b]'
              }`}>
                첫 번째 카드를 공유해보세요
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
