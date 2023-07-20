import React from "react";
import { NavLink } from "react-router-dom";
import gold from "../video/gold.mp4";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <video className="background-video" autoPlay muted loop>
        <source src={gold} type="video/mp4" />
      </video>
      <div className="content">
        <h1 style={{ color: "#ffd700" }}>Welcome to Gold Value Calculator</h1>
        <NavLink to="goldcal">Get Started</NavLink>
      </div>
    </div>
  );
};

export default Home;
