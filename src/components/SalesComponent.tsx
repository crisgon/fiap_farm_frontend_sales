import React from "react";
import "./SalesComponent.css";

const SalesProvider: React.FC = () => {
  return (
    <div className="container">
      <div className="icon-container">
        <h2>💸</h2>
      </div>
      <h1 className="title">Fiap Farm Sales</h1>
    </div>
  );
};

export default SalesProvider;
