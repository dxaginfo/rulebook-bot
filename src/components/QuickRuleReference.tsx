import React, { useState, useEffect } from 'react';
import RuleDetail from './RuleDetail';

interface QuickRuleReferenceProps {
  onRuleClick: (ruleText: string) => void;
}

interface Rule {
  id: string;
  title: string;
  description: string;
  category: string;
}

const commonRules: Rule[] = [
  {
    id: 'traveling',
    title: 'Traveling',
    description: 'A player who receives the ball while standing still may pivot, using either foot as the pivot foot. A traveling violation occurs when a player holding the ball moves one or both feet illegally.',
    category: 'Violations'
  },
  {
    id: 'shot-clock',
    title: 'Shot Clock',
    description: 'Teams must attempt a shot that hits the rim before the 24-second shot clock expires, or they lose possession. The shot clock resets to 14 seconds in certain situations.',
    category: 'Game Flow'
  },
  {
    id: 'personal-foul',
    title: 'Personal Foul',
    description: 'Illegal physical contact with an opponent. Players are allowed 6 personal fouls in a game before fouling out.',
    category: 'Fouls'
  },
  {
    id: 'three-second',
    title: 'Three-Second Rule',
    description: 'Offensive players cannot remain in the restricted area (the paint) for more than three consecutive seconds while their team has the ball.',
    category: 'Violations'
  },
  {
    id: 'goaltending',
    title: 'Goaltending',
    description: 'Touching the ball on its downward flight toward the basket, or after it has touched the backboard while the ball is above the rim level.',
    category: 'Violations'
  },
  {
    id: 'technical-foul',
    title: 'Technical Foul',
    description: 'A violation that does not involve physical contact during gameplay, often for unsportsmanlike conduct or procedural issues.',
    category: 'Fouls'
  },
  {
    id: 'backcourt-violation',
    title: 'Backcourt Violation',
    description: 'Once the offensive team gets the ball over the half-court line, they cannot bring it back across the line.',
    category: 'Violations'
  },
  {
    id: 'double-dribble',
    title: 'Double Dribble',
    description: 'Dribbling with both hands simultaneously or dribbling again after stopping without passing or shooting.',
    category: 'Violations'
  },
  {
    id: 'flagrant-foul',
    title: 'Flagrant Foul',
    description: 'Unnecessary and/or excessive contact committed by a player against an opponent.',
    category: 'Fouls'
  },
  {
    id: 'hand-checking',
    title: 'Hand Checking',
    description: 'Illegal contact with an opponent using the hand or forearm that impedes progress.',
    category: 'Fouls'
  },
  {
    id: 'illegal-screen',
    title: 'Illegal Screen',
    description: 'When an offensive player fails to establish a stationary position before contact or extends hips/legs/arms when setting a screen.',
    category: 'Fouls'
  },
  {
    id: 'kick-ball',
    title: 'Kick Ball',
    description: 'Intentionally kicking or striking the ball with any part of the leg or foot.',
    category: 'Violations'
  }
];

const QuickRuleReference: React.FC<QuickRuleReferenceProps> = ({ onRuleClick }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedRule, setSelectedRule] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const categories = [...new Set(commonRules.map(rule => rule.category))];
  
  // Filter rules by category and search term
  const filteredRules = commonRules
    .filter(rule => !selectedCategory || rule.category === selectedCategory)
    .filter(rule => 
      rule.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      rule.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleRuleClick = (rule: Rule) => {
    onRuleClick(`What is ${rule.title.toLowerCase()} in basketball?`);
  };

  const handleViewDetails = (ruleName: string) => {
    setSelectedRule(ruleName);
  };

  const handleCloseDetail = () => {
    setSelectedRule(null);
  };

  return (
    <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold mb-3">Quick Rule Reference</h3>
      
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search rules..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          className={`px-3 py-1 text-xs rounded-full transition-colors ${
            selectedCategory === null
              ? 'bg-nba-blue text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => setSelectedCategory(null)}
        >
          All
        </button>
        
        {categories.map(category => (
          <button
            key={category}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${
              selectedCategory === category
                ? 'bg-nba-blue text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {filteredRules.map(rule => (
          <div key={rule.id} className="flex">
            <button
              className="flex-grow text-left p-2 hover:bg-gray-100 rounded-l-md transition-colors border border-gray-200"
              onClick={() => handleRuleClick(rule)}
            >
              <h4 className="font-medium text-nba-blue">{rule.title}</h4>
              <p className="text-xs text-gray-600 truncate">{rule.description}</p>
            </button>
            <button
              className="px-2 py-2 bg-nba-blue text-white rounded-r-md hover:bg-blue-700 transition-colors"
              onClick={() => handleViewDetails(rule.title)}
              title="View rule details"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
        ))}
      </div>
      
      {selectedRule && (
        <RuleDetail 
          ruleName={selectedRule} 
          onClose={handleCloseDetail} 
        />
      )}
    </div>
  );
};

export default QuickRuleReference;