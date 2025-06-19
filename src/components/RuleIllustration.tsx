import React from 'react';

interface RuleIllustrationProps {
  ruleName: string;
}

const RuleIllustration: React.FC<RuleIllustrationProps> = ({ ruleName }) => {
  // Map rule names to their diagrams
  const ruleIllustrations: { [key: string]: { src: string; alt: string; caption: string } } = {
    'traveling': {
      src: '/illustrations/traveling.svg',
      alt: 'Basketball player committing a traveling violation',
      caption: 'Traveling violation occurs when a player takes more than two steps without dribbling'
    },
    'shot clock': {
      src: '/illustrations/shot-clock.svg',
      alt: 'Shot clock illustration',
      caption: '24-second shot clock counting down'
    },
    'three-second rule': {
      src: '/illustrations/three-second-rule.svg',
      alt: 'Basketball court showing the restricted area',
      caption: 'Player standing in the restricted area (paint) for more than three seconds'
    },
    'restricted area': {
      src: '/illustrations/restricted-area.svg',
      alt: 'Basketball court showing the restricted area arc',
      caption: 'The restricted area arc under the basket where defenders cannot take charges'
    }
  };

  const illustration = ruleIllustrations[ruleName.toLowerCase()];

  // If no illustration is available for this rule, return null
  if (!illustration) {
    return null;
  }

  // In a real app, we'd use actual SVG illustrations
  // Here we'll just mock them with a placeholder
  return (
    <div className="mt-4 border border-gray-200 rounded-md overflow-hidden">
      <div className="bg-gray-100 aspect-video flex items-center justify-center">
        <div className="text-center p-4">
          <svg 
            className="mx-auto h-20 w-20 text-gray-400" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
            />
          </svg>
          <p className="mt-2 text-sm text-gray-500">
            Illustration for: {ruleName}
          </p>
          <p className="mt-1 text-xs text-gray-400">
            (Visual example would be shown here in production)
          </p>
        </div>
      </div>
      <div className="p-2 bg-white">
        <p className="text-xs text-center text-gray-600">{illustration.caption}</p>
      </div>
    </div>
  );
};

export default RuleIllustration;