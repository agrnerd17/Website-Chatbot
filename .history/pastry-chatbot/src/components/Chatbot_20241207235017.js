import React, { useState } from "react";
import { getChatbotResponse } from "../api/cohereAPI";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const userMessage = { sender: "user", text: userInput };
    setMessages((prev) => [...prev, userMessage]);
    setUserInput("");

    const prompt = messages
      .map((msg) => `${msg.sender}: ${msg.text}`)
      .join("\n") + `\nuser: ${userInput}\nbot:`;

    const botResponse = await getChatbotResponse(prompt);
    const botMessage = { sender: "bot", text: botResponse };
    setMessages((prev) => [...prev, botMessage]);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-lg p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">PastryBot Chat</h2>
      <div className="flex flex-col w-full h-96 overflow-y-auto bg-white border rounded-lg p-4 mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded mb-2 ${
              msg.sender === "user"
                ? "self-end bg-blue-500 text-white"
                : "self-start bg-gray-200"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex w-full gap-2">
        <input
          type="text"
          className="flex-grow p-2 border rounded-lg"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Ask me about pastries..."
        />
        <button
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
