import { useState, useEffect } from 'react';

export const useTypingEffect = (text: string, speed: number = 100, delay: number = 0) => {
  const [displayText, setDisplayText] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let currentIndex = 0;

    const startTyping = () => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex));
        currentIndex++;
        timeoutId = setTimeout(startTyping, speed);
      } else {
        setIsCompleted(true);
      }
    };

    const initialDelayId = setTimeout(startTyping, delay);

    return () => {
      clearTimeout(initialDelayId);
      clearTimeout(timeoutId);
    };
  }, [text, speed, delay]);

  return { displayText, isCompleted };
};
