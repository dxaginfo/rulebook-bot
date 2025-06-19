import React, { useState } from 'react';

interface RuleHistoryProps {
  ruleName: string;
}

interface HistoricalContext {
  [key: string]: {
    original: string;
    changes: { year: string; description: string }[];
    impact: string;
  };
}

const RuleHistory: React.FC<RuleHistoryProps> = ({ ruleName }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Mock historical data - in a real app this would come from an API
  const historicalContext: HistoricalContext = {
    'shot clock': {
      original: 'The shot clock was introduced in the 1954-55 NBA season, set at 24 seconds.',
      changes: [
        { 
          year: '1954', 
          description: 'Syracuse Nationals owner Danny Biasone proposed the 24-second shot clock to increase the pace of the game, which was implemented for the 1954-55 season.' 
        },
        { 
          year: '2018', 
          description: 'The shot clock reset rule was changed to 14 seconds after offensive rebounds, rather than 24 seconds.' 
        }
      ],
      impact: 'The shot clock revolutionized the game by increasing scoring and pace of play. Before its introduction, teams would often hold the ball for minutes at a time once they had a lead.'
    },
    'three-second rule': {
      original: 'The three-second rule has been part of basketball since the 1930s.',
      changes: [
        { 
          year: '1936', 
          description: 'The offensive three-second rule was formalized in basketball rules.' 
        },
        { 
          year: '2001', 
          description: 'The NBA introduced the defensive three-second rule to prevent zone defenses and open up the game.' 
        }
      ],
      impact: 'The defensive three-second rule in particular helped create more space for driving to the basket and prevented teams from packing the paint with defenders.'
    },
    'hand checking': {
      original: 'Hand checking was permitted in the NBA until the 1990s.',
      changes: [
        { 
          year: '1994', 
          description: 'Initial restrictions on hand checking were introduced.' 
        },
        { 
          year: '1999', 
          description: 'Further limitations were implemented.' 
        },
        { 
          year: '2004', 
          description: 'Hand checking was completely banned as part of rules changes to increase scoring and offensive flow.' 
        }
      ],
      impact: 'The elimination of hand checking revolutionized perimeter play, allowing for more freedom of movement for offensive players and contributing to the rise of guard-dominated play in the modern NBA.'
    }
  };

  const ruleData = historicalContext[ruleName.toLowerCase()];

  if (!ruleData) {
    return null;
  }

  return (
    <div className="mt-4 bg-gray-50 rounded-md p-3 text-sm">
      <div 
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-nba-blue font-medium">Historical Context</h3>
        <button className="text-gray-500">
          {isExpanded ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </button>
      </div>
      
      {isExpanded && (
        <div className="mt-2 space-y-2">
          <p>{ruleData.original}</p>
          
          {ruleData.changes.length > 0 && (
            <div className="mt-2">
              <h4 className="font-medium">Key Changes:</h4>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                {ruleData.changes.map((change, index) => (
                  <li key={index}>
                    <span className="font-medium">{change.year}:</span> {change.description}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="mt-2">
            <h4 className="font-medium">Impact:</h4>
            <p>{ruleData.impact}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RuleHistory;