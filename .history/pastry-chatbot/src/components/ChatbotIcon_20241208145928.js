import React, { useState } from "react";
import "../styles/ChatbotIcon.css"; // Ensure this file exists
import chatIcon from "../assets/chatbot-icon.jpg"; // Replace with your icon

const ChatbotIcon = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div>
      <div className="chatbot-icon" onClick={toggleChat}>
        <img src={chatIcon} alt="Chat with us" />
      </div>
      {isChatOpen && (
        <div className="chatbot-popup">
          <h2>Chat with Us!</h2>
          <textarea placeholder="Type your message here..." />
          <button>Send</button>
        </div>
      )}
    </div>
  );
};

export default ChatbotIcon;
