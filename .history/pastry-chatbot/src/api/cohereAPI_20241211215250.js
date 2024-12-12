import axios from "axios";

const COHERE_API_KEY = process.env.REACT_APP_COHERE_API_KEY; // Load API key from .env file

// Pastry data (for predefined questions)
const pastries = [
  { name: "Croissants", description: "Flaky, buttery pastries with a crescent shape, often enjoyed plain or filled." },
  { name: "Muffins", description: "Individual-sized quick breads, often made with blueberries, chocolate chips, or bananas." },
  { name: "Danishes", description: "Sweet pastries made with laminated dough, often filled with fruit or cheese and topped with icing." },
];

// Predefined questions and answers
const predefinedQuestions = [
  { question: "What are some popular pastries?", answer: "Some popular pastries include croissants, muffins, and danishes." },
  { question: "How do I make a croissant?", answer: "To make a croissant, you'll need to laminate dough by layering butter and dough, folding, and chilling repeatedly." },
  { question: "What is the difference between puff pastry and phyllo dough?", answer: "Puff pastry is rich and buttery, with layers created by folding dough and butter. Phyllo dough is thinner, less rich, and used for delicate pastries like baklava." }
];

// Variable to store precomputed embeddings
let pastryEmbeddings = null;

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
    console.log("Pastry embeddings initialized successfully:", pastryEmbeddings);  // Debugging line
  } catch (error) {
    console.error("Error initializing embeddings:", error.message);
  }
}

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
 * Find the closest matching predefined question
 * @param {string} userQuestion - User's input message
 * @returns {string|null} - Predefined answer if a match is found, otherwise null
 */
async function getPredefinedAnswer(userQuestion) {
  const threshold = 0.8; // Set a similarity threshold for matching

  try {
    const queryResponse = await axios.post(
      "https://api.cohere.ai/v1/embed",
      { texts: [userQuestion], model: "embed-english-v2.0" },
      {
        headers: {
          Authorization: `Bearer ${COHERE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    const queryEmbedding = queryResponse.data.embeddings[0];
    console.log("Query embedding:", queryEmbedding); // Debug: Check if query embedding is correct

    let bestMatch = { score: 0, answer: null };

    for (const { question, answer } of predefinedQuestions) {
      const questionResponse = await axios.post(
        "https://api.cohere.ai/v1/embed",
        { texts: [question], model: "embed-english-v2.0" },
        {
          headers: {
            Authorization: `Bearer ${COHERE_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      const questionEmbedding = questionResponse.data.embeddings[0];
      console.log("Question embedding:", questionEmbedding); // Debug: Check if question embedding is correct

      const similarity = cosineSimilarity(queryEmbedding, questionEmbedding);
      console.log(`Similarity for "${userQuestion}" and "${question}":`, similarity); // Debug: Check similarity score

      if (similarity > bestMatch.score && similarity >= threshold) {
        bestMatch = { score: similarity, answer };
      }
    }

    if (bestMatch.answer) {
      console.log("Best match found:", bestMatch.answer);
      return bestMatch.answer;
    } else {
      console.log("No match found, fallback to Cohere API.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching embeddings:", error.message);
    return null;
  }
}

/**
 * Fetch chatbot response from Cohere's API
 * @param {string} prompt - User's input message
 * @returns {Promise<string>} - Chatbot's response
 */

