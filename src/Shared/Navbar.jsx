import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">ProjectVault</div>
      <ul className="nav-links">
        <li><Link to="/student/dashboard">Home</Link></li>
        <li><Link to="/student/my-projects">My Projects</Link></li>
        <li><Link to="/student/export-projects">Export Projects</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
