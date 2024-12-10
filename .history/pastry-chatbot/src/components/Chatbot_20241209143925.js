import React, { useState, useRef, useEffect } from "react";
import { Box, TextField, Typography, IconButton, Stack, Paper } from "@mui/material";
import { IoSend } from "react-icons/io5";
import { getChatbotResponse } from "../api/cohereAPI.js"; // Adjust import if needed

const Chatbot = () => {
  const [messages, setMessages] = useState([{ text: "Hi! I'm your chatbot. How can I help you?", isBot: true }]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (input.trim()) {
      setMessages((prev) => [...prev, { text: input, isBot: false }]);

      // Fetch chatbot response
      const botResponse = await getChatbotResponse(input);

      setMessages((prev) => [...prev, { text: botResponse, isBot: true }]);
      setInput("");
    }
  };

  return (
    <Box>
      <Typography variant="h6">Chatbot</Typography>
      <Box sx={{ overflowY: "auto", maxHeight: "300px", marginBottom: "10px" }}>
        {messages.map((message, index) => (
          <Paper
            key={index}
            sx={{
              padding: "10px",
              margin: "5px",
              backgroundColor: message.isBot ? "#f0f0f0" : "#e1f7d5",
            }}
          >
            {message.text}
          </Paper>
        ))}
        <div ref={messagesEndRef} />
      </Box>

      <Stack direction="row" spacing={2}>
        <TextField
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me something..."
        />
        <IconButton onClick={handleSend} sx={{ color: "blue" }}>
          <IoSend />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default Chatbot;
