import axios from "axios";
const COHERE_API_KEY = "7ZT0rkNdOrKYfye8DC5qSUtG36H3IhRQ2pvKHDgT"; // Load from environment variable

export async function getChatbotResponse(prompt) {
  try {
    const response = await axios.post(
      "https://api.cohere.ai/v1/generate",
      {
        model: "command-xlarge-nightly",
        prompt,
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
    console.error("Error fetching response from Cohere:", error);
    return "Oops! Something went wrong. Please try again.";
  }
}
