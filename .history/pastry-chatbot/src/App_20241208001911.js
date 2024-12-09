import React from "react";
import Chatbot from "./components/Chatbot";

function App() {
  return (
    <div className="App">
      <header>
        <h1 className="text-center text-3xl font-bold my-6">Welcome to Pastry Delight</h1>
      </header>
      <main>
        <div className="content text-center">
          <p>Explore our delicious pastries and chat with our assistant for recommendations!</p>
        </div>
      </main>
      <Chatbot /> {/* Include the chatbot */}
    </div>
  );
}

export default App;
