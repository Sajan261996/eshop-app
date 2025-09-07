import React from "react";
import "./card.css"; // Ensure you create a CSS file for styling

export const Card = ({ children, className }) => {
  return <div className={`card ${className}`}>{children}</div>;
};

export const CardContent = ({ children }) => {
  return <div className="card-content">{children}</div>;
};
