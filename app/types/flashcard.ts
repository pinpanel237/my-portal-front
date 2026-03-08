export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  tags?: string[];
  isShared?: boolean;
  createdAt?: number;
  updatedAt?: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  provider: 'google' | 'facebook';
}
