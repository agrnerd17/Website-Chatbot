import axios from "axios";

const COHERE_API_KEY = process.env.REACT_APP_COHERE_API_KEY; // Load API key from .env file

/**
 * Fetch chatbot response from Cohere's API
 * @param {string} prompt - User's input message
 * @returns {Promise<string>} - Chatbot's response
 */
export async function getChatbotResponse(prompt) {
  try {
    const response = await axios.post(
      "https://api.cohere.ai/v1/generate",
      {
        model: "command-xlarge-nightly",
        prompt: prompt,
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
