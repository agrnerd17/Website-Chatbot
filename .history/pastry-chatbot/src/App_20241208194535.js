import React, { useState } from "react";
import Chatbot from "./components/Chatbot";
import Navbar from "./components/Navbar";
import "./styles/Navbar.css";
import PastryBot from "./components/PastryBot";

function App() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false); // State to control chatbot visibility

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen); // Toggle the chatbot visibility
  };

  return (
    <div className="App">
      <Navbar />
      <main style={{ marginTop: "100px" }}>
        <h1>Welcome to our Pastry Shop!</h1>
        <p>We sell baked goods.</p>
      </main>
      <main>
        <div className="content text-center">
          <p>Explore our delicious pastries and chat with our assistant for recommendations!</p>
        </div>
      </main>
      
      {/* Conditionally render the Chatbot */}
      {isChatbotOpen && <Chatbot />}

      {/* Pastrybot UI */}
      <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 1000
      }}
      >
        <PastryBot />
      </div>
    </div>
  );
}

export default App;
