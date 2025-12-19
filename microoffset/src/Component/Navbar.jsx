import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

export const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">MicroOffset</Link>
        </div>

        <nav className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/packs">Offset Packs</Link>
          <Link to="/business">For Businesses</Link>
          <Link to="/institutions">For Institutions</Link>
          <Link to="/individuals">For Individuals</Link>
          <Link to="/howitwork">How It Works</Link>
          <Link to="/impact">Impact & Projects</Link>
          <Link to="/developer">Developers (API)</Link>
          <Link to="/about">About & FAQ</Link>
        </nav>
      </div>
    </header>
  );
};
