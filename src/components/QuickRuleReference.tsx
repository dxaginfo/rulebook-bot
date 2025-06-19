import React, { useState } from 'react';

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
  }
];

const QuickRuleReference: React.FC<{
  onRuleClick: (ruleText: string) => void;
}> = ({ onRuleClick }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const categories = [...new Set(commonRules.map(rule => rule.category))];
  
  const filteredRules = selectedCategory
    ? commonRules.filter(rule => rule.category === selectedCategory)
    : commonRules;

  return (
    <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold mb-3">Quick Rule Reference</h3>
      
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
          <button
            key={rule.id}
            className="text-left p-2 hover:bg-gray-100 rounded-md transition-colors"
            onClick={() => onRuleClick(`What is ${rule.title.toLowerCase()} in basketball?`)}
          >
            <h4 className="font-medium text-nba-blue">{rule.title}</h4>
            <p className="text-xs text-gray-600 truncate">{rule.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickRuleReference;