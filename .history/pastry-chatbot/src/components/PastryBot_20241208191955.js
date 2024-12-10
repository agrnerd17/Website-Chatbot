import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Typography,
  Avatar,
  Chip,
  Stack,
  Container,
  Fab
} from "@mui/material";
import { styled } from "@mui/system";
import { FiSend } from "react-icons/fi";
import { GiCupcake } from "react-icons/gi";
import { MdChat } from "react-icons/md"; // Icon for chat toggle button

const ChatContainer = styled(Paper)(({ theme }) => ({
  height: "600px",
  width: "350px",
  display: "flex",
  flexDirection: "column",
  position: "fixed",
  bottom: "80px",
  right: "20px",
  borderRadius: "16px",
  overflow: "hidden",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  zIndex: 1000
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
  const [isOpen, setIsOpen] = useState(false); // State to control chat visibility
  const messagesEndRef = useRef(null);

  const botResponses = [
    "Our fresh croissants are baked daily! Would you like to know today's flavors?",
    "Try our signature Red Velvet cupcakes - they're simply divine!",
    "Our macarons come in 12 different flavors. Which one would you like to try?",
    "We have special discounts on birthday cakes this week!",
    "Our chocolate eclairs are a customer favorite!"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = {
      text: input,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    setTimeout(() => {
      const botMessage = {
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        sender: "bot",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <Fab
        color="primary"
        onClick={() => setIsOpen((prev) => !prev)}
        sx={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#FF69B4",
          "&:hover": { backgroundColor: "#FF1493" }
        }}
      >
        <MdChat style={{ color: "white" }} size={24} />
      </Fab>

      {/* Chat Container */}
      {isOpen && (
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
      )}
    </>
  );
};

export default PastryBot;
