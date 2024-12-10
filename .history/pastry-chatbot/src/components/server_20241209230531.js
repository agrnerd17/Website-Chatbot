import express from "express";
import { getChatbotResponse } from "./Chatbot.js"; 

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse incoming JSON

// Endpoint for chatbot interaction
app.post("/chat", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "No prompt provided" });
  }

  const response = await getChatbotResponse(prompt);
  res.json({ response });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
