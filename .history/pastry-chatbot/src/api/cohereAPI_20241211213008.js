import axios from "axios";

const COHERE_API_KEY = process.env.REACT_APP_COHERE_API_KEY;

const pastries = [
  { name: "Croissants", description: "Flaky, buttery pastries with a crescent shape." },
  { name: "Muffins", description: "Individual-sized quick breads, often with various fillings." },
  { name: "Danishes", description: "Sweet pastries made with laminated dough and various toppings." },
];

let pastryEmbeddings = null;

/**
 * Utility function to compute cosine similarity
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
    const names = pastries.map((p) => p.name);
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
    console.log("Pastry embeddings initialized...");
  } catch (error) {
    console.error("Error initializing embeddings:", error);
  }
}

/**
 * Retrieve chatbot response
 */
export async function getChatbotResponse(query) {
  try {
    if (!pastryEmbeddings) await initializeEmbeddings();

    const queryEmbeddingResponse = await axios.post(
      "https://api.cohere.ai/v1/embed",
      { texts: [query], model: "embed-english-v2.0" },
      {
        headers: {
          Authorization: `Bearer ${COHERE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const queryEmbedding = queryEmbeddingResponse.data.embeddings[0];

    const similarities = pastryEmbeddings.map((embedding) =>
      cosineSimilarity(embedding, queryEmbedding)
    );

    const mostSimilarIndex = similarities.indexOf(Math.max(...similarities));
    const bestMatch = pastries[mostSimilarIndex];

    return `The best match is ${bestMatch.name}: ${bestMatch.description}`;
  } catch (error) {
    console.error("Error getting chatbot response:", error);
    return "Sorry, I couldn't process that query. Please try again later.";
  }
}
