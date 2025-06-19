import React, { useState, useRef, useEffect } from 'react';
import MessageList from './components/MessageList';
import ChatInput from './components/ChatInput';
import Header from './components/Header';
import { Message } from './types';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Welcome to the NBA RuleBook Bot! I can answer questions about NBA rules and regulations. What would you like to know?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messageEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Add user message to the chat
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // In a real application, you would call your API here
      // For now, we'll simulate a response after a short delay
      setTimeout(() => {
        const botResponse = generateBotResponse(text);
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: botResponse,
          sender: 'bot',
          timestamp: new Date(),
        };
        
        setMessages((prev) => [...prev, botMessage]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error getting response:', error);
      setIsLoading(false);
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  // Simple rule-based responses for demo purposes
  // In a real application, this would be replaced with an API call to a language model
  const generateBotResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('travel') || lowerQuestion.includes('traveling')) {
      return 'A player who receives the ball while standing still may pivot, using either foot as the pivot foot. Once the pivot foot is established, it cannot be changed. A traveling violation occurs when a player holding the ball moves one or both feet illegally. You cannot take more than two steps without dribbling the ball.';
    }
    
    if (lowerQuestion.includes('double dribble')) {
      return 'Double dribble is a violation that occurs when a player dribbles the ball with both hands simultaneously or when a player picks up the dribble and then dribbles again without passing or shooting.';
    }
    
    if (lowerQuestion.includes('foul') || lowerQuestion.includes('personal foul')) {
      return 'A personal foul is illegal physical contact that occurs with an opponent. A player cannot push, hold, charge into, impede the progress of an opponent by extending an arm or shoulder, or use any rough tactics. Players are allowed 6 personal fouls in a game before fouling out.';
    }
    
    if (lowerQuestion.includes('technical foul')) {
      return 'A technical foul is a violation of the rules that does not involve physical contact during gameplay. It can be called for unsportsmanlike conduct, excessive complaining, delay of game, or various procedural issues. Players and coaches receive an automatic ejection upon receiving their second technical foul in a game.';
    }
    
    if (lowerQuestion.includes('shot clock')) {
      return 'The shot clock in the NBA is 24 seconds. Teams must attempt a shot that hits the rim before the shot clock expires, or they lose possession. The shot clock resets to 14 seconds in certain situations, such as offensive rebounds.';
    }
    
    if (lowerQuestion.includes('three seconds') || lowerQuestion.includes('3 seconds')) {
      return 'The three-second rule prohibits offensive players from remaining in the restricted area (the paint) for more than three consecutive seconds while their team has the ball. There is also a defensive three-second rule that prevents defenders from staying in the paint for more than three seconds unless they are actively guarding an opponent.';
    }
    
    if (lowerQuestion.includes('goaltend') || lowerQuestion.includes('goaltending')) {
      return 'Goaltending is touching the ball on its downward flight toward the basket, or after it has touched the backboard while the ball is above the rim level. This results in the basket being counted if committed by the defense, or a violation if committed by the offense.';
    }
    
    return "I don't have specific information about that rule in my knowledge base. For the most accurate and up-to-date information, please consult the official NBA rulebook or visit the NBA's official website.";
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Header />
      <div className="chat-container">
        <MessageList messages={messages} />
        <div ref={messageEndRef} />
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default App;