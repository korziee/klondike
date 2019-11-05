import React from "react";
import "./CardPileGroup.css";

/**
 * Given `CardPile`'s as children, this displays them in a row with the appropriate spacing
 */
export const CardPileGroup: React.FC = ({ children }) => {
  return (
    <div className="card-pile-group">
      {React.Children.map(children, component => {
        return component;
      })}
    </div>
  );
};
