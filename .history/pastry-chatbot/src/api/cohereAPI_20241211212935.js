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
