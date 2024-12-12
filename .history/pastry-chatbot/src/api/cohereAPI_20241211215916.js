import axios from "axios";
import { pastries, predefinedQuestions } from "./data";

const COHERE_API_KEY = process.env.REACT_APP_COHERE_API_KEY;

let pastryEmbeddings = null;
let questionEmbeddings = null;

// Helper function to calculate cosine similarity
function cosineSimilarity(vec1, vec2) {
  const dotProduct = vec1.reduce((acc, value, idx) => acc + value * vec2[idx], 0);
  const magnitude1 = Math.sqrt(vec1.reduce((acc, value) => acc + value ** 2, 0));
  const magnitude2 = Math.sqrt(vec2.reduce((acc, value) => acc + value ** 2, 0));
  return dotProduct / (magnitude1 * magnitude2);
}

// Initialize embeddings for pastries and predefined questions
export async function initializeEmbeddings() {
  try {
    const pastryNames = pastries.map(p => p.name);
    const questions = predefinedQuestions.map(q => q.question);
    const texts = [...pastryNames, ...questions];

    const response = await axios.post(
      "https://api.cohere.ai/v1/embed",
      { texts, model: "embed-english-v2.0" },
      {
        headers: {
          Authorization: `Bearer ${COHERE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const embeddings = response.data.embeddings;
    pastryEmbeddings = embeddings.slice(0, pastryNames.length);
    questionEmbeddings = embeddings.slice(pastryNames.length);
    console.log("Initialized embeddings successfully.");
  } catch (error) {
    console.error("Error initializing embeddings:", error.message);
  }
}

// Find the closest predefined answer based on the user's question
export async function getPredefinedAnswer(userQuestion) {
  if (!questionEmbeddings) {
    console.error("Question embeddings not initialized.");
    return null;
  }

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
    let bestMatch = { score: 0, answer: null };

    predefinedQuestions.forEach((q, idx) => {
      const similarity = cosineSimilarity(queryEmbedding, questionEmbeddings[idx]);
      if (similarity > bestMatch.score) {
        bestMatch = { score: similarity, answer: q.answer };
      }
    });

    return bestMatch.score >= 0.8 ? bestMatch.answer : null; // Threshold for similarity
  } catch (error) {
    console.error("Error finding predefined answer:", error.message);
    return null;
  }
}

// Find the closest pastry based on the user's input
export async function getClosestPastry(userInput) {
  if (!pastryEmbeddings) {
    console.error("Pastry embeddings not initialized.");
    return null;
  }

  try {
    const queryResponse = await axios.post(
      "https://api.cohere.ai/v1/embed",
      { texts: [userInput], model: "embed-english-v2.0" },
      {
        headers: {
          Authorization: `Bearer ${COHERE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const queryEmbedding = queryResponse.data.embeddings[0];
    let bestMatch = { score: 0, pastry: null };

    pastries.forEach((pastry, idx) => {
      const similarity = cosineSimilarity(queryEmbedding, pastryEmbeddings[idx]);
      if (similarity > bestMatch.score) {
        bestMatch = { score: similarity, pastry: pastry };
      }
    });

    return bestMatch.score >= 0.8 ? bestMatch.pastry : null; // Threshold for similarity
  } catch (error) {
    console.error("Error finding closest pastry:", error.message);
    return null;
  }
}
