import axios from "axios";

const COHERE_API_KEY = process.env.REACT_APP_COHERE_API_KEY; // Load API key from .env file

// Pastry data
const pastries = [
  { name: "Croissants", description: "Flaky, buttery pastries with a crescent shape, often enjoyed plain or filled." },
  { name: "Muffins", description: "Individual-sized quick breads, often made with blueberries, chocolate chips, or bananas." },
  { name: "Danishes", description: "Sweet pastries made with laminated dough, often filled with fruit or cheese and topped with icing." },
];

// Variable to store precomputed embeddings
let pastryEmbeddings = null;

/**
 * Utility function to compute cosine similarity between two vectors
 * @param {number[]} vecA
 * @param {number[]} vecB
 * @returns {number} - Cosine similarity score
 */
function cosineSimilarity(vecA, vecB) {
  const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  return dotProduct / (magnitudeA * magnitudeB);
}

/**
 * Initialize pastry embeddings
 */
export async function initializeEmbeddings() {
  try {
    const names = pastries.map(p => p.name);
    const response = await axios.post(
      "https://api.cohere.ai/v1/embed",
      { texts: names, model: "embed-english-v2.0" },
      {
        headers: {
          Authorization: `Bearer ${COHERE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    pastryEmbeddings = response.data.embeddings;
    console.log("Pastry embeddings initialized successfully.");
  } catch (error) {
    console.error("Error initializing embeddings:", error.message);
  }
}

/**
 * Fetch chatbot response from Cohere's API
 * @param {string} prompt - User's input message
 * @returns {Promise<string>} - Chatbot's response
 */
export async function getChatbotResponse(prompt) {
  try {
    if (!pastryEmbeddings) {
      await initializeEmbeddings(); // Ensure embeddings are loaded
    }

    // Get query embedding
    const queryResponse = await axios.post(
      "https://api.cohere.ai/v1/embed",
      { texts: [prompt], model: "embed-english-v2.0" },
      {
        headers: {
          Authorization: `Bearer ${COHERE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    const queryEmbedding = queryResponse.data.embeddings[0];

    // Calculate cosine similarity
    const scores = pastryEmbeddings.map(pastryVector => cosineSimilarity(queryEmbedding, pastryVector));
    const bestMatchIndex = scores.indexOf(Math.max(...scores));

    // Return matched pastry description
    return pastries[bestMatchIndex].description;
  } catch (error) {
    console.error("Error with Cohere API:", error.message);
    return "Oops! Something went wrong. Please try again.";
  }
}
