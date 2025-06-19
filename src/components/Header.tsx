import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="mb-6 text-center">
      <div className="flex items-center justify-center mb-4">
        <div className="bg-nba-blue p-3 rounded-full mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-800">RuleBook Bot</h1>
      </div>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Your AI assistant for NBA rules and regulations. Ask me any question about game rules, officiating, or procedural guidelines.
      </p>
    </header>
  );
};

export default Header;