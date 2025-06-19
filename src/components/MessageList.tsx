import React from 'react';
import { Message } from '../types';

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  // Helper function to format rule references in messages
  const formatMessage = (text: string) => {
    // Regular expression to find rule references like "Rule 12-A" or "Section IV"
    const ruleRegex = /(Rule\s+[\d\w-]+|Section\s+[IVXLCDMivxlcdm]+)/g;
    
    // Split the text by rule references and create spans with styling
    const parts = text.split(ruleRegex);
    const matches = text.match(ruleRegex) || [];
    
    // Combine parts and matches
    const result = [];
    for (let i = 0; i < parts.length; i++) {
      // Add the regular text part
      if (parts[i]) {
        result.push(<span key={`part-${i}`}>{parts[i]}</span>);
      }
      
      // Add the rule reference with styling, if there is one
      if (i < matches.length) {
        result.push(
          <span key={`rule-${i}`} className="font-semibold text-nba-blue">
            {matches[i]}
          </span>
        );
      }
    }
    
    return result;
  };

  return (
    <div className="message-container">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
        >
          <div className="message-text">
            {message.sender === 'bot' ? formatMessage(message.text) : message.text}
          </div>
          <div className="text-xs mt-1 text-gray-400">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;