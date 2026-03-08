"use client";

import { useEffect, useState } from "react";
import { Header } from "../common/Header";
import { MyCards } from "./MyCard";
import { Flashcard } from "../types/flashcard";

export default function App() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [sharedFlashcards, setSharedFlashcards] = useState<Flashcard[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

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
          createdAt: Date.now() - 86400000 * 2,
        },
        {
          id: "shared-2",
          question: "JavaScript에서 == 와 === 의 차이는?",
          answer:
            "==는 값만 비교(타입 변환), ===는 값과 타입을 모두 비교합니다.",
          createdAt: Date.now() - 86400000 * 5,
        },
        {
          id: "shared-3",
          question: "CSS Flexbox에서 justify-content의 역할은?",
          answer: "주축(main axis) 방향으로 아이템들을 정렬합니다.",
          createdAt: Date.now() - 86400000 * 1,
        },
      ];
      setSharedFlashcards(sampleShared);
    }
    setIsLoaded(true);
  }, []);

  // Save data to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("flashcards", JSON.stringify(flashcards));
    }
  }, [flashcards, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("sharedFlashcards", JSON.stringify(sharedFlashcards));
    }
  }, [sharedFlashcards, isLoaded]);

  return (
    <div className="min-h-screen transition-colors duration-300 bg-[#f5f5f7] dark:bg-[#000000]">
      <Header />

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <MyCards flashcards={flashcards} setFlashcards={setFlashcards} />
      </div>
    </div>
  );
}
