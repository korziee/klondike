import React from "react";
import "./CardPileGroup.css";

export const CardPileGroup: React.FC = ({ children }) => {
  return (
    <div className="card-pile-group">
      {React.Children.map(children, component => {
        return component;
      })}
    </div>
  );
};
