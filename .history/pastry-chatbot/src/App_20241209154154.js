import React, { useState } from "react";
import Chatbot from "./components/Chatbot";
import Navbar from "./components/Navbar";
import "./styles/Navbar.css";
import PastryBot from "./components/PastryBot";
import Homepage from "./components/Homepage";

function App() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false); // State to control chatbot visibility

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen); // Toggle the chatbot visibility
  };

  return (
    <div className="App">
      {/* Navbar */}
      <Navbar />

      {/* Homepage as main content */}
      <main style={{ marginTop: "100px" }}>
        <Homepage />
      </main>

      {/* Conditionally render the Chatbot */}
      {isChatbotOpen && <Chatbot />}

      {/* Pastrybot UI */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
        }}
      >
        <PastryBot />
      </div>
    </div>
  );
}

export default App;
