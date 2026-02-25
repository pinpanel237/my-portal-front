'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Header } from '../common/Header';
import { FlashcardStudy } from '../flashcard/page';
import { CharacterDisplay } from './CharacterDisplay';
import { Dashboard } from './Dashboard';
import { KPIInput } from './KPIInput';

export interface DailyKPI {
  date: string;
  study: number; // hours
  exercise: number; // hours
  spending: number; // amount
}

export interface CharacterStats {
  level: number;
  exp: number;
  expToNextLevel: number;
  evolutionStage: number; // 0-4 (알 -> 유아 -> 성장기 -> 성체 -> 완전체)
}

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  author?: string;
  sharedAt?: string;
}

export default function App() {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === 'dark';
  const [mainTab, setMainTab] = useState<'dashboard' | 'flashcard'>('dashboard');
  const [kpiData, setKpiData] = useState<DailyKPI[]>([]);
  const [characterStats, setCharacterStats] = useState<CharacterStats>({
    level: 1,
    exp: 0,
    expToNextLevel: 100,
    evolutionStage: 0,
  });
  const [showInput, setShowInput] = useState(false);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [sharedFlashcards, setSharedFlashcards] = useState<Flashcard[]>([]);
  const [studyStartTime, setStudyStartTime] = useState<number | null>(null);

  // Load data from localStorage
  useEffect(() => {
    const savedKPI = localStorage.getItem('kpiData');
    const savedCharacter = localStorage.getItem('characterStats');
    const savedFlashcards = localStorage.getItem('flashcards');
    const savedSharedFlashcards = localStorage.getItem('sharedFlashcards');
    
    if (savedKPI) {
      setKpiData(JSON.parse(savedKPI));
    }
    
    if (savedCharacter) {
      setCharacterStats(JSON.parse(savedCharacter));
    }

    if (savedFlashcards) {
      setFlashcards(JSON.parse(savedFlashcards));
    }

    if (savedSharedFlashcards) {
      setSharedFlashcards(JSON.parse(savedSharedFlashcards));
    } else {
      // Initialize with sample shared cards
      const sampleShared: Flashcard[] = [
        {
          id: 'shared-1',
          question: 'React Hook useEffect의 의존성 배열이 비어있으면 어떻게 동작하나요?',
          answer: '컴포넌트가 마운트될 때 한 번만 실행됩니다.',
          author: '개발자김씨',
          sharedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        },
        {
          id: 'shared-2',
          question: 'JavaScript에서 == 와 === 의 차이는?',
          answer: '==는 값만 비교(타입 변환), ===는 값과 타입을 모두 비교합니다.',
          author: '코딩마스터',
          sharedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
        },
        {
          id: 'shared-3',
          question: 'CSS Flexbox에서 justify-content의 역할은?',
          answer: '주축(main axis) 방향으로 아이템들을 정렬합니다.',
          author: 'UI디자이너',
          sharedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
        },
        {
          id: 'shared-4',
          question: 'Git에서 merge와 rebase의 차이는?',
          answer: 'merge는 두 브랜치를 합치고 병합 커밋을 생성하고, rebase는 커밋 히스토리를 재작성하여 선형으로 만듭니다.',
          author: '버전관리Pro',
          sharedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
        },
        {
          id: 'shared-5',
          question: 'HTTP와 HTTPS의 차이점은?',
          answer: 'HTTPS는 HTTP에 SSL/TLS 암호화가 추가된 프로토콜입니다.',
          author: '보안전문가',
          sharedAt: new Date(Date.now() - 86400000 * 7).toISOString(),
        },
      ];
      setSharedFlashcards(sampleShared);
    }
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('kpiData', JSON.stringify(kpiData));
  }, [kpiData]);

  useEffect(() => {
    localStorage.setItem('characterStats', JSON.stringify(characterStats));
  }, [characterStats]);

  useEffect(() => {
    localStorage.setItem('flashcards', JSON.stringify(flashcards));
  }, [flashcards]);

  useEffect(() => {
    localStorage.setItem('sharedFlashcards', JSON.stringify(sharedFlashcards));
  }, [sharedFlashcards]);

  const handleAddKPI = (study: number, exercise: number, spending: number) => {
    updateKPIData(study, exercise, spending);
    setShowInput(false);
  };

  const updateKPIData = (study: number, exercise: number, spending: number) => {
    const today = new Date().toISOString().split('T')[0];
    
    // Check if today's data already exists
    const existingIndex = kpiData.findIndex(k => k.date === today);
    
    let newKpiData: DailyKPI[];
    let previousStudy = 0;
    let previousExercise = 0;
    let previousSpending = 0;

    if (existingIndex >= 0) {
      // Save previous values
      previousStudy = kpiData[existingIndex].study;
      previousExercise = kpiData[existingIndex].exercise;
      previousSpending = kpiData[existingIndex].spending;
      
      // Update existing
      newKpiData = [...kpiData];
      newKpiData[existingIndex] = { date: today, study, exercise, spending };
    } else {
      // Add new
      newKpiData = [...kpiData, { date: today, study, exercise, spending }];
    }
    
    setKpiData(newKpiData);
    
    // Calculate EXP gain (only for the difference)
    const studyDiff = study - previousStudy;
    const exerciseDiff = exercise - previousExercise;
    const expGain = calculateExpGain(studyDiff, exerciseDiff, spending);
    addExperience(expGain);
  };

  const addStudyTime = (hours: number) => {
    const today = new Date().toISOString().split('T')[0];
    const todayData = kpiData.find(k => k.date === today);
    
    const newStudy = (todayData?.study || 0) + hours;
    const exercise = todayData?.exercise || 0;
    const spending = todayData?.spending || 0;
    
    updateKPIData(newStudy, exercise, spending);
  };

  const calculateExpGain = (study: number, exercise: number, spending: number): number => {
    // Study: 50 exp per hour
    // Exercise: 40 exp per hour
    // Spending control: bonus if spending < 30000 (30 exp), penalty if > 50000 (-20 exp)
    let exp = study * 50 + exercise * 40;
    
    if (spending > 0) {
      if (spending < 30000) {
        exp += 30;
      } else if (spending > 50000) {
        exp -= 20;
      }
    }
    
    return Math.max(exp, 0);
  };

  const addExperience = (exp: number) => {
    if (exp <= 0) return;
    
    setCharacterStats(prev => {
      let newExp = prev.exp + exp;
      let newLevel = prev.level;
      let newExpToNextLevel = prev.expToNextLevel;
      let newEvolutionStage = prev.evolutionStage;

      // Level up logic
      while (newExp >= newExpToNextLevel) {
        newExp -= newExpToNextLevel;
        newLevel++;
        newExpToNextLevel = Math.floor(newExpToNextLevel * 1.2);

        // Evolution stages based on level
        if (newLevel >= 50) newEvolutionStage = 4; // 완전체
        else if (newLevel >= 30) newEvolutionStage = 3; // 성체
        else if (newLevel >= 15) newEvolutionStage = 2; // 성장기
        else if (newLevel >= 5) newEvolutionStage = 1; // 유아
      }

      return {
        level: newLevel,
        exp: newExp,
        expToNextLevel: newExpToNextLevel,
        evolutionStage: newEvolutionStage,
      };
    });
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-[#1c1c1e] via-[#2c2c2e] to-[#1c1c1e]' 
        : 'bg-gradient-to-br from-[#f5f5f7] via-[#fafafa] to-[#e8e8ed]'
    }`}>
      <Header />

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">
        {mainTab === 'dashboard' ? (
          <>
            {/* Character Display */}
            <CharacterDisplay 
              characterStats={characterStats} 
              isDarkMode={isDarkMode}
              kpiData={kpiData}
            />

            {/* Dashboard */}
            <Dashboard 
              kpiData={kpiData} 
              isDarkMode={isDarkMode}
              onAddClick={() => setShowInput(true)}
            />
          </>
        ) : (
          <FlashcardStudy
            flashcards={flashcards}
            setFlashcards={setFlashcards}
            sharedFlashcards={sharedFlashcards}
            setSharedFlashcards={setSharedFlashcards}
            isDarkMode={isDarkMode}
            onStudyComplete={addStudyTime}
          />
        )}
      </div>

      {/* KPI Input Modal */}
      {showInput && (
        <KPIInput
          isDarkMode={isDarkMode}
          onSubmit={handleAddKPI}
          onClose={() => setShowInput(false)}
          existingData={kpiData.find(k => k.date === new Date().toISOString().split('T')[0])}
        />
      )}
    </div>
  );
}
