export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface Rule {
  id: string;
  title: string;
  question: string;
  section?: string;
}