"use client";

import { useEffect, useState } from "react";
import { Header } from "../common/Header";
import { MyCards } from "./MyCard";

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  author?: string;
  sharedAt?: string;
}

export default function App() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [sharedFlashcards, setSharedFlashcards] = useState<Flashcard[]>([]);

  // Load data from localStorage
  useEffect(() => {
    const savedFlashcards = localStorage.getItem("flashcards");
    const savedSharedFlashcards = localStorage.getItem("sharedFlashcards");

    if (savedFlashcards) {
      setFlashcards(JSON.parse(savedFlashcards));
    }

    if (savedSharedFlashcards) {
      setSharedFlashcards(JSON.parse(savedSharedFlashcards));
    } else {
      const sampleShared: Flashcard[] = [
        {
          id: "shared-1",
          question:
            "React Hook useEffect의 의존성 배열이 비어있으면 어떻게 동작하나요?",
          answer: "컴포넌트가 마운트될 때 한 번만 실행됩니다.",
          author: "개발자김씨",
          sharedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        },
        {
          id: "shared-2",
          question: "JavaScript에서 == 와 === 의 차이는?",
          answer:
            "==는 값만 비교(타입 변환), ===는 값과 타입을 모두 비교합니다.",
          author: "코딩마스터",
          sharedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
        },
        {
          id: "shared-3",
          question: "CSS Flexbox에서 justify-content의 역할은?",
          answer: "주축(main axis) 방향으로 아이템들을 정렬합니다.",
          author: "UI디자이너",
          sharedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
        },
        {
          id: "shared-4",
          question: "Git에서 merge와 rebase의 차이는?",
          answer:
            "merge는 두 브랜치를 합치고 병합 커밋을 생성하고, rebase는 커밋 히스토리를 재작성하여 선형으로 만듭니다.",
          author: "버전관리Pro",
          sharedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
        },
        {
          id: "shared-5",
          question: "HTTP와 HTTPS의 차이점은?",
          answer: "HTTPS는 HTTP에 SSL/TLS 암호화가 추가된 프로토콜입니다.",
          author: "보안전문가",
          sharedAt: new Date(Date.now() - 86400000 * 7).toISOString(),
        },
      ];
      setSharedFlashcards(sampleShared);
    }
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem("flashcards", JSON.stringify(flashcards));
  }, [flashcards]);

  useEffect(() => {
    localStorage.setItem("sharedFlashcards", JSON.stringify(sharedFlashcards));
  }, [sharedFlashcards]);

  return (
    <div className="min-h-screen transition-colors duration-300 bg-[#f5f5f7] dark:bg-[#000000]">
      <Header />

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <MyCards flashcards={flashcards} setFlashcards={setFlashcards} />
      </div>
    </div>
  );
}
