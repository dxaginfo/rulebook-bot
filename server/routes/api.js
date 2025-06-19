const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// Chat routes
router.post('/chat', chatController.handleChat);

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Rules endpoint - get available rules
router.get('/rules', (req, res) => {
  try {
    const fs = require('fs');
    const path = require('path');
    
    // Try to load the rules from the JSON file
    try {
      const rulesData = fs.readFileSync(path.join(__dirname, '../rules.json'), 'utf8');
      const rules = JSON.parse(rulesData);
      
      // Return just the rule names for the frontend
      const ruleNames = Object.keys(rules).map(rule => ({
        id: rule.toLowerCase().replace(/\s+/g, '-'),
        name: rule.charAt(0).toUpperCase() + rule.slice(1)
      }));
      
      return res.json({ rules: ruleNames });
    } catch (error) {
      console.error('Error reading rules file:', error);
      return res.status(500).json({ error: 'Could not retrieve rules' });
    }
  } catch (error) {
    console.error('Error in rules endpoint:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Get specific rule details
router.get('/rules/:ruleId', (req, res) => {
  try {
    const fs = require('fs');
    const path = require('path');
    const { ruleId } = req.params;
    
    // Try to load the rules from the JSON file
    try {
      const rulesData = fs.readFileSync(path.join(__dirname, '../rules.json'), 'utf8');
      const rules = JSON.parse(rulesData);
      
      // Convert the ruleId from kebab-case back to the format in the JSON
      const normalizedRuleId = ruleId.replace(/-/g, ' ');
      
      // Find the matching rule
      const ruleDescription = Object.entries(rules).find(
        ([key]) => key.toLowerCase() === normalizedRuleId
      );
      
      if (!ruleDescription) {
        return res.status(404).json({ error: 'Rule not found' });
      }
      
      return res.json({ 
        id: ruleId,
        name: ruleDescription[0],
        description: ruleDescription[1]
      });
    } catch (error) {
      console.error('Error reading rules file:', error);
      return res.status(500).json({ error: 'Could not retrieve rule' });
    }
  } catch (error) {
    console.error('Error in specific rule endpoint:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;