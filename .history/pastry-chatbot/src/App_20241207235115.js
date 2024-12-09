import React from "react";
import Chatbot from "./components/Chatbot";

const App = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-pink-200 via-pink-100 to-white">
      <header className="w-full p-4 bg-pink-500 text-white text-center shadow-md">
        <h1 className="text-3xl font-bold">Welcome to PastryBot</h1>
      </header>
      <main className="flex-grow flex flex-col items-center p-8">
        <h2 className="text-xl font-semibold mb-6">Your personal pastry assistant!</h2>
        <Chatbot />
      </main>
      <footer className="w-full p-4 text-center bg-gray-800 text-white">
        <p>© 2024 PastryBot. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
