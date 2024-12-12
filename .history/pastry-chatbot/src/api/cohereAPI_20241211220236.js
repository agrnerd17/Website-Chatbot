import axios from "axios";

const COHERE_API_KEY = process.env.REACT_APP_COHERE_API_KEY; // Load API key from .env file

// Predefined questions and answers
const predefinedQuestions = [
  { question: "What are some popular pastries?", answer: "Some popular pastries include croissants, muffins, and danishes." },
  { question: "How do I make a croissant?", answer: "To make a croissant, you'll need to laminate dough by layering butter and dough, folding, and chilling repeatedly." },
  { question: "What is the difference between puff pastry and phyllo dough?", answer: "Puff pastry is rich and buttery, with layers created by folding dough and butter. Phyllo dough is thinner, less rich, and used for delicate pastries like baklava." }
];

/**
 * Find the closest predefined question and return the answer
 * @param {string} userQuestion - User's input
 * @returns {string|null} - Predefined answer if a match is found, otherwise null
 */
function getPredefinedAnswer(userQuestion) {
  const lowerUserQuestion = userQuestion.toLowerCase();
  
  for (const { question, answer } of predefinedQuestions) {
    // Simple check for matching keywords or similar phrases
    if (lowerUserQuestion.includes(question.toLowerCase())) {
      return answer;
    }
  }
  
  return null; // No match found
}

/**
 * Fetch a fallback response from Cohere's API
 * @param {string} prompt - User's input
 * @returns {Promise<string>} - Chatbot's response
 */
async function getChatbotResponse(prompt) {
  try {
    // First, check predefined answers
    const predefinedAnswer = getPredefinedAnswer(prompt);
    if (predefinedAnswer) return predefinedAnswer;

    // If no predefined answer matches, use Cohere's generation API for a fallback
    const customPrompt = `
      You are an expert in pastries and baking. Provide detailed and helpful answers to user questions.

      Question: ${prompt}
      Answer:
    `;

    const response = await axios.post(
      "https://api.cohere.ai/v1/generate",
      {
        model: "command-xlarge-nightly",
        prompt: customPrompt,
        max_tokens: 100,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${COHERE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.generations[0].text.trim();
  } catch (error) {
    console.error("Error with Cohere API:", error.message);
    return "Oops! Something went wrong. Please try again.";
  }
}

export { getChatbotResponse };
