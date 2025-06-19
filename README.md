# RuleBook Bot

An AI-powered NBA rulebook chatbot that answers questions from fans, journalists, or aspiring referees.

## Features

- Interactive chat interface for asking questions about NBA rules
- Responsive design that works on desktop and mobile devices
- AI-powered responses based on official NBA rules
- Real-time feedback with loading indicators
- Quick rule reference guide with search functionality
- Visual rule illustrations and historical context
- Categorized rule browsing

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express
- **AI**: OpenAI GPT API

## Getting Started

### Prerequisites

- Node.js 14 or higher
- npm or yarn
- OpenAI API key

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/dxaginfo/rulebook-bot.git
   cd rulebook-bot
   ```

2. Install frontend dependencies:
   ```
   npm install
   ```

3. Install backend dependencies:
   ```
   cd server
   npm install
   ```

4. Create environment variables:
   ```
   cp .env.example .env
   ```
   Then add your OpenAI API key to the .env file

### Running the Application

1. Start the backend server:
   ```
   cd server
   npm run dev
   ```

2. In a separate terminal, start the frontend:
   ```
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000`

## How It Works

The RuleBook Bot uses the OpenAI API to generate responses to user questions about NBA rules. The application maintains a knowledge base of common NBA rules and regulations, which is used to provide context to the AI model.

When a user asks a question, the application sends the question along with the rules context to the OpenAI API, which generates a response based on the provided information.

## New Features in Latest Update

- **Enhanced Rule Details**: Added comprehensive rule information including historical context
- **Visual Rule Illustrations**: Added visual examples for common rules
- **Search Functionality**: Implemented search within the quick rule reference
- **Rule Categorization**: Rules are now organized by category for easier browsing
- **Improved UI/UX**: Better layout and interaction design for all components

## Future Enhancements

- Add a larger dataset of NBA rules and regulations
- Implement advanced search functionality to find specific rules
- Add user authentication for personalized experiences
- Include video examples of rules in action
- Implement a feedback system to improve responses over time
- Add rule comparison feature
- Support for multiple basketball rule sets (NBA, FIBA, NCAA, etc.)

## License

This project is licensed under the MIT License - see the LICENSE file for details.