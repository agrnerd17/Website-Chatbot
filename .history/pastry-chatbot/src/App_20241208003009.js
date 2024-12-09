import React from "react";
import Chatbot from "./components/Chatbot";
import Navbar from "./components/Navbar";
import "./styles/Navbar.css";

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
      <div>
        <Navbar />
        <main style={{ marginTop: "90px" }}> {/* Adjust */}
          <h1>Welcome to our Pastry Shop!</h1>
          <p>We sell baked goods.</p>
        </main>
      </div>
      <Chatbot /> {/* Include the chatbot */}
    </div>
  );
}

export default App;
