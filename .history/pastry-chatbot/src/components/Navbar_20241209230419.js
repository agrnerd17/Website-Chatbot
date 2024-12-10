import React from "react";
import "../styles/Navbar.css"; 
import logo from "../assets/pastry_bot_icon.jpg";

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <img src={logo} alt="Pastry Logo" />
      </div>

      {/* Menu */}
      <ul className="navbar-menu">
        <li>Home</li>
        <li>About</li>
        <li>Menu</li>
        <li>Contact</li>
      </ul>

      {/* Right Action (e.g., Sign In or Cart) */}
      <div className="navbar-right">
        <button className="navbar-button">Sign In</button>
      </div>
    </nav>
  );
};

export default Navbar;
