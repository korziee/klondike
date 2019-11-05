import { Card } from "engine/lib/classes/Card";
import React from "react";
import useDimensions from "react-use-dimensions";
import { GameCard } from "../GameCard";
import "./CardPile.css";

export interface ICardPileCard {
  card: Card;
  onClick: () => void;
  selected: boolean;
}

export interface ICardPileProps {
  cards: ICardPileCard[];
  fanned: boolean;
  /**
   * If fanned is true, a direction must be selected
   *
   * @default "down"
   */
  fanDirection?: "down" | "right" | "left";
}

/**
 * Left fan looks strange
 */
export const CardPile: React.FC<ICardPileProps> = ({
  cards,
  fanned,
  fanDirection = "down"
}) => {
  const [ref, { width }] = useDimensions();

  return (
    <div ref={ref} className="card-pile">
      {cards.map((c, i) => {
        const style: React.CSSProperties = {};
        if (fanned) {
          if (fanDirection === "down") {
            style.top = i === 0 ? undefined : i * (width / 3);
          }
          if (fanDirection === "right") {
            style.left = i === 0 ? undefined : i * (width / 6.5);
          }
          if (fanDirection === "left") {
            style.right = i === 0 ? 0 : i * (width / 6.5);
            style.right = style.right - width / 3.2;
          }
        }
        return (
          <div className="card" style={style}>
            <GameCard card={c.card} onClick={c.onClick} selected={c.selected} />
          </div>
        );
      })}
    </div>
  );
};
