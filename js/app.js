// RuleBook Bot - Main Application Logic

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const questionForm = document.getElementById('question-form');
    const questionInput = document.getElementById('question-input');
    const chatHistory = document.getElementById('chat-history');
    const loadingIndicator = document.getElementById('loading-indicator');
    const ruleExplanationCard = document.getElementById('rule-explanation-card');
    const ruleTitle = document.getElementById('rule-title');
    const ruleSection = document.getElementById('rule-section');
    const rulePage = document.getElementById('rule-page');
    const ruleContent = document.getElementById('rule-content');
    const relatedRules = document.getElementById('related-rules');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const questionButtons = document.querySelectorAll('.question-btn');

    // Chat history storage
    let conversationHistory = [];

    // Initialize the application
    initApp();

    /**
     * Initialize the application and set up event listeners
     */
    function initApp() {
        // Set up event listeners
        questionForm.addEventListener('submit', handleQuestionSubmit);
        
        // Category button listeners
        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.getAttribute('data-category');
                showRulesByCategory(category);
                
                // Update active button styling
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });

        // Common question button listeners
        questionButtons.forEach(button => {
            button.addEventListener('click', () => {
                const question = button.textContent;
                questionInput.value = question;
                handleQuestionSubmit(new Event('submit'));
            });
        });
    }

    /**
     * Handle form submission of a new question
     * @param {Event} e - The form submit event
     */
    function handleQuestionSubmit(e) {
        e.preventDefault();
        const question = questionInput.value.trim();
        
        if (!question) return;
        
        // Add user question to chat
        addMessageToChat('user', question);
        questionInput.value = '';
        
        // Show loading indicator
        loadingIndicator.classList.remove('hidden');
        
        // Add to conversation history
        conversationHistory.push({ role: 'user', content: question });
        
        // Process the question (with a slight delay to simulate processing)
        setTimeout(() => {
            processQuestion(question);
        }, 1000);
    }

    /**
     * Process a user question and generate a response
     * @param {string} question - The user's question
     */
    function processQuestion(question) {
        // Search the rules data for relevant information
        const searchResults = searchRules(question);
        
        if (searchResults.length > 0) {
            // Generate response based on the most relevant rule
            const topResult = searchResults[0];
            const response = generateResponse(question, topResult, searchResults);
            
            // Add bot response to chat
            addMessageToChat('bot', response);
            
            // Add to conversation history
            conversationHistory.push({ role: 'assistant', content: response });
            
            // Show the rule card with detailed information
            displayRuleCard(topResult, searchResults);
        } else {
            // No relevant rules found
            const fallbackResponse = "I couldn't find specific rules about that in my database. Could you try rephrasing your question or ask about a different aspect of NBA rules?";
            
            // Add bot response to chat
            addMessageToChat('bot', fallbackResponse);
            
            // Add to conversation history
            conversationHistory.push({ role: 'assistant', content: fallbackResponse });
            
            // Hide rule card if no results
            ruleExplanationCard.classList.add('hidden');
        }
        
        // Hide loading indicator
        loadingIndicator.classList.add('hidden');
        
        // Scroll chat to bottom
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }

    /**
     * Search through the rules data for relevant information
     * @param {string} query - The search query
     * @returns {Array} - Array of matching rule objects
     */
    function searchRules(query) {
        // Normalize the query
        const normalizedQuery = query.toLowerCase();
        const queryTerms = normalizedQuery.split(/\s+/);
        
        // Filter out common words
        const stopWords = ['a', 'an', 'the', 'is', 'are', 'was', 'were', 'in', 'on', 'at', 'to', 'for', 'with', 'by'];
        const searchTerms = queryTerms.filter(term => !stopWords.includes(term) && term.length > 2);
        
        // Map of rule types to boost relevance for certain queries
        const categoryBoosts = {
            'shot clock': 'shotclock',
            'timeout': 'timeout',
            'foul': 'foul',
            'violation': 'violation',
            'travel': 'violation',
            'substitution': 'substitution',
            'overtime': 'overtime',
            'playoff': 'playoff'
        };

        // Check for category matches to boost certain results
        let categoryToBoost = null;
        for (const [keyword, category] of Object.entries(categoryBoosts)) {
            if (normalizedQuery.includes(keyword)) {
                categoryToBoost = category;
                break;
            }
        }

        // Match and score rules based on relevance
        const scoredResults = rulesData.map(rule => {
            // Initial score is 0
            let score = 0;
            
            // Combine all text fields for searching
            const ruleText = `${rule.title} ${rule.section} ${rule.content}`.toLowerCase();
            
            // Check each search term
            searchTerms.forEach(term => {
                // Count occurrences of the term
                const regex = new RegExp(term, 'gi');
                const matches = (ruleText.match(regex) || []).length;
                
                // Add to score based on matches
                score += matches;
                
                // Boost score for title matches
                if (rule.title.toLowerCase().includes(term)) {
                    score += 5;
                }
            });
            
            // Boost score if rule category matches query category
            if (categoryToBoost && rule.category === categoryToBoost) {
                score += 10;
            }
            
            return { rule, score };
        });
        
        // Sort by score and filter out non-matches
        const sortedResults = scoredResults
            .filter(result => result.score > 0)
            .sort((a, b) => b.score - a.score)
            .map(result => result.rule);
        
        return sortedResults;
    }

    /**
     * Generate a conversational response based on the rule data
     * @param {string} question - The user's question
     * @param {Object} primaryRule - The primary rule to base the response on
     * @param {Array} relatedRules - Array of related rules
     * @returns {string} - The generated response
     */
    function generateResponse(question, primaryRule, relatedRules) {
        // Create a conversational introduction
        const introductions = [
            "Based on the NBA rulebook, ",
            "According to the official rules, ",
            "The NBA rules state that ",
            "Here's what the rules say: "
        ];
        const introduction = introductions[Math.floor(Math.random() * introductions.length)];
        
        // Create a summary of the rule
        const summary = summarizeRule(primaryRule);
        
        // Add reference to the rule section
        const reference = `This is covered in Rule ${primaryRule.section}: ${primaryRule.title}.`;
        
        // Mention related rules if available
        let relatedInfo = '';
        if (relatedRules.length > 1) {
            relatedInfo = `\n\nThere are also related rules about ${relatedRules[1].title.toLowerCase()} that might be relevant.`;
        }
        
        return `${introduction}${summary}\n\n${reference}${relatedInfo}`;
    }

    /**
     * Create a concise summary of a rule
     * @param {Object} rule - The rule object
     * @returns {string} - A summary of the rule
     */
    function summarizeRule(rule) {
        // For a real app, this would use NLP techniques to generate a summary
        // For this demo, we'll use the first 2 sentences of the rule content
        
        const sentences = rule.content.match(/[^.!?]+[.!?]+/g) || [rule.content];
        let summary = sentences.slice(0, 2).join(' ');
        
        // If summary is too long, truncate it
        if (summary.length > 300) {
            summary = summary.substring(0, 300) + '...';
        }
        
        return summary;
    }

    /**
     * Add a message to the chat history display
     * @param {string} role - 'user' or 'bot'
     * @param {string} message - The message text
     */
    function addMessageToChat(role, message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = role === 'user' ? 'user-message p-4 bg-blue-50 rounded-lg ml-8' : 'bot-message p-4 bg-gray-100 rounded-lg mr-8';
        
        // Format message with paragraphs
        const formattedMessage = message.split('\n').map(paragraph => 
            paragraph ? `<p>${paragraph}</p>` : ''
        ).join('');
        
        messageDiv.innerHTML = formattedMessage;
        chatHistory.appendChild(messageDiv);
    }

    /**
     * Display the rule explanation card with detailed information
     * @param {Object} rule - The rule to display
     * @param {Array} relatedRules - Array of related rules
     */
    function displayRuleCard(rule, relatedRules) {
        // Set rule card content
        ruleTitle.textContent = rule.title;
        ruleSection.textContent = `Section: ${rule.section}`;
        rulePage.textContent = `Page: ${rule.page || 'N/A'}`;
        
        // Format rule content with proper HTML
        ruleContent.innerHTML = formatRuleContent(rule.content);
        
        // Add related rules
        relatedRules = relatedRules.slice(1, 5); // Take up to 4 related rules
        relatedRules.innerHTML = '';
        
        if (relatedRules.length > 0) {
            relatedRules.innerHTML = relatedRules.map(relatedRule => `
                <button class="related-rule-btn text-left p-2 border rounded hover:bg-gray-50 transition text-sm">
                    <span class="font-medium">${relatedRule.title}</span><br>
                    <span class="text-xs text-gray-500">Section ${relatedRule.section}</span>
                </button>
            `).join('');
            
            // Add event listeners to related rule buttons
            document.querySelectorAll('.related-rule-btn').forEach((btn, index) => {
                btn.addEventListener('click', () => {
                    // Display the related rule
                    displayRuleCard(relatedRules[index], [rule, ...relatedRules.filter((_, i) => i !== index)]);
                });
            });
        } else {
            relatedRules.innerHTML = '<p class="text-gray-500 text-sm">No related rules found.</p>';
        }
        
        // Show the card
        ruleExplanationCard.classList.remove('hidden');
    }

    /**
     * Format rule content with proper HTML
     * @param {string} content - The raw rule content
     * @returns {string} - Formatted HTML content
     */
    function formatRuleContent(content) {
        // Replace newlines with paragraph breaks
        let formatted = content.split('\n').map(para => para.trim() ? `<p>${para}</p>` : '').join('');
        
        // Format rule references (e.g., "Rule 5.3.2")
        formatted = formatted.replace(/Rule\s+([0-9.]+)/g, '<span class="rule-reference">Rule $1</span>');
        
        return formatted;
    }

    /**
     * Show rules for a specific category
     * @param {string} category - The category to filter by
     */
    function showRulesByCategory(category) {
        // Filter rules by category
        const categoryRules = rulesData.filter(rule => rule.category === category);
        
        if (categoryRules.length > 0) {
            // Display the first rule in the category
            displayRuleCard(categoryRules[0], categoryRules.slice(1));
            
            // Add a message to the chat about showing this category
            const message = `Here are the rules related to ${getCategoryName(category)}. I've displayed the first rule in this category below.`;
            addMessageToChat('bot', message);
        } else {
            // No rules found for this category
            const message = `I couldn't find any rules specifically categorized under ${getCategoryName(category)}.`;
            addMessageToChat('bot', message);
            ruleExplanationCard.classList.add('hidden');
        }
    }

    /**
     * Get the display name for a category
     * @param {string} category - The category ID
     * @returns {string} - The display name
     */
    function getCategoryName(category) {
        const categoryNames = {
            'general': 'General Rules',
            'violation': 'Violations',
            'foul': 'Fouls & Penalties',
            'shotclock': 'Shot Clock Rules',
            'substitution': 'Substitutions',
            'timeout': 'Timeouts',
            'overtime': 'Overtime Rules',
            'playoff': 'Playoff Specifics'
        };
        
        return categoryNames[category] || category;
    }
});