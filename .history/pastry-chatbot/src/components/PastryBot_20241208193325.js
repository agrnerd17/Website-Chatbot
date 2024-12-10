import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Box, Paper, TextField, IconButton, Typography, Avatar, Chip, Stack, Container } from "@mui/material";
import { styled } from "@mui/system";
import { FiSend } from "react-icons/fi";
import { GiCupcake } from "react-icons/gi";
import cohereAPIKey from "../api/cohereAPI";  // Import the API key from cohereAPI.js

// Styled components
const ChatContainer = styled(Paper)(({ theme }) => ({
  height: "600px",
  width: "100%",
  maxWidth: "400px",
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  bottom: "20px",
  right: "20px", // Position the chatbot at the bottom-right corner
  borderRadius: "16px",
  overflow: "hidden",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)"
}));

const MessageContainer = styled(Box)({
  flex: 1,
  overflowY: "auto",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "12px"
});

const InputContainer = styled(Box)({
  padding: "16px",
  borderTop: "1px solid rgba(0, 0, 0, 0.1)",
  display: "flex",
  gap: "8px",
  backgroundColor: "#fff"
});

const Header = styled(Box)({
  padding: "16px",
  backgroundColor: "#FF69B4",
  color: "white",
  display: "flex",
  alignItems: "center",
  gap: "12px"
});

const PastryBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = {
      text: input,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    try {
      const response = await axios.post(
        "https://api.cohere.ai/generate",
        {
          model: "xlarge", // Specify your desired Cohere model
          prompt: `You are a friendly pastry shop assistant. Respond to: "${input}"`,
          max_tokens: 50,
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${cohereAPIKey}`, // Use imported API key
            "Content-Type": "application/json",
          },
        }
      );

      const botMessage = {
        text: response.data.generated_text, // Response from Cohere API
        sender: "bot",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error with Cohere API:", error);
    }
  };

  return (
    <Container sx={{ display: "flex", justifyContent: "center", p: 3 }}>
      <ChatContainer>
        <Header>
          <Avatar sx={{ backgroundColor: "#FF1493" }}>
            <GiCupcake size={24} />
          </Avatar>
          <Typography variant="h6">Pastry Bot</Typography>
        </Header>

        <MessageContainer>
          {messages.map((message, index) => (
            <Stack
              key={index}
              direction="row"
              justifyContent={message.sender === "user" ? "flex-end" : "flex-start"}
              alignItems="center"
              spacing={1}
            >
              {message.sender === "bot" && (
                <Avatar sx={{ bgcolor: "#FF69B4", width: 32, height: 32 }}>
                  <GiCupcake size={16} />
                </Avatar>
              )}
              <Box>
                <Chip
                  label={message.text}
                  sx={{
                    maxWidth: "280px",
                    height: "auto",
                    "& .MuiChip-label": {
                      whiteSpace: "normal",
                      padding: "8px 12px"
                    },
                    backgroundColor: message.sender === "user" ? "#FF69B4" : "#f0f0f0",
                    color: message.sender === "user" ? "white" : "black"
                  }}
                />
                <Typography variant="caption" color="textSecondary" sx={{ pl: 1 }}>
                  {message.time}
                </Typography>
              </Box>
            </Stack>
          ))}
          <div ref={messagesEndRef} />
        </MessageContainer>

        <InputContainer>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend(e)}
            size="small"
          />
          <IconButton
            onClick={handleSend}
            color="primary"
            sx={{ backgroundColor: "#FF69B4", "&:hover": { backgroundColor: "#FF1493" } }}
          >
            <FiSend style={{ color: "white" }} />
          </IconButton>
        </InputContainer>
      </ChatContainer>
    </Container>
  );
};

export default PastryBot;
