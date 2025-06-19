const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Load the NBA rulebook data
let nbaRules;
try {
  const rulesData = fs.readFileSync(path.join(__dirname, '../rules.json'), 'utf8');
  nbaRules = JSON.parse(rulesData);
} catch (error) {
  console.warn('Could not load rules.json, using fallback rules data');
  // Fallback to hardcoded data if the file doesn't exist
  nbaRules = {
    "traveling": "A player who receives the ball while standing still may pivot, using either foot as the pivot foot. Once established, the pivot foot may not be lifted before the ball is released on a pass or shot. If a player jumps with the ball, they must release it before landing. A traveling violation occurs when a player holding the ball moves one or both feet illegally.",
    
    "double dribble": "Double dribble is a violation that occurs when a player dribbles the ball with both hands simultaneously or when a player picks up the dribble and then dribbles again without passing or shooting.",
    
    "shot clock": "The shot clock in the NBA is 24 seconds. Teams must attempt a shot that hits the rim before the shot clock expires, or they lose possession. The shot clock resets to 14 seconds in certain situations, such as offensive rebounds.",
    
    "three-second rule": "The three-second rule prohibits offensive players from remaining in the restricted area (the paint) for more than three consecutive seconds while their team has the ball. There is also a defensive three-second rule that prevents defenders from staying in the paint for more than three seconds unless they are actively guarding an opponent.",
    
    "goaltending": "Goaltending is touching the ball on its downward flight toward the basket, or after it has touched the backboard while the ball is above the rim level. This results in the basket being counted if committed by the defense, or a violation if committed by the offense.",
    
    "personal foul": "A personal foul is illegal physical contact that occurs with an opponent. A player cannot push, hold, charge into, impede the progress of an opponent by extending an arm or shoulder, or use any rough tactics. Players are allowed 6 personal fouls in a game before fouling out.",
    
    "technical foul": "A technical foul is a violation of the rules that does not involve physical contact during gameplay. It can be called for unsportsmanlike conduct, excessive complaining, delay of game, or various procedural issues. Players and coaches receive an automatic ejection upon receiving their second technical foul in a game.",
    
    "flagrant foul": "A flagrant foul is unnecessary and/or excessive contact committed by a player against an opponent. Flagrant fouls are categorized as either Flagrant 1 (unnecessary contact) or Flagrant 2 (unnecessary and excessive contact), with the latter resulting in automatic ejection.",
    
    "clear path foul": "A clear path foul occurs when a defender fouls an offensive player who has a clear path to the basket without any defenders between them and the basket. This results in two free throws and possession of the ball."
  };
}

/**
 * Handle chat requests from the client
 */
exports.handleChat = async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Build a context from the NBA rules
    let context = "You are an AI assistant specializing in NBA rules. Use the following information to answer questions:\n\n";
    
    for (const [rule, description] of Object.entries(nbaRules)) {
      context += `${rule.toUpperCase()}: ${description}\n\n`;
    }
    
    context += "\nWhen referring to specific rules in your responses, format them in a way that emphasizes rule names. For example, you might say 'According to the SHOT CLOCK rule' or 'The TRAVELING violation states that...'.\n\n";
    context += "If you don't know the answer based on the provided information, politely state that you don't have that specific information and suggest consulting the official NBA rulebook.";

    // Call OpenAI API
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {"role": "system", "content": context},
          {"role": "user", "content": message}
        ],
        max_tokens: 500,
        temperature: 0.7,
      });

      const response = completion.choices[0].message.content;
      return res.json({ response });
    } catch (aiError) {
      console.error('OpenAI API error:', aiError);
      
      // Fallback to rule-based responses if AI service fails
      const response = generateLocalResponse(message, nbaRules);
      return res.json({ response });
    }

  } catch (error) {
    console.error('Error processing chat request:', error);
    return res.status(500).json({ error: 'Failed to process request' });
  }
};

/**
 * Generate a local response based on keywords in the message
 * This serves as a fallback if the OpenAI API is unavailable
 */
const generateLocalResponse = (message, rules) => {
  const lowerMessage = message.toLowerCase();
  
  // Check each rule to see if it's mentioned in the message
  for (const [rule, description] of Object.entries(rules)) {
    if (lowerMessage.includes(rule.toLowerCase())) {
      return description;
    }
  }
  
  // If no specific rule is found, return a generic response
  return "I don't have specific information about that rule in my knowledge base. For the most accurate and up-to-date information, please consult the official NBA rulebook or visit the NBA's official website.";
};