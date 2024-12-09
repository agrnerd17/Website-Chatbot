import React from "react";
import chatbotIcon from "../assets/chatbot-icon.png"; // Correct path

const ChatbotIcon = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        cursor: "pointer",
      }}
    >
      <img
        src={chatbotIcon}
        alt="Chatbot"
        style={{ width: "40px", height: "40px" }} // Adjusted size
      />
    </div>
  );
};

export default ChatbotIcon;
