import React, { useState, useEffect } from 'react';
import RuleHistory from './RuleHistory';
import RuleIllustration from './RuleIllustration';

interface RuleDetailProps {
  ruleName: string;
  onClose: () => void;
}

interface Rule {
  id: string;
  name: string;
  description: string;
}

const RuleDetail: React.FC<RuleDetailProps> = ({ ruleName, onClose }) => {
  const [rule, setRule] = useState<Rule | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // In a real app, this would fetch from the API
  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    setError(null);
    
    // Mock API response
    setTimeout(() => {
      try {
        // This would be a fetch in a real app
        // fetch(`/api/rules/${ruleName.toLowerCase().replace(/\s+/g, '-')}`)
        
        // For demo purposes, just use the rule name to create a mock rule
        const mockRule = {
          id: ruleName.toLowerCase().replace(/\s+/g, '-'),
          name: ruleName,
          description: getDescriptionForRule(ruleName)
        };
        
        setRule(mockRule);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load rule details');
        setIsLoading(false);
      }
    }, 500);
  }, [ruleName]);

  // Get mock descriptions for rules
  const getDescriptionForRule = (name: string): string => {
    const descriptions: { [key: string]: string } = {
      'traveling': 'A player who receives the ball while standing still may pivot, using either foot as the pivot foot. Once established, the pivot foot may not be lifted before the ball is released on a pass or shot. If a player jumps with the ball, they must release it before landing. A traveling violation occurs when a player holding the ball moves one or both feet illegally.',
      
      'shot clock': 'The shot clock in the NBA is 24 seconds. Teams must attempt a shot that hits the rim before the shot clock expires, or they lose possession. The shot clock resets to 14 seconds in certain situations, such as offensive rebounds.',
      
      'three-second rule': 'The three-second rule prohibits offensive players from remaining in the restricted area (the paint) for more than three consecutive seconds while their team has the ball. There is also a defensive three-second rule that prevents defenders from staying in the paint for more than three seconds unless they are actively guarding an opponent.',
      
      'double dribble': 'Double dribble is a violation that occurs when a player dribbles the ball with both hands simultaneously or when a player picks up the dribble and then dribbles again without passing or shooting.',
      
      'personal foul': 'A personal foul is illegal physical contact that occurs with an opponent. A player cannot push, hold, charge into, impede the progress of an opponent by extending an arm or shoulder, or use any rough tactics. Players are allowed 6 personal fouls in a game before fouling out.'
    };
    
    return descriptions[name.toLowerCase()] || 
      'Detailed explanation for this rule is not available in the demo version.';
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="animate-pulse flex flex-col space-y-4">
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-red-600">Error</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p>{error}</p>
          <button 
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-nba-blue text-white rounded hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  if (!rule) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-nba-blue">{rule.name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="prose max-w-none">
          <p>{rule.description}</p>
          
          {/* Add the RuleIllustration component */}
          <RuleIllustration ruleName={rule.name} />
          
          {/* Add the RuleHistory component */}
          <RuleHistory ruleName={rule.name} />
        </div>
        
        <div className="mt-6 flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default RuleDetail;